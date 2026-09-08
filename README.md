<div align="center">

# uptime-kuma 中文翻译版

**[中文版] uptime-kuma — 漂亮易用的自托管在线状态监控工具**

[![原项目](https://img.shields.io/badge/原项目-louislam--uptime-kuma-blue?style=flat-square&logo=github)](https://github.com/louislam/uptime-kuma)
[![中文文档](https://img.shields.io/badge/中文文档-README.zh--CN.md-orange?style=flat-square)](README.zh-CN.md)
[![GitHub Stars](https://img.shields.io/github/stars/louislam/uptime-kuma?style=flat-square&label=原项目Stars)](https://github.com/louislam/uptime-kuma/stargazers)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

</div>

---

> 这是 [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) 的中文翻译版本。
> 完整源代码请访问原项目:https://github.com/louislam/uptime-kuma

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

## 📖 项目简介

uptime-kuma 是一款开源自托管的监控工具,类似于"Uptime Robot",但完全部署在你自己的服务器上。它可以持续探测你的网站、API、端口和各类服务的在线状态,界面精美、响应迅速,故障时第一时间通过 Telegram、Discord、邮件等 90 多种渠道推送告警。该项目在 GitHub 上拥有数万 Star,是 self-hosted 社区最受欢迎的监控方案之一。

## ✨ 主要特性

- 监控 HTTP(s) / TCP / HTTP(s) 关键词 / HTTP(s) Json 查询 / WebSocket / Ping / DNS 记录 / Push / Steam 游戏服务器 / Docker 容器等多种目标
- 界面精美、响应式、速度快
- 支持 Telegram、Discord、Gotify、Slack、Pushover、邮件(SMTP)等 [90+ 通知服务](https://github.com/louislam/uptime-kuma/tree/master/src/components/notifications)
- 最短 20 秒的探测间隔
- 多语言界面(含简体中文)
- 多状态页支持,可将状态页绑定到指定域名
- Ping 延迟图表
- 证书信息查看
- 代理支持
- 两步验证(2FA)支持

## 📁 文件说明

| 文件 | 说明 |
|:-----|:-----|
| README.md | 本文件(中文简介) |
| README.zh-CN.md | 详细中文文档(完整汉化) |

## 🚀 快速开始

### Docker Compose(推荐)

```bash
mkdir uptime-kuma
cd uptime-kuma
curl -o compose.yaml https://raw.githubusercontent.com/louislam/uptime-kuma/master/compose.yaml
docker compose up -d
```

启动后访问 http://localhost:3001 或 http://你的IP:3001 即可使用。

> [!WARNING]
> 不支持 NFS 等网络文件系统,请挂载本地目录或 Docker 卷。

### Docker 命令

```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:2
```

如只想本机访问,把端口映射改为 `-p 127.0.0.1:3001:3001`。

### 非 Docker 方式

要求:主流 Linux 发行版、Windows 10 x64 / Server 2012 R2 以上;Node.js >= 20.4;Git;pm2。

```bash
git clone https://github.com/louislam/uptime-kuma.git
cd uptime-kuma
npm run setup

# 方式一:直接试运行
node server/server.js

# 方式二(推荐):用 PM2 后台运行
npm install pm2 -g && pm2 install pm2-logrotate
pm2 start server/server.js --name uptime-kuma
```

完整源代码与最新版本请访问原项目:https://github.com/louislam/uptime-kuma

## 📞 联系方式

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

本项目为 [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) 的中文翻译版本,所有代码版权归原项目作者所有,遵循其原始许可证。

**如果觉得有用,请给原项目点个 Star!** ⭐
