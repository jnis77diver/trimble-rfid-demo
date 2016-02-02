<!---
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

# com.trimble.mcs.cordova.plugin.rfid

This plugin defines a global `trmbmcs.rfid` object, which provides an API
for interacting with the RFID reader.

Although the object is attached to the global scoped `trmbmcs`, it is not available until after the `deviceready` event.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(trmbmcs.rfid);
    }

## Prerequisites

To use this plugin, the Trimble MCS Android SDK must be installed via the
Android SDK manager. See the Trimble document named
Juno\_T41\_Android\_SDK\_and\_ADB\_setup.docx for SDK setup instructions.

Also, any Cordova app that uses this plugin must be configured to compile
against the Trimble MCS SDK, otherwise Java compiler errors will occur. Follow
the steps below to configure the Cordova app properly.

1. Under the Cordova app's directory, edit the following file:<br>
    <code>&lt;path/to/cordova/app&gt;/platforms/android/project.properties</code>
2. Comment out the line <code>target=android-XX</code> (where XX is a number)
   by inserting a # symbol at the beginning of the line. <b>IMPORTANT</b> This
   line must be commented out, <b>not deleted</b>. Deleting the line entirely
   will result in an error when building the app. (This oddity is necessary
   because Cordova does not include proper support for building against
   third-party SDKs).
3. Add the following line to the file:<br>
   <code>target=Trimble Navigation Limited:Trimble MCS APIs 4.4:19</code>
4. Save file and exit.

## Installation

    cordova plugin add <trmbmcs plugins>/cordova-plugin-trmbmcs-rfid

### Supported Platforms

- Android (Trimble Juno T41/5 only)

## trmbmcs.rfid

-------------------------------------------------------------------------------

### Constants

### trmbmcs.rfid.SESSION\_SCOPE\_PRIVATE
Private session scope. Changes made to RFID parameters only affect the current
RFID session. Changes are discarded after the session ends (app exits).

<hr width="25%" align=left>

### trmbmcs.rfid.SESSION\_SCOPE\_GLOBAL
Global session scope. Changes made to RFID parameters persist after the session
ends. Other RFID apps may be affected by such changes.

<hr width="25%" align=left>

### trmbmcs.rfid.MEM\_BANK\_EPC
EPC Gen2 memory bank

<hr width="25%" align=left>

### trmbmcs.rfid.MEM\_BANK\_TID
TID Gen2 memory bank

<hr width="25%" align=left>

### trmbmcs.rfid.MEM\_BANK\_USER
USER Gen2 memory bank
<hr width="25%" align=left>

### trmbmcs.rfid.POP\_SIZE\_LARGE
Large tag population size

<hr width="25%" align=left>

### trmbmcs.rfid.POP\_SIZE\_MEDIUM
Medium tag population size

<hr width="25%" align=left>

### trmbmcs.rfid.POP\_SIZE\_SMALL
Small tag population size

<hr width="25%" align=left>

### trmbmcs.rfid.SCAN\_MODE\_MULTI\_TAG
Multi-tag mode. Multiple tags may be discovered during a single scan.

<hr width="25%" align=left>

### trmbmcs.rfid.SCAN\_MODE\_SINGLE\_TAG
Single-tag mode. Only a single tag may be discovered during a scan.

<hr width="25%" align=left>

### trmbmcs.rfid.SCAN\_REFRESH\_MAX
Maximum value for scan refresh rate parameter

<hr width="25%" align=left>

### trmbmcs.rfid.SCAN\_REFRESH\_NEVER
Scan refresh rate that prevents duplicate tags from being reported during a
scan.

<hr width="25%" align=left>

### trmbmcs.rfid.SCAN\_TIMEOUT\_MAX
Maximum value for the scan timeout parameter.

<hr width="25%" align=left>

### trmbmcs.rfid.SELECTION\_ADDR\_MAX
Maximum value for the selection address parameter.

<hr width="25%" align=left>

### trmbmcs.rfid.TAG\_TYPE\_EPCGEN2
Gen2 tag type

<hr width="25%" align=left>

### trmbmcs.rfid.TAG\_TYPE\_ISO18K6B
ISO18000.6b tag type

<hr width="25%" align=left>

### trmbmcs.rfid.TAG\_TYPE\_AEI
AEI tag type

<hr width="25%" align=left>

### trmbmcs.rfid.EVENT\_SCAN\_STARTED
'Scan started' event

<hr width="25%" align=left>

### trmbmcs.rfid.EVENT\_SCAN\_STOPPED
'Scan stopped' event

-------------------------------------------------------------------------------

### Methods
- trmbmcs.rfid.init
- trmbmcs.rfid.deinit
- trmbmcs.rfid.startScan
- trmbmcs.rfid.stopScan
- trmbmcs.rfid.getInfo
- trmbmcs.rfid.getParameters
- trmbmcs.rfid.setParameters
- trmbmcs.rfid.writeEpc
- trmbmcs.rfid.writeTag
- trmbmcs.rfid.watchRfidTag
- trmbmcs.rfid.clearWatchTag
- trmbmcs.rfid.watchRfidStatus
- trmbmcs.rfid.clearWatchStatus

-------------------------------------------------------------------------------

## init
Initializes the RFID subsystem. This method must be called and its success
callback invoked before any other RFID methods are called.

__trmbmcs.rfid.init(successCallback, errorCallback, scope)__

### Parameters
- __successCallback__:  The function to call when the RFID subsystem is ready.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error initializing.
                      _(Function)_ [Optional]
