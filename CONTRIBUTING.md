> 🌐 本文档由 [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) 翻译,英文原版见原项目。
>
> 📝 注:原文超过 10000 字符,本文翻译核心章节;文末「维护者内部流程」(Docker Builder 架设、发布流程等)仅保留要点,完整细节请参阅英文原版。

# 项目信息

首先,衷心感谢每一位为 Uptime Kuma 提交 issue 或 pull request 的朋友。我从未想过 GitHub 社区会如此友好!也正因如此,我从没料到真的会有人来阅读甚至修改我的代码——部分代码结构不够清晰、注释也不够完善,还请见谅。

在开始之前,请先阅读我们的[行为准则](CODE_OF_CONDUCT.md),了解社区规范。

本项目使用 `vite` 创建,基于 `vue3` 编写。后端代码位于 `server` 目录,主要通过 websocket 通信。前端和后端共用同一个 `package.json`。

生产环境中,前端构建产物输出到 `dist` 目录,服务器(`express.js`)将 `dist` 目录作为站点根目录对外提供。开发环境下,我们在另一个端口以开发模式运行 vite。

## 目录结构

- `config`(开发配置文件)
- `data`(应用数据)
- `db`(基础数据库与迁移脚本)
- `dist`(前端构建产物)
- `docker`(Dockerfile)
- `extra`(额外的实用脚本)
- `public`(仅供开发使用的前端资源)
- `server`(服务端源代码)
- `src`(前端源代码)
- `test`(单元测试)

## 我可以为 Uptime Kuma 创建 Pull Request 吗?

能否提交 pull request 取决于你贡献的性质。我们珍惜你的时间,也珍惜维护者的时间,希望双方的时间都花在刀刃上。

如果你对任何流程或步骤有疑问,有同样疑问的人肯定不止你一个——尽管开口问,我们很乐意帮忙!

不同类型的 pull request(PR)适用不同的准则,请务必查阅与你的贡献对应的那一条。

- <details><summary><b>安全修复</b>(点击展开)</summary>
  <p>

  提交安全修复可能会给社区带来风险。请先阅读我们的[安全策略](SECURITY.md),并通过 [安全公告(advisory)] + [issue] 的方式提交漏洞。如果你知道如何修复,我们鼓励你一并说明,但这不是强制要求。遵循安全策略能让我们妥善测试、修复漏洞。这类审查也能让我们发现文档等无关部分是否需要相应调整。
  [**请查阅我们的安全策略。**](SECURITY.md)

  [advisory]: https://github.com/louislam/uptime-kuma/security/advisories/new
  [issue]: https://github.com/louislam/uptime-kuma/issues/new?template=security_issue.yml

  </p>
  </details>

- <details><summary><b>小型、非破坏性的 Bug 修复</b>(点击展开)</summary>
  <p>

  如果你发现了 bug 并且认为自己能解决,我们非常感谢你的付出。请务必遵守以下规则:
  - PR 尽量小,一次只修一件事 => 保证可审查性
  - 测试确认你的代码确实实现了你所说的效果。

  <sub>维护者的时间非常宝贵,此类无争议的 PR 可由初级维护者合并。</sub>

  </p>
  </details>

