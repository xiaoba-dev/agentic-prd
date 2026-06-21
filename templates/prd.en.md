```yaml
# @ai-instructions: Agentic PRD template v0.1
# Keep metadata machine-readable. Keep narrative sections human-readable.
# feature_ids must match the acceptance checklist in order.
# progress = implemented_features / total_features * 100, rounded to the nearest integer.
document_type: prd
prd_id: PRD-XXXX
status: draft
version: "1.0.0"
last_updated: YYYY-MM-DD
author: "[Author]"
reviewers: []
product_name: "[Product Name]"
tagline: "[Short positioning]"
target: "[System/Module/Feature]"
priority: medium
scope: module
phases: 4
current_phase: 1
progress: 0%
total_features: 8
implemented_features: 0
feature_ids:
  - FEAT-001
  - FEAT-002
  - FEAT-003
  - FEAT-004
  - FEAT-005
  - FEAT-006
  - FEAT-007
  - FEAT-008
blocked_by: []
blocks: []
depends_on: []
data_classification: internal
internal_refs: []
external_refs: []
```

# PRD-XXXX: [Product or Feature Name]

## TL;DR

[One sentence: who this serves, what problem it solves, and what outcome it creates.]

**Progress**: Phase 1 -> Phase 2 | 0% (0/8)

---

# Acceptance Checklist

> High-frequency workspace for development, review, and agent updates.

## Phase 1: [Phase Name]

- [ ] [FEAT-001] [Feature 1] -> `path/to/file`
- [ ] [FEAT-002] [Feature 2] -> `path/to/file`

## Phase 2: [Phase Name]

- [ ] [FEAT-003] [Feature 3] -> `path/to/file`
- [ ] [FEAT-004] [Feature 4] -> `path/to/file`

## Phase 3: [Phase Name]

- [ ] [FEAT-005] [Feature 5] -> `path/to/file`
- [ ] [FEAT-006] [Feature 6] -> `path/to/file`

## Phase 4: [Phase Name]

- [ ] [FEAT-007] [Feature 7] -> `path/to/file`
- [ ] [FEAT-008] [Feature 8] -> `path/to/file`

---

# Product Specification

<details open>
<summary>1. Overview</summary>

## 1.1 Positioning

[Explain what the product is, what it is not, and the core value.]

## 1.2 Users and Scenarios

| User | Scenario | Pain | Desired Outcome |
|------|----------|------|-----------------|
| [User type] | [Scenario] | [Current pain] | [Target state] |

## 1.3 Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| [Metric] | [Current] | [Target] | [Method] |

</details>

<details>
<summary>2. Background and Goals</summary>

## 2.1 Problem Statement

[Describe the problem context, trigger, and business impact.]

## 2.2 Non-goals

- [Explicitly excluded scope]

</details>

<details>
<summary>3. User Stories</summary>

| Priority | Story | Acceptance Criteria |
|----------|-------|---------------------|
| P0 | As a [role], I want [capability], so that [value]. | Given/When/Then |

</details>

<details>
<summary>4. Solution</summary>

## 4.1 Feature Priority

| Feature | Priority | Status | Notes |
|---------|----------|--------|-------|
| [Feature] | P0 | draft | [Notes] |

## 4.2 Core Flow

```text
[Entry] -> [Action] -> [System Processing] -> [Outcome]
```

</details>

---

# Technical Specification

<details>
<summary>1. Architecture and Data</summary>

## 1.1 Architecture

```text
[Client] -> [Service] -> [Storage]
```

## 1.2 Data Model

| Entity | Field | Notes |
|--------|-------|-------|
| [Entity] | [field] | [Notes] |

</details>

<details>
<summary>2. API and Integrations</summary>

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/resource | [Description] |

</details>

<details>
<summary>3. Security and Operations</summary>

| Item | Requirement |
|------|-------------|
| Data classification | internal |
| Monitoring | [Metrics and thresholds] |
| Rollback | [Rollback path] |

</details>

---

# Appendix

<details>
<summary>Glossary</summary>

| Term | Definition |
|------|------------|
| [Term] | [Definition] |

</details>

<details>
<summary>Related Documents</summary>

| Type | Link | Notes |
|------|------|-------|
| ADR | [ADR-0001](../adr/ADR-0001.md) | [Notes] |

</details>

## Changelog

| Date | Version | Change | Author |
|------|---------|--------|--------|
| YYYY-MM-DD | 1.0.0 | Initial version | [Author] |