- __scope__: Either `SESSION_SCOPE_GLOBAL` or `SESSION_SCOPE_PRIVATE`.
             Specifies whether the session affects the global (persistent) RFID
             parameters or whether the RFID parameters for the session only
             affect this app. _(Number)_ [Optional, default is
             `SESSION_SCOPE_PRIVATE`]

### Example
    trmbmcs.rfid.init(function() {
                          // Success
                      },
                      function(msg) {
                          console.log("RFID init failed: " + msg);
                      },
                      SESSION_SCOPE_PRIVATE);

-------------------------------------------------------------------------------

## deinit
Deinitializes the RFID subsystem. Other RFID methods must not be called
after calling deinit.

__trmbmcs.rfid.deinit(successCallback, errorCallback)__

### Parameters
- __successCallback__:  The function to call when the RFID subsystem is
                        deinitialized. _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error deinitializing.
                      _(Function)_ [Optional]
	
### Example
    trmbmcs.rfid.deinit(function() {
                            // Success
                        },
                        function(msg) {
                            console.log("RFID deinit failed: " + msg);
                        });

-------------------------------------------------------------------------------

## startScan
Starts an RFID scan. 

__trmbmcs.rfid.startScan(successCallback, errorCallback, timeout)__

### Parameters
- __successCallback__:  The function to call when the scan has started.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error starting the
                      scan. _(Function)_ [Optional]
- __timeout__: The time (in seconds) to scan. If 0, scan continues until
               stopScan() is called. _(Number)_ [OPTIONAL, default is 0]

### Example
    trmbmcs.rfid.startScan(
                        function() {
                            console.log("Scan started");
                        },
                        function(msg) {
                            console.log("Failed to start scan: " + msg);
                        });

-------------------------------------------------------------------------------

## stopScan
Stops an RFID scan. 

__trmbmcs.rfid.startScan(successCallback, errorCallback, timeout)__

### Parameters
- __successCallback__:  The function to call when the scan has stopped.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error stopping the
                      scan. _(Function)_ [Optional]
	
### Example
    trmbmcs.rfid.stopScan(
                        function() {
                            console.log("Scan stopped");
                        },
                        function(msg) {
                            console.log("Failed to stop scan: " + msg);
                        });

-------------------------------------------------------------------------------

## getInfo
Retrieves information about the RFID subsystem.

__trmbmcs.rfid.getInfo(successCallback, errorCallback)__

### Parameters
- __successCallback__:  The function to call when info has been retrieved.
                        Info is passed as a trmbmcs.rfid.info object.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving
                      RFID info. _(Function)_ [Optional]
	
### Example
    trmbmcs.rfid.getInfo(
                        function(info) {
                            console.log("RFID reader serial#: " + info.readerSerialNum);
                        },
                        function(msg) {
                            console.log("Failed to get RFID info: " + msg);
                        });

-------------------------------------------------------------------------------

## getParameters
Retrieves current RFID parameters.

__trmbmcs.rfid.getParameters(successCallback, errorCallback)__

### Parameters
- __successCallback__:  The function to call when the parameters have been
                        retrieved. Parameters are passed to the callback as a
                        trmbmcs.rfid.params object.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving
                      parameters. _(Function)_ [Optional]
	
### Example
    trmbmcs.rfid.getParameters(
                        function(params) {
                            console.log("RFID param 'readPower': " + params.readPower);
                        },
                        function(msg) {
                            console.log("Failed to get RFID parameters: " + msg);
                        });

-------------------------------------------------------------------------------

## setParameters
Sets RFID parameters. Apps should first call getParameters(), then modify the
desired parameters, and finally call this method to set the new parameters.

__trmbmcs.rfid.setParameters(successCallback, errorCallback, params)__

### Parameters
- __successCallback__:  The function to call when the parameters have been set.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error setting.
                      _(Function)_ [Optional]
- __params__: the new parameters to set _(trmbmcs.rfid.params)_ [Required]

### Example
    trmbmcs.rfid.getParameters(
        function(params) {
            // Modify a few parameters
            params.includeMemory = true;
            params.gen2MemoryBank = trmbmcs.rfid.MEM_BANK_USER;
            params.scanTimeout = 0;

            trmbmcs.rfid.setParameters(
                        function() {
                            console.log("New params set");
                        },
                        function(msg) {
                            console.log("Failed to set new params: " + msg);
                        },
                        params);
        },
        function(msg) {
            console.log("Failed to get RFID parameters: " + msg);
        });


-------------------------------------------------------------------------------

## writeEpc
Writes new EPC data to the RFID tag(s) specified by a filter.

__trmbmcs.rfid.writeEpc(successCallback, errorCallback, filter, epc)__

### Parameters
- __successCallback__:  The function to call when the EPC has been written.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error writing.
                      _(Function)_ [Optional]
- __filter__:  Filter used to select the tag(s) which should be written. Usually, an app simply
               specifies the tagID (EPC) of a single tag to write.
               _(String)_ [Required]
- __epc__:  The new data to write to the tag(s) (in ASCII hex format).
            _(String)_ [Required]

### Example
    trmbmcs.rfid.writeEpc(
                        function() {
                            console.log("RFID tag successfully written");
                        },
                        function(msg) {
                            console.log("Failed to write RFID tag: " + msg);
                        },
                        "5014",       // old tag ID (EPC)
                        "22818533");  // new tag ID (EPC)

-------------------------------------------------------------------------------

## writeTag
Writes tag data to RFID tag(s) specified by a filter. Note that this method
is only for advanced apps that understand RFID tag formats or need to write
to the USER memory bank on Gen2 tags. Most apps should use writeEpc() instead.

