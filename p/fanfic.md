---
layout: null
permalink: /p/fanfic.html
---
<div class="post-body">
  <ul>
    {% if site.categories.fanfic %}  {% assign sorted_posts = site.categories.fanfic | sort: 'date' | reverse %}
      {% for post in sorted_posts %}
        <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
      {% endfor %}
    {% else %}
       <li>Chưa có truyện nào thuộc thể loại này.</li>
    {% endif %}
  </ul>
</div>
