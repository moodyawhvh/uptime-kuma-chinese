> 🌐 本文档由 [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) 翻译,英文原版见原项目。

# Uptime Kuma 的 Copilot 使用说明

警告:只有 Uptime Kuma 的维护者可以使用本说明;其他贡献者必须先阅读 AGENTS.md 和 CLAUDE.md,以免因 AI 垃圾贡献(AI slop)被封禁。

## Copilot 的目标/任务

- 检查拼写
- 不要输出「Pull Request Overview」
- 没有问题时无需回复

## 仓库概览

**Uptime Kuma** 是一款支持 HTTP(s)、TCP、DNS、Docker 等协议的自托管监控工具。前端基于 Vue 3,后端基于 Node.js/Express,使用 Socket.IO 进行实时通信。

- **语言**:JavaScript、Vue 3、TypeScript(少量)、HTML、CSS/SCSS
- **后端**:Node.js >= 20.4、Express.js、Socket.IO、SQLite
- **前端**:Vue 3、Vite、Bootstrap 5、Chart.js
- **包管理器**:npm,启用 `legacy-peer-deps=true`(.npmrc)

## 构建与验证命令

### 前置条件

- Node.js >= 20.4.0、npm >= 9.3、Git

### 核心命令序列

1. **安装依赖**:

   ```bash
   npm ci  # Use npm ci NOT npm install (~60-90 seconds)
   ```

2. **代码检查**(提交前必做):

   ```bash
   npm run lint         # Both linters (~15-30 seconds)
   npm run lint:prod    # For production (zero warnings)
   ```

3. **构建前端**:

   ```bash
   npm run build  # Takes ~90-120 seconds, builds to dist/
   ```

4. **运行测试**:
   ```bash
   npm run test-backend  # Backend tests (~50-60 seconds)
   npm test              # All tests
   ```

### 开发工作流

```bash
npm run dev  # Starts frontend (port 3000) and backend (port 3001)
```

## 项目架构

### 目录结构

```
/
├── server/              Backend source code
│   ├── model/          Database models (auto-mapped to tables)
│   ├── monitor-types/  Monitor type implementations
│   ├── notification-providers/  Notification integrations
│   ├── routers/        Express routers
│   ├── socket-handlers/  Socket.IO event handlers
│   ├── server.js       Server entry point
│   └── uptime-kuma-server.js  Main server logic
├── src/                Frontend source code (Vue 3 SPA)
│   ├── components/     Vue components
│   ├── pages/          Page components
│   ├── lang/          i18n translations
│   ├── router.js      Vue Router configuration
│   └── main.js        Frontend entry point
├── db/                 Database related
│   ├── knex_migrations/  Knex migration files
│   └── kuma.db        SQLite database (gitignored)
├── test/               Test files
│   ├── backend-test/  Backend unit tests
│   └── e2e/           Playwright E2E tests
├── config/             Build configuration
│   ├── vite.config.js    Vite build config
│   └── playwright.config.js  Playwright test config
├── dist/               Frontend build output (gitignored)
├── data/               App data directory (gitignored)
├── public/             Static frontend assets (dev only)
├── docker/             Docker build files
└── extra/              Utility scripts
```

### 关键配置文件

- **package.json**:脚本、依赖、Node.js 版本要求
- **.eslintrc.js**:ESLint 规则(4 空格缩进、双引号、Unix 换行符、必须写 JSDoc)
- **.stylelintrc**:Stylelint 规则(4 空格缩进)
- **.editorconfig**:编辑器设置(4 空格、LF、UTF-8)
- **tsconfig-backend.json**:后端 TypeScript 配置(仅 src/util.ts)
- **.npmrc**:`legacy-peer-deps=true`(依赖解析必需)
- **.gitignore**:排除 node_modules、dist、data、tmp、private

### 代码风格(linter 强制执行)

- 4 空格缩进、双引号、Unix 换行符(LF)、必须带分号
- **命名**:JavaScript/TypeScript(camelCase)、SQLite(snake_case)、CSS/SCSS(kebab-case)
- 所有函数/方法必须编写 JSDoc

## CI/CD 工作流

**auto-test.yml**(在 PR/push 到 master/1.23.X 时运行):

- 在多个操作系统/Node 版本上执行 lint、构建、后端测试(15 分钟超时)
- Playwright 端到端测试

**validate.yml**:校验 JSON/YAML 文件、语言文件、knex 迁移

**PR 要求**:所有 linter 通过、测试通过、代码符合风格规范

## 常见问题

1. **npm install 与 npm ci**:为保证构建可复现,始终使用 `npm ci`
2. **TypeScript 报错**:`npm run tsc` 会显示 1400+ 个错误——忽略即可,不影响构建
3. **Stylelint 警告**:出现弃用警告属预期行为,忽略即可
4. **测试失败**:运行测试前必须先执行 `npm run build`
5. **端口冲突**:开发服务器占用 3000 和 3001 端口
6. **首次运行**:服务器提示 "db-config.json not found" 属预期行为,随后会进入安装向导

## 翻译

- 通过 Weblate 管理。只需向 `src/lang/en.json` 添加键
- 不要在 PR 中包含其他语言
- 在 Vue 模板中使用 `$t("key")`

## 数据库

- 主数据库:SQLite(也支持 MariaDB/MySQL)
- 迁移脚本位于 `db/knex_migrations/`,基于 Knex.js
- 文件名格式由 CI 校验:`node ./extra/check-knex-filenames.mjs`

## 测试

- **后端**:Node.js test runner,快速的单元测试
- **端到端**:Playwright(首次使用需先执行 `npx playwright install`)
- 测试数据位于 `data/playwright-test`

## 新增功能

### 新的通知渠道

需要修改的文件:

1. `server/notification-providers/PROVIDER_NAME.js`(后端逻辑)
2. `server/notification.js`(注册渠道)
3. `src/components/notifications/PROVIDER_NAME.vue`(前端界面)
4. `src/components/notifications/index.js`(注册前端)
5. `src/components/NotificationDialog.vue`(加入列表)
6. `src/lang/en.json`(添加翻译键)

### 新的监控类型

需要修改的文件:

1. `server/monitor-types/MONITORING_TYPE.js`(后端逻辑)
2. `server/uptime-kuma-server.js`(注册监控类型)
3. `src/pages/EditMonitor.vue`(前端界面)
4. `src/lang/en.json`(添加翻译键)

## 重要说明

1. **信任本说明**——内容基于实际测试。只有在其不完整/不正确时才另行搜索
2. **依赖**:存在 5 个已知漏洞(3 个中等、2 个高危)——已确认知悉,未经讨论不要修复
3. **Git 分支**:`master`(v2 开发)、`1.23.X`(v1 维护)
4. **Node 版本**:要求 >= 20.4.0
5. **Socket.IO**:大部分后端逻辑位于 `server/socket-handlers/`,而非 REST
6. **绝不提交**:`data/`、`dist/`、`tmp/`、`private/`、`node_modules/`
