# ISSUE SPEC: Ultimate Cerewet Template 360°

> Every issue is a mini-PRD — 5 design dimensions, 9 quality gates, 8 risks, user stories,
> Design Sense review, time tracking, reviewer assignment, rollback plan.
> "Cerewet = nothing left to guess."

---

## Issue File Location

```
ALL issues stored in dedicated directory — NONE in project root.

Path: .workflow/issues/fase-{XX}-{nama-fase}/WI-{XXX}-{slug-deskriptif}.md

Examples:
  .workflow/issues/fase-5-components/WI-087-product-card.md
  .workflow/issues/fase-6-pages/WI-101-beranda-page.md
  .workflow/issues/fase-11-seo/WI-158-structured-data-organization.md

Issues NEVER stored in:
  ❌ Root directory
  ❌ components/ directory
  ❌ Anywhere outside .workflow/issues/
```

## Issue Format Specification

```markdown
╔══════════════════════════════════════════════════════════════╗
║  WI-XXX: [Judul Puitis Teknis]                              ║
╚══════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│ FASE: XX │ PRIORITAS: 🔴 CRITICAL / 🟡 HIGH / 🟢 MEDIUM     │
│ POSISI CHAIN: N │ TERGANTUNG: WI-XXX │ MEMBLOKIR: WI-XXX   │
│ SUMBER PRD: §X.X                                            │
│ OUTPUT: .workflow/issues/fase-XX-nama/WI-XXX-slug.md        │
│ LOG: .workflow/logs/chain.log (issue_start/issue_done)      │
│ REVIEWER: [agent] │ APPROVER: [agent]                        │
│ ESTIMASI: XX min │ OWNER: [agent]                           │
└─────────────────────────────────────────────────────────────┘
```

### Section 1: User Stories & Job Story

```markdown
## 👤 User Stories
| # | Sebagai | Saya ingin | Sehingga | Persona PRD |
|---|---------|------------|----------|-------------|
| US-1 | [Persona] | [Action] | [Value] | [§2 ref] |

## 🧭 Job Story
When [situation], I want to [motivation], so that [expected outcome].
```

### Section 2: Vision

```markdown
## 🎯 Vision
[1-2 kalimat — apa yang akan dicapai, kenapa penting, dampak emosional.
 Harus menjawab: "Why does this matter?" — bukan "What does this do?"]
```

### Section 3: Technical Blueprint

```markdown
## 📐 Technical Blueprint

### Arsitektur
[Mermaid diagram jika relevan — menunjukkan component tree, data flow,
 atau dependency graph]

### Spesifikasi Teknis
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| [Param] | [Value] | [Why — merujuk ke PRD] |

### Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| [Pkg] | [Ver] | [Purpose] |
```

### Section 4: Design Specification (Pixel-Perfect)

```markdown
## 🎨 Design Specification

### Color Tokens
```
[Nama Warna]: #[HEX] (hsl ...) — [Nama Puitis / rationale emosional]
```

### Typography Scale
| Element | Font | Size (clamp) | Weight | Line Height | Letter Spacing |
|---------|------|-------------|--------|-------------|----------------|
| [Level] | [Font] | clamp(min, vw, max) | [Weight] | [LH] | [LS] |

### Layout Blueprint
```
[ASCII art layout — menunjukkan posisi dan hubungan spasial elemen]
```

### Responsive Breakpoints
| Viewport | Max Width | Layout Description |
|----------|-----------|-------------------|
| Mobile (375px) | ... | ... |
| Tablet (768px) | ... | ... |
| Desktop (1440px) | ... | ... |

### Animation Specification Matrix
| # | Element | Animation | Duration | Easing | Delay | Trigger | Stagger | Repeat |
|---|---------|-----------|----------|--------|-------|---------|---------|--------|
| 1 | [El] | [Anim] | [dur]s | [ease] | [del]s | [trigger] | [stg]s | [bool] |

### Interaction States
| Element | Default | Hover | Focus | Active | Disabled |
|---------|---------|-------|-------|--------|----------|
| [El] | [state] | [state] | [state] | [state] | [state] |

### Glassmorphism / Special Effects Spec
```
backdrop-filter: blur(Xpx)
background: rgba(R,G,B,opacity)
border: 1px solid rgba(R,G,B,opacity)
border-radius: Xpx
```
```

### Section 5: Accessibility Specification

