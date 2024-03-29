---
layout: post
title:  "Learning Status"
subtitle: "Professional Knowledge Alignment" #optional 
author: "Riino Shiqi Zhang"    #optional
date:   2020-03-01 17:08:09 +0800
tags:           #optional
- pentesting
- crawling
- ethical-hacking

status: live     #optional,if status is 'WIP', will display a WIP banner
last-modify: 2021-11-01 10:30:00 +0000 #optional
toc: false       #default: true
sticky : true   #default: false
hide: false     #default: false (hide from Home page only)
mathjax: true   #default: true
mermaid: true   #default: true
banner-title: Roadmap #optional
banner-subtitle: Cyber Tech #optional, must be with banner-title

# toc options: inline, true, false
---

<style>.grid .tick {    stroke: green;    opacity: 0.3;    shape-rendering: crispEdges; 
    }
.section .setion0{
    fill: rgba(187,188,188,0.49) !important;
    }</style>
[TOC]

### Foreword

Under the tutelage of Jacob and Justus, this live learning dashboard is our version 2 dashboard of learning plan for the professional knowledge alignment, which is the basic knowledge of pentesting, hacking and the usage of corresponding tools. This page is designed for tracking my learning status and none of busniess information will be disclosed in this website. Besides, their will not be any information of projects in company, or any details of the content of the learning.

The knowledge roadmap(scope) will be based on the book 《WEB安全深度刨析》

Please read this page in **Light mode**, we will add mermaid dark style in next update of jekyll-theme-panda.   <a  onclick="modeSwitcher()" style=" color: #007bff" href="javascript:void(0)">Click here to switch theme. </a>

# Learning Schedule

#### Sprints

Inspired by Scrum, I make 2 weeks as a sprint to arrange what will be done. 

Before each sprint, I will decide what will be learnt and check the progress. In the end of each sprint, there will be a sprint report attached at the end of this page. Each sub-sprint will have 3 states like other works : done, active and todo.

#### Online course

Online course contains 7 online courses with different learning time. A course will be finished when met these two goals: a)Course is finished in learning website; b)Tried related tools in real world.

#### Book reading

To read the book and try the testing tools if needed.

#### Tools learning

Install and run tools in Windows or Kali, and try them in a website(riino.site) and a network(home wifi).  I prepared 2 environments: a) Windows 10 Home 21H1; b) Linux Kali - WSL2 running Win-Kex. In this situation, the network hierarchy will be like this:

```mermaid
flowchart LR
    WSL2 --o Windows
    Windows --o Router
    Windows --x Jspstudy
    Windows --x DVWA
    Router --x riino.site
```

#### Project delivery DDL

If meet urgent delivery requirement, there will be a 'delivery' event showing that the bandwidth will decrease in this period.

#### Gantt Chart

Gantt chart will show what I've done and what I'm doing. 


```mermaid

gantt

title Professional Knowledge Alignment Gantt
todayMarker stroke-width:2px,stroke:#00,opacity:0.8
axisFormat  %m-%d-W%W-%A(%w)
section Sprints
Sprint 1A          :done,    des1, 2021-10-25,1w
Sprint 1B          :done,    des1, 2021-11-1,1w
Sprint 2A          :done,    des1, 2021-11-8,1w
Sprint 2B          :done, 2021-11-15,1w
Sprint 3A          :done, 2021-11-22,1w
Sprint 3B          :active, 2021-11-29,1w
section Review Points
Sprint Report 1: done, 2021-11-8,1d
Sprint Report 2: done, 2021-11-22,1d
Sprint Report 3: active, 2021-12-5,1d
Assessment Day:active, 2021-12-7,1d
section Online course
i.Nmap         : done,   oc1, 2021-10-26,2021-11-02
ii.Burp Suite Pro:done,    oc2, 2021-10-29,2021-11-15
iii.WebApp Hacking: done,oc3, 2021-11-6,2021-11-23
iv.App Pentesting:done, 2021-11-10,2021-11-26
v. Pentesting Hacking:done, 2021-11-22,2021-12-3
vi. iOS Pentesting: done, 2021-11-25,2021-12-6
vii Android Pentesting:done, 2021-11-23,2021-12-3

section Book reading
WEB安全深度刨析Chapter 1-3 :done , des1,2021-10-29,1w
WEB安全深度刨析Chapter 4 : done,2021-11-6,1w
WEB安全深度刨析Chapter 5-6 :done ,2021-11-13,1w
WEB安全深度刨析Chapter 7-10 :done ,2021-11-20,1w
WEB安全深度刨析Chapter 11-15 :done ,2021-11-27,1w
section Tools learning
kali install: done,2021-10-30,2021-11-02
Nmap: done,2021-11-1,2021-11-015
Burp Suite Pro: done,2021-11-10,2021-11-20
Jspstudy: done,2021-11-20,2021-12-7
Exercises in '漏洞盒子、补天平台': 2021-11-24,2021-12-7

section Project delivery DDL
Delivery:done, 2021-10-28,2021-11-02
Final Delivery : done, 2021-11-8,2021-11-12
Assessment: active, 2021-11-22,2021-12-10



```

