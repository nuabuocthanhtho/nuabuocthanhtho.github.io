---
layout: null
permalink: /p/co-dai.html # Đường dẫn cho Cổ Đại
---
<div class="post-body">
  <ul>
    {% assign sorted_posts = site.categories.codai | sort: 'date' | reverse %}  # <<< THAY Ở ĐÂY
    {% for post in sorted_posts %}
      <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
    {% endfor %}
     {% if sorted_posts.size == 0 %}
       <li>Chưa có truyện nào thuộc thể loại này.</li>
    {% endif %}
  </ul>
</div>
