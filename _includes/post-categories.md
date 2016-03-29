<span class="post-categories">
  Categorized in: 
  {% if post %}
    {% assign categories = post.categories %}
  {% else %}
    {% assign categories = page.categories %}
  {% endif %}
  {% for category in categories %}
  <a href="/categories/#{{category|slugize}}">{{category}}</a>{% unless forloop.last %},{% endunless %}
  {% endfor %}
</span>