# Dokumentasi Opencode — Jenius Mutlak

> **Versi:** 1.0 — Terakhir diperbarui: 13 Mei 2026

Selamat datang di dokumentasi onboarding sistem **Opencode** untuk project **APP-TERMINAL**.
Dokumentasi ini berisi panduan lengkap tentang ekosistem agent, katalog skill, command pipeline,
workflow harian, dan arsitektur sistem — seluruhnya dalam Bahasa Indonesia.

---

## 🚀 Quickstart

### Prasyarat
- **Node.js** ≥ 18
- **Opencode CLI** terinstal (`@opencode-ai/plugin`)
- Terminal dengan akses ke workspace project

### Mulai Bekerja
1. Buka terminal di root project `E:\APP-TERMINAL`
2. Load agent yang sesuai via `opencode agents create`
3. Untuk tugas coding, gunakan perintah `/vibe <intent>`
4. Untuk review kode, gunakan `/reflect`
5. Untuk audit keamanan, gunakan `/secure`

### Aturan Utama
- **SELALU** load skill sebelum bekerja di domain tertentu
- Gunakan `@code-reviewer` setelah setiap perubahan kode signifikan
- Jika mencakup 3+ domain, gunakan `@lore-master`

---

## 📚 Navigasi Dokumentasi

| # | Dokumen | Deskripsi |
|---|---------|-----------|
| 1 | [Ekosistem Agent](01-agents.md) | 11 Agent: primary & subagent, kapan digunakan, permission matrix |
| 2 | [Katalog Skill](02-skills.md) | 27 Skill dalam 8 domain: backend, frontend, database, infra, AI, mobile, security, systems |
| 3 | [Custom Commands](03-commands.md) | 7 Slash commands: `/vibe`, `/reflect`, `/architect`, `/optimize`, `/secure`, `/doc`, `/deploy` |
| 4 | [Workflow Harian](04-workflow.md) | File Loading Protocol, Self-Evaluation, Quality Gates, Vibe-to-Code Pipeline |
| 5 | [Arsitektur Sistem](05-architecture.md) | Hubungan agent ↔ skill ↔ command, config schema, permission system |
| 6 | [Panduan Kontribusi](06-contributing.md) | Menambah agent/skill/command baru, konvensi, best practices |

---

## 🧠 Filosofi Inti

### Prinsip Fondasi
1. **First-Principles Thinking** — Dekonstruksi masalah ke aksioma paling dasar, baru sintesis solusi
2. **Constraint Optimization** — Identifikasi constraints dulu (waktu, compute, memori, biaya, keamanan), baru cari solusi Pareto-optimal
3. **Systems Thinking** — Setiap teknologi adalah organisme hidup. Perubahan di satu komponen beriak ke seluruh sistem
4. **Deep Reasoning** — Gunakan Chain-of-Thought, Tree-of-Thought, dan Graph-of-Thought untuk masalah kompleks
5. **Vibe-Coding Mastery** — Terjemahkan "intent/feeling" bahasa alami langsung ke kode production-grade

### Prioritas Kualitas (Berurutan)
```
Correctness > Security > Performance > Maintainability > Developer Experience
```

---

## 🗺️ Peta Sistem Opencode

```
┌─────────────────────────────────────────────────────────────────────┐
│                         opencode.json                               │
│                    (Konfigurasi Master)                              │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │     AGENTS        │  │    COMMANDS       │  │     SKILLS       │  │
│  │   (11 agents)     │  │   (7 commands)    │  │   (27 skills)    │  │
│  │                    │  │                    │  │                   │  │
│  │ • vibe-coder      │  │ • /vibe           │  │ • backend-go      │  │
│  │ • lore-master     │  │ • /reflect        │  │ • frontend-react  │  │
│  │ • ui-god          │  │ • /architect      │  │ • database-postgres│ │
│  │ • backend-architect│  │ • /optimize      │  │ • ai-rag          │  │
│  │ • systems-shaman  │  │ • /secure         │  │ • ... (23 more)   │  │
│  │ • cloud-sage      │  │ • /doc            │  │                    │  │
│  │ • security-oracle │  │ • /deploy         │  │                    │  │
│  │ • ai-architect    │  │                    │  │                    │  │
│  │ • mobile-master   │  │                    │  │                    │  │
│  │ • math-scientist  │  │                    │  │                    │  │
│  │ • code-reviewer   │  │                    │  │                    │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                       │            │
│           └─────────────────────┼───────────────────────┘            │
│                                 │                                    │
│                          ┌──────▼──────┐                            │
│                          │  AGENTS.md   │                            │
│                          │  (Instruksi) │                            │
│                          └─────────────┘                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📖 Cara Menggunakan Dokumentasi Ini

**Jika Anda baru pertama kali**, baca urut:
1. [README.md](README.md) ← Anda di sini
2. [Arsitektur Sistem](05-architecture.md) — pahami struktur
3. [Ekosistem Agent](01-agents.md) — kenali agent-agent
4. [Workflow Harian](04-workflow.md) — cara kerja sehari-hari

**Jika Anda mencari referensi spesifik**:
- Butuh agent untuk tugas tertentu → [Ekosistem Agent](01-agents.md)
- Butuh skill untuk domain tertentu → [Katalog Skill](02-skills.md)
- Butuh command pipeline → [Custom Commands](03-commands.md)
- Ingin menambah agent/skill baru → [Panduan Kontribusi](06-contributing.md)

---

> *"The map is not the territory. Words are lossy compression of mental models. Every request is a first draft of meaning."*
> — Filosofi Understanding Skill
