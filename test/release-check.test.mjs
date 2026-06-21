import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";

const requiredFiles = [
  "README.md",
  "README.zh-CN.md",
  "LICENSE",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "templates/prd.zh-CN.md",
  "templates/prd.en.md",
  "schema/prd.schema.json",
  "prompts/generate-prd.md",
  "prompts/update-prd.md",
  ".github/workflows/test.yml",
];

describe("release readiness", () => {
  it("ships the expected open-source repository files", () => {
    for (const file of requiredFiles) {
      assert.equal(existsSync(file), true, `${file} should exist`);
    }
  });

  it("README explains positioning, quick start, validation, license, and related ideas", () => {
    const readme = readFileSync("README.md", "utf8");
    for (const section of [
      "Agentic PRD",
      "Quick Start",
      "Validation",
      "Testing Pyramid",
      "License",
      "Related Ideas",
    ]) {
      assert.match(readme, new RegExp(section));
    }
  });

  it("project uses separate content and code licenses", () => {
    const readme = readFileSync("README.md", "utf8");
    assert.match(readme, /MIT/);
    assert.match(readme, /CC BY 4\.0/);
  });
});
