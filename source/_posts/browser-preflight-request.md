---
title: 浏览器 Preflight 预检请求详解
date: 2026-07-10 09:20:00
categories:
  - 前端
tags:
  - 浏览器
  - CORS
  - HTTP
excerpt: 理解 OPTIONS 预检为何出现、浏览器在确认什么，以及服务端需要返回哪些 CORS 响应头。
index_img: /img/post-cover.svg
---

跨域请求并不总会直接发送业务请求。遇到非简单方法、自定义请求头或特定 `Content-Type` 时，浏览器会先发出 `OPTIONS` 预检。

> 预检是浏览器的安全机制，不是前端代码显式调用 `fetch` 才会出现的“额外接口”。

## 什么请求容易触发预检

常见条件包括：

- 方法是 `PUT`、`PATCH`、`DELETE` 等；
- 携带 `Authorization` 或自定义请求头；
- 使用 `application/json` 作为 `Content-Type`。

```js
await fetch('https://api.example.com/profile', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer demo-token'
  },
  body: JSON.stringify({ nickname: 'yfx' })
});
```

## 服务端要回答什么

服务端需要针对 `OPTIONS` 正确返回允许的来源、方法和请求头，例如：

```http
Access-Control-Allow-Origin: https://gocoder.github.io
Access-Control-Allow-Methods: GET, POST, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 600
```

其中 `Access-Control-Max-Age` 可以让浏览器在一段时间内缓存预检结果，减少重复往返。开发环境里不建议粗暴写成所有来源都允许，尤其是在携带 Cookie 的场景。

## 排查顺序

先在网络面板查看 `OPTIONS` 的响应，再核对实际请求方法、前端发送的请求头与后端允许列表。预检成功不等于业务接口成功，它只表示浏览器同意继续发送下一步请求。
