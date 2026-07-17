---
title: 从零理解 Agent、Tools 和 Skills
date: 2026-07-08 11:10:00
categories:
  - 人工智能
tags:
  - Agent
  - Tools
  - Skills
excerpt: 用“目标、能力和流程”三个角度区分 Agent、Tools 与 Skills，建立可落地的智能体心智模型。
index_img: /img/post-cover.svg
---

把智能体系统拆开看，会更容易理解：Agent 负责围绕目标做决策，Tools 提供可调用能力，Skills 则沉淀完成某类任务的方法与约束。

> 模型擅长生成与推理；可靠的 Agent 还需要明确边界、可验证的工具结果和可复用的工作流程。

## 三者分别解决什么

- **Agent**：读取上下文、规划下一步、判断何时结束；
- **Tools**：访问文件、查询数据、调用接口或执行计算；
- **Skills**：规定某项工作应遵循的步骤、检查点和最佳实践。

```text
用户目标 → Agent 规划 → 调用 Tool 获取结果
                   ↓
              按 Skill 的流程校验
                   ↓
                交付结果
```

## 一个最小例子

例如“整理本周技术文章”：Agent 决定先搜集链接，再摘要并分类；网页搜索和文件写入是 Tools；“资料去重、引用来源、输出 Markdown”的规范就是 Skill。

```js
const task = {
  goal: '生成本周阅读清单',
  tools: ['search', 'writeFile'],
  skill: 'literature-summary'
};
```

## 设计时的注意点

不要把每个判断都硬编码进工具，也不要让 Agent 在没有验证的情况下宣布任务完成。优先让 Tool 返回结构化结果，并让 Skill 明确失败处理、权限边界和验收标准。
