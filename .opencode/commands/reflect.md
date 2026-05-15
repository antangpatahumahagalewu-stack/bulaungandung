---
description: Self-evaluation & reflection loop with 6-dimension scoring
agent: code-reviewer
subtask: true
---

## Self-Evaluation & Reflection Loop

### Task
Review the most recent code changes and evaluate them against:

$ARGUMENTS

### Evaluation Framework (6 Dimensions)
1. **Correctness** — Does the code correctly implement the requirements?
2. **Performance** — Are Core Web Vitals / throughput / latency optimal?
3. **Security** — OWASP Top 10, injection, auth, data exposure checked?
4. **Maintainability** — Readability, modularity, separation of concerns?
5. **Completeness** — Edge cases, error states, logging, types covered?
6. **Alignment** — Does output match original intent/vibe?

### Scoring
Assign a score (0-100) for each dimension. Overall = weighted average:
Overall = (C × 0.25) + (P × 0.15) + (S × 0.20) + (M × 0.15) + (Cp × 0.15) + (A × 0.10)

### Quality Gates
- Pass (>80): Code meets standards
- Conditional Pass (70-79): Minor improvements needed
- Fail (<70): Must fix and re-evaluate

### Instructions
Identify specific gaps. If score < 80 on any dimension, provide exact code changes needed.

Proceed.
