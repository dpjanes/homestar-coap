# Plugfest Demo

* David Janes
* IOTDB.org
* 2016-01-25 

# Introduction
## Purpose

Demonstrate a complete REST / HATEOAS model for Thing interoperability, including:

* standards-based Semantic Models, using _composition_ rather than _classes_
* demonstrate control / discovery using HTTP, CoAP and MQTT

One of the core ideas is that we describe what things actually do, rather than propose a standard for what their APIs should look like. Thus, "Semantic Metastandards" - and a broad set of compatibiltiy with Things in other standards stacks

## How it works

* start at the entry point, e.g. [http://homestar.io:20000/api/things](http://homestar.io:20000/api/things)
* get a list of Things (as URLs)
* navigate to a Thing
* get a list of [Bands](https://homestar.io/about/bands), as URLs
* navigate to a Band
* manipulate

Everythings on PUT and GET. There is no POST (and no need for POST). 
Everything works **exactly like you'd expect an API to work**. 
Once you grasp the [Band](https://homestar.io/about/bands) concept, 
cognitive load is very very low for developers.

## Links in this Folder

I've broken this document into several parts:

* [Entry Points](entry-points.md) - very important, see it live!
* [Presentations](presentations.md) - slideshows on how this all works
* [Models](models.md) - how models work in IOTDB (composition & semantics)

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