## WBS Status Sheet

Before a sprint some task will be moved out of backlog.

| WBS Name                  | Type           | Status | Planned Sprint | Actual Sprint |
| ------------------------- | -------------- | ------ | -------------- | ------------- |
| i.Nmap                    | Online Course  | ✅Done  | 1A,1B          |               |
| ii.Burp Suite Pro         | Online Course  | ✅Done  | 1B             | 2A            |
| iii.Web App Hacking       | Online Course  | ✅Done  | 1B             | 2A            |
| iv.App pentesting         | Online Course  | ✅Done  | 2B             | 2B            |
| v.Pentesting/Hacking      | Online Course  | ✅Done  | 2B             | 3A            |
| vi.iOS pentesting         | Online Course  | ✅Done  | 3A             | 3B            |
| vii.Android pentesting    | Online Course  | ✅Done  | 3A             | 3B            |
| WEB安全深度刨析Chapter 1  | Book Reading   | ✅Done  | 1A             | 1A            |
| WEB安全深度刨析Chapter 2  | Book Reading   | ✅Done  | 1A             | 1A            |
| WEB安全深度刨析Chapter 3  | Book Reading   | ✅Done  | 1A             | 1B            |
| WEB安全深度刨析Chapter 4  | Book Reading   | ✅Done  | 1B             | 1B            |
| WEB安全深度刨析Chapter 5  | Book Reading   | ✅Done  | 1B             | 2A            |
| WEB安全深度刨析Chapter 6  | Book Reading   | ✅Done  | 2A             | 2A            |
| WEB安全深度刨析Chapter 7  | Book Reading   | ✅Done  | 2A             | 2A            |
| WEB安全深度刨析Chapter 8  | Book Reading   | ✅Done  | 3A             | 3B            |
| WEB安全深度刨析Chapter 9  | Book Reading   | ✅Done  | 3A             | 3B            |
| WEB安全深度刨析Chapter 10 | Book Reading   | ✅Done  | 3A             | 3B            |
| WEB安全深度刨析Chapter 11 | Book Reading   | ✅Done  | 3A             | 3B            |
| WEB安全深度刨析Chapter 12 | Book Reading   | ✅Done  | 3A             | 3B            |
| WEB安全深度刨析Chapter 13 | Book Reading   | ✅Done  | 3A             | 3B            |
| WEB安全深度刨析Chapter 14 | Book Reading   | ✅Done  | 3A             | 3B            |
| WEB安全深度刨析Chapter 15 | Book Reading   | ✅Done  | 3A             | 3B            |
| WEB安全深度刨析Chapter 16 | Book Reading   | ✅Done  | 1B             | 3B            |
| Nmap                      | Tools learning | ✅Done  | 1B             | 2A            |
| Burp Suite Pro            | Tools learning | ✅Done  | 2A             | 2B            |

## Sprint 1 Report 

### Summary 

During Sprint 1, I explored basic knowledge of web security and how to use `nmap`, a web scanning tool. Besides, I got to know how to use Brup Suite toolkits. As for the basic knowledge section, I reviewed various web protocols And I did a brief review of 'Computer network' roadmap, including each layers in modern networks. Among these topics, I mainly checked HTTP and HTTPS protocol, which are the most common ones in web security field, and some cases about how to attack via network using these two protocols. 

