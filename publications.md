---
layout: page
title: Research
permalink: /research/
description: Research by Vedang Asgaonkar on foundation models for relational data, time-series retrieval, feature acquisition and evolutionary game theory.
lede: Projects at Stanford, IIT Bombay, ISTA and Stanford GSB, newest first.
---

{% for item in site.data.research %}
  {% include entry.html dates=item.dates title=item.title meta=item.where summary=item.summary links=item.links %}
{% endfor %}