__trmbmcs.rfid.writeTag(successCallback, errorCallback, tagType, filter, bank, offset, data)__

### Parameters
- __successCallback__:  The function to call when the tag data has been written.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error writing.
                      _(Function)_ [Optional]
- __tagType__:  The type of tag that should be written. Must be one of the
                TAG_TYPE_xxx constants.
                _(String)_ [Required]
- __filter__:  Filter used to select the tag(s) which should be written.
               Usually, an app simply specifies the tagID (EPC) of a single
               tag to write.
               _(String)_ [Required]
- __bank__:  The memory bank to which the data should be written. Must be one
             of the MEM_BANK_xxx constants.
             _(String)_ [Required]
- __offset__:  The zero-relative offset (in bytes) at which to begin writing
               the data into a memory bank. _(Number)_ [Required]
               _(String)_ [Required]
- __data__:  The new data to write (in ASCII hex format).
            _(String)_ [Required]

### Example
    trmbmcs.rfid.writeTag(
                        function() {
                            console.log("RFID tag successfully written");
                        },
                        function(msg) {
                            console.log("Failed to write RFID tag: " + msg);
                        },
                        trmbmcs.rfid.TAG_TYPE_EPCGEN2,
                        "5014",       // tag ID (EPC) of the tag to write
                        trmbmcs.rfid.MEM_BANK_USER,
                        0,
                        "0F22818533");  // new data to write

-------------------------------------------------------------------------------

## watchRfidTag
Register for asynchronous callbacks that are called when an RFID tag is
scanned. This method returns a UUID that must be passed to `clearWatchTag()`
in order to unregister.

__trmbmcs.rfid.watchRfidTag(successCallback, errorCallback)__

### Parameters
- __successCallback__:  The function to call when an RFID tag has been scanned.
                        RFID tag data is passed as a trmbmcs.rfid.tag object.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error registering the
                      callback. _(Function)_ [Optional]

### Returns
_(String)_:  UUID that must be passed to `clearWatchTag()` in order to unregister
             the callback

### Example
    var watchId;
    ...
    watchId = trmbmcs.rfid.watchRfidTag(
                        function(tag) {
                            // Success
                            console.log("RFID tag scanned: " + tag.tagID);
                        },
                        function(msg) {
                            console.log("Failed to register for RFID events: " + msg);
                        });

-------------------------------------------------------------------------------

## clearWatchTag
Unregisters asynchronous tag callbacks.

__trmbmcs.rfid.clearWatchTag(watchId)__

### Parameters
- __watchId__:  UUID that was returned from <code>watchRfidTag()</code> when
                callbacks were registered. _(String)_ [Required]

### Example
    trmbmcs.rfid.clearWatchTag(watchId);

-------------------------------------------------------------------------------

## watchRfidStatus
Register for asynchronous callbacks that are called when the RFID scanning
status changes. Registering for this callback allows apps to receive
notifications when RFID scanning is started or stopped. This method returns
a UUID that must be passed to `clearWatchStatus()` in order to unregister.

__trmbmcs.rfid.watchRfidStatus(successCallback, errorCallback)__

### Parameters
- __successCallback__:  The function to call when the RFID scanning status has
                        changed.
                        Scanning status is passed to the callback as a String,
                        either `EVENT_SCAN_STARTED` or `EVENT_SCAN_STOPPED`.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error registering the
                      callback. _(Function)_ [Optional]

### Returns
_(String)_:  UUID that must be passed to clearWatchStatus() in order to unregister
             the callback

### Example
    var watchId;
    ...
    watchId = trmbmcs.rfid.watchRfidStatus(
                        function(status) {
                            // Success
                            if (status === trmbmcs.rfid.EVENT_SCAN_STARTED)
                                console.log("RFID scanning started");
                            else if (status === trmbmcs.rfid.EVENT_SCAN_STOPPED)
                                console.log("RFID scanning stopped");
                        },
                        function(msg) {
                            console.log("Failed to register for RFID status events: " + msg);
                        });

-------------------------------------------------------------------------------

## clearWatchStatus
Unregisters asynchronous status callbacks.

__trmbmcs.rfid.clearWatchStatus(watchId)__

### Parameters
- __watchId__:  UUID that was returned from <code>clearWatchStatus()</code> when
                callbacks were registered. _(String)_ [Required]

### Example
    trmbmcs.rfid.clearWatchStatus(watchId);

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

## trmbmcs.rfid.info
An RFID info object is obtained by calling `trmbmcs.rfid.getInfo()`. The object
contains various information about the RFID subsystem and RFID hardware.

<hr width="25%" align=left>

### Properties

<hr width="25%" align=left>

### appInterfaceLevel _(Number)_
The application interface level

<hr width="25%" align=left>

### powerMax _(Number)_
Maximum allowed value (in dB) for RFID reader read power setting

<hr width="25%" align=left>

### powerMin _(Number)_
Minimum allowed value (in dB) for RFID reader read power setting

<hr width="25%" align=left>

### readerFirmwareRev _(String)_
Revision number of the RFID reader firmware

<hr width="25%" align=left>

### readerHardwareRev _(String)_
Hardware revision of RFID reader hardware

<hr width="25%" align=left>

### readerModel _(String)_
Model name of the RFID reader hardware

<hr width="25%" align=left>

### readerSerialNum _(String)_
Serial number of RFID reader hardware

<hr width="25%" align=left>

### readerType _(String)_
Type of RFID reader hardware

<hr width="25%" align=left>

### readerVendor _(String)_
Vendor name of the RFID reader hardware

<hr width="25%" align=left>

