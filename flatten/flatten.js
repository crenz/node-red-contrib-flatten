module.exports = function(RED) {
    function flattenKeys(payload, o, prefix) {
        if (o == null) {
            o = payload
        }

        Object.keys(o).forEach(function(key) {
            var printkey = String(key);
            printkey = printkey.replace(/ /g, "\\ ");
            printkey = printkey.replace(/,/g, "\\,");

            var val = o[key];
            if (typeof val != "object") {
                if (prefix != null) {
                    delete o[key];
                    payload[prefix + "." + printkey] = val;
                } else {
                    delete o[key];
                    payload[printkey] = val;
                }
            } else {
                flattenKeys(payload, val, prefix == null ? printkey : prefix + "." + printkey);
                delete o[key];
            } 
    });

        return;
    }

    function FlattenNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            flattenKeys(msg.payload);
            node.send(msg);
        });
    }
    RED.nodes.registerType("flatten",FlattenNode);
}