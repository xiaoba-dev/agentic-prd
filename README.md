# Agentic PRD

Agentic PRD is a human-readable and machine-parseable PRD format for AI-assisted software development.

It turns product intent into structured metadata, acceptance checklists, implementation traceability, and operational context that humans and AI agents can maintain together.

## Why This Exists

Classic PRDs are written for review. Agentic PRDs are written for review and execution.

The format keeps the narrative parts product teams need, while adding a stable metadata contract that tools can validate, index, and update:

- Fenced YAML metadata for machine parsing.
- `@ai-instructions` for agent behavior.
- `feature_ids` that map to acceptance checklist items.
- Phase, progress, dependency, and data classification fields.
- Product, technical, security, operations, and API sections in one Markdown artifact.

## Quick Start

Copy a template:

```bash
cp templates/prd.en.md PRD-0001-my-feature.md
```

Fill the YAML block, then write the acceptance checklist before the long-form sections.

Validate the project:

```bash
npm test
npm run validate
```

## Repository Structure

```text
.
├── templates/        # Reusable Agentic PRD templates
├── examples/         # Complete examples without placeholders
├── schema/           # JSON Schema for PRD metadata
├── scripts/          # Local validator
├── prompts/          # Prompts for generating and updating PRDs
├── test/             # Unit, integration, and release tests
└── docs/             # Project notes and testing strategy
```

## Format Contract

Every Agentic PRD starts with a fenced YAML block:

```yaml
document_type: prd
prd_id: PRD-0001
status: draft
version: "1.0.0"
last_updated: 2026-06-21
feature_ids:
  - FEAT-001
```

The `feature_ids` list must match the acceptance checklist in order:

```markdown
- [ ] [FEAT-001] Define metadata schema -> `schema/prd.schema.json`
```

## Validation

This project ships a no-dependency Node validator:

```bash
npm run validate
```

It checks:

- Required metadata fields.
- Enum values for status, priority, scope, and data classification.
- Semantic version and date format.
- Progress consistency: `implemented_features / total_features`.
- `feature_ids` alignment with checklist items.
- Required PRD sections and collapsible detail blocks.
- JSON Schema alignment with the metadata contract.

## Testing Pyramid

The project follows TDD first, then pyramid testing:

```text
Release checks      README, license, prompts, CI, package shape
Integration tests   Templates, examples, schema, validator together
Unit tests          Metadata parsing, checklist extraction, pure rules
```

Commands:

```bash
npm run test:unit
npm run test:integration
npm run test:release
npm test
```

## Templates

- `templates/prd.en.md` for English teams.
- `templates/prd.zh-CN.md` for Chinese teams.

The templates preserve a practical PRD structure: TL;DR, acceptance checklist, product specification, technical specification, appendix, and changelog.

## Related Ideas

Agentic PRD is related to, but not affiliated with, broader ideas such as LLM Wiki, agent memory, knowledge graphs, open knowledge, and executable specifications.

The goal is intentionally narrow: make PRDs easier for humans to review and easier for AI agents to parse, update, and verify.

## License

Code is licensed under MIT.

Templates, examples, and documentation are licensed under CC BY 4.0 unless a file states otherwise.
