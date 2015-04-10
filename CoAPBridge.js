/*
 *  CoAPBridge.js
 *
 *  David Janes
 *  IOTDB.org
 *  2015-04-10
 *
 *  Copyright [2013-2015] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

var iotdb = require('iotdb');
var _ = iotdb._;
var bunyan = iotdb.bunyan;

var coap = require('coap');

var logger = bunyan.createLogger({
    name: 'homestar-coap',
    module: 'CoAPBridge',
});

/**
 *  EXEMPLAR and INSTANCE
 *  <p>
 *  No subclassing needed! The following functions are
 *  injected _after_ this is created, and before .discover and .connect
 *  <ul>
 *  <li><code>discovered</code> - tell IOTDB that we're talking to a new Thing
 *  <li><code>pulled</code> - got new data
 *  <li><code>connected</code> - this is connected to a Thing
 *  <li><code>disconnnected</code> - this has been disconnected from a Thing
 *  </ul>
 */
var CoAPBridge = function (initd, native) {
    var self = this;

    self.initd = _.defaults(initd,
        iotdb.keystore().get("bridges/CoAPBridge/initd"), {
            url: null,
            queue: true,    // if true, queue all requests
            poll: 30
        }
    );
    self.native = native;   // the thing that does the work - keep this name

    if (self.native && self.initd.queue) {
        self._reachable = true;
        self._queue = _.queue("CoAPBridge:" + url.parse(self.initd.url).host);
    }
};

/* --- lifecycle --- */

/**
 *  EXEMPLAR.
 *  <ul>
 *  <li>look for Things (using <code>self.bridge</code> data to initialize)
 *  <li>find / create a <code>native</code> that does the talking
 *  <li>create an CoAPBridge(native)
 *  <li>call <code>self.discovered(bridge)</code> with it
 */
CoAPBridge.prototype.discover = function () {
    var self = this;

    logger.info({
        method: "discover"
    }, "called");

    if (!self.initd.url) {
        logger.error({
            method: "discover",
            cause: "all CoAP Bridges must be explicitly set up with an IRI",
        }, "no 'url' parameter - cannot do discovery");
        return;
    }

    self.discovered(new CoAPBridge(self.initd, {}));
};

/**
 *  INSTANCE
 *  This is called when the Bridge is no longer needed. When
 */
CoAPBridge.prototype.connect = function (connectd) {
    var self = this;
    if (!self.native) {
        return;
    }

    self._setup_polling();
    self.pull();
};

CoAPBridge.prototype._setup_polling = function () {
    var self = this;
    if (!self.initd.poll) {
        return;
    }

    var timer = setInterval(function () {
        if (!self.native) {
            clearInterval(timer);
            return;
        }

        self.pull();
    }, self.initd.poll * 1000);
};

CoAPBridge.prototype._forget = function () {
    var self = this;
    if (!self.native) {
        return;
    }

    logger.info({
        method: "_forget"
    }, "called");

    self.native = null;
    self.pulled();
};

/**
 *  INSTANCE and EXEMPLAR (during shutdown).
 *  This is called when the Bridge is no longer needed.
 */
CoAPBridge.prototype.disconnect = function () {
    var self = this;
    if (!self.native || !self.native) {
        return;
    }

    self._forget();
};

/* --- data --- */

/**
 *  INSTANCE.
 *  Send data to whatever you're taking to.
 */
CoAPBridge.prototype.push = function (pushd) {
    var self = this;
    if (!self.native) {
        return;
    }

    logger.info({
        method: "push",
        putd: putd
    }, "push");

    if (self.queue) {
        var qitem = {
            // if you set "id", new pushes will unqueue old pushes with the same id
            // id: self.number, 
            run: function () {
                self._pushd(pushd);
                self.queue.finished(qitem);
            }
        };
        self.queue.add(qitem);
    } else {
        self._pushd(pushd);
    }
};

/**
 *  Do the work of sending data
 */
CoAPBridge.prototype._push = function (pushd) {
};

/**
 *  INSTANCE.
 *  Pull data from whatever we're talking to. You don't
 *  have to implement this if it doesn't make sense
 */
CoAPBridge.prototype.pull = function () {
    var self = this;
    if (!self.native) {
        return;
    }
};

/* --- state --- */

/**
 *  INSTANCE.
 *  Return the metadata - compact form can be used.
 *  Does not have to work when not reachable
 *  <p>
 *  Really really useful things are:
 *  <ul>
 *  <li><code>iot:thing</code> required - a unique ID
 *  <li><code>iot:device</code> suggested if linking multiple things together
 *  <li><code>schema:name</code>
 *  <li><code>iot:number</code>
 *  <li><code>schema:manufacturer</code>
 *  <li><code>schema:model</code>
 */
CoAPBridge.prototype.meta = function () {
    var self = this;
    if (!self.native) {
        return;
    }

    return {
        "iot:thing": _.id.thing_urn.unique("CoAP", self.initd.url),
        "schema:name": self.native.name || "CoAP",
    };
};

/**
 *  INSTANCE.
 *  Return True if this is reachable. You
 *  do not need to worry about connect / disconnect /
 *  shutdown states, they will be always checked first.
 */
CoAPBridge.prototype.reachable = function () {
    return (this.native !== null) && this._reachable;
};

/**
 *  INSTANCE.
 *  Configure an express web page to configure this Bridge.
 *  Return the name of the Bridge, which may be
 *  listed and displayed to the user.
 */
CoAPBridge.prototype.configure = function (app) {};

/* --- injected: THIS CODE WILL BE REMOVED AT RUNTIME, DO NOT MODIFY  --- */
CoAPBridge.prototype.discovered = function (bridge) {
    throw new Error("CoAPBridge.discovered not implemented");
};

CoAPBridge.prototype.pulled = function (pulld) {
    throw new Error("CoAPBridge.pulled not implemented");
};

/*
 *  API
 */
exports.Bridge = CoAPBridge;
