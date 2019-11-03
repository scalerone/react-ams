# react-ams
基于react做的资产管理系统，分为前后端：react目录为前端部分，server为后端部分。

### 技术栈
 - react
 - antd
 - react-router
 - react-redux
 - nodejs
 - ES6
 - express

项目借鉴和参考了其他的开源项目，感谢广大的developer

<br/>

### 项目目录结构

<img src="https://github.com/scalerone/image-store/blob/master/react-ams/directory.png?raw=true"/>  
<br/>

### 项目截图

<img src="https://github.com/scalerone/image-store/blob/master/react-ams/01.png?raw=true"/>  

<img src="https://github.com/scalerone/image-store/blob/master/react-ams/02.png?raw=true"/>  

<img src="https://github.com/scalerone/image-store/blob/master/react-ams/03.png?raw=true"/>  

<img src="https://github.com/scalerone/image-store/blob/master/react-ams/04.png?raw=true"/>  
<br/>

### 问题及解决方案
#### 1.跨域问题  
 前端与服务器端项目独立运行时，会存在 ajax 请求跨域问题  
 解决方式：
 
 1.本地调试-在package.json中可以配置代理参数  

```
"proxy": "http://www.domain.com:5002"
```
 
 2.线上环境-使用nginx的反向代理解决
 ``` 
 server {
  	# 访问应用时应输入的端口号
          listen       80;
          server_name  www.domain.com;
  
          #charset koi8-r;
  
          #access_log  logs/host.access.log  main;
  
  	# 所有请求(不与下面匹配的请求)都转发给前台应用
          location / {
  	    proxy_pass  http://www.domain.com;
  	}
      
  	# 所有以/api开头的请求都转发给后台服务器应用
  	location ~ /api/ {
  	    proxy_pass  http://www.domain.com:5002;
  	}
  	
  ```
 www.domain.com对应的是你开发的localhost 后期可购买域名替换   
 3.合并到服务端项目一起运行 
 #### 2.性能优化
   Component存在的问题  
-    a. 父组件重新render(), 当前组件也会重新执行render(), 即使没有任何变化  
-  b. 当前组件setState(), 重新执行render(), 即使state没有任何变化            

原因: 组件的shouldcomponentUpdate()默认返回true, 即使数据没有变化render()都会重新执行 

解决方式：   
    1: 重写shouldComponentUpdate(), 判断如果数据有变化返回true, 否则返回false    
    2: 使用PureComponent代替Component   
    3: 使用 immutable.js
>    immutable使用先进的tries(字典树)技术实现结构共享来解决性能问题，当我们对一个Immutable对象进行操作的时候，ImmutableJS会只clone该节点以及它的祖先节点，其他保持不变，这样可以共享相同的部分，大大提高性能。
 
 补充：关于 immutable.js在react+redux项目中的使用可以参照我之前写的一篇[博客](https://www.cnblogs.com/mrwh/p/11623759.html)，末尾第5部分有讲到用法

#### 3.路由刷新问题
问题：react-router-dom中BrowserRouter模式下刷新页面会返回404，跟vue-router中配置mode为history模式一样 

原因: 项目根路径后的path路径会被当作后台路由路径, 去请求对应的后台路由, 但其实后台没有该路由
 
解决方式: 把找不到的路由，都返回index.html  
**方法1.通过服务器配置解决**

Apache
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
nginx

```
location / {
  try_files $uri $uri/ /index.html;
}
```

**方法2.后端页面处理解决**

a.node.js自定义中间件处理

```
//使用自定义中间件去读取返回 index 页面展现
// 必须在路由器中间之后声明使用 
app.use((req, res) => {
  fs.readFile(__dirname + '/public/index.html', (err, data)=>{
    if(err){
      console.log(err)
      res.send('后台错误')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });
      res.end(data)
    }
  })
})
```
b. 使用 [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) middleware  

中间件实现的功能是如果 当URL 匹配不到任何静态资源，返回指定的页面（中间件默认返回的是index.html）   
**express中的用法**：

```
const history = require('connect-history-api-fallback');
//这句代码需要在express.static上面
app.use(history(
    {
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
    }
));
// 声明使用静态中间件
app.use(express.static('public'))
```







**koa中的用法**：
```javascript
//app.js
const historyApiFallback = require('koa-history-api-fallback')
app.use(historyApiFallback());

```
**这里要注意中间件的顺序，historyApiFallback一定要放在所有接口路由后面，否则所有接口都是返回index.html了。
historyApiFallback一定要在静态资源前面，否则资源找不到**

```
// routes
app.use(index.routes(), index.allowedMethods())

//一定要写在路由后面，写在前面就不会返回接口内容，而是直接返回首页了
app.use(historyApiFallback()); // 在这个地方加入。一定要加在静态文件的serve之前，否则会失效。
app.use(koaStatic(__dirname, { maxage: 604800000 }))    //一周的缓存时间，单位ms
app.use(koaStatic(__dirname + '/public/build', { maxage: 604800000 }))
app.use(koaStatic(__dirname + '/public/upload-files', { maxage: 604800000 }))
```

<br/>


### 安装运行
#### 1.下载或克隆项目源码

#### 2. npm或者 yarn 安装相关包文件(国内建议增加淘宝镜像源）
分别进入到前端目录react和后端目录server

```
yarn or npm i
```

#### 3. 本地准备MongoDB环境
可参考文章[MongoDB 的安装与配置](https://blog.csdn.net/fengtingyan/article/details/88371232)

#### 4.启动项目
先启动后端，在server目录下执行

```
npm run start
```
再启动前端，在react目录下执行

```
npm run start
```
#### 5.打包项目

在react目录下执行打包编译
```
yarn build or npm run build
```
将生成后的build文件下的内容拷贝到server/public/目录下


### 最后
项目是断断续续写的，把工作中的东西抽出来一些应用实践，只有下班和周末有时间，后续会慢慢完善和优化.


### 其他个人项目

[基于nodejs+vuecli3+element-ui构建的后台管理系统](https://github.com/scalerone/node-vue-ele-admin)

觉得不错的给个star鼓励支持！^_^
