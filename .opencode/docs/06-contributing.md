# 06 — Panduan Kontribusi

> **Navigasi:** [← 05-Arsitektur](05-architecture.md) | [README →](README.md)

Panduan ini menjelaskan cara menambah, mengubah, dan memelihara komponen sistem Opencode:
agent, skill, command. Ikuti panduan ini untuk menjaga konsistensi dan kualitas.

---

## Menambah Agent Baru

### Step 1: Buat File Agent

Buat file markdown di `.opencode/agents/<nama-agent>.md` dengan format:

```markdown
---
description: Satu kalimat deskripsi agent. Sebutkan domain dan kapabilitas utama.
mode: primary | subagent
---

# Nama Agent: Deskripsi Singkat

## Your Identity
Paragraf tentang identitas agent. Apa perannya? Kapan digunakan?

## Core Competencies

### 1. Kompetensi Utama 1
- Detail kemampuan

### 2. Kompetensi Utama 2
- Detail kemampuan

## Quality Standards
- Standar kualitas yang harus dipenuhi

## Workflow
1. Step pertama
2. Step kedua
3. Self-evaluate via @code-reviewer
```

### Step 2: Daftarkan di opencode.json

Tambahkan entri di section `agent`:

```json
{
  "agent": {
    "nama-agent": {
      "description": "Deskripsi agent (harus match dengan file)",
      "mode": "primary",
      "temperature": 0.2,
      "permission": {
        "edit": "allow",
        "bash": { "*": "ask", "npm *": "allow" },
        "skill": { "domain-*": "allow" }
      }
    }
  }
}
```

### Step 3: Konvensi Permission

| Tipe Agent | Edit | Bash | Skill |
|------------|------|------|-------|
| Primary | allow | allow | — (load via tool) |
| Subagent (read-write) | allow | ask* | domain-* |
| Subagent (read-only) | deny | deny | domain-* |
| Code-reviewer | deny | deny | * (all) |

---

## Menambah Skill Baru

### Step 1: Buat Direktori dan File

```
.opencode/skills/<nama-skill>/
└── SKILL.md
```

### Step 2: Tulis SKILL.md

Format frontmatter (YAML):

```yaml
---
name: nama-skill
description: Deskripsi 1-2 kalimat
license: MIT
compatibility: opencode
metadata:
  audience: target-audience  # e.g., backend-developers, ai-engineers
  domain: domain             # e.g., backend, frontend, database, ai-agent
  paradigm: paradigm         # e.g., async, concurrent, declarative, event-driven
  capabilities:
    - kemampuan-1
    - kemampuan-2
  integrates_with:
    - skill-terkait-1
    - skill-terkait-2
---
```

### Step 3: Struktur Konten Skill

Skill yang baik harus berisi:

1. **Philosophical Foundation** — Mengapa skill ini ada, aksioma dasarnya
2. **Core Patterns** — Pattern utama dengan contoh kode
3. **Anti-Patterns** — Apa yang TIDAK boleh dilakukan
4. **Implementation Checklist** — Checklist sebelum deploy
5. **Troubleshooting** — Common errors dan solusinya
6. **Integration Patterns** — Bagaimana skill ini berintegrasi dengan skill lain

### Step 4: Konvensi Penamaan

- **Nama direktori**: `domain-fokus` (e.g., `backend-go`, `frontend-react`, `ai-rag`)
- **Nama skill**: Sama dengan nama direktori
- **Domain grouping**: Prefix menentukan domain
  - `backend-*` → Backend
  - `frontend-*` → Frontend
  - `database-*` → Database
  - `infra-*` → Infrastructure
  - `ai-*` → AI/Agent
  - `mobile-*` → Mobile/Desktop
  - `security-*` → Security
  - `systems-*` → Systems
  - `math-*` → Mathematics/HPC
  - `paradigm-*` → Programming Paradigms
  - `workflow-*`, `understanding` → Workflow

### Step 5: Daftarkan

Skill didaftarkan otomatis melalui glob pattern di `opencode.json`:
```json
"instructions": [".opencode/skills/**/SKILL.md"]
```

Tidak perlu edit `opencode.json` — file SKILL.md di dalam `.opencode/skills/` akan auto-discover.

---

## Menambah Command Baru

### Step 1: Buat File Template

Buat file di `.opencode/commands/<nama-command>.md`:

```markdown
---
description: Deskripsi singkat command
agent: nama-agent-yang-assigned
subtask: true
---

## Judul Command

### Context
$ARGUMENTS

### Framework
1. Step 1
2. Step 2
3. Step 3

### Instructions
Detail instruksi untuk agent...

Proceed.
```

### Step 2: Daftarkan di opencode.json

Tambahkan entri di section `command`:

```json
{
  "command": {
    "nama-command": {
      "template": "Konten template...\n\n$ARGUMENTS",
      "description": "Deskripsi command",
      "agent": "nama-agent",
      "subtask": true
    }
  }
}
```

