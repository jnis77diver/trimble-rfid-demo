cordova.define("com.trimble.mcs.cordova.plugin.rfid.trmbmcsrfidparams", function(require, exports, module) { /*
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
function TrmbMcsRfidParams(data) {
    this.enabledProtocols = data.enabledProtocols;
    this.gen2MemoryBank = data.gen2MemoryBank;
    this.includeMemory = data.includeMemory;
    this.includeReadCount = data.includeReadCount;
    this.includeRssi = data.includeRssi;
    this.includeTimeStamp = data.includeTimeStamp;
    this.populationSize = data.populationSize;
    this.readPower = data.readPower;
    this.scanMaxRefreshRate = data.scanMaxRefreshRate;
    this.scanMode = data.scanMode;
    this.scanTimeout = data.scanTimeout;
    this.selectionAddr = data.selectionAddr;
    this.selectionBank = data.selectionBank;
    this.selectionMask = data.selectionMask;
    this.selectNonMatching = data.selectNonMatching;
}

module.exports = TrmbMcsRfidParams;


});
