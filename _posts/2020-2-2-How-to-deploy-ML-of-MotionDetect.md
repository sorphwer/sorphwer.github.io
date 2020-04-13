---
layout: post

author: "Riino"
header-img: "img/lunur.jpg"
header-mask: 0.3
sticky: false
tags:

  - Embedded System
  - Raspberry Pi
  - STM32
toc: true
---

## Get training data

Since we can read data from STM32 and send it :

```c++
while (1){
        led=1;
        //++sample_num; cancle the counter
        BSP_ACCELERO_AccGetXYZ(pDataXYZ);
        BSP_GYRO_GetXYZ(pGyroDataXYZ);
 

        float x = pDataXYZ[0]*SCALE_MULTIPLIER, y = pDataXYZ[1]*SCALE_MULTIPLIER, z = pDataXYZ[2]*SCALE_MULTIPLIER;
        float gx= pGyroDataXYZ[0]*SCALE_MULTIPLIER, gy = pGyroDataXYZ[1]*SCALE_MULTIPLIER, gz = pGyroDataXYZ[2]*SCALE_MULTIPLIER;
        
        int sx=0,sy=0,sz=0,sgx=0,sgy=0,sgz=0;
        sgx=fixSymbol(gx);
        gx=fixnumber(gx);
        sgy=fixSymbol(gy);
         gy=fixnumber(gy);
        sgz=fixSymbol(gz);
         gz=fixnumber(gz);
        /*sgx=fixSymbol(gx);
        sgy=fixSymbol(gy);
        sgz=fixSymbol(gz);*

        
       
       
        gx=fixnumber(gx);
        gy=fixnumber(gy);
        gz=fixnumber(gz);
        printf("here");
        printf("Print:%d%d%d%d%d%d",sx,sy,sz,sgx,sgy,sgz);
        //break;*/


 int len = sprintf(acc_json,"{\"gx\":%f,\"gy\":%f,\"gz\":%f,\"sx\":%d,\"sy\":%d,\"sz\":%d}",
                                         (float)((int)(gx*10000))/10000,(float)((int)(gy*10000))/10000,(float)((int)(gz*10000))/10000,
                                         sgx,sgy,sgz);
       
        
        response = socket.send(acc_json,len);
```



The format here is (json):

```json
{\"gx\":%f,\"gy\":%f,\"gz\":%f,\"sx\":%d,\"sy\":%d,\"sz\":%d}
```

And, to make the length fixed, we only send absolute value plus 10000 , and the symbol separately.

## Save Data

```python
import socket
import torch
import os
import csv
import numpy as np
import json
import time

def get_number(number, signal):
    if signal == 0:
        return number - 10000;
    elif signal == 1:
        return -(number - 10000);
    return -1


if not os.path.exists('data'):
    os.makedirs('data')

csv_file = 'data/train.csv'


server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print('waiting for socket')
server.bind(('192.168.1.238', 65431))  # YOU NEED EDIT HERE
server.listen(5)  # possible sockets up to 5.
while True:
    conn, addr = server.accept()
    print(conn, addr)

    movement = []
    gx = []
    gy = []
    gz = []
    input("Press Enter to gather the data...")
    i=0
    time1= time.time()
    while len(gx) <= 48:

        try:

            data = conn.recv(76)
            #print('recive:', data.decode())
            rec = data.decode()
            print(i)
            #print('recieve before:' + str(i), rec)
            rec = rec[0:rec.find('}')+1]
            #print(len(rec))
            #print('recieve:' + str(i), rec)
            i +=1
            rec = json.loads(rec)
            gx.append(get_number(rec['gx'], rec['sx']))
            gy.append(get_number(rec['gy'], rec['sy']))
            gz.append(get_number(rec['gz'], rec['sz']))
            print(gx, gz, gz)
            time.sleep(0.05)

        except ConnectionResetError as e:
            print('Connect is shut down！')
            break
    movement = [gx, gy, gz]
    print(time.time() - time1)
    label = 4
    while label != 1 and label != 2 and label != 0:
        label = input("Is it a pass or a shoot?")
        label = int(label)
    if label == 2:
        print('error occurred. No valid input')
        conn.close()
        exit(1)
    print(movement)

    tensor = torch.tensor(np.asarray(movement))

    if not os.path.exists(csv_file):
        with open(csv_file, mode='w') as csv_file:
            fieldnames = ['data_name', 'label']
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerow({'data_name': 'data_000.pt', 'label': label})

        # file_name = os.path.join('data_rdm', 'data_000.pt')
        # print(file_name)
        file_name = os.path.join('data', 'data_000.pt')
        # np.save(array, file_name)
        torch.save(tensor, file_name)

    else:
        with open(csv_file, mode='r') as pred:
            reader = csv.reader(pred)
            data = []
            for rows in reader:
                print(rows)
                if rows[0] != 'data_name':
                    data.append([rows[0], rows[1]])
                    print(data)

        #print(data)
        #print(data[-1][0])
        last_file = data[-1][0]
        #print(last_file[5:-3])
        id = int(last_file[5:-3]) + 1
        #print(id)
        file_number = '00' + str(id) if len(str(id)) == 1 else \
            ('0' + str(id) if len(str(id)) == 2 else str(id))
        file_name = 'data_' + file_number + '.pt'

        with open(csv_file, mode='a') as csv_file:
            fieldnames = ['data_name', 'label']
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writerow({'data_name': file_name, 'label': label})

        # file_name = os.path.join('data_rdm', 'data_' + file_number + '.pt' )
        # print(file_name)
        file_name = os.path.join('data', file_name)
        print(file_name)
        # np.save(array, file_name)
        torch.save(tensor, file_name)

    conn.close()
```

