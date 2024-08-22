# 选择器

# 像素

物理像素: 显示器分辨率所包含的像素点
逻辑像素: css 的 px
像素设备比(dpr，Device pixel ratio): 一个逻辑像素对应多少个物理像素，window.devicePixelRatio

实现 1 px 的横线： 不通显示器生成的物理像素不一样。
实现 0.5 px 的横线：逻辑像素最小单位为 1

# 元素
**行内元素**
span, a, strong, b, em, i, del, s, ins, u ...
不独占一行，
不能设置宽高，
margin-left/right 和 padding-left/right属性设置都是有效的 
margin-top/-bottom 属性设置是无效的，
padding-top、padding-bottom 从显示效果上来看是增加的，但其实设置是无效的，因为它们没有撑大盒子，并不会对周围的元素产生影响。
即 background 上看是增加的，但是换行后，是按照文本对齐的，存在重叠。
只能放行内（块级）元素，文本

**块级元素**: 
div, section, main, p, h1, h2, h3 ...
独占一行
能设置宽高
能放任意元素，行内元素，块级元素，行内块级元素等

**行内块级元素**
input，img，video，textarea，button，select，label ...

# 盒子模型
四层结构：width/height + padding + border + margin
content-box: width/height 只包含内容
border-box: width/height 包含内容，内边距，边框
box-sizing: content-box/border-box

background 默认是 border-box，可以设置：
background-clip: context-box/padding-box/border-box 改变背景的区域

margin
相邻兄弟元素重叠
父子元素 margin 重叠

# 浮动
float: left/right
clear: left/right/both

# 定位
position: static/relative/absolute/fixed/sticky
static: 默认值，元素在文档流中正常排列
relative: 相对定位，相对于元素在文档流中的位置进行定位
absolute: 绝对定位，相对于最近的已定位（非 static）祖先元素进行定位，如果没有已定位的祖先元素，则相对于初始包含块进行定位
fixed: 固定定位，相对于视口进行定位，即使页面滚动，元素的位置也不会改变
sticky: 粘性定位，元素在页面滚动时，根据设定的阈值在相对定位和固定定位之间切换

# 布局
flex: 
display: flex
flex-direction: row/column
justify-content: flex-start/center/flex-end/space-between/space-around
align-items: flex-start/center/flex-end/baseline/stretch
flex-wrap: nowrap/wrap/wrap-reverse
flex-grow: 放大比例
flex-shrink: 缩小比例

# 单位
px
百分比
相对字体: em（相对父元素 font-size）, rem（相对 html 的 font-size）
视口单位: vw/vh/vmin/vmax