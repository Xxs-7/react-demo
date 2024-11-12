## todo
- [ ] CSS3 动画的基本概念，比如关键帧（Keyframes）、动画属性（Animation Properties）等
- [ ] 学习如何在 CSS 中使用动画属性，比如 animation-name、animation-duration、animation-delay、animation-timing-function 等。这些属性控制动画的名称、持续时间、延迟以及时间函数等。
- [ ] 编写一些简单的动画效果，并进行实践。你可以从简单的渐变动画开始，逐渐扩展到更复杂的动画效果，比如旋转、缩放、平移等。

# 概念
- **关键帧（Keyframes）**：关键帧是定义动画中各个阶段的关键时间点。在关键帧中，你可以定义元素在不同时间点的样式。比如，你可以在动画开始时定义一个关键帧，表示元素的初始样式；在动画结束时定义另一个关键帧，表示元素的最终样式；在两个关键帧之间定义中间的关键帧函数，表示元素在动画过程中的过渡样式。
- **动画属性（Animation Properties）**：动画属性是用来控制动画效果的 CSS 属性。常见的动画属性包括：
    - `animation-name`：定义动画的名称，对应关键帧中的动画序列。
    - `animation-duration`：定义动画的持续时间。
    - `animation-delay`：定义动画开始之前的延迟时间。
    - `animation-timing-function`：定义动画的时间函数，控制动画速度的变化。
    - `animation-iteration-count`：定义动画的重复次数。
    - `animation-direction`：定义动画播放的方向，如正向、反向或交替播放。
- **时间函数（Timing Function）**：时间函数控制动画效果的加速度和减速度。常见的时间函数包括线性（`linear`）、ease-in、ease-out、ease-in-out 等。不同的时间函数可以产生不同的动画效果，比如缓慢开始、缓慢结束等。时间函数（Timing Function）：时间函数控制动画效果的加速度和减速度。常见的时间函数包括线性（linear）、ease-in、ease-out、ease-in-out 等。不同的时间函数可以产生不同的动画效果，比如缓慢开始、缓慢结束等。
- **动画延迟（Animation Delay）**：动画延迟指的是动画开始之前的等待时间。通过设置动画延迟，你可以让动画在页面加载后一段时间再开始播放，从而实现一些特殊的效果。
- **重复次数和方向（Iteration Count and Direction）**：你可以指定动画的重复次数，也可以指定动画播放的方向，比如正向播放、反向播放或者交替播放。

``` css
/* 单个动画 */
animation-delay: 3s;
animation-delay: 0s;
animation-delay: -1500ms;

/* 多个动画 */
animation-delay: 2.1s, 480ms;

/* 全局值 */
animation-delay: inherit;
animation-delay: initial;
animation-delay: revert;
animation-delay: revert-layer;
animation-delay: unset;

```

``` css
/* 单个动画 */
animation-direction: normal;
animation-direction: reverse;
animation-direction: alternate;
animation-direction: alternate-reverse;

/* 多个动画 */
animation-direction: normal, reverse;
animation-direction: alternate, reverse, normal;

/* 全局值 */
animation-direction: inherit;
animation-direction: initial;
animation-direction: revert;
animation-direction: revert-layer;
animation-direction: unset;
```

``` css
/* 单个动画 */
animation-duration: 6s;
animation-duration: 120ms;

/* 多个动画 */
animation-duration: 1.64s, 15.22s;
animation-duration: 10s, 35s, 230ms;

/* 全局值 */
animation-duration: inherit;
animation-duration: initial;
animation-duration: revert;
animation-duration: revert-layer;
animation-duration: unset;
```

``` css
/* 关键字值 */
animation-iteration-count: infinite;

/* 数字值 */
animation-iteration-count: 3;
animation-iteration-count: 2.4;

/* 多个值 */
animation-iteration-count: 2, 0, infinite;

/* 全局值 */
animation-iteration-count: inherit;
animation-iteration-count: initial;
animation-iteration-count: revert;
animation-iteration-count: revert-layer;
animation-iteration-count: unset;
```