### region _(String)_
Region for the RFID reader, which controls the radio frequency at which the
reader operates
<hr width="25%" align=left>

### supportedProtocols _(String[])_
Array of Strings that indicates the tag protocols supported by the RFID reader



-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

## trmbmcs.rfid.params
An RFID parameters object is obtained by calling `trmbmcs.rfid.getParameters()`.
The object contains various RFID parameters that can be modified and sent to the
RFID reader by calling `trmbmcs.rfid.setParameters()`.

<hr width="25%" align=left>

### Properties

<hr width="25%" align=left>

### enabledProtocols _(String[])_
Array of Strings that indicates the RFID tag protocols that are currently
enabled

<hr width="25%" align=left>

### gen2MemoryBank _(String)_
Selects the memory bank from which to read during tag scan operations.
Either `trmbmcs.rfid.MEM_BANK_EPC`, `trmbmcs.rfid.MEM_BANK_TID`, or
`trmbmcs.rfid.MEM_BANK_USER`

<hr width="25%" align=left>

### includeMemory _(Boolean)_
Determines if tag memory bank contents are read along with the tag ID whenever a tag is scanned

<hr width="25%" align=left>

### includeReadCount _(Boolean)_
Determines if the read count is reported whenever a tag is scanned

<hr width="25%" align=left>

### includeRssi _(Boolean)_
Determines if the RSSI (signal strength) is reported whenever a tag is scanned

<hr width="25%" align=left>

### includeTimeStamp _(Boolean)_
Determines if a timestamp is reported whenever a tag is scanned

<hr width="25%" align=left>

### populationSize _(String)_
Provides the RFID reader with a hint on the approximate number of tags in
range so that it can optimize scan operations.
Either `trmbmcs.rfid.POP_SIZE_LARGE`, `trmbmcs.rfid.POP_SIZE_MEDIUM`, or
`trmbmcs.rfid.POP_SIZE_LARGE`

<hr width="25%" align=left>

### readPower _(Number)_
Value (in dB) of RFID reader read power setting

<hr width="25%" align=left>

### scanMaxRefreshRate _(Number)_
Number of times per second that duplicate tags are reported. Set to 
`trmbmcs.rfid.SCAN_REFRESH_NEVER` to prevent duplicate tags from being
reported.

<hr width="25%" align=left>

### scanMode _(String)_
Determines if the reader scans one tag per scan or multiple tags per scan.
Either `trmbmcs.rfid.SCAN_MODE_MULTI_TAG` or
`trmbmcs.rfid.SCAN_MODE_SINGLE_TAG`

<hr width="25%" align=left>

### scanTimeout _(Number)_
The time (in seconds) that the reader should perform a scan before timing out
and stopping the scan. Set to zero to indicate no timeout (reader scans until
stopped).

<hr width="25%" align=left>

### selectionAddr _(Number)_
Specifies the offset within the selected memory bank at which to begin matching
against memory contents when performing filtered tag scans

<hr width="25%" align=left>

### selectionBank _(String)_
The memory bank to which the selectionMask should be applied when performing
filtered tag scans. Filtered tag scans are controlled using the selectionMask, 
selectionBank, selectionAddr, and and selectNonMatching settings. EPC.Gen2
RFID tags have four separate memory banks. One is reserved, but the other
three--the EPC, TID, and User data banks--are available for access by
applications. By default, tag scans return the EPC component of the EPC bank
and, optionally, the contents of one of the other memory banks. The
selectionBank setting selects which of those other memory banks to read and
compare against during filtered tag scans. Note that if the EPC memory bank
is specified, the entire contents of the EPC memory bank will be read,
including the PC word.

Either `trmbmcs.rfid.MEM_BANK_EPC`, `trmbmcs.rfid.MEM_BANK_TID`, or
`trmbmcs.rfid.MEM_BANK_USER`

<hr width="25%" align=left>

### selectionMask _(String)_
The tag-matching mask to apply when performing filtered tag scans. Filtered
tag scans are controlled using the selectionMask, selectionBank, selectionAddr,
and selectNonMatching settings. Whenever selectionMask is set to a non-null
value, the reader matches bytes in the selectionMask against the bytes in the
tag memory bank specified by selectionBank, with matching beginning at the
offset specified by selectionAddr. If the boolean value selectNonMatching is
true, the scan selects only tags that do not match the specified mask.
Note that if the EPC memory bank is specified, the entire contents of the EPC
memory bank will be read, including the PC word.

<hr width="25%" align=left>

### selectNonMatching _(Boolean)_
Specifies whether filtered tag scans should return those tags that match the
selectionMask (false) or those that do not match selectionMask (true). Filtered
tag scans are controlled using the selectionMask, selectionBank, selectionAddr,
and selectNonMatching settings.


-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

## trmbmcs.rfid.tag
An RFID tag object is obtained through the callback set up by calling
`trmbmcs.rfid.watchRfid()`. The object contains scanned data and meta data
from an RFID tag.

<hr width="25%" align=left>

### Properties

<hr width="25%" align=left>

### tagID
Primary tag data. For Gen2 tags, this represents the EPC

<hr width="25%" align=left>

### memory
Contents of the requested memory bank

<hr width="25%" align=left>

### tagType
Type of RFID scanned.
Either `trmbmcs.rfid.TAG_TYPE_EPCGEN2`, `trmbmcs.rfid.TAG_TYPE_ISO18K6B`,
or `trmbmcs.rfid.TAG_TYPE_AEI`.

<hr width="25%" align=left>

### rssi
Signal strength (in dB) observed when reading the RFID tag

<hr width="25%" align=left>

