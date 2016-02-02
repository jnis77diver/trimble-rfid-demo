cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.trimble.mcs.cordova.plugin.rfid/www/trmbmcsrfid.js",
        "id": "com.trimble.mcs.cordova.plugin.rfid.trmbmcsrfid",
        "pluginId": "com.trimble.mcs.cordova.plugin.rfid",
        "clobbers": [
            "trmbmcs.rfid"
        ]
    },
    {
        "file": "plugins/com.trimble.mcs.cordova.plugin.rfid/www/trmbmcsrfidinfo.js",
        "id": "com.trimble.mcs.cordova.plugin.rfid.trmbmcsrfidinfo",
        "pluginId": "com.trimble.mcs.cordova.plugin.rfid",
        "clobbers": [
            "trmbmcs.rfid.info"
        ]
    },
    {
        "file": "plugins/com.trimble.mcs.cordova.plugin.rfid/www/trmbmcsrfidparams.js",
        "id": "com.trimble.mcs.cordova.plugin.rfid.trmbmcsrfidparams",
        "pluginId": "com.trimble.mcs.cordova.plugin.rfid",
        "clobbers": [
            "trmbmcs.rfid.params"
        ]
    },
    {
        "file": "plugins/com.trimble.mcs.cordova.plugin.rfid/www/trmbmcsrfidtag.js",
        "id": "com.trimble.mcs.cordova.plugin.rfid.trmbmcsrfidtag",
        "pluginId": "com.trimble.mcs.cordova.plugin.rfid",
        "clobbers": [
            "trmbmcs.rfid.tag"
        ]
    },
    {
        "file": "plugins/com.trimble.mcs.cordova.plugin.rfid/www/trmbmcsrfidaei.js",
        "id": "com.trimble.mcs.cordova.plugin.rfid.trmbmcsrfidaei",
        "pluginId": "com.trimble.mcs.cordova.plugin.rfid",
        "clobbers": [
            "trmbmcs.rfid.aei"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.1",
    "com.trimble.mcs.cordova.plugin.rfid": "1.0.0"
}
// BOTTOM OF METADATA
});