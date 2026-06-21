```yaml
# @ai-instructions: Agentic PRD template v0.1
# Keep metadata machine-readable. Keep narrative sections human-readable.
# feature_ids must match the acceptance checklist in order.
# progress = implemented_features / total_features * 100, rounded to the nearest integer.
document_type: prd
prd_id: PRD-XXXX
status: draft
version: "1.0.0"
last_updated: YYYY-MM-DD
author: "[作者]"
reviewers: []
product_name: "[产品名称]"
tagline: "[一句话定位]"
target: "[系统/模块/功能]"
priority: medium
scope: module
phases: 4
current_phase: 1
progress: 0%
total_features: 8
implemented_features: 0
feature_ids:
  - FEAT-001
  - FEAT-002
  - FEAT-003
  - FEAT-004
  - FEAT-005
  - FEAT-006
  - FEAT-007
  - FEAT-008
blocked_by: []
blocks: []
depends_on: []
data_classification: internal
internal_refs: []
external_refs: []
```

# PRD-XXXX: [产品/功能名称]

## TL;DR

[用一句话说明：为谁解决什么问题，带来什么结果。]

**进度**：Phase 1 -> Phase 2 | 0% (0/8)

---

# 验收清单

> 高频工作区。开发、评审和 Agent 更新时优先看这里。

## Phase 1: [阶段名称]

- [ ] [FEAT-001] [功能点 1] -> `path/to/file`
- [ ] [FEAT-002] [功能点 2] -> `path/to/file`

## Phase 2: [阶段名称]

- [ ] [FEAT-003] [功能点 3] -> `path/to/file`
- [ ] [FEAT-004] [功能点 4] -> `path/to/file`

## Phase 3: [阶段名称]

- [ ] [FEAT-005] [功能点 5] -> `path/to/file`
- [ ] [FEAT-006] [功能点 6] -> `path/to/file`

## Phase 4: [阶段名称]

- [ ] [FEAT-007] [功能点 7] -> `path/to/file`
- [ ] [FEAT-008] [功能点 8] -> `path/to/file`

---

# 产品规格

<details open>
<summary>1. 概述</summary>

## 1.1 产品定位

[说明产品是什么，不是什么，以及核心价值。]

## 1.2 用户与场景

| 用户 | 场景 | 痛点 | 期望结果 |
|------|------|------|----------|
| [用户类型] | [使用场景] | [当前痛点] | [目标状态] |

## 1.3 成功指标

| 指标 | 当前值 | 目标值 | 衡量方式 |
|------|--------|--------|----------|
| [指标] | [当前] | [目标] | [方法] |

</details>

<details>
<summary>2. 背景与目标</summary>

## 2.1 问题陈述

[描述问题背景、触发原因和业务影响。]

## 2.2 非目标

- [明确不做的范围]

</details>

<details>
<summary>3. 用户故事</summary>

| 优先级 | 用户故事 | 验收标准 |
|--------|----------|----------|
| P0 | 作为 [角色]，我想要 [能力]，以便 [价值] | Given/When/Then |

</details>

<details>
<summary>4. 解决方案</summary>

## 4.1 功能优先级

| 功能 | 优先级 | 状态 | 说明 |
|------|--------|------|------|
| [功能] | P0 | draft | [说明] |

## 4.2 核心流程

```text
[入口] -> [操作] -> [系统处理] -> [结果]
```

</details>

---

# 技术规格

<details>
<summary>1. 架构与数据</summary>

## 1.1 架构图

```text
[Client] -> [Service] -> [Storage]
```

## 1.2 数据模型

| 实体 | 字段 | 说明 |
|------|------|------|
| [Entity] | [field] | [说明] |

</details>

<details>
<summary>2. API 与集成</summary>

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/resource | [说明] |

</details>

<details>
<summary>3. 安全与运维</summary>

| 项目 | 要求 |
|------|------|
| 数据分级 | internal |
| 监控 | [指标和阈值] |
| 回滚 | [回滚方式] |

</details>

---

# 附录

<details>
<summary>术语表</summary>

| 术语 | 定义 |
|------|------|
| [术语] | [定义] |

</details>

<details>
<summary>相关文档</summary>

| 类型 | 链接 | 说明 |
|------|------|------|
| ADR | [ADR-0001](../adr/ADR-0001.md) | [说明] |

</details>

## 更新日志

| 日期 | 版本 | 变更 | 作者 |
|------|------|------|------|
| YYYY-MM-DD | 1.0.0 | 初始版本 | [作者] |
