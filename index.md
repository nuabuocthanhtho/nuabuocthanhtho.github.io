---
layout: default # Kế thừa từ khung sườn default.html
title: Trang chủ # Tiêu đề cho trang chủ
---

{% for post in site.posts %}
  <div class='post-outer'>
    <div class='post hentry uncustomized-post-template'> <div class='postthumb'>
        <a href="{{ post.url | relative_url }}">
          {% if post.image %}
            <div class='post-thumb' style='background-image: url("{{ post.image | relative_url }}");'></div>
          {% else %}
             <div class='post-thumb' style='background-image: url("/assets/images/default.jpg");'></div>
          {% endif %}
        </a>
      </div>

      <div class='post1'>
        <h2 class='home-date'>{{ post.date | date: "%d tháng %m, %Y" }}</h2>
        <div class='home-title' itemprop='name'>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </div>
        <div class='home-summary'>
          {{ post.excerpt }} </div>
<div class='home-button'>
  <a href="{{ post.url | relative_url }}"><span>Xem tiếp</span></a>
</div>
      </div>
      <div class='clear'></div>

    </div> </div> {% endfor %}
