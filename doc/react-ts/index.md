react 中关于 typescript 的定义解释

``` ts
function forwardRef<T, P = {}>(
  render: ForwardRefRenderFunction<T, P>,
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
```

其中 render 即为内部组件，

``` ts
interface ForwardRefRenderFunction<T, P = {}> {
  (props: P, ref: ForwardedRef<T>): ReactNode;
  displayName?: string | undefined;
  // explicit rejected with `never` required due to
  // https://github.com/microsoft/TypeScript/issues/36826
  /**
   * defaultProps are not supported on render functions
   */
  defaultProps?: never | undefined;
  /**
   * propTypes are not supported on render functions
   */
  propTypes?: never | undefined;
}
```

示例代码
```jsx
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {/*  @ts-ignore  buzhidaojiejuefangfa danshinengyong*/}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
```

ref 传入的是 trigger，
T: `React.ElementRef<typeof AccordionPrimitive.Trigger>`,
P: `ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>`
T 和 P 与 props 和 ref 位置相反