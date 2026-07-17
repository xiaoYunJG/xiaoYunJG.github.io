---
title: Go 切片的删除、扩容与缩容
date: 2026-07-11 14:30:00
categories:
  - Go
tags:
  - Go
  - Slice
  - 内存
excerpt: 用几个小例子梳理 Go 切片删除元素、append 扩容，以及何时主动释放底层数组。
index_img: /img/post-cover.svg
---

切片由指针、长度和容量组成。它看起来像动态数组，但多个切片可能共享同一块底层数组，因此修改时需要先想清楚“谁还在引用它”。

> `append` 是否分配新数组由容量决定，不能把它当作固定行为。

## 删除一个元素

保持元素顺序时，可以把前后两段拼接起来：

```go
func deleteAt(items []string, i int) []string {
	copy(items[i:], items[i+1:])
	items[len(items)-1] = "" // 释放对原字符串的引用
	return items[:len(items)-1]
}
```

- `copy` 适合希望保序的列表；
- 如果不关心顺序，可用末尾元素覆盖目标位置；
- 删除后返回的新切片要重新赋值给调用方变量。

## 扩容的直觉

```go
numbers := make([]int, 0, 2)
numbers = append(numbers, 10, 20)
numbers = append(numbers, 30) // 容量不足时，运行时可能分配更大的数组
```

当容量不够时，运行时会选择新的容量并复制旧数据。具体增长倍数属于实现细节，不应依赖；需要预估大小时，用 `make([]T, 0, n)` 预分配更可靠。

## 何时缩容

如果一个小切片长期持有一个很大的底层数组，可以复制到刚好够用的新数组：

```go
func compact[T any](items []T) []T {
	return append([]T(nil), items...)
}
```

这会多一次复制，适合缓存、批处理结束等明确需要释放内存的场景。不要为了“看起来更省内存”而在热路径频繁缩容。
