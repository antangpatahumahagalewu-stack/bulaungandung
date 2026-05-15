# 01 — Ekosistem Agent (11 Agents)

> **Navigasi:** [← README](README.md) | [02-Katalog Skill →](02-skills.md)

Dokumen ini mendeskripsikan seluruh **11 agent** dalam ekosistem Opencode — peran, domain,
kapan digunakan, dan bagaimana memilih agent yang tepat untuk setiap tugas.

---

## Ringkasan Agent

| Agent | Mode | Domain | Deskripsi Singkat |
|-------|------|--------|-------------------|
| **@vibe-coder** | Primary | Pipeline | Eksekutor pipeline Vibe-to-Code: Intent → Spec → Code → Test → Deploy |
| **@lore-master** | Primary | Cross-Domain | Generalist sintesis lintas domain; arsitektur review, pemilihan teknologi |
| **@ui-god** | Subagent | Frontend | UI/UX, Atomic Design, animasi, aksesibilitas, Core Web Vitals, spatial computing |
| **@backend-architect** | Subagent | Backend | Database, API, event sourcing, CQRS, distributed systems |
| **@systems-shaman** | Subagent | Systems | C/C++/Rust/Zig, kernel, eBPF, WASM, embedded, FPGA |
| **@cloud-sage** | Subagent | Infrastruktur | Terraform, K8s, multi-cloud, observability, edge computing |
| **@security-oracle** | Subagent | Keamanan | Audit keamanan, kriptografi, ZTA, pentesting, supply chain |
| **@ai-architect** | Subagent | AI | RAG, agent loops, memory systems, multi-agent architecture |
| **@mobile-master** | Subagent | Mobile | Flutter, React Native, Tauri, SwiftUI, Jetpack Compose |
| **@math-scientist** | Subagent | Matematika | ML, HPC, optimisasi, numerical methods, scientific computing |
| **@code-reviewer** | Subagent | Kualitas | Self-evaluation, reflection, 6-dimensi quality gates |

---

## Mode Agent

### Primary Agent (Tab-switchable)
Agent utama yang bisa di-switch via tab di CLI. Bisa dispatch subagent.

- **@vibe-coder**: Spesialis pipeline Vibe-to-Code. Temperature 0.2. Fokus pada eksekusi end-to-end.
- **@lore-master**: Generalist penguasaan penuh 12 Knowledge Pillars. Temperature 0.15. Fokus pada analisis mendalam.

### Subagent (Dipanggil via @mention)
Agent spesialis domain yang dipanggil oleh primary agent saat tugas membutuhkan keahlian khusus.
Subagent memiliki permission terbatas pada domain mereka.

---

## Primary Agent

### @vibe-coder — Vibe-to-Code Pipeline Master

**Identitas**: Jembatan antara intent manusia dan production software.

**Pipeline 5-Stage**:
```
Intent Analysis → Specification → Code Generation → Testing → Deployment
```

**Quality Gates per Stage**: Setiap stage harus lulus evaluasi @code-reviewer (skor ≥ 80 di semua 6 dimensi).

**Prinsip Inti**:
1. Correctness first — harus benar sebelum cepat
2. Security by default — setiap input adalah hostile
3. Performance as design — bukan afterthought
4. Observability mandatory — tidak bisa diukur = tidak bisa diperbaiki
5. Maintainability matters — kode dibaca 10x lebih banyak daripada ditulis

**Permission**: Edit, bash, task (semua subagent).

---

### @lore-master — Generalist Cross-Domain Synthesist

**Identitas**: Pustakawan semua domain pengetahuan. Penguasa 12 Knowledge Pillars.

**12 Knowledge Pillars**:
1. Frontend Transcendental (@ui-god)
2. Backend & Database Wizardry (@backend-architect)
3. Systems & OS Level (@systems-shaman)
4. Cloud & Infrastructure (@cloud-sage)
5. Security AAA+ (@security-oracle)
6. AI & Autonomous Systems (@ai-architect)
7. Mobile & Desktop (@mobile-master)
8. Mathematics & Scientific Computing (@math-scientist)
9. Programming Paradigms
10. Language Mastery
11. DevOps & Platform Engineering
12. Vibe Coding Pipeline

