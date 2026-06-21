# Testing Strategy

Agentic PRD follows TDD first, then a pragmatic testing pyramid.

## Pyramid

```text
Release checks      Repository readiness and public packaging
Integration tests   Templates, examples, schema, and validator together
Unit tests          Pure parsing and validation rules
```

## Rules

- Add the smallest failing test first.
- Put pure format rules in unit tests.
- Put whole-file template and example checks in integration tests.
- Put GitHub-facing readiness checks in release tests.
- Do not chase 100 percent coverage. Protect the format contract and the release path.

## Commands

```bash
npm run test:unit
npm run test:integration
npm run test:release
npm test
npm run validate
```
