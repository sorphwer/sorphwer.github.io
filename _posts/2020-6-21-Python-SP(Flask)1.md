---
layout: post
title: "Learning Python3 Flask Part 1"
subtitle: 'Quick Start'
author: "Riino"
mathjax: true
sticky: false
tags:
  Python
  Flask
  Server
  Web
---

# Install

Like other python package, simply install `flask` via `pip` or other tool. Flask is a “micro” kernel of a web server.

For detailed guidance of installation, please visit https://flask.palletsprojects.com/en/1.1.x/installation/#python-version. 

---

# Structure

Flask app can run as a isolated package, which is my personal recommended approach of implementation, in this case ,you need create a folder structure like:

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

**Why we do this**

Via such structure, we are actually created a packaged app called `YourFlaskApp`, which means we can hold more than one such flask app package in same repo, and we can import them in `runserver.py` and make custom configuration via `config.py`, in other world, `runserver.py` will be our global custom starter for all flask apps, and `config.py` will be a global config script for all flask apps, too.

For example, we can set data in config.py, just like what we do in `_config.yaml`, but in pythons’ format of data:

## Make configuration

Usually the static config should be created in `config.py`.

`config.py`

```python
TITLE='Your website title'
NAVIGATION=[
    {'url':"/",'text':"Home"},
    {'url':"/archive",'text':"Archive"}
]
```

Notice that , in flask, we should name all variables in **uppercase**. 

When finished this, we can use this `config.py` ,we can use the variables here in both flask back-end and front-end directly later, but before this we need to clarify **How Flask Runs**:

Generally the most common way to run flask is to use :

```powershell
flask run
```

This will actually try to find if there’s any flask app package in current path, and try to run the `__init__.py` inside, this script should be written like this:

`__init__.py`

```python
from flask import Flask
import config
app = Flask(__name__)
app.config.from_object(config) 
import YourFlaskApp.views
```

`__init__.py` will create a flask app entity and make init config. We can also change the init config by changing the code here, for example, we can replace line 3 into :

```python
app = Flask(__name__, static_url_path='src')
```

This will redirect the default static source folder , `static`, into `src` . Also, we can make other init config here.The views script holds all the controller method, e.g. 

`views.py`

```python
from YourFlaskApp import app
@app.route('/')
def index():
    return 'Hello World!'
```

This will get current flask app via `__name__`, and get config from current path. Then import the `views` script in the root of this flask app package, then , **`flask run` common will run `app.run()` in background to start the server.**  Thus, we can make our own script for startup:

`runserver.py`

```python
from  YourFlaskApp import app
app.run(debug=True)
```

And we can use

```powershell
py runserver.py
```

To start the server, just like `flask run`, but we can add custom config here, like enable the debug mode.

## Summary

We need to check 3 configuration before the app runs:

1. Start config: `runserver.py` (if you want to use default config, like in Production server, use `flask run`)
2. Init config: `__init__.py`
3. Variable config: `config.py`.



