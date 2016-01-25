# Plugfest Demo

* David Janes
* IOTDB.org
* 2016-01-25 

# Introduction
## Purpose

Demonstrate a complete REST / HATEOAS model, including:

* standards-based Semantic Models, using _composition_ rather than _classes_
* demonstrate control / discovery using HTTP, CoAP and MQTT

## Links

* [Entry Points](entry-points.md) - very important, see it live!

## Code

All code and specifications are Open Source, Apache 2 license. Installation instructions:
[https://homestar.io/about](https://homestar.io/about)

This code has a compatibility with a large number of things, including: 

* Bluetooth Low Energy devices,
* Chromecast
* Denon AVR
* Atom & RSS Feeds
* GPIO systems, like Raspberry Pi
* IR Systems
* Johnny Five / Arduino devices
* KNX (European Home / Business Automation System)
* LG SmartTV
* LIFX Lights
* METAR weather forecasts
* Philips Hue
* Plugfest Lighting Example
* REST APIs
* Samsung Smart TVs
* SmartThings (a large number of products)
* Sonos
* TCP Lighting
* Wemo (a number of products)

… and more in progress.

## Ove


This

* MQTT: 

coap://184.107.137.234:22001/ts/urn:iotdb:thing:REST:20b2c3ca712e8b0031debf3453cc75d1:rest-color-light/model



Hi Matthias,

Excellent. I'll probably be finalizing the links used tomorrow, but here's what I'll bring to the table:

1) 

interoperability with the CoAP light simulated at coap://129.132.130.252:63551/state, including discovery, updating, and getting state.

2)

HTTP (+MQTT) HATEOAS implementation using
RESTful API, all links HATEOAS
Simple model based on PUT / GET
Bearer token security (turned off for demo)
Semantic model of control, built on extensions of schema.org's  

API example here:
http://homestar.io:20000/api/
Models with IOTDB are done via composition, not classes. Here's a few sample models:
https://github.com/dpjanes/homestar-plugfest/blob/master/models/PlugfestLight.iotql
https://github.com/dpjanes/homestar-plugfest/blob/master/models/PlugfestLight.json
https://github.com/dpjanes/homestar-hue/blob/master/models/HueLight.iotql
https://github.com/dpjanes/homestar-hue/blob/master/models/HueLight.json
https://github.com/dpjanes/homestar-lifx/blob/master/models/LifxLight.iotql
https://github.com/dpjanes/homestar-lifx/blob/master/models/LifxLight.json
Vocabulary is explained here:
https://iotdb.org/pub
https://github.com/dpjanes/iotdb-vocabulary---
3)

Similar to (2) but for CoAP. No security model yet. URL TBD.

4)

Some presentations:

Semantic Metastandards: 
http://www.slideshare.net/dpjanes/semantic-metastandards-will-unlock-iot-interoperability
Semantics and the IoT:
http://www.slideshare.net/dpjanes/semantic-and-the-internet-of-things
Standardless IoT / Interoperability:
http://www.slideshare.net/dpjanes/2015-04-global-io-t-day-wien-interoperability-with-stanardless-iot
What a Thing API should look like: http://www.slideshare.net/dpjanes/what-a-thing-api-should-look-like-global-iot-day


**

In terms of demoing, I can join you via Google Hangouts, or Slack, or even phone. But if I can get my Things at home bridged onto the Internet, Hangouts will probably be best as you'll be able to turn on and off real lights, etc. which looks cool.


Regards, etc...
