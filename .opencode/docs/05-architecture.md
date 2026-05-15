# 05 — Arsitektur Sistem Opencode

> **Navigasi:** [← 04-Workflow](04-workflow.md) | [06-Kontribusi →](06-contributing.md)

Dokumen ini menjelaskan arsitektur internal sistem Opencode: bagaimana `opencode.json`,
agents, commands, skills, dan `AGENTS.md` saling berhubungan.

---

## Diagram Arsitektur Utama

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           opencode.json                                  │
│                       (Master Configuration)                             │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                   instructions: [".opencode/skills/**/SKILL.md"]   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────┐  ┌──────────────────────────────────┐    │
│  │     agent (definisi)      │  │     command (definisi)            │    │
│  │                           │  │                                   │    │
│  │  build: { mode, temp,    │  │  vibe: { template, agent,         │    │
│  │           permission }   │  │          subtask }                │    │
│  │  plan: { ... }           │  │  reflect: { ... }                 │    │
│  │  vibe-coder: { ... }     │  │  architect: { ... }               │    │
│  │  lore-master: { ... }    │  │  optimize: { ... }                │    │
│  │  ui-god: { ... }         │  │  secure: { ... }                  │    │
│  │  backend-architect: {...}│  │  doc: { ... }                     │    │
│  │  systems-shaman: { ... } │  │  deploy: { ... }                  │    │
│  │  cloud-sage: { ... }     │  │                                   │    │
│  │  security-oracle: { ... }│  └──────────────┬───────────────────┘    │
│  │  ai-architect: { ... }   │                 │                         │
│  │  mobile-master: { ... }  │                 │                         │
│  │  math-scientist: { ... } │                 │                         │
│  │  code-reviewer: { ... }  │                 │                         │
│  └──────────────┬───────────┘                 │                         │
│                 │                             │                         │
│  ┌──────────────▼─────────────────────────────▼───────────────────┐    │
│  │                      permission                                  │    │
│  │                                                                  │    │
│  │  edit: "allow"     bash: "allow"     read: "allow"              │    │
│  │  glob: "allow"     grep: "allow"     task: "allow"              │    │
│  │  webfetch: "allow" skill: "allow"    question: "allow"          │    │
│  └──────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Hubungan Antarkomponen

```
                    ┌─────────────────┐
                    │   opencode.json │
                    │  (Konfigurasi)   │
                    └────────┬────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
           ▼                 ▼                 ▼
   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
   │   AGENTS.md   │ │   agents/    │ │  commands/   │
   │ (Instruksi    │ │ (11 files)   │ │  (7 files)   │
   │  Sistem)      │ │              │ │              │
   └──────────────┘ └──────┬───────┘ └──────┬───────┘
                           │                │
                           │  Agent invoke  │
                           │  command       │
                           │                │
                    ┌──────▼────────────────▼──────┐
                    │         skills/               │
                    │      (27 SKILL.md files)      │
                    │                               │
                    │  backend-go/  frontend-react/ │
                    │  database-*/  ai-*/           │
                    │  infra-*/      security-*/    │
                    │  ...                           │
                    └───────────────────────────────┘
```

---

## File Structure

