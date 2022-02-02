---
layout: post
title:  "Jekyll Cheat Sheet"
author: "Riino"
status: doc
tags: 
- jekyll 
- doc
- CheatSheet
mathjax: false 
mermaid: false
---

## Install

### Download Ruby2.7+devkit(recommended)

1. Install Ruby

   Download installer at https://rubyinstaller.org/downloads/

   For RiinoSite‘s Gem, you'd better choose Ruby2.7.X + DevKit

   During installation, you may need to instal `MSYS2` , if your os is Windows.

   

2. Confirm Ruby and bundler is installed

   ```bash
   ruby -v
   gem list
   ```

3. Get into RiinoSite root path, and:

   ```
   bundle install
   ```
   if the install is slow, consider switch source by using this script:

   ```bash
   bundle config mirror.https://rubygems.org https://gems.ruby-china.com
   ```

   

4. Run Jekyll

   ```
   bundle exec jekyll serve
   ```

5. http://localhost:4000/

### Official Install

1. See how to Install all [prerequisites](https://jekyllrb.com/docs/installation/).

## Global Variables

| VARIABLE    | DESCRIPTION                                                  |
| ----------- | ------------------------------------------------------------ |
| `site`      | Site wide information + configuration settings from `_config.yml`. See below for details. |
| `page`      | Page specific information + the [front matter](https://jekyllrb.com/docs/front-matter/). Custom variables set via the front matter will be available here. See below for details. |
| `layout`    | Layout specific information + the [front matter](https://jekyllrb.com/docs/front-matter/). Custom variables set via front matter in layouts will be available here. |
| `content`   | In layout files, the rendered content of the Post or Page being wrapped. Not defined in Post or Page files. |
| `paginator` | When the `paginate` configuration option is set, this variable becomes available for use. See [Pagination](https://jekyllrb.com/docs/pagination/) for details. |

## Site Variables

| VARIABLE                    | DESCRIPTION                                                  |
| --------------------------- | ------------------------------------------------------------ |
| `site.time`                 | The current time (when you run the `jekyll` command).        |
| `site.pages`                | A list of all Pages.                                         |
| `site.posts`                | A reverse chronological list of all Posts.                   |
| `site.related_posts`        | If the page being processed is a Post, this contains a list of up to ten related Posts. By default, these are the ten most recent posts. For high quality but slow to compute results, run the `jekyll` command with the `--lsi` ([latent semantic indexing](https://en.wikipedia.org/wiki/Latent_semantic_analysis#Latent_semantic_indexing)) option. Also note GitHub Pages does not support the `lsi` option when generating sites. |
| `site.static_files`         | A list of all [static files](https://jekyllrb.com/docs/static-files/) (i.e. files not processed by Jekyll's converters or the Liquid renderer). Each file has five properties: `path`, `modified_time`, `name`, `basename` and `extname`. |
| `site.html_pages`           | A subset of `site.pages` listing those which end in `.html`. |
| `site.html_files`           | A subset of `site.static_files` listing those which end in `.html`. |
| `site.collections`          | A list of all the collections (including posts).             |
| `site.data`                 | A list containing the data loaded from the YAML files located in the `_data` directory. |
| `site.documents`            | A list of all the documents in every collection.             |
| `site.categories.CATEGORY`  | The list of all Posts in category `CATEGORY`.                |
| `site.tags.TAG`             | The list of all Posts with tag `TAG`.                        |
| `site.url`                  | Contains the url of your site as it is configured in the `_config.yml`. For example, if you have `url: http://mysite.com` in your configuration file, then it will be accessible in Liquid as `site.url`. For the development environment there is [an exception](https://jekyllrb.com/news/#3-siteurl-is-set-by-the-development-server), if you are running `jekyll serve` in a development environment `site.url` will be set to the value of `host`, `port`, and SSL-related options. This defaults to `url: http://localhost:4000`. |
| `site.[CONFIGURATION_DATA]` | All the variables set via the command line and your `_config.yml` are available through the `site` variable. For example, if you have `foo: bar` in your configuration file, then it will be accessible in Liquid as `site.foo`. Jekyll does not parse changes to `_config.yml` in `watch` mode, you must restart Jekyll to see changes to variables. |

## Page Variables 

| VARIABLE          | DESCRIPTION                                                  |
| ----------------- | ------------------------------------------------------------ |
| `page.content`    | The content of the Page, rendered or un-rendered depending upon what Liquid is being processed and what `page` is. |
| `page.title`      | The title of the Page.                                       |
| `page.excerpt`    | The un-rendered excerpt of a document.                       |
| `page.url`        | The URL of the Post without the domain, but with a leading slash, e.g. `/2008/12/14/my-post.html` |
| `page.date`       | The Date assigned to the Post. This can be overridden in a Post’s front matter by specifying a new date/time in the format `YYYY-MM-DD HH:MM:SS` (assuming UTC), or `YYYY-MM-DD HH:MM:SS +/-TTTT` (to specify a time zone using an offset from UTC. e.g. `2008-12-14 10:30:00 +0900`). |
| `page.id`         | An identifier unique to a document in a Collection or a Post (useful in RSS feeds). e.g. `/2008/12/14/my-post``/my-collection/my-document` |
| `page.categories` | The list of categories to which this post belongs. Categories are derived from the directory structure above the `_posts` directory. For example, a post at `/work/code/_posts/2008-12-24-closures.md` would have this field set to `['work', 'code']`. These can also be specified in the [front matter](https://jekyllrb.com/docs/front-matter/). |
| `page.collection` | The label of the collection to which this document belongs. e.g. `posts` for a post, or `puppies` for a document at path `_puppies/rover.md`. If not part of a collection, an empty string is returned. |
| `page.tags`       | The list of tags to which this post belongs. These can be specified in the [front matter](https://jekyllrb.com/docs/front-matter/). |
| `page.dir`        | The path between the source directory and the file of the post or page, e.g. `/pages/`. This can be overridden by `permalink` in the [front matter](https://jekyllrb.com/docs/front-matter/). |
| `page.name`       | The filename of the post or page, e.g. `about.md`            |
| `page.path`       | The path to the raw post or page. Example usage: Linking back to the page or post’s source on GitHub. This can be overridden in the [front matter](https://jekyllrb.com/docs/front-matter/). |
| `page.next`       | The next post relative to the position of the current post in `site.posts`. Returns `nil` for the last entry. |
| `page.previous`   | The previous post relative to the position of the current post in `site.posts`. Returns `nil` for the first entry. |

## Pagination Variables 

| VARIABLE                       | DESCRIPTION                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `paginator.page`               | The number of the current page                               |
| `paginator.per_page`           | Number of posts per page                                     |
| `paginator.posts`              | Posts available for the current page                         |
| `paginator.total_posts`        | Total number of posts                                        |
| `paginator.total_pages`        | Total number of pages                                        |
| `paginator.previous_page`      | The number of the previous page, or `nil` if no previous page exists |
| `paginator.previous_page_path` | The path to the previous page, or `nil` if no previous page exists |
| `paginator.next_page`          | The number of the next page, or `nil` if no subsequent page exists |
| `paginator.next_page_path`     | The path to the next page, or `nil` if no subsequent page exists |

## Structure

| FILE / DIRECTORY                                          | DESCRIPTION                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| `_config.yml`                                             | Stores [configuration](https://jekyllrb.com/docs/configuration/) data. Many of these options can be specified from the command line executable but it’s easier to specify them here so you don’t have to remember them. |
| `_drafts`                                                 | Drafts are unpublished posts. The format of these files is without a date: `title.MARKUP`. Learn how to [work with drafts](https://jekyllrb.com/docs/posts/#drafts). |
| `_includes`                                               | These are the partials that can be mixed and matched by your layouts and posts to facilitate reuse. The liquid tag `{% raw %}{% include file.ext %}{% endraw %}` can be used to include the partial in `_includes/file.ext`. |
| `_layouts`                                                | These are the templates that wrap posts. Layouts are chosen on a post-by-post basis in the [front matter](https://jekyllrb.com/docs/front-matter/), which is described in the next section. The liquid tag {% raw %}`{{ content }}{% endraw %}` is used to inject content into the web page. |
| `_posts`                                                  | Your dynamic content, so to speak. The naming convention of these files is important, and must follow the format: `YEAR-MONTH-DAY-title.MARKUP`. The [permalinks](https://jekyllrb.com/docs/permalinks/) can be customized for each post, but the date and markup language are determined solely by the file name. |
| `_data`                                                   | Well-formatted site data should be placed here. The Jekyll engine will autoload all data files (using either the `.yml`, `.yaml`, `.json`, `.csv` or `.tsv` formats and extensions) in this directory, and they will be accessible via `site.data`. If there's a file `members.yml` under the directory, then you can access contents of the file through `site.data.members`. |
| `_sass`                                                   | These are sass partials that can be imported into your `main.scss` which will then be processed into a single stylesheet `main.css` that defines the styles to be used by your site. Learn [how to work with assets](https://jekyllrb.com/docs/assets/). |
| `_site`                                                   | This is where the generated site will be placed (by default) once Jekyll is done transforming it. It’s probably a good idea to add this to your `.gitignore` file. |
| `.jekyll-metadata`                                        | This helps Jekyll keep track of which files have not been modified since the site was last built, and which files will need to be regenerated on the next build. This file will not be included in the generated site. It’s probably a good idea to add this to your `.gitignore` file. |
| `index.html` or `index.md` and other HTML, Markdown files | Provided that the file has a [front matter](https://jekyllrb.com/docs/front-matter/) section, it will be transformed by Jekyll. The same will happen for any `.html`, `.markdown`, `.md`, or `.textile` file in your site’s root directory or directories not listed above. |
| Other Files/Folders                                       | Except for the special cases listed above, every other directory and file—such as `css` and `images` folders, `favicon.ico` files, and so forth—will be copied verbatim to the generated site. There are plenty of [sites already using Jekyll](https://jekyllrb.com/showcase/) if you’re curious to see how they’re laid out. |

## Jekyll Commends

- `jekyll new PATH` - Creates a new Jekyll site with default gem-based theme at specified path. The directories will be created as necessary.
- `jekyll new PATH --blank` - Creates a new blank Jekyll site scaffold at specified path.
- `jekyll build` or `jekyll b` - Performs a one off build your site to `./_site` (by default).
- `jekyll serve` or `jekyll s` - Builds your site any time a source file changes and serves it locally.
- `jekyll clean` - Removes all generated files: destination folder, metadata file, Sass and Jekyll caches.
- `jekyll help` - Shows help, optionally for a given subcommand, e.g. `jekyll help build`.
- `jekyll new-theme` - Creates a new Jekyll theme scaffold.
- `jekyll doctor` - Outputs any deprecation or configuration issues.

## Liquid Operators

| `==`  | equals                   |
| ----- | ------------------------ |
| `!=`  | does not equal           |
| `>`   | greater than             |
| `<`   | less than                |
| `>=`  | greater than or equal to |
| `<=`  | less than or equal to    |
| `or`  | logical or               |
| `and` | logical and              |

## Display Liquid Code

```liquid
use `raw` and `endraw`
```

