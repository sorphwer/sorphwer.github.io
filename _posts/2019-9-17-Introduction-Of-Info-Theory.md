layout: post
title: "Learning I.T.T "
author: "Riino"
header-img: "img/lunur.jpg"
header-mask: 0.3
mathjax: true
sticky: false
tags:

  - information theory

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

**證明題：**

**由於鴿籠理論 Hdelta（X） > H0（Y）**

**那麽沒有v和u（deterministic） 使得：**

**在$H_\delta$ 下，P（u(v(x))=x)>=1-$\delta$** 

****

證明 ：

如果存在v和u 使得等式成立

所有正確的符合等式的x是Hdelta裏面的大集合X ,X的剩下部分在decode和encode后會壞掉，小於等於delta的部分

由於鴿籠pri，鴿子一定要比籠子少->因爲正確集合的性質是在enc和dec全對，那由於鴿籠，它的量（x的正確集合，也就是下圖的綠框）肯定比Y籠子的量小。

。則H0(Y)>=log（x的正確集合的數量）>=Hdelta（X），就可以證明 H0（Y)>=Hdelta(X),則原條件有問題，反證法得證。

log（x的正確集合的數量）=H0（x的正確集合的數量)

![1569308313629](assets/1569308313629.png)

//// 因爲正確集合的性質是在enc和dec全對，那由於鴿籠，它的量肯定比Y籠子的量小。



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



## 3.Entropy

從上面的我們知道Hdelta是一個函數，Shannon Entropy就是Hdelta的summa number，它來總結整個函數的情況。

Hdelta函數 在delta=0的時候等於H0，在delta無限大的時候Hdelta=0。 定義域0，無限大。 對應域（0，H0），**而且一定單調**

entropy評價對某個Hdelta，代表的case下信息分散的程度。



假設現在大X集合是 a1,a2,a3。設它們對應的概率是p1,p2,p3..(比方説你在case：a1，的單選題中有p1的概率答對，也就是説你有1/p1個選擇。),a1,a2,a3..是你選對的那道題。要做對a1，需要log(1/p1)個bit。

對於這個大X集合的summary number，每個需要的bit量的加權平均值就是Entropy。

Entropy可以表現你這整套試卷($\mathbb{X}$) 的平均需要的信息量：
$$
Shannon Entropy:H(\mathbb{X})=\sum P_i *log_2{(1/p_i)}
$$
H函數輸入集合大X，返回它的entropy。

注意：lim(x->)log（1/x）->0



對於絕對，p=1，H0=0(要知道一定發生的事情需要的信息量是0bit)

證明 H<=H0

->  
$$
\sum P_i Log(1/p_i) -\sum P_ilogK<=0
$$


->
$$
\sum P_i (ln(1/p_i*K)/ln2)
$$
for ln$\theta$ <= $\theta$-1
$$
\sum P_i (ln(1/p_i*K)/ln2) <= (1/ln2)\sum P_i((1/P_i*K)-1)=0
$$
當Pi=1/k 的時候等式成立（全部ai的幾率相等)



如果一個系列的ai，它的p是兩個步驟來決定的，有p的概率做第一步的選擇，q概率做第二個。我們把上面的pi換成$p_i*q_{ij}$就可以。

->
$$
H(\mathbb{X})=\sum_{合法ij}（p_iq_{ij}log(1/p_iq_{ij})
$$
->
$$
=\sum_ip_i\sum q_{ij}log(1/q_{ij})+\sum(p_iq_{ij})log(1/p_i) (最後的q_{ij}是1，去掉后就只有p_i)
$$
**上式説明了entropy的可加性。**
$$
=\sum_i P_i* H(\mathbb{X}_i)+H(\mathbb{X}_{top})
$$


推廣：

H(X*X)=2H(X)

### Talking $H_\sigma \approx H$(Sample Mean and Expectation)

Imagine $H_\sigma(\mathbb{X}^n)$ and $H(\mathbb{X}^n)$, if n is big enough,  then whether  $H_\sigma \approx H$ ?

