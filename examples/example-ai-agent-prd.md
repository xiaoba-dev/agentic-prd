```yaml
# @ai-instructions: Agentic PRD example v0.1
# Keep metadata synchronized with the checklist and changelog.
document_type: prd
prd_id: PRD-0001
status: in-progress
version: "0.1.0"
last_updated: 2026-06-21
author: Agentic PRD Maintainers
reviewers: []
product_name: Agentic PRD
tagline: Product intent that agents can execute
target: Validator and template format
priority: high
scope: module
phases: 3
current_phase: 2
progress: 33%
total_features: 6
implemented_features: 2
feature_ids:
  - FEAT-001
  - FEAT-002
  - FEAT-003
  - FEAT-004
  - FEAT-005
  - FEAT-006
blocked_by: []
blocks: []
depends_on: []
data_classification: public
internal_refs: []
external_refs:
  - https://opendefinition.org/od/2.1/en/
```

# PRD-0001: Agentic PRD Validator and Template Format

## TL;DR

Agentic PRD makes product specs readable by humans and reliably parseable by AI agents.

**Progress**: Phase 1 -> Phase 2 | 33% (2/6)

---

# Acceptance Checklist

## Phase 1: Format Contract

- [x] [FEAT-001] Define required metadata fields -> `schema/prd.schema.json`
- [x] [FEAT-002] Validate checklist feature id alignment -> `scripts/validate-prd.mjs`

## Phase 2: Public Templates

- [ ] [FEAT-003] Publish English template -> `templates/prd.en.md`
- [ ] [FEAT-004] Publish Simplified Chinese template -> `templates/prd.zh-CN.md`

## Phase 3: Adoption

- [ ] [FEAT-005] Provide generation and update prompts -> `prompts/`
- [ ] [FEAT-006] Document testing pyramid and contribution rules -> `docs/testing-strategy.md`

---

# Product Specification

<details open>
<summary>1. Overview</summary>

## 1.1 Positioning

Agentic PRD is a Markdown format for teams using AI agents during product and engineering work. It is not a project management system. It is a portable artifact that can travel through GitHub, local files, code review, and AI-assisted implementation loops.

## 1.2 Users and Scenarios

| User | Scenario | Pain | Desired Outcome |
|------|----------|------|-----------------|
| Product owner | Starts a new AI-assisted feature | PRDs are readable but not executable | A format agents can parse without losing product context |
| Engineer | Implements from a PRD | Acceptance criteria drift from code tasks | Checklist items map to files and feature ids |
| AI coding agent | Updates a spec after implementation | Free-form docs are hard to update safely | Metadata and checklist give stable anchors |

## 1.3 Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Example validation rate | 0% | 100% | `npm run validate` |
| Onboarding time | Unknown | Under 10 minutes | User can copy a template and validate it locally |

</details>

<details>
<summary>2. Background and Goals</summary>

## 2.1 Problem Statement

AI-assisted development increases the value of structured specifications. Existing PRDs often contain the right context, but they do not expose stable identifiers, progress math, dependency fields, or machine-readable instructions.

## 2.2 Goals

- Preserve a readable PRD narrative.
- Add a metadata contract that tools can verify.
- Keep the first implementation dependency-free.

## 2.3 Non-goals

- Replace project trackers.
- Define a universal product management methodology.
- Depend on a hosted service.

</details>

<details>
<summary>3. User Stories</summary>

| Priority | Story | Acceptance Criteria |
|----------|-------|---------------------|
| P0 | As a maintainer, I want a schema-backed PRD format, so that examples can be validated. | Given a complete example, when validation runs, then no metadata errors are reported. |
| P0 | As an engineer, I want checklist items to map to stable feature ids, so that implementation work can be tracked. | Given a PRD with `feature_ids`, when checklist ids differ, then validation fails. |
| P1 | As an AI agent, I want update instructions in the document, so that progress and changelog edits stay consistent. | Given a completed feature, when the PRD is updated, then progress and changelog are updated together. |

</details>

<details>
<summary>4. Solution</summary>

## 4.1 Feature Priority

| Feature | Priority | Status | Notes |
|---------|----------|--------|-------|
| Metadata schema | P0 | done | Defines required fields and enum values |
| Checklist alignment | P0 | done | Prevents orphan feature ids |
| Dual-language templates | P1 | in-progress | Helps adoption across English and Chinese users |
| Prompt library | P1 | planned | Supports generate and update workflows |

## 4.2 Core Flow

```text
Brief -> Agentic PRD -> Validation -> Implementation -> PRD Update -> Review
```

</details>

---

# Technical Specification

<details>
<summary>1. Architecture and Data</summary>

## 1.1 Architecture

```text
Markdown PRD -> Node Validator -> Test Runner -> GitHub Actions
```

## 1.2 Data Model

| Entity | Field | Notes |
|--------|-------|-------|
| PRD metadata | prd_id | Stable document id |
| PRD metadata | feature_ids | Ordered list of features |
| Checklist item | FEAT-XXX | Implementation anchor |

</details>

<details>
<summary>2. API and Integrations</summary>

This version has no network API. The local command surface is:

| Command | Description |
|---------|-------------|
| npm run validate | Validate templates, examples, and schema |
| npm test | Run all tests |

</details>

<details>
<summary>3. Security and Operations</summary>

| Item | Requirement |
|------|-------------|
| Data classification | public |
| Secrets | No secrets required |
| CI | Run tests and validator on pull requests |
| Rollback | Revert format changes by restoring schema and tests |

</details>

---

# Appendix

<details>
<summary>Glossary</summary>

| Term | Definition |
|------|------------|
| Agentic PRD | A PRD format designed for human review and AI-agent execution |
| Feature id | Stable `FEAT-XXX` identifier shared by metadata and checklist |

</details>

<details>
<summary>Related Documents</summary>

| Type | Link | Notes |
|------|------|-------|
| Schema | [prd.schema.json](../schema/prd.schema.json) | Metadata contract |
| Testing | [testing-strategy.md](../docs/testing-strategy.md) | TDD and pyramid policy |

</details>

## Changelog

| Date | Version | Change | Author |
|------|---------|--------|--------|
| 2026-06-21 | 0.1.0 | Initial example | Agentic PRD Maintainers |
