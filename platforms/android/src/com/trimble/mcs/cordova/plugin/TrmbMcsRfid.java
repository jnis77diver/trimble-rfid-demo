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

package com.trimble.mcs.cordova.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.content.Context;
import android.content.Intent;
import android.os.Environment;
import android.util.Log;

import com.trimble.mcs.rfid.v1.RfidManager;
import com.trimble.mcs.rfid.v1.RfidConstants;
import com.trimble.mcs.rfid.v1.RfidInfo;
import com.trimble.mcs.rfid.v1.RfidParameters;
import com.trimble.mcs.rfid.v1.RfidException;
import com.trimble.mcs.rfid.v1.RfidStatusCallback;
import com.trimble.mcs.rfid.v1.aei.AeiTag;
import com.trimble.mcs.rfid.v1.aei.Chassis;
import com.trimble.mcs.rfid.v1.aei.EndOfTrain;
import com.trimble.mcs.rfid.v1.aei.GeneratorSet;
import com.trimble.mcs.rfid.v1.aei.Intermodal;
import com.trimble.mcs.rfid.v1.aei.Locomotive;
import com.trimble.mcs.rfid.v1.aei.MultiModalEquipment;
import com.trimble.mcs.rfid.v1.aei.PassiveAlarmTag;
import com.trimble.mcs.rfid.v1.aei.Railcar;
import com.trimble.mcs.rfid.v1.aei.RailcarCover;
import com.trimble.mcs.rfid.v1.aei.Trailer;

public class TrmbMcsRfid extends CordovaPlugin {
    private static final String TAG = "TrimbleMcsRfid";
    private static final String ACTION_INIT = "init";
    private static final String ACTION_DEINIT = "deinit";
    private static final String ACTION_START_SCAN = "startScan";
    private static final String ACTION_STOP_SCAN = "stopScan";
    private static final String ACTION_SET_TAG_LISTENER = "setRfidTagListener";
    private static final String ACTION_CLEAR_TAG_LISTENER = "clearRfidTagListener";
    private static final String ACTION_SET_STATUS_LISTENER = "setRfidStatusListener";
    private static final String ACTION_CLEAR_STATUS_LISTENER = "clearRfidStatusListener";
    private static final String ACTION_GET_INFO = "getInfo";
    private static final String ACTION_GET_PARAMETERS = "getParameters";
    private static final String ACTION_SET_PARAMETERS = "setParameters";
    private static final String ACTION_WRITE_EPC = "writeEpc";
    private static final String ACTION_WRITE_TAG = "writeTag";
    private static final String ACTION_DECODE_AEI_TAG = "decodeAeiTag";
    private static final String ACTION_EQUIPMENT_GROUP_GETDESC = "equipmentGroup_getDescription";
    private static final String ACTION_TAG_TYPE_GETDESC = "tagType_getDescription";
    private static final String ACTION_DATA_FORMAT_GETDESC = "dataFormat_getDescription";
    private static final String ACTION_SIDE_INDICATOR_GETDESC = "sideIndicator_getDescription";
    private static final String ACTION_BEARING_TYPE_GETDESC = "bearingType_getDescription";
    private static final String ACTION_PLATFORM_ID_GETDESC = "platformId_getDescription";
    private static final String ACTION_WIDTH_GETDESC = "width_getDescription";
    private static final String ACTION_TRAILER_TYPE_DETAIL_GETDESC = "trailerTypeDetail_getDescription";
    private static final String ACTION_CHASSIS_TYPE_DETAIL_GETDESC = "chassisTypeDetail_getDescription";
    private static final String ACTION_COVER_TYPE_GETDESC = "coverType_getDescription";
    private static final String ACTION_EOT_TYPE_GETDESC = "eotType_getDescription";
    private static final String ACTION_DATE_BUILT_GETDESC = "dateBuilt_getDescription";
    private static final String ACTION_INSULATION_GETDESC = "insulation_getDescription";
    private static final String ACTION_FITTING_GETDESC = "fitting_getDescription";
    private static final String ACTION_ALARM_GETDESC = "alarm_getDescription";
    private static final String ACTION_MOUNTING_GETDESC = "mounting_getDescription";
    private static final String ACTION_FUEL_CAPACITY_GETDESC = "fuelCapacity_getDescription";
    private static final String ACTION_VOLTAGE_GETDESC = "voltage_getDescription";
    private static final String ACTION_MULTIMODAL_TYPE_DETAIL_GETDESC = "multimodalTypeDetail_getDescription";

