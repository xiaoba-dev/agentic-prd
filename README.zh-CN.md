# Agentic PRD

Agentic PRD 是一种面向 AI 协作开发的产品需求文档格式。

它把产品意图、验收清单、功能追踪、阶段进度、技术约束和运维要求组织成一份人类可读、Agent 可解析、工程可执行的 Markdown 文档。

## 为什么需要它

传统 PRD 主要服务评审。Agentic PRD 同时服务评审和执行。

它保留产品团队需要的叙事结构，同时加入可验证的机器契约：

- YAML 元数据，方便工具解析。
- `@ai-instructions`，给 Agent 明确处理规则。
- `feature_ids`，让功能点和验收清单一一对应。
- 阶段、进度、依赖、数据分级字段。
- 产品、技术、安全、运维、API 信息统一沉淀。

## 快速开始

复制模板：

```bash
cp templates/prd.zh-CN.md PRD-0001-my-feature.md
```

先填写 YAML，再写验收清单，最后补充详细产品和技术规格。

运行验证：

```bash
npm test
npm run validate
```

## 项目结构

```text
.
├── templates/        # 可复用模板
├── examples/         # 无占位符完整示例
├── schema/           # PRD 元数据 JSON Schema
├── scripts/          # 本地 validator
├── prompts/          # 生成和更新 PRD 的提示词
├── test/             # 单元、集成、发布检查
└── docs/             # 测试策略和项目说明
```

## 测试原则

本项目遵循“先 TDD，再测试金字塔”：

```text
发布检查       README、License、Prompts、CI、项目结构
集成测试       模板、示例、schema、validator 联合校验
单元测试       元数据解析、清单提取、纯规则校验
```

## 许可证

代码使用 MIT。

模板、示例和文档默认使用 CC BY 4.0，除非文件内另有说明。
