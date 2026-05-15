# 04 — Workflow Harian & Protokol

> **Navigasi:** [← 03-Commands](03-commands.md) | [05-Arsitektur →](05-architecture.md)

Dokumen ini menjelaskan workflow harian untuk development menggunakan sistem Opencode:
File Loading Protocol, Self-Evaluation Protocol, Vibe-to-Code Pipeline, dan aturan operasional.

---

## Alur Kerja Standar

```
┌─────────────────────────────────────────────────────────────────────┐
│                      USER INPUT (request/task)                       │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 1: UNDERSTANDING                                               │
│  - Load skill `understanding`                                        │
│  - Jalankan pipeline: Intent → Context → Constraint → Assumption      │
│  - Konfirmasi pemahaman sebelum bertindak                            │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 2: PLANNING                                                    │
│  - Load skill `workflow-general`                                     │
│  - Pilih agent yang tepat (lihat Agent Selection Heuristic)          │
│  - Tentukan approach: single agent vs multi-agent orchestration     │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 3: SKILL LOADING                                               │
│  - Load domain-specific skills yang relevan                          │
│  - Jangan load skill yang tidak diperlukan                           │
│  - Untuk cross-domain: load multiple skills                          │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 4: IMPLEMENTATION                                              │
│  - Eksekusi dengan domain best practices                             │
│  - Gunakan dispatch subagent jika perlu                              │
│  - Ikuti prinsip: correctness > security > performance >             │
│    maintainability > developer experience                            │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 5: SELF-EVALUATION                                             │
│  - Invoke @code-reviewer atau gunakan /reflect                       │
│  - Score 6 dimensi (target ≥ 80 di semua)                            │
│  - Jika skor < 80 di dimensi apapun → iterasi dan fix                │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 6: DEPLOY (jika applicable)                                    │
│  - Gunakan /deploy untuk progressive delivery                        │
│  - Monitor: error rate, latency, SLO                                 │
│  - Siapkan rollback jika diperlukan                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## File Loading Protocol (WAJIB)

> **CRITICAL**: Saat memulai tugas baru, tentukan domain dan load skill yang relevan.

### Protokol

1. **Kenali domain tugas** — Backend? Frontend? Database? AI? Multi-domain?
2. **Load skill SEBELUM menulis kode** — Gunakan `skill` tool, bukan setelah
3. **Untuk cross-domain tasks** — Load multiple skills
4. **Skill selalu dari `.opencode/skills/<name>/SKILL.md`**
5. **Dua skill prekondisi**: `understanding` dan `workflow-general`

### Contoh

```
Tugas: "Buat REST API untuk user management dengan Go dan PostgreSQL"

