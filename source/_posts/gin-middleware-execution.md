---
title: Gin Middleware 的执行原理
date: 2026-07-09 16:40:00
categories:
  - 后端
tags:
  - Go
  - Gin
  - Middleware
excerpt: 从 Handler 链与 c.Next() 的控制流理解 Gin 中间件的进入、退出和中断请求。
index_img: /img/post-cover.svg
---

Gin 的中间件本质上是处理函数链中的一环。理解它最实用的方式，是把 `c.Next()` 前后的代码分别看作“进入阶段”和“退出阶段”。

> 全局中间件、路由组中间件和路由处理函数会按注册顺序组成同一条执行链。

## 一个计时中间件

```go
func RequestTimer() gin.HandlerFunc {
	return func(c *gin.Context) {
		started := time.Now()
		c.Next()
		log.Printf("%s %s -> %d in %s", c.Request.Method, c.FullPath(), c.Writer.Status(), time.Since(started))
	}
}
```

执行时发生的事情：

- `c.Next()` 之前，记录开始时间；
- `c.Next()` 推进后续中间件与最终处理函数；
- 后续处理完成后回到 `c.Next()` 之后，记录状态与耗时。

## 何时中断

鉴权失败时通常不应继续执行后续处理函数：

```go
func RequireToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.GetHeader("Authorization") == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}
		c.Next()
	}
}
```

`Abort` 会阻止后续 Handler 执行，但已经进入调用栈的外层中间件仍可能在 `c.Next()` 之后继续收尾。因此日志、事务回滚等逻辑应能处理成功和中断两种路径。
