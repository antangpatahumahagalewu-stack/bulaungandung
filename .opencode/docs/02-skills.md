# 02 — Katalog Skill (27 Skills)

> **Navigasi:** [← 01-Agents](01-agents.md) | [03-Commands →](03-commands.md)

Dokumen ini mengkatalogkan seluruh **27 skill** yang tersedia di `.opencode/skills/`,
dikelompokkan ke dalam 8 domain. Skill adalah file pengetahuan domain-spesifik yang
di-load oleh agent sebelum bekerja di domain tersebut.

---

## Cara Menggunakan Skill

Skill di-load menggunakan command `skill` tool — SELALU load skill SEBELUM menulis kode:

```
User Input → [Load: skill yang relevan] → [Eksekusi dengan domain best practices]
```

**Aturan:**
- Load skill yang sesuai dengan domain tugas
- Untuk tugas lintas domain, load multiple skills
- Skill `understanding` dan `workflow-general` adalah prekondisi — load duluan
- Jangan load skill yang tidak relevan (cognitive cost)

---

## Ringkasan 27 Skill

| # | Skill | Domain | Deskripsi |
|---|-------|--------|-----------|
| 1 | `backend-go` | Backend | Go: goroutines, channel, interface, generics, net/http, testing |
| 2 | `backend-python` | Backend | Python: FastAPI, SQLAlchemy 2.0, Pydantic v2, async/await, pytest |
| 3 | `backend-elixir` | Backend | Elixir/OTP: GenServer, Supervisor, Phoenix, LiveView, Ecto |
| 4 | `frontend-react` | Frontend | React 18/19: Server Components, Suspense, Next.js, TanStack |
| 5 | `frontend-svelte` | Frontend | Svelte 5 Runes, SvelteKit, fine-grained reactivity |
| 6 | `frontend-animation` | Frontend | Framer Motion, GSAP, Rive, Canvas/WebGL, 60fps |
| 7 | `database-postgres` | Database | PostgreSQL: indexing, partitioning, pgvector, replication, tuning |
| 8 | `database-event-sourcing` | Database | Event Sourcing, CQRS, CRDT, outbox pattern |
| 9 | `infra-terraform` | Infrastruktur | Terraform+Terragrunt: modules, state, HCL best practices |
| 10 | `infra-kubernetes` | Infrastruktur | K8s: Operator, eBPF/Cilium, WASM, GitOps (ArgoCD/Flux) |
| 11 | `infra-observability` | Infrastruktur | OpenTelemetry, Grafana, SLO/SLI, alerting |
| 12 | `devops-platform-engineering` | Infrastruktur | CI/CD, Platform Engineering, SRE, Chaos Engineering |
| 13 | `ai-agent-loop` | AI | ReAct, Plan-Execute, Self-Improving, ToT, GoT, LangGraph |
| 14 | `ai-memory` | AI | Vector, Graph, Episodic, Working Memory |
| 15 | `ai-rag` | AI | Corrective RAG, Self-RAG, HyDE, reranking, evaluation |
| 16 | `mobile-flutter` | Mobile | Flutter+Riverpod, Dart, widget architecture |
| 17 | `mobile-tauri` | Mobile | Tauri 2.x + SvelteKit, Rust backend, IPC |
| 18 | `security-audit` | Security | OWASP, threat modeling (STRIDE), SAST/DAST, pentesting |
| 19 | `security-crypto` | Security | Post-quantum crypto, ZK, MPC, homomorphic encryption, TLS |
| 20 | `systems-ebpf` | Systems | eBPF: XDP, TC, tracing, maps, CO-RE |
| 21 | `systems-embedded` | Systems | Zephyr RTOS, FreeRTOS, bare-metal, FPGA, I2C/SPI/UART |
| 22 | `math-hpc` | Systems | CUDA, SIMD, numerical methods, parallel computing, Julia |
| 23 | `math-ml` | Systems | PyTorch, JAX, training optimization, model architecture |
| 24 | `paradigm-functional` | Paradigm | FP: pure functions, immutability, monads, pattern matching |
| 25 | `paradigm-actor` | Paradigm | Actor Model: OTP, Akka, message-passing, supervision |
| 26 | `understanding` | Workflow | First-principles analysis, constraint mapping, stakeholder analysis |
| 27 | `workflow-general` | Workflow | Requirement → Architecture → Implementation → Testing → Deploy |

---

## Backend Skills (3)

### `backend-go` — Go Concurrency & HTTP

**Paradigm**: Concurrent, interface-driven.

