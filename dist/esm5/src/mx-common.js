/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        var crypto = window.crypto || ((/** @type {?} */ (window))).msCrypto;
        return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        });
    }
    modelstageweb.uuidv4 = uuidv4;
    var ToolsWebGL = /** @class */ (function () {
        function ToolsWebGL(stage) {
            this.stage = stage;
        }
        /**
         * @param {?} shaderType
         * @param {?} shaderSource
         * @return {?}
         */
        ToolsWebGL.prototype.createShader = /**
         * @param {?} shaderType
         * @param {?} shaderSource
         * @return {?}
         */
        function (shaderType, shaderSource) {
            /** @type {?} */
            var shader = this.stage.gl.createShader(shaderType);
            this.stage.gl.shaderSource(shader, shaderSource);
            this.stage.gl.compileShader(shader);
            console.log(this.stage.gl.getShaderInfoLog(shader));
            return shader;
        };
        return ToolsWebGL;
    }());
    modelstageweb.ToolsWebGL = ToolsWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ToolsWebGL.prototype.stage;
    }
    var BlockStreamBlockDescriptor = /** @class */ (function () {
        function BlockStreamBlockDescriptor() {
        }
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "BlockType", {
            get: /**
             * @return {?}
             */
            function () {
                return this.blockType;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.blockType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "MajorVersion", {
            get: /**
             * @return {?}
             */
            function () {
                return this.majorVersion;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.majorVersion = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "MinorVersion", {
            get: /**
             * @return {?}
             */
            function () {
                return this.minorVersion;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.minorVersion = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "Flags", {
            get: /**
             * @return {?}
             */
            function () {
                return this.flags;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.flags = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamBlockDescriptor.prototype, "PayloadBytes", {
            get: /**
             * @return {?}
             */
            function () {
                return this.payloadBytes;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.payloadBytes = value;
            },
            enumerable: true,
            configurable: true
        });
        return BlockStreamBlockDescriptor;
    }());
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
    var BlockStreamReaderStates;
    (function (BlockStreamReaderStates) {
        BlockStreamReaderStates[BlockStreamReaderStates["FILE_HEADER_EXPECTED"] = 0] = "FILE_HEADER_EXPECTED";
        BlockStreamReaderStates[BlockStreamReaderStates["BLOCK_DESCRIPTOR_EXPECTED"] = 1] = "BLOCK_DESCRIPTOR_EXPECTED";
        BlockStreamReaderStates[BlockStreamReaderStates["PAYLOAD_EXPECTED"] = 2] = "PAYLOAD_EXPECTED";
    })(BlockStreamReaderStates = modelstageweb.BlockStreamReaderStates || (modelstageweb.BlockStreamReaderStates = {}));
    var BlockStreamReader = /** @class */ (function () {
        function BlockStreamReader(buffer) {
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
        Object.defineProperty(BlockStreamReader.prototype, "CurrentBlockDescriptor", {
            get: /**
             * @return {?}
             */
            function () {
                return this.currentBlockDescriptor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockStreamReader.prototype, "FatalError", {
            get: /**
             * @return {?}
             */
            function () {
                return this.fatalError;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.remainingBytesInBlock = /**
         * @return {?}
         */
        function () {
            return this.blockEnd - this.currentPos;
        };
        /**
         * @param {?} count
         * @return {?}
         */
        BlockStreamReader.prototype.assureRemainingBytesInBlock = /**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            return this.currentPos + count <= this.blockEnd;
        };
        /**
         * @param {?} count
         * @return {?}
         */
        BlockStreamReader.prototype.readBytes = /**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            return this.arrayBuffer.slice(this.currentPos, this.currentPos + count);
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadInt16 = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            /** @type {?} */
            var result = this.assureRemainingBytesInBlock(2);
            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256);
            }
            return result;
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadFloat = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            /** @type {?} */
            var result = this.assureRemainingBytesInBlock(4);
            if (result) {
                /** @type {?} */
                var buf = new ArrayBuffer(4);
                /** @type {?} */
                var view = new DataView(buf);
                view.setUint8(0, this.byteArray[this.currentPos++]);
                view.setUint8(1, this.byteArray[this.currentPos++]);
                view.setUint8(2, this.byteArray[this.currentPos++]);
                view.setUint8(3, this.byteArray[this.currentPos++]);
                //let view = new DataView(this.byteArray.buffer, this.currentPos, 4);
                lambda(view.getFloat32(0, true));
                //this.currentPos += 4;
            }
            return result;
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadInt = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            /** @type {?} */
            var result = this.assureRemainingBytesInBlock(4);
            if (result) {
                lambda(this.byteArray[this.currentPos++] +
                    this.byteArray[this.currentPos++] * 256 +
                    this.byteArray[this.currentPos++] * 65536 +
                    this.byteArray[this.currentPos++] * 16777216);
            }
            return result;
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadInt64 = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            /** @type {?} */
            var result = this.assureRemainingBytesInBlock(8);
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
        };
        /**
         * @param {?} lambda
         * @return {?}
         */
        BlockStreamReader.prototype.tryReadString = /**
         * @param {?} lambda
         * @return {?}
         */
        function (lambda) {
            var _this = this;
            /** @type {?} */
            var result = false;
            this.tryReadInt(function (stringLength) {
                /** @type {?} */
                var value = '';
                if (_this.assureRemainingBytesInBlock(stringLength)) {
                    for (var i = 0; i < stringLength; ++i) {
                        value += String.fromCharCode(_this.byteArray[_this.currentPos++]);
                    }
                }
                lambda(value);
                result = true;
            });
            return result;
        };
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.readString = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = '';
            this.tryReadString(function (value) { result = value; });
            return result;
        };
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.readMatrix4 = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = new psgeometry.Matrix4();
            var _loop_1 = function (i) {
                this_1.tryReadFloat(function (val) { result.elements[i] = val; });
            };
            var this_1 = this;
            for (var i = 0; i < 16; ++i) {
                _loop_1(i);
            }
            return result.transpose();
        };
        /**
         * @private
         * @param {?} startPos
         * @param {?} length
         * @return {?}
         */
        BlockStreamReader.prototype.internalReadString = /**
         * @private
         * @param {?} startPos
         * @param {?} length
         * @return {?}
         */
        function (startPos, length) {
            /** @type {?} */
            var result = '';
            for (var i = 0; i < length; ++i) {
                result += String.fromCharCode(this.byteArray[startPos + i]);
            }
            return result;
        };
        /**
         * @private
         * @param {?} startPos
         * @return {?}
         */
        BlockStreamReader.prototype.internalReadInt = /**
         * @private
         * @param {?} startPos
         * @return {?}
         */
        function (startPos) {
            return this.byteArray[startPos] +
                this.byteArray[startPos + 1] * 256 +
                this.byteArray[startPos + 2] * 65536 +
                this.byteArray[startPos + 3] * 16777216;
        };
        /**
         * @private
         * @return {?}
         */
        BlockStreamReader.prototype.assureFileHeader = /**
         * @private
         * @return {?}
         */
        function () {
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
        };
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.enterBlock = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = { success: false, descriptor: null };
            if (this.byteArray.byteLength >= this.currentPos + 5) {
                if (this.byteArray[this.currentPos] == 0x70 && // = "psbl"
                    this.byteArray[this.currentPos + 1] == 0x73 &&
                    this.byteArray[this.currentPos + 2] == 0x62 &&
                    this.byteArray[this.currentPos + 3] == 0x6C) {
                    /** @type {?} */
                    var blockTypeLength = this.byteArray[this.currentPos + 4];
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
        };
        /**
         * @return {?}
         */
        BlockStreamReader.prototype.leaveBlock = /**
         * @return {?}
         */
        function () {
            this.currentPos = this.blockEnd;
            this.state = BlockStreamReaderStates.BLOCK_DESCRIPTOR_EXPECTED;
        };
        return BlockStreamReader;
    }());
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
    var ShaderInstance = /** @class */ (function () {
        function ShaderInstance(shaderKey) {
            this.references = {};
            this.shaderKey = shaderKey;
        }
        Object.defineProperty(ShaderInstance.prototype, "FigureID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.figureID;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.figureID = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShaderInstance.prototype, "ShaderKey", {
            get: /**
             * @return {?}
             */
            function () {
                return this.shaderKey;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.shaderKey = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} key
         * @return {?}
         */
        ShaderInstance.prototype.getReference = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return this.references[key];
        };
        /**
         * @param {?} reader
         * @return {?}
         */
        ShaderInstance.prototype.construct = /**
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
        };
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        ShaderInstance.prototype.addReference = /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        function (key, value) {
            this.references[key] = value;
        };
        return ShaderInstance;
    }());
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
    var MeshShaderInstance = /** @class */ (function (_super) {
        tslib_1.__extends(MeshShaderInstance, _super);
        function MeshShaderInstance(shaderKey) {
            var _this = _super.call(this, shaderKey) || this;
            _this.SIZE_OF_FLOAT = 4;
            return _this;
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        MeshShaderInstance.prototype.construct = /**
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            var _this = this;
            if (!reader.tryReadString(function (id) { _this.bufferID = id; })) {
                this.bufferID = '_default';
            }
            if (!reader.tryReadInt16(function (priority) { _this.priority = priority; })) {
                this.priority = 0;
            }
        };
        /**
         * @return {?}
         */
        MeshShaderInstance.prototype.getStride = /**
         * @return {?}
         */
        function () {
            return this.ShaderKey == 'TransparentMeshShader' ? 10 * this.SIZE_OF_FLOAT : 9 * this.SIZE_OF_FLOAT;
        };
        return MeshShaderInstance;
    }(ShaderInstance));
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
    var TexturedMeshShaderInstance = /** @class */ (function (_super) {
        tslib_1.__extends(TexturedMeshShaderInstance, _super);
        function TexturedMeshShaderInstance(shaderKey) {
            return _super.call(this, shaderKey) || this;
        }
        Object.defineProperty(TexturedMeshShaderInstance.prototype, "TextureID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.textureID;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} reader
         * @return {?}
         */
        TexturedMeshShaderInstance.prototype.construct = /**
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            var _this = this;
            /** @type {?} */
            var result = reader.tryReadString(function (textureID) { _this.textureID = textureID; });
            if (result) {
                this.addReference('TextureBuffer', this.textureID);
                _super.prototype.construct.call(this, reader);
            }
        };
        /**
         * @return {?}
         */
        TexturedMeshShaderInstance.prototype.getStride = /**
         * @return {?}
         */
        function () {
            return 11 * this.SIZE_OF_FLOAT;
        };
        return TexturedMeshShaderInstance;
    }(MeshShaderInstance));
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
        var result = null;
        /** @type {?} */
        var shaderKey;
        if (reader.tryReadString(function (key) { shaderKey = key; })) {
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
    var Mesh3DLib = /** @class */ (function () {
        function Mesh3DLib(objectNamePrefix) {
            this.objectNamePrefix = objectNamePrefix;
        }
        /**
         * @param {?} rootNode
         * @return {?}
         */
        Mesh3DLib.prototype.setRootNode = /**
         * @param {?} rootNode
         * @return {?}
         */
        function (rootNode) {
            this.rootNode = rootNode;
        };
        /**
         * @param {?} path
         * @return {?}
         */
        Mesh3DLib.prototype.getNodeFromPath = /**
         * @param {?} path
         * @return {?}
         */
        function (path) {
            if (path.length == 0 || !this.rootNode || this.rootNode.Name == path) {
                return this.rootNode;
            }
            else {
                return this.rootNode.getChildNodeFromPath(path.substr(this.rootNode.Name.length));
            }
        };
        return Mesh3DLib;
    }());
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
    var AssetFactoryWebGL = /** @class */ (function () {
        function AssetFactoryWebGL(stage) {
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
        AssetFactoryWebGL.prototype.createFigure = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            var _this = this;
            this.currentFigure = new FigureWebGL(reader.readString());
            if (this.currentSceneMesh3DLib) {
                reader.tryReadString(function (nodePath) {
                    _this.currentFigure.Node = _this.currentSceneMesh3DLib.getNodeFromPath(nodePath);
                });
            }
            assetStore.addFigure(this.currentFigure);
            return true;
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createMesh = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            /** @type {?} */
            var result = false;
            this.currentShaderInstance = ShaderInstanceFromReader(reader);
            if (this.currentShaderInstance && this.currentFigure) {
                this.currentFigure.addShaderInstance(this.currentShaderInstance);
                result = true;
            }
            return result;
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createMeshBuffer = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            /** @type {?} */
            var bufferAsset = new BufferAssetWebGL(reader, 'VertexBuffer', false);
            /** @type {?} */
            var currentID = bufferAsset.BufferID;
            /** @type {?} */
            var counter = 1;
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
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createMeshIndicesBuffer = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            /** @type {?} */
            var bufferAsset = new BufferAssetWebGL(reader, 'IndexBuffer', true);
            /** @type {?} */
            var currentID = bufferAsset.BufferID;
            /** @type {?} */
            var counter = 1;
            while (assetStore.getBufferAsset(currentID)) {
                currentID = bufferAsset.BufferID + counter++;
            }
            bufferAsset.BufferID = currentID;
            assetStore.addBufferAsset(currentID, bufferAsset);
            bufferAsset.initialize(stage);
            if (this.currentShaderInstance) {
                this.currentShaderInstance.addReference('IndexBuffer', bufferAsset.BufferID);
            }
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createTexture = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        function (reader, stage, assetStore, deferreds) {
            var _this = this;
            /** @type {?} */
            var textureName;
            /** @type {?} */
            var pixelDataSize;
            if (reader.tryReadString(function (value) { textureName = value; }) && reader.tryReadInt64(function (value) { pixelDataSize = value; })) {
                /** @type {?} */
                var imageData = reader.readBytes(pixelDataSize);
                /** @type {?} */
                var extension = textureName.substr(textureName.lastIndexOf('.')).toLowerCase();
                /** @type {?} */
                var imageType = 'jpeg';
                if (extension == '.png') {
                    imageType = 'png';
                }
                /** @type {?} */
                var blob = new Blob([imageData], { 'type': 'image/' + imageType });
                /** @type {?} */
                var url = URL.createObjectURL(blob);
                /** @type {?} */
                var image_1 = new Image();
                /** @type {?} */
                var deferred_1 = JQuery.Deferred();
                deferreds.push(deferred_1);
                image_1.onload = function () {
                    _this.stage.AssetStore.addTextureAsset(textureName, new TextureAssetWebGL(_this.stage, image_1));
                    deferred_1.resolve();
                };
                image_1.onerror = function () {
                    console.error('Error processing texture blob ' + textureName);
                    deferred_1.reject();
                };
                image_1.src = url;
            }
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createOctree = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            this.currentFigure.setIntersector(Octree.CreateFromBlockStream(reader));
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createScene = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            this.currentSceneMesh3DLib = new Mesh3DLib(reader.readString());
        };
        /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        AssetFactoryWebGL.prototype.createRootNode = /**
         * @protected
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @return {?}
         */
        function (reader, stage, assetStore) {
            if (this.currentSceneMesh3DLib) {
                /** @type {?} */
                var rootNode = NodeAsset.FromBlockStream(reader, this.currentSceneMesh3DLib);
                this.currentSceneMesh3DLib.setRootNode(rootNode);
                this.stage.AssetStore.addRootNode(rootNode);
            }
        };
        /**
         * @private
         * @param {?} blockType
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        AssetFactoryWebGL.prototype.processBlock = /**
         * @private
         * @param {?} blockType
         * @param {?} reader
         * @param {?} stage
         * @param {?} assetStore
         * @param {?} deferreds
         * @return {?}
         */
        function (blockType, reader, stage, assetStore, deferreds) {
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
        };
        /**
         * @private
         * @param {?} buffer
         * @return {?}
         */
        AssetFactoryWebGL.prototype.loadFromArrayBuffer = /**
         * @private
         * @param {?} buffer
         * @return {?}
         */
        function (buffer) {
            /** @type {?} */
            var deferreds = [];
            /** @type {?} */
            var assetStore = this.stage.AssetStore;
            /** @type {?} */
            var reader = new BlockStreamReader(buffer);
            try {
                /** @type {?} */
                var res = reader.enterBlock();
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
        };
        /**
         * @param {?} url
         * @return {?}
         */
        AssetFactoryWebGL.prototype.getFromUrl = /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            var _this = this;
            /** @type {?} */
            var deferred = JQuery.Deferred();
            /** @type {?} */
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.responseType = 'arraybuffer';
            req.onload = function (event) {
                _this.loadFromArrayBuffer((/** @type {?} */ (req.response))).done(function () {
                    deferred.resolve(true);
                });
            };
            req.onerror = function (event) {
                deferred.reject(event);
            };
            req.addEventListener('progress', function (oEvent) {
                if (oEvent.lengthComputable) {
                    /** @type {?} */
                    var percentComplete = oEvent.loaded / oEvent.total;
                    if (_this.lastPercentage != Math.floor(percentComplete * 100)) {
                        _this.lastPercentage = Math.floor(percentComplete * 100);
                        deferred.notify(Math.round(percentComplete * 100));
                    }
                }
                else {
                    // Unable to compute progress information since the total size is unknown
                }
            });
            req.send(null);
            return deferred;
        };
        return AssetFactoryWebGL;
    }());
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
    var BoundingBoxIntersector = /** @class */ (function () {
        function BoundingBoxIntersector(boundingBox) {
            this.boundingBox = boundingBox;
        }
        /**
         * @return {?}
         */
        BoundingBoxIntersector.prototype.getBoundingBox = /**
         * @return {?}
         */
        function () {
            return this.boundingBox;
        };
        return BoundingBoxIntersector;
    }());
    modelstageweb.BoundingBoxIntersector = BoundingBoxIntersector;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        BoundingBoxIntersector.prototype.boundingBox;
    }
    var Octree = /** @class */ (function () {
        function Octree() {
            this.boundingBox = new psgeometry.AABB3D();
        }
        /**
         * @param {?} reader
         * @return {?}
         */
        Octree.CreateFromBlockStream = /**
         * @param {?} reader
         * @return {?}
         */
        function (reader) {
            /** @type {?} */
            var octree = new Octree();
            /** @type {?} */
            var x0;
            /** @type {?} */
            var y0;
            /** @type {?} */
            var z0;
            /** @type {?} */
            var x1;
            /** @type {?} */
            var y1;
            /** @type {?} */
            var z1;
            /** @type {?} */
            var levels;
            if (reader.tryReadInt(function (val) { levels = val; }) &&
                reader.tryReadFloat(function (val) { return x0 = val; }) &&
                reader.tryReadFloat(function (val) { return y0 = val; }) &&
                reader.tryReadFloat(function (val) { return z0 = val; }) &&
                reader.tryReadFloat(function (val) { return x1 = val; }) &&
                reader.tryReadFloat(function (val) { return y1 = val; }) &&
                reader.tryReadFloat(function (val) { return z1 = val; })) {
                octree.boundingBox.addPoint(x0, y0, z0);
                octree.boundingBox.addPoint(x1, y1, z1);
            }
            return octree;
        };
        /**
         * @return {?}
         */
        Octree.prototype.getBoundingBox = /**
         * @return {?}
         */
        function () {
            return this.boundingBox;
        };
        return Octree;
    }());
    modelstageweb.Octree = Octree;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        Octree.prototype.boundingBox;
    }
    var FigureWebGL = /** @class */ (function () {
        function FigureWebGL(figureID) {
            this.shaderInstances = [];
            this.figureID = figureID;
        }
        Object.defineProperty(FigureWebGL.prototype, "Node", {
            get: /**
             * @return {?}
             */
            function () {
                return this.node;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.node = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FigureWebGL.prototype, "FigureID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.figureID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FigureWebGL.prototype, "ShaderInstances", {
            get: /**
             * @return {?}
             */
            function () {
                return this.shaderInstances;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        FigureWebGL.prototype.getBoundingBox = /**
         * @return {?}
         */
        function () {
            if (this.intersector) {
                return this.Node ? this.intersector.getBoundingBox().transform(this.Node.AbsoluteTransformation) : this.intersector.getBoundingBox();
            }
            else {
                return new psgeometry.AABB3D();
            }
        };
        /**
         * @param {?} shaderInstance
         * @return {?}
         */
        FigureWebGL.prototype.addShaderInstance = /**
         * @param {?} shaderInstance
         * @return {?}
         */
        function (shaderInstance) {
            this.shaderInstances.push(shaderInstance);
        };
        /**
         * @param {?} context
         * @return {?}
         */
        FigureWebGL.prototype.render = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            var _this = this;
            /** @type {?} */
            var stage = context.Stage;
            this.shaderInstances.forEach(function (shaderInstance) {
                shaderInstance.FigureID = _this.figureID;
                /** @type {?} */
                var shaderProgram = stage.getShaderProgram(context, shaderInstance.ShaderKey);
                if (shaderProgram) {
                    context.ShaderProgram = shaderProgram;
                    context.NodeTransform = _this.Node ? _this.Node.AbsoluteTransformation : null;
                    shaderProgram.render(context, shaderInstance);
                }
            });
        };
        /**
         * @param {?} intersector
         * @return {?}
         */
        FigureWebGL.prototype.setIntersector = /**
         * @param {?} intersector
         * @return {?}
         */
        function (intersector) {
            this.intersector = intersector;
        };
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        FigureWebGL.prototype.intersectsBoundingBox = /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        function (ray, at) {
            /** @type {?} */
            var result = false;
            if (this.intersector) {
                /** @type {?} */
                var intersectionPoint = this.intersector.getBoundingBox().intersectsRay(ray);
                if (intersectionPoint) {
                    at.assignVec(intersectionPoint);
                    result = true;
                }
            }
            return result;
        };
        return FigureWebGL;
    }());
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
    var AnimationTransformation = /** @class */ (function () {
        function AnimationTransformation() {
        }
        /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        AnimationTransformation.FromBlockStream = /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        function (reader, mesh3DLib) {
            return null;
        };
        return AnimationTransformation;
    }());
    modelstageweb.AnimationTransformation = AnimationTransformation;
    var NodeAsset = /** @class */ (function () {
        function NodeAsset() {
            this.childNodes = {};
        }
        Object.defineProperty(NodeAsset.prototype, "Name", {
            get: /**
             * @return {?}
             */
            function () {
                return this.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeAsset.prototype, "AbsoluteTransformation", {
            get: /**
             * @return {?}
             */
            function () {
                return this.absoluteTransformation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeAsset.prototype, "LocalTransformation", {
            get: /**
             * @return {?}
             */
            function () {
                return this.localTransformation;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} path
         * @return {?}
         */
        NodeAsset.prototype.getChildNodeFromPath = /**
         * @param {?} path
         * @return {?}
         */
        function (path) {
            for (var child in this.childNodes) {
                if (path == this.childNodes[child].Name) {
                    return this.childNodes[child];
                }
            }
            for (var child in this.childNodes) {
                if (path.substring(0, this.childNodes[child].Name.length) == this.childNodes[child].Name) {
                    return this.childNodes[child].getChildNodeFromPath(path.substr(this.childNodes[child].Name.length));
                }
            }
            return null;
        };
        /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @param {?=} parentNode
         * @return {?}
         */
        NodeAsset.FromBlockStream = /**
         * @param {?} reader
         * @param {?} mesh3DLib
         * @param {?=} parentNode
         * @return {?}
         */
        function (reader, mesh3DLib, parentNode) {
            /** @type {?} */
            var result = new NodeAsset();
            result.name = reader.readString();
            result.localTransformation = reader.readMatrix4();
            result.absoluteTransformation = NodeAsset.calculateAbsoluteTransformation(result.localTransformation, parentNode);
            result.parentNode = parentNode;
            result.readChildNodes(reader, mesh3DLib);
            result.readAnimationTransformations(reader, mesh3DLib);
            return result;
        };
        /**
         * @private
         * @param {?} localTransformation
         * @param {?} parentNode
         * @return {?}
         */
        NodeAsset.calculateAbsoluteTransformation = /**
         * @private
         * @param {?} localTransformation
         * @param {?} parentNode
         * @return {?}
         */
        function (localTransformation, parentNode) {
            if (parentNode) {
                return (/** @type {?} */ (localTransformation.multiply(parentNode.AbsoluteTransformation)));
            }
            else {
                return localTransformation;
            }
        };
        /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        NodeAsset.prototype.readChildNodes = /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        function (reader, mesh3DLib) {
            var _this = this;
            reader.tryReadInt(function (childNameCount) {
                for (var i = 0; i < childNameCount; ++i) {
                    _this.addChildNode(NodeAsset.FromBlockStream(reader, mesh3DLib, _this));
                }
            });
        };
        /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        NodeAsset.prototype.readAnimationTransformations = /**
         * @private
         * @param {?} reader
         * @param {?} mesh3DLib
         * @return {?}
         */
        function (reader, mesh3DLib) {
            var _this = this;
            reader.tryReadInt(function (numAnimationTransformations) {
                for (var i = 0; i < numAnimationTransformations; ++i) {
                    _this.addAnimationTransformation(AnimationTransformation.FromBlockStream(reader, mesh3DLib));
                }
            });
        };
        /**
         * @private
         * @param {?} node
         * @return {?}
         */
        NodeAsset.prototype.addChildNode = /**
         * @private
         * @param {?} node
         * @return {?}
         */
        function (node) {
            this.childNodes[node.Name] = node;
        };
        /**
         * @private
         * @param {?} animationTransformation
         * @return {?}
         */
        NodeAsset.prototype.addAnimationTransformation = /**
         * @private
         * @param {?} animationTransformation
         * @return {?}
         */
        function (animationTransformation) {
        };
        return NodeAsset;
    }());
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
    var BufferAssetWebGL = /** @class */ (function () {
        function BufferAssetWebGL(reader, bufferID, isElementBuffer) {
            this.bufferSize = 0;
            this.isElementBuffer = false;
            this.bufferID = bufferID;
            this.isElementBuffer = isElementBuffer;
            if (reader) {
                /** @type {?} */
                var descriptor = reader.CurrentBlockDescriptor;
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
        Object.defineProperty(BufferAssetWebGL.prototype, "BufferID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.bufferID;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.bufferID = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferAssetWebGL.prototype, "Buffer", {
            get: /**
             * @return {?}
             */
            function () {
                return this.webGLBuffer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferAssetWebGL.prototype, "BufferSize", {
            get: /**
             * @return {?}
             */
            function () {
                return this.bufferSize;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.bufferSize = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} stage
         * @return {?}
         */
        BufferAssetWebGL.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            this.webGLBuffer = stage.gl.createBuffer();
            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ELEMENT_ARRAY_BUFFER, (/** @type {?} */ (this.bufferData)), stage.gl.STATIC_DRAW);
            }
            else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.bufferData(stage.gl.ARRAY_BUFFER, (/** @type {?} */ (this.bufferData)), stage.gl.STATIC_DRAW);
            }
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        BufferAssetWebGL.prototype.bind = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            if (this.isElementBuffer) {
                stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, this.webGLBuffer);
            }
            else {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
            }
        };
        /**
         * @param {?} stage
         * @param {?} attributeLocation
         * @param {?} size
         * @param {?} stride
         * @param {?} offset
         * @return {?}
         */
        BufferAssetWebGL.prototype.bindInterleaved = /**
         * @param {?} stage
         * @param {?} attributeLocation
         * @param {?} size
         * @param {?} stride
         * @param {?} offset
         * @return {?}
         */
        function (stage, attributeLocation, size, stride, offset) {
            if (attributeLocation >= 0) {
                stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, this.webGLBuffer);
                stage.gl.enableVertexAttribArray(attributeLocation);
                stage.gl.vertexAttribPointer(attributeLocation, size, stage.gl.FLOAT, false, stride, offset);
            }
        };
        return BufferAssetWebGL;
    }());
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
    var OpaqueMeshBuilder = /** @class */ (function () {
        function OpaqueMeshBuilder() {
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
        OpaqueMeshBuilder.prototype.addTri = /**
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
        function (x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, doubleSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, x1, y1, z1, 0, 0, 1, r, g, b, x2, y2, z2, 0, 0, 1, r, g, b);
            /** @type {?} */
            var i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (doubleSided) {
                this.vertices.push(x1, y1, z1, 0, 0, 1, r, g, b, x0, y0, z0, 0, 0, 1, r, g, b, x2, y2, z2, 0, 0, 1, r, g, b);
                i = this.indices.length;
                this.indices.push(i, i + 1, i + 2);
            }
        };
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
        OpaqueMeshBuilder.prototype.addQuad = /**
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
        function (x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3, r, g, b, doubleSided) {
            this.addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, doubleSided);
            this.addTri(x0, y0, z0, x2, y2, z2, x3, y3, z3, r, g, b, doubleSided);
        };
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
        OpaqueMeshBuilder.prototype.addStroke = /**
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
        function (x0, y0, z0, x1, y1, z1, r, g, b) {
            /** @type {?} */
            var dir = new psgeometry.Vec3(x1, y1, z1).sub(new psgeometry.Vec3(x0, y0, z0));
            /** @type {?} */
            var radius = dir.norm();
            /** @type {?} */
            var azimuth = Math.atan2(-dir.z, dir.x);
            /** @type {?} */
            var polar = Math.asin(dir.y / radius);
            /** @type {?} */
            var thickness = .01;
            /** @type {?} */
            var up = (/** @type {?} */ (psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, thickness, 0, 1))));
            /** @type {?} */
            var front = (/** @type {?} */ (psgeometry.Matrix4.FromRotation(azimuth, polar, 0).multiply(new psgeometry.Vec4(0, 0, thickness, 1))));
            this.addQuad(x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z, x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z, x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z, x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z, r, g, b);
            this.addQuad(x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z, x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z, x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z, x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z, r, g, b);
            this.addQuad(x0 - up.x - front.x, y0 - up.y - front.y, z0 - up.z - front.z, x1 - up.x - front.x, y1 - up.y - front.y, z1 - up.z - front.z, x1 - up.x + front.x, y1 - up.y + front.y, z1 - up.z + front.z, x0 - up.x + front.x, y0 - up.y + front.y, z0 - up.z + front.z, r, g, b);
            this.addQuad(x0 + up.x + front.x, y0 + up.y + front.y, z0 + up.z + front.z, x1 + up.x + front.x, y1 + up.y + front.y, z1 + up.z + front.z, x1 + up.x - front.x, y1 + up.y - front.y, z1 + up.z - front.z, x0 + up.x - front.x, y0 + up.y - front.y, z0 + up.z - front.z, r, g, b);
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        OpaqueMeshBuilder.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            /** @type {?} */
            var vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 9 * 4;
            /** @type {?} */
            var indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        };
        /**
         * @param {?} stage
         * @param {?} figureID
         * @return {?}
         */
        OpaqueMeshBuilder.prototype.createFigure = /**
         * @param {?} stage
         * @param {?} figureID
         * @return {?}
         */
        function (stage, figureID) {
            this.indBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_indices', true);
            this.vertBufferAsset = new modelstageweb.BufferAssetWebGL(undefined, figureID + '_vertices', false);
            this.initialize(stage);
            stage.AssetStore.addBufferAsset(figureID + '_indices', this.indBufferAsset);
            stage.AssetStore.addBufferAsset(figureID + '_vertices', this.vertBufferAsset);
            /** @type {?} */
            var shaderInstance = new modelstageweb.MeshShaderInstance('OpaqueMeshShader');
            shaderInstance.addReference('IndexBuffer', figureID + '_indices');
            shaderInstance.addReference('VertexBuffer', figureID + '_vertices');
            /** @type {?} */
            var figure = new modelstageweb.FigureWebGL(figureID);
            figure.addShaderInstance(shaderInstance);
            return figure;
        };
        return OpaqueMeshBuilder;
    }());
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
    var TransparentMeshBuilder = /** @class */ (function () {
        function TransparentMeshBuilder(vertBufferAsset, indBufferAsset) {
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
        TransparentMeshBuilder.prototype.addTri = /**
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
        function (x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, a, twoSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, a, x1, y1, z1, 0, 0, 1, r, g, b, a, x2, y2, z2, 0, 0, 1, r, g, b, a);
            /** @type {?} */
            var i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (twoSided) {
                this.addTri(x0, y0, z0, x2, y2, z2, x1, y1, z1, r, g, b, a);
            }
        };
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
        TransparentMeshBuilder.prototype.addQuad = /**
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
        function (x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3, r, g, b, a, twoSided) {
            this.addTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, r, g, b, a, twoSided);
            this.addTri(x0, y0, z0, x2, y2, z2, x3, y3, z3, r, g, b, a, twoSided);
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        TransparentMeshBuilder.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            /** @type {?} */
            var vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 10 * 4;
            /** @type {?} */
            var indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        };
        return TransparentMeshBuilder;
    }());
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
    var TexturedMeshBuilder = /** @class */ (function () {
        function TexturedMeshBuilder(vertBufferAsset, indBufferAsset) {
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
        TexturedMeshBuilder.prototype.addTri = /**
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
        function (x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, r, g, b, twoSided) {
            this.vertices.push(x0, y0, z0, 0, 0, 1, r, g, b, u0, v0, x1, y1, z1, 0, 0, 1, r, g, b, u1, v1, x2, y2, z2, 0, 0, 1, r, g, b, u2, v2);
            /** @type {?} */
            var i = this.indices.length;
            this.indices.push(i, i + 1, i + 2);
            if (twoSided) {
                this.addTri(x0, y0, z0, u0, v0, x2, y2, z2, u2, v2, x1, y1, z1, u1, v1, r, g, b);
            }
        };
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
        TexturedMeshBuilder.prototype.addQuad = /**
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
        function (x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r, g, b, twoSided) {
            this.addTri(x0, y0, z0, u0, v0, x1, y1, z1, u1, v1, x2, y2, z2, u2, v2, r, g, b, twoSided);
            this.addTri(x0, y0, z0, u0, v0, x2, y2, z2, u2, v2, x3, y3, z3, u3, v3, r, g, b, twoSided);
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        TexturedMeshBuilder.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            /** @type {?} */
            var vertBuf = new Float32Array(this.vertices.length);
            vertBuf.set(this.vertices);
            this.vertBufferAsset.bufferData = vertBuf.buffer;
            this.vertBufferAsset.BufferSize = this.indices.length * 11 * 4;
            /** @type {?} */
            var indBuf = new Int32Array(this.indices.length);
            indBuf.set(this.indices);
            this.indBufferAsset.bufferData = indBuf.buffer;
            this.vertBufferAsset.initialize(stage);
            this.indBufferAsset.initialize(stage);
        };
        return TexturedMeshBuilder;
    }());
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
    var TextureAssetWebGL = /** @class */ (function () {
        function TextureAssetWebGL(stage, image) {
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
        TextureAssetWebGL.prototype.bind = /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        function (stage, program, attributeName) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.uniform1i(stage.gl.getUniformLocation(program.Program, attributeName), 0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, this.texture);
        };
        /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        TextureAssetWebGL.prototype.unbind = /**
         * @param {?} stage
         * @param {?} program
         * @param {?} attributeName
         * @return {?}
         */
        function (stage, program, attributeName) {
            stage.gl.activeTexture(stage.gl.TEXTURE0);
            stage.gl.bindTexture(stage.gl.TEXTURE_2D, null);
        };
        return TextureAssetWebGL;
    }());
    modelstageweb.TextureAssetWebGL = TextureAssetWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TextureAssetWebGL.prototype.texture;
    }
    /// An asset store class for WebGL.
    var 
    /// An asset store class for WebGL.
    AssetStoreWebGL = /** @class */ (function () {
        function AssetStoreWebGL() {
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
        /// Adds the specified figure to the the store.
        /**
         * @param {?} figure
         * @return {?}
         */
        AssetStoreWebGL.prototype.addFigure = 
        /// Adds the specified figure to the the store.
        /**
         * @param {?} figure
         * @return {?}
         */
        function (figure) {
            this.figures[figure.FigureID] = figure;
        };
        /// Determines the figure with the the specified id.
        /// Determines the figure with the the specified id.
        /**
         * @param {?} figureID
         * @return {?}
         */
        AssetStoreWebGL.prototype.getFigure = 
        /// Determines the figure with the the specified id.
        /**
         * @param {?} figureID
         * @return {?}
         */
        function (figureID) {
            return this.figures[figureID];
        };
        /// Adds a buffer asset to the store.
        /// Adds a buffer asset to the store.
        /**
         * @param {?} bufferAssetID
         * @param {?} bufferAsset
         * @return {?}
         */
        AssetStoreWebGL.prototype.addBufferAsset = 
        /// Adds a buffer asset to the store.
        /**
         * @param {?} bufferAssetID
         * @param {?} bufferAsset
         * @return {?}
         */
        function (bufferAssetID, bufferAsset) {
            this.bufferAssets[bufferAssetID] = bufferAsset;
        };
        /**
         * @param {?} node
         * @return {?}
         */
        AssetStoreWebGL.prototype.addRootNode = /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            this.rootNodeAssets[node.Name] = node;
        };
        /// Determines the buffer asset with the specified id.
        /// Determines the buffer asset with the specified id.
        /**
         * @param {?} bufferAssetID
         * @return {?}
         */
        AssetStoreWebGL.prototype.getBufferAsset = 
        /// Determines the buffer asset with the specified id.
        /**
         * @param {?} bufferAssetID
         * @return {?}
         */
        function (bufferAssetID) {
            return this.bufferAssets[bufferAssetID];
        };
        /// Adds a texture asset to the store.
        /// Adds a texture asset to the store.
        /**
         * @param {?} textureAssetID
         * @param {?} textureAsset
         * @return {?}
         */
        AssetStoreWebGL.prototype.addTextureAsset = 
        /// Adds a texture asset to the store.
        /**
         * @param {?} textureAssetID
         * @param {?} textureAsset
         * @return {?}
         */
        function (textureAssetID, textureAsset) {
            this.textureAssets[textureAssetID] = textureAsset;
        };
        /// Determines the texture asset with the specified id.
        /// Determines the texture asset with the specified id.
        /**
         * @param {?} textureAssetID
         * @return {?}
         */
        AssetStoreWebGL.prototype.getTextureAsset = 
        /// Determines the texture asset with the specified id.
        /**
         * @param {?} textureAssetID
         * @return {?}
         */
        function (textureAssetID) {
            return this.textureAssets[textureAssetID];
        };
        Object.defineProperty(AssetStoreWebGL.prototype, "Figures", {
            /// Returns the map of aggregated figures.
            get: 
            /// Returns the map of aggregated figures.
            /**
             * @return {?}
             */
            function () {
                return this.figures;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} name
         * @return {?}
         */
        AssetStoreWebGL.prototype.getRootNode = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.rootNodeAssets[name];
        };
        return AssetStoreWebGL;
    }());
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
    var GenericSceneItemFilterWebGL = /** @class */ (function () {
        function GenericSceneItemFilterWebGL() {
        }
        /**
         * @param {?} sceneItem
         * @param {?} context
         * @return {?}
         */
        GenericSceneItemFilterWebGL.prototype.passes = /**
         * @param {?} sceneItem
         * @param {?} context
         * @return {?}
         */
        function (sceneItem, context) {
            return context.Phase != 'Shadow';
        };
        return GenericSceneItemFilterWebGL;
    }());
    modelstageweb.GenericSceneItemFilterWebGL = GenericSceneItemFilterWebGL;
    var SceneItemWebGL = /** @class */ (function () {
        function SceneItemWebGL(scene, sceneItemID, isVisible, testIntersection, childrenVisible, testChildrenIntersection) {
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
        Object.defineProperty(SceneItemWebGL.prototype, "Data", {
            get: /**
             * @return {?}
             */
            function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "Scene", {
            get: /**
             * @return {?}
             */
            function () {
                return this.scene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "SceneItemID", {
            get: /**
             * @return {?}
             */
            function () {
                return this.sceneItemID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "Children", {
            get: /**
             * @return {?}
             */
            function () {
                return this.children;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "TestChildrenIntersection", {
            get: /**
             * @return {?}
             */
            function () {
                return this.testChildrenIntersection;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this.testChildrenIntersection = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "TestIntersection", {
            get: /**
             * @return {?}
             */
            function () {
                return this.testIntersection;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this.testIntersection = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneItemWebGL.prototype, "Filter", {
            get: /**
             * @return {?}
             */
            function () { return this.filter; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.filter = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} sceneItem
         * @return {?}
         */
        SceneItemWebGL.prototype.addChild = /**
         * @param {?} sceneItem
         * @return {?}
         */
        function (sceneItem) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.push(sceneItem);
            sceneItem.addedToSceneGraph(this);
        };
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        SceneItemWebGL.prototype.getChild = /**
         * @param {?} sceneItemID
         * @return {?}
         */
        function (sceneItemID) {
            return this.childrenByKey[sceneItemID];
        };
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        SceneItemWebGL.prototype.removeChild = /**
         * @param {?} sceneItemID
         * @return {?}
         */
        function (sceneItemID) {
            this.children = this.children.filter(function (sceneItem) { return sceneItem.sceneItemID != sceneItemID; });
            delete this.childrenByKey[sceneItemID];
        };
        /**
         * @param {?} sceneItem
         * @param {?} index
         * @return {?}
         */
        SceneItemWebGL.prototype.insertChild = /**
         * @param {?} sceneItem
         * @param {?} index
         * @return {?}
         */
        function (sceneItem, index) {
            this.childrenByKey[sceneItem.sceneItemID] = sceneItem;
            this.children.splice(index, 0, sceneItem);
            sceneItem.addedToSceneGraph(this);
        };
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        SceneItemWebGL.prototype.beginRender = /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        function (context) {
        };
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        SceneItemWebGL.prototype.endRender = /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        function (context) {
        };
        /**
         * @param {?} context
         * @return {?}
         */
        SceneItemWebGL.prototype.render = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
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
        };
        /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        SceneItemWebGL.prototype.renderChildren = /**
         * @protected
         * @param {?} context
         * @return {?}
         */
        function (context) {
            if (this.childrenVisible) {
                this.children.forEach(function (child) {
                    child.render(context);
                });
            }
        };
        /**
         * @param {?} parentSceneItem
         * @return {?}
         */
        SceneItemWebGL.prototype.addedToSceneGraph = /**
         * @param {?} parentSceneItem
         * @return {?}
         */
        function (parentSceneItem) {
            this.scene = parentSceneItem.scene;
            this.parent = parentSceneItem;
        };
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        SceneItemWebGL.prototype.intersectsBoundingBox = /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        function (ray, at) {
            return false;
        };
        /**
         * @protected
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        SceneItemWebGL.prototype.isIntersectionCandidate = /**
         * @protected
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        function (ray, at) {
            return this.intersectsBoundingBox(ray, at);
        };
        /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        SceneItemWebGL.prototype.addIntersectionCandidates = /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        function (ray, candidates) {
            if (this.testIntersection) {
                /** @type {?} */
                var at = new psgeometry.Vec3();
                if (this.isIntersectionCandidate(ray, at)) {
                    candidates.push(new IntersectionCandidate(this, at.squaredDist(ray.p0.asVec3())));
                }
            }
            if (this.testChildrenIntersection) {
                for (var i in this.children) {
                    this.children[i].addIntersectionCandidates(ray, candidates);
                }
            }
        };
        return SceneItemWebGL;
    }());
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
    var ActorWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(ActorWebGL, _super);
        function ActorWebGL(scene, actorID) {
            var _this = _super.call(this, scene, actorID) || this;
            _this.figures = [];
            _this.state = new RenderState();
            return _this;
        }
        Object.defineProperty(ActorWebGL.prototype, "State", {
            get: /**
             * @return {?}
             */
            function () {
                return this.state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActorWebGL.prototype, "Figures", {
            get: /**
             * @return {?}
             */
            function () {
                return this.figures;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} figure
         * @return {?}
         */
        ActorWebGL.prototype.addFigure = /**
         * @param {?} figure
         * @return {?}
         */
        function (figure) {
            this.figures.push(figure);
        };
        /**
         * @param {?} context
         * @return {?}
         */
        ActorWebGL.prototype.beginRender = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            this.figures.forEach(function (figure) {
                figure.render(context);
            });
        };
        /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        ActorWebGL.prototype.intersectsBoundingBox = /**
         * @param {?} ray
         * @param {?} at
         * @return {?}
         */
        function (ray, at) {
            /** @type {?} */
            var transformedRay = this.inverseModelTransform ? ray.transform(this.inverseModelTransform) : ray;
            /** @type {?} */
            var result = false;
            for (var figureIdx in this.figures) {
                if (!result) {
                    result = this.figures[figureIdx].intersectsBoundingBox(transformedRay, at);
                    if (result) {
                        at.assignVec((/** @type {?} */ (this.lastModelTransform.multiply(at.asVec4()))));
                    }
                }
            }
            return result;
        };
        /**
         * @param {?} context
         * @return {?}
         */
        ActorWebGL.prototype.render = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
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
                    var modelTransform = context.NodeTransform ? (/** @type {?} */ (context.NodeTransform.multiply(context.ModelTransform))) : context.ModelTransform;
                    if (!modelTransform.equals(this.lastModelTransform)) {
                        this.inverseModelTransform = modelTransform.inverse();
                        this.lastModelTransform = modelTransform;
                    }
                    context.popState();
                }
            }
        };
        return ActorWebGL;
    }(SceneItemWebGL));
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
    var IntersectionCandidate = /** @class */ (function () {
        function IntersectionCandidate(sceneItem, squaredDist) {
            this.squaredDist = Infinity;
            this.sceneItem = sceneItem;
            this.squaredDist = squaredDist;
        }
        /**
         * @param {?} intersectionCandidate
         * @return {?}
         */
        IntersectionCandidate.prototype.compare = /**
         * @param {?} intersectionCandidate
         * @return {?}
         */
        function (intersectionCandidate) {
            return this.squaredDist < intersectionCandidate.squaredDist ? -1 :
                (this.squaredDist > intersectionCandidate.squaredDist ? 1 : 0);
        };
        return IntersectionCandidate;
    }());
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
    var RenderState = /** @class */ (function () {
        function RenderState() {
            this.entries = {};
        }
        Object.defineProperty(RenderState.prototype, "Parent", {
            get: /**
             * @return {?}
             */
            function () {
                return this.parent;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this.parent = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        RenderState.prototype.evaluate = /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        function (entry) {
            return typeof entry == 'function' ? entry(this) : entry;
        };
        /**
         * @param {?} key
         * @return {?}
         */
        RenderState.prototype.contains = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return this.entries[key] != undefined;
        };
        /**
         * @template T
         * @param {?} key
         * @param {?} defaultValue
         * @return {?}
         */
        RenderState.prototype.get = /**
         * @template T
         * @param {?} key
         * @param {?} defaultValue
         * @return {?}
         */
        function (key, defaultValue) {
            /** @type {?} */
            var result = defaultValue;
            this.tryGet(key, function (val) { result = val; });
            return result;
        };
        /**
         * @param {?} key
         * @param {?} lambda
         * @return {?}
         */
        RenderState.prototype.tryGet = /**
         * @param {?} key
         * @param {?} lambda
         * @return {?}
         */
        function (key, lambda) {
            if (this.contains(key)) {
                lambda(this.evaluate(this.entries[key]));
                return true;
            }
            else {
                return this.parent == null ? false : this.parent.tryGet(key, lambda);
            }
        };
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        RenderState.prototype.set = /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        function (key, value) {
            this.entries[key] = value;
        };
        return RenderState;
    }());
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
    var SceneWebGL = /** @class */ (function () {
        function SceneWebGL() {
            this.isInitialized = false;
            this.sceneHierarchy = new SceneItemWebGL(this, '');
            this.dirty = true;
            this.state = new RenderState();
        }
        Object.defineProperty(SceneWebGL.prototype, "SceneHierarchy", {
            get: /**
             * @return {?}
             */
            function () {
                return this.sceneHierarchy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneWebGL.prototype, "IsInitialized", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isInitialized;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.isInitialized = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneWebGL.prototype, "State", {
            get: /**
             * @return {?}
             */
            function () {
                return this.state;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        SceneWebGL.prototype.initialize = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        SceneWebGL.prototype.setDirty = /**
         * @return {?}
         */
        function () {
            this.dirty = true;
        };
        /**
         * @return {?}
         */
        SceneWebGL.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            if (this.dirty) {
                this.dirty = false;
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * @param {?} context
         * @return {?}
         */
        SceneWebGL.prototype.render = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            if (this.isInitialized) {
                context.SceneCategory = this.getSceneCategory();
                // updateRunningSequences(context);
                context.pushState(this.state);
                this.sceneHierarchy.render(context);
                context.popState();
            }
        };
        /**
         * @param {?} sceneItem
         * @param {?} makeVisible
         * @return {?}
         */
        SceneWebGL.prototype.addSceneItem = /**
         * @param {?} sceneItem
         * @param {?} makeVisible
         * @return {?}
         */
        function (sceneItem, makeVisible) {
            this.sceneHierarchy.addChild(sceneItem);
            this.setDirty();
        };
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        SceneWebGL.prototype.getSceneItem = /**
         * @param {?} sceneItemID
         * @return {?}
         */
        function (sceneItemID) {
            return this.sceneHierarchy.getChild(sceneItemID);
        };
        /**
         * @param {?} sceneItemID
         * @return {?}
         */
        SceneWebGL.prototype.removeSceneItem = /**
         * @param {?} sceneItemID
         * @return {?}
         */
        function (sceneItemID) {
            this.sceneHierarchy.removeChild(sceneItemID);
            this.setDirty();
        };
        /**
         * @param {?} sceneItem
         * @param {?} index
         * @param {?} makeVisible
         * @return {?}
         */
        SceneWebGL.prototype.insertSceneItem = /**
         * @param {?} sceneItem
         * @param {?} index
         * @param {?} makeVisible
         * @return {?}
         */
        function (sceneItem, index, makeVisible) {
            this.sceneHierarchy.insertChild(sceneItem, index);
            this.setDirty();
        };
        /**
         * @protected
         * @return {?}
         */
        SceneWebGL.prototype.getSceneCategory = /**
         * @protected
         * @return {?}
         */
        function () {
            return '';
        };
        /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        SceneWebGL.prototype.getIntersectionCandidates = /**
         * @param {?} ray
         * @param {?} candidates
         * @return {?}
         */
        function (ray, candidates) {
            this.sceneHierarchy.addIntersectionCandidates(ray, candidates);
            candidates.sort(function (a, b) { return a.compare(b); });
        };
        /**
         * @return {?}
         */
        SceneWebGL.prototype.beginFrame = /**
         * @return {?}
         */
        function () { };
        /** Update is called periodically (once per frame) to allow updating the state of the scene.
          */
        /**
         * Update is called periodically (once per frame) to allow updating the state of the scene.
         * @return {?}
         */
        SceneWebGL.prototype.update = /**
         * Update is called periodically (once per frame) to allow updating the state of the scene.
         * @return {?}
         */
        function () { };
        /**
         * @return {?}
         */
        SceneWebGL.prototype.endFrame = /**
         * @return {?}
         */
        function () { };
        return SceneWebGL;
    }());
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
    var Camera = /** @class */ (function () {
        function Camera() {
            this.dirty = true;
        }
        Object.defineProperty(Camera.prototype, "ProjectionMatrix", {
            get: /**
             * @return {?}
             */
            function () { return this.projectionMatrix; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "ViewMatrix", {
            get: /**
             * @return {?}
             */
            function () { return this.viewMatrix; },
            enumerable: true,
            configurable: true
        });
        /**
         * @protected
         * @return {?}
         */
        Camera.prototype.setDirty = /**
         * @protected
         * @return {?}
         */
        function () {
            this.dirty = true;
        };
        /**
         * @return {?}
         */
        Camera.prototype.isDirty = /**
         * @return {?}
         */
        function () {
            if (this.dirty) {
                this.dirty = false;
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * @param {?} eye
         * @param {?} center
         * @param {?} up
         * @return {?}
         */
        Camera.prototype.createViewMatrix = /**
         * @param {?} eye
         * @param {?} center
         * @param {?} up
         * @return {?}
         */
        function (eye, center, up) {
            /** @type {?} */
            var z = eye.sub(center).normalize();
            /** @type {?} */
            var x = up.cross(z).normalize();
            /** @type {?} */
            var y = z.cross(x).normalize();
            /** @type {?} */
            var m = new psgeometry.Matrix4([x.x, x.y, x.z, 0,
                y.x, y.y, y.z, 0,
                z.x, z.y, z.z, 0,
                0, 0, 0, 1]);
            /** @type {?} */
            var t = new psgeometry.Matrix4([1, 0, 0, -eye.x,
                0, 1, 0, -eye.y,
                0, 0, 1, -eye.z,
                0, 0, 0, 1]);
            return (/** @type {?} */ (t.multiply(m)));
        };
        /**
         * @param {?} fovy
         * @param {?} aspect
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        Camera.prototype.createPerspectiveMatrix = /**
         * @param {?} fovy
         * @param {?} aspect
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        function (fovy, aspect, znear, zfar) {
            /** @type {?} */
            var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
            /** @type {?} */
            var ymin = -ymax;
            /** @type {?} */
            var xmin = ymin * aspect;
            /** @type {?} */
            var xmax = ymax * aspect;
            return this.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
        };
        /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} near
         * @param {?} far
         * @return {?}
         */
        Camera.prototype.createOrthographicMatrix = /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} near
         * @param {?} far
         * @return {?}
         */
        function (left, right, bottom, top, near, far) {
            return new psgeometry.Matrix4([
                2 / (right - left), 0, 0, 0,
                0, 2 / (top - bottom), 0, 0,
                0, 0, 2 / (near - far), 0,
                (left + right) / (left - right),
                (bottom + top) / (bottom - top),
                (near + far) / (near - far),
                1,
            ]);
        };
        /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        Camera.prototype.makeFrustum = /**
         * @param {?} left
         * @param {?} right
         * @param {?} bottom
         * @param {?} top
         * @param {?} znear
         * @param {?} zfar
         * @return {?}
         */
        function (left, right, bottom, top, znear, zfar) {
            /** @type {?} */
            var X = 2 * znear / (right - left);
            /** @type {?} */
            var Y = 2 * znear / (top - bottom);
            /** @type {?} */
            var A = (right + left) / (right - left);
            /** @type {?} */
            var B = (top + bottom) / (top - bottom);
            /** @type {?} */
            var C = -(zfar + znear) / (zfar - znear);
            /** @type {?} */
            var D = -2 * zfar * znear / (zfar - znear);
            return new psgeometry.Matrix4([
                X, 0, A, 0,
                0, Y, B, 0,
                0, 0, C, D,
                0, 0, -1, 0
            ]);
        };
        return Camera;
    }());
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
    var ShadowCameraWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(ShadowCameraWebGL, _super);
        function ShadowCameraWebGL() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shadowMapWidth = 1024;
            _this.shadowMapHeight = 1024;
            return _this;
        }
        /**
         * @param {?} stage
         * @return {?}
         */
        ShadowCameraWebGL.prototype.resize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            this.projectionMatrix = this.createOrthographicMatrix(-5, 5, -5, 5, -30, 30);
            this.update(new psgeometry.Vec3(0, 10, 0), new psgeometry.Vec3(0, 0, 0), new psgeometry.Vec3(0, 0, -1));
            this.shadowFramebuffer = stage.gl.createFramebuffer();
            this.shadowDepthTexture = stage.gl.createTexture();
            this.renderBuffer = stage.gl.createRenderbuffer();
            /** @type {?} */
            var shadowTexture = new TextureAssetWebGL(stage, this.shadowDepthTexture);
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
        };
        /**
         * @param {?} bbox
         * @return {?}
         */
        ShadowCameraWebGL.prototype.updateShadowArea = /**
         * @param {?} bbox
         * @return {?}
         */
        function (bbox) {
            /** @type {?} */
            var center = bbox.center();
            /** @type {?} */
            var extents = bbox.extents();
            this.projectionMatrix = this.createOrthographicMatrix(-extents.x / 2, extents.x / 2, -extents.y / 2, extents.y / 2, -30, 30);
            this.update(new psgeometry.Vec3(center.x, 10, center.y), new psgeometry.Vec3(center.x, 0, center.y), new psgeometry.Vec3(0, 0, -1));
            this.setDirty();
        };
        /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        ShadowCameraWebGL.prototype.update = /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        function (pos, lookAt, up) {
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);
            this.setDirty();
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        ShadowCameraWebGL.prototype.beginRender = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
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
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        ShadowCameraWebGL.prototype.endRender = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
        };
        return ShadowCameraWebGL;
    }(Camera));
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
    var CameraWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(CameraWebGL, _super);
        function CameraWebGL() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.clientWidth = 1.0;
            _this.clientHeight = 1.0;
            return _this;
        }
        Object.defineProperty(CameraWebGL.prototype, "ProjectionMatrix", {
            get: /**
             * @return {?}
             */
            function () {
                return this.projectionMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CameraWebGL.prototype, "ViewMatrix", {
            get: /**
             * @return {?}
             */
            function () {
                return this.viewMatrix;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} stage
         * @return {?}
         */
        CameraWebGL.prototype.resize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
            /** @type {?} */
            var realToCSSPixels = window.devicePixelRatio || 1;
            this.clientWidth = stage.gl.canvas.clientWidth;
            this.clientHeight = stage.gl.canvas.clientHeight;
            // Lookup the size the browser is displaying the canvas in CSS pixels
            // and compute a size needed to make our drawingbuffer match it in
            // device pixels.
            /** @type {?} */
            var displayWidth = Math.floor(stage.gl.canvas.clientWidth * realToCSSPixels);
            /** @type {?} */
            var displayHeight = Math.floor(stage.gl.canvas.clientHeight * realToCSSPixels);
            // Make the canvas the same size
            stage.gl.canvas.width = displayWidth / realToCSSPixels;
            stage.gl.canvas.height = displayHeight / realToCSSPixels;
            this.projectionMatrix = this.createPerspectiveMatrix(45.0, stage.gl.canvas.clientWidth / stage.gl.canvas.clientHeight, 0.1, 200.0);
            //this.projectionMatrix = this.createOrthographicMatrix(-5, 5, -5, 5, -30, 30);
            this.inverseProjectionMatrix = this.projectionMatrix.inverse();
            //this.viewMatrix = this.createViewMatrix(new psgeometry.Vec3(0.0, 1.8, 15.0), new psgeometry.Vec3(0.0, 0.0, 0.0), new psgeometry.Vec3(0.0, 1.0, 0.0));
            this.setDirty();
        };
        /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        CameraWebGL.prototype.update = /**
         * @param {?} pos
         * @param {?} lookAt
         * @param {?} up
         * @return {?}
         */
        function (pos, lookAt, up) {
            this.currentCameraPos = pos;
            this.viewMatrix = this.createViewMatrix(pos, lookAt, up);
            this.inverseViewMatrix = this.viewMatrix.inverse();
            this.setDirty();
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        CameraWebGL.prototype.beginRender = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
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
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        CameraWebGL.prototype.endRender = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
        };
        /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        CameraWebGL.prototype.getViewRay = /**
         * @param {?} clientX
         * @param {?} clientY
         * @return {?}
         */
        function (clientX, clientY) {
            /** @type {?} */
            var cursor = new psgeometry.Vec4(clientX / this.clientWidth * 2.0 - 1.0, 1.0 - clientY / this.clientHeight * 2.0, -1.0, 1.0);
            /** @type {?} */
            var direction = (/** @type {?} */ (this.inverseProjectionMatrix.multiply(cursor)));
            direction.w = 1.0;
            /** @type {?} */
            var forward = this.inverseViewMatrix.multiply(direction);
            return new psgeometry.Line3D(this.currentCameraPos, forward);
        };
        return CameraWebGL;
    }(Camera));
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
    var ShaderProgramWebGL = /** @class */ (function () {
        function ShaderProgramWebGL() {
            this.isInitialized = false;
            this.SIZE_OF_FLOAT = 4;
        }
        Object.defineProperty(ShaderProgramWebGL.prototype, "Program", {
            get: /**
             * @return {?}
             */
            function () {
                return this.program;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        ShaderProgramWebGL.prototype.render = /**
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            if (this.isInitialized && this.beginRender(context, shaderInstance)) {
                context.Stage.applyState(context);
                this.internalRender(context, shaderInstance);
                this.endRender(context, shaderInstance);
            }
        };
        /**
         * @protected
         * @param {?} stage
         * @param {?} attribName
         * @return {?}
         */
        ShaderProgramWebGL.prototype.getAttribLocation = /**
         * @protected
         * @param {?} stage
         * @param {?} attribName
         * @return {?}
         */
        function (stage, attribName) {
            return stage.gl.getAttribLocation(this.program, attribName);
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        ShaderProgramWebGL.prototype.beginRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            context.Stage.gl.useProgram(this.program);
            return true;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        ShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        ShaderProgramWebGL.prototype.endRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
        };
        /**
         * @param {?} stage
         * @return {?}
         */
        ShaderProgramWebGL.prototype.initialize = /**
         * @param {?} stage
         * @return {?}
         */
        function (stage) {
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
        };
        /**
         * @return {?}
         */
        ShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            return '';
        };
        /**
         * @return {?}
         */
        ShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            return '';
        };
        return ShaderProgramWebGL;
    }());
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
    var OpaqueMeshShaderProgramWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(OpaqueMeshShaderProgramWebGL, _super);
        function OpaqueMeshShaderProgramWebGL() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @return {?}
         */
        OpaqueMeshShaderProgramWebGL.prototype.getStride = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.SIZE_OF_FLOAT * 9;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        OpaqueMeshShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            /** @type {?} */
            var stage = context.Stage;
            /** @type {?} */
            var bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                var bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                // draw triangles
                /** @type {?} */
                var triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        };
        /**
         * @return {?}
         */
        OpaqueMeshShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            return "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec3 aColor;\n\n                varying mediump vec4 vColor;\n\n                void main()\n                {\n                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\n                   vec3 normal = aNormal;\n                   vec4 diffuseColor = vec4(aColor, 1.0);\n                   vec4 ambientColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n                   vec3 lightDir = vec3(0.9, 0.7, 1.0);\n                   mediump float lightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);\n\n                   vColor = vec4((aColor * 0.65 + ambientColor.rgb * 0.35)*(0.7 + lightIntensity * 0.3), 1.0);\n                }";
        };
        /**
         * @return {?}
         */
        OpaqueMeshShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            return "varying mediump vec4 vColor;\n\n                void main()\n                {\n                   gl_FragColor = vColor;\n                }";
        };
        return OpaqueMeshShaderProgramWebGL;
    }(ShaderProgramWebGL));
    modelstageweb.OpaqueMeshShaderProgramWebGL = OpaqueMeshShaderProgramWebGL;
    var TransparentMeshShaderProgramWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(TransparentMeshShaderProgramWebGL, _super);
        function TransparentMeshShaderProgramWebGL() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @return {?}
         */
        TransparentMeshShaderProgramWebGL.prototype.getStride = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.SIZE_OF_FLOAT * 10;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        TransparentMeshShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            /** @type {?} */
            var stage = context.Stage;
            /** @type {?} */
            var bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                var bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
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
                var triangleCount = bufferAsset.BufferSize / this.getStride();
                stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                stage.gl.depthMask(true);
                stage.gl.disable(stage.gl.BLEND);
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        };
        /**
         * @return {?}
         */
        TransparentMeshShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            return "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec4 aColor;\n\n                varying mediump vec4 vColor;\n\n                void main()\n                {\n                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\n                   vec3 normal = aNormal;\n                   vec4 diffuseColor = aColor;\n                   vec4 ambientColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n                   vec3 lightDir = vec3(0.9, 0.7, 1.0);\n                   mediump float lightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);\n\n                   vColor = vec4((aColor.rgb * 0.65 + ambientColor.rgb * 0.35)*(0.7 + lightIntensity * 0.3), aColor.a);\n                }";
        };
        /**
         * @return {?}
         */
        TransparentMeshShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            return "varying mediump vec4 vColor;\n\n                void main()\n                {\n                   gl_FragColor = vColor;\n                }";
        };
        return TransparentMeshShaderProgramWebGL;
    }(ShaderProgramWebGL));
    modelstageweb.TransparentMeshShaderProgramWebGL = TransparentMeshShaderProgramWebGL;
    var TexturedMeshShaderProgramVariants;
    (function (TexturedMeshShaderProgramVariants) {
        TexturedMeshShaderProgramVariants[TexturedMeshShaderProgramVariants["Diffuse"] = 0] = "Diffuse";
        TexturedMeshShaderProgramVariants[TexturedMeshShaderProgramVariants["Matcap"] = 1] = "Matcap";
    })(TexturedMeshShaderProgramVariants = modelstageweb.TexturedMeshShaderProgramVariants || (modelstageweb.TexturedMeshShaderProgramVariants = {}));
    var TexturedMeshShaderProgramWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(TexturedMeshShaderProgramWebGL, _super);
        function TexturedMeshShaderProgramWebGL(variant) {
            if (variant === void 0) { variant = TexturedMeshShaderProgramVariants.Diffuse; }
            var _this = _super.call(this) || this;
            _this.variant = variant;
            return _this;
        }
        /**
         * @protected
         * @return {?}
         */
        TexturedMeshShaderProgramWebGL.prototype.getStride = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.SIZE_OF_FLOAT * 11;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        TexturedMeshShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            /** @type {?} */
            var stage = context.Stage;
            /** @type {?} */
            var bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                var bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);
                /** @type {?} */
                var textureKey = shaderInstance.getReference('TextureBuffer');
                /** @type {?} */
                var textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');
                    // draw triangles
                    /** @type {?} */
                    var triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }
                // bind with 0, so, switch back to normal pointer operation
                //stage.gl.bindBuffer(stage.gl.ELEMENT_ARRAY_BUFFER, 0);
                //stage.gl.bindBuffer(stage.gl.ARRAY_BUFFER, 0);
            }
        };
        /**
         * @return {?}
         */
        TexturedMeshShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec3 aColor;\n                attribute vec2 aTextureCoords;\n\n                varying mediump vec4 vColor;\n                varying mediump vec2 vTextureCoords;\n                varying mediump float vLightIntensity;\n\n                void main()\n                {\n                   vec4 pos = uMMatrix * vec4(aPosition, 1.0);\n                   gl_Position = uPMatrix * uVMatrix * pos;\n                   vec3 normal = normalize(uMMatrix * vec4(aNormal, 0.0)).xyz;\n\n                   vec3 lightDir = vec3(0.9, 0.7, 1.0);\n                   vLightIntensity = clamp(dot(normalize(normal), normalize(lightDir)), 0.0, 1.0);\n\n                   vColor = vec4(aColor, 1.0);\n";
            switch (this.variant) {
                case TexturedMeshShaderProgramVariants.Diffuse:
                    result +=
                        "vTextureCoords = aTextureCoords;\n";
                    break;
                case TexturedMeshShaderProgramVariants.Matcap:
                    result +=
                        "vec3 e = normalize(pos.xyz);\n\t                 vec3 r = reflect(e, (uVMatrix * vec4(normal, 0.0)).xyz);\n\t                 mediump float m = 2. * length(vec3(r.x, r.y, r.z + 1.));\n\t                 vTextureCoords = r.xy / m + .5;\n";
                    break;
            }
            result += "}";
            return result;
        };
        /**
         * @return {?}
         */
        TexturedMeshShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = "uniform sampler2D uTexture0;\n\n                varying mediump vec4 vColor;\n                varying mediump vec2 vTextureCoords;\n                varying mediump float vLightIntensity;\n\n                void main()\n                {\n            \t    mediump vec4 texColor = texture2D(uTexture0, vec2(vTextureCoords.x, 1.0 - vTextureCoords.y));\n";
            switch (this.variant) {
                case TexturedMeshShaderProgramVariants.Diffuse:
                    result +=
                        "gl_FragColor = vec4(clamp(texColor.xyz * (1.0 + .15 * vLightIntensity), 0.0, 1.0), texColor.a); \n            ";
                    break;
                case TexturedMeshShaderProgramVariants.Matcap:
                    result +=
                        "gl_FragColor = texColor.a;   \n";
                    break;
            }
            result += "}";
            return result;
        };
        return TexturedMeshShaderProgramWebGL;
    }(ShaderProgramWebGL));
    modelstageweb.TexturedMeshShaderProgramWebGL = TexturedMeshShaderProgramWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TexturedMeshShaderProgramWebGL.prototype.variant;
    }
    var ShadowTexturedMeshShaderProgramWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(ShadowTexturedMeshShaderProgramWebGL, _super);
        function ShadowTexturedMeshShaderProgramWebGL() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        ShadowTexturedMeshShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            return "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec3 aColor;\n                attribute vec2 aTextureCoords;\n\n                varying mediump float height;\n\n                void main()\n                {\n                   gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aPosition, 1.0);\n                   height = (uMMatrix * vec4(aPosition, 1.0)).y;\n                }";
        };
        /**
         * @return {?}
         */
        ShadowTexturedMeshShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            return "uniform sampler2D uTexture0;\n                varying mediump float height;\n\n\n                void main()\n                {\n                    gl_FragColor = vec4(.2, .2, .2, clamp(1.0 - (height / 3.0), 0.0, 1.0)); \n                }";
        };
        return ShadowTexturedMeshShaderProgramWebGL;
    }(TexturedMeshShaderProgramWebGL));
    modelstageweb.ShadowTexturedMeshShaderProgramWebGL = ShadowTexturedMeshShaderProgramWebGL;
    var MatCapShaderProgramWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(MatCapShaderProgramWebGL, _super);
        function MatCapShaderProgramWebGL() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @protected
         * @return {?}
         */
        MatCapShaderProgramWebGL.prototype.getStride = /**
         * @protected
         * @return {?}
         */
        function () {
            return this.SIZE_OF_FLOAT * 11;
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        MatCapShaderProgramWebGL.prototype.internalRender = /**
         * @protected
         * @param {?} context
         * @param {?} shaderInstance
         * @return {?}
         */
        function (context, shaderInstance) {
            /** @type {?} */
            var stage = context.Stage;
            /** @type {?} */
            var bufferKey = shaderInstance.getReference('IndexBuffer');
            if (bufferKey) {
                /** @type {?} */
                var bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bind(stage);
                bufferKey = shaderInstance.getReference('VertexBuffer');
                bufferAsset = stage.AssetStore.getBufferAsset(bufferKey);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aPosition'), 3, this.getStride(), 0);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aNormal'), 3, this.getStride(), 3 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aColor'), 3, this.getStride(), 6 * this.SIZE_OF_FLOAT);
                bufferAsset.bindInterleaved(stage, this.getAttribLocation(stage, 'aTextureCoords'), 2, this.getStride(), 9 * this.SIZE_OF_FLOAT);
                /** @type {?} */
                var textureKey = shaderInstance.getReference('TextureBuffer');
                /** @type {?} */
                var textureAsset = stage.AssetStore.getTextureAsset(textureKey);
                if (textureAsset) {
                    textureAsset.bind(stage, this, 'uTexture0');
                    /** @type {?} */
                    var color = context.State.get('Color', psgeometry.Vec4.One);
                    /** @type {?} */
                    var uColorLoc = stage.gl.getUniformLocation(this.program, 'uColor');
                    stage.gl.uniform4fv(uColorLoc, color.elements());
                    // draw triangles
                    /** @type {?} */
                    var triangleCount = bufferAsset.BufferSize / this.getStride();
                    stage.gl.drawElements(stage.gl.TRIANGLES, triangleCount, stage.gl.UNSIGNED_INT, 0);
                }
            }
        };
        /**
         * @return {?}
         */
        MatCapShaderProgramWebGL.prototype.getVertexShaderSrc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = "uniform mat4 uMMatrix;\n                uniform mat4 uVMatrix;\n                uniform mat4 uPMatrix;\n\n                attribute vec3 aPosition;\n                attribute vec3 aNormal;\n                attribute vec3 aColor;\n                attribute vec2 aTextureCoords;\n\n                varying mediump vec4 vColor;\n                varying mediump vec2 vTextureCoords;\n\n                void main()\n                {\n                   vec4 pos = uMMatrix * vec4(aPosition, 1.0);\n                   gl_Position = uPMatrix * uVMatrix * pos;\n                   vec3 normal = normalize(uMMatrix * vec4(aNormal, 0.0)).xyz;\n\n                   vec3 e = normalize(pos.xyz);\n\t               vec3 r = reflect(e, (uVMatrix * vec4(normal, 0.0)).xyz);\n\t               mediump float m = 2. * length(vec3(r.x, r.y, r.z + 1.));\n\t               vTextureCoords = r.xy / m + .5;\n                }";
            return result;
        };
        /**
         * @return {?}
         */
        MatCapShaderProgramWebGL.prototype.getFragmentShaderSrc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = "uniform sampler2D uTexture0;\n                uniform mediump vec4 uColor;\n\n                varying mediump vec4 vColor;\n                varying mediump vec2 vTextureCoords;\n\n                void main()\n                {\n            \t    mediump vec4 texColor = texture2D(uTexture0, vec2(vTextureCoords.x, 1.0 - vTextureCoords.y));\n                    //mediump vec3 green = vec3(0, 0.44, 0.09);\n                    //mediump vec3 green = vec3(0.69, 0.34, 0.00);  //or\n                    //mediump vec3 green = vec3(0.02, 0.31, 0.06);  // g\n                    //mediump vec3 green = vec3(0.31, 0.02, 0.06);  // r\n                    //mediump vec3 green = vec3(0.02, 0.17, 0.31);  // b\n                    mediump float colorFac = (texColor.x - texColor.y) / 0.65;\n                    mediump float whiteFac = (1.0 - colorFac) * 0.75;\n                    mediump vec3 color = vec3(whiteFac, whiteFac, whiteFac) + colorFac * uColor.rgb;\n\n                    gl_FragColor = vec4(color, texColor.a * uColor.a);   \n            }";
            return result;
        };
        return MatCapShaderProgramWebGL;
    }(ShaderProgramWebGL));
    modelstageweb.MatCapShaderProgramWebGL = MatCapShaderProgramWebGL;
    var RenderStateStack = /** @class */ (function () {
        function RenderStateStack() {
            this.modelTransform = [psgeometry.Matrix4.Identity];
            this.stack = [];
        }
        Object.defineProperty(RenderStateStack.prototype, "Top", {
            /** Top of the state stack.
              */
            get: /**
             * Top of the state stack.
             * @return {?}
             */
            function () {
                return this.stack[this.stack.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderStateStack.prototype, "CurrentModelTransform", {
            /** Determines the current model transformation.
              */
            get: /**
             * Determines the current model transformation.
             * @return {?}
             */
            function () {
                return this.modelTransform[this.modelTransform.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        /** Pushes the specified state on the state stack.
          */
        /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        RenderStateStack.prototype.pushState = /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        function (state) {
            state.Parent = this.stack.length == 0 ? null : this.Top;
            this.stack.push(state);
            if (state.contains('ModelTransform')) {
                /** @type {?} */
                var modelTransform = state.get('ModelTransform', psgeometry.Matrix4.Identity);
                this.modelTransform.push((/** @type {?} */ (this.CurrentModelTransform.multiply(modelTransform))));
            }
            else {
                this.modelTransform.push(this.CurrentModelTransform);
            }
        };
        /** Removes the top element from the state stack.
          */
        /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        RenderStateStack.prototype.popState = /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        function () {
            this.Top.Parent = null;
            this.stack.pop();
            this.modelTransform.pop();
        };
        return RenderStateStack;
    }());
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
    var /**
     * A RenderContext instance is used to pass environment data to SceneItems during the rendition process.
     *
     * Besides the Stage that the SceneItems are being rendered to, the render context is the owner of a state stack
     * that may be updated by SceneItems and that is consequently used by ShaderPrograms to set shader data and resources (like model transformation
     * and auxiliary data). As SceneItems are organized in a hierarchical way, the current state may be defined by the current SceneItem, but
     * also by previously traversed SceneItems in the scene hierarchy.
     */
    RenderContextWebGL = /** @class */ (function () {
        function RenderContextWebGL() {
            this.sceneCategory = '';
            this.stateStack = new RenderStateStack();
            this.modelTransform = null;
            this.nodeTransform = null;
            this.phase = '';
        }
        Object.defineProperty(RenderContextWebGL.prototype, "Phase", {
            get: /**
             * @return {?}
             */
            function () { return this.phase; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this.phase = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "State", {
            /** Returns the current state that is composed of previously set state values.
              */
            get: /**
             * Returns the current state that is composed of previously set state values.
             * @return {?}
             */
            function () {
                return this.stateStack.Top;
            },
            enumerable: true,
            configurable: true
        });
        /** Pushes the specified state on the state stack.
          */
        /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        RenderContextWebGL.prototype.pushState = /**
         * Pushes the specified state on the state stack.
         * @param {?} state
         * @return {?}
         */
        function (state) {
            this.stateStack.pushState(state);
        };
        /** Removes the top element from the state stack.
          */
        /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        RenderContextWebGL.prototype.popState = /**
         * Removes the top element from the state stack.
         * @return {?}
         */
        function () {
            this.stateStack.popState();
        };
        Object.defineProperty(RenderContextWebGL.prototype, "ModelTransform", {
            get: /**
             * @return {?}
             */
            function () {
                return this.stateStack.CurrentModelTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "SceneCategory", {
            /** The current scene's category.
              */
            get: /**
             * The current scene's category.
             * @return {?}
             */
            function () {
                return this.sceneCategory;
            },
            /** The current scene's category.
              */
            set: /**
             * The current scene's category.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.sceneCategory = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "Stage", {
            /** The stage the SceneItems are being rendered to.
              */
            get: /**
             * The stage the SceneItems are being rendered to.
             * @return {?}
             */
            function () {
                return this.stage;
            },
            /** The stage the SceneItems are being rendered to.
              */
            set: /**
             * The stage the SceneItems are being rendered to.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.stage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "Camera", {
            get: /**
             * @return {?}
             */
            function () {
                return this.camera;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.camera = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "ShaderProgram", {
            /** The current shader program.
              */
            get: /**
             * The current shader program.
             * @return {?}
             */
            function () {
                return this.shaderProgram;
            },
            /** The current shader program.
              */
            set: /**
             * The current shader program.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.shaderProgram = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContextWebGL.prototype, "NodeTransform", {
            get: /**
             * @return {?}
             */
            function () {
                return this.nodeTransform;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.nodeTransform = value;
            },
            enumerable: true,
            configurable: true
        });
        return RenderContextWebGL;
    }());
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
    var StageWebGL = /** @class */ (function () {
        function StageWebGL(canvasElementId) {
            var _this = this;
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
                    var ext = this.gl.getExtension('OES_element_index_uint');
                    window.addEventListener('resize', function () {
                        _this.resize();
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
        Object.defineProperty(StageWebGL.prototype, "Canvas", {
            get: /**
             * @return {?}
             */
            function () {
                return this.canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageWebGL.prototype, "Camera", {
            get: /**
             * @return {?}
             */
            function () {
                return this.camera;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageWebGL.prototype, "Tools", {
            get: /**
             * @return {?}
             */
            function () {
                return this.tools;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageWebGL.prototype, "AssetFactory", {
            get: /**
             * @return {?}
             */
            function () {
                return this.assetFactory;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageWebGL.prototype, "AssetStore", {
            get: /**
             * @return {?}
             */
            function () {
                return this.assetStore;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        StageWebGL.prototype.initialize = /**
         * @return {?}
         */
        function () {
            this.shadowCamera = new ShadowCameraWebGL();
            this.shadowCamera.resize(this);
            this.camera = new CameraWebGL();
            this.camera.resize(this);
            this.resize();
        };
        /**
         * @param {?} box
         * @return {?}
         */
        StageWebGL.prototype.updateShadowArea = /**
         * @param {?} box
         * @return {?}
         */
        function (box) {
            this.shadowCamera.updateShadowArea(box);
        };
        /**
         * @param {?} context
         * @return {?}
         */
        StageWebGL.prototype.applyState = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            /** @type {?} */
            var program = context.ShaderProgram.Program;
            /** @type {?} */
            var resultingModelTransformation = psgeometry.Matrix4.Identity;
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
            var mMatrixLoc = this.gl.getUniformLocation(program, 'uMMatrix');
            this.gl.uniformMatrix4fv(mMatrixLoc, false, resultingModelTransformation.transpose().elements);
            /** @type {?} */
            var vMatrixLoc = this.gl.getUniformLocation(program, 'uVMatrix');
            this.gl.uniformMatrix4fv(vMatrixLoc, false, context.Camera.ViewMatrix.transpose().elements);
            /** @type {?} */
            var pMatrixLoc = this.gl.getUniformLocation(program, 'uPMatrix');
            this.gl.uniformMatrix4fv(pMatrixLoc, false, context.Camera.ProjectionMatrix.transpose().elements);
        };
        /**
         * @param {?} scene
         * @return {?}
         */
        StageWebGL.prototype.render = /**
         * @param {?} scene
         * @return {?}
         */
        function (scene) {
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
        };
        /**
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        StageWebGL.prototype.registerShaderProgram = /**
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        function (shaderProgramKey, shaderProgram) {
            this.shaderPrograms[shaderProgramKey] = shaderProgram;
        };
        /**
         * @param {?} phaseKey
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        StageWebGL.prototype.registerPhaseSpecificShaderProgram = /**
         * @param {?} phaseKey
         * @param {?} shaderProgramKey
         * @param {?} shaderProgram
         * @return {?}
         */
        function (phaseKey, shaderProgramKey, shaderProgram) {
            /** @type {?} */
            var phase = this.phaseSpecificShaderPrograms[phaseKey];
            if (!phase) {
                phase = {};
                this.phaseSpecificShaderPrograms[phaseKey] = phase;
            }
            phase[shaderProgramKey] = shaderProgram;
        };
        /**
         * @param {?} context
         * @param {?} shaderProgramKey
         * @return {?}
         */
        StageWebGL.prototype.getShaderProgram = /**
         * @param {?} context
         * @param {?} shaderProgramKey
         * @return {?}
         */
        function (context, shaderProgramKey) {
            /** @type {?} */
            var result;
            if (context.phase) {
                /** @type {?} */
                var phase = this.phaseSpecificShaderPrograms[context.phase];
                if (phase) {
                    result = phase[shaderProgramKey];
                }
            }
            return result || this.shaderPrograms[shaderProgramKey];
        };
        /**
         * @private
         * @return {?}
         */
        StageWebGL.prototype.resize = /**
         * @private
         * @return {?}
         */
        function () {
            this.canvas.width = this.canvas.parentElement.offsetWidth;
            this.canvas.height = this.canvas.parentElement.offsetHeight;
            this.camera.resize(this);
        };
        return StageWebGL;
    }());
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
    var ConnectionState;
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
    var /**
     * @abstract
     */
    ServerConnection = /** @class */ (function () {
        function ServerConnection() {
            this.state = ConnectionState.Ready;
        }
        Object.defineProperty(ServerConnection.prototype, "IsConnected", {
            get: /**
             * @return {?}
             */
            function () {
                return this.state == ConnectionState.Connected;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} callback
         * @return {?}
         */
        ServerConnection.prototype.onMessage = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            this.handleMessage = callback;
        };
        /**
         * @param {?} callback
         * @return {?}
         */
        ServerConnection.prototype.onConnected = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            this.handleConnected = callback;
        };
        return ServerConnection;
    }());
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
    var SignalRServerConnection = /** @class */ (function (_super) {
        tslib_1.__extends(SignalRServerConnection, _super);
        function SignalRServerConnection() {
            var _this = _super.call(this) || this;
            _this.connection = new HubConnectionBuilder()
                .withUrl('/api/state')
                .configureLogging(LogLevel.Trace)
                //.withHubProtocol(<any>(new MessagePackHubProtocol()))
                .build();
            _this.connection.on('msg', function (data) {
                if (_this.handleMessage) {
                    /** @type {?} */
                    var msg = new MessageEvent('binary', { data: data });
                    _this.handleMessage(msg);
                }
            });
            return _this;
        }
        /**
         * @return {?}
         */
        SignalRServerConnection.prototype.connect = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.state = ConnectionState.Connecting;
            this.connection.start()
                .then(function () {
                if (_this.handleConnected) {
                    _this.state = ConnectionState.Connected;
                    _this.handleConnected(new Event('connected'));
                }
            })
                .catch(function (e) {
                _this.state = ConnectionState.Error;
            });
        };
        /**
         * @return {?}
         */
        SignalRServerConnection.prototype.disconnect = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.connection.stop()
                .then(function () {
                _this.state = ConnectionState.Ready;
            })
                .catch(function () {
                _this.state = ConnectionState.Error;
            });
        };
        /**
         * @param {?} data
         * @return {?}
         */
        SignalRServerConnection.prototype.send = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this.connection.invoke('Msg', data);
        };
        return SignalRServerConnection;
    }(ServerConnection));
    modelstageweb.SignalRServerConnection = SignalRServerConnection;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        SignalRServerConnection.prototype.connection;
    }
    var WebSocketServerConnection = /** @class */ (function (_super) {
        tslib_1.__extends(WebSocketServerConnection, _super);
        function WebSocketServerConnection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?=} url
         * @return {?}
         */
        WebSocketServerConnection.prototype.connect = /**
         * @param {?=} url
         * @return {?}
         */
        function (url) {
            var _this = this;
            if (this.state == ConnectionState.Ready || this.state == ConnectionState.Error) {
                /** @type {?} */
                var uri = url ? url : 'ws://' + window.location.host + '/api/scene';
                this.state = ConnectionState.Connecting;
                this.websocket = new WebSocket(uri);
                this.websocket.binaryType = 'arraybuffer';
                this.websocket.onopen = function (event) {
                    _this.state = ConnectionState.Connected;
                    console.log('websocket connected.');
                    if (_this.handleConnected) {
                        _this.handleConnected(event);
                    }
                };
                this.websocket.onclose = function (event) {
                    console.log('websocket closed.');
                    _this.state = ConnectionState.Ready;
                };
                this.websocket.onerror = function (event) {
                    _this.state = ConnectionState.Error;
                    console.log('websocket error.');
                };
                this.websocket.onmessage = function (event) {
                    if (_this.handleMessage) {
                        _this.handleMessage(event);
                    }
                };
            }
            else {
            }
        };
        /**
         * @return {?}
         */
        WebSocketServerConnection.prototype.disconnect = /**
         * @return {?}
         */
        function () {
            this.websocket.close();
        };
        /**
         * @param {?} data
         * @return {?}
         */
        WebSocketServerConnection.prototype.send = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this.websocket.send(data);
        };
        return WebSocketServerConnection;
    }(ServerConnection));
    modelstageweb.WebSocketServerConnection = WebSocketServerConnection;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        WebSocketServerConnection.prototype.websocket;
    }
    var Tool = /** @class */ (function () {
        function Tool() {
        }
        /**
         * @param {?} interfaceController
         * @return {?}
         */
        Tool.prototype.enter = /**
         * @param {?} interfaceController
         * @return {?}
         */
        function (interfaceController) {
            this.interfaceController = interfaceController;
        };
        /**
         * @return {?}
         */
        Tool.prototype.leave = /**
         * @return {?}
         */
        function () { };
        /**
         * @param {?} e
         * @return {?}
         */
        Tool.prototype.handleKeyUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) { return false; };
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        Tool.prototype.handleMouseMove = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) { };
        /**
         * @param {?} e
         * @return {?}
         */
        Tool.prototype.handleMouseDown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) { };
        /**
         * @param {?} e
         * @return {?}
         */
        Tool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) { };
        /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        Tool.prototype.handleDrag = /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        function (e, startX, startY, dX, dY) { };
        /**
         * @param {?} e
         * @return {?}
         */
        Tool.prototype.handleMouseWheel = /**
         * @param {?} e
         * @return {?}
         */
        function (e) { };
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        Tool.prototype.handleClick = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) { };
        return Tool;
    }());
    modelstageweb.Tool = Tool;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        Tool.prototype.interfaceController;
    }
    var InterfaceController = /** @class */ (function () {
        function InterfaceController() {
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
        InterfaceController.prototype.hasTool = /**
         * @private
         * @return {?}
         */
        function () {
            return this.tools.length > 0;
        };
        Object.defineProperty(InterfaceController.prototype, "CurrentTool", {
            get: /**
             * @return {?}
             */
            function () {
                return this.hasTool() ? this.tools[this.tools.length - 1] : null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} target
         * @return {?}
         */
        InterfaceController.prototype.bindEvents = /**
         * @param {?} target
         * @return {?}
         */
        function (target) {
            var _this = this;
            this.target = target;
            JQuery(target).on('mousewheel', function (e) {
                _this.mouseWheel(e);
            });
            JQuery(target).on('mousedown touchstart', function (e) {
                _this.mouseDown(e);
                e.preventDefault();
            });
            if (!((/** @type {?} */ (target))).setCapture) {
                JQuery(document).on('mousemove touchmove', function (e) {
                    _this.mouseMove(e);
                });
            }
            else {
                JQuery(target).on('mousemove touchmove', function (e) {
                    _this.mouseMove(e);
                });
            }
            JQuery(document).on('mouseup touchend touchcancel', function (e) {
                _this.mouseUp(e);
                e.preventDefault();
            });
            JQuery(target).on('losecapture', function (e) {
                _this.mouseUp(e);
                e.preventDefault();
            });
            JQuery(document).on('keyup', function (e) {
                if (_this.keyUp(e)) {
                    e.preventDefault();
                }
            });
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.updateLastPosition = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        };
        /**
         * @param {?} tool
         * @return {?}
         */
        InterfaceController.prototype.pushTool = /**
         * @param {?} tool
         * @return {?}
         */
        function (tool) {
            if (this.CurrentTool) {
                this.CurrentTool.leave();
            }
            this.tools.push(tool);
            tool.enter(this);
        };
        /**
         * @return {?}
         */
        InterfaceController.prototype.popTool = /**
         * @return {?}
         */
        function () {
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].leave();
                this.tools.pop();
            }
            if (this.tools.length > 0) {
                this.tools[this.tools.length - 1].enter(this);
            }
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.keyUp = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.hasTool()) {
                return this.CurrentTool.handleKeyUp(e);
            }
            else {
                return false;
            }
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.mouseDown = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.mouseMove = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.mouseUp = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var updatePosition = false;
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
        };
        /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        InterfaceController.prototype.drag = /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        function (e, dX, dY) {
            if (this.onDrag) {
                this.onDrag(e, dX, dY);
            }
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        InterfaceController.prototype.mouseWheel = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (this.hasTool() && !e.ctrlKey) {
                this.CurrentTool.handleMouseWheel(e);
            }
            else {
                if (this.onMouseWheel) {
                    this.onMouseWheel(e);
                }
                e.preventDefault();
            }
        };
        return InterfaceController;
    }());
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
    var CameraController = /** @class */ (function () {
        function CameraController(stage, camera, interfaceController, connection) {
            var _this = this;
            this.radius = 20.0;
            this.yaw = 0.0;
            this.pitch = 0.0;
            this.dragDivisor = 100.0;
            this.rotateDivisor = 200.0;
            this.stage = stage;
            this.camera = camera;
            this.connection = connection;
            interfaceController.bindEvents(JQuery(stage.Canvas));
            interfaceController.onDrag = function (e, dX, dY) {
                _this.drag(e, dX, dY);
            };
            interfaceController.onMouseWheel = function (e) {
                _this.mouseWheel(e);
            };
            interfaceController.onMove = function (e, x, y) {
                _this.move(e, x, y);
            };
            this.center = new psgeometry.Vec3(0.0, 0.0, 0.0);
            this.updateCamera();
        }
        Object.defineProperty(CameraController.prototype, "Yaw", {
            get: /**
             * @return {?}
             */
            function () {
                return this.yaw;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.yaw = value;
                this.updateCamera();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} radius
         * @param {?} pitch
         * @param {?} yaw
         * @return {?}
         */
        CameraController.prototype.construct = /**
         * @param {?} radius
         * @param {?} pitch
         * @param {?} yaw
         * @return {?}
         */
        function (radius, pitch, yaw) {
            this.radius = radius;
            this.pitch = pitch;
            this.yaw = yaw;
            this.updateCamera();
        };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        CameraController.prototype.mouseWheel = /**
         * @private
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.shiftKey) {
                /** @type {?} */
                var d = this.getViewDir().multiply(((/** @type {?} */ (e))).deltaY || ((/** @type {?} */ (e))).deltaX);
                this.center = this.center.sub(d);
            }
            else {
                this.radius += ((/** @type {?} */ (e))).deltaY * Math.log(this.radius + 1) / 2;
                this.radius = Math.max(0.01, this.radius);
            }
            this.updateCamera();
        };
        /**
         * @private
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        CameraController.prototype.move = /**
         * @private
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) {
        };
        /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        CameraController.prototype.drag = /**
         * @private
         * @param {?} e
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        function (e, dX, dY) {
            if (e.shiftKey) {
                /** @type {?} */
                var x = this.getViewPlaneX();
                /** @type {?} */
                var y = this.getViewPlaneY();
                this.center = this.center
                    .add(x.multiply(dX / this.dragDivisor))
                    .add(y.multiply(dY / this.dragDivisor));
            }
            else {
                this.yaw -= dX / this.rotateDivisor;
                this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch - dY / this.rotateDivisor));
            }
            this.updateCamera();
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.getViewPlaneX = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var q;
            /** @type {?} */
            var r;
            /** @type {?} */
            var v;
            v = new psgeometry.Vec3(-1.0, 0.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.getViewPlaneY = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var q;
            /** @type {?} */
            var r;
            /** @type {?} */
            var v;
            v = new psgeometry.Vec3(0.0, 1.0, 0.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.getViewDir = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var q;
            /** @type {?} */
            var r;
            /** @type {?} */
            var v;
            v = new psgeometry.Vec3(0.0, 0.0, -1.0);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v; //.add(this.center);
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.getCameraPos = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var q;
            /** @type {?} */
            var r;
            /** @type {?} */
            var v;
            v = new psgeometry.Vec3(0.0, 0.0, this.radius);
            q = new psgeometry.Quaternion();
            r = new psgeometry.Quaternion();
            q.setFromAxisAngle(new psgeometry.Vec3(0.0, 1.0, 0.0), this.yaw);
            r.setFromAxisAngle(new psgeometry.Vec3(1.0, 0.0, 0.0), this.pitch);
            v = v.applyQuaternion(r);
            v = v.applyQuaternion(q);
            return v.add(this.center);
        };
        /**
         * @private
         * @return {?}
         */
        CameraController.prototype.updateCamera = /**
         * @private
         * @return {?}
         */
        function () {
            this.camera.update(this.getCameraPos(), this.center, new psgeometry.Vec3(0.0, 1.0, 0.0));
        };
        return CameraController;
    }());
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
    var CommonMessageTypes = /** @class */ (function () {
        function CommonMessageTypes() {
        }
        CommonMessageTypes.AppStateDelta = 0x0100;
        CommonMessageTypes.ServerHandshake = 0x0101;
        CommonMessageTypes.ClientHandshake = 0x0102;
        CommonMessageTypes.ClientConfirmation = 0x0103;
        CommonMessageTypes.AppStateInitialization = 0x104;
        CommonMessageTypes.AnchorRequest = 0x01fe;
        CommonMessageTypes.SharedAnchor = 0x01ff;
        return CommonMessageTypes;
    }());
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
    var NetworkChannelMessage = /** @class */ (function () {
        function NetworkChannelMessage() {
            this.messageType = CommonMessageTypes.AppStateDelta;
        }
        Object.defineProperty(NetworkChannelMessage.prototype, "Content", {
            get: /**
             * @return {?}
             */
            function () {
                return this.content;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkChannelMessage.prototype, "MessageType", {
            get: /**
             * @return {?}
             */
            function () {
                return this.messageType;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} buffer
         * @return {?}
         */
        NetworkChannelMessage.FromBuffer = /**
         * @param {?} buffer
         * @return {?}
         */
        function (buffer) {
            /** @type {?} */
            var result = new NetworkChannelMessage();
            result.content = buffer;
            return result;
        };
        Object.defineProperty(NetworkChannelMessage.prototype, "HasPayload", {
            get: /**
             * @return {?}
             */
            function () {
                return this.content.byteLength > NetworkChannelMessage.HeaderSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkChannelMessage.prototype, "PayloadSize", {
            get: /**
             * @return {?}
             */
            function () {
                return this.content.byteLength - NetworkChannelMessage.HeaderSize;
            },
            enumerable: true,
            configurable: true
        });
        NetworkChannelMessage.HeaderSize = 8;
        return NetworkChannelMessage;
    }());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXgtY29tbW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVsc3RhZ2UvIiwic291cmNlcyI6WyJzcmMvbXgtY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBaUIsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFaEYsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE1BQU0sS0FBUSxhQUFhLENBcW5HMUI7QUFybkdELFdBQWMsYUFBYTs7OztJQUV2QixTQUFnQixNQUFNOztZQUVkLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQUssTUFBTSxFQUFBLENBQUMsQ0FBQyxRQUFRO1FBRXBELE9BQU8sQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQU07WUFDcEUsT0FBQSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQTdFLENBQTZFLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBTmUsb0JBQU0sU0FNckIsQ0FBQTtJQUVEO1FBSUksb0JBQVksS0FBaUI7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQzs7Ozs7O1FBRU0saUNBQVk7Ozs7O1FBQW5CLFVBQW9CLFVBQWtCLEVBQUUsWUFBb0I7O2dCQUNwRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMs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Q0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQ3RFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFYixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUN0RSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRWIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDdEUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFD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Q0FBQyxDQUFDO1lBRW5DLElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDMUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDbEIsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDbEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNoQjtRQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFFTSxxQ0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQWQsVUFBZSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUNyRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUMxRCxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUMxRCxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUMxRCxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxRQUFrQjtZQUVuRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQzFCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQ2xCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQ2xCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDMUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFF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QUEwQnBDLENBQUMsRUFybkdhLGFBQWEsS0FBYixhQUFhLFFBcW5HMUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gTW9kZWxTdGFnZSDCqSAyMDE4IFBsYW5zeXN0ZW1lIEdtYkgsIEhhbWJ1cmcsIEdlcm1hbnkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQgeyBwc2dlb21ldHJ5IH0gZnJvbSAnLi9wcy1nZW9tZXRyeSc7XHJcbmltcG9ydCB7IEh1YkNvbm5lY3Rpb25CdWlsZGVyLCBMb2dMZXZlbCwgSHViQ29ubmVjdGlvbiB9IGZyb20gJ0Bhc3BuZXQvc2lnbmFscic7XHJcbi8vaW1wb3J0IHsgTWVzc2FnZVBhY2tIdWJQcm90b2NvbCB9IGZyb20gJ0Bhc3BuZXQvc2lnbmFsci1wcm90b2NvbC1tc2dwYWNrJztcclxuaW1wb3J0IEpRdWVyeSBmcm9tICdqcXVlcnknO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBtb2RlbHN0YWdld2ViIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdXVpZHY0KCk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIGxldCBjcnlwdG8gPSB3aW5kb3cuY3J5cHRvIHx8ICg8YW55PndpbmRvdykubXNDcnlwdG87XHJcblxyXG4gICAgICAgIHJldHVybiAoJycgKyAxZTcgKyAtMWUzICsgLTRlMyArIC04ZTMgKyAtMWUxMSkucmVwbGFjZSgvWzAxOF0vZywgKGM6IGFueSkgPT5cclxuICAgICAgICAgICAgKGMgXiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmIDE1ID4+IGMgLyA0KS50b1N0cmluZygxNikpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUb29sc1dlYkdMIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGFnZTogU3RhZ2VXZWJHTDtcclxuICAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVNoYWRlcihzaGFkZXJUeXBlOiBHTGVudW0sIHNoYWRlclNvdXJjZTogc3RyaW5nKTogV2ViR0xTaGFkZXIge1xyXG4gICAgICAgICAgICBsZXQgc2hhZGVyID0gdGhpcy5zdGFnZS5nbC5jcmVhdGVTaGFkZXIoc2hhZGVyVHlwZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNoYWRlclNvdXJjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGFnZS5nbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNoYWRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEJsb2NrU3RyZWFtQmxvY2tEZXNjcmlwdG9yIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBibG9ja1R5cGU6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtYWpvclZlcnNpb246IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtaW5vclZlcnNpb246IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmbGFnczogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIHBheWxvYWRCeXRlczogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEJsb2NrVHlwZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmxvY2tUeXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBCbG9ja1R5cGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmJsb2NrVHlwZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBNYWpvclZlcnNpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1ham9yVmVyc2lvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgTWFqb3JWZXJzaW9uKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5tYWpvclZlcnNpb24gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTWlub3JWZXJzaW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5taW5vclZlcnNpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IE1pbm9yVmVyc2lvbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWlub3JWZXJzaW9uID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEZsYWdzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mbGFncztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgRmxhZ3ModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmZsYWdzID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFBheWxvYWRCeXRlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGF5bG9hZEJ5dGVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBQYXlsb2FkQnl0ZXModmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnBheWxvYWRCeXRlcyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZW51bSBCbG9ja1N0cmVhbVJlYWRlclN0YXRlcyB7XHJcbiAgICAgICAgRklMRV9IRUFERVJfRVhQRUNURUQgPSAwLFxyXG4gICAgICAgIEJMT0NLX0RFU0NSSVBUT1JfRVhQRUNURUQgPSAxLFxyXG4gICAgICAgIFBBWUxPQURfRVhQRUNURUQgPSAyXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEJsb2NrU3RyZWFtUmVhZGVyIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhcnJheUJ1ZmZlcjogQXJyYXlCdWZmZXIgPSBudWxsO1xyXG5cclxuICAgICAgICBwcml2YXRlIGJ5dGVBcnJheTogVWludDhBcnJheSA9IG51bGw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFBvczogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50QmxvY2tEZXNjcmlwdG9yOiBCbG9ja1N0cmVhbUJsb2NrRGVzY3JpcHRvcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBibG9ja0VuZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpc0NvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmF0YWxFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRlOiBCbG9ja1N0cmVhbVJlYWRlclN0YXRlcyA9IEJsb2NrU3RyZWFtUmVhZGVyU3RhdGVzLkZJTEVfSEVBREVSX0VYUEVDVEVEO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1cnJlbnRCbG9ja0Rlc2NyaXB0b3IoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRCbG9ja0Rlc2NyaXB0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEZhdGFsRXJyb3IoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhdGFsRXJyb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihidWZmZXI6IEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYXNzdXJlRmlsZUhlYWRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbWFpbmluZ0J5dGVzSW5CbG9jaygpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ibG9ja0VuZCAtIHRoaXMuY3VycmVudFBvcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhc3N1cmVSZW1haW5pbmdCeXRlc0luQmxvY2soY291bnQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UG9zICsgY291bnQgPD0gdGhpcy5ibG9ja0VuZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkQnl0ZXMoY291bnQ6IG51bWJlcik6IEFycmF5QnVmZmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheUJ1ZmZlci5zbGljZSh0aGlzLmN1cnJlbnRQb3MsIHRoaXMuY3VycmVudFBvcyArIGNvdW50KTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdHJ5UmVhZEludDE2KGxhbWJkYTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuYXNzdXJlUmVtYWluaW5nQnl0ZXNJbkJsb2NrKDIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhKHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogMjU2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB0cnlSZWFkRmxvYXQobGFtYmRhOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlc0luQmxvY2soNCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmID0gbmV3IEFycmF5QnVmZmVyKDQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMCwgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMSwgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMiwgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMywgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2xldCB2aWV3ID0gbmV3IERhdGFWaWV3KHRoaXMuYnl0ZUFycmF5LmJ1ZmZlciwgdGhpcy5jdXJyZW50UG9zLCA0KTtcclxuICAgICAgICAgICAgICAgIGxhbWJkYSh2aWV3LmdldEZsb2F0MzIoMCwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmN1cnJlbnRQb3MgKz0gNDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB0cnlSZWFkSW50KGxhbWJkYTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuYXNzdXJlUmVtYWluaW5nQnl0ZXNJbkJsb2NrKDQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhKHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogMjU2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiA2NTUzNiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogMTY3NzcyMTYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHRyeVJlYWRJbnQ2NChsYW1iZGE6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzSW5CbG9jayg4KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGxhbWJkYSh0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDI1NiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogNjU1MzYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDE2Nzc3MjE2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiA0Mjk0OTY3Mjk2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiAxMDk5NTExNjI3Nzc2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiAyODE0NzQ5NzY3MTA2NTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDcyMDU3NTk0MDM3OTI3OTM2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB0cnlSZWFkU3RyaW5nKGxhbWJkYTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMudHJ5UmVhZEludCgoc3RyaW5nTGVuZ3RoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzSW5CbG9jayhzdHJpbmdMZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHN0cmluZ0xlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGFtYmRhKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZFN0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgdGhpcy50cnlSZWFkU3RyaW5nKCh2YWx1ZSkgPT4geyByZXN1bHQgPSB2YWx1ZTsgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVhZE1hdHJpeDQoKTogcHNnZW9tZXRyeS5NYXRyaXg0IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBwc2dlb21ldHJ5Lk1hdHJpeDQoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyeVJlYWRGbG9hdCgodmFsKSA9PiB7IHJlc3VsdC5lbGVtZW50c1tpXSA9IHZhbDsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50cmFuc3Bvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuYWxSZWFkU3RyaW5nKHN0YXJ0UG9zOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5ieXRlQXJyYXlbc3RhcnRQb3MgKyBpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuYWxSZWFkSW50KHN0YXJ0UG9zOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ieXRlQXJyYXlbc3RhcnRQb3NdICtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3N0YXJ0UG9zICsgMV0gKiAyNTYgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbc3RhcnRQb3MgKyAyXSAqIDY1NTM2ICtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3N0YXJ0UG9zICsgM10gKiAxNjc3NzIxNjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYXNzdXJlRmlsZUhlYWRlcigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYnl0ZUFycmF5LmJ5dGVMZW5ndGggPj0gOCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnl0ZUFycmF5WzBdID09IDB4NzAgJiYgLy8gPVwicHNibHN0cjFcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5WzFdID09IDB4NzMgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVsyXSA9PSAweDYyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbM10gPT0gMHg2QyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5WzRdID09IDB4NzMgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVs1XSA9PSAweDc0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbNl0gPT0gMHg3MiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5WzddID09IDB4MzEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQb3MgKz0gODtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQmxvY2tTdHJlYW1SZWFkZXJTdGF0ZXMuQkxPQ0tfREVTQ1JJUFRPUl9FWFBFQ1RFRDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXRhbEVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmF0YWxFcnJvciA9IHRoaXMuaXNDb21wbGV0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudGVyQmxvY2soKTogeyBzdWNjZXNzOiBib29sZWFuLCBkZXNjcmlwdG9yOiBCbG9ja1N0cmVhbUJsb2NrRGVzY3JpcHRvciB9IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogeyBzdWNjZXNzOiBib29sZWFuLCBkZXNjcmlwdG9yOiBCbG9ja1N0cmVhbUJsb2NrRGVzY3JpcHRvciB9ID0geyBzdWNjZXNzOiBmYWxzZSwgZGVzY3JpcHRvcjogbnVsbCB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYnl0ZUFycmF5LmJ5dGVMZW5ndGggPj0gdGhpcy5jdXJyZW50UG9zICsgNSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvc10gPT0gMHg3MCAmJiAvLyA9IFwicHNibFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zICsgMV0gPT0gMHg3MyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcyArIDJdID09IDB4NjIgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MgKyAzXSA9PSAweDZDKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrVHlwZUxlbmd0aCA9IHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcyArIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ5dGVBcnJheS5ieXRlTGVuZ3RoID49IHRoaXMuY3VycmVudFBvcyArIDUgKyBibG9ja1R5cGVMZW5ndGggKyA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlYWQgdGhlIGRlc2NyaXB0b3IgZnJvbSBzdHJlYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlc2NyaXB0b3IgPSBuZXcgQmxvY2tTdHJlYW1CbG9ja0Rlc2NyaXB0b3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlc2NyaXB0b3IuQmxvY2tUeXBlID0gdGhpcy5pbnRlcm5hbFJlYWRTdHJpbmcodGhpcy5jdXJyZW50UG9zICsgNSwgYmxvY2tUeXBlTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlc2NyaXB0b3IuTWFqb3JWZXJzaW9uID0gdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zICsgNSArIGJsb2NrVHlwZUxlbmd0aF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kZXNjcmlwdG9yLk1pbm9yVmVyc2lvbiA9IHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcyArIDUgKyBibG9ja1R5cGVMZW5ndGggKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlc2NyaXB0b3IuRmxhZ3MgPSB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MgKyA1ICsgYmxvY2tUeXBlTGVuZ3RoICsgMl0gKiAyNTYgKyB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MgKyA1ICsgYmxvY2tUeXBlTGVuZ3RoICsgM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kZXNjcmlwdG9yLlBheWxvYWRCeXRlcyA9IHRoaXMuaW50ZXJuYWxSZWFkSW50KHRoaXMuY3VycmVudFBvcyArIDUgKyBibG9ja1R5cGVMZW5ndGggKyA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEJsb2NrU3RyZWFtUmVhZGVyU3RhdGVzLlBBWUxPQURfRVhQRUNURUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBvcyArPSA1ICsgYmxvY2tUeXBlTGVuZ3RoICsgODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja0VuZCA9IHRoaXMuY3VycmVudFBvcyArIHJlc3VsdC5kZXNjcmlwdG9yLlBheWxvYWRCeXRlcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrRGVzY3JpcHRvciA9IHJlc3VsdC5kZXNjcmlwdG9yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZXJlIGFyZSB0b28gZmV3IGJ5dGVzIHRvIG1ha2UgYSBmdWxsIGJsb2NrIGRlc2NyaXB0b3IsIGJ1dCB0aGUgc3RyZWFtIGlzIGNvbXBsZXRlbHkgcmVhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdGFsRXJyb3IgPSB0aGlzLmlzQ29tcGxldGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBubyB2YWxpZCBibG9jayBoZWFkZXIgZm91bmRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdGFsRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgYXJlIHRvbyBmZXcgYnl0ZXMgdG8gbWFrZSBhIGJsb2NrIGhlYWRlciwgYnV0IHRoZSBzdHJlYW0gaXMgY29tcGxldGVseSByZWFkIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5mYXRhbEVycm9yID0gdGhpcy5pc0NvbXBsZXRlICYmICh0aGlzLmJ5dGVBcnJheS5ieXRlTGVuZ3RoID4gdGhpcy5jdXJyZW50UG9zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBsZWF2ZUJsb2NrKCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQb3MgPSB0aGlzLmJsb2NrRW5kO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQmxvY2tTdHJlYW1SZWFkZXJTdGF0ZXMuQkxPQ0tfREVTQ1JJUFRPUl9FWFBFQ1RFRDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNoYWRlckluc3RhbmNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFkZXJLZXk6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWZlcmVuY2VzOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmaWd1cmVJRDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEZpZ3VyZUlEKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWd1cmVJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgRmlndXJlSUQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmZpZ3VyZUlEID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNoYWRlcktleSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhZGVyS2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBTaGFkZXJLZXkodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRlcktleSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFJlZmVyZW5jZShrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcmVuY2VzW2tleV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzaGFkZXJLZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRlcktleSA9IHNoYWRlcktleTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3QocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlcikge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFJlZmVyZW5jZShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmVyZW5jZXNba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWVzaFNoYWRlckluc3RhbmNlIGV4dGVuZHMgU2hhZGVySW5zdGFuY2Uge1xyXG5cclxuICAgICAgICBTSVpFX09GX0ZMT0FUID0gNDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJ1ZmZlcklEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBwcmlvcml0eTogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzaGFkZXJLZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihzaGFkZXJLZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdChyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICghcmVhZGVyLnRyeVJlYWRTdHJpbmcoKGlkKSA9PiB7IHRoaXMuYnVmZmVySUQgPSBpZDsgfSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVySUQgPSAnX2RlZmF1bHQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcmVhZGVyLnRyeVJlYWRJbnQxNigocHJpb3JpdHkpID0+IHsgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5OyB9KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRTdHJpZGUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuU2hhZGVyS2V5ID09ICdUcmFuc3BhcmVudE1lc2hTaGFkZXInID8gMTAgKiB0aGlzLlNJWkVfT0ZfRkxPQVQgOiA5ICogdGhpcy5TSVpFX09GX0ZMT0FUO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRleHR1cmVkTWVzaFNoYWRlckluc3RhbmNlIGV4dGVuZHMgTWVzaFNoYWRlckluc3RhbmNlIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHRleHR1cmVJRDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFRleHR1cmVJRCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dHVyZUlEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc2hhZGVyS2V5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3VwZXIoc2hhZGVyS2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3QocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlcikge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVhZGVyLnRyeVJlYWRTdHJpbmcoKHRleHR1cmVJRCkgPT4geyB0aGlzLnRleHR1cmVJRCA9IHRleHR1cmVJRDsgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJlZmVyZW5jZSgnVGV4dHVyZUJ1ZmZlcicsIHRoaXMudGV4dHVyZUlEKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdXBlci5jb25zdHJ1Y3QocmVhZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFN0cmlkZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gMTEgKiB0aGlzLlNJWkVfT0ZfRkxPQVQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBTaGFkZXJJbnN0YW5jZUZyb21SZWFkZXIocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlcik6IFNoYWRlckluc3RhbmNlIHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBTaGFkZXJJbnN0YW5jZSA9IG51bGw7XHJcblxyXG4gICAgICAgIGxldCBzaGFkZXJLZXk7XHJcbiAgICAgICAgaWYgKHJlYWRlci50cnlSZWFkU3RyaW5nKChrZXkpID0+IHsgc2hhZGVyS2V5ID0ga2V5OyB9KSkge1xyXG4gICAgICAgICAgICBpZiAoc2hhZGVyS2V5ID09ICdPcGFxdWVNZXNoU2hhZGVyJyB8fCBzaGFkZXJLZXkgPT0gJ1RyYW5zcGFyZW50TWVzaFNoYWRlcicpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBNZXNoU2hhZGVySW5zdGFuY2Uoc2hhZGVyS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzaGFkZXJLZXkgPT0gJ1RleHR1cmVkTWVzaFNoYWRlcicpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBUZXh0dXJlZE1lc2hTaGFkZXJJbnN0YW5jZShzaGFkZXJLZXkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuY29uc3RydWN0KHJlYWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1lc2gzRExpYiB7XHJcbiAgICAgICAgcHJpdmF0ZSByb290Tm9kZTogTm9kZUFzc2V0O1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBvYmplY3ROYW1lUHJlZml4OiBzdHJpbmcpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRSb290Tm9kZShyb290Tm9kZTogTm9kZUFzc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdE5vZGUgPSByb290Tm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXROb2RlRnJvbVBhdGgocGF0aDogc3RyaW5nKTogTm9kZUFzc2V0IHtcclxuICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09IDAgfHwgIXRoaXMucm9vdE5vZGUgfHwgdGhpcy5yb290Tm9kZS5OYW1lID09IHBhdGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3ROb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdE5vZGUuZ2V0Q2hpbGROb2RlRnJvbVBhdGgocGF0aC5zdWJzdHIodGhpcy5yb290Tm9kZS5OYW1lLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQXNzZXRGYWN0b3J5V2ViR0wge1xyXG5cclxuICAgICAgICBwcml2YXRlIGxhc3RQZXJjZW50YWdlID0gLTE7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhZ2U6IFN0YWdlV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3VycmVudEZpZ3VyZTogRmlndXJlV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50U2NlbmVNZXNoM0RMaWI6IE1lc2gzRExpYjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZUZpZ3VyZShyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEZpZ3VyZSA9IG5ldyBGaWd1cmVXZWJHTChyZWFkZXIucmVhZFN0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTY2VuZU1lc2gzRExpYikge1xyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnRyeVJlYWRTdHJpbmcoKG5vZGVQYXRoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlndXJlLk5vZGUgPSB0aGlzLmN1cnJlbnRTY2VuZU1lc2gzRExpYi5nZXROb2RlRnJvbVBhdGgobm9kZVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBhc3NldFN0b3JlLmFkZEZpZ3VyZSh0aGlzLmN1cnJlbnRGaWd1cmUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVNZXNoKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIHN0YWdlOiBTdGFnZVdlYkdMLCBhc3NldFN0b3JlOiBBc3NldFN0b3JlV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2hhZGVySW5zdGFuY2UgPSBTaGFkZXJJbnN0YW5jZUZyb21SZWFkZXIocmVhZGVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZSAmJiB0aGlzLmN1cnJlbnRGaWd1cmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEZpZ3VyZS5hZGRTaGFkZXJJbnN0YW5jZSh0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZU1lc2hCdWZmZXIocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgYnVmZmVyQXNzZXQgPSBuZXcgQnVmZmVyQXNzZXRXZWJHTChyZWFkZXIsICdWZXJ0ZXhCdWZmZXInLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50SUQ6IHN0cmluZyA9IGJ1ZmZlckFzc2V0LkJ1ZmZlcklEO1xyXG4gICAgICAgICAgICBsZXQgY291bnRlciA9IDE7XHJcbiAgICAgICAgICAgIHdoaWxlIChhc3NldFN0b3JlLmdldEJ1ZmZlckFzc2V0KGN1cnJlbnRJRCkpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJRCA9IGJ1ZmZlckFzc2V0LkJ1ZmZlcklEICsgY291bnRlcisrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmZlckFzc2V0LkJ1ZmZlcklEID0gY3VycmVudElEO1xyXG4gICAgICAgICAgICBhc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KGN1cnJlbnRJRCwgYnVmZmVyQXNzZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNoYWRlckluc3RhbmNlICYmIHRoaXMuY3VycmVudEZpZ3VyZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gZXh0cmFjdCB0cmlhbmdsZXMgZnJvbSB2ZXJ0ZXggYnVmZmVyLCB0aGlzIGluZm9ybWF0aW9uIGlzIHVzZWQgYnkgT2N0cmVlIHRvIGRldGVybWluZSB0cmlhbmdsZSBkYXRhIGZyb20gdHJpYW5nbGUgaW5kaWNlcyBzdG9yZWQgaW4gT2N0cmVlIGRhdGEgc3RydWN0dXJlLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jdXJyZW50U2hhZGVySW5zdGFuY2UucHVzaFRyaWFuZ2xlcyh0aGlzLmN1cnJlbnRGaWd1cmUuZ2V0VHJpYW5nbGVzKCksIGJ1ZmZlckFzc2V0LmdldEJ1ZmZlckRhdGEoKSwgYnVmZmVyQXNzZXQuZ2V0QnVmZmVyU2l6ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnVmZmVyQXNzZXQuaW5pdGlhbGl6ZShzdGFnZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2hhZGVySW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNoYWRlckluc3RhbmNlLmFkZFJlZmVyZW5jZSgnVmVydGV4QnVmZmVyJywgYnVmZmVyQXNzZXQuQnVmZmVySUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTWVzaEluZGljZXNCdWZmZXIocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgYnVmZmVyQXNzZXQgPSBuZXcgQnVmZmVyQXNzZXRXZWJHTChyZWFkZXIsICdJbmRleEJ1ZmZlcicsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudElEID0gYnVmZmVyQXNzZXQuQnVmZmVySUQ7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gMTtcclxuICAgICAgICAgICAgd2hpbGUgKGFzc2V0U3RvcmUuZ2V0QnVmZmVyQXNzZXQoY3VycmVudElEKSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudElEID0gYnVmZmVyQXNzZXQuQnVmZmVySUQgKyBjb3VudGVyKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZmVyQXNzZXQuQnVmZmVySUQgPSBjdXJyZW50SUQ7XHJcbiAgICAgICAgICAgIGFzc2V0U3RvcmUuYWRkQnVmZmVyQXNzZXQoY3VycmVudElELCBidWZmZXJBc3NldCk7XHJcblxyXG4gICAgICAgICAgICBidWZmZXJBc3NldC5pbml0aWFsaXplKHN0YWdlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdJbmRleEJ1ZmZlcicsIGJ1ZmZlckFzc2V0LkJ1ZmZlcklEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZVRleHR1cmUocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCwgZGVmZXJyZWRzOiBBcnJheTxKUXVlcnkuRGVmZXJyZWQ8Ym9vbGVhbj4+KSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlTmFtZTogc3RyaW5nOyBcclxuICAgICAgICAgICAgbGV0IHBpeGVsRGF0YVNpemU7XHJcbiAgICAgICAgICAgIGlmIChyZWFkZXIudHJ5UmVhZFN0cmluZygodmFsdWUpID0+IHsgdGV4dHVyZU5hbWUgPSB2YWx1ZTsgfSkgJiYgcmVhZGVyLnRyeVJlYWRJbnQ2NCgodmFsdWUpID0+IHsgcGl4ZWxEYXRhU2l6ZSA9IHZhbHVlOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlRGF0YSA9IHJlYWRlci5yZWFkQnl0ZXMocGl4ZWxEYXRhU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXh0ZW5zaW9uID0gdGV4dHVyZU5hbWUuc3Vic3RyKHRleHR1cmVOYW1lLmxhc3RJbmRleE9mKCcuJykpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VUeXBlID0gJ2pwZWcnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbiA9PSAnLnBuZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZVR5cGUgPSAncG5nJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBibG9iID0gbmV3IEJsb2IoW2ltYWdlRGF0YV0sIHsgJ3R5cGUnOiAnaW1hZ2UvJyArIGltYWdlVHlwZSB9KTtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmVycmVkID0gSlF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZHMucHVzaChkZWZlcnJlZCk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZFRleHR1cmVBc3NldCh0ZXh0dXJlTmFtZSwgbmV3IFRleHR1cmVBc3NldFdlYkdMKHRoaXMuc3RhZ2UsIGltYWdlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2Uub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwcm9jZXNzaW5nIHRleHR1cmUgYmxvYiAnICsgdGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlT2N0cmVlKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIHN0YWdlOiBTdGFnZVdlYkdMLCBhc3NldFN0b3JlOiBBc3NldFN0b3JlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlndXJlLnNldEludGVyc2VjdG9yKE9jdHJlZS5DcmVhdGVGcm9tQmxvY2tTdHJlYW0ocmVhZGVyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2NlbmUocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZU1lc2gzRExpYiA9IG5ldyBNZXNoM0RMaWIocmVhZGVyLnJlYWRTdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlUm9vdE5vZGUocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2NlbmVNZXNoM0RMaWIpIHtcclxuICAgICAgICAgICAgICAgIGxldCByb290Tm9kZSA9IE5vZGVBc3NldC5Gcm9tQmxvY2tTdHJlYW0ocmVhZGVyLCB0aGlzLmN1cnJlbnRTY2VuZU1lc2gzRExpYik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZU1lc2gzRExpYi5zZXRSb290Tm9kZShyb290Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0U3RvcmUuYWRkUm9vdE5vZGUocm9vdE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHByb2Nlc3NCbG9jayhibG9ja1R5cGU6IHN0cmluZywgcmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCwgZGVmZXJyZWRzOiBBcnJheTxKUXVlcnkuRGVmZXJyZWQ8Ym9vbGVhbj4+KSB7XHJcbiAgICAgICAgICAgIGlmIChibG9ja1R5cGUgPT0gJ1BTU2NlbmUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKHJlYWRlciwgc3RhZ2UsIGFzc2V0U3RvcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrVHlwZSA9PSAnUFNGaWd1cmUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZpZ3VyZShyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChibG9ja1R5cGUgPT0gJ1BTTWVzaCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVzaChyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChibG9ja1R5cGUgPT0gJ1BTTWVzaERhdGEnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1lc2hCdWZmZXIocmVhZGVyLCBzdGFnZSwgYXNzZXRTdG9yZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYmxvY2tUeXBlID09ICdQU01lc2hJbmRpY2VzJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNZXNoSW5kaWNlc0J1ZmZlcihyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChibG9ja1R5cGUgPT0gJ1BTVGV4dHVyZScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVGV4dHVyZShyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlLCBkZWZlcnJlZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrVHlwZSA9PSAnUFNNZXNoT2N0cmVlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPY3RyZWUocmVhZGVyLCBzdGFnZSwgYXNzZXRTdG9yZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYmxvY2tUeXBlID09ICdQU1Jvb3ROb2RlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVSb290Tm9kZShyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9hZEZyb21BcnJheUJ1ZmZlcihidWZmZXI6IEFycmF5QnVmZmVyKTogSlF1ZXJ5LkRlZmVycmVkPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVkczogQXJyYXk8SlF1ZXJ5LkRlZmVycmVkPGJvb2xlYW4+PiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFzc2V0U3RvcmUgPSB0aGlzLnN0YWdlLkFzc2V0U3RvcmU7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciA9IG5ldyBCbG9ja1N0cmVhbVJlYWRlcihidWZmZXIpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHJlYWRlci5lbnRlckJsb2NrKCk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NCbG9jayhyZXMuZGVzY3JpcHRvci5CbG9ja1R5cGUsIHJlYWRlciwgdGhpcy5zdGFnZSwgYXNzZXRTdG9yZSwgZGVmZXJyZWRzKTtcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIubGVhdmVCbG9jaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IHJlYWRlci5lbnRlckJsb2NrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gSlF1ZXJ5LndoZW4uYXBwbHkoSlF1ZXJ5LCBkZWZlcnJlZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEZyb21VcmwodXJsOiBzdHJpbmcpOiBKUXVlcnkuRGVmZXJyZWQ8Qm9vbGVhbj4ge1xyXG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQ6IEpRdWVyeS5EZWZlcnJlZDxCb29sZWFuPiA9IEpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcTogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xyXG4gICAgICAgICAgICByZXEucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuXHJcbiAgICAgICAgICAgIHJlcS5vbmxvYWQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEZyb21BcnJheUJ1ZmZlcig8QXJyYXlCdWZmZXI+cmVxLnJlc3BvbnNlKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXEub25lcnJvciA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcS5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIChvRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvRXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50Q29tcGxldGUgPSBvRXZlbnQubG9hZGVkIC8gb0V2ZW50LnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RQZXJjZW50YWdlICE9IE1hdGguZmxvb3IocGVyY2VudENvbXBsZXRlICogMTAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RQZXJjZW50YWdlID0gTWF0aC5mbG9vcihwZXJjZW50Q29tcGxldGUgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5ub3RpZnkoTWF0aC5yb3VuZChwZXJjZW50Q29tcGxldGUgKiAxMDApKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVuYWJsZSB0byBjb21wdXRlIHByb2dyZXNzIGluZm9ybWF0aW9uIHNpbmNlIHRoZSB0b3RhbCBzaXplIGlzIHVua25vd25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXEuc2VuZChudWxsKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSW50ZXJzZWN0b3Ige1xyXG4gICAgICAgIGdldEJvdW5kaW5nQm94KCk6IHBzZ2VvbWV0cnkuQUFCQjNEO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBCb3VuZGluZ0JveEludGVyc2VjdG9yIGltcGxlbWVudHMgSW50ZXJzZWN0b3Ige1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYm91bmRpbmdCb3g6IHBzZ2VvbWV0cnkuQUFCQjNEKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Qm91bmRpbmdCb3goKTogcHNnZW9tZXRyeS5BQUJCM0Qge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ib3VuZGluZ0JveDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE9jdHJlZSBpbXBsZW1lbnRzIEludGVyc2VjdG9yIHtcclxuICAgICAgICBwcml2YXRlIGJvdW5kaW5nQm94ID0gbmV3IHBzZ2VvbWV0cnkuQUFCQjNEKCk7XHJcblxyXG4gICAgICAgIHN0YXRpYyBDcmVhdGVGcm9tQmxvY2tTdHJlYW0ocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlcik6IE9jdHJlZSB7XHJcbiAgICAgICAgICAgIGxldCBvY3RyZWUgPSBuZXcgT2N0cmVlKCk7XHJcbiAgICAgICAgICAgIGxldCB4MCwgeTAsIHowLCB4MSwgeTEsIHoxO1xyXG4gICAgICAgICAgICBsZXQgbGV2ZWxzO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyZWFkZXIudHJ5UmVhZEludCgodmFsKSA9PiB7IGxldmVscyA9IHZhbDsgfSkgJiZcclxuICAgICAgICAgICAgICAgIHJlYWRlci50cnlSZWFkRmxvYXQoKHZhbCkgPT4geDAgPSB2YWwpICYmXHJcbiAgICAgICAgICAgICAgICByZWFkZXIudHJ5UmVhZEZsb2F0KCh2YWwpID0+IHkwID0gdmFsKSAmJlxyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnRyeVJlYWRGbG9hdCgodmFsKSA9PiB6MCA9IHZhbCkgJiZcclxuICAgICAgICAgICAgICAgIHJlYWRlci50cnlSZWFkRmxvYXQoKHZhbCkgPT4geDEgPSB2YWwpICYmXHJcbiAgICAgICAgICAgICAgICByZWFkZXIudHJ5UmVhZEZsb2F0KCh2YWwpID0+IHkxID0gdmFsKSAmJlxyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnRyeVJlYWRGbG9hdCgodmFsKSA9PiB6MSA9IHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIG9jdHJlZS5ib3VuZGluZ0JveC5hZGRQb2ludCh4MCwgeTAsIHowKTtcclxuICAgICAgICAgICAgICAgIG9jdHJlZS5ib3VuZGluZ0JveC5hZGRQb2ludCh4MSwgeTEsIHoxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG9jdHJlZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRCb3VuZGluZ0JveCgpOiBwc2dlb21ldHJ5LkFBQkIzRCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvdW5kaW5nQm94O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEZpZ3VyZVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmaWd1cmVJRDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNoYWRlckluc3RhbmNlczogU2hhZGVySW5zdGFuY2VbXSA9IFtdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGludGVyc2VjdG9yOiBJbnRlcnNlY3RvcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBub2RlOiBOb2RlQXNzZXQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTm9kZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgTm9kZSh2YWx1ZTogTm9kZUFzc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBGaWd1cmVJRCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlndXJlSUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNoYWRlckluc3RhbmNlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhZGVySW5zdGFuY2VzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZmlndXJlSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmZpZ3VyZUlEID0gZmlndXJlSUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Qm91bmRpbmdCb3goKTogcHNnZW9tZXRyeS5BQUJCM0Qge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcnNlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuTm9kZSA/IHRoaXMuaW50ZXJzZWN0b3IuZ2V0Qm91bmRpbmdCb3goKS50cmFuc2Zvcm0odGhpcy5Ob2RlLkFic29sdXRlVHJhbnNmb3JtYXRpb24pIDogdGhpcy5pbnRlcnNlY3Rvci5nZXRCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBwc2dlb21ldHJ5LkFBQkIzRCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkU2hhZGVySW5zdGFuY2Uoc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVySW5zdGFuY2VzLnB1c2goc2hhZGVySW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHN0YWdlID0gY29udGV4dC5TdGFnZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVySW5zdGFuY2VzLmZvckVhY2goKHNoYWRlckluc3RhbmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzaGFkZXJJbnN0YW5jZS5GaWd1cmVJRCA9IHRoaXMuZmlndXJlSUQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hhZGVyUHJvZ3JhbSA9IHN0YWdlLmdldFNoYWRlclByb2dyYW0oY29udGV4dCwgc2hhZGVySW5zdGFuY2UuU2hhZGVyS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChzaGFkZXJQcm9ncmFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaGFkZXJQcm9ncmFtID0gc2hhZGVyUHJvZ3JhbTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk5vZGVUcmFuc2Zvcm0gPSB0aGlzLk5vZGUgPyB0aGlzLk5vZGUuQWJzb2x1dGVUcmFuc2Zvcm1hdGlvbiA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbS5yZW5kZXIoY29udGV4dCwgc2hhZGVySW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRJbnRlcnNlY3RvcihpbnRlcnNlY3RvcjogSW50ZXJzZWN0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcnNlY3RvciA9IGludGVyc2VjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludGVyc2VjdHNCb3VuZGluZ0JveChyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBhdDogcHNnZW9tZXRyeS5WZWMzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW50ZXJzZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbnRlcnNlY3Rpb25Qb2ludCA9IHRoaXMuaW50ZXJzZWN0b3IuZ2V0Qm91bmRpbmdCb3goKS5pbnRlcnNlY3RzUmF5KHJheSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJzZWN0aW9uUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdC5hc3NpZ25WZWMoaW50ZXJzZWN0aW9uUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQW5pbWF0aW9uVHJhbnNmb3JtYXRpb24ge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRnJvbUJsb2NrU3RyZWFtKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIG1lc2gzRExpYjogTWVzaDNETGliKTogQW5pbWF0aW9uVHJhbnNmb3JtYXRpb24ge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGVBc3NldCB7XHJcbiAgICAgICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcGFyZW50Tm9kZTogTm9kZUFzc2V0O1xyXG5cclxuICAgICAgICBwcml2YXRlIGNoaWxkTm9kZXM6IHsgW2luZGV4OiBzdHJpbmddOiBOb2RlQXNzZXQgfSA9IHt9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGxvY2FsVHJhbnNmb3JtYXRpb246IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhYnNvbHV0ZVRyYW5zZm9ybWF0aW9uOiBwc2dlb21ldHJ5Lk1hdHJpeDQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTmFtZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQWJzb2x1dGVUcmFuc2Zvcm1hdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVUcmFuc2Zvcm1hdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTG9jYWxUcmFuc2Zvcm1hdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxUcmFuc2Zvcm1hdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZE5vZGVGcm9tUGF0aChwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gdGhpcy5jaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aCA9PSB0aGlzLmNoaWxkTm9kZXNbY2hpbGRdLk5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzW2NoaWxkXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiB0aGlzLmNoaWxkTm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXRoLnN1YnN0cmluZygwLCB0aGlzLmNoaWxkTm9kZXNbY2hpbGRdLk5hbWUubGVuZ3RoKSA9PSB0aGlzLmNoaWxkTm9kZXNbY2hpbGRdLk5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzW2NoaWxkXS5nZXRDaGlsZE5vZGVGcm9tUGF0aChwYXRoLnN1YnN0cih0aGlzLmNoaWxkTm9kZXNbY2hpbGRdLk5hbWUubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBGcm9tQmxvY2tTdHJlYW0ocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgbWVzaDNETGliOiBNZXNoM0RMaWIsIHBhcmVudE5vZGU/OiBOb2RlQXNzZXQpOiBOb2RlQXNzZXQge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE5vZGVBc3NldCgpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0Lm5hbWUgPSByZWFkZXIucmVhZFN0cmluZygpO1xyXG4gICAgICAgICAgICByZXN1bHQubG9jYWxUcmFuc2Zvcm1hdGlvbiA9IHJlYWRlci5yZWFkTWF0cml4NCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuYWJzb2x1dGVUcmFuc2Zvcm1hdGlvbiA9IE5vZGVBc3NldC5jYWxjdWxhdGVBYnNvbHV0ZVRyYW5zZm9ybWF0aW9uKHJlc3VsdC5sb2NhbFRyYW5zZm9ybWF0aW9uLCBwYXJlbnROb2RlKTtcclxuICAgICAgICAgICAgcmVzdWx0LnBhcmVudE5vZGUgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgICAgICByZXN1bHQucmVhZENoaWxkTm9kZXMocmVhZGVyLCBtZXNoM0RMaWIpO1xyXG4gICAgICAgICAgICByZXN1bHQucmVhZEFuaW1hdGlvblRyYW5zZm9ybWF0aW9ucyhyZWFkZXIsIG1lc2gzRExpYik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlQWJzb2x1dGVUcmFuc2Zvcm1hdGlvbihsb2NhbFRyYW5zZm9ybWF0aW9uOiBwc2dlb21ldHJ5Lk1hdHJpeDQsIHBhcmVudE5vZGU6IE5vZGVBc3NldCk6IHBzZ2VvbWV0cnkuTWF0cml4NCB7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHBzZ2VvbWV0cnkuTWF0cml4ND5sb2NhbFRyYW5zZm9ybWF0aW9uLm11bHRpcGx5KHBhcmVudE5vZGUuQWJzb2x1dGVUcmFuc2Zvcm1hdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxUcmFuc2Zvcm1hdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkQ2hpbGROb2RlcyhyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBtZXNoM0RMaWI6IE1lc2gzRExpYikge1xyXG4gICAgICAgICAgICByZWFkZXIudHJ5UmVhZEludCgoY2hpbGROYW1lQ291bnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROYW1lQ291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGROb2RlKE5vZGVBc3NldC5Gcm9tQmxvY2tTdHJlYW0ocmVhZGVyLCBtZXNoM0RMaWIsIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRBbmltYXRpb25UcmFuc2Zvcm1hdGlvbnMocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgbWVzaDNETGliOiBNZXNoM0RMaWIpIHtcclxuICAgICAgICAgICAgcmVhZGVyLnRyeVJlYWRJbnQoKG51bUFuaW1hdGlvblRyYW5zZm9ybWF0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1BbmltYXRpb25UcmFuc2Zvcm1hdGlvbnM7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQW5pbWF0aW9uVHJhbnNmb3JtYXRpb24oQW5pbWF0aW9uVHJhbnNmb3JtYXRpb24uRnJvbUJsb2NrU3RyZWFtKHJlYWRlciwgbWVzaDNETGliKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhZGRDaGlsZE5vZGUobm9kZTogTm9kZUFzc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGROb2Rlc1tub2RlLk5hbWVdID0gbm9kZTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBwcml2YXRlIGFkZEFuaW1hdGlvblRyYW5zZm9ybWF0aW9uKGFuaW1hdGlvblRyYW5zZm9ybWF0aW9uOiBBbmltYXRpb25UcmFuc2Zvcm1hdGlvbikge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEJ1ZmZlckFzc2V0V2ViR0wge1xyXG5cclxuICAgICAgICBwcml2YXRlIGJ1ZmZlcklEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYnVmZmVyU2l6ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgcHVibGljIGJ1ZmZlckRhdGE6IEFycmF5QnVmZmVyIHwgU2hhcmVkQXJyYXlCdWZmZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgd2ViR0xCdWZmZXI6IFdlYkdMQnVmZmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGlzRWxlbWVudEJ1ZmZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEJ1ZmZlcklEKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5idWZmZXJJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgQnVmZmVySUQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcklEID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEJ1ZmZlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2ViR0xCdWZmZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEJ1ZmZlclNpemUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlclNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IEJ1ZmZlclNpemUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlclNpemUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIGJ1ZmZlcklEOiBzdHJpbmcsIGlzRWxlbWVudEJ1ZmZlcjogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcklEID0gYnVmZmVySUQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXNFbGVtZW50QnVmZmVyID0gaXNFbGVtZW50QnVmZmVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSByZWFkZXIuQ3VycmVudEJsb2NrRGVzY3JpcHRvcjtcclxuICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlYWQgYWRkaXRpb25hbCBtZXRhIGRhdGEgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IuTWFqb3JWZXJzaW9uID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcklEID0gcmVhZGVyLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyU2l6ZSA9IHJlYWRlci5yZW1haW5pbmdCeXRlc0luQmxvY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlckRhdGEgPSByZWFkZXIucmVhZEJ5dGVzKHRoaXMuYnVmZmVyU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2ViR0xCdWZmZXIgPSBzdGFnZS5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRWxlbWVudEJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy53ZWJHTEJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5idWZmZXJEYXRhKHN0YWdlLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCA8QXJyYXlCdWZmZXI+dGhpcy5idWZmZXJEYXRhLCBzdGFnZS5nbC5TVEFUSUNfRFJBVyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy53ZWJHTEJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5idWZmZXJEYXRhKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgPEFycmF5QnVmZmVyPnRoaXMuYnVmZmVyRGF0YSwgc3RhZ2UuZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmluZChzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0VsZW1lbnRCdWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMud2ViR0xCdWZmZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5BUlJBWV9CVUZGRVIsIHRoaXMud2ViR0xCdWZmZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmluZEludGVybGVhdmVkKHN0YWdlOiBTdGFnZVdlYkdMLCBhdHRyaWJ1dGVMb2NhdGlvbjogbnVtYmVyLCBzaXplOiBudW1iZXIsIHN0cmlkZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlTG9jYXRpb24gPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5BUlJBWV9CVUZGRVIsIHRoaXMud2ViR0xCdWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cmlidXRlTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRyaWJ1dGVMb2NhdGlvbiwgc2l6ZSwgc3RhZ2UuZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBPcGFxdWVNZXNoQnVpbGRlciB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmVydGljZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbmRpY2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmVydEJ1ZmZlckFzc2V0OiBCdWZmZXJBc3NldFdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIGluZEJ1ZmZlckFzc2V0OiBCdWZmZXJBc3NldFdlYkdMO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRUcmkoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlcixcclxuICAgICAgICAgICAgeDI6IG51bWJlciwgeTI6IG51bWJlciwgejI6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgZG91YmxlU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB4MCwgeTAsIHowLCAwLCAwLCAxLCByLCBnLCBiLFxyXG4gICAgICAgICAgICAgICAgeDEsIHkxLCB6MSwgMCwgMCwgMSwgciwgZywgYixcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIDAsIDAsIDEsIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLmluZGljZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLmluZGljZXMucHVzaChpLCBpICsgMSwgaSArIDIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRvdWJsZVNpZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgeDEsIHkxLCB6MSwgMCwgMCwgMSwgciwgZywgYixcclxuICAgICAgICAgICAgICAgICAgICB4MCwgeTAsIHowLCAwLCAwLCAxLCByLCBnLCBiLFxyXG4gICAgICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIDAsIDAsIDEsIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGkgPSB0aGlzLmluZGljZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRpY2VzLnB1c2goaSwgaSArIDEsIGkgKyAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFF1YWQoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlcixcclxuICAgICAgICAgICAgeDI6IG51bWJlciwgeTI6IG51bWJlciwgejI6IG51bWJlcixcclxuICAgICAgICAgICAgeDM6IG51bWJlciwgeTM6IG51bWJlciwgejM6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgZG91YmxlU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFRyaSh4MCwgeTAsIHowLFxyXG4gICAgICAgICAgICAgICAgeDEsIHkxLCB6MSxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiLCBkb3VibGVTaWRlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLFxyXG4gICAgICAgICAgICAgICAgeDMsIHkzLCB6MyxcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIsIGRvdWJsZVNpZGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRTdHJva2UoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcikge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpciA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoeDEsIHkxLCB6MSkuc3ViKG5ldyBwc2dlb21ldHJ5LlZlYzMoeDAsIHkwLCB6MCkpO1xyXG4gICAgICAgICAgICBsZXQgcmFkaXVzID0gZGlyLm5vcm0oKTtcclxuICAgICAgICAgICAgbGV0IGF6aW11dGggPSBNYXRoLmF0YW4yKC1kaXIueiwgZGlyLngpO1xyXG4gICAgICAgICAgICBsZXQgcG9sYXIgPSBNYXRoLmFzaW4oZGlyLnkgLyByYWRpdXMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoaWNrbmVzcyA9IC4wMTtcclxuICAgICAgICAgICAgbGV0IHVwID0gPHBzZ2VvbWV0cnkuVmVjND5wc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVJvdGF0aW9uKGF6aW11dGgsIHBvbGFyLCAwKS5tdWx0aXBseShuZXcgcHNnZW9tZXRyeS5WZWM0KDAsIHRoaWNrbmVzcywgMCwgMSkpO1xyXG4gICAgICAgICAgICBsZXQgZnJvbnQgPSA8cHNnZW9tZXRyeS5WZWM0PnBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tUm90YXRpb24oYXppbXV0aCwgcG9sYXIsIDApLm11bHRpcGx5KG5ldyBwc2dlb21ldHJ5LlZlYzQoMCwgMCwgdGhpY2tuZXNzLCAxKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFF1YWQoeDAgKyB1cC54IC0gZnJvbnQueCwgeTAgKyB1cC55IC0gZnJvbnQueSwgejAgKyB1cC56IC0gZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgxICsgdXAueCAtIGZyb250LngsIHkxICsgdXAueSAtIGZyb250LnksIHoxICsgdXAueiAtIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MSAtIHVwLnggLSBmcm9udC54LCB5MSAtIHVwLnkgLSBmcm9udC55LCB6MSAtIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDAgLSB1cC54IC0gZnJvbnQueCwgeTAgLSB1cC55IC0gZnJvbnQueSwgejAgLSB1cC56IC0gZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRRdWFkKHgwIC0gdXAueCArIGZyb250LngsIHkwIC0gdXAueSArIGZyb250LnksIHowIC0gdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MSAtIHVwLnggKyBmcm9udC54LCB5MSAtIHVwLnkgKyBmcm9udC55LCB6MSAtIHVwLnogKyBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDEgKyB1cC54ICsgZnJvbnQueCwgeTEgKyB1cC55ICsgZnJvbnQueSwgejEgKyB1cC56ICsgZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgwICsgdXAueCArIGZyb250LngsIHkwICsgdXAueSArIGZyb250LnksIHowICsgdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUXVhZCh4MCAtIHVwLnggLSBmcm9udC54LCB5MCAtIHVwLnkgLSBmcm9udC55LCB6MCAtIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDEgLSB1cC54IC0gZnJvbnQueCwgeTEgLSB1cC55IC0gZnJvbnQueSwgejEgLSB1cC56IC0gZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgxIC0gdXAueCArIGZyb250LngsIHkxIC0gdXAueSArIGZyb250LnksIHoxIC0gdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MCAtIHVwLnggKyBmcm9udC54LCB5MCAtIHVwLnkgKyBmcm9udC55LCB6MCAtIHVwLnogKyBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFF1YWQoeDAgKyB1cC54ICsgZnJvbnQueCwgeTAgKyB1cC55ICsgZnJvbnQueSwgejAgKyB1cC56ICsgZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgxICsgdXAueCArIGZyb250LngsIHkxICsgdXAueSArIGZyb250LnksIHoxICsgdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MSArIHVwLnggLSBmcm9udC54LCB5MSArIHVwLnkgLSBmcm9udC55LCB6MSArIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDAgKyB1cC54IC0gZnJvbnQueCwgeTAgKyB1cC55IC0gZnJvbnQueSwgejAgKyB1cC56IC0gZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJ0QnVmID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnZlcnRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZlcnRCdWYuc2V0KHRoaXMudmVydGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5idWZmZXJEYXRhID0gdmVydEJ1Zi5idWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LkJ1ZmZlclNpemUgPSB0aGlzLmluZGljZXMubGVuZ3RoICogOSAqIDQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kQnVmID0gbmV3IEludDMyQXJyYXkodGhpcy5pbmRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGluZEJ1Zi5zZXQodGhpcy5pbmRpY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRCdWZmZXJBc3NldC5idWZmZXJEYXRhID0gaW5kQnVmLmJ1ZmZlcjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmluZEJ1ZmZlckFzc2V0LmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpZ3VyZShzdGFnZTogU3RhZ2VXZWJHTCwgZmlndXJlSUQ6IHN0cmluZyk6IEZpZ3VyZVdlYkdMIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRCdWZmZXJBc3NldCA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCBmaWd1cmVJRCArICdfaW5kaWNlcycsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldCA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCBmaWd1cmVJRCArICdfdmVydGljZXMnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoc3RhZ2UpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuQXNzZXRTdG9yZS5hZGRCdWZmZXJBc3NldChmaWd1cmVJRCArICdfaW5kaWNlcycsIHRoaXMuaW5kQnVmZmVyQXNzZXQpO1xyXG4gICAgICAgICAgICBzdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KGZpZ3VyZUlEICsgJ192ZXJ0aWNlcycsIHRoaXMudmVydEJ1ZmZlckFzc2V0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaGFkZXJJbnN0YW5jZSA9IG5ldyBtb2RlbHN0YWdld2ViLk1lc2hTaGFkZXJJbnN0YW5jZSgnT3BhcXVlTWVzaFNoYWRlcicpO1xyXG4gICAgICAgICAgICBzaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJywgZmlndXJlSUQgKyAnX2luZGljZXMnKTtcclxuICAgICAgICAgICAgc2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInLCBmaWd1cmVJRCArICdfdmVydGljZXMnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmaWd1cmUgPSBuZXcgbW9kZWxzdGFnZXdlYi5GaWd1cmVXZWJHTChmaWd1cmVJRCk7XHJcbiAgICAgICAgICAgIGZpZ3VyZS5hZGRTaGFkZXJJbnN0YW5jZShzaGFkZXJJbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlndXJlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVHJhbnNwYXJlbnRNZXNoQnVpbGRlciB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmVydGljZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbmRpY2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB2ZXJ0QnVmZmVyQXNzZXQ6IEJ1ZmZlckFzc2V0V2ViR0wsIHByb3RlY3RlZCBpbmRCdWZmZXJBc3NldDogQnVmZmVyQXNzZXRXZWJHTCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFRyaSh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB6MDogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB6MTogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCB6MjogbnVtYmVyLFxyXG4gICAgICAgICAgICByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIsIHR3b1NpZGVkPzogYm9vbGVhbikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgeDAsIHkwLCB6MCwgMCwgMCwgMSwgciwgZywgYiwgYSxcclxuICAgICAgICAgICAgICAgIHgxLCB5MSwgejEsIDAsIDAsIDEsIHIsIGcsIGIsIGEsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLCAwLCAwLCAxLCByLCBnLCBiLCBhKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpID0gdGhpcy5pbmRpY2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2VzLnB1c2goaSwgaSArIDEsIGkgKyAyKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0d29TaWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUcmkoeDAsIHkwLCB6MCxcclxuICAgICAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLFxyXG4gICAgICAgICAgICAgICAgICAgIHgxLCB5MSwgejEsXHJcbiAgICAgICAgICAgICAgICAgICAgciwgZywgYiwgYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRRdWFkKHgwOiBudW1iZXIsIHkwOiBudW1iZXIsIHowOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHoxOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIHoyOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHgzOiBudW1iZXIsIHkzOiBudW1iZXIsIHozOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlciwgdHdvU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFRyaSh4MCwgeTAsIHowLFxyXG4gICAgICAgICAgICAgICAgeDEsIHkxLCB6MSxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiLCBhLCB0d29TaWRlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLFxyXG4gICAgICAgICAgICAgICAgeDMsIHkzLCB6MyxcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIsIGEsIHR3b1NpZGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJ0QnVmID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnZlcnRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZlcnRCdWYuc2V0KHRoaXMudmVydGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5idWZmZXJEYXRhID0gdmVydEJ1Zi5idWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LkJ1ZmZlclNpemUgPSB0aGlzLmluZGljZXMubGVuZ3RoICogMTAgKiA0O1xyXG5cclxuICAgICAgICAgICAgbGV0IGluZEJ1ZiA9IG5ldyBJbnQzMkFycmF5KHRoaXMuaW5kaWNlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpbmRCdWYuc2V0KHRoaXMuaW5kaWNlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kQnVmZmVyQXNzZXQuYnVmZmVyRGF0YSA9IGluZEJ1Zi5idWZmZXI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRCdWZmZXJBc3NldC5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRleHR1cmVkTWVzaEJ1aWxkZXIge1xyXG5cclxuICAgICAgICBwcml2YXRlIHZlcnRpY2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5kaWNlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdmVydEJ1ZmZlckFzc2V0OiBCdWZmZXJBc3NldFdlYkdMLCBwcm90ZWN0ZWQgaW5kQnVmZmVyQXNzZXQ6IEJ1ZmZlckFzc2V0V2ViR0wpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRUcmkoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlciwgdTA6IG51bWJlciwgdjA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlciwgdTE6IG51bWJlciwgdjE6IG51bWJlcixcclxuICAgICAgICAgICAgeDI6IG51bWJlciwgeTI6IG51bWJlciwgejI6IG51bWJlciwgdTI6IG51bWJlciwgdjI6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgdHdvU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB4MCwgeTAsIHowLCAwLCAwLCAxLCByLCBnLCBiLCB1MCwgdjAsXHJcbiAgICAgICAgICAgICAgICB4MSwgeTEsIHoxLCAwLCAwLCAxLCByLCBnLCBiLCB1MSwgdjEsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLCAwLCAwLCAxLCByLCBnLCBiLCB1MiwgdjIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLmluZGljZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLmluZGljZXMucHVzaChpLCBpICsgMSwgaSArIDIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR3b1NpZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRyaSh4MCwgeTAsIHowLCB1MCwgdjAsXHJcbiAgICAgICAgICAgICAgICAgICAgeDIsIHkyLCB6MiwgdTIsIHYyLFxyXG4gICAgICAgICAgICAgICAgICAgIHgxLCB5MSwgejEsIHUxLCB2MSxcclxuICAgICAgICAgICAgICAgICAgICByLCBnLCBiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFF1YWQoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlciwgdTA6IG51bWJlciwgdjA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlciwgdTE6IG51bWJlciwgdjE6IG51bWJlcixcclxuICAgICAgICAgICAgeDI6IG51bWJlciwgeTI6IG51bWJlciwgejI6IG51bWJlciwgdTI6IG51bWJlciwgdjI6IG51bWJlcixcclxuICAgICAgICAgICAgeDM6IG51bWJlciwgeTM6IG51bWJlciwgejM6IG51bWJlciwgdTM6IG51bWJlciwgdjM6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgdHdvU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFRyaSh4MCwgeTAsIHowLCB1MCwgdjAsXHJcbiAgICAgICAgICAgICAgICB4MSwgeTEsIHoxLCB1MSwgdjEsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLCB1MiwgdjIsXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiLCB0d29TaWRlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsIHUwLCB2MCxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIHUyLCB2MiwgXHJcbiAgICAgICAgICAgICAgICB4MywgeTMsIHozLCB1MywgdjMsXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiLCB0d29TaWRlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW5pdGlhbGl6ZShzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgdmVydEJ1ZiA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy52ZXJ0aWNlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICB2ZXJ0QnVmLnNldCh0aGlzLnZlcnRpY2VzKTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0QnVmZmVyQXNzZXQuYnVmZmVyRGF0YSA9IHZlcnRCdWYuYnVmZmVyO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5CdWZmZXJTaXplID0gdGhpcy5pbmRpY2VzLmxlbmd0aCAqIDExICogNDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRCdWYgPSBuZXcgSW50MzJBcnJheSh0aGlzLmluZGljZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgaW5kQnVmLnNldCh0aGlzLmluZGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmluZEJ1ZmZlckFzc2V0LmJ1ZmZlckRhdGEgPSBpbmRCdWYuYnVmZmVyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52ZXJ0QnVmZmVyQXNzZXQuaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kQnVmZmVyQXNzZXQuaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUZXh0dXJlQXNzZXRXZWJHTCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGV4dHVyZTogV2ViR0xUZXh0dXJlO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFnZTogU3RhZ2VXZWJHTCwgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfCBXZWJHTFRleHR1cmUpIHtcclxuICAgICAgICAgICAgaWYgKGltYWdlIGluc3RhbmNlb2YgV2ViR0xUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUgPSBpbWFnZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHN0YWdlLmdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRUZXh0dXJlKHN0YWdlLmdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC50ZXhJbWFnZTJEKHN0YWdlLmdsLlRFWFRVUkVfMkQsIDAsIHN0YWdlLmdsLlJHQkEsIHN0YWdlLmdsLlJHQkEsIHN0YWdlLmdsLlVOU0lHTkVEX0JZVEUsIGltYWdlKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLnRleFBhcmFtZXRlcmkoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgc3RhZ2UuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBzdGFnZS5nbC5MSU5FQVIpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wudGV4UGFyYW1ldGVyaShzdGFnZS5nbC5URVhUVVJFXzJELCBzdGFnZS5nbC5URVhUVVJFX01JTl9GSUxURVIsIHN0YWdlLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5nZW5lcmF0ZU1pcG1hcChzdGFnZS5nbC5URVhUVVJFXzJEKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRUZXh0dXJlKHN0YWdlLmdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiaW5kKHN0YWdlOiBTdGFnZVdlYkdMLCBwcm9ncmFtOiBTaGFkZXJQcm9ncmFtV2ViR0wsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5hY3RpdmVUZXh0dXJlKHN0YWdlLmdsLlRFWFRVUkUwKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wudW5pZm9ybTFpKHN0YWdlLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLlByb2dyYW0sIGF0dHJpYnV0ZU5hbWUpLCAwKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVuYmluZChzdGFnZTogU3RhZ2VXZWJHTCwgcHJvZ3JhbTogU2hhZGVyUHJvZ3JhbVdlYkdMLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYWN0aXZlVGV4dHVyZShzdGFnZS5nbC5URVhUVVJFMCk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRUZXh0dXJlKHN0YWdlLmdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8vIEFuIGFzc2V0IHN0b3JlIGNsYXNzIGZvciBXZWJHTC5cclxuICAgIGV4cG9ydCBjbGFzcyBBc3NldFN0b3JlV2ViR0wge1xyXG5cclxuICAgICAgICAvLy8gQWxsIGFnZ3JlZ2F0ZWQgZmlndXJlcy5cclxuICAgICAgICBwcml2YXRlIGZpZ3VyZXM6IHsgW2luZGV4OiBzdHJpbmddOiBGaWd1cmVXZWJHTCB9ID0ge307XHJcblxyXG4gICAgICAgIC8vLyBBbGwgYWdncmVnYXRlZCBub2RlcyBhc3NldHMuXHJcbiAgICAgICAgcHJpdmF0ZSByb290Tm9kZUFzc2V0czogeyBbaW5kZXg6IHN0cmluZ106IE5vZGVBc3NldCB9ID0ge307XHJcblxyXG4gICAgICAgIC8vLyBBbGwgYWdncmVnYXRlZCBidWZmZXIgYXNzZXRzLlxyXG4gICAgICAgIHByaXZhdGUgYnVmZmVyQXNzZXRzOiB7IFtpbmRleDogc3RyaW5nXTogQnVmZmVyQXNzZXRXZWJHTCB9ID0ge307XHJcblxyXG4gICAgICAgIC8vLyBBbGwgYWdncmVnYXRlZCB0ZXh0dXJlIGFzc2V0cy5cclxuICAgICAgICBwcml2YXRlIHRleHR1cmVBc3NldHM6IHsgW2luZGV4OiBzdHJpbmddOiBUZXh0dXJlQXNzZXRXZWJHTCB9ID0ge307XHJcblxyXG5cclxuICAgICAgICAvLy8gQWRkcyB0aGUgc3BlY2lmaWVkIGZpZ3VyZSB0byB0aGUgdGhlIHN0b3JlLlxyXG4gICAgICAgIHB1YmxpYyBhZGRGaWd1cmUoZmlndXJlOiBGaWd1cmVXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpZ3VyZXNbZmlndXJlLkZpZ3VyZUlEXSA9IGZpZ3VyZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyBEZXRlcm1pbmVzIHRoZSBmaWd1cmUgd2l0aCB0aGUgdGhlIHNwZWNpZmllZCBpZC5cclxuICAgICAgICBwdWJsaWMgZ2V0RmlndXJlKGZpZ3VyZUlEOiBzdHJpbmcpOiBGaWd1cmVXZWJHTCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZ3VyZXNbZmlndXJlSURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIEFkZHMgYSBidWZmZXIgYXNzZXQgdG8gdGhlIHN0b3JlLlxyXG4gICAgICAgIHB1YmxpYyBhZGRCdWZmZXJBc3NldChidWZmZXJBc3NldElEOiBzdHJpbmcsIGJ1ZmZlckFzc2V0OiBCdWZmZXJBc3NldFdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyQXNzZXRzW2J1ZmZlckFzc2V0SURdID0gYnVmZmVyQXNzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkUm9vdE5vZGUobm9kZTogTm9kZUFzc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdE5vZGVBc3NldHNbbm9kZS5OYW1lXSA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gRGV0ZXJtaW5lcyB0aGUgYnVmZmVyIGFzc2V0IHdpdGggdGhlIHNwZWNpZmllZCBpZC5cclxuICAgICAgICBwdWJsaWMgZ2V0QnVmZmVyQXNzZXQoYnVmZmVyQXNzZXRJRDogc3RyaW5nKTogQnVmZmVyQXNzZXRXZWJHTCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlckFzc2V0c1tidWZmZXJBc3NldElEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyBBZGRzIGEgdGV4dHVyZSBhc3NldCB0byB0aGUgc3RvcmUuXHJcbiAgICAgICAgcHVibGljIGFkZFRleHR1cmVBc3NldCh0ZXh0dXJlQXNzZXRJRDogc3RyaW5nLCB0ZXh0dXJlQXNzZXQ6IFRleHR1cmVBc3NldFdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZUFzc2V0c1t0ZXh0dXJlQXNzZXRJRF0gPSB0ZXh0dXJlQXNzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gRGV0ZXJtaW5lcyB0aGUgdGV4dHVyZSBhc3NldCB3aXRoIHRoZSBzcGVjaWZpZWQgaWQuXHJcbiAgICAgICAgcHVibGljIGdldFRleHR1cmVBc3NldCh0ZXh0dXJlQXNzZXRJRDogc3RyaW5nKTogVGV4dHVyZUFzc2V0V2ViR0wge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlQXNzZXRzW3RleHR1cmVBc3NldElEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyBSZXR1cm5zIHRoZSBtYXAgb2YgYWdncmVnYXRlZCBmaWd1cmVzLlxyXG4gICAgICAgIHB1YmxpYyBnZXQgRmlndXJlcygpOiB7IFtpbmRleDogc3RyaW5nXTogRmlndXJlV2ViR0wgfSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZ3VyZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Um9vdE5vZGUobmFtZTogc3RyaW5nKTogTm9kZUFzc2V0IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdE5vZGVBc3NldHNbbmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIFNjZW5lSXRlbUZpbHRlcldlYkdMIHtcclxuICAgICAgICBwYXNzZXMoc2NlbmVJdGVtOiBTY2VuZUl0ZW1XZWJHTCwgY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR2VuZXJpY1NjZW5lSXRlbUZpbHRlcldlYkdMIGltcGxlbWVudHMgU2NlbmVJdGVtRmlsdGVyV2ViR0wge1xyXG4gICAgICAgIHBhc3NlcyhzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMLCBjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuUGhhc2UgIT0gJ1NoYWRvdyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2NlbmVJdGVtV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc2NlbmU6IFNjZW5lV2ViR0w7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBwYXJlbnQ6IFNjZW5lSXRlbVdlYkdMO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc2NlbmVJdGVtSUQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNoaWxkcmVuOiBBcnJheTxTY2VuZUl0ZW1XZWJHTD4gPSBbXVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRyZW5CeUtleTogeyBbc2NlbmVJdGVtSUQ6IHN0cmluZ106IFNjZW5lSXRlbVdlYkdMIH0gPSB7fVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRyZW5WaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdGVzdEludGVyc2VjdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHRlc3RDaGlsZHJlbkludGVyc2VjdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGZpbHRlcjogU2NlbmVJdGVtRmlsdGVyV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGF0YTogeyBbaW5kZXg6IHN0cmluZ106IGFueSB9ID0ge307XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgRGF0YSgpOiB7IFtpbmRleDogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBTY2VuZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lSXRlbUlEKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2VuZUl0ZW1JRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2hpbGRyZW4oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBUZXN0Q2hpbGRyZW5JbnRlcnNlY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlc3RDaGlsZHJlbkludGVyc2VjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgVGVzdENoaWxkcmVuSW50ZXJzZWN0aW9uKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RDaGlsZHJlbkludGVyc2VjdGlvbiA9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGVzdEludGVyc2VjdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVzdEludGVyc2VjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgVGVzdEludGVyc2VjdGlvbih2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy50ZXN0SW50ZXJzZWN0aW9uID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBGaWx0ZXIoKSB7IHJldHVybiB0aGlzLmZpbHRlcjsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IEZpbHRlcih2YWx1ZTogU2NlbmVJdGVtRmlsdGVyV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZVdlYkdMLCBzY2VuZUl0ZW1JRDogc3RyaW5nLCBpc1Zpc2libGU/OiBib29sZWFuLCB0ZXN0SW50ZXJzZWN0aW9uPzogYm9vbGVhbiwgY2hpbGRyZW5WaXNpYmxlPzogYm9vbGVhbiwgdGVzdENoaWxkcmVuSW50ZXJzZWN0aW9uPzogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVJdGVtSUQgPSBzY2VuZUl0ZW1JRDtcclxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBpc1Zpc2libGUgfHwgdHlwZW9mIGlzVmlzaWJsZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5WaXNpYmxlID0gY2hpbGRyZW5WaXNpYmxlIHx8IHR5cGVvZiBjaGlsZHJlblZpc2libGUgPT09ICd1bmRlZmluZWQnO1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RJbnRlcnNlY3Rpb24gPSB0ZXN0SW50ZXJzZWN0aW9uIHx8IHR5cGVvZiB0ZXN0SW50ZXJzZWN0aW9uID09PSAndW5kZWZpbmVkJztcclxuICAgICAgICAgICAgdGhpcy50ZXN0Q2hpbGRyZW5JbnRlcnNlY3Rpb24gPSB0ZXN0Q2hpbGRyZW5JbnRlcnNlY3Rpb24gfHwgdHlwZW9mIHRlc3RDaGlsZHJlbkludGVyc2VjdGlvbiA9PT0gJ3VuZGVmaW5lZCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkQ2hpbGQoc2NlbmVJdGVtOiBTY2VuZUl0ZW1XZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuQnlLZXlbc2NlbmVJdGVtLnNjZW5lSXRlbUlEXSA9IHNjZW5lSXRlbTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKHNjZW5lSXRlbSk7XHJcbiAgICAgICAgICAgIHNjZW5lSXRlbS5hZGRlZFRvU2NlbmVHcmFwaCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZChzY2VuZUl0ZW1JRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuQnlLZXlbc2NlbmVJdGVtSURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKHNjZW5lSXRlbUlEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4uZmlsdGVyKHNjZW5lSXRlbSA9PiBzY2VuZUl0ZW0uc2NlbmVJdGVtSUQgIT0gc2NlbmVJdGVtSUQpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jaGlsZHJlbkJ5S2V5W3NjZW5lSXRlbUlEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnNlcnRDaGlsZChzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5CeUtleVtzY2VuZUl0ZW0uc2NlbmVJdGVtSURdID0gc2NlbmVJdGVtO1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgc2NlbmVJdGVtKTtcclxuICAgICAgICAgICAgc2NlbmVJdGVtLmFkZGVkVG9TY2VuZUdyYXBoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJlZ2luUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGVuZFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZW5kZXIoY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maWx0ZXIgfHwgdGhpcy5maWx0ZXIucGFzc2VzKHRoaXMsIGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luUmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ2hpbGRyZW4oY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSZW5kZXIoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ2hpbGRyZW4oY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCByZW5kZXJDaGlsZHJlbihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5WaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRlZFRvU2NlbmVHcmFwaChwYXJlbnRTY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUgPSBwYXJlbnRTY2VuZUl0ZW0uc2NlbmU7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50U2NlbmVJdGVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludGVyc2VjdHNCb3VuZGluZ0JveChyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBhdDogcHNnZW9tZXRyeS5WZWMzKTogQm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNJbnRlcnNlY3Rpb25DYW5kaWRhdGUocmF5OiBwc2dlb21ldHJ5LkxpbmUzRCwgYXQ6IHBzZ2VvbWV0cnkuVmVjMyk6IEJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3RzQm91bmRpbmdCb3gocmF5LCBhdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkSW50ZXJzZWN0aW9uQ2FuZGlkYXRlcyhyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBjYW5kaWRhdGVzOiBBcnJheTxJbnRlcnNlY3Rpb25DYW5kaWRhdGU+KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RJbnRlcnNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdCA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW50ZXJzZWN0aW9uQ2FuZGlkYXRlKHJheSwgYXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlcy5wdXNoKG5ldyBJbnRlcnNlY3Rpb25DYW5kaWRhdGUodGhpcywgYXQuc3F1YXJlZERpc3QocmF5LnAwLmFzVmVjMygpKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RDaGlsZHJlbkludGVyc2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5hZGRJbnRlcnNlY3Rpb25DYW5kaWRhdGVzKHJheSwgY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFjdG9yV2ViR0wgZXh0ZW5kcyBTY2VuZUl0ZW1XZWJHTCB7XHJcbiAgICAgICAgcHJpdmF0ZSBmaWd1cmVzOiBGaWd1cmVXZWJHTFtdID0gW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgbGFzdE1vZGVsVHJhbnNmb3JtOiBwc2dlb21ldHJ5Lk1hdHJpeDQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW52ZXJzZU1vZGVsVHJhbnNmb3JtOiBwc2dlb21ldHJ5Lk1hdHJpeDQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGU6IFJlbmRlclN0YXRlID0gbmV3IFJlbmRlclN0YXRlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBGaWd1cmVzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWd1cmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lV2ViR0wsIGFjdG9ySUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihzY2VuZSwgYWN0b3JJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkRmlndXJlKGZpZ3VyZTogRmlndXJlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5maWd1cmVzLnB1c2goZmlndXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiZWdpblJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5maWd1cmVzLmZvckVhY2goKGZpZ3VyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlndXJlLnJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludGVyc2VjdHNCb3VuZGluZ0JveChyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBhdDogcHNnZW9tZXRyeS5WZWMzKTogQm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZFJheSA9IHRoaXMuaW52ZXJzZU1vZGVsVHJhbnNmb3JtID8gcmF5LnRyYW5zZm9ybSh0aGlzLmludmVyc2VNb2RlbFRyYW5zZm9ybSkgOiByYXk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZ3VyZUlkeCBpbiB0aGlzLmZpZ3VyZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5maWd1cmVzW2ZpZ3VyZUlkeF0uaW50ZXJzZWN0c0JvdW5kaW5nQm94KHRyYW5zZm9ybWVkUmF5LCBhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdC5hc3NpZ25WZWMoPHBzZ2VvbWV0cnkuVmVjND50aGlzLmxhc3RNb2RlbFRyYW5zZm9ybS5tdWx0aXBseShhdC5hc1ZlYzQoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpbHRlciB8fCB0aGlzLmZpbHRlci5wYXNzZXModGhpcywgY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSB8fCB0aGlzLmNoaWxkcmVuVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQucHVzaFN0YXRlKHRoaXMuc3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpblJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSZW5kZXIoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb2RlbFRyYW5zZm9ybSA9IGNvbnRleHQuTm9kZVRyYW5zZm9ybSA/IDxwc2dlb21ldHJ5Lk1hdHJpeDQ+Y29udGV4dC5Ob2RlVHJhbnNmb3JtLm11bHRpcGx5KGNvbnRleHQuTW9kZWxUcmFuc2Zvcm0pIDogY29udGV4dC5Nb2RlbFRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vZGVsVHJhbnNmb3JtLmVxdWFscyh0aGlzLmxhc3RNb2RlbFRyYW5zZm9ybSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZlcnNlTW9kZWxUcmFuc2Zvcm0gPSBtb2RlbFRyYW5zZm9ybS5pbnZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE1vZGVsVHJhbnNmb3JtID0gbW9kZWxUcmFuc2Zvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnBvcFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbnRlcnNlY3Rpb25DYW5kaWRhdGUge1xyXG4gICAgICAgIHB1YmxpYyBzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNxdWFyZWREaXN0OiBudW1iZXIgPSBJbmZpbml0eTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc2NlbmVJdGVtOiBTY2VuZUl0ZW1XZWJHTCwgc3F1YXJlZERpc3Q6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lSXRlbSA9IHNjZW5lSXRlbTtcclxuICAgICAgICAgICAgdGhpcy5zcXVhcmVkRGlzdCA9IHNxdWFyZWREaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbXBhcmUoaW50ZXJzZWN0aW9uQ2FuZGlkYXRlOiBJbnRlcnNlY3Rpb25DYW5kaWRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3F1YXJlZERpc3QgPCBpbnRlcnNlY3Rpb25DYW5kaWRhdGUuc3F1YXJlZERpc3QgPyAtMSA6XHJcbiAgICAgICAgICAgICAgICAodGhpcy5zcXVhcmVkRGlzdCA+IGludGVyc2VjdGlvbkNhbmRpZGF0ZS5zcXVhcmVkRGlzdCA/IDEgOiAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFJlbmRlclN0YXRlIHtcclxuICAgICAgICBwcml2YXRlIHBhcmVudDogUmVuZGVyU3RhdGU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZW50cmllczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFBhcmVudCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBQYXJlbnQodmFsOiBSZW5kZXJTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZXZhbHVhdGUoZW50cnk6IGFueSk6IGFueSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZW50cnkgPT0gJ2Z1bmN0aW9uJyA/IGVudHJ5KHRoaXMpIDogZW50cnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29udGFpbnMoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllc1trZXldICE9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQ8VD4oa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogVCk6IFQge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRyeUdldChrZXksICh2YWwpID0+IHsgcmVzdWx0ID0gdmFsOyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB0cnlHZXQoa2V5OiBzdHJpbmcsIGxhbWJkYTogKHZhbDogYW55KSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5zKGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGxhbWJkYSh0aGlzLmV2YWx1YXRlKHRoaXMuZW50cmllc1trZXldKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnBhcmVudC50cnlHZXQoa2V5LCBsYW1iZGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW50cmllc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTY2VuZVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2NlbmVIaWVyYXJjaHk6IFNjZW5lSXRlbVdlYkdMID0gbmV3IFNjZW5lSXRlbVdlYkdMKHRoaXMsICcnKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGUgPSBuZXcgUmVuZGVyU3RhdGUoKTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBTY2VuZUhpZXJhcmNoeSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVIaWVyYXJjaHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IElzSW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzSW5pdGlhbGl6ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IElzSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFN0YXRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldERpcnR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0RpcnR5KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZW5kZXIoY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlNjZW5lQ2F0ZWdvcnkgPSB0aGlzLmdldFNjZW5lQ2F0ZWdvcnkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGVSdW5uaW5nU2VxdWVuY2VzKGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQucHVzaFN0YXRlKHRoaXMuc3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVIaWVyYXJjaHkucmVuZGVyKGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQucG9wU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFNjZW5lSXRlbShzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMLCBtYWtlVmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lSGllcmFyY2h5LmFkZENoaWxkKHNjZW5lSXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRTY2VuZUl0ZW0oc2NlbmVJdGVtSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2VuZUhpZXJhcmNoeS5nZXRDaGlsZChzY2VuZUl0ZW1JRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlU2NlbmVJdGVtKHNjZW5lSXRlbUlEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUhpZXJhcmNoeS5yZW1vdmVDaGlsZChzY2VuZUl0ZW1JRCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW5zZXJ0U2NlbmVJdGVtKHNjZW5lSXRlbTogU2NlbmVJdGVtV2ViR0wsIGluZGV4OiBudW1iZXIsIG1ha2VWaXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVIaWVyYXJjaHkuaW5zZXJ0Q2hpbGQoc2NlbmVJdGVtLCBpbmRleCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0U2NlbmVDYXRlZ29yeSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEludGVyc2VjdGlvbkNhbmRpZGF0ZXMocmF5OiBwc2dlb21ldHJ5LkxpbmUzRCwgY2FuZGlkYXRlczogQXJyYXk8SW50ZXJzZWN0aW9uQ2FuZGlkYXRlPikge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lSGllcmFyY2h5LmFkZEludGVyc2VjdGlvbkNhbmRpZGF0ZXMocmF5LCBjYW5kaWRhdGVzKTtcclxuICAgICAgICAgICAgY2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhLmNvbXBhcmUoYik7IH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmVnaW5GcmFtZSgpIHt9XHJcblxyXG4gICAgICAgIC8qKiBVcGRhdGUgaXMgY2FsbGVkIHBlcmlvZGljYWxseSAob25jZSBwZXIgZnJhbWUpIHRvIGFsbG93IHVwZGF0aW5nIHRoZSBzdGF0ZSBvZiB0aGUgc2NlbmUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKSB7fVxyXG5cclxuICAgICAgICBwdWJsaWMgZW5kRnJhbWUoKSB7fVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuICAgICAgICBwcm90ZWN0ZWQgcHJvamVjdGlvbk1hdHJpeDogcHNnZW9tZXRyeS5NYXRyaXg0O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaW52ZXJzZVByb2plY3Rpb25NYXRyaXg6IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpZXdNYXRyaXg6IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGludmVyc2VWaWV3TWF0cml4OiBwc2dlb21ldHJ5Lk1hdHJpeDQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGlydHkgPSB0cnVlO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFByb2plY3Rpb25NYXRyaXgoKSB7IHJldHVybiB0aGlzLnByb2plY3Rpb25NYXRyaXg7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBWaWV3TWF0cml4KCkgeyByZXR1cm4gdGhpcy52aWV3TWF0cml4OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzZXREaXJ0eSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaXNEaXJ0eSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlVmlld01hdHJpeChleWU6IHBzZ2VvbWV0cnkuVmVjMywgY2VudGVyOiBwc2dlb21ldHJ5LlZlYzMsIHVwOiBwc2dlb21ldHJ5LlZlYzMpOiBwc2dlb21ldHJ5Lk1hdHJpeDQge1xyXG4gICAgICAgICAgICBsZXQgeiA9IGV5ZS5zdWIoY2VudGVyKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgbGV0IHggPSB1cC5jcm9zcyh6KS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgbGV0IHkgPSB6LmNyb3NzKHgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG0gPSBuZXcgcHNnZW9tZXRyeS5NYXRyaXg0KFt4LngsIHgueSwgeC56LCAwLFxyXG4gICAgICAgICAgICB5LngsIHkueSwgeS56LCAwLFxyXG4gICAgICAgICAgICB6LngsIHoueSwgei56LCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgMCwgMV0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHQgPSBuZXcgcHNnZW9tZXRyeS5NYXRyaXg0KFsxLCAwLCAwLCAtZXllLngsXHJcbiAgICAgICAgICAgICAgICAwLCAxLCAwLCAtZXllLnksXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAxLCAtZXllLnosXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAwLCAxXSk7XHJcbiAgICAgICAgICAgIHJldHVybiA8cHNnZW9tZXRyeS5NYXRyaXg0PnQubXVsdGlwbHkobSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlUGVyc3BlY3RpdmVNYXRyaXgoZm92eSwgYXNwZWN0LCB6bmVhciwgemZhcik6IHBzZ2VvbWV0cnkuTWF0cml4NCB7XHJcbiAgICAgICAgICAgIGxldCB5bWF4ID0gem5lYXIgKiBNYXRoLnRhbihmb3Z5ICogTWF0aC5QSSAvIDM2MC4wKTtcclxuICAgICAgICAgICAgbGV0IHltaW4gPSAteW1heDtcclxuICAgICAgICAgICAgbGV0IHhtaW4gPSB5bWluICogYXNwZWN0O1xyXG4gICAgICAgICAgICBsZXQgeG1heCA9IHltYXggKiBhc3BlY3Q7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYWtlRnJ1c3R1bSh4bWluLCB4bWF4LCB5bWluLCB5bWF4LCB6bmVhciwgemZhcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlT3J0aG9ncmFwaGljTWF0cml4KGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKTogcHNnZW9tZXRyeS5NYXRyaXg0IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBwc2dlb21ldHJ5Lk1hdHJpeDQoW1xyXG4gICAgICAgICAgICAgICAgMiAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMiAvICh0b3AgLSBib3R0b20pLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgMiAvIChuZWFyIC0gZmFyKSwgMCxcclxuXHJcbiAgICAgICAgICAgICAgICAobGVmdCArIHJpZ2h0KSAvIChsZWZ0IC0gcmlnaHQpLFxyXG4gICAgICAgICAgICAgICAgKGJvdHRvbSArIHRvcCkgLyAoYm90dG9tIC0gdG9wKSxcclxuICAgICAgICAgICAgICAgIChuZWFyICsgZmFyKSAvIChuZWFyIC0gZmFyKSxcclxuICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG1ha2VGcnVzdHVtKGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgem5lYXIsIHpmYXIpOiBwc2dlb21ldHJ5Lk1hdHJpeDQge1xyXG4gICAgICAgICAgICBsZXQgWDogbnVtYmVyID0gMiAqIHpuZWFyIC8gKHJpZ2h0IC0gbGVmdCk7XHJcbiAgICAgICAgICAgIGxldCBZOiBudW1iZXIgPSAyICogem5lYXIgLyAodG9wIC0gYm90dG9tKTtcclxuICAgICAgICAgICAgbGV0IEE6IG51bWJlciA9IChyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCk7XHJcbiAgICAgICAgICAgIGxldCBCOiBudW1iZXIgPSAodG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pO1xyXG4gICAgICAgICAgICBsZXQgQzogbnVtYmVyID0gLSh6ZmFyICsgem5lYXIpIC8gKHpmYXIgLSB6bmVhcik7XHJcbiAgICAgICAgICAgIGxldCBEOiBudW1iZXIgPSAtMiAqIHpmYXIgKiB6bmVhciAvICh6ZmFyIC0gem5lYXIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBwc2dlb21ldHJ5Lk1hdHJpeDQoW1xyXG4gICAgICAgICAgICAgICAgWCwgMCwgQSwgMCxcclxuICAgICAgICAgICAgICAgIDAsIFksIEIsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCBDLCBELFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgLTEsIDBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFkb3dDYW1lcmFXZWJHTCBleHRlbmRzIENhbWVyYSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZG93TWFwV2lkdGggPSAxMDI0O1xyXG5cclxuICAgICAgICBwcml2YXRlIHNoYWRvd01hcEhlaWdodCA9IDEwMjQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZG93RnJhbWVidWZmZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZG93RGVwdGhUZXh0dXJlOyBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJCdWZmZXI7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgcmVzaXplKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSB0aGlzLmNyZWF0ZU9ydGhvZ3JhcGhpY01hdHJpeCgtNSwgNSwgLTUsIDUsIC0zMCwgMzApO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShuZXcgcHNnZW9tZXRyeS5WZWMzKDAsIDEwLCAwKSwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLCAwLCAwKSwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLCAwLCAtMSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dGcmFtZWJ1ZmZlciA9IHN0YWdlLmdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93RGVwdGhUZXh0dXJlID0gc3RhZ2UuZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckJ1ZmZlciA9IHN0YWdlLmdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNoYWRvd1RleHR1cmUgPSBuZXcgVGV4dHVyZUFzc2V0V2ViR0woc3RhZ2UsIHRoaXMuc2hhZG93RGVwdGhUZXh0dXJlKTtcclxuICAgICAgICAgICAgc3RhZ2UuQXNzZXRTdG9yZS5hZGRUZXh0dXJlQXNzZXQoJ1NoYWRvdycsIHNoYWRvd1RleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEZyYW1lYnVmZmVyKHN0YWdlLmdsLkZSQU1FQlVGRkVSLCB0aGlzLnNoYWRvd0ZyYW1lYnVmZmVyKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgdGhpcy5zaGFkb3dEZXB0aFRleHR1cmUpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC50ZXhQYXJhbWV0ZXJpKHN0YWdlLmdsLlRFWFRVUkVfMkQsIHN0YWdlLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgc3RhZ2UuZ2wuTElORUFSKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wudGV4UGFyYW1ldGVyaShzdGFnZS5nbC5URVhUVVJFXzJELCBzdGFnZS5nbC5URVhUVVJFX01JTl9GSUxURVIsIHN0YWdlLmdsLkxJTkVBUik7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLnRleEltYWdlMkQoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgMCwgc3RhZ2UuZ2wuUkdCQSwgdGhpcy5zaGFkb3dNYXBXaWR0aCwgdGhpcy5zaGFkb3dNYXBIZWlnaHQsIDAsIHN0YWdlLmdsLlJHQkEsIHN0YWdlLmdsLlVOU0lHTkVEX0JZVEUsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFJlbmRlcmJ1ZmZlcihzdGFnZS5nbC5SRU5ERVJCVUZGRVIsIHRoaXMucmVuZGVyQnVmZmVyKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wucmVuZGVyYnVmZmVyU3RvcmFnZShzdGFnZS5nbC5SRU5ERVJCVUZGRVIsIHN0YWdlLmdsLkRFUFRIX0NPTVBPTkVOVDE2LCB0aGlzLnNoYWRvd01hcFdpZHRoLCB0aGlzLnNoYWRvd01hcEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChzdGFnZS5nbC5GUkFNRUJVRkZFUiwgc3RhZ2UuZ2wuQ09MT1JfQVRUQUNITUVOVDAsIHN0YWdlLmdsLlRFWFRVUkVfMkQsIHRoaXMuc2hhZG93RGVwdGhUZXh0dXJlLCAwKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoc3RhZ2UuZ2wuRlJBTUVCVUZGRVIsIHN0YWdlLmdsLkRFUFRIX0FUVEFDSE1FTlQsIHN0YWdlLmdsLlJFTkRFUkJVRkZFUiwgdGhpcy5yZW5kZXJCdWZmZXIpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRSZW5kZXJidWZmZXIoc3RhZ2UuZ2wuUkVOREVSQlVGRkVSLCBudWxsKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlU2hhZG93QXJlYShiYm94OiBwc2dlb21ldHJ5LkFBQkIyRCkge1xyXG4gICAgICAgICAgICB2YXIgY2VudGVyID0gYmJveC5jZW50ZXIoKTtcclxuICAgICAgICAgICAgdmFyIGV4dGVudHMgPSBiYm94LmV4dGVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gdGhpcy5jcmVhdGVPcnRob2dyYXBoaWNNYXRyaXgoLWV4dGVudHMueCAvIDIsIGV4dGVudHMueCAvIDIsIC1leHRlbnRzLnkgLyAyLCBleHRlbnRzLnkgLyAyLCAtMzAsIDMwKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUobmV3IHBzZ2VvbWV0cnkuVmVjMyhjZW50ZXIueCwgMTAsIGNlbnRlci55KSwgbmV3IHBzZ2VvbWV0cnkuVmVjMyhjZW50ZXIueCwgMCwgY2VudGVyLnkpLCBuZXcgcHNnZW9tZXRyeS5WZWMzKDAsIDAsIC0xKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGUocG9zOiBwc2dlb21ldHJ5LlZlYzMsIGxvb2tBdDogcHNnZW9tZXRyeS5WZWMzLCB1cDogcHNnZW9tZXRyeS5WZWMzKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld01hdHJpeCA9IHRoaXMuY3JlYXRlVmlld01hdHJpeChwb3MsIGxvb2tBdCwgdXApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXREaXJ0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luUmVuZGVyKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRGcmFtZWJ1ZmZlcihzdGFnZS5nbC5GUkFNRUJVRkZFUiwgdGhpcy5zaGFkb3dGcmFtZWJ1ZmZlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIHZpZXdwb3J0IHRvIG1hdGNoXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuc2hhZG93TWFwV2lkdGgsIHRoaXMuc2hhZG93TWFwSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmNsZWFyQ29sb3IoMC4yLCAwLjIsIDAuMiwgMC4wKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY2xlYXJEZXB0aCgwLjApO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5jbGVhcihzdGFnZS5nbC5DT0xPUl9CVUZGRVJfQklUIHwgc3RhZ2UuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5lbmFibGUoc3RhZ2UuZ2wuREVQVEhfVEVTVCk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmVuYWJsZShzdGFnZS5nbC5DVUxMX0ZBQ0UpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5mcm9udEZhY2Uoc3RhZ2UuZ2wuQ0NXKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY3VsbEZhY2Uoc3RhZ2UuZ2wuQkFDSyk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmRlcHRoRnVuYyhzdGFnZS5nbC5HRVFVQUwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVuZFJlbmRlcihzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENhbWVyYVdlYkdMIGV4dGVuZHMgQ2FtZXJhIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50Q2FtZXJhUG9zOiBwc2dlb21ldHJ5LlZlYzM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xpZW50V2lkdGg6IG51bWJlciA9IDEuMDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjbGllbnRIZWlnaHQ6IG51bWJlciA9IDEuMDtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUHJvamVjdGlvbk1hdHJpeCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdGlvbk1hdHJpeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgVmlld01hdHJpeCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlld01hdHJpeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZXNpemUoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHJlYWxUb0NTU1BpeGVscyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFdpZHRoID0gc3RhZ2UuZ2wuY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudEhlaWdodCA9IHN0YWdlLmdsLmNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAvLyBMb29rdXAgdGhlIHNpemUgdGhlIGJyb3dzZXIgaXMgZGlzcGxheWluZyB0aGUgY2FudmFzIGluIENTUyBwaXhlbHNcclxuICAgICAgICAgICAgLy8gYW5kIGNvbXB1dGUgYSBzaXplIG5lZWRlZCB0byBtYWtlIG91ciBkcmF3aW5nYnVmZmVyIG1hdGNoIGl0IGluXHJcbiAgICAgICAgICAgIC8vIGRldmljZSBwaXhlbHMuXHJcbiAgICAgICAgICAgIGxldCBkaXNwbGF5V2lkdGggPSBNYXRoLmZsb29yKHN0YWdlLmdsLmNhbnZhcy5jbGllbnRXaWR0aCAqIHJlYWxUb0NTU1BpeGVscyk7XHJcbiAgICAgICAgICAgIGxldCBkaXNwbGF5SGVpZ2h0ID0gTWF0aC5mbG9vcihzdGFnZS5nbC5jYW52YXMuY2xpZW50SGVpZ2h0ICogcmVhbFRvQ1NTUGl4ZWxzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIGNhbnZhcyB0aGUgc2FtZSBzaXplXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmNhbnZhcy53aWR0aCA9IGRpc3BsYXlXaWR0aCAvIHJlYWxUb0NTU1BpeGVscztcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY2FudmFzLmhlaWdodCA9IGRpc3BsYXlIZWlnaHQgLyByZWFsVG9DU1NQaXhlbHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSB0aGlzLmNyZWF0ZVBlcnNwZWN0aXZlTWF0cml4KDQ1LjAsIHN0YWdlLmdsLmNhbnZhcy5jbGllbnRXaWR0aCAvIHN0YWdlLmdsLmNhbnZhcy5jbGllbnRIZWlnaHQsIDAuMSwgMjAwLjApO1xyXG4gICAgICAgICAgICAvL3RoaXMucHJvamVjdGlvbk1hdHJpeCA9IHRoaXMuY3JlYXRlT3J0aG9ncmFwaGljTWF0cml4KC01LCA1LCAtNSwgNSwgLTMwLCAzMCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW52ZXJzZVByb2plY3Rpb25NYXRyaXggPSB0aGlzLnByb2plY3Rpb25NYXRyaXguaW52ZXJzZSgpO1xyXG4gICAgICAgICAgICAvL3RoaXMudmlld01hdHJpeCA9IHRoaXMuY3JlYXRlVmlld01hdHJpeChuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMS44LCAxNS4wKSwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDAuMCwgMC4wKSwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDEuMCwgMC4wKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlKHBvczogcHNnZW9tZXRyeS5WZWMzLCBsb29rQXQ6IHBzZ2VvbWV0cnkuVmVjMywgdXA6IHBzZ2VvbWV0cnkuVmVjMykge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDYW1lcmFQb3MgPSBwb3M7XHJcbiAgICAgICAgICAgIHRoaXMudmlld01hdHJpeCA9IHRoaXMuY3JlYXRlVmlld01hdHJpeChwb3MsIGxvb2tBdCwgdXApO1xyXG4gICAgICAgICAgICB0aGlzLmludmVyc2VWaWV3TWF0cml4ID0gdGhpcy52aWV3TWF0cml4LmludmVyc2UoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiZWdpblJlbmRlcihzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHRoZSB2aWV3cG9ydCB0byBtYXRjaFxyXG4gICAgICAgICAgICBzdGFnZS5nbC52aWV3cG9ydCgwLCAwLCBzdGFnZS5nbC5jYW52YXMuY2xpZW50V2lkdGgsIHN0YWdlLmdsLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEZyYW1lYnVmZmVyKHN0YWdlLmdsLkZSQU1FQlVGRkVSLCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmNsZWFyQ29sb3IoMC4zLCAwLjMsIDAuMywgMS4wKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY2xlYXJEZXB0aCgxLjApO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5jbGVhcihzdGFnZS5nbC5ERVBUSF9CVUZGRVJfQklUKTsgLy8gc3RhZ2UuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IFxyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuZW5hYmxlKHN0YWdlLmdsLkRFUFRIX1RFU1QpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5lbmFibGUoc3RhZ2UuZ2wuQ1VMTF9GQUNFKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuZnJvbnRGYWNlKHN0YWdlLmdsLkNDVyk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmN1bGxGYWNlKHN0YWdlLmdsLkJBQ0spO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5kZXB0aEZ1bmMoc3RhZ2UuZ2wuTEVRVUFMKTsgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW5kUmVuZGVyKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Vmlld1JheShjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcik6IHBzZ2VvbWV0cnkuTGluZTNEIHtcclxuICAgICAgICAgICAgbGV0IGN1cnNvciA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoY2xpZW50WCAvIHRoaXMuY2xpZW50V2lkdGggKiAyLjAgLSAxLjAsIDEuMCAtIGNsaWVudFkgLyB0aGlzLmNsaWVudEhlaWdodCAqIDIuMCwgLTEuMCwgMS4wKTtcclxuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IDxwc2dlb21ldHJ5LlZlYzQ+dGhpcy5pbnZlcnNlUHJvamVjdGlvbk1hdHJpeC5tdWx0aXBseShjdXJzb3IpO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24udyA9IDEuMDtcclxuICAgICAgICAgICAgbGV0IGZvcndhcmQgPSB0aGlzLmludmVyc2VWaWV3TWF0cml4Lm11bHRpcGx5KGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcHNnZW9tZXRyeS5MaW5lM0QodGhpcy5jdXJyZW50Q2FtZXJhUG9zLCBmb3J3YXJkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNJbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmVydGV4U2hhZGVyOiBXZWJHTFNoYWRlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGZyYWdtZW50U2hhZGVyOiBXZWJHTFNoYWRlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHByb2dyYW06IFdlYkdMUHJvZ3JhbTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBQcm9ncmFtKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0luaXRpYWxpemVkICYmIHRoaXMuYmVnaW5SZW5kZXIoY29udGV4dCwgc2hhZGVySW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0YWdlLmFwcGx5U3RhdGUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVybmFsUmVuZGVyKGNvbnRleHQsIHNoYWRlckluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kUmVuZGVyKGNvbnRleHQsIHNoYWRlckluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEF0dHJpYkxvY2F0aW9uKHN0YWdlOiBTdGFnZVdlYkdMLCBhdHRyaWJOYW1lOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhZ2UuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCBhdHRyaWJOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBiZWdpblJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0YWdlLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgU0laRV9PRl9GTE9BVCA9IDQ7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGVuZFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSBzdGFnZS5Ub29scy5jcmVhdGVTaGFkZXIoc3RhZ2UuZ2wuVkVSVEVYX1NIQURFUiwgdGhpcy5nZXRWZXJ0ZXhTaGFkZXJTcmMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBzdGFnZS5Ub29scy5jcmVhdGVTaGFkZXIoc3RhZ2UuZ2wuRlJBR01FTlRfU0hBREVSLCB0aGlzLmdldEZyYWdtZW50U2hhZGVyU3JjKCkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wcm9ncmFtID0gc3RhZ2UuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy52ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLmZyYWdtZW50U2hhZGVyKTtcclxuXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmxpbmtQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5kZXRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmRldGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMuZnJhZ21lbnRTaGFkZXIpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3RhZ2UuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcm9ncmFtKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFZlcnRleFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RnJhZ21lbnRTaGFkZXJTcmMoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE9wYXF1ZU1lc2hTaGFkZXJQcm9ncmFtV2ViR0wgZXh0ZW5kcyBTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0U3RyaWRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TSVpFX09GX0ZMT0FUICogOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBsZXQgc3RhZ2UgPSBjb250ZXh0LlN0YWdlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1ZmZlcktleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnSW5kZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcktleSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZChzdGFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FQb3NpdGlvbicpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCAwKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FOb3JtYWwnKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgMyAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhQ29sb3InKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgNiAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZHJhdyB0cmlhbmdsZXNcclxuICAgICAgICAgICAgICAgIGxldCB0cmlhbmdsZUNvdW50ID0gYnVmZmVyQXNzZXQuQnVmZmVyU2l6ZSAvIHRoaXMuZ2V0U3RyaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5kcmF3RWxlbWVudHMoc3RhZ2UuZ2wuVFJJQU5HTEVTLCB0cmlhbmdsZUNvdW50LCBzdGFnZS5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJpbmQgd2l0aCAwLCBzbywgc3dpdGNoIGJhY2sgdG8gbm9ybWFsIHBvaW50ZXIgb3BlcmF0aW9uXHJcbiAgICAgICAgICAgICAgICAvL3N0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIDApO1xyXG4gICAgICAgICAgICAgICAgLy9zdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VmVydGV4U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdW5pZm9ybSBtYXQ0IHVNTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVWTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVQTWF0cml4O1xyXG5cclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFOb3JtYWw7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhQ29sb3I7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyeWluZyBtZWRpdW1wIHZlYzQgdkNvbG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHVQTWF0cml4ICogdVZNYXRyaXggKiB1TU1hdHJpeCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBub3JtYWwgPSBhTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBkaWZmdXNlQ29sb3IgPSB2ZWM0KGFDb2xvciwgMS4wKTtcclxuICAgICAgICAgICAgICAgICAgIHZlYzQgYW1iaWVudENvbG9yID0gdmVjNCgxLjAsIDEuMCwgMS4wLCAxLjApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHZlYzMgbGlnaHREaXIgPSB2ZWMzKDAuOSwgMC43LCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgbWVkaXVtcCBmbG9hdCBsaWdodEludGVuc2l0eSA9IGNsYW1wKGRvdChub3JtYWxpemUobm9ybWFsKSwgbm9ybWFsaXplKGxpZ2h0RGlyKSksIDAuMCwgMS4wKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2Q29sb3IgPSB2ZWM0KChhQ29sb3IgKiAwLjY1ICsgYW1iaWVudENvbG9yLnJnYiAqIDAuMzUpKigwLjcgKyBsaWdodEludGVuc2l0eSAqIDAuMyksIDEuMCk7XHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRGcmFnbWVudFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYHZhcnlpbmcgbWVkaXVtcCB2ZWM0IHZDb2xvcjtcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdkNvbG9yO1xyXG4gICAgICAgICAgICAgICAgfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVHJhbnNwYXJlbnRNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMIGV4dGVuZHMgU2hhZGVyUHJvZ3JhbVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldFN0cmlkZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuU0laRV9PRl9GTE9BVCAqIDEwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCwgc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFnZSA9IGNvbnRleHQuU3RhZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgYnVmZmVyS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdJbmRleEJ1ZmZlcicpO1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZmVyQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldEJ1ZmZlckFzc2V0KGJ1ZmZlcktleSk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kKHN0YWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXJLZXkgPSBzaGFkZXJJbnN0YW5jZS5nZXRSZWZlcmVuY2UoJ1ZlcnRleEJ1ZmZlcicpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldEJ1ZmZlckFzc2V0KGJ1ZmZlcktleSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYVBvc2l0aW9uJyksIDMsIHRoaXMuZ2V0U3RyaWRlKCksIDApO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYU5vcm1hbCcpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCAzICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FDb2xvcicpLCA0LCB0aGlzLmdldFN0cmlkZSgpLCA2ICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5lbmFibGUoc3RhZ2UuZ2wuQkxFTkQpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmxlbmRGdW5jKHN0YWdlLmdsLlNSQ19BTFBIQSwgc3RhZ2UuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5kZXB0aE1hc2soZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRyYXcgdHJpYW5nbGVzXHJcbiAgICAgICAgICAgICAgICBsZXQgdHJpYW5nbGVDb3VudCA9IGJ1ZmZlckFzc2V0LkJ1ZmZlclNpemUgLyB0aGlzLmdldFN0cmlkZSgpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuZHJhd0VsZW1lbnRzKHN0YWdlLmdsLlRSSUFOR0xFUywgdHJpYW5nbGVDb3VudCwgc3RhZ2UuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5kZXB0aE1hc2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5kaXNhYmxlKHN0YWdlLmdsLkJMRU5EKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBiaW5kIHdpdGggMCwgc28sIHN3aXRjaCBiYWNrIHRvIG5vcm1hbCBwb2ludGVyIG9wZXJhdGlvblxyXG4gICAgICAgICAgICAgICAgLy9zdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCAwKTtcclxuICAgICAgICAgICAgICAgIC8vc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5BUlJBWV9CVUZGRVIsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGdldFZlcnRleFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYHVuaWZvcm0gbWF0NCB1TU1hdHJpeDtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm0gbWF0NCB1Vk1hdHJpeDtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm0gbWF0NCB1UE1hdHJpeDtcclxuXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzQgYUNvbG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWM0IHZDb2xvcjtcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSB1UE1hdHJpeCAqIHVWTWF0cml4ICogdU1NYXRyaXggKiB2ZWM0KGFQb3NpdGlvbiwgMS4wKTtcclxuICAgICAgICAgICAgICAgICAgIHZlYzMgbm9ybWFsID0gYU5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgIHZlYzQgZGlmZnVzZUNvbG9yID0gYUNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBhbWJpZW50Q29sb3IgPSB2ZWM0KDEuMCwgMS4wLCAxLjAsIDEuMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBsaWdodERpciA9IHZlYzMoMC45LCAwLjcsIDEuMCk7XHJcbiAgICAgICAgICAgICAgICAgICBtZWRpdW1wIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gY2xhbXAoZG90KG5vcm1hbGl6ZShub3JtYWwpLCBub3JtYWxpemUobGlnaHREaXIpKSwgMC4wLCAxLjApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHZDb2xvciA9IHZlYzQoKGFDb2xvci5yZ2IgKiAwLjY1ICsgYW1iaWVudENvbG9yLnJnYiAqIDAuMzUpKigwLjcgKyBsaWdodEludGVuc2l0eSAqIDAuMyksIGFDb2xvci5hKTtcclxuICAgICAgICAgICAgICAgIH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEZyYWdtZW50U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdmFyeWluZyBtZWRpdW1wIHZlYzQgdkNvbG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBlbnVtIFRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1WYXJpYW50cyB7XHJcbiAgICAgICAgRGlmZnVzZSxcclxuICAgICAgICBNYXRjYXBcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMIGV4dGVuZHMgU2hhZGVyUHJvZ3JhbVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFyaWFudDogVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzID0gVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzLkRpZmZ1c2UpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBnZXRTdHJpZGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlNJWkVfT0ZfRkxPQVQgKiAxMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBsZXQgc3RhZ2UgPSBjb250ZXh0LlN0YWdlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1ZmZlcktleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnSW5kZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcktleSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZChzdGFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FQb3NpdGlvbicpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCAwKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FOb3JtYWwnKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgMyAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhQ29sb3InKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgNiAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhVGV4dHVyZUNvb3JkcycpLCAyLCB0aGlzLmdldFN0cmlkZSgpLCA5ICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dHVyZUtleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnVGV4dHVyZUJ1ZmZlcicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHR1cmVBc3NldCA9IHN0YWdlLkFzc2V0U3RvcmUuZ2V0VGV4dHVyZUFzc2V0KHRleHR1cmVLZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHR1cmVBc3NldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmVBc3NldC5iaW5kKHN0YWdlLCB0aGlzLCAndVRleHR1cmUwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRyYXcgdHJpYW5nbGVzXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyaWFuZ2xlQ291bnQgPSBidWZmZXJBc3NldC5CdWZmZXJTaXplIC8gdGhpcy5nZXRTdHJpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFnZS5nbC5kcmF3RWxlbWVudHMoc3RhZ2UuZ2wuVFJJQU5HTEVTLCB0cmlhbmdsZUNvdW50LCBzdGFnZS5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJpbmQgd2l0aCAwLCBzbywgc3dpdGNoIGJhY2sgdG8gbm9ybWFsIHBvaW50ZXIgb3BlcmF0aW9uXHJcbiAgICAgICAgICAgICAgICAvL3N0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIDApO1xyXG4gICAgICAgICAgICAgICAgLy9zdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRWZXJ0ZXhTaGFkZXJTcmMoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGB1bmlmb3JtIG1hdDQgdU1NYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVZNYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVBNYXRyaXg7XHJcblxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYVBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYU5vcm1hbDtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFDb2xvcjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWM0IHZDb2xvcjtcclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWMyIHZUZXh0dXJlQ29vcmRzO1xyXG4gICAgICAgICAgICAgICAgdmFyeWluZyBtZWRpdW1wIGZsb2F0IHZMaWdodEludGVuc2l0eTtcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBwb3MgPSB1TU1hdHJpeCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSB1UE1hdHJpeCAqIHVWTWF0cml4ICogcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUodU1NYXRyaXggKiB2ZWM0KGFOb3JtYWwsIDAuMCkpLnh5ejtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2ZWMzIGxpZ2h0RGlyID0gdmVjMygwLjksIDAuNywgMS4wKTtcclxuICAgICAgICAgICAgICAgICAgIHZMaWdodEludGVuc2l0eSA9IGNsYW1wKGRvdChub3JtYWxpemUobm9ybWFsKSwgbm9ybWFsaXplKGxpZ2h0RGlyKSksIDAuMCwgMS4wKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2Q29sb3IgPSB2ZWM0KGFDb2xvciwgMS4wKTtcclxuYDtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52YXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1WYXJpYW50cy5EaWZmdXNlOiByZXN1bHQgKz1cclxuICAgICAgICAgICAgICAgICAgICBgdlRleHR1cmVDb29yZHMgPSBhVGV4dHVyZUNvb3JkcztcclxuYDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzLk1hdGNhcDogcmVzdWx0ICs9XHJcbiAgICAgICAgICAgICAgICAgICAgYHZlYzMgZSA9IG5vcm1hbGl6ZShwb3MueHl6KTtcclxuXHQgICAgICAgICAgICAgICAgIHZlYzMgciA9IHJlZmxlY3QoZSwgKHVWTWF0cml4ICogdmVjNChub3JtYWwsIDAuMCkpLnh5eik7XHJcblx0ICAgICAgICAgICAgICAgICBtZWRpdW1wIGZsb2F0IG0gPSAyLiAqIGxlbmd0aCh2ZWMzKHIueCwgci55LCByLnogKyAxLikpO1xyXG5cdCAgICAgICAgICAgICAgICAgdlRleHR1cmVDb29yZHMgPSByLnh5IC8gbSArIC41O1xyXG5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXN1bHQgKz0gYH1gO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRGcmFnbWVudFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlMDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjNCB2Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjMiB2VGV4dHVyZUNvb3JkcztcclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCBmbG9hdCB2TGlnaHRJbnRlbnNpdHk7XHJcblxyXG4gICAgICAgICAgICAgICAgdm9pZCBtYWluKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgXHQgICAgbWVkaXVtcCB2ZWM0IHRleENvbG9yID0gdGV4dHVyZTJEKHVUZXh0dXJlMCwgdmVjMih2VGV4dHVyZUNvb3Jkcy54LCAxLjAgLSB2VGV4dHVyZUNvb3Jkcy55KSk7XHJcbmA7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52YXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1WYXJpYW50cy5EaWZmdXNlOiByZXN1bHQgKz1cclxuICAgICAgICAgICAgICAgICAgICBgZ2xfRnJhZ0NvbG9yID0gdmVjNChjbGFtcCh0ZXhDb2xvci54eXogKiAoMS4wICsgLjE1ICogdkxpZ2h0SW50ZW5zaXR5KSwgMC4wLCAxLjApLCB0ZXhDb2xvci5hKTsgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1WYXJpYW50cy5NYXRjYXA6IHJlc3VsdCArPSBcclxuICAgICAgICAgICAgICAgICAgICBgZ2xfRnJhZ0NvbG9yID0gdGV4Q29sb3IuYTsgICBcclxuYDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0ICs9IGB9YDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFkb3dUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtV2ViR0wgZXh0ZW5kcyBUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VmVydGV4U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdW5pZm9ybSBtYXQ0IHVNTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVWTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVQTWF0cml4O1xyXG5cclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFOb3JtYWw7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkcztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgZmxvYXQgaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHVQTWF0cml4ICogdVZNYXRyaXggKiB1TU1hdHJpeCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gKHVNTWF0cml4ICogdmVjNChhUG9zaXRpb24sIDEuMCkpLnk7XHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRGcmFnbWVudFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlMDtcclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCBmbG9hdCBoZWlnaHQ7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCguMiwgLjIsIC4yLCBjbGFtcCgxLjAgLSAoaGVpZ2h0IC8gMy4wKSwgMC4wLCAxLjApKTsgXHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRDYXBTaGFkZXJQcm9ncmFtV2ViR0wgZXh0ZW5kcyBTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0U3RyaWRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TSVpFX09GX0ZMT0FUICogMTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxSZW5kZXIoY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMLCBzaGFkZXJJbnN0YW5jZTogU2hhZGVySW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgbGV0IHN0YWdlID0gY29udGV4dC5TdGFnZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBidWZmZXJLZXkgPSBzaGFkZXJJbnN0YW5jZS5nZXRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJyk7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJLZXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmZXJBc3NldCA9IHN0YWdlLkFzc2V0U3RvcmUuZ2V0QnVmZmVyQXNzZXQoYnVmZmVyS2V5KTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmQoc3RhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlcktleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnVmVydGV4QnVmZmVyJyk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldCA9IHN0YWdlLkFzc2V0U3RvcmUuZ2V0QnVmZmVyQXNzZXQoYnVmZmVyS2V5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhUG9zaXRpb24nKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgMCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhTm9ybWFsJyksIDMsIHRoaXMuZ2V0U3RyaWRlKCksIDMgKiB0aGlzLlNJWkVfT0ZfRkxPQVQpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYUNvbG9yJyksIDMsIHRoaXMuZ2V0U3RyaWRlKCksIDYgKiB0aGlzLlNJWkVfT0ZfRkxPQVQpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYVRleHR1cmVDb29yZHMnKSwgMiwgdGhpcy5nZXRTdHJpZGUoKSwgOSAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRleHR1cmVLZXkgPSBzaGFkZXJJbnN0YW5jZS5nZXRSZWZlcmVuY2UoJ1RleHR1cmVCdWZmZXInKTtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0dXJlQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldFRleHR1cmVBc3NldCh0ZXh0dXJlS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlQXNzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlQXNzZXQuYmluZChzdGFnZSwgdGhpcywgJ3VUZXh0dXJlMCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBjb250ZXh0LlN0YXRlLmdldCgnQ29sb3InLCBwc2dlb21ldHJ5LlZlYzQuT25lKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdUNvbG9yTG9jID0gc3RhZ2UuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgJ3VDb2xvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLmdsLnVuaWZvcm00ZnYodUNvbG9yTG9jLCBjb2xvci5lbGVtZW50cygpKTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRyYXcgdHJpYW5nbGVzXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyaWFuZ2xlQ291bnQgPSBidWZmZXJBc3NldC5CdWZmZXJTaXplIC8gdGhpcy5nZXRTdHJpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFnZS5nbC5kcmF3RWxlbWVudHMoc3RhZ2UuZ2wuVFJJQU5HTEVTLCB0cmlhbmdsZUNvdW50LCBzdGFnZS5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VmVydGV4U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBgdW5pZm9ybSBtYXQ0IHVNTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVWTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVQTWF0cml4O1xyXG5cclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFOb3JtYWw7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkcztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjNCB2Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjMiB2VGV4dHVyZUNvb3JkcztcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBwb3MgPSB1TU1hdHJpeCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSB1UE1hdHJpeCAqIHVWTWF0cml4ICogcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUodU1NYXRyaXggKiB2ZWM0KGFOb3JtYWwsIDAuMCkpLnh5ejtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2ZWMzIGUgPSBub3JtYWxpemUocG9zLnh5eik7XHJcblx0ICAgICAgICAgICAgICAgdmVjMyByID0gcmVmbGVjdChlLCAodVZNYXRyaXggKiB2ZWM0KG5vcm1hbCwgMC4wKSkueHl6KTtcclxuXHQgICAgICAgICAgICAgICBtZWRpdW1wIGZsb2F0IG0gPSAyLiAqIGxlbmd0aCh2ZWMzKHIueCwgci55LCByLnogKyAxLikpO1xyXG5cdCAgICAgICAgICAgICAgIHZUZXh0dXJlQ29vcmRzID0gci54eSAvIG0gKyAuNTtcclxuICAgICAgICAgICAgICAgIH1gO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRGcmFnbWVudFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlMDtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm0gbWVkaXVtcCB2ZWM0IHVDb2xvcjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjNCB2Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjMiB2VGV4dHVyZUNvb3JkcztcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICBcdCAgICBtZWRpdW1wIHZlYzQgdGV4Q29sb3IgPSB0ZXh0dXJlMkQodVRleHR1cmUwLCB2ZWMyKHZUZXh0dXJlQ29vcmRzLngsIDEuMCAtIHZUZXh0dXJlQ29vcmRzLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL21lZGl1bXAgdmVjMyBncmVlbiA9IHZlYzMoMCwgMC40NCwgMC4wOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZWRpdW1wIHZlYzMgZ3JlZW4gPSB2ZWMzKDAuNjksIDAuMzQsIDAuMDApOyAgLy9vclxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVkaXVtcCB2ZWMzIGdyZWVuID0gdmVjMygwLjAyLCAwLjMxLCAwLjA2KTsgIC8vIGdcclxuICAgICAgICAgICAgICAgICAgICAvL21lZGl1bXAgdmVjMyBncmVlbiA9IHZlYzMoMC4zMSwgMC4wMiwgMC4wNik7ICAvLyByXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZWRpdW1wIHZlYzMgZ3JlZW4gPSB2ZWMzKDAuMDIsIDAuMTcsIDAuMzEpOyAgLy8gYlxyXG4gICAgICAgICAgICAgICAgICAgIG1lZGl1bXAgZmxvYXQgY29sb3JGYWMgPSAodGV4Q29sb3IueCAtIHRleENvbG9yLnkpIC8gMC42NTtcclxuICAgICAgICAgICAgICAgICAgICBtZWRpdW1wIGZsb2F0IHdoaXRlRmFjID0gKDEuMCAtIGNvbG9yRmFjKSAqIDAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVkaXVtcCB2ZWMzIGNvbG9yID0gdmVjMyh3aGl0ZUZhYywgd2hpdGVGYWMsIHdoaXRlRmFjKSArIGNvbG9yRmFjICogdUNvbG9yLnJnYjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciwgdGV4Q29sb3IuYSAqIHVDb2xvci5hKTsgICBcclxuICAgICAgICAgICAgfWA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBSZW5kZXJTdGF0ZVN0YWNrIHtcclxuICAgICAgICBwcml2YXRlIG1vZGVsVHJhbnNmb3JtOiBBcnJheTxwc2dlb21ldHJ5Lk1hdHJpeDQ+ID0gW3BzZ2VvbWV0cnkuTWF0cml4NC5JZGVudGl0eV07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhY2s6IEFycmF5PFJlbmRlclN0YXRlPiA9IFtdO1xyXG5cclxuICAgICAgICAvKiogVG9wIG9mIHRoZSBzdGF0ZSBzdGFjay5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldCBUb3AoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGV0ZXJtaW5lcyB0aGUgY3VycmVudCBtb2RlbCB0cmFuc2Zvcm1hdGlvbi5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldCBDdXJyZW50TW9kZWxUcmFuc2Zvcm0oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsVHJhbnNmb3JtW3RoaXMubW9kZWxUcmFuc2Zvcm0ubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUHVzaGVzIHRoZSBzcGVjaWZpZWQgc3RhdGUgb24gdGhlIHN0YXRlIHN0YWNrLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcHVzaFN0YXRlKHN0YXRlOiBSZW5kZXJTdGF0ZSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5QYXJlbnQgPSB0aGlzLnN0YWNrLmxlbmd0aCA9PSAwID8gbnVsbCA6IHRoaXMuVG9wO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2goc3RhdGUpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUuY29udGFpbnMoJ01vZGVsVHJhbnNmb3JtJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb2RlbFRyYW5zZm9ybSA9IHN0YXRlLmdldCgnTW9kZWxUcmFuc2Zvcm0nLCBwc2dlb21ldHJ5Lk1hdHJpeDQuSWRlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFRyYW5zZm9ybS5wdXNoKDxwc2dlb21ldHJ5Lk1hdHJpeDQ+dGhpcy5DdXJyZW50TW9kZWxUcmFuc2Zvcm0ubXVsdGlwbHkobW9kZWxUcmFuc2Zvcm0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxUcmFuc2Zvcm0ucHVzaCh0aGlzLkN1cnJlbnRNb2RlbFRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBSZW1vdmVzIHRoZSB0b3AgZWxlbWVudCBmcm9tIHRoZSBzdGF0ZSBzdGFjay5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHBvcFN0YXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLlRvcC5QYXJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsVHJhbnNmb3JtLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQSBSZW5kZXJDb250ZXh0IGluc3RhbmNlIGlzIHVzZWQgdG8gcGFzcyBlbnZpcm9ubWVudCBkYXRhIHRvIFNjZW5lSXRlbXMgZHVyaW5nIHRoZSByZW5kaXRpb24gcHJvY2Vzcy5cclxuXHQgICpcclxuXHQgICogQmVzaWRlcyB0aGUgU3RhZ2UgdGhhdCB0aGUgU2NlbmVJdGVtcyBhcmUgYmVpbmcgcmVuZGVyZWQgdG8sIHRoZSByZW5kZXIgY29udGV4dCBpcyB0aGUgb3duZXIgb2YgYSBzdGF0ZSBzdGFja1xyXG5cdCAgKiB0aGF0IG1heSBiZSB1cGRhdGVkIGJ5IFNjZW5lSXRlbXMgYW5kIHRoYXQgaXMgY29uc2VxdWVudGx5IHVzZWQgYnkgU2hhZGVyUHJvZ3JhbXMgdG8gc2V0IHNoYWRlciBkYXRhIGFuZCByZXNvdXJjZXMgKGxpa2UgbW9kZWwgdHJhbnNmb3JtYXRpb25cclxuXHQgICogYW5kIGF1eGlsaWFyeSBkYXRhKS4gQXMgU2NlbmVJdGVtcyBhcmUgb3JnYW5pemVkIGluIGEgaGllcmFyY2hpY2FsIHdheSwgdGhlIGN1cnJlbnQgc3RhdGUgbWF5IGJlIGRlZmluZWQgYnkgdGhlIGN1cnJlbnQgU2NlbmVJdGVtLCBidXRcclxuXHQgICogYWxzbyBieSBwcmV2aW91c2x5IHRyYXZlcnNlZCBTY2VuZUl0ZW1zIGluIHRoZSBzY2VuZSBoaWVyYXJjaHkuXHJcblx0ICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFJlbmRlckNvbnRleHRXZWJHTCB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGFnZTogU3RhZ2VXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYW1lcmE6IENhbWVyYTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFkZXJQcm9ncmFtOiBTaGFkZXJQcm9ncmFtV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2NlbmVDYXRlZ29yeTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGVTdGFjazogUmVuZGVyU3RhdGVTdGFjayA9IG5ldyBSZW5kZXJTdGF0ZVN0YWNrKCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kZWxUcmFuc2Zvcm06IHBzZ2VvbWV0cnkuTWF0cml4NCA9IG51bGw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbm9kZVRyYW5zZm9ybTogcHNnZW9tZXRyeS5NYXRyaXg0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwaGFzZTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUGhhc2UoKSB7IHJldHVybiB0aGlzLnBoYXNlOyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgUGhhc2UodmFsdWU6IHN0cmluZykgeyB0aGlzLnBoYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgLyoqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUgdGhhdCBpcyBjb21wb3NlZCBvZiBwcmV2aW91c2x5IHNldCBzdGF0ZSB2YWx1ZXMuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXQgU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlU3RhY2suVG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFB1c2hlcyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9uIHRoZSBzdGF0ZSBzdGFjay5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHB1c2hTdGF0ZShzdGF0ZTogUmVuZGVyU3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVN0YWNrLnB1c2hTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUmVtb3ZlcyB0aGUgdG9wIGVsZW1lbnQgZnJvbSB0aGUgc3RhdGUgc3RhY2suXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBwb3BTdGF0ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVN0YWNrLnBvcFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1vZGVsVHJhbnNmb3JtKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZVN0YWNrLkN1cnJlbnRNb2RlbFRyYW5zZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBUaGUgY3VycmVudCBzY2VuZSdzIGNhdGVnb3J5LlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lQ2F0ZWdvcnkoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjZW5lQ2F0ZWdvcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGhlIGN1cnJlbnQgc2NlbmUncyBjYXRlZ29yeS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNldCBTY2VuZUNhdGVnb3J5KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUNhdGVnb3J5ID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGhlIHN0YWdlIHRoZSBTY2VuZUl0ZW1zIGFyZSBiZWluZyByZW5kZXJlZCB0by5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldCBTdGFnZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGhlIHN0YWdlIHRoZSBTY2VuZUl0ZW1zIGFyZSBiZWluZyByZW5kZXJlZCB0by5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNldCBTdGFnZSh2YWx1ZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IENhbWVyYSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FtZXJhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBDYW1lcmEodmFsdWU6IENhbWVyYSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFRoZSBjdXJyZW50IHNoYWRlciBwcm9ncmFtLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0IFNoYWRlclByb2dyYW0oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYWRlclByb2dyYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGhlIGN1cnJlbnQgc2hhZGVyIHByb2dyYW0uXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzZXQgU2hhZGVyUHJvZ3JhbSh2YWx1ZTogU2hhZGVyUHJvZ3JhbVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBOb2RlVHJhbnNmb3JtKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlVHJhbnNmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBOb2RlVHJhbnNmb3JtKHZhbHVlOiBwc2dlb21ldHJ5Lk1hdHJpeDQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlVHJhbnNmb3JtID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdGFnZVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHVibGljIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYW1lcmE6IENhbWVyYVdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNoYWRvd0NhbWVyYTogU2hhZG93Q2FtZXJhV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIGFzc2V0RmFjdG9yeTogQXNzZXRGYWN0b3J5V2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIHBoYXNlU3BlY2lmaWNTaGFkZXJQcm9ncmFtczogeyBbaW5kZXg6IHN0cmluZ106IHsgW2luZGV4OiBzdHJpbmddOiBTaGFkZXJQcm9ncmFtV2ViR0wgfSB9ID0ge307XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZGVyUHJvZ3JhbXM6IHsgW2luZGV4OiBzdHJpbmddOiBTaGFkZXJQcm9ncmFtV2ViR0wgfSA9IHt9O1xyXG5cclxuICAgICAgICBwcml2YXRlIHRvb2xzOiBUb29sc1dlYkdMID0gbmV3IFRvb2xzV2ViR0wodGhpcyk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2FudmFzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IENhbWVyYSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FtZXJhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBUb29scygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEFzc2V0RmFjdG9yeSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXNzZXRGYWN0b3J5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBBc3NldFN0b3JlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hc3NldFN0b3JlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoY2FudmFzRWxlbWVudElkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBSZW5kZXJDb250ZXh0V2ViR0woKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5TdGFnZSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldFN0b3JlID0gbmV3IEFzc2V0U3RvcmVXZWJHTCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldEZhY3RvcnkgPSBuZXcgQXNzZXRGYWN0b3J5V2ViR0wodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzRWxlbWVudElkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW52YXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD4odGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCAodGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJykpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZXh0ID0gdGhpcy5nbC5nZXRFeHRlbnNpb24oJ09FU19lbGVtZW50X2luZGV4X3VpbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGluaXRpYWxpemUgV2ViR0wuIFlvdXIgYnJvd3NlciBtYXkgbm90IHN1cHBvcnQgaXQuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gaW5pdGlhbGl6ZSBXZWJHTC4gWW91ciBicm93c2VyIG1heSBub3Qgc3VwcG9ydCBpdC4gRXJyb3I6ICcgKyBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Q2FtZXJhID0gbmV3IFNoYWRvd0NhbWVyYVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Q2FtZXJhLnJlc2l6ZSh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhV2ViR0woKTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEucmVzaXplKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHVwZGF0ZVNoYWRvd0FyZWEoYm94OiBwc2dlb21ldHJ5LkFBQkIyRCkge1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvd0NhbWVyYS51cGRhdGVTaGFkb3dBcmVhKGJveCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYXBwbHlTdGF0ZShjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHByb2dyYW0gPSBjb250ZXh0LlNoYWRlclByb2dyYW0uUHJvZ3JhbTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXN1bHRpbmdNb2RlbFRyYW5zZm9ybWF0aW9uID0gcHNnZW9tZXRyeS5NYXRyaXg0LklkZW50aXR5O1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5Nb2RlbFRyYW5zZm9ybSAmJiBjb250ZXh0Lk5vZGVUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdGluZ01vZGVsVHJhbnNmb3JtYXRpb24gPSA8cHNnZW9tZXRyeS5NYXRyaXg0PmNvbnRleHQuTm9kZVRyYW5zZm9ybS5tdWx0aXBseShjb250ZXh0Lk1vZGVsVHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lk1vZGVsVHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRpbmdNb2RlbFRyYW5zZm9ybWF0aW9uID0gY29udGV4dC5Nb2RlbFRyYW5zZm9ybTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lk5vZGVUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdGluZ01vZGVsVHJhbnNmb3JtYXRpb24gPSBjb250ZXh0Lk5vZGVUcmFuc2Zvcm07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBtTWF0cml4TG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VNTWF0cml4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdihtTWF0cml4TG9jLCBmYWxzZSwgcmVzdWx0aW5nTW9kZWxUcmFuc2Zvcm1hdGlvbi50cmFuc3Bvc2UoKS5lbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGxldCB2TWF0cml4TG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VWTWF0cml4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdih2TWF0cml4TG9jLCBmYWxzZSwgY29udGV4dC5DYW1lcmEuVmlld01hdHJpeC50cmFuc3Bvc2UoKS5lbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGxldCBwTWF0cml4TG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VQTWF0cml4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdihwTWF0cml4TG9jLCBmYWxzZSwgY29udGV4dC5DYW1lcmEuUHJvamVjdGlvbk1hdHJpeC50cmFuc3Bvc2UoKS5lbGVtZW50cyk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihzY2VuZTogU2NlbmVXZWJHTCkge1xyXG4gICAgICAgICAgICBpZiAoc2NlbmUuaXNEaXJ0eSgpIHx8IHRoaXMuY2FtZXJhLmlzRGlydHkoKSB8fCB0aGlzLnNoYWRvd0NhbWVyYS5pc0RpcnR5KCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuUGhhc2UgPSAnU2hhZG93JztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5DYW1lcmEgPSB0aGlzLnNoYWRvd0NhbWVyYTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93Q2FtZXJhLmJlZ2luUmVuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgc2NlbmUucmVuZGVyKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYWRvd0NhbWVyYS5lbmRSZW5kZXIodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LlBoYXNlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuQ2FtZXJhID0gdGhpcy5jYW1lcmE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS5iZWdpblJlbmRlcih0aGlzKTtcclxuICAgICAgICAgICAgICAgIHNjZW5lLnJlbmRlcih0aGlzLmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEuZW5kUmVuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXJTaGFkZXJQcm9ncmFtKHNoYWRlclByb2dyYW1LZXk6IHN0cmluZywgc2hhZGVyUHJvZ3JhbTogU2hhZGVyUHJvZ3JhbVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVyUHJvZ3JhbXNbc2hhZGVyUHJvZ3JhbUtleV0gPSBzaGFkZXJQcm9ncmFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyUGhhc2VTcGVjaWZpY1NoYWRlclByb2dyYW0ocGhhc2VLZXk6IHN0cmluZywgc2hhZGVyUHJvZ3JhbUtleTogc3RyaW5nLCBzaGFkZXJQcm9ncmFtOiBTaGFkZXJQcm9ncmFtV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHBoYXNlID0gdGhpcy5waGFzZVNwZWNpZmljU2hhZGVyUHJvZ3JhbXNbcGhhc2VLZXldO1xyXG4gICAgICAgICAgICBpZiAoIXBoYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBwaGFzZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waGFzZVNwZWNpZmljU2hhZGVyUHJvZ3JhbXNbcGhhc2VLZXldID0gcGhhc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBoYXNlW3NoYWRlclByb2dyYW1LZXldID0gc2hhZGVyUHJvZ3JhbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRTaGFkZXJQcm9ncmFtKGNvbnRleHQsIHNoYWRlclByb2dyYW1LZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQucGhhc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwaGFzZSA9IHRoaXMucGhhc2VTcGVjaWZpY1NoYWRlclByb2dyYW1zW2NvbnRleHQucGhhc2VdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBoYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcGhhc2Vbc2hhZGVyUHJvZ3JhbUtleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0IHx8IHRoaXMuc2hhZGVyUHJvZ3JhbXNbc2hhZGVyUHJvZ3JhbUtleV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlc2l6ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEucmVzaXplKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGVudW0gQ29ubmVjdGlvblN0YXRlIHtcclxuICAgICAgICBSZWFkeSxcclxuICAgICAgICBDb25uZWN0aW5nLFxyXG4gICAgICAgIENvbm5lY3RlZCxcclxuICAgICAgICBFcnJvclxyXG4gICAgfTtcclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgU2VydmVyQ29ubmVjdGlvbiB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzdGF0ZTogQ29ubmVjdGlvblN0YXRlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaGFuZGxlQ29ubmVjdGVkOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaGFuZGxlTWVzc2FnZTogKEV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXNDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuUmVhZHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgY29ubmVjdCgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgZGlzY29ubmVjdCgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc2VuZChkYXRhOiBhbnkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25NZXNzYWdlKGNhbGxiYWNrOiAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1lc3NhZ2UgPSBjYWxsYmFjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbm5lY3RlZChjYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbm5lY3RlZCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNpZ25hbFJTZXJ2ZXJDb25uZWN0aW9uIGV4dGVuZHMgU2VydmVyQ29ubmVjdGlvbiB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdGlvbjogSHViQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IEh1YkNvbm5lY3Rpb25CdWlsZGVyKClcclxuICAgICAgICAgICAgICAgIC53aXRoVXJsKCcvYXBpL3N0YXRlJylcclxuICAgICAgICAgICAgICAgIC5jb25maWd1cmVMb2dnaW5nKExvZ0xldmVsLlRyYWNlKVxyXG4gICAgICAgICAgICAgICAgLy8ud2l0aEh1YlByb3RvY29sKDxhbnk+KG5ldyBNZXNzYWdlUGFja0h1YlByb3RvY29sKCkpKVxyXG4gICAgICAgICAgICAgICAgLmJ1aWxkKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub24oJ21zZycsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1zZyA9IG5ldyBNZXNzYWdlRXZlbnQoJ2JpbmFyeScsIHsgZGF0YTogZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1lc3NhZ2UobXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29ubmVjdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZUNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25uZWN0ZWQobmV3IEV2ZW50KCdjb25uZWN0ZWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkaXNjb25uZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc3RvcCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5SZWFkeTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZW5kKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uaW52b2tlKCdNc2cnLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBXZWJTb2NrZXRTZXJ2ZXJDb25uZWN0aW9uIGV4dGVuZHMgU2VydmVyQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSB3ZWJzb2NrZXQ6IFdlYlNvY2tldDtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbm5lY3QodXJsPzogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09IENvbm5lY3Rpb25TdGF0ZS5SZWFkeSB8fCB0aGlzLnN0YXRlID09IENvbm5lY3Rpb25TdGF0ZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVyaSA9IHVybCA/IHVybCA6ICd3czovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArICcvYXBpL3NjZW5lJztcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGluZztcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vic29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYnNvY2tldC5vbm9wZW4gPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3dlYnNvY2tldCBjb25uZWN0ZWQuJylcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25uZWN0ZWQoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYnNvY2tldC5vbmNsb3NlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3dlYnNvY2tldCBjbG9zZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5SZWFkeTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYnNvY2tldC5vbmVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2Vic29ja2V0IGVycm9yLicpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1lc3NhZ2UoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkaXNjb25uZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLndlYnNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNlbmQoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2Vic29ja2V0LnNlbmQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUb29sIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGludGVyZmFjZUNvbnRyb2xsZXI6IEludGVyZmFjZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnRlcihpbnRlcmZhY2VDb250cm9sbGVyOiBJbnRlcmZhY2VDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlciA9IGludGVyZmFjZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgbGVhdmUoKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUtleVVwKGU6IEpRdWVyeS5FdmVudCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlTW92ZShlOiBKUXVlcnkuRXZlbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlRG93bihlOiBKUXVlcnkuRXZlbnQpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VVcChlOiBKUXVlcnkuRXZlbnQpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlRHJhZyhlOiBKUXVlcnkuRXZlbnQsIHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZFg6IG51bWJlciwgZFk6IG51bWJlcikgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZVdoZWVsKGU6IEpRdWVyeS5FdmVudCkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVDbGljayhlOiBKUXVlcnkuRXZlbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7IH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludGVyZmFjZUNvbnRyb2xsZXIge1xyXG5cclxuICAgICAgICBwcml2YXRlIHRvb2xzOiBBcnJheTxUb29sPiA9IFtdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGhhc1Rvb2woKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvb2xzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1cnJlbnRUb29sKCk6IFRvb2wge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNUb29sKCkgPyB0aGlzLnRvb2xzW3RoaXMudG9vbHMubGVuZ3RoIC0gMV0gOiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsZWZ0QnV0dG9uID0gMDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsZWZ0QnV0dG9uRG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXJ0WDogbnVtYmVyID0gTmFOO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXJ0WTogbnVtYmVyID0gTmFOO1xyXG5cclxuICAgICAgICBwcml2YXRlIGxhc3RYOiBudW1iZXIgPSBOYU47XHJcblxyXG4gICAgICAgIHByaXZhdGUgbGFzdFk6IG51bWJlciA9IE5hTjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0YXJnZXQ6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHVibGljIG9uTW92ZTogKGU6IEpRdWVyeS5FdmVudCwgeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHZvaWQgPSBudWxsO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25EcmFnOiAoZTogSlF1ZXJ5LkV2ZW50LCBkWDogbnVtYmVyLCBkWTogbnVtYmVyKSA9PiB2b2lkID0gbnVsbDtcclxuXHJcbiAgICAgICAgcHVibGljIG9uTW91c2VXaGVlbDogKGU6IEpRdWVyeS5FdmVudCkgPT4gdm9pZCA9IG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJpbmRFdmVudHModGFyZ2V0OiBKUXVlcnkpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICBKUXVlcnkodGFyZ2V0KS5vbignbW91c2V3aGVlbCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlV2hlZWwoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgSlF1ZXJ5KHRhcmdldCkub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEb3duKGUpO1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghKDxhbnk+dGFyZ2V0KS5zZXRDYXB0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBKUXVlcnkoZG9jdW1lbnQpLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlTW92ZShlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgSlF1ZXJ5KHRhcmdldCkub24oJ21vdXNlbW92ZSB0b3VjaG1vdmUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlKGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEpRdWVyeShkb2N1bWVudCkub24oJ21vdXNldXAgdG91Y2hlbmQgdG91Y2hjYW5jZWwnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZVVwKGUpO1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEpRdWVyeSh0YXJnZXQpLm9uKCdsb3NlY2FwdHVyZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlVXAoZSk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgSlF1ZXJ5KGRvY3VtZW50KS5vbigna2V5dXAnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2V5VXAoZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVMYXN0UG9zaXRpb24oZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFggPSBlLmNsaWVudFg7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFkgPSBlLmNsaWVudFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcHVzaFRvb2wodG9vbDogVG9vbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50VG9vbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50VG9vbC5sZWF2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvb2xzLnB1c2godG9vbCk7XHJcblxyXG4gICAgICAgICAgICB0b29sLmVudGVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHBvcFRvb2woKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvb2xzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbHNbdGhpcy50b29scy5sZW5ndGggLSAxXS5sZWF2ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b29scy5wb3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy50b29scy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xzW3RoaXMudG9vbHMubGVuZ3RoIC0gMV0uZW50ZXIodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUga2V5VXAoZTogSlF1ZXJ5LkV2ZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Rvb2woKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuQ3VycmVudFRvb2wuaGFuZGxlS2V5VXAoZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdXNlRG93bihlOiBKUXVlcnkuRXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGUuYnV0dG9uID09IHRoaXMubGVmdEJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0QnV0dG9uRG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0WCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRZID0gZS5jbGllbnRZO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMYXN0UG9zaXRpb24oZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoKDxhbnk+ZS50YXJnZXQpLnNldENhcHR1cmUpICg8YW55PmUudGFyZ2V0KS5zZXRDYXB0dXJlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Rvb2woKSAmJiAhZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRUb29sLmhhbmRsZU1vdXNlRG93bihlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW91c2VNb3ZlKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUb29sKCkgJiYgIWUuY3RybEtleSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVmdEJ1dHRvbkRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRUb29sLmhhbmRsZURyYWcoZSwgdGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZLCBlLmNsaWVudFggLSB0aGlzLmxhc3RYLCBlLmNsaWVudFkgLSB0aGlzLmxhc3RZKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRUb29sLmhhbmRsZU1vdXNlTW92ZShlLCBlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlZnRCdXR0b25Eb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnKGUsIGUuY2xpZW50WCAtIHRoaXMubGFzdFgsIGUuY2xpZW50WSAtIHRoaXMubGFzdFkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW92ZShlLCBlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnRCdXR0b25Eb3duKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxhc3RQb3NpdGlvbihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3VzZVVwKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgdXBkYXRlUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGUuYnV0dG9uID09IHRoaXMubGVmdEJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0QnV0dG9uRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlUG9zaXRpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoPGFueT5lLnRhcmdldCkucmVsZWFzZUNhcHR1cmUpICg8YW55PmUudGFyZ2V0KS5yZWxlYXNlQ2FwdHVyZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUb29sKCkgJiYgIWUuY3RybEtleSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50VG9vbC5oYW5kbGVNb3VzZVVwKGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMYXN0UG9zaXRpb24oZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZHJhZyhlOiBKUXVlcnkuRXZlbnQsIGRYOiBudW1iZXIsIGRZOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub25EcmFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRHJhZyhlLCBkWCwgZFkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdXNlV2hlZWwoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Rvb2woKSAmJiAhZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRUb29sLmhhbmRsZU1vdXNlV2hlZWwoZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbk1vdXNlV2hlZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VXaGVlbChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ2FtZXJhQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGFnZTogU3RhZ2VXZWJHTDtcclxuICAgICAgICBwcml2YXRlIGNhbWVyYTogQ2FtZXJhV2ViR0w7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBTZXJ2ZXJDb25uZWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgcmFkaXVzOiBudW1iZXIgPSAyMC4wO1xyXG4gICAgICAgIHByaXZhdGUgeWF3OiBudW1iZXIgPSAwLjA7XHJcbiAgICAgICAgcHJpdmF0ZSBwaXRjaDogbnVtYmVyID0gMC4wO1xyXG4gICAgICAgIHByaXZhdGUgY2VudGVyOiBwc2dlb21ldHJ5LlZlYzM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZHJhZ0Rpdmlzb3IgPSAxMDAuMDtcclxuICAgICAgICBwcml2YXRlIHJvdGF0ZURpdmlzb3IgPSAyMDAuMDtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBZYXcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnlhdztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgWWF3KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy55YXcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0YWdlOiBTdGFnZVdlYkdMLCBjYW1lcmE6IENhbWVyYVdlYkdMLCBpbnRlcmZhY2VDb250cm9sbGVyOiBJbnRlcmZhY2VDb250cm9sbGVyLCBjb25uZWN0aW9uOiBTZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XHJcblxyXG4gICAgICAgICAgICBpbnRlcmZhY2VDb250cm9sbGVyLmJpbmRFdmVudHMoSlF1ZXJ5KHN0YWdlLkNhbnZhcykpO1xyXG4gICAgICAgICAgICBpbnRlcmZhY2VDb250cm9sbGVyLm9uRHJhZyA9IChlLCBkWCwgZFkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZyhlLCBkWCwgZFkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaW50ZXJmYWNlQ29udHJvbGxlci5vbk1vdXNlV2hlZWwgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZVdoZWVsKGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaW50ZXJmYWNlQ29udHJvbGxlci5vbk1vdmUgPSAoZSwgeCwgeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGUsIHgsIHkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jZW50ZXIgPSBuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMC4wLCAwLjApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3QocmFkaXVzOiBudW1iZXIsIHBpdGNoOiBudW1iZXIsIHlhdzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgICAgICAgICB0aGlzLnBpdGNoID0gcGl0Y2g7XHJcbiAgICAgICAgICAgIHRoaXMueWF3ID0geWF3O1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW91c2VXaGVlbChlOiBKUXVlcnkuRXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkID0gdGhpcy5nZXRWaWV3RGlyKCkubXVsdGlwbHkoKDxhbnk+ZSkuZGVsdGFZIHx8ICg8YW55PmUpLmRlbHRhWCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuY2VudGVyLnN1YihkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFkaXVzICs9ICg8YW55PmUpLmRlbHRhWSAqIE1hdGgubG9nKHRoaXMucmFkaXVzICsgMSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSBNYXRoLm1heCgwLjAxLCB0aGlzLnJhZGl1cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW92ZShlOiBKUXVlcnkuRXZlbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRyYWcoZTogSlF1ZXJ5LkV2ZW50LCBkWDogbnVtYmVyLCBkWTogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSB0aGlzLmdldFZpZXdQbGFuZVgoKTtcclxuICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy5nZXRWaWV3UGxhbmVZKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbnRlciA9IHRoaXMuY2VudGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZCh4Lm11bHRpcGx5KGRYIC8gdGhpcy5kcmFnRGl2aXNvcikpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZCh5Lm11bHRpcGx5KGRZIC8gdGhpcy5kcmFnRGl2aXNvcikpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55YXcgLT0gZFggLyB0aGlzLnJvdGF0ZURpdmlzb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpdGNoID0gTWF0aC5tYXgoLU1hdGguUEkgLyAyLCBNYXRoLm1pbihNYXRoLlBJIC8gMiwgdGhpcy5waXRjaCAtIGRZIC8gdGhpcy5yb3RhdGVEaXZpc29yKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldFZpZXdQbGFuZVgoKSB7XHJcbiAgICAgICAgICAgIGxldCBxLCByLCB2O1xyXG5cclxuICAgICAgICAgICAgdiA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoLTEuMCwgMC4wLCAwLjApO1xyXG4gICAgICAgICAgICBxID0gbmV3IHBzZ2VvbWV0cnkuUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICByID0gbmV3IHBzZ2VvbWV0cnkuUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICBxLnNldEZyb21BeGlzQW5nbGUobmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDEuMCwgMC4wKSwgdGhpcy55YXcpO1xyXG4gICAgICAgICAgICByLnNldEZyb21BeGlzQW5nbGUobmV3IHBzZ2VvbWV0cnkuVmVjMygxLjAsIDAuMCwgMC4wKSwgdGhpcy5waXRjaCk7XHJcbiAgICAgICAgICAgIHYgPSB2LmFwcGx5UXVhdGVybmlvbihyKTtcclxuICAgICAgICAgICAgdiA9IHYuYXBwbHlRdWF0ZXJuaW9uKHEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHY7IC8vLmFkZCh0aGlzLmNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldFZpZXdQbGFuZVkoKSB7XHJcbiAgICAgICAgICAgIGxldCBxLCByLCB2O1xyXG5cclxuICAgICAgICAgICAgdiA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAxLjAsIDAuMCk7XHJcbiAgICAgICAgICAgIHEgPSBuZXcgcHNnZW9tZXRyeS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgICAgIHIgPSBuZXcgcHNnZW9tZXRyeS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgICAgIHEuc2V0RnJvbUF4aXNBbmdsZShuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMS4wLCAwLjApLCB0aGlzLnlhdyk7XHJcbiAgICAgICAgICAgIHIuc2V0RnJvbUF4aXNBbmdsZShuZXcgcHNnZW9tZXRyeS5WZWMzKDEuMCwgMC4wLCAwLjApLCB0aGlzLnBpdGNoKTtcclxuICAgICAgICAgICAgdiA9IHYuYXBwbHlRdWF0ZXJuaW9uKHIpO1xyXG4gICAgICAgICAgICB2ID0gdi5hcHBseVF1YXRlcm5pb24ocSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdjsgLy8uYWRkKHRoaXMuY2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0Vmlld0RpcigpOiBwc2dlb21ldHJ5LlZlYzMge1xyXG4gICAgICAgICAgICBsZXQgcSwgciwgdjtcclxuXHJcbiAgICAgICAgICAgIHYgPSBuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMC4wLCAtMS4wKTtcclxuICAgICAgICAgICAgcSA9IG5ldyBwc2dlb21ldHJ5LlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgciA9IG5ldyBwc2dlb21ldHJ5LlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgcS5zZXRGcm9tQXhpc0FuZ2xlKG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAxLjAsIDAuMCksIHRoaXMueWF3KTtcclxuICAgICAgICAgICAgci5zZXRGcm9tQXhpc0FuZ2xlKG5ldyBwc2dlb21ldHJ5LlZlYzMoMS4wLCAwLjAsIDAuMCksIHRoaXMucGl0Y2gpO1xyXG4gICAgICAgICAgICB2ID0gdi5hcHBseVF1YXRlcm5pb24ocik7XHJcbiAgICAgICAgICAgIHYgPSB2LmFwcGx5UXVhdGVybmlvbihxKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2OyAvLy5hZGQodGhpcy5jZW50ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRDYW1lcmFQb3MoKSB7XHJcbiAgICAgICAgICAgIGxldCBxLCByLCB2O1xyXG5cclxuICAgICAgICAgICAgdiA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAwLjAsIHRoaXMucmFkaXVzKTtcclxuICAgICAgICAgICAgcSA9IG5ldyBwc2dlb21ldHJ5LlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgciA9IG5ldyBwc2dlb21ldHJ5LlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgcS5zZXRGcm9tQXhpc0FuZ2xlKG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAxLjAsIDAuMCksIHRoaXMueWF3KTtcclxuICAgICAgICAgICAgci5zZXRGcm9tQXhpc0FuZ2xlKG5ldyBwc2dlb21ldHJ5LlZlYzMoMS4wLCAwLjAsIDAuMCksIHRoaXMucGl0Y2gpO1xyXG4gICAgICAgICAgICB2ID0gdi5hcHBseVF1YXRlcm5pb24ocik7XHJcbiAgICAgICAgICAgIHYgPSB2LmFwcGx5UXVhdGVybmlvbihxKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2LmFkZCh0aGlzLmNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZUNhbWVyYSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEudXBkYXRlKHRoaXMuZ2V0Q2FtZXJhUG9zKCksIHRoaXMuY2VudGVyLCBuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMS4wLCAwLjApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbW1vbk1lc3NhZ2VUeXBlcyB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBBcHBTdGF0ZURlbHRhID0gMHgwMTAwO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgU2VydmVySGFuZHNoYWtlID0gMHgwMTAxO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ2xpZW50SGFuZHNoYWtlID0gMHgwMTAyO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ2xpZW50Q29uZmlybWF0aW9uID0gMHgwMTAzO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQXBwU3RhdGVJbml0aWFsaXphdGlvbiA9IDB4MTA0O1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQW5jaG9yUmVxdWVzdCA9IDB4MDFmZTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFNoYXJlZEFuY2hvciA9IDB4MDFmZjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTmV0d29ya0NoYW5uZWxNZXNzYWdlIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBIZWFkZXJTaXplID0gODtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtZXNzYWdlVHlwZTogbnVtYmVyID0gQ29tbW9uTWVzc2FnZVR5cGVzLkFwcFN0YXRlRGVsdGE7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29udGVudDogVWludDhBcnJheTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBDb250ZW50KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBNZXNzYWdlVHlwZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZVR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEZyb21CdWZmZXIoYnVmZmVyOiBVaW50OEFycmF5KSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTmV0d29ya0NoYW5uZWxNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5jb250ZW50ID0gYnVmZmVyO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBIYXNQYXlsb2FkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmJ5dGVMZW5ndGggPiBOZXR3b3JrQ2hhbm5lbE1lc3NhZ2UuSGVhZGVyU2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUGF5bG9hZFNpemUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYnl0ZUxlbmd0aCAtIE5ldHdvcmtDaGFubmVsTWVzc2FnZS5IZWFkZXJTaXplO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=