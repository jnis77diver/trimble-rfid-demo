cordova.define("com.trimble.mcs.cordova.plugin.rfid.trmbmcsrfidtag", function(require, exports, module) { /*
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

//-----------------------------------------------------------------------------
function TrmbMcsRfidTag(data) {
    this.tagID = data.tagID;
    this.memory = data.memory;
    this.tagType = data.tagType;
    this.rssi = data.rssi;
    this.readCount = data.readCount;
    this.timeStamp = data.timeStamp;
}

module.exports = TrmbMcsRfidTag;


});