```markdown
## 🔍 Accessibility
| Element | ARIA | Keyboard | Screen Reader | Contrast Ratio |
|---------|------|----------|---------------|----------------|
| [El] | role="..." | Tab/Enter/Esc | "..." | X:1 ✅/❌ |
```

### Section 6: Performance Budget

```markdown
## ⚡ Performance Budget
| Metric | Budget | Measurement Tool |
|--------|--------|-----------------|
| LCP | < Xs | Lighthouse |
| CLS | < X | Lighthouse |
| Bundle Size | < XKB gzipped | next-bundle-analyzer |
| Image Size | < XKB | next/image |
```

### Section 7: Security Specification

```markdown
## 🛡️ Security
| Threat | Mitigation | Implementation |
|--------|-----------|----------------|
| [Threat] | [How to prevent] | [Where in code] |
```

### Section 8: Acceptance Criteria (Multi-Dimensional)

```markdown
## 🧪 Acceptance Criteria

### ✅ Fungsional
- [ ] AC-1: [Detail spesifik]
- [ ] AC-2: [Detail spesifik]

### 👁️ Visual
- [ ] AC-X: [Pixel-perfect criteria]
- [ ] AC-Y: [Animation criteria]

### ♿ Aksesibilitas
- [ ] AC-X: [WCAG criteria]
- [ ] AC-Y: [Screen reader criteria]

### ⚡ Performa
- [ ] AC-X: [Lighthouse score criteria]
- [ ] AC-Y: [Bundle size criteria]

### 🧩 Testing
- [ ] AC-X: [Unit test criteria]
- [ ] AC-Y: [Integration test criteria]
- [ ] AC-Z: [E2E / Visual test criteria]
```

### Section 9: Risk Assessment Matrix

```markdown
## ⚠️ Risk Assessment
| # | Risk | P(1-5) | I(1-5) | Score | Mitigation | Contingency |
|---|------|--------|--------|-------|------------|-------------|
| R1 | [Description] | [1-5] | [1-5] | [P×I] 🔴/🟡/🟢 | [Prevent] | [If happens] |

**Risk Summary**: X 🔴 Critical | Y 🟡 Medium | Z 🟢 Low
```

### Section 10: Step-by-Step Implementation Guide

```markdown
## 📝 Implementation Steps

### Step 1: [Title] (X min)
```
[Command / code / instruction — sangat detail]
```

### Step 2: [Title] (X min)
[Specific instructions with file paths, function names, type signatures]

... (continue for all steps)
```

### Section 11: Quality Gates

```markdown
## 🚦 Quality Gates
| # | Gate | Command / Tool | Expected | Auto-Fix? |
|---|------|---------------|----------|-----------|
| G1 | Lint | `eslint ... --max-warnings 0` | 0 issues | Yes |
| G2 | TypeCheck | `tsc --noEmit` | 0 errors | No |
| G3 | Format | `prettier --check ...` | 0 issues | Yes |
| G4 | Build | `npm run build` | Success | No |
| G5 | Unit Tests | `vitest run ...` | All pass | No |
| G6 | Integration | `vitest run ...` | All pass | No |
| G7 | Accessibility | `npx @axe-core/cli ...` | 0 violations | No |
| G8 | Performance | Lighthouse | ≥ 95 Perf | No |
| G9 | Bundle Size | `npx next-bundle-analyzer` | ≤ XKB | No |

**Gate Logic**: G1-G4 auto-run after implementation.
If fail → auto-fix G1+G3, manual fix G2+G4.
Max 3 retry. If still fail → PAUSE CHAIN → escalate.
```

### Section 12: Screenshot Expectation (Textual)

```markdown
## 📸 Screenshot Expectation
[Deskripsi tekstual DETAIL tentang bagaimana komponen ini seharusnya terlihat —
 seolah-olah mendeskripsikan screenshot ke orang buta.
 Warna, posisi, ukuran, suasana, kontras, tekstur — semua dijelaskan secara verbal.]
```

### Section 13: Design Sense Review

