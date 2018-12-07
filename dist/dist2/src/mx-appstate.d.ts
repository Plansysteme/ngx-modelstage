import { psgeometry } from './ps-geometry';
import { modelstageweb } from './mx-common';
export declare module modelstageappstate {
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
    class AppStateBase {
        private clusterManagers;
        private localPeerID;
        LocalPeerID: string;
        getClusterManager(key: string): AppStateClusterManagerBase;
        /** Adds a certain cluster type (global/local, single/multi) to the app state.
          */
        addCluster(key: string, cluster: AppStateClusterManagerBase): void;
        /** Starts the transactional phase of the app state. Changes to entries and their values may only be carried out
          * during the transactional phase of the app state.
          */
        beginTransaction(): void;
        /** Ends the transactional phase of the app state. Afterwards, the synchronisation takes place. To ensure that local state
          * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
          */
        endTransaction(): void;
        /** Applies app state changes to the view state of the application. This method is being called after all local changes have
          * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
          * update cycle have been carried out and will be reflected in the view state. This method will be used in client-type applications that
          * need to maintain a view state. For server-type applications, where this is not the case, use \ref ProcessChanges() instead.
          */
        applyChanges(scene: modelstageweb.SceneWebGL): void;
        /** Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
          */
        serializeTransaction(deltaWriter: AppStateDeltaWriter): void;
        /** Retrieves all remote operations that have been received from remote peers.
          */
        deserializeTransaction(deltaReader: AppStateDeltaReader, scene: modelstageweb.SceneWebGL): boolean;
    }
    class AppState extends AppStateBase {
        private static Instance;
        static GetInstance(): AppState;
    }
    class BinaryWriter {
        private buf;
        flush(): Uint8Array;
        writeByte(val: number): void;
        writeInt16(val: number): void;
        writeUInt16(val: number): void;
        writeInt32(val: number): void;
        writeInt64(val: number): void;
        writeTimestamp(val: number): void;
        writeFloat32(val: number): void;
        writeString(val: string): void;
        writeCharArray(val: string, arrayLength: number): void;
        writeWideCharArray(val: string, arrayLength: number): void;
        writeVec3(val: psgeometry.Vec4): void;
        writeVec4(val: psgeometry.Vec4): void;
    }
    class BinaryReader {
        private buf;
        private currentPos;
        private error;
        readonly Error: boolean;
        readonly AtEnd: boolean;
        constructor(buf: Uint8Array);
        assureRemainingBytes(count: number): boolean;
        readByte(): number;
        readUInt16(): number;
        readUInt64(): number;
        readUInt32(): number;
        readString(): string;
        readTimestamp(): number;
        readCharArray(arrayLength: number): string;
        readFloat32(): number;
        readVec3(): psgeometry.Vec3;
        readVec4(): psgeometry.Vec4;
    }
    class AppStateDeltaReader {
        private reader;
        private isInitializing;
        readonly Reader: BinaryReader;
        constructor(reader: BinaryReader);
        /** Indicates if there is data left to process.
          */
        isAtEnd(): boolean;
        /** Reads the cluster ID from the data.
          */
        readClusterID(): string;
        /** Indicates if the message is an initialization message rather than a "normal" delta package.
          * This can be evaluated by the cluster to handle initialization different from updating.
          */
        readonly IsInitializing: boolean;
    }
    class AppStateDeltaWriter {
        private writer;
        readonly Writer: BinaryWriter;
        constructor(writer: BinaryWriter);
    }
    abstract class AppStateEntry {
        private key;
        private appState;
        private transactional;
        protected cluster: AppStateCluster;
        AppState: AppState;
        register(key: string, cluster: AppStateCluster): void;
        abstract deserializeDelta(reader: AppStateDeltaReader, key: string): boolean;
        abstract serializeDelta(writer: AppStateDeltaWriter, key: string): any;
        reconcile(): void;
        abstract isDirty(): any;
        setDirty(): void;
        beginTransaction(): void;
        endTransaction(): void;
        isTransactional(): boolean;
        isLocked(): boolean;
    }
    abstract class CommonAppStateEntry extends AppStateEntry {
        protected changedAt: number;
        beginChanging(): void;
    }
    class AppStateStringValue extends CommonAppStateEntry {
        private dirty;
        private value;
        private previousValue;
        set(value: string): void;
        get(): string;
        getPreviousValue(): string;
        changing(): void;
        isDirty(): boolean;
        beginTransaction(): void;
        deserializeDelta(reader: AppStateDeltaReader, key: string): boolean;
        serializeDelta(writer: AppStateDeltaWriter, key: string): void;
    }
    abstract class AppStateValue<T> extends CommonAppStateEntry {
        private dirty;
        private value;
        private previousValue;
        set(value: T): void;
        get(): T;
        isDirty(): boolean;
        beginTransaction(): void;
        protected abstract readValue(reader: AppStateDeltaReader): T;
        protected abstract writeValue(writer: AppStateDeltaWriter, value: T): any;
        deserializeDelta(reader: AppStateDeltaReader, key: string): boolean;
        serializeDelta(writer: AppStateDeltaWriter, key: string): void;
    }
    class AppStateBoolValue extends AppStateValue<boolean> {
        protected readValue(reader: AppStateDeltaReader): boolean;
        protected writeValue(writer: AppStateDeltaWriter, value: boolean): void;
    }
    class AppStateVector4Value extends AppStateValue<psgeometry.Vec4> {
        protected readValue(reader: AppStateDeltaReader): psgeometry.Vec4;
        protected writeValue(writer: AppStateDeltaWriter, value: psgeometry.Vec4): void;
    }
    class AppStateFloatValue extends AppStateValue<number> {
        protected readValue(reader: AppStateDeltaReader): number;
        protected writeValue(writer: AppStateDeltaWriter, value: number): void;
    }
    class AppStateOperation {
        protected changedAt: number;
        protected isLocal: boolean;
        readonly ChangedAt: number;
        readonly IsLocal: boolean;
        constructor(changedAt: number, isLocal?: boolean);
    }
    class AppStateValueOperation<T> extends AppStateOperation {
        protected isNewValueDefined: boolean;
        protected isPreviousValueDefined: boolean;
        protected newValue: T;
        protected previousValue: T;
        readonly IsNewValueDefined: boolean;
        readonly IsPreviousValueDefined: boolean;
        readonly NewValue: T;
        readonly PreviousValue: T;
        constructor(changedAt: number, newValue?: T, previousValue?: T, isLocal?: boolean);
    }
    enum OperationType {
        Clear = 0,
        Append = 1,
        Insert = 2,
        Remove = 3,
        Replace = 4
    }
    class AppStateCollectionOperation<T> extends AppStateValueOperation<T> {
        protected operation: OperationType;
        protected itemIndex: number;
        protected reconciledItemIndex: number;
        readonly Operation: OperationType;
        readonly ItemIndex: number;
        ReconciledItemIndex: number;
        constructor(changedAt: number, operation: OperationType, itemIndex?: number, newValue?: T, previousValue?: T, isLocal?: boolean);
    }
    class AppStateCollection<T> extends CommonAppStateEntry {
        private appStateCollectionOperationType;
        protected container: Array<T>;
        protected serializeOperationChangedAt: boolean;
        protected serializePreviousValues: boolean;
        protected operations: Array<AppStateCollectionOperation<T>>;
        readonly Operations: AppStateCollectionOperation<T>[];
        constructor(appStateCollectionOperationType: new (changedAt: number, operation: OperationType, itemIndex?: number, newValue?: T, previousValue?: T, isLocal?: boolean) => AppStateCollectionOperation<T>, serializeOperationChangedAt?: boolean, serializePreviousValues?: boolean);
        protected addOperation(op: AppStateCollectionOperation<T>): void;
        clear(): void;
        append(item: T): void;
        insert(item: T, beforeIndex: number): void;
        remove(index: number): void;
        replace(item: T, index: number): void;
        GetItemAt(index: number): T;
        readonly Count: number;
        isDirty(): boolean;
        deserializeDelta(reader: AppStateDeltaReader, key: string): boolean;
        serializeDelta(writer: AppStateDeltaWriter, key: string): void;
        reconcile(): void;
        beginTransaction(): void;
    }
    class AppStateClusterManagerBase {
        /** A vector managing pointers to all instances of the corresponding cluster type.
          */
        protected allInstances: Array<AppStateCluster>;
        /** Adds a new instance of the corresponding cluster type to this.
          */
        protected addInstance(instance: AppStateCluster): void;
        /** Starts the transactional phase. Changes to entries and their values may only be carried out
          * during the transactional phase.
          */
        beginTransaction(): void;
        /** Ends the transactional phase. Afterwards, the synchronisation takes place. To ensure that local state
          * changes aren't missed, an exception is thrown if the state is not transactional when entries or their values are being changed.
          */
        endTransaction(): void;
        /** Applies app state changes to the view state of the application. This method is being called after all local changes have
          * been carried out (the "transactional phase") and after the synchronisation took place. Therefore, all changes for the current
          * update cycle have been carried out and will be reflected in the view state.
          */
        applyChanges(scene: modelstageweb.SceneWebGL): void;
        /** Serializes peer ID and/or instance ID based on the nature of the concrete cluster type. Must
          * be overriden by concrete subclasses of AppStateClusterManagerBase.
          */
        serializeClusterInstanceData(cluster: AppStateCluster, deltaWriter: AppStateDeltaWriter, appState: AppStateBase): void;
        /** Serializes all changes that have been carried out on clusters of the corresponding type.
          */
        serializeTransaction(deltaWriter: AppStateDeltaWriter, clusterID: string, appState: AppStateBase): void;
        /** Deserializes remote changes that have been carried out on clusters of the corresponding type. Must
          * be overriden by concrete subclasses of AppStateClusterManagerBase.
          */
        deserializeTransaction(deltaReader: AppStateDeltaReader, appState: AppStateBase, scene: modelstageweb.SceneWebGL): boolean;
    }
    /** Concrete subclass of AppStateClusterManagerBase that provides a single, global instance of the specified cluster type.
      */
    class GlobalAppStateClusterManager<TAppStateCluster extends AppStateCluster> extends AppStateClusterManagerBase {
        private clusterType;
        private onlyInstance;
        constructor(clusterTypeID: string, clusterType: new () => TAppStateCluster);
        /** Gets the only instance of this cluster type.
          */
        getGlobalCluster(): TAppStateCluster;
        /** As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't write anything.
          */
        serializeClusterInstanceData(cluster: AppStateCluster, deltaWriter: AppStateDeltaWriter, appState: AppStateBase): void;
        /** As global clusters don't need a peer ID or instance ID to identify, this implementation doesn't retreive
          * additional data from the reader.
          */
        deserializeTransaction(deltaReader: AppStateDeltaReader, appState: AppStateBase, scene: modelstageweb.SceneWebGL): boolean;
    }
    /** Concrete subclass of AppStateClusterManagerBase that distinguishes local and remote instances of the
      * corresponding cluster type (derived from AppStateCluster). Each peer may have zero or one instances of the cluster type.
      */
    class LocalAppStateClusterManager<TAppStateCluster extends AppStateCluster> extends AppStateClusterManagerBase {
        private clusterType;
        /** The map of cluster per peer.
          */
        private peerClusters;
        constructor(clusterTypeID: string, clusterType: new () => TAppStateCluster);
        /** Gets the local peer's instance of this cluster type.
          */
        getLocalCluster(): TAppStateCluster;
        /** \brief Gets the instance of this cluster type that belongs to the peer with the specified ID. If it doesn't exist,
          * it's created.
          */
        getCluster(peerID: string): TAppStateCluster;
        /** Determines if the peer with the specified ID already has an instance of the corresponding cluster type.
          */
        containsCluster(peerID: string): boolean;
        /** As local clusters with a single instance only need a peer ID to identify, this implementation only writes the peerID.
          * For the local peer's instance, an empty peer ID will be replaced by the actual ID of the peer.
          */
        serializeClusterInstanceData(cluster: AppStateCluster, deltaWriter: AppStateDeltaWriter, appState: AppStateBase): void;
        /** As local clusters with a single instance only need a peer ID to identify, this implementation retrieves a peer ID,
          * but no instanceID from the delta. If the peerID is identical to the local peer's ID, it is replaced by the internal
          * key (empty string) that is used to identify local peer data.
          */
        deserializeTransaction(deltaReader: AppStateDeltaReader, appState: AppStateBase, scene: modelstageweb.SceneWebGL): boolean;
    }
    /** AppStateCluster instances store information about the application state. Based on application state, changes
      * to the view state are carried out. In order to be able to synchronize application state, operations on the entries that
      * are aggregated by AppStateCluster,  are stored during a "transactional phase". Immediately afterwards, all changes are
      * collected and sync'ed with remote peers. Similarly, when remote changes are received, they are processed after the local
      * collection took place, causing app state changes. Finally, all cluster's entry's changes are processed to update the
      * application's view state.
      */
    abstract class AppStateCluster {
        private peerID;
        private instanceID;
        private appState;
        private entries;
        private dirty;
        private lockCount;
        PeerID: string;
        readonly InstanceID: string;
        /** Constructor
          * @param peerID		The peer ID this cluster instance belongs to. If it's left empty, the local peer's ID will be used.
          * @param instanceID	The peer-unique instance ID. This ID is only necessary, if multi-instances are used (per peer). This depends on the AppStateClusterManager used to manage instances.
          * @param appState		The app state container this cluster belongs to.
          */
        constructor(peerID?: string, instanceID?: string, appState?: AppStateBase);
        /** Registers all entries on creation of a new cluster instance. Must be overriden by concrete clusters.
          */
        abstract registerEntries(): any;
        beginTransaction(): void;
        endTransaction(): void;
        private reconcile;
        setDirty(): void;
        isDirty(): boolean;
        registerEntry(key: string, entry: AppStateEntry): void;
        /** ApplyChanges is being called in each update cycle with local or remote changes. Concrete clusters should
          * override ApplyChanges to update the view state based on the app state changes that occured.
          */
        applyChanges(scene: modelstageweb.SceneWebGL, peerID: string, instanceID: string): void;
        /** Writes all local operations that have been carried out during the transactional phase of this update cycle ("Delta").
          */
        serializeTransaction(deltaWriter: AppStateDeltaWriter, appState: AppStateBase): void;
        /** Retrieves all remote operations that have been received from remote peers.
          */
        deserializeTransaction(deltaReader: AppStateDeltaReader, appState: AppStateBase, scene: modelstageweb.SceneWebGL): boolean;
        lock(): void;
        unlock(): void;
        readonly IsLocked: boolean;
        readValue(key: string, reader: AppStateDeltaReader): any;
        writeValue(key: string, writer: AppStateDeltaWriter, value: any): void;
    }
    class Director {
        protected scene: modelstageweb.SceneWebGL;
        protected appState: AppStateBase;
        private pendingUpdates;
        private pendingMessages;
        Scene: DirectedSceneWebGL;
        constructor(appState: AppStateBase);
        /** Initializes an AppState transaction. Any changes applied to the AppState will be monitored.
          * BeginUpdate is called at the very beginning of each render cycle.
          */
        beginFrame(): void;
        commit(): void;
        /** Determines and submits local AppState transitions. Creates a local AppState delta that is transferred to upstream peers.
          * SubmitLocalUpdates is called after the scene has been rendered and all interactions with the view are processed.
          */
        submitLocalUpdates(connection: modelstageweb.ServerConnection): void;
        /** Applies remote AppState transitions received from upstream peers. ApplyRemoteUpdates is called after
          * SubmitLocalUpdates. After applying remote updates, all AppState transitions for this render cycle have been applied.
          */
        applyRemoteUpdates(): void;
        private acquirePendingUpdates;
        private acquirePendingMessages;
        /** Updates ViewState according to resulting AppState. AppState transition is committed by clearing AppState delta.
          */
        endFrame(): void;
        receivedMessage(message: modelstageweb.NetworkChannelMessage): void;
        synchronizeStateUpdate(func: () => void): void;
    }
    class DirectedSceneWebGL extends modelstageweb.SceneWebGL {
        protected director: Director;
        private connection;
        constructor(director: Director, connection: modelstageweb.ServerConnection);
        beginFrame(): void;
        update(): void;
        endFrame(): void;
        receivedMessage(message: modelstageweb.NetworkChannelMessage): void;
        synchronizeStateUpdate(func: () => void): void;
    }
}
