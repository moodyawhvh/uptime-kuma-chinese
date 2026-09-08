# uptime-kuma 中文文档

[![原项目](https://img.shields.io/badge/原项目-louislam--uptime-kuma-blue?style=flat-square&logo=github)](https://github.com/louislam/uptime-kuma)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

> 本文档是 [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) 官方 README 的中文翻译,内容以原项目为准。代部署 / 定制服务 / 技术咨询 请添加微信:**uaycar**。

Uptime Kuma 是一款简单易用的自托管监控工具。

**在线演示**(德国法兰克福节点,临时演示,数据 10 分钟后自动清除):<https://demo.kuma.pet/start-demo>

## ⭐ 主要特性

- 支持监控:HTTP(s) / TCP / HTTP(s) 关键词 / HTTP(s) Json 查询 / WebSocket / Ping / DNS 记录 / Push / Steam 游戏服务器 / Docker 容器
- 界面精美、响应式、速度快
- 通过 Telegram、Discord、Gotify、Slack、Pushover、邮件(SMTP)以及 [90+ 通知服务](https://github.com/louislam/uptime-kuma/tree/master/src/components/notifications)发送告警
- 探测间隔最短 20 秒
- [多语言界面](https://github.com/louislam/uptime-kuma/tree/master/src/lang)
- 多状态页,可把状态页绑定到指定域名
- Ping 图表
- 证书信息
- 代理支持
- 两步验证(2FA)

## 🔧 安装方法

### 🐳 Docker Compose

```bash
mkdir uptime-kuma
cd uptime-kuma
curl -o compose.yaml https://raw.githubusercontent.com/louislam/uptime-kuma/master/compose.yaml
docker compose up -d
```

启动后,Uptime Kuma 会监听所有网络接口(例如 http://localhost:3001 或 http://你的IP:3001)。

> [!WARNING]
> 不支持 **NFS**(网络文件系统)等文件系统,请挂载本地目录或卷。

### 🐳 Docker 命令

```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:2
```

如果只想监听本机,可使用:

```bash
docker run ... -p 127.0.0.1:3001:3001 ...
```

### 💪🏻 非 Docker 方式

环境要求:

- 平台
  - ✅ 主流 Linux 发行版,如 Debian、Ubuntu、Fedora、ArchLinux 等
  - ✅ Windows 10 (x64)、Windows Server 2012 R2 (x64) 或更高版本
  - ❌ FreeBSD / OpenBSD / NetBSD
  - ❌ Replit / Heroku
- [Node.js](https://nodejs.org/en/download/) >= 20.4
- [Git](https://git-scm.com/downloads)
- [pm2](https://pm2.keymetrics.io/)(用于后台运行)

```bash
git clone https://github.com/louislam/uptime-kuma.git
cd uptime-kuma
npm run setup

# 方式一:直接试运行
node server/server.js

# 方式二(推荐):使用 PM2 在后台运行
# 没有安装 PM2 的话先安装:
npm install pm2 -g && pm2 install pm2-logrotate

# 启动服务
pm2 start server/server.js --name uptime-kuma
```

常用的 PM2 命令:

```bash
# 查看当前控制台输出
pm2 monit

# 设置开机自启
pm2 startup && pm2 save
```

### 高级安装

如需更多安装选项或通过反向代理访问,请阅读原项目 Wiki:
<https://github.com/louislam/uptime-kuma/wiki/%F0%9F%94%A7-How-to-Install>

## 🆙 如何更新

请阅读原项目 Wiki:
<https://github.com/louislam/uptime-kuma/wiki/%F0%9F%86%99-How-to-Update>

## 🆕 后续计划

作者会把功能请求和 issue 分配到下一个里程碑,详见:
<https://github.com/louislam/uptime-kuma/milestones>

## ❤️ 赞助

感谢所有赞助者!GitHub Sponsors 名单手动更新,OpenCollective 名单自动更新(GitHub 会缓存,可能需要一些时间)。

## 🖼 更多截图

原项目 README 中包含浅色模式、状态页、设置页和 Telegram 通知示例等多张截图,请访问原文查看。

## 动机

- 作者想找一款类似 "Uptime Robot" 的自托管监控工具,但很难找到合适的;最接近的 statping 既不稳定也已停止维护。
- 想做一个漂亮的 UI。
- 学习 Vue 3 和 vite.js。
- 展示 Bootstrap 5 的能力。
- 尝试在 SPA 中用 WebSocket 代替 REST API。
- 把自己的第一个 Docker 镜像发布到 Docker Hub。

如果喜欢这个项目,请考虑给它一个 ⭐。

## 🗣️ 讨论 / 求助

⚠️ 任何一般性或技术性问题,请不要给作者发邮件,作者无法通过邮件提供支持,也不会回复。

建议先使用 Google、GitHub Issues 或 Uptime Kuma 的 subreddit 寻找答案;找不到再提问:

- [GitHub Issues](https://github.com/louislam/uptime-kuma/issues)
- [Subreddit (r/UptimeKuma)](https://www.reddit.com/r/UptimeKuma/)

作者的 Reddit 账号是 [u/louislamlam](https://reddit.com/u/louislamlam),在 subreddit 提问时可以 @ 他。

## 参与贡献

### 提交 Pull Request

为了保证审查快速有效,提交前请先阅读[原项目的 PR 指南](https://github.com/louislam/uptime-kuma/blob/master/CONTRIBUTING.md#can-i-create-a-pull-request-for-uptime-kuma)。

### 测试 Pull Request

目前 PR 很多,作者没有时间逐一测试。想帮忙的话请看:<https://github.com/louislam/uptime-kuma/wiki/Test-Pull-Requests>

### 测试 Beta 版本

最新 Beta 版发布页:<https://github.com/louislam/uptime-kuma/releases>

### Bug 报告 / 功能请求

欢迎在原项目提交 [new issue](https://github.com/louislam/uptime-kuma/issues)。

### 翻译

想把 Uptime Kuma 翻译成你的语言,请访问 [Weblate Readme](https://github.com/louislam/uptime-kuma/blob/master/src/lang/README.md)。

---

> **版权说明**:本文档为 [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) 的中文翻译,所有代码与原始文档版权归原项目作者所有,遵循其原始许可证。
>
> **代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**
>
> **如果觉得有用,请给原项目点个 Star!** ⭐
