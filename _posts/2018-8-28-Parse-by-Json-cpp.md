---
layout: post
title: "Use Json-cpp to parse Json string"
author: "Riino"
header-style: text
sticky: false
tags:
  - Json
  - C++
  - Completed
---


* 1. [Foreword](#Foreword)
* 2. [First Step](#FirstStep)
* 3. [Second Step](#SecondStep)
	* 3.1. [Start Parsing.](#StartParsing.)
	* 3.2. [Parsing an Array.](#ParsinganArray.)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->



Environment : Json-cpp , C++

##  1. <a name='Foreword'></a>Foreword

 Keep it in mind that the judge point may located in the `assert` processing , that any error when parsing can trigger a assert error , which will kill the program.

##  2. <a name='FirstStep'></a>First Step

Establish objects for Reader and Value.

```c++
Json::Reader *pJsonParser = new Json::Reader(Json::Features::strictMode()); //If you want to switch on strict mode.
Json::Reader reader;
Json::Value value;
```

Note: Strict mode can be used to parse unknow json , like a array out of a "[]". In a case this may trigger 'Assert Failed'.

##  3. <a name='SecondStep'></a>Second Step

###  3.1. <a name='StartParsing.'></a>Start Parsing.

Analyze the structure of your json string. I recommend some tools online that you can find easily in internet to color json string. In the view of Json-cpp  , `'1'` and `1` is totally two different things.

There should be several layers in a json string , each one contains 2 format of its member : element and array .

Here is a simple example ,  The outermost element of this Json string is `date` , `message`,`status`,`city`and`count`, and it has a sub-layer called `data`, which contains `humidity`,`pm25`,`pm10`,`quality`and`Tem`. To show it clearly , I put indentation for each layer :

```json
{
 "date": "20180828", 
 "message": "Success !", 
 "status": 200, 
 "city": "Chongqing", 
 "count": 19, 
 "data": {
   "humidity": "52%", 
   "pm25": 44, 
   "pm10": 77, 
   "quality": "low polution", 
   "temp": "30",  
}
}

```

Be aware of the different between `20180828` and `200`.

I wrote two struct to save the information in these elements, which create objects called `json` and `data`.

**Be aware of the type `asXXXX` function in the end , which decide the type of returned data `value["XXXX"]`. It must be exactly same with the type of the data of json string , and the type of the data defined in struct we write. Of course , the type of string can be defined as `String` or `CString` freely.**

```c++
if (reader.parse(obj.GetCityWeatherJson(), value))
  {
       Json.date = value["date"].asCString();
       Json.message = value["message"].asCString();
       Json.status = value["status"].asInt();
       Json.city = value["city"].asCString();
       Json.count = value["count"].asInt();
​
           const Json::Value arrayObj = value["data"];
           data.shidu = arrayObj["shidu"].asCString();
           data.pm25 = arrayObj["pm25"].asInt();
           data.pm10 = arrayObj["pm10"].asInt();
           data.quality = arrayObj["quality"].asCString();
           data.wendu = arrayObj["wendu"].asCString();
           data.ganmao = arrayObj["ganmao"].asCString();
  }
```

###  3.2. <a name='ParsinganArray.'></a>Parsing an Array.

For example , there's a array in a layer , and each element in the array has same type of data . Check this json:

```json
"forecast": [
    {
       "date": "28th,Sat.", 
       "sunrise": "06:28", 
       "high": " 37.0℃", 
       "low": " 28.0℃", 
       "sunset": "19:22", 
       "aqi": 51, 
       "type": "Cloudy", 
       
    },
    {
       "date": "01st,Sat", 
       "sunrise": "06:30", 
       "high": "35.0℃", 
       "low": "27.0℃", 
       "sunset": "19:17", 
       "aqi": 42, 
       "type": "Cloudy", 
    }
  ]
```



Now we need to declare a vector like :

```C++
std::vector<ST_forecast>ForecastList;
```

And declare corresponding struct : `ST_data` , `ForecastList` is the name of our container.

Here is the parsing code:

```c++
const Json::Value subArrayObj2 = arrayObj["forecast"];
for (unsigned int i = 0; i < subArrayObj2.size(); ++i)
{
forecast.date = subArrayObj2[i]["date"].asCString();
forecast.sunrise = subArrayObj2[i]["sunrise"].asCString();
forecast.high = subArrayObj2[i]["high"].asCString();
forecast.low = subArrayObj2[i]["low"].asCString();
forecast.sunset = subArrayObj2[i]["sunset"].asCString();
forecast.aqi = subArrayObj2[i]["high"].asInt();
forecast.type = subArrayObj2[i]["type"].asCString();
data.ForecastList.push_back(forecast);
}
```

How it works ? 

First we need a function `size` to give us a number to show how many element this array have , then establish the object `subArrayObj2[i]` , in each process , put the data in `forecast` , and use function `pushback` to push it into the vector.

If you don know exactly how `vector` and `pushback` work , you need just understand you can use `data.ForecastList[i].XXX` to call the data called `xxx`in No. i element by doing this. For example , the data in `data.ForecastList[0].date` will be "28th, Sat." , and `data.ForecastList[1.date` is "01st, Sat." .