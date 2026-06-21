```yaml
# @ai-instructions: Agentic PRD example v0.1
# Keep onboarding scope narrow and measurable.
document_type: prd
prd_id: PRD-0002
status: draft
version: "0.1.0"
last_updated: 2026-06-21
author: Agentic PRD Maintainers
reviewers: []
product_name: Atlas CRM
tagline: Faster activation for new teams
target: Team onboarding flow
priority: medium
scope: feature
phases: 3
current_phase: 1
progress: 20%
total_features: 5
implemented_features: 1
feature_ids:
  - FEAT-001
  - FEAT-002
  - FEAT-003
  - FEAT-004
  - FEAT-005
blocked_by: []
blocks: []
depends_on: []
data_classification: internal
internal_refs: []
external_refs: []
```

# PRD-0002: Atlas CRM Team Onboarding Flow

## TL;DR

Atlas CRM will guide new teams from account creation to first imported contact list in under five minutes.

**Progress**: Phase 1 -> Phase 2 | 20% (1/5)

---

# Acceptance Checklist

## Phase 1: Entry and Workspace Setup

- [x] [FEAT-001] Create workspace naming step -> `src/onboarding/workspace.ts`
- [ ] [FEAT-002] Add invite teammate step -> `src/onboarding/invite.ts`

## Phase 2: Data Import

- [ ] [FEAT-003] Add CSV contact import preview -> `src/onboarding/import-preview.ts`
- [ ] [FEAT-004] Validate duplicate contact handling -> `src/onboarding/dedupe.ts`

## Phase 3: Activation

- [ ] [FEAT-005] Show first dashboard after import -> `src/onboarding/dashboard.ts`

---

# Product Specification

<details open>
<summary>1. Overview</summary>

## 1.1 Positioning

Atlas CRM serves small sales teams that need a lightweight path from signup to usable customer data. The onboarding flow reduces blank-state confusion and gives teams a visible first success.

## 1.2 Users and Scenarios

| User | Scenario | Pain | Desired Outcome |
|------|----------|------|-----------------|
| Sales manager | Creates a workspace for a three-person team | Setup feels abstract before contacts exist | Team sees a dashboard with imported leads |
| Account executive | Joins an invited workspace | Unsure what to do first | Clear next step after joining |

## 1.3 Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Signup-to-first-import | 18 minutes | Under 5 minutes | Product analytics funnel |
| Onboarding completion | 42% | 70% | Completed checklist event |

</details>

<details>
<summary>2. Background and Goals</summary>

## 2.1 Problem Statement

New teams sign up with intent but leave before seeing value. Interviews show the first contact import is the activation moment because it turns the product from an empty shell into a working CRM.

## 2.2 Goals

- Make the next step obvious at every point.
- Support CSV import with preview before commit.
- Keep the flow short enough for a trial user to complete during first session.

## 2.3 Non-goals

- Full data migration from every CRM.
- Billing setup.
- Advanced field mapping.

</details>

<details>
<summary>3. User Stories</summary>

| Priority | Story | Acceptance Criteria |
|----------|-------|---------------------|
| P0 | As a sales manager, I want to name my workspace, so that my team has a shared account context. | Given I am creating an account, when I enter a workspace name, then the system creates a workspace and moves me forward. |
| P0 | As a sales manager, I want to preview imported contacts, so that I can catch CSV mistakes before saving. | Given I upload a CSV, when parsing succeeds, then I see row count, columns, and validation issues. |
| P1 | As an invited teammate, I want to land in the right workspace, so that I can start without setup confusion. | Given I accept an invite, when I sign in, then I land in the invited workspace. |

</details>

<details>
<summary>4. Solution</summary>

## 4.1 Feature Priority

| Feature | Priority | Status | Notes |
|---------|----------|--------|-------|
| Workspace naming | P0 | done | Required before all later steps |
| Teammate invite | P1 | draft | Can be skipped |
| CSV preview | P0 | draft | Activation-critical |
| Duplicate handling | P1 | draft | Prevents noisy data |
| First dashboard | P0 | draft | Confirms value |

## 4.2 Core Flow

```text
Signup -> Workspace Name -> Invite Team -> Import CSV -> Preview -> Dashboard
```

</details>

---

# Technical Specification

<details>
<summary>1. Architecture and Data</summary>

## 1.1 Architecture

```text
Onboarding UI -> Import Service -> Contacts Store -> Dashboard
```

## 1.2 Data Model

| Entity | Field | Notes |
|--------|-------|-------|
| Workspace | name | Required |
| Invite | email | Optional teammate invite |
| ContactImport | status | previewed, committed, failed |

</details>

<details>
<summary>2. API and Integrations</summary>

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/workspaces | Create workspace |
| POST | /api/imports/contacts/preview | Parse CSV and return preview |
| POST | /api/imports/contacts/commit | Commit previewed contacts |

</details>

<details>
<summary>3. Security and Operations</summary>

| Item | Requirement |
|------|-------------|
| Data classification | internal |
| Upload limit | 5 MB per CSV |
| Monitoring | Import failure rate and parse latency |
| Rollback | Feature flag disables CSV import step |

</details>

---

# Appendix

<details>
<summary>Glossary</summary>

| Term | Definition |
|------|------------|
| Activation | The moment a new team sees useful CRM data |
| CSV preview | Parsed import state before contacts are saved |

</details>

<details>
<summary>Related Documents</summary>

| Type | Link | Notes |
|------|------|-------|
| Example | [example-ai-agent-prd.md](./example-ai-agent-prd.md) | Format-focused example |

</details>

## Changelog

| Date | Version | Change | Author |
|------|---------|--------|--------|
| 2026-06-21 | 0.1.0 | Initial SaaS onboarding example | Agentic PRD Maintainers |
