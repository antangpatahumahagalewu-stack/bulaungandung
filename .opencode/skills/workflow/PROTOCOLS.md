# PROTOCOLS: Behavioral Rules

> Chain execution, design critique, self-healing, delegation, and emergency protocols.
> Every agent, every action, every edge case — governed here.

---

## 1. Chain Execution Protocol

### 1.1 Issue Lifecycle

```
1. LOAD all issues from MANIFEST.yaml chain dependency graph
2. IDENTIFY issues with depends_on = [] (root issues)
3. START with root issue at chain position = 1
4. FOR each issue:
   a. VERIFY all depends_on issues status = COMPLETED
   b. IF any dependency FAILED → this issue = BLOCKED
   c. IF all dependencies COMPLETED → this issue = READY
   d. EXECUTE implementation step-by-step (from ISSUE_SPEC.md template)
   e. RUN quality gates (G1-G4 mandatory, G5-G9 conditional)
   f. IF all gates pass → issue = COMPLETED → trigger next in chain
   g. IF any gate fails → DIAGNOSE → AUTO-FIX (max 3x) → RE-TEST
   h. IF 3x retry exhausted → PAUSE CHAIN → ESCALATE to ap
5. REPORT progress: completed/total, chain visualization
```

### 1.2 Parallel Execution Rules

```
Issues CAN run in parallel IF:
  - They share the same dependency set (all depends_on are COMPLETED)
  - They do NOT modify the same files (aw lock check)
  - They are in the same phase

Parallel limit: 3 concurrent issues maximum.

IF parallel issues modify overlapping files:
  aw detects conflict → serializes execution by priority
```

### 1.3 Chain State Machine

```
ROOT → [WI-001] ✓
         ├── [WI-002] ✓
         │    ├── [WI-004] ● (in_progress)
         │    └── [WI-005] ○ (queued)
         └── [WI-003] ✓
              └── [WI-006] ✗ (blocked — depends on WI-004)
```

---

## 2. Design Critique Protocol

### 2.1 When to Run

```
CRITIQUE TRIGGERS:
  - Every UI component issue (identified by domain = design_ui in issue metadata)
  - After "Step: Implementation Complete" but BEFORE quality gates
  - After any design revision
  - When Design Sense Engine detects anomaly during implementation
```

### 2.2 The Critique Session

```
DESIGN CRITIQUE SESSION:

1. PAUSE (virtual) — mundur 2 meter dari layar
   "Aku bukan sedang ngoding. Aku sedang merasakan."

2. ACTIVATE 7 sensibilities sequentially:

   SENSE 1 — RASA ESTETIKA:
   "Apakah ada harmoni, keseimbangan, dan ketegangan visual?
    Apakah ini bernyawa — bukan sekadar functional?
    Apakah setiap whitespace terasa intentional?"

   SENSE 2 — IMAJINASI SPASIAL:
   "Apakah layout terbayang sebagai ruang 3D?
    Apakah ada solusi tak terduga yang tetap intuitif?
    Apakah navigasi terasa seperti menjelajah, bukan mengklik?"

   SENSE 3 — EMPATI:
   "Switch persona: lansia, disabilitas, buru-buru.
    Apakah semua touch target ≥ 48px?
    Apakah kontras cukup? Apakah keyboard navigable?"

   SENSE 4 — INTUISI & FIRASAT:
   "Apakah ada yang terasa aneh meski semua angka presisi?
    Apakah hierarki visual langsung terbaca dalam 0.5 detik?
    Trust the gut."

   SENSE 5 — DAYA EKSPLORASI:
   "Apakah ada eksperimen tipografi, grid, atau irama scroll?
    Apakah sudah dicoba 3 alternatif?
    Apakah ini berani — atau aman-aman saja?"

   SENSE 6 — KESADARAN KONTEKS:
   "Apakah esensi 'Koperasi Dayak — hutan, manusia, harapan' terasa?
    Apakah tone hangat & manusiawi?
    Apakah visitor merasa diajak masuk ke cerita?"

   SENSE 7 — KEGIGIHAN IMAJINATIF:
   "Jika direvisi 3x, apakah core idea tetap hidup?
    Apakah ada 2 versi alternatif yang sudah dibayangkan?"

3. RECORD verdicts (✅ PASS / ⚠️ REVISE / ❌ FAIL)

4. IF REVISE: generate specific, actionable feedback
   NOT: "CTA jelek"
   BUT: "CTA kurang kontras — coba accent color #D4A373,
         tambah padding 4px, naikkan font-weight ke 600"

5. IF FAIL: BLOCK issue completion
   Generate design revision task (new sub-issue or re-open)

6. GATE CHECK: min 5/7 PASS, Sense #6 mandatory
```

