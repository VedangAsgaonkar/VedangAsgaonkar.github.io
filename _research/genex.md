---
title: Generator Assisted Mixture of Experts for Feature Acquisition in Batch
description: An approach to choosing which features to query in a batch under a fixed acquisition budget.
authors: Vedang Asgaonkar, Aditya Jain, Abir De
venue: AAAI
year: 2024
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/28967
links:
  - label: details
    url: /research/genex/
  - label: AAAI'24
    url: https://ojs.aaai.org/index.php/AAAI/article/view/28967
  - label: arXiv
    url: https://arxiv.org/abs/2312.12574
math: true
---

This work studies classification when only an initial subset of features is available and new features must be selected in a batch. We introduce GENEX, an algorithm for choosing which features to query under a budget constraint, then classifying from the available values.

## Salient features

* A greedy algorithm to determine the features to acquire during training.
* Locality Sensitive Hashing for fast retrieval of the optimal feature subset at inference time.
* A mixture-of-experts classifier for a heterogeneous domain of feature subsets.
* A generator that produces a subset of the features to acquire, reducing queries to the oracle.
* Theoretical support and empirical verification for the greedy algorithm.

## Problem setup

We use $$x \in \mathbb{R}^n$$ for a feature vector and $$y$$ for its classification label. Let $$\mathcal{I} = [n]$$ be the feature indices, $$\mathcal{O} \subset \mathcal{I}$$ the initially observed features, and $$\mathcal{U} \subset \mathcal{I} \setminus \mathcal{O}$$ the features acquired by the algorithm. A generator produces $$\mathcal{V} \subset \mathcal{U}$$ to save query cost; the remaining features in $$\mathcal{U} \setminus \mathcal{V}$$ are queried. We use $$p(x'[\mathcal{V}]\vert x[\mathcal{O}])$$ as a stochastic generator and $$h(\bullet)$$ as the classifier.

$$
    loss(h,p,U,V\vert O) = \mathbb{E}_{x'[V] \sim p(\bullet\vert x[O])} l(h(x[O \cup U \setminus V] \cup x'[V]))
$$

$$
    min_{h,p,V_i,U_i} \sum_{i \in D} loss(h,p,U_i,V_i\vert O_i)
$$

subject to the budget constraint $$\vert U_i \setminus V_i \vert \le q_{max}$$ for each point $$i \in D$$, the dataset.

## Proposed approach

![GENEX pipeline]({{ '/assets/genex_pipeline.jpg' | relative_url }})

### Data partitioning

To reduce the heterogeneity of feature subsets available for classification, we cluster the data using the observed features $$x[\mathcal{O}]$$. We perform random-hyperplane (RH) clustering, which provides good bucket balance and a per-instance objective.

We further use the data partitions to reduce the number of optimization variables. This is done by assigning the same optimal $$\mathcal{U}, \mathcal{V}$$ for data points in the same bucket. Moreover, the optimal value of $$\mathcal{U}, \mathcal{V}$$ is determined by a greedy algorithm on the training set. During inference, we locate the cluster corresponding to the test instance and use the optimal $$\mathcal{U}, \mathcal{V}$$ for that cluster.

### Mixture models

We deploy mixture models on the partitioned data by training an independent classifier for each cluster. This addresses feature-space heterogeneity and reduces inter-instance coupling of the optimal $$\mathcal{U}$$ and $$\mathcal{V}$$ subsets.

### Training and greedy algorithm

We first pretrain the generator to model arbitrary conditionals on the data in a $$\beta$$-VAE style. We then alternate between training the classifier and greedily constructing the optimal $$\mathcal{U}$$. We use a surrogate objective that is a function of $$\mathcal{U}$$, decoupling it from $$\mathcal{V}$$.

$$
F(h,p,U\vert O) = \Delta(U) l(h(x[O \cup U]), y) + (1-\Delta(U)) l(h(x[O] \cup x'[U]), y)
$$

The objective $$F(h,p,U\vert O)$$ is a linear combination of the loss from using oracle values for $$\mathcal{U}$$ and generating the full subset $$\mathcal{U}$$, weighted by the uncertainty of the generator $$\Delta(U)$$. The greedy algorithm greedily adds elements to $$\mathcal{U}$$ while the surrogate objective decreases.

We subsequently employ a greedy algorithm to construct $$\mathcal{V} \subset \mathcal{U}$$, adding elements while the overall objective decreases.

### Inference

During inference, the test instance is clustered using $$x[\mathcal{O}]$$. The optimal $$\mathcal{U}, \mathcal{V}$$ subsets and the classifier $$h$$ for this cluster will be used subsequently. The generator is used to generate $$x'[\mathcal{V}]$$ conditioned on $$x[\mathcal{O}]$$. We also query the values of $$x[\mathcal{U} \setminus \mathcal{V}]$$. Then, we perform classification using $$h(x[\mathcal{O} \cup \mathcal{U} \setminus \mathcal{V}] \cup x'[\mathcal{V}])$$. If the confidence of the classifier is low, we subsequently query $$x[\mathcal{V}]$$ and classify using $$h(x[\mathcal{O} \cup \mathcal{U}])$$.

## Results

We plot accuracy against query cost for four datasets and compare GENEX with RL-based and greedy baselines. The experiments show a significant accuracy gain over the state of the art.

![GENEX results]({{ '/assets/genex_results.jpg' | relative_url }})

## Contacts

For questions or suggestions, contact [Vedang Asgaonkar](mailto:vedanga@stanford.edu), [Aditya Jain](mailto:adityajainjhs@cse.iitb.ac.in), or [Abir De](mailto:abir@cse.iitb.ac.in).
