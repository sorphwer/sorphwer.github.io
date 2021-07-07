---
layout: post
title:  "Why GithubPage theme is complex to modify"

tags:           #optional
- Jekyll
- Ruby
---
## Why Riinosite hasn't come as a theme

A theme form help isolate the update of theme files and post files. For we can choose to update style files and the posts independently. But why Riinosite, and even most GithubPage Blogs do not use theme?

## How Jekyll Theme works

Theme is a type of **Gem**, which is managed by Bundler, a Ruby library management tool. Typically a gem is a pre-built package of files, which can be ruby codes or jekyll **theme** template files, which can be initiate by `jekyll new-theme jekyll-theme-awesome`, you can check the [jekyll theme doc](https://jekyllrb.com/docs/themes/).  Normally when you declare the name of gems in `Gemfile` and used `bundle install` , bundler will scan your **Gemfile** config and download all gems, including your theme gem file.Then you have to declare `theme: theme-name` in `_config.yml` in your jekyll to let your jekyll site know that **it can use a gem file downloaded by bundler whose name is 'theme-name' as the theme**

## But Github Page does not follow the rule above

First, Github Page has a [gem whitelist](https://pages.github.com/versions/), which means **only the gems in this whitelist can be installed**, where few theme gems is availble, and the default one is the **jekyll-theme-minimal**, you can use `theme: minimal` in your `_config.yml` to enable this theme, which is also the default theme when generating a new jekyll blog. Therefore, although you can write, build and publish your own gem called `jekyll-theme-mytheme`, you can not use this gem in your GithubPage.

However, there's a gem in this whitelist called [jekyll-remote-theme](https://github.com/benbalter/jekyll-remote-theme), which allows you to use a new key in `_config.yml` called **remote_theme**. Where you can use a **theme repo** in same **github hoster**. 

For example, if you have a theme in `your-github-name/your-theme`, and your blog is in `your-github-name/your-github-name.github.io`, you can use `remote_theme: your-github-name/your-theme` in your `_config.yml`.


## Conclusion

To install a theme out of githubpage whitelist in GithubPage, you have to install gem jekyll-remote-theme and fork or create a theme repo, then use **remote_theme**

While you can install any theme in your own jekyll site using **theme** in config file, if the theme gem is published in your bundler source.