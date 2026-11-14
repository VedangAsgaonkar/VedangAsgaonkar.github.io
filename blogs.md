---
layout: page
title: Blogs
permalink: /blogs/
description: Blog posts by Vedang Asgaonkar.
lede: Longer write-ups of research and other work, newest first.
---

{% for post in site.posts %}
  {% capture title %}<a href="{{ post.url | relative_url }}">{{ post.title }}</a>{% endcapture %}
  {% capture date %}<time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%b %Y' }}</time>{% endcapture %}
  {% include entry.html dates=date title=title summary=post.description %}
{% endfor %}
