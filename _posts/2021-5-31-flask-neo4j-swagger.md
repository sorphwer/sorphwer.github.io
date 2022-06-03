---
layout: post
title:  "Combine Swagger, Flask and python db driver"
subtitle: "With an example of neo4j graph database" #optional 
author: "Riino"    #optional
tags:           #optional
- neo4j
- swagger 
- Python
---
## Main target

In this post we will present a simple demo using `flask` , a python server to access a graph database `neo4j` with automatical doc generator `swagger` and create a accessable `swagger UI`. 

## Dependencies

Install `flask`, and `swagger` in local machine, and be sure you have a `neo4j` remote or local server available. Generally you need **url**, **name** and **password** to acccess neo4j and create a driver.

Be sure that these dependencies works fine: 
```python
from flask import Flask, g, request, send_from_directory, abort, request_started
from flask_cors import CORS
from flask_restful import Resource, reqparse
from flask_restful_swagger_2 import Api, swagger, Schema
from flask_json import FlaskJSON, json_response

from neo4j import GraphDatabase, basic_auth
from neo4j.exceptions import Neo4jError
import neo4j.time

from dotenv import load_dotenv, find_dotenv
from datetime import datetime
import sys
import os
```

## Step 1. Create data structure

Assuming that you have the main flask file `app.py` within a folder called `/api`, which is the name of your flask module. Create a sub-folder `/api/modules/` to save your entity.

For example, if we have a data structure `genre`, create such file in `/api/modules/genre.py/`

```python
#/api/modules/genre.py
from flask_restful_swagger_2 import Schema
class GenreModel(Schema):
    type = 'object'
    properties = {
        'id': {
            'type': 'integer',
        },
        'name': {
            'type': 'string',
        }
    }
def serialize_genre(genre):
    return {
        'id': genre['id'],
        'name': genre['name'],
    }
#Notes: You can modify serialize function
```

And create a `__init__.py` in `modules` folder.

```python
#api/modules/__init__.py
from .genre import *
```

## Step 2 Establish database driver

Now go back to our `app.py` in `api`.

First we should create a `.env` file next to `app.py` to save database information, or you can save them in your system environment variables.

```python
#api/.env
DATABASE_USERNAME="neo4j"
DATABASE_PASSWORD="your-database-password"
DATABASE_URL="bolt://localhost:7687"
FLASK_ENV=development
```

Then, the codes below will start a flask app, config swagger and config the driver:

```python
load_dotenv(find_dotenv())
app = Flask(__name__)
CORS(app)
FlaskJSON(app)
api = Api(app, title='Your app name', api_version='0.1.10')
def env(key, default=None, required=True):
    try:
        value = os.environ[key]
        return ast.literal_eval(value)
    except (SyntaxError, ValueError):
        return value
    except KeyError:
        if default or not required:
            return default
        raise RuntimeError("Missing required environment variable '%s'" % key)
@api.representation('application/json')
def output_json(data, code, headers=None):
    return json_response(data_=data, headers_=headers, status_=code)
DATABASE_USERNAME = env('DATABASE_USERNAME')
DATABASE_PASSWORD = env('DATABASE_PASSWORD')
DATABASE_URL = env('DATABASE_URL')

driver = GraphDatabase.driver(DATABASE_URL, auth=basic_auth(DATABASE_USERNAME, str(DATABASE_PASSWORD)))

def get_db():
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session()
    return g.neo4j_db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'neo4j_db'):
        g.neo4j_db.close()
```

With the code above, we now have the important function `get_db()`, while the close procedure will be execute automatically by flask context. If you do not understand `g` and `context` here, please check flask's doc.

## Step 3 Build the first API with swagger

Now we can write the first Restful-API under swagger. Here we define a basic API to create/get/delete a genre nodes in `neo4j` that we defined above.

The basic idea is :

- When calling url `api/v0/genre` with POST and a name and id in **request body** , create a genre.
- When calling same url with GET and a id in **path**, return name and id.

First , import genre.py in app.py :

```python
from api.modules import *
```

Then, create a class under the annotation of swagger, such class will override functions like `post()`, `delete()`,`get()`

```python
class CreateGenre(Resource):
    @swagger.doc({
        'tags': ['genres'],
        'summary': 'create genre',
        'description': 'Create a genre',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'schema': {
                    'type': 'object',
                    'properties': {
                        'id': {
                            'type': 'string',
                        },
                        'name': {
                            'type': 'string',
                        }
                    }
                }
            },
        ],
        'responses': {
            '200': {
                'description': 'Genre created',
                'schema': GenreModel,
            }
        }
    })
    def post(self):
        data = request.get_json()
        name = data.get('name')
        id = data.get('id')
        def _cypher_create_genre(tx,id,name):
        	return tx.run(
                '''
                MERGE (n:Genre {id: $id, name: $name }) RETURN n
                ''', {'id': id,'name':name}
            )
        db = get_db()
        result = db.write_transaction(_cypher_create_genre,id,name)
        return [serialize_genre(record['n']) for record in result][0]
class GetGenre(Resource):
        @swagger.doc({
            'tags': ['genres'],
            'summary': 'get genre or delete genre',
            'description': 'Genre GET/DELETE',
            'parameters': [
                {
                    'name': 'id',
                    'description': 'genre id',
                    'in': 'path',
                    'type': 'string',
                    'required': True
                }
            ],
            'responses': {
                '200': {
                    'description': 'A genre',
                    'schema': GenreModel,
                },
                '404':{
                    'description': 'Genre not found'
                }
            }
        })
        def get(self,id):
            def _cypher_get_genre(tx,id):
                return tx.run(
                    '''
                    MATCH (n:Genre {id: $id) RETURN n
                    ''', {'id': id}
                )
            db = get_db()
            result = db.read_transaction(_cypher_get_genre,id)
            return [serialize_genre(record['n']) for record in result][0]
```

Since we just declared these two classes, now we just need to map them into target URLs:

```python
api.add_resource(CreateGenre, '/api/v1/Genre/create')
api.add_resource(CeteGenre, '/api/v1/Genre/<string:id>')
```

Now, when running flask, you will get a default swagger page showing these APIs.

