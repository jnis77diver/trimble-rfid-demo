cordova.define("com.trimble.mcs.cordova.plugin.rfid.trmbmcsrfid", function(require, exports, module) { /*
 * Copyright (C) 2014 Trimble Navigation Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var utils = require('cordova/utils');
var TrmbMcsRfidInfo = require('./trmbmcsrfidinfo');
var TrmbMcsRfidParams = require('./trmbmcsrfidparams');
var TrmbMcsRfidTag = require('./trmbmcsrfidtag');

//-----------------------------------------------------------------------------
// Array of tag listeners
var tagListeners = [];

//-----------------------------------------------------------------------------
// Array of RFID status listeners
var statusListeners = [];

//-----------------------------------------------------------------------------
// Adds a listener to the tagListeners array
function addTagListener(id, win, fail) {
    var lstnr = {id:id, win:win, fail:fail};
    tagListeners.push(lstnr);
    return tagListeners.length;
}

//-----------------------------------------------------------------------------
// Removes a listener from the tag listeners array
function removeTagListener(id) {
    for (var ii = 0; ii < tagListeners.length; ii++) {
        if (id === tagListeners[ii].id) {
            tagListeners.splice(ii, 1);
            break;
        }
    }
    return tagListeners.length;
}

//-----------------------------------------------------------------------------
// Called from platform code when RFID Tag is successfully scanned
function tagScanned(data) {
    var lst = tagListeners.slice(0);
    var tag = new TrmbMcsRfidTag(data);
    for (var ii = 0, len = lst.length; ii < len; ii++) {
        lst[ii].win(tag);
    }
}

//-----------------------------------------------------------------------------
// Called from platform code when RFID scanning failed
function tagScanFailed(msg) {
    var lst = tagListeners.slice(0);
    for (var ii = 0, len = lst.length; ii < len; ii++) {
        lst[ii].fail && lst[ii].fail(msg);
    }
}

//-----------------------------------------------------------------------------
// Enables callbacks from the platform code when a tag is scanned
function enableRfidTagListener() {
    cordova.exec(tagScanned, tagScanFailed,
                 "trmbmcsrfid", "setRfidTagListener", []);
}

//-----------------------------------------------------------------------------
// Disables callbacks from the platform code when a tag is scanned
function disableRfidTagListener() {
    cordova.exec(function(){}, function(){},
                 "trmbmcsrfid", "clearRfidTagListener", []);
}

//-----------------------------------------------------------------------------
// Adds a listener to the statusListeners array
function addStatusListener(id, win, fail) {
    var lstnr = {id:id, win:win, fail:fail};
    statusListeners.push(lstnr);
    return statusListeners.length;
}

//-----------------------------------------------------------------------------
// Removes a listener from the status listeners array
function removeStatusListener(id) {
    for (var ii = 0; ii < statusListeners.length; ii++) {
        if (id === statusListeners[ii].id) {
            statusListeners.splice(ii, 1);
            break;
        }
    }
    return statusListeners.length;
}

//-----------------------------------------------------------------------------
// Called from platform code when RFID status changes
function statusChanged(status) {
    var lst = statusListeners.slice(0);
    for (var ii = 0, len = lst.length; ii < len; ii++) {
        lst[ii].win(status);
    }
}

//-----------------------------------------------------------------------------
// Called from platform code when RFID status failed
function statusFailed(msg) {
    var lst = tagListeners.slice(0);
    for (var ii = 0, len = lst.length; ii < len; ii++) {
        lst[ii].fail && lst[ii].fail(msg);
    }
}

//-----------------------------------------------------------------------------
// Enables callbacks from the platform code when RFID status changes
function enableRfidStatusListener() {
    cordova.exec(statusChanged, statusFailed,
                 "trmbmcsrfid", "setRfidStatusListener", []);
}

//-----------------------------------------------------------------------------
// Disables callbacks from the platform code when RFID status changes
function disableRfidStatusListener() {
    cordova.exec(function(){}, function(){},
                 "trmbmcsrfid", "clearRfidStatusListener", []);
}

//-----------------------------------------------------------------------------
// Constructor
function TrmbMcsRfid() {
    // RFID API Constants
    this.SESSION_SCOPE_PRIVATE = 0;
    this.SESSION_SCOPE_GLOBAL = 1;
    this.MEM_BANK_EPC = "EPC";
    this.MEM_BANK_TID = "TID";
    this.MEM_BANK_USER = "User";
    this.POP_SIZE_LARGE = "Large";
    this.POP_SIZE_MEDIUM = "Medium";
    this.POP_SIZE_SMALL = "Small";
    this.SCAN_MODE_MULTI_TAG = "Multi-Tag";
    this.SCAN_MODE_SINGLE_TAG = "Single-Tag";
    this.SCAN_REFRESH_MAX = 10;
    this.SCAN_REFRESH_NEVER = 0;
    this.SCAN_TIMEOUT_MAX = 300;
    this.SELECTION_ADDR_MAX = 9999;
    this.TAG_TYPE_EPCGEN2 = "EPC.Gen2";
    this.TAG_TYPE_ISO18K6B = "ISO18000.6b";
    this.TAG_TYPE_AEI = "AEI";
    this.EVENT_SCAN_STARTED = "scanStarted";
    this.EVENT_SCAN_STOPPED = "scanStopped";
}

/**
 * Initialize the RFID subsystem. This method must be called before any other
 * RFID methods.
 * 
 * @param {Function} successCallback The function to call when the RFID subsystem is ready
 * @param {Function} errorCallback The function to call if there is an error initializing. (OPTIONAL)
 * @param {long} scope Either SESSION_SCOPE_GLOBAL OR SESSION_SCOPE_PRIVATE to specify whether the
 *                     session affects the global (persistent) RFID parameters or whether the
 *                     RFID parameters for the session only affect this app. (OPTIONAL, default is SESSION_SCOPE_PRIVATE)
 */
TrmbMcsRfid.prototype.init = function(successCallback, errorCallback, scope) {
    scope = scope || this.SESSION_SCOPE_PRIVATE;
    cordova.exec(successCallback, errorCallback,
                 "trmbmcsrfid", "init", [scope]);
}

/**
 * Deinitializes the RFID subsystem. Other RFID methods must not be called after
 * calling deinit.
 *
 * @param {Function} successCallback The function to call when the RFID subsystem is deinitialized
 * @param {Function} errorCallback The function to call if there is an error deinitializing. (OPTIONAL)
 */
TrmbMcsRfid.prototype.deinit = function(successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback,
                 "trmbmcsrfid", "deinit", []);
}

/**
 * Starts an RFID scan.
 *
 * @param {Function} successCallback The function to call when the scan is started
 * @param {Function} errorCallback The function to call if there is an error starting the scan. (OPTIONAL)
 * @param {long} timeout Time (in seconds) to scan. If 0, scan continues until stopScan() is called
 *                       (OPTIONAL, default is 0).
 */
TrmbMcsRfid.prototype.startScan = function(successCallback, errorCallback, timeout) {
    var to = [];
    if (timeout)
        to[0] = timeout;
    cordova.exec(successCallback, errorCallback,
                 "trmbmcsrfid", "startScan", to);
}

/**
 * Stops an RFID scan.
 *
 * @param {Function} successCallback The function to call when the scan is stopped
 * @param {Function} errorCallback The function to call if there is an error stopping the scan. (OPTIONAL)
 */
TrmbMcsRfid.prototype.stopScan = function(successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback,
                 "trmbmcsrfid", "stopScan", []);
}