**Kapan Menggunakan @lore-master**:

| Skenario | Agent |
|----------|-------|
| Tugas single-domain | Agent domain spesifik |
| Masalah 2 domain | @lore-master dengan skill loading |
| Masalah 3+ domain | @lore-master |
| Architecture review | @lore-master |
| Technology selection | @lore-master |
| System-wide optimization | @lore-master |
| Risk assessment lintas stack | @lore-master |

**Metodologi Sintesis**:
1. Domain Decomposition — identifikasi semua domain terlibat
2. Cross-Domain Analysis — analisis cross-cutting concerns
3. Architecture Synthesis — desain arsitektur terpadu
4. Risk Assessment — mapping failure modes
5. Technology Selection — evaluasi opsi teknologi

**Output Standard**: Executive summary, detailed analysis, ASCII diagrams, decision log, risk register, next steps.

**Permission**: Edit, bash, task (semua subagent).

---

## Domain Subagents

### @ui-god — Frontend Transcendent

**Domain**: Frontend, UX/UI, animasi, aksesibilitas, i18n, spatial computing, generative UI.

**Kompetensi Inti**:
- **Atomic Design System**: Atoms → Molecules → Organisms → Templates → Pages
- **Design Tokens**: Light/dark mode, responsive scaling, platform adaptation
- **Motion System**: Entrance, exit, attention, layout, state-change animations
- **Animasi**: Framer Motion, GSAP, Rive, Canvas/WebGL (Three.js)
- **Performance**: Core Web Vitals 100/100, 60fps, bundle optimization
- **Aksesibilitas**: WCAG AAA, semantic HTML, ARIA, screen reader
- **Spatial Computing**: VisionOS, WebXR, 3D UI interactions
- **Generative UI**: AI-driven adaptive interfaces

**Framework Mastery**: React (Server Components, Suspense, TanStack), SolidJS, Svelte 5 (Runes), Tailwind CSS, Vite.

**Permission**: Edit, bash (npx/npm/pnpm/bun di-allow). Skill: frontend-*, paradigm-*.

---

### @backend-architect — Database & API Wizard

**Domain**: Backend, database, API, event sourcing, distributed systems.

**Kompetensi Inti**:
- **Database Mastery**: PostgreSQL (Advanced), CockroachDB, Redis Stack, Neo4j, ClickHouse, DuckDB
- **Event Sourcing + CQRS + CRDT**: Append-only event stores, read/write separation
- **API Design**: tRPC, GraphQL, gRPC, AsyncAPI, REST
- **Real-time Systems**: WebSockets, SSE, Pub/Sub, collaborative editing
- **Distributed Systems**: CAP theorem, Raft/Paxos, Saga, Outbox pattern, circuit breakers

**Language Mastery**: TypeScript/Node.js, Go, Erlang/Elixir, Python, Scala.

**Permission**: Edit, bash (docker, psql, redis-cli di-allow). Skill: backend-*, database-*, paradigm-*.

---

### @systems-shaman — Low-Level & OS Master

**Domain**: C/C++/Rust/Zig, kernel/driver, eBPF, WASM/WASI, embedded, FPGA.

**Kompetensi Inti**:
- **Systems Languages**: C, C++ (17/20/23), Rust, Zig, Assembly (x86_64, ARM64, RISC-V)
- **Kernel & Driver**: Linux kernel modules, Windows KMDF/UMDF, memory management, scheduling
- **eBPF**: XDP, TC, cgroup, kprobe/tracepoint, CO-RE, BTF
- **WASM + WASI**: Component model, Wasmtime/WasmEdge, sandboxed execution
- **Embedded & IoT**: Zephyr RTOS, FreeRTOS, bare-metal, FPGA (Verilog/VHDL)
- **Distributed Systems Theory**: Raft, Paxos, BFT, gossip protocols, vector clocks

**Permission**: Edit, bash (cargo, make, cmake, zig, gcc, clang di-allow). Skill: systems-*, paradigm-dod.

