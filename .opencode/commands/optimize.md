---
description: Performance optimization audit
agent: lore-master
subtask: true
---

## Performance Optimization

### Context
$ARGUMENTS

### Optimization Framework
1. **Frontend**: Core Web Vitals (LCP, FID, CLS), bundle size, render performance, memoization, lazy loading, code splitting
2. **Backend**: Query optimization, connection pooling, caching strategy, N+1 elimination, async I/O
3. **Database**: Index analysis, query plan review, partitioning, materialized views, connection management
4. **Infrastructure**: CDN, edge computing, load balancing, auto-scaling, resource limits
5. **Network**: Payload optimization, compression, HTTP/2/3, WebSocket efficiency

### Instructions
- Audit the current state
- Identify bottlenecks with data (profiling results)
- Propose measured optimizations with benchmarks
- Target: Core Web Vitals 100/100, 60fps, <200ms p95 latency

Proceed.