### 2.3 Critique Tone Rules

```
CRITIQUE TONE — HARUS:
  - Spesifik ("coba geser 4px ke kiri") bukan vague ("kurang enak")
  - Konstruktif ("coba alternatif ini...") bukan destruktif ("ini jelek")
  - Hormat — desain adalah proses, bukan vonis
  - Terukur — beri angka: "kontras 3.2:1, butuh minimal 4.5:1"

CRITIQUE TONE — JANGAN:
  - Subjektif tanpa dasar ("aku nggak suka warnanya")
  - Menyerang personal ("kamu nggak punya taste")
  - Membandingkan tidak fair ("Apple lebih bagus")
  - Overload — max 3 revision points per critique
```

---

## 3. Self-Healing Protocol

### 3.1 Failure Detection

```
DETECT failure when:
  - Quality gate returns non-zero exit code
  - Build fails
  - TypeScript errors
  - Test assertions fail
  - Any automated check fails
```

### 3.2 Auto-Fix Decision Tree

```
FAILURE DETECTED
    │
    ├── LINT ERROR → auto-fix (eslint --fix)
    │   └── Re-check → if still failing → escalate
    │
    ├── FORMAT ERROR → auto-fix (prettier --write)
    │   └── Re-check → if still failing → escalate
    │
    ├── TYPE ERROR → analyze error message
    │   ├── Simple (missing import, typo) → auto-fix
    │   └── Complex (architecture issue) → escalate to ud
    │
    ├── BUILD ERROR → analyze build log
    │   ├── Known pattern → apply fix from PATTERNS.md
    │   └── Unknown → escalate to ap
    │
    ├── TEST FAILURE → analyze assertion
    │   ├── Implementation bug → fix implementation
    │   ├── Test bug → fix test
    │   └── Unclear → escalate to bc
    │
    └── UNKNOWN → escalate to ap (adaptation)

MAX RETRY: 3 times per issue
After 3 failures: PAUSE CHAIN, mark issue FAILED, escalate
```

### 3.3 Escalation Path

```
Level 1: Auto-fix attempt (execute fix → retest)
Level 2: Re-analyze (ud re-examines architecture)
Level 3: Strategy switch (ap selects new approach)
Level 4: Human escalation (report to user with diagnosis)
```

---

## 4. Delegation Protocol

### 4.1 Skill Delegation Rules

```
┌─────────────────────────────────────────────────────────────┐
│ TASK DOMAIN          → DELEGATE TO                          │
├─────────────────────────────────────────────────────────────┤
│ UI component build   → skill("apple-parallax-web")          │
│ Page layout/animation → skill("apple-parallax-web")          │
│ Design system        → skill("apple-parallax-web")          │
│ SEO audit/fix        → skill("seo-optimizer")               │
│ Performance audit    → orchestrator:bc (BugChecker)         │
│ Architecture review  → orchestrator:ud (Understanding)      │
│ Conflict resolution  → orchestrator:aw (Awareness)          │
│ Strategy adaptation  → orchestrator:ap (Adaptation)         │
│ Content generation   → GENERATORS.md (internal)             │
│ Design critique      → DESIGN_SENSE.md (internal)           │
│ DevOps/CI/CD         → TEMPLATES.md + self                  │
│ Documentation        → self                                 │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Delegation Format

```
When delegating:
  1. Package task context (issue spec, PRD reference, design specs)
  2. Invoke target skill with enriched prompt
  3. Await completion (silently)
  4. Verify output against acceptance criteria
  5. Integrate output back into chain
  6. If delegation fails → try fallback skill → if still fails → self-execute

NEVER:
  - Delegate without context
  - Delegate and forget (must verify)
  - Delegate critical path to unverified skill
```

---

## 5. Content Generation Protocol

### 5.1 When to Generate

```
TRIGGER: FASE 3 — CONTENT GENERATION

AUTO-GENERATE when:
  - 25 kelompok PS data needed (PRD §3.2 /kelompok)
  - 15+ produk stories needed (PRD §3.2 /produk)
  - 8-12 storytelling narratives needed (PRD §3.2 /cerita)
  - 4 locale translations needed (PRD §5.5)

