# 总结
讲的是 redix-ui 中通过 aschild 属性实现将功能赋予所给的原生标签

# Composition

Use the `asChild` prop to compose Radix's functionality onto alternative element types or your own React components.

使用 radix 组件中的 `asChild` 属性，能够将组件的功能组合到可选择的原生标签或者是自定义的 react 组件

All Radix primitive parts that render a DOM element accept an `asChild` prop. When `asChild` is set to `true`, Radix will not render a default DOM element, instead cloning the part's child and passing it the props and behavior required to make it functional.

所有被渲染成 dom 元素的 radix 基元（primitive）部分都会接受一个 `asChild` 属性，当该属性为 true 时，Radix 不会渲染出一个默认的 Dom 元素，而是克隆子元素的部分并且传递它的 props 和行为来使其具备功能

## [Changing the element type](https://www.radix-ui.com/primitives/docs/guides/composition#changing-the-element-type)

In the majority of cases you shouldn’t need to modify the element type as Radix has been designed to provide the most appropriate defaults. However, there are cases where it is helpful to do so.
在大部分的情况下，你不必修改元素类型，因为 radix 已经设计成会提供最合适的默认值。然而，这里还有一些其他情况需要修改元素类型。

A good example is with `Tooltip.Trigger`. By default this part is rendered as a `button`, though you may want to add a tooltip to a link (`a` tag) as well. Let's see how you can achieve this using `asChild`:

一个典型的例子就是 `Tooltip.Trigger`。默认情况下这个组件会被渲染成 `button`，然而你或许想要添加一个 tooltip 来跳转页面。让我们来看看如何通过 `asChild` 来实现这个功能

``` jsx
import * as React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
export default () => (
  <Tooltip.Root>   
    <Tooltip.Trigger asChild> 
     <a href="https://www.radix-ui.com/">Radix UI</a>   
    </Tooltip.Trigger>    
    <Tooltip.Portal>…</Tooltip.Portal>  
  </Tooltip.Root>);
```


> If you do decide to change the underlying element type, it is your responsibility to ensure it remains accessible and functional. In the case of Tooltip.Trigger for example, it must be a focusable element that can respond to pointer and keyboard events. If you were to switch it to a div, it would no longer be accessible.

如果你计划改变下面的元素类型，你有义务确保该元素能保留无障碍和功能性。在 Tooltip.Trigger 例子中，它必须是能够聚焦的元素，使得可以响应鼠标鼠标和键盘时间。如果你是改成 div 元素，那么无障碍功能就不复存在了。

In reality, you will rarely modify the underlying DOM element like we've seen above. Instead it's more common to use your own React components. This is especially true for most `Trigger` parts, as you usually want to compose the functionality with the custom buttons and links in your design system.

在实际中，你会很少修改底部的 Dom 元素。取而代之更常见的情况是使用你自己的 react 组件。这是对 `Trigger` 非常正确的，因此你通常想要组合功能到自定义 buttons 和 links 在你的设计系统

## [Composing with your own React components](https://www.radix-ui.com/primitives/docs/guides/composition#composing-with-your-own-react-components)

This works exactly the same as above, you pass `asChild` to the part and then wrap your own component with it. However, there are a few gotchas to be aware of.

这部分和上述内容相似，你传递 `asChild` 给 Tooltip 然后讲自己的组件用 Tooltip 包裹。然而，这里有一些陷阱需要知道

### [Your component must spread props](https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-spread-props)

When Radix clones your component, it will pass its own props and event handlers to make it functional and accessible. If your component doesn't support those props, it will break.

当 Radix 克隆你的组件，它会传递自身的props 和 事件处理器给组件使得它能够 functional 和 accessible。 如果你的组件不支持这些属性，将会失效。

This is done by spreading all of the props onto the underlying DOM node.

这个方案的实现是依靠展开 props 到内嵌的 Dom 节点。

``` jsx
// before
const MyButton = () => <button />;
// after
const MyButton = (props) => <button {...props} />;
```

We recommend always doing this so that you are not concerned with implementation details (ie. which props/events to accept). We find this is good practice for "leaf" components in general.

我们建议始终这样做，这样你就不用担心实现细节（例如，接受哪些 props/events）。我们发现这对于一般的“叶子”组件来说是一个好的实践。


> Similarly to when changing the element type directly, it is your responsibility to ensure the element type rendered by your custom component remains accessible and functional.
> 

就像直接更改元素类型时一样，确保您的自定义组件呈现的元素类型保持可访问性和功能性的责任在于您。

### [Your component must forward ref](https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref)

Additionally, Radix will sometimes need to attach a `ref` to your component (for example to measure its size). If your component doesn't accept a `ref`, then it will break.

此外，Radix有时需要将一个`ref`附加到您的组件上（例如，为了测量其大小）。如果您的组件不接受`ref`，那么它将无法正常工作。

This is done using `React.forwardRef` (read more on [react.dev](https://react.dev/reference/react/forwardRef)).

```jsx
// before
const MyButton = (props) => <button {...props} />;
// after
const MyButton = React.forwardRef((props, forwardedRef) => (
  <button {...props} ref={forwardedRef} />));
```

Whilst this isn't necessary for **all** parts, we recommend always doing it so that you are not concerned with implementation details. This is also generally good practice anyway for leaf components.

虽然这不是所有部分都需要做的事情，但我们建议始终这样做，以便你不要关心实现细节。这对于叶子组件来说也是一个通常的良好实践。

## [Composing multiple primitives](https://www.radix-ui.com/primitives/docs/guides/composition#composing-multiple-primitives)

`asChild` can be used as deeply as you need to. This means it is a great way to compose multiple primitive's behavior together. Here is an example of how you can compose `Tooltip.Trigger` and `Dialog.Trigger` together with your own button:

`asChild`可以在需要的时候尽可能深入使用。这意味着它是一种很好的组合多个基元行为的方法。以下是如何使用自己的按钮组合`Tooltip.Trigger`和`Dialog.Trigger`的示例：

```jsx
import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
const MyButton = React.forwardRef((props, forwardedRef) => (
  <button {...props} ref={forwardedRef} />));
export default () => {
  return (
    <Dialog.Root>      
      <Tooltip.Root>        
        <Tooltip.Trigger asChild>          
          <Dialog.Trigger asChild>           
            <MyButton>Open dialog</MyButton>          
          </Dialog.Trigger>        
        </Tooltip.Trigger>        
        <Tooltip.Portal>…</Tooltip.Portal>      
      </Tooltip.Root>     
      <Dialog.Portal>...</Dialog.Portal>    
    </Dialog.Root>  
  );
};
```



asChild 是什么

列举几个 radix 组件使用 asChild 例子

asChild 实现原理