/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.

import { psgeometry } from './ps-geometry';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr';
//import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';
import JQuery from 'jquery';

export module modelstageweb {

    export function uuidv4(): string {

        let crypto = window.crypto || (<any>window).msCrypto;

        return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }

    export class ToolsWebGL {

        private stage: StageWebGL;
         
        constructor(stage: StageWebGL) {
            this.stage = stage;
        }

        public createShader(shaderType: GLenum, shaderSource: string): WebGLShader {
            let shader = this.stage.gl.createShader(shaderType);

            this.stage.gl.shaderSource(shader, shaderSource);
            this.stage.gl.compileShader(shader);

            console.log(this.stage.gl.getShaderInfoLog(shader));

            return shader;
        }
    }

    export class BlockStreamBlockDescriptor {

        private blockType: string;

        private majorVersion: number;

        private minorVersion: number;

        private flags: number;

        private payloadBytes: number;

        public get BlockType() {
            return this.blockType;
        }

        public set BlockType(value: string) {
            this.blockType = value;
        }

        public get MajorVersion() {
            return this.majorVersion;
        }

        public set MajorVersion(value: number) {
            this.majorVersion = value;
        }

        public get MinorVersion() {
            return this.minorVersion;
        }

        public set MinorVersion(value: number) {
            this.minorVersion = value;
        }

        public get Flags() {
            return this.flags;
        }

        public set Flags(value: number) {
            this.flags = value;
        }

        public get PayloadBytes() {
            return this.payloadBytes;
        }

        public set PayloadBytes(value: number) {
            this.payloadBytes = value;
        }
    }

    export enum BlockStreamReaderStates {
        FILE_HEADER_EXPECTED = 0,
        BLOCK_DESCRIPTOR_EXPECTED = 1,
        PAYLOAD_EXPECTED = 2
    }

    export class BlockStreamReader {

        private arrayBuffer: ArrayBuffer = null;

        private byteArray: Uint8Array = null;

        private currentPos: number = 0;

        private currentBlockDescriptor: BlockStreamBlockDescriptor;

        private blockEnd: number = 0;

        private isComplete: boolean = false;

        private fatalError: boolean = false;

        private state: BlockStreamReaderStates = BlockStreamReaderStates.FILE_HEADER_EXPECTED;

        public get CurrentBlockDescriptor() {
            return this.currentBlockDescriptor;
        }

        public get FatalError() {
            return this.fatalError;
        }

        constructor(buffer: ArrayBuffer) {
            this.arrayBuffer = buffer;
            this.byteArray = new Uint8Array(buffer);

            this.assureFileHeader();
        }

        public remainingBytesInBlock(): number {
            return this.blockEnd - this.currentPos;
        }

        public assureRemainingBytesInBlock(count: number): boolean {
            return this.currentPos + count <= this.blockEnd;
        }

        public readBytes(count: number): ArrayBuffer
        {
            return this.arrayBuffer.slice(this.currentPos, this.currentPos + count); 
        }

        public tryReadInt16(lambda: (value: number) => void): boolean {
            let result = this.assureRemainingBytesInBlock(2);

            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256);
            }