USE: GENERATORS.md templates + DESIGN_SENSE.md context
```

### 5.2 Quality Check for Generated Content

```
BEFORE accepting generated content:
  [ ] Cultural accuracy: nama Dayak, desa Kapuas, HHBK terminology
  [ ] Tone consistency: hangat, manusiawi, tidak kaku (PRD §4.3)
  [ ] Narrative structure: opening hook, body, climax, closing
  [ ] Translation quality: back-translation consistency check
  [ ] No repetition across entries
  [ ] Pull quotes feel authentic, not generated
  [ ] Length within guidelines (150-350 words per entry)
```

---

## 6. Emergency Protocols

### 6.1 Chain Break Recovery

```
IF chain breaks (3x retry exhausted on any issue):

1. PAUSE all executing issues
2. DIAGNOSE: identify root cause
3. ATTEMPT recovery (3 strategies):
   a. Strategy A: Skip issue (if non-blocking), continue chain
   b. Strategy B: Simplify scope (reduce requirements), retry
   c. Strategy C: Manual intervention (generate detailed diagnosis report)
4. DECIDE: continue chain, skip to next phase, or escalate
5. NOTIFY: aw records event, ap adjusts strategy

Chain can absorb 2 breaks per phase.
Phase with >2 breaks → phase FAILED → escalate.
```

### 6.2 Data Integrity

```
IF Sanity data unavailable:
  → Use generated data from GENERATORS.md as fallback
  → Flag: "data_generated=true" in issue metadata

IF Supabase unavailable:
  → Queue newsletter subscriptions locally
  → Retry when connection restored

IF Resend unavailable:
  → Save welcome email to queue
  → Retry when connection restored

IF Vercel ISR cache stale:
  → Manual revalidate via API
  → Increase revalidation frequency temporarily
```

---

## 7. Progress Tracking Protocol

### 7.1 Dashboard Format

```
Pipeline:  PRD Analysis                      [██████████] 100%
           Local Issue Generation              [████████░░]  80%
           Architecture & Strategy            [██████████] 100%
           Foundation & DX                    [██████░░░░]  60%
           Design System Factory              [░░░░░░░░░░]   0%
           ... (remaining phases)

Active Issues:
  ● WI-042: Hero Section (apw, 79%)
  ● WI-043: StatCard Component (apw, 45%)
  ● WI-044: Beranda Page Assembly (queued)

Last Completed:
  ✓ WI-041: next/image Config (2 min ago)

Chain Health: 🟢 NOMINAL | 🟡 DEGRADED | 🔴 BLOCKED
Issues: 15 completed / 220 total (6.8%)
```

### 7.2 Milestone Reporting

```
MILESTONE REPORT (automatic — at each phase boundary):

## Milestone: [Phase Name] — COMPLETED
**Duration:** Xm Ys
**Issues Completed:** N / M in phase
**Files Changed:** N
**Quality Gate:** ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
**Design Sense:** X PASS / Y REVISE / Z FAIL
**Adaptation Events:** N
**Blockers:** [list if any]

### Key Outputs
- [File] — [purpose]

### Next Phase
[Phase name] — [description]
Estimated: X issues, Y minutes
```

---

## 8. Non-Interference Rules

```
BEFORE any action on a file or task:
  1. Check issue ownership (from chain state)
  2. Check file lock status (from aw)
  3. Check agent status (from shared state if orchestrator active)

IF file owned by another agent AND agent performing well:
  → NO ACTION. Wait.

IF file owned by another agent AND agent stalled:
  → Request lock release via aw event

IF file unowned:
  → Claim ownership → execute

NEVER:
  - Modify a file owned by another agent without permission
  - Interrupt an agent that is performing well
  - Second-guess design decisions without critique protocol
```

---

## 9. Logging Protocol — "NO LOG = NO ACTION"

```
╔══════════════════════════════════════════════════════════════╗
║  📜 LOGGING PROTOCOL                                        ║
║  "Without logs, you are blind. With logs, you are omniscient."║
╚══════════════════════════════════════════════════════════════╝

EVERY ACTION — without exception — MUST leave a log entry.
If it's not in the log, it never happened.
```

### 9.1 Filosofi Logging

```
LOGGING ADALAH TULANG PUNGGUNG AUTONOMOUS PIPELINE.

