/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        initRfid();

        document.getElementById("start-scan").addEventListener("click", function(){
            startScan();
        });

        document.getElementById("stop-scan").addEventListener("click", function(){
            stopScan();
        });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


function initRfid() {
    trmbmcs.rfid.init(successCB, errorCB, trmbmcs.rfid.SESSION_SCOPE_LOCAL);

    function successCB() {
        trmbmcs.rfid.watchRfidTag(
            function (tagObj) {
                console.log('tagObj is ', tagObj);
                tagScanned(tagObj);
            },
            function () {
                console.log('error with watchRfid function');
                document.getElementById("demo").innerHTML = 'Error with watchRfid function';
            });

        trmbmcs.rfid.getInfo(
            function(info) {
                console.log("RFID reader serial#: " + info.readerSerialNum);

            },
            function(msg) {
                console.log("Failed to get RFID info: " + msg);
            });

    }
    function errorCB() {
        console.log('error initing TrmbMcsRfid');
        document.getElementById("demo").innerHTML = 'Error initializes RFID reader';
    }
}

function tagScanned(tagObj) {
    console.log('RFID tag scanned: ' + tagObj.tagID);
    document.getElementById("demo").innerHTML = tagObj.tagID;
}

function startScan () {
    trmbmcs.rfid.startScan(function () {
            console.log('startScan Success');
        },
        function () {
            console.log('Error with startScan function');
            document.getElementById("demo").innerHTML = 'Error with startScan function';
        }, 0);

}

function stopScan() {
    trmbmcs.rfid.stopScan(function () {
            document.getElementById("demo").innerHTML = 'scan stopped';
            //trmbmcs.rfid.deinit(function() { console.log('deinit called'); },
            //function() { console.log('failed to deinit'); });
        },
        function () {
            console.log('Error stopping Scan');
            document.getElementById("demo").innerHTML = 'Error stopping Scan';


        })
}