**Capabilities**: Goroutines, channels, select patterns, `errgroup`, generics, `net/http`,
`chi` router, middleware, `sqlx`/`pgx`, testing (table-driven, fuzz, benchmarks),
pprof profiling, security hardening, multi-stage Docker.

**Integrasi dengan**: `database-postgres`, `database-event-sourcing`, `infra-observability`.

**Kapan digunakan**: Backend service di Go, high-concurrency systems, CLI tools, API gateway.

---

### `backend-python` — FastAPI & Async Python

**Paradigm**: Async/await.

**Capabilities**: FastAPI (dependency injection, middleware, lifespan), SQLAlchemy 2.0
(async session, `Mapped[]`), Pydantic v2 (validators, computed fields), type hints strict,
pytest fixtures, clean architecture (ports/adapters), Gunicorn+Uvicorn, security (JWT, CORS).

**Integrasi dengan**: `database-postgres`, `database-event-sourcing`, `security-audit`.

**Kapan digunakan**: REST API di Python, ML model serving, data processing pipelines.

---

### `backend-elixir` — OTP & Phoenix

**Paradigm**: Actor Model, functional.

**Capabilities**: GenServer (call/cast/info), Supervisor trees (one_for_one, one_for_all),
ETS/DETS/Mnesia, Phoenix LiveView lifecycle, PubSub, Ecto (changesets, queries, Multi),
Broadway (message pipelines), Oban (background jobs), Telemetry, BEAM VM tuning, hot code upgrade.

**Integrasi dengan**: `database-postgres`, `paradigm-functional`, `paradigm-actor`.

**Kapan digunakan**: Real-time systems, WebSocket-heavy apps, fault-tolerant services.

---

## Frontend Skills (3)

### `frontend-react` — React 18/19 & Next.js

**Paradigm**: Declarative, component-based.

**Capabilities**: Server Components, Suspense, Concurrent Mode, hooks (useDeferredValue,
useTransition, useSyncExternalStore), TanStack Query, Zustand, Jotai, React Hook Form+Zod,
Next.js App Router (layouts, loading, error, server actions), React.memo, Error Boundaries.

**Integrasi dengan**: `frontend-animation`, `mobile-tauri`.

**Kapan digunakan**: Web app kompleks, dashboard, e-commerce, SaaS frontend.

---

### `frontend-svelte` — Svelte 5 Runes & SvelteKit

**Paradigm**: Reactive, compiler-first.

**Capabilities**: Svelte 5 Runes (`$state`, `$derived`, `$effect`, `$props`, `$bindable`,
`$inspect`), SvelteKit (load functions, form actions, `use:enhance`), module-level `$state`,
snippets, actions (`use:`), transitions (fly, fade, slide), CSS scoping.

**Integrasi dengan**: `frontend-animation`, `mobile-tauri`.

**Kapan digunakan**: Web app dengan performa tinggi, Tauri desktop app, landing pages.

---

### `frontend-animation` — Advanced Animation

**Paradigm**: Animation-first, compositor-only.

**Capabilities**: Motion design tokens, Framer Motion (variants, AnimatePresence, layout
animations, scroll-linked), GSAP (timeline, ScrollTrigger, Flip), Rive (state machines),
Canvas/WebGL (Three.js, shaders), 60fps guarantee, `prefers-reduced-motion`, visual
regression testing.

**Integrasi dengan**: `frontend-react`, `frontend-svelte`, `mobile-flutter`.

**Kapan digunakan**: Animasi kompleks, micro-interactions, scroll-driven storytelling.

---

## Database Skills (2)

### `database-postgres` — PostgreSQL Advanced

**Paradigm**: Relational.

**Capabilities**: Indexing (B-tree, GiST, GIN, BRIN, partial, covering, expression),
query optimization (EXPLAIN ANALYZE, pg_stat_statements), partitioning (range, list, hash),
window functions, recursive CTEs, JSONB operations, full-text search, pgvector (ivfflat,
hnsw), PostGIS, replication (streaming, logical), PgBouncer, performance tuning
(shared_buffers, work_mem, autovacuum), RLS, zero-downtime migrations, backup/recovery.

**Integrasi dengan**: `backend-python`, `backend-go`, `backend-elixir`, `database-event-sourcing`.

**Kapan digunakan**: Hampir semua project dengan PostgreSQL.

---

### `database-event-sourcing` — Event Sourcing + CQRS + CRDT

**Paradigm**: Event-driven.