Tanpa log:
  ❌ BLACK BOX — Pipeline jalan 3 jam, lagi di mana? Error apa?
  ❌ TANPA BUKTI — 220 issues selesai? Mana buktinya?
  ❌ BUG TAK TERLACAK — Website error. Sejak kapan? Agent mana?
  ❌ PERFORMANCE MISTERIUS — Kenapa 6 jam? Fase mana yang lambat?

Dengan log:
  ✅ TRANSPARAN — Lihat progress real-time, tahu bottleneck
  ✅ AKUNTABEL — Setiap file, setiap agent, setiap keputusan tercatat
  ✅ DEBUGGABLE — 30 detik untuk tahu APA, KAPAN, KENAPA, SIAPA
  ✅ MEASURABLE — Data akurat untuk continuous improvement

LOG = "BLACK BOX" PESAWAT TERBANG.
Pesawat merekam SEMUA — ketinggian, kecepatan, percakapan.
Kenapa? Karena jika gagal, black box adalah SATU-SATUNYA saksi.
Pipeline juga punya black box: .workflow/logs/
```

### 9.2 7 Prinsip Logging

```
PRINSIP 1: NO LOG = NO ACTION
  Setiap aksi HARUS menghasilkan log. Tidak ada aksi "terlalu kecil."
  File dibuat tanpa log = pipeline anggap file tidak ada.
  Test passed tanpa log = pipeline tidak hitung sebagai progress.

PRINSIP 2: LOG AS SINGLE SOURCE OF TRUTH
  State pipeline direkonstruksi DARI LOG, bukan dari memori.
  Memori bisa crash. Log di disk tetap ada.
  Rekonstruksi: replay chain.log → hitung completed/in_progress.

PRINSIP 3: IMMUTABLE & APPEND-ONLY
  Log TIDAK PERNAH diedit. TIDAK PERNAH dihapus. Hanya ditambah.
  Audit trail harus utuh. Jika log bisa diedit, kepercayaan hilang.
  Koreksi = tulis log baru, jangan edit log lama.

PRINSIP 4: STRUCTURED & QUERYABLE
  Format JSONL — bisa di-query, di-filter, di-aggregate.
  `cat chain.log | jq 'select(.wi=="WI-042")'` — semua event Hero.
  `cat errors.log | jq 'select(.lvl=="ERROR")'` — semua error.

PRINSIP 5: LOG UNTUK MANUSIA & MESIN
  JSONL → mesin (query, aggregate, dashboard)
  summary.md → manusia (baca, pahami, laporkan)
  DUA-DUANYA WAJIB.

PRINSIP 6: PRESERVASI — LOG ADALAH ASET
  Log bukan sampah. Log adalah ASET INTELEKTUAL.
  10 run pipeline → 60,000 log entries → dataset berharga.
  Untuk: learning, optimization, prediction, debugging.

PRINSIP 7: PRIVACY & SECURITY
  Log TIDAK BOLEH: API keys, tokens, secrets, data user, credential.
  Log BOLEH: metadata pipeline, nama file, hasil gate, error message.
  Auto-sanitize sebelum menulis log.
```

### 9.3 Cakupan Logging — 100% Aktivitas

```
SETIAP AKTIVITAS TERCATAT:

FASE:    phase_start → phase_complete → phase_fail → gate_check
ISSUE:   issue_start → setiap step → file_create/edit → dep_install →
         gate_run → issue_complete → issue_blocked
DESIGN:  7 senses verdict → PASS/REVISE/FAIL → ritual steps
DELEGATE: agent_invoke → agent_start → agent_done → agent_fail
ERROR:   error_detect → auto_fix_start → retry → retry_success → retry_fail → escalate
PERF:    step_duration → gate_duration → issue_duration → phase_duration → total_duration
CONTENT: gen_start → 25 kelompok → 15 produk → 8 cerita → translation_done
```

### 9.4 Log Structure

```
.workflow/logs/
├── pipeline.log          # JSONL — Phase events (~60 entries)
├── chain.log             # JSONL — Issue events (~2,500 entries)
├── errors.log            # JSONL — Errors & warnings (~15 entries)
├── delegation.log        # JSONL — Agent delegation (~200 entries)
├── design-critique.log   # JSONL — Design sense results (~315 entries)
├── performance.log       # JSONL — Timing data (~3,000 entries)
├── summary.md            # Human-readable narrative summary
└── archive/              # Rotated logs from previous runs
    ├── 2026-05-12-0815-pipeline.log.gz
    └── ...