```
.opencode/
├── .gitignore                 # Git ignore rules
├── agents/                    # Agent definition files (markdown)
│   ├── vibe-coder.md          # Primary agent: Vibe-to-Code pipeline
│   ├── lore-master.md         # Primary agent: Cross-domain synthesist
│   ├── ui-god.md              # Subagent: Frontend transcendent
│   ├── backend-architect.md   # Subagent: Backend wizard
│   ├── systems-shaman.md      # Subagent: Low-level master
│   ├── cloud-sage.md          # Subagent: Infrastructure master
│   ├── security-oracle.md     # Subagent: Security master
│   ├── ai-architect.md        # Subagent: AI systems architect
│   ├── mobile-master.md       # Subagent: Mobile/desktop master
│   ├── math-scientist.md      # Subagent: Mathematics/HPC master
│   └── code-reviewer.md       # Subagent: Quality gate enforcer
├── commands/                  # Command template files (markdown)
│   ├── vibe.md                # /vibe command
│   ├── reflect.md             # /reflect command
│   ├── architect.md           # /architect command
│   ├── optimize.md            # /optimize command
│   ├── secure.md              # /secure command
│   ├── doc.md                 # /doc command
│   └── deploy.md              # /deploy command
├── skills/                    # Domain skill files (SKILL.md)
│   ├── ai-agent-loop/
│   ├── ai-memory/
│   ├── ai-rag/
│   ├── backend-elixir/
│   ├── backend-go/
│   ├── backend-python/
│   ├── database-event-sourcing/
│   ├── database-postgres/
│   ├── devops-platform-engineering/
│   ├── frontend-animation/
│   ├── frontend-react/
│   ├── frontend-svelte/
│   ├── infra-kubernetes/
│   ├── infra-observability/
│   ├── infra-terraform/
│   ├── math-hpc/
│   ├── math-ml/
│   ├── mobile-flutter/
│   ├── mobile-tauri/
│   ├── paradigm-actor/
│   ├── paradigm-functional/
│   ├── security-audit/
│   ├── security-crypto/
│   ├── systems-ebpf/
│   ├── systems-embedded/
│   ├── understanding/
│   └── workflow-general/
├── docs/                      # Dokumentasi onboarding (file ini)
│   ├── README.md
│   ├── 01-agents.md
│   ├── 02-skills.md
│   ├── 03-commands.md
│   ├── 04-workflow.md
│   ├── 05-architecture.md
│   └── 06-contributing.md
├── package.json               # Dependensi @opencode-ai/plugin
└── package-lock.json          # Lock file
```

---

## Config Schema (`opencode.json`)

### Root Level

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [".opencode/skills/**/SKILL.md"],
  "permission": { ... },
  "agent": { ... },
  "command": { ... }
}
```

| Field | Deskripsi |
|-------|-----------|
| `$schema` | URL schema untuk validasi konfigurasi |
| `instructions` | Array path ke file SKILL.md yang di-load sebagai instruksi sistem |
| `permission` | Global permission defaults (di-override per agent) |
| `agent` | Definisi agent-agent (primary dan subagent) |
| `command` | Definisi custom slash commands |

### Agent Config

Setiap agent memiliki struktur:

```json
{
  "agent_name": {
    "description": "Deskripsi agent",
    "mode": "primary | subagent",
    "temperature": 0.0 - 1.0,
    "permission": {
      "edit": "allow | deny | ask",
      "bash": { "*": "allow | deny | ask", "npm *": "allow", ... },
      "task": { "*": "allow | deny" },
      "skill": { "backend-*": "allow", ... }
    }
  }
}
```

### Mode Agent

| Mode | Deskripsi |
|------|-----------|
| `primary` | Agent tab-switchable, bisa dispatch subagent. Contoh: `vibe-coder`, `lore-master` |
| `subagent` | Agent domain spesifik, dipanggil via @mention. Contoh: `ui-god`, `backend-architect` |

### Permission System

Permission bisa di-set di 3 level:

```
1. Global (root permission) — default untuk semua agent
2. Agent-specific — override per agent
3. Command-specific — dalam template command, dijalankan dengan permission agent yang assigned
```

Permission hierarchy:
```
edit, bash, task, skill, read, glob, grep, webfetch, websearch, question, lsp
```

Setiap permission bisa di-set ke:
- **`allow`**: Diizinkan tanpa konfirmasi
- **`deny`**: Ditolak sepenuhnya
- **`ask`**: Meminta konfirmasi user sebelum eksekusi

Untuk `bash`, `task`, dan `skill`, bisa menggunakan wildcard pattern:
- `"*": "allow"` — semua diizinkan
- `"npm *": "allow"` — hanya npm commands
- `"terraform *": "ask"` — terraform harus konfirmasi

---

## Command Config

Setiap command memiliki struktur:

```json
{
  "command_name": {
    "template": "Template teks dengan $ARGUMENTS placeholder",
    "description": "Deskripsi command",
    "agent": "nama-agent",
    "subtask": true | false
  }
}
```

| Field | Deskripsi |
|-------|-----------|
| `template` | Template prompt yang dikirim ke agent. `$ARGUMENTS` diganti dengan input user |
| `description` | Deskripsi singkat (muncul di CLI help) |
| `agent` | Agent yang assigned untuk menjalankan command ini |
| `subtask` | Jika `true`, dijalankan sebagai subtask (isolated) |

---

## Agent File Format

Setiap agent file di `.opencode/agents/` memiliki format:

```markdown
---
description: Deskripsi agent (digunakan di opencode.json dan CLI)
mode: primary | subagent
---