**Capabilities**: Append-only event store, CQRS (command/query separation), event schema
(eventId, aggregateType, version, payload), optimistic concurrency, snapshots, Outbox
Pattern, CDC (Debezium), CRDT types (G-Counter, PN-Counter, G-Set, OR-Set, LWW-Register),
read model projection, event upcasting, schema evolution, Given/When/Then testing.

**Integrasi dengan**: `database-postgres`, `backend-go`, `backend-elixir`, `paradigm-functional`.

**Kapan digunakan**: Audit trail, finance, complex business processes, multi-writer sync.

---

## Infrastructure Skills (4)

### `infra-terraform` — Terraform + Terragrunt

**Paradigm**: Declarative.

**Capabilities**: Module design (single responsibility), state management (S3+DynamoDB),
HCL best practices (for_each, locals, lifecycle), Terragrunt (DRY, remote state, hooks),
provider patterns, CI/CD integration (plan on PR, apply on merge), tfsec/checkov.

**Integrasi dengan**: `infra-kubernetes`, `devops-platform-engineering`.

**Kapan digunakan**: Infrastructure provisioning, multi-cloud deployment.

---

### `infra-kubernetes` — Kubernetes Advanced

**Paradigm**: Orchestration.

**Capabilities**: Operator pattern (CRD+Controller), eBPF (Cilium, Hubble), WASM runtime
(Krustlet), scheduling (taints, affinities, topology spread), security (OPA/Gatekeeper,
Kyverno, image signing), GitOps (ArgoCD, Flux).

**Integrasi dengan**: `infra-terraform`, `infra-observability`.

**Kapan digunakan**: Container orchestration, platform engineering.

---

### `infra-observability` — OpenTelemetry & Grafana Stack

**Paradigm**: Observability-driven.

**Capabilities**: Three pillars (traces, metrics, logs via OTel), SLO/SLI/SLA definitions,
error budgets, multi-window burn rate alerting, Grafana (Loki, Mimir, Tempo), Honeycomb
(high-cardinality, BubbleUp), dashboard design (RED, USE methods).

**Integrasi dengan**: Semua backend dan infrastructure skills.

**Kapan digunakan**: Production monitoring, debugging, SLO-based operations.

---

### `devops-platform-engineering` — CI/CD & Platform

**Paradigm**: Delivery engineering.

**Capabilities**: GitHub Actions (composite, matrix, OIDC), ArgoCD (ApplicationSets, sync
waves), Flux (Kustomize+Helm), progressive delivery (canary, blue-green, feature flags),
SRE practices (error budgets, toil reduction, blameless postmortems), chaos engineering,
IDP (Backstage, golden paths), DORA metrics.

**Integrasi dengan**: `infra-terraform`, `infra-kubernetes`.

**Kapan digunakan**: CI/CD pipeline design, platform team, SRE practices.

---

## AI Skills (3)

### `ai-agent-loop` — Agent Loop Architectures

**Paradigm**: Agentic.

**Capabilities**: ReAct (Reasoning+Acting), Plan-and-Execute, Self-Improving (Reflexion,
Chain-of-Verification), Tree-of-Thought (BFS/DFS/Beam), Graph-of-Thought (aggregate/refine),
LLM Compiler (parallel function calling), CodeAct, sub-task decomposition, Human-in-the-Loop.
Implementation: LangGraph (StateGraph, checkpointing, streaming), CrewAI, AutoGen.

**Integrasi dengan**: `ai-memory`, `ai-rag`, `understanding`.

**Kapan digunakan**: Autonomous agent systems, multi-step reasoning, tool-use agents.

---

### `ai-memory` — Memory Systems

**Paradigm**: Memory architecture (Kahneman-inspired: System 1/2).

**Capabilities**: Vector Memory (embedding stores: Pinecone, Qdrant, pgvector), Graph Memory
(Neo4j, community detection, GraphRAG), Episodic Memory (experience replay), Working Memory
(token budget management, compression), Procedural Memory (skill templates), consolidation
(episodic→semantic), forgetting curves (Ebbinghaus decay), Mem0 integration.

**Integrasi dengan**: `ai-agent-loop`, `ai-rag`, `database-postgres`.

**Kapan digunakan**: Long-running agents, chatbots with memory, knowledge accumulation.

---

### `ai-rag` — Advanced RAG

**Paradigm**: Retrieval-augmented.

**Capabilities**: Embedding models (OpenAI, BGE, Jina, Voyage), vector stores (Qdrant,
Pinecone, pgvector), chunking strategies (fixed, recursive, semantic, proposition),
Corrective RAG, Self-RAG, HyDE, Agentic RAG, reranking (Cohere, BGE, ColBERT), fusion
retrieval (RRF), parent-child chunking, FLARE, evaluation (RAGAS, NDCG, MRR), production
pipelines, monitoring, caching.