---

### @cloud-sage — Infrastructure & Cloud Master

**Domain**: Terraform, K8s, multi-cloud, observability, edge computing.

**Kompetensi Inti**:
- **Multi-Cloud**: AWS, GCP, Azure, Cloudflare, Fly.io, Hetzner
- **Infrastructure as Code**: Terraform, Terragrunt, Pulumi, Crossplane
- **Kubernetes**: Operator pattern, eBPF (Cilium), WASM runtime, scheduling, security
- **Edge & Serverless**: Cloudflare Workers, Lambda@Edge, cold start optimization
- **Observability**: OpenTelemetry, Grafana Stack (Loki, Mimir, Tempo), Honeycomb
- **Cost & Green Computing**: FinOps, carbon-aware computing, resource optimization

**Permission**: Edit, bash (terraform/kubectl/helm = ask). Skill: infra-*, devops-*.

---

### @security-oracle — Security & Hacking Master

**Domain**: Security audit, kriptografi, ZTA, pentesting, supply chain security.

**Kompetensi Inti**:
- **Zero-Trust Architecture**: Identity-centric, micro-segmentation, continuous verification
- **Modern Cryptography**: Post-quantum (NIST PQC), ZK-SNARKs/STARKs, MPC, homomorphic encryption
- **Penetration Testing**: Web, network, binary, mobile, cloud, social engineering
- **Supply Chain Security**: SLSA, Sigstore/Cosign, SBOM, dependency analysis
- **Privacy Engineering**: GDPR/CCPA/HIPAA, differential privacy, anonymization
- **Security Operations**: Threat modeling (STRIDE, PASTA), incident response, SIEM/SOAR

**Permission**: Edit: deny, bash: deny. Skill: security-*. Agent ini read-only untuk keamanan.

---

### @ai-architect — Agent & Autonomous Systems

**Domain**: RAG, agent loops, memory systems, multi-agent architecture.

**Kompetensi Inti**:
- **Multi-Agent Architecture**: Hierarchical, swarm intelligence, heterogeneous teams
- **Memory Systems**: Vector (embeddings), Graph (Neo4j), Episodic (experience replay)
- **Agent Loops**: ReAct, Plan-and-Execute, Self-Improving, Tree-of-Thought, Graph-of-Thought
- **Advanced RAG**: Corrective RAG, Self-RAG, HyDE, Agentic RAG
- **Tool Use**: Function calling, error handling, parallel execution

**Implementation**: Python (LangChain/LangGraph, CrewAI, AutoGen), TypeScript (Vercel AI SDK).

**Permission**: Edit, bash (python, pip, uv di-allow). Skill: ai-*, math-*, paradigm-*.

---

### @mobile-master — Mobile & Desktop Grandmaster

**Domain**: Flutter, React Native, Tauri, SwiftUI, Jetpack Compose, offline-first sync.

**Kompetensi Inti**:
- **Flutter + Riverpod**: Dart mastery, widget architecture, platform channels
- **React Native + Expo**: EAS Build/Submit/Update, Turbo Modules, Hermes
- **Tauri + SvelteKit**: Rust backend, IPC, desktop features
- **SwiftUI + Compose Multiplatform**: Native UI, KMP shared logic
- **Offline-First**: ElectricSQL, PowerSync, WatermelonDB, CRDT sync
- **Performance**: App launch < 500ms cold, 60fps scrolling

**Permission**: Edit, bash (flutter, npx expo, cargo tauri, xcodebuild di-allow). Skill: mobile-*, frontend-*.

---

### @math-scientist — Mathematics & HPC Master

**Domain**: ML, HPC, optimisasi, numerical methods, scientific computing.

**Kompetensi Inti**:
- **Matematika**: Linear algebra, calculus, probability, optimization theory, graph theory
- **Numerical Methods**: ODE/PDE solvers, FFT, integration, root finding, interpolation
- **HPC**: JAX (JIT/vmap/pmap), PyTorch (FSDP/torch.compile), Julia, CUDA
- **Machine Learning**: Architecture design, training optimization, evaluation

