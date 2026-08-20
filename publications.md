---
layout: page
title: Research
permalink: /research/
eyebrow: Research & publications
lede: Work on learning with incomplete information, efficient prediction, and feature acquisition.
---

<ul class="writing-list research-list">
{% assign entries = site.research | sort: 'year' | reverse %}
{% for entry in entries %}
  <li>
    <a href="{{ entry.url | relative_url }}">
      <time>{{ entry.venue }} · {{ entry.year }}</time>
      <span><h2>{{ entry.title }}</h2><p>{{ entry.description }}</p></span>
    </a>
  </li>
{% endfor %}
</ul>