### readCount
Number of times the tag has been scanned by the reader during this scan

<hr width="25%" align=left>

### timeStamp
Timestamp (milliseconds) for the tag scan

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

## trmbmcs.rfid.aei
This is a helper class for decoding the data contained in AEI tags. Constants,
definitions, and formats are based on the specification published by the
Association of American Railroads, named "Manual of Standards and Recommended
Practices - Section K-III - Wayside Electronics and Mobile Worker
Communications Architecture - August 2014".

The primary function in this class is `decodeTagData()` which decodes data and
returns a trmbmcs.rfid.aei object that can be queried for individual AEI data
fields.

<hr width="25%" align=left>

### Methods
- trmbmcs.rfid.aei.decodeTagData

<hr width="25%" align=left>

## decodeTagData
Decodes the specified AEI tag ID and obtains an object containing the
decoded fields of the tag. The availability of specific AEI fields in
the returned object depends on the `equipmentGroup` field. The equipment group
should be inspected first, before attempting to access any equipment-specific
fields (such as car number, platform ID, etc.).

__trmbmcs.rfid.aei.decodeTagData(successCallback, errorCallback, tagData)__

### Parameters
- __successCallback__:  The function to call when the AEI tag has been decoded.
                        Decoded AEI tag is passed as a trmbmcs.rfid.aei object.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error decoding tag
                      data.
                      _(Function)_ [Optional]
- __tagData__: AEI tag data to decode, as obtained from a scan
              _(String)_ [Required]

### Example
    trmbmcs.rfid.aei.decodeTagData(
                        function(aeiTag) {
                            // Success
                            if (aeiTag.equipmentGroup === trmbmcs.rfid.aei.EquipmentGroup.RAILCAR) {
                                console.log("Railcar tag scanned");
                                console.log("Railcar initial: " + aeiTag.equipmentInitial);
                                console.log("Railcar number: " + aeiTag.carNumber);
                            }
                            else if (aeiTag.equipmentGroup === trmbmcs.rfid.aei.EquipmentGroup.LOCOMOTIVE) {
                                console.log("Locomotive tag scanned");
                                console.log("Locomotive initial: " + aeiTag.equipmentInitial);
                                console.log("Locomotive number: " + aeiTag.locomotiveNumber);
                            }
                        },
                        function(msg) {
                            console.log("Decode AEI tag failed: " + msg);
                        },
                        tagData);

<hr width="25%" align=left>

### Properties
When an object is retrieved by a call to `decodeTagData()`, it will contain,
at a minimum, the following properties. Other properties may or may not be
present based on the equipment group code.

### equipmentGroup _(Number)_
Equipment group that indicates the general type of equipment. The value of
this field determines which equipment-specific fields are available.

See: <code>trmbmcs.rfid.aei.EquipmentGroup</code>

### equipmentInitial _(String)_
Initial (mark) stored in the tag; up to four letters

### tagType _(Number)_
AEI tag type that indicates the configuration, capability, and memory size
of the tag

See: <code>trmbmcs.rfid.aei.TagType</code>

### dataFormat _(Number)_
Data format code

See: <code>trmbmcs.rfid.aei.DataFormat</code>

### frameMarker _(Number)_
Frame marker field

### security _(Number)_
Security field

### checksumValid _(Boolean)_
Indicates if the checksums read from the tag are valid

<hr width="25%" align=left>


### Equipment-specific properties
Equipment-specific properties are available based on the value of the
`equipmentGroup` property. Applications should inspect `equipmentGroup` before
accessing other properties.

See: <code>trmbmcs.rfid.aei.EquipmentGroup</code>

<hr width="25%" align=left>


### RAILCAR

### carNumber _(Number)_
Railcar number

### side _(Number)_
The side of the equipment (left or right) on which the tag is mounted

See: <code>trmbmcs.rfid.aei.SideIndicator</code>

### length _(Number)_
Exterior length

### numberOfAxles _(Number)_
Number of axles

### bearingType _(Number)_
Bearing type

See: <code>trmbmcs.rfid.aei.BearingType</code>

### platformId _(Number)_
Platform identifier

See: <code>trmbmcs.rfid.aei.PlatformId</code>

### spare _(Number)_
Spare data

<hr width="25%" align=left>


### LOCOMOTIVE

### locomotiveNumber _(Number)_
Locomotive number

### side _(Number)_
The side of the equipment (left or right) on which the tag is mounted

See: <code>trmbmcs.rfid.aei.SideIndicator</code>

### length _(Number)_
Exterior length

### numberOfAxles _(Number)_
Number of axles

### bearingType _(Number)_
Bearing type

See: <code>trmbmcs.rfid.aei.BearingType</code>

### spare _(Number)_
Spare data

<hr width="25%" align=left>


### END-OF-TRAIN (EOT) DEVICE

### eotNumber _(Number)_
EOT Number

### side _(Number)_
The side of the equipment (left or right) on which the tag is mounted

See: <code>trmbmcs.rfid.aei.SideIndicator</code>

### eotType _(Number)_
EOT Type

See: <code>trmbmcs.rfid.aei.EotType</code>

### spare _(Number)_
Spare data

<hr width="25%" align=left>


### CHASSIS

### chassisNumber _(Number)_
Chassis number

### typeDetail _(Number)_
Chassis type detail

See: <code>trmbmcs.rfid.aei.ChassisTypeDetail</code>

### height _(Number)_
Height

### maxLength _(Number)_
Maximum length

### minLength _(Number)_
Minimum length

### numLengths _(Number)_
Number of lengths in which the chassis can be configured

### tandemWidth _(Number)_
Tandem width code

