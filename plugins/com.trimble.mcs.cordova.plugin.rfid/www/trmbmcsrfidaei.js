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

'use strict';

//-----------------------------------------------------------------------------
function TrmbMcsRfidAeiTag(data) {
    this.dataFormat = data.dataFormat;
    this.equipmentGroup = data.equipmentGroup;
    this.equipmentInitial = data.equipmentInitial;
    this.frameMarker = data.frameMarker;
    this.security = data.security;
    this.tagType = data.tagType;
    this.checksumValid = data.checksumValid;

    switch(data.equipmentGroup) {
        case TrmbMcsRfidAeiTag.EquipmentGroup.RAILCAR:
            this.bearingType = data.bearingType;
            this.carNumber = data.carNumber;
            this.length = data.length;
            this.numberOfAxles = data.numberOfAxles;
            this.platformId = data.platformId;
            this.side = data.side;
            this.spare = data.spare;
            break;

        case TrmbMcsRfidAeiTag.EquipmentGroup.LOCOMOTIVE:
            this.bearingType = data.bearingType;
            this.locomotiveNumber = data.locomotiveNumber;
            this.length = data.length;
            this.numberOfAxles = data.numberOfAxles;
            this.side = data.side;
            this.spare = data.spare;
            break;

        case TrmbMcsRfidAeiTag.EquipmentGroup.END_OF_TRAIN_DEVICE:
            this.eotNumber = data.eotNumber;
            this.eotType = data.eotType;
            this.side = data.side;
            this.spare = data.spare;
            break;

        case TrmbMcsRfidAeiTag.EquipmentGroup.CHASSIS:
            this.axleSpacing = data.axleSpacing;
            this.chassisNumber = data.chassisNumber;
            this.forwardExtension = data.forwardExtension;
            this.height = data.height;
            this.kingpinSetting = data.kingpinSetting;
            this.maxLength = data.maxLength;
            this.minLength = data.minLength;
            this.numLengths = data.numLengths;
            this.runningGearLoc = data.runningGearLoc;
            this.spare = data.spare;
            this.tandemWidth = data.tandemWidth;
            this.tareWeight = data.tareWeight;
            this.typeDetail = data.typeDetail;
            break;

        case TrmbMcsRfidAeiTag.EquipmentGroup.RAILCAR_COVER:
            this.assocRailcarInitial = data.assocRailcarInitial;
            this.assocRailcarNum = data.assocRailcarNum;
            this.coverType = data.coverType;
            this.dateBuilt = data.dateBuilt;
            this.equipmentNumber = data.equipmentNumber;
            this.fitting = data.fitting;
            this.insulation = data.insulation;
            this.length = data.length;
            this.side = data.side;
            break;

        case TrmbMcsRfidAeiTag.EquipmentGroup.TRAILER:
            this.forwardExtension = data.forwardExtension;
            this.height = data.height;
            this.length = data.length;
            this.tandemWidth = data.tandemWidth;
            this.tareWeight = data.tareWeight;
            this.trailerNumber = data.trailerNumber;
            this.typeDetail = data.typeDetail;
            this.width = data.width;
            break;

        case TrmbMcsRfidAeiTag.EquipmentGroup.INTERMODAL_CONTAINER:
            this.checkDigit = data.checkDigit;
            this.containerType = data.containerType;
            this.height = data.height;
            this.idNumber = data.idNumber;
            this.length = data.length;
            this.maxGrossWeight = data.maxGrossWeight;
            this.spare = data.spare;
            this.tareWeight = data.tareWeight;
            this.width = data.width;
            break;
    
        case TrmbMcsRfidAeiTag.EquipmentGroup.PASSIVE_ALARM_TAG:
            this.alarmCode = data.alarmCode;
            this.bearingType = data.bearingType;
            this.equipmentNumber = data.equipmentNumber;
            this.length = data.length;
            this.numberOfAxles = data.numberOfAxles;
            this.platformId = data.platformId;
            this.side = data.side;
            this.spare = data.spare;
            break;

        case TrmbMcsRfidAeiTag.EquipmentGroup.GENERATOR_SET:
            this.fuelCapacity = data.fuelCapacity;
            this.gensetNumber = data.gensetNumber;
            this.mounting = data.mounting;
            this.spare = data.spare;
            this.tareWeight = data.tareWeight;
            this.voltage = data.voltage;
            break;

        case TrmbMcsRfidAeiTag.EquipmentGroup.MULTIMODAL_EQUIPMENT:
            this.bearingType = data.bearingType;
            this.equipmentNumber = data.equipmentNumber;
            this.length = data.length;
            this.numberOfAxles = data.numberOfAxles;
            this.platformId = data.platformId;
            this.side = data.side;
            this.spare = data.spare;
            this.typeDetail = data.typeDetail;
            break;

        default:
            break; 
    }
}

