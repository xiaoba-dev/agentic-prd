#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const STATUS_VALUES = ["draft", "in-progress", "phase-X-complete", "completed", "deprecated"];
const PRIORITY_VALUES = ["low", "medium", "high", "critical"];
const SCOPE_VALUES = ["system", "module", "feature"];
const DATA_CLASSIFICATION_VALUES = ["public", "internal", "confidential", "restricted"];

const REQUIRED_METADATA_FIELDS = [
  "document_type",
  "prd_id",
  "status",
  "version",
  "last_updated",
  "author",
  "product_name",
  "target",
  "priority",
  "scope",
  "phases",
  "current_phase",
  "progress",
  "total_features",
  "implemented_features",
  "feature_ids",
  "data_classification",
];

const REQUIRED_SECTIONS = {
  zh: ["## TL;DR", "# 验收清单", "# 产品规格", "# 技术规格", "# 附录", "## 更新日志"],
  en: ["## TL;DR", "# Acceptance Checklist", "# Product Specification", "# Technical Specification", "# Appendix", "## Changelog"],
};

export function parseFrontmatter(source) {
  const match = source.match(/^\s*```yaml\n([\s\S]*?)\n```/);
  if (!match) {
    return {
      raw: "",
      metadata: {},
      hasAiInstructions: false,
      body: source,
    };
  }

  const raw = match[1];
  return {
    raw,
    metadata: parseSimpleYaml(raw),
    hasAiInstructions: raw.includes("@ai-instructions"),
    body: source.slice(match[0].length),
  };
}

function parseSimpleYaml(raw) {
  const metadata = {};
  let currentListKey = null;

  for (const rawLine of raw.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+$/, "");
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && currentListKey) {
      metadata[currentListKey].push(stripYamlValue(listItem[1]));
      continue;
    }

    const pair = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!pair) {
      currentListKey = null;
      continue;
    }

    const [, key, rawValue] = pair;
    const value = rawValue.trim();
    if (value === "") {
      metadata[key] = [];
      currentListKey = key;
    } else if (value === "[]") {
      metadata[key] = [];
      currentListKey = null;
    } else {
      metadata[key] = stripYamlValue(value);
      currentListKey = null;
    }
  }

  return metadata;
}

function stripYamlValue(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function extractChecklistFeatureIds(markdown) {
  const ids = [];
  const seen = new Set();
  const pattern = /-\s+\[[ xX]\]\s+\[(FEAT-\d{3})\]/g;

  for (const match of markdown.matchAll(pattern)) {
    if (!seen.has(match[1])) {
      ids.push(match[1]);
      seen.add(match[1]);
    }
  }

  return ids;
}

export function validateMetadata(metadata, options = {}) {
  const errors = [];
  const allowPlaceholders = options.template === true;

  for (const field of REQUIRED_METADATA_FIELDS) {
    if (metadata[field] === undefined || metadata[field] === "") {
      errors.push(`metadata.${field} is required`);
    }
  }

  if (errors.length > 0) return { errors };

  if (metadata.document_type !== "prd") {
    errors.push("metadata.document_type must be prd");
  }

  if (!/^PRD-\d{4}$/.test(metadata.prd_id) && !(allowPlaceholders && metadata.prd_id === "PRD-XXXX")) {
    errors.push("metadata.prd_id must match PRD-0001");
  }

  assertEnum(errors, "status", metadata.status, STATUS_VALUES);
  assertEnum(errors, "priority", metadata.priority, PRIORITY_VALUES);
  assertEnum(errors, "scope", metadata.scope, SCOPE_VALUES);
  assertEnum(errors, "data_classification", metadata.data_classification, DATA_CLASSIFICATION_VALUES);

  if (!/^\d+\.\d+\.\d+$/.test(metadata.version)) {
    errors.push("metadata.version must use semantic versioning");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.last_updated) && !(allowPlaceholders && metadata.last_updated === "YYYY-MM-DD")) {
    errors.push("metadata.last_updated must use YYYY-MM-DD");
  }

  const phases = toInteger(metadata.phases);
  const currentPhase = toInteger(metadata.current_phase);
  const totalFeatures = toInteger(metadata.total_features);
  const implementedFeatures = toInteger(metadata.implemented_features);
  const progress = parseProgress(metadata.progress);

  if (!Number.isInteger(phases) || phases < 1) {
    errors.push("metadata.phases must be a positive integer");
  }
  if (!Number.isInteger(currentPhase) || currentPhase < 1 || currentPhase > phases) {
    errors.push("metadata.current_phase must be between 1 and phases");
  }
  if (!Number.isInteger(totalFeatures) || totalFeatures < 0) {
    errors.push("metadata.total_features must be a non-negative integer");
  }
  if (!Number.isInteger(implementedFeatures) || implementedFeatures < 0 || implementedFeatures > totalFeatures) {
    errors.push("metadata.implemented_features must be between 0 and total_features");
  }
  if (!Number.isInteger(progress) || progress < 0 || progress > 100) {
    errors.push("metadata.progress must be a percentage from 0% to 100%");
  } else {
    const expectedProgress = totalFeatures === 0 ? 0 : Math.round((implementedFeatures / totalFeatures) * 100);
    if (progress !== expectedProgress) {
      errors.push(`metadata.progress must equal implemented_features / total_features (${expectedProgress}%)`);
    }
  }

  if (!Array.isArray(metadata.feature_ids)) {
    errors.push("metadata.feature_ids must be a list");
  } else {
    const unique = new Set(metadata.feature_ids);
    if (unique.size !== metadata.feature_ids.length) {
      errors.push("metadata.feature_ids must not contain duplicates");
    }
    if (metadata.feature_ids.some((id) => !/^FEAT-\d{3}$/.test(id))) {
      errors.push("metadata.feature_ids must use FEAT-001 format");
    }
    if (Number.isInteger(totalFeatures) && metadata.feature_ids.length !== totalFeatures) {
      errors.push("metadata.feature_ids length must equal total_features");
    }
  }

  return { errors };
}