See: <code>trmbmcs.rfid.aei.Width</code>

### tareWeight _(Number)_
Tare weight

### axleSpacing _(Number)_
Axle spacing

### forwardExtension _(Number)_
Forward extension

### kingpinSetting _(Number)_
Kingpin setting

### runningGearLoc _(Number)_
Running gear location

### spare _(Number)_
Spare data

<hr width="25%" align=left>


### RAILCAR\_COVER

### equipmentNumber _(Number)_
Equipment number

### coverType _(Number)_
Cover type

See: <code>trmbmcs.rfid.aei.CoverType</code>

### assocRailcarInitial _(String)_
Initial (mark) of the associated railcar

### assocRailcarNum _(Number)_
Car number of the associated railcar

### length _(Number)_
Length

### dateBuilt _(Number)_
Date built code

See: <code>trmbmcs.rfid.aei.DateBuilt</code>

### fitting _(Number)_
Fitting

See: <code>trmbmcs.rfid.aei.Fitting</code>

### insulation _(Number)_
Insulation indicator

See: <code>trmbmcs.rfid.aei.Insulation</code>

### side _(Number)_
The side of the equipment (left or right) on which the tag is mounted

<hr width="25%" align=left>


### TRAILER

### trailerNumber _(String)_
Trailer number

### typeDetail _(Number)_
Trailer type detail

See: <code>trmbmcs.rfid.aei.TrailerTypeDetail</code>

### height _(Number)_
Height

### length _(Number)_
Length

### width _(Number)_
Width code

See: <code>trmbmcs.rfid.aei.Width</code>

### tandemWidth _(Number)_
Tandem width

See: <code>trmbmcs.rfid.aei.Width</code>

### tareWeight _(Number)_
Tare weight

### forwardExtension _(Number)_
Forward extension

### spare _(Number)_
Spare data

<hr width="25%" align=left>


### INTERMODAL\_CONTAINER

### idNumber _(Number)_
Identification number for the container

### containerType _(Number)_
Container type

### height _(Number)_
Height

### length _(Number)_
Length

### width _(Number)_
Width

### tareWeight _(Number)_
Tare weight

### maxGrossWeight _(Number)_
Maximum Gross Weight

### checkDigit _(Number)_
Check digit

### spare _(Number)_
Spare data

<hr width="25%" align=left>


### PASSIVE\_ALARM\_TAG

### equipmentNumber _(Number)_
Equipment number

### side _(Number)_
The side of the equipment (left or right) on which the tag is mounted

### length _(Number)_
Length

### alarmCode _(Number)_
Alarm code

See: <code>trmbmcs.rfid.aei.Alarm</code>

### numberOfAxles _(Number)_
Number of axles

### bearingType _(Number)_
Bearing type

See: <code>trmbmcs.rfid.aei.BearingType</code>

### platformId _(Number)_
Platform identifier

See: <code>trmbmcs.rfid.aei.PlatformId</code>

### spare _(Number)_
Spare data

<hr width="25%" align=left>


### GENERATOR\_SET

### gensetNumber _(Number)_
Generator set number

### tareWeight _(Number)_
Tare weight

### fuelCapacity _(Number)_
Fuel capacity code

See: <code>trmbmcs.rfid.aei.FuelCapacity</code>

### mounting _(Number)_
Mounting code

See: <code>trmbmcs.rfid.aei.Mounting</code>

### voltage _(Number)_
Voltage code

See: <code>trmbmcs.rfid.aei.Voltage</code>

### spare _(Number)_
Spare data

<hr width="25%" align=left>


### MULTIMODAL\_EQUIPMENT

### equipmentNumber _(Number)_
Equipment number

### side _(Number)_
The side of the equipment (left or right) on which the tag is mounted

See: <code>trmbmcs.rfid.aei.SideIndicator</code>

### typeDetail _(Number)_
Multimodal type detail

See: <code>trmbmcs.rfid.aei.MultiModalTypeDetail</code>

### length _(Number)_
Exterior length

### numberOfAxles _(Number)_
Number of axles

### bearingType _(Number)_
Bearing type

See: <code>trmbmcs.rfid.aei.BearingType</code>

### platformId _(Number)_
Platform identifier

See: <code>trmbmcs.rfid.aei.PlatformId</code>

### spare _(Number)_
Spare data

-------------------------------------------------------------------------------

### AEI Constants
The AEI spec defines numerous constants that each of the fields may contain.
For convenience, this API includes instances of such constants. These values
may be used by applications instead of hard-coding numeric values.

Each of the classes below is an inner class to the `trmbmcs.rfid.aei` class.
All properties are Numbers, unless otherwise noted. To obtain a human-friendly
name for the property, call the class's `getDescription()` and specify the
desired property.

<hr width="25%" align=left>

## trmbmcs.rfid.aei.EquipmentGroup

#### - OTHER
#### - RAILCAR\_COVER
#### - TRAIN\_NUM\_TAG
#### - LOCOMOTIVE
#### - END\_OF\_TRAIN_DEVICE
#### - GENERATOR\_SET
#### - INTERMODAL\_CONTAINER
#### - MARKER\_TAGS
#### - TRACTOR
#### - STRAIGHT\_TRUCK
#### - RAILCAR
#### - DOLLY
#### - TRAILER
#### - MULTIMODAL\_EQUIPMENT
#### - CHASSIS
#### - PASSIVE\_ALARM\_TAG
#### - EXPERIMENTAL

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified equipment group code

