/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.

import { psgeometry } from './ps-geometry';
import { modelstageweb } from './mx-common';

export module modelstageappstate {

    /** The base class for local app state storage.
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
    export class AppStateBase {
        private clusterManagers: { [key: string]: AppStateClusterManagerBase } = {};

        private localPeerID: string;

        public get LocalPeerID(): string {
            return this.localPeerID;
        }

        public set LocalPeerID(value: string) {
            this.localPeerID = value;
        }

        public getClusterManager(key: string) {
            return this.clusterManagers[key];
        }

        /** Adds a certain cluster type (global/local, single/multi) to the app state.
          */
        public addCluster(key: string, cluster: AppStateClusterManagerBase) {
            this.clusterManagers[key] = cluster;

        }

        /** Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
          * during the transactional phase of the app state.
          */
        public beginTransaction() {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].beginTransaction();
            }
        }

        /** Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
          * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
          */
        public endTransaction() {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].endTransaction();
            }
        }

        /** Applies app state changes to the view state of the application. This method is being called after all local changes have
          * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
          * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
          * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
          */
        public applyChanges(scene: modelstageweb.SceneWebGL) {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].applyChanges(scene);
            }
        }

        /** Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta"). 
          */
        public serializeTransaction(deltaWriter: AppStateDeltaWriter) {
            for (let clusterManagerKey in this.clusterManagers) {
                this.clusterManagers[clusterManagerKey].serializeTransaction(deltaWriter, clusterManagerKey, this);
            }
        }

        /** Retrieves all remote operations that have been received from remote peers.
          */
        public deserializeTransaction(deltaReader: AppStateDeltaReader, scene: modelstageweb.SceneWebGL) {
            let success = true;

            while (!deltaReader.isAtEnd() && success) {
                let clusterID = deltaReader.readClusterID();

                if (clusterID) {
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

    export class AppState extends AppStateBase {
        private static Instance = null;
        public static GetInstance(): AppState {
            if (!AppState.Instance) {
                AppState.Instance = new AppState();
            }
            return AppState.Instance;
        }
    }

    export class BinaryWriter {
        private buf: Array<number> = [];

        public flush(): Uint8Array {
            let result = new Uint8Array(this.buf.length);
            result.set(this.buf);
            return result;
        }

        public writeByte(val: number) {
            this.buf.push(val);
        }

        public writeInt16(val: number) {
            this.buf.push(val & 0xff,
                (val >> 8) & 0xff);
        }

        public writeUInt16(val: number) {
            this.buf.push(val & 0xff,
                (val >> 8) & 0xff);
        }

        public writeInt32(val: number) {
            this.buf.push(val & 0xff,
                (val >> 8) & 0xff,
                (val >> 16) & 0xff,
                (val >> 24) & 0xff);
        }

        public writeInt64(val: number) {
            this.buf.push(val & 0xff,
                (val >> 8) & 0xff,
                (val >> 16) & 0xff,
                (val >> 24) & 0xff,
                (val >> 32) & 0xff,
                (val >> 40) & 0xff,
                (val >> 48) & 0xff,
                (val >> 56) & 0xff);
        }

        public writeTimestamp(val: number) {
            this.writeInt64(val);
        }

        public writeFloat32(val: number) {
            let buf = new ArrayBuffer(4);
            let view = new DataView(buf);
            view.setFloat32(0, val, true);
            let byteBuf = new Int8Array(buf);
            this.buf.push.apply(byteBuf);
        }

        public writeString(val: string) {
            this.writeInt32(val.length);
            this.writeCharArray(val, val.length);
        }

        public writeCharArray(val: string, arrayLength: number) {
            for (let idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) : 0x00);
            }
        }

        public writeWideCharArray(val: string, arrayLength: number) {
            for (let idx = 0; idx < arrayLength; ++idx) {
                this.buf.push(idx < val.length ? val.charCodeAt(idx) & 0xff : 0x00,
                    idx < val.length ? (val.charCodeAt(idx) >> 8) & 0xff : 0x00);
            }
        }

        public writeVec3(val: psgeometry.Vec4) {
            let buf = new ArrayBuffer(12);
            let view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            let byteBuf = new Uint8Array(buf);
            this.buf.push.apply(byteBuf);
        }

        public writeVec4(val: psgeometry.Vec4) {
            let buf = new ArrayBuffer(16);
            let view = new DataView(buf);
            view.setFloat32(0, val.x, true);
            view.setFloat32(4, val.y, true);
            view.setFloat32(8, val.z, true);
            view.setFloat32(12, val.w, true);
            let byteBuf = new Uint8Array(buf);
            this.buf.push(byteBuf[0], byteBuf[1], byteBuf[2], byteBuf[3],
                byteBuf[4], byteBuf[5], byteBuf[6], byteBuf[7],
                byteBuf[8], byteBuf[9], byteBuf[10], byteBuf[11],
                byteBuf[12], byteBuf[13], byteBuf[14], byteBuf[15]
            );
        }
    }

    export class BinaryReader {
        private buf: Uint8Array;

        private currentPos: number = 8;

        private error: boolean = false;

        public get Error() {
            return this.error;
        }

        public get AtEnd() {
            return this.currentPos >= this.buf.byteLength;
        }

        constructor(buf: Uint8Array) {
            this.buf = buf;
        }

        public assureRemainingBytes(count: number): boolean {
            return this.currentPos + count <= this.buf.byteLength;
        }

        public readByte(): number {
            if (this.assureRemainingBytes(1)) {
                return this.buf[this.currentPos++];
            } else {
                this.error = true;
                return NaN;
            }
        }

        public readUInt16(): number {
            if (this.assureRemainingBytes(2)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256;
            } else {
                this.error = true;
                return NaN;
            }
        }

        public readUInt64(): number {
            if (this.assureRemainingBytes(8)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256 +
                    this.buf[this.currentPos++] * 65536 +
                    this.buf[this.currentPos++] * 16777216 +
                    this.buf[this.currentPos++] * 4294967296 +
                    this.buf[this.currentPos++] * 1099511627776 +
                    this.buf[this.currentPos++] * 281474976710656 +
                    this.buf[this.currentPos++] * 72057594037927936;
            } else {
                this.error = true;
                return NaN;
            }
        }

        public readUInt32(): number {
            if (this.assureRemainingBytes(4)) {
                return this.buf[this.currentPos++] +
                    this.buf[this.currentPos++] * 256 +
                    this.buf[this.currentPos++] * 65536 +
                    this.buf[this.currentPos++] * 16777216;
            } else {
                this.error = true;
                return NaN;
            }
        }

        public readString(): string {
            let result = null;
            let length = this.readUInt32();
            if (!this.error) {
                if (this.assureRemainingBytes(length)) {
                    result = this.readCharArray(length);
                } else {
                    this.error = true;
                }
            }
            return result;
        }

        public readTimestamp(): number {
            return this.readUInt64();
        }

        public readCharArray(arrayLength: number): string {
            let result = [];
            let idx = 0;
            while (idx < arrayLength && this.buf[this.currentPos + idx] != 0x00 && !this.error) {
                if (this.currentPos < this.buf.byteLength) {
                    result.push(this.buf[this.currentPos + idx++]);
                } else {
                    this.error = true;
                }
            }
            this.currentPos += arrayLength;
            return String.fromCharCode.apply(null, result);
        }

        public readFloat32(): number {
            let result = NaN;

            if (this.assureRemainingBytes(4)) {
                let buf = new ArrayBuffer(4);
                let view = new DataView(buf);
                view.setUint8(0, this.buf[this.currentPos++]);
                view.setUint8(1, this.buf[this.currentPos++]);
                view.setUint8(2, this.buf[this.currentPos++]);
                view.setUint8(3, this.buf[this.currentPos++]);

                result = view.getFloat32(0, true);
            } else {
                this.error = true;
            }

            return result;
        }

        public readVec3(): psgeometry.Vec3 {
            let result = null;

            if (this.assureRemainingBytes(12)) {
                let buf = new ArrayBuffer(12);
                let view = new DataView(buf);
                for (let i = 0; i < 12; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec3(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true));
            } else {
                this.error = true;
            }

            return result;
        }

        public readVec4(): psgeometry.Vec4 {
            let result = null;

            if (this.assureRemainingBytes(16)) {
                let buf = new ArrayBuffer(16);
                let view = new DataView(buf);
                for (let i = 0; i < 16; ++i) {
                    view.setUint8(i, this.buf[this.currentPos++]);
                }
                result = new psgeometry.Vec4(view.getFloat32(0, true), view.getFloat32(4, true), view.getFloat32(8, true), view.getFloat32(12, true));
            } else {
                this.error = true;
            }

            return result;
        }
    }

    export class AppStateDeltaReader {
        private reader: BinaryReader;

        private isInitializing: boolean = false;

        public get Reader() {
            return this.reader;
        }

        constructor(reader: BinaryReader) {
            this.reader = reader;
        }

        /** Indicates if there is data left to process.
          */
        public isAtEnd() { return this.reader.AtEnd; }

        /** Reads the cluster ID from the data.
          */
        public readClusterID(): string {
            return this.reader.readString();
        }

        /** Indicates if the message is an initialization message rather than a "normal" delta package. 
          * This can be evaluated by the cluster to handle initialization different from updating.
          */
        public get IsInitializing() {
            return this.isInitializing;
        }
    }

    export class AppStateDeltaWriter {
        private writer: BinaryWriter;

        public get Writer() {
            return this.writer;
        }

        constructor(writer: BinaryWriter) {
            this.writer = writer;
        }


    }

    export abstract class AppStateEntry {
        private key: string;

        private appState: AppState;

        private transactional: boolean = false;

        protected cluster: AppStateCluster;

        public get AppState() {
            return this.appState;
        }

        public set AppState(val: AppState) {
            this.appState = val;
        }

        public register(key: string, cluster: AppStateCluster) {
            this.key = key;
            this.cluster = cluster;
        }

        public abstract deserializeDelta(reader: AppStateDeltaReader, key: string): boolean;

        public abstract serializeDelta(writer: AppStateDeltaWriter, key: string);

        public reconcile() {
        }

        public abstract isDirty();

        public setDirty() {
            this.cluster.setDirty();
        }

        public beginTransaction() {
            //assert(!m_isTransactional);
            this.transactional = true;
        }

        public endTransaction() {
            //assert(m_isTransactional);
            this.transactional = false;
        }

        public isTransactional(): boolean {
            return this.transactional;
        }

        public isLocked(): boolean {
            return this.cluster.IsLocked;
        }

    }

    export abstract class CommonAppStateEntry extends AppStateEntry {
        protected changedAt: number = 0;

        public beginChanging() {
            this.changedAt = Date.now();
            this.setDirty();
        }


    }

    export class AppStateStringValue extends CommonAppStateEntry {
        private dirty: boolean = false;

        private value: string;

        private previousValue: string;

        public set(value: string) {
            if (value != this.value) {
                this.changing();
                this.value = value;
            }
        }

        public get(): string {
            return this.value;
        }

        public getPreviousValue(): string {
            return this.previousValue;
        }

        public changing() {
            //assert(IsTransactional());
            if (!this.dirty && !this.isLocked()) {
                this.beginChanging();
                this.previousValue = this.value;
                this.dirty = true;
            }
        }

        public isDirty() {
            return this.dirty;
        }

        public beginTransaction() {
            super.beginTransaction();
            this.dirty = false;
        }

        public deserializeDelta(reader: AppStateDeltaReader, key: string) {
            let result = false;

            // key was read by cluster
            let changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
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

        public serializeDelta(writer: AppStateDeltaWriter, key: string) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            writer.Writer.writeString(this.previousValue);
            writer.Writer.writeString(this.value);
        }

    }

    export abstract class AppStateValue<T> extends CommonAppStateEntry {
        private dirty: boolean = false;

        private value: T;

        private previousValue: T;

        public set(value: T) {
            this.value = value;
        }

        public get(): T {
            return this.value;
        }

        public isDirty() {
            return this.dirty;
        }

        public beginTransaction() {
            super.beginTransaction();
            this.dirty = false;
        }

        protected abstract readValue(reader: AppStateDeltaReader): T;

        protected abstract writeValue(writer: AppStateDeltaWriter, value: T);

        public deserializeDelta(reader: AppStateDeltaReader, key: string) {
            let result = false;

            // key was read by cluster
            let changedAt = reader.Reader.readTimestamp();
            if (changedAt != null) {
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

        public serializeDelta(writer: AppStateDeltaWriter, key: string) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);
            this.writeValue(writer, this.previousValue);
            this.writeValue(writer, this.value);
        }
    }

    export class AppStateBoolValue extends AppStateValue<boolean> {
        protected readValue(reader: AppStateDeltaReader): boolean {
            let result: boolean = false;

            if (reader.Reader.assureRemainingBytes(1)) {
                result = reader.Reader.readByte() != 0;
            }

            return result;
        }

        protected writeValue(writer: AppStateDeltaWriter, value: boolean) {
            writer.Writer.writeByte(value ? 0xff : 0);
        }

    }

    export class AppStateVector4Value extends AppStateValue<psgeometry.Vec4> {
        protected readValue(reader: AppStateDeltaReader): psgeometry.Vec4 {
            let result: psgeometry.Vec4 = null;

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

        protected writeValue(writer: AppStateDeltaWriter, value: psgeometry.Vec4) {
            writer.Writer.writeFloat32(value.x);
            writer.Writer.writeFloat32(value.y);
            writer.Writer.writeFloat32(value.z);
            writer.Writer.writeFloat32(value.w);
        }

    }

    export class AppStateFloatValue extends AppStateValue<number> {
        protected readValue(reader: AppStateDeltaReader): number {
            let result = NaN;

            if (reader.Reader.assureRemainingBytes(4)) {
                result = reader.Reader.readFloat32();
            }

            return result;
        }

        protected writeValue(writer: AppStateDeltaWriter, value: number) {
            writer.Writer.writeFloat32(value);
        }

    }

    export class AppStateOperation {
        protected changedAt: number;

        protected isLocal: boolean;

        public get ChangedAt() {
            return this.changedAt;
        }

        public get IsLocal() {
            return this.isLocal;
        }

        constructor(changedAt: number, isLocal: boolean = true) {
            this.changedAt = changedAt;
            this.isLocal = isLocal;
        }
    }

    export class AppStateValueOperation<T> extends AppStateOperation {

        protected isNewValueDefined = false;

        protected isPreviousValueDefined = false;

        protected newValue: T;

        protected previousValue: T;

        public get IsNewValueDefined() {
            return this.isNewValueDefined;
        }

        public get IsPreviousValueDefined() {
            return this.isPreviousValueDefined;
        }

        public get NewValue() {
            return this.newValue;
        }

        public get PreviousValue() {
            return this.previousValue;
        }

        constructor(changedAt: number, newValue: T = null, previousValue: T = null, isLocal: boolean = true) {
            super(changedAt, isLocal);
            if (newValue != null) {
                this.isNewValueDefined = true;
                this.newValue = newValue;
            }
            if (previousValue) {
                this.isPreviousValueDefined = true;
                this.previousValue = previousValue;
            }
        }
    }

    export enum OperationType {
        Clear,
        Append,
        Insert,
        Remove,
        Replace
    }

    enum StorageFlags {
        HasPreviousValue = 0x80,
        HasNewValue = 0x40,
        HasChangedDate = 0x20,
        ItemIndex16Bit = 0x10,

        None = 0x00,

        Mask = 0xf0
    };

    export class AppStateCollectionOperation<T> extends AppStateValueOperation<T> {

        protected operation: OperationType;

        protected itemIndex: number;

        protected reconciledItemIndex: number;

        public get Operation() {
            return this.operation;
        }

        public get ItemIndex() {
            return this.itemIndex;
        }

        public get ReconciledItemIndex() {
            return this.reconciledItemIndex;
        }

        public set ReconciledItemIndex(value: number) {
            this.reconciledItemIndex = value;
        }

        constructor(changedAt: number, operation: OperationType, itemIndex: number = 0, newValue: T = null, previousValue: T = null, isLocal: boolean = true) {
            super(changedAt, newValue, previousValue, isLocal);
            this.operation = operation;
            this.itemIndex = itemIndex;
            this.reconciledItemIndex = itemIndex;
        }

    }

    export class AppStateCollection<T> extends CommonAppStateEntry {
        protected container: Array<T> = [];

        protected serializeOperationChangedAt: boolean;

        protected serializePreviousValues: boolean;

        protected operations: Array<AppStateCollectionOperation<T>> = [];

        public get Operations() {
            return this.operations;
        }

        public constructor(private appStateCollectionOperationType: new (changedAt: number, operation: OperationType, itemIndex?: number, newValue?: T, previousValue?: T, isLocal?: boolean) => AppStateCollectionOperation<T>, serializeOperationChangedAt: boolean = true, serializePreviousValues: boolean = true) {
            super();
            this.serializeOperationChangedAt = serializeOperationChangedAt;
            this.serializePreviousValues = serializePreviousValues;
        }

        protected addOperation(op: AppStateCollectionOperation<T>) {
            if (this.isTransactional()) {
                if (this.operations.length == 0) {
                    this.beginChanging();
                }
                this.operations.push(op);
            } else {
                console.error('AppState not transactional while adding operation to AppStateCollection');
            }
        }

        public clear() {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Clear));
            }
            this.container.length = 0;
        }

        public append(item: T) {
            if (!this.isLocked()) {
                this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Append, this.container.length, item));
            }
            this.container.push(item);
        }

        public insert(item: T, beforeIndex: number) {
            if (beforeIndex <= this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Insert, beforeIndex, item));
                }
                this.container.splice(beforeIndex, 0, item);
            } else {
                console.error('Index out of range while inserting into AppStateCollection');
            }
        }

        public remove(index: number) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Remove, index, null, this.container[index]));
                }
                this.container.splice(index, 1);
            } else {
                console.error('Index out of range while removing from AppStateCollection');
            }
        }

        public replace(item: T, index: number) {
            if (index < this.container.length) {
                if (!this.isLocked()) {
                    this.addOperation(new this.appStateCollectionOperationType(this.changedAt, OperationType.Replace, index, item, this.container[index]));
                }
                this.container[index] = item;
            } else {
                console.error('Index out of range while replacing item in AppStateCollection');
            }
        }

        public GetItemAt(index: number) {
            return this.container[index];
        }

        public get Count() {
            return this.container.length;
        }

        public isDirty() {
            return this.operations.length > 0;
        }

        public deserializeDelta(reader: AppStateDeltaReader, key: string) {
            // key was read by cluster
            let changedAt = reader.Reader.readTimestamp();
            let operationCount = reader.Reader.readUInt32();
            let success = !reader.Reader.Error;

            if (success) {

                if (operationCount > 0) {
                    this.setDirty();
                }

                for (let i = 0; i < operationCount; ++i) {
                    let flags = reader.Reader.readByte();
                    if (!reader.Reader.Error) {
                        let storageFlags: StorageFlags = flags & StorageFlags.Mask;
                        let opType: OperationType = flags & ~StorageFlags.Mask;

                        let opChangedAt = changedAt;
                        let itemIndex = 0;
                        let newValue: T;
                        let prevValue: T;

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
                            newValue = <T>this.cluster.readValue(key, reader);
                            success = success && !reader.Reader.Error;
                        }
                        if (storageFlags & StorageFlags.HasPreviousValue) {
                            prevValue = <T>this.cluster.readValue(key, reader);
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

        public serializeDelta(writer: AppStateDeltaWriter, key: string) {
            writer.Writer.writeString(key);
            writer.Writer.writeTimestamp(this.changedAt);

            writer.Writer.writeInt32(this.operations.length);

            this.operations.forEach((op) => {

                let storageFlags: StorageFlags =
                    (op.ItemIndex < 0x10000 ? StorageFlags.ItemIndex16Bit : StorageFlags.None) |
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

        public reconcile() {
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
                            } else {
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
                            } else {
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
                            } else {
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
                            } else {
                                console.error('Expected new value during AppStateCollection.Replace reconciliation');
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
        }

        public beginTransaction() {
            super.beginTransaction();
            this.operations.length = 0;
        }

    }


    export class AppStateClusterManagerBase {
        /** A vector managing pointers to all instances of the corresponding cluster type.
          */
        protected allInstances: Array<AppStateCluster> = [];

        /** Adds a new instance of the corresponding cluster type to this.
          */
        protected addInstance(instance: AppStateCluster) {
            instance.registerEntries();
            this.allInstances.push(instance);
        }

        /** Starts the transactional phase. Changes to entries and their values may only be carried out
          * during the transactional phase.
          */
        public beginTransaction() {
            for (let clusterKey in this.allInstances) {
                this.allInstances[clusterKey].beginTransaction();
            }
        }

        /** Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
          * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
          */
        public endTransaction() {
            for (let clusterKey in this.allInstances) {
                this.allInstances[clusterKey].endTransaction();
            }
        }

        /** Applies app state changes to the view state of the application. This method is being called after all local changes have
          * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
          * update cycle have been carried out and will be reflected in the view state.
          */
        public applyChanges(scene: modelstageweb.SceneWebGL) {
            for (let clusterKey in this.allInstances) {
                let cluster = this.allInstances[clusterKey];
                if (cluster.isDirty()) {
                    cluster.applyChanges(scene, cluster.PeerID, cluster.InstanceID);
                    scene.setDirty();
                }
            }
        }

        /** Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
          * be overriden by concrete subclasses of AppStateClusterManagerBase.
          */
        public serializeClusterInstanceData(cluster: AppStateCluster, deltaWriter: AppStateDeltaWriter, appState: AppStateBase) {
        }

        /** Serializes all changes that have been carried out on clusters of the corresponding type.
          */
        public serializeTransaction(deltaWriter: AppStateDeltaWriter, clusterID: string, appState: AppStateBase) {
            let dirtyClusters: Array<AppStateCluster> = [];

            for (let clusterKey in this.allInstances) {
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

        /** Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
          * be overriden by concrete subclasses of AppStateClusterManagerBase.
          */
        public deserializeTransaction(deltaReader: AppStateDeltaReader, appState: AppStateBase, scene: modelstageweb.SceneWebGL): boolean {
            return false;
        }
    }

    /** Concrete subclass of AppStateClusterManagerBase that provides a single, global instance of the specified cluster type.
      */
    export class GlobalAppStateClusterManager<TAppStateCluster extends AppStateCluster> extends AppStateClusterManagerBase {

        private onlyInstance: TAppStateCluster;

        constructor(clusterTypeID: string, private clusterType: new () => TAppStateCluster) {
            super();
            this.onlyInstance = new clusterType();

            AppState.GetInstance().addCluster(clusterTypeID, this);
            this.addInstance(this.onlyInstance);
        }

        /** Gets the only instance of this cluster type.
          */
        public getGlobalCluster(): TAppStateCluster {
            return this.onlyInstance;
        }

        /** As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
          */
        public serializeClusterInstanceData(cluster: AppStateCluster, deltaWriter: AppStateDeltaWriter, appState: AppStateBase) {
        }

        /** As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
          * additional data from the reader.
          */
        public deserializeTransaction(deltaReader: AppStateDeltaReader, appState: AppStateBase, scene: modelstageweb.SceneWebGL): boolean {
            let success = false;
            let instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (let i = 0; i < instanceCount; ++i) {
                    let cluster = this.getGlobalCluster();
                    success = cluster.deserializeTransaction(deltaReader, appState, scene);
                }
            }

            return success;
        }
    }

    /** Concrete subclass of AppStateClusterManagerBase that distinguishes local and remote instances of the 
      * corresponding cluster type (derived from AppStateCluster). Each peer may have zero or one instances of the cluster type.
      */
    export class LocalAppStateClusterManager<TAppStateCluster extends AppStateCluster> extends AppStateClusterManagerBase {

        /** The map of cluster per peer.
          */
        private peerClusters: { [key: string]: AppStateCluster } = {};

        constructor(clusterTypeID: string, private clusterType: new () => TAppStateCluster) {
            super();
            this.peerClusters[''] = new clusterType();

            AppState.GetInstance().addCluster(clusterTypeID, this);
            this.addInstance(this.peerClusters['']);
        }

        /** Gets the local peer's instance of this cluster type.
          */
        public getLocalCluster(): TAppStateCluster {
            return <TAppStateCluster>this.allInstances[''];
        }

        /** \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
          * it's created.
          */
        public getCluster(peerID: string): TAppStateCluster {
            let result: TAppStateCluster = null;

            if (!this.containsCluster(peerID)) {
                result = new this.clusterType();
                this.peerClusters[peerID] = result;
                result.PeerID = peerID;
                this.addInstance(result);
            }
            else {
                result = <TAppStateCluster>this.peerClusters[peerID];
            }

            return result;
        }

        /** Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
          */
        public containsCluster(peerID: string) {
            return this.peerClusters[peerID] != null;
        }

        /** As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
          * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
          */
        public serializeClusterInstanceData(cluster: AppStateCluster, deltaWriter: AppStateDeltaWriter, appState: AppStateBase) {
            let peerID = cluster.PeerID;
            // Use local peerID if the cluster's peer ID is empty.
            deltaWriter.Writer.writeString(peerID.length == 0 ? appState.LocalPeerID : peerID);
        }

        /** As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
          * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
          * key (empty string) that is used to identify local peer data.
          */
        public deserializeTransaction(deltaReader: AppStateDeltaReader, appState: AppStateBase, scene: modelstageweb.SceneWebGL) {
            let success = false;

            let instanceCount = deltaReader.Reader.readUInt16();
            if (!deltaReader.Reader.Error) {
                for (let i = 0; i < instanceCount; ++i) {
                    let peerID = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {

                        if (peerID == appState.LocalPeerID) {
                            peerID = '';
                        }

                        let cluster = this.getCluster(peerID);
                        success = cluster.deserializeTransaction(deltaReader, appState, scene);
                    }
                }
            }

            return success;
        }
    }

    /** AppStateCluster instances store information about the application state. Based on application state, changes
	  * to the view state are carried out. In order to be able to synchronize application state, operations on the entries that
	  * are aggregated by AppStateCluster,  are stored during a "transactional phase". Immediately afterwards, all changes are
	  * collected and sync'ed with remote peers. Similarly, when remote changes are received, they are processed after the local 
	  * collection took place, causing app state changes. Finally, all cluster's entry's changes are processed to update the
	  * application's view state.
	  */
    export abstract class AppStateCluster {
        private peerID: string;

        private instanceID: string;

        private appState: AppStateBase;

        private entries: { [index: string]: AppStateEntry } = {};

        private dirty: boolean = false;

        private lockCount: number = 0;

        public get PeerID() {
            return this.peerID;
        }

        public set PeerID(value: string) {
            this.peerID = value;
        }

        public get InstanceID() {
            return this.instanceID;
        }

        /** Constructor
          * @param peerID		The peer ID this cluster instance belongs to. If it's left empty, the local peer's ID will be used.
          * @param instanceID	The peer-unique instance ID. This ID is only necessary, if multi-instances are used (per peer). This depends on the AppStateClusterManager used to manage instances.
          * @param appState		The app state container this cluster belongs to.
          */
        constructor(peerID?: string, instanceID?: string, appState?: AppStateBase) {
            this.peerID = peerID || '';
            this.instanceID = instanceID || '';
            this.appState = appState || AppState.GetInstance();
        }

        /** Registers all entries on creation of a new cluster instance. Must be overriden by concrete clusters.
          */
        public abstract registerEntries();

        public beginTransaction() {
            this.dirty = false;
            for (let entryIdx in this.entries) {
                this.entries[entryIdx].beginTransaction();
            }
        }

        public endTransaction() {
            for (let entryIdx in this.entries) {
                this.entries[entryIdx].endTransaction();
            }
        }

        private reconcile(scene: modelstageweb.SceneWebGL) {
            for (let entryIdx in this.entries) {
                this.entries[entryIdx].reconcile();
            }
        }

        public setDirty() {
            this.dirty = true;
        }

        public isDirty() {
            return this.dirty;
        }

        public registerEntry(key: string, entry: AppStateEntry) {
            this.entries[key] = entry;
            entry.register(key, this);
        }

        /** ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
          * override ApplyChanges to update the view state based on the app state changes that occured.
          */
        public applyChanges(scene: modelstageweb.SceneWebGL, peerID: string, instanceID: string) {
        }

        /** Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
          */
        public serializeTransaction(deltaWriter: AppStateDeltaWriter, appState: AppStateBase) {
            // setIsInitializing(deltaWriter.IsInitialization());

            let dirtyEntries: Array<{ key: string, entry: AppStateEntry }> = [];

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

        /** Retrieves all remote operations that have been received from remote peers.
          */
        public deserializeTransaction(deltaReader: AppStateDeltaReader, appState: AppStateBase, scene: modelstageweb.SceneWebGL) {
            let success = true;

            let entryCount = deltaReader.Reader.readUInt16();

            // setIsInitializing(deltaReader.IsInitializing());
            if (!deltaReader.Reader.Error) {
                for (let i = 0; i < entryCount && success; ++i) {
                    let entryKey: string = deltaReader.Reader.readString();
                    if (!deltaReader.Reader.Error) {
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

        public lock() {
            ++this.lockCount;
        }

        public unlock() {
            --this.lockCount;
        }

        public get IsLocked(): boolean {
            return this.lockCount > 0;
        }

        public readValue(key: string, reader: AppStateDeltaReader): any {
            console.error('readValue not implemented for ' + key);
        }

        public writeValue(key: string, writer: AppStateDeltaWriter, value: any) {
            console.error('writeValue not implemented for ' + key);
        }
    }

    export class Director {
        protected scene: modelstageweb.SceneWebGL;

        protected appState: AppStateBase;

        private pendingUpdates: (() => void)[] = [];

        private pendingMessages: modelstageweb.NetworkChannelMessage[] = [];

        public set Scene(scene: DirectedSceneWebGL) {
            this.scene = scene;
        } 

        constructor(appState: AppStateBase) {
            this.appState = appState;
        }

        /** Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
          * BeginUpdate is called at the very beginning of each render cycle.
          */
        public beginFrame() {
            this.appState.beginTransaction();
        }

        public commit() {
            this.acquirePendingUpdates().forEach((updFunc) => {
                updFunc();
            });
            this.appState.endTransaction();
        }

        /** Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
          * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
          */
        public submitLocalUpdates(connection: modelstageweb.ServerConnection) {
            const AppStateDelta = 0x0100;

            let writer = new AppStateDeltaWriter(new BinaryWriter());
            writer.Writer.writeInt32(1);
            writer.Writer.writeInt32(AppStateDelta); 
            this.appState.serializeTransaction(writer);
            let buf = writer.Writer.flush();
            let msg = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
            if (msg.HasPayload && connection.IsConnected) {
                connection.send(msg.Content);
            }
        }

        /** Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after 
          * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
          */
        public applyRemoteUpdates() {
            let pendingMessages = this.acquirePendingMessages();
            pendingMessages.forEach((msg) => {
                this.appState.deserializeTransaction(new AppStateDeltaReader(new BinaryReader(msg.Content)), this.scene);
            });
        }

        private acquirePendingUpdates(): Array<() => void> {
            let result = this.pendingUpdates;
            this.pendingUpdates = [];
            return result;
        }

        private acquirePendingMessages() {
            let result = this.pendingMessages;
            this.pendingMessages = [];
            return result;
        }

        /** Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
          */
        public endFrame() {
            this.appState.applyChanges(this.scene);
        }

        public receivedMessage(message: modelstageweb.NetworkChannelMessage) {
            this.pendingMessages.push(message);
        }

        public synchronizeStateUpdate(func: () => void) {
            this.pendingUpdates.push(func);
        }
    }

    export class DirectedSceneWebGL extends modelstageweb.SceneWebGL {

        protected director: Director;

        private connection: modelstageweb.ServerConnection;

        public constructor(director: Director, connection: modelstageweb.ServerConnection) {
            super();
            this.director = director;
            this.connection = connection;
        }

        public beginFrame() {
            this.director.beginFrame();
        }

        public update() {
            this.director.commit();

            if (this.connection && this.connection.IsConnected) {
                this.director.submitLocalUpdates(this.connection);
                this.director.applyRemoteUpdates();
            }
        }

        public endFrame() {
            this.director.endFrame();
        }

        public receivedMessage(message: modelstageweb.NetworkChannelMessage) {
            if (message.MessageType == modelstageweb.CommonMessageTypes.AppStateDelta || message.MessageType == modelstageweb.CommonMessageTypes.AppStateInitialization) {
                this.director.receivedMessage(message);
            }
        }

        public synchronizeStateUpdate(func: () => void) {
            this.director.synchronizeStateUpdate(func);
        }

    }

}