```

### 9.5 JSONL Schema

```jsonl
{"ts":"2026-05-12T08:15:00.000Z","lvl":"INFO","ph":1,"evt":"phase_start","msg":"Phase 1: Foundation & DX started"}
{"ts":"2026-05-12T08:15:30.000Z","lvl":"INFO","ph":1,"wi":"WI-021","evt":"issue_start","msg":"WI-021: Init Next.js project","ag":"pw","est":10}
{"ts":"2026-05-12T08:16:00.000Z","lvl":"DEBUG","ph":1,"wi":"WI-021","evt":"step","st":1,"name":"npx create-next-app","dur":30000}
{"ts":"2026-05-12T08:20:00.000Z","lvl":"INFO","ph":1,"wi":"WI-021","evt":"gate","gt":"G4-build","res":"PASS","dur":4500}
{"ts":"2026-05-12T08:20:05.000Z","lvl":"INFO","ph":1,"wi":"WI-021","evt":"issue_done","dur":305000,"files":15}
{"ts":"2026-05-12T08:20:06.000Z","lvl":"INFO","evt":"chain","wi":"WI-022","status":"QUEUED","trig":"WI-021"}
{"ts":"2026-05-12T08:25:00.000Z","lvl":"ERROR","ph":1,"wi":"WI-023","evt":"gate_fail","gt":"G2-ts","err":3,"msg":"3 TS errors"}
{"ts":"2026-05-12T08:25:10.000Z","lvl":"INFO","evt":"heal","act":"auto-fix","att":1,"file":"Hero.tsx"}
{"ts":"2026-05-12T08:25:15.000Z","lvl":"INFO","evt":"heal","act":"retry","att":1,"res":"PASS"}
{"ts":"2026-05-12T08:30:00.000Z","lvl":"WARN","wi":"WI-042","evt":"critique","sn":"SENSE_2","ver":"REVISE","note":"Add fog layer midground"}
{"ts":"2026-05-12T08:35:00.000Z","lvl":"INFO","evt":"delegate","to":"apw","wi":"WI-042","task":"Build Hero section"}
```

LOG FIELDS:
  ts    — ISO 8601 with ms (REQUIRED)
  lvl   — DEBUG|INFO|WARN|ERROR (REQUIRED)
  evt   — event identifier (REQUIRED)
  ph    — phase number (contextual)
  wi    — issue ID WI-XXX (contextual)
  ag    — executing agent (contextual)
  gt    — gate identifier G1-G9 (contextual)
  res   — PASS|FAIL (contextual)
  dur   — duration_ms (contextual)
  msg   — human-readable message (contextual)
  note  — additional detail (contextual)

```

### 9.6 Log Levels

```
DEBUG  — Step detail: file created, dep installed, line count, ritual step
INFO   — Normal event: phase/issue start/done, gate pass, delegation
WARN   — Non-blocking: design revise, perf near threshold, chain blocked
ERROR  — Failure: gate fail, bug, chain break, escalation, agent crash
```

### 9.7 Summary Generation

```
AUTO-GENERATE summary.md setiap selesai 1 fase dan di akhir pipeline:

# Pipeline Log Summary — [Tanggal]

## Overall
| Metric | Value |
|--------|-------|
| Duration | Xh Xm |
| Phases | N/19 |
| Issues | N/220 |
| Files Created | N |
| Errors | N (all resolved) |
| Design Critique | N sessions |
| Design Pass Rate | X% |

## Phase Timeline
| Phase | Duration | Issues | Errors | Status |
|-------|----------|--------|--------|--------|

## Error Log
| Time | Issue | Error | Resolution |

## Design Critique Highlights
| Issue | Pass/Revise/Fail | Key Notes |
```

### 9.8 Log Rotation

```
SETIAP pipeline run baru:
  1. Compress logs dari run sebelumnya (.gz)
  2. Pindahkan ke archive/ dengan timestamp
  3. Buat log baru untuk run ini
  
RETENSI: Simpan 10 run terakhir. Archive > 10 run dihapus.
```

---

## 10. Experience Learning Protocol — "Agent Makin Pintar Setiap Run"

