

- 功能 -> 方案 -> 实现
- API

## todo
- [ ] react-router example https://github.com/remix-run/react-router/blob/main/examples
 - [x] lazy-loading 
 - [x] data-router
 - [x] 路由跳转回到原页面
 - [ ] 滚动保留
 - [ ] 

## 功能

基本功能：
1. 配置路由，页面根据路径渲染组件 routes/RouterProvider
2. 路由跳转，Link/useNavigate
3. 路由守卫，useBeforeUnload
4. url 解析 id,params,hash,search
5. 守保护页面：没有登陆，跳转到登陆页面，登陆成功后，跳转到原页面 1.通过 location.state，2.通过 url， 看 auth，auth-router-provider


## API
数据路由

useSubmit
useFetcher
useNavigation
useFetcher/useFetchers

useRevalidator
``` js
let revalidator = useRevalidator();
revalidator.revalidate();
revalidator.state === "idle" | "loading"
```


[路由懒加载优化](https://juejin.cn/post/7446776730625228834?searchId=202502132314587EB9A744D1AC642679E9)


## 拓展
- [ ] React.lazy(() => import 路径能不能改成 @，路径解析原理