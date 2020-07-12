---
layout: post
title: "Learning Python3 Flask Part 3"
subtitle: 'Pyecharts & Echarts'
author: "Riino"
mathjax: true
sticky: false
tags:
  Python
  Flask
  Server
  Web
  html
  visualization
---

# Pyecharts

## Not Recommend?

Pyecharts is a python library helps you to generate echart-standard html clip or echart-standard options(which means a json package to configure the echarts tag in your html page), depends on which render method is used.

First, I have to declare that **I DO NOT recommend Pyecharts**, at lease in 1.8.0 version , which is the one I used, and the pyecharts part of this article may be out-dated because of several reasons below:

1. **Pyecharts is not a stable python library, the method of Pyecharts is still updating, and in most cases the old methods, even the style of using corresponding APIs are recommend by Pyecharts differently.**

2. **Pyecharts still does not perform very well in ‘freedom’ of using API and data format, especially when you were in Echarts area.**

   For example, by looking around the source code, we can find that the function inside do not accept users to set more than 2 parameters in creating visualMap attribution, because the function in pyecharts itself is like “def func(name=a,value=b)”.And yes you can make b a matrix, but it will make things tough when you trying to use `dimension` parameters in echarts.

However, pyecharts do have some advantages:

1. **Allows you to create echarts diagrams in few steps.**
2. **It’s in python so you don’t need javascript , unless you want more features in dynamic diagram or edit the event in charts.**
3. **You even don’t need to write html , or any other code about the front-end page.** 

Overall, in my opinion: if you are not majoring in programming, or it’s not your major job or career, and you just learnt some basic python and want to get the feedback as soon as possible, and you don’t need to spend much time debugging and coding, your boss didn’t require too much in these charts, then just use **Pyecharts** , **AND CONFIRM THE VERSION OF THE TUTORIALS YOU ARE READING**.  But, if you are a programmer, and you know a lot about javascript, python, and you have enough time to read echarts’ doc, and you want a **strong webpage charts with ajax, user event, dynamic freshing..** , then pyecharts is not for you.

## Basic Syntax(Ver 1.8.0)

*Warning: The approach here is just the style of 1.8.0 version, so I just recommend you to take a look, for the latest details please visit official website*

Basically any type of charts can be created like this style, please be careful that different types of from 

A simple bar chart example 

```python
    c = (
        Bar()
            .add_xaxis(date_list)
            .add_yaxis("Name", your_data)
            .add_yaxis("Name", your_data)
            .set_global_opts(title_opts=opts.TitleOpts(title=chart_title),
                             legend_opts=opts.LegendOpts(pos_bottom=5),
                             yaxis_opts=opts.AxisOpts(axislabel_opts=opts.LabelOpts(rotate=90)))
            .set_series_opts(label_opts=opts.LabelOpts(is_show=False))
    )
```

A little complex Map with COVID-19 visualization example with custom style, tooltip format, and visualMap settings
```python
    c = (
        MapGlobe(init_opts=opts.InitOpts(width="100%", height="100%", theme=ThemeType.DARK))
            .add_schema(
            maptype="world"
        )
            .add("geo", map_data)
            .set_series_opts(label_opts=opts.LabelOpts(is_show=False))
            .set_global_opts(

            visualmap_opts=opts.VisualMapOpts(
                type_="size",
                is_calculable=True,
                dimension=0,
                range_size=[5, 1000],
                min_=min_data,
                max_=max_data,
            ),
            tooltip_opts=opts.TooltipOpts(
                is_show=True,
                formatter="""
                    function(parameter){
                    var tool_tip =
                    parameter.name+
                    "<br/>Comfirmed：" + parameter.value[2][0] +
                    "<br/>Death："+parameter.value[2][1]+
                     "<br/>Recover："+parameter.value[2][2];
                    return tool_tip;
                    }
                    """
            ),
            # title_opts=opts.TitleOpts(title=country_name)
        )
    )
```

## Render Methods

Noticed that we created a variable named `c` above, and we can using the render method of `c` to get the chart itself, or its options.