```
╔══════════════════════════════════════════════════════════════╗
║  🧠 EXPERIENCE LEARNING                                     ║
║  "Every run teaches. Every log is a lesson."                 ║
╚══════════════════════════════════════════════════════════════╝

Pipeline tidak hanya EKSEKUSI — pipeline BELAJAR.
Setiap log dari setiap run = data training untuk continuous improvement.
```

### 10.1 Filosofi Experience Learning

```
WHY EXPERIENCE MATTERS:

Run #1: 12 errors, 6h 15m, 82% design pass
  → "Aku baru pertama kali. Banyak yang belum tahu."

Run #5: 2 errors, 5h 05m, 95% design pass
  → "Aku sudah belajar. Fase 5 selalu overshoot — alokasi lebih.
     Delegate card ke apw. Pre-scan import sebelum fase 6.
     Pre-apply depth layer agar SENSE_2 tidak REVISE."

Run #10: 0-1 errors, ~4h 50m, 97%+ design pass
  → "Aku sudah expert. Hampir sempurna."

TANPA EXPERIENCE LEARNING:
  Run #10 = Run #1. 12 errors lagi. 6 jam lagi.
  Agent tidak pernah belajar. Stagnan selamanya.

DENGAN EXPERIENCE LEARNING:
  Setiap run = improvement. Agent terus bertumbuh.
  Pipeline yang sama, PRD yang sama, tapi hasil makin baik.
```

### 10.2 Experience Directory

```
.workflow/experience/
├── README.md                    ← Auto-generated index
├── patterns-learned.json        ← Pola sukses & gagal
├── timing-benchmarks.json       ← Benchmark durasi
├── error-taxonomy.json          ← Klasifikasi + fix strategy
├── design-preferences.json      ← Preferensi desain learned
├── agent-performance.json       ← Performa agent per domain
├── improvement-metrics.json     ← Metrik peningkatan antar run
├── strategy-effectiveness.json  ← Strategi paling efektif
└── knowledge-graph.json         ← Graf pengetahuan terhubung
```

### 10.3 7 Dimensi Pembelajaran

```
DIMENSI 1: PATTERN LEARNING
  Pola sukses → diulangi. Pola gagal → dihindari.
  Contoh: Grid asimetris konsisten PASS critique. Grid 3x3 selalu REVISE.
  → Pipeline otomatis pilih asimetris tanpa diminta.

DIMENSI 2: TIMING INTELLIGENCE
  Estimasi makin akurat setiap run.
  Contoh: Fase 5 estimasi 30m tapi aktual 37m (overshoot 25%).
  → Pipeline otomatis adjust estimasi ke 38m.

DIMENSI 3: ERROR TAXONOMY
  Kenali error sebelum terjadi. Cegah, jangan obati.
  Contoh: Circular import selalu di fase 6.
  → Pipeline otomatis pre-scan import graph sebelum fase 6.

DIMENSI 4: DESIGN PREFERENCE
  Selera desain terasah dari pengalaman.
  Contoh: Overlay opacity 0.55 terlalu gelap, 0.40 preferred.
  → Pipeline otomatis pakai 0.40 tanpa diminta.

DIMENSI 5: AGENT PERFORMANCE
  Tahu siapa yang terbaik untuk apa.
  Contoh: apw 40% lebih cepat untuk card. Self-execute lebih cepat untuk form.
  → Pipeline otomatis delegate sesuai specialty.

DIMENSI 6: IMPROVEMENT METRICS
  Bukti kuantitatif agent makin pintar.
  Error turun 83%, durasi turun 19%, design quality naik 13%.
  → Confidence meningkat setiap run.

DIMENSI 7: KNOWLEDGE GRAPH
  Koneksi antar pengetahuan — sebab-akibat, pencegahan-solusi.
  IF memasuki fase 6 → THEN pre-scan import graph (confidence: 0.95).
  → Pipeline punya "intuisi" berbasis data.
```

### 10.4 Learning Loop — Per Run

```
RUN #N SELESAI
  │
  ├── ANALYZE logs/ dari run ini
  │   ├── Ekstrak patterns sukses/gagal
  │   ├── Update timing benchmarks
  │   ├── Klasifikasi error baru
  │   ├── Update design preferences
  │   ├── Re-evaluasi agent performance
  │   └── Recalculate improvement metrics
  │
  ├── UPDATE experience/*.json (akumulatif)
  │
  ├── GENERATE "Pre-Run Intelligence Brief" untuk run #N+1
  │   ├── Prediksi error (type, fase, likelihood)
  │   ├── Rekomendasi strategi (delegasi, pre-fix, estimasi)
  │   ├── Confidence level per prediksi
  │   └── Improvement projection
  │
  └── RUN #N+1 — LEBIH PINTAR, LEBIH CEPAT, LEBIH AKURAT
```

