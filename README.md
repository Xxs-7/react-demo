* base use
* decorate use
* 多 store，domain store & ui store
* 树形 store（由各个业务 store 组成），快照
* 后端集成（存储，修改，接收），通信层


UI store 和 domain store 
* Session 信息
* 应用已经加载了的相关信息
* 不会存储到后端的信息
* 全局性影响 UI 的信息
  * 窗口尺寸
  * 可访问性信息
  * 当前语言
  * 当前活动主题
* 用户界面状态瞬时影响多个、毫不相关的组件:
  * 当前选择
  * 工具栏可见性, 等等
  * 向导的状态
  * 全局叠加的状态
  
一个经常被问到的问题就是，如何不使用单例来组合多个 stores 。它们之间如何通信呢？

一种高效的模式是创建一个 RootStore 来实例化所有 stores ，并共享引用。这种模式的优势是:

设置简单
很好的支持强类型
使得复杂的单元测试变得简单，因为你只需要实例化一个根 store


在组件中使用 store 的值拷贝，其未来的更新不会被跟踪。

best-practice
* 单个 store
* 树形 store 的管理