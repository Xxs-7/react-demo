- husky
- lint-staged
- commit-lint

- Git commit 前执行 git husky
- 给 Husky 添加一个 Hook，验证代码符合 lint
- 给 Husky 添加一个 Hook，验证 commit msg 符合规范

Husky 是一个用来增强 Git 提交和其他操作的工具，可以在 Git 的生命周期钩子上执行自定义脚本，从而自动化各种任务（如代码格式化、测试等），确保代码质量和一致性。它常用于在开发团队中实现预提交和提交时的代码检查和验证。

### **Husky 需要掌握的内容关键词**

1. **安装与配置**：
   - 安装 Husky：使用 npm 或 yarn 安装 Husky 到项目中。
   - 初始化 Husky：设置 Husky 配置文件，以启用 Git hooks。
2. **Git Hooks**：
   - Git 钩子（Hooks）：了解不同的 Git 钩子（如 pre-commit、pre-push 等），它们在 Git 生命周期中的作用。
   - 使用 Git Hooks：配置哪些钩子在什么情况下触发，并为这些钩子编写相应的脚本。
3. **常见用例**：
   - Linting：在 pre-commit 钩子中运行代码检查工具（如 ESLint）以确保代码符合规范。
   - 测试：在 pre-push 钩子中运行测试套件，确保代码变更没有引入新的错误。
   - 格式化：在 commit-msg 钩子中运行工具（如 Prettier）以自动格式化代码。
4. **工具集成**：
   - 与 Lint-Staged 集成：在部分文件上运行 Linting 或其他工具。
   - 与其他 CI/CD 工具集成：在持续集成/持续部署过程中利用 Husky 进行自动化检查。
5. **脚本管理**：
   - package.json 配置：在 package.json 中配置 Husky 钩子和脚本。
   - 独立配置文件：使用独立的配置文件（如 .huskyrc.js 或 .huskyrc.json）进行复杂的配置。
6. **性能优化**：
   - 缓存和并行化：优化钩子脚本以减少运行时间，确保开发流程顺畅。
   - 仅针对变更文件：使用 Lint-Staged 等工具仅对改动的文件运行钩子脚本，提高效率

## 初始化 husky

```shell
pnpm install husky --save-dev
pnpm dlx husky-init  // 初始化husky配置，在根目录会有.husky配置文件，里面有初始化配置pre-commit
pnpm dlx husky add .husky/commit-msg  // 在husky配置中，添加commit-msg钩子
```

gitHooks（常用hooks）
1.pre-commit：钩子在键入提交信息前运行。
2.prepare-commit-msg：钩子在启动提交信息编辑器之前，默认信息被创建之后运行。
3.commit-msg：钩子接收一个参数，存有当前提交信息的临时文件的路径。
如果该钩子脚本以非零值退出，Git 将放弃提交，
因此，可以用来在提交通过前验证项目状态或提交信息。
4.post-commit：钩子在整个提交过程完成后运行。

## link-staged

只对暂存区的代码进行检验。

`eslint .` 相较于 `pnpm dlx lint-staged`：

1. **处理范围过大**：
   - 直接在 **`pre-commit`** 钩子中运行 **`npm run lint`** 会检查整个项目中的所有文件。这在小项目中可能还行，但在大项目中会变得非常慢，影响开发体验。直接在 pre-commit 钩子中运行 npm run lint 会检查整个项目中的所有文件。这在小项目中可能还行，但在大项目中会变得非常慢，影响开发体验。
2. **不灵活**：
   - **`npm run lint`** 缺乏对暂存文件的细粒度控制。它会检查项目中所有文件的风格问题，而不仅仅是本次提交相关的文件。这意味着你可能会遇到一些你没有更改过的文件中的问题，导致无法提交代码。
3. **没有自动修复和重新暂存功能**：没有自动修复和重新暂存功能：
   - 直接运行 **`npm run lint`** 不会自动将修复的文件重新添加到暂存区。如果存在需要修复的问题，开发者需要手动处理，增加了额外的步骤和时间成本。

执行 pnpm run lint 没事，执行 pnpm run format 没事，执行 pnpm dlx lint-staged 出事。哈哈哈
