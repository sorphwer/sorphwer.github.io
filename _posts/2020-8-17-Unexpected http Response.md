---
layout: post
title: "Unexpectef Http Response"
subtitle: 'when using ajax'
author: "Riino"
mathjax: false
sticky: false
tags:
  http
  front-end
  ajax
  jquery
---

## Handle Http Response 

Generally, we can write ajax like this to send a http request and get response.

In this case, we send a request with specific path, and the response body should be like

```json
{
	"message"="Hello World"
}
```

We would like to let the webpage print out ‘Hello World’.

So, we can write jQuery like this:

```javascript
$.ajax({
	type:"POST",
	url:'/data',
	data:JSON.stringify(Data),
	dataType:"json",
	contentType:"application/json"
	success: function(msg){
		console.log(msg.message);
	}
	error: function(){
        console.log('Fail');
    }
})
```

The code below will print the value of ‘message’ from response.

Because we pointed out that the **type** of response will be **json**.  So the browser actually get the whole response body, and try to get the `responseJSON` and parse it, and convert it directly as final response, which will be the parameter `msg`.

Thus, we can access the key `message`.



**The key `success` in ajax, means the case where status code is 200.**

Thus, if the status code is not 200, the error function will be called.



## Special Scenario: Pass message via other code

Somethings, our request will get other status code, however, we may hope to get extra info in response body. For example. in specific cases, your server return 422, but still send a response body to you with extra message, like:

```json
{
	"message"="Hello World"
}
```

You may think that it’s easy to get, for we can write similar codes:

```javascript
//wrong code
$.ajax({
	type:"POST",
	url:'/data',
	data:JSON.stringify(Data),
	dataType:"json",
	contentType:"application/json"
	success: function(msg){
		console.log(msg.message);
	}
	error: function(msg){
        console.log(msg.message);
    }
})
```

However, this will not work because you used  **unexpected status code**

Thus, the response body will not be parsed.

You will get: (for example, in 401)

![Annotation 2020-08-22 152857](/img/assets/Annotation 2020-08-22 152857.png)

Thus, in non-202 cases, you need to access `responseJSON` first:

```
$.ajax({
	type:"POST",
	url:'/data',
	data:JSON.stringify(Data),
	dataType:"json",
	contentType:"application/json"
	success: function(msg){
		console.log(msg.message);
	}
	error: function(msg){
        console.log(msg.responseJSON.message);
    }
})
```

