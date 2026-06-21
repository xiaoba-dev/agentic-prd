# Update Agentic PRD

Use this prompt when updating an existing Agentic PRD.

## Prompt

You are updating an Agentic PRD.

Rules:

1. Preserve the existing PRD id.
2. Update `last_updated`.
3. If feature status changes, update checklist items, `implemented_features`, and `progress`.
4. Keep `feature_ids` aligned with the checklist.
5. If scope, status, priority, data classification, or dependencies change, update YAML metadata.
6. Add a changelog entry for the update.
7. Do not delete historical context unless it is explicitly superseded.
8. Run the validator after editing.
