/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    var /**
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
    AppStateBase = /** @class */ (function () {
        function AppStateBase() {
            this.clusterManagers = {};
        }
        Object.defineProperty(AppStateBase.prototype, "LocalPeerID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.localPeerID;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.localPeerID = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} key
         * @return {?}
         */
        AppStateBase.prototype.getClusterManager = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return this.clusterManagers[key];
        };
        /** Adds a certain cluster type (global/local, single/multi) to the app state.
          */
        /**
         * Adds a certain cluster type (global/local, single/multi) to the app state.
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        AppStateBase.prototype.addCluster = /**
         * Adds a certain cluster type (global/local, single/multi) to the app state.
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        function (key, cluster) {
            this.clusterManagers[key] = cluster;
        };
        /** Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
          * during the transactional phase of the app state.
          */
        /**
         * Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
         * during the transactional phase of the app state.
         * @return {?}
         */
        AppStateBase.prototype.beginTransaction = /**
         * Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
         * during the transactional phase of the app state.
         * @return {?}
         */
        function () {
            for (var clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].beginTransaction();
            }
        };
        /** Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
          * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
          */
        /**
         * Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        AppStateBase.prototype.endTransaction = /**
         * Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        function () {
            for (var clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].endTransaction();
            }
        };
        /** Applies app state changes to the view state of the application. This method is being called after all local changes have
          * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
          * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
          * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
          */
        /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
         * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
         * @param {?} scene
         * @return {?}
         */
        AppStateBase.prototype.applyChanges = /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
         * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
         * @param {?} scene
         * @return {?}
         */
        function (scene) {
            for (var clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].applyChanges(scene);
            }
        };
        /** Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
          */
        /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @return {?}
         */
        AppStateBase.prototype.serializeTransaction = /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @return {?}
         */
        function (deltaWriter) {
            for (var clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].serializeTransaction(deltaWriter, clusterManagerKey, this);
            }
        };
        /** Retrieves all remote operations that have been received from remote peers.
          */
        /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} scene
         * @return {?}
         */
        AppStateBase.prototype.deserializeTransaction = /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, scene) {
            /** @type {?} */
            var success = true;
            while (!deltaReader.isAtEnd() && success) {
                /** @type {?} */
                var clusterID = deltaReader.readClusterID();
                if (clusterID) {
                    /** @type {?} */
                    var clusterManager = this.clusterManagers[clusterID];
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
        };
        return AppStateBase;
    }());
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
    var AppState = /** @class */ (function (_super) {
        tslib_1.__extends(AppState, _super);
        function AppState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        AppState.GetInstance = /**
         * @return {?}
         */
        function () {
            if (!AppState.Instance) {
                AppState.Instance = new AppState();
            }
            return AppState.Instance;
        };
        AppState.Instance = null;
        return AppState;
    }(AppStateBase));
    modelstageappstate.AppState = AppState;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AppState.Instance;
    }
    var BinaryWriter = /** @class */ (function () {
        function BinaryWriter() {
            this.buf = [];
        }
        /**
         * @return {?}
         */
        BinaryWriter.prototype.flush = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = new Uint8Array(this.buf.length);
            result.set(this.buf);
            return result;
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeByte = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeInt16 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeUInt16 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeInt32 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeInt64 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.buf.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff, (val >> 32) & 0xff, (val >> 40) & 0xff, (val >> 48) & 0xff, (val >> 56) & 0xff);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeTimestamp = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.writeInt64(val);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeFloat32 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            /** @type {?} */
            var buf = new ArrayBuffer(4);
            /** @type {?} */
            var view = new DataView(buf);
            view.setFloat32(0, val, true);
            /** @type {?} */
            var byteBuf = new Int8Array(buf);
            this.buf.push.apply(byteBuf);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeString = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.writeInt32(val.length);
            this.writeCharArray(val, val.length);
        };
        /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        BinaryWriter.prototype.writeCharArray = /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        function (val, arrayLength) {
            for (var idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) : 0x00);
            }
        };
        /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        BinaryWriter.prototype.writeWideCharArray = /**
         * @param {?} val
         * @param {?} arrayLength
         * @return {?}
         */
        function (val, arrayLength) {
            for (var idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) & 0xff : 0x00, idx < val.length ? (val.charCodeAt(idx) >> 8) & 0xff : 0x00);
            }
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeVec3 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            /** @type {?} */
            var buf = new ArrayBuffer(12);
            /** @type {?} */
            var view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            /** @type {?} */
            var byteBuf = new Uint8Array(buf);
            this.buf.push.apply(byteBuf);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        BinaryWriter.prototype.writeVec4 = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            /** @type {?} */
            var buf = new ArrayBuffer(16);
            /** @type {?} */
            var view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            view.setFloat32(12, val.w, true);
            /** @type {?} */
            var byteBuf = new Uint8Array(buf);
            this.buf.push(byteBuf[0], byteBuf[1], byteBuf[2], byteBuf[3], byteBuf[4], byteBuf[5], byteBuf[6], byteBuf[7], byteBuf[8], byteBuf[9], byteBuf[10], byteBuf[11], byteBuf[12], byteBuf[13], byteBuf[14], byteBuf[15]);
        };
        return BinaryWriter;
    }());
    modelstageappstate.BinaryWriter = BinaryWriter;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        BinaryWriter.prototype.buf;
    }
    var BinaryReader = /** @class */ (function () {
        function BinaryReader(buf) {
            this.currentPos = 8;
            this.error = false;
            this.buf = buf;
        }
        Object.defineProperty(BinaryReader.prototype, "Error", {
            get: /**
             * @return {?}
             */
            function () {
                return this.error;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinaryReader.prototype, "AtEnd", {
            get: /**
             * @return {?}
             */
            function () {
                return this.currentPos >= this.buf.byteLength;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} count
         * @return {?}
         */
        BinaryReader.prototype.assureRemainingBytes = /**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            return this.currentPos + count <= this.buf.byteLength;
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readByte = /**
         * @return {?}
         */
        function () {
            if (this.assureRemainingBytes(1)) {
                return this.buf[this.currentPos++];
            }
            else {
                this.error = true;
                return NaN;
            }
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readUInt16 = /**
         * @return {?}
         */
        function () {
            if (this.assureRemainingBytes(2)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256;
            }
            else {
                this.error = true;
                return NaN;
            }
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readUInt64 = /**
         * @return {?}
         */
        function () {
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
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readUInt32 = /**
         * @return {?}
         */
        function () {
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
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readString = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = null;
            /** @type {?} */
            var length = this.readUInt32();
            if (!this.error) {
                if (this.assureRemainingBytes(length)) {
                    result = this.readCharArray(length);
                }
                else {
                    this.error = true;
                }
            }
            return result;
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readTimestamp = /**
         * @return {?}
         */
        function () {
            return this.readUInt64();
        };
        /**
         * @param {?} arrayLength
         * @return {?}
         */
        BinaryReader.prototype.readCharArray = /**
         * @param {?} arrayLength
         * @return {?}
         */
        function (arrayLength) {
            /** @type {?} */
            var result = [];
            /** @type {?} */
            var idx = 0;
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
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readFloat32 = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = NaN;
            if (this.assureRemainingBytes(4)) {
                /** @type {?} */
                var buf = new ArrayBuffer(4);
                /** @type {?} */
                var view = new DataView(buf);
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
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readVec3 = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = null;
            if (this.assureRemainingBytes(12)) {
                /** @type {?} */
                var buf = new ArrayBuffer(12);
                /** @type {?} */
                var view = new DataView(buf);
                for (var i = 0; i < 12; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec3(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true));
            }
            else {
                this.error = true;
            }
            return result;
        };
        /**
         * @return {?}
         */
        BinaryReader.prototype.readVec4 = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = null;
            if (this.assureRemainingBytes(16)) {
                /** @type {?} */
                var buf = new ArrayBuffer(16);
                /** @type {?} */
                var view = new DataView(buf);
                for (var i = 0; i < 16; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec4(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true), view.getFloat32(12, true));
            }
            else {
                this.error = true;
            }
            return result;
        };
        return BinaryReader;
    }());
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
    var AppStateDeltaReader = /** @class */ (function () {
        function AppStateDeltaReader(reader) {
            this.isInitializing = false;
            this.reader = reader;
        }
        Object.defineProperty(AppStateDeltaReader.prototype, "Reader", {
            get: /**
             * @return {?}
             */
            function () {
                return this.reader;
            },
            enumerable: true,
            configurable: true
        });
        /** Indicates if there is data left to process.
          */
        /**
         * Indicates if there is data left to process.
         * @return {?}
         */
        AppStateDeltaReader.prototype.isAtEnd = /**
         * Indicates if there is data left to process.
         * @return {?}
         */
        function () { return this.reader.AtEnd; };
        /** Reads the cluster ID from the data.
          */
        /**
         * Reads the cluster ID from the data.
         * @return {?}
         */
        AppStateDeltaReader.prototype.readClusterID = /**
         * Reads the cluster ID from the data.
         * @return {?}
         */
        function () {
            return this.reader.readString();
        };
        Object.defineProperty(AppStateDeltaReader.prototype, "IsInitializing", {
            /** Indicates if the message is an initialization message rather than a "normal" delta package.
              * This can be evaluated by the cluster to handle initialization different from updating.
              */
            get: /**
             * Indicates if the message is an initialization message rather than a "normal" delta package.
             * This can be evaluated by the cluster to handle initialization different from updating.
             * @return {?}
             */
            function () {
                return this.isInitializing;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateDeltaReader;
    }());
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
    var AppStateDeltaWriter = /** @class */ (function () {
        function AppStateDeltaWriter(writer) {
            this.writer = writer;
        }
        Object.defineProperty(AppStateDeltaWriter.prototype, "Writer", {
            get: /**
             * @return {?}
             */
            function () {
                return this.writer;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateDeltaWriter;
    }());
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
    var /**
     * @abstract
     */
    AppStateEntry = /** @class */ (function () {
        function AppStateEntry() {
            this.transactional = false;
        }
        Object.defineProperty(AppStateEntry.prototype, "AppState", {
            get: /**
             * @return {?}
             */
            function () {
                return this.appState;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this.appState = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        AppStateEntry.prototype.register = /**
         * @param {?} key
         * @param {?} cluster
         * @return {?}
         */
        function (key, cluster) {
            this.key = key;
            this.cluster = cluster;
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.reconcile = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.setDirty = /**
         * @return {?}
         */
        function () {
            this.cluster.setDirty();
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            //assert(!m_isTransactional);
            this.transactional = true;
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.endTransaction = /**
         * @return {?}
         */
        function () {
            //assert(m_isTransactional);
            this.transactional = false;
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.isTransactional = /**
         * @return {?}
         */
        function () {
            return this.transactional;
        };
        /**
         * @return {?}
         */
        AppStateEntry.prototype.isLocked = /**
         * @return {?}
         */
        function () {
            return this.cluster.IsLocked;
        };
        return AppStateEntry;
    }());
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
    var /**
     * @abstract
     */
    CommonAppStateEntry = /** @class */ (function (_super) {
        tslib_1.__extends(CommonAppStateEntry, _super);
        function CommonAppStateEntry() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.changedAt = 0;
            return _this;
        }
        /**
         * @return {?}
         */
        CommonAppStateEntry.prototype.beginChanging = /**
         * @return {?}
         */
        function () {
            this.changedAt = Date.now();
            this.setDirty();
        };
        return CommonAppStateEntry;
    }(AppStateEntry));
    modelstageappstate.CommonAppStateEntry = CommonAppStateEntry;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        CommonAppStateEntry.prototype.changedAt;
    }
    var AppStateStringValue = /** @class */ (function (_super) {
        tslib_1.__extends(AppStateStringValue, _super);
        function AppStateStringValue() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dirty = false;
            return _this;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        AppStateStringValue.prototype.set = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value != this.value) {
                this.changing();
                this.value = value;
            }
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.get = /**
         * @return {?}
         */
        function () {
            return this.value;
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.getPreviousValue = /**
         * @return {?}
         */
        function () {
            return this.previousValue;
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.changing = /**
         * @return {?}
         */
        function () {
            //assert(IsTransactional());
            if (!this.dirty && !this.isLocked()) {
                this.beginChanging();
                this.previousValue = this.value;
                this.dirty = true;
            }
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            return this.dirty;
        };
        /**
         * @return {?}
         */
        AppStateStringValue.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            _super.prototype.beginTransaction.call(this);
            this.dirty = false;
        };
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        AppStateStringValue.prototype.deserializeDelta = /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        function (reader, key) {
            /** @type {?} */
            var result = false;
            // key was read by cluster
            /** @type {?} */
            var changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
                /** @type {?} */
                var prevValue = reader.Reader.readString();
                if (prevValue != null) {
                    this.value = reader.Reader.readString();
                    this.dirty = true;
                    this.setDirty();
                    result = true;
                }
            }
            return result;
        };
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        AppStateStringValue.prototype.serializeDelta = /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        function (writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            writer.Writer.writeString(this.previousValue);
            writer.Writer.writeString(this.value);
        };
        return AppStateStringValue;
    }(CommonAppStateEntry));
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
    var /**
     * @abstract
     * @template T
     */
    AppStateValue = /** @class */ (function (_super) {
        tslib_1.__extends(AppStateValue, _super);
        function AppStateValue() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dirty = false;
            return _this;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        AppStateValue.prototype.set = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value;
        };
        /**
         * @return {?}
         */
        AppStateValue.prototype.get = /**
         * @return {?}
         */
        function () {
            return this.value;
        };
        /**
         * @return {?}
         */
        AppStateValue.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            return this.dirty;
        };
        /**
         * @return {?}
         */
        AppStateValue.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            _super.prototype.beginTransaction.call(this);
            this.dirty = false;
        };
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        AppStateValue.prototype.deserializeDelta = /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        function (reader, key) {
            /** @type {?} */
            var result = false;
            // key was read by cluster
            /** @type {?} */
            var changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
                /** @type {?} */
                var prevValue = this.readValue(reader);
                if (prevValue != null) {
                    this.value = this.readValue(reader);
                    this.dirty = true;
                    this.setDirty();
                    result = true;
                }
            }
            return result;
        };
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        AppStateValue.prototype.serializeDelta = /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        function (writer, key) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            this.writeValue(writer, this.previousValue);
            this.writeValue(writer, this.value);
        };
        return AppStateValue;
    }(CommonAppStateEntry));
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
    var AppStateBoolValue = /** @class */ (function (_super) {
        tslib_1.__extends(AppStateBoolValue, _super);
        function AppStateBoolValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        AppStateBoolValue.prototype.readValue = /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            /** @type {?} */
            var result = false;
            if (reader.Reader.assureRemainingBytes(1)) {
                result = reader.Reader.readByte() != 0;
            }
            return result;
        };
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        AppStateBoolValue.prototype.writeValue = /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (writer, value) {
            writer.Writer.writeByte(value ? 0xff : 0);
        };
        return AppStateBoolValue;
    }(AppStateValue));
    modelstageappstate.AppStateBoolValue = AppStateBoolValue;
    var AppStateVector4Value = /** @class */ (function (_super) {
        tslib_1.__extends(AppStateVector4Value, _super);
        function AppStateVector4Value() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        AppStateVector4Value.prototype.readValue = /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            /** @type {?} */
            var result = null;
            // sizeof(float) * (x,y,z,w)
            if (reader.Reader.assureRemainingBytes(4 * 4)) {
                result = new psgeometry.Vec4();
                result.x = reader.Reader.readFloat32();
                result.y = reader.Reader.readFloat32();
                result.z = reader.Reader.readFloat32();
                result.w = reader.Reader.readFloat32();
            }
            return result;
        };
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        AppStateVector4Value.prototype.writeValue = /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (writer, value) {
            writer.Writer.writeFloat32(value.x);
            writer.Writer.writeFloat32(value.y);
            writer.Writer.writeFloat32(value.z);
            writer.Writer.writeFloat32(value.w);
        };
        return AppStateVector4Value;
    }(AppStateValue));
    modelstageappstate.AppStateVector4Value = AppStateVector4Value;
    var AppStateFloatValue = /** @class */ (function (_super) {
        tslib_1.__extends(AppStateFloatValue, _super);
        function AppStateFloatValue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        AppStateFloatValue.prototype.readValue = /**
         * @protected
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            /** @type {?} */
            var result = NaN;
            if (reader.Reader.assureRemainingBytes(4)) {
                result = reader.Reader.readFloat32();
            }
            return result;
        };
        /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        AppStateFloatValue.prototype.writeValue = /**
         * @protected
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (writer, value) {
            writer.Writer.writeFloat32(value);
        };
        return AppStateFloatValue;
    }(AppStateValue));
    modelstageappstate.AppStateFloatValue = AppStateFloatValue;
    var AppStateOperation = /** @class */ (function () {
        function AppStateOperation(changedAt, isLocal) {
            if (isLocal === void 0) { isLocal = true; }
            this.changedAt = changedAt;
            this.isLocal = isLocal;
        }
        Object.defineProperty(AppStateOperation.prototype, "ChangedAt", {
            get: /**
             * @return {?}
             */
            function () {
                return this.changedAt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateOperation.prototype, "IsLocal", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isLocal;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateOperation;
    }());
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
    var /**
     * @template T
     */
    AppStateValueOperation = /** @class */ (function (_super) {
        tslib_1.__extends(AppStateValueOperation, _super);
        function AppStateValueOperation(changedAt, newValue, previousValue, isLocal) {
            if (newValue === void 0) { newValue = null; }
            if (previousValue === void 0) { previousValue = null; }
            if (isLocal === void 0) { isLocal = true; }
            var _this = _super.call(this, changedAt, isLocal) || this;
            _this.isNewValueDefined = false;
            _this.isPreviousValueDefined = false;
            if (newValue != null) {
                _this.isNewValueDefined = true;
                _this.newValue = newValue;
            }
            if (previousValue) {
                _this.isPreviousValueDefined = true;
                _this.previousValue = previousValue;
            }
            return _this;
        }
        Object.defineProperty(AppStateValueOperation.prototype, "IsNewValueDefined", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isNewValueDefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateValueOperation.prototype, "IsPreviousValueDefined", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isPreviousValueDefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateValueOperation.prototype, "NewValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.newValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateValueOperation.prototype, "PreviousValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.previousValue;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateValueOperation;
    }(AppStateOperation));
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
    var OperationType;
    (function (OperationType) {
        OperationType[OperationType["Clear"] = 0] = "Clear";
        OperationType[OperationType["Append"] = 1] = "Append";
        OperationType[OperationType["Insert"] = 2] = "Insert";
        OperationType[OperationType["Remove"] = 3] = "Remove";
        OperationType[OperationType["Replace"] = 4] = "Replace";
    })(OperationType = modelstageappstate.OperationType || (modelstageappstate.OperationType = {}));
    var StorageFlags;
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
    var /**
     * @template T
     */
    AppStateCollectionOperation = /** @class */ (function (_super) {
        tslib_1.__extends(AppStateCollectionOperation, _super);
        function AppStateCollectionOperation(changedAt, operation, itemIndex, newValue, previousValue, isLocal) {
            if (itemIndex === void 0) { itemIndex = 0; }
            if (newValue === void 0) { newValue = null; }
            if (previousValue === void 0) { previousValue = null; }
            if (isLocal === void 0) { isLocal = true; }
            var _this = _super.call(this, changedAt, newValue, previousValue, isLocal) || this;
            _this.operation = operation;
            _this.itemIndex = itemIndex;
            _this.reconciledItemIndex = itemIndex;
            return _this;
        }
        Object.defineProperty(AppStateCollectionOperation.prototype, "Operation", {
            get: /**
             * @return {?}
             */
            function () {
                return this.operation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateCollectionOperation.prototype, "ItemIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this.itemIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateCollectionOperation.prototype, "ReconciledItemIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this.reconciledItemIndex;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.reconciledItemIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        return AppStateCollectionOperation;
    }(AppStateValueOperation));
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
    var /**
     * @template T
     */
    AppStateCollection = /** @class */ (function (_super) {
        tslib_1.__extends(AppStateCollection, _super);
        function AppStateCollection(appStateCollectionOperationType, serializeOperationChangedAt, serializePreviousValues) {
            if (serializeOperationChangedAt === void 0) { serializeOperationChangedAt = true; }
            if (serializePreviousValues === void 0) { serializePreviousValues = true; }
            var _this = _super.call(this) || this;
            _this.appStateCollectionOperationType = appStateCollectionOperationType;
            _this.container = [];
            _this.operations = [];
            _this.serializeOperationChangedAt = serializeOperationChangedAt;
            _this.serializePreviousValues = serializePreviousValues;
            return _this;
        }
        Object.defineProperty(AppStateCollection.prototype, "Operations", {
            get: /**
             * @return {?}
             */
            function () {
                return this.operations;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @protected
         * @param {?} op
         * @return {?}
         */
        AppStateCollection.prototype.addOperation = /**
         * @protected
         * @param {?} op
         * @return {?}
         */
        function (op) {
            if (this.isTransactional()) {
                if (this.operations.length == 0) {
                    this.beginChanging();
                }
                this.operations.push(op);
            }
            else {
                console.error('AppState not transactional while adding operation to AppStateCollection');
            }
        };
        /**
         * @return {?}
         */
        AppStateCollection.prototype.clear = /**
         * @return {?}
         */
        function () {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Clear));
            }
            this.container.length = 0;
        };
        /**
         * @param {?} item
         * @return {?}
         */
        AppStateCollection.prototype.append = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Append, this.container.length, item));
            }
            this.container.push(item);
        };
        /**
         * @param {?} item
         * @param {?} beforeIndex
         * @return {?}
         */
        AppStateCollection.prototype.insert = /**
         * @param {?} item
         * @param {?} beforeIndex
         * @return {?}
         */
        function (item, beforeIndex) {
            if (beforeIndex <= this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Insert, beforeIndex, item));
                }
                this.container.splice(beforeIndex, 0, item);
            }
            else {
                console.error('Index out of range while inserting into AppStateCollection');
            }
        };
        /**
         * @param {?} index
         * @return {?}
         */
        AppStateCollection.prototype.remove = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Remove, index, null, this.container[index]));
                }
                this.container.splice(index, 1);
            }
            else {
                console.error('Index out of range while removing from AppStateCollection');
            }
        };
        /**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        AppStateCollection.prototype.replace = /**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        function (item, index) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Replace, index, item, this.container[index]));
                }
                this.container[index] = item;
            }
            else {
                console.error('Index out of range while replacing item in AppStateCollection');
            }
        };
        /**
         * @param {?} index
         * @return {?}
         */
        AppStateCollection.prototype.GetItemAt = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            return this.container[index];
        };
        Object.defineProperty(AppStateCollection.prototype, "Count", {
            get: /**
             * @return {?}
             */
            function () {
                return this.container.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AppStateCollection.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            return this.operations.length > 0;
        };
        /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        AppStateCollection.prototype.deserializeDelta = /**
         * @param {?} reader
         * @param {?} key
         * @return {?}
         */
        function (reader, key) {
            // key was read by cluster
            /** @type {?} */
            var changedAt = reader.Reader.readTimestamp();
            /** @type {?} */
            var operationCount = reader.Reader.readUInt32();
            /** @type {?} */
            var success = !reader.Reader.Error;
            if (success) {
                if (operationCount > 0) {
                    this.setDirty();
                }
                for (var i = 0; i < operationCount; ++i) {
                    /** @type {?} */
                    var flags = reader.Reader.readByte();
                    if (!reader.Reader.Error) {
                        /** @type {?} */
                        var storageFlags = flags & StorageFlags.Mask;
                        /** @type {?} */
                        var opType = flags & ~StorageFlags.Mask;
                        /** @type {?} */
                        var opChangedAt = changedAt;
                        /** @type {?} */
                        var itemIndex = 0;
                        /** @type {?} */
                        var newValue = void 0;
                        /** @type {?} */
                        var prevValue = void 0;
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
        };
        /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        AppStateCollection.prototype.serializeDelta = /**
         * @param {?} writer
         * @param {?} key
         * @return {?}
         */
        function (writer, key) {
            var _this = this;
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            writer.Writer.writeInt32(this.operations.length);
            this.operations.forEach(function (op) {
                /** @type {?} */
                var storageFlags = (op.ItemIndex < 0x10000 ? StorageFlags.ItemIndex16Bit : StorageFlags.None) |
                    (op.IsNewValueDefined ? StorageFlags.HasNewValue : StorageFlags.None) |
                    (op.IsPreviousValueDefined && _this.serializePreviousValues ? StorageFlags.HasPreviousValue : StorageFlags.None) |
                    (_this.serializeOperationChangedAt ? StorageFlags.HasChangedDate : StorageFlags.None);
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
                    _this.cluster.writeValue(key, writer, op.NewValue);
                }
                if (storageFlags & StorageFlags.HasPreviousValue) {
                    _this.cluster.writeValue(key, writer, op.PreviousValue);
                }
            });
        };
        /**
         * @return {?}
         */
        AppStateCollection.prototype.reconcile = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.operations.forEach(function (operation) {
                if (!operation.IsLocal) {
                    switch (operation.Operation) {
                        case OperationType.Clear:
                            _this.container.length = 0;
                            operation.ReconciledItemIndex = -1;
                            break;
                        case OperationType.Append:
                            if (operation.IsNewValueDefined) {
                                _this.container.push(operation.NewValue);
                                operation.ReconciledItemIndex = _this.container.length - 1;
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Append reconciliation');
                            }
                            break;
                        case OperationType.Insert:
                            if (operation.IsNewValueDefined) {
                                if (operation.ItemIndex < _this.container.length) {
                                    _this.container.splice(operation.ItemIndex, 0, operation.NewValue);
                                    operation.ReconciledItemIndex = operation.ItemIndex;
                                }
                                else {
                                    _this.container.push(operation.NewValue);
                                    operation.ReconciledItemIndex = _this.container.length - 1;
                                }
                            }
                            else {
                                console.error('Expected new value during AppStateCollection.Insert reconciliation');
                            }
                            break;
                        case OperationType.Remove:
                            if (operation.IsPreviousValueDefined) {
                                if (operation.ItemIndex < _this.container.length) { // && operation.PreviousValue == this.container[operation.ItemIndex]) {
                                    _this.container.splice(operation.ItemIndex, 1);
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
                                if (operation.ItemIndex < _this.container.length) {
                                    _this.container[operation.ItemIndex] = operation.NewValue;
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
        };
        /**
         * @return {?}
         */
        AppStateCollection.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            _super.prototype.beginTransaction.call(this);
            this.operations.length = 0;
        };
        return AppStateCollection;
    }(CommonAppStateEntry));
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
    var AppStateClusterManagerBase = /** @class */ (function () {
        function AppStateClusterManagerBase() {
            /**
             * A vector managing pointers to all instances of the corresponding cluster type.
             */
            this.allInstances = [];
        }
        /** Adds a new instance of the corresponding cluster type to this.
          */
        /**
         * Adds a new instance of the corresponding cluster type to this.
         * @protected
         * @param {?} instance
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.addInstance = /**
         * Adds a new instance of the corresponding cluster type to this.
         * @protected
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            instance.registerEntries();
            this.allInstances.push(instance);
        };
        /** Starts the transactional phase. Changes to entries and their values may only be carried out
          * during the transactional phase.
          */
        /**
         * Starts the transactional phase. Changes to entries and their values may only be carried out
         * during the transactional phase.
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.beginTransaction = /**
         * Starts the transactional phase. Changes to entries and their values may only be carried out
         * during the transactional phase.
         * @return {?}
         */
        function () {
            for (var clusterKey in this.allInstances) {
                this.allInstances[clusterKey].beginTransaction();
            }
        };
        /** Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
          * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
          */
        /**
         * Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.endTransaction = /**
         * Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
         * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
         * @return {?}
         */
        function () {
            for (var clusterKey in this.allInstances) {
                this.allInstances[clusterKey].endTransaction();
            }
        };
        /** Applies app state changes to the view state of the application. This method is being called after all local changes have
          * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
          * update cycle have been carried out and will be reflected in the view state.
          */
        /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state.
         * @param {?} scene
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.applyChanges = /**
         * Applies app state changes to the view state of the application. This method is being called after all local changes have
         * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
         * update cycle have been carried out and will be reflected in the view state.
         * @param {?} scene
         * @return {?}
         */
        function (scene) {
            for (var clusterKey in this.allInstances) {
                /** @type {?} */
                var cluster = this.allInstances[clusterKey];
                if (cluster.isDirty()) {
                    cluster.applyChanges(scene, cluster.PeerID, cluster.InstanceID);
                    scene.setDirty();
                }
            }
        };
        /** Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
          * be overriden by concrete subclasses of AppStateClusterManagerBase.
          */
        /**
         * Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.serializeClusterInstanceData = /**
         * Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        function (cluster, deltaWriter, appState) {
        };
        /** Serializes all changes that have been carried out on clusters of the corresponding type.
          */
        /**
         * Serializes all changes that have been carried out on clusters of the corresponding type.
         * @param {?} deltaWriter
         * @param {?} clusterID
         * @param {?} appState
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.serializeTransaction = /**
         * Serializes all changes that have been carried out on clusters of the corresponding type.
         * @param {?} deltaWriter
         * @param {?} clusterID
         * @param {?} appState
         * @return {?}
         */
        function (deltaWriter, clusterID, appState) {
            var _this = this;
            /** @type {?} */
            var dirtyClusters = [];
            for (var clusterKey in this.allInstances) {
                /** @type {?} */
                var cluster = this.allInstances[clusterKey];
                if (cluster.isDirty()) {
                    dirtyClusters.push(cluster);
                }
            }
            if (dirtyClusters.length > 0) {
                deltaWriter.Writer.writeString(clusterID);
                deltaWriter.Writer.writeUInt16(dirtyClusters.length);
                dirtyClusters.forEach(function (cluster) {
                    _this.serializeClusterInstanceData(cluster, deltaWriter, appState);
                    cluster.serializeTransaction(deltaWriter, appState);
                });
            }
        };
        /** Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
          * be overriden by concrete subclasses of AppStateClusterManagerBase.
          */
        /**
         * Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        AppStateClusterManagerBase.prototype.deserializeTransaction = /**
         * Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
         * be overriden by concrete subclasses of AppStateClusterManagerBase.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, appState, scene) {
            return false;
        };
        return AppStateClusterManagerBase;
    }());
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
    var /**
     * Concrete subclass of AppStateClusterManagerBase that provides a single, global instance of the specified cluster type.
     * @template TAppStateCluster
     */
    GlobalAppStateClusterManager = /** @class */ (function (_super) {
        tslib_1.__extends(GlobalAppStateClusterManager, _super);
        function GlobalAppStateClusterManager(clusterTypeID, clusterType) {
            var _this = _super.call(this) || this;
            _this.clusterType = clusterType;
            _this.onlyInstance = new clusterType();
            AppState.GetInstance().addCluster(clusterTypeID, _this);
            _this.addInstance(_this.onlyInstance);
            return _this;
        }
        /** Gets the only instance of this cluster type.
          */
        /**
         * Gets the only instance of this cluster type.
         * @return {?}
         */
        GlobalAppStateClusterManager.prototype.getGlobalCluster = /**
         * Gets the only instance of this cluster type.
         * @return {?}
         */
        function () {
            return this.onlyInstance;
        };
        /** As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
          */
        /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        GlobalAppStateClusterManager.prototype.serializeClusterInstanceData = /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        function (cluster, deltaWriter, appState) {
        };
        /** As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
          * additional data from the reader.
          */
        /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
         * additional data from the reader.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        GlobalAppStateClusterManager.prototype.deserializeTransaction = /**
         * As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
         * additional data from the reader.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, appState, scene) {
            /** @type {?} */
            var success = false;
            /** @type {?} */
            var instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (var i = 0; i < instanceCount; ++i) {
                    /** @type {?} */
                    var cluster = this.getGlobalCluster();
                    success = cluster.deserializeTransaction(deltaReader, appState, scene);
                }
            }
            return success;
        };
        return GlobalAppStateClusterManager;
    }(AppStateClusterManagerBase));
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
    var /**
     * Concrete subclass of AppStateClusterManagerBase that distinguishes local and remote instances of the
     * corresponding cluster type (derived from AppStateCluster). Each peer may have zero or one instances of the cluster type.
     * @template TAppStateCluster
     */
    LocalAppStateClusterManager = /** @class */ (function (_super) {
        tslib_1.__extends(LocalAppStateClusterManager, _super);
        function LocalAppStateClusterManager(clusterTypeID, clusterType) {
            var _this = _super.call(this) || this;
            _this.clusterType = clusterType;
            /**
             * The map of cluster per peer.
             */
            _this.peerClusters = {};
            _this.peerClusters[''] = new clusterType();
            AppState.GetInstance().addCluster(clusterTypeID, _this);
            _this.addInstance(_this.peerClusters['']);
            return _this;
        }
        /** Gets the local peer's instance of this cluster type.
          */
        /**
         * Gets the local peer's instance of this cluster type.
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.getLocalCluster = /**
         * Gets the local peer's instance of this cluster type.
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.allInstances['']));
        };
        /** \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
          * it's created.
          */
        /**
         * \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
         * it's created.
         * @param {?} peerID
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.getCluster = /**
         * \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
         * it's created.
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            /** @type {?} */
            var result = null;
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
        };
        /** Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
          */
        /**
         * Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
         * @param {?} peerID
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.containsCluster = /**
         * Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            return this.peerClusters[peerID] != null;
        };
        /** As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
          * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
          */
        /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
         * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.serializeClusterInstanceData = /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
         * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
         * @param {?} cluster
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        function (cluster, deltaWriter, appState) {
            /** @type {?} */
            var peerID = cluster.PeerID;
            // Use local peerID if the cluster's peer ID is empty.
            deltaWriter.Writer.writeString(peerID.length == 0 ? appState.LocalPeerID : peerID);
        };
        /** As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
          * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
          * key (empty string) that is used to identify local peer data.
          */
        /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
         * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
         * key (empty string) that is used to identify local peer data.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        LocalAppStateClusterManager.prototype.deserializeTransaction = /**
         * As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
         * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
         * key (empty string) that is used to identify local peer data.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, appState, scene) {
            /** @type {?} */
            var success = false;
            /** @type {?} */
            var instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (var i = 0; i < instanceCount; ++i) {
                    /** @type {?} */
                    var peerID = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {
                        if (peerID == appState.LocalPeerID) {
                            peerID = '';
                        }
                        /** @type {?} */
                        var cluster = this.getCluster(peerID);
                        success = cluster.deserializeTransaction(deltaReader, appState, scene);
                    }
                }
            }
            return success;
        };
        return LocalAppStateClusterManager;
    }(AppStateClusterManagerBase));
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
    var /**
     * AppStateCluster instances store information about the application state. Based on application state, changes
     * to the view state are carried out. In order to be able to synchronize application state, operations on the entries that
     * are aggregated by AppStateCluster,  are stored during a "transactional phase". Immediately afterwards, all changes are
     * collected and sync'ed with remote peers. Similarly, when remote changes are received, they are processed after the local
     * collection took place, causing app state changes. Finally, all cluster's entry's changes are processed to update the
     * application's view state.
     * @abstract
     */
    AppStateCluster = /** @class */ (function () {
        /** Constructor
          * @param peerID		The peer ID this cluster instance belongs to. If it's left empty, the local peer's ID will be used.
          * @param instanceID	The peer-unique instance ID. This ID is only necessary, if multi-instances are used (per peer). This depends on the AppStateClusterManager used to manage instances.
          * @param appState		The app state container this cluster belongs to.
          */
        function AppStateCluster(peerID, instanceID, appState) {
            this.entries = {};
            this.dirty = false;
            this.lockCount = 0;
            this.peerID = peerID || '';
            this.instanceID = instanceID || '';
            this.appState = appState || AppState.GetInstance();
        }
        Object.defineProperty(AppStateCluster.prototype, "PeerID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.peerID;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.peerID = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppStateCluster.prototype, "InstanceID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.instanceID;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AppStateCluster.prototype.beginTransaction = /**
         * @return {?}
         */
        function () {
            this.dirty = false;
            for (var entryIdx in this.entries) {
                this.entries[entryIdx].beginTransaction();
            }
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.endTransaction = /**
         * @return {?}
         */
        function () {
            for (var entryIdx in this.entries) {
                this.entries[entryIdx].endTransaction();
            }
        };
        /**
         * @private
         * @param {?} scene
         * @return {?}
         */
        AppStateCluster.prototype.reconcile = /**
         * @private
         * @param {?} scene
         * @return {?}
         */
        function (scene) {
            for (var entryIdx in this.entries) {
                this.entries[entryIdx].reconcile();
            }
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.setDirty = /**
         * @return {?}
         */
        function () {
            this.dirty = true;
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            return this.dirty;
        };
        /**
         * @param {?} key
         * @param {?} entry
         * @return {?}
         */
        AppStateCluster.prototype.registerEntry = /**
         * @param {?} key
         * @param {?} entry
         * @return {?}
         */
        function (key, entry) {
            this.entries[key] = entry;
            entry.register(key, this);
        };
        /** ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
          * override ApplyChanges to update the view state based on the app state changes that occured.
          */
        /**
         * ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
         * override ApplyChanges to update the view state based on the app state changes that occured.
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        AppStateCluster.prototype.applyChanges = /**
         * ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
         * override ApplyChanges to update the view state based on the app state changes that occured.
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        function (scene, peerID, instanceID) {
        };
        /** Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
          */
        /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        AppStateCluster.prototype.serializeTransaction = /**
         * Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
         * @param {?} deltaWriter
         * @param {?} appState
         * @return {?}
         */
        function (deltaWriter, appState) {
            // setIsInitializing(deltaWriter.IsInitialization());
            // setIsInitializing(deltaWriter.IsInitialization());
            /** @type {?} */
            var dirtyEntries = [];
            for (var idx in this.entries) {
                if (this.entries[idx].isDirty()) {
                    dirtyEntries.push({ key: idx, entry: this.entries[idx] });
                }
            }
            deltaWriter.Writer.writeUInt16(dirtyEntries.length);
            dirtyEntries.forEach(function (e) {
                e.entry.serializeDelta(deltaWriter, e.key);
            });
        };
        /** Retrieves all remote operations that have been received from remote peers.
          */
        /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        AppStateCluster.prototype.deserializeTransaction = /**
         * Retrieves all remote operations that have been received from remote peers.
         * @param {?} deltaReader
         * @param {?} appState
         * @param {?} scene
         * @return {?}
         */
        function (deltaReader, appState, scene) {
            /** @type {?} */
            var success = true;
            /** @type {?} */
            var entryCount = deltaReader.Reader.readUInt16();
            // setIsInitializing(deltaReader.IsInitializing());
            if (!deltaReader.Reader.Error) {
                for (var i = 0; i < entryCount && success; ++i) {
                    /** @type {?} */
                    var entryKey = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {
                        /** @type {?} */
                        var entry = this.entries[entryKey];
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
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.lock = /**
         * @return {?}
         */
        function () {
            ++this.lockCount;
        };
        /**
         * @return {?}
         */
        AppStateCluster.prototype.unlock = /**
         * @return {?}
         */
        function () {
            --this.lockCount;
        };
        Object.defineProperty(AppStateCluster.prototype, "IsLocked", {
            get: /**
             * @return {?}
             */
            function () {
                return this.lockCount > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        AppStateCluster.prototype.readValue = /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        function (key, reader) {
            console.error('readValue not implemented for ' + key);
        };
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        AppStateCluster.prototype.writeValue = /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (key, writer, value) {
            console.error('writeValue not implemented for ' + key);
        };
        return AppStateCluster;
    }());
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
    var Director = /** @class */ (function () {
        function Director(appState) {
            this.pendingUpdates = [];
            this.pendingMessages = [];
            this.appState = appState;
        }
        Object.defineProperty(Director.prototype, "Scene", {
            set: /**
             * @param {?} scene
             * @return {?}
             */
            function (scene) {
                this.scene = scene;
            },
            enumerable: true,
            configurable: true
        });
        /** Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
          * BeginUpdate is called at the very beginning of each render cycle.
          */
        /**
         * Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
         * BeginUpdate is called at the very beginning of each render cycle.
         * @return {?}
         */
        Director.prototype.beginFrame = /**
         * Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
         * BeginUpdate is called at the very beginning of each render cycle.
         * @return {?}
         */
        function () {
            this.appState.beginTransaction();
        };
        /**
         * @return {?}
         */
        Director.prototype.commit = /**
         * @return {?}
         */
        function () {
            this.acquirePendingUpdates().forEach(function (updFunc) {
                updFunc();
            });
            this.appState.endTransaction();
        };
        /** Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
          * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
          */
        /**
         * Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
         * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
         * @param {?} connection
         * @return {?}
         */
        Director.prototype.submitLocalUpdates = /**
         * Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
         * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
         * @param {?} connection
         * @return {?}
         */
        function (connection) {
            /** @type {?} */
            var AppStateDelta = 0x0100;
            /** @type {?} */
            var writer = new AppStateDeltaWriter(new BinaryWriter());
            writer.Writer.writeInt32(1);
            writer.Writer.writeInt32(AppStateDelta);
            this.appState.serializeTransaction(writer);
            /** @type {?} */
            var buf = writer.Writer.flush();
            /** @type {?} */
            var msg = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
            if (msg.HasPayload && connection.IsConnected) {
                connection.send(msg.Content);
            }
        };
        /** Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after
          * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
          */
        /**
         * Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after
         * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
         * @return {?}
         */
        Director.prototype.applyRemoteUpdates = /**
         * Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after
         * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var pendingMessages = this.acquirePendingMessages();
            pendingMessages.forEach(function (msg) {
                _this.appState.deserializeTransaction(new AppStateDeltaReader(new BinaryReader(msg.Content)), _this.scene);
            });
        };
        /**
         * @private
         * @return {?}
         */
        Director.prototype.acquirePendingUpdates = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = this.pendingUpdates;
            this.pendingUpdates = [];
            return result;
        };
        /**
         * @private
         * @return {?}
         */
        Director.prototype.acquirePendingMessages = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = this.pendingMessages;
            this.pendingMessages = [];
            return result;
        };
        /** Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
          */
        /**
         * Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
         * @return {?}
         */
        Director.prototype.endFrame = /**
         * Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
         * @return {?}
         */
        function () {
            this.appState.applyChanges(this.scene);
        };
        /**
         * @param {?} message
         * @return {?}
         */
        Director.prototype.receivedMessage = /**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            this.pendingMessages.push(message);
        };
        /**
         * @param {?} func
         * @return {?}
         */
        Director.prototype.synchronizeStateUpdate = /**
         * @param {?} func
         * @return {?}
         */
        function (func) {
            this.pendingUpdates.push(func);
        };
        return Director;
    }());
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
    var DirectedSceneWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(DirectedSceneWebGL, _super);
        function DirectedSceneWebGL(director, connection) {
            var _this = _super.call(this) || this;
            _this.director = director;
            _this.connection = connection;
            return _this;
        }
        /**
         * @return {?}
         */
        DirectedSceneWebGL.prototype.beginFrame = /**
         * @return {?}
         */
        function () {
            this.director.beginFrame();
        };
        /**
         * @return {?}
         */
        DirectedSceneWebGL.prototype.update = /**
         * @return {?}
         */
        function () {
            this.director.commit();
            if (this.connection && this.connection.IsConnected) {
                this.director.submitLocalUpdates(this.connection);
                this.director.applyRemoteUpdates();
            }
        };
        /**
         * @return {?}
         */
        DirectedSceneWebGL.prototype.endFrame = /**
         * @return {?}
         */
        function () {
            this.director.endFrame();
        };
        /**
         * @param {?} message
         * @return {?}
         */
        DirectedSceneWebGL.prototype.receivedMessage = /**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            if (message.MessageType == modelstageweb.CommonMessageTypes.AppStateDelta || message.MessageType == modelstageweb.CommonMessageTypes.AppStateInitialization) {
                this.director.receivedMessage(message);
            }
        };
        /**
         * @param {?} func
         * @return {?}
         */
        DirectedSceneWebGL.prototype.synchronizeStateUpdate = /**
         * @param {?} func
         * @return {?}
         */
        function (func) {
            this.director.synchronizeStateUpdate(func);
        };
        return DirectedSceneWebGL;
    }(modelstageweb.SceneWebGL));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXgtYXBwc3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbW9kZWxzdGFnZS8iLCJzb3VyY2VzIjpbInNyYy9teC1hcHBzdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFNUMsTUFBTSxLQUFRLGtCQUFrQixDQTQrQy9CO0FBNStDRCxXQUFjLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7SUFjNUI7Ozs7Ozs7Ozs7Ozs7O1FBQUE7WUFDWSxvQkFBZSxHQUFrRCxFQUFFLENBQUM7UUFvRmhGLENBQUM7UUFoRkcsc0JBQVcscUNBQVc7Ozs7WUFBdEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzVCLENBQUM7Ozs7O1lBRUQsVUFBdUIsS0FBYTtnQkFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDN0IsQ0FBQzs7O1dBSkE7Ozs7O1FBTU0sd0NBQWlCOzs7O1FBQXhCLFVBQXlCLEdBQVc7WUFDaEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRDtZQUNJOzs7Ozs7O1FBQ0csaUNBQVU7Ozs7OztRQUFqQixVQUFrQixHQUFXLEVBQUUsT0FBbUM7WUFDOUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUM7UUFFeEMsQ0FBQztRQUVEOztZQUVJOzs7Ozs7UUFDRyx1Q0FBZ0I7Ozs7O1FBQXZCO1lBQ0ksS0FBSyxJQUFJLGlCQUFpQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzlEO1FBQ0wsQ0FBQztRQUVEOztZQUVJOzs7Ozs7UUFDRyxxQ0FBYzs7Ozs7UUFBckI7WUFDSSxLQUFLLElBQUksaUJBQWlCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzVEO1FBQ0wsQ0FBQztRQUVEOzs7O1lBSUk7Ozs7Ozs7OztRQUNHLG1DQUFZOzs7Ozs7OztRQUFuQixVQUFvQixLQUErQjtZQUMvQyxLQUFLLElBQUksaUJBQWlCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvRDtRQUNMLENBQUM7UUFFRDtZQUNJOzs7Ozs7UUFDRywyQ0FBb0I7Ozs7O1FBQTNCLFVBQTRCLFdBQWdDO1lBQ3hELEtBQUssSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3RHO1FBQ0wsQ0FBQztRQUVEO1lBQ0k7Ozs7Ozs7UUFDRyw2Q0FBc0I7Ozs7OztRQUE3QixVQUE4QixXQUFnQyxFQUFFLEtBQStCOztnQkFDdkYsT0FBTyxHQUFHLElBQUk7WUFFbEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxPQUFPLEVBQUU7O29CQUNsQyxTQUFTLEdBQUcsV0FBVyxDQUFDLGFBQWEsRUFBRTtnQkFFM0MsSUFBSSxTQUFTLEVBQUU7O3dCQUNQLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztvQkFDcEQsSUFBSSxjQUFjLEVBQUU7d0JBQ2hCLE9BQU8sR0FBRyxjQUFjLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDN0U7eUJBQ0k7d0JBQ0QsT0FBTyxHQUFHLEtBQUssQ0FBQztxQkFDbkI7aUJBQ0o7cUJBQ0k7b0JBQ0QsT0FBTyxHQUFHLEtBQUssQ0FBQztpQkFDbkI7YUFDSjtZQUVELE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFDTCxtQkFBQztJQUFELENBQUMsQUFyRkQsSUFxRkM7SUFyRlksK0JBQVksZUFxRnhCLENBQUE7Ozs7OztRQXBGRyx1Q0FBNEU7Ozs7O1FBRTVFLG1DQUE0Qjs7SUFvRmhDO1FBQThCLG9DQUFZO1FBQTFDOztRQVFBLENBQUM7Ozs7UUFOaUIsb0JBQVc7OztRQUF6QjtZQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNwQixRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7YUFDdEM7WUFDRCxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQU5jLGlCQUFRLEdBQUcsSUFBSSxDQUFDO1FBT25DLGVBQUM7S0FBQSxBQVJELENBQThCLFlBQVksR0FRekM7SUFSWSwyQkFBUSxXQVFwQixDQUFBOzs7Ozs7UUFQRyxrQkFBK0I7O0lBU25DO1FBQUE7WUFDWSxRQUFHLEdBQWtCLEVBQUUsQ0FBQztRQThGcEMsQ0FBQzs7OztRQTVGVSw0QkFBSzs7O1FBQVo7O2dCQUNRLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7OztRQUVNLGdDQUFTOzs7O1FBQWhCLFVBQWlCLEdBQVc7WUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFFTSxpQ0FBVTs7OztRQUFqQixVQUFrQixHQUFXO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQ3BCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBRU0sa0NBQVc7Ozs7UUFBbEIsVUFBbUIsR0FBVztZQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUNwQixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDOzs7OztRQUVNLGlDQUFVOzs7O1FBQWpCLFVBQWtCLEdBQVc7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksRUFDcEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUNqQixDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQ2xCLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUM7Ozs7O1FBRU0saUNBQVU7Ozs7UUFBakIsVUFBa0IsR0FBVztZQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUNwQixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQ2pCLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFDbEIsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUNsQixDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQ2xCLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFDbEIsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUNsQixDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDOzs7OztRQUVNLHFDQUFjOzs7O1FBQXJCLFVBQXNCLEdBQVc7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDOzs7OztRQUVNLG1DQUFZOzs7O1FBQW5CLFVBQW9CLEdBQVc7O2dCQUN2QixHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDOztnQkFDeEIsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O2dCQUMxQixPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7OztRQUVNLGtDQUFXOzs7O1FBQWxCLFVBQW1CLEdBQVc7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7Ozs7OztRQUVNLHFDQUFjOzs7OztRQUFyQixVQUFzQixHQUFXLEVBQUUsV0FBbUI7WUFDbEQsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hFO1FBQ0wsQ0FBQzs7Ozs7O1FBRU0seUNBQWtCOzs7OztRQUF6QixVQUEwQixHQUFXLEVBQUUsV0FBbUI7WUFDdEQsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQzlELEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwRTtRQUNMLENBQUM7Ozs7O1FBRU0sZ0NBQVM7Ozs7UUFBaEIsVUFBaUIsR0FBb0I7O2dCQUM3QixHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDOztnQkFDekIsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Z0JBQzVCLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7Ozs7O1FBRU0sZ0NBQVM7Ozs7UUFBaEIsVUFBaUIsR0FBb0I7O2dCQUM3QixHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDOztnQkFDekIsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOztnQkFDN0IsT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQztZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQ3hELE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFDOUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUNoRCxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQ3JELENBQUM7UUFDTixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBL0ZELElBK0ZDO0lBL0ZZLCtCQUFZLGVBK0Z4QixDQUFBOzs7Ozs7UUE5RkcsMkJBQWdDOztJQWdHcEM7UUFlSSxzQkFBWSxHQUFlO1lBWm5CLGVBQVUsR0FBVyxDQUFDLENBQUM7WUFFdkIsVUFBSyxHQUFZLEtBQUssQ0FBQztZQVczQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNuQixDQUFDO1FBVkQsc0JBQVcsK0JBQUs7Ozs7WUFBaEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsK0JBQUs7Ozs7WUFBaEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ2xELENBQUM7OztXQUFBOzs7OztRQU1NLDJDQUFvQjs7OztRQUEzQixVQUE0QixLQUFhO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFDMUQsQ0FBQzs7OztRQUVNLCtCQUFROzs7UUFBZjtZQUNJLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLE9BQU8sR0FBRyxDQUFDO2FBQ2Q7UUFDTCxDQUFDOzs7O1FBRU0saUNBQVU7OztRQUFqQjtZQUNJLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUN6QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsT0FBTyxHQUFHLENBQUM7YUFDZDtRQUNMLENBQUM7Ozs7UUFFTSxpQ0FBVTs7O1FBQWpCO1lBQ0ksSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRztvQkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxLQUFLO29CQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLFFBQVE7b0JBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsVUFBVTtvQkFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxhQUFhO29CQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLGVBQWU7b0JBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7YUFDdkQ7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLE9BQU8sR0FBRyxDQUFDO2FBQ2Q7UUFDTCxDQUFDOzs7O1FBRU0saUNBQVU7OztRQUFqQjtZQUNJLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEdBQUc7b0JBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsS0FBSztvQkFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLE9BQU8sR0FBRyxDQUFDO2FBQ2Q7UUFDTCxDQUFDOzs7O1FBRU0saUNBQVU7OztRQUFqQjs7Z0JBQ1EsTUFBTSxHQUFHLElBQUk7O2dCQUNiLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNiLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNuQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ3JCO2FBQ0o7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7O1FBRU0sb0NBQWE7OztRQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLENBQUM7Ozs7O1FBRU0sb0NBQWE7Ozs7UUFBcEIsVUFBcUIsV0FBbUI7O2dCQUNoQyxNQUFNLEdBQUcsRUFBRTs7Z0JBQ1gsR0FBRyxHQUFHLENBQUM7WUFDWCxPQUFPLEdBQUcsR0FBRyxXQUFXLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hGLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtvQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNsRDtxQkFBTTtvQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztpQkFDckI7YUFDSjtZQUNELElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDO1lBQy9CLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELENBQUM7Ozs7UUFFTSxrQ0FBVzs7O1FBQWxCOztnQkFDUSxNQUFNLEdBQUcsR0FBRztZQUVoQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTs7b0JBQzFCLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7O29CQUN4QixJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTlDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNyQjtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7Ozs7UUFFTSwrQkFBUTs7O1FBQWY7O2dCQUNRLE1BQU0sR0FBRyxJQUFJO1lBRWpCLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxFQUFFOztvQkFDM0IsR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQzs7b0JBQ3pCLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDakQ7Z0JBQ0QsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzlHO2lCQUFNO2dCQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7OztRQUVNLCtCQUFROzs7UUFBZjs7Z0JBQ1EsTUFBTSxHQUFHLElBQUk7WUFFakIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLEVBQUU7O29CQUMzQixHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDOztvQkFDekIsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtvQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNqRDtnQkFDRCxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDekk7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDckI7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQUFDLEFBekpELElBeUpDO0lBekpZLCtCQUFZLGVBeUp4QixDQUFBOzs7Ozs7UUF4SkcsMkJBQXdCOzs7OztRQUV4QixrQ0FBK0I7Ozs7O1FBRS9CLDZCQUErQjs7SUFzSm5DO1FBU0ksNkJBQVksTUFBb0I7WUFOeEIsbUJBQWMsR0FBWSxLQUFLLENBQUM7WUFPcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQztRQU5ELHNCQUFXLHVDQUFNOzs7O1lBQWpCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixDQUFDOzs7V0FBQTtRQU1EO1lBQ0k7Ozs7O1FBQ0cscUNBQU87Ozs7UUFBZCxjQUFtQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU5QztZQUNJOzs7OztRQUNHLDJDQUFhOzs7O1FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFLRCxzQkFBVywrQ0FBYztZQUh6Qjs7Z0JBRUk7Ozs7OztZQUNKO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUMvQixDQUFDOzs7V0FBQTtRQUNMLDBCQUFDO0lBQUQsQ0FBQyxBQTdCRCxJQTZCQztJQTdCWSxzQ0FBbUIsc0JBNkIvQixDQUFBOzs7Ozs7UUE1QkcscUNBQTZCOzs7OztRQUU3Qiw2Q0FBd0M7O0lBNEI1QztRQU9JLDZCQUFZLE1BQW9CO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLENBQUM7UUFORCxzQkFBVyx1Q0FBTTs7OztZQUFqQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQzs7O1dBQUE7UUFPTCwwQkFBQztJQUFELENBQUMsQUFaRCxJQVlDO0lBWlksc0NBQW1CLHNCQVkvQixDQUFBOzs7Ozs7UUFYRyxxQ0FBNkI7Ozs7O0lBYWpDOzs7O1FBQUE7WUFLWSxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQWdEM0MsQ0FBQztRQTVDRyxzQkFBVyxtQ0FBUTs7OztZQUFuQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekIsQ0FBQzs7Ozs7WUFFRCxVQUFvQixHQUFhO2dCQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUN4QixDQUFDOzs7V0FKQTs7Ozs7O1FBTU0sZ0NBQVE7Ozs7O1FBQWYsVUFBZ0IsR0FBVyxFQUFFLE9BQXdCO1lBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQzs7OztRQU1NLGlDQUFTOzs7UUFBaEI7UUFDQSxDQUFDOzs7O1FBSU0sZ0NBQVE7OztRQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7O1FBRU0sd0NBQWdCOzs7UUFBdkI7WUFDSSw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQzs7OztRQUVNLHNDQUFjOzs7UUFBckI7WUFDSSw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7OztRQUVNLHVDQUFlOzs7UUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7OztRQUVNLGdDQUFROzs7UUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQztRQUVMLG9CQUFDO0lBQUQsQ0FBQyxBQXJERCxJQXFEQztJQXJEcUIsZ0NBQWEsZ0JBcURsQyxDQUFBOzs7Ozs7UUFwREcsNEJBQW9COzs7OztRQUVwQixpQ0FBMkI7Ozs7O1FBRTNCLHNDQUF1Qzs7Ozs7UUFFdkMsZ0NBQW1DOzs7Ozs7O1FBZW5DLHNFQUFvRjs7Ozs7OztRQUVwRixvRUFBeUU7Ozs7O1FBS3pFLGtEQUEwQjs7Ozs7SUEwQjlCOzs7O1FBQWtELCtDQUFhO1FBQS9EO1lBQUEscUVBU0M7WUFSYSxlQUFTLEdBQVcsQ0FBQyxDQUFDOztRQVFwQyxDQUFDOzs7O1FBTlUsMkNBQWE7OztRQUFwQjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBR0wsMEJBQUM7SUFBRCxDQUFDLEFBVEQsQ0FBa0QsYUFBYSxHQVM5RDtJQVRxQixzQ0FBbUIsc0JBU3hDLENBQUE7Ozs7OztRQVJHLHdDQUFnQzs7SUFVcEM7UUFBeUMsK0NBQW1CO1FBQTVEO1lBQUEscUVBaUVDO1lBaEVXLFdBQUssR0FBWSxLQUFLLENBQUM7O1FBZ0VuQyxDQUFDOzs7OztRQTFEVSxpQ0FBRzs7OztRQUFWLFVBQVcsS0FBYTtZQUNwQixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQzs7OztRQUVNLGlDQUFHOzs7UUFBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7O1FBRU0sOENBQWdCOzs7UUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7OztRQUVNLHNDQUFROzs7UUFBZjtZQUNJLDRCQUE0QjtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQzs7OztRQUVNLHFDQUFPOzs7UUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7O1FBRU0sOENBQWdCOzs7UUFBdkI7WUFDSSxpQkFBTSxnQkFBZ0IsV0FBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7Ozs7OztRQUVNLDhDQUFnQjs7Ozs7UUFBdkIsVUFBd0IsTUFBMkIsRUFBRSxHQUFXOztnQkFDeEQsTUFBTSxHQUFHLEtBQUs7OztnQkFHZCxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDN0MsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFOztvQkFDZixTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQzFDLElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtvQkFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNoQixNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNqQjthQUNKO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7Ozs7O1FBRU0sNENBQWM7Ozs7O1FBQXJCLFVBQXNCLE1BQTJCLEVBQUUsR0FBVztZQUMxRCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUwsMEJBQUM7SUFBRCxDQUFDLEFBakVELENBQXlDLG1CQUFtQixHQWlFM0Q7SUFqRVksc0NBQW1CLHNCQWlFL0IsQ0FBQTs7Ozs7O1FBaEVHLG9DQUErQjs7Ozs7UUFFL0Isb0NBQXNCOzs7OztRQUV0Qiw0Q0FBOEI7Ozs7OztJQThEbEM7Ozs7O1FBQStDLHlDQUFtQjtRQUFsRTtZQUFBLHFFQW9EQztZQW5EVyxXQUFLLEdBQVksS0FBSyxDQUFDOztRQW1EbkMsQ0FBQzs7Ozs7UUE3Q1UsMkJBQUc7Ozs7UUFBVixVQUFXLEtBQVE7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDOzs7O1FBRU0sMkJBQUc7OztRQUFWO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7Ozs7UUFFTSwrQkFBTzs7O1FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7OztRQUVNLHdDQUFnQjs7O1FBQXZCO1lBQ0ksaUJBQU0sZ0JBQWdCLFdBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDOzs7Ozs7UUFNTSx3Q0FBZ0I7Ozs7O1FBQXZCLFVBQXdCLE1BQTJCLEVBQUUsR0FBVzs7Z0JBQ3hELE1BQU0sR0FBRyxLQUFLOzs7Z0JBR2QsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQzdDLElBQUksU0FBUyxJQUFJLElBQUksRUFBRTs7b0JBQ2YsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUN0QyxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDaEIsTUFBTSxHQUFHLElBQUksQ0FBQztpQkFDakI7YUFDSjtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7Ozs7OztRQUVNLHNDQUFjOzs7OztRQUFyQixVQUFzQixNQUEyQixFQUFFLEdBQVc7WUFDMUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0FBQyxBQXBERCxDQUErQyxtQkFBbUIsR0FvRGpFO0lBcERxQixnQ0FBYSxnQkFvRGxDLENBQUE7Ozs7OztRQW5ERyw4QkFBK0I7Ozs7O1FBRS9CLDhCQUFpQjs7Ozs7UUFFakIsc0NBQXlCOzs7Ozs7O1FBbUJ6QiwwREFBNkQ7Ozs7Ozs7O1FBRTdELGtFQUFxRTs7SUE0QnpFO1FBQXVDLDZDQUFzQjtRQUE3RDs7UUFlQSxDQUFDOzs7Ozs7UUFkYSxxQ0FBUzs7Ozs7UUFBbkIsVUFBb0IsTUFBMkI7O2dCQUN2QyxNQUFNLEdBQVksS0FBSztZQUUzQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxQztZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7Ozs7Ozs7UUFFUyxzQ0FBVTs7Ozs7O1FBQXBCLFVBQXFCLE1BQTJCLEVBQUUsS0FBYztZQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVMLHdCQUFDO0lBQUQsQ0FBQyxBQWZELENBQXVDLGFBQWEsR0FlbkQ7SUFmWSxvQ0FBaUIsb0JBZTdCLENBQUE7SUFFRDtRQUEwQyxnREFBOEI7UUFBeEU7O1FBdUJBLENBQUM7Ozs7OztRQXRCYSx3Q0FBUzs7Ozs7UUFBbkIsVUFBb0IsTUFBMkI7O2dCQUN2QyxNQUFNLEdBQW9CLElBQUk7WUFFbEMsNEJBQTRCO1lBQzVCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN2QyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzFDO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7Ozs7OztRQUVTLHlDQUFVOzs7Ozs7UUFBcEIsVUFBcUIsTUFBMkIsRUFBRSxLQUFzQjtZQUNwRSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVMLDJCQUFDO0lBQUQsQ0FBQyxBQXZCRCxDQUEwQyxhQUFhLEdBdUJ0RDtJQXZCWSx1Q0FBb0IsdUJBdUJoQyxDQUFBO0lBRUQ7UUFBd0MsOENBQXFCO1FBQTdEOztRQWVBLENBQUM7Ozs7OztRQWRhLHNDQUFTOzs7OztRQUFuQixVQUFvQixNQUEyQjs7Z0JBQ3ZDLE1BQU0sR0FBRyxHQUFHO1lBRWhCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEM7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7Ozs7O1FBRVMsdUNBQVU7Ozs7OztRQUFwQixVQUFxQixNQUEyQixFQUFFLEtBQWE7WUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVMLHlCQUFDO0lBQUQsQ0FBQyxBQWZELENBQXdDLGFBQWEsR0FlcEQ7SUFmWSxxQ0FBa0IscUJBZTlCLENBQUE7SUFFRDtRQWFJLDJCQUFZLFNBQWlCLEVBQUUsT0FBdUI7WUFBdkIsd0JBQUEsRUFBQSxjQUF1QjtZQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDO1FBWEQsc0JBQVcsd0NBQVM7Ozs7WUFBcEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsc0NBQU87Ozs7WUFBbEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBTUwsd0JBQUM7SUFBRCxDQUFDLEFBakJELElBaUJDO0lBakJZLG9DQUFpQixvQkFpQjdCLENBQUE7Ozs7OztRQWhCRyxzQ0FBNEI7Ozs7O1FBRTVCLG9DQUEyQjs7Ozs7SUFnQi9COzs7O1FBQStDLGtEQUFpQjtRQTBCNUQsZ0NBQVksU0FBaUIsRUFBRSxRQUFrQixFQUFFLGFBQXVCLEVBQUUsT0FBdUI7WUFBcEUseUJBQUEsRUFBQSxlQUFrQjtZQUFFLDhCQUFBLEVBQUEsb0JBQXVCO1lBQUUsd0JBQUEsRUFBQSxjQUF1QjtZQUFuRyxZQUNJLGtCQUFNLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FTNUI7WUFsQ1MsdUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBRTFCLDRCQUFzQixHQUFHLEtBQUssQ0FBQztZQXdCckMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUNsQixLQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzthQUM1QjtZQUNELElBQUksYUFBYSxFQUFFO2dCQUNmLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO2FBQ3RDOztRQUNMLENBQUM7UUExQkQsc0JBQVcscURBQWlCOzs7O1lBQTVCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsMERBQXNCOzs7O1lBQWpDO2dCQUNJLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO1lBQ3ZDLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsNENBQVE7Ozs7WUFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsaURBQWE7Ozs7WUFBeEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzlCLENBQUM7OztXQUFBO1FBYUwsNkJBQUM7SUFBRCxDQUFDLEFBckNELENBQStDLGlCQUFpQixHQXFDL0Q7SUFyQ1kseUNBQXNCLHlCQXFDbEMsQ0FBQTs7Ozs7O1FBbkNHLG1EQUFvQzs7Ozs7UUFFcEMsd0RBQXlDOzs7OztRQUV6QywwQ0FBc0I7Ozs7O1FBRXRCLCtDQUEyQjs7SUErQi9CLElBQVksYUFNWDtJQU5ELFdBQVksYUFBYTtRQUNyQixtREFBSyxDQUFBO1FBQ0wscURBQU0sQ0FBQTtRQUNOLHFEQUFNLENBQUE7UUFDTixxREFBTSxDQUFBO1FBQ04sdURBQU8sQ0FBQTtJQUNYLENBQUMsRUFOVyxhQUFhLEdBQWIsZ0NBQWEsS0FBYixnQ0FBYSxRQU14QjtJQUVELElBQUssWUFTSjtJQVRELFdBQUssWUFBWTtRQUNiLHlFQUF1QixDQUFBO1FBQ3ZCLDhEQUFrQixDQUFBO1FBQ2xCLG9FQUFxQixDQUFBO1FBQ3JCLG9FQUFxQixDQUFBO1FBRXJCLCtDQUFXLENBQUE7UUFFWCxpREFBVyxDQUFBO0lBQ2YsQ0FBQyxFQVRJLFlBQVksS0FBWixZQUFZLFFBU2hCO0lBQUEsQ0FBQzs7OztJQUVGOzs7O1FBQW9ELHVEQUF5QjtRQXdCekUscUNBQVksU0FBaUIsRUFBRSxTQUF3QixFQUFFLFNBQXFCLEVBQUUsUUFBa0IsRUFBRSxhQUF1QixFQUFFLE9BQXVCO1lBQTNGLDBCQUFBLEVBQUEsYUFBcUI7WUFBRSx5QkFBQSxFQUFBLGVBQWtCO1lBQUUsOEJBQUEsRUFBQSxvQkFBdUI7WUFBRSx3QkFBQSxFQUFBLGNBQXVCO1lBQXBKLFlBQ0ksa0JBQU0sU0FBUyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBSXJEO1lBSEcsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsS0FBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQzs7UUFDekMsQ0FBQztRQXJCRCxzQkFBVyxrREFBUzs7OztZQUFwQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyxrREFBUzs7OztZQUFwQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyw0REFBbUI7Ozs7WUFBOUI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7WUFDcEMsQ0FBQzs7Ozs7WUFFRCxVQUErQixLQUFhO2dCQUN4QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQ3JDLENBQUM7OztXQUpBO1FBYUwsa0NBQUM7SUFBRCxDQUFDLEFBL0JELENBQW9ELHNCQUFzQixHQStCekU7SUEvQlksOENBQTJCLDhCQStCdkMsQ0FBQTs7Ozs7O1FBN0JHLGdEQUFtQzs7Ozs7UUFFbkMsZ0RBQTRCOzs7OztRQUU1QiwwREFBc0M7Ozs7O0lBMkIxQzs7OztRQUEyQyw4Q0FBbUI7UUFhMUQsNEJBQTJCLCtCQUE0TCxFQUFFLDJCQUEyQyxFQUFFLHVCQUF1QztZQUFwRiw0Q0FBQSxFQUFBLGtDQUEyQztZQUFFLHdDQUFBLEVBQUEsOEJBQXVDO1lBQTdTLFlBQ0ksaUJBQU8sU0FHVjtZQUowQixxQ0FBK0IsR0FBL0IsK0JBQStCLENBQTZKO1lBWjdNLGVBQVMsR0FBYSxFQUFFLENBQUM7WUFNekIsZ0JBQVUsR0FBMEMsRUFBRSxDQUFDO1lBUTdELEtBQUksQ0FBQywyQkFBMkIsR0FBRywyQkFBMkIsQ0FBQztZQUMvRCxLQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUM7O1FBQzNELENBQUM7UUFSRCxzQkFBVywwQ0FBVTs7OztZQUFyQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQzs7O1dBQUE7Ozs7OztRQVFTLHlDQUFZOzs7OztRQUF0QixVQUF1QixFQUFrQztZQUNyRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDeEI7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO2FBQzVGO1FBQ0wsQ0FBQzs7OztRQUVNLGtDQUFLOzs7UUFBWjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNwRztZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDOzs7OztRQUVNLG1DQUFNOzs7O1FBQWIsVUFBYyxJQUFPO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbEk7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDOzs7Ozs7UUFFTSxtQ0FBTTs7Ozs7UUFBYixVQUFjLElBQU8sRUFBRSxXQUFtQjtZQUN0QyxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3hIO2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDL0M7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO2FBQy9FO1FBQ0wsQ0FBQzs7Ozs7UUFFTSxtQ0FBTTs7OztRQUFiLFVBQWMsS0FBYTtZQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDekk7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ25DO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQzthQUM5RTtRQUNMLENBQUM7Ozs7OztRQUVNLG9DQUFPOzs7OztRQUFkLFVBQWUsSUFBTyxFQUFFLEtBQWE7WUFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzFJO2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQzthQUNsRjtRQUNMLENBQUM7Ozs7O1FBRU0sc0NBQVM7Ozs7UUFBaEIsVUFBaUIsS0FBYTtZQUMxQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELHNCQUFXLHFDQUFLOzs7O1lBQWhCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDakMsQ0FBQzs7O1dBQUE7Ozs7UUFFTSxvQ0FBTzs7O1FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN0QyxDQUFDOzs7Ozs7UUFFTSw2Q0FBZ0I7Ozs7O1FBQXZCLFVBQXdCLE1BQTJCLEVBQUUsR0FBVzs7O2dCQUV4RCxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7O2dCQUN6QyxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7O2dCQUMzQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFFbEMsSUFBSSxPQUFPLEVBQUU7Z0JBRVQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFO29CQUNwQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ25CO2dCQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLEVBQUUsRUFBRSxDQUFDLEVBQUU7O3dCQUNqQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTs7NEJBQ2xCLFlBQVksR0FBaUIsS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJOzs0QkFDdEQsTUFBTSxHQUFrQixLQUFLLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSTs7NEJBRWxELFdBQVcsR0FBRyxTQUFTOzs0QkFDdkIsU0FBUyxHQUFHLENBQUM7OzRCQUNiLFFBQVEsU0FBRzs7NEJBQ1gsU0FBUyxTQUFHO3dCQUVoQixJQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFOzRCQUM1QyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDNUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3lCQUM3Qzt3QkFDRCxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFOzRCQUM1QyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDdkMsT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3lCQUM3Qzs2QkFDSTs0QkFDRCxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDdkMsT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3lCQUM3Qzt3QkFDRCxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFOzRCQUN6QyxRQUFRLEdBQUcsbUJBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFBLENBQUM7NEJBQ2xELE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzt5QkFDN0M7d0JBQ0QsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLGdCQUFnQixFQUFFOzRCQUM5QyxTQUFTLEdBQUcsbUJBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFBLENBQUM7NEJBQ25ELE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzt5QkFDN0M7d0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsK0JBQStCLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztxQkFFNUk7eUJBQ0k7d0JBQ0QsT0FBTyxHQUFHLEtBQUssQ0FBQztxQkFDbkI7aUJBQ0o7YUFDSjtZQUVELE9BQU8sT0FBTyxDQUFDO1FBRW5CLENBQUM7Ozs7OztRQUVNLDJDQUFjOzs7OztRQUFyQixVQUFzQixNQUEyQixFQUFFLEdBQVc7WUFBOUQsaUJBbUNDO1lBbENHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRTs7b0JBRW5CLFlBQVksR0FDWixDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO29CQUMxRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztvQkFDckUsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLElBQUksS0FBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7b0JBQy9HLENBQUMsS0FBSSxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUV4RixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDO2dCQUVyRCxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsY0FBYyxFQUFFO29CQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzlDO2dCQUVELElBQUksWUFBWSxHQUFHLFlBQVksQ0FBQyxjQUFjLEVBQUU7b0JBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDM0M7cUJBQ0k7b0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMxQztnQkFFRCxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFO29CQUN6QyxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDckQ7Z0JBRUQsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLGdCQUFnQixFQUFFO29CQUM5QyxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDMUQ7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7Ozs7UUFFTSxzQ0FBUzs7O1FBQWhCO1lBQUEsaUJBK0RDO1lBOURHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBUztnQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLFFBQVEsU0FBUyxDQUFDLFNBQVMsRUFBRTt3QkFDekIsS0FBSyxhQUFhLENBQUMsS0FBSzs0QkFDcEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzRCQUMxQixTQUFTLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQ25DLE1BQU07d0JBQ1YsS0FBSyxhQUFhLENBQUMsTUFBTTs0QkFDckIsSUFBSSxTQUFTLENBQUMsaUJBQWlCLEVBQUU7Z0NBQzdCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDeEMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs2QkFDN0Q7aUNBQU07Z0NBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDOzZCQUN2Rjs0QkFDRCxNQUFNO3dCQUNWLEtBQUssYUFBYSxDQUFDLE1BQU07NEJBQ3JCLElBQUksU0FBUyxDQUFDLGlCQUFpQixFQUFFO2dDQUM3QixJQUFJLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0NBQzdDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDbEUsU0FBUyxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7aUNBQ3ZEO3FDQUNJO29DQUNELEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDeEMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQ0FDN0Q7NkJBQ0o7aUNBQU07Z0NBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDOzZCQUN2Rjs0QkFDRCxNQUFNO3dCQUNWLEtBQUssYUFBYSxDQUFDLE1BQU07NEJBQ3JCLElBQUksU0FBUyxDQUFDLHNCQUFzQixFQUFFO2dDQUNsQyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSx1RUFBdUU7b0NBQ3RILEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0NBQzlDLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO2lDQUN2RDtxQ0FDSTtvQ0FDRCxTQUFTLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0NBQ25DLHNHQUFzRztpQ0FDekc7NkJBQ0o7aUNBQU07Z0NBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDOzZCQUM1Rjs0QkFDRCxNQUFNO3dCQUNWLEtBQUssYUFBYSxDQUFDLE9BQU87NEJBQ3RCLElBQUksU0FBUyxDQUFDLGlCQUFpQixFQUFFO2dDQUM3QixJQUFJLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0NBQzdDLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7b0NBQ3pELFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO2lDQUN2RDtxQ0FDSTtvQ0FDRCxTQUFTLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0NBQ25DLHVHQUF1RztpQ0FDMUc7NkJBQ0o7aUNBQU07Z0NBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDOzZCQUN4Rjs0QkFDRCxNQUFNO3dCQUNWOzRCQUNJLE1BQU07cUJBQ2I7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7Ozs7UUFFTSw2Q0FBZ0I7OztRQUF2QjtZQUNJLGlCQUFNLGdCQUFnQixXQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFTCx5QkFBQztJQUFELENBQUMsQUE3UEQsQ0FBMkMsbUJBQW1CLEdBNlA3RDtJQTdQWSxxQ0FBa0IscUJBNlA5QixDQUFBOzs7Ozs7UUE1UEcsdUNBQW1DOzs7OztRQUVuQyx5REFBK0M7Ozs7O1FBRS9DLHFEQUEyQzs7Ozs7UUFFM0Msd0NBQWlFOzs7OztRQU05Qyw2REFBb007O0lBbVAzTjtRQUFBOzs7O1lBR2MsaUJBQVksR0FBMkIsRUFBRSxDQUFDO1FBNkV4RCxDQUFDO1FBM0VHO1lBQ0k7Ozs7Ozs7UUFDTSxnREFBVzs7Ozs7O1FBQXJCLFVBQXNCLFFBQXlCO1lBQzNDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7O1lBRUk7Ozs7OztRQUNHLHFEQUFnQjs7Ozs7UUFBdkI7WUFDSSxLQUFLLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUNwRDtRQUNMLENBQUM7UUFFRDs7WUFFSTs7Ozs7O1FBQ0csbURBQWM7Ozs7O1FBQXJCO1lBQ0ksS0FBSyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ2xEO1FBQ0wsQ0FBQztRQUVEOzs7WUFHSTs7Ozs7Ozs7UUFDRyxpREFBWTs7Ozs7OztRQUFuQixVQUFvQixLQUErQjtZQUMvQyxLQUFLLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7O29CQUNsQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7Z0JBQzNDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNuQixPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNwQjthQUNKO1FBQ0wsQ0FBQztRQUVEOztZQUVJOzs7Ozs7Ozs7UUFDRyxpRUFBNEI7Ozs7Ozs7O1FBQW5DLFVBQW9DLE9BQXdCLEVBQUUsV0FBZ0MsRUFBRSxRQUFzQjtRQUN0SCxDQUFDO1FBRUQ7WUFDSTs7Ozs7Ozs7UUFDRyx5REFBb0I7Ozs7Ozs7UUFBM0IsVUFBNEIsV0FBZ0MsRUFBRSxTQUFpQixFQUFFLFFBQXNCO1lBQXZHLGlCQW9CQzs7Z0JBbkJPLGFBQWEsR0FBMkIsRUFBRTtZQUU5QyxLQUFLLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7O29CQUNsQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7Z0JBQzNDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNuQixhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMvQjthQUNKO1lBRUQsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDMUIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFckQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87b0JBQzFCLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUVsRSxPQUFPLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztRQUVEOztZQUVJOzs7Ozs7Ozs7UUFDRywyREFBc0I7Ozs7Ozs7O1FBQTdCLFVBQThCLFdBQWdDLEVBQUUsUUFBc0IsRUFBRSxLQUErQjtZQUNuSCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0wsaUNBQUM7SUFBRCxDQUFDLEFBaEZELElBZ0ZDO0lBaEZZLDZDQUEwQiw2QkFnRnRDLENBQUE7Ozs7Ozs7UUE3RUcsa0RBQW9EOzs7Ozs7SUFpRnhEOzs7OztRQUE0Rix3REFBMEI7UUFJbEgsc0NBQVksYUFBcUIsRUFBVSxXQUF1QztZQUFsRixZQUNJLGlCQUFPLFNBS1Y7WUFOMEMsaUJBQVcsR0FBWCxXQUFXLENBQTRCO1lBRTlFLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUV0QyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsQ0FBQztZQUN2RCxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7UUFDeEMsQ0FBQztRQUVEO1lBQ0k7Ozs7O1FBQ0csdURBQWdCOzs7O1FBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7UUFFRDtZQUNJOzs7Ozs7OztRQUNHLG1FQUE0Qjs7Ozs7OztRQUFuQyxVQUFvQyxPQUF3QixFQUFFLFdBQWdDLEVBQUUsUUFBc0I7UUFDdEgsQ0FBQztRQUVEOztZQUVJOzs7Ozs7Ozs7UUFDRyw2REFBc0I7Ozs7Ozs7O1FBQTdCLFVBQThCLFdBQWdDLEVBQUUsUUFBc0IsRUFBRSxLQUErQjs7Z0JBQy9HLE9BQU8sR0FBRyxLQUFLOztnQkFDZixhQUFhLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxFQUFFLEVBQUUsQ0FBQyxFQUFFOzt3QkFDaEMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDckMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUMxRTthQUNKO1lBRUQsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUNMLG1DQUFDO0lBQUQsQ0FBQyxBQXRDRCxDQUE0RiwwQkFBMEIsR0FzQ3JIO0lBdENZLCtDQUE0QiwrQkFzQ3hDLENBQUE7Ozs7OztRQXBDRyxvREFBdUM7Ozs7O1FBRUosbURBQStDOzs7Ozs7O0lBdUN0Rjs7Ozs7O1FBQTJGLHVEQUEwQjtRQU1qSCxxQ0FBWSxhQUFxQixFQUFVLFdBQXVDO1lBQWxGLFlBQ0ksaUJBQU8sU0FLVjtZQU4wQyxpQkFBVyxHQUFYLFdBQVcsQ0FBNEI7Ozs7WUFGMUUsa0JBQVksR0FBdUMsRUFBRSxDQUFDO1lBSTFELEtBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUUxQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsQ0FBQztZQUN2RCxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7UUFDNUMsQ0FBQztRQUVEO1lBQ0k7Ozs7O1FBQ0cscURBQWU7Ozs7UUFBdEI7WUFDSSxPQUFPLG1CQUFrQixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFBLENBQUM7UUFDbkQsQ0FBQztRQUVEOztZQUVJOzs7Ozs7O1FBQ0csZ0RBQVU7Ozs7OztRQUFqQixVQUFrQixNQUFjOztnQkFDeEIsTUFBTSxHQUFxQixJQUFJO1lBRW5DLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUNuQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QjtpQkFDSTtnQkFDRCxNQUFNLEdBQUcsbUJBQWtCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUEsQ0FBQzthQUN4RDtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRDtZQUNJOzs7Ozs7UUFDRyxxREFBZTs7Ozs7UUFBdEIsVUFBdUIsTUFBYztZQUNqQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDO1FBQzdDLENBQUM7UUFFRDs7WUFFSTs7Ozs7Ozs7O1FBQ0csa0VBQTRCOzs7Ozs7OztRQUFuQyxVQUFvQyxPQUF3QixFQUFFLFdBQWdDLEVBQUUsUUFBc0I7O2dCQUM5RyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU07WUFDM0Isc0RBQXNEO1lBQ3RELFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RixDQUFDO1FBRUQ7OztZQUdJOzs7Ozs7Ozs7O1FBQ0csNERBQXNCOzs7Ozs7Ozs7UUFBN0IsVUFBOEIsV0FBZ0MsRUFBRSxRQUFzQixFQUFFLEtBQStCOztnQkFDL0csT0FBTyxHQUFHLEtBQUs7O2dCQUVmLGFBQWEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsRUFBRSxDQUFDLEVBQUU7O3dCQUNoQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7b0JBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTt3QkFFM0IsSUFBSSxNQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTs0QkFDaEMsTUFBTSxHQUFHLEVBQUUsQ0FBQzt5QkFDZjs7NEJBRUcsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO3dCQUNyQyxPQUFPLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7cUJBQzFFO2lCQUNKO2FBQ0o7WUFFRCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0wsa0NBQUM7SUFBRCxDQUFDLEFBL0VELENBQTJGLDBCQUEwQixHQStFcEg7SUEvRVksOENBQTJCLDhCQStFdkMsQ0FBQTs7Ozs7OztRQTNFRyxtREFBOEQ7Ozs7O1FBRTNCLGtEQUErQzs7Ozs7Ozs7Ozs7SUFrRnRGOzs7Ozs7Ozs7O1FBeUJJOzs7O1lBSUk7UUFDSix5QkFBWSxNQUFlLEVBQUUsVUFBbUIsRUFBRSxRQUF1QjtZQXZCakUsWUFBTyxHQUF1QyxFQUFFLENBQUM7WUFFakQsVUFBSyxHQUFZLEtBQUssQ0FBQztZQUV2QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1lBb0IxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2RCxDQUFDO1FBckJELHNCQUFXLG1DQUFNOzs7O1lBQWpCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixDQUFDOzs7OztZQUVELFVBQWtCLEtBQWE7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7OztXQUpBO1FBTUQsc0JBQVcsdUNBQVU7Ozs7WUFBckI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7OztXQUFBOzs7O1FBaUJNLDBDQUFnQjs7O1FBQXZCO1lBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsS0FBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDN0M7UUFDTCxDQUFDOzs7O1FBRU0sd0NBQWM7OztRQUFyQjtZQUNJLEtBQUssSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMzQztRQUNMLENBQUM7Ozs7OztRQUVPLG1DQUFTOzs7OztRQUFqQixVQUFrQixLQUErQjtZQUM3QyxLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdEM7UUFDTCxDQUFDOzs7O1FBRU0sa0NBQVE7OztRQUFmO1lBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQzs7OztRQUVNLGlDQUFPOzs7UUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7Ozs7UUFFTSx1Q0FBYTs7Ozs7UUFBcEIsVUFBcUIsR0FBVyxFQUFFLEtBQW9CO1lBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzFCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRDs7WUFFSTs7Ozs7Ozs7O1FBQ0csc0NBQVk7Ozs7Ozs7O1FBQW5CLFVBQW9CLEtBQStCLEVBQUUsTUFBYyxFQUFFLFVBQWtCO1FBQ3ZGLENBQUM7UUFFRDtZQUNJOzs7Ozs7O1FBQ0csOENBQW9COzs7Ozs7UUFBM0IsVUFBNEIsV0FBZ0MsRUFBRSxRQUFzQjtZQUNoRixxREFBcUQ7OztnQkFFakQsWUFBWSxHQUFpRCxFQUFFO1lBRW5FLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUM3QixZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzdEO2FBQ0o7WUFFRCxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7WUFDSTs7Ozs7Ozs7UUFDRyxnREFBc0I7Ozs7Ozs7UUFBN0IsVUFBOEIsV0FBZ0MsRUFBRSxRQUFzQixFQUFFLEtBQStCOztnQkFDL0csT0FBTyxHQUFHLElBQUk7O2dCQUVkLFVBQVUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUVoRCxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxJQUFJLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRTs7d0JBQ3hDLFFBQVEsR0FBVyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtvQkFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFOzs0QkFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQyxJQUFJLEtBQUssRUFBRTs0QkFDUCxPQUFPLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQzt5QkFDM0Q7NkJBQ0k7NEJBQ0QsT0FBTyxHQUFHLEtBQUssQ0FBQzt5QkFDbkI7cUJBQ0o7eUJBQ0k7d0JBQ0QsT0FBTyxHQUFHLEtBQUssQ0FBQztxQkFDbkI7aUJBQ0o7YUFDSjtpQkFDSTtnQkFDRCxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ25CO1lBRUQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtZQUVELE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7Ozs7UUFFTSw4QkFBSTs7O1FBQVg7WUFDSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQzs7OztRQUVNLGdDQUFNOzs7UUFBYjtZQUNJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQsc0JBQVcscUNBQVE7Ozs7WUFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDOzs7V0FBQTs7Ozs7O1FBRU0sbUNBQVM7Ozs7O1FBQWhCLFVBQWlCLEdBQVcsRUFBRSxNQUEyQjtZQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzFELENBQUM7Ozs7Ozs7UUFFTSxvQ0FBVTs7Ozs7O1FBQWpCLFVBQWtCLEdBQVcsRUFBRSxNQUEyQixFQUFFLEtBQVU7WUFDbEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBekpELElBeUpDO0lBekpxQixrQ0FBZSxrQkF5SnBDLENBQUE7Ozs7OztRQXhKRyxpQ0FBdUI7Ozs7O1FBRXZCLHFDQUEyQjs7Ozs7UUFFM0IsbUNBQStCOzs7OztRQUUvQixrQ0FBeUQ7Ozs7O1FBRXpELGdDQUErQjs7Ozs7UUFFL0Isb0NBQThCOzs7Ozs7UUEyQjlCLDREQUFrQzs7SUFxSHRDO1FBYUksa0JBQVksUUFBc0I7WUFSMUIsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1lBRXBDLG9CQUFlLEdBQTBDLEVBQUUsQ0FBQztZQU9oRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBTkQsc0JBQVcsMkJBQUs7Ozs7O1lBQWhCLFVBQWlCLEtBQXlCO2dCQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDOzs7V0FBQTtRQU1EOztZQUVJOzs7Ozs7UUFDRyw2QkFBVTs7Ozs7UUFBakI7WUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDckMsQ0FBQzs7OztRQUVNLHlCQUFNOzs7UUFBYjtZQUNJLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87Z0JBQ3pDLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFRDs7WUFFSTs7Ozs7OztRQUNHLHFDQUFrQjs7Ozs7O1FBQXpCLFVBQTBCLFVBQTBDOztnQkFDMUQsYUFBYSxHQUFHLE1BQU07O2dCQUV4QixNQUFNLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7O2dCQUN2QyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7O2dCQUMzQixHQUFHLEdBQUcsYUFBYSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDN0QsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQzFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQztRQUVEOztZQUVJOzs7Ozs7UUFDRyxxQ0FBa0I7Ozs7O1FBQXpCO1lBQUEsaUJBS0M7O2dCQUpPLGVBQWUsR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDbkQsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBQ3hCLEtBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0csQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDOzs7OztRQUVPLHdDQUFxQjs7OztRQUE3Qjs7Z0JBQ1EsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjO1lBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7Ozs7O1FBRU8seUNBQXNCOzs7O1FBQTlCOztnQkFDUSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWU7WUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7WUFDMUIsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVEO1lBQ0k7Ozs7O1FBQ0csMkJBQVE7Ozs7UUFBZjtZQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDOzs7OztRQUVNLGtDQUFlOzs7O1FBQXRCLFVBQXVCLE9BQTRDO1lBQy9ELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7Ozs7O1FBRU0seUNBQXNCOzs7O1FBQTdCLFVBQThCLElBQWdCO1lBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FBQyxBQW5GRCxJQW1GQztJQW5GWSwyQkFBUSxXQW1GcEIsQ0FBQTs7Ozs7O1FBbEZHLHlCQUEwQzs7Ozs7UUFFMUMsNEJBQWlDOzs7OztRQUVqQyxrQ0FBNEM7Ozs7O1FBRTVDLG1DQUFvRTs7SUE4RXhFO1FBQXdDLDhDQUF3QjtRQU01RCw0QkFBbUIsUUFBa0IsRUFBRSxVQUEwQztZQUFqRixZQUNJLGlCQUFPLFNBR1Y7WUFGRyxLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7UUFDakMsQ0FBQzs7OztRQUVNLHVDQUFVOzs7UUFBakI7WUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLENBQUM7Ozs7UUFFTSxtQ0FBTTs7O1FBQWI7WUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXZCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUN0QztRQUNMLENBQUM7Ozs7UUFFTSxxQ0FBUTs7O1FBQWY7WUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLENBQUM7Ozs7O1FBRU0sNENBQWU7Ozs7UUFBdEIsVUFBdUIsT0FBNEM7WUFDL0QsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxhQUFhLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUU7Z0JBQ3pKLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFDO1FBQ0wsQ0FBQzs7Ozs7UUFFTSxtREFBc0I7Ozs7UUFBN0IsVUFBOEIsSUFBZ0I7WUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUwseUJBQUM7SUFBRCxDQUFDLEFBdkNELENBQXdDLGFBQWEsQ0FBQyxVQUFVLEdBdUMvRDtJQXZDWSxxQ0FBa0IscUJBdUM5QixDQUFBOzs7Ozs7UUFyQ0csc0NBQTZCOzs7OztRQUU3Qix3Q0FBbUQ7O0FBcUMzRCxDQUFDLEVBNStDYSxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBNCtDL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gTW9kZWxTdGFnZSDCqSAyMDE4IFBsYW5zeXN0ZW1lIEdtYkgsIEhhbWJ1cmcsIEdlcm1hbnkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQgeyBwc2dlb21ldHJ5IH0gZnJvbSAnLi9wcy1nZW9tZXRyeSc7XHJcbmltcG9ydCB7IG1vZGVsc3RhZ2V3ZWIgfSBmcm9tICcuL214LWNvbW1vbic7XHJcblxyXG5leHBvcnQgbW9kdWxlIG1vZGVsc3RhZ2VhcHBzdGF0ZSB7XHJcblxyXG4gICAgLyoqIFRoZSBiYXNlIGNsYXNzIGZvciBsb2NhbCBhcHAgc3RhdGUgc3RvcmFnZS5cclxuICAgICAgKlxyXG4gICAgICAqIEFwcCBzdGF0ZSBkYXRhIGlzIG9yZ2FuaXplZCBpbiBjbHVzdGVycy4gRWFjaCBjbHVzdGVyIGhhcyBhIGRpc3RpbmN0IGRhdGEgbGF5b3V0IGNvbXBhcmFibGUgdG8gYSBzdHJ1Y3QgZGF0YSB0eXBlLlxyXG4gICAgICAqIEEgY2x1c3RlciBjYW4gc3RvcmUgYW5kIG1hbmFnZSBtdWx0aXBsZSB2YWx1ZXMgKEFwcFN0YXRlRW50cnkpLiBEZXBlbmRpbmcgb24gdGhlIG5hdHVyZSBvZiB0aGUgZGF0YSwgaXQgY2FuIGJlIGdsb2JhbFxyXG4gICAgICAqIChzaGFyZWQgYW1vbmcgYWxsIHBlZXJzKSBvciBsb2NhbCAoZWFjaCBwZWVyIGhhcyBpdHMgb3duIGNvcHkgb2YgdGhlIGNsdXN0ZXIgYW5kIGlzIGF3YXJlIG9mIHRoZSByZW1vdGUgcGVlcidzIGluc3RhbmNlcykuXHJcbiAgICAgICogQmVzaWRlcyB0aGF0LCBnbG9iYWwgYXMgd2VsbCBhcyBsb2NhbCBjbHVzdGVycyBjYW4gYmUgc2luZ2xlLWluc3RhbmNlIG9yIG11bHRpLWluc3RhbmNlLiBHbG9iYWwsIHNpbmdsZS1pbnN0YW5jZSBkYXRhIGV4aXN0c1xyXG4gICAgICAqIG9ubHkgb25jZS4gR2xvYmFsLCBtdWx0aS1pbnN0YW5jZSBkYXRhIGlzIHNoYXJlZCBhbW9uZyBhbGwgcGVlcnMsIGJ1dCBjYW4gY29uc2lzdCBvZiBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgdGhlIHNhbWUgXHJcbiAgICAgICogXCJyZWNvcmRcIi4gRWFjaCBpbnN0YW5jZSBoYXMgYSBwZWVyIElEIGFuZCBhbiBpbnN0YW5jZSBJRCBib3RoIElEIGZpZWxkcyB0b2dldGhlciBidWlsZCBhIFwiZ2xvYmFsbHlcIiB1bmlxdWUgSUQuIEZvclxyXG4gICAgICAqIGxvY2FsLCBzaW5nbGUtaW5zdGFuY2UgY2x1c3RlcnMsIGVhY2ggcGVlciBtYXkgb3IgbWF5IG5vdCBoYXZlIGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBjbHVzdGVyLCBmb3IgbG9jYWwsIG11bHRpLWluc3RhbmNlXHJcbiAgICAgICogY2x1c3RlcnMsIGVhY2ggcGVlciBtYXkgaGF2ZSB6ZXJvIG9yIG1vcmUgaW5zdGFuY2VzIG9mIHRoZSBjbHVzdGVyLCBhZ2FpbiBpZGVudGlmaWVkIGJ5IGEgY29tYmluYXRpb24gb2YgYSBwZWVyIElEIGFuZCBhblxyXG4gICAgICAqIGluc3RhbmNlIElELlxyXG4gICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlQmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBjbHVzdGVyTWFuYWdlcnM6IHsgW2tleTogc3RyaW5nXTogQXBwU3RhdGVDbHVzdGVyTWFuYWdlckJhc2UgfSA9IHt9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGxvY2FsUGVlcklEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTG9jYWxQZWVySUQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxQZWVySUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IExvY2FsUGVlcklEKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbFBlZXJJRCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldENsdXN0ZXJNYW5hZ2VyKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsdXN0ZXJNYW5hZ2Vyc1trZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEFkZHMgYSBjZXJ0YWluIGNsdXN0ZXIgdHlwZSAoZ2xvYmFsL2xvY2FsLCBzaW5nbGUvbXVsdGkpIHRvIHRoZSBhcHAgc3RhdGUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhZGRDbHVzdGVyKGtleTogc3RyaW5nLCBjbHVzdGVyOiBBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyQmFzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsdXN0ZXJNYW5hZ2Vyc1trZXldID0gY2x1c3RlcjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogU3RhcnRzIHRoZSB0cmFuc2FjdGlvbmFsIHBoYXNlIG9mIHRoZSBhcHAgc3RhdGUuIENoYW5nZXMgdG8gZW50cmllcyBhbmQgdGhlaXIgdmFsdWVzIG1heSBvbmx5IGJlIGNhcnJpZWQgb3V0XHJcbiAgICAgICAgICAqIGR1cmluZyB0aGUgdHJhbnNhY3Rpb25hbCBwaGFzZSBvZiB0aGUgYXBwIHN0YXRlLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYmVnaW5UcmFuc2FjdGlvbigpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY2x1c3Rlck1hbmFnZXJLZXkgaW4gdGhpcy5jbHVzdGVyTWFuYWdlcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3Rlck1hbmFnZXJzW2NsdXN0ZXJNYW5hZ2VyS2V5XS5iZWdpblRyYW5zYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBFbmRzIHRoZSB0cmFuc2FjdGlvbmFsIHBoYXNlIG9mIHRoZSBhcHAgc3RhdGUuIEFmdGVyd2FyZHMsIHRoZSBzeW5jaHJvbmlzYXRpb24gdGFrZXMgcGxhY2UuIFRvIGVuc3VyZSB0aGF0IGxvY2FsIHN0YXRlXHJcbiAgICAgICAgICAqIGNoYW5nZXMgYXJlbid0IG1pc3NlZCwgYW4gZXhjZXB0aW9uIGlzIHRocm93biBpZiB0aGUgc3RhdGUgaXMgbm90IHRyYW5zYWN0aW9uYWwgd2hlbiBlbnRyaWVzIG9yIHRoZWlyIHZhbHVlcyBhcmUgYmVpbmcgY2hhbmdlZC5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGVuZFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjbHVzdGVyTWFuYWdlcktleSBpbiB0aGlzLmNsdXN0ZXJNYW5hZ2Vycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbHVzdGVyTWFuYWdlcnNbY2x1c3Rlck1hbmFnZXJLZXldLmVuZFRyYW5zYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcHBsaWVzIGFwcCBzdGF0ZSBjaGFuZ2VzIHRvIHRoZSB2aWV3IHN0YXRlIG9mIHRoZSBhcHBsaWNhdGlvbi4gVGhpcyBtZXRob2QgaXMgYmVpbmcgY2FsbGVkIGFmdGVyIGFsbCBsb2NhbCBjaGFuZ2VzIGhhdmVcclxuICAgICAgICAgICogYmVlbiBjYXJyaWVkIG91dCAodGhlIFwidHJhbnNhY3Rpb25hbCBwaGFzZVwiKSBhbmQgYWZ0ZXIgdGhlIHN5bmNocm9uaXNhdGlvbiB0b29rIHBsYWNlLiBUaGVyZWZvcmUsIGFsbCBjaGFuZ2VzIGZvciB0aGUgY3VycmVudFxyXG4gICAgICAgICAgKiB1cGRhdGUgY3ljbGUgaGF2ZSBiZWVuIGNhcnJpZWQgb3V0IGFuZCB3aWxsIGJlIHJlZmxlY3RlZCBpbiB0aGUgdmlldyBzdGF0ZS4gVGhpcyBtZXRob2Qgd2lsbCBiZSB1c2VkIGluIGNsaWVudC10eXBlIGFwcGxpY2F0aW9ucyB0aGF0XHJcbiAgICAgICAgICAqIG5lZWQgdG8gbWFpbnRhaW4gYSB2aWV3IHN0YXRlLiBGb3Igc2VydmVyLXR5cGUgYXBwbGljYXRpb25zLCB3aGVyZSB0aGlzIGlzIG5vdCB0aGUgY2FzZSwgdXNlIFxccmVmIFByb2Nlc3NDaGFuZ2VzKCkgaW5zdGVhZC5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGFwcGx5Q2hhbmdlcyhzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNsdXN0ZXJNYW5hZ2VyS2V5IGluIHRoaXMuY2x1c3Rlck1hbmFnZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsdXN0ZXJNYW5hZ2Vyc1tjbHVzdGVyTWFuYWdlcktleV0uYXBwbHlDaGFuZ2VzKHNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFdyaXRlcyBhbGwgbG9jYWwgb3BlcmF0aW9ucyB0aGF0IGhhdmUgYmVlbiBjYXJyaWVkIG91dCBkdXJpbmcgdGhlIHRyYW5zYWN0aW9uYWwgcGhhc2Ugb2YgdGhpcyB1cGRhdGUgY3ljbGUgKFwiRGVsdGFcIikuIFxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2VyaWFsaXplVHJhbnNhY3Rpb24oZGVsdGFXcml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY2x1c3Rlck1hbmFnZXJLZXkgaW4gdGhpcy5jbHVzdGVyTWFuYWdlcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3Rlck1hbmFnZXJzW2NsdXN0ZXJNYW5hZ2VyS2V5XS5zZXJpYWxpemVUcmFuc2FjdGlvbihkZWx0YVdyaXRlciwgY2x1c3Rlck1hbmFnZXJLZXksIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUmV0cmlldmVzIGFsbCByZW1vdGUgb3BlcmF0aW9ucyB0aGF0IGhhdmUgYmVlbiByZWNlaXZlZCBmcm9tIHJlbW90ZSBwZWVycy5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGRlc2VyaWFsaXplVHJhbnNhY3Rpb24oZGVsdGFSZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIsIHNjZW5lOiBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKCFkZWx0YVJlYWRlci5pc0F0RW5kKCkgJiYgc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXJJRCA9IGRlbHRhUmVhZGVyLnJlYWRDbHVzdGVySUQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2x1c3RlcklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXJNYW5hZ2VyID0gdGhpcy5jbHVzdGVyTWFuYWdlcnNbY2x1c3RlcklEXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2x1c3Rlck1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IGNsdXN0ZXJNYW5hZ2VyLmRlc2VyaWFsaXplVHJhbnNhY3Rpb24oZGVsdGFSZWFkZXIsIHRoaXMsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXBwU3RhdGUgZXh0ZW5kcyBBcHBTdGF0ZUJhc2Uge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIEdldEluc3RhbmNlKCk6IEFwcFN0YXRlIHtcclxuICAgICAgICAgICAgaWYgKCFBcHBTdGF0ZS5JbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgQXBwU3RhdGUuSW5zdGFuY2UgPSBuZXcgQXBwU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQXBwU3RhdGUuSW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBCaW5hcnlXcml0ZXIge1xyXG4gICAgICAgIHByaXZhdGUgYnVmOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbHVzaCgpOiBVaW50OEFycmF5IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXQodGhpcy5idWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlQnl0ZSh2YWw6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKHZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVJbnQxNih2YWw6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKHZhbCAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDgpICYgMHhmZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVVSW50MTYodmFsOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5idWYucHVzaCh2YWwgJiAweGZmLFxyXG4gICAgICAgICAgICAgICAgKHZhbCA+PiA4KSAmIDB4ZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlSW50MzIodmFsOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5idWYucHVzaCh2YWwgJiAweGZmLFxyXG4gICAgICAgICAgICAgICAgKHZhbCA+PiA4KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDE2KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDI0KSAmIDB4ZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlSW50NjQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5idWYucHVzaCh2YWwgJiAweGZmLFxyXG4gICAgICAgICAgICAgICAgKHZhbCA+PiA4KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDE2KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDI0KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDMyKSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDQwKSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDQ4KSAmIDB4ZmYsXHJcbiAgICAgICAgICAgICAgICAodmFsID4+IDU2KSAmIDB4ZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlVGltZXN0YW1wKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVJbnQ2NCh2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlRmxvYXQzMih2YWw6IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgYnVmID0gbmV3IEFycmF5QnVmZmVyKDQpO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoMCwgdmFsLCB0cnVlKTtcclxuICAgICAgICAgICAgbGV0IGJ5dGVCdWYgPSBuZXcgSW50OEFycmF5KGJ1Zik7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmLnB1c2guYXBwbHkoYnl0ZUJ1Zik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVTdHJpbmcodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy53cml0ZUludDMyKHZhbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlQ2hhckFycmF5KHZhbCwgdmFsLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVDaGFyQXJyYXkodmFsOiBzdHJpbmcsIGFycmF5TGVuZ3RoOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgYXJyYXlMZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKGlkeCA8IHZhbC5sZW5ndGggPyB2YWwuY2hhckNvZGVBdChpZHgpIDogMHgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB3cml0ZVdpZGVDaGFyQXJyYXkodmFsOiBzdHJpbmcsIGFycmF5TGVuZ3RoOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgYXJyYXlMZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKGlkeCA8IHZhbC5sZW5ndGggPyB2YWwuY2hhckNvZGVBdChpZHgpICYgMHhmZiA6IDB4MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaWR4IDwgdmFsLmxlbmd0aCA/ICh2YWwuY2hhckNvZGVBdChpZHgpID4+IDgpICYgMHhmZiA6IDB4MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVWZWMzKHZhbDogcHNnZW9tZXRyeS5WZWM0KSB7XHJcbiAgICAgICAgICAgIGxldCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMTIpO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoMCwgdmFsLngsIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoNCwgdmFsLnksIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoOCwgdmFsLnosIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgYnl0ZUJ1ZiA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmLnB1c2guYXBwbHkoYnl0ZUJ1Zik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVWZWM0KHZhbDogcHNnZW9tZXRyeS5WZWM0KSB7XHJcbiAgICAgICAgICAgIGxldCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMTYpO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoMCwgdmFsLngsIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoNCwgdmFsLnksIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoOCwgdmFsLnosIHRydWUpO1xyXG4gICAgICAgICAgICB2aWV3LnNldEZsb2F0MzIoMTIsIHZhbC53LCB0cnVlKTtcclxuICAgICAgICAgICAgbGV0IGJ5dGVCdWYgPSBuZXcgVWludDhBcnJheShidWYpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1Zi5wdXNoKGJ5dGVCdWZbMF0sIGJ5dGVCdWZbMV0sIGJ5dGVCdWZbMl0sIGJ5dGVCdWZbM10sXHJcbiAgICAgICAgICAgICAgICBieXRlQnVmWzRdLCBieXRlQnVmWzVdLCBieXRlQnVmWzZdLCBieXRlQnVmWzddLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUJ1Zls4XSwgYnl0ZUJ1Zls5XSwgYnl0ZUJ1ZlsxMF0sIGJ5dGVCdWZbMTFdLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUJ1ZlsxMl0sIGJ5dGVCdWZbMTNdLCBieXRlQnVmWzE0XSwgYnl0ZUJ1ZlsxNV1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEJpbmFyeVJlYWRlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBidWY6IFVpbnQ4QXJyYXk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFBvczogbnVtYmVyID0gODtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBlcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEVycm9yKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQXRFbmQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3MgPj0gdGhpcy5idWYuYnl0ZUxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGJ1ZjogVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZiA9IGJ1ZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhc3N1cmVSZW1haW5pbmdCeXRlcyhjb3VudDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3MgKyBjb3VudCA8PSB0aGlzLmJ1Zi5ieXRlTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRCeXRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFOO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZFVJbnQxNigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlcygyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICogMjU2O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFOO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZFVJbnQ2NCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlcyg4KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICogMjU2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MrK10gKiA2NTUzNiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICogMTY3NzcyMTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSAqIDQyOTQ5NjcyOTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSAqIDEwOTk1MTE2Mjc3NzYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSAqIDI4MTQ3NDk3NjcxMDY1NiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICogNzIwNTc1OTQwMzc5Mjc5MzY7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYU47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkVUludDMyKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MrK10gKiAyNTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSAqIDY1NTM2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MrK10gKiAxNjc3NzIxNjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hTjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSB0aGlzLnJlYWRVSW50MzIoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlcyhsZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5yZWFkQ2hhckFycmF5KGxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZFRpbWVzdGFtcCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkVUludDY0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZENoYXJBcnJheShhcnJheUxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgaWR4ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKGlkeCA8IGFycmF5TGVuZ3RoICYmIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcyArIGlkeF0gIT0gMHgwMCAmJiAhdGhpcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBvcyA8IHRoaXMuYnVmLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MgKyBpZHgrK10pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQb3MgKz0gYXJyYXlMZW5ndGg7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZEZsb2F0MzIoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE5hTjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmID0gbmV3IEFycmF5QnVmZmVyKDQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMCwgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMSwgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMiwgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMywgdGhpcy5idWZbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB2aWV3LmdldEZsb2F0MzIoMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkVmVjMygpOiBwc2dlb21ldHJ5LlZlYzMge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDEyKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigxMik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OChpLCB0aGlzLmJ1Zlt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IHBzZ2VvbWV0cnkuVmVjMyh2aWV3LmdldEZsb2F0MzIoMCwgdHJ1ZSksIHZpZXcuZ2V0RmxvYXQzMig0LCB0cnVlKSwgdmlldy5nZXRGbG9hdDMyKDgsIHRydWUpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRWZWM0KCk6IHBzZ2VvbWV0cnkuVmVjNCB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYXNzdXJlUmVtYWluaW5nQnl0ZXMoMTYpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmID0gbmV3IEFycmF5QnVmZmVyKDE2KTtcclxuICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1Zik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQ4KGksIHRoaXMuYnVmW3RoaXMuY3VycmVudFBvcysrXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgcHNnZW9tZXRyeS5WZWM0KHZpZXcuZ2V0RmxvYXQzMigwLCB0cnVlKSwgdmlldy5nZXRGbG9hdDMyKDQsIHRydWUpLCB2aWV3LmdldEZsb2F0MzIoOCwgdHJ1ZSksIHZpZXcuZ2V0RmxvYXQzMigxMiwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBcHBTdGF0ZURlbHRhUmVhZGVyIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRlcjogQmluYXJ5UmVhZGVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGlzSW5pdGlhbGl6aW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUmVhZGVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihyZWFkZXI6IEJpbmFyeVJlYWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRlciA9IHJlYWRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBJbmRpY2F0ZXMgaWYgdGhlcmUgaXMgZGF0YSBsZWZ0IHRvIHByb2Nlc3MuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBpc0F0RW5kKCkgeyByZXR1cm4gdGhpcy5yZWFkZXIuQXRFbmQ7IH1cclxuXHJcbiAgICAgICAgLyoqIFJlYWRzIHRoZSBjbHVzdGVyIElEIGZyb20gdGhlIGRhdGEuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZWFkQ2x1c3RlcklEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRlci5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSW5kaWNhdGVzIGlmIHRoZSBtZXNzYWdlIGlzIGFuIGluaXRpYWxpemF0aW9uIG1lc3NhZ2UgcmF0aGVyIHRoYW4gYSBcIm5vcm1hbFwiIGRlbHRhIHBhY2thZ2UuIFxyXG4gICAgICAgICAgKiBUaGlzIGNhbiBiZSBldmFsdWF0ZWQgYnkgdGhlIGNsdXN0ZXIgdG8gaGFuZGxlIGluaXRpYWxpemF0aW9uIGRpZmZlcmVudCBmcm9tIHVwZGF0aW5nLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0IElzSW5pdGlhbGl6aW5nKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0luaXRpYWxpemluZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlRGVsdGFXcml0ZXIge1xyXG4gICAgICAgIHByaXZhdGUgd3JpdGVyOiBCaW5hcnlXcml0ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgV3JpdGVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy53cml0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcih3cml0ZXI6IEJpbmFyeVdyaXRlcikge1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlciA9IHdyaXRlcjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBwU3RhdGVFbnRyeSB7XHJcbiAgICAgICAgcHJpdmF0ZSBrZXk6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhcHBTdGF0ZTogQXBwU3RhdGU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdHJhbnNhY3Rpb25hbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY2x1c3RlcjogQXBwU3RhdGVDbHVzdGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEFwcFN0YXRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHBTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgQXBwU3RhdGUodmFsOiBBcHBTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcFN0YXRlID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyKGtleTogc3RyaW5nLCBjbHVzdGVyOiBBcHBTdGF0ZUNsdXN0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1c3RlciA9IGNsdXN0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgZGVzZXJpYWxpemVEZWx0YShyZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIsIGtleTogc3RyaW5nKTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IHNlcmlhbGl6ZURlbHRhKHdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwga2V5OiBzdHJpbmcpO1xyXG5cclxuICAgICAgICBwdWJsaWMgcmVjb25jaWxlKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IGlzRGlydHkoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHNldERpcnR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsdXN0ZXIuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiZWdpblRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL2Fzc2VydCghbV9pc1RyYW5zYWN0aW9uYWwpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uYWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVuZFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL2Fzc2VydChtX2lzVHJhbnNhY3Rpb25hbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25hbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzVHJhbnNhY3Rpb25hbCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb25hbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0xvY2tlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2x1c3Rlci5Jc0xvY2tlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21tb25BcHBTdGF0ZUVudHJ5IGV4dGVuZHMgQXBwU3RhdGVFbnRyeSB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGNoYW5nZWRBdDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luQ2hhbmdpbmcoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZEF0ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgdGhpcy5zZXREaXJ0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBcHBTdGF0ZVN0cmluZ1ZhbHVlIGV4dGVuZHMgQ29tbW9uQXBwU3RhdGVFbnRyeSB7XHJcbiAgICAgICAgcHJpdmF0ZSBkaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJldmlvdXNWYWx1ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgc2V0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRQcmV2aW91c1ZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2hhbmdpbmcoKSB7XHJcbiAgICAgICAgICAgIC8vYXNzZXJ0KElzVHJhbnNhY3Rpb25hbCgpKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRpcnR5ICYmICF0aGlzLmlzTG9ja2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5DaGFuZ2luZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaXNEaXJ0eSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlydHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmVnaW5UcmFuc2FjdGlvbigpIHtcclxuICAgICAgICAgICAgc3VwZXIuYmVnaW5UcmFuc2FjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZGVzZXJpYWxpemVEZWx0YShyZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGtleSB3YXMgcmVhZCBieSBjbHVzdGVyXHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VkQXQgPSByZWFkZXIuUmVhZGVyLnJlYWRUaW1lc3RhbXAoKTtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZWRBdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlZhbHVlID0gcmVhZGVyLlJlYWRlci5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldlZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVhZGVyLlJlYWRlci5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREaXJ0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2VyaWFsaXplRGVsdGEod3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlU3RyaW5nKGtleSk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVUaW1lc3RhbXAodGhpcy5jaGFuZ2VkQXQpO1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlU3RyaW5nKHRoaXMucHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVTdHJpbmcodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBwU3RhdGVWYWx1ZTxUPiBleHRlbmRzIENvbW1vbkFwcFN0YXRlRW50cnkge1xyXG4gICAgICAgIHByaXZhdGUgZGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2YWx1ZTogVDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlOiBUO1xyXG5cclxuICAgICAgICBwdWJsaWMgc2V0KHZhbHVlOiBUKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQoKTogVCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzRGlydHkoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpcnR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luVHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmJlZ2luVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRWYWx1ZShyZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIpOiBUO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgd3JpdGVWYWx1ZSh3cml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIsIHZhbHVlOiBUKTtcclxuXHJcbiAgICAgICAgcHVibGljIGRlc2VyaWFsaXplRGVsdGEocmVhZGVyOiBBcHBTdGF0ZURlbHRhUmVhZGVyLCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBrZXkgd2FzIHJlYWQgYnkgY2x1c3RlclxyXG4gICAgICAgICAgICBsZXQgY2hhbmdlZEF0ID0gcmVhZGVyLlJlYWRlci5yZWFkVGltZXN0YW1wKCk7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkQXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZWYWx1ZSA9IHRoaXMucmVhZFZhbHVlKHJlYWRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldlZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5yZWFkVmFsdWUocmVhZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXJpYWxpemVEZWx0YSh3cml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVTdHJpbmcoa2V5KTtcclxuICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZVRpbWVzdGFtcCh0aGlzLmNoYW5nZWRBdCk7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVWYWx1ZSh3cml0ZXIsIHRoaXMucHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVWYWx1ZSh3cml0ZXIsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXBwU3RhdGVCb29sVmFsdWUgZXh0ZW5kcyBBcHBTdGF0ZVZhbHVlPGJvb2xlYW4+IHtcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZFZhbHVlKHJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVhZGVyLlJlYWRlci5hc3N1cmVSZW1haW5pbmdCeXRlcygxKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVhZGVyLlJlYWRlci5yZWFkQnl0ZSgpICE9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgd3JpdGVWYWx1ZSh3cml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIsIHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVCeXRlKHZhbHVlID8gMHhmZiA6IDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlVmVjdG9yNFZhbHVlIGV4dGVuZHMgQXBwU3RhdGVWYWx1ZTxwc2dlb21ldHJ5LlZlYzQ+IHtcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZFZhbHVlKHJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlcik6IHBzZ2VvbWV0cnkuVmVjNCB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHBzZ2VvbWV0cnkuVmVjNCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvLyBzaXplb2YoZmxvYXQpICogKHgseSx6LHcpXHJcbiAgICAgICAgICAgIGlmIChyZWFkZXIuUmVhZGVyLmFzc3VyZVJlbWFpbmluZ0J5dGVzKDQgKiA0KSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IHBzZ2VvbWV0cnkuVmVjNCgpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnggPSByZWFkZXIuUmVhZGVyLnJlYWRGbG9hdDMyKCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQueSA9IHJlYWRlci5SZWFkZXIucmVhZEZsb2F0MzIoKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC56ID0gcmVhZGVyLlJlYWRlci5yZWFkRmxvYXQzMigpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LncgPSByZWFkZXIuUmVhZGVyLnJlYWRGbG9hdDMyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgd3JpdGVWYWx1ZSh3cml0ZXI6IEFwcFN0YXRlRGVsdGFXcml0ZXIsIHZhbHVlOiBwc2dlb21ldHJ5LlZlYzQpIHtcclxuICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUZsb2F0MzIodmFsdWUueCk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVGbG9hdDMyKHZhbHVlLnkpO1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlRmxvYXQzMih2YWx1ZS56KTtcclxuICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUZsb2F0MzIodmFsdWUudyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXBwU3RhdGVGbG9hdFZhbHVlIGV4dGVuZHMgQXBwU3RhdGVWYWx1ZTxudW1iZXI+IHtcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZFZhbHVlKHJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBOYU47XHJcblxyXG4gICAgICAgICAgICBpZiAocmVhZGVyLlJlYWRlci5hc3N1cmVSZW1haW5pbmdCeXRlcyg0KSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVhZGVyLlJlYWRlci5yZWFkRmxvYXQzMigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHdyaXRlVmFsdWUod3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVGbG9hdDMyKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBcHBTdGF0ZU9wZXJhdGlvbiB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGNoYW5nZWRBdDogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNMb2NhbDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBDaGFuZ2VkQXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZWRBdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXNMb2NhbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNMb2NhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNoYW5nZWRBdDogbnVtYmVyLCBpc0xvY2FsOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZWRBdCA9IGNoYW5nZWRBdDtcclxuICAgICAgICAgICAgdGhpcy5pc0xvY2FsID0gaXNMb2NhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlVmFsdWVPcGVyYXRpb248VD4gZXh0ZW5kcyBBcHBTdGF0ZU9wZXJhdGlvbiB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpc05ld1ZhbHVlRGVmaW5lZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNQcmV2aW91c1ZhbHVlRGVmaW5lZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbmV3VmFsdWU6IFQ7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBwcmV2aW91c1ZhbHVlOiBUO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IElzTmV3VmFsdWVEZWZpbmVkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc05ld1ZhbHVlRGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXNQcmV2aW91c1ZhbHVlRGVmaW5lZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNQcmV2aW91c1ZhbHVlRGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTmV3VmFsdWUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5ld1ZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBQcmV2aW91c1ZhbHVlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2aW91c1ZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoY2hhbmdlZEF0OiBudW1iZXIsIG5ld1ZhbHVlOiBUID0gbnVsbCwgcHJldmlvdXNWYWx1ZTogVCA9IG51bGwsIGlzTG9jYWw6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNoYW5nZWRBdCwgaXNMb2NhbCk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTmV3VmFsdWVEZWZpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByZXZpb3VzVmFsdWVEZWZpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHByZXZpb3VzVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGVudW0gT3BlcmF0aW9uVHlwZSB7XHJcbiAgICAgICAgQ2xlYXIsXHJcbiAgICAgICAgQXBwZW5kLFxyXG4gICAgICAgIEluc2VydCxcclxuICAgICAgICBSZW1vdmUsXHJcbiAgICAgICAgUmVwbGFjZVxyXG4gICAgfVxyXG5cclxuICAgIGVudW0gU3RvcmFnZUZsYWdzIHtcclxuICAgICAgICBIYXNQcmV2aW91c1ZhbHVlID0gMHg4MCxcclxuICAgICAgICBIYXNOZXdWYWx1ZSA9IDB4NDAsXHJcbiAgICAgICAgSGFzQ2hhbmdlZERhdGUgPSAweDIwLFxyXG4gICAgICAgIEl0ZW1JbmRleDE2Qml0ID0gMHgxMCxcclxuXHJcbiAgICAgICAgTm9uZSA9IDB4MDAsXHJcblxyXG4gICAgICAgIE1hc2sgPSAweGYwXHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb248VD4gZXh0ZW5kcyBBcHBTdGF0ZVZhbHVlT3BlcmF0aW9uPFQ+IHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG9wZXJhdGlvbjogT3BlcmF0aW9uVHlwZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGl0ZW1JbmRleDogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgcmVjb25jaWxlZEl0ZW1JbmRleDogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE9wZXJhdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlcmF0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBJdGVtSW5kZXgoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1JbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUmVjb25jaWxlZEl0ZW1JbmRleCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjb25jaWxlZEl0ZW1JbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgUmVjb25jaWxlZEl0ZW1JbmRleCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25jaWxlZEl0ZW1JbmRleCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoY2hhbmdlZEF0OiBudW1iZXIsIG9wZXJhdGlvbjogT3BlcmF0aW9uVHlwZSwgaXRlbUluZGV4OiBudW1iZXIgPSAwLCBuZXdWYWx1ZTogVCA9IG51bGwsIHByZXZpb3VzVmFsdWU6IFQgPSBudWxsLCBpc0xvY2FsOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBzdXBlcihjaGFuZ2VkQXQsIG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlLCBpc0xvY2FsKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVyYXRpb24gPSBvcGVyYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUluZGV4ID0gaXRlbUluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnJlY29uY2lsZWRJdGVtSW5kZXggPSBpdGVtSW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXBwU3RhdGVDb2xsZWN0aW9uPFQ+IGV4dGVuZHMgQ29tbW9uQXBwU3RhdGVFbnRyeSB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGNvbnRhaW5lcjogQXJyYXk8VD4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHNlcmlhbGl6ZU9wZXJhdGlvbkNoYW5nZWRBdDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHNlcmlhbGl6ZVByZXZpb3VzVmFsdWVzOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3BlcmF0aW9uczogQXJyYXk8QXBwU3RhdGVDb2xsZWN0aW9uT3BlcmF0aW9uPFQ+PiA9IFtdO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE9wZXJhdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb25UeXBlOiBuZXcgKGNoYW5nZWRBdDogbnVtYmVyLCBvcGVyYXRpb246IE9wZXJhdGlvblR5cGUsIGl0ZW1JbmRleD86IG51bWJlciwgbmV3VmFsdWU/OiBULCBwcmV2aW91c1ZhbHVlPzogVCwgaXNMb2NhbD86IGJvb2xlYW4pID0+IEFwcFN0YXRlQ29sbGVjdGlvbk9wZXJhdGlvbjxUPiwgc2VyaWFsaXplT3BlcmF0aW9uQ2hhbmdlZEF0OiBib29sZWFuID0gdHJ1ZSwgc2VyaWFsaXplUHJldmlvdXNWYWx1ZXM6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWFsaXplT3BlcmF0aW9uQ2hhbmdlZEF0ID0gc2VyaWFsaXplT3BlcmF0aW9uQ2hhbmdlZEF0O1xyXG4gICAgICAgICAgICB0aGlzLnNlcmlhbGl6ZVByZXZpb3VzVmFsdWVzID0gc2VyaWFsaXplUHJldmlvdXNWYWx1ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWRkT3BlcmF0aW9uKG9wOiBBcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb248VD4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUcmFuc2FjdGlvbmFsKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luQ2hhbmdpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub3BlcmF0aW9ucy5wdXNoKG9wKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FwcFN0YXRlIG5vdCB0cmFuc2FjdGlvbmFsIHdoaWxlIGFkZGluZyBvcGVyYXRpb24gdG8gQXBwU3RhdGVDb2xsZWN0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9ja2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkT3BlcmF0aW9uKG5ldyB0aGlzLmFwcFN0YXRlQ29sbGVjdGlvbk9wZXJhdGlvblR5cGUodGhpcy5jaGFuZ2VkQXQsIE9wZXJhdGlvblR5cGUuQ2xlYXIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5sZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFwcGVuZChpdGVtOiBUKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0xvY2tlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbihuZXcgdGhpcy5hcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb25UeXBlKHRoaXMuY2hhbmdlZEF0LCBPcGVyYXRpb25UeXBlLkFwcGVuZCwgdGhpcy5jb250YWluZXIubGVuZ3RoLCBpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnNlcnQoaXRlbTogVCwgYmVmb3JlSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoYmVmb3JlSW5kZXggPD0gdGhpcy5jb250YWluZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNMb2NrZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkT3BlcmF0aW9uKG5ldyB0aGlzLmFwcFN0YXRlQ29sbGVjdGlvbk9wZXJhdGlvblR5cGUodGhpcy5jaGFuZ2VkQXQsIE9wZXJhdGlvblR5cGUuSW5zZXJ0LCBiZWZvcmVJbmRleCwgaXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3BsaWNlKGJlZm9yZUluZGV4LCAwLCBpdGVtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZSB3aGlsZSBpbnNlcnRpbmcgaW50byBBcHBTdGF0ZUNvbGxlY3Rpb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbW92ZShpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMuY29udGFpbmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9ja2VkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbihuZXcgdGhpcy5hcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb25UeXBlKHRoaXMuY2hhbmdlZEF0LCBPcGVyYXRpb25UeXBlLlJlbW92ZSwgaW5kZXgsIG51bGwsIHRoaXMuY29udGFpbmVyW2luZGV4XSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZSB3aGlsZSByZW1vdmluZyBmcm9tIEFwcFN0YXRlQ29sbGVjdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVwbGFjZShpdGVtOiBULCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHRoaXMuY29udGFpbmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9ja2VkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbihuZXcgdGhpcy5hcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb25UeXBlKHRoaXMuY2hhbmdlZEF0LCBPcGVyYXRpb25UeXBlLlJlcGxhY2UsIGluZGV4LCBpdGVtLCB0aGlzLmNvbnRhaW5lcltpbmRleF0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyW2luZGV4XSA9IGl0ZW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2Ugd2hpbGUgcmVwbGFjaW5nIGl0ZW0gaW4gQXBwU3RhdGVDb2xsZWN0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBHZXRJdGVtQXQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXJbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBDb3VudCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0RpcnR5KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVyYXRpb25zLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZGVzZXJpYWxpemVEZWx0YShyZWFkZXI6IEFwcFN0YXRlRGVsdGFSZWFkZXIsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIGtleSB3YXMgcmVhZCBieSBjbHVzdGVyXHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VkQXQgPSByZWFkZXIuUmVhZGVyLnJlYWRUaW1lc3RhbXAoKTtcclxuICAgICAgICAgICAgbGV0IG9wZXJhdGlvbkNvdW50ID0gcmVhZGVyLlJlYWRlci5yZWFkVUludDMyKCk7XHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gIXJlYWRlci5SZWFkZXIuRXJyb3I7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25Db3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcGVyYXRpb25Db3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZsYWdzID0gcmVhZGVyLlJlYWRlci5yZWFkQnl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVhZGVyLlJlYWRlci5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RvcmFnZUZsYWdzOiBTdG9yYWdlRmxhZ3MgPSBmbGFncyAmIFN0b3JhZ2VGbGFncy5NYXNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BUeXBlOiBPcGVyYXRpb25UeXBlID0gZmxhZ3MgJiB+U3RvcmFnZUZsYWdzLk1hc2s7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BDaGFuZ2VkQXQgPSBjaGFuZ2VkQXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWU6IFQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcmV2VmFsdWU6IFQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZUZsYWdzICYgU3RvcmFnZUZsYWdzLkhhc0NoYW5nZWREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcENoYW5nZWRBdCA9IHJlYWRlci5SZWFkZXIucmVhZFRpbWVzdGFtcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHN1Y2Nlc3MgJiYgIXJlYWRlci5SZWFkZXIuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2VGbGFncyAmIFN0b3JhZ2VGbGFncy5JdGVtSW5kZXgxNkJpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUluZGV4ID0gcmVhZGVyLlJlYWRlci5yZWFkVUludDE2KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gc3VjY2VzcyAmJiAhcmVhZGVyLlJlYWRlci5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JbmRleCA9IHJlYWRlci5SZWFkZXIucmVhZFVJbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHN1Y2Nlc3MgJiYgIXJlYWRlci5SZWFkZXIuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2VGbGFncyAmIFN0b3JhZ2VGbGFncy5IYXNOZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgPSA8VD50aGlzLmNsdXN0ZXIucmVhZFZhbHVlKGtleSwgcmVhZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBzdWNjZXNzICYmICFyZWFkZXIuUmVhZGVyLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlRmxhZ3MgJiBTdG9yYWdlRmxhZ3MuSGFzUHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlZhbHVlID0gPFQ+dGhpcy5jbHVzdGVyLnJlYWRWYWx1ZShrZXksIHJlYWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gc3VjY2VzcyAmJiAhcmVhZGVyLlJlYWRlci5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zLnB1c2gobmV3IHRoaXMuYXBwU3RhdGVDb2xsZWN0aW9uT3BlcmF0aW9uVHlwZShvcENoYW5nZWRBdCwgb3BUeXBlLCBpdGVtSW5kZXgsIG5ld1ZhbHVlLCBwcmV2VmFsdWUsIGZhbHNlIC8qIElzTG9jYWwgKi8pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2VyaWFsaXplRGVsdGEod3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlU3RyaW5nKGtleSk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVUaW1lc3RhbXAodGhpcy5jaGFuZ2VkQXQpO1xyXG5cclxuICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUludDMyKHRoaXMub3BlcmF0aW9ucy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zLmZvckVhY2goKG9wKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHN0b3JhZ2VGbGFnczogU3RvcmFnZUZsYWdzID1cclxuICAgICAgICAgICAgICAgICAgICAob3AuSXRlbUluZGV4IDwgMHgxMDAwMCA/IFN0b3JhZ2VGbGFncy5JdGVtSW5kZXgxNkJpdCA6IFN0b3JhZ2VGbGFncy5Ob25lKSB8XHJcbiAgICAgICAgICAgICAgICAgICAgKG9wLklzTmV3VmFsdWVEZWZpbmVkID8gU3RvcmFnZUZsYWdzLkhhc05ld1ZhbHVlIDogU3RvcmFnZUZsYWdzLk5vbmUpIHxcclxuICAgICAgICAgICAgICAgICAgICAob3AuSXNQcmV2aW91c1ZhbHVlRGVmaW5lZCAmJiB0aGlzLnNlcmlhbGl6ZVByZXZpb3VzVmFsdWVzID8gU3RvcmFnZUZsYWdzLkhhc1ByZXZpb3VzVmFsdWUgOiBTdG9yYWdlRmxhZ3MuTm9uZSkgfFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNlcmlhbGl6ZU9wZXJhdGlvbkNoYW5nZWRBdCA/IFN0b3JhZ2VGbGFncy5IYXNDaGFuZ2VkRGF0ZSA6IFN0b3JhZ2VGbGFncy5Ob25lKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlQnl0ZShvcC5PcGVyYXRpb24gfCBzdG9yYWdlRmxhZ3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlRmxhZ3MgJiBTdG9yYWdlRmxhZ3MuSGFzQ2hhbmdlZERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlVGltZXN0YW1wKG9wLkNoYW5nZWRBdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2VGbGFncyAmIFN0b3JhZ2VGbGFncy5JdGVtSW5kZXgxNkJpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVVSW50MTYob3AuSXRlbUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVJbnQzMihvcC5JdGVtSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlRmxhZ3MgJiBTdG9yYWdlRmxhZ3MuSGFzTmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsdXN0ZXIud3JpdGVWYWx1ZShrZXksIHdyaXRlciwgb3AuTmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlRmxhZ3MgJiBTdG9yYWdlRmxhZ3MuSGFzUHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2x1c3Rlci53cml0ZVZhbHVlKGtleSwgd3JpdGVyLCBvcC5QcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVjb25jaWxlKCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZXJhdGlvbnMuZm9yRWFjaCgob3BlcmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdGlvbi5Jc0xvY2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24uT3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5DbGVhcjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5BcHBlbmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uLklzTmV3VmFsdWVEZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucHVzaChvcGVyYXRpb24uTmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbi5SZWNvbmNpbGVkSXRlbUluZGV4ID0gdGhpcy5jb250YWluZXIubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXhwZWN0ZWQgbmV3IHZhbHVlIGR1cmluZyBBcHBTdGF0ZUNvbGxlY3Rpb24uQXBwZW5kIHJlY29uY2lsaWF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBPcGVyYXRpb25UeXBlLkluc2VydDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24uSXNOZXdWYWx1ZURlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uLkl0ZW1JbmRleCA8IHRoaXMuY29udGFpbmVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zcGxpY2Uob3BlcmF0aW9uLkl0ZW1JbmRleCwgMCwgb3BlcmF0aW9uLk5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uLlJlY29uY2lsZWRJdGVtSW5kZXggPSBvcGVyYXRpb24uSXRlbUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucHVzaChvcGVyYXRpb24uTmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IHRoaXMuY29udGFpbmVyLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFeHBlY3RlZCBuZXcgdmFsdWUgZHVyaW5nIEFwcFN0YXRlQ29sbGVjdGlvbi5JbnNlcnQgcmVjb25jaWxpYXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE9wZXJhdGlvblR5cGUuUmVtb3ZlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5Jc1ByZXZpb3VzVmFsdWVEZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5JdGVtSW5kZXggPCB0aGlzLmNvbnRhaW5lci5sZW5ndGgpIHsgLy8gJiYgb3BlcmF0aW9uLlByZXZpb3VzVmFsdWUgPT0gdGhpcy5jb250YWluZXJbb3BlcmF0aW9uLkl0ZW1JbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3BsaWNlKG9wZXJhdGlvbi5JdGVtSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IG9wZXJhdGlvbi5JdGVtSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gXFx0b2RvOiBAVUI6IExvY2F0ZSBlbnRyeSBhbmQgcmVtb3ZlIGl0IGRlcGVuZGluZyBvbiBwcmV2aW91cyB2YWx1ZSBvciBmYWlsIHJlY29uY2lsZSBpZiBub3QgZm91bmQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFeHBlY3RlZCBwcmV2aW91cyB2YWx1ZSBkdXJpbmcgQXBwU3RhdGVDb2xsZWN0aW9uLlJlbW92ZSByZWNvbmNpbGlhdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5SZXBsYWNlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5Jc05ld1ZhbHVlRGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24uSXRlbUluZGV4IDwgdGhpcy5jb250YWluZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyW29wZXJhdGlvbi5JdGVtSW5kZXhdID0gb3BlcmF0aW9uLk5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IG9wZXJhdGlvbi5JdGVtSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24uUmVjb25jaWxlZEl0ZW1JbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gXFx0b2RvOiBAVUI6IExvY2F0ZSBlbnRyeSBhbmQgcmVwbGFjZSBpdCBkZXBlbmRpbmcgb24gcHJldmlvdXMgdmFsdWUgb3IgZmFpbCByZWNvbmNpbGUgaWYgbm90IGZvdW5kLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXhwZWN0ZWQgbmV3IHZhbHVlIGR1cmluZyBBcHBTdGF0ZUNvbGxlY3Rpb24uUmVwbGFjZSByZWNvbmNpbGlhdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luVHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmJlZ2luVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXJCYXNlIHtcclxuICAgICAgICAvKiogQSB2ZWN0b3IgbWFuYWdpbmcgcG9pbnRlcnMgdG8gYWxsIGluc3RhbmNlcyBvZiB0aGUgY29ycmVzcG9uZGluZyBjbHVzdGVyIHR5cGUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhbGxJbnN0YW5jZXM6IEFycmF5PEFwcFN0YXRlQ2x1c3Rlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgLyoqIEFkZHMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGNvcnJlc3BvbmRpbmcgY2x1c3RlciB0eXBlIHRvIHRoaXMuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhZGRJbnN0YW5jZShpbnN0YW5jZTogQXBwU3RhdGVDbHVzdGVyKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnJlZ2lzdGVyRW50cmllcygpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbEluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBTdGFydHMgdGhlIHRyYW5zYWN0aW9uYWwgcGhhc2UuIENoYW5nZXMgdG8gZW50cmllcyBhbmQgdGhlaXIgdmFsdWVzIG1heSBvbmx5IGJlIGNhcnJpZWQgb3V0XHJcbiAgICAgICAgICAqIGR1cmluZyB0aGUgdHJhbnNhY3Rpb25hbCBwaGFzZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGJlZ2luVHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNsdXN0ZXJLZXkgaW4gdGhpcy5hbGxJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsSW5zdGFuY2VzW2NsdXN0ZXJLZXldLmJlZ2luVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEVuZHMgdGhlIHRyYW5zYWN0aW9uYWwgcGhhc2UuIEFmdGVyd2FyZHMsIHRoZSBzeW5jaHJvbmlzYXRpb24gdGFrZXMgcGxhY2UuIFRvIGVuc3VyZSB0aGF0IGxvY2FsIHN0YXRlXHJcbiAgICAgICAgICAqIGNoYW5nZXMgYXJlbid0IG1pc3NlZCwgYW4gZXhjZXB0aW9uIGlzIHRocm93biBpZiB0aGUgc3RhdGUgaXMgbm90IHRyYW5zYWN0aW9uYWwgd2hlbiBlbnRyaWVzIG9yIHRoZWlyIHZhbHVlcyBhcmUgYmVpbmcgY2hhbmdlZC5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGVuZFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjbHVzdGVyS2V5IGluIHRoaXMuYWxsSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEluc3RhbmNlc1tjbHVzdGVyS2V5XS5lbmRUcmFuc2FjdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogQXBwbGllcyBhcHAgc3RhdGUgY2hhbmdlcyB0byB0aGUgdmlldyBzdGF0ZSBvZiB0aGUgYXBwbGljYXRpb24uIFRoaXMgbWV0aG9kIGlzIGJlaW5nIGNhbGxlZCBhZnRlciBhbGwgbG9jYWwgY2hhbmdlcyBoYXZlXHJcbiAgICAgICAgICAqIGJlZW4gY2FycmllZCBvdXQgKHRoZSBcInRyYW5zYWN0aW9uYWwgcGhhc2VcIikgYW5kIGFmdGVyIHRoZSBzeW5jaHJvbmlzYXRpb24gdG9vayBwbGFjZS4gVGhlcmVmb3JlLCBhbGwgY2hhbmdlcyBmb3IgdGhlIGN1cnJlbnRcclxuICAgICAgICAgICogdXBkYXRlIGN5Y2xlIGhhdmUgYmVlbiBjYXJyaWVkIG91dCBhbmQgd2lsbCBiZSByZWZsZWN0ZWQgaW4gdGhlIHZpZXcgc3RhdGUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhcHBseUNoYW5nZXMoc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjbHVzdGVyS2V5IGluIHRoaXMuYWxsSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2x1c3RlciA9IHRoaXMuYWxsSW5zdGFuY2VzW2NsdXN0ZXJLZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsdXN0ZXIuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1c3Rlci5hcHBseUNoYW5nZXMoc2NlbmUsIGNsdXN0ZXIuUGVlcklELCBjbHVzdGVyLkluc3RhbmNlSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLnNldERpcnR5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBTZXJpYWxpemVzIHBlZXIgSUQgYW5kL29yIGluc3RhbmNlIElEIGJhc2VkIG9uIHRoZSBuYXR1cmUgb2YgdGhlIGNvbmNyZXRlIGNsdXN0ZXIgdHlwZS4gTXVzdFxyXG4gICAgICAgICAgKiBiZSBvdmVycmlkZW4gYnkgY29uY3JldGUgc3ViY2xhc3NlcyBvZiBBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyQmFzZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNlcmlhbGl6ZUNsdXN0ZXJJbnN0YW5jZURhdGEoY2x1c3RlcjogQXBwU3RhdGVDbHVzdGVyLCBkZWx0YVdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFNlcmlhbGl6ZXMgYWxsIGNoYW5nZXMgdGhhdCBoYXZlIGJlZW4gY2FycmllZCBvdXQgb24gY2x1c3RlcnMgb2YgdGhlIGNvcnJlc3BvbmRpbmcgdHlwZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhV3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCBjbHVzdGVySUQ6IHN0cmluZywgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSkge1xyXG4gICAgICAgICAgICBsZXQgZGlydHlDbHVzdGVyczogQXJyYXk8QXBwU3RhdGVDbHVzdGVyPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgY2x1c3RlcktleSBpbiB0aGlzLmFsbEluc3RhbmNlcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXIgPSB0aGlzLmFsbEluc3RhbmNlc1tjbHVzdGVyS2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChjbHVzdGVyLmlzRGlydHkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcnR5Q2x1c3RlcnMucHVzaChjbHVzdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRpcnR5Q2x1c3RlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZGVsdGFXcml0ZXIuV3JpdGVyLndyaXRlU3RyaW5nKGNsdXN0ZXJJRCk7XHJcbiAgICAgICAgICAgICAgICBkZWx0YVdyaXRlci5Xcml0ZXIud3JpdGVVSW50MTYoZGlydHlDbHVzdGVycy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRpcnR5Q2x1c3RlcnMuZm9yRWFjaCgoY2x1c3RlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VyaWFsaXplQ2x1c3Rlckluc3RhbmNlRGF0YShjbHVzdGVyLCBkZWx0YVdyaXRlciwgYXBwU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyLnNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhV3JpdGVyLCBhcHBTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIERlc2VyaWFsaXplcyByZW1vdGUgY2hhbmdlcyB0aGF0IGhhdmUgYmVlbiBjYXJyaWVkIG91dCBvbiBjbHVzdGVycyBvZiB0aGUgY29ycmVzcG9uZGluZyB0eXBlLiBNdXN0XHJcbiAgICAgICAgICAqIGJlIG92ZXJyaWRlbiBieSBjb25jcmV0ZSBzdWJjbGFzc2VzIG9mIEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXJCYXNlLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZGVzZXJpYWxpemVUcmFuc2FjdGlvbihkZWx0YVJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlciwgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSwgc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb25jcmV0ZSBzdWJjbGFzcyBvZiBBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyQmFzZSB0aGF0IHByb3ZpZGVzIGEgc2luZ2xlLCBnbG9iYWwgaW5zdGFuY2Ugb2YgdGhlIHNwZWNpZmllZCBjbHVzdGVyIHR5cGUuXHJcbiAgICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR2xvYmFsQXBwU3RhdGVDbHVzdGVyTWFuYWdlcjxUQXBwU3RhdGVDbHVzdGVyIGV4dGVuZHMgQXBwU3RhdGVDbHVzdGVyPiBleHRlbmRzIEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXJCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbmx5SW5zdGFuY2U6IFRBcHBTdGF0ZUNsdXN0ZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNsdXN0ZXJUeXBlSUQ6IHN0cmluZywgcHJpdmF0ZSBjbHVzdGVyVHlwZTogbmV3ICgpID0+IFRBcHBTdGF0ZUNsdXN0ZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5vbmx5SW5zdGFuY2UgPSBuZXcgY2x1c3RlclR5cGUoKTtcclxuXHJcbiAgICAgICAgICAgIEFwcFN0YXRlLkdldEluc3RhbmNlKCkuYWRkQ2x1c3RlcihjbHVzdGVyVHlwZUlELCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRJbnN0YW5jZSh0aGlzLm9ubHlJbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogR2V0cyB0aGUgb25seSBpbnN0YW5jZSBvZiB0aGlzIGNsdXN0ZXIgdHlwZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldEdsb2JhbENsdXN0ZXIoKTogVEFwcFN0YXRlQ2x1c3RlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ubHlJbnN0YW5jZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcyBnbG9iYWwgY2x1c3RlcnMgZG9uJ3QgbmVlZCBhIHBlZXIgSUQgb3IgaW5zdGFuY2UgSUQgdG8gaWRlbnRpZnksIHRoaXMgaW1wbGVtZW50YXRpb24gZG9lc24ndCB3cml0ZSBhbnl0aGluZy5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNlcmlhbGl6ZUNsdXN0ZXJJbnN0YW5jZURhdGEoY2x1c3RlcjogQXBwU3RhdGVDbHVzdGVyLCBkZWx0YVdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEFzIGdsb2JhbCBjbHVzdGVycyBkb24ndCBuZWVkIGEgcGVlciBJRCBvciBpbnN0YW5jZSBJRCB0byBpZGVudGlmeSwgdGhpcyBpbXBsZW1lbnRhdGlvbiBkb2Vzbid0IHJldHJlaXZlXHJcbiAgICAgICAgICAqIGFkZGl0aW9uYWwgZGF0YSBmcm9tIHRoZSByZWFkZXIuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBkZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhUmVhZGVyOiBBcHBTdGF0ZURlbHRhUmVhZGVyLCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlLCBzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZUNvdW50ID0gZGVsdGFSZWFkZXIuUmVhZGVyLnJlYWRVSW50MTYoKTtcclxuICAgICAgICAgICAgaWYgKCFkZWx0YVJlYWRlci5SZWFkZXIuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2VDb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXIgPSB0aGlzLmdldEdsb2JhbENsdXN0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gY2x1c3Rlci5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhUmVhZGVyLCBhcHBTdGF0ZSwgc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENvbmNyZXRlIHN1YmNsYXNzIG9mIEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXJCYXNlIHRoYXQgZGlzdGluZ3Vpc2hlcyBsb2NhbCBhbmQgcmVtb3RlIGluc3RhbmNlcyBvZiB0aGUgXHJcbiAgICAgICogY29ycmVzcG9uZGluZyBjbHVzdGVyIHR5cGUgKGRlcml2ZWQgZnJvbSBBcHBTdGF0ZUNsdXN0ZXIpLiBFYWNoIHBlZXIgbWF5IGhhdmUgemVybyBvciBvbmUgaW5zdGFuY2VzIG9mIHRoZSBjbHVzdGVyIHR5cGUuXHJcbiAgICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgTG9jYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyPFRBcHBTdGF0ZUNsdXN0ZXIgZXh0ZW5kcyBBcHBTdGF0ZUNsdXN0ZXI+IGV4dGVuZHMgQXBwU3RhdGVDbHVzdGVyTWFuYWdlckJhc2Uge1xyXG5cclxuICAgICAgICAvKiogVGhlIG1hcCBvZiBjbHVzdGVyIHBlciBwZWVyLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHBlZXJDbHVzdGVyczogeyBba2V5OiBzdHJpbmddOiBBcHBTdGF0ZUNsdXN0ZXIgfSA9IHt9O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihjbHVzdGVyVHlwZUlEOiBzdHJpbmcsIHByaXZhdGUgY2x1c3RlclR5cGU6IG5ldyAoKSA9PiBUQXBwU3RhdGVDbHVzdGVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGVlckNsdXN0ZXJzWycnXSA9IG5ldyBjbHVzdGVyVHlwZSgpO1xyXG5cclxuICAgICAgICAgICAgQXBwU3RhdGUuR2V0SW5zdGFuY2UoKS5hZGRDbHVzdGVyKGNsdXN0ZXJUeXBlSUQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEluc3RhbmNlKHRoaXMucGVlckNsdXN0ZXJzWycnXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogR2V0cyB0aGUgbG9jYWwgcGVlcidzIGluc3RhbmNlIG9mIHRoaXMgY2x1c3RlciB0eXBlLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0TG9jYWxDbHVzdGVyKCk6IFRBcHBTdGF0ZUNsdXN0ZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gPFRBcHBTdGF0ZUNsdXN0ZXI+dGhpcy5hbGxJbnN0YW5jZXNbJyddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxcYnJpZWYgR2V0cyB0aGUgaW5zdGFuY2Ugb2YgdGhpcyBjbHVzdGVyIHR5cGUgdGhhdCBiZWxvbmdzIHRvIHRoZSBwZWVyIHdpdGggdGhlIHNwZWNpZmllZCBJRC4gSWYgaXQgZG9lc24ndCBleGlzdCxcclxuICAgICAgICAgICogaXQncyBjcmVhdGVkLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0Q2x1c3RlcihwZWVySUQ6IHN0cmluZyk6IFRBcHBTdGF0ZUNsdXN0ZXIge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBUQXBwU3RhdGVDbHVzdGVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb250YWluc0NsdXN0ZXIocGVlcklEKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IHRoaXMuY2x1c3RlclR5cGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVlckNsdXN0ZXJzW3BlZXJJRF0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuUGVlcklEID0gcGVlcklEO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJbnN0YW5jZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gPFRBcHBTdGF0ZUNsdXN0ZXI+dGhpcy5wZWVyQ2x1c3RlcnNbcGVlcklEXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZXRlcm1pbmVzIGlmIHRoZSBwZWVyIHdpdGggdGhlIHNwZWNpZmllZCBJRCBhbHJlYWR5IGhhcyBhbiBpbnN0YW5jZSBvZiB0aGUgY29ycmVzcG9uZGluZyBjbHVzdGVyIHR5cGUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjb250YWluc0NsdXN0ZXIocGVlcklEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVlckNsdXN0ZXJzW3BlZXJJRF0gIT0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcyBsb2NhbCBjbHVzdGVycyB3aXRoIGEgc2luZ2xlIGluc3RhbmNlIG9ubHkgbmVlZCBhIHBlZXIgSUQgdG8gaWRlbnRpZnksIHRoaXMgaW1wbGVtZW50YXRpb24gb25seSB3cml0ZXMgdGhlIHBlZXJJRC5cclxuICAgICAgICAgICogRm9yIHRoZSBsb2NhbCBwZWVyJ3MgaW5zdGFuY2UsIGFuIGVtcHR5IHBlZXIgSUQgd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgYWN0dWFsIElEIG9mIHRoZSBwZWVyLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2VyaWFsaXplQ2x1c3Rlckluc3RhbmNlRGF0YShjbHVzdGVyOiBBcHBTdGF0ZUNsdXN0ZXIsIGRlbHRhV3JpdGVyOiBBcHBTdGF0ZURlbHRhV3JpdGVyLCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlKSB7XHJcbiAgICAgICAgICAgIGxldCBwZWVySUQgPSBjbHVzdGVyLlBlZXJJRDtcclxuICAgICAgICAgICAgLy8gVXNlIGxvY2FsIHBlZXJJRCBpZiB0aGUgY2x1c3RlcidzIHBlZXIgSUQgaXMgZW1wdHkuXHJcbiAgICAgICAgICAgIGRlbHRhV3JpdGVyLldyaXRlci53cml0ZVN0cmluZyhwZWVySUQubGVuZ3RoID09IDAgPyBhcHBTdGF0ZS5Mb2NhbFBlZXJJRCA6IHBlZXJJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogQXMgbG9jYWwgY2x1c3RlcnMgd2l0aCBhIHNpbmdsZSBpbnN0YW5jZSBvbmx5IG5lZWQgYSBwZWVyIElEIHRvIGlkZW50aWZ5LCB0aGlzIGltcGxlbWVudGF0aW9uIHJldHJpZXZlcyBhIHBlZXIgSUQsXHJcbiAgICAgICAgICAqIGJ1dCBubyBpbnN0YW5jZUlEIGZyb20gdGhlIGRlbHRhLiBJZiB0aGUgcGVlcklEIGlzIGlkZW50aWNhbCB0byB0aGUgbG9jYWwgcGVlcidzIElELCBpdCBpcyByZXBsYWNlZCBieSB0aGUgaW50ZXJuYWxcclxuICAgICAgICAgICoga2V5IChlbXB0eSBzdHJpbmcpIHRoYXQgaXMgdXNlZCB0byBpZGVudGlmeSBsb2NhbCBwZWVyIGRhdGEuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBkZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhUmVhZGVyOiBBcHBTdGF0ZURlbHRhUmVhZGVyLCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlLCBzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5zdGFuY2VDb3VudCA9IGRlbHRhUmVhZGVyLlJlYWRlci5yZWFkVUludDE2KCk7XHJcbiAgICAgICAgICAgIGlmICghZGVsdGFSZWFkZXIuUmVhZGVyLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RhbmNlQ291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVySUQgPSBkZWx0YVJlYWRlci5SZWFkZXIucmVhZFN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGVsdGFSZWFkZXIuUmVhZGVyLkVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVlcklEID09IGFwcFN0YXRlLkxvY2FsUGVlcklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVySUQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsdXN0ZXIgPSB0aGlzLmdldENsdXN0ZXIocGVlcklEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IGNsdXN0ZXIuZGVzZXJpYWxpemVUcmFuc2FjdGlvbihkZWx0YVJlYWRlciwgYXBwU3RhdGUsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQXBwU3RhdGVDbHVzdGVyIGluc3RhbmNlcyBzdG9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYXBwbGljYXRpb24gc3RhdGUuIEJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXRlLCBjaGFuZ2VzXHJcblx0ICAqIHRvIHRoZSB2aWV3IHN0YXRlIGFyZSBjYXJyaWVkIG91dC4gSW4gb3JkZXIgdG8gYmUgYWJsZSB0byBzeW5jaHJvbml6ZSBhcHBsaWNhdGlvbiBzdGF0ZSwgb3BlcmF0aW9ucyBvbiB0aGUgZW50cmllcyB0aGF0XHJcblx0ICAqIGFyZSBhZ2dyZWdhdGVkIGJ5IEFwcFN0YXRlQ2x1c3RlciwgIGFyZSBzdG9yZWQgZHVyaW5nIGEgXCJ0cmFuc2FjdGlvbmFsIHBoYXNlXCIuIEltbWVkaWF0ZWx5IGFmdGVyd2FyZHMsIGFsbCBjaGFuZ2VzIGFyZVxyXG5cdCAgKiBjb2xsZWN0ZWQgYW5kIHN5bmMnZWQgd2l0aCByZW1vdGUgcGVlcnMuIFNpbWlsYXJseSwgd2hlbiByZW1vdGUgY2hhbmdlcyBhcmUgcmVjZWl2ZWQsIHRoZXkgYXJlIHByb2Nlc3NlZCBhZnRlciB0aGUgbG9jYWwgXHJcblx0ICAqIGNvbGxlY3Rpb24gdG9vayBwbGFjZSwgY2F1c2luZyBhcHAgc3RhdGUgY2hhbmdlcy4gRmluYWxseSwgYWxsIGNsdXN0ZXIncyBlbnRyeSdzIGNoYW5nZXMgYXJlIHByb2Nlc3NlZCB0byB1cGRhdGUgdGhlXHJcblx0ICAqIGFwcGxpY2F0aW9uJ3MgdmlldyBzdGF0ZS5cclxuXHQgICovXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBwU3RhdGVDbHVzdGVyIHtcclxuICAgICAgICBwcml2YXRlIHBlZXJJRDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIGluc3RhbmNlSUQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIGVudHJpZXM6IHsgW2luZGV4OiBzdHJpbmddOiBBcHBTdGF0ZUVudHJ5IH0gPSB7fTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIGxvY2tDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBQZWVySUQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBlZXJJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgUGVlcklEKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5wZWVySUQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSW5zdGFuY2VJRCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBDb25zdHJ1Y3RvclxyXG4gICAgICAgICAgKiBAcGFyYW0gcGVlcklEXHRcdFRoZSBwZWVyIElEIHRoaXMgY2x1c3RlciBpbnN0YW5jZSBiZWxvbmdzIHRvLiBJZiBpdCdzIGxlZnQgZW1wdHksIHRoZSBsb2NhbCBwZWVyJ3MgSUQgd2lsbCBiZSB1c2VkLlxyXG4gICAgICAgICAgKiBAcGFyYW0gaW5zdGFuY2VJRFx0VGhlIHBlZXItdW5pcXVlIGluc3RhbmNlIElELiBUaGlzIElEIGlzIG9ubHkgbmVjZXNzYXJ5LCBpZiBtdWx0aS1pbnN0YW5jZXMgYXJlIHVzZWQgKHBlciBwZWVyKS4gVGhpcyBkZXBlbmRzIG9uIHRoZSBBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyIHVzZWQgdG8gbWFuYWdlIGluc3RhbmNlcy5cclxuICAgICAgICAgICogQHBhcmFtIGFwcFN0YXRlXHRcdFRoZSBhcHAgc3RhdGUgY29udGFpbmVyIHRoaXMgY2x1c3RlciBiZWxvbmdzIHRvLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3RvcihwZWVySUQ/OiBzdHJpbmcsIGluc3RhbmNlSUQ/OiBzdHJpbmcsIGFwcFN0YXRlPzogQXBwU3RhdGVCYXNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVlcklEID0gcGVlcklEIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlSUQgPSBpbnN0YW5jZUlEIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmFwcFN0YXRlID0gYXBwU3RhdGUgfHwgQXBwU3RhdGUuR2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBSZWdpc3RlcnMgYWxsIGVudHJpZXMgb24gY3JlYXRpb24gb2YgYSBuZXcgY2x1c3RlciBpbnN0YW5jZS4gTXVzdCBiZSBvdmVycmlkZW4gYnkgY29uY3JldGUgY2x1c3RlcnMuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCByZWdpc3RlckVudHJpZXMoKTtcclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luVHJhbnNhY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZW50cnlJZHggaW4gdGhpcy5lbnRyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudHJpZXNbZW50cnlJZHhdLmJlZ2luVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVuZFRyYW5zYWN0aW9uKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlbnRyeUlkeCBpbiB0aGlzLmVudHJpZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW50cmllc1tlbnRyeUlkeF0uZW5kVHJhbnNhY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWNvbmNpbGUoc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlbnRyeUlkeCBpbiB0aGlzLmVudHJpZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW50cmllc1tlbnRyeUlkeF0ucmVjb25jaWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXREaXJ0eSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaXNEaXJ0eSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlydHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXJFbnRyeShrZXk6IHN0cmluZywgZW50cnk6IEFwcFN0YXRlRW50cnkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbnRyaWVzW2tleV0gPSBlbnRyeTtcclxuICAgICAgICAgICAgZW50cnkucmVnaXN0ZXIoa2V5LCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcHBseUNoYW5nZXMgaXMgYmVpbmcgY2FsbGVkIGluIGVhY2ggdXBkYXRlIGN5Y2xlIHdpdGggbG9jYWwgb3IgcmVtb3RlIGNoYW5nZXMuIENvbmNyZXRlIGNsdXN0ZXJzIHNob3VsZFxyXG4gICAgICAgICAgKiBvdmVycmlkZSBBcHBseUNoYW5nZXMgdG8gdXBkYXRlIHRoZSB2aWV3IHN0YXRlIGJhc2VkIG9uIHRoZSBhcHAgc3RhdGUgY2hhbmdlcyB0aGF0IG9jY3VyZWQuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhcHBseUNoYW5nZXMoc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCwgcGVlcklEOiBzdHJpbmcsIGluc3RhbmNlSUQ6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFdyaXRlcyBhbGwgbG9jYWwgb3BlcmF0aW9ucyB0aGF0IGhhdmUgYmVlbiBjYXJyaWVkIG91dCBkdXJpbmcgdGhlIHRyYW5zYWN0aW9uYWwgcGhhc2Ugb2YgdGhpcyB1cGRhdGUgY3ljbGUgKFwiRGVsdGFcIikuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzZXJpYWxpemVUcmFuc2FjdGlvbihkZWx0YVdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwgYXBwU3RhdGU6IEFwcFN0YXRlQmFzZSkge1xyXG4gICAgICAgICAgICAvLyBzZXRJc0luaXRpYWxpemluZyhkZWx0YVdyaXRlci5Jc0luaXRpYWxpemF0aW9uKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpcnR5RW50cmllczogQXJyYXk8eyBrZXk6IHN0cmluZywgZW50cnk6IEFwcFN0YXRlRW50cnkgfT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGlkeCBpbiB0aGlzLmVudHJpZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudHJpZXNbaWR4XS5pc0RpcnR5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXJ0eUVudHJpZXMucHVzaCh7IGtleTogaWR4LCBlbnRyeTogdGhpcy5lbnRyaWVzW2lkeF0gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlbHRhV3JpdGVyLldyaXRlci53cml0ZVVJbnQxNihkaXJ0eUVudHJpZXMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGRpcnR5RW50cmllcy5mb3JFYWNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLmVudHJ5LnNlcmlhbGl6ZURlbHRhKGRlbHRhV3JpdGVyLCBlLmtleSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFJldHJpZXZlcyBhbGwgcmVtb3RlIG9wZXJhdGlvbnMgdGhhdCBoYXZlIGJlZW4gcmVjZWl2ZWQgZnJvbSByZW1vdGUgcGVlcnMuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBkZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKGRlbHRhUmVhZGVyOiBBcHBTdGF0ZURlbHRhUmVhZGVyLCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlLCBzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBlbnRyeUNvdW50ID0gZGVsdGFSZWFkZXIuUmVhZGVyLnJlYWRVSW50MTYoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldElzSW5pdGlhbGl6aW5nKGRlbHRhUmVhZGVyLklzSW5pdGlhbGl6aW5nKCkpO1xyXG4gICAgICAgICAgICBpZiAoIWRlbHRhUmVhZGVyLlJlYWRlci5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRyeUNvdW50ICYmIHN1Y2Nlc3M7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbnRyeUtleTogc3RyaW5nID0gZGVsdGFSZWFkZXIuUmVhZGVyLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRlbHRhUmVhZGVyLlJlYWRlci5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW50cnkgPSB0aGlzLmVudHJpZXNbZW50cnlLZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBlbnRyeS5kZXNlcmlhbGl6ZURlbHRhKGRlbHRhUmVhZGVyLCBlbnRyeUtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29uY2lsZShzY2VuZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGxvY2soKSB7XHJcbiAgICAgICAgICAgICsrdGhpcy5sb2NrQ291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdW5sb2NrKCkge1xyXG4gICAgICAgICAgICAtLXRoaXMubG9ja0NvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBJc0xvY2tlZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9ja0NvdW50ID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkVmFsdWUoa2V5OiBzdHJpbmcsIHJlYWRlcjogQXBwU3RhdGVEZWx0YVJlYWRlcik6IGFueSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlYWRWYWx1ZSBub3QgaW1wbGVtZW50ZWQgZm9yICcgKyBrZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlVmFsdWUoa2V5OiBzdHJpbmcsIHdyaXRlcjogQXBwU3RhdGVEZWx0YVdyaXRlciwgdmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCd3cml0ZVZhbHVlIG5vdCBpbXBsZW1lbnRlZCBmb3IgJyArIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBEaXJlY3RvciB7XHJcbiAgICAgICAgcHJvdGVjdGVkIHNjZW5lOiBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0w7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhcHBTdGF0ZTogQXBwU3RhdGVCYXNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIHBlbmRpbmdVcGRhdGVzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHBlbmRpbmdNZXNzYWdlczogbW9kZWxzdGFnZXdlYi5OZXR3b3JrQ2hhbm5lbE1lc3NhZ2VbXSA9IFtdO1xyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IFNjZW5lKHNjZW5lOiBEaXJlY3RlZFNjZW5lV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGFwcFN0YXRlOiBBcHBTdGF0ZUJhc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBTdGF0ZSA9IGFwcFN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEluaXRpYWxpemVzIGFuIEFwcFN0YXRlIHRyYW5zYWN0aW9uLiBBbnkgY2hhbmdlcyBhcHBsaWVkIHRvIHRoZSBBcHBTdGF0ZSB3aWxsIGJlIG1vbml0b3JlZC5cclxuICAgICAgICAgICogQmVnaW5VcGRhdGUgaXMgY2FsbGVkIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyBvZiBlYWNoIHJlbmRlciBjeWNsZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGJlZ2luRnJhbWUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwU3RhdGUuYmVnaW5UcmFuc2FjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbW1pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3F1aXJlUGVuZGluZ1VwZGF0ZXMoKS5mb3JFYWNoKCh1cGRGdW5jKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRGdW5jKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFwcFN0YXRlLmVuZFRyYW5zYWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGV0ZXJtaW5lcyBhbmQgc3VibWl0cyBsb2NhbCBBcHBTdGF0ZSB0cmFuc2l0aW9ucy4gQ3JlYXRlcyBhIGxvY2FsIEFwcFN0YXRlIGRlbHRhIHRoYXQgaXMgdHJhbnNmZXJyZWQgdG8gdXBzdHJlYW0gcGVlcnMuXHJcbiAgICAgICAgICAqIFN1Ym1pdExvY2FsVXBkYXRlcyBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHNjZW5lIGhhcyBiZWVuIHJlbmRlcmVkIGFuZCBhbGwgaW50ZXJhY3Rpb25zIHdpdGggdGhlIHZpZXcgYXJlIHByb2Nlc3NlZC5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN1Ym1pdExvY2FsVXBkYXRlcyhjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgQXBwU3RhdGVEZWx0YSA9IDB4MDEwMDtcclxuXHJcbiAgICAgICAgICAgIGxldCB3cml0ZXIgPSBuZXcgQXBwU3RhdGVEZWx0YVdyaXRlcihuZXcgQmluYXJ5V3JpdGVyKCkpO1xyXG4gICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlSW50MzIoMSk7XHJcbiAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVJbnQzMihBcHBTdGF0ZURlbHRhKTsgXHJcbiAgICAgICAgICAgIHRoaXMuYXBwU3RhdGUuc2VyaWFsaXplVHJhbnNhY3Rpb24od3JpdGVyKTtcclxuICAgICAgICAgICAgbGV0IGJ1ZiA9IHdyaXRlci5Xcml0ZXIuZmx1c2goKTtcclxuICAgICAgICAgICAgbGV0IG1zZyA9IG1vZGVsc3RhZ2V3ZWIuTmV0d29ya0NoYW5uZWxNZXNzYWdlLkZyb21CdWZmZXIoYnVmKTtcclxuICAgICAgICAgICAgaWYgKG1zZy5IYXNQYXlsb2FkICYmIGNvbm5lY3Rpb24uSXNDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc2VuZChtc2cuQ29udGVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBcHBsaWVzIHJlbW90ZSBBcHBTdGF0ZSB0cmFuc2l0aW9ucyByZWNlaXZlZCBmcm9tIHVwc3RyZWFtIHBlZXJzLiBBcHBseVJlbW90ZVVwZGF0ZXMgaXMgY2FsbGVkIGFmdGVyIFxyXG4gICAgICAgICAgKiBTdWJtaXRMb2NhbFVwZGF0ZXMuIEFmdGVyIGFwcGx5aW5nIHJlbW90ZSB1cGRhdGVzLCBhbGwgQXBwU3RhdGUgdHJhbnNpdGlvbnMgZm9yIHRoaXMgcmVuZGVyIGN5Y2xlIGhhdmUgYmVlbiBhcHBsaWVkLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYXBwbHlSZW1vdGVVcGRhdGVzKCkge1xyXG4gICAgICAgICAgICBsZXQgcGVuZGluZ01lc3NhZ2VzID0gdGhpcy5hY3F1aXJlUGVuZGluZ01lc3NhZ2VzKCk7XHJcbiAgICAgICAgICAgIHBlbmRpbmdNZXNzYWdlcy5mb3JFYWNoKChtc2cpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwU3RhdGUuZGVzZXJpYWxpemVUcmFuc2FjdGlvbihuZXcgQXBwU3RhdGVEZWx0YVJlYWRlcihuZXcgQmluYXJ5UmVhZGVyKG1zZy5Db250ZW50KSksIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWNxdWlyZVBlbmRpbmdVcGRhdGVzKCk6IEFycmF5PCgpID0+IHZvaWQ+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucGVuZGluZ1VwZGF0ZXM7XHJcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1VwZGF0ZXMgPSBbXTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWNxdWlyZVBlbmRpbmdNZXNzYWdlcygpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucGVuZGluZ01lc3NhZ2VzO1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdNZXNzYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFVwZGF0ZXMgVmlld1N0YXRlIGFjY29yZGluZyB0byByZXN1bHRpbmcgQXBwU3RhdGUuIEFwcFN0YXRlIHRyYW5zaXRpb24gaXMgY29tbWl0dGVkIGJ5IGNsZWFyaW5nIEFwcFN0YXRlIGRlbHRhLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZW5kRnJhbWUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwU3RhdGUuYXBwbHlDaGFuZ2VzKHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlY2VpdmVkTWVzc2FnZShtZXNzYWdlOiBtb2RlbHN0YWdld2ViLk5ldHdvcmtDaGFubmVsTWVzc2FnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdNZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN5bmNocm9uaXplU3RhdGVVcGRhdGUoZnVuYzogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdVcGRhdGVzLnB1c2goZnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBEaXJlY3RlZFNjZW5lV2ViR0wgZXh0ZW5kcyBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZGlyZWN0b3I6IERpcmVjdG9yO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbm5lY3Rpb246IG1vZGVsc3RhZ2V3ZWIuU2VydmVyQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKGRpcmVjdG9yOiBEaXJlY3RvciwgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0b3IgPSBkaXJlY3RvcjtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiZWdpbkZyYW1lKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdG9yLmJlZ2luRnJhbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0b3IuY29tbWl0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uICYmIHRoaXMuY29ubmVjdGlvbi5Jc0Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rvci5zdWJtaXRMb2NhbFVwZGF0ZXModGhpcy5jb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0b3IuYXBwbHlSZW1vdGVVcGRhdGVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbmRGcmFtZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rvci5lbmRGcmFtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlY2VpdmVkTWVzc2FnZShtZXNzYWdlOiBtb2RlbHN0YWdld2ViLk5ldHdvcmtDaGFubmVsTWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5NZXNzYWdlVHlwZSA9PSBtb2RlbHN0YWdld2ViLkNvbW1vbk1lc3NhZ2VUeXBlcy5BcHBTdGF0ZURlbHRhIHx8IG1lc3NhZ2UuTWVzc2FnZVR5cGUgPT0gbW9kZWxzdGFnZXdlYi5Db21tb25NZXNzYWdlVHlwZXMuQXBwU3RhdGVJbml0aWFsaXphdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rvci5yZWNlaXZlZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzeW5jaHJvbml6ZVN0YXRlVXBkYXRlKGZ1bmM6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rvci5zeW5jaHJvbml6ZVN0YXRlVXBkYXRlKGZ1bmMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59Il19