### Step 3: Konvensi Command

| Aspek | Konvensi |
|-------|----------|
| Nama command | lowercase, tanpa spasi (e.g., `mycommand`) |
| File name | `<nama-command>.md` |
| `$ARGUMENTS` | Placeholder untuk input user. SELALU ada di template |
| Agent | Pilih agent yang paling sesuai dengan domain command |
| Subtask | `true` untuk task terisolasi, `false` untuk task dalam session |

---

## Best Practices

### Agent
- Setiap agent harus punya **identity statement** yang jelas
- Deskripsikan **kapan agent digunakan** vs kapan TIDAK digunakan
- Sertakan **workflow step-by-step** untuk agent
- Jangan duplikasi — satu domain, satu agent
- Subagent harus punya **permission terbatas** pada domainnya

### Skill
- **Code snippets wajib** — skill tanpa contoh kode tidak berguna
- **Anti-patterns wajib** — tunjukkan apa yang SALAH dan BENAR
- **Checklist wajib** — developer butuh verifikasi sebelum deploy
- **Jangan duplikasi** konten antar skill — gunakan `integrates_with`
- Gunakan **ASCII diagrams** untuk visualisasi arsitektur
- Skill adalah **referensi**, bukan tutorial — padat dan actionable

### Command
- Template command harus **self-contained** — agent bisa langsung eksekusi
- `$ARGUMENTS` harus digunakan dengan benar
- Agent yang assigned harus sesuai domain
- Sertakan **output specification** — apa yang diharapkan dari command

---

## Testing & Validasi

### Validasi Konfigurasi

```bash
# Check opencode.json valid JSON
node -e "JSON.parse(require('fs').readFileSync('opencode.json','utf8'))"

# Pastikan semua agent punya file
Get-ChildItem -Path ".opencode\agents" -Filter "*.md" | ForEach-Object { $_.Name }

# Pastikan semua command punya file  
Get-ChildItem -Path ".opencode\commands" -Filter "*.md" | ForEach-Object { $_.Name }

# Pastikan semua skill punya SKILL.md
Get-ChildItem -Path ".opencode\skills" -Recurse -Filter "SKILL.md" | ForEach-Object { $_.FullName }
```

### Validasi Skill

Setiap SKILL.md harus:
- [ ] Frontmatter YAML valid (name, description, metadata)
- [ ] Minimal 1 code snippet
- [ ] Minimal 1 anti-pattern table
- [ ] Implementation checklist
- [ ] Menggunakan ASCII diagram jika menjelaskan arsitektur

### Validasi Agent

Setiap agent file harus:
- [ ] Frontmatter YAML valid (description, mode)
- [ ] Identity section
- [ ] Core competencies (minimal 3)
- [ ] Workflow steps
- [ ] Referensi ke @code-reviewer untuk self-evaluation

---

## Konvensi Umum

### Penamaan
- **Files**: lowercase, hyphens, `.md` extension
- **Direktori**: lowercase, hyphens
- **Agent names**: lowercase, hyphens (e.g., `vibe-coder`, `backend-architect`)
- **Skill names**: `domain-fokus` (e.g., `backend-go`, `ai-rag`)
- **Command names**: lowercase, no hyphens preferred (e.g., `vibe`, `reflect`)

### Dokumentasi
- Gunakan **Bahasa Indonesia** untuk dokumentasi onboarding
- Gunakan **English** untuk istilah teknis yang tidak diterjemahkan
- ASCII diagrams untuk arsitektur
- Tabel untuk perbandingan

### Git
- Commit messages: conventional commits (`docs: add agent documentation`)
- Satu commit per perubahan logis
- Jangan commit secrets atau tokens

---

## Checklist Sebelum Submit

```
Agent baru:
[ ] File .md dibuat di .opencode/agents/
[ ] Entri ditambahkan di opencode.json (agent section)
[ ] Frontmatter valid (description, mode)
[ ] Permission sesuai dengan domain
[ ] Ada workflow steps

Skill baru:
[ ] Direktori dibuat di .opencode/skills/<nama>/
[ ] SKILL.md dengan frontmatter valid
[ ] Code snippets (minimal 1)
[ ] Anti-patterns table
[ ] Implementation checklist
[ ] Troubleshooting section

Command baru:
[ ] File .md dibuat di .opencode/commands/
[ ] Entri ditambahkan di opencode.json (command section)
[ ] Template menggunakan $ARGUMENTS
[ ] Agent assigned sesuai domain
[ ] Subtask flag di-set dengan benar

Dokumentasi:
[ ] Navigasi antar file terhubung (← →)
[ ] Tidak ada broken links
[ ] Konsisten format dan bahasa
[ ] Semua diagram terbaca
```

---

> **Kembali ke [README](README.md)** untuk overview dan quickstart