-> $(1/N) H_\sigma(\mathbb{X}^n) \approx H(\mathbb{X})$

s.t :  TO PROVE : $1/N*\sum_{i=1}^Nlog(1/P_{ki})\approx H(X)$:expectation of $log(1/p_k)$

左側相當於是一套選擇題有N道題，做出其中一套答案的幾率為P，左側相當於1/N* log(1/P).

For example: 每道題有三個選項，A,B,C。隨機猜A的概率30%，B是30%，C是40%。

根據統計學知識，答案中A的個數會收束在0.3N上，B,C同理。假設約等成立,則產生其中一個答案的概率P約等於$2^{-NH}$

這裏大P，記作$P=P(Q_1Q_2Q_3...Q_n)$ Q是每道題答案
$$
(many)P\approx2^{-NH}  (該式簡潔地揭露了P和H的聯係,N是測試的次數（也就是選擇題的個數）)
$$
->
$$
\{2^{NH}P\}\approx1  (H是H(\mathbb{X}))
$$
->
$$
NH\approx H_\delta
$$
**證明：**要證明約等，則要知道：
$$
Pr((1/N\sum^N_{n=1}u_n-E(u)^2)>=\alpha)<=\sigma_u^2/\alpha N
$$
也就是説左邊的平均概率和我們的Expectation：E的差大於alpha的概率（不等於），是小於平均方差

對於random variable：r 和它的 expectation：E（r)
$$
Pr((r-E(r))^2>=\alpha)<=\sigma_r^2/\alpha
$$
相當於在求對一個random variable: t :（t>=0)
$$
Pr(t>=\alpha)<=E(t)/\alpha
$$
E(t)就相當於r的標準差$\sigma$.  所以證明上式正確，原式就正確。

而標準差$\sigma=\sum P(t)/\alpha$

左邊則等於$\sum P(t)[t>=\alpha]$

