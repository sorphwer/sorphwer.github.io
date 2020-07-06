---
layout: post
title: "Learning Python3 Flask Part 2"
subtitle: 'Html and Jinja'
author: "Riino"
mathjax: true
sticky: false
tags:
  Python
  Flask
  Server
  Web
  html
---

# Web Source Structure

Remember our repo folder structure?

```
  ├─YourRepo
  │  ├─YourFlaskApp
  │  │  ├─static
  │  │  │  ├─css
  │  │  │  ├─img
  │  │  │  └─js
  │  │  └─templates
  │  │     └─layout
  │  ├─ __init__.py
  │  └─ views.py
  ├─Data
  │	└─YourData.csv
  ├─config.py
  └─runserver.py
```

Generally we use a static folder to hold all the static sources like css file, javascript file, because it’s the default name of flask when running:

```python
app = Flask(__name__)
```

And noticed that we can handle the request in `views.py`, to return a html in **templates** folder, we shall use:

```python

@app.route('/')
def target():
    page_name = "CUSTOM VARIABLE"
    return render_template('loading.html', messager_data=page_name)
```

Via `render_template` method, flask will try to find corresponding html file in **templates**, and `@app.route` will mark this function as a request handler , which is in control layer. The extra `messager_data` is a usable variable in **Jinja**, we will talk about this later.

Here, we noticed that **html file and css/js files are not in same folder**, which means we need to use some approach to let our html file **find** the static folder. Because if we use path directly, html can not find them for there’s only a templates folder in its sight.

# Jinja

Jinja is the solutions for all the issues above, like **Liquid**, jinja use embedded syntax in html to mark **Variables** and **Function**, for example, we should use this to put our css and javascript path:

```html
{% raw %}
  <link
  rel="stylesheet"
  type="text/css"
  href="{{ url_for('static', filename='css/home.css') }}"
/>
   {% endraw %}
```

Here we use a **{{SYNTAX}}** format to mark that this is a jinja language, and the template engine will run `usl_for` method to get the correct path.

```html
{% raw %}
  <script
    type="text/javascript"
    src="{{ url_for('static', filename='js/riinosite/jquery.js') }}"
  ></script>
   {% endraw %}
```

But, the most powerful feature of jinja is **template**, there’s two modes, **import** and **extend**, where the former has less support, but if you come from **Liquid**, you will be much more familiar with **import**.

## Import

Import means if you put any html file in /template, you can use them via `import` in another html, but **to add path is not supported**, for example, if you have **_head.html**, **_footer.html**, and **_header.html** , you can use them in your **index.html** like:

```
{% raw %}
<!DOCTYPE html>
{% include "_head.html" %}
{% include "_header.html" %}
<!--Your Content-->
{% include "_footer.html" %}
 {% endraw %}
</html>
```

**But you can do like “include ”/layout/_footer.html”.**

## Extend

Extend is much more common in jinja, noticed that the html above can be a good template for building other pages, so we can mark our content part as the ‘extendable block’ like:

```
{% raw %}
<!DOCTYPE html>
{% include "_head.html" %}
{% include "_header.html" %}
<section class="home-message ">
    {% block content %}
    {% endblock %}
</section>
{% include "_footer.html" %}
</html>
 {% endraw %}
```


Here the **block** marks this html as a template, to use this template, we can do like :

```
{% raw %}
{% extends "layout/fullscreen_layout.html" %}
 {% block content %}
 <!--Your Content-->
 {% endblock %}
 {% endraw %}

```

Noticed that we can use a path now, like **layout/yourtemplate.html**

## Variable

Now come back to our control function:

```python

@app.route('/')
def target():
    page_name = "CUSTOM VARIABLE"
    return render_template('loading.html', messager_data=page_name)
```

Noticed that we put a variable here, so we can use it in jinja:

```
{% raw %}
{{messager_data}}
 {% endraw %}
```

And if the variable is a list or a dictionary, we can use:

```
{% raw %}
 {% for element in list %}
 	<h3>element.name</h3>
 	<p>element.content</p>
 {% endfor %}
  {% endraw %}
```

Also, we can init own variable in jinja, in jinja we use **set**, this is the most significant difference between jinja and liquid, the latter use **assign**, except this, the code can almost be copied and run directly from liquid to jinja.

 