---
layout: null
permalink: /p/hien-dai.html
---
<div class="post-body">
  <ul>
    {% comment %} Tìm truyện có genre là 'hiendai' {% endcomment %}
    {% assign stories = site.stories | where: "genre", "hiendai" %}

    {% if stories.size > 0 %}
      {% assign sorted_stories = stories | sort: "title" %}
      {% for story in sorted_stories %}
        <li><a href="{{ story.url | relative_url }}">{{ story.title }}</a></li>
      {% endfor %}
    {% else %}
      <li>Chưa có truyện nào thuộc thể loại này.</li>
    {% endif %}
  </ul>
</div>
