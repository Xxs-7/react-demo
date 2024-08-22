感觉像是狗屎(2-16, 其实还是有一些不错的内容的)
预设了一些 ui 和少量逻辑

Accessible and customizable components that you can copy and paste into your apps. Free. Open Source. Use this to build your own component library.

shacn-ui 组件库，Accessible and customizable 依赖于是直接将组件代码植入项目中（copy paste 组件代码），然后再进行二次开发。

设计得很好吗？没有感觉，只能说是一种设计选择方式，组件的源码可以单独复制到项目中，然后进行二次开发。
底层是基于 radixui，在它的基础上预设了一些 ui 和少量逻辑。

headless UI 其实并不完美，功能可以复用，但是样式如何复用呢？

使用 `npx shadcn-ui@latest add [component]` 命令可以添加组件到项目中。
不加参数会列出所有可用的组件，直接按A添加所有组件。


组件的 Accessible，感觉翻译是无障碍，实际国内不太关注这个功能。

组件分类
- 基础组件
- 展示组件
- 导航组件
- 弹窗组件

### 基础组件
- [x] switch
- [x] label
- [x] checkbox
- [x] slider
- [x] progress
- [x] datepicker
- [x] button
- [x] input
- [x] select
- [x] toggle
- [x] toggle group
- [ ] form

### 弹窗组件
- [x] dialog
- [x] alert dialog
- [x] popover
- [x] context menu
- [ ] drawer
- [x] dropdown menu

### 导航组件
- [ ] tab
- [x] accordion

### 展示组件
- [ ] skeleton
- [ ] table
- [ ] avator
- [ ] badge
- [ ] data table
- [ ] hover card

### 其他
- [ ] collapsible
- [ ] combobox
- [ ] command


## 如何高效的看文档
在有限的时间内看完文档，并且能理解文档的内容。
而不是无考虑的时间，在文档中反复横跳，以完全掌握项目的目的行动。

- [x] 比较重要，常用的组件的使用方法
- [ ] 比较重要，常用的组件的源码。例如组件的设计方案：trigger，content，root
- [x] asChild（slot） 原理，好处
- [x] theme 使用


写组件代码，