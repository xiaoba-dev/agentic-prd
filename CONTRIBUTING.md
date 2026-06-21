# Contributing

Thanks for improving Agentic PRD.

## Development Setup

```bash
npm test
npm run validate
```

No package installation is required for the current validator and tests.

## TDD Rule

Write or update a failing test before changing the format contract, validator, schema, examples, or release checklist.

Preferred order:

1. Unit test for pure rule changes.
2. Integration test for template, example, or schema changes.
3. Release check for repository packaging changes.

## Pull Request Checklist

- Update templates if the format contract changes.
- Update examples so they remain complete and placeholder-free.
- Update `schema/prd.schema.json` when metadata changes.
- Run `npm test` and `npm run validate`.
- Keep changes narrow and explain migration impact.

## Commit Style

Use Conventional Commits when practical:

```text
feat(schema): add decision trace field
fix(validator): detect duplicate checklist ids
docs(readme): clarify license split
```
