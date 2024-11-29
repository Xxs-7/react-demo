vdom 不等价于 fiber，fiber 是 vdom 的实现
dom diff 不等于 reconciliation，

 
``` js
const { port1, port2 } = new MessageChannel();
port2.onmessage = function () {
    console.log('MessageChannel');
};
port1.postMessage('ping');

Promise.resolve().then(() => {
    console.log('Promise');
});
```