# Entry Points (for the Anxious)

## HTML

This webpage dynamically builds its interface by looking at the Semantic Description of Things.

* [http://homestar.io:20000/](http://homestar.io:20000/)


## HTTP

* [http://homestar.io:20000/api/things](http://homestar.io:20000/api/things)

Access:

	## get the entry point
	$ curl 'http://homestar.io:20000/api/things' --include
	
	## get a Thing's Bands
	$ curl 'http://homestar.io:20000/api/things/urn:iotdb:thing:REST:20b2c3ca712e8b0031debf3453cc75d1:rest-color-light/'
	
	## get a Thing's Model (in JSON-LD)
	$ curl 'http://homestar.io:20000/api/things/urn:iotdb:thing:REST:20b2c3ca712e8b0031debf3453cc75d1:rest-color-light/model'
	
	## get a Thing's current state (the istate)
	$ curl 'http://homestar.io:20000/api/things/urn:iotdb:thing:REST:20b2c3ca712e8b0031debf3453cc75d1:rest-color-light/istate'
	
	## change a Thing's state (on)
	$ curl --location 'http://homestar.io:20000/api/things/urn:iotdb:thing:REST:20b2c3ca712e8b0031debf3453cc75d1:rest-color-light/ostate' -H 'Content-Type: application/json' -X PUT -d '{ "on": true }'
	
	## change a Thing's state (off)
	$ curl --location 'http://homestar.io:20000/api/things/urn:iotdb:thing:REST:20b2c3ca712e8b0031debf3453cc75d1:rest-color-light/ostate' -H 'Content-Type: application/json' -X PUT -d '{ "on": false }'
	
## CoAP

* [coap://184.107.137.234:22001/ts](coap://184.107.137.234:22001/ts)

Access:

* Use Firefox and add the Copper extension and navigate the URL above

Command Line:

	$ npm install coap-cli -g

	## all the Things
	$ coap get coap://184.107.137.234:22001/ts
	
	## one particular Thing - all the Bands
	$ coap get coap://184.107.137.234:22001/ts/urn:iotdb:thing:REST:6acd18449fe571d3a1d12ef66aa443dd:rest-dimmer-light
	
	## the model for this Thing
	$ coap get coap://184.107.137.234:22001/ts/urn:iotdb:thing:REST:6acd18449fe571d3a1d12ef66aa443dd:rest-dimmer-light/model

	## the current actual state ("istate") for this Thing
	$ coap get coap://184.107.137.234:22001/ts/urn:iotdb:thing:REST:6acd18449fe571d3a1d12ef66aa443dd:rest-dimmer-light/istate

	## turn on - observe on the HTML page!
	$ coap put coap://184.107.137.234:22001/ts/urn:iotdb:thing:REST:20b2c3ca712e8b0031debf3453cc75d1:rest-color-light/ostate --payload '{ "on": true }'

	## turn off - observe on the HTML page!
	$ coap put coap://184.107.137.234:22001/ts/urn:iotdb:thing:REST:20b2c3ca712e8b0031debf3453cc75d1:rest-color-light/ostate --payload '{ "on": true }'

## MQTT

This is the best way to see all updates

* mqtt://184.107.137.235:20001

Command Line:


	$ npm install -g mqtt
	
	## see all updates
	$ mqtt subscribe --host 184.107.137.235 --port 20001 --topic '#' --verbose
