---
layout: null
permalink: /p/fanfic.html
---
<div class="post-body">
  <ul>
    {% comment %} Tìm tất cả các trang trong collection 'stories' có genre là 'fanfic' {% endcomment %}
    {% assign fanfic_stories = site.stories | where: "genre", "fanfic" %}

    {% if fanfic_stories.size > 0 %}
      
      {% comment %} Sắp xếp các truyện theo tiêu đề (title) A-Z {% endcomment %}
      {% assign sorted_stories = fanfic_stories | sort: "title" %}

      {% for story in sorted_stories %}
        <li><a href="{{ story.url | relative_url }}">{{ story.title }}</a></li>
      {% endfor %}

    {% else %}
      <li>Chưa có truyện nào thuộc thể loại này.</li>
    {% endif %}
  </ul>
</div>