->
$$
\sum P(t)[t>=\alpha] <= \sum P(t)t/\alpha (chebyshev's Inequality)
$$
現在討論約等號：

考慮實驗次數。

Given E>0 . 

there exits N0 s.t.

N>=N0  ->  $|1/N H_\delta(\mathbb{X}^n)-H(\mathbb{X})|<E$

->
$$
(1/N)H_\delta(X^n)<H(X)-E
$$
我們現在記U是X的一個子集，U是一個大概率集

有
$$
(1/N)H_\sigma(X^n)<=(1/N)log|U|<H(X)+E
$$
U:{Z：p(z)>$2^{-(H+E)N}$}

log|U|<(H+E)N



在U中，typically 一般出現的情況是T，



以上的推論是想找出，通過覆蓋最常出現的選擇題回答的序列，來找到最少的bit讓我們可以得出OUTCOME

*Shannon’s first theorem: 揭露了概率和熵的關係:

give 0<e ,o<$\delta$

there exists no such that :
$$
N>=N_0 -> H-e<(1/N)H_\delta(\mathbb{X}^N)<H+e  (1式)
$$
做了N次實驗的典型結果T：

![1570517684744](assets/1570517684744.png)

其P（T）>1-$\sigma^2/e^2N<\delta$ ,説明了（1式的上界）

（證明最上面的不等式，右半邊是用一個T，T的大小是在典型情況浮動， T既然是U的子集合自然要小於U。T是典型集

左邊是假設有個V，V很小。V有何T重合的部分，也有不屬於T的部分，那他們小於T對X的補集再加上V定義的數量（$2^{(H-e)N}$，再乘上V的最大概率=1，那顯然V的最大概率不能那麽大，他一定要足夠小，再還要滿足他有U的部分，則U有一個下限的。

整個不等式（1式） 描述了N次實驗下$H_\delta$和H的關係（前者落在後者+-e的區間）





## 4.Physical Coding（block Coding)

現在我們知道
$$
N>=N_0 -> H-e<(1/N)H_\delta(\mathbb{X}^N)<H+e  
$$
那對於典型集：
$$
log|2^{H_\delta}+1|\approx H_\delta\approx NH
$$
説明N次實驗需要NH來存，則每一次的典型情況都需要H個bits來記錄。我們就可以知道Bit rate差不多是H。這叫block coding：一次decode N次實驗的情況。Block的長度就是H。也就是$H_\delta/N$





Block coding 核心：(化成等长的块)
$$
H_\delta(X^n)\approx_{block} NH(X)
$$
Symbol Coding 核心: 按照概率化成不等长的块（比如haffman）
$$
H(X)
$$


## 5.Source Coding(Symbol Coding)

*realistic coding to archive H

symbol coding :  x->v(x)

對於一系列a1...ak編碼成v(a1)...v(ak),出現概率是p1..pk，編碼長度是n1...nk。

編碼后平均長度是
$$
n_{average}=\sum p_kn_k
$$
## 6.UD Code (uniquely decodable)

現在證明某些情況下它約等於block code length $\approx$ H

-X

要做到errorfree編碼：UD （可解码编码）

就是要做到有
$$
UD:  \sum_{k=1}^{k}2^{-n_k}<=1 (Kraff's)
$$
↑也就是從a1到ak,每個的長度要滿足上式。

->
$$
UD for N=1 : \sum_{i=1}^上|\{k:n_k=i\}|*2^{-i}<=上
$$

$$
UD for N=2 : \sum_{i=1}^{2上}|\{k:n_k+n_e=i\}|*2^{-i}<=2上
$$

## 

## 7.Symbol Coding

上面證明了平均最短碼率是 Entropy. 

現在考慮
$$
H(\mathbb{X})-n_{ave}=\sum p_k log(1/p_k)-\sum p_k n_k
$$
->(因爲$n_k是log2^{n_k}$)
$$
=\sum p_k (ln/ln2)(2^{-n_k}/p_k)<=\sum p_k(2^{-n_k}/p_k-1)  (因爲x-1>=lnx)
$$
->因爲$\sum p_k=1$ (另外假設UD真的存在，sum的結果小於等於1)
$$
=(1/ln2)(-1+\sum 2^{-n_k})<=0
$$
結論：
$$
H(\mathbb{X})<=n_{ave}
$$
等號發生的條件：
$$
1. (1/p_k)*2^{-n_k}=1 也就是n_k=log(1/p_k)
$$
另外UD成立：
$$
2.\sum 2^{-n_k}=1
$$
結果：對於一個編碼要是能做到碼率逼近H，那： 小的$p_k$相當於大的$n_k$ (從信息論角度證明了haffman編碼的結果之必然性)

經過以上結論，就可以通過p或者n來構建haffman編碼所需的 Binary Tree.

構建過程略；

在一個$2^n$的完全數裏安放a1,a2...an。

每一次將消耗$2^{n_{max}-n_k}$個node. 而且有：
$$
\sum _k 2^{n_{max}-n_k} <= 2^{n_{max}}
$$
haffman編碼是uniquely decodable . 這樣的很明顯的coding稱爲 instaneous (can immediate decode)：每個$a_n$可以直接部署在tree裏。 數學上叫prefix-free. instaneous code 是UD的一個子集。

以下再示範二者區別: 兩種編碼都是UD: $\sum 2^{-n_k}<=1$

| source | instaneous | non-instaneous |
| ------ | ---------- | -------------- |
| a1     | 1          | 0              |
| a2     | 01         | 01             |
| a3     | 001        | 011            |
| a4     | 0001       | 0111           |

很明顯 instaneous的性質是順序讀取時可以立馬decode。decoded code可以連續存在互不干擾。

綜上，ID是UD的special case.通過$\sum 2^{-n_k}<=1$可以construct 一個ID。

### * if $log(1/p_k)$  not integers：

naive idea: use $n_k = [log(1/p_N)]取上整數$ 。則：
$$
n_{ave}=\sum p_kn_K<\sum p_k(log(1/p_k)+1)=H(\mathbb{X})+1
$$
用block coding思路: 對於$\mathbb{X^n}$: avg. length per symbol 要花費 $H(\mathbb{X})+1/n$ 

### Haffman Coding

一個性質： $n_{ave}$

claim: p1>=p2>=p3...>=pn

​          n1<=n2<=...<=nk

claim: $n_{k-1}=n_k$ ->要盡量把每個decode在binary tree上往上移，減少n

因此誕生算法:嘗試將最長的兩個長度相等的source code移動到相等level。可以首先給他們一個common prefix,然後用1和0分開。再merging。這個算法縮寫叫HC： haffman coding.

haffman的思路即從最小p的a出發，由下往上構建Binary tree.

haffman所做的：

1. 找兩個最小p的a。

2. 通過$HC(p_1,p_2...p_{k-2}，p_{k-1}+p_k)$

   變成$v(b1),v(b2),....v(b_{k-1})$

3. v(ai)=v(bi)

   v(ak-1)=v(bk-1) combine “0”

   v(ak)=v(bk-1) combine “1”

   

## 8.‘Quantization’ Coding

*What if “many” of all are slightly wrongly coded?

for an example of X={1,2,3,...,100} (which needs log100), and we encode(概算) it into Y={5,10,15,...,95} -> H0=log19

that $Y\sube X$， how to measure the **distortion**: d(x,y) between X and Y ?

We set this measuring procedure as **quantization**.(reminds of JPEG??)

There’s two attribute of quantization , rate: |Y| and distortion :d(x,y)=（x-y)^2

e.g.  X={1,2,3,4,5,6} , Y={1,3,5} 

其中一種可能編碼，這種編碼抛棄2，3，6.如果X中出現2,3,6則會在編碼中損失。
$$
\begin{array}{lc}
\mbox{}&
\begin{array}{cc}1& 3 &5\end{array}\\
\begin{array}{c}1\\2\\3\\4\\5\\6\end{array}&
\left[\begin{array}{cc}
1&\\
&1\\
&1\\
&&1\\
&&1\\
&&1\\
\end{array}\right]
\end{array}
-deterministic -quantization
$$
在Y中： 1出現概率p1，3出現p2+p3，5出現p4+p5+p6,pi是X中的各個概率
$$
\hat d=p_2+p_3+p_6
$$
另一種從X到Y的編碼，這次是概率隨機分配。(這種叫**scalar quantization**)


$$
\begin{array}{lc}
\mbox{}&
\begin{array}{cc}1&2& 3&4 &5&6\end{array}\\
\begin{array}{c}1\\3\\5\end{array}&
\left[\begin{array}{cc}
1&1/2&&&&&\\
&1/2&1/2\\
&&&1/2&1/2&1/2

\end{array}\right]

\end{array}
randomized-quantization
這圖需要修復
$$
這裏1出現概率p1+1/2p2,3出現1/2p2+p3+1/2p4 , 5出現1/2p4+p5+p6

$$
\hat d=\sum p(x)p(y|x) d(x,y)
$$
目標就是找到一個$Y_q$：
$$
rate:min ->r_q=H(Y_q)
$$
有：
$$
\hat d_q=\sum _{x,y}p(x)q(y|x)d(x,y)\le instance
$$
e.g.2

如果X={0,1}=Y

其中編碼時候1有$\delta$ 概率變成0，那
$$
r_\delta=H((1+\delta)/2)
$$

$$
\hat d_\delta =1/2*\delta
$$

説明 randomized quantization 裏 $\hat d$ 和rate 正相關。當\delta =0.88的時候, hat d=1/2\delta=0.44. r=1/3



在考慮1有$\delta_1$概率變成0，那麽
$$
\hat d=1/2(\delta+\delta_1)
$$

$$
r=H((1+\delta-\delta_1)/2)
$$

利用**block（vector）quantization**可以在差不多的rate下面得到低的distortion：

X^3 ->{000,111}

可以讓$x\in X^3$,1多的=111，0多的=000，會得到更好distortion。這裏avg rate=1/3, avg distortion =6/8/3=1/4

***vector distortion** 
$$
d(\underline x,\underline y)=1/N\sum_{n=1}^N d(x_n,y_n),x,y\in X^N
$$

那麽透過vector distortion能做到多好？

對於一個X={0,1},Px={1,0},編碼到Y，0有1/2概率編碼成1，1/2變成0，而1不出現。那：

typical y $\in Y^n$ , 是half 0, half 1， 而typical x是all 0 

這樣以來 對於給定的x ，其transition uncertainty：
$$
\sum_x q(y|x)log(1/p(y|x)):transition Unvertainty
$$
下面定義Conditional entropy:
$$
\sum_xp(x)\sum_x q(y|x)log(1/p(y|x))=H(\mathbb{Y|\mathbb{X}})(conditinal Entropy)
$$
真正的uncertainty 是 H(Y)-H(Y|X).

另外知道 joint ensemble entropy：
$$
H(X,Y)=\sum_{x,y}p(x,y)log(1/p(x,y))
$$
->
$$
H(X)=\sum_x\sum_yp(x,y)log(1/p(x))
$$

$$
H(Y)=\sum_x\sum_yp(x,y)log(1/p(y))
$$

$$
H(Y|X)=\sum_{x,y}p(x,y)log(1/p(y|x))
$$

->
$$
=\sum_{x,y}p(x,y)log(p(y)/p(x,y))=H(X,Y)-H(Y)
$$
相似地：
$$
H(Y|X)=H(X,Y)-H(X)
$$
hint: H(Y|X)=H(Y) given X.

現在再考慮H(Y)-H(Y|X）=
$$
\sum_{x,y}p(x,y)log(p(y|x)/p(y))=\sum p(x,y)log(p(x,y)/p(y)p(x))=I(X;Y)
$$
上式記作：  Mutual Information ,注意中間式子裏x，y的對稱性。

n.d.  如果x,y是獨立事件，p(x,y)=p(x)p(y),那麽log裏的東西是1，log1=0，I（X;Y)=0.即X,Y之間無mutual Info.

![IMG_5173](assets/IMG_5173.JPG)

↑ The whole graph represents H(X,Y)

我們同樣也可以得出:
$$
0\le I(X,Y)=H(Y)-H(Y|X)\le H(Y)
$$
繼續看：
$$
\sum p(x,y)log(p(x,y)/p(y)p(x))=I(X;Y)
$$
上下翻轉log内容：
$$
-I\le1/ln^2\sum p(x,y)[p(x)p(y)/p(x,y)-1](不等式x\ge1-lnx)
$$
又
$$
\sum p(x,y)[p(x)p(y)/p(x,y)-1]=1-1=0
$$
->
$$
I(X;Y)\ge0
$$
*typical x in X^n : $p(x)\approx2^{-NH(X)}$

*typical y in Y^n : $p(y)\approx2^{-NH(Y)}$

->typical (x,y) in (X*Y)^n: $p(\underline x,\underline y)\approx 2^{-NH(X,Y)}$

如果上面三個條件都滿足，可以說是jointly typical (x,y) in X,Y.

->
$$
p(x)p(y)/p(\underline x,\underline y)=2^{-N(H(X)+H(Y)-H(X,Y))}=2^{-NI(X;Y)} (KindOfUncertaintyBetweenXandY)
$$
->
$$
\sum_ilog (p(x_i)p(y_i)/p(x_i,y_i))->I(X;Y)
$$
總結，對於從X到Y的encoding，考慮誕生的(x,y)，從數量來説(x,y)的縂概率要是$2^{N(H(X)+H(Y))}$，這相當於把typical x和typical y組合起來。

但是實際上Y的情況和X据有關連，一個typical x出現對一個特定y的出現有影響。因此typical （x,y)是$2^(NH(X,Y))$

請注意H(X)*H(Y)$\ge$H(X,Y),當X,Y獨立的時候等式成立。而它們的比，也就是X,Y的聯係度：
$$
2^{NH(X,Y)}/2^{N(H(X)+H(Y))}=1/2^{NI(X;Y)}
$$
所以説I表現了X,Y的一種相關程度，也就是我們能“掌握”X,Y相關度，也就是編碼時的certainty衡量所需要的信息量。