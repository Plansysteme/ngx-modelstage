import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
import { psgeometry } from './ps-geometry';
export declare module modelstage {
    class SpaceModel {
        private scene;
        private stage;
        private actor;
        private vertices;
        private floorLevel;
        FloorLevel: number;
        constructor(scene: DemoSceneWebGL, stage: modelstageweb.StageWebGL, actor: modelstageweb.ActorWebGL);
        private initializeSquareRoom;
        private initializeArbitraryRoom;
        updateSpace(): void;
        clearVertices(): void;
        addVertex(x: number, y: number): void;
    }
    class TheaterWebGL {
        protected scene: modelstageweb.SceneWebGL;
        protected stage: modelstageweb.StageWebGL;
        private timer;
        readonly Stage: modelstageweb.StageWebGL;
        readonly Scene: modelstageweb.SceneWebGL;
        constructor(canvasElementID: string);
        protected initialize(): void;
        /** Main render cycle for a frame.
          */
        protected processFrame(): void;
        protected render(): void;
        private onVisibilityChange;
    }
    class ActorManipulationTool extends modelstageweb.Tool {
        protected connection: modelstageweb.ServerConnection;
        constructor(connection: modelstageweb.ServerConnection);
        protected getSceneObj(objID: string): any[];
        private updateModelTransform;
        protected updateActorTranslation(actor: modelstageweb.ActorWebGL, x: number, y: number, z: number): void;
        protected updateActorRotation(actor: modelstageweb.ActorWebGL, x: number, y: number, z: number): void;
    }
    class SelectionTool extends ActorManipulationTool {
        private scene;
        private stage;
        private static readonly SelectionObjectID;
        private selectedActor;
        constructor(scene: modelstageweb.SceneWebGL, stage: modelstageweb.StageWebGL, connection: modelstageweb.ServerConnection);
        enter(interfaceController: modelstageweb.InterfaceController): void;
        leave(): void;
        handleKeyUp(e: JQuery.Event): boolean;
        private removeSelectionMarker;
        private updateSelectionMarker;
        handleMouseDown(e: JQuery.Event): void;
        handleMouseMove(e: JQuery.Event, x: number, y: number): void;
        handleMouseUp(e: JQuery.Event): void;
    }
    class PlaceActorTool extends ActorManipulationTool {
        private camera;
        private sceneObj;
        private sceneObjIdx;
        constructor(figureID: string, camera: modelstageweb.CameraWebGL, connection: modelstageweb.ServerConnection);
        handleMouseMove(e: JQuery.TriggeredEvent, x: number, y: number): void;
        handleMouseUp(e: JQuery.Event): void;
    }
    class MoveActorTool extends ActorManipulationTool {
        private actor;
        private camera;
        private isInitialized;
        private lastX;
        private lastZ;
        constructor(actor: modelstageweb.ActorWebGL, camera: modelstageweb.CameraWebGL, connection: modelstageweb.ServerConnection);
        handleMouseMove(e: JQuery.TriggeredEvent, x: number, y: number): void;
        handleMouseUp(e: JQuery.Event): void;
    }
    class RotateActorTool extends ActorManipulationTool {
        private actor;
        private camera;
        constructor(actor: modelstageweb.ActorWebGL, camera: modelstageweb.CameraWebGL, connection: modelstageweb.ServerConnection);
        handleDrag(e: JQuery.Event, startX: number, startY: number, dX: number, dY: number): void;
        handleMouseUp(e: JQuery.Event): void;
    }
    class DemoSceneWebGL extends modelstageappstate.DirectedSceneWebGL {
        private stage;
        private spaceActor;
        private spaceModel;
        readonly SpaceModel: SpaceModel;
        constructor(stage: modelstageweb.StageWebGL, connection: modelstageweb.ServerConnection);
        initialize(): void;
        updateSpace(): void;
        updatePeerInfo(peerID: string, peerColorIndex: number, userName: string): void;
        removePeer(peerID: string): void;
        getColorIndexFromPeerID(peerID: string): number;
        createPeer(peerID: string): modelstageweb.ActorWebGL;
        createSceneObject(objectID: string, assetID: string): modelstageweb.ActorWebGL;
    }
    class RoomAppState extends modelstageappstate.AppStateCluster {
        static ClusterTypeID: string;
        static GlobalInstance: RoomAppState;
        FloorLevel: modelstageappstate.AppStateFloatValue;
        MasterView: modelstageappstate.AppStateVector4Value;
        Vertices: modelstageappstate.AppStateCollection<psgeometry.Vec4>;
        constructor();
        registerEntries(): void;
        readValue(key: string, reader: modelstageappstate.AppStateDeltaReader): any;
        applyChanges(scene: modelstageweb.SceneWebGL, peerID: string, instanceID: string): void;
    }
    class SceneObject {
        SceneObjectID: string;
        AssetID: string;
        Location: psgeometry.Vec4;
        Rotation: psgeometry.Vec4;
        Scale: psgeometry.Vec4;
    }
    class SceneAppState extends modelstageappstate.AppStateCluster {
        static ClusterTypeID: string;
        static GlobalInstance: SceneAppState;
        SceneObjects: modelstageappstate.AppStateCollection<SceneObject>;
        constructor();
        registerEntries(): void;
        readValue(key: string, reader: modelstageappstate.AppStateDeltaReader): any;
        writeValue(key: string, writer: modelstageappstate.AppStateDeltaWriter, value: any): void;
        applyChanges(scene: modelstageweb.SceneWebGL, peerID: string, instanceID: string): void;
    }
    class PeerAppState extends modelstageappstate.AppStateCluster {
        static ClusterTypeID: string;
        private headPos;
        private cursorPos;
        private userID;
        private active;
        providesInitializationData(): boolean;
        registerEntries(): void;
        applyChanges(scene: modelstageweb.SceneWebGL, peerID: string, instanceID: string): void;
    }
    class Note {
        NoteID: string;
        NoteType: number;
        OwnerID: string;
        AssignedToID: string;
        Location: psgeometry.Vec4;
        AzimuthalRotation: number;
    }
    class NotesAppState extends modelstageappstate.AppStateCluster {
        static ClusterTypeID: string;
        static GlobalInstance: NotesAppState;
        Notes: modelstageappstate.AppStateCollection<Note>;
        constructor();
        registerEntries(): void;
        readValue(key: string, reader: modelstageappstate.AppStateDeltaReader): any;
        writeValue(key: string, writer: modelstageappstate.AppStateDeltaWriter, value: any): void;
    }
}
