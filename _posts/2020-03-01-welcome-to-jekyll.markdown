---
layout: post
title:  "Welcome to RiinoSite3!"
date:   2020-03-01 17:08:09 +0800
tags: 
- jekyll 
- doc
toc: true
sticky : true
hide: false
status: doc
toc: true
# toc: inline
---


# Introduction

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, while `Bundle exec jekyll serve ` is recommended, which launches a web server and auto-regenerates your site when a file is updated. 

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

# Features

- Auto archive based on tags management
- Support custom page
- Attribution control via yaml data:
  - Optional TOC style configuration : inline, hidden, auto
  - Hide article in home page
  - Make article pinned at home page
  - Mark a custom status symbol
- Auto/Manual Dark/Light Mode 
- Responsive design, optimized for mobile devices
- Global search bar
- `xml` subscribe
- Code highlights & Latex support
- Multilanguage Support
- Emoji Support

# Ymal Configurations

TOC is enabled automatically, you can set such yaml head to disable it with `toc:false`. When enabled, a toc at top of the article or the sidebar will be created automatically, and you do not need to add anything, any standard markdown titles will be recognized.

You can edit these attribution in yaml data of your markdown file:

```yaml
layout: post
title:  "Welcome to RiinoSite3!"
date:   2020-03-01 17:08:09 +0800
tags: 
- jekyll 
- doc
toc: true       #default: true
sticky : true   #default: false
hide: false     #default: false
status: doc     #optional
mathjax: true   #default: true
# toc options: inline, true, false
```

Also, tags is enabled in archive page. Current version **do not** support space in tag.

To edit min & max level of generated outline, please check `_config.yml`. Max level is 3 now.

# Content Scripts

## Code Highlight

Code highlight is supported by `rouge`.

```ruby
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.

```
## Latex

Latex formatter is supported by `mathjax`, such latex block need two extra enter to create isolated paragraph.

$$
f(x)'=lim_{x\rightarrow0}\frac{f(x)}{x}
$$



To use inline latex like $\theta$ , $\pi$ , $\frac{18^2}{5}$, please check the config in head label, which is supposed to be:

```html
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        inlineMath: [['$','$']]
        }
    });
</script>
<script type="text/javascript"
   src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
```

## Language & Quote


> English Word Display Test
> 中文语言显示测试/中文語言顯示測試
> 日本語表示テスト/にほんごひょうじテスト

## Emoji

Gone camping! :tent: Be back soon.

That is so funny! :joy:

# Jekyll Doc

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