What this python do is to record 48 sets of data after ‘press the enter’, and save it into `data_#.pt` file. then, save the name of this file with the label: 0 or 1, into `data/train.csv`



## Train Data

Then, use all the file into the pytorch.

//TODO 

And we will get the trained model file: 

To parse the model file , here is the responding python to be imported:

```python
import torch
import torch.nn as nn


class Net(nn.Module):

    def __init__(self):
        super(Net, self).__init__()  

        ''' declare layers used in this network'''
        # first block
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, stride=1, padding=1) # 64x64 -> 64x64
        self.bn1 = nn.BatchNorm2d(32)
        self.relu1 = nn.ReLU()
        self.maxpool1 = nn.MaxPool2d(kernel_size=2, stride=2) # 64x64 -> 32x32
        
        # second block
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1) # 32x32 -> 32x32
        self.bn2 = nn.BatchNorm2d(64)
        self.relu2 = nn.ReLU()
        self.maxpool2 = nn.MaxPool2d(kernel_size=2, stride=2) # 32x32 -> 16x16
        
        # third block
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1) # 16x16 -> 16x16
        self.bn3 = nn.BatchNorm2d(128)
        self.relu3 = nn.ReLU()
        self.maxpool3 = nn.MaxPool2d(kernel_size=2, stride=2) # 16x16 -> 8x8

        # classification
        # self.avgpool = nn.AvgPool2d(16)
        # self.fc = nn.Linear(64, 4)
        self.avgpool = nn.AvgPool2d(1)
        self.fc = nn.Linear(64, 2)

    def forward(self, img):


        x = self.relu1(self.bn1(self.conv1(img)))
        x = self.maxpool1(x)

        x = self.relu2(self.bn2(self.conv2(x)))
        x = self.maxpool2(x)

        
        #x = self.relu3(self.bn3(self.conv3(x)))
        #x = self.maxpool2(x)


        #print('shape', x.shape)

        x = self.avgpool(x).view(x.size(0),-1)
        x = self.fc(x)
        #print(x)

        return x

```

## Use Model

```python
# -*- coding: utf-8 -*
from __future__ import absolute_import
import models

import argparse
#from parser import argparse


import time
import socket
import torch
import numpy as np
import json

def arg_parse():
    parser = argparse.ArgumentParser(description='DLCV TA\'s tutorial in image classification using pytorch')

    # Datasets parameters
    parser.add_argument('--data_dir', type=str, default='data',
                    help="root path to data directory")
    parser.add_argument('--workers', default=4, type=int,
                    help="number of data loading workers (default: 4)")
    
    # training parameters
    parser.add_argument('--gpu', default=0, type=int, 
                    help='gpu device ids for CUDA_VISIBLE_DEVICES')
    parser.add_argument('--epoch', default=100, type=int,
                    help="num of validation iterations")
    parser.add_argument('--val_epoch', default=1, type=int,
                    help="num of validation iterations")
    parser.add_argument('--train_batch', default=2, type=int,
                    help="train batch size")
    parser.add_argument('--test_batch', default=128, type=int,
                    help="test batch size")
    parser.add_argument('--lr', default=0.0002, type=float,
                    help="initial learning rate")
    parser.add_argument('--weight-decay', default=0.0005, type=float,
                    help="initial learning rate")
    
    # resume trained model
    parser.add_argument('--resume', type=str, default='log',
                    help="path to the trained model")
    # others
    parser.add_argument('--save_dir', type=str, default='log')
    parser.add_argument('--random_seed', type=int, default=999)

    args = parser.parse_args()

    return args

def prediction(mov):
    with torch.no_grad():  # do not need to caculate information for gradient during eval
        pred = model(mov)
        _, pred = torch.max(pred, dim=1)

    return pred

def get_number(number, signal):
    if signal == 0:
        return number - 10000
    elif signal == 1:
        return -(number - 10000)
    return -1



print("torch version:",torch.__version__)

args = arg_parse()
model = models.Net()
print(model)
model_std = torch.load('model_best.pth.tar',map_location=torch.device('cpu'))
model.load_state_dict(model_std)



while True:
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print('waiting for socket')
    server.bind(('192.168.1.243', 65431))  # YOU NEED EDIT HERE
    server.listen(5)  # possible sockets up to 5.
    conn, addr = server.accept()
    print(conn, addr)

    movement = []
    gx = []
    gy = []
    gz = []
    input("Press Enter to gather the data...")#insert 
    i=0
    time1= time.time()
    while len(gx) <= 48:

        try:

            data = conn.recv(76)
            #print('recive:', data.decode())
            rec = data.decode()
            print(i)
            #print('recieve before:' + str(i), rec)
            rec = rec[0:rec.find('}')+1]
            #print(len(rec))
            #print('recieve:' + str(i), rec)
            i +=1
            rec = json.loads(rec)
            gx.append(get_number(rec['gx'], rec['sx']))
            gy.append(get_number(rec['gy'], rec['sy']))
            gz.append(get_number(rec['gz'], rec['sz']))
            #print(gx, gz, gz)
            time.sleep(0.05)

        except ConnectionResetError as e:
            print('Connect is shut down！')
            break
    movement = [gx, gy, gz]
    #print(time.time() - time1)

    tensor = torch.tensor(np.asarray(movement))

    tensor = torch.reshape(tensor, (1, 3, 7, 7))
    pred = prediction(tensor.float())
    pred = pred.numpy().squeeze()
    #print(pred)

    if pred == 0:
        print('Its a pass!')
    else:
        print('Its a shoot!')

    conn.close()



```

