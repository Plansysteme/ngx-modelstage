import { psgeometry } from './ps-geometry';
import * as JQuery from 'jquery';
export declare module modelstageweb {
    function uuidv4(): string;
    class ToolsWebGL {
        private stage;
        constructor(stage: StageWebGL);
        createShader(shaderType: GLenum, shaderSource: string): WebGLShader;
    }
    class BlockStreamBlockDescriptor {
        private blockType;
        private majorVersion;
        private minorVersion;
        private flags;
        private payloadBytes;
        BlockType: string;
        MajorVersion: number;
        MinorVersion: number;
        Flags: number;
        PayloadBytes: number;
    }
    enum BlockStreamReaderStates {
        FILE_HEADER_EXPECTED = 0,
        BLOCK_DESCRIPTOR_EXPECTED = 1,
        PAYLOAD_EXPECTED = 2
    }
    class BlockStreamReader {
        private arrayBuffer;
        private byteArray;
        private currentPos;
        private currentBlockDescriptor;
        private blockEnd;
        private isComplete;
        private fatalError;
        private state;
        readonly CurrentBlockDescriptor: BlockStreamBlockDescriptor;
        readonly FatalError: boolean;
        constructor(buffer: ArrayBuffer);
        remainingBytesInBlock(): number;
        assureRemainingBytesInBlock(count: number): boolean;
        readBytes(count: number): ArrayBuffer;
        tryReadInt16(lambda: (value: number) => void): boolean;
        tryReadFloat(lambda: (value: number) => void): boolean;
        tryReadInt(lambda: (value: number) => void): boolean;
        tryReadInt64(lambda: (value: number) => void): boolean;
        tryReadString(lambda: (value: string) => void): boolean;
        readString(): string;
        readMatrix4(): psgeometry.Matrix4;
        private internalReadString;
        private internalReadInt;
        private assureFileHeader;
        enterBlock(): {
            success: boolean;
            descriptor: BlockStreamBlockDescriptor;
        };
        leaveBlock(): void;
    }
    class ShaderInstance {
        private shaderKey;
        private references;
        private figureID;
        FigureID: string;
        ShaderKey: string;
        getReference(key: string): string;
        constructor(shaderKey: string);
        construct(reader: BlockStreamReader): void;
        addReference(key: string, value: string): void;
    }
    class MeshShaderInstance extends ShaderInstance {
        SIZE_OF_FLOAT: number;
        protected bufferID: string;
        protected priority: number;
        constructor(shaderKey: string);
        construct(reader: BlockStreamReader): void;
        getStride(): number;
    }
    class TexturedMeshShaderInstance extends MeshShaderInstance {
        protected textureID: string;
        readonly TextureID: string;
        constructor(shaderKey: string);
        construct(reader: BlockStreamReader): void;
        getStride(): number;
    }
    class Mesh3DLib {
        private objectNamePrefix;
        private rootNode;
        constructor(objectNamePrefix: string);
        setRootNode(rootNode: NodeAsset): void;
        getNodeFromPath(path: string): NodeAsset;
    }
    class AssetFactoryWebGL {
        private lastPercentage;
        private stage;
        private currentFigure;
        private currentShaderInstance;
        private currentSceneMesh3DLib;
        constructor(stage: StageWebGL);
        protected createFigure(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL): boolean;
        protected createMesh(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL): boolean;
        protected createMeshBuffer(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL): void;
        protected createMeshIndicesBuffer(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL): void;
        protected createTexture(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL, deferreds: Array<JQuery.Deferred<boolean>>): void;
        protected createOctree(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL): void;
        protected createScene(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL): void;
        protected createRootNode(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL): void;
        private processBlock;
        private loadFromArrayBuffer;
        getFromUrl(url: string): JQuery.Deferred<Boolean>;
    }
    interface Intersector {
        getBoundingBox(): psgeometry.AABB3D;
    }
    class BoundingBoxIntersector implements Intersector {
        private boundingBox;
        constructor(boundingBox: psgeometry.AABB3D);
        getBoundingBox(): psgeometry.AABB3D;
    }
    class Octree implements Intersector {
        private boundingBox;
        static CreateFromBlockStream(reader: BlockStreamReader): Octree;
        getBoundingBox(): psgeometry.AABB3D;
    }
    class FigureWebGL {
        private figureID;
        private shaderInstances;
        private intersector;
        private node;
        Node: NodeAsset;
        readonly FigureID: string;
        readonly ShaderInstances: ShaderInstance[];
        constructor(figureID: string);
        getBoundingBox(): psgeometry.AABB3D;
        addShaderInstance(shaderInstance: ShaderInstance): void;
        render(context: RenderContextWebGL): void;
        setIntersector(intersector: Intersector): void;
        intersectsBoundingBox(ray: psgeometry.Line3D, at: psgeometry.Vec3): boolean;
    }
    class AnimationTransformation {
        static FromBlockStream(reader: BlockStreamReader, mesh3DLib: Mesh3DLib): AnimationTransformation;
    }
    class NodeAsset {
        private name;
        private parentNode;
        private childNodes;
        private localTransformation;
        private absoluteTransformation;
        readonly Name: string;
        readonly AbsoluteTransformation: psgeometry.Matrix4;
        readonly LocalTransformation: psgeometry.Matrix4;
        getChildNodeFromPath(path: string): any;
        static FromBlockStream(reader: BlockStreamReader, mesh3DLib: Mesh3DLib, parentNode?: NodeAsset): NodeAsset;
        private static calculateAbsoluteTransformation;
        private readChildNodes;
        private readAnimationTransformations;
        private addChildNode;
        private addAnimationTransformation;
    }
    class BufferAssetWebGL {
        private bufferID;
        private bufferSize;
        bufferData: ArrayBuffer | SharedArrayBuffer;
        private webGLBuffer;
        private isElementBuffer;
        BufferID: string;
        readonly Buffer: WebGLBuffer;
        BufferSize: number;
        constructor(reader: BlockStreamReader, bufferID: string, isElementBuffer: boolean);
        initialize(stage: StageWebGL): void;
        bind(stage: StageWebGL): void;
        bindInterleaved(stage: StageWebGL, attributeLocation: number, size: number, stride: number, offset: number): void;
    }
    class OpaqueMeshBuilder {
        private vertices;
        private indices;
        private vertBufferAsset;
        private indBufferAsset;
        constructor();
        addTri(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, r: number, g: number, b: number, doubleSided?: boolean): void;
        addQuad(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, x3: number, y3: number, z3: number, r: number, g: number, b: number, doubleSided?: boolean): void;
        addStroke(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, r: number, g: number, b: number): void;
        initialize(stage: StageWebGL): void;
        createFigure(stage: StageWebGL, figureID: string): FigureWebGL;
    }
    class TransparentMeshBuilder {
        protected vertBufferAsset: BufferAssetWebGL;
        protected indBufferAsset: BufferAssetWebGL;
        private vertices;
        private indices;
        constructor(vertBufferAsset: BufferAssetWebGL, indBufferAsset: BufferAssetWebGL);
        addTri(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, r: number, g: number, b: number, a: number, twoSided?: boolean): void;
        addQuad(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, x3: number, y3: number, z3: number, r: number, g: number, b: number, a: number, twoSided?: boolean): void;
        initialize(stage: StageWebGL): void;
    }
    class TexturedMeshBuilder {
        protected vertBufferAsset: BufferAssetWebGL;
        protected indBufferAsset: BufferAssetWebGL;
        private vertices;
        private indices;
        constructor(vertBufferAsset: BufferAssetWebGL, indBufferAsset: BufferAssetWebGL);
        addTri(x0: number, y0: number, z0: number, u0: number, v0: number, x1: number, y1: number, z1: number, u1: number, v1: number, x2: number, y2: number, z2: number, u2: number, v2: number, r: number, g: number, b: number, twoSided?: boolean): void;
        addQuad(x0: number, y0: number, z0: number, u0: number, v0: number, x1: number, y1: number, z1: number, u1: number, v1: number, x2: number, y2: number, z2: number, u2: number, v2: number, x3: number, y3: number, z3: number, u3: number, v3: number, r: number, g: number, b: number, twoSided?: boolean): void;
        initialize(stage: StageWebGL): void;
    }
    class TextureAssetWebGL {
        private texture;
        constructor(stage: StageWebGL, image: HTMLImageElement | WebGLTexture);
        bind(stage: StageWebGL, program: ShaderProgramWebGL, attributeName: string): void;
        unbind(stage: StageWebGL, program: ShaderProgramWebGL, attributeName: string): void;
    }
    class AssetStoreWebGL {
        private figures;
        private rootNodeAssets;
        private bufferAssets;
        private textureAssets;
        addFigure(figure: FigureWebGL): void;
        getFigure(figureID: string): FigureWebGL;
        addBufferAsset(bufferAssetID: string, bufferAsset: BufferAssetWebGL): void;
        addRootNode(node: NodeAsset): void;
        getBufferAsset(bufferAssetID: string): BufferAssetWebGL;
        addTextureAsset(textureAssetID: string, textureAsset: TextureAssetWebGL): void;
        getTextureAsset(textureAssetID: string): TextureAssetWebGL;
        readonly Figures: {
            [index: string]: FigureWebGL;
        };
        getRootNode(name: string): NodeAsset;
    }
    interface SceneItemFilterWebGL {
        passes(sceneItem: SceneItemWebGL, context: RenderContextWebGL): any;
    }
    class GenericSceneItemFilterWebGL implements SceneItemFilterWebGL {
        passes(sceneItem: SceneItemWebGL, context: RenderContextWebGL): boolean;
    }
    class SceneItemWebGL {
        protected scene: SceneWebGL;
        protected parent: SceneItemWebGL;
        protected sceneItemID: string;
        protected children: Array<SceneItemWebGL>;
        protected childrenByKey: {
            [sceneItemID: string]: SceneItemWebGL;
        };
        protected isVisible: boolean;
        protected childrenVisible: boolean;
        protected testIntersection: boolean;
        protected testChildrenIntersection: boolean;
        protected filter: SceneItemFilterWebGL;
        private data;
        readonly Data: {
            [index: string]: any;
        };
        readonly Scene: SceneWebGL;
        readonly SceneItemID: string;
        readonly Children: SceneItemWebGL[];
        TestChildrenIntersection: boolean;
        TestIntersection: boolean;
        Filter: SceneItemFilterWebGL;
        constructor(scene: SceneWebGL, sceneItemID: string, isVisible?: boolean, testIntersection?: boolean, childrenVisible?: boolean, testChildrenIntersection?: boolean);
        addChild(sceneItem: SceneItemWebGL): void;
        getChild(sceneItemID: string): SceneItemWebGL;
        removeChild(sceneItemID: string): void;
        insertChild(sceneItem: SceneItemWebGL, index: number): void;
        protected beginRender(context: RenderContextWebGL): void;
        protected endRender(context: RenderContextWebGL): void;
        render(context: RenderContextWebGL): void;
        protected renderChildren(context: RenderContextWebGL): void;
        addedToSceneGraph(parentSceneItem: SceneItemWebGL): void;
        intersectsBoundingBox(ray: psgeometry.Line3D, at: psgeometry.Vec3): Boolean;
        protected isIntersectionCandidate(ray: psgeometry.Line3D, at: psgeometry.Vec3): Boolean;
        addIntersectionCandidates(ray: psgeometry.Line3D, candidates: Array<IntersectionCandidate>): void;
    }
    class ActorWebGL extends SceneItemWebGL {
        private figures;
        private lastModelTransform;
        private inverseModelTransform;
        private state;
        readonly State: RenderState;
        readonly Figures: FigureWebGL[];
        constructor(scene: SceneWebGL, actorID: string);
        addFigure(figure: FigureWebGL): void;
        beginRender(context: RenderContextWebGL): void;
        intersectsBoundingBox(ray: psgeometry.Line3D, at: psgeometry.Vec3): Boolean;
        render(context: RenderContextWebGL): void;
    }
    class IntersectionCandidate {
        sceneItem: SceneItemWebGL;
        private squaredDist;
        constructor(sceneItem: SceneItemWebGL, squaredDist: number);
        compare(intersectionCandidate: IntersectionCandidate): 0 | 1 | -1;
    }
    class RenderState {
        private parent;
        private entries;
        Parent: RenderState;
        private evaluate;
        contains(key: string): boolean;
        get<T>(key: string, defaultValue: T): T;
        tryGet(key: string, lambda: (val: any) => void): boolean;
        set(key: string, value: any): void;
    }
    class SceneWebGL {
        private isInitialized;
        private sceneHierarchy;
        private dirty;
        private state;
        readonly SceneHierarchy: SceneItemWebGL;
        IsInitialized: boolean;
        readonly State: RenderState;
        initialize(): void;
        setDirty(): void;
        isDirty(): boolean;
        render(context: RenderContextWebGL): void;
        addSceneItem(sceneItem: SceneItemWebGL, makeVisible: boolean): void;
        getSceneItem(sceneItemID: string): SceneItemWebGL;
        removeSceneItem(sceneItemID: string): void;
        insertSceneItem(sceneItem: SceneItemWebGL, index: number, makeVisible: boolean): void;
        protected getSceneCategory(): string;
        getIntersectionCandidates(ray: psgeometry.Line3D, candidates: Array<IntersectionCandidate>): void;
        beginFrame(): void;
        /** Update is called periodically (once per frame) to allow updating the state of the scene.
          */
        update(): void;
        endFrame(): void;
    }
    class Camera {
        protected projectionMatrix: psgeometry.Matrix4;
        protected inverseProjectionMatrix: psgeometry.Matrix4;
        protected viewMatrix: psgeometry.Matrix4;
        protected inverseViewMatrix: psgeometry.Matrix4;
        private dirty;
        readonly ProjectionMatrix: psgeometry.Matrix4;
        readonly ViewMatrix: psgeometry.Matrix4;
        protected setDirty(): void;
        isDirty(): boolean;
        createViewMatrix(eye: psgeometry.Vec3, center: psgeometry.Vec3, up: psgeometry.Vec3): psgeometry.Matrix4;
        createPerspectiveMatrix(fovy: any, aspect: any, znear: any, zfar: any): psgeometry.Matrix4;
        createOrthographicMatrix(left: any, right: any, bottom: any, top: any, near: any, far: any): psgeometry.Matrix4;
        makeFrustum(left: any, right: any, bottom: any, top: any, znear: any, zfar: any): psgeometry.Matrix4;
    }
    class ShadowCameraWebGL extends Camera {
        private shadowMapWidth;
        private shadowMapHeight;
        private shadowFramebuffer;
        private shadowDepthTexture;
        private renderBuffer;
        resize(stage: StageWebGL): void;
        updateShadowArea(bbox: psgeometry.AABB2D): void;
        update(pos: psgeometry.Vec3, lookAt: psgeometry.Vec3, up: psgeometry.Vec3): void;
        beginRender(stage: StageWebGL): void;
        endRender(stage: StageWebGL): void;
    }
    class CameraWebGL extends Camera {
        private currentCameraPos;
        private clientWidth;
        private clientHeight;
        readonly ProjectionMatrix: psgeometry.Matrix4;
        readonly ViewMatrix: psgeometry.Matrix4;
        resize(stage: StageWebGL): void;
        update(pos: psgeometry.Vec3, lookAt: psgeometry.Vec3, up: psgeometry.Vec3): void;
        beginRender(stage: StageWebGL): void;
        endRender(stage: StageWebGL): void;
        getViewRay(clientX: number, clientY: number): psgeometry.Line3D;
    }
    class ShaderProgramWebGL {
        protected isInitialized: boolean;
        protected vertexShader: WebGLShader;
        protected fragmentShader: WebGLShader;
        protected program: WebGLProgram;
        readonly Program: WebGLProgram;
        render(context: RenderContextWebGL, shaderInstance: ShaderInstance): void;
        protected getAttribLocation(stage: StageWebGL, attribName: string): number;
        protected beginRender(context: RenderContextWebGL, shaderInstance: ShaderInstance): boolean;
        protected SIZE_OF_FLOAT: number;
        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance): void;
        protected endRender(context: RenderContextWebGL, shaderInstance: ShaderInstance): void;
        initialize(stage: StageWebGL): void;
        getVertexShaderSrc(): string;
        getFragmentShaderSrc(): string;
    }
    class OpaqueMeshShaderProgramWebGL extends ShaderProgramWebGL {
        protected getStride(): number;
        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance): void;
        getVertexShaderSrc(): string;
        getFragmentShaderSrc(): string;
    }
    class TransparentMeshShaderProgramWebGL extends ShaderProgramWebGL {
        protected getStride(): number;
        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance): void;
        getVertexShaderSrc(): string;
        getFragmentShaderSrc(): string;
    }
    enum TexturedMeshShaderProgramVariants {
        Diffuse = 0,
        Matcap = 1
    }
    class TexturedMeshShaderProgramWebGL extends ShaderProgramWebGL {
        private variant;
        constructor(variant?: TexturedMeshShaderProgramVariants);
        protected getStride(): number;
        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance): void;
        getVertexShaderSrc(): string;
        getFragmentShaderSrc(): string;
    }
    class ShadowTexturedMeshShaderProgramWebGL extends TexturedMeshShaderProgramWebGL {
        getVertexShaderSrc(): string;
        getFragmentShaderSrc(): string;
    }
    class MatCapShaderProgramWebGL extends ShaderProgramWebGL {
        protected getStride(): number;
        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance): void;
        getVertexShaderSrc(): string;
        getFragmentShaderSrc(): string;
    }
    /** A RenderContext instance is used to pass environment data to SceneItems during the rendition process.
      *
      * Besides the Stage that the SceneItems are being rendered to, the render context is the owner of a state stack
      * that may be updated by SceneItems and that is consequently used by ShaderPrograms to set shader data and resources (like model transformation
      * and auxiliary data). As SceneItems are organized in a hierarchical way, the current state may be defined by the current SceneItem, but
      * also by previously traversed SceneItems in the scene hierarchy.
      */
    class RenderContextWebGL {
        private stage;
        private camera;
        private shaderProgram;
        private sceneCategory;
        private stateStack;
        private modelTransform;
        private nodeTransform;
        private phase;
        Phase: string;
        /** Returns the current state that is composed of previously set state values.
          */
        readonly State: RenderState;
        /** Pushes the specified state on the state stack.
          */
        pushState(state: RenderState): void;
        /** Removes the top element from the state stack.
          */
        popState(): void;
        readonly ModelTransform: psgeometry.Matrix4;
        /** The current scene's category.
          */
        /** The current scene's category.
        */
        SceneCategory: string;
        /** The stage the SceneItems are being rendered to.
          */
        /** The stage the SceneItems are being rendered to.
        */
        Stage: StageWebGL;
        Camera: Camera;
        /** The current shader program.
          */
        /** The current shader program.
        */
        ShaderProgram: ShaderProgramWebGL;
        NodeTransform: psgeometry.Matrix4;
    }
    class StageWebGL {
        gl: WebGLRenderingContext;
        private canvas;
        private camera;
        private shadowCamera;
        private context;
        private assetFactory;
        private assetStore;
        private phaseSpecificShaderPrograms;
        private shaderPrograms;
        private tools;
        readonly Canvas: HTMLCanvasElement;
        readonly Camera: CameraWebGL;
        readonly Tools: ToolsWebGL;
        readonly AssetFactory: AssetFactoryWebGL;
        readonly AssetStore: AssetStoreWebGL;
        constructor(canvasElementId: string);
        initialize(): void;
        updateShadowArea(box: psgeometry.AABB2D): void;
        applyState(context: RenderContextWebGL): void;
        render(scene: SceneWebGL): void;
        registerShaderProgram(shaderProgramKey: string, shaderProgram: ShaderProgramWebGL): void;
        registerPhaseSpecificShaderProgram(phaseKey: string, shaderProgramKey: string, shaderProgram: ShaderProgramWebGL): void;
        getShaderProgram(context: any, shaderProgramKey: string): any;
        private resize;
    }
    enum ConnectionState {
        Ready = 0,
        Connecting = 1,
        Connected = 2,
        Error = 3
    }
    abstract class ServerConnection {
        protected state: ConnectionState;
        protected handleConnected: (event: Event) => void;
        protected handleMessage: (Event: MessageEvent) => void;
        readonly IsConnected: boolean;
        constructor();
        abstract connect(): any;
        abstract disconnect(): any;
        abstract send(data: any): any;
        onMessage(callback: (event: MessageEvent) => void): void;
        onConnected(callback: (event: Event) => void): void;
    }
    class SignalRServerConnection extends ServerConnection {
        private connection;
        constructor();
        connect(): void;
        disconnect(): void;
        send(data: any): void;
    }
    class WebSocketServerConnection extends ServerConnection {
        private websocket;
        connect(url?: string): void;
        disconnect(): void;
        send(data: any): void;
    }
    class Tool {
        protected interfaceController: InterfaceController;
        enter(interfaceController: InterfaceController): void;
        leave(): void;
        handleKeyUp(e: JQuery.Event): boolean;
        handleMouseMove(e: JQuery.Event, x: number, y: number): void;
        handleMouseDown(e: JQuery.Event): void;
        handleMouseUp(e: JQuery.Event): void;
        handleDrag(e: JQuery.Event, startX: number, startY: number, dX: number, dY: number): void;
        handleMouseWheel(e: JQuery.Event): void;
        handleClick(e: JQuery.Event, x: number, y: number): void;
    }
    class InterfaceController {
        private tools;
        private hasTool;
        readonly CurrentTool: Tool;
        private leftButton;
        private leftButtonDown;
        private startX;
        private startY;
        private lastX;
        private lastY;
        private target;
        onMove: (e: JQuery.Event, x: number, y: number) => void;
        onDrag: (e: JQuery.Event, dX: number, dY: number) => void;
        onMouseWheel: (e: JQuery.Event) => void;
        constructor();
        bindEvents(target: JQuery): void;
        private updateLastPosition;
        pushTool(tool: Tool): void;
        popTool(): void;
        private keyUp;
        private mouseDown;
        private mouseMove;
        private mouseUp;
        private drag;
        private mouseWheel;
    }
    class CameraController {
        private stage;
        private camera;
        private connection;
        private radius;
        private yaw;
        private pitch;
        private center;
        private dragDivisor;
        private rotateDivisor;
        Yaw: number;
        constructor(stage: StageWebGL, camera: CameraWebGL, interfaceController: InterfaceController, connection: ServerConnection);
        construct(radius: number, pitch: number, yaw: number): void;
        private mouseWheel;
        private move;
        private drag;
        private getViewPlaneX;
        private getViewPlaneY;
        private getViewDir;
        private getCameraPos;
        private updateCamera;
    }
    class CommonMessageTypes {
        static AppStateDelta: number;
        static ServerHandshake: number;
        static ClientHandshake: number;
        static ClientConfirmation: number;
        static AppStateInitialization: number;
        static AnchorRequest: number;
        static SharedAnchor: number;
    }
    class NetworkChannelMessage {
        static HeaderSize: number;
        private messageType;
        private content;
        readonly Content: Uint8Array;
        readonly MessageType: number;
        static FromBuffer(buffer: Uint8Array): NetworkChannelMessage;
        readonly HasPayload: boolean;
        readonly PayloadSize: number;
    }
}
