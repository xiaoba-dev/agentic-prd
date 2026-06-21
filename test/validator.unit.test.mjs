import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  extractChecklistFeatureIds,
  parseFrontmatter,
  validateMetadata,
} from "../scripts/validate-prd.mjs";

describe("frontmatter parser", () => {
  it("parses the fenced yaml block and keeps scalar values", () => {
    const source = [
      "```yaml",
      "# @ai-instructions: test",
      "document_type: prd",
      "prd_id: PRD-0001",
      "status: draft",
      "progress: 50%",
      "feature_ids:",
      "  - FEAT-001",
      "  - FEAT-002",
      "```",
      "",
      "# PRD-0001: Example",
    ].join("\n");

    const parsed = parseFrontmatter(source);

    assert.equal(parsed.metadata.document_type, "prd");
    assert.equal(parsed.metadata.prd_id, "PRD-0001");
    assert.equal(parsed.metadata.progress, "50%");
    assert.deepEqual(parsed.metadata.feature_ids, ["FEAT-001", "FEAT-002"]);
    assert.equal(parsed.hasAiInstructions, true);
  });
});

describe("checklist feature id extraction", () => {
  it("extracts FEAT ids from acceptance checklist items only once", () => {
    const markdown = [
      "- [ ] [FEAT-001] First feature -> `src/a.ts`",
      "- [x] [FEAT-002] Second feature",
      "- [ ] [FEAT-001] Duplicate should be ignored",
      "- [ ] Not a feature item",
    ].join("\n");

    assert.deepEqual(extractChecklistFeatureIds(markdown), ["FEAT-001", "FEAT-002"]);
  });
});

describe("metadata validation", () => {
  it("accepts complete production metadata", () => {
    const result = validateMetadata({
      document_type: "prd",
      prd_id: "PRD-0001",
      status: "draft",
      version: "1.0.0",
      last_updated: "2026-06-21",
      author: "Maintainer",
      product_name: "Example Product",
      target: "Example Module",
      priority: "medium",
      scope: "module",
      phases: "4",
      current_phase: "1",
      progress: "25%",
      total_features: "4",
      implemented_features: "1",
      feature_ids: ["FEAT-001", "FEAT-002", "FEAT-003", "FEAT-004"],
      data_classification: "internal",
    });

    assert.deepEqual(result.errors, []);
  });

  it("rejects invalid enum values and inconsistent progress", () => {
    const result = validateMetadata({
      document_type: "prd",
      prd_id: "BAD-ID",
      status: "ready",
      version: "1",
      last_updated: "tomorrow",
      author: "Maintainer",
      product_name: "Example Product",
      target: "Example Module",
      priority: "urgent",
      scope: "epic",
      phases: "4",
      current_phase: "5",
      progress: "80%",
      total_features: "10",
      implemented_features: "2",
      feature_ids: ["FEAT-001"],
      data_classification: "secret",
    });

    assert.ok(result.errors.some((error) => error.includes("prd_id")));
    assert.ok(result.errors.some((error) => error.includes("status")));
    assert.ok(result.errors.some((error) => error.includes("progress")));
  });
});
