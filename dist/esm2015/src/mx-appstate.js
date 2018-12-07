/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { psgeometry } from './ps-geometry';
import { modelstageweb } from './mx-common';
export var modelstageappstate;
(function (modelstageappstate) {
    /**
     * The base class for local app state storage.
     *
     * App state data is organized in clusters. Each cluster has a distinct data layout comparable to a struct data type.
     * A cluster can store and manage multiple values (AppStateEntry). Depending on the nature of the data, it can be global
     * (shared among all peers) or local (each peer has its own copy of the cluster and is aware of the remote peer's instances).
     * Besides that, global as well as local clusters can be single-instance or multi-instance. Global, single-instance data exists
     * only once. Global, multi-instance data is shared among all peers, but can consist of multiple instances of the same
     * "record". Each instance has a peer ID and an instance ID both ID fields together build a "globally" unique ID. For
     * local, single-instance clusters, each peer may or may not have a single instance of the cluster, for local, multi-instance
     * clusters, each peer may have zero or more instances of the cluster, again identified by a combination of a peer ID and an
     * instance ID.
     */
    class AppStateBase {
        constructor() {
            this.clusterManagers = {};
        }
        /**
         * @return {?}
         */
        get LocalPeerID() {
            return this.localPeerID;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set LocalPeerID(value) {
            this.localPeerID = value;
        }
        /**
         * @param {?} key
         * @return {?}
         */
        getClusterManager(key) {
            return this.clusterManagers[key];
        }
        /**
         * Adds a certain cluster type (global/local, single/multi) to the app state.
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        addCluster(key, cluster) {
            this.clusterManagers[key] = cluster;
        }
        /**
         * Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
         * during the transactional phase of the app state.
         * @return {?}
         */
        beginTransaction() {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].beginTransaction();
            }
        }
        /**
         * Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        endTransaction() {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].endTransaction();
            }
        }
        /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
         * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
         * @param {?} scene
         * @return {?}
         */
        applyChanges(scene) {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].applyChanges(scene);
            }
        }
        /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @return {?}
         */
        serializeTransaction(deltaWriter) {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].serializeTransaction(deltaWriter, clusterManagerKey, this);
            }
        }
        /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, scene) {
            /** @type {?} */
            let success = true;
            while (!deltaReader.isAtEnd() && success) {
                /** @type {?} */
                let clusterID = deltaReader.readClusterID();
                if (clusterID) {
                    /** @type {?} */
                    let clusterManager = this.clusterManagers[clusterID];
                    if (clusterManager) {
                        success = clusterManager.deserializeTransaction(deltaReader, this, scene);
                    }
                    else {
                        success = false;
                    }
                }
                else {
                    success = false;
                }
            }
            return success;
        }
    }
    modelstageappstate.AppStateBase = AppStateBase;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AppStateBase.prototype.clusterManagers;
        /**
         * @type {?}
         * @private
         */
        AppStateBase.prototype.localPeerID;
    }
    class AppState extends AppStateBase {
        /**
         * @return {?}
         */
        static GetInstance() {
            if (!AppState.Instance) {
                AppState.Instance = new AppState();
            }
            return AppState.Instance;
        }
    }
    AppState.Instance = null;
    modelstageappstate.AppState = AppState;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AppState.Instance;
    }
    class BinaryWriter {
        constructor() {
            this.buf = [];
        }
        /**
         * @return {?}
         */
        flush() {
            /** @type {?} */
            let result = new Uint8Array(this.buf.length);
            result.set(this.buf);
            return result;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeByte(val) {
            this.buf.push(val);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeInt16(val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeUInt16(val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeInt32(val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeInt64(val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff, (val >> 32) & 0xff, (val >> 40) & 0xff, (val >> 48) & 0xff, (val >> 56) & 0xff);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeTimestamp(val) {
            this.writeInt64(val);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeFloat32(val) {
            /** @type {?} */
            let buf = new ArrayBuffer(4);
            /** @type {?} */
            let view = new DataView(buf);
            view.setFloat32(0, val, true);
            /** @type {?} */
            let byteBuf = new Int8Array(buf);
            this.buf.push.apply(byteBuf);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeString(val) {
            this.writeInt32(val.length);
            this.writeCharArray(val, val.length);
        }
        /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        writeCharArray(val, arrayLength) {
            for (let idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) : 0x00);
            }
        }
        /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        writeWideCharArray(val, arrayLength) {
            for (let idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) & 0xff : 0x00, idx < val.length ? (val.charCodeAt(idx) >> 8) & 0xff : 0x00);
            }
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeVec3(val) {
            /** @type {?} */
            let buf = new ArrayBuffer(12);
            /** @type {?} */
            let view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            /** @type {?} */
            let byteBuf = new Uint8Array(buf);
            this.buf.push.apply(byteBuf);
        }
        /**
         * @param {?} val
         * @return {?}
         */
        writeVec4(val) {
            /** @type {?} */
            let buf = new ArrayBuffer(16);
            /** @type {?} */
            let view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            view.setFloat32(12, val.w, true);
            /** @type {?} */
            let byteBuf = new Uint8Array(buf);
            this.buf.push(byteBuf[0], byteBuf[1], byteBuf[2], byteBuf[3], byteBuf[4], byteBuf[5], byteBuf[6], byteBuf[7], byteBuf[8], byteBuf[9], byteBuf[10], byteBuf[11], byteBuf[12], byteBuf[13], byteBuf[14], byteBuf[15]);
        }
    }
    modelstageappstate.BinaryWriter = BinaryWriter;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        BinaryWriter.prototype.buf;
    }
    class BinaryReader {
        /**
         * @param {?} buf
         */
        constructor(buf) {
            this.currentPos = 8;
            this.error = false;
            this.buf = buf;
        }
        /**
         * @return {?}
         */
        get Error() {
            return this.error;
        }
        /**
         * @return {?}
         */
        get AtEnd() {
            return this.currentPos >= this.buf.byteLength;
        }
        /**
         * @param {?} count
         * @return {?}
         */
        assureRemainingBytes(count) {
            return this.currentPos + count <= this.buf.byteLength;
        }
        /**
         * @return {?}
         */
        readByte() {
            if (this.assureRemainingBytes(1)) {
                return this.buf[this.currentPos++];
            }
            else {
                this.error = true;
                return NaN;
            }
        }
        /**
         * @return {?}
         */
        readUInt16() {
            if (this.assureRemainingBytes(2)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256;
            }
            else {
                this.error = true;
                return NaN;
            }
        }
        /**
         * @return {?}
         */
        readUInt64() {
            if (this.assureRemainingBytes(8)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256 +
                    this.buf[this.currentPos++] * 65536 +
                    this.buf[this.currentPos++] * 16777216 +
                    this.buf[this.currentPos++] * 4294967296 +
                    this.buf[this.currentPos++] * 1099511627776 +
                    this.buf[this.currentPos++] * 281474976710656 +
                    this.buf[this.currentPos++] * 72057594037927936;
            }
            else {
                this.error = true;
                return NaN;
            }
        }
        /**
         * @return {?}
         */
        readUInt32() {
            if (this.assureRemainingBytes(4)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256 +
                    this.buf[this.currentPos++] * 65536 +
                    this.buf[this.currentPos++] * 16777216;
            }
            else {
                this.error = true;
                return NaN;
            }
        }
        /**
         * @return {?}
         */
        readString() {
            /** @type {?} */
            let result = null;
            /** @type {?} */
            let length = this.readUInt32();
            if (!this.error) {
                if (this.assureRemainingBytes(length)) {
                    result = this.readCharArray(length);
                }
                else {
                    this.error = true;
                }
            }
            return result;
        }
        /**
         * @return {?}
         */
        readTimestamp() {
            return this.readUInt64();
        }
        /**
         * @param {?} arrayLength
         * @return {?}
         */
        readCharArray(arrayLength) {
            /** @type {?} */
            let result = [];
            /** @type {?} */
            let idx = 0;
            while (idx < arrayLength && this.buf[this.currentPos + idx] != 0x00 && !this.error) {
                if (this.currentPos < this.buf.byteLength) {
                    result.push(this.buf[this.currentPos + idx++]);
                }
                else {
                    this.error = true;
                }
            }
            this.currentPos += arrayLength;
            return String.fromCharCode.apply(null, result);
        }
        /**
         * @return {?}
         */
        readFloat32() {
            /** @type {?} */
            let result = NaN;
            if (this.assureRemainingBytes(4)) {
                /** @type {?} */
                let buf = new ArrayBuffer(4);
                /** @type {?} */
                let view = new DataView(buf);
                view.setUint8(0, this.buf[this.currentPos++]);
                view.setUint8(1, this.buf[this.currentPos++]);
                view.setUint8(2, this.buf[this.currentPos++]);
                view.setUint8(3, this.buf[this.currentPos++]);
                result = view.getFloat32(0, true);
            }
            else {
                this.error = true;
            }
            return result;
        }
        /**
         * @return {?}
         */
        readVec3() {
            /** @type {?} */
            let result = null;
            if (this.assureRemainingBytes(12)) {
                /** @type {?} */
                let buf = new ArrayBuffer(12);
                /** @type {?} */
                let view = new DataView(buf);
                for (let i = 0; i < 12; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec3(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true));
            }
            else {
                this.error = true;
            }
            return result;
        }
        /**
         * @return {?}
         */
        readVec4() {
            /** @type {?} */
            let result = null;
            if (this.assureRemainingBytes(16)) {
                /** @type {?} */
                let buf = new ArrayBuffer(16);
                /** @type {?} */
                let view = new DataView(buf);
                for (let i = 0; i < 16; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec4(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true), view.getFloat32(12, true));
            }
            else {
                this.error = true;
            }
            return result;
        }
    }
    modelstageappstate.BinaryReader = BinaryReader;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        BinaryReader.prototype.buf;
        /**
         * @type {?}
         * @private
         */
        BinaryReader.prototype.currentPos;
        /**
         * @type {?}
         * @private
         */
        BinaryReader.prototype.error;
    }
    class AppStateDeltaReader {
        /**
         * @param {?} reader
         */
        constructor(reader) {
            this.isInitializing = false;
            this.reader = reader;
        }
        /**
         * @return {?}
         */
        get Reader() {
            return this.reader;
        }
        /**
         * Indicates if there is data left to process.
         * @return {?}
         */
        isAtEnd() { return this.reader.AtEnd; }
        /**
         * Reads the cluster ID from the data.
         * @return {?}
         */
        readClusterID() {
            return this.reader.readString();
        }
        /**
         * Indicates if the message is an initialization message rather than a "normal" delta package.
         * This can be evaluated by the cluster to handle initialization different from updating.
         * @return {?}
         */
        get IsInitializing() {
            return this.isInitializing;
        }
    }
    modelstageappstate.AppStateDeltaReader = AppStateDeltaReader;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AppStateDeltaReader.prototype.reader;
        /**
         * @type {?}
         * @private
         */
        AppStateDeltaReader.prototype.isInitializing;
    }
    class AppStateDeltaWriter {
        /**
         * @param {?} writer
         */
        constructor(writer) {
            this.writer = writer;
        }
        /**
         * @return {?}
         */
        get Writer() {
            return this.writer;
        }
    }
    modelstageappstate.AppStateDeltaWriter = AppStateDeltaWriter;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AppStateDeltaWriter.prototype.writer;
    }
    /**
     * @abstract
     */
    class AppStateEntry {
        constructor() {
            this.transactional = false;
        }
        /**
         * @return {?}
         */
        get AppState() {
            return this.appState;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        set AppState(val) {
            this.appState = val;
        }
        /**
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        register(key, cluster) {
            this.key = key;
            this.cluster = cluster;
        }
        /**
         * @return {?}
         */
        reconcile() {
        }
        /**
         * @return {?}
         */
        setDirty() {
            this.cluster.setDirty();
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            //assert(!m_isTransactional);
            this.transactional = true;
        }
        /**
         * @return {?}
         */
        endTransaction() {
            //assert(m_isTransactional);
            this.transactional = false;
        }
        /**
         * @return {?}
         */
        isTransactional() {
            return this.transactional;
        }
        /**
         * @return {?}
         */
        isLocked() {
            return this.cluster.IsLocked;
        }
    }
    modelstageappstate.AppStateEntry = AppStateEntry;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AppStateEntry.prototype.key;
        /**
         * @type {?}
         * @private
         */
        AppStateEntry.prototype.appState;
        /**
         * @type {?}
         * @private
         */
        AppStateEntry.prototype.transactional;
        /**
         * @type {?}
         * @protected
         */
        AppStateEntry.prototype.cluster;
        /**
         * @abstract
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        AppStateEntry.prototype.deserializeDelta = function (reader, key) { };
        /**
         * @abstract
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        AppStateEntry.prototype.serializeDelta = function (writer, key) { };
        /**
         * @abstract
         * @return {?}
         */
        AppStateEntry.prototype.isDirty = function () { };
    }
    /**
     * @abstract
     */
    class CommonAppStateEntry extends AppStateEntry {
        constructor() {
            super(...arguments);
            this.changedAt = 0;
        }
        /**
         * @return {?}
         */
        beginChanging() {
            this.changedAt = Date.now();
            this.setDirty();
        }
    }
    modelstageappstate.CommonAppStateEntry = CommonAppStateEntry;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        CommonAppStateEntry.prototype.changedAt;
    }
    class AppStateStringValue extends CommonAppStateEntry {
        constructor() {
            super(...arguments);
            this.dirty = false;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set(value) {
            if (value != this.value) {
                this.changing();
                this.value = value;
            }
        }
        /**
         * @return {?}
         */
        get() {
            return this.value;
        }
        /**
         * @return {?}
         */
        getPreviousValue() {
            return this.previousValue;
        }
        /**
         * @return {?}
         */
        changing() {
            //assert(IsTransactional());
            if (!this.dirty && !this.isLocked()) {
                this.beginChanging();
                this.previousValue = this.value;
                this.dirty = true;
            }
        }
        /**
         * @return {?}
         */
        isDirty() {
            return this.dirty;
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            super.beginTransaction();
            this.dirty = false;
        }
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        deserializeDelta(reader, key) {
            /** @type {?} */
            let result = false;
            // key was read by cluster
            /** @type {?} */
            let changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
                /** @type {?} */
                let prevValue = reader.Reader.readString();
                if (prevValue != null) {
                    this.value = reader.Reader.readString();
                    this.dirty = true;
                    this.setDirty();
                    result = true;
                }
            }
            return result;
        }
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        serializeDelta(writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            writer.Writer.writeString(this.previousValue);
            writer.Writer.writeString(this.value);
        }
    }
    modelstageappstate.AppStateStringValue = AppStateStringValue;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AppStateStringValue.prototype.dirty;
        /**
         * @type {?}
         * @private
         */
        AppStateStringValue.prototype.value;
        /**
         * @type {?}
         * @private
         */
        AppStateStringValue.prototype.previousValue;
    }
    /**
     * @abstract
     * @template T
     */
    class AppStateValue extends CommonAppStateEntry {
        constructor() {
            super(...arguments);
            this.dirty = false;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set(value) {
            this.value = value;
        }
        /**
         * @return {?}
         */
        get() {
            return this.value;
        }
        /**
         * @return {?}
         */
        isDirty() {
            return this.dirty;
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            super.beginTransaction();
            this.dirty = false;
        }
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        deserializeDelta(reader, key) {
            /** @type {?} */
            let result = false;
            // key was read by cluster
            /** @type {?} */
            let changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
                /** @type {?} */
                let prevValue = this.readValue(reader);
                if (prevValue != null) {
                    this.value = this.readValue(reader);
                    this.dirty = true;
                    this.setDirty();
                    result = true;
                }
            }
            return result;
        }
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        serializeDelta(writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            this.writeValue(writer, this.previousValue);
            this.writeValue(writer, this.value);
        }
    }
    modelstageappstate.AppStateValue = AppStateValue;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AppStateValue.prototype.dirty;
        /**
         * @type {?}
         * @private
         */
        AppStateValue.prototype.value;
        /**
         * @type {?}
         * @private
         */
        AppStateValue.prototype.previousValue;
        /**
         * @abstract
         * @protected
         * @param {?} reader
         * @return {?}
         */
        AppStateValue.prototype.readValue = function (reader) { };
        /**
         * @abstract
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        AppStateValue.prototype.writeValue = function (writer, value) { };
    }
    class AppStateBoolValue extends AppStateValue {
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        readValue(reader) {
            /** @type {?} */
            let result = false;
            if (reader.Reader.assureRemainingBytes(1)) {
                result = reader.Reader.readByte() != 0;
            }
            return result;
        }
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(writer, value) {
            writer.Writer.writeByte(value ? 0xff : 0);
        }
    }
    modelstageappstate.AppStateBoolValue = AppStateBoolValue;
    class AppStateVector4Value extends AppStateValue {
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        readValue(reader) {
            /** @type {?} */
            let result = null;
            // sizeof(float) * (x,y,z,w)
            if (reader.Reader.assureRemainingBytes(4 * 4)) {
                result = new psgeometry.Vec4();
                result.x = reader.Reader.readFloat32();
                result.y = reader.Reader.readFloat32();
                result.z = reader.Reader.readFloat32();
                result.w = reader.Reader.readFloat32();
            }
            return result;
        }
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(writer, value) {
            writer.Writer.writeFloat32(value.x);
            writer.Writer.writeFloat32(value.y);
            writer.Writer.writeFloat32(value.z);
            writer.Writer.writeFloat32(value.w);
        }
    }
    modelstageappstate.AppStateVector4Value = AppStateVector4Value;
    class AppStateFloatValue extends AppStateValue {
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        readValue(reader) {
            /** @type {?} */
            let result = NaN;
            if (reader.Reader.assureRemainingBytes(4)) {
                result = reader.Reader.readFloat32();
            }
            return result;
        }
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(writer, value) {
            writer.Writer.writeFloat32(value);
        }
    }
    modelstageappstate.AppStateFloatValue = AppStateFloatValue;
    class AppStateOperation {
        /**
         * @param {?} changedAt
         * @param {?=} isLocal
         */
        constructor(changedAt, isLocal = true) {
            this.changedAt = changedAt;
            this.isLocal = isLocal;
        }
        /**
         * @return {?}
         */
        get ChangedAt() {
            return this.changedAt;
        }
        /**
         * @return {?}
         */
        get IsLocal() {
            return this.isLocal;
        }
    }
    modelstageappstate.AppStateOperation = AppStateOperation;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        AppStateOperation.prototype.changedAt;
        /**
         * @type {?}
         * @protected
         */
        AppStateOperation.prototype.isLocal;
    }
    /**
     * @template T
     */
    class AppStateValueOperation extends AppStateOperation {
        /**
         * @param {?} changedAt
         * @param {?=} newValue
         * @param {?=} previousValue
         * @param {?=} isLocal
         */
        constructor(changedAt, newValue = null, previousValue = null, isLocal = true) {
            super(changedAt, isLocal);
            this.isNewValueDefined = false;
            this.isPreviousValueDefined = false;
            if (newValue != null) {
                this.isNewValueDefined = true;
                this.newValue = newValue;
            }
            if (previousValue) {
                this.isPreviousValueDefined = true;
                this.previousValue = previousValue;
            }
        }
        /**
         * @return {?}
         */
        get IsNewValueDefined() {
            return this.isNewValueDefined;
        }
        /**
         * @return {?}
         */
        get IsPreviousValueDefined() {
            return this.isPreviousValueDefined;
        }
        /**
         * @return {?}
         */
        get NewValue() {
            return this.newValue;
        }
        /**
         * @return {?}
         */
        get PreviousValue() {
            return this.previousValue;
        }
    }
    modelstageappstate.AppStateValueOperation = AppStateValueOperation;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        AppStateValueOperation.prototype.isNewValueDefined;
        /**
         * @type {?}
         * @protected
         */
        AppStateValueOperation.prototype.isPreviousValueDefined;
        /**
         * @type {?}
         * @protected
         */
        AppStateValueOperation.prototype.newValue;
        /**
         * @type {?}
         * @protected
         */
        AppStateValueOperation.prototype.previousValue;
    }
    let OperationType;
    (function (OperationType) {
        OperationType[OperationType["Clear"] = 0] = "Clear";
        OperationType[OperationType["Append"] = 1] = "Append";
        OperationType[OperationType["Insert"] = 2] = "Insert";
        OperationType[OperationType["Remove"] = 3] = "Remove";
        OperationType[OperationType["Replace"] = 4] = "Replace";
    })(OperationType = modelstageappstate.OperationType || (modelstageappstate.OperationType = {}));
    let StorageFlags;
    (function (StorageFlags) {
        StorageFlags[StorageFlags["HasPreviousValue"] = 128] = "HasPreviousValue";
        StorageFlags[StorageFlags["HasNewValue"] = 64] = "HasNewValue";
        StorageFlags[StorageFlags["HasChangedDate"] = 32] = "HasChangedDate";
        StorageFlags[StorageFlags["ItemIndex16Bit"] = 16] = "ItemIndex16Bit";
        StorageFlags[StorageFlags["None"] = 0] = "None";
        StorageFlags[StorageFlags["Mask"] = 240] = "Mask";
    })(StorageFlags || (StorageFlags = {}));
    ;
    /**
     * @template T
     */
    class AppStateCollectionOperation extends AppStateValueOperation {
        /**
         * @param {?} changedAt
         * @param {?} operation
         * @param {?=} itemIndex
         * @param {?=} newValue
         * @param {?=} previousValue
         * @param {?=} isLocal
         */
        constructor(changedAt, operation, itemIndex = 0, newValue = null, previousValue = null, isLocal = true) {
            super(changedAt, newValue, previousValue, isLocal);
            this.operation = operation;
            this.itemIndex = itemIndex;
            this.reconciledItemIndex = itemIndex;
        }
        /**
         * @return {?}
         */
        get Operation() {
            return this.operation;
        }
        /**
         * @return {?}
         */
        get ItemIndex() {
            return this.itemIndex;
        }
        /**
         * @return {?}
         */
        get ReconciledItemIndex() {
            return this.reconciledItemIndex;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set ReconciledItemIndex(value) {
            this.reconciledItemIndex = value;
        }
    }
    modelstageappstate.AppStateCollectionOperation = AppStateCollectionOperation;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        AppStateCollectionOperation.prototype.operation;
        /**
         * @type {?}
         * @protected
         */
        AppStateCollectionOperation.prototype.itemIndex;
        /**
         * @type {?}
         * @protected
         */
        AppStateCollectionOperation.prototype.reconciledItemIndex;
    }
    /**
     * @template T
     */
    class AppStateCollection extends CommonAppStateEntry {
        /**
         * @param {?} appStateCollectionOperationType
         * @param {?=} serializeOperationChangedAt
         * @param {?=} serializePreviousValues
         */
        constructor(appStateCollectionOperationType, serializeOperationChangedAt = true, serializePreviousValues = true) {
            super();
            this.appStateCollectionOperationType = appStateCollectionOperationType;
            this.container = [];
            this.operations = [];
            this.serializeOperationChangedAt = serializeOperationChangedAt;
            this.serializePreviousValues = serializePreviousValues;
        }
        /**
         * @return {?}
         */
        get Operations() {
            return this.operations;
        }
        /**
         * @protected
         * @param {?} op
         * @return {?}
         */
        addOperation(op) {
            if (this.isTransactional()) {
                if (this.operations.length == 0) {
                    this.beginChanging();
                }
                this.operations.push(op);
            }
            else {
                console.error('AppState not transactional while adding operation to AppStateCollection');
            }
        }
        /**
         * @return {?}
         */
        clear() {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Clear));
            }
            this.container.length = 0;
        }
        /**
         * @param {?} item
         * @return {?}
         */
        append(item) {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Append, this.container.length, item));
            }
            this.container.push(item);
        }
        /**
         * @param {?} item
         * @param {?} beforeIndex
         * @return {?}
         */
        insert(item, beforeIndex) {
            if (beforeIndex <= this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Insert, beforeIndex, item));
                }
                this.container.splice(beforeIndex, 0, item);
            }
            else {
                console.error('Index out of range while inserting into AppStateCollection');
            }
        }
        /**
         * @param {?} index
         * @return {?}
         */
        remove(index) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Remove, index, null, this.container[index]));
                }
                this.container.splice(index, 1);
            }
            else {
                console.error('Index out of range while removing from AppStateCollection');
            }
        }
        /**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        replace(item, index) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Replace, index, item, this.container[index]));
                }
                this.container[index] = item;
            }
            else {
                console.error('Index out of range while replacing item in AppStateCollection');
            }
        }
        /**
         * @param {?} index
         * @return {?}
         */
        GetItemAt(index) {
            return this.container[index];
        }
        /**
         * @return {?}
         */
        get Count() {
            return this.container.length;
        }
        /**
         * @return {?}
         */
        isDirty() {
            return this.operations.length > 0;
        }
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        deserializeDelta(reader, key) {
            // key was read by cluster
            /** @type {?} */
            let changedAt = reader.Reader.readTimestamp();
            /** @type {?} */
            let operationCount = reader.Reader.readUInt32();
            /** @type {?} */
            let success = !reader.Reader.Error;
            if (success) {
                if (operationCount > 0) {
                    this.setDirty();
                }
                for (let i = 0; i < operationCount; ++i) {
                    /** @type {?} */
                    let flags = reader.Reader.readByte();
                    if (!reader.Reader.Error) {
                        /** @type {?} */
                        let storageFlags = flags & StorageFlags.Mask;
                        /** @type {?} */
                        let opType = flags & ~StorageFlags.Mask;
                        /** @type {?} */
                        let opChangedAt = changedAt;
                        /** @type {?} */
                        let itemIndex = 0;
                        /** @type {?} */
                        let newValue;
                        /** @type {?} */
                        let prevValue;
                        if (storageFlags & StorageFlags.HasChangedDate) {
                            opChangedAt = reader.Reader.readTimestamp();
                            success = success && !reader.Reader.Error;
                        }
                        if (storageFlags & StorageFlags.ItemIndex16Bit) {
                            itemIndex = reader.Reader.readUInt16();
                            success = success && !reader.Reader.Error;
                        }
                        else {
                            itemIndex = reader.Reader.readUInt32();
                            success = success && !reader.Reader.Error;
                        }
                        if (storageFlags & StorageFlags.HasNewValue) {
                            newValue = (/** @type {?} */ (this.cluster.readValue(key, reader)));
                            success = success && !reader.Reader.Error;
                        }
                        if (storageFlags & StorageFlags.HasPreviousValue) {
                            prevValue = (/** @type {?} */ (this.cluster.readValue(key, reader)));
                            success = success && !reader.Reader.Error;
                        }
                        this.operations.push(new this.appStateCollectionOperationType(opChangedAt, opType, itemIndex, newValue, prevValue, false /* IsLocal */));
                    }
                    else {
                        success = false;
                    }
                }
            }
            return success;
        }
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        serializeDelta(writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            writer.Writer.writeInt32(this.operations.length);
            this.operations.forEach((op) => {
                /** @type {?} */
                let storageFlags = (op.ItemIndex < 0x10000 ? StorageFlags.ItemIndex16Bit : StorageFlags.None) |
                    (op.IsNewValueDefined ? StorageFlags.HasNewValue : StorageFlags.None) |
                    (op.IsPreviousValueDefined && this.serializePreviousValues ? StorageFlags.HasPreviousValue : StorageFlags.None) |
                    (this.serializeOperationChangedAt ? StorageFlags.HasChangedDate : StorageFlags.None);
                writer.Writer.writeByte(op.Operation | storageFlags);
                if (storageFlags & StorageFlags.HasChangedDate) {
                    writer.Writer.writeTimestamp(op.ChangedAt);
                }
                if (storageFlags & StorageFlags.ItemIndex16Bit) {
                    writer.Writer.writeUInt16(op.ItemIndex);
                }
                else {
                    writer.Writer.writeInt32(op.ItemIndex);
                }
                if (storageFlags & StorageFlags.HasNewValue) {
                    this.cluster.writeValue(key, writer, op.NewValue);
                }
                if (storageFlags & StorageFlags.HasPreviousValue) {
                    this.cluster.writeValue(key, writer, op.PreviousValue);
                }
            });
        }
        /**
         * @return {?}
         */
        reconcile() {
            this.operations.forEach((operation) => {
                if (!operation.IsLocal) {
                    switch (operation.Operation) {
                        case OperationType.Clear:
                            this.container.length = 0;
                            operation.ReconciledItemIndex = -1;
                            break;
                        case OperationType.Append:
                            if (operation.IsNewValueDefined) {
                                this.container.push(operation.NewValue);
                                operation.ReconciledItemIndex = this.container.length - 1;
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Append reconciliation');
                            }
                            break;
                        case OperationType.Insert:
                            if (operation.IsNewValueDefined) {
                                if (operation.ItemIndex < this.container.length) {
                                    this.container.splice(operation.ItemIndex, 0, operation.NewValue);
                                    operation.ReconciledItemIndex = operation.ItemIndex;
                                }
                                else {
                                    this.container.push(operation.NewValue);
                                    operation.ReconciledItemIndex = this.container.length - 1;
                                }
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Insert reconciliation');
                            }
                            break;
                        case OperationType.Remove:
                            if (operation.IsPreviousValueDefined) {
                                if (operation.ItemIndex < this.container.length) { // && operation.PreviousValue == this.container[operation.ItemIndex]) {
                                    this.container.splice(operation.ItemIndex, 1);
                                    operation.ReconciledItemIndex = operation.ItemIndex;
                                }
                                else {
                                    operation.ReconciledItemIndex = -1;
                                    /// \todo: @UB: Locate entry and remove it depending on previous value or fail reconcile if not found.
                                }
                            }
                            else {
                                console.error('Expected previous value during AppStateCollection.Remove reconciliation');
                            }
                            break;
                        case OperationType.Replace:
                            if (operation.IsNewValueDefined) {
                                if (operation.ItemIndex < this.container.length) {
                                    this.container[operation.ItemIndex] = operation.NewValue;
                                    operation.ReconciledItemIndex = operation.ItemIndex;
                                }
                                else {
                                    operation.ReconciledItemIndex = -1;
                                    /// \todo: @UB: Locate entry and replace it depending on previous value or fail reconcile if not found.
                                }
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Replace reconciliation');
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            super.beginTransaction();
            this.operations.length = 0;
        }
    }
    modelstageappstate.AppStateCollection = AppStateCollection;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        AppStateCollection.prototype.container;
        /**
         * @type {?}
         * @protected
         */
        AppStateCollection.prototype.serializeOperationChangedAt;
        /**
         * @type {?}
         * @protected
         */
        AppStateCollection.prototype.serializePreviousValues;
        /**
         * @type {?}
         * @protected
         */
        AppStateCollection.prototype.operations;
        /**
         * @type {?}
         * @private
         */
        AppStateCollection.prototype.appStateCollectionOperationType;
    }
    class AppStateClusterManagerBase {
        constructor() {
            /**
             * A vector managing pointers to all instances of the corresponding cluster type.
             */
            this.allInstances = [];
        }
        /**
         * Adds a new instance of the corresponding cluster type to this.
         * @protected
         * @param {?} instance
         * @return {?}
         */
        addInstance(instance) {
            instance.registerEntries();
            this.allInstances.push(instance);
        }
        /**
         * Starts the transactional phase. Changes to entries and their values may only be carried out
         * during the transactional phase.
         * @return {?}
         */
        beginTransaction() {
            for (let clusterKey in this.allInstances) {
                this.allInstances[clusterKey].beginTransaction();
            }
        }
        /**
         * Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        endTransaction() {
            for (let clusterKey in this.allInstances) {
                this.allInstances[clusterKey].endTransaction();
            }
        }
        /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state.
         * @param {?} scene
         * @return {?}
         */
        applyChanges(scene) {
            for (let clusterKey in this.allInstances) {
                /** @type {?} */
                let cluster = this.allInstances[clusterKey];
                if (cluster.isDirty()) {
                    cluster.applyChanges(scene, cluster.PeerID, cluster.InstanceID);
                    scene.setDirty();
                }
            }
        }
        /**
         * Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        serializeClusterInstanceData(cluster, deltaWriter, appState) {
        }
        /**
         * Serializes all changes that have been carried out on clusters of the corresponding type.
         * @param {?} deltaWriter
         * @param {?} clusterID
         * @param {?} appState
         * @return {?}
         */
        serializeTransaction(deltaWriter, clusterID, appState) {
            /** @type {?} */
            let dirtyClusters = [];
            for (let clusterKey in this.allInstances) {
                /** @type {?} */
                let cluster = this.allInstances[clusterKey];
                if (cluster.isDirty()) {
                    dirtyClusters.push(cluster);
                }
            }
            if (dirtyClusters.length > 0) {
                deltaWriter.Writer.writeString(clusterID);
                deltaWriter.Writer.writeUInt16(dirtyClusters.length);
                dirtyClusters.forEach((cluster) => {
                    this.serializeClusterInstanceData(cluster, deltaWriter, appState);
                    cluster.serializeTransaction(deltaWriter, appState);
                });
            }
        }
        /**
         * Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, appState, scene) {
            return false;
        }
    }
    modelstageappstate.AppStateClusterManagerBase = AppStateClusterManagerBase;
    if (false) {
        /**
         * A vector managing pointers to all instances of the corresponding cluster type.
         * @type {?}
         * @protected
         */
        AppStateClusterManagerBase.prototype.allInstances;
    }
    /**
     * Concrete subclass of AppStateClusterManagerBase that provides a single, global instance of the specified cluster type.
     * @template TAppStateCluster
     */
    class GlobalAppStateClusterManager extends AppStateClusterManagerBase {
        /**
         * @param {?} clusterTypeID
         * @param {?} clusterType
         */
        constructor(clusterTypeID, clusterType) {
            super();
            this.clusterType = clusterType;
            this.onlyInstance = new clusterType();
            AppState.GetInstance().addCluster(clusterTypeID, this);
            this.addInstance(this.onlyInstance);
        }
        /**
         * Gets the only instance of this cluster type.
         * @return {?}
         */
        getGlobalCluster() {
            return this.onlyInstance;
        }
        /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        serializeClusterInstanceData(cluster, deltaWriter, appState) {
        }
        /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
         * additional data from the reader.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, appState, scene) {
            /** @type {?} */
            let success = false;
            /** @type {?} */
            let instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (let i = 0; i < instanceCount; ++i) {
                    /** @type {?} */
                    let cluster = this.getGlobalCluster();
                    success = cluster.deserializeTransaction(deltaReader, appState, scene);
                }
            }
            return success;
        }
    }
    modelstageappstate.GlobalAppStateClusterManager = GlobalAppStateClusterManager;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        GlobalAppStateClusterManager.prototype.onlyInstance;
        /**
         * @type {?}
         * @private
         */
        GlobalAppStateClusterManager.prototype.clusterType;
    }
    /**
     * Concrete subclass of AppStateClusterManagerBase that distinguishes local and remote instances of the
     * corresponding cluster type (derived from AppStateCluster). Each peer may have zero or one instances of the cluster type.
     * @template TAppStateCluster
     */
    class LocalAppStateClusterManager extends AppStateClusterManagerBase {
        /**
         * @param {?} clusterTypeID
         * @param {?} clusterType
         */
        constructor(clusterTypeID, clusterType) {
            super();
            this.clusterType = clusterType;
            /**
             * The map of cluster per peer.
             */
            this.peerClusters = {};
            this.peerClusters[''] = new clusterType();
            AppState.GetInstance().addCluster(clusterTypeID, this);
            this.addInstance(this.peerClusters['']);
        }
        /**
         * Gets the local peer's instance of this cluster type.
         * @return {?}
         */
        getLocalCluster() {
            return (/** @type {?} */ (this.allInstances['']));
        }
        /**
         * \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
         * it's created.
         * @param {?} peerID
         * @return {?}
         */
        getCluster(peerID) {
            /** @type {?} */
            let result = null;
            if (!this.containsCluster(peerID)) {
                result = new this.clusterType();
                this.peerClusters[peerID] = result;
                result.PeerID = peerID;
                this.addInstance(result);
            }
            else {
                result = (/** @type {?} */ (this.peerClusters[peerID]));
            }
            return result;
        }
        /**
         * Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
         * @param {?} peerID
         * @return {?}
         */
        containsCluster(peerID) {
            return this.peerClusters[peerID] != null;
        }
        /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
         * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        serializeClusterInstanceData(cluster, deltaWriter, appState) {
            /** @type {?} */
            let peerID = cluster.PeerID;
            // Use local peerID if the cluster's peer ID is empty.
            deltaWriter.Writer.writeString(peerID.length == 0 ? appState.LocalPeerID : peerID);
        }
        /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
         * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
         * key (empty string) that is used to identify local peer data.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, appState, scene) {
            /** @type {?} */
            let success = false;
            /** @type {?} */
            let instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (let i = 0; i < instanceCount; ++i) {
                    /** @type {?} */
                    let peerID = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {
                        if (peerID == appState.LocalPeerID) {
                            peerID = '';
                        }
                        /** @type {?} */
                        let cluster = this.getCluster(peerID);
                        success = cluster.deserializeTransaction(deltaReader, appState, scene);
                    }
                }
            }
            return success;
        }
    }
    modelstageappstate.LocalAppStateClusterManager = LocalAppStateClusterManager;
    if (false) {
        /**
         * The map of cluster per peer.
         * @type {?}
         * @private
         */
        LocalAppStateClusterManager.prototype.peerClusters;
        /**
         * @type {?}
         * @private
         */
        LocalAppStateClusterManager.prototype.clusterType;
    }
    /**
     * AppStateCluster instances store information about the application state. Based on application state, changes
     * to the view state are carried out. In order to be able to synchronize application state, operations on the entries that
     * are aggregated by AppStateCluster,  are stored during a "transactional phase". Immediately afterwards, all changes are
     * collected and sync'ed with remote peers. Similarly, when remote changes are received, they are processed after the local
     * collection took place, causing app state changes. Finally, all cluster's entry's changes are processed to update the
     * application's view state.
     * @abstract
     */
    class AppStateCluster {
        /**
         * Constructor
         * @param {?=} peerID 		The peer ID this cluster instance belongs to. If it's left empty, the local peer's ID will be used.
         * @param {?=} instanceID 	The peer-unique instance ID. This ID is only necessary, if multi-instances are used (per peer). This depends on the AppStateClusterManager used to manage instances.
         * @param {?=} appState 		The app state container this cluster belongs to.
         */
        constructor(peerID, instanceID, appState) {
            this.entries = {};
            this.dirty = false;
            this.lockCount = 0;
            this.peerID = peerID || '';
            this.instanceID = instanceID || '';
            this.appState = appState || AppState.GetInstance();
        }
        /**
         * @return {?}
         */
        get PeerID() {
            return this.peerID;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set PeerID(value) {
            this.peerID = value;
        }
        /**
         * @return {?}
         */
        get InstanceID() {
            return this.instanceID;
        }
        /**
         * @return {?}
         */
        beginTransaction() {
            this.dirty = false;
            for (let entryIdx in this.entries) {
                this.entries[entryIdx].beginTransaction();
            }
        }
        /**
         * @return {?}
         */
        endTransaction() {
            for (let entryIdx in this.entries) {
                this.entries[entryIdx].endTransaction();
            }
        }
        /**
         * @private
         * @param {?} scene
         * @return {?}
         */
        reconcile(scene) {
            for (let entryIdx in this.entries) {
                this.entries[entryIdx].reconcile();
            }
        }
        /**
         * @return {?}
         */
        setDirty() {
            this.dirty = true;
        }
        /**
         * @return {?}
         */
        isDirty() {
            return this.dirty;
        }
        /**
         * @param {?} key
         * @param {?} entry
         * @return {?}
         */
        registerEntry(key, entry) {
            this.entries[key] = entry;
            entry.register(key, this);
        }
        /**
         * ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
         * override ApplyChanges to update the view state based on the app state changes that occured.
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        applyChanges(scene, peerID, instanceID) {
        }
        /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        serializeTransaction(deltaWriter, appState) {
            // setIsInitializing(deltaWriter.IsInitialization());
            // setIsInitializing(deltaWriter.IsInitialization());
            /** @type {?} */
            let dirtyEntries = [];
            for (let idx in this.entries) {
                if (this.entries[idx].isDirty()) {
                    dirtyEntries.push({ key: idx, entry: this.entries[idx] });
                }
            }
            deltaWriter.Writer.writeUInt16(dirtyEntries.length);
            dirtyEntries.forEach((e) => {
                e.entry.serializeDelta(deltaWriter, e.key);
            });
        }
        /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        deserializeTransaction(deltaReader, appState, scene) {
            /** @type {?} */
            let success = true;
            /** @type {?} */
            let entryCount = deltaReader.Reader.readUInt16();
            // setIsInitializing(deltaReader.IsInitializing());
            if (!deltaReader.Reader.Error) {
                for (let i = 0; i < entryCount && success; ++i) {
                    /** @type {?} */
                    let entryKey = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {
                        /** @type {?} */
                        let entry = this.entries[entryKey];
                        if (entry) {
                            success = entry.deserializeDelta(deltaReader, entryKey);
                        }
                        else {
                            success = false;
                        }
                    }
                    else {
                        success = false;
                    }
                }
            }
            else {
                success = false;
            }
            if (success) {
                this.reconcile(scene);
            }
            return success;
        }
        /**
         * @return {?}
         */
        lock() {
            ++this.lockCount;
        }
        /**
         * @return {?}
         */
        unlock() {
            --this.lockCount;
        }
        /**
         * @return {?}
         */
        get IsLocked() {
            return this.lockCount > 0;
        }
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        readValue(key, reader) {
            console.error('readValue not implemented for ' + key);
        }
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(key, writer, value) {
            console.error('writeValue not implemented for ' + key);
        }
    }
    modelstageappstate.AppStateCluster = AppStateCluster;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AppStateCluster.prototype.peerID;
        /**
         * @type {?}
         * @private
         */
        AppStateCluster.prototype.instanceID;
        /**
         * @type {?}
         * @private
         */
        AppStateCluster.prototype.appState;
        /**
         * @type {?}
         * @private
         */
        AppStateCluster.prototype.entries;
        /**
         * @type {?}
         * @private
         */
        AppStateCluster.prototype.dirty;
        /**
         * @type {?}
         * @private
         */
        AppStateCluster.prototype.lockCount;
        /**
         * Registers all entries on creation of a new cluster instance. Must be overriden by concrete clusters.
         * @abstract
         * @return {?}
         */
        AppStateCluster.prototype.registerEntries = function () { };
    }
    class Director {
        /**
         * @param {?} appState
         */
        constructor(appState) {
            this.pendingUpdates = [];
            this.pendingMessages = [];
            this.appState = appState;
        }
        /**
         * @param {?} scene
         * @return {?}
         */
        set Scene(scene) {
            this.scene = scene;
        }
        /**
         * Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
         * BeginUpdate is called at the very beginning of each render cycle.
         * @return {?}
         */
        beginFrame() {
            this.appState.beginTransaction();
        }
        /**
         * @return {?}
         */
        commit() {
            this.acquirePendingUpdates().forEach((updFunc) => {
                updFunc();
            });
            this.appState.endTransaction();
        }
        /**
         * Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
         * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
         * @param {?} connection
         * @return {?}
         */
        submitLocalUpdates(connection) {
            /** @type {?} */
            const AppStateDelta = 0x0100;
            /** @type {?} */
            let writer = new AppStateDeltaWriter(new BinaryWriter());
            writer.Writer.writeInt32(1);
            writer.Writer.writeInt32(AppStateDelta);
            this.appState.serializeTransaction(writer);
            /** @type {?} */
            let buf = writer.Writer.flush();
            /** @type {?} */
            let msg = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
            if (msg.HasPayload && connection.IsConnected) {
                connection.send(msg.Content);
            }
        }
        /**
         * Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after
         * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
         * @return {?}
         */
        applyRemoteUpdates() {
            /** @type {?} */
            let pendingMessages = this.acquirePendingMessages();
            pendingMessages.forEach((msg) => {
                this.appState.deserializeTransaction(new AppStateDeltaReader(new BinaryReader(msg.Content)), this.scene);
            });
        }
        /**
         * @private
         * @return {?}
         */
        acquirePendingUpdates() {
            /** @type {?} */
            let result = this.pendingUpdates;
            this.pendingUpdates = [];
            return result;
        }
        /**
         * @private
         * @return {?}
         */
        acquirePendingMessages() {
            /** @type {?} */
            let result = this.pendingMessages;
            this.pendingMessages = [];
            return result;
        }
        /**
         * Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
         * @return {?}
         */
        endFrame() {
            this.appState.applyChanges(this.scene);
        }
        /**
         * @param {?} message
         * @return {?}
         */
        receivedMessage(message) {
            this.pendingMessages.push(message);
        }
        /**
         * @param {?} func
         * @return {?}
         */
        synchronizeStateUpdate(func) {
            this.pendingUpdates.push(func);
        }
    }
    modelstageappstate.Director = Director;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        Director.prototype.scene;
        /**
         * @type {?}
         * @protected
         */
        Director.prototype.appState;
        /**
         * @type {?}
         * @private
         */
        Director.prototype.pendingUpdates;
        /**
         * @type {?}
         * @private
         */
        Director.prototype.pendingMessages;
    }
    class DirectedSceneWebGL extends modelstageweb.SceneWebGL {
        /**
         * @param {?} director
         * @param {?} connection
         */
        constructor(director, connection) {
            super();
            this.director = director;
            this.connection = connection;
        }
        /**
         * @return {?}
         */
        beginFrame() {
            this.director.beginFrame();
        }
        /**
         * @return {?}
         */
        update() {
            this.director.commit();
            if (this.connection && this.connection.IsConnected) {
                this.director.submitLocalUpdates(this.connection);
                this.director.applyRemoteUpdates();
            }
        }
        /**
         * @return {?}
         */
        endFrame() {
            this.director.endFrame();
        }
        /**
         * @param {?} message
         * @return {?}
         */
        receivedMessage(message) {
            if (message.MessageType == modelstageweb.CommonMessageTypes.AppStateDelta || message.MessageType == modelstageweb.CommonMessageTypes.AppStateInitialization) {
                this.director.receivedMessage(message);
            }
        }
        /**
         * @param {?} func
         * @return {?}
         */
        synchronizeStateUpdate(func) {
            this.director.synchronizeStateUpdate(func);
        }
    }
    modelstageappstate.DirectedSceneWebGL = DirectedSceneWebGL;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        DirectedSceneWebGL.prototype.director;
        /**
         * @type {?}
         * @private
         */
        DirectedSceneWebGL.prototype.connection;
    }
})(modelstageappstate || (modelstageappstate = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXgtYXBwc3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbW9kZWxzdGFnZS8iLCJzb3VyY2VzIjpbInNyYy9teC1hcHBzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU1QyxNQUFNLEtBQVEsa0JBQWtCLENBNCtDL0I7QUE1K0NELFdBQWMsa0JBQWtCOzs7Ozs7Ozs7Ozs7OztJQWM1QixNQUFhLFlBQVk7UUFBekI7WUFDWSxvQkFBZSxHQUFrRCxFQUFFLENBQUM7UUFvRmhGLENBQUM7Ozs7UUFoRkcsSUFBVyxXQUFXO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7OztRQUVELElBQVcsV0FBVyxDQUFDLEtBQWE7WUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQzs7Ozs7UUFFTSxpQkFBaUIsQ0FBQyxHQUFXO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7Ozs7O1FBSU0sVUFBVSxDQUFDLEdBQVcsRUFBRSxPQUFtQztZQUM5RCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUV4QyxDQUFDOzs7Ozs7UUFLTSxnQkFBZ0I7WUFDbkIsS0FBSyxJQUFJLGlCQUFpQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzlEO1FBQ0wsQ0FBQzs7Ozs7O1FBS00sY0FBYztZQUNqQixLQUFLLElBQUksaUJBQWlCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FB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SSxPQUFPLENBQUMsV0FBVyxJQUFJLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxhQUFhLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUU7Z0JBQ3pKLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFDO1FBQ0wsQ0FBQzs7Ozs7UUFFTSxzQkFBc0IsQ0FBQyxJQUFnQjtZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FFSjtJQXZDWSxxQ0FBa0IscUJBdUM5QixDQUFBOzs7Ozs7UUFyQ0csc0NBQTZCOzs7OztRQUU3Qix3Q0FBbUQ7O0FBcUMzRCxDQUFDLEVBNStDYSxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBNCtDL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gTW9kZWxTdGFnZSDCqSAyMDE4IFBsYW5zeXN0ZW1lIEdtYkgsIEhhbWJ1cmcsIEdlcm1hbnkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQgeyBwc2dlb21ldHJ5IH0gZnJvbSAnLi9wcy1nZW9tZXRyeSc7XHJcbmltcG9ydCB7IG1vZGVsc3RhZ2V3ZWIgfSBmcm9tICcuL214LWNvbW1vbic7XHJcblxyXG5leHBvcnQgbW9kdWxlIG1vZGVsc3RhZ2VhcHBzdGF0ZSB7XHJcblxyXG4gICAgLyoqIFRoZSBiYXNlIGNsYXNzIGZvciBsb2NhbCBhcHAgc3RhdGUgc3RvcmFnZS5cclxuICAgICAgKlxyXG4gICAgICAqIEFwcCBzdGF0ZSBkYXRhIGlzIG9yZ2FuaXplZCBpbiBjbHVzdGVycy4gRWFjaCBjbHVzdGVyIGhhcyBhIGRpc3RpbmN0IGRhdGEgbGF5b3V0IGNvbXBhcmFibGUgdG8gYSBzdHJ1Y3QgZGF0YSB0eXBlLlxyXG4gICAgICAqIEEgY2x1c3RlciBjYW4gc3RvcmUgYW5kIG1hbmFnZSBtdWx0aXBsZSB2YWx1ZXMgKEFwcFN0YXRlRW50cnkpLiBEZXBlbmRpbmcgb24gdGhlIG5hdHVyZSBvZiB0aGUgZGF0YSwgaXQgY2FuIGJlIGdsb2JhbFxyXG4gICAgICAqIChzaGFyZWQgYW1vbmcgYWxsIHBlZXJzKSBvciBsb2NhbCAoZWFjaCBwZWVyIGhhcyBpdHMgb3duIGNvcHkgb2YgdGhlIGNsdXN0ZXIgYW5kIGlzIGF3YXJlIG9mIHRoZSByZW1vdGUgcGVlcidzIGluc3RhbmNlcykuXHJcbiAgICAgICogQmVzaWRlcyB0aGF0LCBnbG9iYWwgYXMgd2VsbCBhcyBsb2NhbCBjbHVzdGVycyBjYW4gYmUgc2luZ2xlLWluc3RhbmNlIG9yIG11bHRpLWluc3RhbmNlLiBHbG9iYWwsIHNpbmdsZS1pbnN0YW5jZSBkYXRhIGV4aXN0c1xyXG4gICAgICAqIG9ubHkgb25jZS4gR2xvYmFsLCBtdWx0aS1pbnN0YW5jZSBkYXRhIGlzIHNoYXJlZCBhbW9uZyBhbGwgcGVlcnMsIGJ1dCBjYW4gY29uc2lzdCBvZiBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgdGhlIHNhbWUgXHJcbiAgICAgICogXCJyZWNvcmRcIi4gRWFjaCBpbnN0YW5jZSBoYXMgYSBwZWVyIElEIGFuZCBhbiBpbnN0YW5jZSBJRCBib3RoIElEIGZpZWxkcyB0b2dldGhlciBidWlsZCBhIFwiZ2xvYmFsbHlcIiB1bmlxdWUgSUQuIEZvclxyXG4gICAgICAqIGxvY2FsLCBzaW5nbGUtaW5zdGFuY2UgY2x1c3RlcnMsIGVhY2ggcGVlciBtYXkgb3IgbWF5IG5vdCBoYXZlIGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBjbHVzdGVyLCBmb3IgbG9jYWwsIG11bHRpLWluc3RhbmNlXHJcbiAgICAgICogY2x1c3RlcnMsIGVhY2ggcGVlciBtYXkgaGF2ZSB6ZXJvIG9yIG1vcmUgaW5zdGFuY2VzIG9mIHRoZSBjbHVzdGVyLCBhZ2FpbiBpZGVudGlmaWVkIGJ5IGEgY29tYmluYXRpb24gb2YgYSBwZWVyIElEIGFuZCBhblxyXG4gICAgICAqIGluc3RhbmNlIElELlxyXG4gICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlQmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBjbHVzdGVyTWFuYWdlcnM6IHsgW2tleTogc3RyaW5nXTogQXBwU3RhdGVDbHVzdGVyTWFuYWdlckJhc2UgfSA9IHt9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGxvY2FsUGVlcklEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTG9jYWxQZWVySUQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxQZWVySUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IExvY2FsUGVlcklEKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbFBlZXJJRCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldENsdXN0ZXJNYW5hZ2VyKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsdXN0ZXJNYW5hZ2Vyc1trZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEFkZHMgYSBjZXJ0YWluIGNsdXN0ZXIgdHlwZSAoZ2xvYmFsL2xvY2FsLCBzaW5nbGUvbXVsdGkpIHRvIHRoZSBhcHAgc3RhdGUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhZGRDbHVzdGVyKGtleTogc3RyaW5nLCBjbHVzdGVyOiBBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyQmFzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsdXN0ZXJNYW5hZ2Vyc1trZXldID0gY2x1c3RlcjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogU3RhcnRzIHRoZSB0cmFuc2FjdGlvbmFsIHBoYXNlIG9mIHRoZSBhcHAgc3RhdGUuIENoYW5nZXMgdG8gZW50cmllcyBhbmQgdGhlaXIgdmFsdWVzIG1heSBvbmx5IGJlIGNhcnJpZWQgb3V0XHJcbiAgICAgICAgICAqIGR1cmluZyB0aGUgdHJhbnNhY3Rpb25hbCBwaGFzZSBvZiB0aGUgYXBwIHN0YXRlLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYmVnaW5UcmFuc2FjdGlvbigpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY2x1c3Rlck1hbmFnZXJLZXkgaW4gdGhpcy5jbHVzdGVyTWFuYWdlcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3Rlck1hbmFnZXJzW2NsdXN0ZXJNYW5hZ2VyS2V5XS5iZWdpblRyYW5zYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBFbmRzIHRoZSB0cmFuc2FjdGlvbmFsIHBoYXNlIG9mIHRoZSBhcHAgc3RhdGUuIEFmdGVyd2FyZHMsIHRoZSBzeW5jaHJvbmlzYXRpb24gdGFrZXMgcGxhY2UuIFRvIGVuc3VyZSB0aGF0IGxvY2FsIHN0YXRlXHJcbiAgICAgICAgICAqIGNoYW5nZXMgYXJlbid0IG1pc3NlZCwgYW4gZXhjZXB0aW9uIGlzIHRocm93biBpZiB0aGUgc3RhdGUgaXMgbm90IHRyYW5zYWN0aW9uYWwgd2hlbiBlbnRyaWVzIG9yIHRoZWlyIHZhbHVlcyBhcmUgYmVpbmcgY2hhbmdlZC5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGVuZFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjbHVzdGVyTWFuYWdlcktleSBpbiB0aGlzLmNsdXN0ZXJNYW5hZ2Vycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbHVzdGVyTWFuYWdlcnNbY2x1c3Rlck1hbmFnZXJLZXldLmVuZFRyYW5zYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcHBsaWVzIGFwcCBzdGF0ZSBjaGFuZ2VzIHRvIHRoZSB2aWV3IHN0YXRlIG9mIHRoZSBhcHBsaWNhdGlvbi4gVGhpcyBtZXRob2QgaXMgYmVpbmcgY2FsbGVkIGFmdGVyIGFsbCBsb2NhbCBjaGFuZ2VzIGhhdmVcclxuICAgICAgICAgICogYmVlbiBjYXJyaWVkIG91dCAodGhlIFwidHJhbnNhY3Rpb25hbCBwaGFzZVwiKSBhbmQgYWZ0ZXIgdGhlIHN5bmNocm9uaXNhdGlvbiB0b29rIHBsYWNlLiBUaGVyZWZvcmUsIGFsbCBjaGFuZ2VzIGZvciB0aGUgY3VycmVudFxyXG4gICAgICAgICAgKiB1cGRhdGUgY3ljbGUgaGF2ZSBiZWVuIGNhcnJpZWQgb3V0IGFuZCB3aWxsIGJlIHJlZmxlY3RlZCBpbiB0aGUgdmlldyBzdGF0ZS4gVGhpcyBtZXRob2Qgd2lsbCBiZSB1c2VkIGluIGNsaWVudC10eXBlIGFwcGxpY2F0aW9ucyB0aGF0XHJcbiAgICAgICAgICAqIG5lZWQgdG8gbWFpbnRhaW4gYSB2aWV3IHN0YXRlLiBGb3Igc2VydmVyLXR5cGUgYXBwbGljYXRpb25zLCB3aGVyZSB0aGlzIGlzIG5vdCB0aGUgY2FzZSwgdXNlIFxccmVmIFByb2Nlc3NDaGFuZ2VzKCkgaW5zdGVhZC5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGFwcGx5Q2hhbmdlcyhzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNsdXN0ZXJNYW5hZ2VyS2V5IGluIHRoaXMuY2x1c3Rlck1hbmFnZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsdXN0ZXJNYW5hZ2Vyc1tjbHVzdGVyTWFuYWdlcktleV0uYXBwbHlDaGFuZ2VzKHNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFdyaXRlcyBhbGwgbG9jYWwgb3BlcmF0aW9ucyB0aGF0IGhhdmUgYmVlbiBjYXJyaWVkIG91dCBkdXJpbmcgdGhlIHRyYW5zYWN0aW9uYWwgcGhhc2Ugb2YgdGhpcyB1cGRhdGUgY3ljbGUgKFwiRGVsdGFcIikuIFxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2VyaWFsaXplVHJhbnNhY3Rpb24oZGVsdGFXcml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY2x1c3Rlck1hbmFnZXJLZXkgaW4gdGhpcy5jbHVzdGVyTWFuYWdlcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3Rlck1hbmFnZXJzW2NsdXN0ZXJNYW5hZ2VyS2V5XS5zZXJpYWxpemVUcmFuc2FjdGlvbihkZWx0YVdyaXRlciwgY2x1c3Rlck1hbmFnZXJLZXksIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUmV0cmlldmVzIGFsbCByZW1vdGUgb3BlcmF0aW9ucyB0aGF0IGhhdmUgYmVlbiByZWNlaXZlZCBmcm9tIHJlbW90ZSBwZWVycy5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGRlc2VyaWFsaXplVHJhbnNhY3Rpb24oZGVsdGFSZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIsIHNjZW5lOiBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKCFkZWx0YVJlYWRlci5pc0F0RW5kKCkgJiYgc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXJJRCA9IGRlbHRhUmVhZGVyLnJlYWRDbHVzdGVySUQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2x1c3RlcklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXJNYW5hZ2VyID0gdGhpcy5jbHVzdGVyTWFuYWdlcnNbY2x1c3RlcklEXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2x1c3Rlck1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IGNsdXN0ZXJNYW5hZ2VyLmRlc2VyaWFsaXplVHJhbnNhY3Rpb24oZGVsdGFSZWFkZXIsIHRoaXMsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXBwU3RhdGUgZXh0ZW5kcyBBcHBTdGF0ZUJhc2Uge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIEdldEluc3RhbmNlKCk6IEFwcFN0YXRlIHtcclxuICAgICAgICAgICAgaWYgKCFBcHBTdGF0ZS5JbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgQXBwU3RhdGUuSW5zdGFuY2UgPSBuZXcgQXBwU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQXBwU3RhdGUuSW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBCaW5hcnlXcml0ZXIge1xyXG4gICAgICAgIHByaXZhdGUgYnVmOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbHVzaCgpOiBVaW50OEFycmF5IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXQodGhpcy5idWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlQnl0ZSh2YWw6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKHZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVJbnQxNih2YWw6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKHZhbCAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDgpICYgMHhmZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVVSW50MTYodmFsOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5idWYucHVzaCh2YWwgJiAweGZmLFxyXG4gICAgICAgICAgICAgICAgKHZhbCA+PiA4KSAmIDB4ZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlSW50MzIodmFsOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5idWYucHVzaCh2YWwgJiAweGZmLFxyXG4gICAgICAgICAgICAgICAgKHZhbCA+PiA4KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDE2KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDI0KSAmIDB4ZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlSW50NjQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5idWYucHVzaCh2YWwgJiAweGZmLFxyXG4gICAgICAgICAgICAgICAgKHZhbCA+PiA4KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDE2KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDI0KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDMyKSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDQwKSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDQ4KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDU2KSAmIDB4ZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlVGltZXN0YW1wKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVJbnQ2NCh2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlRmxvYXQzMih2YWw6IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgYnVmID0gbmV3IEFycmF5QnVmZmVyKDQpO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoMCwgdmFsLCB0cnVlKTtcclxuICAgICAgICAgICAgbGV0IGJ5dGVCdWYgPSBuZXcgSW50OEFycmF5KGJ1Zik7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmLnB1c2guYXBwbHkoYnl0ZUJ1Zik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVTdHJpbmcodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy53cml0ZUludDMyKHZhbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlQ2hhckFycmF5KHZhbCwgdmFsLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVDaGFyQXJyYXkodmFsOiBzdHJpbmcsIGFycmF5TGVuZ3RoOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgYXJyYXlMZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKGlkeCA8IHZhbC5sZW5ndGggPyB2YWwuY2hhckNvZGVBdChpZHgpIDogMHgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB3cml0ZVdpZGVDaGFyQXJyYXkodmFsOiBzdHJpbmcsIGFycmF5TGVuZ3RoOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgYXJyYXlMZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKGlkeCA8IHZhbC5sZW5ndGggPyB2YWwuY2hhckNvZGVBdChpZHgpICYgMHhmZiA6IDB4MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaWR4IDwgdmFsLmxlbmd0aCA/ICh2YWwuY2hhckNvZGVBdChpZHgpID4+IDgpICYgMHhmZiA6IDB4MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVWZWMzKHZhbDogcHNnZW9tZXRyeS5WZWM0KSB7XHJcbiAgICAgICAgICAgIGxldCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMTIpO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoMCwgdmFsLngsIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoNCwgdmFsLnksIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoOCwgdmFsLnosIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgYnl0ZUJ1ZiA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmLnB1c2guYXBwbHkoYnl0ZUJ1Zik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVWZWM0KHZhbDogcHNnZW9tZXRyeS5WZWM0KSB7XHJcbiAgICAgICAgICAgIGxldCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMTYpO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoMCwgdmFsLngsIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoNCwgdmFsLnksIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoOCwgdmFsLnosIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoMTIsIHZhbC53LCB0cnVlKTtcclxuICAgICAgICAgICAgbGV0IGJ5dGVCdWYgPSBuZXcgVWludDhBcnJheShidWYpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKGJ5dGVCdWZbMF0sIGJ5dGVCdWZbMV0sIGJ5dGVCdWZbMl0sIGJ5dGVCdWZbM10sXHJcbiAgICAgICAgICAgICAgICBieXRlQnVmWzRdLCBieXRlQnVmWzVdLCBieXRlQnVmWzZdLCBieXRlQnVmWzddLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUJ1Zls4XSwgYnl0ZUJ1Zls5XSwgYnl0ZUJ1ZlsxMF0sIGJ5dGVCdWZbMTFdLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUJ1ZlsxMl0sIGJ5dGVCdWZbMTNdLCBieXRlQnVmWzE0XSwgYnl0ZUJ1ZlsxNV1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEJpbmFyeVJlYWRlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBidWY6IFVpbnQ4QXJyYXk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFBvczogbnVtYmVyID0gODtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBlcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEVycm9yKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQXRFbmQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3MgPj0gdGhpcy5idWYuYnl0ZUxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGJ1ZjogVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZiA9IGJ1ZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhc3N1cmVSZW1haW5pbmdCeXRlcyhjb3VudDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3MgKyBjb3VudCA8PSB0aGlzLmJ1Zi5ieXRlTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRCeXRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFOO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZFVJbnQxNigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlcygyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICogMjU2O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFOO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZFVJbnQ2NCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlcyg4KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICogMjU2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MrK10gKiA2NTUzNiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICogMTY3NzcyMTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSAqIDQyOTQ5NjcyOTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSAqIDEwOTk1MTE2Mjc3NzYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSAqIDI4MTQ3NDk3NjcxMDY1NiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICogNzIwNTc1OTQwMzc5Mjc5MzY7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYU47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkVUludDMyKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MrK10gKiAyNTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSAqIDY1NTM2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MrK10gKiAxNjc3NzIxNjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hTjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSB0aGlzLnJlYWRVSW50MzIoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlcyhsZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5yZWFkQ2hhckFycmF5KGxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZFRpbWVzdGFtcCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkVUludDY0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZENoYXJBcnJheShhcnJheUxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgaWR4ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKGlkeCA8IGFycmF5TGVuZ3RoICYmIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcyArIGlkeF0gIT0gMHgwMCAmJiAhdGhpcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBvcyA8IHRoaXMuYnVmLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MgKyBpZHgrK10pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQb3MgKz0gYXJyYXlMZW5ndGg7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZEZsb2F0MzIoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE5hTjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmID0gbmV3IEFycmF5QnVmZmVyKDQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMCwgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMSwgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMiwgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMywgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB2aWV3LmdldEZsb2F0MzIoMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkVmVjMygpOiBwc2dlb21ldHJ5LlZlYzMge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDEyKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigxMik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OChpLCB0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IHBzZ2VvbWV0cnkuVmVjMyh2aWV3LmdldEZsb2F0MzIoMCwgdHJ1ZSksIHZpZXcuZ2V0RmxvYXQzMig0LCB0cnVlKSwgdmlldy5nZXRGbG9hdDMyKDgsIHRydWUpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRWZWM0KCk6IHBzZ2VvbWV0cnkuVmVjNCB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYXNzdXJlUmVtYWluaW5nQnl0ZXMoMTYpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmID0gbmV3IEFycmF5QnVmZmVyKDE2KTtcclxuICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1Zik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQ4KGksIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgcHNnZW9tZXRyeS5WZWM0KHZpZXcuZ2V0RmxvYXQzMigwLCB0cnVlKSwgdmlldy5nZXRGbG9hdDMyKDQsIHRydWUpLCB2aWV3LmdldEZsb2F0MzIoOCwgdHJ1ZSksIHZpZXcuZ2V0RmxvYXQzMigxMiwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBcHBTdGF0ZURlbHRhUmVhZGVyIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRlcjogQmluYXJ5UmVhZGVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGlzSW5pdGlhbGl6aW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUmVhZGVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihyZWFkZXI6IEJpbmFyeVJlYWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRlciA9IHJlYWRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBJbmRpY2F0ZXMgaWYgdGhlcmUgaXMgZGF0YSBsZWZ0IHRvIHByb2Nlc3MuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBpc0F0RW5kKCkgeyByZXR1cm4gdGhpcy5yZWFkZXIuQXRFbmQ7IH1cclxuXHJcbiAgICAgICAgLyoqIFJlYWRzIHRoZSBjbHVzdGVyIElEIGZyb20gdGhlIGRhdGEuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZWFkQ2x1c3RlcklEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRlci5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSW5kaWNhdGVzIGlmIHRoZSBtZXNzYWdlIGlzIGFuIGluaXRpYWxpemF0aW9uIG1lc3NhZ2UgcmF0aGVyIHRoYW4gYSBcIm5vcm1hbFwiIGRlbHRhIHBhY2thZ2UuIFxyXG4gICAgICAgICAgKiBUaGlzIGNhbiBiZSBldmFsdWF0ZWQgYnkgdGhlIGNsdXN0ZXIgdG8gaGFuZGxlIGluaXRpYWxpemF0aW9uIGRpZmZlcmVudCBmcm9tIHVwZGF0aW5nLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0IElzSW5pdGlhbGl6aW5nKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0luaXRpYWxpemluZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlRGVsdGFXcml0ZXIge1xyXG4gICAgICAgIHByaXZhdGUgd3JpdGVyOiBCaW5hcnlXcml0ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgV3JpdGVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy53cml0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcih3cml0ZXI6IEJpbmFyeVdyaXRlcikge1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlciA9IHdyaXRlcjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBwU3RhdGVFbnRyeSB7XHJcbiAgICAgICAgcHJpdmF0ZSBrZXk6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhcHBTdGF0ZTogQXBwU3RhdGU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdHJhbnNhY3Rpb25hbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY2x1c3RlcjogQXBwU3RhdGVDbHVzdGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEFwcFN0YXRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHBTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgQXBwU3RhdGUodmFsOiBBcHBTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcFN0YXRlID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyKGtleTogc3RyaW5nLCBjbHVzdGVyOiBBcHBTdGF0ZUNsdXN0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1c3RlciA9IGNsdXN0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgZGVzZXJpYWxpemVEZWx0YShyZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIsIGtleTogc3RyaW5nKTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IHNlcmlhbGl6ZURlbHRhKHdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwga2V5OiBzdHJpbmcpO1xyXG5cclxuICAgICAgICBwdWJsaWMgcmVjb25jaWxlKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IGlzRGlydHkoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHNldERpcnR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsdXN0ZXIuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiZWdpblRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL2Fzc2VydCghbV9pc1RyYW5zYWN0aW9uYWwpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uYWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVuZFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL2Fzc2VydChtX2lzVHJhbnNhY3Rpb25hbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25hbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzVHJhbnNhY3Rpb25hbCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb25hbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0xvY2tlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2x1c3Rlci5Jc0xvY2tlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21tb25BcHBTdGF0ZUVudHJ5IGV4dGVuZHMgQXBwU3RhdGVFbnRyeSB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGNoYW5nZWRBdDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luQ2hhbmdpbmcoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZEF0ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgdGhpcy5zZXREaXJ0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBcHBTdGF0ZVN0cmluZ1ZhbHVlIGV4dGVuZHMgQ29tbW9uQXBwU3RhdGVFbnRyeSB7XHJcbiAgICAgICAgcHJpdmF0ZSBkaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJldmlvdXNWYWx1ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgc2V0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRQcmV2aW91c1ZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2hhbmdpbmcoKSB7XHJcbiAgICAgICAgICAgIC8vYXNzZXJ0KElzVHJhbnNhY3Rpb25hbCgpKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRpcnR5ICYmICF0aGlzLmlzTG9ja2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5DaGFuZ2luZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaXNEaXJ0eSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlydHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmVnaW5UcmFuc2FjdGlvbigpIHtcclxuICAgICAgICAgICAgc3VwZXIuYmVnaW5UcmFuc2FjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZGVzZXJpYWxpemVEZWx0YShyZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGtleSB3YXMgcmVhZCBieSBjbHVzdGVyXHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VkQXQgPSByZWFkZXIuUmVhZGVyLnJlYWRUaW1lc3RhbXAoKTtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZWRBdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlZhbHVlID0gcmVhZGVyLlJlYWRlci5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldlZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVhZGVyLlJlYWRlci5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREaXJ0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2VyaWFsaXplRGVsdGEod3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlU3RyaW5nKGtleSk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVUaW1lc3RhbXAodGhpcy5jaGFuZ2VkQXQpO1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlU3RyaW5nKHRoaXMucHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVTdHJpbmcodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBwU3RhdGVWYWx1ZTxUPiBleHRlbmRzIENvbW1vbkFwcFN0YXRlRW50cnkge1xyXG4gICAgICAgIHByaXZhdGUgZGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2YWx1ZTogVDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlOiBUO1xyXG5cclxuICAgICAgICBwdWJsaWMgc2V0KHZhbHVlOiBUKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQoKTogVCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzRGlydHkoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpcnR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luVHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmJlZ2luVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRWYWx1ZShyZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIpOiBUO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgd3JpdGVWYWx1ZSh3cml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIsIHZhbHVlOiBUKTtcclxuXHJcbiAgICAgICAgcHVibGljIGRlc2VyaWFsaXplRGVsdGEocmVhZGVyOiBBcHBTdGF0ZURlbHRhUmVhZGVyLCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBrZXkgd2FzIHJlYWQgYnkgY2x1c3RlclxyXG4gICAgICAgICAgICBsZXQgY2hhbmdlZEF0ID0gcmVhZGVyLlJlYWRlci5yZWFkVGltZXN0YW1wKCk7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkQXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZWYWx1ZSA9IHRoaXMucmVhZFZhbHVlKHJlYWRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldlZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5yZWFkVmFsdWUocmVhZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXJpYWxpemVEZWx0YSh3cml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVTdHJpbmcoa2V5KTtcclxuICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZVRpbWVzdGFtcCh0aGlzLmNoYW5nZWRBdCk7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVWYWx1ZSh3cml0ZXIsIHRoaXMucHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVWYWx1ZSh3cml0ZXIsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXBwU3RhdGVCb29sVmFsdWUgZXh0ZW5kcyBBcHBTdGF0ZVZhbHVlPGJvb2xlYW4+IHtcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZFZhbHVlKHJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVhZGVyLlJlYWRlci5hc3N1cmVSZW1haW5pbmdCeXRlcygxKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVhZGVyLlJlYWRlci5yZWFkQnl0ZSgpICE9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgd3JpdGVWYWx1ZSh3cml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIsIHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVCeXRlKHZhbHVlID8gMHhmZiA6IDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlVmVjdG9yNFZhbHVlIGV4dGVuZHMgQXBwU3RhdGVWYWx1ZTxwc2dlb21ldHJ5LlZlYzQ+IHtcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZFZhbHVlKHJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlcik6IHBzZ2VvbWV0cnkuVmVjNCB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHBzZ2VvbWV0cnkuVmVjNCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvLyBzaXplb2YoZmxvYXQpICogKHgseSx6LHcpXHJcbiAgICAgICAgICAgIGlmIChyZWFkZXIuUmVhZGVyLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDQgKiA0KSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IHBzZ2VvbWV0cnkuVmVjNCgpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnggPSByZWFkZXIuUmVhZGVyLnJlYWRGbG9hdDMyKCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQueSA9IHJlYWRlci5SZWFkZXIucmVhZEZsb2F0MzIoKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC56ID0gcmVhZGVyLlJlYWRlci5yZWFkRmxvYXQzMigpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LncgPSByZWFkZXIuUmVhZGVyLnJlYWRGbG9hdDMyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgd3JpdGVWYWx1ZSh3cml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIsIHZhbHVlOiBwc2dlb21ldHJ5LlZlYzQpIHtcclxuICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUZsb2F0MzIodmFsdWUueCk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVGbG9hdDMyKHZhbHVlLnkpO1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlRmxvYXQzMih2YWx1ZS56KTtcclxuICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUZsb2F0MzIodmFsdWUudyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXBwU3RhdGVGbG9hdFZhbHVlIGV4dGVuZHMgQXBwU3RhdGVWYWx1ZTxudW1iZXI+IHtcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZFZhbHVlKHJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBOYU47XHJcblxyXG4gICAgICAgICAgICBpZiAocmVhZGVyLlJlYWRlci5hc3N1cmVSZW1haW5pbmdCeXRlcyg0KSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVhZGVyLlJlYWRlci5yZWFkRmxvYXQzMigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHdyaXRlVmFsdWUod3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVGbG9hdDMyKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBcHBTdGF0ZU9wZXJhdGlvbiB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGNoYW5nZWRBdDogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNMb2NhbDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBDaGFuZ2VkQXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZWRBdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXNMb2NhbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNMb2NhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNoYW5nZWRBdDogbnVtYmVyLCBpc0xvY2FsOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZWRBdCA9IGNoYW5nZWRBdDtcclxuICAgICAgICAgICAgdGhpcy5pc0xvY2FsID0gaXNMb2NhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlVmFsdWVPcGVyYXRpb248VD4gZXh0ZW5kcyBBcHBTdGF0ZU9wZXJhdGlvbiB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpc05ld1ZhbHVlRGVmaW5lZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNQcmV2aW91c1ZhbHVlRGVmaW5lZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbmV3VmFsdWU6IFQ7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBwcmV2aW91c1ZhbHVlOiBUO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IElzTmV3VmFsdWVEZWZpbmVkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc05ld1ZhbHVlRGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXNQcmV2aW91c1ZhbHVlRGVmaW5lZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNQcmV2aW91c1ZhbHVlRGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTmV3VmFsdWUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5ld1ZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBQcmV2aW91c1ZhbHVlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2aW91c1ZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoY2hhbmdlZEF0OiBudW1iZXIsIG5ld1ZhbHVlOiBUID0gbnVsbCwgcHJldmlvdXNWYWx1ZTogVCA9IG51bGwsIGlzTG9jYWw6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNoYW5nZWRBdCwgaXNMb2NhbCk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTmV3VmFsdWVEZWZpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByZXZpb3VzVmFsdWVEZWZpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHByZXZpb3VzVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGVudW0gT3BlcmF0aW9uVHlwZSB7XHJcbiAgICAgICAgQ2xlYXIsXHJcbiAgICAgICAgQXBwZW5kLFxyXG4gICAgICAgIEluc2VydCxcclxuICAgICAgICBSZW1vdmUsXHJcbiAgICAgICAgUmVwbGFjZVxyXG4gICAgfVxyXG5cclxuICAgIGVudW0gU3RvcmFnZUZsYWdzIHtcclxuICAgICAgICBIYXNQcmV2aW91c1ZhbHVlID0gMHg4MCxcclxuICAgICAgICBIYXNOZXdWYWx1ZSA9IDB4NDAsXHJcbiAgICAgICAgSGFzQ2hhbmdlZERhdGUgPSAweDIwLFxyXG4gICAgICAgIEl0ZW1JbmRleDE2Qml0ID0gMHgxMCxcclxuXHJcbiAgICAgICAgTm9uZSA9IDB4MDAsXHJcblxyXG4gICAgICAgIE1hc2sgPSAweGYwXHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb248VD4gZXh0ZW5kcyBBcHBTdGF0ZVZhbHVlT3BlcmF0aW9uPFQ+IHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG9wZXJhdGlvbjogT3BlcmF0aW9uVHlwZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGl0ZW1JbmRleDogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgcmVjb25jaWxlZEl0ZW1JbmRleDogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE9wZXJhdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBJdGVtSW5kZXgoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1JbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUmVjb25jaWxlZEl0ZW1JbmRleCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjb25jaWxlZEl0ZW1JbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgUmVjb25jaWxlZEl0ZW1JbmRleCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25jaWxlZEl0ZW1JbmRleCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoY2hhbmdlZEF0OiBudW1iZXIsIG9wZXJhdGlvbjogT3BlcmF0aW9uVHlwZSwgaXRlbUluZGV4OiBudW1iZXIgPSAwLCBuZXdWYWx1ZTogVCA9IG51bGwsIHByZXZpb3VzVmFsdWU6IFQgPSBudWxsLCBpc0xvY2FsOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBzdXBlcihjaGFuZ2VkQXQsIG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlLCBpc0xvY2FsKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVyYXRpb24gPSBvcGVyYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUluZGV4ID0gaXRlbUluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnJlY29uY2lsZWRJdGVtSW5kZXggPSBpdGVtSW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXBwU3RhdGVDb2xsZWN0aW9uPFQ+IGV4dGVuZHMgQ29tbW9uQXBwU3RhdGVFbnRyeSB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGNvbnRhaW5lcjogQXJyYXk8VD4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHNlcmlhbGl6ZU9wZXJhdGlvbkNoYW5nZWRBdDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHNlcmlhbGl6ZVByZXZpb3VzVmFsdWVzOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3BlcmF0aW9uczogQXJyYXk8QXBwU3RhdGVDb2xsZWN0aW9uT3BlcmF0aW9uPFQ+PiA9IFtdO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE9wZXJhdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb25UeXBlOiBuZXcgKGNoYW5nZWRBdDogbnVtYmVyLCBvcGVyYXRpb246IE9wZXJhdGlvblR5cGUsIGl0ZW1JbmRleD86IG51bWJlciwgbmV3VmFsdWU/OiBULCBwcmV2aW91c1ZhbHVlPzogVCwgaXNMb2NhbD86IGJvb2xlYW4pID0+IEFwcFN0YXRlQ29sbGVjdGlvbk9wZXJhdGlvbjxUPiwgc2VyaWFsaXplT3BlcmF0aW9uQ2hhbmdlZEF0OiBib29sZWFuID0gdHJ1ZSwgc2VyaWFsaXplUHJldmlvdXNWYWx1ZXM6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWFsaXplT3BlcmF0aW9uQ2hhbmdlZEF0ID0gc2VyaWFsaXplT3BlcmF0aW9uQ2hhbmdlZEF0O1xyXG4gICAgICAgICAgICB0aGlzLnNlcmlhbGl6ZVByZXZpb3VzVmFsdWVzID0gc2VyaWFsaXplUHJldmlvdXNWYWx1ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWRkT3BlcmF0aW9uKG9wOiBBcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb248VD4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUcmFuc2FjdGlvbmFsKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luQ2hhbmdpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub3BlcmF0aW9ucy5wdXNoKG9wKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FwcFN0YXRlIG5vdCB0cmFuc2FjdGlvbmFsIHdoaWxlIGFkZGluZyBvcGVyYXRpb24gdG8gQXBwU3RhdGVDb2xsZWN0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9ja2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkT3BlcmF0aW9uKG5ldyB0aGlzLmFwcFN0YXRlQ29sbGVjdGlvbk9wZXJhdGlvblR5cGUodGhpcy5jaGFuZ2VkQXQsIE9wZXJhdGlvblR5cGUuQ2xlYXIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5sZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFwcGVuZChpdGVtOiBUKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0xvY2tlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbihuZXcgdGhpcy5hcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb25UeXBlKHRoaXMuY2hhbmdlZEF0LCBPcGVyYXRpb25UeXBlLkFwcGVuZCwgdGhpcy5jb250YWluZXIubGVuZ3RoLCBpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnNlcnQoaXRlbTogVCwgYmVmb3JlSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoYmVmb3JlSW5kZXggPD0gdGhpcy5jb250YWluZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNMb2NrZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkT3BlcmF0aW9uKG5ldyB0aGlzLmFwcFN0YXRlQ29sbGVjdGlvbk9wZXJhdGlvblR5cGUodGhpcy5jaGFuZ2VkQXQsIE9wZXJhdGlvblR5cGUuSW5zZXJ0LCBiZWZvcmVJbmRleCwgaXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3BsaWNlKGJlZm9yZUluZGV4LCAwLCBpdGVtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZSB3aGlsZSBpbnNlcnRpbmcgaW50byBBcHBTdGF0ZUNvbGxlY3Rpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbW92ZShpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMuY29udGFpbmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9ja2VkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbihuZXcgdGhpcy5hcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb25UeXBlKHRoaXMuY2hhbmdlZEF0LCBPcGVyYXRpb25UeXBlLlJlbW92ZSwgaW5kZXgsIG51bGwsIHRoaXMuY29udGFpbmVyW2luZGV4XSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZSB3aGlsZSByZW1vdmluZyBmcm9tIEFwcFN0YXRlQ29sbGVjdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVwbGFjZShpdGVtOiBULCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMuY29udGFpbmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9ja2VkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbihuZXcgdGhpcy5hcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb25UeXBlKHRoaXMuY2hhbmdlZEF0LCBPcGVyYXRpb25UeXBlLlJlcGxhY2UsIGluZGV4LCBpdGVtLCB0aGlzLmNvbnRhaW5lcltpbmRleF0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyW2luZGV4XSA9IGl0ZW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2Ugd2hpbGUgcmVwbGFjaW5nIGl0ZW0gaW4gQXBwU3RhdGVDb2xsZWN0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBHZXRJdGVtQXQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXJbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBDb3VudCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0RpcnR5KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVyYXRpb25zLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZGVzZXJpYWxpemVEZWx0YShyZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIGtleSB3YXMgcmVhZCBieSBjbHVzdGVyXHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VkQXQgPSByZWFkZXIuUmVhZGVyLnJlYWRUaW1lc3RhbXAoKTtcclxuICAgICAgICAgICAgbGV0IG9wZXJhdGlvbkNvdW50ID0gcmVhZGVyLlJlYWRlci5yZWFkVUludDMyKCk7XHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gIXJlYWRlci5SZWFkZXIuRXJyb3I7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25Db3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcGVyYXRpb25Db3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZsYWdzID0gcmVhZGVyLlJlYWRlci5yZWFkQnl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVhZGVyLlJlYWRlci5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RvcmFnZUZsYWdzOiBTdG9yYWdlRmxhZ3MgPSBmbGFncyAmIFN0b3JhZ2VGbGFncy5NYXNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BUeXBlOiBPcGVyYXRpb25UeXBlID0gZmxhZ3MgJiB+U3RvcmFnZUZsYWdzLk1hc2s7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BDaGFuZ2VkQXQgPSBjaGFuZ2VkQXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWU6IFQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcmV2VmFsdWU6IFQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZUZsYWdzICYgU3RvcmFnZUZsYWdzLkhhc0NoYW5nZWREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcENoYW5nZWRBdCA9IHJlYWRlci5SZWFkZXIucmVhZFRpbWVzdGFtcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHN1Y2Nlc3MgJiYgIXJlYWRlci5SZWFkZXIuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2VGbGFncyAmIFN0b3JhZ2VGbGFncy5JdGVtSW5kZXgxNkJpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZGV4ID0gcmVhZGVyLlJlYWRlci5yZWFkVUludDE2KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gc3VjY2VzcyAmJiAhcmVhZGVyLlJlYWRlci5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmRleCA9IHJlYWRlci5SZWFkZXIucmVhZFVJbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHN1Y2Nlc3MgJiYgIXJlYWRlci5SZWFkZXIuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2VGbGFncyAmIFN0b3JhZ2VGbGFncy5IYXNOZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgPSA8VD50aGlzLmNsdXN0ZXIucmVhZFZhbHVlKGtleSwgcmVhZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBzdWNjZXNzICYmICFyZWFkZXIuUmVhZGVyLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlRmxhZ3MgJiBTdG9yYWdlRmxhZ3MuSGFzUHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlZhbHVlID0gPFQ+dGhpcy5jbHVzdGVyLnJlYWRWYWx1ZShrZXksIHJlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gc3VjY2VzcyAmJiAhcmVhZGVyLlJlYWRlci5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zLnB1c2gobmV3IHRoaXMuYXBwU3RhdGVDb2xsZWN0aW9uT3BlcmF0aW9uVHlwZShvcENoYW5nZWRBdCwgb3BUeXBlLCBpdGVtSW5kZXgsIG5ld1ZhbHVlLCBwcmV2VmFsdWUsIGZhbHNlIC8qIElzTG9jYWwgKi8pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2VyaWFsaXplRGVsdGEod3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlU3RyaW5nKGtleSk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVUaW1lc3RhbXAodGhpcy5jaGFuZ2VkQXQpO1xyXG5cclxuICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUludDMyKHRoaXMub3BlcmF0aW9ucy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zLmZvckVhY2goKG9wKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHN0b3JhZ2VGbGFnczogU3RvcmFnZUZsYWdzID1cclxuICAgICAgICAgICAgICAgICAgICAob3AuSXRlbUluZGV4IDwgMHgxMDAwMCA/IFN0b3JhZ2VGbGFncy5JdGVtSW5kZXgxNkJpdCA6IFN0b3JhZ2VGbGFncy5Ob25lKSB8XHJcbiAgICAgICAgICAgICAgICAgICAgKG9wLklzTmV3VmFsdWVEZWZpbmVkID8gU3RvcmFnZUZsYWdzLkhhc05ld1ZhbHVlIDogU3RvcmFnZUZsYWdzLk5vbmUpIHxcclxuICAgICAgICAgICAgICAgICAgICAob3AuSXNQcmV2aW91c1ZhbHVlRGVmaW5lZCAmJiB0aGlzLnNlcmlhbGl6ZVByZXZpb3VzVmFsdWVzID8gU3RvcmFnZUZsYWdzLkhhc1ByZXZpb3VzVmFsdWUgOiBTdG9yYWdlRmxhZ3MuTm9uZSkgfFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNlcmlhbGl6ZU9wZXJhdGlvbkNoYW5nZWRBdCA/IFN0b3JhZ2VGbGFncy5IYXNDaGFuZ2VkRGF0ZSA6IFN0b3JhZ2VGbGFncy5Ob25lKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlQnl0ZShvcC5PcGVyYXRpb24gfCBzdG9yYWdlRmxhZ3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlRmxhZ3MgJiBTdG9yYWdlRmxhZ3MuSGFzQ2hhbmdlZERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlVGltZXN0YW1wKG9wLkNoYW5nZWRBdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2VGbGFncyAmIFN0b3JhZ2VGbGFncy5JdGVtSW5kZXgxNkJpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVVSW50MTYob3AuSXRlbUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVJbnQzMihvcC5JdGVtSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlRmxhZ3MgJiBTdG9yYWdlRmxhZ3MuSGFzTmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsdXN0ZXIud3JpdGVWYWx1ZShrZXksIHdyaXRlciwgb3AuTmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlRmxhZ3MgJiBTdG9yYWdlRmxhZ3MuSGFzUHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2x1c3Rlci53cml0ZVZhbHVlKGtleSwgd3JpdGVyLCBvcC5QcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVjb25jaWxlKCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZXJhdGlvbnMuZm9yRWFjaCgob3BlcmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdGlvbi5Jc0xvY2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24uT3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5DbGVhcjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5BcHBlbmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uLklzTmV3VmFsdWVEZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucHVzaChvcGVyYXRpb24uTmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbi5SZWNvbmNpbGVkSXRlbUluZGV4ID0gdGhpcy5jb250YWluZXIubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXhwZWN0ZWQgbmV3IHZhbHVlIGR1cmluZyBBcHBTdGF0ZUNvbGxlY3Rpb24uQXBwZW5kIHJlY29uY2lsaWF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBPcGVyYXRpb25UeXBlLkluc2VydDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24uSXNOZXdWYWx1ZURlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uLkl0ZW1JbmRleCA8IHRoaXMuY29udGFpbmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zcGxpY2Uob3BlcmF0aW9uLkl0ZW1JbmRleCwgMCwgb3BlcmF0aW9uLk5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uLlJlY29uY2lsZWRJdGVtSW5kZXggPSBvcGVyYXRpb24uSXRlbUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucHVzaChvcGVyYXRpb24uTmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IHRoaXMuY29udGFpbmVyLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFeHBlY3RlZCBuZXcgdmFsdWUgZHVyaW5nIEFwcFN0YXRlQ29sbGVjdGlvbi5JbnNlcnQgcmVjb25jaWxpYXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE9wZXJhdGlvblR5cGUuUmVtb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5Jc1ByZXZpb3VzVmFsdWVEZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5JdGVtSW5kZXggPCB0aGlzLmNvbnRhaW5lci5sZW5ndGgpIHsgLy8gJiYgb3BlcmF0aW9uLlByZXZpb3VzVmFsdWUgPT0gdGhpcy5jb250YWluZXJbb3BlcmF0aW9uLkl0ZW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3BsaWNlKG9wZXJhdGlvbi5JdGVtSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IG9wZXJhdGlvbi5JdGVtSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gXFx0b2RvOiBAVUI6IExvY2F0ZSBlbnRyeSBhbmQgcmVtb3ZlIGl0IGRlcGVuZGluZyBvbiBwcmV2aW91cyB2YWx1ZSBvciBmYWlsIHJlY29uY2lsZSBpZiBub3QgZm91bmQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFeHBlY3RlZCBwcmV2aW91cyB2YWx1ZSBkdXJpbmcgQXBwU3RhdGVDb2xsZWN0aW9uLlJlbW92ZSByZWNvbmNpbGlhdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5SZXBsYWNlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5Jc05ld1ZhbHVlRGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24uSXRlbUluZGV4IDwgdGhpcy5jb250YWluZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyW29wZXJhdGlvbi5JdGVtSW5kZXhdID0gb3BlcmF0aW9uLk5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IG9wZXJhdGlvbi5JdGVtSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gXFx0b2RvOiBAVUI6IExvY2F0ZSBlbnRyeSBhbmQgcmVwbGFjZSBpdCBkZXBlbmRpbmcgb24gcHJldmlvdXMgdmFsdWUgb3IgZmFpbCByZWNvbmNpbGUgaWYgbm90IGZvdW5kLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXhwZWN0ZWQgbmV3IHZhbHVlIGR1cmluZyBBcHBTdGF0ZUNvbGxlY3Rpb24uUmVwbGFjZSByZWNvbmNpbGlhdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luVHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmJlZ2luVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXJCYXNlIHtcclxuICAgICAgICAvKiogQSB2ZWN0b3IgbWFuYWdpbmcgcG9pbnRlcnMgdG8gYWxsIGluc3RhbmNlcyBvZiB0aGUgY29ycmVzcG9uZGluZyBjbHVzdGVyIHR5cGUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhbGxJbnN0YW5jZXM6IEFycmF5PEFwcFN0YXRlQ2x1c3Rlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgLyoqIEFkZHMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGNvcnJlc3BvbmRpbmcgY2x1c3RlciB0eXBlIHRvIHRoaXMuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhZGRJbnN0YW5jZShpbnN0YW5jZTogQXBwU3RhdGVDbHVzdGVyKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnJlZ2lzdGVyRW50cmllcygpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbEluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBTdGFydHMgdGhlIHRyYW5zYWN0aW9uYWwgcGhhc2UuIENoYW5nZXMgdG8gZW50cmllcyBhbmQgdGhlaXIgdmFsdWVzIG1heSBvbmx5IGJlIGNhcnJpZWQgb3V0XHJcbiAgICAgICAgICAqIGR1cmluZyB0aGUgdHJhbnNhY3Rpb25hbCBwaGFzZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGJlZ2luVHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNsdXN0ZXJLZXkgaW4gdGhpcy5hbGxJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsSW5zdGFuY2VzW2NsdXN0ZXJLZXldLmJlZ2luVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEVuZHMgdGhlIHRyYW5zYWN0aW9uYWwgcGhhc2UuIEFmdGVyd2FyZHMsIHRoZSBzeW5jaHJvbmlzYXRpb24gdGFrZXMgcGxhY2UuIFRvIGVuc3VyZSB0aGF0IGxvY2FsIHN0YXRlXHJcbiAgICAgICAgICAqIGNoYW5nZXMgYXJlbid0IG1pc3NlZCwgYW4gZXhjZXB0aW9uIGlzIHRocm93biBpZiB0aGUgc3RhdGUgaXMgbm90IHRyYW5zYWN0aW9uYWwgd2hlbiBlbnRyaWVzIG9yIHRoZWlyIHZhbHVlcyBhcmUgYmVpbmcgY2hhbmdlZC5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGVuZFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjbHVzdGVyS2V5IGluIHRoaXMuYWxsSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEluc3RhbmNlc1tjbHVzdGVyS2V5XS5lbmRUcmFuc2FjdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogQXBwbGllcyBhcHAgc3RhdGUgY2hhbmdlcyB0byB0aGUgdmlldyBzdGF0ZSBvZiB0aGUgYXBwbGljYXRpb24uIFRoaXMgbWV0aG9kIGlzIGJlaW5nIGNhbGxlZCBhZnRlciBhbGwgbG9jYWwgY2hhbmdlcyBoYXZlXHJcbiAgICAgICAgICAqIGJlZW4gY2FycmllZCBvdXQgKHRoZSBcInRyYW5zYWN0aW9uYWwgcGhhc2VcIikgYW5kIGFmdGVyIHRoZSBzeW5jaHJvbmlzYXRpb24gdG9vayBwbGFjZS4gVGhlcmVmb3JlLCBhbGwgY2hhbmdlcyBmb3IgdGhlIGN1cnJlbnRcclxuICAgICAgICAgICogdXBkYXRlIGN5Y2xlIGhhdmUgYmVlbiBjYXJyaWVkIG91dCBhbmQgd2lsbCBiZSByZWZsZWN0ZWQgaW4gdGhlIHZpZXcgc3RhdGUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhcHBseUNoYW5nZXMoc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjbHVzdGVyS2V5IGluIHRoaXMuYWxsSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2x1c3RlciA9IHRoaXMuYWxsSW5zdGFuY2VzW2NsdXN0ZXJLZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsdXN0ZXIuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1c3Rlci5hcHBseUNoYW5nZXMoc2NlbmUsIGNsdXN0ZXIuUGVlcklELCBjbHVzdGVyLkluc3RhbmNlSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLnNldERpcnR5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBTZXJpYWxpemVzIHBlZXIgSUQgYW5kL29yIGluc3RhbmNlIElEIGJhc2VkIG9uIHRoZSBuYXR1cmUgb2YgdGhlIGNvbmNyZXRlIGNsdXN0ZXIgdHlwZS4gTXVzdFxyXG4gICAgICAgICAgKiBiZSBvdmVycmlkZW4gYnkgY29uY3JldGUgc3ViY2xhc3NlcyBvZiBBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyQmFzZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNlcmlhbGl6ZUNsdXN0ZXJJbnN0YW5jZURhdGEoY2x1c3RlcjogQXBwU3RhdGVDbHVzdGVyLCBkZWx0YVdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFNlcmlhbGl6ZXMgYWxsIGNoYW5nZXMgdGhhdCBoYXZlIGJlZW4gY2FycmllZCBvdXQgb24gY2x1c3RlcnMgb2YgdGhlIGNvcnJlc3BvbmRpbmcgdHlwZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhV3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCBjbHVzdGVySUQ6IHN0cmluZywgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSkge1xyXG4gICAgICAgICAgICBsZXQgZGlydHlDbHVzdGVyczogQXJyYXk8QXBwU3RhdGVDbHVzdGVyPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgY2x1c3RlcktleSBpbiB0aGlzLmFsbEluc3RhbmNlcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXIgPSB0aGlzLmFsbEluc3RhbmNlc1tjbHVzdGVyS2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChjbHVzdGVyLmlzRGlydHkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcnR5Q2x1c3RlcnMucHVzaChjbHVzdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRpcnR5Q2x1c3RlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsdGFXcml0ZXIuV3JpdGVyLndyaXRlU3RyaW5nKGNsdXN0ZXJJRCk7XHJcbiAgICAgICAgICAgICAgICBkZWx0YVdyaXRlci5Xcml0ZXIud3JpdGVVSW50MTYoZGlydHlDbHVzdGVycy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRpcnR5Q2x1c3RlcnMuZm9yRWFjaCgoY2x1c3RlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VyaWFsaXplQ2x1c3Rlckluc3RhbmNlRGF0YShjbHVzdGVyLCBkZWx0YVdyaXRlciwgYXBwU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyLnNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhV3JpdGVyLCBhcHBTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIERlc2VyaWFsaXplcyByZW1vdGUgY2hhbmdlcyB0aGF0IGhhdmUgYmVlbiBjYXJyaWVkIG91dCBvbiBjbHVzdGVycyBvZiB0aGUgY29ycmVzcG9uZGluZyB0eXBlLiBNdXN0XHJcbiAgICAgICAgICAqIGJlIG92ZXJyaWRlbiBieSBjb25jcmV0ZSBzdWJjbGFzc2VzIG9mIEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXJCYXNlLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZGVzZXJpYWxpemVUcmFuc2FjdGlvbihkZWx0YVJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlciwgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSwgc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb25jcmV0ZSBzdWJjbGFzcyBvZiBBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyQmFzZSB0aGF0IHByb3ZpZGVzIGEgc2luZ2xlLCBnbG9iYWwgaW5zdGFuY2Ugb2YgdGhlIHNwZWNpZmllZCBjbHVzdGVyIHR5cGUuXHJcbiAgICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR2xvYmFsQXBwU3RhdGVDbHVzdGVyTWFuYWdlcjxUQXBwU3RhdGVDbHVzdGVyIGV4dGVuZHMgQXBwU3RhdGVDbHVzdGVyPiBleHRlbmRzIEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXJCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbmx5SW5zdGFuY2U6IFRBcHBTdGF0ZUNsdXN0ZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNsdXN0ZXJUeXBlSUQ6IHN0cmluZywgcHJpdmF0ZSBjbHVzdGVyVHlwZTogbmV3ICgpID0+IFRBcHBTdGF0ZUNsdXN0ZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5vbmx5SW5zdGFuY2UgPSBuZXcgY2x1c3RlclR5cGUoKTtcclxuXHJcbiAgICAgICAgICAgIEFwcFN0YXRlLkdldEluc3RhbmNlKCkuYWRkQ2x1c3RlcihjbHVzdGVyVHlwZUlELCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRJbnN0YW5jZSh0aGlzLm9ubHlJbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogR2V0cyB0aGUgb25seSBpbnN0YW5jZSBvZiB0aGlzIGNsdXN0ZXIgdHlwZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldEdsb2JhbENsdXN0ZXIoKTogVEFwcFN0YXRlQ2x1c3RlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ubHlJbnN0YW5jZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcyBnbG9iYWwgY2x1c3RlcnMgZG9uJ3QgbmVlZCBhIHBlZXIgSUQgb3IgaW5zdGFuY2UgSUQgdG8gaWRlbnRpZnksIHRoaXMgaW1wbGVtZW50YXRpb24gZG9lc24ndCB3cml0ZSBhbnl0aGluZy5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNlcmlhbGl6ZUNsdXN0ZXJJbnN0YW5jZURhdGEoY2x1c3RlcjogQXBwU3RhdGVDbHVzdGVyLCBkZWx0YVdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEFzIGdsb2JhbCBjbHVzdGVycyBkb24ndCBuZWVkIGEgcGVlciBJRCBvciBpbnN0YW5jZSBJRCB0byBpZGVudGlmeSwgdGhpcyBpbXBsZW1lbnRhdGlvbiBkb2Vzbid0IHJldHJlaXZlXHJcbiAgICAgICAgICAqIGFkZGl0aW9uYWwgZGF0YSBmcm9tIHRoZSByZWFkZXIuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBkZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhUmVhZGVyOiBBcHBTdGF0ZURlbHRhUmVhZGVyLCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlLCBzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZUNvdW50ID0gZGVsdGFSZWFkZXIuUmVhZGVyLnJlYWRVSW50MTYoKTtcclxuICAgICAgICAgICAgaWYgKCFkZWx0YVJlYWRlci5SZWFkZXIuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2VDb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXIgPSB0aGlzLmdldEdsb2JhbENsdXN0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gY2x1c3Rlci5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhUmVhZGVyLCBhcHBTdGF0ZSwgc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENvbmNyZXRlIHN1YmNsYXNzIG9mIEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXJCYXNlIHRoYXQgZGlzdGluZ3Vpc2hlcyBsb2NhbCBhbmQgcmVtb3RlIGluc3RhbmNlcyBvZiB0aGUgXHJcbiAgICAgICogY29ycmVzcG9uZGluZyBjbHVzdGVyIHR5cGUgKGRlcml2ZWQgZnJvbSBBcHBTdGF0ZUNsdXN0ZXIpLiBFYWNoIHBlZXIgbWF5IGhhdmUgemVybyBvciBvbmUgaW5zdGFuY2VzIG9mIHRoZSBjbHVzdGVyIHR5cGUuXHJcbiAgICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgTG9jYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyPFRBcHBTdGF0ZUNsdXN0ZXIgZXh0ZW5kcyBBcHBTdGF0ZUNsdXN0ZXI+IGV4dGVuZHMgQXBwU3RhdGVDbHVzdGVyTWFuYWdlckJhc2Uge1xyXG5cclxuICAgICAgICAvKiogVGhlIG1hcCBvZiBjbHVzdGVyIHBlciBwZWVyLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHBlZXJDbHVzdGVyczogeyBba2V5OiBzdHJpbmddOiBBcHBTdGF0ZUNsdXN0ZXIgfSA9IHt9O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihjbHVzdGVyVHlwZUlEOiBzdHJpbmcsIHByaXZhdGUgY2x1c3RlclR5cGU6IG5ldyAoKSA9PiBUQXBwU3RhdGVDbHVzdGVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGVlckNsdXN0ZXJzWycnXSA9IG5ldyBjbHVzdGVyVHlwZSgpO1xyXG5cclxuICAgICAgICAgICAgQXBwU3RhdGUuR2V0SW5zdGFuY2UoKS5hZGRDbHVzdGVyKGNsdXN0ZXJUeXBlSUQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEluc3RhbmNlKHRoaXMucGVlckNsdXN0ZXJzWycnXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogR2V0cyB0aGUgbG9jYWwgcGVlcidzIGluc3RhbmNlIG9mIHRoaXMgY2x1c3RlciB0eXBlLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0TG9jYWxDbHVzdGVyKCk6IFRBcHBTdGF0ZUNsdXN0ZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gPFRBcHBTdGF0ZUNsdXN0ZXI+dGhpcy5hbGxJbnN0YW5jZXNbJyddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxcYnJpZWYgR2V0cyB0aGUgaW5zdGFuY2Ugb2YgdGhpcyBjbHVzdGVyIHR5cGUgdGhhdCBiZWxvbmdzIHRvIHRoZSBwZWVyIHdpdGggdGhlIHNwZWNpZmllZCBJRC4gSWYgaXQgZG9lc24ndCBleGlzdCxcclxuICAgICAgICAgICogaXQncyBjcmVhdGVkLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0Q2x1c3RlcihwZWVySUQ6IHN0cmluZyk6IFRBcHBTdGF0ZUNsdXN0ZXIge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBUQXBwU3RhdGVDbHVzdGVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb250YWluc0NsdXN0ZXIocGVlcklEKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IHRoaXMuY2x1c3RlclR5cGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVlckNsdXN0ZXJzW3BlZXJJRF0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuUGVlcklEID0gcGVlcklEO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJbnN0YW5jZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gPFRBcHBTdGF0ZUNsdXN0ZXI+dGhpcy5wZWVyQ2x1c3RlcnNbcGVlcklEXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZXRlcm1pbmVzIGlmIHRoZSBwZWVyIHdpdGggdGhlIHNwZWNpZmllZCBJRCBhbHJlYWR5IGhhcyBhbiBpbnN0YW5jZSBvZiB0aGUgY29ycmVzcG9uZGluZyBjbHVzdGVyIHR5cGUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjb250YWluc0NsdXN0ZXIocGVlcklEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVlckNsdXN0ZXJzW3BlZXJJRF0gIT0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcyBsb2NhbCBjbHVzdGVycyB3aXRoIGEgc2luZ2xlIGluc3RhbmNlIG9ubHkgbmVlZCBhIHBlZXIgSUQgdG8gaWRlbnRpZnksIHRoaXMgaW1wbGVtZW50YXRpb24gb25seSB3cml0ZXMgdGhlIHBlZXJJRC5cclxuICAgICAgICAgICogRm9yIHRoZSBsb2NhbCBwZWVyJ3MgaW5zdGFuY2UsIGFuIGVtcHR5IHBlZXIgSUQgd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgYWN0dWFsIElEIG9mIHRoZSBwZWVyLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2VyaWFsaXplQ2x1c3Rlckluc3RhbmNlRGF0YShjbHVzdGVyOiBBcHBTdGF0ZUNsdXN0ZXIsIGRlbHRhV3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlKSB7XHJcbiAgICAgICAgICAgIGxldCBwZWVySUQgPSBjbHVzdGVyLlBlZXJJRDtcclxuICAgICAgICAgICAgLy8gVXNlIGxvY2FsIHBlZXJJRCBpZiB0aGUgY2x1c3RlcidzIHBlZXIgSUQgaXMgZW1wdHkuXHJcbiAgICAgICAgICAgIGRlbHRhV3JpdGVyLldyaXRlci53cml0ZVN0cmluZyhwZWVySUQubGVuZ3RoID09IDAgPyBhcHBTdGF0ZS5Mb2NhbFBlZXJJRCA6IHBlZXJJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogQXMgbG9jYWwgY2x1c3RlcnMgd2l0aCBhIHNpbmdsZSBpbnN0YW5jZSBvbmx5IG5lZWQgYSBwZWVyIElEIHRvIGlkZW50aWZ5LCB0aGlzIGltcGxlbWVudGF0aW9uIHJldHJpZXZlcyBhIHBlZXIgSUQsXHJcbiAgICAgICAgICAqIGJ1dCBubyBpbnN0YW5jZUlEIGZyb20gdGhlIGRlbHRhLiBJZiB0aGUgcGVlcklEIGlzIGlkZW50aWNhbCB0byB0aGUgbG9jYWwgcGVlcidzIElELCBpdCBpcyByZXBsYWNlZCBieSB0aGUgaW50ZXJuYWxcclxuICAgICAgICAgICoga2V5IChlbXB0eSBzdHJpbmcpIHRoYXQgaXMgdXNlZCB0byBpZGVudGlmeSBsb2NhbCBwZWVyIGRhdGEuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBkZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhUmVhZGVyOiBBcHBTdGF0ZURlbHRhUmVhZGVyLCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlLCBzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5zdGFuY2VDb3VudCA9IGRlbHRhUmVhZGVyLlJlYWRlci5yZWFkVUludDE2KCk7XHJcbiAgICAgICAgICAgIGlmICghZGVsdGFSZWFkZXIuUmVhZGVyLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RhbmNlQ291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVySUQgPSBkZWx0YVJlYWRlci5SZWFkZXIucmVhZFN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGVsdGFSZWFkZXIuUmVhZGVyLkVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVlcklEID09IGFwcFN0YXRlLkxvY2FsUGVlcklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVySUQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXIgPSB0aGlzLmdldENsdXN0ZXIocGVlcklEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IGNsdXN0ZXIuZGVzZXJpYWxpemVUcmFuc2FjdGlvbihkZWx0YVJlYWRlciwgYXBwU3RhdGUsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQXBwU3RhdGVDbHVzdGVyIGluc3RhbmNlcyBzdG9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYXBwbGljYXRpb24gc3RhdGUuIEJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXRlLCBjaGFuZ2VzXHJcblx0ICAqIHRvIHRoZSB2aWV3IHN0YXRlIGFyZSBjYXJyaWVkIG91dC4gSW4gb3JkZXIgdG8gYmUgYWJsZSB0byBzeW5jaHJvbml6ZSBhcHBsaWNhdGlvbiBzdGF0ZSwgb3BlcmF0aW9ucyBvbiB0aGUgZW50cmllcyB0aGF0XHJcblx0ICAqIGFyZSBhZ2dyZWdhdGVkIGJ5IEFwcFN0YXRlQ2x1c3RlciwgIGFyZSBzdG9yZWQgZHVyaW5nIGEgXCJ0cmFuc2FjdGlvbmFsIHBoYXNlXCIuIEltbWVkaWF0ZWx5IGFmdGVyd2FyZHMsIGFsbCBjaGFuZ2VzIGFyZVxyXG5cdCAgKiBjb2xsZWN0ZWQgYW5kIHN5bmMnZWQgd2l0aCByZW1vdGUgcGVlcnMuIFNpbWlsYXJseSwgd2hlbiByZW1vdGUgY2hhbmdlcyBhcmUgcmVjZWl2ZWQsIHRoZXkgYXJlIHByb2Nlc3NlZCBhZnRlciB0aGUgbG9jYWwgXHJcblx0ICAqIGNvbGxlY3Rpb24gdG9vayBwbGFjZSwgY2F1c2luZyBhcHAgc3RhdGUgY2hhbmdlcy4gRmluYWxseSwgYWxsIGNsdXN0ZXIncyBlbnRyeSdzIGNoYW5nZXMgYXJlIHByb2Nlc3NlZCB0byB1cGRhdGUgdGhlXHJcblx0ICAqIGFwcGxpY2F0aW9uJ3MgdmlldyBzdGF0ZS5cclxuXHQgICovXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBwU3RhdGVDbHVzdGVyIHtcclxuICAgICAgICBwcml2YXRlIHBlZXJJRDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIGluc3RhbmNlSUQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIGVudHJpZXM6IHsgW2luZGV4OiBzdHJpbmddOiBBcHBTdGF0ZUVudHJ5IH0gPSB7fTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIGxvY2tDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBQZWVySUQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBlZXJJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgUGVlcklEKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5wZWVySUQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSW5zdGFuY2VJRCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBDb25zdHJ1Y3RvclxyXG4gICAgICAgICAgKiBAcGFyYW0gcGVlcklEXHRcdFRoZSBwZWVyIElEIHRoaXMgY2x1c3RlciBpbnN0YW5jZSBiZWxvbmdzIHRvLiBJZiBpdCdzIGxlZnQgZW1wdHksIHRoZSBsb2NhbCBwZWVyJ3MgSUQgd2lsbCBiZSB1c2VkLlxyXG4gICAgICAgICAgKiBAcGFyYW0gaW5zdGFuY2VJRFx0VGhlIHBlZXItdW5pcXVlIGluc3RhbmNlIElELiBUaGlzIElEIGlzIG9ubHkgbmVjZXNzYXJ5LCBpZiBtdWx0aS1pbnN0YW5jZXMgYXJlIHVzZWQgKHBlciBwZWVyKS4gVGhpcyBkZXBlbmRzIG9uIHRoZSBBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyIHVzZWQgdG8gbWFuYWdlIGluc3RhbmNlcy5cclxuICAgICAgICAgICogQHBhcmFtIGFwcFN0YXRlXHRcdFRoZSBhcHAgc3RhdGUgY29udGFpbmVyIHRoaXMgY2x1c3RlciBiZWxvbmdzIHRvLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3RvcihwZWVySUQ/OiBzdHJpbmcsIGluc3RhbmNlSUQ/OiBzdHJpbmcsIGFwcFN0YXRlPzogQXBwU3RhdGVCYXNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVlcklEID0gcGVlcklEIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlSUQgPSBpbnN0YW5jZUlEIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmFwcFN0YXRlID0gYXBwU3RhdGUgfHwgQXBwU3RhdGUuR2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBSZWdpc3RlcnMgYWxsIGVudHJpZXMgb24gY3JlYXRpb24gb2YgYSBuZXcgY2x1c3RlciBpbnN0YW5jZS4gTXVzdCBiZSBvdmVycmlkZW4gYnkgY29uY3JldGUgY2x1c3RlcnMuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCByZWdpc3RlckVudHJpZXMoKTtcclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luVHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZW50cnlJZHggaW4gdGhpcy5lbnRyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudHJpZXNbZW50cnlJZHhdLmJlZ2luVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVuZFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlbnRyeUlkeCBpbiB0aGlzLmVudHJpZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW50cmllc1tlbnRyeUlkeF0uZW5kVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWNvbmNpbGUoc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlbnRyeUlkeCBpbiB0aGlzLmVudHJpZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW50cmllc1tlbnRyeUlkeF0ucmVjb25jaWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXREaXJ0eSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaXNEaXJ0eSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlydHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXJFbnRyeShrZXk6IHN0cmluZywgZW50cnk6IEFwcFN0YXRlRW50cnkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbnRyaWVzW2tleV0gPSBlbnRyeTtcclxuICAgICAgICAgICAgZW50cnkucmVnaXN0ZXIoa2V5LCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcHBseUNoYW5nZXMgaXMgYmVpbmcgY2FsbGVkIGluIGVhY2ggdXBkYXRlIGN5Y2xlIHdpdGggbG9jYWwgb3IgcmVtb3RlIGNoYW5nZXMuIENvbmNyZXRlIGNsdXN0ZXJzIHNob3VsZFxyXG4gICAgICAgICAgKiBvdmVycmlkZSBBcHBseUNoYW5nZXMgdG8gdXBkYXRlIHRoZSB2aWV3IHN0YXRlIGJhc2VkIG9uIHRoZSBhcHAgc3RhdGUgY2hhbmdlcyB0aGF0IG9jY3VyZWQuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhcHBseUNoYW5nZXMoc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCwgcGVlcklEOiBzdHJpbmcsIGluc3RhbmNlSUQ6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFdyaXRlcyBhbGwgbG9jYWwgb3BlcmF0aW9ucyB0aGF0IGhhdmUgYmVlbiBjYXJyaWVkIG91dCBkdXJpbmcgdGhlIHRyYW5zYWN0aW9uYWwgcGhhc2Ugb2YgdGhpcyB1cGRhdGUgY3ljbGUgKFwiRGVsdGFcIikuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzZXJpYWxpemVUcmFuc2FjdGlvbihkZWx0YVdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSkge1xyXG4gICAgICAgICAgICAvLyBzZXRJc0luaXRpYWxpemluZyhkZWx0YVdyaXRlci5Jc0luaXRpYWxpemF0aW9uKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpcnR5RW50cmllczogQXJyYXk8eyBrZXk6IHN0cmluZywgZW50cnk6IEFwcFN0YXRlRW50cnkgfT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGlkeCBpbiB0aGlzLmVudHJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudHJpZXNbaWR4XS5pc0RpcnR5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXJ0eUVudHJpZXMucHVzaCh7IGtleTogaWR4LCBlbnRyeTogdGhpcy5lbnRyaWVzW2lkeF0gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlbHRhV3JpdGVyLldyaXRlci53cml0ZVVJbnQxNihkaXJ0eUVudHJpZXMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGRpcnR5RW50cmllcy5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLmVudHJ5LnNlcmlhbGl6ZURlbHRhKGRlbHRhV3JpdGVyLCBlLmtleSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFJldHJpZXZlcyBhbGwgcmVtb3RlIG9wZXJhdGlvbnMgdGhhdCBoYXZlIGJlZW4gcmVjZWl2ZWQgZnJvbSByZW1vdGUgcGVlcnMuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBkZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhUmVhZGVyOiBBcHBTdGF0ZURlbHRhUmVhZGVyLCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlLCBzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBlbnRyeUNvdW50ID0gZGVsdGFSZWFkZXIuUmVhZGVyLnJlYWRVSW50MTYoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldElzSW5pdGlhbGl6aW5nKGRlbHRhUmVhZGVyLklzSW5pdGlhbGl6aW5nKCkpO1xyXG4gICAgICAgICAgICBpZiAoIWRlbHRhUmVhZGVyLlJlYWRlci5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRyeUNvdW50ICYmIHN1Y2Nlc3M7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbnRyeUtleTogc3RyaW5nID0gZGVsdGFSZWFkZXIuUmVhZGVyLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRlbHRhUmVhZGVyLlJlYWRlci5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW50cnkgPSB0aGlzLmVudHJpZXNbZW50cnlLZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBlbnRyeS5kZXNlcmlhbGl6ZURlbHRhKGRlbHRhUmVhZGVyLCBlbnRyeUtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29uY2lsZShzY2VuZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGxvY2soKSB7XHJcbiAgICAgICAgICAgICsrdGhpcy5sb2NrQ291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdW5sb2NrKCkge1xyXG4gICAgICAgICAgICAtLXRoaXMubG9ja0NvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBJc0xvY2tlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9ja0NvdW50ID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkVmFsdWUoa2V5OiBzdHJpbmcsIHJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlcik6IGFueSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlYWRWYWx1ZSBub3QgaW1wbGVtZW50ZWQgZm9yICcgKyBrZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlVmFsdWUoa2V5OiBzdHJpbmcsIHdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwgdmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCd3cml0ZVZhbHVlIG5vdCBpbXBsZW1lbnRlZCBmb3IgJyArIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBEaXJlY3RvciB7XHJcbiAgICAgICAgcHJvdGVjdGVkIHNjZW5lOiBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0w7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIHBlbmRpbmdVcGRhdGVzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHBlbmRpbmdNZXNzYWdlczogbW9kZWxzdGFnZXdlYi5OZXR3b3JrQ2hhbm5lbE1lc3NhZ2VbXSA9IFtdO1xyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IFNjZW5lKHNjZW5lOiBEaXJlY3RlZFNjZW5lV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGFwcFN0YXRlOiBBcHBTdGF0ZUJhc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBTdGF0ZSA9IGFwcFN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEluaXRpYWxpemVzIGFuIEFwcFN0YXRlIHRyYW5zYWN0aW9uLiBBbnkgY2hhbmdlcyBhcHBsaWVkIHRvIHRoZSBBcHBTdGF0ZSB3aWxsIGJlIG1vbml0b3JlZC5cclxuICAgICAgICAgICogQmVnaW5VcGRhdGUgaXMgY2FsbGVkIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyBvZiBlYWNoIHJlbmRlciBjeWNsZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGJlZ2luRnJhbWUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwU3RhdGUuYmVnaW5UcmFuc2FjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbW1pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3F1aXJlUGVuZGluZ1VwZGF0ZXMoKS5mb3JFYWNoKCh1cGRGdW5jKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRGdW5jKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFwcFN0YXRlLmVuZFRyYW5zYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGV0ZXJtaW5lcyBhbmQgc3VibWl0cyBsb2NhbCBBcHBTdGF0ZSB0cmFuc2l0aW9ucy4gQ3JlYXRlcyBhIGxvY2FsIEFwcFN0YXRlIGRlbHRhIHRoYXQgaXMgdHJhbnNmZXJyZWQgdG8gdXBzdHJlYW0gcGVlcnMuXHJcbiAgICAgICAgICAqIFN1Ym1pdExvY2FsVXBkYXRlcyBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHNjZW5lIGhhcyBiZWVuIHJlbmRlcmVkIGFuZCBhbGwgaW50ZXJhY3Rpb25zIHdpdGggdGhlIHZpZXcgYXJlIHByb2Nlc3NlZC5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN1Ym1pdExvY2FsVXBkYXRlcyhjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgQXBwU3RhdGVEZWx0YSA9IDB4MDEwMDtcclxuXHJcbiAgICAgICAgICAgIGxldCB3cml0ZXIgPSBuZXcgQXBwU3RhdGVEZWx0YVdyaXRlcihuZXcgQmluYXJ5V3JpdGVyKCkpO1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlSW50MzIoMSk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVJbnQzMihBcHBTdGF0ZURlbHRhKTsgXHJcbiAgICAgICAgICAgIHRoaXMuYXBwU3RhdGUuc2VyaWFsaXplVHJhbnNhY3Rpb24od3JpdGVyKTtcclxuICAgICAgICAgICAgbGV0IGJ1ZiA9IHdyaXRlci5Xcml0ZXIuZmx1c2goKTtcclxuICAgICAgICAgICAgbGV0IG1zZyA9IG1vZGVsc3RhZ2V3ZWIuTmV0d29ya0NoYW5uZWxNZXNzYWdlLkZyb21CdWZmZXIoYnVmKTtcclxuICAgICAgICAgICAgaWYgKG1zZy5IYXNQYXlsb2FkICYmIGNvbm5lY3Rpb24uSXNDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc2VuZChtc2cuQ29udGVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcHBsaWVzIHJlbW90ZSBBcHBTdGF0ZSB0cmFuc2l0aW9ucyByZWNlaXZlZCBmcm9tIHVwc3RyZWFtIHBlZXJzLiBBcHBseVJlbW90ZVVwZGF0ZXMgaXMgY2FsbGVkIGFmdGVyIFxyXG4gICAgICAgICAgKiBTdWJtaXRMb2NhbFVwZGF0ZXMuIEFmdGVyIGFwcGx5aW5nIHJlbW90ZSB1cGRhdGVzLCBhbGwgQXBwU3RhdGUgdHJhbnNpdGlvbnMgZm9yIHRoaXMgcmVuZGVyIGN5Y2xlIGhhdmUgYmVlbiBhcHBsaWVkLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYXBwbHlSZW1vdGVVcGRhdGVzKCkge1xyXG4gICAgICAgICAgICBsZXQgcGVuZGluZ01lc3NhZ2VzID0gdGhpcy5hY3F1aXJlUGVuZGluZ01lc3NhZ2VzKCk7XHJcbiAgICAgICAgICAgIHBlbmRpbmdNZXNzYWdlcy5mb3JFYWNoKChtc2cpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwU3RhdGUuZGVzZXJpYWxpemVUcmFuc2FjdGlvbihuZXcgQXBwU3RhdGVEZWx0YVJlYWRlcihuZXcgQmluYXJ5UmVhZGVyKG1zZy5Db250ZW50KSksIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWNxdWlyZVBlbmRpbmdVcGRhdGVzKCk6IEFycmF5PCgpID0+IHZvaWQ+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucGVuZGluZ1VwZGF0ZXM7XHJcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1VwZGF0ZXMgPSBbXTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWNxdWlyZVBlbmRpbmdNZXNzYWdlcygpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucGVuZGluZ01lc3NhZ2VzO1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdNZXNzYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFVwZGF0ZXMgVmlld1N0YXRlIGFjY29yZGluZyB0byByZXN1bHRpbmcgQXBwU3RhdGUuIEFwcFN0YXRlIHRyYW5zaXRpb24gaXMgY29tbWl0dGVkIGJ5IGNsZWFyaW5nIEFwcFN0YXRlIGRlbHRhLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZW5kRnJhbWUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwU3RhdGUuYXBwbHlDaGFuZ2VzKHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlY2VpdmVkTWVzc2FnZShtZXNzYWdlOiBtb2RlbHN0YWdld2ViLk5ldHdvcmtDaGFubmVsTWVzc2FnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdNZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN5bmNocm9uaXplU3RhdGVVcGRhdGUoZnVuYzogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdVcGRhdGVzLnB1c2goZnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBEaXJlY3RlZFNjZW5lV2ViR0wgZXh0ZW5kcyBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZGlyZWN0b3I6IERpcmVjdG9yO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbm5lY3Rpb246IG1vZGVsc3RhZ2V3ZWIuU2VydmVyQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKGRpcmVjdG9yOiBEaXJlY3RvciwgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0b3IgPSBkaXJlY3RvcjtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiZWdpbkZyYW1lKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdG9yLmJlZ2luRnJhbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0b3IuY29tbWl0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uICYmIHRoaXMuY29ubmVjdGlvbi5Jc0Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rvci5zdWJtaXRMb2NhbFVwZGF0ZXModGhpcy5jb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0b3IuYXBwbHlSZW1vdGVVcGRhdGVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbmRGcmFtZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rvci5lbmRGcmFtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlY2VpdmVkTWVzc2FnZShtZXNzYWdlOiBtb2RlbHN0YWdld2ViLk5ldHdvcmtDaGFubmVsTWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlVHlwZSA9PSBtb2RlbHN0YWdld2ViLkNvbW1vbk1lc3NhZ2VUeXBlcy5BcHBTdGF0ZURlbHRhIHx8IG1lc3NhZ2UuTWVzc2FnZVR5cGUgPT0gbW9kZWxzdGFnZXdlYi5Db21tb25NZXNzYWdlVHlwZXMuQXBwU3RhdGVJbml0aWFsaXphdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rvci5yZWNlaXZlZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzeW5jaHJvbml6ZVN0YXRlVXBkYXRlKGZ1bmM6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rvci5zeW5jaHJvbml6ZVN0YXRlVXBkYXRlKGZ1bmMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59Il19