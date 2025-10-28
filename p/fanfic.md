---
layout: null # Không cần layout vì JS chỉ lấy nội dung
permalink: /p/fanfic.html # Đường dẫn cố định
---
<div class="post-body"> <ul>
    {% assign sorted_posts = site.categories.fanfic | sort: 'date' | reverse %}
    {% for post in sorted_posts %}
      <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
    {% endfor %}
    {% if sorted_posts.size == 0 %}
       <li>Chưa có truyện nào thuộc thể loại này.</li>
    {% endif %}
  </ul>
</div>
