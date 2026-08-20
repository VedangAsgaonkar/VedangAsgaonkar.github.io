---
layout: page
title: Writing
permalink: /writing/
eyebrow: Notes & essays
lede: Thoughts shaped by experience, conversation, and the occasional insightful book.
---

This is a home for ideas and opinions. They are inevitably shaped by my own worldview, but I’m always happy to hear a thoughtful response.

<ul class="writing-list">
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%b %Y' }}</time>
      <span><h2>{{ post.title }}</h2><p>{{ post.description | default: post.excerpt | strip_html | normalize_whitespace }}</p></span>
    </a>
  </li>
{% endfor %}
</ul>
