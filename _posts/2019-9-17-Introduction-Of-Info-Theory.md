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

Now we can call the bold **Alternatives** as “Information”, for it lead us from uncertainty to certainty **Outcome**

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



### Pigeon hole principle **(explain why we are still uncertain with certain information)

if $\mathbb{X}鴿子$>$\mathbb{Y}籠子$ , there’s no one-t-one mapping from $\mathbb{X} $ to $\mathbb{Y}$

X: Alternatives

Y: Names

One-to-one: $encoder: v(x)->\forall a_1 != a_2 , v(a_1)!=v(a_2)$   $ \exists decoder:\mu(x)  -> \mu(v(a))=a$

###  Sort size-n array of distinct elements

n! Alternatives needs T(log(n!)) to create each Names .

### *Can we do better than $H_0$?

NO. one-to-one can not be built, we can’t hold 0-error.(Pigeon hole principle)

YES, if some error?

e.g.  Here are 10 balls , 1 of them is heavier. If we use a balance to measure , can we measure 2 times to get 0-error outcome? No

However, if we just throw the first ball, we can archive that. and we have 1/10 possibility to fail. 

Now clear **P**:

 
$$
U\subseteq \mathbb{X},P_r(U)=\sum_{a_k\in U}P(a_k)
$$
U: event

as for $H_\sigma(\mathbb{X}=log|U|: U\subseteq\mathbb{X},P_r(U)>=1-\sigma$ (think about throwing not one balls but more(creating more U))

so:
$$
H_\delta(\mathbb{X})=log(min(|U|:U\subseteq\mathbb{X},P_r(U)>=1-\delta))
$$
We call it as **Probabilistic info.**

back to e.g. : $H_{1/10}<=log9$  :We can use a few Names to get Outcome we want.

$\mathbb{X}$: ensemble $P(a_k)>0$ for all $a_k$

*When we throw everything , we get $H_1$ = meaningless

Thus , define $\delta<1$ , $0<=H_\delta<=H_0, |U|>=1$



