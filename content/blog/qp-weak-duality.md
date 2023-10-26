---
title: Weak Duality for QP
description: Proof of Weak Duality of Primal-Dual Pair of QP Problems
date: 2022-02-01
tags:
  - quadratic programming
layout: layouts/post.njk
---

Here is a quick proof of weak duality for the following general primal-dual pair of (linear equality constrained) QP problems:

Consider the following primal-dual QP pair:
(Primal)
$$\begin{align*} \text{Minimize}\qquad & \mathbf{c}^\top \mathbf{x} + \frac{1}{2} \mathbf{x}^\top \mathbf{Q} \mathbf{x} \newline \text{subject to}\qquad & \mathbf{A}\mathbf{x} = \mathbf{b} \newline & \mathbf{x} \succcurlyeq \mathbf{0}\end{align*}$$
(Dual)
$$\begin{align*} \text{Maximize}\qquad & \mathbf{b}^\top \mathbf{y} - \frac{1}{2} \mathbf{x}^\top \mathbf{Q} \mathbf{x} \newline \text{subject to}\qquad & \mathbf{A}^\top \mathbf{y} - \mathbf{Q}\mathbf{x} \preccurlyeq \mathbf{c}\end{align*}$$

### Solution
To show any solution of the primal (minimization) is no less than any solution of the dual (maximization), we show that $\mathbf{b}^\top \mathbf{y} \leq \mathbf{c}^\top \mathbf{x} + \mathbf{x}^\top \mathbf{Q} \mathbf{x}$.

Using the constraint in the primal, we have $\mathbf{y}^\top \mathbf{A} \mathbf{x} = \mathbf{b}^\top \mathbf{y}$. From the constraint in the dual, we have $\mathbf{y}^\top\mathbf{A}\mathbf{x}-\mathbf{x}^\top \mathbf{Q}\mathbf{x} \leq \mathbf{c}^\top \mathbf{x}$, since $\mathbf{x}\succcurlyeq \mathbf{0}$.
Therefore, $\mathbf{b}^\top \mathbf{y} = \mathbf{y}^\top \mathbf{A} \mathbf{x} \leq \mathbf{c}^\top \mathbf{x} + \mathbf{x}^\top \mathbf{Q} \mathbf{x}$.

We do not need to assume anything about $\mathbf{Q}$. When $\mathbf{Q}$ is the matrix of all zeros, the pair of QPs becomes the standard primal-dual pair for LPs.
