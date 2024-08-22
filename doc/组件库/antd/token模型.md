# Token 系统
Ant Design 5 引入了全新的 Token 系统，这是一个基于设计系统的新概念，旨在更好地管理和自定义设计风格。在 Ant Design 5 中，Token 模型提供了一种集中式的样式管理方式，使得开发者能够更轻松地自定义主题和样式，尤其是在处理复杂的主题切换场景时。

说人话：
整个页面是一个组件/dom 元素树，每个组件/元素有自己样式属性集合，将其都抽离出来，形成特定的结构。

## 核心概念

1. **Design Tokens**:
    - Design Tokens 是用于定义样式和设计的原子单位。这些 Tokens 通常包括颜色、排版、间距、阴影等。通过 Design Tokens，设计可以在不同的组件和平台间保持一致性。
2. **Alias Tokens**:
    - Alias Tokens 是一些高级别的 Tokens，通常是基础 Tokens 的别名。这些 Alias Tokens 更加贴近业务场景，如主色、背景色等。通过修改 Alias Tokens，可以实现全局的风格调整。
4. **Seed Tokens**:
    - Seed Tokens 是最基本的原子设计变量，如基础颜色、字号等。Alias Tokens 通常是基于 Seed Tokens 定义的。


Design Tokens、Alias Tokens 和 Seed Tokens: 这些是 token 值对象中的不同层次的样式变量，它们是 Token Map 的一部分。

1. **Token Map**:
    - Token Map 是一个集中管理所有 Design Tokens 的对象。Ant Design 提供了默认的 Token Map，开发者可以基于此进行自定义和扩展。
Token Map：`<ConfigProvider theme={{ token: designTokens }}>` 的 token 对象。

优点
* 轻松定制主题
* 动态主题切换
* 更好的维护性

那么 antd 文档中，组件 token 和 全局token跟Design Tokens、Alias Tokens 和 Seed Tokens的对应关系是什么
1. **全局 Token (Global Tokens)**
- **定义**: 全局 Token 是在整个应用中通用的样式变量，如基础颜色、字号、间距等。这些 Tokens 在设计系统中通常是 Seed Tokens，因为它们定义了最基础的设计元素。
- **对应关系**:
    - **Seed Tokens**: 全局 Token 通常就是 Seed Tokens，它们是设计系统的基础变量，定义了最底层的样式。例如，`colorPrimary`、`fontSizeBase` 等全局 Token 就属于 Seed Tokens 的范畴。

2. **组件 Token (Component Tokens)**
- **定义**: 组件 Token 是特定组件内部使用的样式变量，这些 Tokens 可以控制组件的颜色、边距、阴影等样式。组件 Token 通常是在全局 Token 的基础上定义的，它们可以是 Alias Tokens 或直接是 Design Tokens。
- **对应关系**:
    - **Alias Tokens**: 组件 Token 往往是基于 Seed Tokens 定义的高级别样式变量。例如，Button 组件的 `colorPrimary` 可能引用全局的 `colorPrimary`，这就是 Alias Tokens 的使用。
    - **Design Tokens**: 如果组件 Token 是直接定义的、与业务紧密相关的样式，它们就是 Design Tokens。


Design Token 影响主题的最小元素