Like every learner, I learnt `nmap`, a powerful and classic IP/port scanner. Based on the videos and the book, I learnt the basic usage of `nmap`, and the most common cases using `nmap` like scanning devices in a public Wi-Fi or check what service port is open in a target server. Additionally, understood that two main steps of  `nmap` searching : IP scanning and Service scanning(Ports). Over these knowledge, I explored the different usage of `nmap` using different addon commands in terminal, through which we can make settings to decide if using TCP or UDP, or confirm the scope of ports, or sending probes that won't make server notice. I personally divide the knowledge of `nmap` into two sections: how it works and how to use it. Over this framework, there are still lots of scripts we can embed into `nmap` to accomplish more complex task, like scan all static files in a server path. (Yet we can use other special tools to do this more quickly)

Besides, I learnt the Brup Suite interrupter function, which we can make Brup Suite listening a specific port, and using local proxy (yes, LAN proxy is also available) to transfer packages from apps (like the browser) into Brup Suite. Brup Suite will catch them and print out the content, where you can edit, examine(which is to use action button to send a package to other function of Brup Suite like the comparer), and this package will not be sent until you manually forward it. Basically, such procedure construct a 3-rd party attack in your machine. The differences between Brup Suite and Wiresharks(another network listener ) is that the former will actually 'catch' the package, and if you send the package via Brup, it will also 'catch' the response to show you, rather than send to the origin app directly. Therefore, CA issue will appear when using HTTPS since the origin app will discover that the response is not sent by the server but a address from Brup via the CA info. Therefore , we have to download the Brup's CA and manually let the origin app know that this CA can be trusted for no reason. 

### Outline

### Computer network

HTTP

HTTPS

UDP/TCP

Proxy

ports and IP

### nmap

Scan IP in selected scope

Scan IP randomly

Scan DNS address

Scan IP only

Scan UDP Service only

Check specific ports' status

Load scripts

Zenmap GUI

Nmap Cheat Sheet

### Burp Suite 

Burp Suite Proxy

Burp Suite CA

Custom Proxy

Burp Suite Target

## Sprint 2 Report 

### Summary 

During sprint 2, I explored more details about Brup Suite Pro, including its package interrupter, automation tools , and assistant tools.

```mermaid
flowchart LR
    APP --Request--> Brup_Suite_Intercept
    Brup_Suite_Intercept --Forward--> Server
    Server --Response-->Brup_Suite_Intercept
    Brup_Suite_Intercept --Response --> APP
  	Brup_Suite_Intercept --Drop--x N
  	Brup_Suite_Intercept --Send--> Brup_Suite_Comparer
  	Brup_Suite_Intercept --Send--> Brup_Suite_Decoder
  	Brup_Suite_Intercept --Send--> Brup_Suite_Intruder
  	Brup_Suite_Scanner --Request--o Server
  	Brup_Suite_Spider --Request--o Server
  	Brup_Suite_Repeater --Request--o Server
  	Brup_Suite_Intercept --Send--> Brup_Suite_Sequencer
```
Additionally, to archive a complete attack (like the most common case, injection , which is the 1st type in OY )



Besides, I went more deeply into the practice of `nmap`, and made a simpler version of its cheat sheet, kindly check https://riino.site/2021/11/25/nmp.html



### Outline

#### Practice

