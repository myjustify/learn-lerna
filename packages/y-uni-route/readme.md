## 安装

import yUniRoute from 'y-uni-route';
yUniRoute();

## 路由拦截

```javascript
uni.$router.beforeEnter = function(to, from, next,options,type){
	...相关拦截操作
	next({ options,type })
}

uni.$router.afterEach = function(to, from){
	
}
```