**Integrasi dengan**: `ai-agent-loop`, `ai-memory`, `database-postgres`.

**Kapan digunakan**: Question answering, document search, knowledge base retrieval.

---

## Mobile Skills (2)

### `mobile-flutter` — Flutter + Riverpod

**Paradigm**: Declarative UI.

**Capabilities**: Dart (null safety, isolates, sealed classes, Freezed), widget architecture
(composition, keys, slivers), Riverpod 2.x (Provider, Notifier, FutureProvider, autoDispose),
platform channels (MethodChannel, FFI), performance (const, RepaintBoundary, shader warm-up),
testing (unit, widget, integration, golden).

**Integrasi dengan**: `frontend-animation`.

**Kapan digunakan**: Cross-platform mobile (iOS+Android), Flutter Web/Desktop.

---

### `mobile-tauri` — Tauri 2.x + SvelteKit

**Paradigm**: Native-webview hybrid.

**Capabilities**: Tauri 2.x architecture (WebView↔Rust IPC), Rust backend (commands, state,
plugins, SQLx), SvelteKit frontend (static adapter, `@tauri-apps/api`), desktop features
(tray, menu, notifications, auto-updater), security (CSP, IPC validation, scoped filesystem),
cross-platform builds.

**Integrasi dengan**: `frontend-svelte`, `frontend-react`.

**Kapan digunakan**: Desktop app (Windows/macOS/Linux) dengan web UI.

---

## Security Skills (2)

### `security-audit` — Security Audit & Pentesting

**Paradigm**: Defensive.

**Capabilities**: OWASP Top 10, threat modeling (STRIDE, PASTA, attack trees), vulnerability
assessment (CVSS v4), penetration testing (web, network, binary, mobile, cloud), SAST
(Semgrep, CodeQL), DAST (OWASP ZAP, Burp), SCA (Dependabot, Snyk), remediation priorities.

**Integrasi dengan**: `security-crypto`.

**Kapan digunakan**: Security assessment, compliance audit, penetration testing.

---

### `security-crypto` — Modern Cryptography

**Paradigm**: Cryptographic.

**Capabilities**: Cryptographic primitives (AES-256-GCM, X25519, Ed25519, Argon2id),
Post-quantum crypto (CRYSTALS-Kyber, CRYSTALS-Dilithium, SPHINCS+), ZK-SNARKs/STARKs
(Groth16, PLONK, Halo2), MPC (secret sharing, threshold ECDSA), homomorphic encryption
(CKKS, BFV, TFHE), key management (HSM, KMS, TEE), TLS configuration (1.3, X25519).

**Integrasi dengan**: `security-audit`.

**Kapan digunakan**: Encryption strategy, key management, cryptographic protocol design.

---

## Systems Skills (4)

### `systems-ebpf` — eBPF Programming

**Paradigm**: Kernel extensibility.

**Capabilities**: Program types (XDP, TC, kprobe, tracepoint, cgroup), maps (hash, array,
LRU, ringbuf), CO-RE (BTF, libbpf, vmlinux.h), verifier constraints, production use cases
(Cilium, Falco, Pixie, Katran), development flow (compile→skeleton→load→attach).

**Integrasi dengan**: `infra-kubernetes`.

**Kapan digunakan**: Networking, observability, security at kernel level.

---

### `systems-embedded` — Embedded & IoT

**Paradigm**: Resource-constrained.

**Capabilities**: RTOS (Zephyr, FreeRTOS), bare-metal (startup, linker scripts, vector table,
memory-mapped I/O), protocols (I2C, SPI, UART, CAN, BLE), FPGA (Verilog, VHDL, HLS),
low-power design (sleep modes, clock gating, duty cycling), OTA firmware update (dual-bank,
MCUboot).

**Kapan digunakan**: IoT devices, microcontroller firmware, FPGA development.

---

### `math-hpc` — High-Performance Computing

**Paradigm**: Parallel.

**Capabilities**: CUDA optimization (kernel, shared memory, tensor cores), SIMD (AVX2,
AVX-512, NEON, SVE), numerical methods (ODE/PDE, FFT, linear algebra), parallel computing
(MPI, OpenMP, NCCL), Julia for HPC, roofline model analysis.

**Integrasi dengan**: `math-ml`.

**Kapan digunakan**: GPU computing, scientific simulation, performance-critical numerics.

---

### `math-ml` — Machine Learning Engineering

**Paradigm**: Statistical learning.

