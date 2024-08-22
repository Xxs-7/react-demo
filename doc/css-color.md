CSS 颜色中的新函数，渐变，和色调
CSS Colors Module Level 4


color space：颜色空间是指一个数学模型或者一种特定的色彩描述方法，它定义了颜色可以存在的范围。例如，我们常用的 RGB 和 CMYK 就是两种颜色空间。
color model
color gamut：色域（Color Gamut）可以理解为颜色空间（Color Space）的一个子集。色域是指某种颜色空间中实际能表示的颜色范围。例如，sRGB 色域就是 RGB 颜色空间的一个子集，它定义了一个相对较小的颜色范围。其他还有 Adobe RGB、DCI-P3 等色域。

color function and feature

RGB：（红，绿，蓝）
sRGB：RGB 色彩空间的一个子集，它定义了一个相对较小的颜色范围。

CSS 中常用的是 RGB，
两种方式：
* 十六进制：#FF0000
* rgb 函数：rgb(255,0,0)
* rgba 函数：rgba(255,0,0,0.5)，最后一个是 alpha 通道，取值范围 0-1
* 

HSL：（色调，饱和度，亮度）
色相/色调