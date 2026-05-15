---
description: Vibe-to-Code Pipeline: Intent → Spec → Code → Test → Deploy (5-stage)
agent: vibe-coder
subtask: true
---

You are executing the Vibe-to-Code Pipeline (5-stage).

## Input Intent
$ARGUMENTS

## Pipeline Stages

### Stage 1: INTENT ANALYSIS
- Parse the user's natural language intent
- Identify the domain, tech stack, and core requirements
- Extract constraints (performance, security, scalability)
- Output: Structured requirements document

### Stage 2: SPECIFICATION
- Generate detailed technical specification
- Define architecture: components, data flow, API contracts
- Choose optimal design patterns and paradigm
- Define data models, state management, error handling
- Output: Technical spec with architecture diagram (ascii)

### Stage 3: CODE GENERATION
- Implement the specification with production-grade quality
- Follow SOLID, DRY, KISS principles
- Include comprehensive error handling, logging, types
- Add inline documentation for complex logic
- Output: Complete implementation files

### Stage 4: TESTING
- Generate comprehensive test suite
- Unit tests (happy path + edge cases + error states)
- Integration tests
- Performance benchmarks where applicable
- Output: Test files with >90% coverage target

### Stage 5: DEPLOYMENT
- Generate CI/CD configuration
- Infrastructure as Code if applicable
- Progressive delivery strategy (canary/blue-green)
- Observability: metrics, logs, traces
- Output: Deployment configuration + runbook

## Quality Gates (must pass BOTH gates to advance)
- Gate A: Self-evaluation by code-reviewer agent (check correctness, security, performance)
- Gate B: Reflect on whether the output matches the original intent

## Instructions
Execute each stage sequentially. After each stage, invoke the code-reviewer subagent for quality gate A before proceeding. If any gate fails, iterate and fix before advancing.

Proceed with Stage 1 now.