There’re 3 types of rendering your charts when using pyecharts, but keep it in mind that the final result are all just **CSS+js+HTML with echarts**, pyecharts just help you generate those front-end codes:

### Embedded Render

Remember the ‘variable’ in jinja template? (Visit last blog of flask)

Like assign any variable in Jinja, you just put your `c` in a function with `@app.route` in your `views.py`:

```python
    return render_template(
        "demo.html",
        myechart=c.render_embed(),
    )
```

And in your html, just use :

```
{% raw %}
{{myechart|safe}}
{%endraw%}
```

This will actually generate a html clip which draws an echart diagram, with all js dependencies inside, but the source ur of all those dependencies comes from pyecharts’server, so you may meet speed issue.

### Render Echarts Options(For ajax)(Weak Support from Pyechart)

Another way is to just use pyecharts to create a json package, which is the “Options” config in echarts, any json with echarts’ standard can be recognized by echarts in html. To do this, we need to render our `c` as an option:

```python
return c.dump_options_with_quotes()
```

TIP: You can’t use `dump_options_with_quotes()` in pyecharts layout classes like `Grid`, `Page`, etc.

To draw multiple charts, you need implement this procedure individually in every single charts when using ajax to make front-end and back-end works independently.

```html
<div class="PyechartMap" id="myechart" >
</div>
```

And you can use CSS to config the style of this div, including width and height.

Now, we have to write a js script to let the js know these things:

1. Target div tag should be regarded as a echart.
2. Send ajax, and the response body contains a json, which can be used to generate target echart.

For the step 1, we can import `echart.js` and assign target div, notice that in this case, we should use **Pyecharts’ Echart js dependency**, and I DO NOT recommend you to set the url as the pyecharts’ url, actually you can download these js in: https://github.com/pyecharts/pyecharts-assets and put them into your static folder.

```python
  <script
    type="text/javascript"
    src="{{ url_for('static', filename='js/world.js') }}"
  ></script>
  <script
  type="text/javascript"
  src="{{ url_for('static', filename='js/echarts.min.js') }}"
></script>
```

Now you may ask: **What if I don’t know the name of required js file?** (Caution: This only in 1.8.0  level )

For example, if you are drawing a map, and you don’t know specific js file to support this map, then you can use `c`’s member : `js.dependencies`

And yes, the dev team of Pyecharts said that there’s a `get_js_dependencies()` method, but it do not works well in my repo. So I recommend use :

```python
c.js_dependencies._name
```

This is not elegant but it works. You will get a list contains the names of every js file you need.

Before  assign an echart variable, we need assign an global variable representing our root url, because this will change between dev and product server:

```
{%raw%}
$SCRIPT_ROOT = {{ request.script_root|tojson|safe }};
{%endraw%}
```

Then, assign our echart div:

```javascript
 var chart = echarts.init(document.getElementById('myechart'), {renderer: 'canvas'});
```

For the step 2, we can send a ajax ,which will let python call our `dump_options_with_quotes()` and send back the result, then we just config the option:

```javascript
		var data = {
                  data: JSON.stringify({
                    'name': YourAttribution,
                  }),
                }
          $.ajax({
                    type: "GET",
                    url: $SCRIPT_ROOT+"/getChart",
                    data:data,
                    dataType: 'json',
                    success: function (result) {
                        eval('result.tooltip.formatter='+result.tooltip.formatter);//Fix JsCode's format
                        chart.setOption(result);
                    }
                });
        })
```

The back-end python will be like :

```python
@app.route("/getChart", methods=['GET'])
def get_chart():
	attr = json.loads(request.args.get('data', type=str))['name']
	c=get_chart(attr)
	return c.dump_options_with_quotes()
```

### Render Notebook

# Echarts

When we use `render_embed(),` or `dump_options_with_quotes()`, the final page is actually rendered by standard echarts.

Echarts is a js library , which is the real role drawing those charts, which means, we can add javascript in our page, via echarts’ settings, to control our charts at the final step.

Notice that we have a success function above:

```
success: function (result) {
                        chart.setOption(result);
                    }
```