    private static final String EVENT_SCAN_STARTED = "scanStarted";
    private static final String EVENT_SCAN_STOPPED = "scanStopped";

    private CallbackContext mScanTagCallback = null;
    private CallbackContext mScanStatusCallback = null;
    private BroadcastReceiver mRfidTagReceiver = null;
    private IntentFilter mRfidTagFilter = null;
    private BroadcastReceiver mRfidStatusReceiver = null;
    private IntentFilter mRfidStatusFilter = null;
    private boolean mRfidReady = false;
    private boolean mReinitRfidOnResume = false;
    private boolean mReregisterTagReceiverOnResume = false;
    private boolean mReregisterStatusReceiverOnResume = false;
    private RfidParameters mRfidParams = null;
    private int mSessionScope = RfidConstants.SESSION_SCOPE_PRIVATE;

    //-------------------------------------------------------------------------
    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        // Create broadcast receiver to receive RFID scan intents
        mRfidTagReceiver = new BroadcastReceiver() {
            public void onReceive(Context context, Intent intent) {
                handleRfidTagIntent(context, intent);
            }
        };

        mRfidTagFilter = new IntentFilter();
        mRfidTagFilter.addAction(RfidConstants.ACTION_RFID_TAG_SCANNED);

        // Create broadcast receiver to receive RFID scan status
        mRfidStatusReceiver = new BroadcastReceiver() {
            public void onReceive(Context context, Intent intent) {
                handleRfidStatusIntent(context, intent);
            }
        };