            return result;
        }

        public tryReadFloat(lambda: (value: number) => void): boolean {
            let result = this.assureRemainingBytesInBlock(4);

            if (result) {
                let buf = new ArrayBuffer(4);
                let view = new DataView(buf);
                view.setUint8(0, this.byteArray[this.currentPos++]);
                view.setUint8(1, this.byteArray[this.currentPos++]);
                view.setUint8(2, this.byteArray[this.currentPos++]);
                view.setUint8(3, this.byteArray[this.currentPos++]);

                //let view = new DataView(this.byteArray.buffer, this.currentPos, 4);
                lambda(view.getFloat32(0, true));
                //this.currentPos += 4;
            }

            return result;
        }

        public tryReadInt(lambda: (value: number) => void): boolean {
            let result = this.assureRemainingBytesInBlock(4);

            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256 +
                    this.byteArray[this.currentPos++] * 65536 +
                    this.byteArray[this.currentPos++] * 16777216);
            }

            return result;
        }

        public tryReadInt64(lambda: (value: number) => void): boolean {
            let result = this.assureRemainingBytesInBlock(8);

            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256 +
                    this.byteArray[this.currentPos++] * 65536 +
                    this.byteArray[this.currentPos++] * 16777216 +
                    this.byteArray[this.currentPos++] * 4294967296 +
                    this.byteArray[this.currentPos++] * 1099511627776 +
                    this.byteArray[this.currentPos++] * 281474976710656 +
                    this.byteArray[this.currentPos++] * 72057594037927936);
            }

            return result;
        }

        public tryReadString(lambda: (value: string) => void): boolean {
            let result = false;


            this.tryReadInt((stringLength) => {
                let value: string = '';

                if (this.assureRemainingBytesInBlock(stringLength)) {
                    
                    for (let i: number = 0; i < stringLength; ++i) {
                        value += String.fromCharCode(this.byteArray[this.currentPos++]);
                    }
                }

                lambda(value);

                result = true;
            });

            return result;
        }

        public readString(): string {
            let result: string = '';
            this.tryReadString((value) => { result = value; });
            return result;
        }

        public readMatrix4(): psgeometry.Matrix4 {
            let result = new psgeometry.Matrix4();
            for (let i = 0; i < 16; ++i) {
                this.tryReadFloat((val) => { result.elements[i] = val; });
            }
            return result.transpose();
        }

        private internalReadString(startPos: number, length: number): string {
            let result: string = '';
            for (let i: number = 0; i < length; ++i) {
                result += String.fromCharCode(this.byteArray[startPos + i]);
            }
            return result;
        }

        private internalReadInt(startPos: number): number {
            return this.byteArray[startPos] +
                this.byteArray[startPos + 1] * 256 +
                this.byteArray[startPos + 2] * 65536 +
                this.byteArray[startPos + 3] * 16777216;
        }

        private assureFileHeader() {
            if (this.byteArray.byteLength >= 8) {
                if (this.byteArray[0] == 0x70 && // ="psblstr1"
                    this.byteArray[1] == 0x73 &&
                    this.byteArray[2] == 0x62 &&
                    this.byteArray[3] == 0x6C &&
                    this.byteArray[4] == 0x73 &&
                    this.byteArray[5] == 0x74 &&
                    this.byteArray[6] == 0x72 &&
                    this.byteArray[7] == 0x31) {
                    this.currentPos += 8;
                    this.state = BlockStreamReaderStates.BLOCK_DESCRIPTOR_EXPECTED;
                } else {
                    this.fatalError = true;
                }
            } else {
                this.fatalError = this.isComplete;
            }
        }

        public enterBlock(): { success: boolean, descriptor: BlockStreamBlockDescriptor } {
            let result: { success: boolean, descriptor: BlockStreamBlockDescriptor } = { success: false, descriptor: null };

            if (this.byteArray.byteLength >= this.currentPos + 5) {
                if (this.byteArray[this.currentPos] == 0x70 && // = "psbl"
                    this.byteArray[this.currentPos + 1] == 0x73 &&
                    this.byteArray[this.currentPos + 2] == 0x62 &&
                    this.byteArray[this.currentPos + 3] == 0x6C) {
                    let blockTypeLength = this.byteArray[this.currentPos + 4];
                    if (this.byteArray.byteLength >= this.currentPos + 5 + blockTypeLength + 8) {
                        // read the descriptor from stream
                        result.descriptor = new BlockStreamBlockDescriptor();
                        result.descriptor.BlockType = this.internalReadString(this.currentPos + 5, blockTypeLength);
                        result.descriptor.MajorVersion = this.byteArray[this.currentPos + 5 + blockTypeLength];
                        result.descriptor.MinorVersion = this.byteArray[this.currentPos + 5 + blockTypeLength + 1];
                        result.descriptor.Flags = this.byteArray[this.currentPos + 5 + blockTypeLength + 2] * 256 + this.byteArray[this.currentPos + 5 + blockTypeLength + 3];
                        result.descriptor.PayloadBytes = this.internalReadInt(this.currentPos + 5 + blockTypeLength + 4);
                        this.state = BlockStreamReaderStates.PAYLOAD_EXPECTED;
                        this.currentPos += 5 + blockTypeLength + 8;
                        this.blockEnd = this.currentPos + result.descriptor.PayloadBytes;

                        this.currentBlockDescriptor = result.descriptor;

                        result.success = true;
                    } else {
                        // there are too few bytes to make a full block descriptor, but the stream is completely read
                        this.fatalError = this.isComplete;
                    }
                } else {
                    // no valid block header found
                    this.fatalError = true;
                }
            } else {
                // there are too few bytes to make a block header, but the stream is completely read 
                this.fatalError = this.isComplete && (this.byteArray.byteLength > this.currentPos);
            }

            return result;
        }

        public leaveBlock() {
            this.currentPos = this.blockEnd;
            this.state = BlockStreamReaderStates.BLOCK_DESCRIPTOR_EXPECTED;
        }
    }

    export class ShaderInstance {

        private shaderKey: string;

        private references: { [index: string]: string } = {};

        private figureID: string;

        public get FigureID() {
            return this.figureID;
        }

        public set FigureID(value: string) {
            this.figureID = value;
        }

        public get ShaderKey() {
            return this.shaderKey;
        }

        public set ShaderKey(value: string) {
            this.shaderKey = value;
        }

        public getReference(key: string) {
            return this.references[key];
        }

        constructor(shaderKey: string) {
            this.shaderKey = shaderKey;
        }

        public construct(reader: BlockStreamReader) {
        }

        public addReference(key: string, value: string) {
            this.references[key] = value;
        }
    }

    export class MeshShaderInstance extends ShaderInstance {

        SIZE_OF_FLOAT = 4;

        protected bufferID: string;

        protected priority: number;

        constructor(shaderKey: string) {
            super(shaderKey);
        }

        public construct(reader: BlockStreamReader) {
            if (!reader.tryReadString((id) => { this.bufferID = id; })) {
                this.bufferID = '_default';
            }
            if (!reader.tryReadInt16((priority) => { this.priority = priority; })) {
                this.priority = 0;
            }
        }

        public getStride(): number {
            return this.ShaderKey == 'TransparentMeshShader' ? 10 * this.SIZE_OF_FLOAT : 9 * this.SIZE_OF_FLOAT;
        }

    }

    export class TexturedMeshShaderInstance extends MeshShaderInstance {

        protected textureID: string;

        public get TextureID() {
            return this.textureID;
        }

        constructor(shaderKey: string) {
            super(shaderKey);
        }

        public construct(reader: BlockStreamReader) {
            let result = reader.tryReadString((textureID) => { this.textureID = textureID; });

            if (result) {
                this.addReference('TextureBuffer', this.textureID);

                super.construct(reader);
            }
        }

        public getStride(): number {
            return 11 * this.SIZE_OF_FLOAT;
        }

    }

    function ShaderInstanceFromReader(reader: BlockStreamReader): ShaderInstance {
        let result: ShaderInstance = null;

        let shaderKey;
        if (reader.tryReadString((key) => { shaderKey = key; })) {
            if (shaderKey == 'OpaqueMeshShader' || shaderKey == 'TransparentMeshShader') {
                result = new MeshShaderInstance(shaderKey);
            }
            else if (shaderKey == 'TexturedMeshShader') {
                result = new TexturedMeshShaderInstance(shaderKey);
            }

            if (result) {
                result.construct(reader);
            }
        }

        return result;
    }

    export class Mesh3DLib {
        private rootNode: NodeAsset;

        public constructor(private objectNamePrefix: string) {
        }

        public setRootNode(rootNode: NodeAsset) {
            this.rootNode = rootNode;
        }

        public getNodeFromPath(path: string): NodeAsset {
            if (path.length == 0 || !this.rootNode || this.rootNode.Name == path) {
                return this.rootNode;
            }
            else {
                return this.rootNode.getChildNodeFromPath(path.substr(this.rootNode.Name.length));
            }
        }

    }

    export class AssetFactoryWebGL {

        private lastPercentage = -1;

        private stage: StageWebGL;

        private currentFigure: FigureWebGL;

        private currentShaderInstance: ShaderInstance;

        private currentSceneMesh3DLib: Mesh3DLib;

        constructor(stage: StageWebGL) {
            this.stage = stage;
        }

        protected createFigure(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL) {
            this.currentFigure = new FigureWebGL(reader.readString());

            if (this.currentSceneMesh3DLib) {
                reader.tryReadString((nodePath) => {
                    this.currentFigure.Node = this.currentSceneMesh3DLib.getNodeFromPath(nodePath);
                });
            }


            assetStore.addFigure(this.currentFigure);
            return true;
        }

        protected createMesh(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL) {
            let result: boolean = false;

            this.currentShaderInstance = ShaderInstanceFromReader(reader);

            if (this.currentShaderInstance && this.currentFigure) {
                this.currentFigure.addShaderInstance(this.currentShaderInstance);
                result = true;
            }

            return result;
        }

        protected createMeshBuffer(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL) {
            let bufferAsset = new BufferAssetWebGL(reader, 'VertexBuffer', false);
            let currentID: string = bufferAsset.BufferID;
            let counter = 1;
            while (assetStore.getBufferAsset(currentID)) {
                currentID = bufferAsset.BufferID + counter++;
            }
            bufferAsset.BufferID = currentID;
            assetStore.addBufferAsset(currentID, bufferAsset);

            if (this.currentShaderInstance && this.currentFigure) {
                // extract triangles from vertex buffer, this information is used by Octree to determine triangle data from triangle indices stored in Octree data structure.
                // this.currentShaderInstance.pushTriangles(this.currentFigure.getTriangles(), bufferAsset.getBufferData(), bufferAsset.getBufferSize());
            }

            bufferAsset.initialize(stage);

            if (this.currentShaderInstance) {
                this.currentShaderInstance.addReference('VertexBuffer', bufferAsset.BufferID);
            }
        }

        protected createMeshIndicesBuffer(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL) {
            let bufferAsset = new BufferAssetWebGL(reader, 'IndexBuffer', true);
            let currentID = bufferAsset.BufferID;
            let counter = 1;
            while (assetStore.getBufferAsset(currentID)) {
                currentID = bufferAsset.BufferID + counter++;
            }
            bufferAsset.BufferID = currentID;
            assetStore.addBufferAsset(currentID, bufferAsset);

            bufferAsset.initialize(stage);

            if (this.currentShaderInstance) {
                this.currentShaderInstance.addReference('IndexBuffer', bufferAsset.BufferID);
            }
        }

        protected createTexture(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL, deferreds: Array<JQuery.Deferred<boolean>>) {
            let textureName: string; 
            let pixelDataSize;
            if (reader.tryReadString((value) => { textureName = value; }) && reader.tryReadInt64((value) => { pixelDataSize = value; })) {
                let imageData = reader.readBytes(pixelDataSize);
                let extension = textureName.substr(textureName.lastIndexOf('.')).toLowerCase();
                let imageType = 'jpeg';
                if (extension == '.png') {
                    imageType = 'png';
                }
                let blob = new Blob([imageData], { 'type': 'image/' + imageType });
                let url = URL.createObjectURL(blob);
                let image = new Image();

                let deferred = JQuery.Deferred();
                deferreds.push(deferred);
                image.onload = () => {
                    this.stage.AssetStore.addTextureAsset(textureName, new TextureAssetWebGL(this.stage, image));
                    deferred.resolve();
                }
                image.onerror = () => {
                    console.error('Error processing texture blob ' + textureName);
                    deferred.reject();
                }
                image.src = url;
            }
        }

        protected createOctree(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL) {
            this.currentFigure.setIntersector(Octree.CreateFromBlockStream(reader));
        }

        protected createScene(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL) {
            this.currentSceneMesh3DLib = new Mesh3DLib(reader.readString());
        }

        protected createRootNode(reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL) {
            if (this.currentSceneMesh3DLib) {
                let rootNode = NodeAsset.FromBlockStream(reader, this.currentSceneMesh3DLib);
                this.currentSceneMesh3DLib.setRootNode(rootNode);
                this.stage.AssetStore.addRootNode(rootNode);
            }
        }

        private processBlock(blockType: string, reader: BlockStreamReader, stage: StageWebGL, assetStore: AssetStoreWebGL, deferreds: Array<JQuery.Deferred<boolean>>) {
            if (blockType == 'PSScene') {
                this.createScene(reader, stage, assetStore);
            }
            else if (blockType == 'PSFigure') {
                this.createFigure(reader, stage, assetStore);
            }
            else if (blockType == 'PSMesh') {
                this.createMesh(reader, stage, assetStore);
            }
            else if (blockType == 'PSMeshData') {
                this.createMeshBuffer(reader, stage, assetStore);
            }
            else if (blockType == 'PSMeshIndices') {
                this.createMeshIndicesBuffer(reader, stage, assetStore);
            }
            else if (blockType == 'PSTexture') {
                this.createTexture(reader, stage, assetStore, deferreds);
            }
            else if (blockType == 'PSMeshOctree') {
                this.createOctree(reader, stage, assetStore);
            }
            else if (blockType == 'PSRootNode') {
                this.createRootNode(reader, stage, assetStore);
            }

        }

        private loadFromArrayBuffer(buffer: ArrayBuffer): JQuery.Deferred<boolean> {
            let deferreds: Array<JQuery.Deferred<boolean>> = [];

            let assetStore = this.stage.AssetStore;

            let reader: BlockStreamReader = new BlockStreamReader(buffer);
            try {
                let res = reader.enterBlock();
                while (res.success) {
                    this.processBlock(res.descriptor.BlockType, reader, this.stage, assetStore, deferreds);
                    reader.leaveBlock();
                    res = reader.enterBlock();
                }
            }
            catch (error) {
                console.log(JSON.stringify(error));
            }

            return JQuery.when.apply(JQuery, deferreds);
        }

        public getFromUrl(url: string): JQuery.Deferred<Boolean> {
            let deferred: JQuery.Deferred<Boolean> = JQuery.Deferred();

            let req: XMLHttpRequest = new XMLHttpRequest();

            req.open('GET', url, true);
            req.responseType = 'arraybuffer';

            req.onload = (event) => {
                this.loadFromArrayBuffer(<ArrayBuffer>req.response).done(() => {
                    deferred.resolve(true);
                });
            };

            req.onerror = (event) => {
                deferred.reject(event);
            };

            req.addEventListener('progress', (oEvent) => {
                if (oEvent.lengthComputable) {
                    let percentComplete = oEvent.loaded / oEvent.total;
                    if (this.lastPercentage != Math.floor(percentComplete * 100)) {
                        this.lastPercentage = Math.floor(percentComplete * 100);
                        deferred.notify(Math.round(percentComplete * 100));
                    }
                } else {
                    // Unable to compute progress information since the total size is unknown
                }
            });

            req.send(null);

            return deferred;
        }

    }

    export interface Intersector {
        getBoundingBox(): psgeometry.AABB3D;
    }

    export class BoundingBoxIntersector implements Intersector {
        constructor(private boundingBox: psgeometry.AABB3D) {
        }

        public getBoundingBox(): psgeometry.AABB3D {
            return this.boundingBox;
        }
    }

    export class Octree implements Intersector {
        private boundingBox = new psgeometry.AABB3D();

        static CreateFromBlockStream(reader: BlockStreamReader): Octree {
            let octree = new Octree();
            let x0, y0, z0, x1, y1, z1;
            let levels;
             
            if (reader.tryReadInt((val) => { levels = val; }) &&
                reader.tryReadFloat((val) => x0 = val) &&
                reader.tryReadFloat((val) => y0 = val) &&
                reader.tryReadFloat((val) => z0 = val) &&
                reader.tryReadFloat((val) => x1 = val) &&
                reader.tryReadFloat((val) => y1 = val) &&
                reader.tryReadFloat((val) => z1 = val)) {
                octree.boundingBox.addPoint(x0, y0, z0);
                octree.boundingBox.addPoint(x1, y1, z1);
            }
            
            return octree;
        }

        public getBoundingBox(): psgeometry.AABB3D {
            return this.boundingBox;
        }

    }

    export class FigureWebGL {

        private figureID: string;

        private shaderInstances: ShaderInstance[] = [];

        private intersector: Intersector;

        private node: NodeAsset;

        public get Node() {
            return this.node;
        }

        public set Node(value: NodeAsset) {
            this.node = value;
        }

        public get FigureID() {
            return this.figureID;
        }

        public get ShaderInstances() {
            return this.shaderInstances;
        }

        constructor(figureID: string) {
            this.figureID = figureID;
        }

        public getBoundingBox(): psgeometry.AABB3D {
            if (this.intersector) {
                return this.Node ? this.intersector.getBoundingBox().transform(this.Node.AbsoluteTransformation) : this.intersector.getBoundingBox();
            } else {
                return new psgeometry.AABB3D();
            }
        }

        public addShaderInstance(shaderInstance: ShaderInstance) {
            this.shaderInstances.push(shaderInstance);
        }

        public render(context: RenderContextWebGL) {
            let stage = context.Stage;

            this.shaderInstances.forEach((shaderInstance) => {
                shaderInstance.FigureID = this.figureID;
                let shaderProgram = stage.getShaderProgram(context, shaderInstance.ShaderKey);
                if (shaderProgram) {
                    context.ShaderProgram = shaderProgram;
                    context.NodeTransform = this.Node ? this.Node.AbsoluteTransformation : null;
                    shaderProgram.render(context, shaderInstance);
                }
            });
        }

        public setIntersector(intersector: Intersector) {
            this.intersector = intersector;
        }

        public intersectsBoundingBox(ray: psgeometry.Line3D, at: psgeometry.Vec3) {
            let result = false;
            if (this.intersector) {
                let intersectionPoint = this.intersector.getBoundingBox().intersectsRay(ray);
                if (intersectionPoint) {
                    at.assignVec(intersectionPoint);
                    result = true
                }
            }
            return result;
        }
    }

    export class AnimationTransformation {
        public static FromBlockStream(reader: BlockStreamReader, mesh3DLib: Mesh3DLib): AnimationTransformation {
            return null;
        }
    }

    export class NodeAsset {
        private name: string;

        private parentNode: NodeAsset;

        private childNodes: { [index: string]: NodeAsset } = {};

        private localTransformation: psgeometry.Matrix4;

        private absoluteTransformation: psgeometry.Matrix4;

        public get Name() {
            return this.name;
        }

        public get AbsoluteTransformation() {
            return this.absoluteTransformation;
        }

        public get LocalTransformation() {
            return this.localTransformation;
        }

        public getChildNodeFromPath(path: string) {
            for (let child in this.childNodes) {
                if (path == this.childNodes[child].Name) {
                    return this.childNodes[child];
                }
            }
            for (let child in this.childNodes) {
                if (path.substring(0, this.childNodes[child].Name.length) == this.childNodes[child].Name) {
                    return this.childNodes[child].getChildNodeFromPath(path.substr(this.childNodes[child].Name.length));
                }
            }
            return null;
        }


        public static FromBlockStream(reader: BlockStreamReader, mesh3DLib: Mesh3DLib, parentNode?: NodeAsset): NodeAsset {
            let result = new NodeAsset();

            result.name = reader.readString();
            result.localTransformation = reader.readMatrix4();
            result.absoluteTransformation = NodeAsset.calculateAbsoluteTransformation(result.localTransformation, parentNode);
            result.parentNode = parentNode;
            result.readChildNodes(reader, mesh3DLib);
            result.readAnimationTransformations(reader, mesh3DLib);

            return result;
        }

        private static calculateAbsoluteTransformation(localTransformation: psgeometry.Matrix4, parentNode: NodeAsset): psgeometry.Matrix4 {
            if (parentNode) {
                return <psgeometry.Matrix4>localTransformation.multiply(parentNode.AbsoluteTransformation);
            }
            else {
                return localTransformation;
            }
        }

        private readChildNodes(reader: BlockStreamReader, mesh3DLib: Mesh3DLib) {
            reader.tryReadInt((childNameCount) => {
                for (let i = 0; i < childNameCount; ++i) {
                    this.addChildNode(NodeAsset.FromBlockStream(reader, mesh3DLib, this));
                }
            });
        }

        private readAnimationTransformations(reader: BlockStreamReader, mesh3DLib: Mesh3DLib) {
            reader.tryReadInt((numAnimationTransformations) => {
                for (let i = 0; i < numAnimationTransformations; ++i) {
                    this.addAnimationTransformation(AnimationTransformation.FromBlockStream(reader, mesh3DLib));
                }
            });
        }

        private addChildNode(node: NodeAsset) {
            this.childNodes[node.Name] = node;
        } 

        private addAnimationTransformation(animationTransformation: AnimationTransformation) {

        }
    }

    export class BufferAssetWebGL {

        private bufferID: string;

        private bufferSize: number = 0;

        public bufferData: ArrayBuffer | SharedArrayBuffer;

        private webGLBuffer: WebGLBuffer;

        private isElementBuffer: boolean = false;

        public get BufferID() {
            return this.bufferID;
        }

        public set BufferID(value: string) {
            this.bufferID = value;
        }

        public get Buffer() {
            return this.webGLBuffer;
        }

        public get BufferSize() {
            return this.bufferSize;
        }

        public set BufferSize(value: number) {
            this.bufferSize = value;
        }

        constructor(reader: BlockStreamReader, bufferID: string, isElementBuffer: boolean) {
            this.bufferID = bufferID;
            this.isElementBuffer = isElementBuffer;

            if (reader) {
                let descriptor = reader.CurrentBlockDescriptor;
                if (descriptor) {

                    // read additional meta data if available
                    if (descriptor.MajorVersion > 1) {
                        this.bufferID = reader.readString();
                    }

                    this.bufferSize = reader.remainingBytesInBlock();
                    this.bufferData = reader.readBytes(this.bufferSize);
                }
            }
        }

        public initialize(stage: StageWebGL) {
            this.webGLBuffer = stage.gl.createBuffer();

            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ELEMENT_ARRAY_BUFFER, <ArrayBuffer>this.bufferData, stage.gl.STATIC_DRAW);
            } else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ARRAY_BUFFER, <ArrayBuffer>this.bufferData, stage.gl.STATIC_DRAW);
            }
        }

        public bind(stage: StageWebGL) {
            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
            } else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
            }
        }

        public bindInterleaved(stage: StageWebGL, attributeLocation: number, size: number, stride: number, offset: number) {
            if (attributeLocation >= 0) {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.enableVertexAttribArray(attributeLocation);
                stage.gl.vertexAttribPointer(attributeLocation, size, stage.gl.FLOAT, false, stride, offset);
            }
        }

    }

    export class OpaqueMeshBuilder {

        private vertices: Array<number> = [];

        private indices: Array<number> = [];

        private vertBufferAsset: BufferAssetWebGL;

        private indBufferAsset: BufferAssetWebGL;

        constructor() {
        }

        public addTri(x0: number, y0: number, z0: number,
            x1: number, y1: number, z1: number,
            x2: number, y2: number, z2: number,
            r: number, g: number, b: number, doubleSided?: boolean) {

            this.vertices.push(
                x0, y0, z0, 0, 0, 1, r, g, b,
                x1, y1, z1, 0, 0, 1, r, g, b,
                x2, y2, z2, 0, 0, 1, r, g, b);

            let i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);

            if (doubleSided) {
                this.vertices.push(
                    x1, y1, z1, 0, 0, 1, r, g, b,
                    x0, y0, z0, 0, 0, 1, r, g, b,
                    x2, y2, z2, 0, 0, 1, r, g, b);

                i = this.indices.length;
                this.indices.push(i, i + 1, i + 2);
            }
        }

        public addQuad(x0: number, y0: number, z0: number,
            x1: number, y1: number, z1: number,
            x2: number, y2: number, z2: number,
            x3: number, y3: number, z3: number,
            r: number, g: number, b: number, doubleSided?: boolean) {

            this.addTri(x0, y0, z0,
                x1, y1, z1,
                x2, y2, z2,
                r, g, b, doubleSided);
            this.addTri(x0, y0, z0,
                x2, y2, z2,
                x3, y3, z3,
                r, g, b, doubleSided);
        }

        public addStroke(x0: number, y0: number, z0: number,
            x1: number, y1: number, z1: number,
            r: number, g: number, b: number) {

            let dir = new psgeometry.Vec3(x1, y1, z1).sub(new psgeometry.Vec3(x0, y0, z0));
            let radius = dir.norm();
            let azimuth = Math.atan2(-dir.z, dir.x);
            let polar = Math.asin(dir.y / radius);

            let thickness = .01;
            let up = <psgeometry.Vec4>psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, thickness, 0, 1));
            let front = <psgeometry.Vec4>psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, 0, thickness, 1));

            this.addQuad(x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z,
                x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z,
                x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z,
                x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z,
                r, g, b);

            this.addQuad(x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z,
                x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z,
                x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z,
                x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z,
                r, g, b);

            this.addQuad(x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z,
                x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z,
                x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z,
                x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z,
                r, g, b);

            this.addQuad(x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z,
                x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z,
                x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z,
                x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z,
                r, g, b);

        }

        public initialize(stage: StageWebGL) {
            let vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 9 * 4;

            let indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;

            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        }

        public createFigure(stage: StageWebGL, figureID: string): FigureWebGL {
            this.indBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_indices', true);
            this.vertBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_vertices', false);

            this.initialize(stage);

            stage.AssetStore.addBufferAsset(figureID + '_indices', this.indBufferAsset);
            stage.AssetStore.addBufferAsset(figureID + '_vertices', this.vertBufferAsset);

            let shaderInstance = new modelstageweb.MeshShaderInstance('OpaqueMeshShader');
            shaderInstance.addReference('IndexBuffer', figureID + '_indices');
            shaderInstance.addReference('VertexBuffer', figureID + '_vertices');

            let figure = new modelstageweb.FigureWebGL(figureID);
            figure.addShaderInstance(shaderInstance);

            return figure;
        }
    }

    export class TransparentMeshBuilder {

        private vertices: Array<number> = [];

        private indices: Array<number> = [];

        constructor(protected vertBufferAsset: BufferAssetWebGL, protected indBufferAsset: BufferAssetWebGL) {
        }

        public addTri(x0: number, y0: number, z0: number,
            x1: number, y1: number, z1: number,
            x2: number, y2: number, z2: number,
            r: number, g: number, b: number, a: number, twoSided?: boolean) {

            this.vertices.push(
                x0, y0, z0, 0, 0, 1, r, g, b, a,
                x1, y1, z1, 0, 0, 1, r, g, b, a,
                x2, y2, z2, 0, 0, 1, r, g, b, a);

            let i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);

            if (twoSided) {
                this.addTri(x0, y0, z0,
                    x2, y2, z2,
                    x1, y1, z1,
                    r, g, b, a);
            }
        }

        public addQuad(x0: number, y0: number, z0: number,
            x1: number, y1: number, z1: number,
            x2: number, y2: number, z2: number,
            x3: number, y3: number, z3: number,
            r: number, g: number, b: number, a: number, twoSided?: boolean) {

            this.addTri(x0, y0, z0,
                x1, y1, z1,
                x2, y2, z2,
                r, g, b, a, twoSided);
            this.addTri(x0, y0, z0,
                x2, y2, z2,
                x3, y3, z3,
                r, g, b, a, twoSided);
        }

        public initialize(stage: StageWebGL) {
            let vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 10 * 4;

            let indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;

            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        }
    }

    export class TexturedMeshBuilder {

        private vertices: Array<number> = [];

        private indices: Array<number> = [];

        constructor(protected vertBufferAsset: BufferAssetWebGL, protected indBufferAsset: BufferAssetWebGL) {
        }

        public addTri(x0: number, y0: number, z0: number, u0: number, v0: number,
            x1: number, y1: number, z1: number, u1: number, v1: number,
            x2: number, y2: number, z2: number, u2: number, v2: number,
            r: number, g: number, b: number, twoSided?: boolean) {

            this.vertices.push(
                x0, y0, z0, 0, 0, 1, r, g, b, u0, v0,
                x1, y1, z1, 0, 0, 1, r, g, b, u1, v1,
                x2, y2, z2, 0, 0, 1, r, g, b, u2, v2);

            let i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);

            if (twoSided) {
                this.addTri(x0, y0, z0, u0, v0,
                    x2, y2, z2, u2, v2,
                    x1, y1, z1, u1, v1,
                    r, g, b);
            }
        }

        public addQuad(x0: number, y0: number, z0: number, u0: number, v0: number,
            x1: number, y1: number, z1: number, u1: number, v1: number,
            x2: number, y2: number, z2: number, u2: number, v2: number,
            x3: number, y3: number, z3: number, u3: number, v3: number,
            r: number, g: number, b: number, twoSided?: boolean) {

            this.addTri(x0, y0, z0, u0, v0,
                x1, y1, z1, u1, v1,
                x2, y2, z2, u2, v2,
                r, g, b, twoSided);
            this.addTri(x0, y0, z0, u0, v0,
                x2, y2, z2, u2, v2, 
                x3, y3, z3, u3, v3,
                r, g, b, twoSided);
        }

        public initialize(stage: StageWebGL) {
            let vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 11 * 4;

            let indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;

            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        }
    }

    export class TextureAssetWebGL {

        private texture: WebGLTexture;

        constructor(stage: StageWebGL, image: HTMLImageElement | WebGLTexture) {
            if (image instanceof WebGLTexture) {
                this.texture = image;
            } else {
                this.texture = stage.gl.createTexture();
                stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.texture);
                stage.gl.texImage2D(stage.gl.TEXTURE_2D, 0, stage.gl.RGBA, stage.gl.RGBA, stage.gl.UNSIGNED_BYTE, image);
                stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MAG_FILTER, stage.gl.LINEAR);
                stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MIN_FILTER, stage.gl.LINEAR_MIPMAP_NEAREST);
                stage.gl.generateMipmap(stage.gl.TEXTURE_2D);
                stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
            }
        }

        bind(stage: StageWebGL, program: ShaderProgramWebGL, attributeName: string) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.uniform1i(stage.gl.getUniformLocation(program.Program, attributeName), 0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.texture);
        }

        unbind(stage: StageWebGL, program: ShaderProgramWebGL, attributeName: string) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
        }

    }

    /// An asset store class for WebGL.
    export class AssetStoreWebGL {

        /// All aggregated figures.
        private figures: { [index: string]: FigureWebGL } = {};

        /// All aggregated nodes assets.
        private rootNodeAssets: { [index: string]: NodeAsset } = {};

        /// All aggregated buffer assets.
        private bufferAssets: { [index: string]: BufferAssetWebGL } = {};

        /// All aggregated texture assets.
        private textureAssets: { [index: string]: TextureAssetWebGL } = {};


        /// Adds the specified figure to the the store.
        public addFigure(figure: FigureWebGL) {
            this.figures[figure.FigureID] = figure;
        }

        /// Determines the figure with the the specified id.
        public getFigure(figureID: string): FigureWebGL {
            return this.figures[figureID];
        }

        /// Adds a buffer asset to the store.
        public addBufferAsset(bufferAssetID: string, bufferAsset: BufferAssetWebGL) {
            this.bufferAssets[bufferAssetID] = bufferAsset;
        }

        public addRootNode(node: NodeAsset) {
            this.rootNodeAssets[node.Name] = node;
        }

        /// Determines the buffer asset with the specified id.
        public getBufferAsset(bufferAssetID: string): BufferAssetWebGL {
            return this.bufferAssets[bufferAssetID];
        }

        /// Adds a texture asset to the store.
        public addTextureAsset(textureAssetID: string, textureAsset: TextureAssetWebGL) {
            this.textureAssets[textureAssetID] = textureAsset;
        }

        /// Determines the texture asset with the specified id.
        public getTextureAsset(textureAssetID: string): TextureAssetWebGL {
            return this.textureAssets[textureAssetID];
        }

        /// Returns the map of aggregated figures.
        public get Figures(): { [index: string]: FigureWebGL } {
            return this.figures;
        }

        public getRootNode(name: string): NodeAsset {
            return this.rootNodeAssets[name];
        }

    }

    export interface SceneItemFilterWebGL {
        passes(sceneItem: SceneItemWebGL, context: RenderContextWebGL);
    }

    export class GenericSceneItemFilterWebGL implements SceneItemFilterWebGL {
        passes(sceneItem: SceneItemWebGL, context: RenderContextWebGL) {
            return context.Phase != 'Shadow';
        }

    }

    export class SceneItemWebGL {

        protected scene: SceneWebGL;

        protected parent: SceneItemWebGL;

        protected sceneItemID: string;

        protected children: Array<SceneItemWebGL> = []

        protected childrenByKey: { [sceneItemID: string]: SceneItemWebGL } = {}

        protected isVisible: boolean;

        protected childrenVisible: boolean;

        protected testIntersection: boolean;

        protected testChildrenIntersection: boolean;

        protected filter: SceneItemFilterWebGL;

        private data: { [index: string]: any } = {};

        public get Data(): { [index: string]: any } {
            return this.data;
        }

        public get Scene() {
            return this.scene;
        }

        public get SceneItemID() {
            return this.sceneItemID;
        }

        public get Children() {
            return this.children;
        }

        public get TestChildrenIntersection() {
            return this.testChildrenIntersection;
        }

        public set TestChildrenIntersection(val: boolean) {
            this.testChildrenIntersection = val;
        }

        public get TestIntersection() {
            return this.testIntersection;
        }

        public set TestIntersection(val: boolean) {
            this.testIntersection = val;
        }

        public get Filter() { return this.filter; }

        public set Filter(value: SceneItemFilterWebGL) {
            this.filter = value;
        }

        constructor(scene: SceneWebGL, sceneItemID: string, isVisible?: boolean, testIntersection?: boolean, childrenVisible?: boolean, testChildrenIntersection?: boolean) {
            this.scene = scene;
            this.sceneItemID = sceneItemID;
            this.isVisible = isVisible || typeof isVisible === 'undefined';
            this.childrenVisible = childrenVisible || typeof childrenVisible === 'undefined';
            this.testIntersection = testIntersection || typeof testIntersection === 'undefined';
            this.testChildrenIntersection = testChildrenIntersection || typeof testChildrenIntersection === 'undefined';
        }

        public addChild(sceneItem: SceneItemWebGL) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.push(sceneItem);
            sceneItem.addedToSceneGraph(this);
        }

        public getChild(sceneItemID: string) {
            return this.childrenByKey[sceneItemID];
        }

        public removeChild(sceneItemID: string) {
            this.children = this.children.filter(sceneItem => sceneItem.sceneItemID != sceneItemID);
            delete this.childrenByKey[sceneItemID];
        }

        public insertChild(sceneItem: SceneItemWebGL, index: number) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.splice(index, 0, sceneItem);
            sceneItem.addedToSceneGraph(this);
        }

        protected beginRender(context: RenderContextWebGL) {
        }

        protected endRender(context: RenderContextWebGL) {
        }

        public render(context: RenderContextWebGL) {
            if (!this.filter || this.filter.passes(this, context)) {
                if (this.isVisible) {
                    this.beginRender(context);
                    this.renderChildren(context);
                    this.endRender(context);
                } else {
                    this.renderChildren(context);
                }
            }
        }

        protected renderChildren(context: RenderContextWebGL) {
            if (this.childrenVisible) {
                this.children.forEach((child) => {
                    child.render(context);
                });
            }
        }

        public addedToSceneGraph(parentSceneItem: SceneItemWebGL) {
            this.scene = parentSceneItem.scene;
            this.parent = parentSceneItem;
        }

        public intersectsBoundingBox(ray: psgeometry.Line3D, at: psgeometry.Vec3): Boolean {
            return false;
        } 

        protected isIntersectionCandidate(ray: psgeometry.Line3D, at: psgeometry.Vec3): Boolean {
            return this.intersectsBoundingBox(ray, at);
        }

        public addIntersectionCandidates(ray: psgeometry.Line3D, candidates: Array<IntersectionCandidate>) {
            if (this.testIntersection) {
                let at = new psgeometry.Vec3();
                if (this.isIntersectionCandidate(ray, at)) {
                    candidates.push(new IntersectionCandidate(this, at.squaredDist(ray.p0.asVec3())));
                }
            }
            if (this.testChildrenIntersection) {
                for (let i in this.children) {
                    this.children[i].addIntersectionCandidates(ray, candidates);
                }
            }
        }
    }

    export class ActorWebGL extends SceneItemWebGL {
        private figures: FigureWebGL[] = [];

        private lastModelTransform: psgeometry.Matrix4;

        private inverseModelTransform: psgeometry.Matrix4;

        private state: RenderState = new RenderState();

        public get State() {
            return this.state;
        }

        public get Figures() {
            return this.figures;
        }

        constructor(scene: SceneWebGL, actorID: string) {
            super(scene, actorID);
        }

        public addFigure(figure: FigureWebGL) {
            this.figures.push(figure);
        }

        public beginRender(context: RenderContextWebGL) {
            this.figures.forEach((figure) => {
                figure.render(context);
            });

        }

        public intersectsBoundingBox(ray: psgeometry.Line3D, at: psgeometry.Vec3): Boolean {
            let transformedRay = this.inverseModelTransform ? ray.transform(this.inverseModelTransform) : ray;

            let result = false;
            for (let figureIdx in this.figures)
            {
                if (!result) {
                    result = this.figures[figureIdx].intersectsBoundingBox(transformedRay, at);
                    if (result) {
                        at.assignVec(<psgeometry.Vec4>this.lastModelTransform.multiply(at.asVec4()));
                    }
                }
            }
            return result;
        }

        public render(context: RenderContextWebGL) {
            if (!this.filter || this.filter.passes(this, context)) {
                if (this.isVisible || this.childrenVisible) {
                    context.pushState(this.state);

                    if (this.isVisible) {
                        this.beginRender(context);
                        this.renderChildren(context);
                        this.endRender(context);
                    } else {
                        this.renderChildren(context);
                    }

                    let modelTransform = context.NodeTransform ? <psgeometry.Matrix4>context.NodeTransform.multiply(context.ModelTransform) : context.ModelTransform;
                    if (!modelTransform.equals(this.lastModelTransform)) {
                        this.inverseModelTransform = modelTransform.inverse();
                        this.lastModelTransform = modelTransform;
                    }

                    context.popState();
                }
            }
        }

    }

    export class IntersectionCandidate {
        public sceneItem: SceneItemWebGL;

        private squaredDist: number = Infinity;

        constructor(sceneItem: SceneItemWebGL, squaredDist: number) {
            this.sceneItem = sceneItem;
            this.squaredDist = squaredDist;
        }

        public compare(intersectionCandidate: IntersectionCandidate) {
            return this.squaredDist < intersectionCandidate.squaredDist ? -1 :
                (this.squaredDist > intersectionCandidate.squaredDist ? 1 : 0);
        }
    }

    export class RenderState {
        private parent: RenderState;

        private entries: { [key: string]: any } = {};

        public get Parent() {
            return this.parent;
        }

        public set Parent(val: RenderState) {
            this.parent = val;
        }

        private evaluate(entry: any): any {
            return typeof entry == 'function' ? entry(this) : entry;
        }

        public contains(key: string) {
            return this.entries[key] != undefined;
        }

        public get<T>(key: string, defaultValue: T): T {
            let result = defaultValue;
            this.tryGet(key, (val) => { result = val; });
            return result;
        }

        public tryGet(key: string, lambda: (val: any) => void): boolean {
            if (this.contains(key)) {
                lambda(this.evaluate(this.entries[key]));
                return true;
            } else {
                return this.parent == null ? false : this.parent.tryGet(key, lambda);
            }
        }

        public set(key: string, value: any) {
            this.entries[key] = value;
        }
    }

    export class SceneWebGL {

        private isInitialized: boolean = false;

        private sceneHierarchy: SceneItemWebGL = new SceneItemWebGL(this, '');

        private dirty = true;

        private state = new RenderState();

        public get SceneHierarchy() {
            return this.sceneHierarchy;
        }

        public get IsInitialized() {
            return this.isInitialized;
        }

        public set IsInitialized(value: boolean) {
            this.isInitialized = value;
        }

        public get State() {
            return this.state;
        }

        public initialize() {
        }

        public setDirty() {
            this.dirty = true;
        }

        public isDirty() {
            if (this.dirty) {
                this.dirty = false;
                return true;
            } else {
                return false;
            }
        }

        public render(context: RenderContextWebGL) {
            if (this.isInitialized) {

                context.SceneCategory = this.getSceneCategory();

                // updateRunningSequences(context);

                context.pushState(this.state);

                this.sceneHierarchy.render(context);

                context.popState();
            }
        }

        public addSceneItem(sceneItem: SceneItemWebGL, makeVisible: boolean) {
            this.sceneHierarchy.addChild(sceneItem);
            this.setDirty();
        }

        public getSceneItem(sceneItemID: string) {
            return this.sceneHierarchy.getChild(sceneItemID);
        }

        public removeSceneItem(sceneItemID: string) {
            this.sceneHierarchy.removeChild(sceneItemID);

            this.setDirty();
        }

        public insertSceneItem(sceneItem: SceneItemWebGL, index: number, makeVisible: boolean) {
            this.sceneHierarchy.insertChild(sceneItem, index);

            this.setDirty();
        }

        protected getSceneCategory() {
            return '';
        }

        public getIntersectionCandidates(ray: psgeometry.Line3D, candidates: Array<IntersectionCandidate>) {
            this.sceneHierarchy.addIntersectionCandidates(ray, candidates);
            candidates.sort((a, b) => { return a.compare(b); })
        }

        public beginFrame() {}

        /** Update is called periodically (once per frame) to allow updating the state of the scene.
          */
        public update() {}

        public endFrame() {}

    }

    export class Camera {
        protected projectionMatrix: psgeometry.Matrix4;

        protected inverseProjectionMatrix: psgeometry.Matrix4;

        protected viewMatrix: psgeometry.Matrix4;

        protected inverseViewMatrix: psgeometry.Matrix4;

        private dirty = true;

        public get ProjectionMatrix() { return this.projectionMatrix; }

        public get ViewMatrix() { return this.viewMatrix; }

        protected setDirty() {
            this.dirty = true;
        }

        public isDirty() {
            if (this.dirty) {
                this.dirty = false;
                return true;
            } else {
                return false;
            }
        }

        public createViewMatrix(eye: psgeometry.Vec3, center: psgeometry.Vec3, up: psgeometry.Vec3): psgeometry.Matrix4 {
            let z = eye.sub(center).normalize();
            let x = up.cross(z).normalize();
            let y = z.cross(x).normalize();

            let m = new psgeometry.Matrix4([x.x, x.y, x.z, 0,
            y.x, y.y, y.z, 0,
            z.x, z.y, z.z, 0,
                0, 0, 0, 1]);

            let t = new psgeometry.Matrix4([1, 0, 0, -eye.x,
                0, 1, 0, -eye.y,
                0, 0, 1, -eye.z,
                0, 0, 0, 1]);
            return <psgeometry.Matrix4>t.multiply(m);
        }

        public createPerspectiveMatrix(fovy, aspect, znear, zfar): psgeometry.Matrix4 {
            let ymax = znear * Math.tan(fovy * Math.PI / 360.0);
            let ymin = -ymax;
            let xmin = ymin * aspect;
            let xmax = ymax * aspect;

            return this.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
        }

        public createOrthographicMatrix(left, right, bottom, top, near, far): psgeometry.Matrix4 {
            return new psgeometry.Matrix4([
                2 / (right - left), 0, 0, 0,
                0, 2 / (top - bottom), 0, 0,
                0, 0, 2 / (near - far), 0,

                (left + right) / (left - right),
                (bottom + top) / (bottom - top),
                (near + far) / (near - far),
                1,
            ]);
        }

        public makeFrustum(left, right, bottom, top, znear, zfar): psgeometry.Matrix4 {
            let X: number = 2 * znear / (right - left);
            let Y: number = 2 * znear / (top - bottom);
            let A: number = (right + left) / (right - left);
            let B: number = (top + bottom) / (top - bottom);
            let C: number = -(zfar + znear) / (zfar - znear);
            let D: number = -2 * zfar * znear / (zfar - znear);

            return new psgeometry.Matrix4([
                X, 0, A, 0,
                0, Y, B, 0,
                0, 0, C, D,
                0, 0, -1, 0]);
        }

    }

    export class ShadowCameraWebGL extends Camera {

        private shadowMapWidth = 1024;

        private shadowMapHeight = 1024;

        private shadowFramebuffer;

        private shadowDepthTexture; 

        private renderBuffer;


        public resize(stage: StageWebGL) {

            this.projectionMatrix = this.createOrthographicMatrix(-5, 5, -5, 5, -30, 30);
            this.update(new psgeometry.Vec3(0, 10, 0), new psgeometry.Vec3(0, 0, 0), new psgeometry.Vec3(0, 0, -1));

            this.shadowFramebuffer = stage.gl.createFramebuffer();
            this.shadowDepthTexture = stage.gl.createTexture();
            this.renderBuffer = stage.gl.createRenderbuffer();

            let shadowTexture = new TextureAssetWebGL(stage, this.shadowDepthTexture);
            stage.AssetStore.addTextureAsset('Shadow', shadowTexture);

            stage.gl.bindFramebuffer(stage.gl.FRAMEBUFFER, this.shadowFramebuffer);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.shadowDepthTexture);
            stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MAG_FILTER, stage.gl.LINEAR);
            stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MIN_FILTER, stage.gl.LINEAR);
            stage.gl.texImage2D(stage.gl.TEXTURE_2D, 0, stage.gl.RGBA, this.shadowMapWidth, this.shadowMapHeight, 0, stage.gl.RGBA, stage.gl.UNSIGNED_BYTE, null);

            stage.gl.bindRenderbuffer(stage.gl.RENDERBUFFER, this.renderBuffer);
            stage.gl.renderbufferStorage(stage.gl.RENDERBUFFER, stage.gl.DEPTH_COMPONENT16, this.shadowMapWidth, this.shadowMapHeight);

            stage.gl.framebufferTexture2D(stage.gl.FRAMEBUFFER, stage.gl.COLOR_ATTACHMENT0, stage.gl.TEXTURE_2D, this.shadowDepthTexture, 0);
            stage.gl.framebufferRenderbuffer(stage.gl.FRAMEBUFFER, stage.gl.DEPTH_ATTACHMENT, stage.gl.RENDERBUFFER, this.renderBuffer);

            stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
            stage.gl.bindRenderbuffer(stage.gl.RENDERBUFFER, null); 
        }

        public updateShadowArea(bbox: psgeometry.AABB2D) {
            var center = bbox.center();
            var extents = bbox.extents();
            this.projectionMatrix = this.createOrthographicMatrix(-extents.x / 2, extents.x / 2, -extents.y / 2, extents.y / 2, -30, 30);
            this.update(new psgeometry.Vec3(center.x, 10, center.y), new psgeometry.Vec3(center.x, 0, center.y), new psgeometry.Vec3(0, 0, -1));
            this.setDirty();
        }

        public update(pos: psgeometry.Vec3, lookAt: psgeometry.Vec3, up: psgeometry.Vec3) {
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);

            this.setDirty();
        }

        public beginRender(stage: StageWebGL) {
            stage.gl.bindFramebuffer(stage.gl.FRAMEBUFFER, this.shadowFramebuffer);

            // Set the viewport to match
            stage.gl.viewport(0, 0, this.shadowMapWidth, this.shadowMapHeight);

            stage.gl.clearColor(0.2, 0.2, 0.2, 0.0);
            stage.gl.clearDepth(0.0);
            stage.gl.clear(stage.gl.COLOR_BUFFER_BIT | stage.gl.DEPTH_BUFFER_BIT);

            stage.gl.enable(stage.gl.DEPTH_TEST);
            stage.gl.enable(stage.gl.CULL_FACE);
            stage.gl.frontFace(stage.gl.CCW);
            stage.gl.cullFace(stage.gl.BACK);
            stage.gl.depthFunc(stage.gl.GEQUAL);
        }

        public endRender(stage: StageWebGL) {
        }

    }

    export class CameraWebGL extends Camera {

        private currentCameraPos: psgeometry.Vec3;

        private clientWidth: number = 1.0;

        private clientHeight: number = 1.0;


        public get ProjectionMatrix() {
            return this.projectionMatrix;
        }

        public get ViewMatrix() {
            return this.viewMatrix;
        }

        public resize(stage: StageWebGL) {
            let realToCSSPixels = window.devicePixelRatio || 1;

            this.clientWidth = stage.gl.canvas.clientWidth;
            this.clientHeight = stage.gl.canvas.clientHeight;

            // Lookup the size the browser is displaying the canvas in CSS pixels
            // and compute a size needed to make our drawingbuffer match it in
            // device pixels.
            let displayWidth = Math.floor(stage.gl.canvas.clientWidth * realToCSSPixels);
            let displayHeight = Math.floor(stage.gl.canvas.clientHeight * realToCSSPixels);

            // Make the canvas the same size
            stage.gl.canvas.width = displayWidth / realToCSSPixels;
            stage.gl.canvas.height = displayHeight / realToCSSPixels;

            this.projectionMatrix = this.createPerspectiveMatrix(45.0, stage.gl.canvas.clientWidth / stage.gl.canvas.clientHeight, 0.1, 200.0);
            //this.projectionMatrix = this.createOrthographicMatrix(-5, 5, -5, 5, -30, 30);
            this.inverseProjectionMatrix = this.projectionMatrix.inverse();
            //this.viewMatrix = this.createViewMatrix(new psgeometry.Vec3(0.0, 1.8, 15.0), new psgeometry.Vec3(0.0, 0.0, 0.0), new psgeometry.Vec3(0.0, 1.0, 0.0));

            this.setDirty();
        }

        public update(pos: psgeometry.Vec3, lookAt: psgeometry.Vec3, up: psgeometry.Vec3) {
            this.currentCameraPos = pos;
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);
            this.inverseViewMatrix = this.viewMatrix.inverse();

            this.setDirty();
        }

        public beginRender(stage: StageWebGL) {

            // Set the viewport to match
            stage.gl.viewport(0, 0, stage.gl.canvas.clientWidth, stage.gl.canvas.clientHeight);

            stage.gl.bindFramebuffer(stage.gl.FRAMEBUFFER, null);

            stage.gl.clearColor(0.3, 0.3, 0.3, 1.0);
            stage.gl.clearDepth(1.0);
            stage.gl.clear(stage.gl.DEPTH_BUFFER_BIT); // stage.gl.COLOR_BUFFER_BIT | 

            stage.gl.enable(stage.gl.DEPTH_TEST);
            stage.gl.enable(stage.gl.CULL_FACE);
            stage.gl.frontFace(stage.gl.CCW);
            stage.gl.cullFace(stage.gl.BACK);
            stage.gl.depthFunc(stage.gl.LEQUAL);       
        }

        public endRender(stage: StageWebGL) {
        }

        public getViewRay(clientX: number, clientY: number): psgeometry.Line3D {
            let cursor = new psgeometry.Vec4(clientX / this.clientWidth * 2.0 - 1.0, 1.0 - clientY / this.clientHeight * 2.0, -1.0, 1.0);
            let direction = <psgeometry.Vec4>this.inverseProjectionMatrix.multiply(cursor);
            direction.w = 1.0;
            let forward = this.inverseViewMatrix.multiply(direction);
            return new psgeometry.Line3D(this.currentCameraPos, forward);
        }

    }

    export class ShaderProgramWebGL {

        protected isInitialized = false;

        protected vertexShader: WebGLShader;

        protected fragmentShader: WebGLShader;

        protected program: WebGLProgram;

        public get Program() {
            return this.program;
        }

        public render(context: RenderContextWebGL, shaderInstance: ShaderInstance) {
            if (this.isInitialized && this.beginRender(context, shaderInstance)) {
                context.Stage.applyState(context);
                this.internalRender(context, shaderInstance);
                this.endRender(context, shaderInstance);
            }
        }

        protected getAttribLocation(stage: StageWebGL, attribName: string): number {
            return stage.gl.getAttribLocation(this.program, attribName);
        }

        protected beginRender(context: RenderContextWebGL, shaderInstance: ShaderInstance): boolean {
            context.Stage.gl.useProgram(this.program);
            return true;
        }

        protected SIZE_OF_FLOAT = 4;

        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance) {
        }

        protected endRender(context: RenderContextWebGL, shaderInstance: ShaderInstance) {
        }

        public initialize(stage: StageWebGL) {
            this.vertexShader = stage.Tools.createShader(stage.gl.VERTEX_SHADER, this.getVertexShaderSrc());
            this.fragmentShader = stage.Tools.createShader(stage.gl.FRAGMENT_SHADER, this.getFragmentShaderSrc());

            this.program = stage.gl.createProgram();

            stage.gl.attachShader(this.program, this.vertexShader);
            stage.gl.attachShader(this.program, this.fragmentShader);

            stage.gl.linkProgram(this.program);

            stage.gl.detachShader(this.program, this.vertexShader);
            stage.gl.detachShader(this.program, this.fragmentShader);

            console.log(stage.gl.getProgramInfoLog(this.program));

            this.isInitialized = true;
        }

        public getVertexShaderSrc(): string {
            return '';
        }

        public getFragmentShaderSrc(): string {
            return '';
        }

    }

    export class OpaqueMeshShaderProgramWebGL extends ShaderProgramWebGL {

        protected getStride() {
            return this.SIZE_OF_FLOAT * 9;
        }

        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance) {
            let stage = context.Stage;

            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);

                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);

                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);

                // draw triangles
                let triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);

                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        }


        public getVertexShaderSrc(): string {
            return `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec3 aColor;

                varying mediump vec4 vColor;

                void main()
                {
                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);
                   vec3 normal = aNormal;
                   vec4 diffuseColor = vec4(aColor, 1.0);
                   vec4 ambientColor = vec4(1.0, 1.0, 1.0, 1.0);

                   vec3 lightDir = vec3(0.9, 0.7, 1.0);
                   mediump float lightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);

                   vColor = vec4((aColor * 0.65 + ambientColor.rgb * 0.35)*(0.7 + lightIntensity * 0.3), 1.0);
                }`;
        }

        public getFragmentShaderSrc(): string {
            return `varying mediump vec4 vColor;

                void main()
                {
                   gl_FragColor = vColor;
                }`;
        }

    }

    export class TransparentMeshShaderProgramWebGL extends ShaderProgramWebGL {

        protected getStride() {
            return this.SIZE_OF_FLOAT * 10;
        }

        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance) {
            let stage = context.Stage;

            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);

                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);

                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 4, this.getStride(), 6 * this.SIZE_OF_FLOAT);

                stage.gl.enable(stage.gl.BLEND);
                stage.gl.blendFunc(stage.gl.SRC_ALPHA, stage.gl.ONE_MINUS_SRC_ALPHA);
                stage.gl.depthMask(false);

                // draw triangles
                let triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);

                stage.gl.depthMask(true);
                stage.gl.disable(stage.gl.BLEND);

                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        }


        public getVertexShaderSrc(): string {
            return `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec4 aColor;

                varying mediump vec4 vColor;

                void main()
                {
                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);
                   vec3 normal = aNormal;
                   vec4 diffuseColor = aColor;
                   vec4 ambientColor = vec4(1.0, 1.0, 1.0, 1.0);

                   vec3 lightDir = vec3(0.9, 0.7, 1.0);
                   mediump float lightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);

                   vColor = vec4((aColor.rgb * 0.65 + ambientColor.rgb * 0.35)*(0.7 + lightIntensity * 0.3), aColor.a);
                }`;
        }

        public getFragmentShaderSrc(): string {
            return `varying mediump vec4 vColor;

                void main()
                {
                   gl_FragColor = vColor;
                }`;
        }

    }

    export enum TexturedMeshShaderProgramVariants {
        Diffuse,
        Matcap
    }

    export class TexturedMeshShaderProgramWebGL extends ShaderProgramWebGL {

        public constructor(private variant: TexturedMeshShaderProgramVariants = TexturedMeshShaderProgramVariants.Diffuse) {
            super();
        }

        protected getStride() {
            return this.SIZE_OF_FLOAT * 11;
        }

        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance) {
            let stage = context.Stage;

            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);

                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);

                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);

                let textureKey = shaderInstance.getReference('TextureBuffer');
                let textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');

                    // draw triangles
                    let triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }

                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        }

        public getVertexShaderSrc(): string {
            let result = `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec3 aColor;
                attribute vec2 aTextureCoords;

                varying mediump vec4 vColor;
                varying mediump vec2 vTextureCoords;
                varying mediump float vLightIntensity;

                void main()
                {
                   vec4 pos = uMMatrix * vec4(aPosition, 1.0);
                   gl_Position = uPMatrix * uVMatrix * pos;
                   vec3 normal = normalize(uMMatrix * vec4(aNormal, 0.0)).xyz;

                   vec3 lightDir = vec3(0.9, 0.7, 1.0);
                   vLightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);

                   vColor = vec4(aColor, 1.0);
`;

            switch (this.variant) {
                case TexturedMeshShaderProgramVariants.Diffuse: result +=
                    `vTextureCoords = aTextureCoords;
`;
                    break;
                case TexturedMeshShaderProgramVariants.Matcap: result +=
                    `vec3 e = normalize(pos.xyz);
	                 vec3 r = reflect(e, (uVMatrix * vec4(normal, 0.0)).xyz);
	                 mediump float m = 2. * length(vec3(r.x, r.y, r.z + 1.));
	                 vTextureCoords = r.xy / m + .5;
`;
                    break;
            }
            
            result += `}`;

            return result;
        }

        public getFragmentShaderSrc(): string {
            let result = `uniform sampler2D uTexture0;

                varying mediump vec4 vColor;
                varying mediump vec2 vTextureCoords;
                varying mediump float vLightIntensity;

                void main()
                {
            	    mediump vec4 texColor = texture2D(uTexture0, vec2(vTextureCoords.x, 1.0 - vTextureCoords.y));
`;
            switch (this.variant) {
                case TexturedMeshShaderProgramVariants.Diffuse: result +=
                    `gl_FragColor = vec4(clamp(texColor.xyz * (1.0 + .15 * vLightIntensity), 0.0, 1.0), texColor.a); 
            `;
                    break;
                case TexturedMeshShaderProgramVariants.Matcap: result += 
                    `gl_FragColor = texColor.a;   
`;
                    break;
            }

            result += `}`;

            return result;
        }
        
    }

    export class ShadowTexturedMeshShaderProgramWebGL extends TexturedMeshShaderProgramWebGL {

        public getVertexShaderSrc(): string {
            return `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec3 aColor;
                attribute vec2 aTextureCoords;

                varying mediump float height;

                void main()
                {
                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);
                   height = (uMMatrix * vec4(aPosition, 1.0)).y;
                }`;
        }

        public getFragmentShaderSrc(): string {
            return `uniform sampler2D uTexture0;
                varying mediump float height;


                void main()
                {
                    gl_FragColor = vec4(.2, .2, .2, clamp(1.0 - (height / 3.0), 0.0, 1.0)); 
                }`;
        }

    }

    export class MatCapShaderProgramWebGL extends ShaderProgramWebGL {

        protected getStride() {
            return this.SIZE_OF_FLOAT * 11;
        }

        protected internalRender(context: RenderContextWebGL, shaderInstance: ShaderInstance) {
            let stage = context.Stage;

            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);

                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);

                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);

                let textureKey = shaderInstance.getReference('TextureBuffer');
                let textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');

                    let color = context.State.get('Color', psgeometry.Vec4.One);
                    let uColorLoc = stage.gl.getUniformLocation(this.program, 'uColor');
                    stage.gl.uniform4fv(uColorLoc, color.elements()); 

                    // draw triangles
                    let triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }
            }
        }

        public getVertexShaderSrc(): string {
            let result = `uniform mat4 uMMatrix;
                uniform mat4 uVMatrix;
                uniform mat4 uPMatrix;

                attribute vec3 aPosition;
                attribute vec3 aNormal;
                attribute vec3 aColor;
                attribute vec2 aTextureCoords;

                varying mediump vec4 vColor;
                varying mediump vec2 vTextureCoords;

                void main()
                {
                   vec4 pos = uMMatrix * vec4(aPosition, 1.0);
                   gl_Position = uPMatrix * uVMatrix * pos;
                   vec3 normal = normalize(uMMatrix * vec4(aNormal, 0.0)).xyz;

                   vec3 e = normalize(pos.xyz);
	               vec3 r = reflect(e, (uVMatrix * vec4(normal, 0.0)).xyz);
	               mediump float m = 2. * length(vec3(r.x, r.y, r.z + 1.));
	               vTextureCoords = r.xy / m + .5;
                }`;

            return result;
        }

        public getFragmentShaderSrc(): string {
            let result = `uniform sampler2D uTexture0;
                uniform mediump vec4 uColor;

                varying mediump vec4 vColor;
                varying mediump vec2 vTextureCoords;

                void main()
                {
            	    mediump vec4 texColor = texture2D(uTexture0, vec2(vTextureCoords.x, 1.0 - vTextureCoords.y));
                    //mediump vec3 green = vec3(0, 0.44, 0.09);
                    //mediump vec3 green = vec3(0.69, 0.34, 0.00);  //or
                    //mediump vec3 green = vec3(0.02, 0.31, 0.06);  // g
                    //mediump vec3 green = vec3(0.31, 0.02, 0.06);  // r
                    //mediump vec3 green = vec3(0.02, 0.17, 0.31);  // b
                    mediump float colorFac = (texColor.x - texColor.y) / 0.65;
                    mediump float whiteFac = (1.0 - colorFac) * 0.75;
                    mediump vec3 color = vec3(whiteFac, whiteFac, whiteFac) + colorFac * uColor.rgb;

                    gl_FragColor = vec4(color, texColor.a * uColor.a);   
            }`;

            return result;
        }
    }

    class RenderStateStack {
        private modelTransform: Array<psgeometry.Matrix4> = [psgeometry.Matrix4.Identity];

        private stack: Array<RenderState> = [];

        /** Top of the state stack.
          */
        public get Top() {
            return this.stack[this.stack.length - 1];
        }

        /** Determines the current model transformation.
          */
        public get CurrentModelTransform() {
            return this.modelTransform[this.modelTransform.length - 1];
        }

        /** Pushes the specified state on the state stack.
          */
        public pushState(state: RenderState) {
            state.Parent = this.stack.length == 0 ? null : this.Top;
            this.stack.push(state);
            if (state.contains('ModelTransform')) {
                let modelTransform = state.get('ModelTransform', psgeometry.Matrix4.Identity);
                this.modelTransform.push(<psgeometry.Matrix4>this.CurrentModelTransform.multiply(modelTransform));
            }
            else {
                this.modelTransform.push(this.CurrentModelTransform);
            }
        }

        /** Removes the top element from the state stack.
          */
        public popState() {
            this.Top.Parent = null;
            this.stack.pop();
            this.modelTransform.pop();
        }
    }

    /** A RenderContext instance is used to pass environment data to SceneItems during the rendition process.
	  *
	  * Besides the Stage that the SceneItems are being rendered to, the render context is the owner of a state stack
	  * that may be updated by SceneItems and that is consequently used by ShaderPrograms to set shader data and resources (like model transformation
	  * and auxiliary data). As SceneItems are organized in a hierarchical way, the current state may be defined by the current SceneItem, but
	  * also by previously traversed SceneItems in the scene hierarchy.
	  */
    export class RenderContextWebGL {
        private stage: StageWebGL;

        private camera: Camera;

        private shaderProgram: ShaderProgramWebGL;

        private sceneCategory: string = '';

        private stateStack: RenderStateStack = new RenderStateStack();

        private modelTransform: psgeometry.Matrix4 = null;

        private nodeTransform: psgeometry.Matrix4 = null;

        private phase: string = '';

        public get Phase() { return this.phase; }

        public set Phase(value: string) { this.phase = value; }

        /** Returns the current state that is composed of previously set state values.
          */
        public get State() {
            return this.stateStack.Top;
        }

        /** Pushes the specified state on the state stack.
          */
        public pushState(state: RenderState) {
            this.stateStack.pushState(state);
        }

        /** Removes the top element from the state stack.
          */
        public popState() {
            this.stateStack.popState();
        }

        public get ModelTransform() {
            return this.stateStack.CurrentModelTransform;
        }

        /** The current scene's category.
          */
        public get SceneCategory() {
            return this.sceneCategory;
        }

        /** The current scene's category.
          */
        public set SceneCategory(value: string) {
            this.sceneCategory = value;
        }

        /** The stage the SceneItems are being rendered to.
          */
        public get Stage() {
            return this.stage;
        }

        /** The stage the SceneItems are being rendered to.
          */
        public set Stage(value: StageWebGL) {
            this.stage = value;
        }

        public get Camera() {
            return this.camera;
        }

        public set Camera(value: Camera) {
            this.camera = value;
        }

        /** The current shader program.
          */
        public get ShaderProgram() {
            return this.shaderProgram;
        }

        /** The current shader program.
          */
        public set ShaderProgram(value: ShaderProgramWebGL) {
            this.shaderProgram = value;
        }

        public get NodeTransform() {
            return this.nodeTransform;
        }

        public set NodeTransform(value: psgeometry.Matrix4) {
            this.nodeTransform = value;
        }
    }

    export class StageWebGL {

        public gl: WebGLRenderingContext;

        private canvas: HTMLCanvasElement;

        private camera: CameraWebGL;

        private shadowCamera: ShadowCameraWebGL;

        private context: RenderContextWebGL;

        private assetFactory: AssetFactoryWebGL;

        private assetStore: AssetStoreWebGL;

        private phaseSpecificShaderPrograms: { [index: string]: { [index: string]: ShaderProgramWebGL } } = {};

        private shaderPrograms: { [index: string]: ShaderProgramWebGL } = {};

        private tools: ToolsWebGL = new ToolsWebGL(this);

        public get Canvas() {
            return this.canvas;
        }

        public get Camera() {
            return this.camera;
        }

        public get Tools() {
            return this.tools;
        }

        public get AssetFactory() {
            return this.assetFactory;
        }

        public get AssetStore() {
            return this.assetStore;
        }

        constructor(canvasElementId: string) {
            try {
                this.context = new RenderContextWebGL();
                this.context.Stage = this;

                this.assetStore = new AssetStoreWebGL();
                this.assetFactory = new AssetFactoryWebGL(this);

                this.canvas = <HTMLCanvasElement>document.getElementById(canvasElementId);

                if (this.canvas) {
                    this.gl = <WebGLRenderingContext>(this.canvas.getContext('webgl') || (this.canvas.getContext('experimental-webgl')));
                    let ext = this.gl.getExtension('OES_element_index_uint');

                    window.addEventListener('resize', () => {
                        this.resize();
                    });
                }

                if (!this.gl) {
                    alert('Unable to initialize WebGL. Your browser may not support it.');
                }
            }
            catch (e) {
                alert('Unable to initialize WebGL. Your browser may not support it. Error: ' + e);
            }
        }

        public initialize() {
            this.shadowCamera = new ShadowCameraWebGL();
            this.shadowCamera.resize(this);
            this.camera = new CameraWebGL();
            this.camera.resize(this);
            this.resize();
        }

        public updateShadowArea(box: psgeometry.AABB2D) {
            this.shadowCamera.updateShadowArea(box);
        }

        public applyState(context: RenderContextWebGL) {
            let program = context.ShaderProgram.Program;

            let resultingModelTransformation = psgeometry.Matrix4.Identity;
            if (context.ModelTransform && context.NodeTransform) {
                resultingModelTransformation = <psgeometry.Matrix4>context.NodeTransform.multiply(context.ModelTransform);
            } else if (context.ModelTransform) {
                resultingModelTransformation = context.ModelTransform;
            } else if (context.NodeTransform) {
                resultingModelTransformation = context.NodeTransform;
            }

            let mMatrixLoc = this.gl.getUniformLocation(program, 'uMMatrix');
            this.gl.uniformMatrix4fv(mMatrixLoc, false, resultingModelTransformation.transpose().elements);
            let vMatrixLoc = this.gl.getUniformLocation(program, 'uVMatrix');
            this.gl.uniformMatrix4fv(vMatrixLoc, false, context.Camera.ViewMatrix.transpose().elements);
            let pMatrixLoc = this.gl.getUniformLocation(program, 'uPMatrix');
            this.gl.uniformMatrix4fv(pMatrixLoc, false, context.Camera.ProjectionMatrix.transpose().elements); 
        }

        public render(scene: SceneWebGL) {
            if (scene.isDirty() || this.camera.isDirty() || this.shadowCamera.isDirty()) {

                this.context.Phase = 'Shadow';
                this.context.Camera = this.shadowCamera;
                this.shadowCamera.beginRender(this);
                scene.render(this.context);
                this.shadowCamera.endRender(this);

                this.context.Phase = '';
                this.context.Camera = this.camera;
                this.camera.beginRender(this);
                scene.render(this.context);
                this.camera.endRender(this);
            }
        }

        public registerShaderProgram(shaderProgramKey: string, shaderProgram: ShaderProgramWebGL) {
            this.shaderPrograms[shaderProgramKey] = shaderProgram;
        }

        public registerPhaseSpecificShaderProgram(phaseKey: string, shaderProgramKey: string, shaderProgram: ShaderProgramWebGL) {
            let phase = this.phaseSpecificShaderPrograms[phaseKey];
            if (!phase) {
                phase = {};
                this.phaseSpecificShaderPrograms[phaseKey] = phase;
            }

            phase[shaderProgramKey] = shaderProgram;
        }

        public getShaderProgram(context, shaderProgramKey: string) {
            let result;

            if (context.phase) {
                let phase = this.phaseSpecificShaderPrograms[context.phase];
                if (phase) {
                    result = phase[shaderProgramKey];
                }
            } 

            return result || this.shaderPrograms[shaderProgramKey];
        }

        private resize() {
            this.canvas.width = this.canvas.parentElement.offsetWidth;
            this.canvas.height = this.canvas.parentElement.offsetHeight;
            this.camera.resize(this);
        }

    }

    export enum ConnectionState {
        Ready,
        Connecting,
        Connected,
        Error
    };

    export abstract class ServerConnection {

        protected state: ConnectionState;

        protected handleConnected: (event: Event) => void;

        protected handleMessage: (Event: MessageEvent) => void;

        public get IsConnected() {
            return this.state == ConnectionState.Connected;
        }

        public constructor() {
            this.state = ConnectionState.Ready;
        }

        public abstract connect();

        public abstract disconnect();

        public abstract send(data: any);

        public onMessage(callback: (event: MessageEvent) => void) {
            this.handleMessage = callback;
        }

        public onConnected(callback: (event: Event) => void) {
            this.handleConnected = callback;
        }

    }

    export class SignalRServerConnection extends ServerConnection {

        private connection: HubConnection;

        public constructor() {
            super();

            this.connection = new HubConnectionBuilder()
                .withUrl('/api/state')
                .configureLogging(LogLevel.Trace)
                //.withHubProtocol(<any>(new MessagePackHubProtocol()))
                .build();

            this.connection.on('msg', (data) => {
                if (this.handleMessage) {
                    let msg = new MessageEvent('binary', { data: data });
                    this.handleMessage(msg);
                }
            });
        }

        public connect() {
            this.state = ConnectionState.Connecting;
            this.connection.start()
                .then(() => {
                    if (this.handleConnected) {
                        this.state = ConnectionState.Connected;
                        this.handleConnected(new Event('connected'));
                    }
                })
                .catch((e) => {
                    this.state = ConnectionState.Error;
                });
        }

        public disconnect() {
            this.connection.stop()
                .then(() => {
                    this.state = ConnectionState.Ready;
                })
                .catch(() => {
                    this.state = ConnectionState.Error;
                });
        }

        public send(data: any) {
            this.connection.invoke('Msg', data);
        }

    }

    export class WebSocketServerConnection extends ServerConnection {
        
        private websocket: WebSocket;

        public connect(url?: string) {
            if (this.state == ConnectionState.Ready || this.state == ConnectionState.Error) {
                let uri = url ? url : 'ws://' + window.location.host + '/api/scene';
                this.state = ConnectionState.Connecting;
                this.websocket = new WebSocket(uri);
                this.websocket.binaryType = 'arraybuffer';
                this.websocket.onopen = (event: Event) => {
                    this.state = ConnectionState.Connected;
                    console.log('websocket connected.')
                    if (this.handleConnected) {
                        this.handleConnected(event);
                    }
                };
                this.websocket.onclose = (event) => {
                    console.log('websocket closed.');
                    this.state = ConnectionState.Ready;
                };
                this.websocket.onerror = (event) => {
                    this.state = ConnectionState.Error;
                    console.log('websocket error.')
                };
                this.websocket.onmessage = (event) => {
                    if (this.handleMessage) {
                        this.handleMessage(event);
                    }
                };
            } else {
            }
        }

        public disconnect() {
            this.websocket.close();
        }

        public send(data: any) {
            this.websocket.send(data);
        }
    }

    export class Tool {

        protected interfaceController: InterfaceController;

        public enter(interfaceController: InterfaceController) {
            this.interfaceController = interfaceController;
        }

        public leave() { }

        public handleKeyUp(e: JQuery.Event): boolean { return false; }

        public handleMouseMove(e: JQuery.Event, x: number, y: number) { }

        public handleMouseDown(e: JQuery.Event) { }

        public handleMouseUp(e: JQuery.Event) { }

        public handleDrag(e: JQuery.Event, startX: number, startY: number, dX: number, dY: number) { }

        public handleMouseWheel(e: JQuery.Event) { }

        public handleClick(e: JQuery.Event, x: number, y: number) { }

    }

    export class InterfaceController {

        private tools: Array<Tool> = [];

        private hasTool() {
            return this.tools.length > 0;
        }

        public get CurrentTool(): Tool {
            return this.hasTool() ? this.tools[this.tools.length - 1] : null;
        }

        private leftButton = 0;

        private leftButtonDown: boolean = false;

        private startX: number = NaN;

        private startY: number = NaN;

        private lastX: number = NaN;

        private lastY: number = NaN;

        private target: JQuery;

        public onMove: (e: JQuery.Event, x: number, y: number) => void = null;

        public onDrag: (e: JQuery.Event, dX: number, dY: number) => void = null;

        public onMouseWheel: (e: JQuery.Event) => void = null;

        constructor() {
        }

        public bindEvents(target: JQuery) {
            this.target = target;

            JQuery(target).on('mousewheel', (e) => {
                this.mouseWheel(e);
            });

            JQuery(target).on('mousedown touchstart', (e) => {
                this.mouseDown(e);
                e.preventDefault();
            });

            if (!(<any>target).setCapture) {
                JQuery(document).on('mousemove touchmove', (e) => {
                    this.mouseMove(e);
                });
            } else {
                JQuery(target).on('mousemove touchmove', (e) => {
                    this.mouseMove(e);
                });
            }

            JQuery(document).on('mouseup touchend touchcancel', (e) => {
                this.mouseUp(e);
                e.preventDefault();
            });

            JQuery(target).on('losecapture', (e) => {
                this.mouseUp(e);
                e.preventDefault();
            });

            JQuery(document).on('keyup', (e) => {
                if (this.keyUp(e)) {
                    e.preventDefault();
                }
            });
        }

        private updateLastPosition(e: JQuery.Event) {
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        }

        public pushTool(tool: Tool) {
            if (this.CurrentTool) {
                this.CurrentTool.leave();
            }

            this.tools.push(tool);

            tool.enter(this);
        }

        public popTool() {
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].leave();
                this.tools.pop();
            }
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].enter(this);
            }
        }

        private keyUp(e: JQuery.Event): boolean {
            if (this.hasTool()) {
                return this.CurrentTool.handleKeyUp(e);
            } else {
                return false;
            }

        }

        private mouseDown(e: JQuery.Event) {
            if (e.button == this.leftButton) {
                this.leftButtonDown = true;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.updateLastPosition(e);
                if ((<any>e.target).setCapture) (<any>e.target).setCapture();
            }

            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseDown(e);
            } 
        }

        private mouseMove(e: JQuery.Event) {
            if (this.hasTool() && !e.ctrlKey) {
                if (this.leftButtonDown) {
                    this.CurrentTool.handleDrag(e, this.startX, this.startY, e.clientX - this.lastX, e.clientY - this.lastY);
                } 
                this.CurrentTool.handleMouseMove(e, e.clientX, e.clientY);
                
            } else {
                if (this.leftButtonDown) {
                    this.drag(e, e.clientX - this.lastX, e.clientY - this.lastY);
                } else {
                    this.onMove(e, e.clientX, e.clientY);
                }
            }

            if (this.leftButtonDown) {
                this.updateLastPosition(e);
            }
        }

        private mouseUp(e: JQuery.Event) {
            let updatePosition = false;
            if (e.button == this.leftButton) {
                this.leftButtonDown = false;
                updatePosition = true;

                if ((<any>e.target).releaseCapture) (<any>e.target).releaseCapture();
            }

            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseUp(e);
            } else {
                if (updatePosition) {
                    this.updateLastPosition(e);
                }
            }
        }

        private drag(e: JQuery.Event, dX: number, dY: number) {
            if (this.onDrag) {
                this.onDrag(e, dX, dY);
            }
        }

        private mouseWheel(e: JQuery.Event) {
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseWheel(e);
            } else {
                if (this.onMouseWheel) {
                    this.onMouseWheel(e);
                }
                e.preventDefault();
            }
        }
    }

    export class CameraController {
        private stage: StageWebGL;
        private camera: CameraWebGL;
        private connection: ServerConnection;
        private radius: number = 20.0;
        private yaw: number = 0.0;
        private pitch: number = 0.0;
        private center: psgeometry.Vec3;

        private dragDivisor = 100.0;
        private rotateDivisor = 200.0;

        public get Yaw() {
            return this.yaw;
        }

        public set Yaw(value: number) {
            this.yaw = value;
            this.updateCamera();
        }

        constructor(stage: StageWebGL, camera: CameraWebGL, interfaceController: InterfaceController, connection: ServerConnection) {
            this.stage = stage;
            this.camera = camera;
            this.connection = connection;

            interfaceController.bindEvents(JQuery(stage.Canvas));
            interfaceController.onDrag = (e, dX, dY) => {
                this.drag(e, dX, dY);
            };

            interfaceController.onMouseWheel = (e) => {
                this.mouseWheel(e);
            };

            interfaceController.onMove = (e, x, y) => {
                this.move(e, x, y);
            };

            this.center = new psgeometry.Vec3(0.0, 0.0, 0.0);

            this.updateCamera();
        }

        public construct(radius: number, pitch: number, yaw: number) {
            this.radius = radius;
            this.pitch = pitch;
            this.yaw = yaw;

            this.updateCamera();
        }

        private mouseWheel(e: JQuery.Event) {
            if (e.shiftKey) {
                let d = this.getViewDir().multiply((<any>e).deltaY || (<any>e).deltaX);
                this.center = this.center.sub(d);
            } else {
                this.radius += (<any>e).deltaY * Math.log(this.radius + 1) / 2;
                this.radius = Math.max(0.01, this.radius);
            }
            this.updateCamera();
        }

        private move(e: JQuery.Event, x: number, y: number) {
        }

        private drag(e: JQuery.Event, dX: number, dY: number) {

            if (e.shiftKey) {
                let x = this.getViewPlaneX();
                let y = this.getViewPlaneY();
                this.center = this.center
                    .add(x.multiply(dX / this.dragDivisor))
                    .add(y.multiply(dY / this.dragDivisor));
            } else {
                this.yaw -= dX / this.rotateDivisor;
                this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch - dY / this.rotateDivisor));
            }

            this.updateCamera();
        }

        private getViewPlaneX() {
            let q, r, v;

            v = new psgeometry.Vec3(-1.0, 0.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);

            return v; //.add(this.center);
        }

        private getViewPlaneY() {
            let q, r, v;

            v = new psgeometry.Vec3(0.0, 1.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);

            return v; //.add(this.center);
        }

        private getViewDir(): psgeometry.Vec3 {
            let q, r, v;

            v = new psgeometry.Vec3(0.0, 0.0, -1.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);

            return v; //.add(this.center);
        }

        private getCameraPos() {
            let q, r, v;

            v = new psgeometry.Vec3(0.0, 0.0, this.radius);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);

            return v.add(this.center);
        }

        private updateCamera() {
            this.camera.update(this.getCameraPos(), this.center, new psgeometry.Vec3(0.0, 1.0, 0.0));
        }
    }

    export class CommonMessageTypes {
        public static AppStateDelta = 0x0100;
        public static ServerHandshake = 0x0101;
        public static ClientHandshake = 0x0102;
        public static ClientConfirmation = 0x0103;
        public static AppStateInitialization = 0x104;
        public static AnchorRequest = 0x01fe;
        public static SharedAnchor = 0x01ff;
    }

    export class NetworkChannelMessage {

        public static HeaderSize = 8;

        private messageType: number = CommonMessageTypes.AppStateDelta;

        private content: Uint8Array;

        public get Content() {
            return this.content;
        }

        public get MessageType() {
            return this.messageType;
        }

        public static FromBuffer(buffer: Uint8Array) {
            let result = new NetworkChannelMessage();
            result.content = buffer;
            return result;
        }

        public get HasPayload() {
            return this.content.byteLength > NetworkChannelMessage.HeaderSize;
        }

        public get PayloadSize() {
            return this.content.byteLength - NetworkChannelMessage.HeaderSize;
        }
    
    }

}