/**
 * Retrieves information about the RFID subsystem.
 *
 * @param {Function} successCallback The function to call when info has been retrieved.
 *                                   Info is passed as a TrmbMcsRfidInfo object.
 * @param {Function} errorCallback The function to call if there is an error retrieving info. (OPTIONAL)
 */
TrmbMcsRfid.prototype.getInfo = function(successCallback, errorCallback) {
    var sCb = function(data) {
        var info = new TrmbMcsRfidInfo(data);
        successCallback(info);
    }

    var eCb = function(msg) {
        errorCallback && errorCallback(msg);
    }

    cordova.exec(sCb, eCb, "trmbmcsrfid", "getInfo", []);
}

/**
 * Retrieves current RFID parameters.
 *
 * @param {Function} successCallback The function to call when parameters have been retrieved.
 *                                   Params are passed as a TrmbMcsRfidParams object.
 * @param {Function} errorCallback The function to call if there is an error retrieving params. (OPTIONAL)
 */
TrmbMcsRfid.prototype.getParameters = function(successCallback, errorCallback) {
    var sCb = function(data) {
        var params = new TrmbMcsRfidParams(data);
        successCallback(params);
    }

    var eCb = function(msg) {
        errorCallback && errorCallback(msg);
    }

    cordova.exec(sCb, eCb, "trmbmcsrfid", "getParameters", []);
}

/**
 * Sets RFID parameters. Apps should first call getParameters(), then modify the
 * desired parameters, and finally call this method to set the new parameters.
 *
 * @param {Function} successCallback The function to call when parameters have been set.
 * @param {Function} errorCallback The function to call if there is an error setting params. (OPTIONAL)
 * @param {TrmbMcsRfidParams} params The new parameters to set.
 */