**Capabilities**: PyTorch (torch.compile, FSDP, DDP, mixed precision), JAX (JIT, vmap, pmap,
Pallas/Triton), training optimization (LR scheduling, AdamW, gradient clipping, curriculum
learning), model architecture (Transformers, Mamba, Diffusion), evaluation (metrics,
statistical significance, ablation).

**Integrasi dengan**: `math-hpc`.

**Kapan digunakan**: ML model training, inference optimization.

---

## Paradigm Skills (2)

### `paradigm-functional` — Functional Programming

**Paradigm**: Functional.

**Capabilities**: Pure functions, immutability, algebraic data types (sum/product types),
monads (Functor, Applicative, Monad), pattern matching, lazy evaluation, railway-oriented
programming, tagless final. Implementations: Haskell, Scala (ZIO/Cats), Rust, TypeScript (fp-ts).

**Integrasi dengan**: Semua backend skills, `database-event-sourcing`.

**Kapan digunakan**: Domain modeling, data transformation, concurrent-safe state management.

---

### `paradigm-actor` — Actor Model

**Paradigm**: Actor Model.

**Capabilities**: Everything is an actor, message-passing, isolated state, location
transparency, let-it-crash philosophy, supervision trees (one-for-one, one-for-all),
fault tolerance (circuit breaker, bulkheading), message patterns (request-response,
pub/sub, saga, backpressure).

**Integrasi dengan**: `backend-elixir`.

**Kapan digunakan**: Highly concurrent systems, fault-tolerant services, telecom/IoT/gaming.

---

## Workflow Skills (2)

### `understanding` — Deep Context Comprehension

**Paradigm**: Analytical.

**Capabilities**: Intent extraction (XY problem detection, emotional signal reading),
context mapping (temporal, technical, social, business, constraint), constraint identification
(hard/soft/imagined), assumption surfacing (factual, causal, behavioral), domain synthesis,
questioning frameworks (5 Whys, Socratic), brainstorming (first-principles, TRIZ, SCAMPER,
Six Thinking Hats), stakeholder analysis, validated understanding.

**Integrasi dengan**: Semua skills (prekondisi).

**Kapan digunakan**: SEBELUM tugas apapun — untuk memahami masalah dengan benar.

---

### `workflow-general` — General Development Workflow

**Paradigm**: Methodology.

**Capabilities**: Requirements analysis (user stories, acceptance criteria), architecture &
planning (ADR, component decomposition, interface contracts), implementation (branching
strategies, conventional commits, code review), testing (pyramid, TDD, property-based,
mutation), review (6-dimension scoring), deployment (CI/CD, feature flags, canary,
rollback), methodologies (Scrum, Kanban, Shape Up), DORA metrics, anti-patterns (15).

**Integrasi dengan**: Semua skills (framework proses).

**Kapan digunakan**: Setiap tugas development — sebagai process framework.

---

## Skill Integration Patterns

### Workflow Standar

```
User Input
    │
    ▼
[Load: understanding] ── Pahami intent, context, constraints
    │
    ▼
[Load: workflow-general] ── Rencanakan pendekatan eksekusi
    │
    ▼
[Load: domain-specific skill(s)] ── Eksekusi dengan best practices
    │
    ▼
[Load: code-reviewer] ── Self-evaluate 6 dimensi
```

### Domain-Specific Integration

| Skenario | Skills yang Harus Di-load |
|----------|--------------------------|
| Bug report | `understanding` → (domain skill berdasarkan lokasi bug) → `code-reviewer` |
| Fitur baru | `understanding` → `workflow-general` → (domain skills) → `code-reviewer` |
| Architecture decision | `understanding` → (semua domain skills relevan) → `code-reviewer` |
| Performance investigation | `understanding` → `infra-observability` → (domain skill) |
| Security incident | `understanding` → `security-audit` → (domain skill) → `security-crypto` |
| Cross-team project | `understanding` (stakeholder analysis) → `workflow-general` → (domain skills per tim) |

### Anti-Pattern Saat Load Skill

| ❌ Salah | ✅ Benar |
|---------|---------|
| Load `frontend-react` begitu melihat "React" di request | Load `understanding` dulu. Masalah mungkin data fetching, bukan React |
| Mulai coding karena "requestnya simple" | Jalankan understanding check 30 detik. Bahkan request simple punya context |
| Load semua skill "just in case" | Load hanya skill yang diindikasikan oleh synthesis. Skill loading ada cognitive cost |

---

> **Next:** [03-Commands](03-commands.md) — Pelajari 7 custom slash commands
