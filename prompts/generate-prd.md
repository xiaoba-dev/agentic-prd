# Generate Agentic PRD

Use this prompt to generate a new Agentic PRD from a product brief.

## Prompt

You are writing an Agentic PRD.

Input:

- Product name:
- Target system, module, or feature:
- User problem:
- Primary users:
- Constraints:
- Known technical stack:

Rules:

1. Start with a fenced `yaml` metadata block.
2. Include `@ai-instructions`.
3. Fill every required metadata field.
4. Create stable `FEAT-XXX` ids.
5. Ensure `feature_ids` exactly match the acceptance checklist.
6. Write the acceptance checklist before long-form specification.
7. Keep product narrative readable for humans.
8. Use `<details>` for long-form sections.
9. Include product, technical, security, operations, API, appendix, and changelog sections.
10. Avoid placeholders in final output.
