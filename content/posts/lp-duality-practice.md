---
title: LP Duality Practice
description: Post about LP duality proofs.
date: 2021-11-24
tags:
  - linear programming
layout: layouts/post.njk
---

To prepare for my linear programming midterm, I looked at these problems from Bertsismas and Tsitsiklas' _Introduction to Linear Optimization_.

## Problem 4.27

For a given matrix $\mathbf{A}$, show that the following are equivalent:
$\text{(a)}$ Every vector $\mathbf{x}$ such that $\mathbf{A}\mathbf{x}\geq\mathbf{0}$ and $\mathbf{x}\geq\mathbf{0}$ must satisfy $x_1=0$.
$\text{(b)}$ There exists some $\mathbf{p}$ such that $\mathbf{A}^\top \mathbf{p} \leq \mathbf{0}$, $\mathbf{p}\geq\mathbf{0}$, and $\mathbf{A}_1^\top\mathbf{p}<0$ where $\mathbf{A}_1$ is the first column of $\mathbf{A}$.

### Solution

Consider the following primal-dual LP pair:
(Dual)
$$\begin{align*} \text{Minimize}\qquad\qquad &\mathbf{0}^\top \mathbf{p} \newline \text{subject to}\qquad \mathbf{A}_1^\top \mathbf{p} &\leq -1 < 0 \newline \mathbf{A}_i^\top \mathbf{p} &\leq \mathbf{0}\qquad \forall i \neq 1 \newline \mathbf{p} &\geq 0\end{align*}$$
(Primal)
$$\begin{align*} \text{Maximize}\qquad\qquad &-y_1 \newline \text{subject to}\qquad \mathbf{A}\mathbf{y} &\leq \mathbf{0} \newline \mathbf{y} &\leq \mathbf{0}\end{align*}$$

#### $(b)\text{ is true} \implies (a)\text{ is true}$
If $(b)$ is true, then the dual is feasible with an optimal value of the objective function equal to zero. Then for any $\mathbf{x}\leq\mathbf{0}$ satisfying $\mathbf{A}\mathbf{x}\geq\mathbf{0}$ and $\mathbf{x}\geq\mathbf{0}$, we have $\mathbf{y}=-\mathbf{x}$ satisfying $\mathbf{A}\mathbf{y}\leq\mathbf{0}$ and $\mathbf{y}\leq\mathbf{0}$ where $x_1=-y_1\leq0$ and $y_1\leq0$ (by weak duality). Therefore, $y_1=0$ and thus $x_1=0$.
#### $(b)\text{ is false} \implies (a)\text{ is false}$
If $(b)$ is false, then the dual is infeasible. This implies that the primal must either be infeasible or unbounded. Clearly, the primal is feasible with $\mathbf{y}=\mathbf{0}$, so the primal must be unbounded. Then for any $M\in\mathbb{R}$, there exists $\mathbf{y}$ such that $\mathbf{A}\mathbf{y}\leq\mathbf{0}$, $\mathbf{y}\leq\mathbf{0}$, and $-y_1>M$. Choosing $M=0$ and setting $\mathbf{x}=-\mathbf{y}$ yields $\mathbf{A}\mathbf{x}\geq\mathbf{0}$, $\mathbf{x}\geq\mathbf{0}$, and $x_1 \neq 0$, which shows $(a)$ is false.

## Problem 4.28

Let $\mathbf{a}$ and $\mathbf{a}_1,\dots,\mathbf{a}_m$ be vectors in $\mathbb{R}^n$. Show the following are equivalent.
$\text{(a)}$ For all $\mathbf{x}\geq\mathbf{0}$, we have $\mathbf{a}^\top \mathbf{x}\leq \max_i \mathbf{a}^\top_i \mathbf{x}$.
$\text{(b)}$ There exist nonnegative coefficients $\lambda_i$ that sum to $1$ such that $\mathbf{a}\leq \sum^{m} _{i=1} \lambda_i \mathbf{a}_i$.

### Solution

Consider the primal-dual pair:
(Primal)
$$\begin{align*}\text{Maximize}\qquad\qquad\mathbf{a}^\top\mathbf{x} + y& \newline \text{subject to}\qquad\qquad \mathbf{a}_i^\top \mathbf{x} + y &\leq 0 \qquad i=1,\dots,m \newline \mathbf{x}\geq\mathbf{0}\end{align*}$$

(Dual)
$$\begin{align*}\text{Minimize} \qquad\qquad\qquad\qquad \mathbf{0}^\top\Lambda& \newline \text{subject to}\qquad \begin{pmatrix} \mathbf{a}_1 & \dots & \mathbf{a}_m \end{pmatrix} \Lambda &\geq \mathbf{a} \newline \mathbf{1}^\top\Lambda &= 1 \newline \Lambda &\geq 0\end{align*}$$

#### $(b)\text{ is true} \implies (a)\text{ is true}$
If $(b)$ is true, then the dual is feasible with optimal solution 0. Then the primal is feasible. Let $\mathbf{x}\geq\mathbf{0}$. Then choose $\mathbf{y} = -\max_i \mathbf{a}_i^\top \mathbf{x}$. We get $\mathbf{a}^\top \mathbf{x} - \max_i \mathbf{a}_i^\top x \leq \mathbf{0}$, so $(a)$ is true.

#### $(b)\text{ is false} \implies (a)\text{ is false}$
If $(b)$ is false, then the dual is infeasible, so primal is unbounded or infeasible. 
The primal is clearly feasible with $\mathbf{x}=\mathbf{0}$ and $y=0$, so it must be unbounded. Then there exists $\mathbf{x}\geq\mathbf{0}$, $y\in\mathbb{R}$, such that $\mathbf{a}_i^\top \mathbf{x} \leq -y$ for all $i=1,\dots,m$, and $\mathbf{a}^\top \mathbf{x}+y > 0$.
That is, $\mathbf{a}^\top \mathbf{x}>-y>=a_i^{T}x$ for all $i=1,\dots,m$, so $\mathbf{a}^\top\mathbf{x} > \max_i \mathbf{a}_i^\top \mathbf{x}$.