/**
 * Decodes the specified AEI tag data.
 *
 * @param {Function} successCallback The function to call when info has been retrieved.
 *                                   Info is passed as a TrmbMcsRfidAeiTag object.
 * @param {Function} errorCallback The function to call if there is an error retrieving info. (OPTIONAL)
 */
TrmbMcsRfidAeiTag.decodeTagData = function(successCallback, errorCallback, tagData) {
    var sCb = function(data) {
        var aei = new TrmbMcsRfidAeiTag(data);
        successCallback(aei);
    }

    var eCb = function(msg) {
        errorCallback && errorCallback(msg);
    }

    cordova.exec(sCb, eCb, "trmbmcsrfid", "decodeAeiTag", [tagData]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.EquipmentGroup = {
    OTHER : 0,
    RAILCAR_COVER : 1,
    TRAIN_NUM_TAG : 4,
    LOCOMOTIVE : 5,
    END_OF_TRAIN_DEVICE : 6,
    GENERATOR_SET : 8,
    INTERMODAL_CONTAINER : 10,
    MARKER_TAGS : 12,
    TRACTOR : 17,
    STRAIGHT_TRUCK : 18,
    RAILCAR : 19,
    DOLLY : 20,
    TRAILER : 21,
    MULTIMODAL_EQUIPMENT : 24,
    CHASSIS : 27,
    PASSIVE_ALARM_TAG : 28,
    EXPERIMENTAL : 31
};

TrmbMcsRfidAeiTag.EquipmentGroup.getDescription = function(successCallback, errorCallback, equipGroup) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "equipmentGroup_getDescription", [equipGroup]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.TagType = {
    LT_128_BITS : 1,
    GTE_128_BITS : 2,
    MULTI_FRAME : 3,
    MULTI_FORMAT : 4
};

TrmbMcsRfidAeiTag.TagType.getDescription = function(successCallback, errorCallback, tagType) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "tagType_getDescription", [tagType]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.DataFormat = {
    SIX_BIT_ASCII : 0,
    REFRIG_OR_LOCO_NOT_ID : 36,
    REFRIG_OR_LOCO_ID : 37,
    RECORDER_OR_ALARM_NOT_ID : 41,
    RECORDER_ID : 42,
    ALARM_ID : 43,
    TAG_APP : 51,
    TOLL_ROAD : 52,
    NON_STANDARD : 63
};

TrmbMcsRfidAeiTag.DataFormat.getDescription = function(successCallback, errorCallback, dataFormat) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "dataFormat_getDescription", [dataFormat]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.SideIndicator = {
    LEFT : 0,
    RIGHT : 1
};

TrmbMcsRfidAeiTag.SideIndicator.getDescription = function(successCallback, errorCallback, side) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "sideIndicator_getDescription", [side]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.BearingType = {
    PLAIN : 0,
    ROLLER : 1,
    ROLLER_INBOARD : 2,
    ROLLER_BUCKEYE : 3,
    ROLLER_PLAIN_HOUSING : 4,
    ROLLER_CYLINDRICAL_OIL_FILLED : 5
};

TrmbMcsRfidAeiTag.BearingType.getDescription = function(successCallback, errorCallback, bearingType) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "bearingType_getDescription", [bearingType]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.PlatformId = {
    ALL : 0,
    A : 1,
    B : 2,
    C : 3,
    D : 4,
    E : 5,
    F : 6,
    G : 7,
    H : 8,
    I : 9,
    J : 10,
    K : 11,
    L : 12,
    M : 13,
    N : 14,
    O : 15
};

TrmbMcsRfidAeiTag.PlatformId.getDescription = function(successCallback, errorCallback, platformId) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "platformId_getDescription", [platformId]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.Width = {
    NOT_USED : 0,
    LT_96IN : 1,
    BETWEEN_96IN_TO_102IN : 2,
    GT_102IN : 3
};

TrmbMcsRfidAeiTag.Width.getDescription = function(successCallback, errorCallback, width) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "width_getDescription", [width]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.TrailerTypeDetail = {
    BULK_HOPPER : 0,
    MECH_FRIDGE_UNDER : 1,
    GENERAL_SVC_DRY_VAN : 2,
    FLAT_BED : 3,
    OPEN_TOP : 4,
    MECH_FRIDGE_NOSE : 5,
    RAIL_TRAILER_NO_RAIL_WHEELS : 6,
    INSULATED : 7,
    DROP_FRAME : 8,
    STRAIGHT_FLOOR : 9,
    RAIL_TRAILER_WITH_RAIL_WHEELS : 10,
    NOT_USED : 15
};

TrmbMcsRfidAeiTag.TrailerTypeDetail.getDescription = function(successCallback, errorCallback, trailerType) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "trailerTypeDetail_getDescription", [trailerType]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.ChassisTypeDetail = {
    EXTENDIBLE : 0,
    STRAIGHT : 1,
    COMBO : 2,
    BEAM_SLIDER : 3,
    RAIL_CHASSIS_WITH_RAIL_WHEELS : 4,
    RAIL_CHASSIS_NO_RAIL_WHEELS : 5,
    FIXED_LEN_GOOSENECK : 6,
    PLATFORM : 7,
    DROP_FRAME : 8,
    TRI_PURPOSE : 9,
    OTHER_NOT_USED : 15
};

TrmbMcsRfidAeiTag.ChassisTypeDetail.getDescription = function(successCallback, errorCallback, chassisType) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "chassisTypeDetail_getDescription", [chassisType]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.CoverType = {
    ONE_PIECE_FIBERGLASS : 0,
    ONE_PIECE_STEEL : 1,
    HIGH_PROFILE_STEEL : 2,
    FIRST_ON_FIBERGLASS_INT_RIB : 3,
    FIRST_OFF_FIBERGLASS_INT_RIB : 4,
    FIRST_ON_FIBERGLASS_EXT_RIB : 5,
    FIRST_OFF_FIBERGLASS_EXT_RIB : 6,
    FIRST_ON_FIBERGLASS_HIGH_PROFILE : 7,
    FIRST_OFF_FIBERGLASS_HIGH_PROFILE : 8,
    FIRST_ON_STEEL : 9,
    FIRST_OFF_STEEL : 10,
    HORIZONTALLY_TAGGED : 14,
    OTHER : 15
};

TrmbMcsRfidAeiTag.CoverType.getDescription = function(successCallback, errorCallback, coverType) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "coverType_getDescription", [coverType]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.EotType = {
    EOT : 0,
    EOT_ALT1 : 1,
    EOT_ALT2 : 2,
    MARKER_LIGHT : 3
};

TrmbMcsRfidAeiTag.EotType.getDescription = function(successCallback, errorCallback, eotType) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "eotType_getDescription", [eotType]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.DateBuilt = {
};

TrmbMcsRfidAeiTag.DateBuilt.getDescription = function(successCallback, errorCallback, dateCode) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "dateBuilt_getDescription", [dateCode]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.Insulation = {
    NOT_INSULATED : 0,
    INSULATED : 1
};

TrmbMcsRfidAeiTag.Insulation.getDescription = function(successCallback, errorCallback, insulation) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "insulation_getDescription", [insulation]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.Fitting = {
    C_HOOKS : 0,
    CLAMP_DEVICE : 1,
    ELECTRIC_COIL_GRAB : 2,
    MECHANICAL_COIL_GRAB : 3,
    MULTIPLE_CAPABILITY : 4,
    OTHER : 7
};

TrmbMcsRfidAeiTag.Fitting.getDescription = function(successCallback, errorCallback, fitting) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "fitting_getDescription", [fitting]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.Alarm = {
    NO_ALARM : 0,
    DRAFT_GEAR_CUSH_LOW_PRESS_A : 1,
    DRAFT_GEAR_CUSH_LOW_PRESS_B : 2,
    DOOR_OPEN : 3,
    DRAFT_GEAR_CUSH_DEFECT_A : 4,
    DRAFT_GEAR_CUSH_DEFECT_B : 5,
    TEMP_OUT_OF_RANGE : 6,
    LOSS_OF_POWER : 7
};

TrmbMcsRfidAeiTag.Alarm.getDescription = function(successCallback, errorCallback, alarm) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "alarm_getDescription", [alarm]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.Mounting = {
    NOT_USED : 0,
    UNDERSLUNG : 1,
    CLIP_ON : 2,
    NITROGEN_CLIP : 3
};

TrmbMcsRfidAeiTag.Mounting.getDescription = function(successCallback, errorCallback, mounting) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "mounting_getDescription", [mounting]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.FuelCapacity = {
    NOT_USED : 0,
    L_0_TO_150 : 1,
    L_151_TO_190 : 2,
    L_191_TO_230 : 3,
    L_231_TO_270 : 4,
    L_271_TO_310 : 5,
    L_311_TO_350 : 6,
    L_351_TO_390 : 7,
    L_391_TO_430 : 8,
    L_431_TO_470 : 9,
    L_471_TO_510 : 10,
    L_511_TO_550 : 11,
    L_551_TO_590 : 12,
    L_591_TO_630 : 13,
    L_631_TO_670 : 14,
    L_GT_670 : 15
};

TrmbMcsRfidAeiTag.FuelCapacity.getDescription = function(successCallback, errorCallback, fuelCapacity) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "fuelCapacity_getDescription", [fuelCapacity]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.Voltage = {
    NOT_USED : 0,
    V_230 : 1,
    V_460 : 2,
};

TrmbMcsRfidAeiTag.Voltage.getDescription = function(successCallback, errorCallback, voltage) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "voltage_getDescription", [voltage]);
}

//-----------------------------------------------------------------------------
TrmbMcsRfidAeiTag.MultiModalTypeDetail = {
    DATA_NOT_PROVIDED : 0,
    ADAPTER_CAR : 1,
    TRANSITION_RAIL_TRUCK : 2,
    RAIL_TRUCK : 3,
    RAIL_TRAILER_WITH_RAIL_WHEELS : 4,
    RAIL_TRAILER_NO_RAIL_WHEELS : 5,
    BI_MODAL_MAINTENANCE_OF_WAY : 6,
    IRON_HIGHWAY_PLATFORM : 10,
    IRON_HIGHWAY_POWER : 11
};

TrmbMcsRfidAeiTag.MultiModalTypeDetail.getDescription = function(successCallback, errorCallback, multiModalType) {
    cordova.exec(successCallback, errorCallback, "trmbmcsrfid", "multiModalTypeDetail_getDescription", [multiModalType]);
}



module.exports = TrmbMcsRfidAeiTag;

