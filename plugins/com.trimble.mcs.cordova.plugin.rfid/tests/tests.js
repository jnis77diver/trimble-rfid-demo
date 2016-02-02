/*
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

//-----------------------------------------------------------------------------
// Automated Tests
//-----------------------------------------------------------------------------
exports.defineAutoTests = function () {
    //-------------------------------------------------------------------------
    describe("Trimble MCS RFID", function () {

        //---------------------------------------------------------------------
        it("trmbmcs.rfid should exist", function () {
                expect(trmbmcs.rfid).toBeDefined();
        });

        //---------------------------------------------------------------------
        it("RFID init", function(done) {
            trmbmcs.rfid.init(  function() {
                                    expect(true).toBe(true);
                                    done();
                                },
                                function() {
                                    expect(false).toBe(true);
                                    done();
                                },
                                trmbmcs.rfid.SESSION_SCOPE_LOCAL);
        });

        //---------------------------------------------------------------------
        describe("RFID Info", function() {
            var mInfo;

            it("can get Info parameters", function(done) {
                trmbmcs.rfid.getInfo(
                        function(info) {
                            expect(info instanceof trmbmcs.rfid.info).toBe(true);
                            mInfo = info;
                            done();
                        },
                        function(msg) {
                            expect(false).toBe(true);
                            done();
                        });
            });

            it("appInterfaceLevel should be a positive number", function() {
                expect(mInfo.appInterfaceLevel).toBeDefined();
                expect(typeof mInfo.appInterfaceLevel === "number").toBe(true);
                expect(mInfo.appInterfaceLevel).toBeGreaterThan(0);
            });

            it("powerMax should be a number", function() {
                expect(mInfo.powerMax).toBeDefined();
                expect(typeof mInfo.powerMax === "number").toBe(true);
            });

            it("powerMin should be a number", function() {
                expect(mInfo.powerMin).toBeDefined();
                expect(typeof mInfo.powerMin === "number").toBe(true);
            });

            it("readerFirmwareRev should be a string", function() {
                expect(mInfo.readerFirmwareRev).toBeDefined();
                expect(typeof mInfo.readerFirmwareRev === "string").toBe(true);
                expect(mInfo.readerFirmwareRev.length).toBeGreaterThan(0);
            });

            it("readerHardwareRev should be a string", function() {
                expect(mInfo.readerHardwareRev).toBeDefined();
                expect(typeof mInfo.readerHardwareRev === "string").toBe(true);
                expect(mInfo.readerHardwareRev.length).toBeGreaterThan(0);
            });

            it("readerModel should be a string", function() {
                expect(mInfo.readerModel).toBeDefined();
                expect(typeof mInfo.readerModel === "string").toBe(true);
                expect(mInfo.readerModel.length).toBeGreaterThan(0);
            });

            it("readerSerialNum should be a string", function() {
                expect(mInfo.readerSerialNum).toBeDefined();
                expect(typeof mInfo.readerSerialNum === "string").toBe(true);
                expect(mInfo.readerSerialNum.length).toBeGreaterThan(0);
            });

            it("readerType should be a string", function() {
                expect(mInfo.readerType).toBeDefined();
                expect(typeof mInfo.readerType === "string").toBe(true);
                expect(mInfo.readerType.length).toBeGreaterThan(0);
            });

            it("readerVendor should be a string", function() {
                expect(mInfo.readerVendor).toBeDefined();
                expect(typeof mInfo.readerVendor === "string").toBe(true);
                expect(mInfo.readerVendor.length).toBeGreaterThan(0);
            });

            it("region should be a string", function() {
                expect(mInfo.region).toBeDefined();
                expect(typeof mInfo.region === "string").toBe(true);
                expect(mInfo.region.length).toBeGreaterThan(0);
            });

            it("supportedProtocols should be an array of strings", function() {
                expect(mInfo.supportedProtocols).toBeDefined();
                expect(Array.isArray(mInfo.supportedProtocols)).toBe(true);
                expect(mInfo.supportedProtocols.length).toBeGreaterThan(0);
                if (mInfo.supportedProtocols.length > 0) {
                    expect(mInfo.supportedProtocols[0].length).toBeGreaterThan(0);
                    expect(typeof mInfo.supportedProtocols[0] === "string").toBe(true);
                }
            });
        });

        //---------------------------------------------------------------------
        describe("RFID Parameters", function() {
            var mParams;

            it("can get RFID parameters", function(done) {
                trmbmcs.rfid.getParameters(
                    function(params) {
                        expect(params instanceof trmbmcs.rfid.params).toBe(true);
                        mParams = params;
                        done();
                    },
                    function(msg) {
                        expect(false).toBe(true);
                        done();
                    });
            });

            it("enabledProtocols should be an array of strings", function() {
                expect(mParams.enabledProtocols).toBeDefined();
                expect(Array.isArray(mParams.enabledProtocols)).toBe(true);
                if (mParams.enabledProtocols.length != 0) {
                    expect(typeof mParams.enabledProtocols[0] === "string").toBe(true);
                    expect(mParams.enabledProtocols[0].length).toBeGreaterThan(0);
                }
            });

            it("gen2MemoryBank should be a string", function() {
                expect(mParams.gen2MemoryBank).toBeDefined();
                expect(typeof mParams.gen2MemoryBank === "string").toBe(true);
                expect(mParams.gen2MemoryBank.length).toBeGreaterThan(0);
            });

            it("includeMemory should be a boolean", function() {
                expect(mParams.includeMemory).toBeDefined();
                expect(typeof mParams.includeMemory === "boolean").toBe(true);
            });

            it("includeReadCount should be a boolean", function() {
                expect(mParams.includeReadCount).toBeDefined();
                expect(typeof mParams.includeReadCount === "boolean").toBe(true);
            });

            it("includeRssi should be a boolean", function() {
                expect(mParams.includeRssi).toBeDefined();
                expect(typeof mParams.includeRssi === "boolean").toBe(true);
            });

            it("includeTimeStamp should be a boolean", function() {
                expect(mParams.includeTimeStamp).toBeDefined();
                expect(typeof mParams.includeTimeStamp === "boolean").toBe(true);
            });

            it("populationSize should be a string", function() {
                expect(mParams.populationSize).toBeDefined();
                expect(typeof mParams.populationSize === "string").toBe(true);
                expect(mParams.populationSize.length).toBeGreaterThan(0);
            });

            it("readPower should be a number", function() {
                expect(mParams.readPower).toBeDefined();
                expect(typeof mParams.readPower === "number").toBe(true);
            });

            it("scanMaxRefreshRate should be a non-negative number", function() {
                expect(mParams.scanMaxRefreshRate).toBeDefined();
                expect(typeof mParams.scanMaxRefreshRate === "number").toBe(true);
                expect(mParams.scanMaxRefreshRate).not.toBeLessThan(0);
            });

            it("scanMode should be a string", function() {
                expect(mParams.scanMode).toBeDefined();
                expect(typeof mParams.scanMode === "string").toBe(true);
                expect(mParams.scanMode.length).toBeGreaterThan(0);
            });

            it("scanTimeout should be a non-negative number", function() {
                expect(mParams.scanTimeout).toBeDefined();
                expect(typeof mParams.scanTimeout === "number").toBe(true);
                expect(mParams.scanTimeout).not.toBeLessThan(0);
            });

            it("selectionAddr should be a non-negative number", function() {
                expect(mParams.selectionAddr).toBeDefined();
                expect(typeof mParams.selectionAddr === "number").toBe(true);
                expect(mParams.selectionAddr).not.toBeLessThan(0);
            });

            it("selectionBank should be a string", function() {
                expect(mParams.selectionBank).toBeDefined();
                expect(typeof mParams.selectionBank === "string").toBe(true);
                expect(mParams.selectionBank.length).toBeGreaterThan(0);
            });

            it("selectionMask should be a string", function() {
                expect(mParams.selectionMask).toBeDefined();
                expect(typeof mParams.selectionMask === "string").toBe(true);
                // empty string is OK
            });

            it("selectNonMatching should be a boolean", function() {
                expect(mParams.selectNonMatching).toBeDefined();
                expect(typeof mParams.selectNonMatching === "boolean").toBe(true);
            });

            it("can set RFID parameters", function(done) {
                // Toggle timestamp inclusion
                mParams.includeTimeStamp = !mParams.includeTimeStamp;

                // Set new params
                trmbmcs.rfid.setParameters( function(msg) {
                                                expect(true).toBe(true);
                                                done();
                                            },
                                            function(msg) {
                                                expect(false).toBe(true);
                                                done();
                                            },
                                            mParams);
            });
        });

        //---------------------------------------------------------------------
        it("RFID deinit", function(done) {
            trmbmcs.rfid.deinit(
                function() {
                    expect(true).toBe(true);
                    done();
                },
                function() {
                    expect(false).toBe(true);
                    done();
                });
        });
    });
};


//-----------------------------------------------------------------------------
// Manual Tests
//-----------------------------------------------------------------------------
exports.defineManualTests = function(contentEl, createActionButton) {
    var scanning = false;
    var watchTagId = -1;
    var watchStatusId = -1;
    var nextTagNdx = 0;

    //---------------------------------------------------------------------
    // Hide all tag data elements except for the tag in question
    var onTagSelected = function(ndx) {
        var hidables = document.getElementsByClassName("tagHidable");
        for (ii = 0; ii < hidables.length; ii++)
            hidables[ii].hidden = true;

        var elemPrefixes = [ "rfidTagType", "tagMem", "tagRssi", "tagCount",
                             "timeStamp", "dataFormat", "equipmentGroup",
                             "equipmentInitial", "dataFormat", "checksumValid", "frameMarker", "security",
                             "tagType", "checksumValid", "bearingType", "carNumber",
                             "length", "numberOfAxles", "platformId", "side",
                             "spare", "locomotiveNumber", "eotNumber", "eotType",
                             "axleSpacing", "chassisNumber", "forwardExtension",
                             "height", "kingpinSetting", "maxLength", "minLength",
                             "numLengths", "runningGearLoc",
                             "tandemWidth", "tareWeight", "typeDetail",
                             "assocRailcarInitial", "assocRailcarNum",
                             "coverType", "dateBuilt", "equipmentNumber",
                             "fitting", "insulation", "trailerNumber", "width",
                             "checkDigit", "containerType", "idNumber",
                             "maxGrossWeight", "alarmCode", "fuelCapacity",
                             "gensetNumber", "mounting", "voltage" ];

        // Grab all elements with the specified index and make them visible
        for (ii = 0; ii < elemPrefixes.length; ii++) {
            var elem = document.getElementById(elemPrefixes[ii] + ndx);
            if (elem)
                elem.hidden = false;
        }
    }

    //---------------------------------------------------------------------
    var createTagDataElem = function(elemId, elemValue) {
        var elem = document.createElement("div");
        elem.hidden = true;
        elem.className = "tagHidable";
        elem.id = elemId;
        elem.innerHTML = elemValue;
        return elem;
    }

    //---------------------------------------------------------------------
    var newAeiChild = function(newCell, ndx, aei, fieldName, getDescFn) {
        var elemId = fieldName + ndx;
        var text = (getDescFn) ? "" : (fieldName + ": " + aei[fieldName]);

        newCell.appendChild(createTagDataElem(elemId, text));

        if (getDescFn) {
            getDescFn(function(str) {
                          var elem = document.getElementById(elemId);
                          if (elem)
                              elem.innerHTML = fieldName + ": " + str;
                      },
                      null, aei[fieldName]);
        }
    }

    //---------------------------------------------------------------------
    var addTag = function(type, id, memory, rssi, readCount, timestamp) {
        var newNdx = nextTagNdx++;
        var newRow = null;
        var wasChecked = false;
        var rows = document.getElementById("maintable").rows;

        // See if tag ID already exists in our lists
        for (ii = 0; ii < rows.length; ii++) {
            if (rows[ii].tagId === id) {
                newRow = rows[ii];
                wasChecked = document.getElementById("rb" + newRow.tagNdx).checked;
            }
        }

        if (newRow) {
            // Scanned tag is a duplicate; delete old cell contents.
            // new cell contents will be generated below
            newRow.deleteCell(0);
        }
        else {
            // New tag. Create a new row to hold tag info
            newRow = document.getElementById("maintable").insertRow(-1);
            newRow.tagId = id;
        }
        newRow.tagNdx = newNdx;

        //<tr tagId="XYZ">
        //  <td>
        //    <input id="rb#" type="radio" name="tags_group" value="XYZ" onclick="onTagSelected(#);"></input>
        //    <label for="rb#">XYZ</label>
        //    <div id="tt#" class="tagHidable" hidden>Tag Type: XYZ</div>
        //    <div id="tr#" class="tagHidable" hidden>RSSI: #</div>
        //    <div id="tc#" class="tagHidable" hidden>Read Count: #</div>
        //    <div id="ts#" class="tagHidable" hidden>Timestamp: #</div>
        //    ...
        //  </td>
        //</tr>

        var newCell = newRow.insertCell(-1);

        var newRadioBtn = document.createElement("input");
        newRadioBtn.setAttribute("id", "rb" + newNdx);
        newRadioBtn.setAttribute("type", "radio");
        newRadioBtn.setAttribute("name", "tags_group");
        newRadioBtn.setAttribute("value", id);
        newRadioBtn.onclick = function() {onTagSelected(newNdx);};

        var newLabel = document.createElement("label");
        newLabel.setAttribute("id", "lbl" + newNdx);
        newLabel.setAttribute("for", newRadioBtn.id);
        newLabel.appendChild(document.createTextNode(id));

        newCell.appendChild(newRadioBtn);
        newCell.appendChild(newLabel);

        // Tag type (Gen2, AEI, etc.)
        newCell.appendChild(createTagDataElem("rfidTagType" + newNdx, "Tag Type: " + type));
        newCell.appendChild(createTagDataElem("tagRssi" + newNdx, "RSSI: " + rssi));
        newCell.appendChild(createTagDataElem("tagCount" + newNdx, "Read Count: " + readCount));
        newCell.appendChild(createTagDataElem("timeStamp" + newNdx, "Timestamp: " + timestamp));
        newCell.appendChild(createTagDataElem("tagRssi" + newNdx, "RSSI: " + rssi));
        newCell.appendChild(createTagDataElem("tagCount" + newNdx, "Read Count: " + readCount));
        newCell.appendChild(createTagDataElem("timeStamp" + newNdx, "Timestamp: " + timestamp));

        if (type === trmbmcs.rfid.TAG_TYPE_EPCGEN2) {
            newCell.appendChild(createTagDataElem("tagMem" + newNdx, "Memory: " + memory));
        }
        else if (type === trmbmcs.rfid.TAG_TYPE_AEI) {
            var sCb = function(aei) {
                newAeiChild(newCell, newNdx, aei, "equipmentGroup", trmbmcs.rfid.aei.EquipmentGroup.getDescription);
                newAeiChild(newCell, newNdx, aei, "equipmentInitial", null);
                newAeiChild(newCell, newNdx, aei, "dataFormat", trmbmcs.rfid.aei.DataFormat.getDescription);
                newAeiChild(newCell, newNdx, aei, "tagType", trmbmcs.rfid.aei.TagType.getDescription);
                newAeiChild(newCell, newNdx, aei, "frameMarker", null);
                newAeiChild(newCell, newNdx, aei, "security", null);
                newAeiChild(newCell, newNdx, aei, "checksumValid", null);

                switch(aei.equipmentGroup) {
                    case trmbmcs.rfid.aei.EquipmentGroup.RAILCAR:
                        newAeiChild(newCell, newNdx, aei, "bearingType", trmbmcs.rfid.aei.BearingType.getDescription);
                        newAeiChild(newCell, newNdx, aei, "carNumber", null);
                        newAeiChild(newCell, newNdx, aei, "length", null);
                        newAeiChild(newCell, newNdx, aei, "numberOfAxles", null);
                        newAeiChild(newCell, newNdx, aei, "platformId", trmbmcs.rfid.aei.PlatformId.getDescription);
                        newAeiChild(newCell, newNdx, aei, "side", trmbmcs.rfid.aei.SideIndicator.getDescription);
                        newAeiChild(newCell, newNdx, aei, "spare", null);
                        break;

                    case trmbmcs.rfid.aei.EquipmentGroup.LOCOMOTIVE:
                        newAeiChild(newCell, newNdx, aei, "bearingType", trmbmcs.rfid.aei.BearingType.getDescription);
                        newAeiChild(newCell, newNdx, aei, "locomotiveNumber", null);
                        newAeiChild(newCell, newNdx, aei, "length", null);
                        newAeiChild(newCell, newNdx, aei, "numberOfAxles", null);
                        newAeiChild(newCell, newNdx, aei, "side", trmbmcs.rfid.aei.SideIndicator.getDescription);
                        newAeiChild(newCell, newNdx, aei, "spare", null);
                        break;

                    case trmbmcs.rfid.aei.EquipmentGroup.END_OF_TRAIN_DEVICE:
                        newAeiChild(newCell, newNdx, aei, "eotNumber", null);
                        newAeiChild(newCell, newNdx, aei, "eotType", trmbmcs.rfid.aei.EotType.getDescription);
                        newAeiChild(newCell, newNdx, aei, "side", trmbmcs.rfid.aei.SideIndicator.getDescription);
                        newAeiChild(newCell, newNdx, aei, "spare", null);
                        break;

                    case trmbmcs.rfid.aei.EquipmentGroup.CHASSIS:
                        newAeiChild(newCell, newNdx, aei, "axleSpacing", null);
                        newAeiChild(newCell, newNdx, aei, "chassisNumber", null);
                        newAeiChild(newCell, newNdx, aei, "forwardExtension", null);
                        newAeiChild(newCell, newNdx, aei, "height", null);
                        newAeiChild(newCell, newNdx, aei, "kingpinSetting", null);
                        newAeiChild(newCell, newNdx, aei, "maxLength", null);
                        newAeiChild(newCell, newNdx, aei, "minLength", null);
                        newAeiChild(newCell, newNdx, aei, "numLengths", null);
                        newAeiChild(newCell, newNdx, aei, "runningGearLoc", null);
                        newAeiChild(newCell, newNdx, aei, "spare", null);
                        newAeiChild(newCell, newNdx, aei, "tandemWidth", trmbmcs.rfid.aei.Width.getDescription);
                        newAeiChild(newCell, newNdx, aei, "tareWeight", null);
                        newAeiChild(newCell, newNdx, aei, "typeDetail", trmbmcs.rfid.aei.ChassisTypeDetail.getDescription);
                        break;

                    case trmbmcs.rfid.aei.EquipmentGroup.RAILCAR_COVER:
                        newAeiChild(newCell, newNdx, aei, "equipmentNumber", null);
                        newAeiChild(newCell, newNdx, aei, "assocRailcarInitial", null);
                        newAeiChild(newCell, newNdx, aei, "assocRailcarNum", null);
                        newAeiChild(newCell, newNdx, aei, "coverType", trmbmcs.rfid.aei.CoverType.getDescription);
                        newAeiChild(newCell, newNdx, aei, "dateBuilt", trmbmcs.rfid.DateBuilt.CoverType.getDescription);
                        newAeiChild(newCell, newNdx, aei, "fitting", trmbmcs.rfid.Fitting.CoverType.getDescription);
                        newAeiChild(newCell, newNdx, aei, "insulation", trmbmcs.rfid.Insulation.CoverType.getDescription);
                        newAeiChild(newCell, newNdx, aei, "length", null);
                        newAeiChild(newCell, newNdx, aei, "side", trmbmcs.rfid.aei.SideIndicator.getDescription);
                        break;

                    case trmbmcs.rfid.aei.EquipmentGroup.TRAILER:
                        newAeiChild(newCell, newNdx, aei, "forwardExtension", null);
                        newAeiChild(newCell, newNdx, aei, "height", null);
                        newAeiChild(newCell, newNdx, aei, "length", null);
                        newAeiChild(newCell, newNdx, aei, "width", trmbmcs.rfid.aei.Width.getDescription);
                        newAeiChild(newCell, newNdx, aei, "tandemWidth", trmbmcs.rfid.aei.Width.getDescription);
                        newAeiChild(newCell, newNdx, aei, "tareWeight", null);
                        newAeiChild(newCell, newNdx, aei, "trailerNumber", null);
                        newAeiChild(newCell, newNdx, aei, "typeDetail", trmbmcs.rfid.aei.TrailerTypeDetail.getDescription);

                        break;

                    case trmbmcs.rfid.aei.EquipmentGroup.INTERMODAL_CONTAINER:
                        newAeiChild(newCell, newNdx, aei, "checkDigit", null);
                        newAeiChild(newCell, newNdx, aei, "containerType", null);
                        newAeiChild(newCell, newNdx, aei, "height", null);
                        newAeiChild(newCell, newNdx, aei, "idNumber", null);
                        newAeiChild(newCell, newNdx, aei, "length", null);
                        newAeiChild(newCell, newNdx, aei, "maxGrossWeight", null);
                        newAeiChild(newCell, newNdx, aei, "spare", null);
                        newAeiChild(newCell, newNdx, aei, "tareWeight", null);
                        newAeiChild(newCell, newNdx, aei, "width", null);
                        break;

                    case trmbmcs.rfid.aei.EquipmentGroup.PASSIVE_ALARM_TAG:
                        newAeiChild(newCell, newNdx, aei, "alarmCode", trmbmcs.rfid.aei.Alarm.getDescription);
                        newAeiChild(newCell, newNdx, aei, "bearingType", trmbmcs.rfid.aei.BearingType.getDescription);
                        newAeiChild(newCell, newNdx, aei, "equipmentNumber", null);
                        newAeiChild(newCell, newNdx, aei, "length", null);
                        newAeiChild(newCell, newNdx, aei, "numberOfAxles", null);
                        newAeiChild(newCell, newNdx, aei, "platformId", trmbmcs.rfid.aei.PlatformId.getDescription);
                        newAeiChild(newCell, newNdx, aei, "side", trmbmcs.rfid.aei.SideIndicator.getDescription);
                        newAeiChild(newCell, newNdx, aei, "spare", null);
                        break;

                    case trmbmcs.rfid.aei.EquipmentGroup.GENERATOR_SET:
                        newAeiChild(newCell, newNdx, aei, "fuelCapacity", trmbmcs.rfid.aei.FuelCapacity.getDescription);
                        newAeiChild(newCell, newNdx, aei, "gensetNumber", null);
                        newAeiChild(newCell, newNdx, aei, "mounting", trmbmcs.rfid.aei.Mounting.getDescription);
                        newAeiChild(newCell, newNdx, aei, "spare", null);
                        newAeiChild(newCell, newNdx, aei, "tareWeight", null);
                        newAeiChild(newCell, newNdx, aei, "voltage", trmbmcs.rfid.aei.Voltage.getDescription);
                        break;

                    case trmbmcs.rfid.aei.EquipmentGroup.MULTIMODAL_EQUIPMENT:
                        newAeiChild(newCell, newNdx, aei, "bearingType", trmbmcs.rfid.aei.BearingType.getDescription);
                        newAeiChild(newCell, newNdx, aei, "equipmentNumber", null);
                        newAeiChild(newCell, newNdx, aei, "length", null);
                        newAeiChild(newCell, newNdx, aei, "numberOfAxles", null);
                        newAeiChild(newCell, newNdx, aei, "platformId", trmbmcs.rfid.aei.PlatformId.getDescription);
                        newAeiChild(newCell, newNdx, aei, "side", trmbmcs.rfid.aei.SideIndicator.getDescription);
                        newAeiChild(newCell, newNdx, aei, "spare", null);
                        newAeiChild(newCell, newNdx, aei, "typeDetail", trmbmcs.rfid.aei.MultiModalTypeDetail.getDescription);
                        break;

                    default:
                        console.log("Unexpected equipment type: " + aei.equipmentGroup);
                        break;
                }
            };

            var eCb = function(msg) {
                console.log("Error decoding AEI tag: " + msg);
            }

            trmbmcs.rfid.aei.decodeTagData(sCb, eCb, id);
        }
        
        if (rows.length === 1) {
            newRadioBtn.checked = true;
            onTagSelected(newNdx);
        }
        else if (wasChecked) {
            newRadioBtn.checked = true;
            onTagSelected(newNdx);
        }
    }

    //---------------------------------------------------------------------
    var startScan = function() {
        if (scanning) {
            trmbmcs.rfid.stopScan(function() {}, function() {});
        }
        else {
            trmbmcs.rfid.startScan(function() {}, function() {});
        }
    };

    //---------------------------------------------------------------------
    var setRefreshRate = function(freq) {
        trmbmcs.rfid.getParameters(function(params) {
                params.scanMaxRefreshRate = freq;
                trmbmcs.rfid.setParameters(function(){}, null, params);
            });
    }

    //---------------------------------------------------------------------
    var rfidWatchTagSuccess = function(tagInfo) {
        addTag(tagInfo.tagType, tagInfo.tagID, tagInfo.memory, tagInfo.rssi,
               tagInfo.readCount, tagInfo.timeStamp);
    };

    //---------------------------------------------------------------------
    var rfidWatchTagFail = function(msg) {
    };

    //---------------------------------------------------------------------
    var rfidWatchStatusSuccess = function(event) {
        var btnStartScan = document.getElementById("btnStartScan").firstChild.firstChild;

        if (event === trmbmcs.rfid.EVENT_SCAN_STARTED) {
           btnStartScan.textContent = "Stop Scan";
           scanning = true;
        }
        else if (event === trmbmcs.rfid.EVENT_SCAN_STOPPED) {
            btnStartScan.textContent = "Start Scan";
            scanning = false;
        }
        else {
            console.log("Unexpected event: " + event);
        }
    };

    //---------------------------------------------------------------------
    var rfidWatchStatusFail = function(msg) {
    };

    //---------------------------------------------------------------------
    var rfidReady = function() {
        document.getElementById("btnStartScan").disabled = false;
        setRefreshRate(1);
        watchTagId = trmbmcs.rfid.watchRfidTag(rfidWatchTagSuccess, rfidWatchTagFail);
        watchStatusId = trmbmcs.rfid.watchRfidStatus(rfidWatchStatusSuccess, rfidWatchStatusFail);
    };

    //---------------------------------------------------------------------

    contentEl.innerHTML = '<style> .tagHidable {text-indent:40px;} </style>' +
                          '<div id="btnStartScan"></div>' +
                          '1. Tap Start Scan button <br>' +
                          '2. Bring RFID tag(s) within range to scan<br>' +
                          '3. Tap Stop Scan button <br>' +
                          'Expected result: Scanned tags will appear below. Tap tag to view more info.' +
                          '<table id="maintable" border="1" style="width:100%"> </table> <br>';

    createActionButton('Start Scan', function() {
        startScan();
    }, "btnStartScan");

    document.getElementById("btnStartScan").disabled = true;

    trmbmcs.rfid.init(function() { rfidReady(); },
                      function(){}, trmbmcs.rfid.SESSION_SCOPE_LOCAL);

};

