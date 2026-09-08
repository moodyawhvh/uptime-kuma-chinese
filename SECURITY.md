> 🌐 本文档由 [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) 翻译,英文原版见原项目。

# 安全策略

> [!CAUTION]
> 遗憾的是,各种 AI 生成的垃圾报告一直在浪费我的时间。此类报告会被直接关闭,提交者会被立即封禁。

## 报告漏洞

1. 请将安全问题报告至
   <https://github.com/louislam/uptime-kuma/security/advisories/new>。
2. 同时请另建一个空的 security issue 提醒我,因为 GitHub Advisories 不会发送通知,如果没有这一步我很可能会漏看。
   <https://github.com/louislam/uptime-kuma/issues/new?assignees=&labels=help&template=security.md>

- 不要提交任何上游依赖问题 / 各类工具的扫描结果,此类报告会被立即关闭且不作解释。除非你有 PoC 能证明该上游问题确实影响 Uptime Kuma。
- 不要使用公开 issue 跟踪器,也不要在公开场合讨论,否则会造成更大损害。
- 不要提交任何 SSRF 问题。

## 是否接受其他第三方漏洞赏金平台?

目前我**不接受**其他漏洞赏金平台,因为我并不熟悉这些平台,而且已经有人借这种途径向我发送过钓鱼链接。为了降低我自身的风险,请仅通过 GitHub Advisories 报告。所有第三方漏洞赏金平台的邮件我都会忽略。

## 支持的版本

### Uptime Kuma 版本

请使用或升级到 Uptime Kuma 的最新版本。所有版本均可升级到最新版。

### 可升级的 Docker 标签

| 标签            | 是否支持                                                                              |
| --------------- | ------------------------------------------------------------------------------------- |
| 2               | :white_check_mark:                                                                    |
| 2-slim          | :white_check_mark:                                                                    |
| next            | :white_check_mark:                                                                    |
| next-slim       | :white_check_mark:                                                                    |
| 2-rootless      | :white_check_mark:                                                                    |
| 2-slim-rootless | :white_check_mark:                                                                    |
| 1               | [⚠️ 已弃用](https://github.com/louislam/uptime-kuma/wiki/Migration-From-v1-To-v2)     |
| 1-debian        | [⚠️ 已弃用](https://github.com/louislam/uptime-kuma/wiki/Migration-From-v1-To-v2)     |
| latest          | [⚠️ 已弃用](https://github.com/louislam/uptime-kuma/wiki/Migration-From-v1-To-v2)     |
| debian          | [⚠️ 已弃用](https://github.com/louislam/uptime-kuma/wiki/Migration-From-v1-To-v2)     |
| 其他所有标签    | ❌                                                                                    |
