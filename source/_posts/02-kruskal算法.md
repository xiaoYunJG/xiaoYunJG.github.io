
---
title: kruskal算法
categories: 技术
tags:
  - C++
  - algorithm
date: 2022-7-26 17:49:50
description: 关于对kruskal算法的见解与看法
sticky: 1
cover: https://picsum.photos/id/857/6935/4283
copyright_author: xiaoYun
copyright_author_href: https://xiaoyunjg.github.io
copyright_info: 此文章版归xiaoYun所有，如有轉載，請註明來自原作者
---    


### Kruskal 算法攻破

#### 算法的具体步骤：
  核心算法并查集

```c++
#include <iostream>
#include <cstring>
#include <algorithm>

using namespace std;

const int N = 200020;

int n, m;
int q[N];  // 每个点对应的源节点

struct Edge
{
    int u, v, w;
    
    bool operator< (const Edge &W) const
    {
        return w < W.w;
    }
}edges[N];

int find(int x)
{
    if (q[x] != x) q[x] = find(q[x]);
    return q[x];
}

void kruskal()
{
    int res = 0, cnt = 0;  // 第一个是记录的权重最小值， 后面是多少条边
    for (int i = 0; i < m; i ++ )
    {
        int a = edges[i].u, b = edges[i].v, w = edges[i].w;
        
        if (find(a) != find(b))
        {
            q[find(a)] = find(b);
            res += w;
            cnt ++ ;
        }
    }
    
    if (cnt < n - 1) cout << "impossible";  // 如果没有连起来 n - 1 条边的话，就输出impossible
    else cout << res;
}


int main()
{
    scanf("%d%d", &n, &m);
    
    for (int i = 1; i <= n; i ++ ) q[i] = i;  // 使得每一个节点的源节点都指向自己
    
    for (int i = 0; i < m; i ++ )
    {
        int u, v, w;
        scanf("%d%d%d", &u, &v, &w);
        edges[i] = {u, v, w};
    }
    
    sort(edges, edges + m);
    
    kruskal();
    
    return 0;
}
```
