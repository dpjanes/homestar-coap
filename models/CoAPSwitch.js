/*
 *  CoAPSwitch.js
 *
 *  David Janes
 *  IOTDB
 *  2015-04-10
 */

var iotdb = require("iotdb");

exports.Model = iotdb.make_model('CoAPSwitch')
    .name("CoAP Switch")
    .io("on", iotdb.boolean.on)
    .make();

exports.binding = {
    bridge: require('../CoAPBridge').Bridge,
    model: exports.Model,
};
