import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  validatePrdFile,
  validateSchemaFile,
} from "../scripts/validate-prd.mjs";

const projectPrdFiles = [
  { path: "templates/prd.zh-CN.md", template: true },
  { path: "templates/prd.en.md", template: true },
  { path: "examples/example-ai-agent-prd.md", template: false },
  { path: "examples/example-saas-prd.md", template: false },
];

describe("Agentic PRD project artifacts", () => {
  for (const file of projectPrdFiles) {
    it(`validates ${file.path}`, () => {
      const result = validatePrdFile(file.path, { template: file.template });
      assert.deepEqual(result.errors, []);
    });
  }

  it("keeps JSON schema aligned with the metadata contract", () => {
    const result = validateSchemaFile("schema/prd.schema.json");
    assert.deepEqual(result.errors, []);
  });
});
