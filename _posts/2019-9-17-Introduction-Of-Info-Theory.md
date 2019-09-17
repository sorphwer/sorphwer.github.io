---
layout: post
title: "Learning I.T.T "
author: "Riino"
header-img: "img/lunur.jpg"
header-mask: 0.3
mathjax: true
sticky: false
tags:
  - information theory
---

[TOC]
# I.T.T

## 1.Define Info.

Here is a table:

| B    | P    | M    |
| ---- | ---- | ---- |
| 0    | 0    | 1    |
| 0    | 2    | 0    |
| 0    | 3    | 3    |

If there’s a unknown answer which might be 0,1, 2 or 3, by known which column contains it , we can get to know what it exactly is.

e.g. it in **M**： Answer is 1.

e.g. it in **P** and **M** : Answer is 3.

Now we can call the bold alternatives as “Information”, for it lead us from uncertainty to certainty. 

## 2.Deterministic Info.

There’s a finite set of such alternatives :
$$
\mathbb{Z}={\{a_1,a_2,\cdots,a_n\}}
$$
each alternatives has these attribution:

- Alternative: Uncertain possibilities
- Abstract: Not physical but universal
- Bidirectional: Currently the info. do not change from sender to receiver ( Dr. Lin also do not know why this attribution is necessary here, it has connection with further course. There still some argument why the Answer is 1 then we can know the pre-info. is **M**)
- Additive: Given info. A, and info. B equals given info.(A+B)

Now, define K:
$$
H_0({\{a_1,a_2,\cdots\}})=log_2K=log(\mathbb{Z})
$$

$H_0$ means 0-error , $\mathbb{Z}$ means 0-zero all necessary info set (Deterministic info.)