Step 1: Load understanding → pahami requirements
Step 2: Load workflow-general → rencanakan approach
Step 3: Load backend-go + database-postgres → implementasi
Step 4: Setelah selesai → invoke @code-reviewer
```

### Anti-Pattern

```
❌ SALAH: Mulai coding tanpa load skill apapun
❌ SALAH: Load skill setelah kode sudah setengah jadi
❌ SALAH: Load semua 27 skill "just in case"
✅ BENAR: Load understanding → identifikasi domain → load skill spesifik → eksekusi
```

---

## Self-Evaluation Protocol

> Setelah setiap perubahan kode signifikan, jalankan self-evaluation.

### Protokol

1. **Invoke** @code-reviewer via `/reflect` atau @mention langsung
2. **Score** 6 dimensi: Correctness, Performance, Security, Maintainability, Completeness, Alignment
3. **Jika ada dimensi < 80**: Iterasi dan perbaiki
4. **Dokumentasikan** semua hasil evaluasi

### 6 Dimensi Detail

#### 1. Correctness (Bobot 25%)
- Kode benar mengimplementasi requirements specification?
- Edge cases tertangani? (empty, null, boundary, overflow, concurrency)
- Error states properly managed?
- Data transformations logically correct?

| Skor | Arti |
|------|------|
| 100 | Provably correct, semua edge cases covered |
| 80 | Correct for known cases, minor edge cases mungkin untested |
| 60 | Mostly correct, known edge cases unhandled |
| 40 | Has logical errors |
| 20 | Fundamentally incorrect approach |

#### 2. Performance (Bobot 15%)
- Time complexity: algoritma optimal dipilih?
- Space complexity: memory usage appropriate?
- I/O efficiency: batching, caching, connection pooling?
- Frontend: Core Web Vitals passing? 60fps maintained?
- Database: Query plans optimal? Indexes used?

| Skor | Arti |
|------|------|
| 100 | Optimal Big-O, profiled and verified |
| 80 | Good performance, minor optimization possible |
| 60 | Acceptable, known N+1 atau O(n²) |
| 40 | Significant performance issues |
| 20 | Severe performance problems |

#### 3. Security (Bobot 20%)
- Input validation: Semua input disanitasi dan divalidasi?
- Auth/AuthZ: Proper access control?
- Data exposure: Secrets, PII, sensitive data handled correctly?
- Injection: SQL, NoSQL, command, XSS, path traversal?
- Dependencies: Known vulnerabilities?

| Skor | Arti |
|------|------|
| 100 | OWASP Top 10 all addressed |
| 80 | Secure, minor hardening possible |
| 60 | Some security considerations missing |
| 40 | Known vulnerability patterns |
| 20 | Critical security flaws |

#### 4. Maintainability (Bobot 15%)
- Readability: Clear naming, consistent style, appropriate comments?
- Modularity: Single responsibility, separation of concerns?
- Testability: Code structured for easy testing?
- Documentation: Complex logic explained?
- Coupling/Cohesion: Low coupling, high cohesion?

| Skor | Arti |
|------|------|
| 100 | Self-documenting, perfectly structured |
| 80 | Well-structured, minor clarity improvements |
| 60 | Readable but could be refactored |
| 40 | Hard to understand |
| 20 | Spaghetti code |

#### 5. Completeness (Bobot 15%)
- Semua requirements diimplementasi?
- Error handling comprehensive?
- Logging dan observability in place?
- Types/validation complete?
- Configuration dan environment handled?

| Skor | Arti |
|------|------|
| 100 | Every requirement met |
| 80 | All main features, minor details missing |
| 60 | Core functionality, some features incomplete |
| 40 | Significant gaps |
| 20 | Barely addresses requirements |

#### 6. Alignment (Bobot 10%)
- Output match original intent/"vibe"?
- Implicit requirements satisfied?
- Solves the right problem?
- UX coherent?

| Skor | Arti |
|------|------|
| 100 | Perfectly captures intent |
| 80 | Good alignment, minor differences |
| 60 | Partially aligned |
| 40 | Significant misalignment |
| 20 | Solved wrong problem |

### Rumus Skor Akhir
```
Overall = (C × 0.25) + (P × 0.15) + (S × 0.20) + (M × 0.15) + (Cp × 0.15) + (A × 0.10)
```

---

## Vibe-to-Code Pipeline (Detail)

Pipeline dari intent bahasa alami ke production code:

```
┌──────────────────────────────────────────────────────────────┐
│ STAGE 1: INTENT ANALYSIS                                     │
│                                                               │
│ • Parse natural language intent                              │
│ • Identifikasi domain, tech stack, core requirements         │
│ • Ekstrak constraints (performance, security, scalability)   │
│ • Identifikasi edge cases dan failure modes                  │
│                                                               │
│ Gate A: @code-reviewer evaluasi                              │
│ Gate B: Apakah ini capture what user MEANS, not just SAYS?   │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STAGE 2: SPECIFICATION                                       │
│                                                               │
│ • Pilih tech stack optimal berdasarkan constraints           │
│ • Desain arsitektur: component decomposition, data flow      │
│ • Pilih design patterns dan paradigm                         │
│ • Define data models, database schema, state management      │
│ • Define error handling strategy, logging, observability     │
│ • Output: Technical spec + ASCII architecture diagram        │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STAGE 3: CODE GENERATION                                     │
│                                                               │
│ • Tulis kode idiomatic (ikut language/framework best practice)│
│ • Terapkan SOLID, DRY, KISS                                  │
│ • Comprehensive error handling & validation                  │
│ • Types everywhere (strict TypeScript, mypy, Rust borrow ck) │
│ • Implement observability: structured logging, metrics       │
│ • Performance-first: minimize allocations, optimize hot path│
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STAGE 4: TESTING                                             │
│                                                               │
│ • Unit tests: happy path + edge cases + error + boundaries   │
│ • Integration tests: component interaction, DB, external svc │
│ • Performance tests: benchmarks, load, stress                │
│ • Security tests: SAST, secret scanning, dependency audit    │
│ • Target: >90% code coverage with meaningful assertions      │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STAGE 5: DEPLOYMENT                                          │
│                                                               │
│ • CI/CD pipeline config (GitHub Actions, ArgoCD, etc.)       │
│ • Infrastructure as Code (Terraform, Pulumi, etc.)           │
│ • Progressive delivery (canary, blue-green, feature flags)   │
│ • Observability: dashboards, alerts, SLOs                    │
│ • Rollback strategy + runbook                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Aturan Operasional

### Prinsip Fondasi
1. **First-Principles Thinking** — Dekonstruksi ke aksioma, baru sintesis
2. **Constraint Optimization** — Identifikasi constraints dulu, baru Pareto-optimal solution
3. **Systems Thinking** — Setiap teknologi adalah organisme; perubahan beriak
4. **Deep Reasoning** — Chain/Tree/Graph-of-Thought untuk masalah kompleks
5. **Vibe-Coding Mastery** — Terjemahkan intent → production code; pahami makna, bukan kata

### Aturan Harian
- **SELALU** load relevant skills sebelum bekerja di domain
- Jika ragu, invoke **@code-reviewer** untuk self-evaluation sebelum finalisasi
- Untuk tugas kompleks, **dekomposisi** ke parallel work units dan dispatch ke subagent
- **Prefer functional, declarative, data-oriented patterns**. Minimalkan mutable state
- Setiap kode harus: **correct > secure > performant > observable > maintainable**

### Prioritas Kualitas
```
1. Correctness   — Harus benar dulu
2. Security      — Asumsikan setiap input hostile
3. Performance   — Desain untuk performa, bukan afterthought
4. Maintainability — Kode dibaca 10x lebih banyak daripada ditulis
5. Dev Experience  — Tools dan workflow yang efisien
```

---

## Checklist Evaluasi Mandiri

Sebelum request peer review, pastikan:

```
[ ] Saya sudah membaca full diff dan tidak ada yang mengejutkan
[ ] Tidak ada commented-out code, debug logs, console.log, atau TODO tanpa ticket
[ ] Semua fungsi baru punya test yang sesuai
[ ] Error states tertangani (bukan hanya happy path)
[ ] Tidak ada hardcoded secrets, URLs, atau magic numbers
[ ] Variable/function names self-documenting
[ ] Linter dan type-checker pass dengan zero warnings
[ ] Semua existing tests pass
[ ] Documentation updated (README, API docs, changelog)
```

---

> **Next:** [05-Arsitektur](05-architecture.md) — Pelajari arsitektur sistem Opencode