# Judul Agent

## Your Identity
Deskripsi identitas agent...

## Core Competencies
...
```

Frontmatter YAML di awal file mendefinisikan metadata agent.

---

## Skill File Format

Setiap skill di `.opencode/skills/<name>/SKILL.md` memiliki format:

```markdown
---
name: nama-skill
description: Deskripsi skill
license: MIT
compatibility: opencode
metadata:
  audience: target-audience
  domain: domain
  paradigm: paradigm
  capabilities:
    - cap1
    - cap2
  integrates_with:
    - skill-lain-1
    - skill-lain-2
---

## Judul Skill

### Section 1
...

### Section 2
...
```

---

## Flow Eksekusi

### Agent Primary Memproses Tugas

```
1. User input diterima
2. opencode.json menentukan agent mana yang aktif
3. Agent membaca AGENTS.md sebagai instruksi sistem
4. Agent membaca SKILL.md files (dari instructions config)
5. Agent menentukan perlu load skill tambahan → gunakan skill tool
6. Agent menentukan perlu dispatch subagent → gunakan @mention
7. Agent eksekusi tugas
8. Agent invoke @code-reviewer untuk quality gate
9. Hasil dikembalikan ke user
```

### Subagent Dipanggil

```
Primary Agent
    │
    │  "@backend-architect tolong design database schema untuk user service"
    │
    ▼
backend-architect (subagent)
    │
    ├── Load skill: database-postgres
    ├── Load skill: backend-go (jika relevant)
    ├── Eksekusi tugas
    ├── Self-evaluate via @code-reviewer
    └── Return hasil ke primary agent
```

### Command Dieksekusi

```
User: /architect Review arsitektur e-commerce
    │
    ▼
opencode.json → command.architect
    │
    ├── agent: "lore-master"
    ├── subtask: true
    └── template: "## Architecture Review\n\n..." (dengan $ARGUMENTS diganti)
    │
    ▼
lore-master agent
    │
    ├── Load skill: understanding
    ├── Analisis arsitektur
    ├── Dispatch subagent jika perlu
    ├── Generate ASCII diagram + risk register
    └── Return ke user
```

---

## Dependency Graph

```
AGENTS.md ──────────────────────────────────────┐
                                                 │
opencode.json ───────┬──────────────────────────┤
    │                │                          │
    ├── agents/ ─────┤ (definisi agent)         │
    │   ├── primary  │                          │
    │   └── subagent │                          │
    │                │                          │
    ├── commands/ ───┤ (definisi command)       │
    │                │                          │
    └── skills/ ─────┘ (domain knowledge) ──────┘
         │
         ├── backend-*
         ├── frontend-*
         ├── database-*
         ├── infra-*
         ├── ai-*
         ├── mobile-*
         ├── security-*
         ├── systems-*
         ├── math-*
         ├── paradigm-*
         └── workflow-*
```

---

> **Next:** [06-Kontribusi](06-contributing.md) — Pelajari cara menambah agent/skill/command baru