function assertEnum(errors, field, value, allowedValues) {
  if (!allowedValues.includes(value)) {
    errors.push(`metadata.${field} must be one of ${allowedValues.join(", ")}`);
  }
}

function toInteger(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string" || !/^\d+$/.test(value)) return Number.NaN;
  return Number.parseInt(value, 10);
}

function parseProgress(value) {
  if (typeof value !== "string") return Number.NaN;
  const match = value.match(/^(\d+)%$/);
  return match ? Number.parseInt(match[1], 10) : Number.NaN;
}

export function validatePrdFile(filePath, options = {}) {
  const errors = [];
  if (!existsSync(filePath)) {
    return { filePath, errors: [`${filePath} does not exist`] };
  }

  const source = readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(source);

  if (!parsed.raw) {
    errors.push("missing fenced yaml metadata block");
  }
  if (!parsed.hasAiInstructions) {
    errors.push("metadata must include @ai-instructions");
  }

  errors.push(...validateMetadata(parsed.metadata, options).errors);

  const sectionSet = detectSectionSet(source);
  for (const section of sectionSet) {
    if (!source.includes(section)) {
      errors.push(`missing section: ${section}`);
    }
  }

  if (!source.includes("<details") || !source.includes("<summary>")) {
    errors.push("document must use <details> and <summary> for long-form sections");
  }

  const checklistIds = extractChecklistFeatureIds(source);
  if (Array.isArray(parsed.metadata.feature_ids)) {
    const declared = parsed.metadata.feature_ids.join(",");
    const checked = checklistIds.join(",");
    if (declared !== checked) {
      errors.push("metadata.feature_ids must match acceptance checklist FEAT ids in order");
    }
  }

  if (!options.template && !source.includes(`# ${parsed.metadata.prd_id}:`)) {
    errors.push("document title must include the PRD id");
  }

  return { filePath, errors };
}

function detectSectionSet(source) {
  return source.includes("# 验收清单") ? REQUIRED_SECTIONS.zh : REQUIRED_SECTIONS.en;
}

export function validateSchemaFile(filePath) {
  const errors = [];
  if (!existsSync(filePath)) {
    return { filePath, errors: [`${filePath} does not exist`] };
  }

  let schema;
  try {
    schema = JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    return { filePath, errors: [`schema is not valid JSON: ${error.message}`] };
  }

  const required = schema.required ?? [];
  const properties = schema.properties ?? {};
  for (const field of REQUIRED_METADATA_FIELDS) {
    if (!required.includes(field)) {
      errors.push(`schema.required must include ${field}`);
    }
    if (!properties[field]) {
      errors.push(`schema.properties must include ${field}`);
    }
  }

  assertSchemaEnum(errors, properties.status, "status", STATUS_VALUES);
  assertSchemaEnum(errors, properties.priority, "priority", PRIORITY_VALUES);
  assertSchemaEnum(errors, properties.scope, "scope", SCOPE_VALUES);
  assertSchemaEnum(errors, properties.data_classification, "data_classification", DATA_CLASSIFICATION_VALUES);

  return { filePath, errors };
}

function assertSchemaEnum(errors, property, field, expected) {
  const actual = property?.enum ?? [];
  if (expected.some((value) => !actual.includes(value))) {
    errors.push(`schema enum for ${field} must include ${expected.join(", ")}`);
  }
}

export function validateProject() {
  const results = [
    validatePrdFile("templates/prd.zh-CN.md", { template: true }),
    validatePrdFile("templates/prd.en.md", { template: true }),
    validatePrdFile("examples/example-ai-agent-prd.md"),
    validatePrdFile("examples/example-saas-prd.md"),
    validateSchemaFile("schema/prd.schema.json"),
  ];
  return results;
}

function printResults(results) {
  let failures = 0;
  for (const result of results) {
    if (result.errors.length === 0) {
      console.log(`ok ${result.filePath}`);
      continue;
    }
    failures += result.errors.length;
    console.error(`not ok ${result.filePath}`);
    for (const error of result.errors) {
      console.error(`  - ${error}`);
    }
  }
  return failures;
}

const cliPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const modulePath = fileURLToPath(import.meta.url);

if (cliPath === modulePath) {
  const failures = printResults(validateProject());
  process.exitCode = failures === 0 ? 0 : 1;
}