```markdown
## 🎨 Design Sense Review
| # | Sensibility | Verdict | Note |
|---|-------------|---------|------|
| 1 | Rasa Estetika | ✅/⚠️/❌ | [Detail] |
| 2 | Imajinasi Spasial | ✅/⚠️/❌ | [Detail] |
| 3 | Empati | ✅/⚠️/❌ | [Detail] |
| 4 | Intuisi & Firasat | ✅/⚠️/❌ | [Detail] |
| 5 | Daya Eksplorasi | ✅/⚠️/❌ | [Detail] |
| 6 | Kesadaran Konteks | ✅/⚠️/❌ | [Detail] |
| 7 | Kegigihan Imajinatif | ✅/⚠️/❌ | [Detail] |

**Design Gate Result**: X PASS / Y REVISE / Z FAIL
**Minimum 5/7 PASS required. Sense #6 WAJIB PASS.**
```

### Section 14: Time Tracking

```markdown
## 🕐 Time Tracking
| Stage | Start | End | Duration | Owner |
|-------|-------|-----|----------|-------|
| Planned | — | — | Est. XX min | pw |
| In Progress | TBD | TBD | — | [agent] |
| Review | TBD | TBD | — | [reviewer] |
| Done | — | — | — | — |
```

### Section 15: Chain Information

```markdown
## 🔗 Chain
```
WI-XXX (parent) ──┐
WI-YYY (parent) ──┤
                  ├──→ WI-ZZZ (this issue) ●
                           │
                           ├──→ WI-AAA (child)
                           ├──→ WI-BBB (child)
                           └──→ WI-CCC (child)

WI-ZZZ PASS → WI-AAA, WI-BBB independent → can PARALLEL
WI-ZZZ FAIL → all children PAUSED
```
```

### Section 16: Rollback Plan

```markdown
## 🔄 Rollback
Jika implementasi gagal:
1. `git checkout -- [files]`
2. Revert integration changes
3. `npm run build` untuk verifikasi rollback
4. Update chain: WI marked FAILED, dependents UNLOCKED
```

---

## Issue Lifecycle State Machine

```
[PLANNED] ──→ [IN_PROGRESS] ──→ [IN_REVIEW] ──→ [COMPLETED]
                  │                    │
                  │                    ├──→ [REVISION_NEEDED] ──→ [IN_PROGRESS]
                  │                    │
                  │                    └──→ [DESIGN_REVISE] ──→ [IN_PROGRESS]
                  │
                  └──→ [BLOCKED] ──→ (wait for dependency) ──→ [IN_PROGRESS]

[COMPLETED] → triggers next in chain
[FAILED]    → PAUSES all dependents, escalates to ap
```

---

## Priority Matrix

```
🔴 CRITICAL — Must complete first. Blocks entire chain.
              P0 bugs, infrastructure, core framework.
              Max 10% of all issues.

🟡 HIGH     — Important for milestone. Blocks some dependents.
              Main features, key pages, primary components.
              Max 40% of all issues.

🟢 MEDIUM   — Nice to have. Does not block chain.
              Enhancements, secondary features, polish.
              Max 50% of all issues.
```

---

## QA Stamp

```
Every issue MUST have this QA stamp before COMPLETED:

╔═════════════════════════════════════════╗
║  ✅ All 9 quality gates passed          ║
║  ✅ All acceptance criteria met         ║
║  ✅ Design Sense Gate passed (min 5/7)  ║
║  ✅ No risk triggered                   ║
║  ✅ Rollback verified                   ║
║  ✅ Reviewer approved                   ║
║  ✅ Logged in chain.log (issue_done)    ║
╚═════════════════════════════════════════╝
```

---

## Logging Integration

```
Every issue event MUST write to chain.log:

  issue_start  → chain.log  (INFO:  WI-XXX started, agent=X, est=Ym)
  step_complete → chain.log  (DEBUG: step N done, dur=Zms)
  file_create  → chain.log  (DEBUG: file X created)
  file_edit    → chain.log  (DEBUG: file X modified)
  gate_run     → chain.log  (INFO:  gate GX, result=PASS/FAIL)
  design_critique → design-critique.log (SENSE_X, verdict, note)
  issue_done   → chain.log  (INFO:  WI-XXX done, dur=Zms, files=N)
  issue_blocked → chain.log (WARN:  WI-XXX blocked by WI-YYY)

Issue path format:
  .workflow/issues/fase-{XX}-{nama-fase}/WI-{XXX}-{slug}.md

NO FILE OUTSIDE .workflow/issues/.
NO ACTION WITHOUT LOG ENTRY.
```

---

*"Cerewet itu bentuk sayang. Detail itu bentuk hormat — ke user, ke codebase, ke masa depan. Log itu bentuk tanggung jawab — setiap aksi bisa dipertanggungjawabkan."*
