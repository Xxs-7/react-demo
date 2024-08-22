相关使用
Themes

building accessible, high-quality React web applications and design systems

## 组件类型
### 简单组件
AspectRatio
checkbox
collapsible

### 复合组件
Accordian
Alert Dialog
Context Menu

## 问题
dark 模式设置 appearance 不生效（不确定是否是没有相关 style 设置）

the library’s flagship product，关于库的旗舰产品。
那么，达到“旗舰”需要满足的条件是什么？radixui 的设计方案是什么？

unstyled, accessible components for building high‑quality design systems and web apps in React.

无样式，可访问的组件，用于构建高质量的设计系统和 Web 应用程序。

providing a set of flexible and extensible components
提供一组灵活且可扩展的组件

WAI-ARIA standards 这个标准是啥？

accessibility，可访问性？无障碍

color
静心雕琢的颜色系统，旨在创建具有视觉吸引力的应用程序。
* automatic dark mode 
* compose color palettes  调色板

design system
…set of standards to manage design at scale by reducing redundancy while creating a shared language and visual consistency across different pages and channels.

…一套标准，通过减少冗余来大规模管理设计，同时创建一个共享的语言和视觉一致性，跨越不同的页面和渠道。

这篇博文 https://blog.logrocket.com/building-design-system-radix/ 的内容

三个组成部分呢
* Style guide 样式指南，fonts, typography, colors and logos
* Pattern library:templates and layout structures intended to provide general workflow patterns; reused and adapted throughout an application
* Component library: UI libraries or UI kits

Component library
These components implement the design standards established throughout the style guide.

MUI (the artist formerly known as Material UI), Headless UI by Tailwind Labs, and of course Radix UI.

大部分都是加层


按需引入 treeshaking
单独引入组件 

radix theme 和 单独的包有什么区别？
