---
layout: page
title: Writing
permalink: /writing/
description: Essays by Vedang Asgaonkar.
lede: Occasional essays on ideas outside work.
---

{% for post in site.posts %}
  {% capture title %}<a href="{{ post.url | relative_url }}">{{ post.title }}</a>{% endcapture %}
  {% capture date %}<time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%b %Y' }}</time>{% endcapture %}
  {% assign summary = post.description | default: post.excerpt | strip_html | normalize_whitespace %}
  {% include entry.html dates=date title=title summary=summary %}
{% endfor %}