        mRfidStatusFilter = new IntentFilter();
        mRfidStatusFilter.addAction(RfidConstants.ACTION_RFID_START_SCAN_NOTIFICATION);
        mRfidStatusFilter.addAction(RfidConstants.ACTION_RFID_STOP_SCAN_NOTIFICATION);
    }

    //-------------------------------------------------------------------------
    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);

        // Unregister tag broadcast receiver
        if (mScanTagCallback != null) {
            cordova.getActivity().unregisterReceiver(mRfidTagReceiver);
            mReregisterTagReceiverOnResume = true;
        }

        // Unregister status broadcast receiver
        if (mScanStatusCallback != null) {
            cordova.getActivity().unregisterReceiver(mRfidStatusReceiver);
            mReregisterStatusReceiverOnResume = true;
        }

        if (mRfidReady) {
            try {
                // Save current parameters
                mRfidParams = RfidManager.getParameters();
                RfidManager.deinit();
                mRfidReady = false;
                mReinitRfidOnResume = true;
            }
            catch (RfidException e) {}
        }
    }

    //-------------------------------------------------------------------------
    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);

        // Re-register broadcast receiver and re-init RFID Manager on Resume
        if (mReinitRfidOnResume) {
            mReinitRfidOnResume = false;

            RfidStatusCallback statusCb = new RfidStatusCallback() {
                public void onAPIReady() {
                    // Restore parameters if available
                    if (mRfidParams != null) {
                        try {
                            RfidManager.setParameters(mRfidParams);
                        }
                        catch (RfidException e) {
                            Log.e(TAG, "RFID re-param failed: " + e.getMessage());
                        }
                    }
                    mRfidReady = true;
                }
            };

            try {
                RfidManager.init(cordova.getActivity(), mSessionScope, statusCb);
            }
            catch (RfidException e) {
                Log.e(TAG, "RFID re-init failed: " + e.getMessage());
            }
        }

        if (mReregisterTagReceiverOnResume) {
            mReregisterTagReceiverOnResume = false;
            cordova.getActivity().registerReceiver(mRfidTagReceiver, mRfidTagFilter);
        }

        if (mReregisterStatusReceiverOnResume) {
            mReregisterStatusReceiverOnResume = false;
            cordova.getActivity().registerReceiver(mRfidStatusReceiver, mRfidStatusFilter);
        }
    }

    //-------------------------------------------------------------------------
    @Override
    public void onDestroy() {
        if (mScanTagCallback != null && !mReregisterTagReceiverOnResume) {
            cordova.getActivity().unregisterReceiver(mRfidTagReceiver);
            mScanTagCallback = null;
        }

        if (mScanStatusCallback != null && !mReregisterStatusReceiverOnResume) {
            cordova.getActivity().unregisterReceiver(mRfidStatusReceiver);
            mScanStatusCallback = null;
        }

        if (mRfidReady) {
            try {
                RfidManager.deinit();
                mRfidReady = false;
                mReinitRfidOnResume = false;
            }
            catch (RfidException e) {}
        }
        super.onDestroy();
    }

    //-------------------------------------------------------------------------
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
        throws JSONException {
        try {
            if (ACTION_INIT.equals(action)) {
                int scope = args.getInt(0);
                rfidInit(scope, callbackContext);
            }
            else if (ACTION_DEINIT.equals(action)) {
                rfidDeinit(callbackContext);
            }
            else if (ACTION_START_SCAN.equals(action)) {
                // args may include an optional timeout value.
                // We use -1 to indicate that timeout was not provided
                int timeout = args.optInt(0, -1);
                startScan(timeout, callbackContext);
            }
            else if (ACTION_STOP_SCAN.equals(action)) {
                stopScan(callbackContext);
            }
            else if (ACTION_SET_TAG_LISTENER.equals(action)) {
                setRfidTagListener(callbackContext);
            }
            else if (ACTION_CLEAR_TAG_LISTENER.equals(action)) {
                clearRfidTagListener(callbackContext);
            }
            else if (ACTION_SET_STATUS_LISTENER.equals(action)) {
                setRfidStatusListener(callbackContext);
            }
            else if (ACTION_CLEAR_STATUS_LISTENER.equals(action)) {
                clearRfidStatusListener(callbackContext);
            }
            else if (ACTION_GET_INFO.equals(action)) {
                getInfo(callbackContext);
            }
            else if (ACTION_GET_PARAMETERS.equals(action)) {
                getParameters(callbackContext);
            }
            else if (ACTION_SET_PARAMETERS.equals(action)) {
                try {
                    RfidParameters params = RfidManager.getParameters();
                    int ndx = 0;

                    JSONArray jsonEnabledProts = args.getJSONArray(ndx++);
                    String[] enabledProts = new String[jsonEnabledProts.length()];
                    for (int ii = 0; ii < enabledProts.length; ii++) {
                        enabledProts[ii] = jsonEnabledProts.getString(ii);
                    }
                    params.setEnabledProtocols(enabledProts);
                    params.setGen2MemoryBank(args.getString(ndx++));
                    params.setIncludeMemory(args.getBoolean(ndx++));
                    params.setIncludeReadCount(args.getBoolean(ndx++));
                    params.setIncludeRssi(args.getBoolean(ndx++));
                    params.setIncludeTimeStamp(args.getBoolean(ndx++));
                    params.setPopulationSize(args.getString(ndx++));
                    params.setReadPower(args.getInt(ndx++));
                    params.setScanMaxRefreshRate(args.getInt(ndx++));
                    params.setScanMode(args.getString(ndx++));
                    params.setScanTimeout(args.getInt(ndx++));
                    params.setSelectionAddr(args.getInt(ndx++));
                    params.setSelectionBank(args.getString(ndx++));
                    params.setSelectionMask(args.getString(ndx++));
                    params.setSelectNonMatching(args.getBoolean(ndx++));

                    setParameters(params, callbackContext);
                }
                catch (RfidException e) {
                    callbackContext.error("Failed to set RFID parameters: " + e.getMessage());
                    return true;
                }
            }
            else if (ACTION_WRITE_EPC.equals(action)) {
                String filter = args.getString(0);
                String epc = args.getString(1);
                writeEpc(filter, epc, callbackContext);
            }
            else if (ACTION_WRITE_TAG.equals(action)) {
                int ndx = 0;
                String tagType = args.getString(ndx++);
                String filter = args.getString(ndx++);
                String bank = args.getString(ndx++);
                int offset = args.getInt(ndx++);
                String data = args.getString(ndx++);
                writeTag(tagType, filter, bank, offset, data, callbackContext);
            }
            else if (ACTION_DECODE_AEI_TAG.equals(action)) {
                String tagData = args.getString(0);
                decodeAeiTag(tagData, callbackContext);
            }
            else if (ACTION_EQUIPMENT_GROUP_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.EquipmentGroup.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_TAG_TYPE_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.TagType.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_DATA_FORMAT_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.DataFormat.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_SIDE_INDICATOR_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.SideIndicator.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_BEARING_TYPE_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.BearingType.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_PLATFORM_ID_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.PlatformId.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_WIDTH_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.Width.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_TRAILER_TYPE_DETAIL_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.TrailerTypeDetail.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_CHASSIS_TYPE_DETAIL_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.ChassisTypeDetail.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_COVER_TYPE_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.CoverType.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_EOT_TYPE_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.EotType.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_DATE_BUILT_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.DateBuilt.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_INSULATION_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.Insulation.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_FITTING_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.Fitting.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_ALARM_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.Alarm.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_MOUNTING_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.Mounting.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_FUEL_CAPACITY_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.FuelCapacity.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_VOLTAGE_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.Voltage.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else if (ACTION_MULTIMODAL_TYPE_DETAIL_GETDESC.equals(action)) {
                int val = args.getInt(0);
                String d = AeiTag.MultiModalTypeDetail.getDescription(cordova.getActivity(), val);
                callbackContext.success(d);
            }
            else {
                callbackContext.error("Invalid action: " + action);
                return true;
            }
            return true;
        }
        catch (Exception e) {
        	callbackContext.error(e.getMessage());
            return true;
        }
    }

    //-------------------------------------------------------------------------
    private void rfidInit(int scope, final CallbackContext clientCb) {
        // Invoke client callback once RFID API is ready
        RfidStatusCallback statusCb = new RfidStatusCallback() {
            public void onAPIReady() {
                mRfidReady = true;
                clientCb.success();
            }
        };

        if (scope != RfidConstants.SESSION_SCOPE_PRIVATE &&
            scope != RfidConstants.SESSION_SCOPE_GLOBAL) {
            clientCb.error("Invalid RFID session scope: " + scope);
            return;
        }

        mSessionScope = scope;

        try {
            RfidManager.init(cordova.getActivity(), scope, statusCb);
        }
        catch (RfidException e) {
            clientCb.error("RFID init failed: " + e.getMessage());
        }
    }

    //-------------------------------------------------------------------------
    private void rfidDeinit(CallbackContext clientCb) {
        try {
            RfidManager.deinit();
            mRfidReady = false;
            mReinitRfidOnResume = false;
            mRfidParams = null;
            clientCb.success();
        }
        catch (RfidException e) {
            clientCb.error("RFID deinit failed: " + e.getMessage());
        }
    }

    //-------------------------------------------------------------------------
    private void getInfo(CallbackContext clientCb) {
        try {
            // Fetch info from RfidManager
            RfidInfo info = RfidManager.getInfo();

            // Store info in a JSON object for transmission to javascript
            JSONObject tagInfo = new JSONObject();
            try {
                tagInfo.put("appInterfaceLevel", info.getAppInterfaceLevel());
                tagInfo.put("powerMax", info.getPowerMax());
                tagInfo.put("powerMin", info.getPowerMin());
                tagInfo.put("readerFirmwareRev", info.getReaderFirmwareRev());
                tagInfo.put("readerHardwareRev", info.getReaderHardwareRev());
                tagInfo.put("readerModel", info.getReaderModel());
                tagInfo.put("readerSerialNum", info.getReaderSerialNum());
                tagInfo.put("readerType", info.getReaderType());
                tagInfo.put("readerVendor", info.getReaderVendor());
                tagInfo.put("region", info.getRegion());

                // SupportedProtocols is an array of strings.
                // Convert to a JSON array
                String[] prots = info.getSupportedProtocols();
                JSONArray ja = new JSONArray();
                for (String s : prots)
                    ja.put(s);
                tagInfo.put("supportedProtocols", ja);
            
                clientCb.success(tagInfo);
            }
            catch (JSONException e) {
                clientCb.error("Failed to populate JSON object with RFID info: " + e.getMessage());
            }
        }
        catch (RfidException e) {
            clientCb.error("Failed to fetch RFID info: " + e.getMessage());
        }
    }

    //-------------------------------------------------------------------------
    private void getParameters(CallbackContext clientCb) {
        try {
            // Fetch info from RfidManager
            RfidParameters params = RfidManager.getParameters();

            // Store info in a JSON object for transmission to javascript
            JSONObject json = new JSONObject();
            try {
                // SupportedProtocols is an array of strings.
                // Convert to a JSON array
                String[] prots = params.getEnabledProtocols();
                JSONArray ja = new JSONArray();
                for (String s : prots)
                    ja.put(s);
                json.put("enabledProtocols", ja);

                json.put("gen2MemoryBank", params.getGen2MemoryBank());
                json.put("includeMemory", params.getIncludeMemory());
                json.put("includeReadCount", params.getIncludeReadCount());
                json.put("includeRssi", params.getIncludeRssi());
                json.put("includeTimeStamp", params.getIncludeTimeStamp());
                json.put("populationSize", params.getPopulationSize());
                json.put("readPower", params.getReadPower());
                json.put("scanMaxRefreshRate", params.getScanMaxRefreshRate());
                json.put("scanMode", params.getScanMode());
                json.put("scanTimeout", params.getScanTimeout());
                json.put("selectionAddr", params.getSelectionAddr());
                json.put("selectionBank", params.getSelectionBank());
                json.put("selectionMask", params.getSelectionMask());
                json.put("selectNonMatching", params.getSelectNonMatching());
            
                clientCb.success(json);
            }
            catch (JSONException e) {
                clientCb.error("Failed to populate JSON object with RFID params: " + e.getMessage());
            }
        }
        catch (RfidException e) {
            clientCb.error("Failed to fetch RFID params: " + e.getMessage());
        }
    }

    //-------------------------------------------------------------------------
    private void setParameters(RfidParameters params, CallbackContext clientCb) 
        throws RfidException {
        RfidManager.setParameters(params);
        clientCb.success();
    }

    //-------------------------------------------------------------------------
    private void startScan(int timeout, CallbackContext clientCb) {
        try {
            if (timeout == -1)
                RfidManager.startScan();
            else
                RfidManager.startScan(timeout);

            clientCb.success();
        }
        catch (RfidException e) {
            clientCb.error("Failed to start RFID scan: " + e.getMessage());
        }
    }

    //-------------------------------------------------------------------------
    private void stopScan(CallbackContext clientCb) {
        try {
            RfidManager.stopScan();
            clientCb.success();
        }
        catch (RfidException e) {
            clientCb.error("Failed to stop RFID scan: " + e.getMessage());
        }
    }

    //-------------------------------------------------------------------------
    private void writeEpc(String filter, String epc, CallbackContext clientCb) {
        try {
            RfidManager.writeEpc(filter, epc);
            clientCb.success();
        }
        catch (RfidException e) {
            clientCb.error("Failed to write EPC: " + e.getMessage());
        }
    }

    //-------------------------------------------------------------------------
    private void writeTag(String tagType, String filter, String bank, int offset, String data, CallbackContext clientCb) {
        try {
            RfidManager.writeTag(tagType, filter, bank, offset, data);
            clientCb.success();
        }
        catch (RfidException e) {
            clientCb.error("Failed to write tag: " + e.getMessage());
        }
    }

    //-------------------------------------------------------------------------
    private void decodeAeiTag(String tagData, CallbackContext clientCb) {
        if (tagData == null || tagData.isEmpty()) {
            clientCb.error("Invalid AEI tag data: " + tagData);
            return;
        }

        try {
            AeiTag aei = AeiTag.decodeTagData(tagData);
            // Store info in a JSON object for transmission to javascript
            JSONObject json = new JSONObject();
            try {
                json.put("dataFormat", aei.getDataFormat());
                json.put("equipmentGroup", aei.getEquipmentGroup());
                json.put("equipmentInitial", aei.getEquipmentInitial());
                json.put("frameMarker", aei.getFrameMarker());
                json.put("security", aei.getSecurity());
                json.put("tagType", aei.getTagType());
                json.put("checksumValid", aei.isChecksumValid());

                switch(aei.getEquipmentGroup()) {
                    case AeiTag.EquipmentGroup.RAILCAR:
                        Railcar rc = (Railcar)aei;
                        json.put("bearingType", rc.getBearingType());
                        json.put("carNumber", rc.getCarNumber());
                        json.put("length", rc.getLength());
                        json.put("numberOfAxles", rc.getNumberOfAxles());
                        json.put("platformId", rc.getPlatformId());
                        json.put("side", rc.getSide());
                        json.put("spare", rc.getSpare());
                        break;

                    case AeiTag.EquipmentGroup.LOCOMOTIVE:
                        Locomotive lm = (Locomotive)aei;
                        json.put("bearingType", lm.getBearingType());
                        json.put("length", lm.getLength());
                        json.put("locomotiveNumber", lm.getLocomotiveNumber());
                        json.put("numberOfAxles", lm.getNumberOfAxles());
                        json.put("side", lm.getSide());
                        json.put("spare", lm.getSpare());
                        break;

                    case AeiTag.EquipmentGroup.RAILCAR_COVER:
                        RailcarCover rcc = (RailcarCover)aei;
                        json.put("assocRailcarInitial", rcc.getAssocRailcarInitial());
                        json.put("assocRailcarNum", rcc.getAssocRailcarNum());
                        json.put("coverType", rcc.getCoverType());
                        json.put("dateBuilt", rcc.getDateBuilt());
                        json.put("equipmentNumber", rcc.getEquipmentNumber());
                        json.put("fitting", rcc.getFitting());
                        json.put("insulation", rcc.getInsulation());
                        json.put("length", rcc.getLength());
                        json.put("side", rcc.getSide());
                        break;

                    case AeiTag.EquipmentGroup.TRAILER:
                        Trailer tr = (Trailer)aei;
                        json.put("forwardExtension", tr.getForwardExtension());
                        json.put("height", tr.getHeight());
                        json.put("length", tr.getLength());
                        json.put("tandemWidth", tr.getTandemWidth());
                        json.put("tareWeight", tr.getTareWeight());
                        json.put("trailerNumber", tr.getTrailerNumber());
                        json.put("typeDetail", tr.getTypeDetail());
                        json.put("width", tr.getWidth());
                        break;

                    case AeiTag.EquipmentGroup.CHASSIS:
                        Chassis ch = (Chassis)aei;
                        json.put("axleSpacing", ch.getAxleSpacing());
                        json.put("chassisNumber", ch.getChassisNumber());
                        json.put("forwardExtension", ch.getForwardExtension());
                        json.put("height", ch.getHeight());
                        json.put("kingpinSetting", ch.getKingpinSetting());
                        json.put("maxLength", ch.getMaxLength());
                        json.put("minLength", ch.getMinLength());
                        json.put("numLengths", ch.getNumLengths());
                        json.put("runningGearLoc", ch.getRunningGearLoc());
                        json.put("spare", ch.getSpare());
                        json.put("tandemWidth", ch.getTandemWidth());
                        json.put("tareWeight", ch.getTareWeight());
                        json.put("typeDetail", ch.getTypeDetail());
                        break;

                    case AeiTag.EquipmentGroup.END_OF_TRAIN_DEVICE:
                        EndOfTrain eot = (EndOfTrain)aei;
                        json.put("eotNumber", eot.getEotNumber());
                        json.put("eotType", eot.getEotType());
                        json.put("side", eot.getSide());
                        json.put("spare", eot.getSpare());
                        break;

                    case AeiTag.EquipmentGroup.INTERMODAL_CONTAINER:
                        Intermodal im = (Intermodal)aei;
                        json.put("checkDigit", im.getCheckDigit());
                        json.put("containerType", im.getContainerType());
                        json.put("height", im.getHeight());
                        json.put("idNumber", im.getIdNumber());
                        json.put("length", im.getLength());
                        json.put("maxGrossWeight", im.getMaxGrossWeight());
                        json.put("spare", im.getSpare());
                        json.put("tareWeight", im.getTareWeight());
                        json.put("width", im.getWidth());
                        break;

                    case AeiTag.EquipmentGroup.PASSIVE_ALARM_TAG:
                        PassiveAlarmTag pat = (PassiveAlarmTag)aei;
                        json.put("alarmCode", pat.getAlarmCode());
                        json.put("bearingType", pat.getBearingType());
                        json.put("equipmentNumber", pat.getEquipmentNumber());
                        json.put("length", pat.getLength());
                        json.put("numberOfAxles", pat.getNumberOfAxles());
                        json.put("platformId", pat.getPlatformId());
                        json.put("side", pat.getSide());
                        json.put("spare", pat.getSpare());
                        break;

                    case AeiTag.EquipmentGroup.GENERATOR_SET:
                        GeneratorSet gs = (GeneratorSet)aei;
                        json.put("fuelCapacity", gs.getFuelCapacity());
                        json.put("gensetNumber", gs.getGensetNumber());
                        json.put("mounting", gs.getMounting());
                        json.put("spare", gs.getSpare());
                        json.put("tareWeight", gs.getTareWeight());
                        json.put("voltage", gs.getVoltage());
                        break;

                    case AeiTag.EquipmentGroup.MULTIMODAL_EQUIPMENT:
                        MultiModalEquipment mme = (MultiModalEquipment)aei;
                        json.put("bearingType", mme.getBearingType());
                        json.put("equipmentNumber", mme.getEquipmentNumber());
                        json.put("length", mme.getLength());
                        json.put("numberOfAxles", mme.getNumberOfAxles());
                        json.put("platformId", mme.getPlatformId());
                        json.put("side", mme.getSide());
                        json.put("spare", mme.getSpare());
                        json.put("typeDetail", mme.getTypeDetail());
                        break;

                    default:
                        break;
                }

                clientCb.success(json);
            }
            catch (JSONException e) {
                clientCb.error("Failed to populate JSON object with RFID params: " + e.getMessage());
            }
        }
        catch (Exception ex) {
            clientCb.error("Failed to decode AEI tag data: " + tagData +
                           ". Error: " + ex.getMessage());
        }
    }

    //-------------------------------------------------------------------------
    private void setRfidTagListener(CallbackContext clientCb) {
        mScanTagCallback = clientCb;

        cordova.getActivity().registerReceiver(mRfidTagReceiver, mRfidTagFilter);

        PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
        result.setKeepCallback(true);
        clientCb.sendPluginResult(result);
    }
                
    //-------------------------------------------------------------------------
    private void clearRfidTagListener(CallbackContext clientCb) {
        cordova.getActivity().unregisterReceiver(mRfidTagReceiver);
        mScanTagCallback = null;
        clientCb.success();
    }
                
    //-------------------------------------------------------------------------
    private void setRfidStatusListener(CallbackContext clientCb) {
        mScanStatusCallback = clientCb;

        cordova.getActivity().registerReceiver(mRfidStatusReceiver, mRfidStatusFilter);

        PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
        result.setKeepCallback(true);
        clientCb.sendPluginResult(result);
    }
                
    //-------------------------------------------------------------------------
    private void clearRfidStatusListener(CallbackContext clientCb) {
        cordova.getActivity().unregisterReceiver(mRfidStatusReceiver);
        mScanStatusCallback = null;
        clientCb.success();
    }
                
    //-------------------------------------------------------------------------
    public void handleRfidTagIntent(Context context, Intent intent) {
        CallbackContext cb = mScanTagCallback;
        if (cb == null)
            return;

        String action = intent.getAction();

        if (action.equals(RfidConstants.ACTION_RFID_TAG_SCANNED)) {
            // Extract tag data from intent
            String tagID = intent.getStringExtra(RfidConstants.RFID_FIELD_ID);
            String memory = intent.getStringExtra(RfidConstants.RFID_FIELD_MEMORY);
            String tagType = intent.getStringExtra(RfidConstants.RFID_FIELD_TAG_TYPE);
            int rssi = intent.getIntExtra(RfidConstants.RFID_FIELD_RSSI, 0);
            int readCount = intent.getIntExtra(RfidConstants.RFID_FIELD_READ_COUNT, 0);
            long timeStamp = intent.getLongExtra(RfidConstants.RFID_FIELD_TIME_STAMP, 0);

            // Store tag data in a JSON object for transmission to javascript
            JSONObject tagInfo = new JSONObject();
            try {
                if (tagID != null)
                    tagInfo.put("tagID", tagID);
                if (memory != null)
                    tagInfo.put("memory", memory);
                if (tagType != null)
                    tagInfo.put("tagType", tagType);
                if (rssi != 0)
                    tagInfo.put("rssi", rssi);
                if (readCount != 0)
                    tagInfo.put("readCount", readCount);
                if (timeStamp != 0)
                    tagInfo.put("timeStamp", timeStamp);
            }
            catch (JSONException e) {
                Log.d(TAG, "Error populating JSON object with scan data: " + e.getMessage());
            }

            PluginResult result = new PluginResult(PluginResult.Status.OK, tagInfo);
            result.setKeepCallback(true);
            cb.sendPluginResult(result);
        }
    }

    //-------------------------------------------------------------------------
    public void handleRfidStatusIntent(Context context, Intent intent) {
        CallbackContext cb = mScanStatusCallback;
        if (cb == null)
            return;

        String event;
        String action = intent.getAction();

        if (action.equals(RfidConstants.ACTION_RFID_START_SCAN_NOTIFICATION)) {
            event = EVENT_SCAN_STARTED;
        }
        else if (action.equals(RfidConstants.ACTION_RFID_STOP_SCAN_NOTIFICATION)) {
            event = EVENT_SCAN_STOPPED;
        }
        else {
            return;
        }

        PluginResult result = new PluginResult(PluginResult.Status.OK, event);
        result.setKeepCallback(true);
        cb.sendPluginResult(result);
    }
}

