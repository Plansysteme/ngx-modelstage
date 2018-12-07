/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { psgeometry } from './ps-geometry';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
//import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';
import JQuery from 'jquery';
export var modelstageweb;
(function (modelstageweb) {
    /**
     * @return {?}
     */
    function uuidv4() {
        /** @type {?} */
        let crypto = window.crypto || ((/** @type {?} */ (window))).msCrypto;
        return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }
    modelstageweb.uuidv4 = uuidv4;
    class ToolsWebGL {
        /**
         * @param {?} stage
         */
        constructor(stage) {
            this.stage = stage;
        }
        /**
         * @param {?} shaderType
         * @param {?} shaderSource
         * @return {?}
         */
        createShader(shaderType, shaderSource) {
            /** @type {?} */
            let shader = this.stage.gl.createShader(shaderType);
            this.stage.gl.shaderSource(shader, shaderSource);
            this.stage.gl.compileShader(shader);
            console.log(this.stage.gl.getShaderInfoLog(shader));
            return shader;
        }
    }
    modelstageweb.ToolsWebGL = ToolsWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ToolsWebGL.prototype.stage;
    }
    class BlockStreamBlockDescriptor {
        /**
         * @return {?}
         */
        get BlockType() {
            return this.blockType;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set BlockType(value) {
            this.blockType = value;
        }
        /**
         * @return {?}
         */
        get MajorVersion() {
            return this.majorVersion;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set MajorVersion(value) {
            this.majorVersion = value;
        }
        /**
         * @return {?}
         */
        get MinorVersion() {
            return this.minorVersion;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set MinorVersion(value) {
            this.minorVersion = value;
        }
        /**
         * @return {?}
         */
        get Flags() {
            return this.flags;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set Flags(value) {
            this.flags = value;
        }
        /**
         * @return {?}
         */
        get PayloadBytes() {
            return this.payloadBytes;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set PayloadBytes(value) {
            this.payloadBytes = value;
        }
    }
    modelstageweb.BlockStreamBlockDescriptor = BlockStreamBlockDescriptor;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        BlockStreamBlockDescriptor.prototype.blockType;
        /**
         * @type {?}
         * @private
         */
        BlockStreamBlockDescriptor.prototype.majorVersion;
        /**
         * @type {?}
         * @private
         */
        BlockStreamBlockDescriptor.prototype.minorVersion;
        /**
         * @type {?}
         * @private
         */
        BlockStreamBlockDescriptor.prototype.flags;
        /**
         * @type {?}
         * @private
         */
        BlockStreamBlockDescriptor.prototype.payloadBytes;
    }
    let BlockStreamReaderStates;
    (function (BlockStreamReaderStates) {
        BlockStreamReaderStates[BlockStreamReaderStates["FILE_HEADER_EXPECTED"] = 0] = "FILE_HEADER_EXPECTED";
        BlockStreamReaderStates[BlockStreamReaderStates["BLOCK_DESCRIPTOR_EXPECTED"] = 1] = "BLOCK_DESCRIPTOR_EXPECTED";
        BlockStreamReaderStates[BlockStreamReaderStates["PAYLOAD_EXPECTED"] = 2] = "PAYLOAD_EXPECTED";
    })(BlockStreamReaderStates = modelstageweb.BlockStreamReaderStates || (modelstageweb.BlockStreamReaderStates = {}));
    class BlockStreamReader {
        /**
         * @param {?} buffer
         */
        constructor(buffer) {
            this.arrayBuffer = null;
            this.byteArray = null;
            this.currentPos = 0;
            this.blockEnd = 0;
            this.isComplete = false;
            this.fatalError = false;
            this.state = BlockStreamReaderStates.FILE_HEADER_EXPECTED;
            this.arrayBuffer = buffer;
            this.byteArray = new Uint8Array(buffer);
            this.assureFileHeader();
        }
        /**
         * @return {?}
         */
        get CurrentBlockDescriptor() {
            return this.currentBlockDescriptor;
        }
        /**
         * @return {?}
         */
        get FatalError() {
            return this.fatalError;
        }
        /**
         * @return {?}
         */
        remainingBytesInBlock() {
            return this.blockEnd - this.currentPos;
        }
        /**
         * @param {?} count
         * @return {?}
         */
        assureRemainingBytesInBlock(count) {
            return this.currentPos + count <= this.blockEnd;
        }
        /**
         * @param {?} count
         * @return {?}
         */
        readBytes(count) {
            return this.arrayBuffer.slice(this.currentPos, this.currentPos + count);
        }
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadInt16(lambda) {
            /** @type {?} */
            let result = this.assureRemainingBytesInBlock(2);
            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256);
            }
            return result;
        }
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadFloat(lambda) {
            /** @type {?} */
            let result = this.assureRemainingBytesInBlock(4);
            if (result) {
                /** @type {?} */
                let buf = new ArrayBuffer(4);
                /** @type {?} */
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
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadInt(lambda) {
            /** @type {?} */
            let result = this.assureRemainingBytesInBlock(4);
            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256 +
                    this.byteArray[this.currentPos++] * 65536 +
                    this.byteArray[this.currentPos++] * 16777216);
            }
            return result;
        }
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadInt64(lambda) {
            /** @type {?} */
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
        /**
         * @param {?} lambda
         * @return {?}
         */
        tryReadString(lambda) {
            /** @type {?} */
            let result = false;
            this.tryReadInt((stringLength) => {
                /** @type {?} */
                let value = '';
                if (this.assureRemainingBytesInBlock(stringLength)) {
                    for (let i = 0; i < stringLength; ++i) {
                        value += String.fromCharCode(this.byteArray[this.currentPos++]);
                    }
                }
                lambda(value);
                result = true;
            });
            return result;
        }
        /**
         * @return {?}
         */
        readString() {
            /** @type {?} */
            let result = '';
            this.tryReadString((value) => { result = value; });
            return result;
        }
        /**
         * @return {?}
         */
        readMatrix4() {
            /** @type {?} */
            let result = new psgeometry.Matrix4();
            for (let i = 0; i < 16; ++i) {
                this.tryReadFloat((val) => { result.elements[i] = val; });
            }
            return result.transpose();
        }
        /**
         * @private
         * @param {?} startPos
         * @param {?} length
         * @return {?}
         */
        internalReadString(startPos, length) {
            /** @type {?} */
            let result = '';
            for (let i = 0; i < length; ++i) {
                result += String.fromCharCode(this.byteArray[startPos + i]);
            }
            return result;
        }
        /**
         * @private
         * @param {?} startPos
         * @return {?}
         */
        internalReadInt(startPos) {
            return this.byteArray[startPos] +
                this.byteArray[startPos + 1] * 256 +
                this.byteArray[startPos + 2] * 65536 +
                this.byteArray[startPos + 3] * 16777216;
        }
        /**
         * @private
         * @return {?}
         */
        assureFileHeader() {
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
                }
                else {
                    this.fatalError = true;
                }
            }
            else {
                this.fatalError = this.isComplete;
            }
        }
        /**
         * @return {?}
         */
        enterBlock() {
            /** @type {?} */
            let result = { success: false, descriptor: null };
            if (this.byteArray.byteLength >= this.currentPos + 5) {
                if (this.byteArray[this.currentPos] == 0x70 && // = "psbl"
                    this.byteArray[this.currentPos + 1] == 0x73 &&
                    this.byteArray[this.currentPos + 2] == 0x62 &&
                    this.byteArray[this.currentPos + 3] == 0x6C) {
                    /** @type {?} */
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
                    }
                    else {
                        // there are too few bytes to make a full block descriptor, but the stream is completely read
                        this.fatalError = this.isComplete;
                    }
                }
                else {
                    // no valid block header found
                    this.fatalError = true;
                }
            }
            else {
                // there are too few bytes to make a block header, but the stream is completely read 
                this.fatalError = this.isComplete && (this.byteArray.byteLength > this.currentPos);
            }
            return result;
        }
        /**
         * @return {?}
         */
        leaveBlock() {
            this.currentPos = this.blockEnd;
            this.state = BlockStreamReaderStates.BLOCK_DESCRIPTOR_EXPECTED;
        }
    }
    modelstageweb.BlockStreamReader = BlockStreamReader;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        BlockStreamReader.prototype.arrayBuffer;
        /**
         * @type {?}
         * @private
         */
        BlockStreamReader.prototype.byteArray;
        /**
         * @type {?}
         * @private
         */
        BlockStreamReader.prototype.currentPos;
        /**
         * @type {?}
         * @private
         */
        BlockStreamReader.prototype.currentBlockDescriptor;
        /**
         * @type {?}
         * @private
         */
        BlockStreamReader.prototype.blockEnd;
        /**
         * @type {?}
         * @private
         */
        BlockStreamReader.prototype.isComplete;
        /**
         * @type {?}
         * @private
         */
        BlockStreamReader.prototype.fatalError;
        /**
         * @type {?}
         * @private
         */
        BlockStreamReader.prototype.state;
    }
    class ShaderInstance {
        /**
         * @param {?} shaderKey
         */
        constructor(shaderKey) {
            this.references = {};
            this.shaderKey = shaderKey;
        }
        /**
         * @return {?}
         */
        get FigureID() {
            return this.figureID;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set FigureID(value) {
            this.figureID = value;
        }
        /**
         * @return {?}
         */
        get ShaderKey() {
            return this.shaderKey;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set ShaderKey(value) {
            this.shaderKey = value;
        }
        /**
         * @param {?} key
         * @return {?}
         */
        getReference(key) {
            return this.references[key];
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        construct(reader) {
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        addReference(key, value) {
            this.references[key] = value;
        }
    }
    modelstageweb.ShaderInstance = ShaderInstance;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ShaderInstance.prototype.shaderKey;
        /**
         * @type {?}
         * @private
         */
        ShaderInstance.prototype.references;
        /**
         * @type {?}
         * @private
         */
        ShaderInstance.prototype.figureID;
    }
    class MeshShaderInstance extends ShaderInstance {
        /**
         * @param {?} shaderKey
         */
        constructor(shaderKey) {
            super(shaderKey);
            this.SIZE_OF_FLOAT = 4;
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        construct(reader) {
            if (!reader.tryReadString((id) => { this.bufferID = id; })) {
                this.bufferID = '_default';
            }
            if (!reader.tryReadInt16((priority) => { this.priority = priority; })) {
                this.priority = 0;
            }
        }
        /**
         * @return {?}
         */
        getStride() {
            return this.ShaderKey == 'TransparentMeshShader' ? 10 * this.SIZE_OF_FLOAT : 9 * this.SIZE_OF_FLOAT;
        }
    }
    modelstageweb.MeshShaderInstance = MeshShaderInstance;
    if (false) {
        /** @type {?} */
        MeshShaderInstance.prototype.SIZE_OF_FLOAT;
        /**
         * @type {?}
         * @protected
         */
        MeshShaderInstance.prototype.bufferID;
        /**
         * @type {?}
         * @protected
         */
        MeshShaderInstance.prototype.priority;
    }
    class TexturedMeshShaderInstance extends MeshShaderInstance {
        /**
         * @param {?} shaderKey
         */
        constructor(shaderKey) {
            super(shaderKey);
        }
        /**
         * @return {?}
         */
        get TextureID() {
            return this.textureID;
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        construct(reader) {
            /** @type {?} */
            let result = reader.tryReadString((textureID) => { this.textureID = textureID; });
            if (result) {
                this.addReference('TextureBuffer', this.textureID);
                super.construct(reader);
            }
        }
        /**
         * @return {?}
         */
        getStride() {
            return 11 * this.SIZE_OF_FLOAT;
        }
    }
    modelstageweb.TexturedMeshShaderInstance = TexturedMeshShaderInstance;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        TexturedMeshShaderInstance.prototype.textureID;
    }
    /**
     * @param {?} reader
     * @return {?}
     */
    function ShaderInstanceFromReader(reader) {
        /** @type {?} */
        let result = null;
        /** @type {?} */
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
    class Mesh3DLib {
        /**
         * @param {?} objectNamePrefix
         */
        constructor(objectNamePrefix) {
            this.objectNamePrefix = objectNamePrefix;
        }
        /**
         * @param {?} rootNode
         * @return {?}
         */
        setRootNode(rootNode) {
            this.rootNode = rootNode;
        }
        /**
         * @param {?} path
         * @return {?}
         */
        getNodeFromPath(path) {
            if (path.length == 0 || !this.rootNode || this.rootNode.Name == path) {
                return this.rootNode;
            }
            else {
                return this.rootNode.getChildNodeFromPath(path.substr(this.rootNode.Name.length));
            }
        }
    }
    modelstageweb.Mesh3DLib = Mesh3DLib;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        Mesh3DLib.prototype.rootNode;
        /**
         * @type {?}
         * @private
         */
        Mesh3DLib.prototype.objectNamePrefix;
    }
    class AssetFactoryWebGL {
        /**
         * @param {?} stage
         */
        constructor(stage) {
            this.lastPercentage = -1;
            this.stage = stage;
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createFigure(reader, stage, assetStore) {
            this.currentFigure = new FigureWebGL(reader.readString());
            if (this.currentSceneMesh3DLib) {
                reader.tryReadString((nodePath) => {
                    this.currentFigure.Node = this.currentSceneMesh3DLib.getNodeFromPath(nodePath);
                });
            }
            assetStore.addFigure(this.currentFigure);
            return true;
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createMesh(reader, stage, assetStore) {
            /** @type {?} */
            let result = false;
            this.currentShaderInstance = ShaderInstanceFromReader(reader);
            if (this.currentShaderInstance && this.currentFigure) {
                this.currentFigure.addShaderInstance(this.currentShaderInstance);
                result = true;
            }
            return result;
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createMeshBuffer(reader, stage, assetStore) {
            /** @type {?} */
            let bufferAsset = new BufferAssetWebGL(reader, 'VertexBuffer', false);
            /** @type {?} */
            let currentID = bufferAsset.BufferID;
            /** @type {?} */
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
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createMeshIndicesBuffer(reader, stage, assetStore) {
            /** @type {?} */
            let bufferAsset = new BufferAssetWebGL(reader, 'IndexBuffer', true);
            /** @type {?} */
            let currentID = bufferAsset.BufferID;
            /** @type {?} */
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
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        createTexture(reader, stage, assetStore, deferreds) {
            /** @type {?} */
            let textureName;
            /** @type {?} */
            let pixelDataSize;
            if (reader.tryReadString((value) => { textureName = value; }) && reader.tryReadInt64((value) => { pixelDataSize = value; })) {
                /** @type {?} */
                let imageData = reader.readBytes(pixelDataSize);
                /** @type {?} */
                let extension = textureName.substr(textureName.lastIndexOf('.')).toLowerCase();
                /** @type {?} */
                let imageType = 'jpeg';
                if (extension == '.png') {
                    imageType = 'png';
                }
                /** @type {?} */
                let blob = new Blob([imageData], { 'type': 'image/' + imageType });
                /** @type {?} */
                let url = URL.createObjectURL(blob);
                /** @type {?} */
                let image = new Image();
                /** @type {?} */
                let deferred = JQuery.Deferred();
                deferreds.push(deferred);
                image.onload = () => {
                    this.stage.AssetStore.addTextureAsset(textureName, new TextureAssetWebGL(this.stage, image));
                    deferred.resolve();
                };
                image.onerror = () => {
                    console.error('Error processing texture blob ' + textureName);
                    deferred.reject();
                };
                image.src = url;
            }
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createOctree(reader, stage, assetStore) {
            this.currentFigure.setIntersector(Octree.CreateFromBlockStream(reader));
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createScene(reader, stage, assetStore) {
            this.currentSceneMesh3DLib = new Mesh3DLib(reader.readString());
        }
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        createRootNode(reader, stage, assetStore) {
            if (this.currentSceneMesh3DLib) {
                /** @type {?} */
                let rootNode = NodeAsset.FromBlockStream(reader, this.currentSceneMesh3DLib);
                this.currentSceneMesh3DLib.setRootNode(rootNode);
                this.stage.AssetStore.addRootNode(rootNode);
            }
        }
        /**
         * @private
         * @param {?} blockType
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        processBlock(blockType, reader, stage, assetStore, deferreds) {
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
        /**
         * @private
         * @param {?} buffer
         * @return {?}
         */
        loadFromArrayBuffer(buffer) {
            /** @type {?} */
            let deferreds = [];
            /** @type {?} */
            let assetStore = this.stage.AssetStore;
            /** @type {?} */
            let reader = new BlockStreamReader(buffer);
            try {
                /** @type {?} */
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
        /**
         * @param {?} url
         * @return {?}
         */
        getFromUrl(url) {
            /** @type {?} */
            let deferred = JQuery.Deferred();
            /** @type {?} */
            let req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.responseType = 'arraybuffer';
            req.onload = (event) => {
                this.loadFromArrayBuffer((/** @type {?} */ (req.response))).done(() => {
                    deferred.resolve(true);
                });
            };
            req.onerror = (event) => {
                deferred.reject(event);
            };
            req.addEventListener('progress', (oEvent) => {
                if (oEvent.lengthComputable) {
                    /** @type {?} */
                    let percentComplete = oEvent.loaded / oEvent.total;
                    if (this.lastPercentage != Math.floor(percentComplete * 100)) {
                        this.lastPercentage = Math.floor(percentComplete * 100);
                        deferred.notify(Math.round(percentComplete * 100));
                    }
                }
                else {
                    // Unable to compute progress information since the total size is unknown
                }
            });
            req.send(null);
            return deferred;
        }
    }
    modelstageweb.AssetFactoryWebGL = AssetFactoryWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AssetFactoryWebGL.prototype.lastPercentage;
        /**
         * @type {?}
         * @private
         */
        AssetFactoryWebGL.prototype.stage;
        /**
         * @type {?}
         * @private
         */
        AssetFactoryWebGL.prototype.currentFigure;
        /**
         * @type {?}
         * @private
         */
        AssetFactoryWebGL.prototype.currentShaderInstance;
        /**
         * @type {?}
         * @private
         */
        AssetFactoryWebGL.prototype.currentSceneMesh3DLib;
    }
    /**
     * @record
     */
    function Intersector() { }
    modelstageweb.Intersector = Intersector;
    if (false) {
        /**
         * @return {?}
         */
        Intersector.prototype.getBoundingBox = function () { };
    }
    class BoundingBoxIntersector {
        /**
         * @param {?} boundingBox
         */
        constructor(boundingBox) {
            this.boundingBox = boundingBox;
        }
        /**
         * @return {?}
         */
        getBoundingBox() {
            return this.boundingBox;
        }
    }
    modelstageweb.BoundingBoxIntersector = BoundingBoxIntersector;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        BoundingBoxIntersector.prototype.boundingBox;
    }
    class Octree {
        constructor() {
            this.boundingBox = new psgeometry.AABB3D();
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        static CreateFromBlockStream(reader) {
            /** @type {?} */
            let octree = new Octree();
            /** @type {?} */
            let x0;
            /** @type {?} */
            let y0;
            /** @type {?} */
            let z0;
            /** @type {?} */
            let x1;
            /** @type {?} */
            let y1;
            /** @type {?} */
            let z1;
            /** @type {?} */
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
        /**
         * @return {?}
         */
        getBoundingBox() {
            return this.boundingBox;
        }
    }
    modelstageweb.Octree = Octree;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        Octree.prototype.boundingBox;
    }
    class FigureWebGL {
        /**
         * @param {?} figureID
         */
        constructor(figureID) {
            this.shaderInstances = [];
            this.figureID = figureID;
        }
        /**
         * @return {?}
         */
        get Node() {
            return this.node;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set Node(value) {
            this.node = value;
        }
        /**
         * @return {?}
         */
        get FigureID() {
            return this.figureID;
        }
        /**
         * @return {?}
         */
        get ShaderInstances() {
            return this.shaderInstances;
        }
        /**
         * @return {?}
         */
        getBoundingBox() {
            if (this.intersector) {
                return this.Node ? this.intersector.getBoundingBox().transform(this.Node.AbsoluteTransformation) : this.intersector.getBoundingBox();
            }
            else {
                return new psgeometry.AABB3D();
            }
        }
        /**
         * @param {?} shaderInstance
         * @return {?}
         */
        addShaderInstance(shaderInstance) {
            this.shaderInstances.push(shaderInstance);
        }
        /**
         * @param {?} context
         * @return {?}
         */
        render(context) {
            /** @type {?} */
            let stage = context.Stage;
            this.shaderInstances.forEach((shaderInstance) => {
                shaderInstance.FigureID = this.figureID;
                /** @type {?} */
                let shaderProgram = stage.getShaderProgram(context, shaderInstance.ShaderKey);
                if (shaderProgram) {
                    context.ShaderProgram = shaderProgram;
                    context.NodeTransform = this.Node ? this.Node.AbsoluteTransformation : null;
                    shaderProgram.render(context, shaderInstance);
                }
            });
        }
        /**
         * @param {?} intersector
         * @return {?}
         */
        setIntersector(intersector) {
            this.intersector = intersector;
        }
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        intersectsBoundingBox(ray, at) {
            /** @type {?} */
            let result = false;
            if (this.intersector) {
                /** @type {?} */
                let intersectionPoint = this.intersector.getBoundingBox().intersectsRay(ray);
                if (intersectionPoint) {
                    at.assignVec(intersectionPoint);
                    result = true;
                }
            }
            return result;
        }
    }
    modelstageweb.FigureWebGL = FigureWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        FigureWebGL.prototype.figureID;
        /**
         * @type {?}
         * @private
         */
        FigureWebGL.prototype.shaderInstances;
        /**
         * @type {?}
         * @private
         */
        FigureWebGL.prototype.intersector;
        /**
         * @type {?}
         * @private
         */
        FigureWebGL.prototype.node;
    }
    class AnimationTransformation {
        /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        static FromBlockStream(reader, mesh3DLib) {
            return null;
        }
    }
    modelstageweb.AnimationTransformation = AnimationTransformation;
    class NodeAsset {
        constructor() {
            this.childNodes = {};
        }
        /**
         * @return {?}
         */
        get Name() {
            return this.name;
        }
        /**
         * @return {?}
         */
        get AbsoluteTransformation() {
            return this.absoluteTransformation;
        }
        /**
         * @return {?}
         */
        get LocalTransformation() {
            return this.localTransformation;
        }
        /**
         * @param {?} path
         * @return {?}
         */
        getChildNodeFromPath(path) {
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
        /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @param {?=} parentNode
         * @return {?}
         */
        static FromBlockStream(reader, mesh3DLib, parentNode) {
            /** @type {?} */
            let result = new NodeAsset();
            result.name = reader.readString();
            result.localTransformation = reader.readMatrix4();
            result.absoluteTransformation = NodeAsset.calculateAbsoluteTransformation(result.localTransformation, parentNode);
            result.parentNode = parentNode;
            result.readChildNodes(reader, mesh3DLib);
            result.readAnimationTransformations(reader, mesh3DLib);
            return result;
        }
        /**
         * @private
         * @param {?} localTransformation
         * @param {?} parentNode
         * @return {?}
         */
        static calculateAbsoluteTransformation(localTransformation, parentNode) {
            if (parentNode) {
                return (/** @type {?} */ (localTransformation.multiply(parentNode.AbsoluteTransformation)));
            }
            else {
                return localTransformation;
            }
        }
        /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        readChildNodes(reader, mesh3DLib) {
            reader.tryReadInt((childNameCount) => {
                for (let i = 0; i < childNameCount; ++i) {
                    this.addChildNode(NodeAsset.FromBlockStream(reader, mesh3DLib, this));
                }
            });
        }
        /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        readAnimationTransformations(reader, mesh3DLib) {
            reader.tryReadInt((numAnimationTransformations) => {
                for (let i = 0; i < numAnimationTransformations; ++i) {
                    this.addAnimationTransformation(AnimationTransformation.FromBlockStream(reader, mesh3DLib));
                }
            });
        }
        /**
         * @private
         * @param {?} node
         * @return {?}
         */
        addChildNode(node) {
            this.childNodes[node.Name] = node;
        }
        /**
         * @private
         * @param {?} animationTransformation
         * @return {?}
         */
        addAnimationTransformation(animationTransformation) {
        }
    }
    modelstageweb.NodeAsset = NodeAsset;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NodeAsset.prototype.name;
        /**
         * @type {?}
         * @private
         */
        NodeAsset.prototype.parentNode;
        /**
         * @type {?}
         * @private
         */
        NodeAsset.prototype.childNodes;
        /**
         * @type {?}
         * @private
         */
        NodeAsset.prototype.localTransformation;
        /**
         * @type {?}
         * @private
         */
        NodeAsset.prototype.absoluteTransformation;
    }
    class BufferAssetWebGL {
        /**
         * @param {?} reader
         * @param {?} bufferID
         * @param {?} isElementBuffer
         */
        constructor(reader, bufferID, isElementBuffer) {
            this.bufferSize = 0;
            this.isElementBuffer = false;
            this.bufferID = bufferID;
            this.isElementBuffer = isElementBuffer;
            if (reader) {
                /** @type {?} */
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
        /**
         * @return {?}
         */
        get BufferID() {
            return this.bufferID;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set BufferID(value) {
            this.bufferID = value;
        }
        /**
         * @return {?}
         */
        get Buffer() {
            return this.webGLBuffer;
        }
        /**
         * @return {?}
         */
        get BufferSize() {
            return this.bufferSize;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set BufferSize(value) {
            this.bufferSize = value;
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
            this.webGLBuffer = stage.gl.createBuffer();
            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ELEMENT_ARRAY_BUFFER, (/** @type {?} */ (this.bufferData)), stage.gl.STATIC_DRAW);
            }
            else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ARRAY_BUFFER, (/** @type {?} */ (this.bufferData)), stage.gl.STATIC_DRAW);
            }
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        bind(stage) {
            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
            }
            else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
            }
        }
        /**
         * @param {?} stage
         * @param {?} attributeLocation
         * @param {?} size
         * @param {?} stride
         * @param {?} offset
         * @return {?}
         */
        bindInterleaved(stage, attributeLocation, size, stride, offset) {
            if (attributeLocation >= 0) {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.enableVertexAttribArray(attributeLocation);
                stage.gl.vertexAttribPointer(attributeLocation, size, stage.gl.FLOAT, false, stride, offset);
            }
        }
    }
    modelstageweb.BufferAssetWebGL = BufferAssetWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        BufferAssetWebGL.prototype.bufferID;
        /**
         * @type {?}
         * @private
         */
        BufferAssetWebGL.prototype.bufferSize;
        /** @type {?} */
        BufferAssetWebGL.prototype.bufferData;
        /**
         * @type {?}
         * @private
         */
        BufferAssetWebGL.prototype.webGLBuffer;
        /**
         * @type {?}
         * @private
         */
        BufferAssetWebGL.prototype.isElementBuffer;
    }
    class OpaqueMeshBuilder {
        constructor() {
            this.vertices = [];
            this.indices = [];
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?=} doubleSided
         * @return {?}
         */
        addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, doubleSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, x1, y1, z1, 0, 0, 1, r, g, b, x2, y2, z2, 0, 0, 1, r, g, b);
            /** @type {?} */
            let i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (doubleSided) {
                this.vertices.push(x1, y1, z1, 0, 0, 1, r, g, b, x0, y0, z0, 0, 0, 1, r, g, b, x2, y2, z2, 0, 0, 1, r, g, b);
                i = this.indices.length;
                this.indices.push(i, i + 1, i + 2);
            }
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} x3
         * @param {?} y3
         * @param {?} z3
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?=} doubleSided
         * @return {?}
         */
        addQuad(x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3, r, g, b, doubleSided) {
            this.addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, doubleSided);
            this.addTri(x0, y0, z0, x2, y2, z2, x3, y3, z3, r, g, b, doubleSided);
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @return {?}
         */
        addStroke(x0, y0, z0, x1, y1, z1, r, g, b) {
            /** @type {?} */
            let dir = new psgeometry.Vec3(x1, y1, z1).sub(new psgeometry.Vec3(x0, y0, z0));
            /** @type {?} */
            let radius = dir.norm();
            /** @type {?} */
            let azimuth = Math.atan2(-dir.z, dir.x);
            /** @type {?} */
            let polar = Math.asin(dir.y / radius);
            /** @type {?} */
            let thickness = .01;
            /** @type {?} */
            let up = (/** @type {?} */ (psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, thickness, 0, 1))));
            /** @type {?} */
            let front = (/** @type {?} */ (psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, 0, thickness, 1))));
            this.addQuad(x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z, x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z, x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z, x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z, r, g, b);
            this.addQuad(x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z, x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z, x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z, x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z, r, g, b);
            this.addQuad(x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z, x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z, x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z, x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z, r, g, b);
            this.addQuad(x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z, x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z, x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z, x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z, r, g, b);
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
            /** @type {?} */
            let vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 9 * 4;
            /** @type {?} */
            let indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        }
        /**
         * @param {?} stage
         * @param {?} figureID
         * @return {?}
         */
        createFigure(stage, figureID) {
            this.indBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_indices', true);
            this.vertBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_vertices', false);
            this.initialize(stage);
            stage.AssetStore.addBufferAsset(figureID + '_indices', this.indBufferAsset);
            stage.AssetStore.addBufferAsset(figureID + '_vertices', this.vertBufferAsset);
            /** @type {?} */
            let shaderInstance = new modelstageweb.MeshShaderInstance('OpaqueMeshShader');
            shaderInstance.addReference('IndexBuffer', figureID + '_indices');
            shaderInstance.addReference('VertexBuffer', figureID + '_vertices');
            /** @type {?} */
            let figure = new modelstageweb.FigureWebGL(figureID);
            figure.addShaderInstance(shaderInstance);
            return figure;
        }
    }
    modelstageweb.OpaqueMeshBuilder = OpaqueMeshBuilder;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        OpaqueMeshBuilder.prototype.vertices;
        /**
         * @type {?}
         * @private
         */
        OpaqueMeshBuilder.prototype.indices;
        /**
         * @type {?}
         * @private
         */
        OpaqueMeshBuilder.prototype.vertBufferAsset;
        /**
         * @type {?}
         * @private
         */
        OpaqueMeshBuilder.prototype.indBufferAsset;
    }
    class TransparentMeshBuilder {
        /**
         * @param {?} vertBufferAsset
         * @param {?} indBufferAsset
         */
        constructor(vertBufferAsset, indBufferAsset) {
            this.vertBufferAsset = vertBufferAsset;
            this.indBufferAsset = indBufferAsset;
            this.vertices = [];
            this.indices = [];
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?} a
         * @param {?=} twoSided
         * @return {?}
         */
        addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, a, twoSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, a, x1, y1, z1, 0, 0, 1, r, g, b, a, x2, y2, z2, 0, 0, 1, r, g, b, a);
            /** @type {?} */
            let i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (twoSided) {
                this.addTri(x0, y0, z0, x2, y2, z2, x1, y1, z1, r, g, b, a);
            }
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} x3
         * @param {?} y3
         * @param {?} z3
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?} a
         * @param {?=} twoSided
         * @return {?}
         */
        addQuad(x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3, r, g, b, a, twoSided) {
            this.addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, a, twoSided);
            this.addTri(x0, y0, z0, x2, y2, z2, x3, y3, z3, r, g, b, a, twoSided);
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
            /** @type {?} */
            let vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 10 * 4;
            /** @type {?} */
            let indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        }
    }
    modelstageweb.TransparentMeshBuilder = TransparentMeshBuilder;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TransparentMeshBuilder.prototype.vertices;
        /**
         * @type {?}
         * @private
         */
        TransparentMeshBuilder.prototype.indices;
        /**
         * @type {?}
         * @protected
         */
        TransparentMeshBuilder.prototype.vertBufferAsset;
        /**
         * @type {?}
         * @protected
         */
        TransparentMeshBuilder.prototype.indBufferAsset;
    }
    class TexturedMeshBuilder {
        /**
         * @param {?} vertBufferAsset
         * @param {?} indBufferAsset
         */
        constructor(vertBufferAsset, indBufferAsset) {
            this.vertBufferAsset = vertBufferAsset;
            this.indBufferAsset = indBufferAsset;
            this.vertices = [];
            this.indices = [];
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} u0
         * @param {?} v0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} u1
         * @param {?} v1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} u2
         * @param {?} v2
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?=} twoSided
         * @return {?}
         */
        addTri(x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, r, g, b, twoSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, u0, v0, x1, y1, z1, 0, 0, 1, r, g, b, u1, v1, x2, y2, z2, 0, 0, 1, r, g, b, u2, v2);
            /** @type {?} */
            let i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (twoSided) {
                this.addTri(x0, y0, z0, u0, v0, x2, y2, z2, u2, v2, x1, y1, z1, u1, v1, r, g, b);
            }
        }
        /**
         * @param {?} x0
         * @param {?} y0
         * @param {?} z0
         * @param {?} u0
         * @param {?} v0
         * @param {?} x1
         * @param {?} y1
         * @param {?} z1
         * @param {?} u1
         * @param {?} v1
         * @param {?} x2
         * @param {?} y2
         * @param {?} z2
         * @param {?} u2
         * @param {?} v2
         * @param {?} x3
         * @param {?} y3
         * @param {?} z3
         * @param {?} u3
         * @param {?} v3
         * @param {?} r
         * @param {?} g
         * @param {?} b
         * @param {?=} twoSided
         * @return {?}
         */
        addQuad(x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r, g, b, twoSided) {
            this.addTri(x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, r, g, b, twoSided);
            this.addTri(x0, y0, z0, u0, v0, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r, g, b, twoSided);
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
            /** @type {?} */
            let vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 11 * 4;
            /** @type {?} */
            let indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        }
    }
    modelstageweb.TexturedMeshBuilder = TexturedMeshBuilder;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TexturedMeshBuilder.prototype.vertices;
        /**
         * @type {?}
         * @private
         */
        TexturedMeshBuilder.prototype.indices;
        /**
         * @type {?}
         * @protected
         */
        TexturedMeshBuilder.prototype.vertBufferAsset;
        /**
         * @type {?}
         * @protected
         */
        TexturedMeshBuilder.prototype.indBufferAsset;
    }
    class TextureAssetWebGL {
        /**
         * @param {?} stage
         * @param {?} image
         */
        constructor(stage, image) {
            if (image instanceof WebGLTexture) {
                this.texture = image;
            }
            else {
                this.texture = stage.gl.createTexture();
                stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.texture);
                stage.gl.texImage2D(stage.gl.TEXTURE_2D, 0, stage.gl.RGBA, stage.gl.RGBA, stage.gl.UNSIGNED_BYTE, image);
                stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MAG_FILTER, stage.gl.LINEAR);
                stage.gl.texParameteri(stage.gl.TEXTURE_2D, stage.gl.TEXTURE_MIN_FILTER, stage.gl.LINEAR_MIPMAP_NEAREST);
                stage.gl.generateMipmap(stage.gl.TEXTURE_2D);
                stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
            }
        }
        /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        bind(stage, program, attributeName) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.uniform1i(stage.gl.getUniformLocation(program.Program, attributeName), 0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.texture);
        }
        /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        unbind(stage, program, attributeName) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
        }
    }
    modelstageweb.TextureAssetWebGL = TextureAssetWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TextureAssetWebGL.prototype.texture;
    }
    /// An asset store class for WebGL.
    class AssetStoreWebGL {
        constructor() {
            /// All aggregated figures.
            this.figures = {};
            /// All aggregated nodes assets.
            this.rootNodeAssets = {};
            /// All aggregated buffer assets.
            this.bufferAssets = {};
            /// All aggregated texture assets.
            this.textureAssets = {};
        }
        /// Adds the specified figure to the the store.
        /**
         * @param {?} figure
         * @return {?}
         */
        addFigure(figure) {
            this.figures[figure.FigureID] = figure;
        }
        /// Determines the figure with the the specified id.
        /**
         * @param {?} figureID
         * @return {?}
         */
        getFigure(figureID) {
            return this.figures[figureID];
        }
        /// Adds a buffer asset to the store.
        /**
         * @param {?} bufferAssetID
         * @param {?} bufferAsset
         * @return {?}
         */
        addBufferAsset(bufferAssetID, bufferAsset) {
            this.bufferAssets[bufferAssetID] = bufferAsset;
        }
        /**
         * @param {?} node
         * @return {?}
         */
        addRootNode(node) {
            this.rootNodeAssets[node.Name] = node;
        }
        /// Determines the buffer asset with the specified id.
        /**
         * @param {?} bufferAssetID
         * @return {?}
         */
        getBufferAsset(bufferAssetID) {
            return this.bufferAssets[bufferAssetID];
        }
        /// Adds a texture asset to the store.
        /**
         * @param {?} textureAssetID
         * @param {?} textureAsset
         * @return {?}
         */
        addTextureAsset(textureAssetID, textureAsset) {
            this.textureAssets[textureAssetID] = textureAsset;
        }
        /// Determines the texture asset with the specified id.
        /**
         * @param {?} textureAssetID
         * @return {?}
         */
        getTextureAsset(textureAssetID) {
            return this.textureAssets[textureAssetID];
        }
        /// Returns the map of aggregated figures.
        /**
         * @return {?}
         */
        get Figures() {
            return this.figures;
        }
        /**
         * @param {?} name
         * @return {?}
         */
        getRootNode(name) {
            return this.rootNodeAssets[name];
        }
    }
    modelstageweb.AssetStoreWebGL = AssetStoreWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        AssetStoreWebGL.prototype.figures;
        /**
         * @type {?}
         * @private
         */
        AssetStoreWebGL.prototype.rootNodeAssets;
        /**
         * @type {?}
         * @private
         */
        AssetStoreWebGL.prototype.bufferAssets;
        /**
         * @type {?}
         * @private
         */
        AssetStoreWebGL.prototype.textureAssets;
    }
    /**
     * @record
     */
    function SceneItemFilterWebGL() { }
    modelstageweb.SceneItemFilterWebGL = SceneItemFilterWebGL;
    if (false) {
        /**
         * @param {?} sceneItem
         * @param {?} context
         * @return {?}
         */
        SceneItemFilterWebGL.prototype.passes = function (sceneItem, context) { };
    }
    class GenericSceneItemFilterWebGL {
        /**
         * @param {?} sceneItem
         * @param {?} context
         * @return {?}
         */
        passes(sceneItem, context) {
            return context.Phase != 'Shadow';
        }
    }
    modelstageweb.GenericSceneItemFilterWebGL = GenericSceneItemFilterWebGL;
    class SceneItemWebGL {
        /**
         * @param {?} scene
         * @param {?} sceneItemID
         * @param {?=} isVisible
         * @param {?=} testIntersection
         * @param {?=} childrenVisible
         * @param {?=} testChildrenIntersection
         */
        constructor(scene, sceneItemID, isVisible, testIntersection, childrenVisible, testChildrenIntersection) {
            this.children = [];
            this.childrenByKey = {};
            this.data = {};
            this.scene = scene;
            this.sceneItemID = sceneItemID;
            this.isVisible = isVisible || typeof isVisible === 'undefined';
            this.childrenVisible = childrenVisible || typeof childrenVisible === 'undefined';
            this.testIntersection = testIntersection || typeof testIntersection === 'undefined';
            this.testChildrenIntersection = testChildrenIntersection || typeof testChildrenIntersection === 'undefined';
        }
        /**
         * @return {?}
         */
        get Data() {
            return this.data;
        }
        /**
         * @return {?}
         */
        get Scene() {
            return this.scene;
        }
        /**
         * @return {?}
         */
        get SceneItemID() {
            return this.sceneItemID;
        }
        /**
         * @return {?}
         */
        get Children() {
            return this.children;
        }
        /**
         * @return {?}
         */
        get TestChildrenIntersection() {
            return this.testChildrenIntersection;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        set TestChildrenIntersection(val) {
            this.testChildrenIntersection = val;
        }
        /**
         * @return {?}
         */
        get TestIntersection() {
            return this.testIntersection;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        set TestIntersection(val) {
            this.testIntersection = val;
        }
        /**
         * @return {?}
         */
        get Filter() { return this.filter; }
        /**
         * @param {?} value
         * @return {?}
         */
        set Filter(value) {
            this.filter = value;
        }
        /**
         * @param {?} sceneItem
         * @return {?}
         */
        addChild(sceneItem) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.push(sceneItem);
            sceneItem.addedToSceneGraph(this);
        }
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        getChild(sceneItemID) {
            return this.childrenByKey[sceneItemID];
        }
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        removeChild(sceneItemID) {
            this.children = this.children.filter(sceneItem => sceneItem.sceneItemID != sceneItemID);
            delete this.childrenByKey[sceneItemID];
        }
        /**
         * @param {?} sceneItem
         * @param {?} index
         * @return {?}
         */
        insertChild(sceneItem, index) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.splice(index, 0, sceneItem);
            sceneItem.addedToSceneGraph(this);
        }
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        beginRender(context) {
        }
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        endRender(context) {
        }
        /**
         * @param {?} context
         * @return {?}
         */
        render(context) {
            if (!this.filter || this.filter.passes(this, context)) {
                if (this.isVisible) {
                    this.beginRender(context);
                    this.renderChildren(context);
                    this.endRender(context);
                }
                else {
                    this.renderChildren(context);
                }
            }
        }
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        renderChildren(context) {
            if (this.childrenVisible) {
                this.children.forEach((child) => {
                    child.render(context);
                });
            }
        }
        /**
         * @param {?} parentSceneItem
         * @return {?}
         */
        addedToSceneGraph(parentSceneItem) {
            this.scene = parentSceneItem.scene;
            this.parent = parentSceneItem;
        }
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        intersectsBoundingBox(ray, at) {
            return false;
        }
        /**
         * @protected
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        isIntersectionCandidate(ray, at) {
            return this.intersectsBoundingBox(ray, at);
        }
        /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        addIntersectionCandidates(ray, candidates) {
            if (this.testIntersection) {
                /** @type {?} */
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
    modelstageweb.SceneItemWebGL = SceneItemWebGL;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.scene;
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.parent;
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.sceneItemID;
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.children;
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.childrenByKey;
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.isVisible;
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.childrenVisible;
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.testIntersection;
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.testChildrenIntersection;
        /**
         * @type {?}
         * @protected
         */
        SceneItemWebGL.prototype.filter;
        /**
         * @type {?}
         * @private
         */
        SceneItemWebGL.prototype.data;
    }
    class ActorWebGL extends SceneItemWebGL {
        /**
         * @param {?} scene
         * @param {?} actorID
         */
        constructor(scene, actorID) {
            super(scene, actorID);
            this.figures = [];
            this.state = new RenderState();
        }
        /**
         * @return {?}
         */
        get State() {
            return this.state;
        }
        /**
         * @return {?}
         */
        get Figures() {
            return this.figures;
        }
        /**
         * @param {?} figure
         * @return {?}
         */
        addFigure(figure) {
            this.figures.push(figure);
        }
        /**
         * @param {?} context
         * @return {?}
         */
        beginRender(context) {
            this.figures.forEach((figure) => {
                figure.render(context);
            });
        }
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        intersectsBoundingBox(ray, at) {
            /** @type {?} */
            let transformedRay = this.inverseModelTransform ? ray.transform(this.inverseModelTransform) : ray;
            /** @type {?} */
            let result = false;
            for (let figureIdx in this.figures) {
                if (!result) {
                    result = this.figures[figureIdx].intersectsBoundingBox(transformedRay, at);
                    if (result) {
                        at.assignVec((/** @type {?} */ (this.lastModelTransform.multiply(at.asVec4()))));
                    }
                }
            }
            return result;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        render(context) {
            if (!this.filter || this.filter.passes(this, context)) {
                if (this.isVisible || this.childrenVisible) {
                    context.pushState(this.state);
                    if (this.isVisible) {
                        this.beginRender(context);
                        this.renderChildren(context);
                        this.endRender(context);
                    }
                    else {
                        this.renderChildren(context);
                    }
                    /** @type {?} */
                    let modelTransform = context.NodeTransform ? (/** @type {?} */ (context.NodeTransform.multiply(context.ModelTransform))) : context.ModelTransform;
                    if (!modelTransform.equals(this.lastModelTransform)) {
                        this.inverseModelTransform = modelTransform.inverse();
                        this.lastModelTransform = modelTransform;
                    }
                    context.popState();
                }
            }
        }
    }
    modelstageweb.ActorWebGL = ActorWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ActorWebGL.prototype.figures;
        /**
         * @type {?}
         * @private
         */
        ActorWebGL.prototype.lastModelTransform;
        /**
         * @type {?}
         * @private
         */
        ActorWebGL.prototype.inverseModelTransform;
        /**
         * @type {?}
         * @private
         */
        ActorWebGL.prototype.state;
    }
    class IntersectionCandidate {
        /**
         * @param {?} sceneItem
         * @param {?} squaredDist
         */
        constructor(sceneItem, squaredDist) {
            this.squaredDist = Infinity;
            this.sceneItem = sceneItem;
            this.squaredDist = squaredDist;
        }
        /**
         * @param {?} intersectionCandidate
         * @return {?}
         */
        compare(intersectionCandidate) {
            return this.squaredDist < intersectionCandidate.squaredDist ? -1 :
                (this.squaredDist > intersectionCandidate.squaredDist ? 1 : 0);
        }
    }
    modelstageweb.IntersectionCandidate = IntersectionCandidate;
    if (false) {
        /** @type {?} */
        IntersectionCandidate.prototype.sceneItem;
        /**
         * @type {?}
         * @private
         */
        IntersectionCandidate.prototype.squaredDist;
    }
    class RenderState {
        constructor() {
            this.entries = {};
        }
        /**
         * @return {?}
         */
        get Parent() {
            return this.parent;
        }
        /**
         * @param {?} val
         * @return {?}
         */
        set Parent(val) {
            this.parent = val;
        }
        /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        evaluate(entry) {
            return typeof entry == 'function' ? entry(this) : entry;
        }
        /**
         * @param {?} key
         * @return {?}
         */
        contains(key) {
            return this.entries[key] != undefined;
        }
        /**
         * @template T
         * @param {?} key
         * @param {?} defaultValue
         * @return {?}
         */
        get(key, defaultValue) {
            /** @type {?} */
            let result = defaultValue;
            this.tryGet(key, (val) => { result = val; });
            return result;
        }
        /**
         * @param {?} key
         * @param {?} lambda
         * @return {?}
         */
        tryGet(key, lambda) {
            if (this.contains(key)) {
                lambda(this.evaluate(this.entries[key]));
                return true;
            }
            else {
                return this.parent == null ? false : this.parent.tryGet(key, lambda);
            }
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        set(key, value) {
            this.entries[key] = value;
        }
    }
    modelstageweb.RenderState = RenderState;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        RenderState.prototype.parent;
        /**
         * @type {?}
         * @private
         */
        RenderState.prototype.entries;
    }
    class SceneWebGL {
        constructor() {
            this.isInitialized = false;
            this.sceneHierarchy = new SceneItemWebGL(this, '');
            this.dirty = true;
            this.state = new RenderState();
        }
        /**
         * @return {?}
         */
        get SceneHierarchy() {
            return this.sceneHierarchy;
        }
        /**
         * @return {?}
         */
        get IsInitialized() {
            return this.isInitialized;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set IsInitialized(value) {
            this.isInitialized = value;
        }
        /**
         * @return {?}
         */
        get State() {
            return this.state;
        }
        /**
         * @return {?}
         */
        initialize() {
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
            if (this.dirty) {
                this.dirty = false;
                return true;
            }
            else {
                return false;
            }
        }
        /**
         * @param {?} context
         * @return {?}
         */
        render(context) {
            if (this.isInitialized) {
                context.SceneCategory = this.getSceneCategory();
                // updateRunningSequences(context);
                context.pushState(this.state);
                this.sceneHierarchy.render(context);
                context.popState();
            }
        }
        /**
         * @param {?} sceneItem
         * @param {?} makeVisible
         * @return {?}
         */
        addSceneItem(sceneItem, makeVisible) {
            this.sceneHierarchy.addChild(sceneItem);
            this.setDirty();
        }
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        getSceneItem(sceneItemID) {
            return this.sceneHierarchy.getChild(sceneItemID);
        }
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        removeSceneItem(sceneItemID) {
            this.sceneHierarchy.removeChild(sceneItemID);
            this.setDirty();
        }
        /**
         * @param {?} sceneItem
         * @param {?} index
         * @param {?} makeVisible
         * @return {?}
         */
        insertSceneItem(sceneItem, index, makeVisible) {
            this.sceneHierarchy.insertChild(sceneItem, index);
            this.setDirty();
        }
        /**
         * @protected
         * @return {?}
         */
        getSceneCategory() {
            return '';
        }
        /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        getIntersectionCandidates(ray, candidates) {
            this.sceneHierarchy.addIntersectionCandidates(ray, candidates);
            candidates.sort((a, b) => { return a.compare(b); });
        }
        /**
         * @return {?}
         */
        beginFrame() { }
        /**
         * Update is called periodically (once per frame) to allow updating the state of the scene.
         * @return {?}
         */
        update() { }
        /**
         * @return {?}
         */
        endFrame() { }
    }
    modelstageweb.SceneWebGL = SceneWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        SceneWebGL.prototype.isInitialized;
        /**
         * @type {?}
         * @private
         */
        SceneWebGL.prototype.sceneHierarchy;
        /**
         * @type {?}
         * @private
         */
        SceneWebGL.prototype.dirty;
        /**
         * @type {?}
         * @private
         */
        SceneWebGL.prototype.state;
    }
    class Camera {
        constructor() {
            this.dirty = true;
        }
        /**
         * @return {?}
         */
        get ProjectionMatrix() { return this.projectionMatrix; }
        /**
         * @return {?}
         */
        get ViewMatrix() { return this.viewMatrix; }
        /**
         * @protected
         * @return {?}
         */
        setDirty() {
            this.dirty = true;
        }
        /**
         * @return {?}
         */
        isDirty() {
            if (this.dirty) {
                this.dirty = false;
                return true;
            }
            else {
                return false;
            }
        }
        /**
         * @param {?} eye
         * @param {?} center
         * @param {?} up
         * @return {?}
         */
        createViewMatrix(eye, center, up) {
            /** @type {?} */
            let z = eye.sub(center).normalize();
            /** @type {?} */
            let x = up.cross(z).normalize();
            /** @type {?} */
            let y = z.cross(x).normalize();
            /** @type {?} */
            let m = new psgeometry.Matrix4([x.x, x.y, x.z, 0,
                y.x, y.y, y.z, 0,
                z.x, z.y, z.z, 0,
                0, 0, 0, 1]);
            /** @type {?} */
            let t = new psgeometry.Matrix4([1, 0, 0, -eye.x,
                0, 1, 0, -eye.y,
                0, 0, 1, -eye.z,
                0, 0, 0, 1]);
            return (/** @type {?} */ (t.multiply(m)));
        }
        /**
         * @param {?} fovy
         * @param {?} aspect
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        createPerspectiveMatrix(fovy, aspect, znear, zfar) {
            /** @type {?} */
            let ymax = znear * Math.tan(fovy * Math.PI / 360.0);
            /** @type {?} */
            let ymin = -ymax;
            /** @type {?} */
            let xmin = ymin * aspect;
            /** @type {?} */
            let xmax = ymax * aspect;
            return this.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
        }
        /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} near
         * @param {?} far
         * @return {?}
         */
        createOrthographicMatrix(left, right, bottom, top, near, far) {
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
        /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        makeFrustum(left, right, bottom, top, znear, zfar) {
            /** @type {?} */
            let X = 2 * znear / (right - left);
            /** @type {?} */
            let Y = 2 * znear / (top - bottom);
            /** @type {?} */
            let A = (right + left) / (right - left);
            /** @type {?} */
            let B = (top + bottom) / (top - bottom);
            /** @type {?} */
            let C = -(zfar + znear) / (zfar - znear);
            /** @type {?} */
            let D = -2 * zfar * znear / (zfar - znear);
            return new psgeometry.Matrix4([
                X, 0, A, 0,
                0, Y, B, 0,
                0, 0, C, D,
                0, 0, -1, 0
            ]);
        }
    }
    modelstageweb.Camera = Camera;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        Camera.prototype.projectionMatrix;
        /**
         * @type {?}
         * @protected
         */
        Camera.prototype.inverseProjectionMatrix;
        /**
         * @type {?}
         * @protected
         */
        Camera.prototype.viewMatrix;
        /**
         * @type {?}
         * @protected
         */
        Camera.prototype.inverseViewMatrix;
        /**
         * @type {?}
         * @private
         */
        Camera.prototype.dirty;
    }
    class ShadowCameraWebGL extends Camera {
        constructor() {
            super(...arguments);
            this.shadowMapWidth = 1024;
            this.shadowMapHeight = 1024;
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        resize(stage) {
            this.projectionMatrix = this.createOrthographicMatrix(-5, 5, -5, 5, -30, 30);
            this.update(new psgeometry.Vec3(0, 10, 0), new psgeometry.Vec3(0, 0, 0), new psgeometry.Vec3(0, 0, -1));
            this.shadowFramebuffer = stage.gl.createFramebuffer();
            this.shadowDepthTexture = stage.gl.createTexture();
            this.renderBuffer = stage.gl.createRenderbuffer();
            /** @type {?} */
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
        /**
         * @param {?} bbox
         * @return {?}
         */
        updateShadowArea(bbox) {
            /** @type {?} */
            var center = bbox.center();
            /** @type {?} */
            var extents = bbox.extents();
            this.projectionMatrix = this.createOrthographicMatrix(-extents.x / 2, extents.x / 2, -extents.y / 2, extents.y / 2, -30, 30);
            this.update(new psgeometry.Vec3(center.x, 10, center.y), new psgeometry.Vec3(center.x, 0, center.y), new psgeometry.Vec3(0, 0, -1));
            this.setDirty();
        }
        /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        update(pos, lookAt, up) {
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);
            this.setDirty();
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        beginRender(stage) {
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
        /**
         * @param {?} stage
         * @return {?}
         */
        endRender(stage) {
        }
    }
    modelstageweb.ShadowCameraWebGL = ShadowCameraWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ShadowCameraWebGL.prototype.shadowMapWidth;
        /**
         * @type {?}
         * @private
         */
        ShadowCameraWebGL.prototype.shadowMapHeight;
        /**
         * @type {?}
         * @private
         */
        ShadowCameraWebGL.prototype.shadowFramebuffer;
        /**
         * @type {?}
         * @private
         */
        ShadowCameraWebGL.prototype.shadowDepthTexture;
        /**
         * @type {?}
         * @private
         */
        ShadowCameraWebGL.prototype.renderBuffer;
    }
    class CameraWebGL extends Camera {
        constructor() {
            super(...arguments);
            this.clientWidth = 1.0;
            this.clientHeight = 1.0;
        }
        /**
         * @return {?}
         */
        get ProjectionMatrix() {
            return this.projectionMatrix;
        }
        /**
         * @return {?}
         */
        get ViewMatrix() {
            return this.viewMatrix;
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        resize(stage) {
            /** @type {?} */
            let realToCSSPixels = window.devicePixelRatio || 1;
            this.clientWidth = stage.gl.canvas.clientWidth;
            this.clientHeight = stage.gl.canvas.clientHeight;
            // Lookup the size the browser is displaying the canvas in CSS pixels
            // and compute a size needed to make our drawingbuffer match it in
            // device pixels.
            /** @type {?} */
            let displayWidth = Math.floor(stage.gl.canvas.clientWidth * realToCSSPixels);
            /** @type {?} */
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
        /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        update(pos, lookAt, up) {
            this.currentCameraPos = pos;
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);
            this.inverseViewMatrix = this.viewMatrix.inverse();
            this.setDirty();
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        beginRender(stage) {
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
        /**
         * @param {?} stage
         * @return {?}
         */
        endRender(stage) {
        }
        /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        getViewRay(clientX, clientY) {
            /** @type {?} */
            let cursor = new psgeometry.Vec4(clientX / this.clientWidth * 2.0 - 1.0, 1.0 - clientY / this.clientHeight * 2.0, -1.0, 1.0);
            /** @type {?} */
            let direction = (/** @type {?} */ (this.inverseProjectionMatrix.multiply(cursor)));
            direction.w = 1.0;
            /** @type {?} */
            let forward = this.inverseViewMatrix.multiply(direction);
            return new psgeometry.Line3D(this.currentCameraPos, forward);
        }
    }
    modelstageweb.CameraWebGL = CameraWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        CameraWebGL.prototype.currentCameraPos;
        /**
         * @type {?}
         * @private
         */
        CameraWebGL.prototype.clientWidth;
        /**
         * @type {?}
         * @private
         */
        CameraWebGL.prototype.clientHeight;
    }
    class ShaderProgramWebGL {
        constructor() {
            this.isInitialized = false;
            this.SIZE_OF_FLOAT = 4;
        }
        /**
         * @return {?}
         */
        get Program() {
            return this.program;
        }
        /**
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        render(context, shaderInstance) {
            if (this.isInitialized && this.beginRender(context, shaderInstance)) {
                context.Stage.applyState(context);
                this.internalRender(context, shaderInstance);
                this.endRender(context, shaderInstance);
            }
        }
        /**
         * @protected
         * @param {?} stage
         * @param {?} attribName
         * @return {?}
         */
        getAttribLocation(stage, attribName) {
            return stage.gl.getAttribLocation(this.program, attribName);
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        beginRender(context, shaderInstance) {
            context.Stage.gl.useProgram(this.program);
            return true;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        endRender(context, shaderInstance) {
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        initialize(stage) {
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
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
            return '';
        }
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            return '';
        }
    }
    modelstageweb.ShaderProgramWebGL = ShaderProgramWebGL;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ShaderProgramWebGL.prototype.isInitialized;
        /**
         * @type {?}
         * @protected
         */
        ShaderProgramWebGL.prototype.vertexShader;
        /**
         * @type {?}
         * @protected
         */
        ShaderProgramWebGL.prototype.fragmentShader;
        /**
         * @type {?}
         * @protected
         */
        ShaderProgramWebGL.prototype.program;
        /**
         * @type {?}
         * @protected
         */
        ShaderProgramWebGL.prototype.SIZE_OF_FLOAT;
    }
    class OpaqueMeshShaderProgramWebGL extends ShaderProgramWebGL {
        /**
         * @protected
         * @return {?}
         */
        getStride() {
            return this.SIZE_OF_FLOAT * 9;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
            /** @type {?} */
            let stage = context.Stage;
            /** @type {?} */
            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                // draw triangles
                /** @type {?} */
                let triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        }
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
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
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            return `varying mediump vec4 vColor;

                void main()
                {
                   gl_FragColor = vColor;
                }`;
        }
    }
    modelstageweb.OpaqueMeshShaderProgramWebGL = OpaqueMeshShaderProgramWebGL;
    class TransparentMeshShaderProgramWebGL extends ShaderProgramWebGL {
        /**
         * @protected
         * @return {?}
         */
        getStride() {
            return this.SIZE_OF_FLOAT * 10;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
            /** @type {?} */
            let stage = context.Stage;
            /** @type {?} */
            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
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
                /** @type {?} */
                let triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                stage.gl.depthMask(true);
                stage.gl.disable(stage.gl.BLEND);
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        }
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
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
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            return `varying mediump vec4 vColor;

                void main()
                {
                   gl_FragColor = vColor;
                }`;
        }
    }
    modelstageweb.TransparentMeshShaderProgramWebGL = TransparentMeshShaderProgramWebGL;
    let TexturedMeshShaderProgramVariants;
    (function (TexturedMeshShaderProgramVariants) {
        TexturedMeshShaderProgramVariants[TexturedMeshShaderProgramVariants["Diffuse"] = 0] = "Diffuse";
        TexturedMeshShaderProgramVariants[TexturedMeshShaderProgramVariants["Matcap"] = 1] = "Matcap";
    })(TexturedMeshShaderProgramVariants = modelstageweb.TexturedMeshShaderProgramVariants || (modelstageweb.TexturedMeshShaderProgramVariants = {}));
    class TexturedMeshShaderProgramWebGL extends ShaderProgramWebGL {
        /**
         * @param {?=} variant
         */
        constructor(variant = TexturedMeshShaderProgramVariants.Diffuse) {
            super();
            this.variant = variant;
        }
        /**
         * @protected
         * @return {?}
         */
        getStride() {
            return this.SIZE_OF_FLOAT * 11;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
            /** @type {?} */
            let stage = context.Stage;
            /** @type {?} */
            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);
                /** @type {?} */
                let textureKey = shaderInstance.getReference('TextureBuffer');
                /** @type {?} */
                let textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');
                    // draw triangles
                    /** @type {?} */
                    let triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        }
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
            /** @type {?} */
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
                case TexturedMeshShaderProgramVariants.Diffuse:
                    result +=
                        `vTextureCoords = aTextureCoords;
`;
                    break;
                case TexturedMeshShaderProgramVariants.Matcap:
                    result +=
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
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            /** @type {?} */
            let result = `uniform sampler2D uTexture0;

                varying mediump vec4 vColor;
                varying mediump vec2 vTextureCoords;
                varying mediump float vLightIntensity;

                void main()
                {
            	    mediump vec4 texColor = texture2D(uTexture0, vec2(vTextureCoords.x, 1.0 - vTextureCoords.y));
`;
            switch (this.variant) {
                case TexturedMeshShaderProgramVariants.Diffuse:
                    result +=
                        `gl_FragColor = vec4(clamp(texColor.xyz * (1.0 + .15 * vLightIntensity), 0.0, 1.0), texColor.a); 
            `;
                    break;
                case TexturedMeshShaderProgramVariants.Matcap:
                    result +=
                        `gl_FragColor = texColor.a;   
`;
                    break;
            }
            result += `}`;
            return result;
        }
    }
    modelstageweb.TexturedMeshShaderProgramWebGL = TexturedMeshShaderProgramWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TexturedMeshShaderProgramWebGL.prototype.variant;
    }
    class ShadowTexturedMeshShaderProgramWebGL extends TexturedMeshShaderProgramWebGL {
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
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
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            return `uniform sampler2D uTexture0;
                varying mediump float height;


                void main()
                {
                    gl_FragColor = vec4(.2, .2, .2, clamp(1.0 - (height / 3.0), 0.0, 1.0)); 
                }`;
        }
    }
    modelstageweb.ShadowTexturedMeshShaderProgramWebGL = ShadowTexturedMeshShaderProgramWebGL;
    class MatCapShaderProgramWebGL extends ShaderProgramWebGL {
        /**
         * @protected
         * @return {?}
         */
        getStride() {
            return this.SIZE_OF_FLOAT * 11;
        }
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        internalRender(context, shaderInstance) {
            /** @type {?} */
            let stage = context.Stage;
            /** @type {?} */
            let bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                let bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);
                /** @type {?} */
                let textureKey = shaderInstance.getReference('TextureBuffer');
                /** @type {?} */
                let textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');
                    /** @type {?} */
                    let color = context.State.get('Color', psgeometry.Vec4.One);
                    /** @type {?} */
                    let uColorLoc = stage.gl.getUniformLocation(this.program, 'uColor');
                    stage.gl.uniform4fv(uColorLoc, color.elements());
                    // draw triangles
                    /** @type {?} */
                    let triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }
            }
        }
        /**
         * @return {?}
         */
        getVertexShaderSrc() {
            /** @type {?} */
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
        /**
         * @return {?}
         */
        getFragmentShaderSrc() {
            /** @type {?} */
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
    modelstageweb.MatCapShaderProgramWebGL = MatCapShaderProgramWebGL;
    class RenderStateStack {
        constructor() {
            this.modelTransform = [psgeometry.Matrix4.Identity];
            this.stack = [];
        }
        /**
         * Top of the state stack.
         * @return {?}
         */
        get Top() {
            return this.stack[this.stack.length - 1];
        }
        /**
         * Determines the current model transformation.
         * @return {?}
         */
        get CurrentModelTransform() {
            return this.modelTransform[this.modelTransform.length - 1];
        }
        /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        pushState(state) {
            state.Parent = this.stack.length == 0 ? null : this.Top;
            this.stack.push(state);
            if (state.contains('ModelTransform')) {
                /** @type {?} */
                let modelTransform = state.get('ModelTransform', psgeometry.Matrix4.Identity);
                this.modelTransform.push((/** @type {?} */ (this.CurrentModelTransform.multiply(modelTransform))));
            }
            else {
                this.modelTransform.push(this.CurrentModelTransform);
            }
        }
        /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        popState() {
            this.Top.Parent = null;
            this.stack.pop();
            this.modelTransform.pop();
        }
    }
    if (false) {
        /**
         * @type {?}
         * @private
         */
        RenderStateStack.prototype.modelTransform;
        /**
         * @type {?}
         * @private
         */
        RenderStateStack.prototype.stack;
    }
    /**
     * A RenderContext instance is used to pass environment data to SceneItems during the rendition process.
     *
     * Besides the Stage that the SceneItems are being rendered to, the render context is the owner of a state stack
     * that may be updated by SceneItems and that is consequently used by ShaderPrograms to set shader data and resources (like model transformation
     * and auxiliary data). As SceneItems are organized in a hierarchical way, the current state may be defined by the current SceneItem, but
     * also by previously traversed SceneItems in the scene hierarchy.
     */
    class RenderContextWebGL {
        constructor() {
            this.sceneCategory = '';
            this.stateStack = new RenderStateStack();
            this.modelTransform = null;
            this.nodeTransform = null;
            this.phase = '';
        }
        /**
         * @return {?}
         */
        get Phase() { return this.phase; }
        /**
         * @param {?} value
         * @return {?}
         */
        set Phase(value) { this.phase = value; }
        /**
         * Returns the current state that is composed of previously set state values.
         * @return {?}
         */
        get State() {
            return this.stateStack.Top;
        }
        /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        pushState(state) {
            this.stateStack.pushState(state);
        }
        /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        popState() {
            this.stateStack.popState();
        }
        /**
         * @return {?}
         */
        get ModelTransform() {
            return this.stateStack.CurrentModelTransform;
        }
        /**
         * The current scene's category.
         * @return {?}
         */
        get SceneCategory() {
            return this.sceneCategory;
        }
        /**
         * The current scene's category.
         * @param {?} value
         * @return {?}
         */
        set SceneCategory(value) {
            this.sceneCategory = value;
        }
        /**
         * The stage the SceneItems are being rendered to.
         * @return {?}
         */
        get Stage() {
            return this.stage;
        }
        /**
         * The stage the SceneItems are being rendered to.
         * @param {?} value
         * @return {?}
         */
        set Stage(value) {
            this.stage = value;
        }
        /**
         * @return {?}
         */
        get Camera() {
            return this.camera;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set Camera(value) {
            this.camera = value;
        }
        /**
         * The current shader program.
         * @return {?}
         */
        get ShaderProgram() {
            return this.shaderProgram;
        }
        /**
         * The current shader program.
         * @param {?} value
         * @return {?}
         */
        set ShaderProgram(value) {
            this.shaderProgram = value;
        }
        /**
         * @return {?}
         */
        get NodeTransform() {
            return this.nodeTransform;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set NodeTransform(value) {
            this.nodeTransform = value;
        }
    }
    modelstageweb.RenderContextWebGL = RenderContextWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        RenderContextWebGL.prototype.stage;
        /**
         * @type {?}
         * @private
         */
        RenderContextWebGL.prototype.camera;
        /**
         * @type {?}
         * @private
         */
        RenderContextWebGL.prototype.shaderProgram;
        /**
         * @type {?}
         * @private
         */
        RenderContextWebGL.prototype.sceneCategory;
        /**
         * @type {?}
         * @private
         */
        RenderContextWebGL.prototype.stateStack;
        /**
         * @type {?}
         * @private
         */
        RenderContextWebGL.prototype.modelTransform;
        /**
         * @type {?}
         * @private
         */
        RenderContextWebGL.prototype.nodeTransform;
        /**
         * @type {?}
         * @private
         */
        RenderContextWebGL.prototype.phase;
    }
    class StageWebGL {
        /**
         * @param {?} canvasElementId
         */
        constructor(canvasElementId) {
            this.phaseSpecificShaderPrograms = {};
            this.shaderPrograms = {};
            this.tools = new ToolsWebGL(this);
            try {
                this.context = new RenderContextWebGL();
                this.context.Stage = this;
                this.assetStore = new AssetStoreWebGL();
                this.assetFactory = new AssetFactoryWebGL(this);
                this.canvas = (/** @type {?} */ (document.getElementById(canvasElementId)));
                if (this.canvas) {
                    this.gl = (/** @type {?} */ ((this.canvas.getContext('webgl') || (this.canvas.getContext('experimental-webgl')))));
                    /** @type {?} */
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
        /**
         * @return {?}
         */
        get Canvas() {
            return this.canvas;
        }
        /**
         * @return {?}
         */
        get Camera() {
            return this.camera;
        }
        /**
         * @return {?}
         */
        get Tools() {
            return this.tools;
        }
        /**
         * @return {?}
         */
        get AssetFactory() {
            return this.assetFactory;
        }
        /**
         * @return {?}
         */
        get AssetStore() {
            return this.assetStore;
        }
        /**
         * @return {?}
         */
        initialize() {
            this.shadowCamera = new ShadowCameraWebGL();
            this.shadowCamera.resize(this);
            this.camera = new CameraWebGL();
            this.camera.resize(this);
            this.resize();
        }
        /**
         * @param {?} box
         * @return {?}
         */
        updateShadowArea(box) {
            this.shadowCamera.updateShadowArea(box);
        }
        /**
         * @param {?} context
         * @return {?}
         */
        applyState(context) {
            /** @type {?} */
            let program = context.ShaderProgram.Program;
            /** @type {?} */
            let resultingModelTransformation = psgeometry.Matrix4.Identity;
            if (context.ModelTransform && context.NodeTransform) {
                resultingModelTransformation = (/** @type {?} */ (context.NodeTransform.multiply(context.ModelTransform)));
            }
            else if (context.ModelTransform) {
                resultingModelTransformation = context.ModelTransform;
            }
            else if (context.NodeTransform) {
                resultingModelTransformation = context.NodeTransform;
            }
            /** @type {?} */
            let mMatrixLoc = this.gl.getUniformLocation(program, 'uMMatrix');
            this.gl.uniformMatrix4fv(mMatrixLoc, false, resultingModelTransformation.transpose().elements);
            /** @type {?} */
            let vMatrixLoc = this.gl.getUniformLocation(program, 'uVMatrix');
            this.gl.uniformMatrix4fv(vMatrixLoc, false, context.Camera.ViewMatrix.transpose().elements);
            /** @type {?} */
            let pMatrixLoc = this.gl.getUniformLocation(program, 'uPMatrix');
            this.gl.uniformMatrix4fv(pMatrixLoc, false, context.Camera.ProjectionMatrix.transpose().elements);
        }
        /**
         * @param {?} scene
         * @return {?}
         */
        render(scene) {
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
        /**
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        registerShaderProgram(shaderProgramKey, shaderProgram) {
            this.shaderPrograms[shaderProgramKey] = shaderProgram;
        }
        /**
         * @param {?} phaseKey
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        registerPhaseSpecificShaderProgram(phaseKey, shaderProgramKey, shaderProgram) {
            /** @type {?} */
            let phase = this.phaseSpecificShaderPrograms[phaseKey];
            if (!phase) {
                phase = {};
                this.phaseSpecificShaderPrograms[phaseKey] = phase;
            }
            phase[shaderProgramKey] = shaderProgram;
        }
        /**
         * @param {?} context
         * @param {?} shaderProgramKey
         * @return {?}
         */
        getShaderProgram(context, shaderProgramKey) {
            /** @type {?} */
            let result;
            if (context.phase) {
                /** @type {?} */
                let phase = this.phaseSpecificShaderPrograms[context.phase];
                if (phase) {
                    result = phase[shaderProgramKey];
                }
            }
            return result || this.shaderPrograms[shaderProgramKey];
        }
        /**
         * @private
         * @return {?}
         */
        resize() {
            this.canvas.width = this.canvas.parentElement.offsetWidth;
            this.canvas.height = this.canvas.parentElement.offsetHeight;
            this.camera.resize(this);
        }
    }
    modelstageweb.StageWebGL = StageWebGL;
    if (false) {
        /** @type {?} */
        StageWebGL.prototype.gl;
        /**
         * @type {?}
         * @private
         */
        StageWebGL.prototype.canvas;
        /**
         * @type {?}
         * @private
         */
        StageWebGL.prototype.camera;
        /**
         * @type {?}
         * @private
         */
        StageWebGL.prototype.shadowCamera;
        /**
         * @type {?}
         * @private
         */
        StageWebGL.prototype.context;
        /**
         * @type {?}
         * @private
         */
        StageWebGL.prototype.assetFactory;
        /**
         * @type {?}
         * @private
         */
        StageWebGL.prototype.assetStore;
        /**
         * @type {?}
         * @private
         */
        StageWebGL.prototype.phaseSpecificShaderPrograms;
        /**
         * @type {?}
         * @private
         */
        StageWebGL.prototype.shaderPrograms;
        /**
         * @type {?}
         * @private
         */
        StageWebGL.prototype.tools;
    }
    let ConnectionState;
    (function (ConnectionState) {
        ConnectionState[ConnectionState["Ready"] = 0] = "Ready";
        ConnectionState[ConnectionState["Connecting"] = 1] = "Connecting";
        ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
        ConnectionState[ConnectionState["Error"] = 3] = "Error";
    })(ConnectionState = modelstageweb.ConnectionState || (modelstageweb.ConnectionState = {}));
    ;
    /**
     * @abstract
     */
    class ServerConnection {
        constructor() {
            this.state = ConnectionState.Ready;
        }
        /**
         * @return {?}
         */
        get IsConnected() {
            return this.state == ConnectionState.Connected;
        }
        /**
         * @param {?} callback
         * @return {?}
         */
        onMessage(callback) {
            this.handleMessage = callback;
        }
        /**
         * @param {?} callback
         * @return {?}
         */
        onConnected(callback) {
            this.handleConnected = callback;
        }
    }
    modelstageweb.ServerConnection = ServerConnection;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ServerConnection.prototype.state;
        /**
         * @type {?}
         * @protected
         */
        ServerConnection.prototype.handleConnected;
        /**
         * @type {?}
         * @protected
         */
        ServerConnection.prototype.handleMessage;
        /**
         * @abstract
         * @return {?}
         */
        ServerConnection.prototype.connect = function () { };
        /**
         * @abstract
         * @return {?}
         */
        ServerConnection.prototype.disconnect = function () { };
        /**
         * @abstract
         * @param {?} data
         * @return {?}
         */
        ServerConnection.prototype.send = function (data) { };
    }
    class SignalRServerConnection extends ServerConnection {
        constructor() {
            super();
            this.connection = new HubConnectionBuilder()
                .withUrl('/api/state')
                .configureLogging(LogLevel.Trace)
                //.withHubProtocol(<any>(new MessagePackHubProtocol()))
                .build();
            this.connection.on('msg', (data) => {
                if (this.handleMessage) {
                    /** @type {?} */
                    let msg = new MessageEvent('binary', { data: data });
                    this.handleMessage(msg);
                }
            });
        }
        /**
         * @return {?}
         */
        connect() {
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
        /**
         * @return {?}
         */
        disconnect() {
            this.connection.stop()
                .then(() => {
                this.state = ConnectionState.Ready;
            })
                .catch(() => {
                this.state = ConnectionState.Error;
            });
        }
        /**
         * @param {?} data
         * @return {?}
         */
        send(data) {
            this.connection.invoke('Msg', data);
        }
    }
    modelstageweb.SignalRServerConnection = SignalRServerConnection;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        SignalRServerConnection.prototype.connection;
    }
    class WebSocketServerConnection extends ServerConnection {
        /**
         * @param {?=} url
         * @return {?}
         */
        connect(url) {
            if (this.state == ConnectionState.Ready || this.state == ConnectionState.Error) {
                /** @type {?} */
                let uri = url ? url : 'ws://' + window.location.host + '/api/scene';
                this.state = ConnectionState.Connecting;
                this.websocket = new WebSocket(uri);
                this.websocket.binaryType = 'arraybuffer';
                this.websocket.onopen = (event) => {
                    this.state = ConnectionState.Connected;
                    console.log('websocket connected.');
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
                    console.log('websocket error.');
                };
                this.websocket.onmessage = (event) => {
                    if (this.handleMessage) {
                        this.handleMessage(event);
                    }
                };
            }
            else {
            }
        }
        /**
         * @return {?}
         */
        disconnect() {
            this.websocket.close();
        }
        /**
         * @param {?} data
         * @return {?}
         */
        send(data) {
            this.websocket.send(data);
        }
    }
    modelstageweb.WebSocketServerConnection = WebSocketServerConnection;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        WebSocketServerConnection.prototype.websocket;
    }
    class Tool {
        /**
         * @param {?} interfaceController
         * @return {?}
         */
        enter(interfaceController) {
            this.interfaceController = interfaceController;
        }
        /**
         * @return {?}
         */
        leave() { }
        /**
         * @param {?} e
         * @return {?}
         */
        handleKeyUp(e) { return false; }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleMouseMove(e, x, y) { }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseDown(e) { }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) { }
        /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        handleDrag(e, startX, startY, dX, dY) { }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseWheel(e) { }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleClick(e, x, y) { }
    }
    modelstageweb.Tool = Tool;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        Tool.prototype.interfaceController;
    }
    class InterfaceController {
        constructor() {
            this.tools = [];
            this.leftButton = 0;
            this.leftButtonDown = false;
            this.startX = NaN;
            this.startY = NaN;
            this.lastX = NaN;
            this.lastY = NaN;
            this.onMove = null;
            this.onDrag = null;
            this.onMouseWheel = null;
        }
        /**
         * @private
         * @return {?}
         */
        hasTool() {
            return this.tools.length > 0;
        }
        /**
         * @return {?}
         */
        get CurrentTool() {
            return this.hasTool() ? this.tools[this.tools.length - 1] : null;
        }
        /**
         * @param {?} target
         * @return {?}
         */
        bindEvents(target) {
            this.target = target;
            JQuery(target).on('mousewheel', (e) => {
                this.mouseWheel(e);
            });
            JQuery(target).on('mousedown touchstart', (e) => {
                this.mouseDown(e);
                e.preventDefault();
            });
            if (!((/** @type {?} */ (target))).setCapture) {
                JQuery(document).on('mousemove touchmove', (e) => {
                    this.mouseMove(e);
                });
            }
            else {
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
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        updateLastPosition(e) {
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        }
        /**
         * @param {?} tool
         * @return {?}
         */
        pushTool(tool) {
            if (this.CurrentTool) {
                this.CurrentTool.leave();
            }
            this.tools.push(tool);
            tool.enter(this);
        }
        /**
         * @return {?}
         */
        popTool() {
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].leave();
                this.tools.pop();
            }
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].enter(this);
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        keyUp(e) {
            if (this.hasTool()) {
                return this.CurrentTool.handleKeyUp(e);
            }
            else {
                return false;
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseDown(e) {
            if (e.button == this.leftButton) {
                this.leftButtonDown = true;
                this.startX = e.clientX;
                this.startY = e.clientY;
                this.updateLastPosition(e);
                if (((/** @type {?} */ (e.target))).setCapture)
                    ((/** @type {?} */ (e.target))).setCapture();
            }
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseDown(e);
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseMove(e) {
            if (this.hasTool() && !e.ctrlKey) {
                if (this.leftButtonDown) {
                    this.CurrentTool.handleDrag(e, this.startX, this.startY, e.clientX - this.lastX, e.clientY - this.lastY);
                }
                this.CurrentTool.handleMouseMove(e, e.clientX, e.clientY);
            }
            else {
                if (this.leftButtonDown) {
                    this.drag(e, e.clientX - this.lastX, e.clientY - this.lastY);
                }
                else {
                    this.onMove(e, e.clientX, e.clientY);
                }
            }
            if (this.leftButtonDown) {
                this.updateLastPosition(e);
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseUp(e) {
            /** @type {?} */
            let updatePosition = false;
            if (e.button == this.leftButton) {
                this.leftButtonDown = false;
                updatePosition = true;
                if (((/** @type {?} */ (e.target))).releaseCapture)
                    ((/** @type {?} */ (e.target))).releaseCapture();
            }
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseUp(e);
            }
            else {
                if (updatePosition) {
                    this.updateLastPosition(e);
                }
            }
        }
        /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        drag(e, dX, dY) {
            if (this.onDrag) {
                this.onDrag(e, dX, dY);
            }
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseWheel(e) {
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseWheel(e);
            }
            else {
                if (this.onMouseWheel) {
                    this.onMouseWheel(e);
                }
                e.preventDefault();
            }
        }
    }
    modelstageweb.InterfaceController = InterfaceController;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        InterfaceController.prototype.tools;
        /**
         * @type {?}
         * @private
         */
        InterfaceController.prototype.leftButton;
        /**
         * @type {?}
         * @private
         */
        InterfaceController.prototype.leftButtonDown;
        /**
         * @type {?}
         * @private
         */
        InterfaceController.prototype.startX;
        /**
         * @type {?}
         * @private
         */
        InterfaceController.prototype.startY;
        /**
         * @type {?}
         * @private
         */
        InterfaceController.prototype.lastX;
        /**
         * @type {?}
         * @private
         */
        InterfaceController.prototype.lastY;
        /**
         * @type {?}
         * @private
         */
        InterfaceController.prototype.target;
        /** @type {?} */
        InterfaceController.prototype.onMove;
        /** @type {?} */
        InterfaceController.prototype.onDrag;
        /** @type {?} */
        InterfaceController.prototype.onMouseWheel;
    }
    class CameraController {
        /**
         * @param {?} stage
         * @param {?} camera
         * @param {?} interfaceController
         * @param {?} connection
         */
        constructor(stage, camera, interfaceController, connection) {
            this.radius = 20.0;
            this.yaw = 0.0;
            this.pitch = 0.0;
            this.dragDivisor = 100.0;
            this.rotateDivisor = 200.0;
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
        /**
         * @return {?}
         */
        get Yaw() {
            return this.yaw;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set Yaw(value) {
            this.yaw = value;
            this.updateCamera();
        }
        /**
         * @param {?} radius
         * @param {?} pitch
         * @param {?} yaw
         * @return {?}
         */
        construct(radius, pitch, yaw) {
            this.radius = radius;
            this.pitch = pitch;
            this.yaw = yaw;
            this.updateCamera();
        }
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        mouseWheel(e) {
            if (e.shiftKey) {
                /** @type {?} */
                let d = this.getViewDir().multiply(((/** @type {?} */ (e))).deltaY || ((/** @type {?} */ (e))).deltaX);
                this.center = this.center.sub(d);
            }
            else {
                this.radius += ((/** @type {?} */ (e))).deltaY * Math.log(this.radius + 1) / 2;
                this.radius = Math.max(0.01, this.radius);
            }
            this.updateCamera();
        }
        /**
         * @private
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        move(e, x, y) {
        }
        /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        drag(e, dX, dY) {
            if (e.shiftKey) {
                /** @type {?} */
                let x = this.getViewPlaneX();
                /** @type {?} */
                let y = this.getViewPlaneY();
                this.center = this.center
                    .add(x.multiply(dX / this.dragDivisor))
                    .add(y.multiply(dY / this.dragDivisor));
            }
            else {
                this.yaw -= dX / this.rotateDivisor;
                this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch - dY / this.rotateDivisor));
            }
            this.updateCamera();
        }
        /**
         * @private
         * @return {?}
         */
        getViewPlaneX() {
            /** @type {?} */
            let q;
            /** @type {?} */
            let r;
            /** @type {?} */
            let v;
            v = new psgeometry.Vec3(-1.0, 0.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        }
        /**
         * @private
         * @return {?}
         */
        getViewPlaneY() {
            /** @type {?} */
            let q;
            /** @type {?} */
            let r;
            /** @type {?} */
            let v;
            v = new psgeometry.Vec3(0.0, 1.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        }
        /**
         * @private
         * @return {?}
         */
        getViewDir() {
            /** @type {?} */
            let q;
            /** @type {?} */
            let r;
            /** @type {?} */
            let v;
            v = new psgeometry.Vec3(0.0, 0.0, -1.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        }
        /**
         * @private
         * @return {?}
         */
        getCameraPos() {
            /** @type {?} */
            let q;
            /** @type {?} */
            let r;
            /** @type {?} */
            let v;
            v = new psgeometry.Vec3(0.0, 0.0, this.radius);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v.add(this.center);
        }
        /**
         * @private
         * @return {?}
         */
        updateCamera() {
            this.camera.update(this.getCameraPos(), this.center, new psgeometry.Vec3(0.0, 1.0, 0.0));
        }
    }
    modelstageweb.CameraController = CameraController;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        CameraController.prototype.stage;
        /**
         * @type {?}
         * @private
         */
        CameraController.prototype.camera;
        /**
         * @type {?}
         * @private
         */
        CameraController.prototype.connection;
        /**
         * @type {?}
         * @private
         */
        CameraController.prototype.radius;
        /**
         * @type {?}
         * @private
         */
        CameraController.prototype.yaw;
        /**
         * @type {?}
         * @private
         */
        CameraController.prototype.pitch;
        /**
         * @type {?}
         * @private
         */
        CameraController.prototype.center;
        /**
         * @type {?}
         * @private
         */
        CameraController.prototype.dragDivisor;
        /**
         * @type {?}
         * @private
         */
        CameraController.prototype.rotateDivisor;
    }
    class CommonMessageTypes {
    }
    CommonMessageTypes.AppStateDelta = 0x0100;
    CommonMessageTypes.ServerHandshake = 0x0101;
    CommonMessageTypes.ClientHandshake = 0x0102;
    CommonMessageTypes.ClientConfirmation = 0x0103;
    CommonMessageTypes.AppStateInitialization = 0x104;
    CommonMessageTypes.AnchorRequest = 0x01fe;
    CommonMessageTypes.SharedAnchor = 0x01ff;
    modelstageweb.CommonMessageTypes = CommonMessageTypes;
    if (false) {
        /** @type {?} */
        CommonMessageTypes.AppStateDelta;
        /** @type {?} */
        CommonMessageTypes.ServerHandshake;
        /** @type {?} */
        CommonMessageTypes.ClientHandshake;
        /** @type {?} */
        CommonMessageTypes.ClientConfirmation;
        /** @type {?} */
        CommonMessageTypes.AppStateInitialization;
        /** @type {?} */
        CommonMessageTypes.AnchorRequest;
        /** @type {?} */
        CommonMessageTypes.SharedAnchor;
    }
    class NetworkChannelMessage {
        constructor() {
            this.messageType = CommonMessageTypes.AppStateDelta;
        }
        /**
         * @return {?}
         */
        get Content() {
            return this.content;
        }
        /**
         * @return {?}
         */
        get MessageType() {
            return this.messageType;
        }
        /**
         * @param {?} buffer
         * @return {?}
         */
        static FromBuffer(buffer) {
            /** @type {?} */
            let result = new NetworkChannelMessage();
            result.content = buffer;
            return result;
        }
        /**
         * @return {?}
         */
        get HasPayload() {
            return this.content.byteLength > NetworkChannelMessage.HeaderSize;
        }
        /**
         * @return {?}
         */
        get PayloadSize() {
            return this.content.byteLength - NetworkChannelMessage.HeaderSize;
        }
    }
    NetworkChannelMessage.HeaderSize = 8;
    modelstageweb.NetworkChannelMessage = NetworkChannelMessage;
    if (false) {
        /** @type {?} */
        NetworkChannelMessage.HeaderSize;
        /**
         * @type {?}
         * @private
         */
        NetworkChannelMessage.prototype.messageType;
        /**
         * @type {?}
         * @private
         */
        NetworkChannelMessage.prototype.content;
    }
})(modelstageweb || (modelstageweb = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXgtY29tbW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVsc3RhZ2UvIiwic291cmNlcyI6WyJzcmMvbXgtY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFpQixNQUFNLGlCQUFpQixDQUFDOztBQUVoRixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsTUFBTSxLQUFRLGFBQWEsQ0FxbkcxQjtBQXJuR0QsV0FBYyxhQUFhOzs7O0lBRXZCLFNBQWdCLE1BQU07O1lBRWQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxtQkFBSyxNQUFNLEVBQUEsQ0FBQyxDQUFDLFFBQVE7UUFFcEQsT0FBTyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FDeEUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQU5lLG9CQUFNLFNBTXJCLENBQUE7SUFFRCxNQUFhLFVBQVU7Ozs7UUFJbkIsWUFBWSxLQUFpQjtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDOzs7Ozs7UUFFTSxZQUFZLENBQUMsVUFBa0IsRUFBRSxZQUFvQjs7Z0JBQ3BELE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENB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QUFFLEVBQVUsRUFBRSxFQUFVLEVBQzVDLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUNsQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFDbEMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsV0FBcUI7WUFFdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2QsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQzVCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUM1QixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztnQkFFOUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFbkMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2QsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQzVCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUM1QixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVsQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN0QztRQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBRU0sT0FBTyxDQUFDLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUM3QyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFDbEMsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQ2xDLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUNsQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxXQUFxQjtZQUV0RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNsQixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDVixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDVixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNsQixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDVixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDVixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM5QixDQUFDOzs7Ozs7Ozs7Ozs7O1FBRU0sU0FBUyxDQUFDLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUMvQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFDbEMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTOztnQkFFM0IsR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7Z0JBQzFFLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFOztnQkFDbkIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7O2dCQUNuQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQzs7Z0JBRWpDLFNBQVMsR0FBRyxHQUFHOztnQkFDZixFQUFFLEdBQUcsbUJBQWlCLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFBOztnQkFDMUgsS0FBSyxHQUFHLG1CQUFpQixVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQTtZQUVqSSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUN0RSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRWIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDdEUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUViLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQ3RFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFYixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUN0RSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpCLENBQUM7Ozs7O1FBRU0sVUFBVSxDQUFDLEtBQWlCOztnQkFDM0IsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDakQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Z0JBRTFELE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENB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Q0FBQzs7OztRQXRCRyxJQUFXLE9BQU87WUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7OztRQUVELElBQVcsV0FBVztZQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzs7Ozs7UUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQWtCOztnQkFDbkMsTUFBTSxHQUFHLElBQUkscUJBQXFCLEVBQUU7WUFDeEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDeEIsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7OztRQUVELElBQVcsVUFBVTtZQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztRQUN0RSxDQUFDOzs7O1FBRUQsSUFBVyxXQUFXO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcscUJBQXFCLENBQUMsVUFBVSxDQUFDO1FBQ3RFLENBQUM7O0lBMUJhLGdDQUFVLEdBQUcsQ0FBQyxDQUFDO0lBRnBCLG1DQUFxQix3QkE4QmpDLENBQUE7OztRQTVCRyxpQ0FBNkI7Ozs7O1FBRTdCLDRDQUErRDs7Ozs7UUFFL0Qsd0NBQTRCOztBQTBCcEMsQ0FBQyxFQXJuR2EsYUFBYSxLQUFiLGFBQWEsUUFxbkcxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyBNb2RlbFN0YWdlIMKpIDIwMTggUGxhbnN5c3RlbWUgR21iSCwgSGFtYnVyZywgR2VybWFueS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcbmltcG9ydCB7IHBzZ2VvbWV0cnkgfSBmcm9tICcuL3BzLWdlb21ldHJ5JztcclxuaW1wb3J0IHsgSHViQ29ubmVjdGlvbkJ1aWxkZXIsIExvZ0xldmVsLCBIdWJDb25uZWN0aW9uIH0gZnJvbSAnQGFzcG5ldC9zaWduYWxyJztcclxuLy9pbXBvcnQgeyBNZXNzYWdlUGFja0h1YlByb3RvY29sIH0gZnJvbSAnQGFzcG5ldC9zaWduYWxyLXByb3RvY29sLW1zZ3BhY2snO1xyXG5pbXBvcnQgSlF1ZXJ5IGZyb20gJ2pxdWVyeSc7XHJcblxyXG5leHBvcnQgbW9kdWxlIG1vZGVsc3RhZ2V3ZWIge1xyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiB1dWlkdjQoKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgbGV0IGNyeXB0byA9IHdpbmRvdy5jcnlwdG8gfHwgKDxhbnk+d2luZG93KS5tc0NyeXB0bztcclxuXHJcbiAgICAgICAgcmV0dXJuICgnJyArIDFlNyArIC0xZTMgKyAtNGUzICsgLThlMyArIC0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLCAoYzogYW55KSA9PlxyXG4gICAgICAgICAgICAoYyBeIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgMTUgPj4gYyAvIDQpLnRvU3RyaW5nKDE2KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRvb2xzV2ViR0wge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YWdlOiBTdGFnZVdlYkdMO1xyXG4gICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlU2hhZGVyKHNoYWRlclR5cGU6IEdMZW51bSwgc2hhZGVyU291cmNlOiBzdHJpbmcpOiBXZWJHTFNoYWRlciB7XHJcbiAgICAgICAgICAgIGxldCBzaGFkZXIgPSB0aGlzLnN0YWdlLmdsLmNyZWF0ZVNoYWRlcihzaGFkZXJUeXBlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc2hhZGVyU291cmNlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5nbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YWdlLmdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2hhZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQmxvY2tTdHJlYW1CbG9ja0Rlc2NyaXB0b3Ige1xyXG5cclxuICAgICAgICBwcml2YXRlIGJsb2NrVHlwZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1ham9yVmVyc2lvbjogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1pbm9yVmVyc2lvbjogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGZsYWdzOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcGF5bG9hZEJ5dGVzOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQmxvY2tUeXBlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ibG9ja1R5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IEJsb2NrVHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tUeXBlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1ham9yVmVyc2lvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFqb3JWZXJzaW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBNYWpvclZlcnNpb24odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLm1ham9yVmVyc2lvbiA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBNaW5vclZlcnNpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1pbm9yVmVyc2lvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgTWlub3JWZXJzaW9uKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5taW5vclZlcnNpb24gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgRmxhZ3MoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZsYWdzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBGbGFncyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmxhZ3MgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUGF5bG9hZEJ5dGVzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXlsb2FkQnl0ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IFBheWxvYWRCeXRlcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF5bG9hZEJ5dGVzID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBlbnVtIEJsb2NrU3RyZWFtUmVhZGVyU3RhdGVzIHtcclxuICAgICAgICBGSUxFX0hFQURFUl9FWFBFQ1RFRCA9IDAsXHJcbiAgICAgICAgQkxPQ0tfREVTQ1JJUFRPUl9FWFBFQ1RFRCA9IDEsXHJcbiAgICAgICAgUEFZTE9BRF9FWFBFQ1RFRCA9IDJcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQmxvY2tTdHJlYW1SZWFkZXIge1xyXG5cclxuICAgICAgICBwcml2YXRlIGFycmF5QnVmZmVyOiBBcnJheUJ1ZmZlciA9IG51bGw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYnl0ZUFycmF5OiBVaW50OEFycmF5ID0gbnVsbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50UG9zOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRCbG9ja0Rlc2NyaXB0b3I6IEJsb2NrU3RyZWFtQmxvY2tEZXNjcmlwdG9yO1xyXG5cclxuICAgICAgICBwcml2YXRlIGJsb2NrRW5kOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIGlzQ29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmYXRhbEVycm9yOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGU6IEJsb2NrU3RyZWFtUmVhZGVyU3RhdGVzID0gQmxvY2tTdHJlYW1SZWFkZXJTdGF0ZXMuRklMRV9IRUFERVJfRVhQRUNURUQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VycmVudEJsb2NrRGVzY3JpcHRvcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEJsb2NrRGVzY3JpcHRvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgRmF0YWxFcnJvcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmF0YWxFcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hc3N1cmVGaWxlSGVhZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtYWluaW5nQnl0ZXNJbkJsb2NrKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJsb2NrRW5kIC0gdGhpcy5jdXJyZW50UG9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFzc3VyZVJlbWFpbmluZ0J5dGVzSW5CbG9jayhjb3VudDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3MgKyBjb3VudCA8PSB0aGlzLmJsb2NrRW5kO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRCeXRlcyhjb3VudDogbnVtYmVyKTogQXJyYXlCdWZmZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5QnVmZmVyLnNsaWNlKHRoaXMuY3VycmVudFBvcywgdGhpcy5jdXJyZW50UG9zICsgY291bnQpOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB0cnlSZWFkSW50MTYobGFtYmRhOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlc0luQmxvY2soMik7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBsYW1iZGEodGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiAyNTYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHRyeVJlYWRGbG9hdChsYW1iZGE6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzSW5CbG9jayg0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoNCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgwLCB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgxLCB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgyLCB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgzLCB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcodGhpcy5ieXRlQXJyYXkuYnVmZmVyLCB0aGlzLmN1cnJlbnRQb3MsIDQpO1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhKHZpZXcuZ2V0RmxvYXQzMigwLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY3VycmVudFBvcyArPSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHRyeVJlYWRJbnQobGFtYmRhOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlc0luQmxvY2soNCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBsYW1iZGEodGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiAyNTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDY1NTM2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiAxNjc3NzIxNik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdHJ5UmVhZEludDY0KGxhbWJkYTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuYXNzdXJlUmVtYWluaW5nQnl0ZXNJbkJsb2NrKDgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhKHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogMjU2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiA2NTUzNiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogMTY3NzcyMTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDQyOTQ5NjcyOTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDEwOTk1MTE2Mjc3NzYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDI4MTQ3NDk3NjcxMDY1NiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogNzIwNTc1OTQwMzc5Mjc5MzYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHRyeVJlYWRTdHJpbmcobGFtYmRhOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy50cnlSZWFkSW50KChzdHJpbmdMZW5ndGgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXNzdXJlUmVtYWluaW5nQnl0ZXNJbkJsb2NrKHN0cmluZ0xlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgc3RyaW5nTGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsYW1iZGEodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLnRyeVJlYWRTdHJpbmcoKHZhbHVlKSA9PiB7IHJlc3VsdCA9IHZhbHVlOyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkTWF0cml4NCgpOiBwc2dlb21ldHJ5Lk1hdHJpeDQge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IHBzZ2VvbWV0cnkuTWF0cml4NCgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5UmVhZEZsb2F0KCh2YWwpID0+IHsgcmVzdWx0LmVsZW1lbnRzW2ldID0gdmFsOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRyYW5zcG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcm5hbFJlYWRTdHJpbmcoc3RhcnRQb3M6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmJ5dGVBcnJheVtzdGFydFBvcyArIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcm5hbFJlYWRJbnQoc3RhcnRQb3M6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ5dGVBcnJheVtzdGFydFBvc10gK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbc3RhcnRQb3MgKyAxXSAqIDI1NiArXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVtzdGFydFBvcyArIDJdICogNjU1MzYgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbc3RhcnRQb3MgKyAzXSAqIDE2Nzc3MjE2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhc3N1cmVGaWxlSGVhZGVyKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ieXRlQXJyYXkuYnl0ZUxlbmd0aCA+PSA4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ieXRlQXJyYXlbMF0gPT0gMHg3MCAmJiAvLyA9XCJwc2Jsc3RyMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbMV0gPT0gMHg3MyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5WzJdID09IDB4NjIgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVszXSA9PSAweDZDICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbNF0gPT0gMHg3MyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5WzVdID09IDB4NzQgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVs2XSA9PSAweDcyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbN10gPT0gMHgzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBvcyArPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBCbG9ja1N0cmVhbVJlYWRlclN0YXRlcy5CTE9DS19ERVNDUklQVE9SX0VYUEVDVEVEO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdGFsRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYXRhbEVycm9yID0gdGhpcy5pc0NvbXBsZXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW50ZXJCbG9jaygpOiB7IHN1Y2Nlc3M6IGJvb2xlYW4sIGRlc2NyaXB0b3I6IEJsb2NrU3RyZWFtQmxvY2tEZXNjcmlwdG9yIH0ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiB7IHN1Y2Nlc3M6IGJvb2xlYW4sIGRlc2NyaXB0b3I6IEJsb2NrU3RyZWFtQmxvY2tEZXNjcmlwdG9yIH0gPSB7IHN1Y2Nlc3M6IGZhbHNlLCBkZXNjcmlwdG9yOiBudWxsIH07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ieXRlQXJyYXkuYnl0ZUxlbmd0aCA+PSB0aGlzLmN1cnJlbnRQb3MgKyA1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zXSA9PSAweDcwICYmIC8vID0gXCJwc2JsXCJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MgKyAxXSA9PSAweDczICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zICsgMl0gPT0gMHg2MiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcyArIDNdID09IDB4NkMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2tUeXBlTGVuZ3RoID0gdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zICsgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnl0ZUFycmF5LmJ5dGVMZW5ndGggPj0gdGhpcy5jdXJyZW50UG9zICsgNSArIGJsb2NrVHlwZUxlbmd0aCArIDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVhZCB0aGUgZGVzY3JpcHRvciBmcm9tIHN0cmVhbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVzY3JpcHRvciA9IG5ldyBCbG9ja1N0cmVhbUJsb2NrRGVzY3JpcHRvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVzY3JpcHRvci5CbG9ja1R5cGUgPSB0aGlzLmludGVybmFsUmVhZFN0cmluZyh0aGlzLmN1cnJlbnRQb3MgKyA1LCBibG9ja1R5cGVMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVzY3JpcHRvci5NYWpvclZlcnNpb24gPSB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MgKyA1ICsgYmxvY2tUeXBlTGVuZ3RoXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlc2NyaXB0b3IuTWlub3JWZXJzaW9uID0gdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zICsgNSArIGJsb2NrVHlwZUxlbmd0aCArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVzY3JpcHRvci5GbGFncyA9IHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcyArIDUgKyBibG9ja1R5cGVMZW5ndGggKyAyXSAqIDI1NiArIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcyArIDUgKyBibG9ja1R5cGVMZW5ndGggKyAzXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlc2NyaXB0b3IuUGF5bG9hZEJ5dGVzID0gdGhpcy5pbnRlcm5hbFJlYWRJbnQodGhpcy5jdXJyZW50UG9zICsgNSArIGJsb2NrVHlwZUxlbmd0aCArIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQmxvY2tTdHJlYW1SZWFkZXJTdGF0ZXMuUEFZTE9BRF9FWFBFQ1RFRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UG9zICs9IDUgKyBibG9ja1R5cGVMZW5ndGggKyA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJsb2NrRW5kID0gdGhpcy5jdXJyZW50UG9zICsgcmVzdWx0LmRlc2NyaXB0b3IuUGF5bG9hZEJ5dGVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2tEZXNjcmlwdG9yID0gcmVzdWx0LmRlc2NyaXB0b3I7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlcmUgYXJlIHRvbyBmZXcgYnl0ZXMgdG8gbWFrZSBhIGZ1bGwgYmxvY2sgZGVzY3JpcHRvciwgYnV0IHRoZSBzdHJlYW0gaXMgY29tcGxldGVseSByZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmF0YWxFcnJvciA9IHRoaXMuaXNDb21wbGV0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vIHZhbGlkIGJsb2NrIGhlYWRlciBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmF0YWxFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBhcmUgdG9vIGZldyBieXRlcyB0byBtYWtlIGEgYmxvY2sgaGVhZGVyLCBidXQgdGhlIHN0cmVhbSBpcyBjb21wbGV0ZWx5IHJlYWQgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhdGFsRXJyb3IgPSB0aGlzLmlzQ29tcGxldGUgJiYgKHRoaXMuYnl0ZUFycmF5LmJ5dGVMZW5ndGggPiB0aGlzLmN1cnJlbnRQb3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGxlYXZlQmxvY2soKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBvcyA9IHRoaXMuYmxvY2tFbmQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBCbG9ja1N0cmVhbVJlYWRlclN0YXRlcy5CTE9DS19ERVNDUklQVE9SX0VYUEVDVEVEO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2hhZGVySW5zdGFuY2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIHNoYWRlcktleTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlZmVyZW5jZXM6IHsgW2luZGV4OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGZpZ3VyZUlEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgRmlndXJlSUQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZ3VyZUlEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBGaWd1cmVJRCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlndXJlSUQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2hhZGVyS2V5KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFkZXJLZXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IFNoYWRlcktleSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVyS2V5ID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0UmVmZXJlbmNlKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVyZW5jZXNba2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNoYWRlcktleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVyS2V5ID0gc2hhZGVyS2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdChyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkUmVmZXJlbmNlKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmZXJlbmNlc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXNoU2hhZGVySW5zdGFuY2UgZXh0ZW5kcyBTaGFkZXJJbnN0YW5jZSB7XHJcblxyXG4gICAgICAgIFNJWkVfT0ZfRkxPQVQgPSA0O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYnVmZmVySUQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHByaW9yaXR5OiBudW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNoYWRlcktleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHNoYWRlcktleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0KHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFyZWFkZXIudHJ5UmVhZFN0cmluZygoaWQpID0+IHsgdGhpcy5idWZmZXJJRCA9IGlkOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJJRCA9ICdfZGVmYXVsdCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZWFkZXIudHJ5UmVhZEludDE2KChwcmlvcml0eSkgPT4geyB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7IH0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFN0cmlkZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TaGFkZXJLZXkgPT0gJ1RyYW5zcGFyZW50TWVzaFNoYWRlcicgPyAxMCAqIHRoaXMuU0laRV9PRl9GTE9BVCA6IDkgKiB0aGlzLlNJWkVfT0ZfRkxPQVQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGV4dHVyZWRNZXNoU2hhZGVySW5zdGFuY2UgZXh0ZW5kcyBNZXNoU2hhZGVySW5zdGFuY2Uge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdGV4dHVyZUlEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGV4dHVyZUlEKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlSUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzaGFkZXJLZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihzaGFkZXJLZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdChyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSByZWFkZXIudHJ5UmVhZFN0cmluZygodGV4dHVyZUlEKSA9PiB7IHRoaXMudGV4dHVyZUlEID0gdGV4dHVyZUlEOyB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUmVmZXJlbmNlKCdUZXh0dXJlQnVmZmVyJywgdGhpcy50ZXh0dXJlSUQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN1cGVyLmNvbnN0cnVjdChyZWFkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0U3RyaWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAxMSAqIHRoaXMuU0laRV9PRl9GTE9BVDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFNoYWRlckluc3RhbmNlRnJvbVJlYWRlcihyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyKTogU2hhZGVySW5zdGFuY2Uge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IFNoYWRlckluc3RhbmNlID0gbnVsbDtcclxuXHJcbiAgICAgICAgbGV0IHNoYWRlcktleTtcclxuICAgICAgICBpZiAocmVhZGVyLnRyeVJlYWRTdHJpbmcoKGtleSkgPT4geyBzaGFkZXJLZXkgPSBrZXk7IH0pKSB7XHJcbiAgICAgICAgICAgIGlmIChzaGFkZXJLZXkgPT0gJ09wYXF1ZU1lc2hTaGFkZXInIHx8IHNoYWRlcktleSA9PSAnVHJhbnNwYXJlbnRNZXNoU2hhZGVyJykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IE1lc2hTaGFkZXJJbnN0YW5jZShzaGFkZXJLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNoYWRlcktleSA9PSAnVGV4dHVyZWRNZXNoU2hhZGVyJykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFRleHR1cmVkTWVzaFNoYWRlckluc3RhbmNlKHNoYWRlcktleSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5jb25zdHJ1Y3QocmVhZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWVzaDNETGliIHtcclxuICAgICAgICBwcml2YXRlIHJvb3ROb2RlOiBOb2RlQXNzZXQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIG9iamVjdE5hbWVQcmVmaXg6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldFJvb3ROb2RlKHJvb3ROb2RlOiBOb2RlQXNzZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290Tm9kZSA9IHJvb3ROb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldE5vZGVGcm9tUGF0aChwYXRoOiBzdHJpbmcpOiBOb2RlQXNzZXQge1xyXG4gICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT0gMCB8fCAhdGhpcy5yb290Tm9kZSB8fCB0aGlzLnJvb3ROb2RlLk5hbWUgPT0gcGF0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb290Tm9kZS5nZXRDaGlsZE5vZGVGcm9tUGF0aChwYXRoLnN1YnN0cih0aGlzLnJvb3ROb2RlLk5hbWUubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBc3NldEZhY3RvcnlXZWJHTCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbGFzdFBlcmNlbnRhZ2UgPSAtMTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGFnZTogU3RhZ2VXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50RmlndXJlOiBGaWd1cmVXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50U2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRTY2VuZU1lc2gzRExpYjogTWVzaDNETGliO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlRmlndXJlKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIHN0YWdlOiBTdGFnZVdlYkdMLCBhc3NldFN0b3JlOiBBc3NldFN0b3JlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlndXJlID0gbmV3IEZpZ3VyZVdlYkdMKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNjZW5lTWVzaDNETGliKSB7XHJcbiAgICAgICAgICAgICAgICByZWFkZXIudHJ5UmVhZFN0cmluZygobm9kZVBhdGgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRGaWd1cmUuTm9kZSA9IHRoaXMuY3VycmVudFNjZW5lTWVzaDNETGliLmdldE5vZGVGcm9tUGF0aChub2RlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGFzc2V0U3RvcmUuYWRkRmlndXJlKHRoaXMuY3VycmVudEZpZ3VyZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZU1lc2gocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZSA9IFNoYWRlckluc3RhbmNlRnJvbVJlYWRlcihyZWFkZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNoYWRlckluc3RhbmNlICYmIHRoaXMuY3VycmVudEZpZ3VyZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlndXJlLmFkZFNoYWRlckluc3RhbmNlKHRoaXMuY3VycmVudFNoYWRlckluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTWVzaEJ1ZmZlcihyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCBidWZmZXJBc3NldCA9IG5ldyBCdWZmZXJBc3NldFdlYkdMKHJlYWRlciwgJ1ZlcnRleEJ1ZmZlcicsIGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRJRDogc3RyaW5nID0gYnVmZmVyQXNzZXQuQnVmZmVySUQ7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gMTtcclxuICAgICAgICAgICAgd2hpbGUgKGFzc2V0U3RvcmUuZ2V0QnVmZmVyQXNzZXQoY3VycmVudElEKSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudElEID0gYnVmZmVyQXNzZXQuQnVmZmVySUQgKyBjb3VudGVyKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZmVyQXNzZXQuQnVmZmVySUQgPSBjdXJyZW50SUQ7XHJcbiAgICAgICAgICAgIGFzc2V0U3RvcmUuYWRkQnVmZmVyQXNzZXQoY3VycmVudElELCBidWZmZXJBc3NldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2hhZGVySW5zdGFuY2UgJiYgdGhpcy5jdXJyZW50RmlndXJlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBleHRyYWN0IHRyaWFuZ2xlcyBmcm9tIHZlcnRleCBidWZmZXIsIHRoaXMgaW5mb3JtYXRpb24gaXMgdXNlZCBieSBPY3RyZWUgdG8gZGV0ZXJtaW5lIHRyaWFuZ2xlIGRhdGEgZnJvbSB0cmlhbmdsZSBpbmRpY2VzIHN0b3JlZCBpbiBPY3RyZWUgZGF0YSBzdHJ1Y3R1cmUuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZS5wdXNoVHJpYW5nbGVzKHRoaXMuY3VycmVudEZpZ3VyZS5nZXRUcmlhbmdsZXMoKSwgYnVmZmVyQXNzZXQuZ2V0QnVmZmVyRGF0YSgpLCBidWZmZXJBc3NldC5nZXRCdWZmZXJTaXplKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidWZmZXJBc3NldC5pbml0aWFsaXplKHN0YWdlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInLCBidWZmZXJBc3NldC5CdWZmZXJJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVNZXNoSW5kaWNlc0J1ZmZlcihyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCBidWZmZXJBc3NldCA9IG5ldyBCdWZmZXJBc3NldFdlYkdMKHJlYWRlciwgJ0luZGV4QnVmZmVyJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50SUQgPSBidWZmZXJBc3NldC5CdWZmZXJJRDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAxO1xyXG4gICAgICAgICAgICB3aGlsZSAoYXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChjdXJyZW50SUQpKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SUQgPSBidWZmZXJBc3NldC5CdWZmZXJJRCArIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmZXJBc3NldC5CdWZmZXJJRCA9IGN1cnJlbnRJRDtcclxuICAgICAgICAgICAgYXNzZXRTdG9yZS5hZGRCdWZmZXJBc3NldChjdXJyZW50SUQsIGJ1ZmZlckFzc2V0KTtcclxuXHJcbiAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmluaXRpYWxpemUoc3RhZ2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJywgYnVmZmVyQXNzZXQuQnVmZmVySUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlVGV4dHVyZShyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMLCBkZWZlcnJlZHM6IEFycmF5PEpRdWVyeS5EZWZlcnJlZDxib29sZWFuPj4pIHtcclxuICAgICAgICAgICAgbGV0IHRleHR1cmVOYW1lOiBzdHJpbmc7IFxyXG4gICAgICAgICAgICBsZXQgcGl4ZWxEYXRhU2l6ZTtcclxuICAgICAgICAgICAgaWYgKHJlYWRlci50cnlSZWFkU3RyaW5nKCh2YWx1ZSkgPT4geyB0ZXh0dXJlTmFtZSA9IHZhbHVlOyB9KSAmJiByZWFkZXIudHJ5UmVhZEludDY0KCh2YWx1ZSkgPT4geyBwaXhlbERhdGFTaXplID0gdmFsdWU7IH0pKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VEYXRhID0gcmVhZGVyLnJlYWRCeXRlcyhwaXhlbERhdGFTaXplKTtcclxuICAgICAgICAgICAgICAgIGxldCBleHRlbnNpb24gPSB0ZXh0dXJlTmFtZS5zdWJzdHIodGV4dHVyZU5hbWUubGFzdEluZGV4T2YoJy4nKSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZVR5cGUgPSAnanBlZyc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9uID09ICcucG5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVHlwZSA9ICdwbmcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbaW1hZ2VEYXRhXSwgeyAndHlwZSc6ICdpbWFnZS8nICsgaW1hZ2VUeXBlIH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmZXJyZWQgPSBKUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcclxuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0U3RvcmUuYWRkVGV4dHVyZUFzc2V0KHRleHR1cmVOYW1lLCBuZXcgVGV4dHVyZUFzc2V0V2ViR0wodGhpcy5zdGFnZSwgaW1hZ2UpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHByb2Nlc3NpbmcgdGV4dHVyZSBibG9iICcgKyB0ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVPY3RyZWUocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRGaWd1cmUuc2V0SW50ZXJzZWN0b3IoT2N0cmVlLkNyZWF0ZUZyb21CbG9ja1N0cmVhbShyZWFkZXIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVTY2VuZShyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lTWVzaDNETGliID0gbmV3IE1lc2gzRExpYihyZWFkZXIucmVhZFN0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVSb290Tm9kZShyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTY2VuZU1lc2gzRExpYikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvb3ROb2RlID0gTm9kZUFzc2V0LkZyb21CbG9ja1N0cmVhbShyZWFkZXIsIHRoaXMuY3VycmVudFNjZW5lTWVzaDNETGliKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lTWVzaDNETGliLnNldFJvb3ROb2RlKHJvb3ROb2RlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuQXNzZXRTdG9yZS5hZGRSb290Tm9kZShyb290Tm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJvY2Vzc0Jsb2NrKGJsb2NrVHlwZTogc3RyaW5nLCByZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMLCBkZWZlcnJlZHM6IEFycmF5PEpRdWVyeS5EZWZlcnJlZDxib29sZWFuPj4pIHtcclxuICAgICAgICAgICAgaWYgKGJsb2NrVHlwZSA9PSAnUFNTY2VuZScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2NlbmUocmVhZGVyLCBzdGFnZSwgYXNzZXRTdG9yZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYmxvY2tUeXBlID09ICdQU0ZpZ3VyZScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlndXJlKHJlYWRlciwgc3RhZ2UsIGFzc2V0U3RvcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrVHlwZSA9PSAnUFNNZXNoJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNZXNoKHJlYWRlciwgc3RhZ2UsIGFzc2V0U3RvcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrVHlwZSA9PSAnUFNNZXNoRGF0YScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVzaEJ1ZmZlcihyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChibG9ja1R5cGUgPT0gJ1BTTWVzaEluZGljZXMnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1lc2hJbmRpY2VzQnVmZmVyKHJlYWRlciwgc3RhZ2UsIGFzc2V0U3RvcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrVHlwZSA9PSAnUFNUZXh0dXJlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUZXh0dXJlKHJlYWRlciwgc3RhZ2UsIGFzc2V0U3RvcmUsIGRlZmVycmVkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYmxvY2tUeXBlID09ICdQU01lc2hPY3RyZWUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU9jdHJlZShyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChibG9ja1R5cGUgPT0gJ1BTUm9vdE5vZGUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVJvb3ROb2RlKHJlYWRlciwgc3RhZ2UsIGFzc2V0U3RvcmUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRnJvbUFycmF5QnVmZmVyKGJ1ZmZlcjogQXJyYXlCdWZmZXIpOiBKUXVlcnkuRGVmZXJyZWQ8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBsZXQgZGVmZXJyZWRzOiBBcnJheTxKUXVlcnkuRGVmZXJyZWQ8Ym9vbGVhbj4+ID0gW107XHJcblxyXG4gICAgICAgICAgICBsZXQgYXNzZXRTdG9yZSA9IHRoaXMuc3RhZ2UuQXNzZXRTdG9yZTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyID0gbmV3IEJsb2NrU3RyZWFtUmVhZGVyKGJ1ZmZlcik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gcmVhZGVyLmVudGVyQmxvY2soKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0Jsb2NrKHJlcy5kZXNjcmlwdG9yLkJsb2NrVHlwZSwgcmVhZGVyLCB0aGlzLnN0YWdlLCBhc3NldFN0b3JlLCBkZWZlcnJlZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5sZWF2ZUJsb2NrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gcmVhZGVyLmVudGVyQmxvY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBKUXVlcnkud2hlbi5hcHBseShKUXVlcnksIGRlZmVycmVkcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RnJvbVVybCh1cmw6IHN0cmluZyk6IEpRdWVyeS5EZWZlcnJlZDxCb29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlZDogSlF1ZXJ5LkRlZmVycmVkPEJvb2xlYW4+ID0gSlF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVxOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJlcS5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG5cclxuICAgICAgICAgICAgcmVxLm9ubG9hZCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRnJvbUFycmF5QnVmZmVyKDxBcnJheUJ1ZmZlcj5yZXEucmVzcG9uc2UpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcS5vbmVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXZlbnQpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgKG9FdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9FdmVudC5sZW5ndGhDb21wdXRhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcmNlbnRDb21wbGV0ZSA9IG9FdmVudC5sb2FkZWQgLyBvRXZlbnQudG90YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdFBlcmNlbnRhZ2UgIT0gTWF0aC5mbG9vcihwZXJjZW50Q29tcGxldGUgKiAxMDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFBlcmNlbnRhZ2UgPSBNYXRoLmZsb29yKHBlcmNlbnRDb21wbGV0ZSAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLm5vdGlmeShNYXRoLnJvdW5kKHBlcmNlbnRDb21wbGV0ZSAqIDEwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5hYmxlIHRvIGNvbXB1dGUgcHJvZ3Jlc3MgaW5mb3JtYXRpb24gc2luY2UgdGhlIHRvdGFsIHNpemUgaXMgdW5rbm93blxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJlcS5zZW5kKG51bGwpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJbnRlcnNlY3RvciB7XHJcbiAgICAgICAgZ2V0Qm91bmRpbmdCb3goKTogcHNnZW9tZXRyeS5BQUJCM0Q7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEJvdW5kaW5nQm94SW50ZXJzZWN0b3IgaW1wbGVtZW50cyBJbnRlcnNlY3RvciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBib3VuZGluZ0JveDogcHNnZW9tZXRyeS5BQUJCM0QpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRCb3VuZGluZ0JveCgpOiBwc2dlb21ldHJ5LkFBQkIzRCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvdW5kaW5nQm94O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgT2N0cmVlIGltcGxlbWVudHMgSW50ZXJzZWN0b3Ige1xyXG4gICAgICAgIHByaXZhdGUgYm91bmRpbmdCb3ggPSBuZXcgcHNnZW9tZXRyeS5BQUJCM0QoKTtcclxuXHJcbiAgICAgICAgc3RhdGljIENyZWF0ZUZyb21CbG9ja1N0cmVhbShyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyKTogT2N0cmVlIHtcclxuICAgICAgICAgICAgbGV0IG9jdHJlZSA9IG5ldyBPY3RyZWUoKTtcclxuICAgICAgICAgICAgbGV0IHgwLCB5MCwgejAsIHgxLCB5MSwgejE7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbHM7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJlYWRlci50cnlSZWFkSW50KCh2YWwpID0+IHsgbGV2ZWxzID0gdmFsOyB9KSAmJlxyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnRyeVJlYWRGbG9hdCgodmFsKSA9PiB4MCA9IHZhbCkgJiZcclxuICAgICAgICAgICAgICAgIHJlYWRlci50cnlSZWFkRmxvYXQoKHZhbCkgPT4geTAgPSB2YWwpICYmXHJcbiAgICAgICAgICAgICAgICByZWFkZXIudHJ5UmVhZEZsb2F0KCh2YWwpID0+IHowID0gdmFsKSAmJlxyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnRyeVJlYWRGbG9hdCgodmFsKSA9PiB4MSA9IHZhbCkgJiZcclxuICAgICAgICAgICAgICAgIHJlYWRlci50cnlSZWFkRmxvYXQoKHZhbCkgPT4geTEgPSB2YWwpICYmXHJcbiAgICAgICAgICAgICAgICByZWFkZXIudHJ5UmVhZEZsb2F0KCh2YWwpID0+IHoxID0gdmFsKSkge1xyXG4gICAgICAgICAgICAgICAgb2N0cmVlLmJvdW5kaW5nQm94LmFkZFBvaW50KHgwLCB5MCwgejApO1xyXG4gICAgICAgICAgICAgICAgb2N0cmVlLmJvdW5kaW5nQm94LmFkZFBvaW50KHgxLCB5MSwgejEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gb2N0cmVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEJvdW5kaW5nQm94KCk6IHBzZ2VvbWV0cnkuQUFCQjNEIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm91bmRpbmdCb3g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRmlndXJlV2ViR0wge1xyXG5cclxuICAgICAgICBwcml2YXRlIGZpZ3VyZUlEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZGVySW5zdGFuY2VzOiBTaGFkZXJJbnN0YW5jZVtdID0gW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50ZXJzZWN0b3I6IEludGVyc2VjdG9yO1xyXG5cclxuICAgICAgICBwcml2YXRlIG5vZGU6IE5vZGVBc3NldDtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBOb2RlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBOb2RlKHZhbHVlOiBOb2RlQXNzZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEZpZ3VyZUlEKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWd1cmVJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2hhZGVySW5zdGFuY2VzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFkZXJJbnN0YW5jZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihmaWd1cmVJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlndXJlSUQgPSBmaWd1cmVJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRCb3VuZGluZ0JveCgpOiBwc2dlb21ldHJ5LkFBQkIzRCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVyc2VjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5Ob2RlID8gdGhpcy5pbnRlcnNlY3Rvci5nZXRCb3VuZGluZ0JveCgpLnRyYW5zZm9ybSh0aGlzLk5vZGUuQWJzb2x1dGVUcmFuc2Zvcm1hdGlvbikgOiB0aGlzLmludGVyc2VjdG9yLmdldEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHBzZ2VvbWV0cnkuQUFCQjNEKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRTaGFkZXJJbnN0YW5jZShzaGFkZXJJbnN0YW5jZTogU2hhZGVySW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFkZXJJbnN0YW5jZXMucHVzaChzaGFkZXJJbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgc3RhZ2UgPSBjb250ZXh0LlN0YWdlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaGFkZXJJbnN0YW5jZXMuZm9yRWFjaCgoc2hhZGVySW5zdGFuY2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHNoYWRlckluc3RhbmNlLkZpZ3VyZUlEID0gdGhpcy5maWd1cmVJRDtcclxuICAgICAgICAgICAgICAgIGxldCBzaGFkZXJQcm9ncmFtID0gc3RhZ2UuZ2V0U2hhZGVyUHJvZ3JhbShjb250ZXh0LCBzaGFkZXJJbnN0YW5jZS5TaGFkZXJLZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNoYWRlclByb2dyYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNoYWRlclByb2dyYW0gPSBzaGFkZXJQcm9ncmFtO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTm9kZVRyYW5zZm9ybSA9IHRoaXMuTm9kZSA/IHRoaXMuTm9kZS5BYnNvbHV0ZVRyYW5zZm9ybWF0aW9uIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZXJQcm9ncmFtLnJlbmRlcihjb250ZXh0LCBzaGFkZXJJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldEludGVyc2VjdG9yKGludGVyc2VjdG9yOiBJbnRlcnNlY3Rvcikge1xyXG4gICAgICAgICAgICB0aGlzLmludGVyc2VjdG9yID0gaW50ZXJzZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50ZXJzZWN0c0JvdW5kaW5nQm94KHJheTogcHNnZW9tZXRyeS5MaW5lM0QsIGF0OiBwc2dlb21ldHJ5LlZlYzMpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcnNlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGludGVyc2VjdGlvblBvaW50ID0gdGhpcy5pbnRlcnNlY3Rvci5nZXRCb3VuZGluZ0JveCgpLmludGVyc2VjdHNSYXkocmF5KTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnRlcnNlY3Rpb25Qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0LmFzc2lnblZlYyhpbnRlcnNlY3Rpb25Qb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBbmltYXRpb25UcmFuc2Zvcm1hdGlvbiB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBGcm9tQmxvY2tTdHJlYW0ocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgbWVzaDNETGliOiBNZXNoM0RMaWIpOiBBbmltYXRpb25UcmFuc2Zvcm1hdGlvbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZUFzc2V0IHtcclxuICAgICAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwYXJlbnROb2RlOiBOb2RlQXNzZXQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2hpbGROb2RlczogeyBbaW5kZXg6IHN0cmluZ106IE5vZGVBc3NldCB9ID0ge307XHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9jYWxUcmFuc2Zvcm1hdGlvbjogcHNnZW9tZXRyeS5NYXRyaXg0O1xyXG5cclxuICAgICAgICBwcml2YXRlIGFic29sdXRlVHJhbnNmb3JtYXRpb246IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBOYW1lKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBBYnNvbHV0ZVRyYW5zZm9ybWF0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZVRyYW5zZm9ybWF0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBMb2NhbFRyYW5zZm9ybWF0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbFRyYW5zZm9ybWF0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldENoaWxkTm9kZUZyb21QYXRoKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiB0aGlzLmNoaWxkTm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXRoID09IHRoaXMuY2hpbGROb2Rlc1tjaGlsZF0uTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXNbY2hpbGRdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIGluIHRoaXMuY2hpbGROb2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGguc3Vic3RyaW5nKDAsIHRoaXMuY2hpbGROb2Rlc1tjaGlsZF0uTmFtZS5sZW5ndGgpID09IHRoaXMuY2hpbGROb2Rlc1tjaGlsZF0uTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXNbY2hpbGRdLmdldENoaWxkTm9kZUZyb21QYXRoKHBhdGguc3Vic3RyKHRoaXMuY2hpbGROb2Rlc1tjaGlsZF0uTmFtZS5sZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEZyb21CbG9ja1N0cmVhbShyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBtZXNoM0RMaWI6IE1lc2gzRExpYiwgcGFyZW50Tm9kZT86IE5vZGVBc3NldCk6IE5vZGVBc3NldCB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTm9kZUFzc2V0KCk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQubmFtZSA9IHJlYWRlci5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5sb2NhbFRyYW5zZm9ybWF0aW9uID0gcmVhZGVyLnJlYWRNYXRyaXg0KCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5hYnNvbHV0ZVRyYW5zZm9ybWF0aW9uID0gTm9kZUFzc2V0LmNhbGN1bGF0ZUFic29sdXRlVHJhbnNmb3JtYXRpb24ocmVzdWx0LmxvY2FsVHJhbnNmb3JtYXRpb24sIHBhcmVudE5vZGUpO1xyXG4gICAgICAgICAgICByZXN1bHQucGFyZW50Tm9kZSA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5yZWFkQ2hpbGROb2RlcyhyZWFkZXIsIG1lc2gzRExpYik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5yZWFkQW5pbWF0aW9uVHJhbnNmb3JtYXRpb25zKHJlYWRlciwgbWVzaDNETGliKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVBYnNvbHV0ZVRyYW5zZm9ybWF0aW9uKGxvY2FsVHJhbnNmb3JtYXRpb246IHBzZ2VvbWV0cnkuTWF0cml4NCwgcGFyZW50Tm9kZTogTm9kZUFzc2V0KTogcHNnZW9tZXRyeS5NYXRyaXg0IHtcclxuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8cHNnZW9tZXRyeS5NYXRyaXg0PmxvY2FsVHJhbnNmb3JtYXRpb24ubXVsdGlwbHkocGFyZW50Tm9kZS5BYnNvbHV0ZVRyYW5zZm9ybWF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbFRyYW5zZm9ybWF0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRDaGlsZE5vZGVzKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIG1lc2gzRExpYjogTWVzaDNETGliKSB7XHJcbiAgICAgICAgICAgIHJlYWRlci50cnlSZWFkSW50KChjaGlsZE5hbWVDb3VudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZE5hbWVDb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZE5vZGUoTm9kZUFzc2V0LkZyb21CbG9ja1N0cmVhbShyZWFkZXIsIG1lc2gzRExpYiwgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZEFuaW1hdGlvblRyYW5zZm9ybWF0aW9ucyhyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBtZXNoM0RMaWI6IE1lc2gzRExpYikge1xyXG4gICAgICAgICAgICByZWFkZXIudHJ5UmVhZEludCgobnVtQW5pbWF0aW9uVHJhbnNmb3JtYXRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUFuaW1hdGlvblRyYW5zZm9ybWF0aW9uczsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBbmltYXRpb25UcmFuc2Zvcm1hdGlvbihBbmltYXRpb25UcmFuc2Zvcm1hdGlvbi5Gcm9tQmxvY2tTdHJlYW0ocmVhZGVyLCBtZXNoM0RMaWIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGFkZENoaWxkTm9kZShub2RlOiBOb2RlQXNzZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZE5vZGVzW25vZGUuTmFtZV0gPSBub2RlO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHByaXZhdGUgYWRkQW5pbWF0aW9uVHJhbnNmb3JtYXRpb24oYW5pbWF0aW9uVHJhbnNmb3JtYXRpb246IEFuaW1hdGlvblRyYW5zZm9ybWF0aW9uKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQnVmZmVyQXNzZXRXZWJHTCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYnVmZmVySUQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBidWZmZXJTaXplOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBwdWJsaWMgYnVmZmVyRGF0YTogQXJyYXlCdWZmZXIgfCBTaGFyZWRBcnJheUJ1ZmZlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB3ZWJHTEJ1ZmZlcjogV2ViR0xCdWZmZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgaXNFbGVtZW50QnVmZmVyOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQnVmZmVySUQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlcklEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBCdWZmZXJJRCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVySUQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQnVmZmVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy53ZWJHTEJ1ZmZlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQnVmZmVyU2l6ZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyU2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgQnVmZmVyU2l6ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyU2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgYnVmZmVySUQ6IHN0cmluZywgaXNFbGVtZW50QnVmZmVyOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVySUQgPSBidWZmZXJJRDtcclxuICAgICAgICAgICAgdGhpcy5pc0VsZW1lbnRCdWZmZXIgPSBpc0VsZW1lbnRCdWZmZXI7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRvciA9IHJlYWRlci5DdXJyZW50QmxvY2tEZXNjcmlwdG9yO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZCBhZGRpdGlvbmFsIG1ldGEgZGF0YSBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRvci5NYWpvclZlcnNpb24gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVySUQgPSByZWFkZXIucmVhZFN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJTaXplID0gcmVhZGVyLnJlbWFpbmluZ0J5dGVzSW5CbG9jaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyRGF0YSA9IHJlYWRlci5yZWFkQnl0ZXModGhpcy5idWZmZXJTaXplKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy53ZWJHTEJ1ZmZlciA9IHN0YWdlLmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFbGVtZW50QnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLndlYkdMQnVmZmVyKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmJ1ZmZlckRhdGEoc3RhZ2UuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIDxBcnJheUJ1ZmZlcj50aGlzLmJ1ZmZlckRhdGEsIHN0YWdlLmdsLlNUQVRJQ19EUkFXKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLndlYkdMQnVmZmVyKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmJ1ZmZlckRhdGEoc3RhZ2UuZ2wuQVJSQVlfQlVGRkVSLCA8QXJyYXlCdWZmZXI+dGhpcy5idWZmZXJEYXRhLCBzdGFnZS5nbC5TVEFUSUNfRFJBVyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiaW5kKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRWxlbWVudEJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy53ZWJHTEJ1ZmZlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy53ZWJHTEJ1ZmZlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiaW5kSW50ZXJsZWF2ZWQoc3RhZ2U6IFN0YWdlV2ViR0wsIGF0dHJpYnV0ZUxvY2F0aW9uOiBudW1iZXIsIHNpemU6IG51bWJlciwgc3RyaWRlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVMb2NhdGlvbiA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy53ZWJHTEJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyaWJ1dGVMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJpYnV0ZUxvY2F0aW9uLCBzaXplLCBzdGFnZS5nbC5GTE9BVCwgZmFsc2UsIHN0cmlkZSwgb2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE9wYXF1ZU1lc2hCdWlsZGVyIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2ZXJ0aWNlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGluZGljZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2ZXJ0QnVmZmVyQXNzZXQ6IEJ1ZmZlckFzc2V0V2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5kQnVmZmVyQXNzZXQ6IEJ1ZmZlckFzc2V0V2ViR0w7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFRyaSh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB6MDogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB6MTogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCB6MjogbnVtYmVyLFxyXG4gICAgICAgICAgICByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBkb3VibGVTaWRlZD86IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmVydGljZXMucHVzaChcclxuICAgICAgICAgICAgICAgIHgwLCB5MCwgejAsIDAsIDAsIDEsIHIsIGcsIGIsXHJcbiAgICAgICAgICAgICAgICB4MSwgeTEsIHoxLCAwLCAwLCAxLCByLCBnLCBiLFxyXG4gICAgICAgICAgICAgICAgeDIsIHkyLCB6MiwgMCwgMCwgMSwgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMuaW5kaWNlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kaWNlcy5wdXNoKGksIGkgKyAxLCBpICsgMik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZG91YmxlU2lkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVydGljZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB4MSwgeTEsIHoxLCAwLCAwLCAxLCByLCBnLCBiLFxyXG4gICAgICAgICAgICAgICAgICAgIHgwLCB5MCwgejAsIDAsIDAsIDEsIHIsIGcsIGIsXHJcbiAgICAgICAgICAgICAgICAgICAgeDIsIHkyLCB6MiwgMCwgMCwgMSwgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuaW5kaWNlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljZXMucHVzaChpLCBpICsgMSwgaSArIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkUXVhZCh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB6MDogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB6MTogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCB6MjogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MzogbnVtYmVyLCB5MzogbnVtYmVyLCB6MzogbnVtYmVyLFxyXG4gICAgICAgICAgICByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBkb3VibGVTaWRlZD86IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsXHJcbiAgICAgICAgICAgICAgICB4MSwgeTEsIHoxLFxyXG4gICAgICAgICAgICAgICAgeDIsIHkyLCB6MixcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIsIGRvdWJsZVNpZGVkKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRUcmkoeDAsIHkwLCB6MCxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsXHJcbiAgICAgICAgICAgICAgICB4MywgeTMsIHozLFxyXG4gICAgICAgICAgICAgICAgciwgZywgYiwgZG91YmxlU2lkZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFN0cm9rZSh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB6MDogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB6MTogbnVtYmVyLFxyXG4gICAgICAgICAgICByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlyID0gbmV3IHBzZ2VvbWV0cnkuVmVjMyh4MSwgeTEsIHoxKS5zdWIobmV3IHBzZ2VvbWV0cnkuVmVjMyh4MCwgeTAsIHowKSk7XHJcbiAgICAgICAgICAgIGxldCByYWRpdXMgPSBkaXIubm9ybSgpO1xyXG4gICAgICAgICAgICBsZXQgYXppbXV0aCA9IE1hdGguYXRhbjIoLWRpci56LCBkaXIueCk7XHJcbiAgICAgICAgICAgIGxldCBwb2xhciA9IE1hdGguYXNpbihkaXIueSAvIHJhZGl1cyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhpY2tuZXNzID0gLjAxO1xyXG4gICAgICAgICAgICBsZXQgdXAgPSA8cHNnZW9tZXRyeS5WZWM0PnBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tUm90YXRpb24oYXppbXV0aCwgcG9sYXIsIDApLm11bHRpcGx5KG5ldyBwc2dlb21ldHJ5LlZlYzQoMCwgdGhpY2tuZXNzLCAwLCAxKSk7XHJcbiAgICAgICAgICAgIGxldCBmcm9udCA9IDxwc2dlb21ldHJ5LlZlYzQ+cHNnZW9tZXRyeS5NYXRyaXg0LkZyb21Sb3RhdGlvbihhemltdXRoLCBwb2xhciwgMCkubXVsdGlwbHkobmV3IHBzZ2VvbWV0cnkuVmVjNCgwLCAwLCB0aGlja25lc3MsIDEpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUXVhZCh4MCArIHVwLnggLSBmcm9udC54LCB5MCArIHVwLnkgLSBmcm9udC55LCB6MCArIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDEgKyB1cC54IC0gZnJvbnQueCwgeTEgKyB1cC55IC0gZnJvbnQueSwgejEgKyB1cC56IC0gZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgxIC0gdXAueCAtIGZyb250LngsIHkxIC0gdXAueSAtIGZyb250LnksIHoxIC0gdXAueiAtIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MCAtIHVwLnggLSBmcm9udC54LCB5MCAtIHVwLnkgLSBmcm9udC55LCB6MCAtIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFF1YWQoeDAgLSB1cC54ICsgZnJvbnQueCwgeTAgLSB1cC55ICsgZnJvbnQueSwgejAgLSB1cC56ICsgZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgxIC0gdXAueCArIGZyb250LngsIHkxIC0gdXAueSArIGZyb250LnksIHoxIC0gdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MSArIHVwLnggKyBmcm9udC54LCB5MSArIHVwLnkgKyBmcm9udC55LCB6MSArIHVwLnogKyBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDAgKyB1cC54ICsgZnJvbnQueCwgeTAgKyB1cC55ICsgZnJvbnQueSwgejAgKyB1cC56ICsgZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRRdWFkKHgwIC0gdXAueCAtIGZyb250LngsIHkwIC0gdXAueSAtIGZyb250LnksIHowIC0gdXAueiAtIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MSAtIHVwLnggLSBmcm9udC54LCB5MSAtIHVwLnkgLSBmcm9udC55LCB6MSAtIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDEgLSB1cC54ICsgZnJvbnQueCwgeTEgLSB1cC55ICsgZnJvbnQueSwgejEgLSB1cC56ICsgZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgwIC0gdXAueCArIGZyb250LngsIHkwIC0gdXAueSArIGZyb250LnksIHowIC0gdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUXVhZCh4MCArIHVwLnggKyBmcm9udC54LCB5MCArIHVwLnkgKyBmcm9udC55LCB6MCArIHVwLnogKyBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDEgKyB1cC54ICsgZnJvbnQueCwgeTEgKyB1cC55ICsgZnJvbnQueSwgejEgKyB1cC56ICsgZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgxICsgdXAueCAtIGZyb250LngsIHkxICsgdXAueSAtIGZyb250LnksIHoxICsgdXAueiAtIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MCArIHVwLnggLSBmcm9udC54LCB5MCArIHVwLnkgLSBmcm9udC55LCB6MCArIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgciwgZywgYik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHZlcnRCdWYgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMudmVydGljZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdmVydEJ1Zi5zZXQodGhpcy52ZXJ0aWNlcyk7XHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LmJ1ZmZlckRhdGEgPSB2ZXJ0QnVmLmJ1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0QnVmZmVyQXNzZXQuQnVmZmVyU2l6ZSA9IHRoaXMuaW5kaWNlcy5sZW5ndGggKiA5ICogNDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRCdWYgPSBuZXcgSW50MzJBcnJheSh0aGlzLmluZGljZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgaW5kQnVmLnNldCh0aGlzLmluZGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmluZEJ1ZmZlckFzc2V0LmJ1ZmZlckRhdGEgPSBpbmRCdWYuYnVmZmVyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52ZXJ0QnVmZmVyQXNzZXQuaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kQnVmZmVyQXNzZXQuaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlndXJlKHN0YWdlOiBTdGFnZVdlYkdMLCBmaWd1cmVJRDogc3RyaW5nKTogRmlndXJlV2ViR0wge1xyXG4gICAgICAgICAgICB0aGlzLmluZEJ1ZmZlckFzc2V0ID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQnVmZmVyQXNzZXRXZWJHTCh1bmRlZmluZWQsIGZpZ3VyZUlEICsgJ19pbmRpY2VzJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0ID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQnVmZmVyQXNzZXRXZWJHTCh1bmRlZmluZWQsIGZpZ3VyZUlEICsgJ192ZXJ0aWNlcycsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZShzdGFnZSk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KGZpZ3VyZUlEICsgJ19pbmRpY2VzJywgdGhpcy5pbmRCdWZmZXJBc3NldCk7XHJcbiAgICAgICAgICAgIHN0YWdlLkFzc2V0U3RvcmUuYWRkQnVmZmVyQXNzZXQoZmlndXJlSUQgKyAnX3ZlcnRpY2VzJywgdGhpcy52ZXJ0QnVmZmVyQXNzZXQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNoYWRlckluc3RhbmNlID0gbmV3IG1vZGVsc3RhZ2V3ZWIuTWVzaFNoYWRlckluc3RhbmNlKCdPcGFxdWVNZXNoU2hhZGVyJyk7XHJcbiAgICAgICAgICAgIHNoYWRlckluc3RhbmNlLmFkZFJlZmVyZW5jZSgnSW5kZXhCdWZmZXInLCBmaWd1cmVJRCArICdfaW5kaWNlcycpO1xyXG4gICAgICAgICAgICBzaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ1ZlcnRleEJ1ZmZlcicsIGZpZ3VyZUlEICsgJ192ZXJ0aWNlcycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpZ3VyZSA9IG5ldyBtb2RlbHN0YWdld2ViLkZpZ3VyZVdlYkdMKGZpZ3VyZUlEKTtcclxuICAgICAgICAgICAgZmlndXJlLmFkZFNoYWRlckluc3RhbmNlKHNoYWRlckluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWd1cmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUcmFuc3BhcmVudE1lc2hCdWlsZGVyIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2ZXJ0aWNlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGluZGljZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHZlcnRCdWZmZXJBc3NldDogQnVmZmVyQXNzZXRXZWJHTCwgcHJvdGVjdGVkIGluZEJ1ZmZlckFzc2V0OiBCdWZmZXJBc3NldFdlYkdMKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkVHJpKHgwOiBudW1iZXIsIHkwOiBudW1iZXIsIHowOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHoxOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIHoyOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlciwgdHdvU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB4MCwgeTAsIHowLCAwLCAwLCAxLCByLCBnLCBiLCBhLFxyXG4gICAgICAgICAgICAgICAgeDEsIHkxLCB6MSwgMCwgMCwgMSwgciwgZywgYiwgYSxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIDAsIDAsIDEsIHIsIGcsIGIsIGEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLmluZGljZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLmluZGljZXMucHVzaChpLCBpICsgMSwgaSArIDIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR3b1NpZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRyaSh4MCwgeTAsIHowLFxyXG4gICAgICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsXHJcbiAgICAgICAgICAgICAgICAgICAgeDEsIHkxLCB6MSxcclxuICAgICAgICAgICAgICAgICAgICByLCBnLCBiLCBhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFF1YWQoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlcixcclxuICAgICAgICAgICAgeDI6IG51bWJlciwgeTI6IG51bWJlciwgejI6IG51bWJlcixcclxuICAgICAgICAgICAgeDM6IG51bWJlciwgeTM6IG51bWJlciwgejM6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYTogbnVtYmVyLCB0d29TaWRlZD86IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsXHJcbiAgICAgICAgICAgICAgICB4MSwgeTEsIHoxLFxyXG4gICAgICAgICAgICAgICAgeDIsIHkyLCB6MixcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIsIGEsIHR3b1NpZGVkKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRUcmkoeDAsIHkwLCB6MCxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsXHJcbiAgICAgICAgICAgICAgICB4MywgeTMsIHozLFxyXG4gICAgICAgICAgICAgICAgciwgZywgYiwgYSwgdHdvU2lkZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHZlcnRCdWYgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMudmVydGljZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdmVydEJ1Zi5zZXQodGhpcy52ZXJ0aWNlcyk7XHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LmJ1ZmZlckRhdGEgPSB2ZXJ0QnVmLmJ1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0QnVmZmVyQXNzZXQuQnVmZmVyU2l6ZSA9IHRoaXMuaW5kaWNlcy5sZW5ndGggKiAxMCAqIDQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kQnVmID0gbmV3IEludDMyQXJyYXkodGhpcy5pbmRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGluZEJ1Zi5zZXQodGhpcy5pbmRpY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRCdWZmZXJBc3NldC5idWZmZXJEYXRhID0gaW5kQnVmLmJ1ZmZlcjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmluZEJ1ZmZlckFzc2V0LmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGV4dHVyZWRNZXNoQnVpbGRlciB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmVydGljZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbmRpY2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB2ZXJ0QnVmZmVyQXNzZXQ6IEJ1ZmZlckFzc2V0V2ViR0wsIHByb3RlY3RlZCBpbmRCdWZmZXJBc3NldDogQnVmZmVyQXNzZXRXZWJHTCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFRyaSh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB6MDogbnVtYmVyLCB1MDogbnVtYmVyLCB2MDogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB6MTogbnVtYmVyLCB1MTogbnVtYmVyLCB2MTogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCB6MjogbnVtYmVyLCB1MjogbnVtYmVyLCB2MjogbnVtYmVyLFxyXG4gICAgICAgICAgICByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCB0d29TaWRlZD86IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmVydGljZXMucHVzaChcclxuICAgICAgICAgICAgICAgIHgwLCB5MCwgejAsIDAsIDAsIDEsIHIsIGcsIGIsIHUwLCB2MCxcclxuICAgICAgICAgICAgICAgIHgxLCB5MSwgejEsIDAsIDAsIDEsIHIsIGcsIGIsIHUxLCB2MSxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIDAsIDAsIDEsIHIsIGcsIGIsIHUyLCB2Mik7XHJcblxyXG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMuaW5kaWNlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kaWNlcy5wdXNoKGksIGkgKyAxLCBpICsgMik7XHJcblxyXG4gICAgICAgICAgICBpZiAodHdvU2lkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsIHUwLCB2MCxcclxuICAgICAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLCB1MiwgdjIsXHJcbiAgICAgICAgICAgICAgICAgICAgeDEsIHkxLCB6MSwgdTEsIHYxLFxyXG4gICAgICAgICAgICAgICAgICAgIHIsIGcsIGIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkUXVhZCh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB6MDogbnVtYmVyLCB1MDogbnVtYmVyLCB2MDogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB6MTogbnVtYmVyLCB1MTogbnVtYmVyLCB2MTogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCB6MjogbnVtYmVyLCB1MjogbnVtYmVyLCB2MjogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MzogbnVtYmVyLCB5MzogbnVtYmVyLCB6MzogbnVtYmVyLCB1MzogbnVtYmVyLCB2MzogbnVtYmVyLFxyXG4gICAgICAgICAgICByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCB0d29TaWRlZD86IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsIHUwLCB2MCxcclxuICAgICAgICAgICAgICAgIHgxLCB5MSwgejEsIHUxLCB2MSxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIHUyLCB2MixcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIsIHR3b1NpZGVkKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRUcmkoeDAsIHkwLCB6MCwgdTAsIHYwLFxyXG4gICAgICAgICAgICAgICAgeDIsIHkyLCB6MiwgdTIsIHYyLCBcclxuICAgICAgICAgICAgICAgIHgzLCB5MywgejMsIHUzLCB2MyxcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIsIHR3b1NpZGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJ0QnVmID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnZlcnRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZlcnRCdWYuc2V0KHRoaXMudmVydGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5idWZmZXJEYXRhID0gdmVydEJ1Zi5idWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LkJ1ZmZlclNpemUgPSB0aGlzLmluZGljZXMubGVuZ3RoICogMTEgKiA0O1xyXG5cclxuICAgICAgICAgICAgbGV0IGluZEJ1ZiA9IG5ldyBJbnQzMkFycmF5KHRoaXMuaW5kaWNlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpbmRCdWYuc2V0KHRoaXMuaW5kaWNlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kQnVmZmVyQXNzZXQuYnVmZmVyRGF0YSA9IGluZEJ1Zi5idWZmZXI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRCdWZmZXJBc3NldC5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRleHR1cmVBc3NldFdlYkdMIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXh0dXJlOiBXZWJHTFRleHR1cmU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0YWdlOiBTdGFnZVdlYkdMLCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IFdlYkdMVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBpZiAoaW1hZ2UgaW5zdGFuY2VvZiBXZWJHTFRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IGltYWdlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gc3RhZ2UuZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLnRleEltYWdlMkQoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgMCwgc3RhZ2UuZ2wuUkdCQSwgc3RhZ2UuZ2wuUkdCQSwgc3RhZ2UuZ2wuVU5TSUdORURfQllURSwgaW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wudGV4UGFyYW1ldGVyaShzdGFnZS5nbC5URVhUVVJFXzJELCBzdGFnZS5nbC5URVhUVVJFX01BR19GSUxURVIsIHN0YWdlLmdsLkxJTkVBUik7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC50ZXhQYXJhbWV0ZXJpKHN0YWdlLmdsLlRFWFRVUkVfMkQsIHN0YWdlLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgc3RhZ2UuZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmdlbmVyYXRlTWlwbWFwKHN0YWdlLmdsLlRFWFRVUkVfMkQpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJpbmQoc3RhZ2U6IFN0YWdlV2ViR0wsIHByb2dyYW06IFNoYWRlclByb2dyYW1XZWJHTCwgYXR0cmlidXRlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmFjdGl2ZVRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRTApO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC51bmlmb3JtMWkoc3RhZ2UuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0uUHJvZ3JhbSwgYXR0cmlidXRlTmFtZSksIDApO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5iaW5kVGV4dHVyZShzdGFnZS5nbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdW5iaW5kKHN0YWdlOiBTdGFnZVdlYkdMLCBwcm9ncmFtOiBTaGFkZXJQcm9ncmFtV2ViR0wsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5hY3RpdmVUZXh0dXJlKHN0YWdlLmdsLlRFWFRVUkUwKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLy8gQW4gYXNzZXQgc3RvcmUgY2xhc3MgZm9yIFdlYkdMLlxyXG4gICAgZXhwb3J0IGNsYXNzIEFzc2V0U3RvcmVXZWJHTCB7XHJcblxyXG4gICAgICAgIC8vLyBBbGwgYWdncmVnYXRlZCBmaWd1cmVzLlxyXG4gICAgICAgIHByaXZhdGUgZmlndXJlczogeyBbaW5kZXg6IHN0cmluZ106IEZpZ3VyZVdlYkdMIH0gPSB7fTtcclxuXHJcbiAgICAgICAgLy8vIEFsbCBhZ2dyZWdhdGVkIG5vZGVzIGFzc2V0cy5cclxuICAgICAgICBwcml2YXRlIHJvb3ROb2RlQXNzZXRzOiB7IFtpbmRleDogc3RyaW5nXTogTm9kZUFzc2V0IH0gPSB7fTtcclxuXHJcbiAgICAgICAgLy8vIEFsbCBhZ2dyZWdhdGVkIGJ1ZmZlciBhc3NldHMuXHJcbiAgICAgICAgcHJpdmF0ZSBidWZmZXJBc3NldHM6IHsgW2luZGV4OiBzdHJpbmddOiBCdWZmZXJBc3NldFdlYkdMIH0gPSB7fTtcclxuXHJcbiAgICAgICAgLy8vIEFsbCBhZ2dyZWdhdGVkIHRleHR1cmUgYXNzZXRzLlxyXG4gICAgICAgIHByaXZhdGUgdGV4dHVyZUFzc2V0czogeyBbaW5kZXg6IHN0cmluZ106IFRleHR1cmVBc3NldFdlYkdMIH0gPSB7fTtcclxuXHJcblxyXG4gICAgICAgIC8vLyBBZGRzIHRoZSBzcGVjaWZpZWQgZmlndXJlIHRvIHRoZSB0aGUgc3RvcmUuXHJcbiAgICAgICAgcHVibGljIGFkZEZpZ3VyZShmaWd1cmU6IEZpZ3VyZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlndXJlc1tmaWd1cmUuRmlndXJlSURdID0gZmlndXJlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIERldGVybWluZXMgdGhlIGZpZ3VyZSB3aXRoIHRoZSB0aGUgc3BlY2lmaWVkIGlkLlxyXG4gICAgICAgIHB1YmxpYyBnZXRGaWd1cmUoZmlndXJlSUQ6IHN0cmluZyk6IEZpZ3VyZVdlYkdMIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlndXJlc1tmaWd1cmVJRF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gQWRkcyBhIGJ1ZmZlciBhc3NldCB0byB0aGUgc3RvcmUuXHJcbiAgICAgICAgcHVibGljIGFkZEJ1ZmZlckFzc2V0KGJ1ZmZlckFzc2V0SUQ6IHN0cmluZywgYnVmZmVyQXNzZXQ6IEJ1ZmZlckFzc2V0V2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5idWZmZXJBc3NldHNbYnVmZmVyQXNzZXRJRF0gPSBidWZmZXJBc3NldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRSb290Tm9kZShub2RlOiBOb2RlQXNzZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290Tm9kZUFzc2V0c1tub2RlLk5hbWVdID0gbm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyBEZXRlcm1pbmVzIHRoZSBidWZmZXIgYXNzZXQgd2l0aCB0aGUgc3BlY2lmaWVkIGlkLlxyXG4gICAgICAgIHB1YmxpYyBnZXRCdWZmZXJBc3NldChidWZmZXJBc3NldElEOiBzdHJpbmcpOiBCdWZmZXJBc3NldFdlYkdMIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyQXNzZXRzW2J1ZmZlckFzc2V0SURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIEFkZHMgYSB0ZXh0dXJlIGFzc2V0IHRvIHRoZSBzdG9yZS5cclxuICAgICAgICBwdWJsaWMgYWRkVGV4dHVyZUFzc2V0KHRleHR1cmVBc3NldElEOiBzdHJpbmcsIHRleHR1cmVBc3NldDogVGV4dHVyZUFzc2V0V2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlQXNzZXRzW3RleHR1cmVBc3NldElEXSA9IHRleHR1cmVBc3NldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyBEZXRlcm1pbmVzIHRoZSB0ZXh0dXJlIGFzc2V0IHdpdGggdGhlIHNwZWNpZmllZCBpZC5cclxuICAgICAgICBwdWJsaWMgZ2V0VGV4dHVyZUFzc2V0KHRleHR1cmVBc3NldElEOiBzdHJpbmcpOiBUZXh0dXJlQXNzZXRXZWJHTCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHR1cmVBc3NldHNbdGV4dHVyZUFzc2V0SURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIFJldHVybnMgdGhlIG1hcCBvZiBhZ2dyZWdhdGVkIGZpZ3VyZXMuXHJcbiAgICAgICAgcHVibGljIGdldCBGaWd1cmVzKCk6IHsgW2luZGV4OiBzdHJpbmddOiBGaWd1cmVXZWJHTCB9IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlndXJlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRSb290Tm9kZShuYW1lOiBzdHJpbmcpOiBOb2RlQXNzZXQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290Tm9kZUFzc2V0c1tuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2NlbmVJdGVtRmlsdGVyV2ViR0wge1xyXG4gICAgICAgIHBhc3NlcyhzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMLCBjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHZW5lcmljU2NlbmVJdGVtRmlsdGVyV2ViR0wgaW1wbGVtZW50cyBTY2VuZUl0ZW1GaWx0ZXJXZWJHTCB7XHJcbiAgICAgICAgcGFzc2VzKHNjZW5lSXRlbTogU2NlbmVJdGVtV2ViR0wsIGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGV4dC5QaGFzZSAhPSAnU2hhZG93JztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTY2VuZUl0ZW1XZWJHTCB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzY2VuZTogU2NlbmVXZWJHTDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHBhcmVudDogU2NlbmVJdGVtV2ViR0w7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzY2VuZUl0ZW1JRDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRyZW46IEFycmF5PFNjZW5lSXRlbVdlYkdMPiA9IFtdXHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBjaGlsZHJlbkJ5S2V5OiB7IFtzY2VuZUl0ZW1JRDogc3RyaW5nXTogU2NlbmVJdGVtV2ViR0wgfSA9IHt9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpc1Zpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBjaGlsZHJlblZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB0ZXN0SW50ZXJzZWN0aW9uOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdGVzdENoaWxkcmVuSW50ZXJzZWN0aW9uOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZmlsdGVyOiBTY2VuZUl0ZW1GaWx0ZXJXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhOiB7IFtpbmRleDogc3RyaW5nXTogYW55IH0gPSB7fTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBEYXRhKCk6IHsgW2luZGV4OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2VuZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2NlbmVJdGVtSUQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjZW5lSXRlbUlEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBDaGlsZHJlbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFRlc3RDaGlsZHJlbkludGVyc2VjdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVzdENoaWxkcmVuSW50ZXJzZWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBUZXN0Q2hpbGRyZW5JbnRlcnNlY3Rpb24odmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVzdENoaWxkcmVuSW50ZXJzZWN0aW9uID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBUZXN0SW50ZXJzZWN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXN0SW50ZXJzZWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBUZXN0SW50ZXJzZWN0aW9uKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RJbnRlcnNlY3Rpb24gPSB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEZpbHRlcigpIHsgcmV0dXJuIHRoaXMuZmlsdGVyOyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgRmlsdGVyKHZhbHVlOiBTY2VuZUl0ZW1GaWx0ZXJXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlciA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lV2ViR0wsIHNjZW5lSXRlbUlEOiBzdHJpbmcsIGlzVmlzaWJsZT86IGJvb2xlYW4sIHRlc3RJbnRlcnNlY3Rpb24/OiBib29sZWFuLCBjaGlsZHJlblZpc2libGU/OiBib29sZWFuLCB0ZXN0Q2hpbGRyZW5JbnRlcnNlY3Rpb24/OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUl0ZW1JRCA9IHNjZW5lSXRlbUlEO1xyXG4gICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGlzVmlzaWJsZSB8fCB0eXBlb2YgaXNWaXNpYmxlID09PSAndW5kZWZpbmVkJztcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlblZpc2libGUgPSBjaGlsZHJlblZpc2libGUgfHwgdHlwZW9mIGNoaWxkcmVuVmlzaWJsZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbiAgICAgICAgICAgIHRoaXMudGVzdEludGVyc2VjdGlvbiA9IHRlc3RJbnRlcnNlY3Rpb24gfHwgdHlwZW9mIHRlc3RJbnRlcnNlY3Rpb24gPT09ICd1bmRlZmluZWQnO1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RDaGlsZHJlbkludGVyc2VjdGlvbiA9IHRlc3RDaGlsZHJlbkludGVyc2VjdGlvbiB8fCB0eXBlb2YgdGVzdENoaWxkcmVuSW50ZXJzZWN0aW9uID09PSAndW5kZWZpbmVkJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRDaGlsZChzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5CeUtleVtzY2VuZUl0ZW0uc2NlbmVJdGVtSURdID0gc2NlbmVJdGVtO1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goc2NlbmVJdGVtKTtcclxuICAgICAgICAgICAgc2NlbmVJdGVtLmFkZGVkVG9TY2VuZUdyYXBoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldENoaWxkKHNjZW5lSXRlbUlEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5CeUtleVtzY2VuZUl0ZW1JRF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQoc2NlbmVJdGVtSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5maWx0ZXIoc2NlbmVJdGVtID0+IHNjZW5lSXRlbS5zY2VuZUl0ZW1JRCAhPSBzY2VuZUl0ZW1JRCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNoaWxkcmVuQnlLZXlbc2NlbmVJdGVtSURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluc2VydENoaWxkKHNjZW5lSXRlbTogU2NlbmVJdGVtV2ViR0wsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbkJ5S2V5W3NjZW5lSXRlbS5zY2VuZUl0ZW1JRF0gPSBzY2VuZUl0ZW07XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBzY2VuZUl0ZW0pO1xyXG4gICAgICAgICAgICBzY2VuZUl0ZW0uYWRkZWRUb1NjZW5lR3JhcGgodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYmVnaW5SZW5kZXIoY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZW5kUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpbHRlciB8fCB0aGlzLmZpbHRlci5wYXNzZXModGhpcywgY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5SZW5kZXIoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlbmRlckNoaWxkcmVuKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlblZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW5kZXIoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZGVkVG9TY2VuZUdyYXBoKHBhcmVudFNjZW5lSXRlbTogU2NlbmVJdGVtV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZSA9IHBhcmVudFNjZW5lSXRlbS5zY2VuZTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRTY2VuZUl0ZW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50ZXJzZWN0c0JvdW5kaW5nQm94KHJheTogcHNnZW9tZXRyeS5MaW5lM0QsIGF0OiBwc2dlb21ldHJ5LlZlYzMpOiBCb29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpc0ludGVyc2VjdGlvbkNhbmRpZGF0ZShyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBhdDogcHNnZW9tZXRyeS5WZWMzKTogQm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmludGVyc2VjdHNCb3VuZGluZ0JveChyYXksIGF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRJbnRlcnNlY3Rpb25DYW5kaWRhdGVzKHJheTogcHNnZW9tZXRyeS5MaW5lM0QsIGNhbmRpZGF0ZXM6IEFycmF5PEludGVyc2VjdGlvbkNhbmRpZGF0ZT4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVzdEludGVyc2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGF0ID0gbmV3IHBzZ2VvbWV0cnkuVmVjMygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnRlcnNlY3Rpb25DYW5kaWRhdGUocmF5LCBhdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzLnB1c2gobmV3IEludGVyc2VjdGlvbkNhbmRpZGF0ZSh0aGlzLCBhdC5zcXVhcmVkRGlzdChyYXkucDAuYXNWZWMzKCkpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudGVzdENoaWxkcmVuSW50ZXJzZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLmFkZEludGVyc2VjdGlvbkNhbmRpZGF0ZXMocmF5LCBjYW5kaWRhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQWN0b3JXZWJHTCBleHRlbmRzIFNjZW5lSXRlbVdlYkdMIHtcclxuICAgICAgICBwcml2YXRlIGZpZ3VyZXM6IEZpZ3VyZVdlYkdMW10gPSBbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsYXN0TW9kZWxUcmFuc2Zvcm06IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnZlcnNlTW9kZWxUcmFuc2Zvcm06IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZTogUmVuZGVyU3RhdGUgPSBuZXcgUmVuZGVyU3RhdGUoKTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBTdGF0ZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEZpZ3VyZXMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZ3VyZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmVXZWJHTCwgYWN0b3JJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHNjZW5lLCBhY3RvcklEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRGaWd1cmUoZmlndXJlOiBGaWd1cmVXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpZ3VyZXMucHVzaChmaWd1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpZ3VyZXMuZm9yRWFjaCgoZmlndXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmaWd1cmUucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50ZXJzZWN0c0JvdW5kaW5nQm94KHJheTogcHNnZW9tZXRyeS5MaW5lM0QsIGF0OiBwc2dlb21ldHJ5LlZlYzMpOiBCb29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybWVkUmF5ID0gdGhpcy5pbnZlcnNlTW9kZWxUcmFuc2Zvcm0gPyByYXkudHJhbnNmb3JtKHRoaXMuaW52ZXJzZU1vZGVsVHJhbnNmb3JtKSA6IHJheTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZmlndXJlSWR4IGluIHRoaXMuZmlndXJlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmZpZ3VyZXNbZmlndXJlSWR4XS5pbnRlcnNlY3RzQm91bmRpbmdCb3godHJhbnNmb3JtZWRSYXksIGF0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0LmFzc2lnblZlYyg8cHNnZW9tZXRyeS5WZWM0PnRoaXMubGFzdE1vZGVsVHJhbnNmb3JtLm11bHRpcGx5KGF0LmFzVmVjNCgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsdGVyIHx8IHRoaXMuZmlsdGVyLnBhc3Nlcyh0aGlzLCBjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlIHx8IHRoaXMuY2hpbGRyZW5WaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5wdXNoU3RhdGUodGhpcy5zdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luUmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNoaWxkcmVuKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNoaWxkcmVuKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vZGVsVHJhbnNmb3JtID0gY29udGV4dC5Ob2RlVHJhbnNmb3JtID8gPHBzZ2VvbWV0cnkuTWF0cml4ND5jb250ZXh0Lk5vZGVUcmFuc2Zvcm0ubXVsdGlwbHkoY29udGV4dC5Nb2RlbFRyYW5zZm9ybSkgOiBjb250ZXh0Lk1vZGVsVHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbW9kZWxUcmFuc2Zvcm0uZXF1YWxzKHRoaXMubGFzdE1vZGVsVHJhbnNmb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludmVyc2VNb2RlbFRyYW5zZm9ybSA9IG1vZGVsVHJhbnNmb3JtLmludmVyc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0TW9kZWxUcmFuc2Zvcm0gPSBtb2RlbFRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQucG9wU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludGVyc2VjdGlvbkNhbmRpZGF0ZSB7XHJcbiAgICAgICAgcHVibGljIHNjZW5lSXRlbTogU2NlbmVJdGVtV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3F1YXJlZERpc3Q6IG51bWJlciA9IEluZmluaXR5O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMLCBzcXVhcmVkRGlzdDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVJdGVtID0gc2NlbmVJdGVtO1xyXG4gICAgICAgICAgICB0aGlzLnNxdWFyZWREaXN0ID0gc3F1YXJlZERpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29tcGFyZShpbnRlcnNlY3Rpb25DYW5kaWRhdGU6IEludGVyc2VjdGlvbkNhbmRpZGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcXVhcmVkRGlzdCA8IGludGVyc2VjdGlvbkNhbmRpZGF0ZS5zcXVhcmVkRGlzdCA/IC0xIDpcclxuICAgICAgICAgICAgICAgICh0aGlzLnNxdWFyZWREaXN0ID4gaW50ZXJzZWN0aW9uQ2FuZGlkYXRlLnNxdWFyZWREaXN0ID8gMSA6IDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUmVuZGVyU3RhdGUge1xyXG4gICAgICAgIHByaXZhdGUgcGFyZW50OiBSZW5kZXJTdGF0ZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBlbnRyaWVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUGFyZW50KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IFBhcmVudCh2YWw6IFJlbmRlclN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBldmFsdWF0ZShlbnRyeTogYW55KTogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBlbnRyeSA9PSAnZnVuY3Rpb24nID8gZW50cnkodGhpcykgOiBlbnRyeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb250YWlucyhrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzW2tleV0gIT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldDxUPihrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBUKTogVCB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudHJ5R2V0KGtleSwgKHZhbCkgPT4geyByZXN1bHQgPSB2YWw7IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHRyeUdldChrZXk6IHN0cmluZywgbGFtYmRhOiAodmFsOiBhbnkpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbnMoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhKHRoaXMuZXZhbHVhdGUodGhpcy5lbnRyaWVzW2tleV0pKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID09IG51bGwgPyBmYWxzZSA6IHRoaXMucGFyZW50LnRyeUdldChrZXksIGxhbWJkYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbnRyaWVzW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNjZW5lV2ViR0wge1xyXG5cclxuICAgICAgICBwcml2YXRlIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzY2VuZUhpZXJhcmNoeTogU2NlbmVJdGVtV2ViR0wgPSBuZXcgU2NlbmVJdGVtV2ViR0wodGhpcywgJycpO1xyXG5cclxuICAgICAgICBwcml2YXRlIGRpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZSA9IG5ldyBSZW5kZXJTdGF0ZSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lSGllcmFyY2h5KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2VuZUhpZXJhcmNoeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXNJbml0aWFsaXplZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNJbml0aWFsaXplZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgSXNJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0RGlydHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzRGlydHkoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcnR5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU2NlbmVDYXRlZ29yeSA9IHRoaXMuZ2V0U2NlbmVDYXRlZ29yeSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZVJ1bm5pbmdTZXF1ZW5jZXMoY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5wdXNoU3RhdGUodGhpcy5zdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZUhpZXJhcmNoeS5yZW5kZXIoY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5wb3BTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkU2NlbmVJdGVtKHNjZW5lSXRlbTogU2NlbmVJdGVtV2ViR0wsIG1ha2VWaXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVIaWVyYXJjaHkuYWRkQ2hpbGQoc2NlbmVJdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5zZXREaXJ0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFNjZW5lSXRlbShzY2VuZUl0ZW1JRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjZW5lSGllcmFyY2h5LmdldENoaWxkKHNjZW5lSXRlbUlEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZW1vdmVTY2VuZUl0ZW0oc2NlbmVJdGVtSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lSGllcmFyY2h5LnJlbW92ZUNoaWxkKHNjZW5lSXRlbUlEKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnNlcnRTY2VuZUl0ZW0oc2NlbmVJdGVtOiBTY2VuZUl0ZW1XZWJHTCwgaW5kZXg6IG51bWJlciwgbWFrZVZpc2libGU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUhpZXJhcmNoeS5pbnNlcnRDaGlsZChzY2VuZUl0ZW0sIGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBnZXRTY2VuZUNhdGVnb3J5KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0SW50ZXJzZWN0aW9uQ2FuZGlkYXRlcyhyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBjYW5kaWRhdGVzOiBBcnJheTxJbnRlcnNlY3Rpb25DYW5kaWRhdGU+KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVIaWVyYXJjaHkuYWRkSW50ZXJzZWN0aW9uQ2FuZGlkYXRlcyhyYXksIGNhbmRpZGF0ZXMpO1xyXG4gICAgICAgICAgICBjYW5kaWRhdGVzLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEuY29tcGFyZShiKTsgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiZWdpbkZyYW1lKCkge31cclxuXHJcbiAgICAgICAgLyoqIFVwZGF0ZSBpcyBjYWxsZWQgcGVyaW9kaWNhbGx5IChvbmNlIHBlciBmcmFtZSkgdG8gYWxsb3cgdXBkYXRpbmcgdGhlIHN0YXRlIG9mIHRoZSBzY2VuZS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHVwZGF0ZSgpIHt9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbmRGcmFtZSgpIHt9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG4gICAgICAgIHByb3RlY3RlZCBwcm9qZWN0aW9uTWF0cml4OiBwc2dlb21ldHJ5Lk1hdHJpeDQ7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbnZlcnNlUHJvamVjdGlvbk1hdHJpeDogcHNnZW9tZXRyeS5NYXRyaXg0O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlld01hdHJpeDogcHNnZW9tZXRyeS5NYXRyaXg0O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaW52ZXJzZVZpZXdNYXRyaXg6IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUHJvamVjdGlvbk1hdHJpeCgpIHsgcmV0dXJuIHRoaXMucHJvamVjdGlvbk1hdHJpeDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFZpZXdNYXRyaXgoKSB7IHJldHVybiB0aGlzLnZpZXdNYXRyaXg7IH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHNldERpcnR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0RpcnR5KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVWaWV3TWF0cml4KGV5ZTogcHNnZW9tZXRyeS5WZWMzLCBjZW50ZXI6IHBzZ2VvbWV0cnkuVmVjMywgdXA6IHBzZ2VvbWV0cnkuVmVjMyk6IHBzZ2VvbWV0cnkuTWF0cml4NCB7XHJcbiAgICAgICAgICAgIGxldCB6ID0gZXllLnN1YihjZW50ZXIpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBsZXQgeCA9IHVwLmNyb3NzKHopLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBsZXQgeSA9IHouY3Jvc3MoeCkubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbSA9IG5ldyBwc2dlb21ldHJ5Lk1hdHJpeDQoW3gueCwgeC55LCB4LnosIDAsXHJcbiAgICAgICAgICAgIHkueCwgeS55LCB5LnosIDAsXHJcbiAgICAgICAgICAgIHoueCwgei55LCB6LnosIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAwLCAxXSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdCA9IG5ldyBwc2dlb21ldHJ5Lk1hdHJpeDQoWzEsIDAsIDAsIC1leWUueCxcclxuICAgICAgICAgICAgICAgIDAsIDEsIDAsIC1leWUueSxcclxuICAgICAgICAgICAgICAgIDAsIDAsIDEsIC1leWUueixcclxuICAgICAgICAgICAgICAgIDAsIDAsIDAsIDFdKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxwc2dlb21ldHJ5Lk1hdHJpeDQ+dC5tdWx0aXBseShtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVQZXJzcGVjdGl2ZU1hdHJpeChmb3Z5LCBhc3BlY3QsIHpuZWFyLCB6ZmFyKTogcHNnZW9tZXRyeS5NYXRyaXg0IHtcclxuICAgICAgICAgICAgbGV0IHltYXggPSB6bmVhciAqIE1hdGgudGFuKGZvdnkgKiBNYXRoLlBJIC8gMzYwLjApO1xyXG4gICAgICAgICAgICBsZXQgeW1pbiA9IC15bWF4O1xyXG4gICAgICAgICAgICBsZXQgeG1pbiA9IHltaW4gKiBhc3BlY3Q7XHJcbiAgICAgICAgICAgIGxldCB4bWF4ID0geW1heCAqIGFzcGVjdDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1ha2VGcnVzdHVtKHhtaW4sIHhtYXgsIHltaW4sIHltYXgsIHpuZWFyLCB6ZmFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVPcnRob2dyYXBoaWNNYXRyaXgobGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpOiBwc2dlb21ldHJ5Lk1hdHJpeDQge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHBzZ2VvbWV0cnkuTWF0cml4NChbXHJcbiAgICAgICAgICAgICAgICAyIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAyIC8gKHRvcCAtIGJvdHRvbSksIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAyIC8gKG5lYXIgLSBmYXIpLCAwLFxyXG5cclxuICAgICAgICAgICAgICAgIChsZWZ0ICsgcmlnaHQpIC8gKGxlZnQgLSByaWdodCksXHJcbiAgICAgICAgICAgICAgICAoYm90dG9tICsgdG9wKSAvIChib3R0b20gLSB0b3ApLFxyXG4gICAgICAgICAgICAgICAgKG5lYXIgKyBmYXIpIC8gKG5lYXIgLSBmYXIpLFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgbWFrZUZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCB6bmVhciwgemZhcik6IHBzZ2VvbWV0cnkuTWF0cml4NCB7XHJcbiAgICAgICAgICAgIGxldCBYOiBudW1iZXIgPSAyICogem5lYXIgLyAocmlnaHQgLSBsZWZ0KTtcclxuICAgICAgICAgICAgbGV0IFk6IG51bWJlciA9IDIgKiB6bmVhciAvICh0b3AgLSBib3R0b20pO1xyXG4gICAgICAgICAgICBsZXQgQTogbnVtYmVyID0gKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KTtcclxuICAgICAgICAgICAgbGV0IEI6IG51bWJlciA9ICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSk7XHJcbiAgICAgICAgICAgIGxldCBDOiBudW1iZXIgPSAtKHpmYXIgKyB6bmVhcikgLyAoemZhciAtIHpuZWFyKTtcclxuICAgICAgICAgICAgbGV0IEQ6IG51bWJlciA9IC0yICogemZhciAqIHpuZWFyIC8gKHpmYXIgLSB6bmVhcik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHBzZ2VvbWV0cnkuTWF0cml4NChbXHJcbiAgICAgICAgICAgICAgICBYLCAwLCBBLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgWSwgQiwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIEMsIEQsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAtMSwgMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYWRvd0NhbWVyYVdlYkdMIGV4dGVuZHMgQ2FtZXJhIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFkb3dNYXBXaWR0aCA9IDEwMjQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZG93TWFwSGVpZ2h0ID0gMTAyNDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFkb3dGcmFtZWJ1ZmZlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFkb3dEZXB0aFRleHR1cmU7IFxyXG5cclxuICAgICAgICBwcml2YXRlIHJlbmRlckJ1ZmZlcjtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyByZXNpemUoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlvbk1hdHJpeCA9IHRoaXMuY3JlYXRlT3J0aG9ncmFwaGljTWF0cml4KC01LCA1LCAtNSwgNSwgLTMwLCAzMCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKG5ldyBwc2dlb21ldHJ5LlZlYzMoMCwgMTAsIDApLCBuZXcgcHNnZW9tZXRyeS5WZWMzKDAsIDAsIDApLCBuZXcgcHNnZW9tZXRyeS5WZWMzKDAsIDAsIC0xKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNoYWRvd0ZyYW1lYnVmZmVyID0gc3RhZ2UuZ2wuY3JlYXRlRnJhbWVidWZmZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dEZXB0aFRleHR1cmUgPSBzdGFnZS5nbC5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQnVmZmVyID0gc3RhZ2UuZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2hhZG93VGV4dHVyZSA9IG5ldyBUZXh0dXJlQXNzZXRXZWJHTChzdGFnZSwgdGhpcy5zaGFkb3dEZXB0aFRleHR1cmUpO1xyXG4gICAgICAgICAgICBzdGFnZS5Bc3NldFN0b3JlLmFkZFRleHR1cmVBc3NldCgnU2hhZG93Jywgc2hhZG93VGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5iaW5kRnJhbWVidWZmZXIoc3RhZ2UuZ2wuRlJBTUVCVUZGRVIsIHRoaXMuc2hhZG93RnJhbWVidWZmZXIpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5iaW5kVGV4dHVyZShzdGFnZS5nbC5URVhUVVJFXzJELCB0aGlzLnNoYWRvd0RlcHRoVGV4dHVyZSk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLnRleFBhcmFtZXRlcmkoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgc3RhZ2UuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBzdGFnZS5nbC5MSU5FQVIpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC50ZXhQYXJhbWV0ZXJpKHN0YWdlLmdsLlRFWFRVUkVfMkQsIHN0YWdlLmdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgc3RhZ2UuZ2wuTElORUFSKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wudGV4SW1hZ2UyRChzdGFnZS5nbC5URVhUVVJFXzJELCAwLCBzdGFnZS5nbC5SR0JBLCB0aGlzLnNoYWRvd01hcFdpZHRoLCB0aGlzLnNoYWRvd01hcEhlaWdodCwgMCwgc3RhZ2UuZ2wuUkdCQSwgc3RhZ2UuZ2wuVU5TSUdORURfQllURSwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5iaW5kUmVuZGVyYnVmZmVyKHN0YWdlLmdsLlJFTkRFUkJVRkZFUiwgdGhpcy5yZW5kZXJCdWZmZXIpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5yZW5kZXJidWZmZXJTdG9yYWdlKHN0YWdlLmdsLlJFTkRFUkJVRkZFUiwgc3RhZ2UuZ2wuREVQVEhfQ09NUE9ORU5UMTYsIHRoaXMuc2hhZG93TWFwV2lkdGgsIHRoaXMuc2hhZG93TWFwSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKHN0YWdlLmdsLkZSQU1FQlVGRkVSLCBzdGFnZS5nbC5DT0xPUl9BVFRBQ0hNRU5UMCwgc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgdGhpcy5zaGFkb3dEZXB0aFRleHR1cmUsIDApO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlcihzdGFnZS5nbC5GUkFNRUJVRkZFUiwgc3RhZ2UuZ2wuREVQVEhfQVRUQUNITUVOVCwgc3RhZ2UuZ2wuUkVOREVSQlVGRkVSLCB0aGlzLnJlbmRlckJ1ZmZlcik7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5iaW5kVGV4dHVyZShzdGFnZS5nbC5URVhUVVJFXzJELCBudWxsKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFJlbmRlcmJ1ZmZlcihzdGFnZS5nbC5SRU5ERVJCVUZGRVIsIG51bGwpOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGVTaGFkb3dBcmVhKGJib3g6IHBzZ2VvbWV0cnkuQUFCQjJEKSB7XHJcbiAgICAgICAgICAgIHZhciBjZW50ZXIgPSBiYm94LmNlbnRlcigpO1xyXG4gICAgICAgICAgICB2YXIgZXh0ZW50cyA9IGJib3guZXh0ZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSB0aGlzLmNyZWF0ZU9ydGhvZ3JhcGhpY01hdHJpeCgtZXh0ZW50cy54IC8gMiwgZXh0ZW50cy54IC8gMiwgLWV4dGVudHMueSAvIDIsIGV4dGVudHMueSAvIDIsIC0zMCwgMzApO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShuZXcgcHNnZW9tZXRyeS5WZWMzKGNlbnRlci54LCAxMCwgY2VudGVyLnkpLCBuZXcgcHNnZW9tZXRyeS5WZWMzKGNlbnRlci54LCAwLCBjZW50ZXIueSksIG5ldyBwc2dlb21ldHJ5LlZlYzMoMCwgMCwgLTEpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXREaXJ0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHVwZGF0ZShwb3M6IHBzZ2VvbWV0cnkuVmVjMywgbG9va0F0OiBwc2dlb21ldHJ5LlZlYzMsIHVwOiBwc2dlb21ldHJ5LlZlYzMpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3TWF0cml4ID0gdGhpcy5jcmVhdGVWaWV3TWF0cml4KHBvcywgbG9va0F0LCB1cCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmVnaW5SZW5kZXIoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEZyYW1lYnVmZmVyKHN0YWdlLmdsLkZSQU1FQlVGRkVSLCB0aGlzLnNoYWRvd0ZyYW1lYnVmZmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgdmlld3BvcnQgdG8gbWF0Y2hcclxuICAgICAgICAgICAgc3RhZ2UuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5zaGFkb3dNYXBXaWR0aCwgdGhpcy5zaGFkb3dNYXBIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY2xlYXJDb2xvcigwLjIsIDAuMiwgMC4yLCAwLjApO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5jbGVhckRlcHRoKDAuMCk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmNsZWFyKHN0YWdlLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCBzdGFnZS5nbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmVuYWJsZShzdGFnZS5nbC5ERVBUSF9URVNUKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuZW5hYmxlKHN0YWdlLmdsLkNVTExfRkFDRSk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmZyb250RmFjZShzdGFnZS5nbC5DQ1cpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5jdWxsRmFjZShzdGFnZS5nbC5CQUNLKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuZGVwdGhGdW5jKHN0YWdlLmdsLkdFUVVBTCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW5kUmVuZGVyKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ2FtZXJhV2ViR0wgZXh0ZW5kcyBDYW1lcmEge1xyXG5cclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRDYW1lcmFQb3M6IHBzZ2VvbWV0cnkuVmVjMztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjbGllbnRXaWR0aDogbnVtYmVyID0gMS4wO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNsaWVudEhlaWdodDogbnVtYmVyID0gMS4wO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBQcm9qZWN0aW9uTWF0cml4KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0aW9uTWF0cml4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBWaWV3TWF0cml4KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3TWF0cml4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlc2l6ZShzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgcmVhbFRvQ1NTUGl4ZWxzID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50V2lkdGggPSBzdGFnZS5nbC5jYW52YXMuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50SGVpZ2h0ID0gc3RhZ2UuZ2wuY2FudmFzLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIC8vIExvb2t1cCB0aGUgc2l6ZSB0aGUgYnJvd3NlciBpcyBkaXNwbGF5aW5nIHRoZSBjYW52YXMgaW4gQ1NTIHBpeGVsc1xyXG4gICAgICAgICAgICAvLyBhbmQgY29tcHV0ZSBhIHNpemUgbmVlZGVkIHRvIG1ha2Ugb3VyIGRyYXdpbmdidWZmZXIgbWF0Y2ggaXQgaW5cclxuICAgICAgICAgICAgLy8gZGV2aWNlIHBpeGVscy5cclxuICAgICAgICAgICAgbGV0IGRpc3BsYXlXaWR0aCA9IE1hdGguZmxvb3Ioc3RhZ2UuZ2wuY2FudmFzLmNsaWVudFdpZHRoICogcmVhbFRvQ1NTUGl4ZWxzKTtcclxuICAgICAgICAgICAgbGV0IGRpc3BsYXlIZWlnaHQgPSBNYXRoLmZsb29yKHN0YWdlLmdsLmNhbnZhcy5jbGllbnRIZWlnaHQgKiByZWFsVG9DU1NQaXhlbHMpO1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSB0aGUgY2FudmFzIHRoZSBzYW1lIHNpemVcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY2FudmFzLndpZHRoID0gZGlzcGxheVdpZHRoIC8gcmVhbFRvQ1NTUGl4ZWxzO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5jYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodCAvIHJlYWxUb0NTU1BpeGVscztcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlvbk1hdHJpeCA9IHRoaXMuY3JlYXRlUGVyc3BlY3RpdmVNYXRyaXgoNDUuMCwgc3RhZ2UuZ2wuY2FudmFzLmNsaWVudFdpZHRoIC8gc3RhZ2UuZ2wuY2FudmFzLmNsaWVudEhlaWdodCwgMC4xLCAyMDAuMCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gdGhpcy5jcmVhdGVPcnRob2dyYXBoaWNNYXRyaXgoLTUsIDUsIC01LCA1LCAtMzAsIDMwKTtcclxuICAgICAgICAgICAgdGhpcy5pbnZlcnNlUHJvamVjdGlvbk1hdHJpeCA9IHRoaXMucHJvamVjdGlvbk1hdHJpeC5pbnZlcnNlKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy52aWV3TWF0cml4ID0gdGhpcy5jcmVhdGVWaWV3TWF0cml4KG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAxLjgsIDE1LjApLCBuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMC4wLCAwLjApLCBuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMS4wLCAwLjApKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGUocG9zOiBwc2dlb21ldHJ5LlZlYzMsIGxvb2tBdDogcHNnZW9tZXRyeS5WZWMzLCB1cDogcHNnZW9tZXRyeS5WZWMzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudENhbWVyYVBvcyA9IHBvcztcclxuICAgICAgICAgICAgdGhpcy52aWV3TWF0cml4ID0gdGhpcy5jcmVhdGVWaWV3TWF0cml4KHBvcywgbG9va0F0LCB1cCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW52ZXJzZVZpZXdNYXRyaXggPSB0aGlzLnZpZXdNYXRyaXguaW52ZXJzZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXREaXJ0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luUmVuZGVyKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIHZpZXdwb3J0IHRvIG1hdGNoXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLnZpZXdwb3J0KDAsIDAsIHN0YWdlLmdsLmNhbnZhcy5jbGllbnRXaWR0aCwgc3RhZ2UuZ2wuY2FudmFzLmNsaWVudEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5iaW5kRnJhbWVidWZmZXIoc3RhZ2UuZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY2xlYXJDb2xvcigwLjMsIDAuMywgMC4zLCAxLjApO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5jbGVhckRlcHRoKDEuMCk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmNsZWFyKHN0YWdlLmdsLkRFUFRIX0JVRkZFUl9CSVQpOyAvLyBzdGFnZS5nbC5DT0xPUl9CVUZGRVJfQklUIHwgXHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5lbmFibGUoc3RhZ2UuZ2wuREVQVEhfVEVTVCk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmVuYWJsZShzdGFnZS5nbC5DVUxMX0ZBQ0UpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5mcm9udEZhY2Uoc3RhZ2UuZ2wuQ0NXKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY3VsbEZhY2Uoc3RhZ2UuZ2wuQkFDSyk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmRlcHRoRnVuYyhzdGFnZS5nbC5MRVFVQUwpOyAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbmRSZW5kZXIoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRWaWV3UmF5KGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKTogcHNnZW9tZXRyeS5MaW5lM0Qge1xyXG4gICAgICAgICAgICBsZXQgY3Vyc29yID0gbmV3IHBzZ2VvbWV0cnkuVmVjNChjbGllbnRYIC8gdGhpcy5jbGllbnRXaWR0aCAqIDIuMCAtIDEuMCwgMS4wIC0gY2xpZW50WSAvIHRoaXMuY2xpZW50SGVpZ2h0ICogMi4wLCAtMS4wLCAxLjApO1xyXG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gPHBzZ2VvbWV0cnkuVmVjND50aGlzLmludmVyc2VQcm9qZWN0aW9uTWF0cml4Lm11bHRpcGx5KGN1cnNvcik7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi53ID0gMS4wO1xyXG4gICAgICAgICAgICBsZXQgZm9yd2FyZCA9IHRoaXMuaW52ZXJzZVZpZXdNYXRyaXgubXVsdGlwbHkoZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBwc2dlb21ldHJ5LkxpbmUzRCh0aGlzLmN1cnJlbnRDYW1lcmFQb3MsIGZvcndhcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYWRlclByb2dyYW1XZWJHTCB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpc0luaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2ZXJ0ZXhTaGFkZXI6IFdlYkdMU2hhZGVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZnJhZ21lbnRTaGFkZXI6IFdlYkdMU2hhZGVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgcHJvZ3JhbTogV2ViR0xQcm9ncmFtO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFByb2dyYW0oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2dyYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCwgc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQgJiYgdGhpcy5iZWdpblJlbmRlcihjb250ZXh0LCBzaGFkZXJJbnN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RhZ2UuYXBwbHlTdGF0ZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxSZW5kZXIoY29udGV4dCwgc2hhZGVySW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRSZW5kZXIoY29udGV4dCwgc2hhZGVySW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2U6IFN0YWdlV2ViR0wsIGF0dHJpYk5hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGFnZS5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIGF0dHJpYk5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJlZ2luUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCwgc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuU3RhZ2UuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBTSVpFX09GX0ZMT0FUID0gNDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCwgc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZW5kUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCwgc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW5pdGlhbGl6ZShzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IHN0YWdlLlRvb2xzLmNyZWF0ZVNoYWRlcihzdGFnZS5nbC5WRVJURVhfU0hBREVSLCB0aGlzLmdldFZlcnRleFNoYWRlclNyYygpKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFnbWVudFNoYWRlciA9IHN0YWdlLlRvb2xzLmNyZWF0ZVNoYWRlcihzdGFnZS5nbC5GUkFHTUVOVF9TSEFERVIsIHRoaXMuZ2V0RnJhZ21lbnRTaGFkZXJTcmMoKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByb2dyYW0gPSBzdGFnZS5nbC5jcmVhdGVQcm9ncmFtKCk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMuZnJhZ21lbnRTaGFkZXIpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKTtcclxuXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmRldGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMudmVydGV4U2hhZGVyKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuZGV0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5mcmFnbWVudFNoYWRlcik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGFnZS5nbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLnByb2dyYW0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VmVydGV4U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRGcmFnbWVudFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgT3BhcXVlTWVzaFNoYWRlclByb2dyYW1XZWJHTCBleHRlbmRzIFNoYWRlclByb2dyYW1XZWJHTCB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBnZXRTdHJpZGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlNJWkVfT0ZfRkxPQVQgKiA5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCwgc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFnZSA9IGNvbnRleHQuU3RhZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgYnVmZmVyS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdJbmRleEJ1ZmZlcicpO1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZmVyQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldEJ1ZmZlckFzc2V0KGJ1ZmZlcktleSk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kKHN0YWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXJLZXkgPSBzaGFkZXJJbnN0YW5jZS5nZXRSZWZlcmVuY2UoJ1ZlcnRleEJ1ZmZlcicpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldEJ1ZmZlckFzc2V0KGJ1ZmZlcktleSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYVBvc2l0aW9uJyksIDMsIHRoaXMuZ2V0U3RyaWRlKCksIDApO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYU5vcm1hbCcpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCAzICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FDb2xvcicpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCA2ICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkcmF3IHRyaWFuZ2xlc1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyaWFuZ2xlQ291bnQgPSBidWZmZXJBc3NldC5CdWZmZXJTaXplIC8gdGhpcy5nZXRTdHJpZGUoKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmRyYXdFbGVtZW50cyhzdGFnZS5nbC5UUklBTkdMRVMsIHRyaWFuZ2xlQ291bnQsIHN0YWdlLmdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYmluZCB3aXRoIDAsIHNvLCBzd2l0Y2ggYmFjayB0byBub3JtYWwgcG9pbnRlciBvcGVyYXRpb25cclxuICAgICAgICAgICAgICAgIC8vc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgMCk7XHJcbiAgICAgICAgICAgICAgICAvL3N0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuQVJSQVlfQlVGRkVSLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRWZXJ0ZXhTaGFkZXJTcmMoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGB1bmlmb3JtIG1hdDQgdU1NYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVZNYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVBNYXRyaXg7XHJcblxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYVBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYU5vcm1hbDtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFDb2xvcjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjNCB2Q29sb3I7XHJcblxyXG4gICAgICAgICAgICAgICAgdm9pZCBtYWluKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gdVBNYXRyaXggKiB1Vk1hdHJpeCAqIHVNTWF0cml4ICogdmVjNChhUG9zaXRpb24sIDEuMCk7XHJcbiAgICAgICAgICAgICAgICAgICB2ZWMzIG5vcm1hbCA9IGFOb3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICB2ZWM0IGRpZmZ1c2VDb2xvciA9IHZlYzQoYUNvbG9yLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBhbWJpZW50Q29sb3IgPSB2ZWM0KDEuMCwgMS4wLCAxLjAsIDEuMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBsaWdodERpciA9IHZlYzMoMC45LCAwLjcsIDEuMCk7XHJcbiAgICAgICAgICAgICAgICAgICBtZWRpdW1wIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gY2xhbXAoZG90KG5vcm1hbGl6ZShub3JtYWwpLCBub3JtYWxpemUobGlnaHREaXIpKSwgMC4wLCAxLjApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHZDb2xvciA9IHZlYzQoKGFDb2xvciAqIDAuNjUgKyBhbWJpZW50Q29sb3IucmdiICogMC4zNSkqKDAuNyArIGxpZ2h0SW50ZW5zaXR5ICogMC4zKSwgMS4wKTtcclxuICAgICAgICAgICAgICAgIH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEZyYWdtZW50U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdmFyeWluZyBtZWRpdW1wIHZlYzQgdkNvbG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUcmFuc3BhcmVudE1lc2hTaGFkZXJQcm9ncmFtV2ViR0wgZXh0ZW5kcyBTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0U3RyaWRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TSVpFX09GX0ZMT0FUICogMTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxSZW5kZXIoY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMLCBzaGFkZXJJbnN0YW5jZTogU2hhZGVySW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgbGV0IHN0YWdlID0gY29udGV4dC5TdGFnZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBidWZmZXJLZXkgPSBzaGFkZXJJbnN0YW5jZS5nZXRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJyk7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJLZXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmZXJBc3NldCA9IHN0YWdlLkFzc2V0U3RvcmUuZ2V0QnVmZmVyQXNzZXQoYnVmZmVyS2V5KTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmQoc3RhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlcktleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnVmVydGV4QnVmZmVyJyk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldCA9IHN0YWdlLkFzc2V0U3RvcmUuZ2V0QnVmZmVyQXNzZXQoYnVmZmVyS2V5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhUG9zaXRpb24nKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgMCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhTm9ybWFsJyksIDMsIHRoaXMuZ2V0U3RyaWRlKCksIDMgKiB0aGlzLlNJWkVfT0ZfRkxPQVQpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYUNvbG9yJyksIDQsIHRoaXMuZ2V0U3RyaWRlKCksIDYgKiB0aGlzLlNJWkVfT0ZfRkxPQVQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmVuYWJsZShzdGFnZS5nbC5CTEVORCk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5ibGVuZEZ1bmMoc3RhZ2UuZ2wuU1JDX0FMUEhBLCBzdGFnZS5nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmRlcHRoTWFzayhmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZHJhdyB0cmlhbmdsZXNcclxuICAgICAgICAgICAgICAgIGxldCB0cmlhbmdsZUNvdW50ID0gYnVmZmVyQXNzZXQuQnVmZmVyU2l6ZSAvIHRoaXMuZ2V0U3RyaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5kcmF3RWxlbWVudHMoc3RhZ2UuZ2wuVFJJQU5HTEVTLCB0cmlhbmdsZUNvdW50LCBzdGFnZS5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmRlcHRoTWFzayh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmRpc2FibGUoc3RhZ2UuZ2wuQkxFTkQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJpbmQgd2l0aCAwLCBzbywgc3dpdGNoIGJhY2sgdG8gbm9ybWFsIHBvaW50ZXIgb3BlcmF0aW9uXHJcbiAgICAgICAgICAgICAgICAvL3N0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIDApO1xyXG4gICAgICAgICAgICAgICAgLy9zdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VmVydGV4U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdW5pZm9ybSBtYXQ0IHVNTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVWTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVQTWF0cml4O1xyXG5cclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFOb3JtYWw7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjNCBhQ29sb3I7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyeWluZyBtZWRpdW1wIHZlYzQgdkNvbG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHVQTWF0cml4ICogdVZNYXRyaXggKiB1TU1hdHJpeCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBub3JtYWwgPSBhTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBkaWZmdXNlQ29sb3IgPSBhQ29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICB2ZWM0IGFtYmllbnRDb2xvciA9IHZlYzQoMS4wLCAxLjAsIDEuMCwgMS4wKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2ZWMzIGxpZ2h0RGlyID0gdmVjMygwLjksIDAuNywgMS4wKTtcclxuICAgICAgICAgICAgICAgICAgIG1lZGl1bXAgZmxvYXQgbGlnaHRJbnRlbnNpdHkgPSBjbGFtcChkb3Qobm9ybWFsaXplKG5vcm1hbCksIG5vcm1hbGl6ZShsaWdodERpcikpLCAwLjAsIDEuMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgdkNvbG9yID0gdmVjNCgoYUNvbG9yLnJnYiAqIDAuNjUgKyBhbWJpZW50Q29sb3IucmdiICogMC4zNSkqKDAuNyArIGxpZ2h0SW50ZW5zaXR5ICogMC4zKSwgYUNvbG9yLmEpO1xyXG4gICAgICAgICAgICAgICAgfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RnJhZ21lbnRTaGFkZXJTcmMoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGB2YXJ5aW5nIG1lZGl1bXAgdmVjNCB2Q29sb3I7XHJcblxyXG4gICAgICAgICAgICAgICAgdm9pZCBtYWluKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZDb2xvcjtcclxuICAgICAgICAgICAgICAgIH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGVudW0gVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzIHtcclxuICAgICAgICBEaWZmdXNlLFxyXG4gICAgICAgIE1hdGNhcFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtV2ViR0wgZXh0ZW5kcyBTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSB2YXJpYW50OiBUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtVmFyaWFudHMgPSBUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtVmFyaWFudHMuRGlmZnVzZSkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldFN0cmlkZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuU0laRV9PRl9GTE9BVCAqIDExO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCwgc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFnZSA9IGNvbnRleHQuU3RhZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgYnVmZmVyS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdJbmRleEJ1ZmZlcicpO1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZmVyQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldEJ1ZmZlckFzc2V0KGJ1ZmZlcktleSk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kKHN0YWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXJLZXkgPSBzaGFkZXJJbnN0YW5jZS5nZXRSZWZlcmVuY2UoJ1ZlcnRleEJ1ZmZlcicpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldEJ1ZmZlckFzc2V0KGJ1ZmZlcktleSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYVBvc2l0aW9uJyksIDMsIHRoaXMuZ2V0U3RyaWRlKCksIDApO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYU5vcm1hbCcpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCAzICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FDb2xvcicpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCA2ICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FUZXh0dXJlQ29vcmRzJyksIDIsIHRoaXMuZ2V0U3RyaWRlKCksIDkgKiB0aGlzLlNJWkVfT0ZfRkxPQVQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0dXJlS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdUZXh0dXJlQnVmZmVyJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dHVyZUFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRUZXh0dXJlQXNzZXQodGV4dHVyZUtleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dHVyZUFzc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHVyZUFzc2V0LmJpbmQoc3RhZ2UsIHRoaXMsICd1VGV4dHVyZTAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZHJhdyB0cmlhbmdsZXNcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHJpYW5nbGVDb3VudCA9IGJ1ZmZlckFzc2V0LkJ1ZmZlclNpemUgLyB0aGlzLmdldFN0cmlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLmdsLmRyYXdFbGVtZW50cyhzdGFnZS5nbC5UUklBTkdMRVMsIHRyaWFuZ2xlQ291bnQsIHN0YWdlLmdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYmluZCB3aXRoIDAsIHNvLCBzd2l0Y2ggYmFjayB0byBub3JtYWwgcG9pbnRlciBvcGVyYXRpb25cclxuICAgICAgICAgICAgICAgIC8vc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgMCk7XHJcbiAgICAgICAgICAgICAgICAvL3N0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuQVJSQVlfQlVGRkVSLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFZlcnRleFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYHVuaWZvcm0gbWF0NCB1TU1hdHJpeDtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm0gbWF0NCB1Vk1hdHJpeDtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm0gbWF0NCB1UE1hdHJpeDtcclxuXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYUNvbG9yO1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZHM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyeWluZyBtZWRpdW1wIHZlYzQgdkNvbG9yO1xyXG4gICAgICAgICAgICAgICAgdmFyeWluZyBtZWRpdW1wIHZlYzIgdlRleHR1cmVDb29yZHM7XHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgZmxvYXQgdkxpZ2h0SW50ZW5zaXR5O1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICB2ZWM0IHBvcyA9IHVNTWF0cml4ICogdmVjNChhUG9zaXRpb24sIDEuMCk7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHVQTWF0cml4ICogdVZNYXRyaXggKiBwb3M7XHJcbiAgICAgICAgICAgICAgICAgICB2ZWMzIG5vcm1hbCA9IG5vcm1hbGl6ZSh1TU1hdHJpeCAqIHZlYzQoYU5vcm1hbCwgMC4wKSkueHl6O1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHZlYzMgbGlnaHREaXIgPSB2ZWMzKDAuOSwgMC43LCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgdkxpZ2h0SW50ZW5zaXR5ID0gY2xhbXAoZG90KG5vcm1hbGl6ZShub3JtYWwpLCBub3JtYWxpemUobGlnaHREaXIpKSwgMC4wLCAxLjApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHZDb2xvciA9IHZlYzQoYUNvbG9yLCAxLjApO1xyXG5gO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZhcmlhbnQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzLkRpZmZ1c2U6IHJlc3VsdCArPVxyXG4gICAgICAgICAgICAgICAgICAgIGB2VGV4dHVyZUNvb3JkcyA9IGFUZXh0dXJlQ29vcmRzO1xyXG5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtVmFyaWFudHMuTWF0Y2FwOiByZXN1bHQgKz1cclxuICAgICAgICAgICAgICAgICAgICBgdmVjMyBlID0gbm9ybWFsaXplKHBvcy54eXopO1xyXG5cdCAgICAgICAgICAgICAgICAgdmVjMyByID0gcmVmbGVjdChlLCAodVZNYXRyaXggKiB2ZWM0KG5vcm1hbCwgMC4wKSkueHl6KTtcclxuXHQgICAgICAgICAgICAgICAgIG1lZGl1bXAgZmxvYXQgbSA9IDIuICogbGVuZ3RoKHZlYzMoci54LCByLnksIHIueiArIDEuKSk7XHJcblx0ICAgICAgICAgICAgICAgICB2VGV4dHVyZUNvb3JkcyA9IHIueHkgLyBtICsgLjU7XHJcbmA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBgfWA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEZyYWdtZW50U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBgdW5pZm9ybSBzYW1wbGVyMkQgdVRleHR1cmUwO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWM0IHZDb2xvcjtcclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWMyIHZUZXh0dXJlQ29vcmRzO1xyXG4gICAgICAgICAgICAgICAgdmFyeWluZyBtZWRpdW1wIGZsb2F0IHZMaWdodEludGVuc2l0eTtcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICBcdCAgICBtZWRpdW1wIHZlYzQgdGV4Q29sb3IgPSB0ZXh0dXJlMkQodVRleHR1cmUwLCB2ZWMyKHZUZXh0dXJlQ29vcmRzLngsIDEuMCAtIHZUZXh0dXJlQ29vcmRzLnkpKTtcclxuYDtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnZhcmlhbnQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzLkRpZmZ1c2U6IHJlc3VsdCArPVxyXG4gICAgICAgICAgICAgICAgICAgIGBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNsYW1wKHRleENvbG9yLnh5eiAqICgxLjAgKyAuMTUgKiB2TGlnaHRJbnRlbnNpdHkpLCAwLjAsIDEuMCksIHRleENvbG9yLmEpOyBcclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzLk1hdGNhcDogcmVzdWx0ICs9IFxyXG4gICAgICAgICAgICAgICAgICAgIGBnbF9GcmFnQ29sb3IgPSB0ZXhDb2xvci5hOyAgIFxyXG5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQgKz0gYH1gO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYWRvd1RleHR1cmVkTWVzaFNoYWRlclByb2dyYW1XZWJHTCBleHRlbmRzIFRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1XZWJHTCB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRWZXJ0ZXhTaGFkZXJTcmMoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGB1bmlmb3JtIG1hdDQgdU1NYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVZNYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVBNYXRyaXg7XHJcblxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYVBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYU5vcm1hbDtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFDb2xvcjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCBmbG9hdCBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdm9pZCBtYWluKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gdVBNYXRyaXggKiB1Vk1hdHJpeCAqIHVNTWF0cml4ICogdmVjNChhUG9zaXRpb24sIDEuMCk7XHJcbiAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAodU1NYXRyaXggKiB2ZWM0KGFQb3NpdGlvbiwgMS4wKSkueTtcclxuICAgICAgICAgICAgICAgIH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEZyYWdtZW50U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdW5pZm9ybSBzYW1wbGVyMkQgdVRleHR1cmUwO1xyXG4gICAgICAgICAgICAgICAgdmFyeWluZyBtZWRpdW1wIGZsb2F0IGhlaWdodDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdm9pZCBtYWluKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KC4yLCAuMiwgLjIsIGNsYW1wKDEuMCAtIChoZWlnaHQgLyAzLjApLCAwLjAsIDEuMCkpOyBcclxuICAgICAgICAgICAgICAgIH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdENhcFNoYWRlclByb2dyYW1XZWJHTCBleHRlbmRzIFNoYWRlclByb2dyYW1XZWJHTCB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBnZXRTdHJpZGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlNJWkVfT0ZfRkxPQVQgKiAxMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBsZXQgc3RhZ2UgPSBjb250ZXh0LlN0YWdlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1ZmZlcktleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnSW5kZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcktleSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZChzdGFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FQb3NpdGlvbicpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCAwKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FOb3JtYWwnKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgMyAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhQ29sb3InKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgNiAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhVGV4dHVyZUNvb3JkcycpLCAyLCB0aGlzLmdldFN0cmlkZSgpLCA5ICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dHVyZUtleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnVGV4dHVyZUJ1ZmZlcicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHR1cmVBc3NldCA9IHN0YWdlLkFzc2V0U3RvcmUuZ2V0VGV4dHVyZUFzc2V0KHRleHR1cmVLZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHR1cmVBc3NldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmVBc3NldC5iaW5kKHN0YWdlLCB0aGlzLCAndVRleHR1cmUwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IGNvbnRleHQuU3RhdGUuZ2V0KCdDb2xvcicsIHBzZ2VvbWV0cnkuVmVjNC5PbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1Q29sb3JMb2MgPSBzdGFnZS5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCAndUNvbG9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhZ2UuZ2wudW5pZm9ybTRmdih1Q29sb3JMb2MsIGNvbG9yLmVsZW1lbnRzKCkpOyBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZHJhdyB0cmlhbmdsZXNcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHJpYW5nbGVDb3VudCA9IGJ1ZmZlckFzc2V0LkJ1ZmZlclNpemUgLyB0aGlzLmdldFN0cmlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLmdsLmRyYXdFbGVtZW50cyhzdGFnZS5nbC5UUklBTkdMRVMsIHRyaWFuZ2xlQ291bnQsIHN0YWdlLmdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRWZXJ0ZXhTaGFkZXJTcmMoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGB1bmlmb3JtIG1hdDQgdU1NYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVZNYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVBNYXRyaXg7XHJcblxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYVBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYU5vcm1hbDtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFDb2xvcjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWM0IHZDb2xvcjtcclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWMyIHZUZXh0dXJlQ29vcmRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICB2ZWM0IHBvcyA9IHVNTWF0cml4ICogdmVjNChhUG9zaXRpb24sIDEuMCk7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHVQTWF0cml4ICogdVZNYXRyaXggKiBwb3M7XHJcbiAgICAgICAgICAgICAgICAgICB2ZWMzIG5vcm1hbCA9IG5vcm1hbGl6ZSh1TU1hdHJpeCAqIHZlYzQoYU5vcm1hbCwgMC4wKSkueHl6O1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHZlYzMgZSA9IG5vcm1hbGl6ZShwb3MueHl6KTtcclxuXHQgICAgICAgICAgICAgICB2ZWMzIHIgPSByZWZsZWN0KGUsICh1Vk1hdHJpeCAqIHZlYzQobm9ybWFsLCAwLjApKS54eXopO1xyXG5cdCAgICAgICAgICAgICAgIG1lZGl1bXAgZmxvYXQgbSA9IDIuICogbGVuZ3RoKHZlYzMoci54LCByLnksIHIueiArIDEuKSk7XHJcblx0ICAgICAgICAgICAgICAgdlRleHR1cmVDb29yZHMgPSByLnh5IC8gbSArIC41O1xyXG4gICAgICAgICAgICAgICAgfWA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEZyYWdtZW50U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBgdW5pZm9ybSBzYW1wbGVyMkQgdVRleHR1cmUwO1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtZWRpdW1wIHZlYzQgdUNvbG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWM0IHZDb2xvcjtcclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWMyIHZUZXh0dXJlQ29vcmRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFx0ICAgIG1lZGl1bXAgdmVjNCB0ZXhDb2xvciA9IHRleHR1cmUyRCh1VGV4dHVyZTAsIHZlYzIodlRleHR1cmVDb29yZHMueCwgMS4wIC0gdlRleHR1cmVDb29yZHMueSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVkaXVtcCB2ZWMzIGdyZWVuID0gdmVjMygwLCAwLjQ0LCAwLjA5KTtcclxuICAgICAgICAgICAgICAgICAgICAvL21lZGl1bXAgdmVjMyBncmVlbiA9IHZlYzMoMC42OSwgMC4zNCwgMC4wMCk7ICAvL29yXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZWRpdW1wIHZlYzMgZ3JlZW4gPSB2ZWMzKDAuMDIsIDAuMzEsIDAuMDYpOyAgLy8gZ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVkaXVtcCB2ZWMzIGdyZWVuID0gdmVjMygwLjMxLCAwLjAyLCAwLjA2KTsgIC8vIHJcclxuICAgICAgICAgICAgICAgICAgICAvL21lZGl1bXAgdmVjMyBncmVlbiA9IHZlYzMoMC4wMiwgMC4xNywgMC4zMSk7ICAvLyBiXHJcbiAgICAgICAgICAgICAgICAgICAgbWVkaXVtcCBmbG9hdCBjb2xvckZhYyA9ICh0ZXhDb2xvci54IC0gdGV4Q29sb3IueSkgLyAwLjY1O1xyXG4gICAgICAgICAgICAgICAgICAgIG1lZGl1bXAgZmxvYXQgd2hpdGVGYWMgPSAoMS4wIC0gY29sb3JGYWMpICogMC43NTtcclxuICAgICAgICAgICAgICAgICAgICBtZWRpdW1wIHZlYzMgY29sb3IgPSB2ZWMzKHdoaXRlRmFjLCB3aGl0ZUZhYywgd2hpdGVGYWMpICsgY29sb3JGYWMgKiB1Q29sb3IucmdiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCB0ZXhDb2xvci5hICogdUNvbG9yLmEpOyAgIFxyXG4gICAgICAgICAgICB9YDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFJlbmRlclN0YXRlU3RhY2sge1xyXG4gICAgICAgIHByaXZhdGUgbW9kZWxUcmFuc2Zvcm06IEFycmF5PHBzZ2VvbWV0cnkuTWF0cml4ND4gPSBbcHNnZW9tZXRyeS5NYXRyaXg0LklkZW50aXR5XTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGFjazogQXJyYXk8UmVuZGVyU3RhdGU+ID0gW107XHJcblxyXG4gICAgICAgIC8qKiBUb3Agb2YgdGhlIHN0YXRlIHN0YWNrLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0IFRvcCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZXRlcm1pbmVzIHRoZSBjdXJyZW50IG1vZGVsIHRyYW5zZm9ybWF0aW9uLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1cnJlbnRNb2RlbFRyYW5zZm9ybSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxUcmFuc2Zvcm1bdGhpcy5tb2RlbFRyYW5zZm9ybS5sZW5ndGggLSAxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBQdXNoZXMgdGhlIHNwZWNpZmllZCBzdGF0ZSBvbiB0aGUgc3RhdGUgc3RhY2suXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBwdXNoU3RhdGUoc3RhdGU6IFJlbmRlclN0YXRlKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLlBhcmVudCA9IHRoaXMuc3RhY2subGVuZ3RoID09IDAgPyBudWxsIDogdGhpcy5Ub3A7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChzdGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5jb250YWlucygnTW9kZWxUcmFuc2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vZGVsVHJhbnNmb3JtID0gc3RhdGUuZ2V0KCdNb2RlbFRyYW5zZm9ybScsIHBzZ2VvbWV0cnkuTWF0cml4NC5JZGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsVHJhbnNmb3JtLnB1c2goPHBzZ2VvbWV0cnkuTWF0cml4ND50aGlzLkN1cnJlbnRNb2RlbFRyYW5zZm9ybS5tdWx0aXBseShtb2RlbFRyYW5zZm9ybSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFRyYW5zZm9ybS5wdXNoKHRoaXMuQ3VycmVudE1vZGVsVHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFJlbW92ZXMgdGhlIHRvcCBlbGVtZW50IGZyb20gdGhlIHN0YXRlIHN0YWNrLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcG9wU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9wLlBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxUcmFuc2Zvcm0ucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBIFJlbmRlckNvbnRleHQgaW5zdGFuY2UgaXMgdXNlZCB0byBwYXNzIGVudmlyb25tZW50IGRhdGEgdG8gU2NlbmVJdGVtcyBkdXJpbmcgdGhlIHJlbmRpdGlvbiBwcm9jZXNzLlxyXG5cdCAgKlxyXG5cdCAgKiBCZXNpZGVzIHRoZSBTdGFnZSB0aGF0IHRoZSBTY2VuZUl0ZW1zIGFyZSBiZWluZyByZW5kZXJlZCB0bywgdGhlIHJlbmRlciBjb250ZXh0IGlzIHRoZSBvd25lciBvZiBhIHN0YXRlIHN0YWNrXHJcblx0ICAqIHRoYXQgbWF5IGJlIHVwZGF0ZWQgYnkgU2NlbmVJdGVtcyBhbmQgdGhhdCBpcyBjb25zZXF1ZW50bHkgdXNlZCBieSBTaGFkZXJQcm9ncmFtcyB0byBzZXQgc2hhZGVyIGRhdGEgYW5kIHJlc291cmNlcyAobGlrZSBtb2RlbCB0cmFuc2Zvcm1hdGlvblxyXG5cdCAgKiBhbmQgYXV4aWxpYXJ5IGRhdGEpLiBBcyBTY2VuZUl0ZW1zIGFyZSBvcmdhbml6ZWQgaW4gYSBoaWVyYXJjaGljYWwgd2F5LCB0aGUgY3VycmVudCBzdGF0ZSBtYXkgYmUgZGVmaW5lZCBieSB0aGUgY3VycmVudCBTY2VuZUl0ZW0sIGJ1dFxyXG5cdCAgKiBhbHNvIGJ5IHByZXZpb3VzbHkgdHJhdmVyc2VkIFNjZW5lSXRlbXMgaW4gdGhlIHNjZW5lIGhpZXJhcmNoeS5cclxuXHQgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUmVuZGVyQ29udGV4dFdlYkdMIHtcclxuICAgICAgICBwcml2YXRlIHN0YWdlOiBTdGFnZVdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNhbWVyYTogQ2FtZXJhO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNoYWRlclByb2dyYW06IFNoYWRlclByb2dyYW1XZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzY2VuZUNhdGVnb3J5OiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0ZVN0YWNrOiBSZW5kZXJTdGF0ZVN0YWNrID0gbmV3IFJlbmRlclN0YXRlU3RhY2soKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbFRyYW5zZm9ybTogcHNnZW9tZXRyeS5NYXRyaXg0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBub2RlVHJhbnNmb3JtOiBwc2dlb21ldHJ5Lk1hdHJpeDQgPSBudWxsO1xyXG5cclxuICAgICAgICBwcml2YXRlIHBoYXNlOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBQaGFzZSgpIHsgcmV0dXJuIHRoaXMucGhhc2U7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBQaGFzZSh2YWx1ZTogc3RyaW5nKSB7IHRoaXMucGhhc2UgPSB2YWx1ZTsgfVxyXG5cclxuICAgICAgICAvKiogUmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZSB0aGF0IGlzIGNvbXBvc2VkIG9mIHByZXZpb3VzbHkgc2V0IHN0YXRlIHZhbHVlcy5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldCBTdGF0ZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVTdGFjay5Ub3A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUHVzaGVzIHRoZSBzcGVjaWZpZWQgc3RhdGUgb24gdGhlIHN0YXRlIHN0YWNrLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcHVzaFN0YXRlKHN0YXRlOiBSZW5kZXJTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3RhY2sucHVzaFN0YXRlKHN0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBSZW1vdmVzIHRoZSB0b3AgZWxlbWVudCBmcm9tIHRoZSBzdGF0ZSBzdGFjay5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHBvcFN0YXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3RhY2sucG9wU3RhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTW9kZWxUcmFuc2Zvcm0oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlU3RhY2suQ3VycmVudE1vZGVsVHJhbnNmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFRoZSBjdXJyZW50IHNjZW5lJ3MgY2F0ZWdvcnkuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXQgU2NlbmVDYXRlZ29yeSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVDYXRlZ29yeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBUaGUgY3VycmVudCBzY2VuZSdzIGNhdGVnb3J5LlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2V0IFNjZW5lQ2F0ZWdvcnkodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lQ2F0ZWdvcnkgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBUaGUgc3RhZ2UgdGhlIFNjZW5lSXRlbXMgYXJlIGJlaW5nIHJlbmRlcmVkIHRvLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0IFN0YWdlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBUaGUgc3RhZ2UgdGhlIFNjZW5lSXRlbXMgYXJlIGJlaW5nIHJlbmRlcmVkIHRvLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2V0IFN0YWdlKHZhbHVlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2FtZXJhKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW1lcmE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IENhbWVyYSh2YWx1ZTogQ2FtZXJhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGhlIGN1cnJlbnQgc2hhZGVyIHByb2dyYW0uXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXQgU2hhZGVyUHJvZ3JhbSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhZGVyUHJvZ3JhbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBUaGUgY3VycmVudCBzaGFkZXIgcHJvZ3JhbS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNldCBTaGFkZXJQcm9ncmFtKHZhbHVlOiBTaGFkZXJQcm9ncmFtV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE5vZGVUcmFuc2Zvcm0oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVUcmFuc2Zvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IE5vZGVUcmFuc2Zvcm0odmFsdWU6IHBzZ2VvbWV0cnkuTWF0cml4NCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVUcmFuc2Zvcm0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0YWdlV2ViR0wge1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG5cclxuICAgICAgICBwcml2YXRlIGNhbWVyYTogQ2FtZXJhV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZG93Q2FtZXJhOiBTaGFkb3dDYW1lcmFXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYXNzZXRGYWN0b3J5OiBBc3NldEZhY3RvcnlXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhc3NldFN0b3JlOiBBc3NldFN0b3JlV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcGhhc2VTcGVjaWZpY1NoYWRlclByb2dyYW1zOiB7IFtpbmRleDogc3RyaW5nXTogeyBbaW5kZXg6IHN0cmluZ106IFNoYWRlclByb2dyYW1XZWJHTCB9IH0gPSB7fTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFkZXJQcm9ncmFtczogeyBbaW5kZXg6IHN0cmluZ106IFNoYWRlclByb2dyYW1XZWJHTCB9ID0ge307XHJcblxyXG4gICAgICAgIHByaXZhdGUgdG9vbHM6IFRvb2xzV2ViR0wgPSBuZXcgVG9vbHNXZWJHTCh0aGlzKTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBDYW52YXMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2FtZXJhKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW1lcmE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFRvb2xzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b29scztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQXNzZXRGYWN0b3J5KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hc3NldEZhY3Rvcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEFzc2V0U3RvcmUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzc2V0U3RvcmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihjYW52YXNFbGVtZW50SWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IFJlbmRlckNvbnRleHRXZWJHTCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LlN0YWdlID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2V0U3RvcmUgPSBuZXcgQXNzZXRTdG9yZVdlYkdMKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2V0RmFjdG9yeSA9IG5ldyBBc3NldEZhY3RvcnlXZWJHTCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNFbGVtZW50SWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2wgPSA8V2ViR0xSZW5kZXJpbmdDb250ZXh0Pih0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8ICh0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBleHQgPSB0aGlzLmdsLmdldEV4dGVuc2lvbignT0VTX2VsZW1lbnRfaW5kZXhfdWludCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5nbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gaW5pdGlhbGl6ZSBXZWJHTC4gWW91ciBicm93c2VyIG1heSBub3Qgc3VwcG9ydCBpdC4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1VuYWJsZSB0byBpbml0aWFsaXplIFdlYkdMLiBZb3VyIGJyb3dzZXIgbWF5IG5vdCBzdXBwb3J0IGl0LiBFcnJvcjogJyArIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dDYW1lcmEgPSBuZXcgU2hhZG93Q2FtZXJhV2ViR0woKTtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dDYW1lcmEucmVzaXplKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmFXZWJHTCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5yZXNpemUodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlU2hhZG93QXJlYShib3g6IHBzZ2VvbWV0cnkuQUFCQjJEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Q2FtZXJhLnVwZGF0ZVNoYWRvd0FyZWEoYm94KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhcHBseVN0YXRlKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3JhbSA9IGNvbnRleHQuU2hhZGVyUHJvZ3JhbS5Qcm9ncmFtO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc3VsdGluZ01vZGVsVHJhbnNmb3JtYXRpb24gPSBwc2dlb21ldHJ5Lk1hdHJpeDQuSWRlbnRpdHk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lk1vZGVsVHJhbnNmb3JtICYmIGNvbnRleHQuTm9kZVRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0aW5nTW9kZWxUcmFuc2Zvcm1hdGlvbiA9IDxwc2dlb21ldHJ5Lk1hdHJpeDQ+Y29udGV4dC5Ob2RlVHJhbnNmb3JtLm11bHRpcGx5KGNvbnRleHQuTW9kZWxUcmFuc2Zvcm0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQuTW9kZWxUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdGluZ01vZGVsVHJhbnNmb3JtYXRpb24gPSBjb250ZXh0Lk1vZGVsVHJhbnNmb3JtO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQuTm9kZVRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0aW5nTW9kZWxUcmFuc2Zvcm1hdGlvbiA9IGNvbnRleHQuTm9kZVRyYW5zZm9ybTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG1NYXRyaXhMb2MgPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndU1NYXRyaXgnKTtcclxuICAgICAgICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KG1NYXRyaXhMb2MsIGZhbHNlLCByZXN1bHRpbmdNb2RlbFRyYW5zZm9ybWF0aW9uLnRyYW5zcG9zZSgpLmVsZW1lbnRzKTtcclxuICAgICAgICAgICAgbGV0IHZNYXRyaXhMb2MgPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndVZNYXRyaXgnKTtcclxuICAgICAgICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHZNYXRyaXhMb2MsIGZhbHNlLCBjb250ZXh0LkNhbWVyYS5WaWV3TWF0cml4LnRyYW5zcG9zZSgpLmVsZW1lbnRzKTtcclxuICAgICAgICAgICAgbGV0IHBNYXRyaXhMb2MgPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndVBNYXRyaXgnKTtcclxuICAgICAgICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHBNYXRyaXhMb2MsIGZhbHNlLCBjb250ZXh0LkNhbWVyYS5Qcm9qZWN0aW9uTWF0cml4LnRyYW5zcG9zZSgpLmVsZW1lbnRzKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVuZGVyKHNjZW5lOiBTY2VuZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGlmIChzY2VuZS5pc0RpcnR5KCkgfHwgdGhpcy5jYW1lcmEuaXNEaXJ0eSgpIHx8IHRoaXMuc2hhZG93Q2FtZXJhLmlzRGlydHkoKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5QaGFzZSA9ICdTaGFkb3cnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LkNhbWVyYSA9IHRoaXMuc2hhZG93Q2FtZXJhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFkb3dDYW1lcmEuYmVnaW5SZW5kZXIodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBzY2VuZS5yZW5kZXIodGhpcy5jb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93Q2FtZXJhLmVuZFJlbmRlcih0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuUGhhc2UgPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5DYW1lcmEgPSB0aGlzLmNhbWVyYTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhLmJlZ2luUmVuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgc2NlbmUucmVuZGVyKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS5lbmRSZW5kZXIodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWdpc3RlclNoYWRlclByb2dyYW0oc2hhZGVyUHJvZ3JhbUtleTogc3RyaW5nLCBzaGFkZXJQcm9ncmFtOiBTaGFkZXJQcm9ncmFtV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFkZXJQcm9ncmFtc1tzaGFkZXJQcm9ncmFtS2V5XSA9IHNoYWRlclByb2dyYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXJQaGFzZVNwZWNpZmljU2hhZGVyUHJvZ3JhbShwaGFzZUtleTogc3RyaW5nLCBzaGFkZXJQcm9ncmFtS2V5OiBzdHJpbmcsIHNoYWRlclByb2dyYW06IFNoYWRlclByb2dyYW1XZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgcGhhc2UgPSB0aGlzLnBoYXNlU3BlY2lmaWNTaGFkZXJQcm9ncmFtc1twaGFzZUtleV07XHJcbiAgICAgICAgICAgIGlmICghcGhhc2UpIHtcclxuICAgICAgICAgICAgICAgIHBoYXNlID0ge307XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBoYXNlU3BlY2lmaWNTaGFkZXJQcm9ncmFtc1twaGFzZUtleV0gPSBwaGFzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGhhc2Vbc2hhZGVyUHJvZ3JhbUtleV0gPSBzaGFkZXJQcm9ncmFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFNoYWRlclByb2dyYW0oY29udGV4dCwgc2hhZGVyUHJvZ3JhbUtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5waGFzZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBoYXNlID0gdGhpcy5waGFzZVNwZWNpZmljU2hhZGVyUHJvZ3JhbXNbY29udGV4dC5waGFzZV07XHJcbiAgICAgICAgICAgICAgICBpZiAocGhhc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwaGFzZVtzaGFkZXJQcm9ncmFtS2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgfHwgdGhpcy5zaGFkZXJQcm9ncmFtc1tzaGFkZXJQcm9ncmFtS2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVzaXplKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5yZXNpemUodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZW51bSBDb25uZWN0aW9uU3RhdGUge1xyXG4gICAgICAgIFJlYWR5LFxyXG4gICAgICAgIENvbm5lY3RpbmcsXHJcbiAgICAgICAgQ29ubmVjdGVkLFxyXG4gICAgICAgIEVycm9yXHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTZXJ2ZXJDb25uZWN0aW9uIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHN0YXRlOiBDb25uZWN0aW9uU3RhdGU7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBoYW5kbGVDb25uZWN0ZWQ6IChldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBoYW5kbGVNZXNzYWdlOiAoRXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBJc0Nvbm5lY3RlZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5SZWFkeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBjb25uZWN0KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBkaXNjb25uZWN0KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzZW5kKGRhdGE6IGFueSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbk1lc3NhZ2UoY2FsbGJhY2s6IChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTWVzc2FnZSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29ubmVjdGVkKGNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29ubmVjdGVkID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2lnbmFsUlNlcnZlckNvbm5lY3Rpb24gZXh0ZW5kcyBTZXJ2ZXJDb25uZWN0aW9uIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBIdWJDb25uZWN0aW9uO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgSHViQ29ubmVjdGlvbkJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAgICAgLndpdGhVcmwoJy9hcGkvc3RhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmNvbmZpZ3VyZUxvZ2dpbmcoTG9nTGV2ZWwuVHJhY2UpXHJcbiAgICAgICAgICAgICAgICAvLy53aXRoSHViUHJvdG9jb2woPGFueT4obmV3IE1lc3NhZ2VQYWNrSHViUHJvdG9jb2woKSkpXHJcbiAgICAgICAgICAgICAgICAuYnVpbGQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbignbXNnJywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZU1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbXNnID0gbmV3IE1lc3NhZ2VFdmVudCgnYmluYXJ5JywgeyBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTWVzc2FnZShtc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25uZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3Rpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNvbm5lY3RlZChuZXcgRXZlbnQoJ2Nvbm5lY3RlZCcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5FcnJvcjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zdG9wKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29ubmVjdGlvblN0YXRlLlJlYWR5O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5FcnJvcjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNlbmQoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5pbnZva2UoJ01zZycsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFdlYlNvY2tldFNlcnZlckNvbm5lY3Rpb24gZXh0ZW5kcyBTZXJ2ZXJDb25uZWN0aW9uIHtcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHdlYnNvY2tldDogV2ViU29ja2V0O1xyXG5cclxuICAgICAgICBwdWJsaWMgY29ubmVjdCh1cmw/OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gQ29ubmVjdGlvblN0YXRlLlJlYWR5IHx8IHRoaXMuc3RhdGUgPT0gQ29ubmVjdGlvblN0YXRlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJpID0gdXJsID8gdXJsIDogJ3dzOi8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgJy9hcGkvc2NlbmUnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVyaSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYnNvY2tldC5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vic29ja2V0Lm9ub3BlbiA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2Vic29ja2V0IGNvbm5lY3RlZC4nKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZUNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNvbm5lY3RlZChldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vic29ja2V0Lm9uY2xvc2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2Vic29ja2V0IGNsb3NlZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29ubmVjdGlvblN0YXRlLlJlYWR5O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vic29ja2V0Lm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3ZWJzb2NrZXQgZXJyb3IuJylcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTWVzc2FnZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2VuZChkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQuc2VuZChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRvb2wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJmYWNlQ29udHJvbGxlcjogSW50ZXJmYWNlQ29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcHVibGljIGVudGVyKGludGVyZmFjZUNvbnRyb2xsZXI6IEludGVyZmFjZUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyID0gaW50ZXJmYWNlQ29udHJvbGxlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBsZWF2ZSgpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlS2V5VXAoZTogSlF1ZXJ5LkV2ZW50KTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VNb3ZlKGU6IEpRdWVyeS5FdmVudCwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VEb3duKGU6IEpRdWVyeS5FdmVudCkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZVVwKGU6IEpRdWVyeS5FdmVudCkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVEcmFnKGU6IEpRdWVyeS5FdmVudCwgc3RhcnRYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCBkWDogbnVtYmVyLCBkWTogbnVtYmVyKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlV2hlZWwoZTogSlF1ZXJ5LkV2ZW50KSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUNsaWNrKGU6IEpRdWVyeS5FdmVudCwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHsgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW50ZXJmYWNlQ29udHJvbGxlciB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdG9vbHM6IEFycmF5PFRvb2w+ID0gW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGFzVG9vbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9vbHMubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VycmVudFRvb2woKTogVG9vbCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1Rvb2woKSA/IHRoaXMudG9vbHNbdGhpcy50b29scy5sZW5ndGggLSAxXSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxlZnRCdXR0b24gPSAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIGxlZnRCdXR0b25Eb3duOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhcnRYOiBudW1iZXIgPSBOYU47XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhcnRZOiBudW1iZXIgPSBOYU47XHJcblxyXG4gICAgICAgIHByaXZhdGUgbGFzdFg6IG51bWJlciA9IE5hTjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsYXN0WTogbnVtYmVyID0gTmFOO1xyXG5cclxuICAgICAgICBwcml2YXRlIHRhcmdldDogSlF1ZXJ5O1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Nb3ZlOiAoZTogSlF1ZXJ5LkV2ZW50LCB4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gdm9pZCA9IG51bGw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkRyYWc6IChlOiBKUXVlcnkuRXZlbnQsIGRYOiBudW1iZXIsIGRZOiBudW1iZXIpID0+IHZvaWQgPSBudWxsO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Nb3VzZVdoZWVsOiAoZTogSlF1ZXJ5LkV2ZW50KSA9PiB2b2lkID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmluZEV2ZW50cyh0YXJnZXQ6IEpRdWVyeSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIEpRdWVyeSh0YXJnZXQpLm9uKCdtb3VzZXdoZWVsJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VXaGVlbChlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBKUXVlcnkodGFyZ2V0KS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZURvd24oZSk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEoPGFueT50YXJnZXQpLnNldENhcHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIEpRdWVyeShkb2N1bWVudCkub24oJ21vdXNlbW92ZSB0b3VjaG1vdmUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlKGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBKUXVlcnkodGFyZ2V0KS5vbignbW91c2Vtb3ZlIHRvdWNobW92ZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmUoZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgSlF1ZXJ5KGRvY3VtZW50KS5vbignbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlVXAoZSk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgSlF1ZXJ5KHRhcmdldCkub24oJ2xvc2VjYXB0dXJlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VVcChlKTtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBKUXVlcnkoZG9jdW1lbnQpLm9uKCdrZXl1cCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXlVcChlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZUxhc3RQb3NpdGlvbihlOiBKUXVlcnkuRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0WCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgdGhpcy5sYXN0WSA9IGUuY2xpZW50WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBwdXNoVG9vbCh0b29sOiBUb29sKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRUb29sKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRUb29sLmxlYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9vbHMucHVzaCh0b29sKTtcclxuXHJcbiAgICAgICAgICAgIHRvb2wuZW50ZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcG9wVG9vbCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudG9vbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b29sc1t0aGlzLnRvb2xzLmxlbmd0aCAtIDFdLmxlYXZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xzLnBvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvb2xzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbHNbdGhpcy50b29scy5sZW5ndGggLSAxXS5lbnRlcih0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBrZXlVcChlOiBKUXVlcnkuRXZlbnQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVG9vbCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5DdXJyZW50VG9vbC5oYW5kbGVLZXlVcChlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW91c2VEb3duKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZS5idXR0b24gPT0gdGhpcy5sZWZ0QnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRCdXR0b25Eb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRYID0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFkgPSBlLmNsaWVudFk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxhc3RQb3NpdGlvbihlKTtcclxuICAgICAgICAgICAgICAgIGlmICgoPGFueT5lLnRhcmdldCkuc2V0Q2FwdHVyZSkgKDxhbnk+ZS50YXJnZXQpLnNldENhcHR1cmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVG9vbCgpICYmICFlLmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFRvb2wuaGFuZGxlTW91c2VEb3duKGUpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3VzZU1vdmUoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Rvb2woKSAmJiAhZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWZ0QnV0dG9uRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFRvb2wuaGFuZGxlRHJhZyhlLCB0aGlzLnN0YXJ0WCwgdGhpcy5zdGFydFksIGUuY2xpZW50WCAtIHRoaXMubGFzdFgsIGUuY2xpZW50WSAtIHRoaXMubGFzdFkpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFRvb2wuaGFuZGxlTW91c2VNb3ZlKGUsIGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVmdEJ1dHRvbkRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWcoZSwgZS5jbGllbnRYIC0gdGhpcy5sYXN0WCwgZS5jbGllbnRZIC0gdGhpcy5sYXN0WSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Nb3ZlKGUsIGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEJ1dHRvbkRvd24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGFzdFBvc2l0aW9uKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdXNlVXAoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCB1cGRhdGVQb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoZS5idXR0b24gPT0gdGhpcy5sZWZ0QnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRCdXR0b25Eb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVQb3NpdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCg8YW55PmUudGFyZ2V0KS5yZWxlYXNlQ2FwdHVyZSkgKDxhbnk+ZS50YXJnZXQpLnJlbGVhc2VDYXB0dXJlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Rvb2woKSAmJiAhZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRUb29sLmhhbmRsZU1vdXNlVXAoZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXBkYXRlUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxhc3RQb3NpdGlvbihlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkcmFnKGU6IEpRdWVyeS5FdmVudCwgZFg6IG51bWJlciwgZFk6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbkRyYWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25EcmFnKGUsIGRYLCBkWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW91c2VXaGVlbChlOiBKUXVlcnkuRXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVG9vbCgpICYmICFlLmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFRvb2wuaGFuZGxlTW91c2VXaGVlbChlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9uTW91c2VXaGVlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZVdoZWVsKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDYW1lcmFDb250cm9sbGVyIHtcclxuICAgICAgICBwcml2YXRlIHN0YWdlOiBTdGFnZVdlYkdMO1xyXG4gICAgICAgIHByaXZhdGUgY2FtZXJhOiBDYW1lcmFXZWJHTDtcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3Rpb246IFNlcnZlckNvbm5lY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSByYWRpdXM6IG51bWJlciA9IDIwLjA7XHJcbiAgICAgICAgcHJpdmF0ZSB5YXc6IG51bWJlciA9IDAuMDtcclxuICAgICAgICBwcml2YXRlIHBpdGNoOiBudW1iZXIgPSAwLjA7XHJcbiAgICAgICAgcHJpdmF0ZSBjZW50ZXI6IHBzZ2VvbWV0cnkuVmVjMztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkcmFnRGl2aXNvciA9IDEwMC4wO1xyXG4gICAgICAgIHByaXZhdGUgcm90YXRlRGl2aXNvciA9IDIwMC4wO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFlhdygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMueWF3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBZYXcodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnlhdyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RhZ2U6IFN0YWdlV2ViR0wsIGNhbWVyYTogQ2FtZXJhV2ViR0wsIGludGVyZmFjZUNvbnRyb2xsZXI6IEludGVyZmFjZUNvbnRyb2xsZXIsIGNvbm5lY3Rpb246IFNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGludGVyZmFjZUNvbnRyb2xsZXIuYmluZEV2ZW50cyhKUXVlcnkoc3RhZ2UuQ2FudmFzKSk7XHJcbiAgICAgICAgICAgIGludGVyZmFjZUNvbnRyb2xsZXIub25EcmFnID0gKGUsIGRYLCBkWSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnKGUsIGRYLCBkWSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpbnRlcmZhY2VDb250cm9sbGVyLm9uTW91c2VXaGVlbCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlV2hlZWwoZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpbnRlcmZhY2VDb250cm9sbGVyLm9uTW92ZSA9IChlLCB4LCB5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoZSwgeCwgeSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNlbnRlciA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAwLjAsIDAuMCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdChyYWRpdXM6IG51bWJlciwgcGl0Y2g6IG51bWJlciwgeWF3OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcbiAgICAgICAgICAgIHRoaXMucGl0Y2ggPSBwaXRjaDtcclxuICAgICAgICAgICAgdGhpcy55YXcgPSB5YXc7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3VzZVdoZWVsKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGQgPSB0aGlzLmdldFZpZXdEaXIoKS5tdWx0aXBseSgoPGFueT5lKS5kZWx0YVkgfHwgKDxhbnk+ZSkuZGVsdGFYKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VudGVyID0gdGhpcy5jZW50ZXIuc3ViKGQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYWRpdXMgKz0gKDxhbnk+ZSkuZGVsdGFZICogTWF0aC5sb2codGhpcy5yYWRpdXMgKyAxKSAvIDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhZGl1cyA9IE1hdGgubWF4KDAuMDEsIHRoaXMucmFkaXVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3ZlKGU6IEpRdWVyeS5FdmVudCwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZHJhZyhlOiBKUXVlcnkuRXZlbnQsIGRYOiBudW1iZXIsIGRZOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMuZ2V0Vmlld1BsYW5lWCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSB0aGlzLmdldFZpZXdQbGFuZVkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VudGVyID0gdGhpcy5jZW50ZXJcclxuICAgICAgICAgICAgICAgICAgICAuYWRkKHgubXVsdGlwbHkoZFggLyB0aGlzLmRyYWdEaXZpc29yKSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkKHkubXVsdGlwbHkoZFkgLyB0aGlzLmRyYWdEaXZpc29yKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlhdyAtPSBkWCAvIHRoaXMucm90YXRlRGl2aXNvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMucGl0Y2ggPSBNYXRoLm1heCgtTWF0aC5QSSAvIDIsIE1hdGgubWluKE1hdGguUEkgLyAyLCB0aGlzLnBpdGNoIC0gZFkgLyB0aGlzLnJvdGF0ZURpdmlzb3IpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0Vmlld1BsYW5lWCgpIHtcclxuICAgICAgICAgICAgbGV0IHEsIHIsIHY7XHJcblxyXG4gICAgICAgICAgICB2ID0gbmV3IHBzZ2VvbWV0cnkuVmVjMygtMS4wLCAwLjAsIDAuMCk7XHJcbiAgICAgICAgICAgIHEgPSBuZXcgcHNnZW9tZXRyeS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgICAgIHIgPSBuZXcgcHNnZW9tZXRyeS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgICAgIHEuc2V0RnJvbUF4aXNBbmdsZShuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMS4wLCAwLjApLCB0aGlzLnlhdyk7XHJcbiAgICAgICAgICAgIHIuc2V0RnJvbUF4aXNBbmdsZShuZXcgcHNnZW9tZXRyeS5WZWMzKDEuMCwgMC4wLCAwLjApLCB0aGlzLnBpdGNoKTtcclxuICAgICAgICAgICAgdiA9IHYuYXBwbHlRdWF0ZXJuaW9uKHIpO1xyXG4gICAgICAgICAgICB2ID0gdi5hcHBseVF1YXRlcm5pb24ocSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdjsgLy8uYWRkKHRoaXMuY2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0Vmlld1BsYW5lWSgpIHtcclxuICAgICAgICAgICAgbGV0IHEsIHIsIHY7XHJcblxyXG4gICAgICAgICAgICB2ID0gbmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDEuMCwgMC4wKTtcclxuICAgICAgICAgICAgcSA9IG5ldyBwc2dlb21ldHJ5LlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgciA9IG5ldyBwc2dlb21ldHJ5LlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgcS5zZXRGcm9tQXhpc0FuZ2xlKG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAxLjAsIDAuMCksIHRoaXMueWF3KTtcclxuICAgICAgICAgICAgci5zZXRGcm9tQXhpc0FuZ2xlKG5ldyBwc2dlb21ldHJ5LlZlYzMoMS4wLCAwLjAsIDAuMCksIHRoaXMucGl0Y2gpO1xyXG4gICAgICAgICAgICB2ID0gdi5hcHBseVF1YXRlcm5pb24ocik7XHJcbiAgICAgICAgICAgIHYgPSB2LmFwcGx5UXVhdGVybmlvbihxKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2OyAvLy5hZGQodGhpcy5jZW50ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRWaWV3RGlyKCk6IHBzZ2VvbWV0cnkuVmVjMyB7XHJcbiAgICAgICAgICAgIGxldCBxLCByLCB2O1xyXG5cclxuICAgICAgICAgICAgdiA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAwLjAsIC0xLjApO1xyXG4gICAgICAgICAgICBxID0gbmV3IHBzZ2VvbWV0cnkuUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICByID0gbmV3IHBzZ2VvbWV0cnkuUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICBxLnNldEZyb21BeGlzQW5nbGUobmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDEuMCwgMC4wKSwgdGhpcy55YXcpO1xyXG4gICAgICAgICAgICByLnNldEZyb21BeGlzQW5nbGUobmV3IHBzZ2VvbWV0cnkuVmVjMygxLjAsIDAuMCwgMC4wKSwgdGhpcy5waXRjaCk7XHJcbiAgICAgICAgICAgIHYgPSB2LmFwcGx5UXVhdGVybmlvbihyKTtcclxuICAgICAgICAgICAgdiA9IHYuYXBwbHlRdWF0ZXJuaW9uKHEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHY7IC8vLmFkZCh0aGlzLmNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldENhbWVyYVBvcygpIHtcclxuICAgICAgICAgICAgbGV0IHEsIHIsIHY7XHJcblxyXG4gICAgICAgICAgICB2ID0gbmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDAuMCwgdGhpcy5yYWRpdXMpO1xyXG4gICAgICAgICAgICBxID0gbmV3IHBzZ2VvbWV0cnkuUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICByID0gbmV3IHBzZ2VvbWV0cnkuUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICBxLnNldEZyb21BeGlzQW5nbGUobmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDEuMCwgMC4wKSwgdGhpcy55YXcpO1xyXG4gICAgICAgICAgICByLnNldEZyb21BeGlzQW5nbGUobmV3IHBzZ2VvbWV0cnkuVmVjMygxLjAsIDAuMCwgMC4wKSwgdGhpcy5waXRjaCk7XHJcbiAgICAgICAgICAgIHYgPSB2LmFwcGx5UXVhdGVybmlvbihyKTtcclxuICAgICAgICAgICAgdiA9IHYuYXBwbHlRdWF0ZXJuaW9uKHEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHYuYWRkKHRoaXMuY2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlQ2FtZXJhKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYS51cGRhdGUodGhpcy5nZXRDYW1lcmFQb3MoKSwgdGhpcy5jZW50ZXIsIG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAxLjAsIDAuMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ29tbW9uTWVzc2FnZVR5cGVzIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIEFwcFN0YXRlRGVsdGEgPSAweDAxMDA7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBTZXJ2ZXJIYW5kc2hha2UgPSAweDAxMDE7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDbGllbnRIYW5kc2hha2UgPSAweDAxMDI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDbGllbnRDb25maXJtYXRpb24gPSAweDAxMDM7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBBcHBTdGF0ZUluaXRpYWxpemF0aW9uID0gMHgxMDQ7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBBbmNob3JSZXF1ZXN0ID0gMHgwMWZlO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgU2hhcmVkQW5jaG9yID0gMHgwMWZmO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOZXR3b3JrQ2hhbm5lbE1lc3NhZ2Uge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEhlYWRlclNpemUgPSA4O1xyXG5cclxuICAgICAgICBwcml2YXRlIG1lc3NhZ2VUeXBlOiBudW1iZXIgPSBDb21tb25NZXNzYWdlVHlwZXMuQXBwU3RhdGVEZWx0YTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50OiBVaW50OEFycmF5O1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IENvbnRlbnQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1lc3NhZ2VUeXBlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlVHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRnJvbUJ1ZmZlcihidWZmZXI6IFVpbnQ4QXJyYXkpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBOZXR3b3JrQ2hhbm5lbE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgcmVzdWx0LmNvbnRlbnQgPSBidWZmZXI7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEhhc1BheWxvYWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYnl0ZUxlbmd0aCA+IE5ldHdvcmtDaGFubmVsTWVzc2FnZS5IZWFkZXJTaXplO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBQYXlsb2FkU2l6ZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5ieXRlTGVuZ3RoIC0gTmV0d29ya0NoYW5uZWxNZXNzYWdlLkhlYWRlclNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==