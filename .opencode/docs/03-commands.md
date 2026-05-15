# 03 — Custom Commands (7 Commands)

> **Navigasi:** [← 02-Skills](02-skills.md) | [04-Workflow →](04-workflow.md)

Dokumen ini mendeskripsikan **7 custom slash commands** yang tersedia di `.opencode/commands/`.
Setiap command memiliki template, agent yang assigned, dan pipeline spesifik.

---

## Ringkasan Commands

| Command | Agent | Deskripsi |
|---------|-------|-----------|
| `/vibe` | @vibe-coder | Vibe-to-Code 5-stage pipeline: Intent → Spec → Code → Test → Deploy |
| `/reflect` | @code-reviewer | Self-evaluation dengan 6-dimensi scoring |
| `/architect` | @lore-master | Architecture review dengan diagram + risk register |
| `/optimize` | @lore-master | Performance optimization audit menyeluruh |
| `/secure` | @security-oracle | Comprehensive security audit (OWASP, supply chain, crypto) |
| `/doc` | @lore-master | Auto-generate dokumentasi lengkap dengan knowledge graph |
| `/deploy` | @cloud-sage | Progressive delivery deployment (canary/blue-green) |

---

## `/vibe` — Vibe-to-Code Pipeline

**Agent**: `@vibe-coder` (mode primary, temperature 0.2)
**File**: `.opencode/commands/vibe.md`

Pipeline 5-stage yang mentransformasi intent bahasa alami menjadi kode production-grade:

```
$ARGUMENTS (user intent)
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 1: INTENT ANALYSIS                                    │
│  - Parse natural language intent                            │
│  - Identifikasi domain, tech stack, requirements            │
│  - Ekstrak constraints (performance, security, scalability) │
│  - Output: Structured requirements document                 │
│                                                              │
│                 ↓ (Gate A: @code-reviewer)                   │
│                                                              │
│  STAGE 2: SPECIFICATION                                     │
│  - Generate technical specification                         │
│  - Define architecture: components, data flow, API contracts│
│  - Pilih design patterns dan paradigm                       │
│  - Define data models, state management, error handling     │
│  - Output: Technical spec + ASCII diagram                   │
│                                                              │
│                 ↓ (Gate A: @code-reviewer)                   │
│                                                              │
│  STAGE 3: CODE GENERATION                                   │
│  - Implement specification dengan production-grade quality  │
│  - Ikuti SOLID, DRY, KISS                                   │
│  - Comprehensive error handling, logging, types             │
│  - Output: Complete implementation files                    │
│                                                              │
│                 ↓ (Gate A: @code-reviewer)                   │
│                                                              │
│  STAGE 4: TESTING                                           │
│  - Unit tests (happy path + edge cases + error states)      │
│  - Integration tests                                        │
│  - Performance benchmarks                                   │
│  - Target: >90% coverage                                    │
│  - Output: Test suite + CI config                           │
│                                                              │
│                 ↓ (Gate A: @code-reviewer)                   │
│                                                              │
│  STAGE 5: DEPLOYMENT                                        │
│  - CI/CD pipeline configuration                             │
│  - Infrastructure as Code                                   │
│  - Progressive delivery (canary/blue-green)                 │
│  - Observability: dashboards, alerts, SLOs                  │
│  - Output: Deployment config + runbook                      │
│                                                              │
│                 ↓ (Gate B: Alignment check)                  │
│                                                              │
│  ✅ PRODUCTION                                              │
└─────────────────────────────────────────────────────────────┘
```

**Quality Gates**: Setiap stage harus lulus 2 gate:
- **Gate A**: Evaluasi @code-reviewer (semua 6 dimensi ≥ 80)
- **Gate B**: Refleksi apakah output match dengan intent original

**Contoh Penggunaan**:
```
/vibe Buat REST API untuk e-commerce dengan Go, PostgreSQL, dan JWT auth. 
Harus support order creation, payment processing, dan inventory management.
```

---

## `/reflect` — Self-Evaluation & Reflection

**Agent**: `@code-reviewer` (mode subagent, temperature 0.05)
**File**: `.opencode/commands/reflect.md`

Evaluasi kode terbaru terhadap 6 dimensi kualitas. Cocok digunakan setelah setiap
perubahan kode signifikan.

**6 Dimensi Scoring**:

| Dimensi | Bobot | Deskripsi |
|---------|-------|-----------|
| Correctness | 25% | Apakah kode benar mengimplementasi requirements? |
| Performance | 15% | Core Web Vitals / throughput / latency optimal? |
| Security | 20% | OWASP Top 10, injection, auth, data exposure? |
| Maintainability | 15% | Readability, modularitas, separation of concerns? |
| Completeness | 15% | Edge cases, error states, logging, types? |
| Alignment | 10% | Output match original intent/vibe? |

**Rumus Skor**: `Overall = (C×0.25) + (P×0.15) + (S×0.20) + (M×0.15) + (Cp×0.15) + (A×0.10)`

**Quality Gates**:
- **Pass (≥80)**: Kode memenuhi standar
- **Conditional Pass (70-79)**: Minor improvements needed
- **Fail (<70)**: Harus fix dan re-evaluate

**Output**: Scorecard + Gap Analysis + Fix Recommendations + Verification Steps