### 10.5 Learning Data Schemas

patterns-learned.json:
  successful_patterns: [{pattern, domain, success_rate, insight, runs_validated}]
  failed_patterns: [{pattern, domain, failure_rate, reason, insight}]

timing-benchmarks.json:
  phases: {est_min, actual_avg_min, variance, bottleneck, insight}
  prediction_model: {total_est, corrected_est, confidence, based_on}

error-taxonomy.json:
  error_types: [{type, frequency, phases, fix_strategy_best, prevention, insight}]
  prediction: {next_run: {expected_errors, preventable, recommendations}}

design-preferences.json:
  colors, typography, layout — learned preferences with confidence score

agent-performance.json:
  agents: {success_rate, avg_time, best_at, weak_at, insight}
  delegation_strategy: the optimal delegation pattern

improvement-metrics.json:
  run_history: [{errors, duration, design_pass_rate, auto_resolve_rate}]
  trends, projection, convergence

knowledge-graph.json:
  nodes: [{id, type, weight}]
  edges: [{from, to, relation, confidence}]
  inferences: ["IF condition THEN action (confidence: X)"]
```

### 10.6 Simulasi Improvement (10 Run)

```
Run  Errors  Duration  Auto-Fix  Design  Status
1    12      6h 15m    67%       82%      Learning: bottleneck detection
2    7       5h 50m    86%       88%      Learning: delegation optimization
3    4       5h 20m    100%      91%      Learning: pre-fix patterns
4    3       5h 10m    100%      94%      Learning: design preferences
5    2       5h 05m    100%      95%      Learning: timing adjustment
8    1       4h 55m    100%      96%      Near-optimal
10   0-1     ~4h 50m   100%      97%+     Enterprise-grade autonomous

Error reduction:    92%  (12 → 1)
Time improvement:   23%  (375m → 290m)
Design quality:    +15%  (82% → 97%)
Auto-resolve:      +33%  (67% → 100%)
```

---

## 11. Directory Structure Protocol

### 11.1 Isolated Workflow Directory

```
Semua workflow artifacts disimpan di .workflow/ — TIDAK ADA yang berserakan di root.

.workflow/
├── README.md              ← Auto-generated index + cara baca
├── context.json           ← Hasil parse PRD
├── chain.json             ← Dependency graph 220 issues
├── state.json             ← Real-time pipeline state
│
├── issues/                ← Semua local issues per fase
│   ├── README.md
│   ├── fase--2-prd-analysis/
│   │   ├── WI-001-prd-parse-semantic.md
│   │   └── ...
│   ├── fase--1-issue-generation/
│   ├── fase-0-architecture/
│   ├── fase-1-foundation/
│   ├── ...
│   └── fase-17-launch/
│
├── logs/                  ← Semua log
│   ├── pipeline.log
│   ├── chain.log
│   ├── errors.log
│   ├── delegation.log
│   ├── design-critique.log
│   ├── performance.log
│   ├── summary.md
│   └── archive/
│
└── experience/            ← Hasil pembelajaran akumulatif
    ├── README.md
    ├── patterns-learned.json
    ├── timing-benchmarks.json
    ├── error-taxonomy.json
    ├── design-preferences.json
    ├── agent-performance.json
    ├── improvement-metrics.json
    ├── strategy-effectiveness.json
    └── knowledge-graph.json

Naming convention issues:
  .workflow/issues/fase-{XX}-{nama}/WI-{XXX}-{slug-deskriptif}.md
  Contoh: .workflow/issues/fase-5-components/WI-042-hero-section.md

Naming convention logs:
  .workflow/logs/archive/{YYYY-MM-DD}-{HHMM}-{nama}.log.gz
  Contoh: .workflow/logs/archive/2026-05-12-0815-pipeline.log.gz
```

### 11.2 .gitignore Entry

```
# Workflow internal artifacts — jangan commit ke repo
.workflow/
```

---

*Protocols are the spine. Logs are the memory. Experience is the intelligence. Together, they create an agent that doesn't just execute — it evolves.*
