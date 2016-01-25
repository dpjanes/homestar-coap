# Semantic Models

This basic proposition is we describe how things work _semantically_. 
All Models are based on **composition** not on **classes**.

Thus for example we do not have a "lighting class". We have Things
that can set their color, we have things that can be turned on and
off, we have things that can change their brightness.

How do we know if things are lights then? They tell us (semantically) 
_in their metadata_, **not** _in their model_ that
"I am a light".

Consider a WeMo Socket. It's a switch: it can turn and off. 
But if it's plugged into a Lamp, it's not a lighting device **even
though it's model / what it can do remains exactly the same**.
Likewise, if you plug a space heater into the WeMo, it's a part
of the climate control system. But the model remains the same.

## Source Code

Models are authorer in IoTQL. 

* [PlugfestLight.iotql](https://github.com/dpjanes/homestar-plugfest/blob/master/models/PlugfestLight.iotql)
* [PlugfestLight.json](https://github.com/dpjanes/homestar-plugfest/blob/master/models/PlugfestLight.json)
* [HueLight.iotql](https://github.com/dpjanes/homestar-hue/blob/master/models/HueLight.iotql)
* [HueLight.json](https://github.com/dpjanes/homestar-hue/blob/master/models/HueLight.json)
* [LifxLight.iotql](https://github.com/dpjanes/homestar-lifx/blob/master/models/LifxLight.iotql)
* [LifxLight.json](https://github.com/dpjanes/homestar-lifx/blob/master/models/LifxLight.json)

## Semantic Vocabulary

Vocabulary is explained here:

* [interactive model explorer]https://iotdb.org/pub)
* [github](https://github.com/dpjanes/iotdb-vocabulary)
* [schema.org](https://schema.org)
