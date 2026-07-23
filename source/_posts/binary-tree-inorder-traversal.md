---
title: 二叉树中序遍历与递归思路
date: 2026-07-12 10:00:00
categories:
  - 算法
tags:
  - C++
  - 二叉树
  - 递归
excerpt: 从“左、根、右”的访问顺序出发，理解二叉树中序遍历的递归结构与复杂度。
index_img: /img/post-cover.svg
---

中序遍历的关键不是记住代码，而是把一次遍历看成“先完整处理左子树，再访问当前节点，最后处理右子树”。

> 对二叉搜索树而言，中序遍历会按从小到大的顺序得到节点值。

## 递归定义

对于任意节点 `root`，完成三件事：

- 递归访问左孩子；
- 记录当前节点；
- 递归访问右孩子。

```cpp
#include <vector>

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
};

void inorder(TreeNode* root, std::vector<int>& result) {
  if (root == nullptr) return;
  inorder(root->left, result);
  result.push_back(root->val);
  inorder(root->right, result);
}
```

## 为什么这样写有效

递归调用会把“遍历一棵树”的问题缩小为“遍历它的左右子树”。空指针是最小子问题，直接返回即可。每个节点只会被访问一次，因此：

- 时间复杂度为 `O(n)`；
- 递归栈空间为 `O(h)`，其中 `h` 是树高；
- 在退化链表状树中，栈空间最坏为 `O(n)`。

## 小结

练习树题时，可以先写出访问顺序，再决定是用递归还是显式栈。递归版本更适合建立直觉，显式栈则是后续迭代写法的基础。