TrmbMcsRfid.prototype.setParameters = function(successCallback, errorCallback, params) {
    var paramsArray = [];

    paramsArray.push(params.enabledProtocols); // enabledProtocols is an array
    paramsArray.push(params.gen2MemoryBank);
    paramsArray.push(params.includeMemory);
    paramsArray.push(params.includeReadCount);
    paramsArray.push(params.includeRssi);
    paramsArray.push(params.includeTimeStamp);
    paramsArray.push(params.populationSize);
    paramsArray.push(params.readPower);
    paramsArray.push(params.scanMaxRefreshRate);
    paramsArray.push(params.scanMode);
    paramsArray.push(params.scanTimeout);
    paramsArray.push(params.selectionAddr);
    paramsArray.push(params.selectionBank);
    paramsArray.push(params.selectionMask);
    paramsArray.push(params.selectNonMatching);

    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "setParameters", paramsArray);
}

/**
 * Writes new EPC data to the RFID tag(s) specified by a filter.
 *
 * @param {Function} successCallback The function to call when EPC has been written.
 * @param {Function} errorCallback The function to call if there is an error writing the tag(s). (OPTIONAL)
 * @param {String} params Filter used to select the tag(s) which should be written. Usually, an app simply
 *                        specifies the tagID (EPC) of a single tag to write.
 * @param {String} params epc The new data to write to the tag(s) (in ASCII hex format).
 */
TrmbMcsRfid.prototype.writeEpc = function(successCallback, errorCallback, filter, epc) {
    cordova.exec(successCallback, errorCallback,
                 "trmbmcsrfid", "writeEpc", [filter, epc]);
}

/**
 * Writes tag data to RFID tag(s) specified by a filter. Note that this method
 * is only for advanced apps that understand RFID tag formats or need to write
 * to the USER memory bank on Gen2 tags. Most apps should use writeEpc() instead.
 *
 * @param {Function} successCallback The function to call when tag data has been written.
 * @param {Function} errorCallback The function to call if there is an error writing the tag(s). (OPTIONAL)
 * @param {String} tagType The type of tag that should be written. Must be one of the TAG_TYPE_xxx constants.
 * @param {String} filter Filter used to select the tag(s) which should be written. Usually, an app simply
 *                        specifies the tagID (EPC) of a single tag to write.
 * @param {String} bank The memory bank to which the data should be written. Must be one of the MEM_BANK_xxx constants.
 * @param {long} offset The zero-relative offset (in bytes) at which to begin writing the data into a
 *                      memory bank.
 * @param {String} data The new data to write (in ASCII hex format).
 */
TrmbMcsRfid.prototype.writeTag = function(successCallback, errorCallback, tagType, filter, bank, offset, data) {
    cordova.exec(successCallback, errorCallback,
                 "trmbmcsrfid", "writeTag", [tagType, filter, bank, offset, data]);
}

/**
 * Register for asynchronous callbacks that are called when an RFID tag is
 * scanned. This method returns a UUID that must be passed to clearWatchTag()
 * in order to unregister.
 *
 * @param {Function} successCallback The function to call when an RFID tag has been scanned.
 *                                   RFID tag data is passed as a TrmbMcsRfidTag object.
 * @param {Function} errorCallback The function to call if there is an error registering the callback. (OPTIONAL)
 *
 * @return {String} UUID that must be passed to clearWatchTag() in order to unregister the callback
 */
TrmbMcsRfid.prototype.watchRfidTag = function(successCallback, errorCallback) {
    var id = utils.createUUID();
    var count = addTagListener(id, successCallback, errorCallback);
    if (count == 1)
        enableRfidTagListener();
    return id;
}

/**
 * Unregisters asynchronous tag callbacks.
 *
 * @param {String} id UUID that was returned from watchRfidTag() when callbacks were registered.
 */
TrmbMcsRfid.prototype.clearWatchTag = function(id) {
    var count = removeTagListener(id);
    if (count == 0)
        disableRfidTagListener();
}

/**
 * Register for asynchronous callbacks that are called when the RFID scan
 * status has changed. This method returns a UUID that must be passed to
 * clearWatchStatus() in order to unregister.
 *
 * @param {Function} successCallback The function to call when the RFID status has changed
 *                                   RFID scan status is passed as a String. One of
 *                                   EVENT_SCAN_STARTED or EVENT_SCAN_STOPPED.
 * @param {Function} errorCallback The function to call if there is an error registering the callback. (OPTIONAL)
 *
 * @return {String} UUID that must be passed to clearWatchStatus() in order to unregister the callback
 */
TrmbMcsRfid.prototype.watchRfidStatus = function(successCallback, errorCallback) {
    var id = utils.createUUID();
    var count = addStatusListener(id, successCallback, errorCallback);
    if (count == 1)
        enableRfidStatusListener();
    return id;
}

/**
 * Unregisters asynchronous status callbacks.
 *
 * @param {String} id UUID that was returned from watchRfidStatus() when callbacks were registered.
 */
TrmbMcsRfid.prototype.clearWatchStatus = function(id) {
    var count = removeStatusListener(id);
    if (count == 0)
        disableRfidStatusListener();
}

//-----------------------------------------------------------------------------
module.exports = new TrmbMcsRfid();


});