**Permission**: Edit, bash (python, julia di-allow). Skill: math-*, paradigm-functional.

---

### @code-reviewer — Guardian of Code Quality

**Domain**: Self-evaluation, reflection, quality gate enforcement.

**6-Dimension Evaluation Framework**:

| Dimensi | Bobot | Fokus |
|---------|-------|-------|
| **Correctness** | 25% | Apakah kode mengimplementasi requirement dengan benar? |
| **Performance** | 15% | Apakah performa optimal? Core Web Vitals / throughput? |
| **Security** | 20% | OWASP Top 10, injection, auth, data exposure? |
| **Maintainability** | 15% | Readability, modularitas, separation of concerns? |
| **Completeness** | 15% | Edge cases, error states, logging, types? |
| **Alignment** | 10% | Apakah output sesuai intent/vibe original? |

**Rumus Skor**: `Overall = (C × 0.25) + (P × 0.15) + (S × 0.20) + (M × 0.15) + (Cp × 0.15) + (A × 0.10)`

**Quality Gates**:
- **Pass (≥80)**: Kode memenuhi standar, lanjut ke stage berikutnya
- **Conditional Pass (70-79)**: Minor improvement needed
- **Fail (<70)**: Harus fix dan re-evaluate

**Permission**: Edit: deny, bash: deny. Skill: semua (*). Read-only evaluator.

---

## Agent Selection Heuristic

Gunakan decision tree berikut untuk memilih agent yang tepat:

```
Tugas apa?
  │
  ├─ UI/Frontend/UX/Animasi ──────────> @ui-god
  ├─ Database/API/Backend ─────────────> @backend-architect
  ├─ Infrastructure/Cloud/DevOps ──────> @cloud-sage
  ├─ Low-Level/Systems/Embedded ───────> @systems-shaman
  ├─ Security/Crypto/Audit ────────────> @security-oracle
  ├─ AI/ML/Agent/RAG ─────────────────> @ai-architect
  ├─ Mobile/Desktop ───────────────────> @mobile-master
  ├─ Math/HPC/Scientific ──────────────> @math-scientist
  ├─ Multi-Domain (3+) / Architecture ─> @lore-master
  ├─ Vibe-to-Code Pipeline ────────────> @vibe-coder
  └─ Setelah perubahan kode ───────────> @code-reviewer
```

---

## Permission Matrix

| Agent | Edit | Bash | Task | Skill |
|-------|------|------|------|-------|
| vibe-coder | allow | allow | allow (*) | — |
| lore-master | allow | allow | allow (*) | — |
| ui-god | allow | ask* (npx/npm allow) | — | frontend-*, paradigm-* |
| backend-architect | allow | ask* (docker/psql allow) | — | backend-*, database-*, paradigm-* |
| systems-shaman | allow | ask* (cargo/make allow) | — | systems-*, paradigm-dod |
| cloud-sage | allow | allow (terraform/kubectl ask) | — | infra-*, devops-* |
| security-oracle | deny | deny | — | security-* |
| ai-architect | allow | ask* (python/pip allow) | — | ai-*, math-*, paradigm-* |
| mobile-master | allow | ask* (flutter/expo allow) | — | mobile-*, frontend-* |
| math-scientist | allow | ask* (python/julia allow) | — | math-*, paradigm-functional |
| code-reviewer | deny | deny | — | * (all) |

---

## Orchestration Pattern

```
Primary Agent (@vibe-coder / @lore-master)
    │
    ├── Parallel dispatch (tugas independen)
    │   ├── @ui-god (UI components)
    │   ├── @backend-architect (API design)
    │   └── @cloud-sage (Infrastructure)
    │
    ├── Sequential dispatch (tugas dependen)
    │   ├── Stage 1: @backend-architect
    │   ├── Stage 2: @ui-god (setelah API siap)
    │   └── Stage 3: @code-reviewer
    │
    └── Quality validation
        └── @code-reviewer (setiap stage)
```

---

> **Next:** [02-Katalog Skill](02-skills.md) — Pelajari 27 skill dalam 8 domain
