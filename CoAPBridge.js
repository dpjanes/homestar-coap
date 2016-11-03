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

var coap = require('coap');

var logger = iotdb.logger({
    name: 'homestar-coap',
    module: 'CoAPBridge',
});

/**
 *  See {iotdb.bridge.Bridge#Bridge} for documentation.
 *  <p>
 *  @param {object|undefined} native
 *  only used for instances, should be 
 */
var CoAPBridge = function (initd, native) {
    var self = this;

    self.initd = _.defaults(initd,
        iotdb.keystore().get("bridges/CoAPBridge/initd"), {
            url: null,
            queue: true, // if true, queue all requests
            poll: 30
        }
    );
    self.native = native; // the thing that does the work - keep this name

    if (self.native && self.initd.queue) {
        self._reachable = true;
        // self._queue = _.queue("CoAPBridge:" + url.parse(self.initd.url).host);
    }
};

CoAPBridge.prototype = new iotdb.Bridge();

/* --- lifecycle --- */

/**
 *  See {iotdb.bridge.Bridge#discover} for documentation.
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
 *  See {iotdb.bridge.Bridge#connect} for documentation.
 */
CoAPBridge.prototype.connect = function (connectd) {
    var self = this;
    if (!self.native) {
        return;
    }

    self._validate_connect(connectd);

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
 *  See {iotdb.bridge.Bridge#disconnect} for documentation.
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
 *  See {iotdb.bridge.Bridge#push} for documentation.
 */
CoAPBridge.prototype.push = function (pushd, done) {
    var self = this;
    if (!self.native) {
        done(new Error("not connected"));
        return;
    }

    self._validate_push(pushd, done);

    logger.info({
        method: "push",
        pushd: pushd,
    }, "push");

    if (self.queue) {
        var qitem = {
            // if you set "id", new pushes will unqueue old pushes with the same id
            // id: self.number, 
            run: function () {
                self._pushd(pushd);
                self.queue.finished(qitem);
                done();
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
CoAPBridge.prototype._push = function (pushd) {};

/**
 *  See {iotdb.bridge.Bridge#pull} for documentation.
 */
CoAPBridge.prototype.pull = function () {
    var self = this;
    if (!self.native) {
        return;
    }
};

/* --- state --- */

/**
 *  See {iotdb.bridge.Bridge#meta} for documentation.
 */
CoAPBridge.prototype.meta = function () {
    var self = this;
    if (!self.native) {
        return;
    }

    return {
        "iot:thing-id": _.id.thing_urn.unique("CoAP", self.initd.url),
        "schema:name": self.native.name || "CoAP",
    };
};

/**
 *  See {iotdb.bridge.Bridge#reachable} for documentation.
 */
CoAPBridge.prototype.reachable = function () {
    return (this.native !== null) && this._reachable;
};

/**
 *  See {iotdb.bridge.Bridge#configure} for documentation.
 */
CoAPBridge.prototype.configure = function (app) {};

/*
 *  API
 */
exports.Bridge = CoAPBridge;
