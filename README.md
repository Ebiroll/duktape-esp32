# ESP32-Duktape

The boal of this was to make duktape run on a TTGO T-audio device.

make

Then clone the mkspiff tool

tmp/mkspiffs/mkspiffs -c filesystem/ -b 4096 -p 256 -s 0x100000 spiffs.bin

~/esp/esp-idf/components/esptool_py/esptool/esptool.py  --chip esp32 --port /dev/ttyUSB0 write_flash -z 0x180000 spiffs.bin
       
However on this hardware I never was able to upload any spiff, :-P
Probably because I was not able to put it to boot mode.

https://esp32.com/viewtopic.php?t=1914

https://www.esp32.com/viewtopic.php?t=2272


https://esp-idf.readthedocs.io/en/latest/api-reference/storage/spiffs.html


python /home/olof/esp/esp-idf/components/esptool_py/esptool/esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 115200 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m --flash_size detect  0x180000 spiffs.bin



The ESP32 is a WiFi and Bluetooth enabled MCU from Espressif.  It is a dual core
processor with 512K of RAM and commonly 4M of flash.  Each processor runs at
240MHz.  It has built in WiFi and Bluetooth as well as a rich assortment of
sensor inputs and outputs.

Duktape is an open source implementation of a JavaScript environment including
a runtime, compiler, debugger and a wealth of well written documentation.

This project provides an environment for running JavaScript on the ESP32 using the
Duktape engine.  In addition to providing all the necessary components to run
a simple JavaScript program, a framework is also provided that provides premade
modules for many of the common ESP32 functions including networking, web servers,
web sockets, GPIO and much more.

An integrated browser based JavaScript editor and file system are also present
meaning that once installed, one needs no specialized tools in order to build and
run JavaScript.

All components in this project are open source.  Collaborators welcomed.