- <details><summary><b>翻译 / 国际化(i18n)</b>(点击展开)</summary>
  <p>

  请将**所有**可翻译的字符串添加到 `src/lang/en.json`。如果遗漏了翻译键,这些文案就无法被翻译。**首次 PR 中不要包含任何其他语言** (即使那是你的母语),以避免 Weblate 与 `master` 之间的合并冲突。PR 合入 `master` 后,这些字符串就可以由慷慨贡献语言能力的朋友们来翻译了。

  我们使用 Weblate 将本项目本地化为多种语言。如果你想帮忙把 Uptime Kuma 翻译成你的语言,请参阅[这份 Weblate 翻译指南](https://github.com/louislam/uptime-kuma/blob/master/src/lang/README.md)。

  有些改动无法直接在 Weblate 中完成,需要通过 PR:
  - 某段文案可能尚未接入本地化。此时可能需要通过 `{{ $t("Translation key") }}` 或 [`<i18n-t keypath="Translation key">`](https://vue-i18n.intlify.dev/guide/advanced/component.html) **新增语言键**。
  - 语言键必须**添加到 `en.json`** 才会出现在 Weblate 中。如果还没添加,欢迎提交 PR。
  - **新增一门语言**需要创建新文件,参见[这些说明](https://github.com/louislam/uptime-kuma/blob/master/src/lang/README.md)。

  <sub>维护者的时间非常宝贵,此类无争议的 PR 可由初级维护者合并。</sub>

  </p>
  </details>

- <details><summary><b>新的通知渠道</b>(点击展开)</summary>
  <p>

  添加一个新的通知渠道需要修改/创建以下文件:
  - `server/notification-providers/PROVIDER_NAME.js` 是通知渠道的核心逻辑所在。

        - `monitorJSON` 和 `heartbeatJSON` 在某些事件下可能为 `null`。如果

  两者都为 `null`,这是一条通用测试消息;如果只有 `heartbeatJSON` 为 `null`,则这是一次证书到期事件。

        - 请将 axios 调用包裹在

  ```js
  try {
    let result = await axios.post(...);
    if (result.status === ...) ...
  } catch (error) {
    this.throwGeneralAxiosError(error);
  }
  ```

  - `server/notification.js` 需要在后端注册该通知渠道。_如果你有办法让我们跳过这一步,非常乐意听听你的想法 ^^_

  - `src/components/NotificationDialog.vue` 你需要判断该渠道是地区性的还是全球性的,并将其连同名称添加到对应的列表中。

  - `src/components/notifications/PROVIDER_NAME.vue` 是每个渠道的前端部分。请确保:
    - 密钥类凭据使用了 `HiddenInput`
    - 提供了所有必要的帮助文本/占位符等,确保新用户能轻松完成配置
    - 将所有翻译(`{{ $t("Translation key") }}`、[`i18n-t keypath="Translation key">`](https://vue-i18n.intlify.dev/guide/advanced/component.html))写入 `src/lang/en.json`,让翻译者可以翻译这些文案

  - `src/components/notifications/index.js` 需要在前端注册该渠道。_如果你有办法让我们跳过这一步,非常乐意听听你的想法 ^^_

  通知功能接近 Uptime Kuma 作为在线状态监控工具的核心。因此确保通知真正可用非常重要。由于测试通知渠道相当耗时,我们通常把这项工作交给贡献该渠道的人来完成。

  为证明你已经测试过该通知渠道,请在 PR 描述中附上以下事件的截图:
  - `UP`/`DOWN`
  - 通过 <https://expired.badssl.com/> 触发的证书到期
  - 通过 <https://google.com/> 与较长时限触发的域名到期
  - 测试(通知渠道配置页上的测试按钮)

  <br/>

  建议使用如下格式组织:

  ```md
  | Event              | Before                | After                |
  | ------------------ | --------------------- | -------------------- |
  | `UP`               | ![Before](image-link) | ![After](image-link) |
  | `DOWN`             | ![Before](image-link) | ![After](image-link) |
  | Certificate-expiry | ![Before](image-link) | ![After](image-link) |
  | Domain-expiry      | ![Before](image-link) | ![After](image-link) |
  | Testing            | ![Before](image-link) | ![After](image-link) |
  ```

  <sub>维护者的时间非常宝贵,此类无争议的 PR 可由初级维护者合并。</sub>

  </p>
  </details>

- <details><summary><b>新的监控类型</b>(点击展开)</summary>
  <p>

  添加一个新的监控类型需要修改/创建以下文件:
  - `server/monitor-types/MONITORING_TYPE.js` 是每种监控的核心。`async check(...)` 函数应当:
    - 正常路径:将 `heartbeat.msg` 设为成功消息,并设置 `heartbeat.status = UP`
    - 异常路径:每检测到一个故障,就抛出一个带有可操作错误信息的 `Error`。
    - 除非你想显式跳过重试,否则**绝不**要设置 `heartbeat.status = DOWN`。

  - `server/uptime-kuma-server.js` 需要在后端注册该监控类型。_如果你有办法让我们跳过这一步,非常乐意听听你的想法 ^^_

  - `src/pages/EditMonitor.vue` 是用户交互的共用前端。请确保:
    - 密钥类凭据使用了 `HiddenInput`
    - 提供了所有必要的帮助文本/占位符等,确保新用户能轻松完成配置
    - 将所有翻译(`{{ $t("Translation key") }}`、[`<i18n-t keypath="Translation key">`](https://vue-i18n.intlify.dev/guide/advanced/component.html))写入 `src/lang/en.json`,让翻译者可以翻译这些文案

  <sub>维护者的时间非常宝贵,此类无争议的 PR 可由初级维护者合并。</sub>

  </p>
  </details>

- <details><summary><b>新功能 / 重大改动 / 破坏性 Bug 修复</b>(点击展开)</summary>
  <p>

  请务必**先创建一个空的草稿 pull request 或开一个 issue,让我们先讨论**。
  这对于大型 PR 尤其重要,或者当你不确定它是否会被合并时也是如此。
  新增功能时,请同时补充测试,以确保改动符合预期,并防止将来出现回归。

  <sub>由于此类工作影响面大,只有资深维护者可以合并该领域的 PR。</sub>

  </p>
  </details>

- <details><summary><b>作为首次贡献者</b>(点击展开)</summary>
  <p>

  贡献代码简单又有趣,我们会引导你完成整个流程:
  1. **Fork** [Uptime Kuma 仓库](https://github.com/louislam/uptime-kuma/)并 **clone** 到本地。
  2. 为你的改动**新建一个分支**(例如 `signal-notification-provider`)。
  3. **完成修改**并用清晰的提交信息进行 **commit**。
  4. 将改动 **push** 到你 fork 的仓库。
  5. 向 Uptime Kuma 仓库的 `master` 分支**发起 pull request**。
     - 大型改动请先开一个**草稿 PR**,与维护者讨论。
  6. **提供清晰简洁的改动说明**,并关联相关 issue。
  7. **完成 PR 检查清单**,确保所有 CI 检查通过。
  8. PR 就绪后**请求审查**。

  ## 什么时候可以把 PR 状态改为 "Ready for Review"?

  在所有任务完成之前,PR 应保持**草稿状态**。只有满足以下条件时才改为 **Ready for Review**:
  - 你已实现全部计划中的改动。
  - 代码已充分测试,可以进入审查。
  - 你已更新或补齐了必要的测试。
  - 你已确认 CI/CD 检查全部通过。

  志愿维护者会尽快审查你的 PR。你也可以通过审查其他 PR 或认领 open issue 来帮助我们。

## 以下规则是让你的 PR 被合并的关键

- 用一个巨型 PR 同时合并多个 issue 会更难审查,也容易与其他 PR 冲突。请:
  - (如有可能)**一个 issue 对应一个 PR**;或
  - (实在不行)**说明该 PR 解决了哪些 issue,以及为什么不应拆分**

- 确保你的 **PR 通过持续集成**。所有 CI 检查不绿,PR 不会被合并。
- **破坏性改动**(除非有充分理由且事先讨论过)不会被合并 / 不会很快被合并。此类改动需要发布大版本。
- 提交 PR 前**请测试你的代码**。有 bug 的 PR 不会被合并。
- 确保 **UI/UX 与 Uptime Kuma 风格一致**。
- **考虑可维护性**:不要添加完全**超出范围**的功能。记住,这些功能将来都需要有人维护。
- 没有充分理由,不要修改或删除现有逻辑。
- 没有理由,不要把现有代码改写成其他编程语言。

### 持续集成

所有 PR 必须通过持续集成检查,包括:

- **代码检查(Lint)**:我们使用 ESLint 和 Stylelint 检查代码质量,可在本地运行 `npm run lint`。
- **代码格式化**:我们使用 Prettier 格式化代码,可运行 `npm run fmt`(CI 也会自动执行)。
- **测试**:我们使用 Playwright 做端到端测试,并有一套后端测试。可在本地运行 `npm test`。

最终决定权在我([@louislam](https://github.com/louislam))。
如果你的 PR 没有达到我的预期,无论你花了多少时间,我都会拒绝它。

如果我们计划审查并合并你的 PR,会将其分配到对应的 [milestone](https://github.com/louislam/uptime-kuma/milestones)。

请不要催促,也不要询问预计完成时间。
我们必须先理解 PR,确认它没有破坏性改动,并且符合项目的整体规划——大型 PR 尤其如此。

## 我想认领某个 issue,该怎么做?

我们发现给 issue 指派负责人是不必要的管理开销。更好的做法是留一条简短评论说明你打算处理它,这样能为其他开发者节省时间。如果开发过程中遇到问题,也欢迎留言描述你卡在哪里,我们会帮忙。

## 项目风格

我个人不喜欢那种启动应用前要做一大堆配置的东西。我们的目标是让安装 Uptime Kuma 像安装手机 App 一样简单。

- 非 Docker 用户安装简单
  - 无需原生编译依赖(`x86_64`/`armv7`/`arm64`)
  - 无需额外配置
  - 无需额外操作即可运行

- Docker 用户单容器即可
  - 不需要复杂的 docker-compose 文件
  - 挂载卷和暴露端口应当是仅有的要求

- 设置应尽量在前端配置。不推荐使用环境变量,除非与启动相关,例如 `DATA_DIR`
- 易于使用
- Web UI 风格应统一美观

## 编码风格

- 4 空格缩进
- 遵循 `.editorconfig`
- 遵循 ESLint
- 方法和函数应使用 JSDoc 注释

## 命名规范

- Javascript/Typescript:camelCaseType(小驼峰)
- SQLite:snake_case(下划线)
- CSS/SCSS:kebab-case(短横线)

## 工具

- [`Node.js`](https://nodejs.org/) >= 20.4.0
- [`npm`](https://www.npmjs.com/) >= 9.3
- [`git`](https://git-scm.com/)
- 支持 [`ESLint`](https://eslint.org/) 和 EditorConfig 的 IDE(我在用
  [`IntelliJ IDEA`](https://www.jetbrains.com/idea/))
- 一款 SQLite 图形化工具(例如
  [`SQLite Expert Personal`](https://www.sqliteexpert.com/download.html) 或
  [`DBeaver Community`](https://dbeaver.io/download/))

## Git 分支

- `master`:2.X.X 开发分支。新增功能的 PR 应基于此分支。
- `1.23.X`:1.23.X 开发分支。如果要同时修复 v1 和 v2 的 bug,PR 应基于此分支。
- 其他分支均未使用、已过时或仅用于开发。

## 安装开发依赖

```bash
npm ci
```

## 开发服务器

一条命令即可同时启动前端和后端开发服务器。

会占用 3000 端口和 3001 端口。

```bash
npm run dev
```

但有时你可能想重启后端而不重启前端。这时可以在两个终端分别运行:

```bash
npm run start-frontend-dev
npm run start-server-dev
```

## 后端服务器

默认绑定 `0.0.0.0:3001`。

后端是一个集成了 `socket.io` 的 `express.js` 服务器。它使用 `socket.io` 与客户端通信,大部分服务端逻辑都封装在 `socket.io` 处理器中。`express.js` 同时还负责:

- 作为入口,重定向到状态页或仪表盘
- 提供前端构建产物(`index.html`、`*.js`、`*.css` 等)
- 提供状态页的内部 API

### `/server/` 目录结构

- `jobs/`(在独立进程中运行的任务)
- `model/`(对象模型,自动映射到数据库表名)
- `modules/`(经过修改的第三方模块)
- `monitor_types/`(监控类型)
- `notification-providers/`(各通知渠道的具体逻辑)
- `routers/`(Express 路由)
- `socket-handler/`(Socket.io 处理器)
- `server.js`(服务器入口)
- `uptime-kuma-server.js`(UptimeKumaServer 类,主要逻辑应在此,但仍有部分留在 `server.js`)

## 前端开发服务器

默认绑定 `0.0.0.0:3000`。前端开发服务器仅供开发使用。

生产环境不使用它,而是通过 `npm run build` 编译到 `dist` 目录。

调试时可以使用 Vue.js devtools Chrome 扩展。

### 前端细节

Uptime Kuma 前端是单页应用(SPA),大部分路径由 Vue Router 处理。

路由定义在 `src/router.js`。

尽管路由可以跳转到不同页面,前端的大部分数据都存放在根层级。

数据与 socket 逻辑位于 `src/mixins/socket.js`。

## 数据库迁移

参见:<https://github.com/louislam/uptime-kuma/tree/master/db/knex_migrations>

## 单元测试

运行单元测试使用以下命令:

```bash
npm run build
npm test
```

## 依赖

前端和后端共用同一个 `package.json`。但前端的依赖最终不会出现在生产环境中,因为它们通常已被打包进 `dist` 文件。所以:

- 前端依赖 = "devDependencies"
  - 例如: - `vue`、`chart.js`
- 后端依赖 = "dependencies"
  - 例如:`socket.io`、`sqlite3`
- 开发依赖 = "devDependencies"
  - 例如:`eslint`、`sass`

### 更新依赖

此前把 Vite 从 2.5.10 升级到 2.6.0 曾导致应用彻底崩溃,因此从现在起只允许更新补丁版本。

补丁版本 = 语义化版本中的第三位([Semantic Versioning](https://semver.org/))

如果出于安全 / bug / 其他原因必须跨版本升级某个库,提出改动的人需要自行检查破坏性变更。

## 拼写与语法

欢迎随时纠正文档或代码中的拼写和语法错误——维护者的母语并不是英语。

## Wiki

由于 wiki 无法通过 pull request 修改,我另建了一个仓库来管理它。

<https://github.com/louislam/uptime-kuma-wiki>

## 维护者

### 什么是维护者?他们负责什么?

本项目有多名维护者,各自专注不同领域。目前共有 3 位:

| 人员              | 角色       | 主要领域     |
| ----------------- | ---------- | ------------ |
| `@louislam`       | 资深维护者 | 主要功能     |
| `@chakflying`     | 初级维护者 | 修复 bug     |
| `@commanderstorm` | 初级维护者 | issue 管理   |

### 内部流程

维护者遵循若干内部流程(英文原版含完整步骤),此处仅保留要点:

- **架设 Docker Builder**:amd64 与 armv7 使用本地构建;arm64 使用远程 arm64 真机(emulator 太慢,`npm ci` 已无法通过)。核心命令为 `docker context create` 添加远程上下文,再用 `docker buildx create --name kuma-builder --platform linux/amd64,linux/arm/v7` 创建并 `--append` 追加远程 arm64 上下文,最后 `docker buildx inspect --bootstrap` 验证。
- **正式发布**:起草 release note → 确认仓库干净 → 如健康检查有更新需先 `npm run build-docker-builder-go` 重新编译 → 以 `VERSION` 和 `GITHUB_TOKEN` 环境变量运行 `npm run release-final` → 按提示继续 → `git push` → 以 `1.X.X` 发布 release note → `npm run deploy-demo-server` 部署演示站。事后需检查 Docker Hub 各标签,并用 1.X.X 标签做全新安装测试(amd64 / arm64 / armv7 及 Node.js 纯安装)。
- **Beta 发布**:起草 release note 并勾选 `This is a pre-release` → 确认仓库干净 → 以 `VERSION` 和 `GITHUB_TOKEN` 运行 `npm run release-beta` → 以 `1.X.X-beta.X` 发布。
- **发布 Wiki**:`git clone https://github.com/louislam/uptime-kuma-wiki.git` 后添加 `production` 远端指向 `https://github.com/louislam/uptime-kuma.wiki.git`,再用 `git push production master` 推送。
- **变更 PR 基分支**(如 `master` 改为 `1.23.X`):

```bash
git rebase --onto <new parent> <old parent>
```
