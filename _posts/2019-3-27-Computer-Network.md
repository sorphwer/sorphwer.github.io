---
layout: post
title: "Learning Computer Network"
author: "Riino"
header-img: "img/post-bg-web.jpg"
header-mask: 0.3
mathjax: true
sticky: false
tags:
  Computer Network
  Processing
---

[TOC]
<!-- vscode-markdown-toc -->
* 1. [Five Layers](#FiveLayers)
* 2. [Data encapsulation](#Dataencapsulation)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->


# Review

##  1. <a name='FiveLayers'></a>Five Layers

The internet communication protocol system ( aka internet protocol stack) is organized with **Layering** scheme , which includes **5** layers : `Application`,`Transport`,`Network`,`Link`,`Physic`,(from up to down ). The fist part of this note will be composited by 5 corresponding part called **Application Layer , Transport Layer , Data Plane , Control Plane , Link Layer and LANS** .

--A image of protocol stack should be here

The main advantages of such layering structure is **Conceptualization** and **Structured** , which can solve various problem in communication system , and provide an easy access to make updates.

The main architecture of internet application is divided into `C/S` mode and `peer-to-peer` mode. The `Transport` layer in the protocol stack provide logical communication between different hosts’ application , and TCP protocol and UDP protocol.

##  2. <a name='Dataencapsulation'></a>Data encapsulation

--a image of PDU should be here.