**Contoh Penggunaan**:
```
/reflect Review perubahan terbaru di handler/api/users.go, 
fokus pada security (JWT validation) dan error handling
```

---

## `/architect` — Architecture Review

**Agent**: `@lore-master` (mode subagent)
**File**: `.opencode/commands/architect.md`

Review arsitektur menyeluruh untuk project atau komponen.

**Analysis Framework**:
1. System boundaries & component decomposition
2. Data flow & state management patterns
3. API design & contract review
4. Scalability & fault tolerance assessment
5. Technology stack alignment
6. Cross-cutting concerns (auth, logging, monitoring, error handling)

**Deliverables**:
- ASCII architecture diagram
- Component responsibility matrix
- Risk register (high/medium/low)
- Recommended improvements (prioritized)

**Contoh Penggunaan**:
```
/architect Review arsitektur microservices untuk sistem e-commerce:
3 services (users, orders, payments) dengan PostgreSQL, 
Redis cache, dan Kafka message bus
```

---

## `/optimize` — Performance Optimization Audit

**Agent**: `@lore-master` (mode subagent)
**File**: `.opencode/commands/optimize.md`

Audit performa menyeluruh dari frontend ke backend ke database ke infrastruktur.

**Optimization Framework**:
1. **Frontend**: Core Web Vitals, bundle size, render, memoization, lazy loading
2. **Backend**: Query optimization, connection pooling, caching, N+1 elimination
3. **Database**: Index analysis, query plan, partitioning, materialized views
4. **Infrastructure**: CDN, edge, load balancing, auto-scaling
5. **Network**: Payload optimization, compression, HTTP/2/3

**Target**: Core Web Vitals 100/100, 60fps, <200ms P95 latency.

**Contoh Penggunaan**:
```
/optimize Dashboard admin loading 8 detik untuk 10K data. 
Database PostgreSQL, backend Go, frontend React+Next.js
```

---

## `/secure` — Comprehensive Security Audit

**Agent**: `@security-oracle` (mode subagent)
**File**: `.opencode/commands/secure.md`

Audit keamanan menyeluruh — dari OWASP sampai supply chain sampai kriptografi.

**Audit Framework**:
1. **OWASP Top 10**: Injection, broken auth, XSS, SSRF, access control, dll.
2. **Supply Chain**: Dependency audit, SBOM, SLSA compliance, Sigstore/Cosign
3. **Infrastructure**: Network segmentation, IAM, secret management, encryption
4. **Zero-Trust**: Identity verification, least privilege, micro-segmentation
5. **Crypto**: Algorithm audit, key management, TLS configuration, PQC readiness

**Deliverables**:
- Vulnerability report (CVSS scored)
- Remediation plan (immediate / next-week / next-sprint)
- Security posture score (0-100)

**Contoh Penggunaan**:
```
/secure Audit keamanan untuk aplikasi fintech: 
FastAPI backend, React frontend, PostgreSQL database, 
deployed di AWS EKS
```

---

## `/doc` — Auto-Generate Documentation

**Agent**: `@lore-master` (mode subagent)
**File**: `.opencode/commands/doc.md`

Generate dokumentasi teknis komprehensif secara otomatis.

**Documentation Framework**:
1. **API Documentation**: OpenAPI/Swagger, endpoint descriptions, request/response
2. **Architecture Docs**: System design, component diagrams (Mermaid), data flow
3. **Setup Guide**: Prerequisites, installation, configuration, env variables
4. **Developer Guide**: Contributing, code standards, testing, build process
5. **Runbook**: Common operations, troubleshooting, incident response
6. **Knowledge Graph**: Entity relationships, dependencies, state machines

**Contoh Penggunaan**:
```
/doc Generate dokumentasi lengkap untuk service API users:
endpoints, data models, authentication flow, deployment guide
```

---

## `/deploy` — Progressive Delivery Deployment

**Agent**: `@cloud-sage` (mode subagent)
**File**: `.opencode/commands/deploy.md`

Generate konfigurasi deployment production-ready dengan progressive delivery.

**Deployment Framework**:
1. **CI/CD Pipeline**: GitHub Actions / ArgoCD / Flux
2. **Artifact Management**: Container build, registry push, versioning
3. **Progressive Delivery**: Canary deployment, blue-green, feature flags
4. **Quality Gates**: Smoke tests, integration tests, performance benchmarks
5. **Observability**: Dashboards, alerts, SLO/SLI definitions
6. **Rollback Strategy**: Automated rollback triggers, data migration reversibility
7. **Chaos Engineering**: Fault injection, resilience testing

**Contoh Penggunaan**:
```
/deploy Setup progressive delivery untuk Go microservice:
GitHub Actions CI/CD, deploy ke GKE dengan Argo Rollouts canary,
Prometheus monitoring, automated rollback jika error rate > 1%
```

---

## Command Execution Flow

```
User mengetik /command
    │
    ▼
opencode.json → command template
    │
    ▼
Agent assigned (dari command config)
    │
    ▼
Subtask dijalankan oleh agent
    │
    ▼
Agent load skills yang relevan
    │
    ▼
Eksekusi pipeline (sesuai template)
    │
    ▼
Output dikembalikan ke user
```

---

> **Next:** [04-Workflow](04-workflow.md) — Pelajari workflow harian, protokol, dan quality gates
