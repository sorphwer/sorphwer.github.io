---
layout: post
title:  "Experience of Getting A Neo4j Certification"

tags:           #optional
- neo4j
- certification
---

## What's neo4j certification?

In neo4j's official cource page you can explore a serious of materials to learn about neo4j, with a final online test attached. When finished that online test that contains 80 single selection questions with over 80% score you can be issued a certification by neo4j to prove that you have essential knowledge about neo4j. I recently took one and passed successfully, and if you want to prepare for such test, you can check the rest content for main points that this test will cover, or the points that you may ignore during learning.

## Test structure

The test will be devided into 3 parts in my perspective, the very first one is the basic concept of neo4j like the protocol, the primary structure of graph database, which will mainly cover these aspects:


- Valid protocol of neo4j : `+ssc`
- What is `Bolt` protocol
- In which default port does neo4j browser run and neo4j bolt run
- In which folder does neo4j entity save its file and backup (`database` and `transaction`)
- What protocol is used for drivers for programming language like java? (JMS? RMI? TLS? Bolt?)
- Features of Bolt, is the information compressed or encoded?

Second part will cover the concept of database and the tools that you can use to control neo4j.

- When to use `:use database` (in Cypher-shell)
- Different operations in `system` database and normal database in **neo4j browser**
- Hom many database will be created when initiating an neo4j instance (0)
- 4 primary data type of neo4j : **node, relationship,propety,label**
- Invalid name of a database: **graph.db, _test1, my**
- Does a relationship must have a direction? **YES**
- Import & export data type supported by neo4j, with corresponding tools

Finally, the neo4j script language, Cypher itself.

You will be asked about the function of Cypher with senarios.

- What does `CREATE`, `MERGE`, `DELETE`, `SET` do?
- Will `SET` reset all propeties? **No**
- Do we have `CONNECT`, `JOIN` ,`FILTER` like sql? **No**
- Do we have a python-like operator `IN`? **Actually yes**
- Use `UNION` to merge two or more matching results.
- Understand when to use `PROFILE MATCH`, `OPTIONAL MATCH`,etc.
- Use `WITH` to create sub-query.
- Usage of `IMPORT CSV`
- Use `START DATABASE`, `CREATE [OR REPLACE] DATABASE`,etc. in system database.


Besides, the test will cover if a function is available.

- All function in db, `db.*`
- Method to call a function : use `CALL`
- Get a node's label, get a relationship's type (use `type()`)
- Basic function like `count()` and `count(*)` (counting nodes and rows)
- What is **aggregation function** and when to use one.