__trmbmcs.rfid.aei.EquipmentGroup.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required] _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.EquipmentGroup.RAILCAR;
    trmbmcs.rfid.aei.EquipmentGroup.getDescription(
                      function(desc) {
                          // Success
                          console.log("Equip Group " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.TagType

#### - LT\_128\_BITS
#### - GTE\_128\_BITS
#### - MULTI\_FRAME
#### - MULTI\_FORMAT

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified tag type code

__trmbmcs.rfid.aei.EquipmentGroup.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.TagType.GTE_128_BITS;
    trmbmcs.rfid.aei.TagType.getDescription(
                      function(desc) {
                          // Success
                          console.log("Tag Type " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.DataFormat

#### - SIX\_BIT\_ASCII
#### - REFRIG\_OR\_LOCO\_NOT\_ID
#### - REFRIG\_OR\_LOCO\_ID
#### - RECORDER\_OR\_ALARM\_NOT\_ID
#### - RECORDER\_ID
#### - ALARM\_ID
#### - TAG\_APP
#### - TOLL\_ROAD
#### - NON\_STANDARD

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified data format code

__trmbmcs.rfid.aei.DataFormat.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.DataFormat.SIX_BIT_ASCII;
    trmbmcs.rfid.aei.DataFormat.getDescription(
                      function(desc) {
                          // Success
                          console.log("Data Format " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.SideIndicator

#### - LEFT
#### - RIGHT

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified side indicator

__trmbmcs.rfid.aei.SideIndicator.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.SideIndicator.RIGHT;
    trmbmcs.rfid.aei.SideIndicator.getDescription(
                      function(desc) {
                          // Success
                          console.log("Side indicator " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.BearingType

#### - PLAIN
#### - ROLLER
#### - ROLLER\_INBOARD
#### - ROLLER\_BUCKEYE
#### - ROLLER\_PLAIN\_HOUSING
#### - ROLLER\_CYLINDRICAL\_OIL\_FILLED

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified bearing type

__trmbmcs.rfid.aei.BearingType.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.BearingType.ROLLER_INBOARD;
    trmbmcs.rfid.aei.BearingType.getDescription(
                      function(desc) {
                          // Success
                          console.log("Bearing type " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.PlatformId

#### - ALL
#### - A
#### - B
#### - C
#### - D
#### - E
#### - F
#### - G
#### - H
#### - I
#### - J
#### - K
#### - L
#### - M
#### - N
#### - O

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified platform ID

__trmbmcs.rfid.aei.PlatformId.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.PlatformId.J;
    trmbmcs.rfid.aei.PlatformId.getDescription(
                      function(desc) {
                          // Success
                          console.log("Platform ID " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.Width

#### - NOT\_USED
#### - LT\_96IN
#### - BETWEEN\_96IN\_TO\_102IN
#### - GT\_102IN

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified width code

__trmbmcs.rfid.aei.Width.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.Width.LT_96IN;
    trmbmcs.rfid.aei.Width.getDescription(
                      function(desc) {
                          // Success
                          console.log("Width " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.TrailerTypeDetail

#### - BULK\_HOPPER
#### - MECH\_FRIDGE\_UNDER
#### - GENERAL\_SVC\_DRY\_VAN
#### - FLAT\_BED
#### - OPEN\_TOP
#### - MECH\_FRIDGE\_NOSE
#### - RAIL\_TRAILER\_NO\_RAIL\_WHEELS
#### - INSULATED
#### - DROP\_FRAME
#### - STRAIGHT\_FLOOR
#### - RAIL\_TRAILER\_WITH\_RAIL\_WHEELS
#### - NOT\_USED

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified trailer type

__trmbmcs.rfid.aei.TrailerTypeDetail.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.TrailerTypeDetail.LT_96IN;
    trmbmcs.rfid.aei.TrailerTypeDetail.getDescription(
                      function(desc) {
                          // Success
                          console.log("Trailer Type " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.ChassisTypeDetail

#### - EXTENDIBLE
#### - STRAIGHT
#### - COMBO
#### - BEAM\_SLIDER
#### - RAIL\_CHASSIS\_WITH\_RAIL\_WHEELS
#### - RAIL\_CHASSIS\_NO\_RAIL\_WHEELS
#### - FIXED\_LEN\_GOOSENECK
#### - PLATFORM
#### - DROP\_FRAME
#### - TRI\_PURPOSE
#### - OTHER\_NOT\_USED

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified chassis type

__trmbmcs.rfid.aei.ChassisTypeDetail.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.ChassisTypeDetail.BEAM_SLIDER;
    trmbmcs.rfid.aei.ChassisTypeDetail.getDescription(
                      function(desc) {
                          // Success
                          console.log("Chassis Type " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.CoverType

#### - ONE\_PIECE\_FIBERGLASS
#### - ONE\_PIECE\_STEEL
#### - HIGH\_PROFILE\_STEEL
#### - FIRST\_ON\_FIBERGLASS\_INT\_RIB
#### - FIRST\_OFF\_FIBERGLASS\_INT\_RIB
#### - FIRST\_ON\_FIBERGLASS\_EXT\_RIB
#### - FIRST\_OFF\_FIBERGLASS\_EXT\_RIB
#### - FIRST\_ON\_FIBERGLASS\_HIGH\_PROFILE
#### - FIRST\_OFF\_FIBERGLASS\_HIGH\_PROFILE
#### - FIRST\_ON\_STEEL
#### - FIRST\_OFF_STEEL
#### - HORIZONTALLY\_TAGGED
#### - OTHER

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified cover type

__trmbmcs.rfid.aei.CoverType.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.CoverType.HIGH_PROFILE_STEEL;
    trmbmcs.rfid.aei.CoverType.getDescription(
                      function(desc) {
                          // Success
                          console.log("Cover Type " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.EotType

#### - EOT
#### - EOT\_ALT1
#### - EOT\_ALT2
#### - MARKER\_LIGHT

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified end-of-train type

__trmbmcs.rfid.aei.EotType.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.EotType.EOT;
    trmbmcs.rfid.aei.EotType.getDescription(
                      function(desc) {
                          // Success
                          console.log("EOT Type " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.DateBuilt

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified date code

__trmbmcs.rfid.aei.DateBuilt.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = 6;
    trmbmcs.rfid.aei.DateBuilt.getDescription(
                      function(desc) {
                          // Success
                          console.log("Date Built " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.Insulation

#### - NOT\_INSULATED
#### - INSULATED

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified insulation code

__trmbmcs.rfid.aei.Insulation.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.Insulation.INSULATED;
    trmbmcs.rfid.aei.Insulation.getDescription(
                      function(desc) {
                          // Success
                          console.log("Insulation " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.Fitting

#### - C\_HOOKS
#### - CLAMP\_DEVICE
#### - ELECTRIC\_COIL\_GRAB
#### - MECHANICAL\_COIL\_GRAB
#### - MULTIPLE\_CAPABILITY
#### - OTHER

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified fitting code

__trmbmcs.rfid.aei.Fitting.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.Fitting.CLAMP_DEVICE;
    trmbmcs.rfid.aei.Fitting.getDescription(
                      function(desc) {
                          // Success
                          console.log("Fitting " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.Alarm

#### - NO\_ALARM
#### - DRAFT\_GEAR\_CUSH\_LOW\_PRESS\_A
#### - DRAFT\_GEAR\_CUSH\_LOW\_PRESS\_B
#### - DOOR\_OPEN
#### - DRAFT\_GEAR\_CUSH\_DEFECT\_A
#### - DRAFT\_GEAR\_CUSH\_DEFECT\_B
#### - TEMP\_OUT\_OF\_RANGE
#### - LOSS\_OF\_POWER

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified alarm code

__trmbmcs.rfid.aei.Alarm.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.Alarm.TEMP_OUT_OF_RANGE;
    trmbmcs.rfid.aei.Alarm.getDescription(
                      function(desc) {
                          // Success
                          console.log("Alarm " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.Mounting

#### - NOT\_USED
#### - UNDERSLUNG
#### - CLIP\_ON
#### - NITROGEN\_CLIP

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified mounting code

__trmbmcs.rfid.aei.Mounting.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.Mounting.UNDERSLUNG;
    trmbmcs.rfid.aei.Mounting.getDescription(
                      function(desc) {
                          // Success
                          console.log("Mounting " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.FuelCapacity

#### - NOT\_USED
#### - L\_0\_TO\_150
#### - L\_151\_TO\_190
#### - L\_191\_TO\_230
#### - L\_231\_TO\_270
#### - L\_271\_TO\_310
#### - L\_311\_TO\_350
#### - L\_351\_TO\_390
#### - L\_391\_TO\_430
#### - L\_431\_TO\_470
#### - L\_471\_TO\_510
#### - L\_511\_TO\_550
#### - L\_551\_TO\_590
#### - L\_591\_TO\_630
#### - L\_631\_TO\_670
#### - L\_GT\_670

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified fuel capacity code

__trmbmcs.rfid.aei.FuelCapacity.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.FuelCapacity.L_391_TO_430;
    trmbmcs.rfid.aei.FuelCapacity.getDescription(
                      function(desc) {
                          // Success
                          console.log("Fuel Capacity " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.Voltage

#### - NOT\_USED
#### - V\_230
#### - V\_460

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the specified voltage code

__trmbmcs.rfid.aei.Voltage.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.Voltage.V_230;
    trmbmcs.rfid.aei.Voltage.getDescription(
                      function(desc) {
                          // Success
                          console.log("Voltage " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>


## trmbmcs.rfid.aei.MultiModalTypeDetail

#### - DATA\_NOT\_PROVIDED
#### - ADAPTER\_CAR
#### - TRANSITION\_RAIL\_TRUCK
#### - RAIL\_TRUCK
#### - RAIL\_TRAILER\_WITH\_RAIL\_WHEELS
#### - RAIL\_TRAILER\_NO\_RAIL\_WHEELS
#### - BI\_MODAL\_MAINTENANCE\_OF\_WAY
#### - IRON\_HIGHWAY\_PLATFORM
#### - IRON\_HIGHWAY\_POWER

<hr width="5%" align=left>

#### getDescription
Retrieves a description of the multi-modal type detail

__trmbmcs.rfid.aei.MultiModalTypeDetail.getDescription(successCallback, errorCallback, val)__

#### Parameters
- __successCallback__:  The function to call when the description is retrieved.
                        Description is passed to this callback as a String.
                        _(Function)_ [Required]
- __errorCallback__:  The function to call if there is an error retrieving the
                      description.
                      _(Function)_ [Optional]
- __val__: The value for which to retrieve a description (one of the constants
           above) _(Number)_ [Required]

#### Example
    var val = trmbmcs.rfid.aei.MultiModalTypeDetail.TRANSITION_RAIL_TRUCK;
    trmbmcs.rfid.aei.MultiModalTypeDetail.getDescription(
                      function(desc) {
                          // Success
                          console.log("Multi-modal Type " + val + " = " + desc);
                      },
                      function(msg) {
                          console.log("Failed to get description: " + msg);
                      },
                      val);

<hr width="25%" align=left>
