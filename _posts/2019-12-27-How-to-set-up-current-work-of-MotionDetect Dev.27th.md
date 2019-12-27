---
layout: post

author: "Riino"
header-img: "img/lunur.jpg"
header-mask: 0.3
mathjax: true
sticky: false
tags:

  - Embedded System
  - Raspberry Pi
  - STM32

---


# 1. How to set up current work: Dev.27th
<!-- TOC -->

- [1. How to set up current work: Dev.27th](#1-how-to-set-up-current-work-dev27th)
  - [1.1. Python side](#11-python-side)
  - [1.2. STM32 side](#12-stm32-side)
  - [How to run](#how-to-run)

<!-- /TOC -->

## 1.1. Python side

1. Establish a python file and copy:

what this file do: Receive the data from the IP and PORT you edit.

```python
import socket

server = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
server.bind(('192.168.1.238',65431)) #YOU NEED EDIT HERE
server.listen(5)#possible sockets up to 5. 
while True:
    conn,addr = server.accept() 
    print(conn,addr)
    
    while True:
        try:
            data = conn.recv(1024)  
            print('recive:',data.decode()) 
            
        except ConnectionResetError as e:
            print('Connect is shut down！')
            break
    conn.close()
```

2. Use `ipconfig` or `arp -a` to check your device’s IP which will be the **server**, the port is fixed: 65431.
3. Run python code first.

## 1.2. STM32 side

1. establish an empty project in **Mbed**

   The template of `wifi` is recommend.(new program->mbed-example-wifi)

2. You need those **extra** library for our specific STM32 board:

   - Sensor Library : import from **http://developer.mbed.org/teams/ST/code/BSP_B-L475E-IOT01/**
   - WIFI chip driver: **https://github.com/ARMmbed/wifi-ism43362.git**

3. If you use example-wifi program , you can find  `mbed_app.json`, if you use empty one, create this file.

   change the content into:

   ```xml
   {
       "config": {
            "wifi-shield":{
               "help":"Options are internal,WIFI_IDW0XX1",
               "value":"WIFI_ISM43362"
           },
           "wifi-ssid": {
               "help": "WiFi SSID",
               "value": "\"esys305-Dlink\""
           },
           "wifi-password": {
               "help": "WiFi Password",
               "value": "\"305305abcd\""
           }
       },
       "target_overrides": {
           "*": {
               "platform.stdio-convert-newlines": true
               
           }
       }
   }
   ```

   **Be aware of this SSID and Password, if you need to connect different wifi, change them.**

4. Replace your `main.cpp` into:

   **Be aware of the function `acc_server`, you must change the target IP there**

   The data collecting and formatting are also located in `acc_server`

   ！！！the name of `acc_server` may be confusing , because here it actually opened a `socket client` 

   ```c++
   /* WiFi & Sensor
    * Copyright (c) 2016 ARM Limited
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *     http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
   
   #include "mbed.h"
   #include "TCPSocket.h"
   #include "TCPServer.h"
   
   #include "stm32l475e_iot01_gyro.h"
   #include "stm32l475e_iot01_accelero.h"
   #define SCALE_MULTIPLIER    0.004
   DigitalOut led(LED1);
   DigitalOut errled(LED3);
   WiFiInterface *wifi;
   
   
   const char *sec2str(nsapi_security_t sec)
   {
       switch (sec) {
           case NSAPI_SECURITY_NONE:
               return "None";
           case NSAPI_SECURITY_WEP:
               return "WEP";
           case NSAPI_SECURITY_WPA:
               return "WPA";
           case NSAPI_SECURITY_WPA2:
               return "WPA2";
           case NSAPI_SECURITY_WPA_WPA2:
               return "WPA/WPA2";
           case NSAPI_SECURITY_UNKNOWN:
           default:
               return "Unknown";
       }
   }
   
   int scan_demo(WiFiInterface *wifi)//this function is to scan all hotspots nearby(up to 15),sometimes it will fail.
   {
       WiFiAccessPoint *ap;
   
       printf("Scan:\n");
   
       int count = wifi->scan(NULL,0);
   
       if (count <= 0) {
           printf("scan() failed with return value: %d\n", count);
           return 0;
       }
   
       /* Limit number of network arbitrary to 15 */
       count = count < 15 ? count : 15;
   
       ap = new WiFiAccessPoint[count];
       count = wifi->scan(ap, count);
   
       if (count <= 0) {
           printf("scan() failed with return value: %d\n", count);
           return 0;
       }
   
       for (int i = 0; i < count; i++) {
           printf("Network: %s secured: %s BSSID: %hhX:%hhX:%hhX:%hhx:%hhx:%hhx RSSI: %hhd Ch: %hhd\n", ap[i].get_ssid(),
                  sec2str(ap[i].get_security()), ap[i].get_bssid()[0], ap[i].get_bssid()[1], ap[i].get_bssid()[2],
                  ap[i].get_bssid()[3], ap[i].get_bssid()[4], ap[i].get_bssid()[5], ap[i].get_rssi(), ap[i].get_channel());
       }
       printf("%d networks available.\n", count);
   
       delete[] ap;
       return count;
   }
   
   void acc_server(NetworkInterface *net)//collect data and send via socket
   {
       /* 
       TCPServer socket;
       TCPSocket* client;*/
       TCPSocket socket;
       //SocketAddress addr("192.168.43.176",65431);
       SocketAddress addr("192.168.1.238",65431);
       nsapi_error_t response;
   
       int16_t pDataXYZ[3] = {0};
       float pGyroDataXYZ[3] = {0};
       char recv_buffer[9];
       char acc_json[64];
       int sample_num = 0;//counter
   
       
   
       // Open a socket on the network interface, and create a TCP connection to addr
       response = socket.open(net);
       if (0 != response){
           printf("Error opening: %d\n", response);
       }
       response = socket.connect(addr);
       
       if (0 != response){
           printf("Error connecting: %d\n", response);
       }
   
   
       socket.set_blocking(1);
       while (1){
           led=1;
           //++sample_num; cancle the counter
           BSP_ACCELERO_AccGetXYZ(pDataXYZ);
           BSP_GYRO_GetXYZ(pGyroDataXYZ);
    
   
           float x = pDataXYZ[0]*SCALE_MULTIPLIER, y = pDataXYZ[1]*SCALE_MULTIPLIER, z = pDataXYZ[2]*SCALE_MULTIPLIER;
           float gx= pGyroDataXYZ[0]*SCALE_MULTIPLIER, gy = pGyroDataXYZ[1]*SCALE_MULTIPLIER, gz = pGyroDataXYZ[2]*SCALE_MULTIPLIER;
   
   
   
           int len = sprintf(acc_json,"{\"x\":%f,\"y\":%f,\"z\":%f,\"gx\":%f,\"gy\":%f,\"gz\":%f,\"s\":%d}",(float)((int)(x*10000))/10000,
                                           (float)((int)(y*10000))/10000, (float)((int)(gx*10000))/10000,(float)((int)(z*10000))/10000,(float)((int)(gy*10000))/10000,(float)((int)(gz*10000))/10000, sample_num);
   
               
           response = socket.send(acc_json,len);
           printf("sent %s",acc_json);
          
           if (0 >= response){
               printf("Error seding: %d\n", response);
           }
           wait(0.1);
           led=0;
       
   
       }
   
    
       socket.close();
   }
   
   
   
   
   
   
   
   int main()
   {
       led=0;
       errled=0;
       float sensor_value = 0;
       int16_t pDataXYZ[3] = {0};
       float pGyroDataXYZ[3] = {0};
   
       BSP_GYRO_Init();
       BSP_ACCELERO_Init();
       printf("init completed\n");
   
   #ifdef MBED_MAJOR_VERSION
       printf("Mbed OS version %d.%d.%d\n\n", MBED_MAJOR_VERSION, MBED_MINOR_VERSION, MBED_PATCH_VERSION);
   #endif
   
       wifi = WiFiInterface::get_default_instance();
       if (!wifi) {
           printf("ERROR: No WiFiInterface found.\n");
           errled=1;//connect error
           return -1;
       }
   /* 
       int count = scan_demo(wifi);
       if (count == 0) {
           printf("No WIFI APs found - can't continue further.\n");
           return -1;
       }*/
   
       printf("\nConnecting to %s...\n", MBED_CONF_APP_WIFI_SSID);
       int ret = wifi->connect(MBED_CONF_APP_WIFI_SSID, MBED_CONF_APP_WIFI_PASSWORD, NSAPI_SECURITY_WPA_WPA2);
       if (ret != 0) {
           printf("\nConnection error: %d\n", ret);
           errled=1;//connect error
           return -1;
       }
   
       printf("Success\n\n");
       printf("MAC: %s\n", wifi->get_mac_address());
       printf("IP: %s\n", wifi->get_ip_address());
       printf("Netmask: %s\n", wifi->get_netmask());
       printf("Gateway: %s\n", wifi->get_gateway());
       printf("RSSI: %d\n\n", wifi->get_rssi());
   
    
   
   
       acc_server(wifi);
       
       wifi->disconnect();
   }
   
   ```

   ## How to run

1. run python program on your device (laptop or pi)
2. use mbed to run c++ program, or simply power the STM32 board
3. You should read data from py terminal or serial monitor of mbed.

