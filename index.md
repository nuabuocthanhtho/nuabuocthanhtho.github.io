---
layout: default
---

<h2>{{ site.title }}</h2>
<p>Nội dung trang chủ của tôi.</p>

<hr>

<h2>Bài viết mới nhất</h2>

<ul>
  {% for post in site.posts %}
    <li>
      <h3>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </h3>
      <p>{{ post.date | date: "%d-%m-%Y" }}</p>
    </li>
  {% endfor %}
</ul>