[nmap](https://riino.site/2021/11/25/nmp.html) practice

brup practice

google hacking practice

firece & thehavester learning

SQLmap learning

netcat learning



#### Vulnerability Knowledge

#### Unsecure mechanism

Login; Logout; CAPTCHA ; Directory; Local File Vulnerability; Remote file Vulnerability ; File Inclusion Vulnerability

#### Session Management Testing

HTTP Only scenario; Secure Cookies; Session Fixation; CSRF; Bypass anti-CSRF;

#### Input Validation Testing

CSS Attacks

- Reflected
- Stored
- DOM-based

SQL injection 

- In-band SQL injection

  - Error-based

  - Union-based
- Blind SQL injection

  - Boolean-based

  - Time-based
- Out-of-band (OOB) SQL injection
- Automation
  - Commix
  
- Command Injection
- XML/XPATH Injection
- PHP Code Injection

#### CVE/CWE Cases

Druppal SQL injection CVE-2014-3704

SQLite Manager File Inclusion CVE-2007-1232

SQLite Manager XSS CVE-2012-5105

Heartbleed CVE-2014-0160

HTML5 Insecure local storage CWE-922

ShellShock CVE-2014-6271

### OWASP

![](https://owasp.org/www-project-top-ten/assets/images/mapping.png)

### MS-SDL

https://www.microsoft.com/en-us/securityengineering/sdl/practices


## Sprint 3 Report 

### Summary 

During sprint 3, I mainly focus on these topic:, **OWASP vulnerability framework**,  **Mobile Application pentesting**  and **SSDLC**. In my opinion, there are three main steps to set up a pentesting :

```mermaid
flowchart LR
    a{Scan Services} --> b{Intercept Communication}
    b --> c{Testing}
    a -.- a1(Bypass firewall)
    a -.- a2(Scann ports, hosts)
    b -.- b1(Bypass client-side CA)
    b -.- b2(Burp Suit CA)
    b -.- b3(Domain target)
    c -.- c1(Generate payload)
    c -.- c2(vulnerability database)

```



### Outline

#### Mobile Testing

[MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF) learning/code reading

Pithos

Frida

iOS Jailbreak knowledge

Android smali scirpt editing

iOS client-side server CA

android client-side server CA

Bypass proxy CA issue

#### Hacking

Generate payload using metasploit

OWASP Mobile 10

- [M1: Improper Platform Usage](https://owasp.org/www-project-mobile-top-10/2016-risks/m1-improper-platform-usage)
- [M2: Insecure Data Storage](https://owasp.org/www-project-mobile-top-10/2016-risks/m2-insecure-data-storage)
- [M3: Insecure Communication](https://owasp.org/www-project-mobile-top-10/2016-risks/m3-insecure-communication)
- [M4: Insecure Authentication](https://owasp.org/www-project-mobile-top-10/2016-risks/m4-insecure-authentication)
- [M5: Insufficient Cryptography](https://owasp.org/www-project-mobile-top-10/2016-risks/m5-insufficient-cryptography)
- [M6: Insecure Authorization](https://owasp.org/www-project-mobile-top-10/2016-risks/m6-insecure-authorization)
- [M7: Client Code Quality](https://owasp.org/www-project-mobile-top-10/2016-risks/m7-client-code-quality)
- [M8: Code Tampering](https://owasp.org/www-project-mobile-top-10/2016-risks/m8-code-tampering)
- [M9: Reverse Engineering](https://owasp.org/www-project-mobile-top-10/2016-risks/m9-reverse-engineering)
- [M10: Extraneous Functionality](https://owasp.org/www-project-mobile-top-10/2016-risks/m10-extraneous-functionality)

#### SSDLC

Development lifecycle

Requirement -> Architecture -> Test Planning -> Coding -> Testing（CICD）-> Release

SSDLC Framework

- NIST 800-64

- MS SDL
  - Provide Training
  
  - Define Security Requirements
  
  - Define Metrics and Compliance Reporting
  
  - Perform Threat Modeling (e.g. STRIDE)
  
  - |         Threat         | Desired property  |
    | :--------------------: | :---------------: |
    |        Spoofing        |   Authenticity    |
    |       Tampering        |     Integrity     |
    |      Repudiation       | Non-repudiability |
    | Information disclosure |  Confidentiality  |
    |   Denial of Service    |   Availability    |
    | Elevation of Privilege |   Authorization   |
  
  - Establish Design Requirements
  
  - Define and Use Cryptography Standards
  
  - Risk of 3-rd Components Management
  
  - Use approved tools
  
  - Static Security Testing (SAST)
  
  - Dynamic Security Testing (DAST)
  
  - Penetration testing
  
  - Establish Standard Incident Response Process
  
- OWASP CLASP

  ![image-20211207155425732](\img\assets\image-20211207155425732.png)

#### Anti-Sql injection in development

#### Anti-XSS 

#### Anti-CSRF

#### Anti-Code injection

- XPath
- Json
- 

