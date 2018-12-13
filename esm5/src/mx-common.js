/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { psgeometry } from './ps-geometry';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
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
                var deferred_1 = $.Deferred();
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
            return $.when.apply($, deferreds);
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
            var deferred = $.Deferred();
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
            $(target).on('mousewheel', function (e) {
                _this.mouseWheel(e);
            });
            $(target).on('mousedown touchstart', function (e) {
                _this.mouseDown(e);
                e.preventDefault();
            });
            if (!((/** @type {?} */ (target))).setCapture) {
                $(document).on('mousemove touchmove', function (e) {
                    _this.mouseMove(e);
                });
            }
            else {
                $(target).on('mousemove touchmove', function (e) {
                    _this.mouseMove(e);
                });
            }
            $(document).on('mouseup touchend touchcancel', function (e) {
                _this.mouseUp(e);
                e.preventDefault();
            });
            $(target).on('losecapture', function (e) {
                _this.mouseUp(e);
                e.preventDefault();
            });
            $(document).on('keyup', function (e) {
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
                if (e.target.setCapture)
                    e.target.setCapture();
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
                if (e.target.releaseCapture)
                    e.target.releaseCapture();
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
            interfaceController.bindEvents($(stage.Canvas));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXgtY29tbW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVsc3RhZ2UvIiwic291cmNlcyI6WyJzcmMvbXgtY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBaUIsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRixNQUFNLEtBQVEsYUFBYSxDQXFuRzFCO0FBcm5HRCxXQUFjLGFBQWE7Ozs7SUFFdkIsU0FBZ0IsTUFBTTs7WUFFZCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFLLE1BQU0sRUFBQSxDQUFDLENBQUMsUUFBUTtRQUVwRCxPQUFPLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFNO1lBQ3BFLE9BQUEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUE3RSxDQUE2RSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQU5lLG9CQUFNLFNBTXJCLENBQUE7SUFFRDtRQUlJLG9CQUFZLEtBQWlCO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7Ozs7OztRQUVNLGlDQUFZOzs7OztRQUFuQixVQUFvQixVQUFrQixFQUFFLFlBQW9COztnQkFDcEQsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7WUFFbkQsSUFBSSxD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QUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRWIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDdEUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUViLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQ3RFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFYixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUN0RSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDN0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQzdELEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUM3RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpCLENBQUM7Ozs7O1FBRU0sc0NBQVU7Ozs7UUFBakIsVUFBa0IsS0FBaUI7O2dCQUMzQixPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFFMUQsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFFL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7Ozs7O1FBRU0sd0NBQVk7Ozs7O1FBQW5CLFVBQW9CLEtBQWlCLEVBQUUsUUFBZ0I7WUFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksYUFBYSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxRQUFRLEdBQUcsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXBHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdkIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7O2dCQUUxRSxjQUFjLEdBQUcsSUFBSSxhQUFhLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUM7WUFDN0UsY0FBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQ2xFLGNBQWMsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQzs7Z0JBRWhFLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUV6QyxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ0wsd0JBQUM7SUFBRCxDQUFDLEFBNUhELElBNEhDO0lBNUhZLCtCQUFpQixvQkE0SDdCLENBQUE7Ozs7OztRQTFIRyxxQ0FBcUM7Ozs7O1FBRXJDLG9DQUFvQzs7Ozs7UUFFcEMsNENBQTBDOzs7OztRQUUxQywyQ0FBeUM7O0lBc0g3QztRQU1JLGdDQUFzQixlQUFpQyxFQUFZLGNBQWdDO1lBQTdFLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtZQUozRixhQUFRLEdBQWtCLEVBQUUsQ0FBQztZQUU3QixZQUFPLEdBQWtCLEVBQUUsQ0FBQztRQUdwQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFFTSx1Q0FBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFBYixVQUFjLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUM1QyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFDbEMsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQ2xDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxRQUFrQjtZQUU5RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDZCxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQy9CLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDL0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O2dCQUVqQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVuQyxJQUFJLFFBQVEsRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNsQixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDVixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDVixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNuQjtRQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUVNLHdDQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUFkLFVBQWUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQzdDLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUNsQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFDbEMsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQ2xDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxRQUFrQjtZQUU5RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNsQixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDVixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDVixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFDbEIsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQ1YsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQ1YsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLENBQUM7Ozs7O1FBRU0sMkNBQVU7Ozs7UUFBakIsVUFBa0IsS0FBaUI7O2dCQUMzQixPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztnQkFFM0QsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFFL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQyxBQTNERCxJQTJEQztJQTNEWSxvQ0FBc0IseUJBMkRsQyxDQUFBOzs7Ozs7UUF6REcsMENBQXFDOzs7OztRQUVyQyx5Q0FBb0M7Ozs7O1FBRXhCLGlEQUEyQzs7Ozs7UUFBRSxnREFBMEM7O0lBdUR2RztRQU1JLDZCQUFzQixlQUFpQyxFQUFZLGNBQWdDO1lBQTdFLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtZQUozRixhQUFRLEdBQWtCLEVBQUUsQ0FBQztZQUU3QixZQUFPLEdBQWtCLEVBQUUsQ0FBQztRQUdwQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUVNLG9DQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQWIsVUFBYyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUNwRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUMxRCxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUMxRCxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxRQUFrQjtZQUVuRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDZCxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNwQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNwQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7O2dCQUV0QyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVuQyxJQUFJLFFBQVEsRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQzFCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQ2xCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQ2xCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEI7UUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBRU0scUNBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUFkLFVBQWUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFDckUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFDMUQsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFDMUQsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFDMUQsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsUUFBa0I7WUFFbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUMxQixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNsQixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNsQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQzFCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQ2xCLEVBQUUs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cUM7O1FBQ3JDLG1DQUF1Qzs7UUFDdkMsbUNBQXVDOztRQUN2QyxzQ0FBMEM7O1FBQzFDLDBDQUE2Qzs7UUFDN0MsaUNBQXFDOztRQUNyQyxnQ0FBb0M7O0lBR3hDO1FBQUE7WUFJWSxnQkFBVyxHQUFXLGtCQUFrQixDQUFDLGFBQWEsQ0FBQztRQTBCbkUsQ0FBQztRQXRCRyxzQkFBVywwQ0FBTzs7OztZQUFsQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyw4Q0FBVzs7OztZQUF0QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUIsQ0FBQzs7O1dBQUE7Ozs7O1FBRWEsZ0NBQVU7Ozs7UUFBeEIsVUFBeUIsTUFBa0I7O2dCQUNuQyxNQUFNLEdBQUcsSUFBSSxxQkFBcUIsRUFBRTtZQUN4QyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN4QixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQsc0JBQVcsNkNBQVU7Ozs7WUFBckI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUM7WUFDdEUsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBVyw4Q0FBVzs7OztZQUF0QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztZQUN0RSxDQUFDOzs7V0FBQTtRQTFCYSxnQ0FBVSxHQUFHLENBQUMsQ0FBQztRQTRCakMsNEJBQUM7S0FBQSxBQTlCRCxJQThCQztJQTlCWSxtQ0FBcUIsd0JBOEJqQyxDQUFBOzs7UUE1QkcsaUNBQTZCOzs7OztRQUU3Qiw0Q0FBK0Q7Ozs7O1FBRS9ELHdDQUE0Qjs7QUEwQnBDLENBQUMsRUFybkdhLGFBQWEsS0FBYixhQUFhLFFBcW5HMUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gTW9kZWxTdGFnZSDCqSAyMDE4IFBsYW5zeXN0ZW1lIEdtYkgsIEhhbWJ1cmcsIEdlcm1hbnkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQgeyBwc2dlb21ldHJ5IH0gZnJvbSAnLi9wcy1nZW9tZXRyeSc7XHJcbmltcG9ydCB7IEh1YkNvbm5lY3Rpb25CdWlsZGVyLCBMb2dMZXZlbCwgSHViQ29ubmVjdGlvbiB9IGZyb20gJ0Bhc3BuZXQvc2lnbmFscic7XHJcblxyXG5leHBvcnQgbW9kdWxlIG1vZGVsc3RhZ2V3ZWIge1xyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiB1dWlkdjQoKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgbGV0IGNyeXB0byA9IHdpbmRvdy5jcnlwdG8gfHwgKDxhbnk+d2luZG93KS5tc0NyeXB0bztcclxuXHJcbiAgICAgICAgcmV0dXJuICgnJyArIDFlNyArIC0xZTMgKyAtNGUzICsgLThlMyArIC0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLCAoYzogYW55KSA9PlxyXG4gICAgICAgICAgICAoYyBeIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdICYgMTUgPj4gYyAvIDQpLnRvU3RyaW5nKDE2KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRvb2xzV2ViR0wge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YWdlOiBTdGFnZVdlYkdMO1xyXG4gICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlU2hhZGVyKHNoYWRlclR5cGU6IEdMZW51bSwgc2hhZGVyU291cmNlOiBzdHJpbmcpOiBXZWJHTFNoYWRlciB7XHJcbiAgICAgICAgICAgIGxldCBzaGFkZXIgPSB0aGlzLnN0YWdlLmdsLmNyZWF0ZVNoYWRlcihzaGFkZXJUeXBlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc2hhZGVyU291cmNlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5nbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YWdlLmdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2hhZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQmxvY2tTdHJlYW1CbG9ja0Rlc2NyaXB0b3Ige1xyXG5cclxuICAgICAgICBwcml2YXRlIGJsb2NrVHlwZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1ham9yVmVyc2lvbjogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1pbm9yVmVyc2lvbjogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGZsYWdzOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcGF5bG9hZEJ5dGVzOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQmxvY2tUeXBlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ibG9ja1R5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IEJsb2NrVHlwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tUeXBlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1ham9yVmVyc2lvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFqb3JWZXJzaW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBNYWpvclZlcnNpb24odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLm1ham9yVmVyc2lvbiA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBNaW5vclZlcnNpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1pbm9yVmVyc2lvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgTWlub3JWZXJzaW9uKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5taW5vclZlcnNpb24gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgRmxhZ3MoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZsYWdzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBGbGFncyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmxhZ3MgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUGF5bG9hZEJ5dGVzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXlsb2FkQnl0ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IFBheWxvYWRCeXRlcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF5bG9hZEJ5dGVzID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBlbnVtIEJsb2NrU3RyZWFtUmVhZGVyU3RhdGVzIHtcclxuICAgICAgICBGSUxFX0hFQURFUl9FWFBFQ1RFRCA9IDAsXHJcbiAgICAgICAgQkxPQ0tfREVTQ1JJUFRPUl9FWFBFQ1RFRCA9IDEsXHJcbiAgICAgICAgUEFZTE9BRF9FWFBFQ1RFRCA9IDJcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQmxvY2tTdHJlYW1SZWFkZXIge1xyXG5cclxuICAgICAgICBwcml2YXRlIGFycmF5QnVmZmVyOiBBcnJheUJ1ZmZlciA9IG51bGw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYnl0ZUFycmF5OiBVaW50OEFycmF5ID0gbnVsbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50UG9zOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRCbG9ja0Rlc2NyaXB0b3I6IEJsb2NrU3RyZWFtQmxvY2tEZXNjcmlwdG9yO1xyXG5cclxuICAgICAgICBwcml2YXRlIGJsb2NrRW5kOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIGlzQ29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmYXRhbEVycm9yOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGU6IEJsb2NrU3RyZWFtUmVhZGVyU3RhdGVzID0gQmxvY2tTdHJlYW1SZWFkZXJTdGF0ZXMuRklMRV9IRUFERVJfRVhQRUNURUQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VycmVudEJsb2NrRGVzY3JpcHRvcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEJsb2NrRGVzY3JpcHRvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgRmF0YWxFcnJvcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmF0YWxFcnJvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hc3N1cmVGaWxlSGVhZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtYWluaW5nQnl0ZXNJbkJsb2NrKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJsb2NrRW5kIC0gdGhpcy5jdXJyZW50UG9zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFzc3VyZVJlbWFpbmluZ0J5dGVzSW5CbG9jayhjb3VudDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3MgKyBjb3VudCA8PSB0aGlzLmJsb2NrRW5kO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRCeXRlcyhjb3VudDogbnVtYmVyKTogQXJyYXlCdWZmZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5QnVmZmVyLnNsaWNlKHRoaXMuY3VycmVudFBvcywgdGhpcy5jdXJyZW50UG9zICsgY291bnQpOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB0cnlSZWFkSW50MTYobGFtYmRhOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlc0luQmxvY2soMik7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBsYW1iZGEodGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiAyNTYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHRyeVJlYWRGbG9hdChsYW1iZGE6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmFzc3VyZVJlbWFpbmluZ0J5dGVzSW5CbG9jayg0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoNCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWYpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgwLCB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgxLCB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgyLCB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgzLCB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcodGhpcy5ieXRlQXJyYXkuYnVmZmVyLCB0aGlzLmN1cnJlbnRQb3MsIDQpO1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhKHZpZXcuZ2V0RmxvYXQzMigwLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY3VycmVudFBvcyArPSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHRyeVJlYWRJbnQobGFtYmRhOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5hc3N1cmVSZW1haW5pbmdCeXRlc0luQmxvY2soNCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBsYW1iZGEodGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiAyNTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDY1NTM2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiAxNjc3NzIxNik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdHJ5UmVhZEludDY0KGxhbWJkYTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuYXNzdXJlUmVtYWluaW5nQnl0ZXNJbkJsb2NrKDgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhKHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogMjU2ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10gKiA2NTUzNiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogMTY3NzcyMTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDQyOTQ5NjcyOTYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDEwOTk1MTE2Mjc3NzYgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcysrXSAqIDI4MTQ3NDk3NjcxMDY1NiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zKytdICogNzIwNTc1OTQwMzc5Mjc5MzYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHRyeVJlYWRTdHJpbmcobGFtYmRhOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy50cnlSZWFkSW50KChzdHJpbmdMZW5ndGgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXNzdXJlUmVtYWluaW5nQnl0ZXNJbkJsb2NrKHN0cmluZ0xlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgc3RyaW5nTGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MrK10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsYW1iZGEodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLnRyeVJlYWRTdHJpbmcoKHZhbHVlKSA9PiB7IHJlc3VsdCA9IHZhbHVlOyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkTWF0cml4NCgpOiBwc2dlb21ldHJ5Lk1hdHJpeDQge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IHBzZ2VvbWV0cnkuTWF0cml4NCgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5UmVhZEZsb2F0KCh2YWwpID0+IHsgcmVzdWx0LmVsZW1lbnRzW2ldID0gdmFsOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRyYW5zcG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcm5hbFJlYWRTdHJpbmcoc3RhcnRQb3M6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmJ5dGVBcnJheVtzdGFydFBvcyArIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcm5hbFJlYWRJbnQoc3RhcnRQb3M6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ5dGVBcnJheVtzdGFydFBvc10gK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbc3RhcnRQb3MgKyAxXSAqIDI1NiArXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVtzdGFydFBvcyArIDJdICogNjU1MzYgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbc3RhcnRQb3MgKyAzXSAqIDE2Nzc3MjE2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhc3N1cmVGaWxlSGVhZGVyKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ieXRlQXJyYXkuYnl0ZUxlbmd0aCA+PSA4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ieXRlQXJyYXlbMF0gPT0gMHg3MCAmJiAvLyA9XCJwc2Jsc3RyMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbMV0gPT0gMHg3MyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5WzJdID09IDB4NjIgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVszXSA9PSAweDZDICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbNF0gPT0gMHg3MyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5WzVdID09IDB4NzQgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVs2XSA9PSAweDcyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbN10gPT0gMHgzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBvcyArPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBCbG9ja1N0cmVhbVJlYWRlclN0YXRlcy5CTE9DS19ERVNDUklQVE9SX0VYUEVDVEVEO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdGFsRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYXRhbEVycm9yID0gdGhpcy5pc0NvbXBsZXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW50ZXJCbG9jaygpOiB7IHN1Y2Nlc3M6IGJvb2xlYW4sIGRlc2NyaXB0b3I6IEJsb2NrU3RyZWFtQmxvY2tEZXNjcmlwdG9yIH0ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiB7IHN1Y2Nlc3M6IGJvb2xlYW4sIGRlc2NyaXB0b3I6IEJsb2NrU3RyZWFtQmxvY2tEZXNjcmlwdG9yIH0gPSB7IHN1Y2Nlc3M6IGZhbHNlLCBkZXNjcmlwdG9yOiBudWxsIH07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ieXRlQXJyYXkuYnl0ZUxlbmd0aCA+PSB0aGlzLmN1cnJlbnRQb3MgKyA1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zXSA9PSAweDcwICYmIC8vID0gXCJwc2JsXCJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MgKyAxXSA9PSAweDczICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zICsgMl0gPT0gMHg2MiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcyArIDNdID09IDB4NkMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvY2tUeXBlTGVuZ3RoID0gdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zICsgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnl0ZUFycmF5LmJ5dGVMZW5ndGggPj0gdGhpcy5jdXJyZW50UG9zICsgNSArIGJsb2NrVHlwZUxlbmd0aCArIDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVhZCB0aGUgZGVzY3JpcHRvciBmcm9tIHN0cmVhbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVzY3JpcHRvciA9IG5ldyBCbG9ja1N0cmVhbUJsb2NrRGVzY3JpcHRvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVzY3JpcHRvci5CbG9ja1R5cGUgPSB0aGlzLmludGVybmFsUmVhZFN0cmluZyh0aGlzLmN1cnJlbnRQb3MgKyA1LCBibG9ja1R5cGVMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVzY3JpcHRvci5NYWpvclZlcnNpb24gPSB0aGlzLmJ5dGVBcnJheVt0aGlzLmN1cnJlbnRQb3MgKyA1ICsgYmxvY2tUeXBlTGVuZ3RoXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlc2NyaXB0b3IuTWlub3JWZXJzaW9uID0gdGhpcy5ieXRlQXJyYXlbdGhpcy5jdXJyZW50UG9zICsgNSArIGJsb2NrVHlwZUxlbmd0aCArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVzY3JpcHRvci5GbGFncyA9IHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcyArIDUgKyBibG9ja1R5cGVMZW5ndGggKyAyXSAqIDI1NiArIHRoaXMuYnl0ZUFycmF5W3RoaXMuY3VycmVudFBvcyArIDUgKyBibG9ja1R5cGVMZW5ndGggKyAzXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlc2NyaXB0b3IuUGF5bG9hZEJ5dGVzID0gdGhpcy5pbnRlcm5hbFJlYWRJbnQodGhpcy5jdXJyZW50UG9zICsgNSArIGJsb2NrVHlwZUxlbmd0aCArIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQmxvY2tTdHJlYW1SZWFkZXJTdGF0ZXMuUEFZTE9BRF9FWFBFQ1RFRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UG9zICs9IDUgKyBibG9ja1R5cGVMZW5ndGggKyA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJsb2NrRW5kID0gdGhpcy5jdXJyZW50UG9zICsgcmVzdWx0LmRlc2NyaXB0b3IuUGF5bG9hZEJ5dGVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmxvY2tEZXNjcmlwdG9yID0gcmVzdWx0LmRlc2NyaXB0b3I7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlcmUgYXJlIHRvbyBmZXcgYnl0ZXMgdG8gbWFrZSBhIGZ1bGwgYmxvY2sgZGVzY3JpcHRvciwgYnV0IHRoZSBzdHJlYW0gaXMgY29tcGxldGVseSByZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmF0YWxFcnJvciA9IHRoaXMuaXNDb21wbGV0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vIHZhbGlkIGJsb2NrIGhlYWRlciBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmF0YWxFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBhcmUgdG9vIGZldyBieXRlcyB0byBtYWtlIGEgYmxvY2sgaGVhZGVyLCBidXQgdGhlIHN0cmVhbSBpcyBjb21wbGV0ZWx5IHJlYWQgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhdGFsRXJyb3IgPSB0aGlzLmlzQ29tcGxldGUgJiYgKHRoaXMuYnl0ZUFycmF5LmJ5dGVMZW5ndGggPiB0aGlzLmN1cnJlbnRQb3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGxlYXZlQmxvY2soKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBvcyA9IHRoaXMuYmxvY2tFbmQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBCbG9ja1N0cmVhbVJlYWRlclN0YXRlcy5CTE9DS19ERVNDUklQVE9SX0VYUEVDVEVEO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2hhZGVySW5zdGFuY2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIHNoYWRlcktleTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlZmVyZW5jZXM6IHsgW2luZGV4OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGZpZ3VyZUlEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgRmlndXJlSUQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZ3VyZUlEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBGaWd1cmVJRCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlndXJlSUQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2hhZGVyS2V5KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFkZXJLZXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IFNoYWRlcktleSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVyS2V5ID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0UmVmZXJlbmNlKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVyZW5jZXNba2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNoYWRlcktleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVyS2V5ID0gc2hhZGVyS2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdChyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkUmVmZXJlbmNlKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmZXJlbmNlc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXNoU2hhZGVySW5zdGFuY2UgZXh0ZW5kcyBTaGFkZXJJbnN0YW5jZSB7XHJcblxyXG4gICAgICAgIFNJWkVfT0ZfRkxPQVQgPSA0O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYnVmZmVySUQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHByaW9yaXR5OiBudW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNoYWRlcktleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHNoYWRlcktleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0KHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFyZWFkZXIudHJ5UmVhZFN0cmluZygoaWQpID0+IHsgdGhpcy5idWZmZXJJRCA9IGlkOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJJRCA9ICdfZGVmYXVsdCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZWFkZXIudHJ5UmVhZEludDE2KChwcmlvcml0eSkgPT4geyB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7IH0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFN0cmlkZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TaGFkZXJLZXkgPT0gJ1RyYW5zcGFyZW50TWVzaFNoYWRlcicgPyAxMCAqIHRoaXMuU0laRV9PRl9GTE9BVCA6IDkgKiB0aGlzLlNJWkVfT0ZfRkxPQVQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGV4dHVyZWRNZXNoU2hhZGVySW5zdGFuY2UgZXh0ZW5kcyBNZXNoU2hhZGVySW5zdGFuY2Uge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdGV4dHVyZUlEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGV4dHVyZUlEKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlSUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzaGFkZXJLZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihzaGFkZXJLZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdChyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSByZWFkZXIudHJ5UmVhZFN0cmluZygodGV4dHVyZUlEKSA9PiB7IHRoaXMudGV4dHVyZUlEID0gdGV4dHVyZUlEOyB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUmVmZXJlbmNlKCdUZXh0dXJlQnVmZmVyJywgdGhpcy50ZXh0dXJlSUQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN1cGVyLmNvbnN0cnVjdChyZWFkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0U3RyaWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAxMSAqIHRoaXMuU0laRV9PRl9GTE9BVDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFNoYWRlckluc3RhbmNlRnJvbVJlYWRlcihyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyKTogU2hhZGVySW5zdGFuY2Uge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IFNoYWRlckluc3RhbmNlID0gbnVsbDtcclxuXHJcbiAgICAgICAgbGV0IHNoYWRlcktleTtcclxuICAgICAgICBpZiAocmVhZGVyLnRyeVJlYWRTdHJpbmcoKGtleSkgPT4geyBzaGFkZXJLZXkgPSBrZXk7IH0pKSB7XHJcbiAgICAgICAgICAgIGlmIChzaGFkZXJLZXkgPT0gJ09wYXF1ZU1lc2hTaGFkZXInIHx8IHNoYWRlcktleSA9PSAnVHJhbnNwYXJlbnRNZXNoU2hhZGVyJykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IE1lc2hTaGFkZXJJbnN0YW5jZShzaGFkZXJLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNoYWRlcktleSA9PSAnVGV4dHVyZWRNZXNoU2hhZGVyJykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFRleHR1cmVkTWVzaFNoYWRlckluc3RhbmNlKHNoYWRlcktleSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5jb25zdHJ1Y3QocmVhZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWVzaDNETGliIHtcclxuICAgICAgICBwcml2YXRlIHJvb3ROb2RlOiBOb2RlQXNzZXQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIG9iamVjdE5hbWVQcmVmaXg6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldFJvb3ROb2RlKHJvb3ROb2RlOiBOb2RlQXNzZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290Tm9kZSA9IHJvb3ROb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldE5vZGVGcm9tUGF0aChwYXRoOiBzdHJpbmcpOiBOb2RlQXNzZXQge1xyXG4gICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT0gMCB8fCAhdGhpcy5yb290Tm9kZSB8fCB0aGlzLnJvb3ROb2RlLk5hbWUgPT0gcGF0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb290Tm9kZS5nZXRDaGlsZE5vZGVGcm9tUGF0aChwYXRoLnN1YnN0cih0aGlzLnJvb3ROb2RlLk5hbWUubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBc3NldEZhY3RvcnlXZWJHTCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbGFzdFBlcmNlbnRhZ2UgPSAtMTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGFnZTogU3RhZ2VXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50RmlndXJlOiBGaWd1cmVXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50U2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRTY2VuZU1lc2gzRExpYjogTWVzaDNETGliO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlRmlndXJlKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIHN0YWdlOiBTdGFnZVdlYkdMLCBhc3NldFN0b3JlOiBBc3NldFN0b3JlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlndXJlID0gbmV3IEZpZ3VyZVdlYkdMKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNjZW5lTWVzaDNETGliKSB7XHJcbiAgICAgICAgICAgICAgICByZWFkZXIudHJ5UmVhZFN0cmluZygobm9kZVBhdGgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRGaWd1cmUuTm9kZSA9IHRoaXMuY3VycmVudFNjZW5lTWVzaDNETGliLmdldE5vZGVGcm9tUGF0aChub2RlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGFzc2V0U3RvcmUuYWRkRmlndXJlKHRoaXMuY3VycmVudEZpZ3VyZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZU1lc2gocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZSA9IFNoYWRlckluc3RhbmNlRnJvbVJlYWRlcihyZWFkZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNoYWRlckluc3RhbmNlICYmIHRoaXMuY3VycmVudEZpZ3VyZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlndXJlLmFkZFNoYWRlckluc3RhbmNlKHRoaXMuY3VycmVudFNoYWRlckluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTWVzaEJ1ZmZlcihyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCBidWZmZXJBc3NldCA9IG5ldyBCdWZmZXJBc3NldFdlYkdMKHJlYWRlciwgJ1ZlcnRleEJ1ZmZlcicsIGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRJRDogc3RyaW5nID0gYnVmZmVyQXNzZXQuQnVmZmVySUQ7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gMTtcclxuICAgICAgICAgICAgd2hpbGUgKGFzc2V0U3RvcmUuZ2V0QnVmZmVyQXNzZXQoY3VycmVudElEKSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudElEID0gYnVmZmVyQXNzZXQuQnVmZmVySUQgKyBjb3VudGVyKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZmVyQXNzZXQuQnVmZmVySUQgPSBjdXJyZW50SUQ7XHJcbiAgICAgICAgICAgIGFzc2V0U3RvcmUuYWRkQnVmZmVyQXNzZXQoY3VycmVudElELCBidWZmZXJBc3NldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2hhZGVySW5zdGFuY2UgJiYgdGhpcy5jdXJyZW50RmlndXJlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBleHRyYWN0IHRyaWFuZ2xlcyBmcm9tIHZlcnRleCBidWZmZXIsIHRoaXMgaW5mb3JtYXRpb24gaXMgdXNlZCBieSBPY3RyZWUgdG8gZGV0ZXJtaW5lIHRyaWFuZ2xlIGRhdGEgZnJvbSB0cmlhbmdsZSBpbmRpY2VzIHN0b3JlZCBpbiBPY3RyZWUgZGF0YSBzdHJ1Y3R1cmUuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZS5wdXNoVHJpYW5nbGVzKHRoaXMuY3VycmVudEZpZ3VyZS5nZXRUcmlhbmdsZXMoKSwgYnVmZmVyQXNzZXQuZ2V0QnVmZmVyRGF0YSgpLCBidWZmZXJBc3NldC5nZXRCdWZmZXJTaXplKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidWZmZXJBc3NldC5pbml0aWFsaXplKHN0YWdlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInLCBidWZmZXJBc3NldC5CdWZmZXJJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVNZXNoSW5kaWNlc0J1ZmZlcihyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCBidWZmZXJBc3NldCA9IG5ldyBCdWZmZXJBc3NldFdlYkdMKHJlYWRlciwgJ0luZGV4QnVmZmVyJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50SUQgPSBidWZmZXJBc3NldC5CdWZmZXJJRDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAxO1xyXG4gICAgICAgICAgICB3aGlsZSAoYXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChjdXJyZW50SUQpKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SUQgPSBidWZmZXJBc3NldC5CdWZmZXJJRCArIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmZXJBc3NldC5CdWZmZXJJRCA9IGN1cnJlbnRJRDtcclxuICAgICAgICAgICAgYXNzZXRTdG9yZS5hZGRCdWZmZXJBc3NldChjdXJyZW50SUQsIGJ1ZmZlckFzc2V0KTtcclxuXHJcbiAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmluaXRpYWxpemUoc3RhZ2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJywgYnVmZmVyQXNzZXQuQnVmZmVySUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlVGV4dHVyZShyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBzdGFnZTogU3RhZ2VXZWJHTCwgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMLCBkZWZlcnJlZHM6IEFycmF5PEpRdWVyeS5EZWZlcnJlZDxib29sZWFuPj4pIHtcclxuICAgICAgICAgICAgbGV0IHRleHR1cmVOYW1lOiBzdHJpbmc7IFxyXG4gICAgICAgICAgICBsZXQgcGl4ZWxEYXRhU2l6ZTtcclxuICAgICAgICAgICAgaWYgKHJlYWRlci50cnlSZWFkU3RyaW5nKCh2YWx1ZSkgPT4geyB0ZXh0dXJlTmFtZSA9IHZhbHVlOyB9KSAmJiByZWFkZXIudHJ5UmVhZEludDY0KCh2YWx1ZSkgPT4geyBwaXhlbERhdGFTaXplID0gdmFsdWU7IH0pKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VEYXRhID0gcmVhZGVyLnJlYWRCeXRlcyhwaXhlbERhdGFTaXplKTtcclxuICAgICAgICAgICAgICAgIGxldCBleHRlbnNpb24gPSB0ZXh0dXJlTmFtZS5zdWJzdHIodGV4dHVyZU5hbWUubGFzdEluZGV4T2YoJy4nKSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZVR5cGUgPSAnanBlZyc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9uID09ICcucG5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVHlwZSA9ICdwbmcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbaW1hZ2VEYXRhXSwgeyAndHlwZSc6ICdpbWFnZS8nICsgaW1hZ2VUeXBlIH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZHMucHVzaChkZWZlcnJlZCk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZFRleHR1cmVBc3NldCh0ZXh0dXJlTmFtZSwgbmV3IFRleHR1cmVBc3NldFdlYkdMKHRoaXMuc3RhZ2UsIGltYWdlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2Uub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwcm9jZXNzaW5nIHRleHR1cmUgYmxvYiAnICsgdGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlT2N0cmVlKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIHN0YWdlOiBTdGFnZVdlYkdMLCBhc3NldFN0b3JlOiBBc3NldFN0b3JlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlndXJlLnNldEludGVyc2VjdG9yKE9jdHJlZS5DcmVhdGVGcm9tQmxvY2tTdHJlYW0ocmVhZGVyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2NlbmUocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZU1lc2gzRExpYiA9IG5ldyBNZXNoM0RMaWIocmVhZGVyLnJlYWRTdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlUm9vdE5vZGUocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2NlbmVNZXNoM0RMaWIpIHtcclxuICAgICAgICAgICAgICAgIGxldCByb290Tm9kZSA9IE5vZGVBc3NldC5Gcm9tQmxvY2tTdHJlYW0ocmVhZGVyLCB0aGlzLmN1cnJlbnRTY2VuZU1lc2gzRExpYik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZU1lc2gzRExpYi5zZXRSb290Tm9kZShyb290Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0U3RvcmUuYWRkUm9vdE5vZGUocm9vdE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHByb2Nlc3NCbG9jayhibG9ja1R5cGU6IHN0cmluZywgcmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgc3RhZ2U6IFN0YWdlV2ViR0wsIGFzc2V0U3RvcmU6IEFzc2V0U3RvcmVXZWJHTCwgZGVmZXJyZWRzOiBBcnJheTxKUXVlcnkuRGVmZXJyZWQ8Ym9vbGVhbj4+KSB7XHJcbiAgICAgICAgICAgIGlmIChibG9ja1R5cGUgPT0gJ1BTU2NlbmUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKHJlYWRlciwgc3RhZ2UsIGFzc2V0U3RvcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrVHlwZSA9PSAnUFNGaWd1cmUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZpZ3VyZShyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChibG9ja1R5cGUgPT0gJ1BTTWVzaCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVzaChyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChibG9ja1R5cGUgPT0gJ1BTTWVzaERhdGEnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1lc2hCdWZmZXIocmVhZGVyLCBzdGFnZSwgYXNzZXRTdG9yZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYmxvY2tUeXBlID09ICdQU01lc2hJbmRpY2VzJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNZXNoSW5kaWNlc0J1ZmZlcihyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChibG9ja1R5cGUgPT0gJ1BTVGV4dHVyZScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVGV4dHVyZShyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlLCBkZWZlcnJlZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGJsb2NrVHlwZSA9PSAnUFNNZXNoT2N0cmVlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVPY3RyZWUocmVhZGVyLCBzdGFnZSwgYXNzZXRTdG9yZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYmxvY2tUeXBlID09ICdQU1Jvb3ROb2RlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVSb290Tm9kZShyZWFkZXIsIHN0YWdlLCBhc3NldFN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9hZEZyb21BcnJheUJ1ZmZlcihidWZmZXI6IEFycmF5QnVmZmVyKTogSlF1ZXJ5LkRlZmVycmVkPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVkczogQXJyYXk8SlF1ZXJ5LkRlZmVycmVkPGJvb2xlYW4+PiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFzc2V0U3RvcmUgPSB0aGlzLnN0YWdlLkFzc2V0U3RvcmU7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciA9IG5ldyBCbG9ja1N0cmVhbVJlYWRlcihidWZmZXIpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHJlYWRlci5lbnRlckJsb2NrKCk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NCbG9jayhyZXMuZGVzY3JpcHRvci5CbG9ja1R5cGUsIHJlYWRlciwgdGhpcy5zdGFnZSwgYXNzZXRTdG9yZSwgZGVmZXJyZWRzKTtcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIubGVhdmVCbG9jaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IHJlYWRlci5lbnRlckJsb2NrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJC53aGVuLmFwcGx5KCQsIGRlZmVycmVkcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RnJvbVVybCh1cmw6IHN0cmluZyk6IEpRdWVyeS5EZWZlcnJlZDxCb29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlZDogSlF1ZXJ5LkRlZmVycmVkPEJvb2xlYW4+ID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcTogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xyXG4gICAgICAgICAgICByZXEucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuXHJcbiAgICAgICAgICAgIHJlcS5vbmxvYWQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEZyb21BcnJheUJ1ZmZlcig8QXJyYXlCdWZmZXI+cmVxLnJlc3BvbnNlKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXEub25lcnJvciA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGV2ZW50KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcS5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIChvRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvRXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50Q29tcGxldGUgPSBvRXZlbnQubG9hZGVkIC8gb0V2ZW50LnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RQZXJjZW50YWdlICE9IE1hdGguZmxvb3IocGVyY2VudENvbXBsZXRlICogMTAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RQZXJjZW50YWdlID0gTWF0aC5mbG9vcihwZXJjZW50Q29tcGxldGUgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5ub3RpZnkoTWF0aC5yb3VuZChwZXJjZW50Q29tcGxldGUgKiAxMDApKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVuYWJsZSB0byBjb21wdXRlIHByb2dyZXNzIGluZm9ybWF0aW9uIHNpbmNlIHRoZSB0b3RhbCBzaXplIGlzIHVua25vd25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXEuc2VuZChudWxsKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSW50ZXJzZWN0b3Ige1xyXG4gICAgICAgIGdldEJvdW5kaW5nQm94KCk6IHBzZ2VvbWV0cnkuQUFCQjNEO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBCb3VuZGluZ0JveEludGVyc2VjdG9yIGltcGxlbWVudHMgSW50ZXJzZWN0b3Ige1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYm91bmRpbmdCb3g6IHBzZ2VvbWV0cnkuQUFCQjNEKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Qm91bmRpbmdCb3goKTogcHNnZW9tZXRyeS5BQUJCM0Qge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ib3VuZGluZ0JveDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE9jdHJlZSBpbXBsZW1lbnRzIEludGVyc2VjdG9yIHtcclxuICAgICAgICBwcml2YXRlIGJvdW5kaW5nQm94ID0gbmV3IHBzZ2VvbWV0cnkuQUFCQjNEKCk7XHJcblxyXG4gICAgICAgIHN0YXRpYyBDcmVhdGVGcm9tQmxvY2tTdHJlYW0ocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlcik6IE9jdHJlZSB7XHJcbiAgICAgICAgICAgIGxldCBvY3RyZWUgPSBuZXcgT2N0cmVlKCk7XHJcbiAgICAgICAgICAgIGxldCB4MCwgeTAsIHowLCB4MSwgeTEsIHoxO1xyXG4gICAgICAgICAgICBsZXQgbGV2ZWxzO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyZWFkZXIudHJ5UmVhZEludCgodmFsKSA9PiB7IGxldmVscyA9IHZhbDsgfSkgJiZcclxuICAgICAgICAgICAgICAgIHJlYWRlci50cnlSZWFkRmxvYXQoKHZhbCkgPT4geDAgPSB2YWwpICYmXHJcbiAgICAgICAgICAgICAgICByZWFkZXIudHJ5UmVhZEZsb2F0KCh2YWwpID0+IHkwID0gdmFsKSAmJlxyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnRyeVJlYWRGbG9hdCgodmFsKSA9PiB6MCA9IHZhbCkgJiZcclxuICAgICAgICAgICAgICAgIHJlYWRlci50cnlSZWFkRmxvYXQoKHZhbCkgPT4geDEgPSB2YWwpICYmXHJcbiAgICAgICAgICAgICAgICByZWFkZXIudHJ5UmVhZEZsb2F0KCh2YWwpID0+IHkxID0gdmFsKSAmJlxyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnRyeVJlYWRGbG9hdCgodmFsKSA9PiB6MSA9IHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIG9jdHJlZS5ib3VuZGluZ0JveC5hZGRQb2ludCh4MCwgeTAsIHowKTtcclxuICAgICAgICAgICAgICAgIG9jdHJlZS5ib3VuZGluZ0JveC5hZGRQb2ludCh4MSwgeTEsIHoxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG9jdHJlZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRCb3VuZGluZ0JveCgpOiBwc2dlb21ldHJ5LkFBQkIzRCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvdW5kaW5nQm94O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEZpZ3VyZVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmaWd1cmVJRDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNoYWRlckluc3RhbmNlczogU2hhZGVySW5zdGFuY2VbXSA9IFtdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGludGVyc2VjdG9yOiBJbnRlcnNlY3RvcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBub2RlOiBOb2RlQXNzZXQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTm9kZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgTm9kZSh2YWx1ZTogTm9kZUFzc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBGaWd1cmVJRCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlndXJlSUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNoYWRlckluc3RhbmNlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhZGVySW5zdGFuY2VzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZmlndXJlSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmZpZ3VyZUlEID0gZmlndXJlSUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Qm91bmRpbmdCb3goKTogcHNnZW9tZXRyeS5BQUJCM0Qge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcnNlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuTm9kZSA/IHRoaXMuaW50ZXJzZWN0b3IuZ2V0Qm91bmRpbmdCb3goKS50cmFuc2Zvcm0odGhpcy5Ob2RlLkFic29sdXRlVHJhbnNmb3JtYXRpb24pIDogdGhpcy5pbnRlcnNlY3Rvci5nZXRCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBwc2dlb21ldHJ5LkFBQkIzRCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkU2hhZGVySW5zdGFuY2Uoc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVySW5zdGFuY2VzLnB1c2goc2hhZGVySW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHN0YWdlID0gY29udGV4dC5TdGFnZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVySW5zdGFuY2VzLmZvckVhY2goKHNoYWRlckluc3RhbmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzaGFkZXJJbnN0YW5jZS5GaWd1cmVJRCA9IHRoaXMuZmlndXJlSUQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hhZGVyUHJvZ3JhbSA9IHN0YWdlLmdldFNoYWRlclByb2dyYW0oY29udGV4dCwgc2hhZGVySW5zdGFuY2UuU2hhZGVyS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChzaGFkZXJQcm9ncmFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaGFkZXJQcm9ncmFtID0gc2hhZGVyUHJvZ3JhbTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk5vZGVUcmFuc2Zvcm0gPSB0aGlzLk5vZGUgPyB0aGlzLk5vZGUuQWJzb2x1dGVUcmFuc2Zvcm1hdGlvbiA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbS5yZW5kZXIoY29udGV4dCwgc2hhZGVySW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRJbnRlcnNlY3RvcihpbnRlcnNlY3RvcjogSW50ZXJzZWN0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcnNlY3RvciA9IGludGVyc2VjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludGVyc2VjdHNCb3VuZGluZ0JveChyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBhdDogcHNnZW9tZXRyeS5WZWMzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW50ZXJzZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbnRlcnNlY3Rpb25Qb2ludCA9IHRoaXMuaW50ZXJzZWN0b3IuZ2V0Qm91bmRpbmdCb3goKS5pbnRlcnNlY3RzUmF5KHJheSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJzZWN0aW9uUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdC5hc3NpZ25WZWMoaW50ZXJzZWN0aW9uUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQW5pbWF0aW9uVHJhbnNmb3JtYXRpb24ge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRnJvbUJsb2NrU3RyZWFtKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIG1lc2gzRExpYjogTWVzaDNETGliKTogQW5pbWF0aW9uVHJhbnNmb3JtYXRpb24ge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGVBc3NldCB7XHJcbiAgICAgICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcGFyZW50Tm9kZTogTm9kZUFzc2V0O1xyXG5cclxuICAgICAgICBwcml2YXRlIGNoaWxkTm9kZXM6IHsgW2luZGV4OiBzdHJpbmddOiBOb2RlQXNzZXQgfSA9IHt9O1xyXG5cclxuICAgICAgICBwcml2YXRlIGxvY2FsVHJhbnNmb3JtYXRpb246IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhYnNvbHV0ZVRyYW5zZm9ybWF0aW9uOiBwc2dlb21ldHJ5Lk1hdHJpeDQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTmFtZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQWJzb2x1dGVUcmFuc2Zvcm1hdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVUcmFuc2Zvcm1hdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTG9jYWxUcmFuc2Zvcm1hdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxUcmFuc2Zvcm1hdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZE5vZGVGcm9tUGF0aChwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gdGhpcy5jaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aCA9PSB0aGlzLmNoaWxkTm9kZXNbY2hpbGRdLk5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzW2NoaWxkXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiB0aGlzLmNoaWxkTm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXRoLnN1YnN0cmluZygwLCB0aGlzLmNoaWxkTm9kZXNbY2hpbGRdLk5hbWUubGVuZ3RoKSA9PSB0aGlzLmNoaWxkTm9kZXNbY2hpbGRdLk5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzW2NoaWxkXS5nZXRDaGlsZE5vZGVGcm9tUGF0aChwYXRoLnN1YnN0cih0aGlzLmNoaWxkTm9kZXNbY2hpbGRdLk5hbWUubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBGcm9tQmxvY2tTdHJlYW0ocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgbWVzaDNETGliOiBNZXNoM0RMaWIsIHBhcmVudE5vZGU/OiBOb2RlQXNzZXQpOiBOb2RlQXNzZXQge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE5vZGVBc3NldCgpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0Lm5hbWUgPSByZWFkZXIucmVhZFN0cmluZygpO1xyXG4gICAgICAgICAgICByZXN1bHQubG9jYWxUcmFuc2Zvcm1hdGlvbiA9IHJlYWRlci5yZWFkTWF0cml4NCgpO1xyXG4gICAgICAgICAgICByZXN1bHQuYWJzb2x1dGVUcmFuc2Zvcm1hdGlvbiA9IE5vZGVBc3NldC5jYWxjdWxhdGVBYnNvbHV0ZVRyYW5zZm9ybWF0aW9uKHJlc3VsdC5sb2NhbFRyYW5zZm9ybWF0aW9uLCBwYXJlbnROb2RlKTtcclxuICAgICAgICAgICAgcmVzdWx0LnBhcmVudE5vZGUgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgICAgICByZXN1bHQucmVhZENoaWxkTm9kZXMocmVhZGVyLCBtZXNoM0RMaWIpO1xyXG4gICAgICAgICAgICByZXN1bHQucmVhZEFuaW1hdGlvblRyYW5zZm9ybWF0aW9ucyhyZWFkZXIsIG1lc2gzRExpYik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlQWJzb2x1dGVUcmFuc2Zvcm1hdGlvbihsb2NhbFRyYW5zZm9ybWF0aW9uOiBwc2dlb21ldHJ5Lk1hdHJpeDQsIHBhcmVudE5vZGU6IE5vZGVBc3NldCk6IHBzZ2VvbWV0cnkuTWF0cml4NCB7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHBzZ2VvbWV0cnkuTWF0cml4ND5sb2NhbFRyYW5zZm9ybWF0aW9uLm11bHRpcGx5KHBhcmVudE5vZGUuQWJzb2x1dGVUcmFuc2Zvcm1hdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxUcmFuc2Zvcm1hdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkQ2hpbGROb2RlcyhyZWFkZXI6IEJsb2NrU3RyZWFtUmVhZGVyLCBtZXNoM0RMaWI6IE1lc2gzRExpYikge1xyXG4gICAgICAgICAgICByZWFkZXIudHJ5UmVhZEludCgoY2hpbGROYW1lQ291bnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROYW1lQ291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGROb2RlKE5vZGVBc3NldC5Gcm9tQmxvY2tTdHJlYW0ocmVhZGVyLCBtZXNoM0RMaWIsIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRBbmltYXRpb25UcmFuc2Zvcm1hdGlvbnMocmVhZGVyOiBCbG9ja1N0cmVhbVJlYWRlciwgbWVzaDNETGliOiBNZXNoM0RMaWIpIHtcclxuICAgICAgICAgICAgcmVhZGVyLnRyeVJlYWRJbnQoKG51bUFuaW1hdGlvblRyYW5zZm9ybWF0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1BbmltYXRpb25UcmFuc2Zvcm1hdGlvbnM7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQW5pbWF0aW9uVHJhbnNmb3JtYXRpb24oQW5pbWF0aW9uVHJhbnNmb3JtYXRpb24uRnJvbUJsb2NrU3RyZWFtKHJlYWRlciwgbWVzaDNETGliKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhZGRDaGlsZE5vZGUobm9kZTogTm9kZUFzc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGROb2Rlc1tub2RlLk5hbWVdID0gbm9kZTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBwcml2YXRlIGFkZEFuaW1hdGlvblRyYW5zZm9ybWF0aW9uKGFuaW1hdGlvblRyYW5zZm9ybWF0aW9uOiBBbmltYXRpb25UcmFuc2Zvcm1hdGlvbikge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEJ1ZmZlckFzc2V0V2ViR0wge1xyXG5cclxuICAgICAgICBwcml2YXRlIGJ1ZmZlcklEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYnVmZmVyU2l6ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgcHVibGljIGJ1ZmZlckRhdGE6IEFycmF5QnVmZmVyIHwgU2hhcmVkQXJyYXlCdWZmZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgd2ViR0xCdWZmZXI6IFdlYkdMQnVmZmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGlzRWxlbWVudEJ1ZmZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEJ1ZmZlcklEKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5idWZmZXJJRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgQnVmZmVySUQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcklEID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEJ1ZmZlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2ViR0xCdWZmZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEJ1ZmZlclNpemUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlclNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IEJ1ZmZlclNpemUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlclNpemUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHJlYWRlcjogQmxvY2tTdHJlYW1SZWFkZXIsIGJ1ZmZlcklEOiBzdHJpbmcsIGlzRWxlbWVudEJ1ZmZlcjogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcklEID0gYnVmZmVySUQ7XHJcbiAgICAgICAgICAgIHRoaXMuaXNFbGVtZW50QnVmZmVyID0gaXNFbGVtZW50QnVmZmVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSByZWFkZXIuQ3VycmVudEJsb2NrRGVzY3JpcHRvcjtcclxuICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlYWQgYWRkaXRpb25hbCBtZXRhIGRhdGEgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IuTWFqb3JWZXJzaW9uID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcklEID0gcmVhZGVyLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyU2l6ZSA9IHJlYWRlci5yZW1haW5pbmdCeXRlc0luQmxvY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlckRhdGEgPSByZWFkZXIucmVhZEJ5dGVzKHRoaXMuYnVmZmVyU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2ViR0xCdWZmZXIgPSBzdGFnZS5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRWxlbWVudEJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy53ZWJHTEJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5idWZmZXJEYXRhKHN0YWdlLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCA8QXJyYXlCdWZmZXI+dGhpcy5idWZmZXJEYXRhLCBzdGFnZS5nbC5TVEFUSUNfRFJBVyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy53ZWJHTEJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5idWZmZXJEYXRhKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgPEFycmF5QnVmZmVyPnRoaXMuYnVmZmVyRGF0YSwgc3RhZ2UuZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmluZChzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0VsZW1lbnRCdWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMud2ViR0xCdWZmZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5BUlJBWV9CVUZGRVIsIHRoaXMud2ViR0xCdWZmZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmluZEludGVybGVhdmVkKHN0YWdlOiBTdGFnZVdlYkdMLCBhdHRyaWJ1dGVMb2NhdGlvbjogbnVtYmVyLCBzaXplOiBudW1iZXIsIHN0cmlkZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlTG9jYXRpb24gPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5BUlJBWV9CVUZGRVIsIHRoaXMud2ViR0xCdWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cmlidXRlTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRyaWJ1dGVMb2NhdGlvbiwgc2l6ZSwgc3RhZ2UuZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBPcGFxdWVNZXNoQnVpbGRlciB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmVydGljZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbmRpY2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmVydEJ1ZmZlckFzc2V0OiBCdWZmZXJBc3NldFdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIGluZEJ1ZmZlckFzc2V0OiBCdWZmZXJBc3NldFdlYkdMO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRUcmkoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlcixcclxuICAgICAgICAgICAgeDI6IG51bWJlciwgeTI6IG51bWJlciwgejI6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgZG91YmxlU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB4MCwgeTAsIHowLCAwLCAwLCAxLCByLCBnLCBiLFxyXG4gICAgICAgICAgICAgICAgeDEsIHkxLCB6MSwgMCwgMCwgMSwgciwgZywgYixcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIDAsIDAsIDEsIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLmluZGljZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLmluZGljZXMucHVzaChpLCBpICsgMSwgaSArIDIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRvdWJsZVNpZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgeDEsIHkxLCB6MSwgMCwgMCwgMSwgciwgZywgYixcclxuICAgICAgICAgICAgICAgICAgICB4MCwgeTAsIHowLCAwLCAwLCAxLCByLCBnLCBiLFxyXG4gICAgICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIDAsIDAsIDEsIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGkgPSB0aGlzLmluZGljZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRpY2VzLnB1c2goaSwgaSArIDEsIGkgKyAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFF1YWQoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlcixcclxuICAgICAgICAgICAgeDI6IG51bWJlciwgeTI6IG51bWJlciwgejI6IG51bWJlcixcclxuICAgICAgICAgICAgeDM6IG51bWJlciwgeTM6IG51bWJlciwgejM6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgZG91YmxlU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFRyaSh4MCwgeTAsIHowLFxyXG4gICAgICAgICAgICAgICAgeDEsIHkxLCB6MSxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiLCBkb3VibGVTaWRlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLFxyXG4gICAgICAgICAgICAgICAgeDMsIHkzLCB6MyxcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIsIGRvdWJsZVNpZGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRTdHJva2UoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcikge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpciA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoeDEsIHkxLCB6MSkuc3ViKG5ldyBwc2dlb21ldHJ5LlZlYzMoeDAsIHkwLCB6MCkpO1xyXG4gICAgICAgICAgICBsZXQgcmFkaXVzID0gZGlyLm5vcm0oKTtcclxuICAgICAgICAgICAgbGV0IGF6aW11dGggPSBNYXRoLmF0YW4yKC1kaXIueiwgZGlyLngpO1xyXG4gICAgICAgICAgICBsZXQgcG9sYXIgPSBNYXRoLmFzaW4oZGlyLnkgLyByYWRpdXMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoaWNrbmVzcyA9IC4wMTtcclxuICAgICAgICAgICAgbGV0IHVwID0gPHBzZ2VvbWV0cnkuVmVjND5wc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVJvdGF0aW9uKGF6aW11dGgsIHBvbGFyLCAwKS5tdWx0aXBseShuZXcgcHNnZW9tZXRyeS5WZWM0KDAsIHRoaWNrbmVzcywgMCwgMSkpO1xyXG4gICAgICAgICAgICBsZXQgZnJvbnQgPSA8cHNnZW9tZXRyeS5WZWM0PnBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tUm90YXRpb24oYXppbXV0aCwgcG9sYXIsIDApLm11bHRpcGx5KG5ldyBwc2dlb21ldHJ5LlZlYzQoMCwgMCwgdGhpY2tuZXNzLCAxKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFF1YWQoeDAgKyB1cC54IC0gZnJvbnQueCwgeTAgKyB1cC55IC0gZnJvbnQueSwgejAgKyB1cC56IC0gZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgxICsgdXAueCAtIGZyb250LngsIHkxICsgdXAueSAtIGZyb250LnksIHoxICsgdXAueiAtIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MSAtIHVwLnggLSBmcm9udC54LCB5MSAtIHVwLnkgLSBmcm9udC55LCB6MSAtIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDAgLSB1cC54IC0gZnJvbnQueCwgeTAgLSB1cC55IC0gZnJvbnQueSwgejAgLSB1cC56IC0gZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRRdWFkKHgwIC0gdXAueCArIGZyb250LngsIHkwIC0gdXAueSArIGZyb250LnksIHowIC0gdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MSAtIHVwLnggKyBmcm9udC54LCB5MSAtIHVwLnkgKyBmcm9udC55LCB6MSAtIHVwLnogKyBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDEgKyB1cC54ICsgZnJvbnQueCwgeTEgKyB1cC55ICsgZnJvbnQueSwgejEgKyB1cC56ICsgZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgwICsgdXAueCArIGZyb250LngsIHkwICsgdXAueSArIGZyb250LnksIHowICsgdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUXVhZCh4MCAtIHVwLnggLSBmcm9udC54LCB5MCAtIHVwLnkgLSBmcm9udC55LCB6MCAtIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDEgLSB1cC54IC0gZnJvbnQueCwgeTEgLSB1cC55IC0gZnJvbnQueSwgejEgLSB1cC56IC0gZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgxIC0gdXAueCArIGZyb250LngsIHkxIC0gdXAueSArIGZyb250LnksIHoxIC0gdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MCAtIHVwLnggKyBmcm9udC54LCB5MCAtIHVwLnkgKyBmcm9udC55LCB6MCAtIHVwLnogKyBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFF1YWQoeDAgKyB1cC54ICsgZnJvbnQueCwgeTAgKyB1cC55ICsgZnJvbnQueSwgejAgKyB1cC56ICsgZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHgxICsgdXAueCArIGZyb250LngsIHkxICsgdXAueSArIGZyb250LnksIHoxICsgdXAueiArIGZyb250LnosXHJcbiAgICAgICAgICAgICAgICB4MSArIHVwLnggLSBmcm9udC54LCB5MSArIHVwLnkgLSBmcm9udC55LCB6MSArIHVwLnogLSBmcm9udC56LFxyXG4gICAgICAgICAgICAgICAgeDAgKyB1cC54IC0gZnJvbnQueCwgeTAgKyB1cC55IC0gZnJvbnQueSwgejAgKyB1cC56IC0gZnJvbnQueixcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJ0QnVmID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnZlcnRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZlcnRCdWYuc2V0KHRoaXMudmVydGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5idWZmZXJEYXRhID0gdmVydEJ1Zi5idWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LkJ1ZmZlclNpemUgPSB0aGlzLmluZGljZXMubGVuZ3RoICogOSAqIDQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kQnVmID0gbmV3IEludDMyQXJyYXkodGhpcy5pbmRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGluZEJ1Zi5zZXQodGhpcy5pbmRpY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRCdWZmZXJBc3NldC5idWZmZXJEYXRhID0gaW5kQnVmLmJ1ZmZlcjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmluZEJ1ZmZlckFzc2V0LmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpZ3VyZShzdGFnZTogU3RhZ2VXZWJHTCwgZmlndXJlSUQ6IHN0cmluZyk6IEZpZ3VyZVdlYkdMIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRCdWZmZXJBc3NldCA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCBmaWd1cmVJRCArICdfaW5kaWNlcycsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldCA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCBmaWd1cmVJRCArICdfdmVydGljZXMnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoc3RhZ2UpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuQXNzZXRTdG9yZS5hZGRCdWZmZXJBc3NldChmaWd1cmVJRCArICdfaW5kaWNlcycsIHRoaXMuaW5kQnVmZmVyQXNzZXQpO1xyXG4gICAgICAgICAgICBzdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KGZpZ3VyZUlEICsgJ192ZXJ0aWNlcycsIHRoaXMudmVydEJ1ZmZlckFzc2V0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaGFkZXJJbnN0YW5jZSA9IG5ldyBtb2RlbHN0YWdld2ViLk1lc2hTaGFkZXJJbnN0YW5jZSgnT3BhcXVlTWVzaFNoYWRlcicpO1xyXG4gICAgICAgICAgICBzaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJywgZmlndXJlSUQgKyAnX2luZGljZXMnKTtcclxuICAgICAgICAgICAgc2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInLCBmaWd1cmVJRCArICdfdmVydGljZXMnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmaWd1cmUgPSBuZXcgbW9kZWxzdGFnZXdlYi5GaWd1cmVXZWJHTChmaWd1cmVJRCk7XHJcbiAgICAgICAgICAgIGZpZ3VyZS5hZGRTaGFkZXJJbnN0YW5jZShzaGFkZXJJbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlndXJlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVHJhbnNwYXJlbnRNZXNoQnVpbGRlciB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmVydGljZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbmRpY2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB2ZXJ0QnVmZmVyQXNzZXQ6IEJ1ZmZlckFzc2V0V2ViR0wsIHByb3RlY3RlZCBpbmRCdWZmZXJBc3NldDogQnVmZmVyQXNzZXRXZWJHTCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFRyaSh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB6MDogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB6MTogbnVtYmVyLFxyXG4gICAgICAgICAgICB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCB6MjogbnVtYmVyLFxyXG4gICAgICAgICAgICByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIsIHR3b1NpZGVkPzogYm9vbGVhbikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgeDAsIHkwLCB6MCwgMCwgMCwgMSwgciwgZywgYiwgYSxcclxuICAgICAgICAgICAgICAgIHgxLCB5MSwgejEsIDAsIDAsIDEsIHIsIGcsIGIsIGEsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLCAwLCAwLCAxLCByLCBnLCBiLCBhKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpID0gdGhpcy5pbmRpY2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2VzLnB1c2goaSwgaSArIDEsIGkgKyAyKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0d29TaWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUcmkoeDAsIHkwLCB6MCxcclxuICAgICAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLFxyXG4gICAgICAgICAgICAgICAgICAgIHgxLCB5MSwgejEsXHJcbiAgICAgICAgICAgICAgICAgICAgciwgZywgYiwgYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRRdWFkKHgwOiBudW1iZXIsIHkwOiBudW1iZXIsIHowOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHoxOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIHoyOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHgzOiBudW1iZXIsIHkzOiBudW1iZXIsIHozOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlciwgdHdvU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFRyaSh4MCwgeTAsIHowLFxyXG4gICAgICAgICAgICAgICAgeDEsIHkxLCB6MSxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiLCBhLCB0d29TaWRlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLFxyXG4gICAgICAgICAgICAgICAgeDMsIHkzLCB6MyxcclxuICAgICAgICAgICAgICAgIHIsIGcsIGIsIGEsIHR3b1NpZGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJ0QnVmID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnZlcnRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZlcnRCdWYuc2V0KHRoaXMudmVydGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5idWZmZXJEYXRhID0gdmVydEJ1Zi5idWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMudmVydEJ1ZmZlckFzc2V0LkJ1ZmZlclNpemUgPSB0aGlzLmluZGljZXMubGVuZ3RoICogMTAgKiA0O1xyXG5cclxuICAgICAgICAgICAgbGV0IGluZEJ1ZiA9IG5ldyBJbnQzMkFycmF5KHRoaXMuaW5kaWNlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpbmRCdWYuc2V0KHRoaXMuaW5kaWNlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kQnVmZmVyQXNzZXQuYnVmZmVyRGF0YSA9IGluZEJ1Zi5idWZmZXI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRCdWZmZXJBc3NldC5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRleHR1cmVkTWVzaEJ1aWxkZXIge1xyXG5cclxuICAgICAgICBwcml2YXRlIHZlcnRpY2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5kaWNlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdmVydEJ1ZmZlckFzc2V0OiBCdWZmZXJBc3NldFdlYkdMLCBwcm90ZWN0ZWQgaW5kQnVmZmVyQXNzZXQ6IEJ1ZmZlckFzc2V0V2ViR0wpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRUcmkoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlciwgdTA6IG51bWJlciwgdjA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlciwgdTE6IG51bWJlciwgdjE6IG51bWJlcixcclxuICAgICAgICAgICAgeDI6IG51bWJlciwgeTI6IG51bWJlciwgejI6IG51bWJlciwgdTI6IG51bWJlciwgdjI6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgdHdvU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB4MCwgeTAsIHowLCAwLCAwLCAxLCByLCBnLCBiLCB1MCwgdjAsXHJcbiAgICAgICAgICAgICAgICB4MSwgeTEsIHoxLCAwLCAwLCAxLCByLCBnLCBiLCB1MSwgdjEsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLCAwLCAwLCAxLCByLCBnLCBiLCB1MiwgdjIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLmluZGljZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLmluZGljZXMucHVzaChpLCBpICsgMSwgaSArIDIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR3b1NpZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRyaSh4MCwgeTAsIHowLCB1MCwgdjAsXHJcbiAgICAgICAgICAgICAgICAgICAgeDIsIHkyLCB6MiwgdTIsIHYyLFxyXG4gICAgICAgICAgICAgICAgICAgIHgxLCB5MSwgejEsIHUxLCB2MSxcclxuICAgICAgICAgICAgICAgICAgICByLCBnLCBiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFF1YWQoeDA6IG51bWJlciwgeTA6IG51bWJlciwgejA6IG51bWJlciwgdTA6IG51bWJlciwgdjA6IG51bWJlcixcclxuICAgICAgICAgICAgeDE6IG51bWJlciwgeTE6IG51bWJlciwgejE6IG51bWJlciwgdTE6IG51bWJlciwgdjE6IG51bWJlcixcclxuICAgICAgICAgICAgeDI6IG51bWJlciwgeTI6IG51bWJlciwgejI6IG51bWJlciwgdTI6IG51bWJlciwgdjI6IG51bWJlcixcclxuICAgICAgICAgICAgeDM6IG51bWJlciwgeTM6IG51bWJlciwgejM6IG51bWJlciwgdTM6IG51bWJlciwgdjM6IG51bWJlcixcclxuICAgICAgICAgICAgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgdHdvU2lkZWQ/OiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFRyaSh4MCwgeTAsIHowLCB1MCwgdjAsXHJcbiAgICAgICAgICAgICAgICB4MSwgeTEsIHoxLCB1MSwgdjEsXHJcbiAgICAgICAgICAgICAgICB4MiwgeTIsIHoyLCB1MiwgdjIsXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiLCB0d29TaWRlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVHJpKHgwLCB5MCwgejAsIHUwLCB2MCxcclxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIHUyLCB2MiwgXHJcbiAgICAgICAgICAgICAgICB4MywgeTMsIHozLCB1MywgdjMsXHJcbiAgICAgICAgICAgICAgICByLCBnLCBiLCB0d29TaWRlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW5pdGlhbGl6ZShzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICBsZXQgdmVydEJ1ZiA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy52ZXJ0aWNlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICB2ZXJ0QnVmLnNldCh0aGlzLnZlcnRpY2VzKTtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0QnVmZmVyQXNzZXQuYnVmZmVyRGF0YSA9IHZlcnRCdWYuYnVmZmVyO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRCdWZmZXJBc3NldC5CdWZmZXJTaXplID0gdGhpcy5pbmRpY2VzLmxlbmd0aCAqIDExICogNDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRCdWYgPSBuZXcgSW50MzJBcnJheSh0aGlzLmluZGljZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgaW5kQnVmLnNldCh0aGlzLmluZGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmluZEJ1ZmZlckFzc2V0LmJ1ZmZlckRhdGEgPSBpbmRCdWYuYnVmZmVyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52ZXJ0QnVmZmVyQXNzZXQuaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kQnVmZmVyQXNzZXQuaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUZXh0dXJlQXNzZXRXZWJHTCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGV4dHVyZTogV2ViR0xUZXh0dXJlO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFnZTogU3RhZ2VXZWJHTCwgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfCBXZWJHTFRleHR1cmUpIHtcclxuICAgICAgICAgICAgaWYgKGltYWdlIGluc3RhbmNlb2YgV2ViR0xUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUgPSBpbWFnZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHN0YWdlLmdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRUZXh0dXJlKHN0YWdlLmdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC50ZXhJbWFnZTJEKHN0YWdlLmdsLlRFWFRVUkVfMkQsIDAsIHN0YWdlLmdsLlJHQkEsIHN0YWdlLmdsLlJHQkEsIHN0YWdlLmdsLlVOU0lHTkVEX0JZVEUsIGltYWdlKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLnRleFBhcmFtZXRlcmkoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgc3RhZ2UuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBzdGFnZS5nbC5MSU5FQVIpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wudGV4UGFyYW1ldGVyaShzdGFnZS5nbC5URVhUVVJFXzJELCBzdGFnZS5nbC5URVhUVVJFX01JTl9GSUxURVIsIHN0YWdlLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5nZW5lcmF0ZU1pcG1hcChzdGFnZS5nbC5URVhUVVJFXzJEKTtcclxuICAgICAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRUZXh0dXJlKHN0YWdlLmdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiaW5kKHN0YWdlOiBTdGFnZVdlYkdMLCBwcm9ncmFtOiBTaGFkZXJQcm9ncmFtV2ViR0wsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5hY3RpdmVUZXh0dXJlKHN0YWdlLmdsLlRFWFRVUkUwKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wudW5pZm9ybTFpKHN0YWdlLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLlByb2dyYW0sIGF0dHJpYnV0ZU5hbWUpLCAwKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVuYmluZChzdGFnZTogU3RhZ2VXZWJHTCwgcHJvZ3JhbTogU2hhZGVyUHJvZ3JhbVdlYkdMLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYWN0aXZlVGV4dHVyZShzdGFnZS5nbC5URVhUVVJFMCk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRUZXh0dXJlKHN0YWdlLmdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8vIEFuIGFzc2V0IHN0b3JlIGNsYXNzIGZvciBXZWJHTC5cclxuICAgIGV4cG9ydCBjbGFzcyBBc3NldFN0b3JlV2ViR0wge1xyXG5cclxuICAgICAgICAvLy8gQWxsIGFnZ3JlZ2F0ZWQgZmlndXJlcy5cclxuICAgICAgICBwcml2YXRlIGZpZ3VyZXM6IHsgW2luZGV4OiBzdHJpbmddOiBGaWd1cmVXZWJHTCB9ID0ge307XHJcblxyXG4gICAgICAgIC8vLyBBbGwgYWdncmVnYXRlZCBub2RlcyBhc3NldHMuXHJcbiAgICAgICAgcHJpdmF0ZSByb290Tm9kZUFzc2V0czogeyBbaW5kZXg6IHN0cmluZ106IE5vZGVBc3NldCB9ID0ge307XHJcblxyXG4gICAgICAgIC8vLyBBbGwgYWdncmVnYXRlZCBidWZmZXIgYXNzZXRzLlxyXG4gICAgICAgIHByaXZhdGUgYnVmZmVyQXNzZXRzOiB7IFtpbmRleDogc3RyaW5nXTogQnVmZmVyQXNzZXRXZWJHTCB9ID0ge307XHJcblxyXG4gICAgICAgIC8vLyBBbGwgYWdncmVnYXRlZCB0ZXh0dXJlIGFzc2V0cy5cclxuICAgICAgICBwcml2YXRlIHRleHR1cmVBc3NldHM6IHsgW2luZGV4OiBzdHJpbmddOiBUZXh0dXJlQXNzZXRXZWJHTCB9ID0ge307XHJcblxyXG5cclxuICAgICAgICAvLy8gQWRkcyB0aGUgc3BlY2lmaWVkIGZpZ3VyZSB0byB0aGUgdGhlIHN0b3JlLlxyXG4gICAgICAgIHB1YmxpYyBhZGRGaWd1cmUoZmlndXJlOiBGaWd1cmVXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpZ3VyZXNbZmlndXJlLkZpZ3VyZUlEXSA9IGZpZ3VyZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyBEZXRlcm1pbmVzIHRoZSBmaWd1cmUgd2l0aCB0aGUgdGhlIHNwZWNpZmllZCBpZC5cclxuICAgICAgICBwdWJsaWMgZ2V0RmlndXJlKGZpZ3VyZUlEOiBzdHJpbmcpOiBGaWd1cmVXZWJHTCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZ3VyZXNbZmlndXJlSURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIEFkZHMgYSBidWZmZXIgYXNzZXQgdG8gdGhlIHN0b3JlLlxyXG4gICAgICAgIHB1YmxpYyBhZGRCdWZmZXJBc3NldChidWZmZXJBc3NldElEOiBzdHJpbmcsIGJ1ZmZlckFzc2V0OiBCdWZmZXJBc3NldFdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyQXNzZXRzW2J1ZmZlckFzc2V0SURdID0gYnVmZmVyQXNzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkUm9vdE5vZGUobm9kZTogTm9kZUFzc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdE5vZGVBc3NldHNbbm9kZS5OYW1lXSA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gRGV0ZXJtaW5lcyB0aGUgYnVmZmVyIGFzc2V0IHdpdGggdGhlIHNwZWNpZmllZCBpZC5cclxuICAgICAgICBwdWJsaWMgZ2V0QnVmZmVyQXNzZXQoYnVmZmVyQXNzZXRJRDogc3RyaW5nKTogQnVmZmVyQXNzZXRXZWJHTCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlckFzc2V0c1tidWZmZXJBc3NldElEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyBBZGRzIGEgdGV4dHVyZSBhc3NldCB0byB0aGUgc3RvcmUuXHJcbiAgICAgICAgcHVibGljIGFkZFRleHR1cmVBc3NldCh0ZXh0dXJlQXNzZXRJRDogc3RyaW5nLCB0ZXh0dXJlQXNzZXQ6IFRleHR1cmVBc3NldFdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZUFzc2V0c1t0ZXh0dXJlQXNzZXRJRF0gPSB0ZXh0dXJlQXNzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gRGV0ZXJtaW5lcyB0aGUgdGV4dHVyZSBhc3NldCB3aXRoIHRoZSBzcGVjaWZpZWQgaWQuXHJcbiAgICAgICAgcHVibGljIGdldFRleHR1cmVBc3NldCh0ZXh0dXJlQXNzZXRJRDogc3RyaW5nKTogVGV4dHVyZUFzc2V0V2ViR0wge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlQXNzZXRzW3RleHR1cmVBc3NldElEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyBSZXR1cm5zIHRoZSBtYXAgb2YgYWdncmVnYXRlZCBmaWd1cmVzLlxyXG4gICAgICAgIHB1YmxpYyBnZXQgRmlndXJlcygpOiB7IFtpbmRleDogc3RyaW5nXTogRmlndXJlV2ViR0wgfSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZ3VyZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Um9vdE5vZGUobmFtZTogc3RyaW5nKTogTm9kZUFzc2V0IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdE5vZGVBc3NldHNbbmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIFNjZW5lSXRlbUZpbHRlcldlYkdMIHtcclxuICAgICAgICBwYXNzZXMoc2NlbmVJdGVtOiBTY2VuZUl0ZW1XZWJHTCwgY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR2VuZXJpY1NjZW5lSXRlbUZpbHRlcldlYkdMIGltcGxlbWVudHMgU2NlbmVJdGVtRmlsdGVyV2ViR0wge1xyXG4gICAgICAgIHBhc3NlcyhzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMLCBjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuUGhhc2UgIT0gJ1NoYWRvdyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2NlbmVJdGVtV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc2NlbmU6IFNjZW5lV2ViR0w7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBwYXJlbnQ6IFNjZW5lSXRlbVdlYkdMO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc2NlbmVJdGVtSUQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNoaWxkcmVuOiBBcnJheTxTY2VuZUl0ZW1XZWJHTD4gPSBbXVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRyZW5CeUtleTogeyBbc2NlbmVJdGVtSUQ6IHN0cmluZ106IFNjZW5lSXRlbVdlYkdMIH0gPSB7fVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRyZW5WaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdGVzdEludGVyc2VjdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHRlc3RDaGlsZHJlbkludGVyc2VjdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGZpbHRlcjogU2NlbmVJdGVtRmlsdGVyV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGF0YTogeyBbaW5kZXg6IHN0cmluZ106IGFueSB9ID0ge307XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgRGF0YSgpOiB7IFtpbmRleDogc3RyaW5nXTogYW55IH0ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBTY2VuZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lSXRlbUlEKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2VuZUl0ZW1JRDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2hpbGRyZW4oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBUZXN0Q2hpbGRyZW5JbnRlcnNlY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlc3RDaGlsZHJlbkludGVyc2VjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgVGVzdENoaWxkcmVuSW50ZXJzZWN0aW9uKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RDaGlsZHJlbkludGVyc2VjdGlvbiA9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGVzdEludGVyc2VjdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVzdEludGVyc2VjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgVGVzdEludGVyc2VjdGlvbih2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy50ZXN0SW50ZXJzZWN0aW9uID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBGaWx0ZXIoKSB7IHJldHVybiB0aGlzLmZpbHRlcjsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IEZpbHRlcih2YWx1ZTogU2NlbmVJdGVtRmlsdGVyV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZVdlYkdMLCBzY2VuZUl0ZW1JRDogc3RyaW5nLCBpc1Zpc2libGU/OiBib29sZWFuLCB0ZXN0SW50ZXJzZWN0aW9uPzogYm9vbGVhbiwgY2hpbGRyZW5WaXNpYmxlPzogYm9vbGVhbiwgdGVzdENoaWxkcmVuSW50ZXJzZWN0aW9uPzogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVJdGVtSUQgPSBzY2VuZUl0ZW1JRDtcclxuICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBpc1Zpc2libGUgfHwgdHlwZW9mIGlzVmlzaWJsZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5WaXNpYmxlID0gY2hpbGRyZW5WaXNpYmxlIHx8IHR5cGVvZiBjaGlsZHJlblZpc2libGUgPT09ICd1bmRlZmluZWQnO1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RJbnRlcnNlY3Rpb24gPSB0ZXN0SW50ZXJzZWN0aW9uIHx8IHR5cGVvZiB0ZXN0SW50ZXJzZWN0aW9uID09PSAndW5kZWZpbmVkJztcclxuICAgICAgICAgICAgdGhpcy50ZXN0Q2hpbGRyZW5JbnRlcnNlY3Rpb24gPSB0ZXN0Q2hpbGRyZW5JbnRlcnNlY3Rpb24gfHwgdHlwZW9mIHRlc3RDaGlsZHJlbkludGVyc2VjdGlvbiA9PT0gJ3VuZGVmaW5lZCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkQ2hpbGQoc2NlbmVJdGVtOiBTY2VuZUl0ZW1XZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuQnlLZXlbc2NlbmVJdGVtLnNjZW5lSXRlbUlEXSA9IHNjZW5lSXRlbTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKHNjZW5lSXRlbSk7XHJcbiAgICAgICAgICAgIHNjZW5lSXRlbS5hZGRlZFRvU2NlbmVHcmFwaCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZChzY2VuZUl0ZW1JRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuQnlLZXlbc2NlbmVJdGVtSURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKHNjZW5lSXRlbUlEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4uZmlsdGVyKHNjZW5lSXRlbSA9PiBzY2VuZUl0ZW0uc2NlbmVJdGVtSUQgIT0gc2NlbmVJdGVtSUQpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jaGlsZHJlbkJ5S2V5W3NjZW5lSXRlbUlEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnNlcnRDaGlsZChzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5CeUtleVtzY2VuZUl0ZW0uc2NlbmVJdGVtSURdID0gc2NlbmVJdGVtO1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgc2NlbmVJdGVtKTtcclxuICAgICAgICAgICAgc2NlbmVJdGVtLmFkZGVkVG9TY2VuZUdyYXBoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJlZ2luUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGVuZFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZW5kZXIoY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maWx0ZXIgfHwgdGhpcy5maWx0ZXIucGFzc2VzKHRoaXMsIGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luUmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ2hpbGRyZW4oY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSZW5kZXIoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ2hpbGRyZW4oY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCByZW5kZXJDaGlsZHJlbihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5WaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRlZFRvU2NlbmVHcmFwaChwYXJlbnRTY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUgPSBwYXJlbnRTY2VuZUl0ZW0uc2NlbmU7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50U2NlbmVJdGVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludGVyc2VjdHNCb3VuZGluZ0JveChyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBhdDogcHNnZW9tZXRyeS5WZWMzKTogQm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNJbnRlcnNlY3Rpb25DYW5kaWRhdGUocmF5OiBwc2dlb21ldHJ5LkxpbmUzRCwgYXQ6IHBzZ2VvbWV0cnkuVmVjMyk6IEJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3RzQm91bmRpbmdCb3gocmF5LCBhdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkSW50ZXJzZWN0aW9uQ2FuZGlkYXRlcyhyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBjYW5kaWRhdGVzOiBBcnJheTxJbnRlcnNlY3Rpb25DYW5kaWRhdGU+KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RJbnRlcnNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdCA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW50ZXJzZWN0aW9uQ2FuZGlkYXRlKHJheSwgYXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlcy5wdXNoKG5ldyBJbnRlcnNlY3Rpb25DYW5kaWRhdGUodGhpcywgYXQuc3F1YXJlZERpc3QocmF5LnAwLmFzVmVjMygpKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RDaGlsZHJlbkludGVyc2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5hZGRJbnRlcnNlY3Rpb25DYW5kaWRhdGVzKHJheSwgY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFjdG9yV2ViR0wgZXh0ZW5kcyBTY2VuZUl0ZW1XZWJHTCB7XHJcbiAgICAgICAgcHJpdmF0ZSBmaWd1cmVzOiBGaWd1cmVXZWJHTFtdID0gW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgbGFzdE1vZGVsVHJhbnNmb3JtOiBwc2dlb21ldHJ5Lk1hdHJpeDQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW52ZXJzZU1vZGVsVHJhbnNmb3JtOiBwc2dlb21ldHJ5Lk1hdHJpeDQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGU6IFJlbmRlclN0YXRlID0gbmV3IFJlbmRlclN0YXRlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBGaWd1cmVzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWd1cmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lV2ViR0wsIGFjdG9ySUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihzY2VuZSwgYWN0b3JJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkRmlndXJlKGZpZ3VyZTogRmlndXJlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5maWd1cmVzLnB1c2goZmlndXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiZWdpblJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy5maWd1cmVzLmZvckVhY2goKGZpZ3VyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlndXJlLnJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludGVyc2VjdHNCb3VuZGluZ0JveChyYXk6IHBzZ2VvbWV0cnkuTGluZTNELCBhdDogcHNnZW9tZXRyeS5WZWMzKTogQm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZFJheSA9IHRoaXMuaW52ZXJzZU1vZGVsVHJhbnNmb3JtID8gcmF5LnRyYW5zZm9ybSh0aGlzLmludmVyc2VNb2RlbFRyYW5zZm9ybSkgOiByYXk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZ3VyZUlkeCBpbiB0aGlzLmZpZ3VyZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5maWd1cmVzW2ZpZ3VyZUlkeF0uaW50ZXJzZWN0c0JvdW5kaW5nQm94KHRyYW5zZm9ybWVkUmF5LCBhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdC5hc3NpZ25WZWMoPHBzZ2VvbWV0cnkuVmVjND50aGlzLmxhc3RNb2RlbFRyYW5zZm9ybS5tdWx0aXBseShhdC5hc1ZlYzQoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpbHRlciB8fCB0aGlzLmZpbHRlci5wYXNzZXModGhpcywgY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSB8fCB0aGlzLmNoaWxkcmVuVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQucHVzaFN0YXRlKHRoaXMuc3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpblJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSZW5kZXIoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb2RlbFRyYW5zZm9ybSA9IGNvbnRleHQuTm9kZVRyYW5zZm9ybSA/IDxwc2dlb21ldHJ5Lk1hdHJpeDQ+Y29udGV4dC5Ob2RlVHJhbnNmb3JtLm11bHRpcGx5KGNvbnRleHQuTW9kZWxUcmFuc2Zvcm0pIDogY29udGV4dC5Nb2RlbFRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vZGVsVHJhbnNmb3JtLmVxdWFscyh0aGlzLmxhc3RNb2RlbFRyYW5zZm9ybSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZlcnNlTW9kZWxUcmFuc2Zvcm0gPSBtb2RlbFRyYW5zZm9ybS5pbnZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE1vZGVsVHJhbnNmb3JtID0gbW9kZWxUcmFuc2Zvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnBvcFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbnRlcnNlY3Rpb25DYW5kaWRhdGUge1xyXG4gICAgICAgIHB1YmxpYyBzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNxdWFyZWREaXN0OiBudW1iZXIgPSBJbmZpbml0eTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc2NlbmVJdGVtOiBTY2VuZUl0ZW1XZWJHTCwgc3F1YXJlZERpc3Q6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lSXRlbSA9IHNjZW5lSXRlbTtcclxuICAgICAgICAgICAgdGhpcy5zcXVhcmVkRGlzdCA9IHNxdWFyZWREaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbXBhcmUoaW50ZXJzZWN0aW9uQ2FuZGlkYXRlOiBJbnRlcnNlY3Rpb25DYW5kaWRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3F1YXJlZERpc3QgPCBpbnRlcnNlY3Rpb25DYW5kaWRhdGUuc3F1YXJlZERpc3QgPyAtMSA6XHJcbiAgICAgICAgICAgICAgICAodGhpcy5zcXVhcmVkRGlzdCA+IGludGVyc2VjdGlvbkNhbmRpZGF0ZS5zcXVhcmVkRGlzdCA/IDEgOiAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFJlbmRlclN0YXRlIHtcclxuICAgICAgICBwcml2YXRlIHBhcmVudDogUmVuZGVyU3RhdGU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZW50cmllczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFBhcmVudCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBQYXJlbnQodmFsOiBSZW5kZXJTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZXZhbHVhdGUoZW50cnk6IGFueSk6IGFueSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZW50cnkgPT0gJ2Z1bmN0aW9uJyA/IGVudHJ5KHRoaXMpIDogZW50cnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29udGFpbnMoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllc1trZXldICE9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQ8VD4oa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogVCk6IFQge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRyeUdldChrZXksICh2YWwpID0+IHsgcmVzdWx0ID0gdmFsOyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB0cnlHZXQoa2V5OiBzdHJpbmcsIGxhbWJkYTogKHZhbDogYW55KSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5zKGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGxhbWJkYSh0aGlzLmV2YWx1YXRlKHRoaXMuZW50cmllc1trZXldKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnBhcmVudC50cnlHZXQoa2V5LCBsYW1iZGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW50cmllc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTY2VuZVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2NlbmVIaWVyYXJjaHk6IFNjZW5lSXRlbVdlYkdMID0gbmV3IFNjZW5lSXRlbVdlYkdMKHRoaXMsICcnKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGUgPSBuZXcgUmVuZGVyU3RhdGUoKTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBTY2VuZUhpZXJhcmNoeSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVIaWVyYXJjaHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IElzSW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzSW5pdGlhbGl6ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IElzSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFN0YXRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldERpcnR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpc0RpcnR5KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZW5kZXIoY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlNjZW5lQ2F0ZWdvcnkgPSB0aGlzLmdldFNjZW5lQ2F0ZWdvcnkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGVSdW5uaW5nU2VxdWVuY2VzKGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQucHVzaFN0YXRlKHRoaXMuc3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVIaWVyYXJjaHkucmVuZGVyKGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQucG9wU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFNjZW5lSXRlbShzY2VuZUl0ZW06IFNjZW5lSXRlbVdlYkdMLCBtYWtlVmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lSGllcmFyY2h5LmFkZENoaWxkKHNjZW5lSXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRTY2VuZUl0ZW0oc2NlbmVJdGVtSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2VuZUhpZXJhcmNoeS5nZXRDaGlsZChzY2VuZUl0ZW1JRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlU2NlbmVJdGVtKHNjZW5lSXRlbUlEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUhpZXJhcmNoeS5yZW1vdmVDaGlsZChzY2VuZUl0ZW1JRCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW5zZXJ0U2NlbmVJdGVtKHNjZW5lSXRlbTogU2NlbmVJdGVtV2ViR0wsIGluZGV4OiBudW1iZXIsIG1ha2VWaXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVIaWVyYXJjaHkuaW5zZXJ0Q2hpbGQoc2NlbmVJdGVtLCBpbmRleCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0U2NlbmVDYXRlZ29yeSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEludGVyc2VjdGlvbkNhbmRpZGF0ZXMocmF5OiBwc2dlb21ldHJ5LkxpbmUzRCwgY2FuZGlkYXRlczogQXJyYXk8SW50ZXJzZWN0aW9uQ2FuZGlkYXRlPikge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lSGllcmFyY2h5LmFkZEludGVyc2VjdGlvbkNhbmRpZGF0ZXMocmF5LCBjYW5kaWRhdGVzKTtcclxuICAgICAgICAgICAgY2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhLmNvbXBhcmUoYik7IH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYmVnaW5GcmFtZSgpIHt9XHJcblxyXG4gICAgICAgIC8qKiBVcGRhdGUgaXMgY2FsbGVkIHBlcmlvZGljYWxseSAob25jZSBwZXIgZnJhbWUpIHRvIGFsbG93IHVwZGF0aW5nIHRoZSBzdGF0ZSBvZiB0aGUgc2NlbmUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKSB7fVxyXG5cclxuICAgICAgICBwdWJsaWMgZW5kRnJhbWUoKSB7fVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuICAgICAgICBwcm90ZWN0ZWQgcHJvamVjdGlvbk1hdHJpeDogcHNnZW9tZXRyeS5NYXRyaXg0O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaW52ZXJzZVByb2plY3Rpb25NYXRyaXg6IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpZXdNYXRyaXg6IHBzZ2VvbWV0cnkuTWF0cml4NDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGludmVyc2VWaWV3TWF0cml4OiBwc2dlb21ldHJ5Lk1hdHJpeDQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGlydHkgPSB0cnVlO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFByb2plY3Rpb25NYXRyaXgoKSB7IHJldHVybiB0aGlzLnByb2plY3Rpb25NYXRyaXg7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBWaWV3TWF0cml4KCkgeyByZXR1cm4gdGhpcy52aWV3TWF0cml4OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzZXREaXJ0eSgpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaXNEaXJ0eSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlVmlld01hdHJpeChleWU6IHBzZ2VvbWV0cnkuVmVjMywgY2VudGVyOiBwc2dlb21ldHJ5LlZlYzMsIHVwOiBwc2dlb21ldHJ5LlZlYzMpOiBwc2dlb21ldHJ5Lk1hdHJpeDQge1xyXG4gICAgICAgICAgICBsZXQgeiA9IGV5ZS5zdWIoY2VudGVyKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgbGV0IHggPSB1cC5jcm9zcyh6KS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgbGV0IHkgPSB6LmNyb3NzKHgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG0gPSBuZXcgcHNnZW9tZXRyeS5NYXRyaXg0KFt4LngsIHgueSwgeC56LCAwLFxyXG4gICAgICAgICAgICB5LngsIHkueSwgeS56LCAwLFxyXG4gICAgICAgICAgICB6LngsIHoueSwgei56LCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgMCwgMV0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHQgPSBuZXcgcHNnZW9tZXRyeS5NYXRyaXg0KFsxLCAwLCAwLCAtZXllLngsXHJcbiAgICAgICAgICAgICAgICAwLCAxLCAwLCAtZXllLnksXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAxLCAtZXllLnosXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAwLCAxXSk7XHJcbiAgICAgICAgICAgIHJldHVybiA8cHNnZW9tZXRyeS5NYXRyaXg0PnQubXVsdGlwbHkobSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlUGVyc3BlY3RpdmVNYXRyaXgoZm92eSwgYXNwZWN0LCB6bmVhciwgemZhcik6IHBzZ2VvbWV0cnkuTWF0cml4NCB7XHJcbiAgICAgICAgICAgIGxldCB5bWF4ID0gem5lYXIgKiBNYXRoLnRhbihmb3Z5ICogTWF0aC5QSSAvIDM2MC4wKTtcclxuICAgICAgICAgICAgbGV0IHltaW4gPSAteW1heDtcclxuICAgICAgICAgICAgbGV0IHhtaW4gPSB5bWluICogYXNwZWN0O1xyXG4gICAgICAgICAgICBsZXQgeG1heCA9IHltYXggKiBhc3BlY3Q7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYWtlRnJ1c3R1bSh4bWluLCB4bWF4LCB5bWluLCB5bWF4LCB6bmVhciwgemZhcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlT3J0aG9ncmFwaGljTWF0cml4KGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKTogcHNnZW9tZXRyeS5NYXRyaXg0IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBwc2dlb21ldHJ5Lk1hdHJpeDQoW1xyXG4gICAgICAgICAgICAgICAgMiAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMiAvICh0b3AgLSBib3R0b20pLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgMiAvIChuZWFyIC0gZmFyKSwgMCxcclxuXHJcbiAgICAgICAgICAgICAgICAobGVmdCArIHJpZ2h0KSAvIChsZWZ0IC0gcmlnaHQpLFxyXG4gICAgICAgICAgICAgICAgKGJvdHRvbSArIHRvcCkgLyAoYm90dG9tIC0gdG9wKSxcclxuICAgICAgICAgICAgICAgIChuZWFyICsgZmFyKSAvIChuZWFyIC0gZmFyKSxcclxuICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG1ha2VGcnVzdHVtKGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgem5lYXIsIHpmYXIpOiBwc2dlb21ldHJ5Lk1hdHJpeDQge1xyXG4gICAgICAgICAgICBsZXQgWDogbnVtYmVyID0gMiAqIHpuZWFyIC8gKHJpZ2h0IC0gbGVmdCk7XHJcbiAgICAgICAgICAgIGxldCBZOiBudW1iZXIgPSAyICogem5lYXIgLyAodG9wIC0gYm90dG9tKTtcclxuICAgICAgICAgICAgbGV0IEE6IG51bWJlciA9IChyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCk7XHJcbiAgICAgICAgICAgIGxldCBCOiBudW1iZXIgPSAodG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pO1xyXG4gICAgICAgICAgICBsZXQgQzogbnVtYmVyID0gLSh6ZmFyICsgem5lYXIpIC8gKHpmYXIgLSB6bmVhcik7XHJcbiAgICAgICAgICAgIGxldCBEOiBudW1iZXIgPSAtMiAqIHpmYXIgKiB6bmVhciAvICh6ZmFyIC0gem5lYXIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBwc2dlb21ldHJ5Lk1hdHJpeDQoW1xyXG4gICAgICAgICAgICAgICAgWCwgMCwgQSwgMCxcclxuICAgICAgICAgICAgICAgIDAsIFksIEIsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCBDLCBELFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgLTEsIDBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFkb3dDYW1lcmFXZWJHTCBleHRlbmRzIENhbWVyYSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZG93TWFwV2lkdGggPSAxMDI0O1xyXG5cclxuICAgICAgICBwcml2YXRlIHNoYWRvd01hcEhlaWdodCA9IDEwMjQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZG93RnJhbWVidWZmZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZG93RGVwdGhUZXh0dXJlOyBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJCdWZmZXI7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgcmVzaXplKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSB0aGlzLmNyZWF0ZU9ydGhvZ3JhcGhpY01hdHJpeCgtNSwgNSwgLTUsIDUsIC0zMCwgMzApO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShuZXcgcHNnZW9tZXRyeS5WZWMzKDAsIDEwLCAwKSwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLCAwLCAwKSwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLCAwLCAtMSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaGFkb3dGcmFtZWJ1ZmZlciA9IHN0YWdlLmdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93RGVwdGhUZXh0dXJlID0gc3RhZ2UuZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckJ1ZmZlciA9IHN0YWdlLmdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNoYWRvd1RleHR1cmUgPSBuZXcgVGV4dHVyZUFzc2V0V2ViR0woc3RhZ2UsIHRoaXMuc2hhZG93RGVwdGhUZXh0dXJlKTtcclxuICAgICAgICAgICAgc3RhZ2UuQXNzZXRTdG9yZS5hZGRUZXh0dXJlQXNzZXQoJ1NoYWRvdycsIHNoYWRvd1RleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEZyYW1lYnVmZmVyKHN0YWdlLmdsLkZSQU1FQlVGRkVSLCB0aGlzLnNoYWRvd0ZyYW1lYnVmZmVyKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgdGhpcy5zaGFkb3dEZXB0aFRleHR1cmUpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC50ZXhQYXJhbWV0ZXJpKHN0YWdlLmdsLlRFWFRVUkVfMkQsIHN0YWdlLmdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgc3RhZ2UuZ2wuTElORUFSKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wudGV4UGFyYW1ldGVyaShzdGFnZS5nbC5URVhUVVJFXzJELCBzdGFnZS5nbC5URVhUVVJFX01JTl9GSUxURVIsIHN0YWdlLmdsLkxJTkVBUik7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLnRleEltYWdlMkQoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgMCwgc3RhZ2UuZ2wuUkdCQSwgdGhpcy5zaGFkb3dNYXBXaWR0aCwgdGhpcy5zaGFkb3dNYXBIZWlnaHQsIDAsIHN0YWdlLmdsLlJHQkEsIHN0YWdlLmdsLlVOU0lHTkVEX0JZVEUsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFJlbmRlcmJ1ZmZlcihzdGFnZS5nbC5SRU5ERVJCVUZGRVIsIHRoaXMucmVuZGVyQnVmZmVyKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wucmVuZGVyYnVmZmVyU3RvcmFnZShzdGFnZS5nbC5SRU5ERVJCVUZGRVIsIHN0YWdlLmdsLkRFUFRIX0NPTVBPTkVOVDE2LCB0aGlzLnNoYWRvd01hcFdpZHRoLCB0aGlzLnNoYWRvd01hcEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChzdGFnZS5nbC5GUkFNRUJVRkZFUiwgc3RhZ2UuZ2wuQ09MT1JfQVRUQUNITUVOVDAsIHN0YWdlLmdsLlRFWFRVUkVfMkQsIHRoaXMuc2hhZG93RGVwdGhUZXh0dXJlLCAwKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoc3RhZ2UuZ2wuRlJBTUVCVUZGRVIsIHN0YWdlLmdsLkRFUFRIX0FUVEFDSE1FTlQsIHN0YWdlLmdsLlJFTkRFUkJVRkZFUiwgdGhpcy5yZW5kZXJCdWZmZXIpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZFRleHR1cmUoc3RhZ2UuZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRSZW5kZXJidWZmZXIoc3RhZ2UuZ2wuUkVOREVSQlVGRkVSLCBudWxsKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlU2hhZG93QXJlYShiYm94OiBwc2dlb21ldHJ5LkFBQkIyRCkge1xyXG4gICAgICAgICAgICB2YXIgY2VudGVyID0gYmJveC5jZW50ZXIoKTtcclxuICAgICAgICAgICAgdmFyIGV4dGVudHMgPSBiYm94LmV4dGVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gdGhpcy5jcmVhdGVPcnRob2dyYXBoaWNNYXRyaXgoLWV4dGVudHMueCAvIDIsIGV4dGVudHMueCAvIDIsIC1leHRlbnRzLnkgLyAyLCBleHRlbnRzLnkgLyAyLCAtMzAsIDMwKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUobmV3IHBzZ2VvbWV0cnkuVmVjMyhjZW50ZXIueCwgMTAsIGNlbnRlci55KSwgbmV3IHBzZ2VvbWV0cnkuVmVjMyhjZW50ZXIueCwgMCwgY2VudGVyLnkpLCBuZXcgcHNnZW9tZXRyeS5WZWMzKDAsIDAsIC0xKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGUocG9zOiBwc2dlb21ldHJ5LlZlYzMsIGxvb2tBdDogcHNnZW9tZXRyeS5WZWMzLCB1cDogcHNnZW9tZXRyeS5WZWMzKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld01hdHJpeCA9IHRoaXMuY3JlYXRlVmlld01hdHJpeChwb3MsIGxvb2tBdCwgdXApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXREaXJ0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJlZ2luUmVuZGVyKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmJpbmRGcmFtZWJ1ZmZlcihzdGFnZS5nbC5GUkFNRUJVRkZFUiwgdGhpcy5zaGFkb3dGcmFtZWJ1ZmZlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIHZpZXdwb3J0IHRvIG1hdGNoXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuc2hhZG93TWFwV2lkdGgsIHRoaXMuc2hhZG93TWFwSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmNsZWFyQ29sb3IoMC4yLCAwLjIsIDAuMiwgMC4wKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY2xlYXJEZXB0aCgwLjApO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5jbGVhcihzdGFnZS5nbC5DT0xPUl9CVUZGRVJfQklUIHwgc3RhZ2UuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5lbmFibGUoc3RhZ2UuZ2wuREVQVEhfVEVTVCk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmVuYWJsZShzdGFnZS5nbC5DVUxMX0ZBQ0UpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5mcm9udEZhY2Uoc3RhZ2UuZ2wuQ0NXKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY3VsbEZhY2Uoc3RhZ2UuZ2wuQkFDSyk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmRlcHRoRnVuYyhzdGFnZS5nbC5HRVFVQUwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVuZFJlbmRlcihzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENhbWVyYVdlYkdMIGV4dGVuZHMgQ2FtZXJhIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50Q2FtZXJhUG9zOiBwc2dlb21ldHJ5LlZlYzM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xpZW50V2lkdGg6IG51bWJlciA9IDEuMDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjbGllbnRIZWlnaHQ6IG51bWJlciA9IDEuMDtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUHJvamVjdGlvbk1hdHJpeCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdGlvbk1hdHJpeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgVmlld01hdHJpeCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlld01hdHJpeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZXNpemUoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHJlYWxUb0NTU1BpeGVscyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFdpZHRoID0gc3RhZ2UuZ2wuY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudEhlaWdodCA9IHN0YWdlLmdsLmNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAvLyBMb29rdXAgdGhlIHNpemUgdGhlIGJyb3dzZXIgaXMgZGlzcGxheWluZyB0aGUgY2FudmFzIGluIENTUyBwaXhlbHNcclxuICAgICAgICAgICAgLy8gYW5kIGNvbXB1dGUgYSBzaXplIG5lZWRlZCB0byBtYWtlIG91ciBkcmF3aW5nYnVmZmVyIG1hdGNoIGl0IGluXHJcbiAgICAgICAgICAgIC8vIGRldmljZSBwaXhlbHMuXHJcbiAgICAgICAgICAgIGxldCBkaXNwbGF5V2lkdGggPSBNYXRoLmZsb29yKHN0YWdlLmdsLmNhbnZhcy5jbGllbnRXaWR0aCAqIHJlYWxUb0NTU1BpeGVscyk7XHJcbiAgICAgICAgICAgIGxldCBkaXNwbGF5SGVpZ2h0ID0gTWF0aC5mbG9vcihzdGFnZS5nbC5jYW52YXMuY2xpZW50SGVpZ2h0ICogcmVhbFRvQ1NTUGl4ZWxzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIGNhbnZhcyB0aGUgc2FtZSBzaXplXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmNhbnZhcy53aWR0aCA9IGRpc3BsYXlXaWR0aCAvIHJlYWxUb0NTU1BpeGVscztcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY2FudmFzLmhlaWdodCA9IGRpc3BsYXlIZWlnaHQgLyByZWFsVG9DU1NQaXhlbHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSB0aGlzLmNyZWF0ZVBlcnNwZWN0aXZlTWF0cml4KDQ1LjAsIHN0YWdlLmdsLmNhbnZhcy5jbGllbnRXaWR0aCAvIHN0YWdlLmdsLmNhbnZhcy5jbGllbnRIZWlnaHQsIDAuMSwgMjAwLjApO1xyXG4gICAgICAgICAgICAvL3RoaXMucHJvamVjdGlvbk1hdHJpeCA9IHRoaXMuY3JlYXRlT3J0aG9ncmFwaGljTWF0cml4KC01LCA1LCAtNSwgNSwgLTMwLCAzMCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW52ZXJzZVByb2plY3Rpb25NYXRyaXggPSB0aGlzLnByb2plY3Rpb25NYXRyaXguaW52ZXJzZSgpO1xyXG4gICAgICAgICAgICAvL3RoaXMudmlld01hdHJpeCA9IHRoaXMuY3JlYXRlVmlld01hdHJpeChuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMS44LCAxNS4wKSwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDAuMCwgMC4wKSwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDEuMCwgMC4wKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERpcnR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlKHBvczogcHNnZW9tZXRyeS5WZWMzLCBsb29rQXQ6IHBzZ2VvbWV0cnkuVmVjMywgdXA6IHBzZ2VvbWV0cnkuVmVjMykge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDYW1lcmFQb3MgPSBwb3M7XHJcbiAgICAgICAgICAgIHRoaXMudmlld01hdHJpeCA9IHRoaXMuY3JlYXRlVmlld01hdHJpeChwb3MsIGxvb2tBdCwgdXApO1xyXG4gICAgICAgICAgICB0aGlzLmludmVyc2VWaWV3TWF0cml4ID0gdGhpcy52aWV3TWF0cml4LmludmVyc2UoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBiZWdpblJlbmRlcihzdGFnZTogU3RhZ2VXZWJHTCkge1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHRoZSB2aWV3cG9ydCB0byBtYXRjaFxyXG4gICAgICAgICAgICBzdGFnZS5nbC52aWV3cG9ydCgwLCAwLCBzdGFnZS5nbC5jYW52YXMuY2xpZW50V2lkdGgsIHN0YWdlLmdsLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYmluZEZyYW1lYnVmZmVyKHN0YWdlLmdsLkZSQU1FQlVGRkVSLCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmNsZWFyQ29sb3IoMC4zLCAwLjMsIDAuMywgMS4wKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuY2xlYXJEZXB0aCgxLjApO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5jbGVhcihzdGFnZS5nbC5ERVBUSF9CVUZGRVJfQklUKTsgLy8gc3RhZ2UuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IFxyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuZW5hYmxlKHN0YWdlLmdsLkRFUFRIX1RFU1QpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5lbmFibGUoc3RhZ2UuZ2wuQ1VMTF9GQUNFKTtcclxuICAgICAgICAgICAgc3RhZ2UuZ2wuZnJvbnRGYWNlKHN0YWdlLmdsLkNDVyk7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmN1bGxGYWNlKHN0YWdlLmdsLkJBQ0spO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5kZXB0aEZ1bmMoc3RhZ2UuZ2wuTEVRVUFMKTsgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZW5kUmVuZGVyKHN0YWdlOiBTdGFnZVdlYkdMKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Vmlld1JheShjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcik6IHBzZ2VvbWV0cnkuTGluZTNEIHtcclxuICAgICAgICAgICAgbGV0IGN1cnNvciA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoY2xpZW50WCAvIHRoaXMuY2xpZW50V2lkdGggKiAyLjAgLSAxLjAsIDEuMCAtIGNsaWVudFkgLyB0aGlzLmNsaWVudEhlaWdodCAqIDIuMCwgLTEuMCwgMS4wKTtcclxuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IDxwc2dlb21ldHJ5LlZlYzQ+dGhpcy5pbnZlcnNlUHJvamVjdGlvbk1hdHJpeC5tdWx0aXBseShjdXJzb3IpO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24udyA9IDEuMDtcclxuICAgICAgICAgICAgbGV0IGZvcndhcmQgPSB0aGlzLmludmVyc2VWaWV3TWF0cml4Lm11bHRpcGx5KGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcHNnZW9tZXRyeS5MaW5lM0QodGhpcy5jdXJyZW50Q2FtZXJhUG9zLCBmb3J3YXJkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaXNJbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmVydGV4U2hhZGVyOiBXZWJHTFNoYWRlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGZyYWdtZW50U2hhZGVyOiBXZWJHTFNoYWRlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHByb2dyYW06IFdlYkdMUHJvZ3JhbTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBQcm9ncmFtKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0luaXRpYWxpemVkICYmIHRoaXMuYmVnaW5SZW5kZXIoY29udGV4dCwgc2hhZGVySW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0YWdlLmFwcGx5U3RhdGUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVybmFsUmVuZGVyKGNvbnRleHQsIHNoYWRlckluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kUmVuZGVyKGNvbnRleHQsIHNoYWRlckluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEF0dHJpYkxvY2F0aW9uKHN0YWdlOiBTdGFnZVdlYkdMLCBhdHRyaWJOYW1lOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhZ2UuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCBhdHRyaWJOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBiZWdpblJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0YWdlLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgU0laRV9PRl9GTE9BVCA9IDQ7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGVuZFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoc3RhZ2U6IFN0YWdlV2ViR0wpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSBzdGFnZS5Ub29scy5jcmVhdGVTaGFkZXIoc3RhZ2UuZ2wuVkVSVEVYX1NIQURFUiwgdGhpcy5nZXRWZXJ0ZXhTaGFkZXJTcmMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBzdGFnZS5Ub29scy5jcmVhdGVTaGFkZXIoc3RhZ2UuZ2wuRlJBR01FTlRfU0hBREVSLCB0aGlzLmdldEZyYWdtZW50U2hhZGVyU3JjKCkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wcm9ncmFtID0gc3RhZ2UuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG5cclxuICAgICAgICAgICAgc3RhZ2UuZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy52ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgICAgICAgICBzdGFnZS5nbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLmZyYWdtZW50U2hhZGVyKTtcclxuXHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmxpbmtQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XHJcblxyXG4gICAgICAgICAgICBzdGFnZS5nbC5kZXRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgICAgIHN0YWdlLmdsLmRldGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMuZnJhZ21lbnRTaGFkZXIpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3RhZ2UuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcm9ncmFtKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFZlcnRleFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RnJhZ21lbnRTaGFkZXJTcmMoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE9wYXF1ZU1lc2hTaGFkZXJQcm9ncmFtV2ViR0wgZXh0ZW5kcyBTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0U3RyaWRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TSVpFX09GX0ZMT0FUICogOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBsZXQgc3RhZ2UgPSBjb250ZXh0LlN0YWdlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1ZmZlcktleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnSW5kZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcktleSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZChzdGFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FQb3NpdGlvbicpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCAwKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FOb3JtYWwnKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgMyAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhQ29sb3InKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgNiAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZHJhdyB0cmlhbmdsZXNcclxuICAgICAgICAgICAgICAgIGxldCB0cmlhbmdsZUNvdW50ID0gYnVmZmVyQXNzZXQuQnVmZmVyU2l6ZSAvIHRoaXMuZ2V0U3RyaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5kcmF3RWxlbWVudHMoc3RhZ2UuZ2wuVFJJQU5HTEVTLCB0cmlhbmdsZUNvdW50LCBzdGFnZS5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJpbmQgd2l0aCAwLCBzbywgc3dpdGNoIGJhY2sgdG8gbm9ybWFsIHBvaW50ZXIgb3BlcmF0aW9uXHJcbiAgICAgICAgICAgICAgICAvL3N0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIDApO1xyXG4gICAgICAgICAgICAgICAgLy9zdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VmVydGV4U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdW5pZm9ybSBtYXQ0IHVNTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVWTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVQTWF0cml4O1xyXG5cclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFOb3JtYWw7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhQ29sb3I7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyeWluZyBtZWRpdW1wIHZlYzQgdkNvbG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHVQTWF0cml4ICogdVZNYXRyaXggKiB1TU1hdHJpeCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBub3JtYWwgPSBhTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBkaWZmdXNlQ29sb3IgPSB2ZWM0KGFDb2xvciwgMS4wKTtcclxuICAgICAgICAgICAgICAgICAgIHZlYzQgYW1iaWVudENvbG9yID0gdmVjNCgxLjAsIDEuMCwgMS4wLCAxLjApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHZlYzMgbGlnaHREaXIgPSB2ZWMzKDAuOSwgMC43LCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgbWVkaXVtcCBmbG9hdCBsaWdodEludGVuc2l0eSA9IGNsYW1wKGRvdChub3JtYWxpemUobm9ybWFsKSwgbm9ybWFsaXplKGxpZ2h0RGlyKSksIDAuMCwgMS4wKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2Q29sb3IgPSB2ZWM0KChhQ29sb3IgKiAwLjY1ICsgYW1iaWVudENvbG9yLnJnYiAqIDAuMzUpKigwLjcgKyBsaWdodEludGVuc2l0eSAqIDAuMyksIDEuMCk7XHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRGcmFnbWVudFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYHZhcnlpbmcgbWVkaXVtcCB2ZWM0IHZDb2xvcjtcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdkNvbG9yO1xyXG4gICAgICAgICAgICAgICAgfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVHJhbnNwYXJlbnRNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMIGV4dGVuZHMgU2hhZGVyUHJvZ3JhbVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldFN0cmlkZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuU0laRV9PRl9GTE9BVCAqIDEwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGludGVybmFsUmVuZGVyKGNvbnRleHQ6IFJlbmRlckNvbnRleHRXZWJHTCwgc2hhZGVySW5zdGFuY2U6IFNoYWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFnZSA9IGNvbnRleHQuU3RhZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgYnVmZmVyS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdJbmRleEJ1ZmZlcicpO1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZmVyQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldEJ1ZmZlckFzc2V0KGJ1ZmZlcktleSk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kKHN0YWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXJLZXkgPSBzaGFkZXJJbnN0YW5jZS5nZXRSZWZlcmVuY2UoJ1ZlcnRleEJ1ZmZlcicpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldEJ1ZmZlckFzc2V0KGJ1ZmZlcktleSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYVBvc2l0aW9uJyksIDMsIHRoaXMuZ2V0U3RyaWRlKCksIDApO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYU5vcm1hbCcpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCAzICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FDb2xvcicpLCA0LCB0aGlzLmdldFN0cmlkZSgpLCA2ICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5lbmFibGUoc3RhZ2UuZ2wuQkxFTkQpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuYmxlbmRGdW5jKHN0YWdlLmdsLlNSQ19BTFBIQSwgc3RhZ2UuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5kZXB0aE1hc2soZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRyYXcgdHJpYW5nbGVzXHJcbiAgICAgICAgICAgICAgICBsZXQgdHJpYW5nbGVDb3VudCA9IGJ1ZmZlckFzc2V0LkJ1ZmZlclNpemUgLyB0aGlzLmdldFN0cmlkZSgpO1xyXG4gICAgICAgICAgICAgICAgc3RhZ2UuZ2wuZHJhd0VsZW1lbnRzKHN0YWdlLmdsLlRSSUFOR0xFUywgdHJpYW5nbGVDb3VudCwgc3RhZ2UuZ2wuVU5TSUdORURfSU5ULCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5kZXB0aE1hc2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzdGFnZS5nbC5kaXNhYmxlKHN0YWdlLmdsLkJMRU5EKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBiaW5kIHdpdGggMCwgc28sIHN3aXRjaCBiYWNrIHRvIG5vcm1hbCBwb2ludGVyIG9wZXJhdGlvblxyXG4gICAgICAgICAgICAgICAgLy9zdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCAwKTtcclxuICAgICAgICAgICAgICAgIC8vc3RhZ2UuZ2wuYmluZEJ1ZmZlcihzdGFnZS5nbC5BUlJBWV9CVUZGRVIsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGdldFZlcnRleFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYHVuaWZvcm0gbWF0NCB1TU1hdHJpeDtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm0gbWF0NCB1Vk1hdHJpeDtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm0gbWF0NCB1UE1hdHJpeDtcclxuXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzQgYUNvbG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWM0IHZDb2xvcjtcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSB1UE1hdHJpeCAqIHVWTWF0cml4ICogdU1NYXRyaXggKiB2ZWM0KGFQb3NpdGlvbiwgMS4wKTtcclxuICAgICAgICAgICAgICAgICAgIHZlYzMgbm9ybWFsID0gYU5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgIHZlYzQgZGlmZnVzZUNvbG9yID0gYUNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBhbWJpZW50Q29sb3IgPSB2ZWM0KDEuMCwgMS4wLCAxLjAsIDEuMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBsaWdodERpciA9IHZlYzMoMC45LCAwLjcsIDEuMCk7XHJcbiAgICAgICAgICAgICAgICAgICBtZWRpdW1wIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gY2xhbXAoZG90KG5vcm1hbGl6ZShub3JtYWwpLCBub3JtYWxpemUobGlnaHREaXIpKSwgMC4wLCAxLjApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHZDb2xvciA9IHZlYzQoKGFDb2xvci5yZ2IgKiAwLjY1ICsgYW1iaWVudENvbG9yLnJnYiAqIDAuMzUpKigwLjcgKyBsaWdodEludGVuc2l0eSAqIDAuMyksIGFDb2xvci5hKTtcclxuICAgICAgICAgICAgICAgIH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEZyYWdtZW50U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdmFyeWluZyBtZWRpdW1wIHZlYzQgdkNvbG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBlbnVtIFRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1WYXJpYW50cyB7XHJcbiAgICAgICAgRGlmZnVzZSxcclxuICAgICAgICBNYXRjYXBcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMIGV4dGVuZHMgU2hhZGVyUHJvZ3JhbVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFyaWFudDogVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzID0gVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzLkRpZmZ1c2UpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBnZXRTdHJpZGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlNJWkVfT0ZfRkxPQVQgKiAxMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcihjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wsIHNoYWRlckluc3RhbmNlOiBTaGFkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBsZXQgc3RhZ2UgPSBjb250ZXh0LlN0YWdlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1ZmZlcktleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnSW5kZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcktleSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZChzdGFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyS2V5ID0gc2hhZGVySW5zdGFuY2UuZ2V0UmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0ID0gc3RhZ2UuQXNzZXRTdG9yZS5nZXRCdWZmZXJBc3NldChidWZmZXJLZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FQb3NpdGlvbicpLCAzLCB0aGlzLmdldFN0cmlkZSgpLCAwKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmRJbnRlcmxlYXZlZChzdGFnZSwgdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihzdGFnZSwgJ2FOb3JtYWwnKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgMyAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhQ29sb3InKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgNiAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhVGV4dHVyZUNvb3JkcycpLCAyLCB0aGlzLmdldFN0cmlkZSgpLCA5ICogdGhpcy5TSVpFX09GX0ZMT0FUKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dHVyZUtleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnVGV4dHVyZUJ1ZmZlcicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHR1cmVBc3NldCA9IHN0YWdlLkFzc2V0U3RvcmUuZ2V0VGV4dHVyZUFzc2V0KHRleHR1cmVLZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHR1cmVBc3NldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmVBc3NldC5iaW5kKHN0YWdlLCB0aGlzLCAndVRleHR1cmUwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRyYXcgdHJpYW5nbGVzXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyaWFuZ2xlQ291bnQgPSBidWZmZXJBc3NldC5CdWZmZXJTaXplIC8gdGhpcy5nZXRTdHJpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFnZS5nbC5kcmF3RWxlbWVudHMoc3RhZ2UuZ2wuVFJJQU5HTEVTLCB0cmlhbmdsZUNvdW50LCBzdGFnZS5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJpbmQgd2l0aCAwLCBzbywgc3dpdGNoIGJhY2sgdG8gbm9ybWFsIHBvaW50ZXIgb3BlcmF0aW9uXHJcbiAgICAgICAgICAgICAgICAvL3N0YWdlLmdsLmJpbmRCdWZmZXIoc3RhZ2UuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIDApO1xyXG4gICAgICAgICAgICAgICAgLy9zdGFnZS5nbC5iaW5kQnVmZmVyKHN0YWdlLmdsLkFSUkFZX0JVRkZFUiwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRWZXJ0ZXhTaGFkZXJTcmMoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGB1bmlmb3JtIG1hdDQgdU1NYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVZNYXRyaXg7XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtIG1hdDQgdVBNYXRyaXg7XHJcblxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYVBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIHZlYzMgYU5vcm1hbDtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFDb2xvcjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWM0IHZDb2xvcjtcclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCB2ZWMyIHZUZXh0dXJlQ29vcmRzO1xyXG4gICAgICAgICAgICAgICAgdmFyeWluZyBtZWRpdW1wIGZsb2F0IHZMaWdodEludGVuc2l0eTtcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBwb3MgPSB1TU1hdHJpeCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSB1UE1hdHJpeCAqIHVWTWF0cml4ICogcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUodU1NYXRyaXggKiB2ZWM0KGFOb3JtYWwsIDAuMCkpLnh5ejtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2ZWMzIGxpZ2h0RGlyID0gdmVjMygwLjksIDAuNywgMS4wKTtcclxuICAgICAgICAgICAgICAgICAgIHZMaWdodEludGVuc2l0eSA9IGNsYW1wKGRvdChub3JtYWxpemUobm9ybWFsKSwgbm9ybWFsaXplKGxpZ2h0RGlyKSksIDAuMCwgMS4wKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2Q29sb3IgPSB2ZWM0KGFDb2xvciwgMS4wKTtcclxuYDtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52YXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1WYXJpYW50cy5EaWZmdXNlOiByZXN1bHQgKz1cclxuICAgICAgICAgICAgICAgICAgICBgdlRleHR1cmVDb29yZHMgPSBhVGV4dHVyZUNvb3JkcztcclxuYDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVZhcmlhbnRzLk1hdGNhcDogcmVzdWx0ICs9XHJcbiAgICAgICAgICAgICAgICAgICAgYHZlYzMgZSA9IG5vcm1hbGl6ZShwb3MueHl6KTtcclxuXHQgICAgICAgICAgICAgICAgIHZlYzMgciA9IHJlZmxlY3QoZSwgKHVWTWF0cml4ICogdmVjNChub3JtYWwsIDAuMCkpLnh5eik7XHJcblx0ICAgICAgICAgICAgICAgICBtZWRpdW1wIGZsb2F0IG0gPSAyLiAqIGxlbmd0aCh2ZWMzKHIueCwgci55LCByLnogKyAxLikpO1xyXG5cdCAgICAgICAgICAgICAgICAgdlRleHR1cmVDb29yZHMgPSByLnh5IC8gbSArIC41O1xyXG5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXN1bHQgKz0gYH1gO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRGcmFnbWVudFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlMDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjNCB2Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjMiB2VGV4dHVyZUNvb3JkcztcclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCBmbG9hdCB2TGlnaHRJbnRlbnNpdHk7XHJcblxyXG4gICAgICAgICAgICAgICAgdm9pZCBtYWluKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgXHQgICAgbWVkaXVtcCB2ZWM0IHRleENvbG9yID0gdGV4dHVyZTJEKHVUZXh0dXJlMCwgdmVjMih2VGV4dHVyZUNvb3Jkcy54LCAxLjAgLSB2VGV4dHVyZUNvb3Jkcy55KSk7XHJcbmA7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy52YXJpYW50KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1WYXJpYW50cy5EaWZmdXNlOiByZXN1bHQgKz1cclxuICAgICAgICAgICAgICAgICAgICBgZ2xfRnJhZ0NvbG9yID0gdmVjNChjbGFtcCh0ZXhDb2xvci54eXogKiAoMS4wICsgLjE1ICogdkxpZ2h0SW50ZW5zaXR5KSwgMC4wLCAxLjApLCB0ZXhDb2xvci5hKTsgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1WYXJpYW50cy5NYXRjYXA6IHJlc3VsdCArPSBcclxuICAgICAgICAgICAgICAgICAgICBgZ2xfRnJhZ0NvbG9yID0gdGV4Q29sb3IuYTsgICBcclxuYDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0ICs9IGB9YDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaGFkb3dUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtV2ViR0wgZXh0ZW5kcyBUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VmVydGV4U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBgdW5pZm9ybSBtYXQ0IHVNTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVWTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVQTWF0cml4O1xyXG5cclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFOb3JtYWw7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkcztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgZmxvYXQgaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHVQTWF0cml4ICogdVZNYXRyaXggKiB1TU1hdHJpeCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gKHVNTWF0cml4ICogdmVjNChhUG9zaXRpb24sIDEuMCkpLnk7XHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRGcmFnbWVudFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gYHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlMDtcclxuICAgICAgICAgICAgICAgIHZhcnlpbmcgbWVkaXVtcCBmbG9hdCBoZWlnaHQ7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZvaWQgbWFpbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCguMiwgLjIsIC4yLCBjbGFtcCgxLjAgLSAoaGVpZ2h0IC8gMy4wKSwgMC4wLCAxLjApKTsgXHJcbiAgICAgICAgICAgICAgICB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRDYXBTaGFkZXJQcm9ncmFtV2ViR0wgZXh0ZW5kcyBTaGFkZXJQcm9ncmFtV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0U3RyaWRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TSVpFX09GX0ZMT0FUICogMTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaW50ZXJuYWxSZW5kZXIoY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMLCBzaGFkZXJJbnN0YW5jZTogU2hhZGVySW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgbGV0IHN0YWdlID0gY29udGV4dC5TdGFnZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBidWZmZXJLZXkgPSBzaGFkZXJJbnN0YW5jZS5nZXRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJyk7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJLZXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmZXJBc3NldCA9IHN0YWdlLkFzc2V0U3RvcmUuZ2V0QnVmZmVyQXNzZXQoYnVmZmVyS2V5KTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckFzc2V0LmJpbmQoc3RhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1ZmZlcktleSA9IHNoYWRlckluc3RhbmNlLmdldFJlZmVyZW5jZSgnVmVydGV4QnVmZmVyJyk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldCA9IHN0YWdlLkFzc2V0U3RvcmUuZ2V0QnVmZmVyQXNzZXQoYnVmZmVyS2V5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhUG9zaXRpb24nKSwgMywgdGhpcy5nZXRTdHJpZGUoKSwgMCk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBc3NldC5iaW5kSW50ZXJsZWF2ZWQoc3RhZ2UsIHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oc3RhZ2UsICdhTm9ybWFsJyksIDMsIHRoaXMuZ2V0U3RyaWRlKCksIDMgKiB0aGlzLlNJWkVfT0ZfRkxPQVQpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYUNvbG9yJyksIDMsIHRoaXMuZ2V0U3RyaWRlKCksIDYgKiB0aGlzLlNJWkVfT0ZfRkxPQVQpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXNzZXQuYmluZEludGVybGVhdmVkKHN0YWdlLCB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHN0YWdlLCAnYVRleHR1cmVDb29yZHMnKSwgMiwgdGhpcy5nZXRTdHJpZGUoKSwgOSAqIHRoaXMuU0laRV9PRl9GTE9BVCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRleHR1cmVLZXkgPSBzaGFkZXJJbnN0YW5jZS5nZXRSZWZlcmVuY2UoJ1RleHR1cmVCdWZmZXInKTtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0dXJlQXNzZXQgPSBzdGFnZS5Bc3NldFN0b3JlLmdldFRleHR1cmVBc3NldCh0ZXh0dXJlS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlQXNzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlQXNzZXQuYmluZChzdGFnZSwgdGhpcywgJ3VUZXh0dXJlMCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBjb250ZXh0LlN0YXRlLmdldCgnQ29sb3InLCBwc2dlb21ldHJ5LlZlYzQuT25lKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdUNvbG9yTG9jID0gc3RhZ2UuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgJ3VDb2xvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLmdsLnVuaWZvcm00ZnYodUNvbG9yTG9jLCBjb2xvci5lbGVtZW50cygpKTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRyYXcgdHJpYW5nbGVzXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyaWFuZ2xlQ291bnQgPSBidWZmZXJBc3NldC5CdWZmZXJTaXplIC8gdGhpcy5nZXRTdHJpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFnZS5nbC5kcmF3RWxlbWVudHMoc3RhZ2UuZ2wuVFJJQU5HTEVTLCB0cmlhbmdsZUNvdW50LCBzdGFnZS5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0VmVydGV4U2hhZGVyU3JjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBgdW5pZm9ybSBtYXQ0IHVNTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVWTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybSBtYXQ0IHVQTWF0cml4O1xyXG5cclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMzIGFOb3JtYWw7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMyBhQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkcztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjNCB2Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjMiB2VGV4dHVyZUNvb3JkcztcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgdmVjNCBwb3MgPSB1TU1hdHJpeCAqIHZlYzQoYVBvc2l0aW9uLCAxLjApO1xyXG4gICAgICAgICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSB1UE1hdHJpeCAqIHVWTWF0cml4ICogcG9zO1xyXG4gICAgICAgICAgICAgICAgICAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUodU1NYXRyaXggKiB2ZWM0KGFOb3JtYWwsIDAuMCkpLnh5ejtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB2ZWMzIGUgPSBub3JtYWxpemUocG9zLnh5eik7XHJcblx0ICAgICAgICAgICAgICAgdmVjMyByID0gcmVmbGVjdChlLCAodVZNYXRyaXggKiB2ZWM0KG5vcm1hbCwgMC4wKSkueHl6KTtcclxuXHQgICAgICAgICAgICAgICBtZWRpdW1wIGZsb2F0IG0gPSAyLiAqIGxlbmd0aCh2ZWMzKHIueCwgci55LCByLnogKyAxLikpO1xyXG5cdCAgICAgICAgICAgICAgIHZUZXh0dXJlQ29vcmRzID0gci54eSAvIG0gKyAuNTtcclxuICAgICAgICAgICAgICAgIH1gO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRGcmFnbWVudFNoYWRlclNyYygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYHVuaWZvcm0gc2FtcGxlcjJEIHVUZXh0dXJlMDtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm0gbWVkaXVtcCB2ZWM0IHVDb2xvcjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjNCB2Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB2YXJ5aW5nIG1lZGl1bXAgdmVjMiB2VGV4dHVyZUNvb3JkcztcclxuXHJcbiAgICAgICAgICAgICAgICB2b2lkIG1haW4oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICBcdCAgICBtZWRpdW1wIHZlYzQgdGV4Q29sb3IgPSB0ZXh0dXJlMkQodVRleHR1cmUwLCB2ZWMyKHZUZXh0dXJlQ29vcmRzLngsIDEuMCAtIHZUZXh0dXJlQ29vcmRzLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL21lZGl1bXAgdmVjMyBncmVlbiA9IHZlYzMoMCwgMC40NCwgMC4wOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZWRpdW1wIHZlYzMgZ3JlZW4gPSB2ZWMzKDAuNjksIDAuMzQsIDAuMDApOyAgLy9vclxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVkaXVtcCB2ZWMzIGdyZWVuID0gdmVjMygwLjAyLCAwLjMxLCAwLjA2KTsgIC8vIGdcclxuICAgICAgICAgICAgICAgICAgICAvL21lZGl1bXAgdmVjMyBncmVlbiA9IHZlYzMoMC4zMSwgMC4wMiwgMC4wNik7ICAvLyByXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZWRpdW1wIHZlYzMgZ3JlZW4gPSB2ZWMzKDAuMDIsIDAuMTcsIDAuMzEpOyAgLy8gYlxyXG4gICAgICAgICAgICAgICAgICAgIG1lZGl1bXAgZmxvYXQgY29sb3JGYWMgPSAodGV4Q29sb3IueCAtIHRleENvbG9yLnkpIC8gMC42NTtcclxuICAgICAgICAgICAgICAgICAgICBtZWRpdW1wIGZsb2F0IHdoaXRlRmFjID0gKDEuMCAtIGNvbG9yRmFjKSAqIDAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVkaXVtcCB2ZWMzIGNvbG9yID0gdmVjMyh3aGl0ZUZhYywgd2hpdGVGYWMsIHdoaXRlRmFjKSArIGNvbG9yRmFjICogdUNvbG9yLnJnYjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciwgdGV4Q29sb3IuYSAqIHVDb2xvci5hKTsgICBcclxuICAgICAgICAgICAgfWA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBSZW5kZXJTdGF0ZVN0YWNrIHtcclxuICAgICAgICBwcml2YXRlIG1vZGVsVHJhbnNmb3JtOiBBcnJheTxwc2dlb21ldHJ5Lk1hdHJpeDQ+ID0gW3BzZ2VvbWV0cnkuTWF0cml4NC5JZGVudGl0eV07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhY2s6IEFycmF5PFJlbmRlclN0YXRlPiA9IFtdO1xyXG5cclxuICAgICAgICAvKiogVG9wIG9mIHRoZSBzdGF0ZSBzdGFjay5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldCBUb3AoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGV0ZXJtaW5lcyB0aGUgY3VycmVudCBtb2RlbCB0cmFuc2Zvcm1hdGlvbi5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldCBDdXJyZW50TW9kZWxUcmFuc2Zvcm0oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsVHJhbnNmb3JtW3RoaXMubW9kZWxUcmFuc2Zvcm0ubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUHVzaGVzIHRoZSBzcGVjaWZpZWQgc3RhdGUgb24gdGhlIHN0YXRlIHN0YWNrLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcHVzaFN0YXRlKHN0YXRlOiBSZW5kZXJTdGF0ZSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5QYXJlbnQgPSB0aGlzLnN0YWNrLmxlbmd0aCA9PSAwID8gbnVsbCA6IHRoaXMuVG9wO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2goc3RhdGUpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUuY29udGFpbnMoJ01vZGVsVHJhbnNmb3JtJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb2RlbFRyYW5zZm9ybSA9IHN0YXRlLmdldCgnTW9kZWxUcmFuc2Zvcm0nLCBwc2dlb21ldHJ5Lk1hdHJpeDQuSWRlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbFRyYW5zZm9ybS5wdXNoKDxwc2dlb21ldHJ5Lk1hdHJpeDQ+dGhpcy5DdXJyZW50TW9kZWxUcmFuc2Zvcm0ubXVsdGlwbHkobW9kZWxUcmFuc2Zvcm0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxUcmFuc2Zvcm0ucHVzaCh0aGlzLkN1cnJlbnRNb2RlbFRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBSZW1vdmVzIHRoZSB0b3AgZWxlbWVudCBmcm9tIHRoZSBzdGF0ZSBzdGFjay5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHBvcFN0YXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLlRvcC5QYXJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsVHJhbnNmb3JtLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQSBSZW5kZXJDb250ZXh0IGluc3RhbmNlIGlzIHVzZWQgdG8gcGFzcyBlbnZpcm9ubWVudCBkYXRhIHRvIFNjZW5lSXRlbXMgZHVyaW5nIHRoZSByZW5kaXRpb24gcHJvY2Vzcy5cclxuXHQgICpcclxuXHQgICogQmVzaWRlcyB0aGUgU3RhZ2UgdGhhdCB0aGUgU2NlbmVJdGVtcyBhcmUgYmVpbmcgcmVuZGVyZWQgdG8sIHRoZSByZW5kZXIgY29udGV4dCBpcyB0aGUgb3duZXIgb2YgYSBzdGF0ZSBzdGFja1xyXG5cdCAgKiB0aGF0IG1heSBiZSB1cGRhdGVkIGJ5IFNjZW5lSXRlbXMgYW5kIHRoYXQgaXMgY29uc2VxdWVudGx5IHVzZWQgYnkgU2hhZGVyUHJvZ3JhbXMgdG8gc2V0IHNoYWRlciBkYXRhIGFuZCByZXNvdXJjZXMgKGxpa2UgbW9kZWwgdHJhbnNmb3JtYXRpb25cclxuXHQgICogYW5kIGF1eGlsaWFyeSBkYXRhKS4gQXMgU2NlbmVJdGVtcyBhcmUgb3JnYW5pemVkIGluIGEgaGllcmFyY2hpY2FsIHdheSwgdGhlIGN1cnJlbnQgc3RhdGUgbWF5IGJlIGRlZmluZWQgYnkgdGhlIGN1cnJlbnQgU2NlbmVJdGVtLCBidXRcclxuXHQgICogYWxzbyBieSBwcmV2aW91c2x5IHRyYXZlcnNlZCBTY2VuZUl0ZW1zIGluIHRoZSBzY2VuZSBoaWVyYXJjaHkuXHJcblx0ICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFJlbmRlckNvbnRleHRXZWJHTCB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGFnZTogU3RhZ2VXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYW1lcmE6IENhbWVyYTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaGFkZXJQcm9ncmFtOiBTaGFkZXJQcm9ncmFtV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2NlbmVDYXRlZ29yeTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGVTdGFjazogUmVuZGVyU3RhdGVTdGFjayA9IG5ldyBSZW5kZXJTdGF0ZVN0YWNrKCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kZWxUcmFuc2Zvcm06IHBzZ2VvbWV0cnkuTWF0cml4NCA9IG51bGw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbm9kZVRyYW5zZm9ybTogcHNnZW9tZXRyeS5NYXRyaXg0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwaGFzZTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgUGhhc2UoKSB7IHJldHVybiB0aGlzLnBoYXNlOyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgUGhhc2UodmFsdWU6IHN0cmluZykgeyB0aGlzLnBoYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgLyoqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUgdGhhdCBpcyBjb21wb3NlZCBvZiBwcmV2aW91c2x5IHNldCBzdGF0ZSB2YWx1ZXMuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXQgU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlU3RhY2suVG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFB1c2hlcyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9uIHRoZSBzdGF0ZSBzdGFjay5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHB1c2hTdGF0ZShzdGF0ZTogUmVuZGVyU3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVN0YWNrLnB1c2hTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUmVtb3ZlcyB0aGUgdG9wIGVsZW1lbnQgZnJvbSB0aGUgc3RhdGUgc3RhY2suXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBwb3BTdGF0ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVN0YWNrLnBvcFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1vZGVsVHJhbnNmb3JtKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZVN0YWNrLkN1cnJlbnRNb2RlbFRyYW5zZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBUaGUgY3VycmVudCBzY2VuZSdzIGNhdGVnb3J5LlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lQ2F0ZWdvcnkoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjZW5lQ2F0ZWdvcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGhlIGN1cnJlbnQgc2NlbmUncyBjYXRlZ29yeS5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNldCBTY2VuZUNhdGVnb3J5KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUNhdGVnb3J5ID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGhlIHN0YWdlIHRoZSBTY2VuZUl0ZW1zIGFyZSBiZWluZyByZW5kZXJlZCB0by5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldCBTdGFnZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGhlIHN0YWdlIHRoZSBTY2VuZUl0ZW1zIGFyZSBiZWluZyByZW5kZXJlZCB0by5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNldCBTdGFnZSh2YWx1ZTogU3RhZ2VXZWJHTCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IENhbWVyYSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FtZXJhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBDYW1lcmEodmFsdWU6IENhbWVyYSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFRoZSBjdXJyZW50IHNoYWRlciBwcm9ncmFtLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZ2V0IFNoYWRlclByb2dyYW0oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYWRlclByb2dyYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGhlIGN1cnJlbnQgc2hhZGVyIHByb2dyYW0uXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzZXQgU2hhZGVyUHJvZ3JhbSh2YWx1ZTogU2hhZGVyUHJvZ3JhbVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBOb2RlVHJhbnNmb3JtKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlVHJhbnNmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBOb2RlVHJhbnNmb3JtKHZhbHVlOiBwc2dlb21ldHJ5Lk1hdHJpeDQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlVHJhbnNmb3JtID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdGFnZVdlYkdMIHtcclxuXHJcbiAgICAgICAgcHVibGljIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjYW1lcmE6IENhbWVyYVdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNoYWRvd0NhbWVyYTogU2hhZG93Q2FtZXJhV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29udGV4dDogUmVuZGVyQ29udGV4dFdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIGFzc2V0RmFjdG9yeTogQXNzZXRGYWN0b3J5V2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYXNzZXRTdG9yZTogQXNzZXRTdG9yZVdlYkdMO1xyXG5cclxuICAgICAgICBwcml2YXRlIHBoYXNlU3BlY2lmaWNTaGFkZXJQcm9ncmFtczogeyBbaW5kZXg6IHN0cmluZ106IHsgW2luZGV4OiBzdHJpbmddOiBTaGFkZXJQcm9ncmFtV2ViR0wgfSB9ID0ge307XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hhZGVyUHJvZ3JhbXM6IHsgW2luZGV4OiBzdHJpbmddOiBTaGFkZXJQcm9ncmFtV2ViR0wgfSA9IHt9O1xyXG5cclxuICAgICAgICBwcml2YXRlIHRvb2xzOiBUb29sc1dlYkdMID0gbmV3IFRvb2xzV2ViR0wodGhpcyk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2FudmFzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IENhbWVyYSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FtZXJhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBUb29scygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEFzc2V0RmFjdG9yeSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXNzZXRGYWN0b3J5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBBc3NldFN0b3JlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hc3NldFN0b3JlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoY2FudmFzRWxlbWVudElkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBSZW5kZXJDb250ZXh0V2ViR0woKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5TdGFnZSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldFN0b3JlID0gbmV3IEFzc2V0U3RvcmVXZWJHTCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldEZhY3RvcnkgPSBuZXcgQXNzZXRGYWN0b3J5V2ViR0wodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzRWxlbWVudElkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW52YXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD4odGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCAodGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJykpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZXh0ID0gdGhpcy5nbC5nZXRFeHRlbnNpb24oJ09FU19lbGVtZW50X2luZGV4X3VpbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGluaXRpYWxpemUgV2ViR0wuIFlvdXIgYnJvd3NlciBtYXkgbm90IHN1cHBvcnQgaXQuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gaW5pdGlhbGl6ZSBXZWJHTC4gWW91ciBicm93c2VyIG1heSBub3Qgc3VwcG9ydCBpdC4gRXJyb3I6ICcgKyBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Q2FtZXJhID0gbmV3IFNoYWRvd0NhbWVyYVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Q2FtZXJhLnJlc2l6ZSh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhV2ViR0woKTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEucmVzaXplKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHVwZGF0ZVNoYWRvd0FyZWEoYm94OiBwc2dlb21ldHJ5LkFBQkIyRCkge1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvd0NhbWVyYS51cGRhdGVTaGFkb3dBcmVhKGJveCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYXBwbHlTdGF0ZShjb250ZXh0OiBSZW5kZXJDb250ZXh0V2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHByb2dyYW0gPSBjb250ZXh0LlNoYWRlclByb2dyYW0uUHJvZ3JhbTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXN1bHRpbmdNb2RlbFRyYW5zZm9ybWF0aW9uID0gcHNnZW9tZXRyeS5NYXRyaXg0LklkZW50aXR5O1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5Nb2RlbFRyYW5zZm9ybSAmJiBjb250ZXh0Lk5vZGVUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdGluZ01vZGVsVHJhbnNmb3JtYXRpb24gPSA8cHNnZW9tZXRyeS5NYXRyaXg0PmNvbnRleHQuTm9kZVRyYW5zZm9ybS5tdWx0aXBseShjb250ZXh0Lk1vZGVsVHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lk1vZGVsVHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRpbmdNb2RlbFRyYW5zZm9ybWF0aW9uID0gY29udGV4dC5Nb2RlbFRyYW5zZm9ybTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lk5vZGVUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdGluZ01vZGVsVHJhbnNmb3JtYXRpb24gPSBjb250ZXh0Lk5vZGVUcmFuc2Zvcm07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBtTWF0cml4TG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VNTWF0cml4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdihtTWF0cml4TG9jLCBmYWxzZSwgcmVzdWx0aW5nTW9kZWxUcmFuc2Zvcm1hdGlvbi50cmFuc3Bvc2UoKS5lbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGxldCB2TWF0cml4TG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VWTWF0cml4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdih2TWF0cml4TG9jLCBmYWxzZSwgY29udGV4dC5DYW1lcmEuVmlld01hdHJpeC50cmFuc3Bvc2UoKS5lbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGxldCBwTWF0cml4TG9jID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VQTWF0cml4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdihwTWF0cml4TG9jLCBmYWxzZSwgY29udGV4dC5DYW1lcmEuUHJvamVjdGlvbk1hdHJpeC50cmFuc3Bvc2UoKS5lbGVtZW50cyk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbmRlcihzY2VuZTogU2NlbmVXZWJHTCkge1xyXG4gICAgICAgICAgICBpZiAoc2NlbmUuaXNEaXJ0eSgpIHx8IHRoaXMuY2FtZXJhLmlzRGlydHkoKSB8fCB0aGlzLnNoYWRvd0NhbWVyYS5pc0RpcnR5KCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuUGhhc2UgPSAnU2hhZG93JztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5DYW1lcmEgPSB0aGlzLnNoYWRvd0NhbWVyYTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93Q2FtZXJhLmJlZ2luUmVuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgc2NlbmUucmVuZGVyKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYWRvd0NhbWVyYS5lbmRSZW5kZXIodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LlBoYXNlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuQ2FtZXJhID0gdGhpcy5jYW1lcmE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS5iZWdpblJlbmRlcih0aGlzKTtcclxuICAgICAgICAgICAgICAgIHNjZW5lLnJlbmRlcih0aGlzLmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEuZW5kUmVuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXJTaGFkZXJQcm9ncmFtKHNoYWRlclByb2dyYW1LZXk6IHN0cmluZywgc2hhZGVyUHJvZ3JhbTogU2hhZGVyUHJvZ3JhbVdlYkdMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZGVyUHJvZ3JhbXNbc2hhZGVyUHJvZ3JhbUtleV0gPSBzaGFkZXJQcm9ncmFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyUGhhc2VTcGVjaWZpY1NoYWRlclByb2dyYW0ocGhhc2VLZXk6IHN0cmluZywgc2hhZGVyUHJvZ3JhbUtleTogc3RyaW5nLCBzaGFkZXJQcm9ncmFtOiBTaGFkZXJQcm9ncmFtV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHBoYXNlID0gdGhpcy5waGFzZVNwZWNpZmljU2hhZGVyUHJvZ3JhbXNbcGhhc2VLZXldO1xyXG4gICAgICAgICAgICBpZiAoIXBoYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBwaGFzZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waGFzZVNwZWNpZmljU2hhZGVyUHJvZ3JhbXNbcGhhc2VLZXldID0gcGhhc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBoYXNlW3NoYWRlclByb2dyYW1LZXldID0gc2hhZGVyUHJvZ3JhbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRTaGFkZXJQcm9ncmFtKGNvbnRleHQsIHNoYWRlclByb2dyYW1LZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQucGhhc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwaGFzZSA9IHRoaXMucGhhc2VTcGVjaWZpY1NoYWRlclByb2dyYW1zW2NvbnRleHQucGhhc2VdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBoYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcGhhc2Vbc2hhZGVyUHJvZ3JhbUtleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0IHx8IHRoaXMuc2hhZGVyUHJvZ3JhbXNbc2hhZGVyUHJvZ3JhbUtleV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlc2l6ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEucmVzaXplKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGVudW0gQ29ubmVjdGlvblN0YXRlIHtcclxuICAgICAgICBSZWFkeSxcclxuICAgICAgICBDb25uZWN0aW5nLFxyXG4gICAgICAgIENvbm5lY3RlZCxcclxuICAgICAgICBFcnJvclxyXG4gICAgfTtcclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgU2VydmVyQ29ubmVjdGlvbiB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzdGF0ZTogQ29ubmVjdGlvblN0YXRlO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaGFuZGxlQ29ubmVjdGVkOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaGFuZGxlTWVzc2FnZTogKEV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXNDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuUmVhZHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgY29ubmVjdCgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgZGlzY29ubmVjdCgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc2VuZChkYXRhOiBhbnkpO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25NZXNzYWdlKGNhbGxiYWNrOiAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1lc3NhZ2UgPSBjYWxsYmFjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbm5lY3RlZChjYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbm5lY3RlZCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNpZ25hbFJTZXJ2ZXJDb25uZWN0aW9uIGV4dGVuZHMgU2VydmVyQ29ubmVjdGlvbiB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdGlvbjogSHViQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IEh1YkNvbm5lY3Rpb25CdWlsZGVyKClcclxuICAgICAgICAgICAgICAgIC53aXRoVXJsKCcvYXBpL3N0YXRlJylcclxuICAgICAgICAgICAgICAgIC5jb25maWd1cmVMb2dnaW5nKExvZ0xldmVsLlRyYWNlKVxyXG4gICAgICAgICAgICAgICAgLy8ud2l0aEh1YlByb3RvY29sKDxhbnk+KG5ldyBNZXNzYWdlUGFja0h1YlByb3RvY29sKCkpKVxyXG4gICAgICAgICAgICAgICAgLmJ1aWxkKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub24oJ21zZycsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1zZyA9IG5ldyBNZXNzYWdlRXZlbnQoJ2JpbmFyeScsIHsgZGF0YTogZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1lc3NhZ2UobXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29ubmVjdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZUNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25uZWN0ZWQobmV3IEV2ZW50KCdjb25uZWN0ZWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkaXNjb25uZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc3RvcCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5SZWFkeTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZW5kKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uaW52b2tlKCdNc2cnLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBXZWJTb2NrZXRTZXJ2ZXJDb25uZWN0aW9uIGV4dGVuZHMgU2VydmVyQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSB3ZWJzb2NrZXQ6IFdlYlNvY2tldDtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbm5lY3QodXJsPzogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09IENvbm5lY3Rpb25TdGF0ZS5SZWFkeSB8fCB0aGlzLnN0YXRlID09IENvbm5lY3Rpb25TdGF0ZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVyaSA9IHVybCA/IHVybCA6ICd3czovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArICcvYXBpL3NjZW5lJztcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGluZztcclxuICAgICAgICAgICAgICAgIHRoaXMud2Vic29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYnNvY2tldC5vbm9wZW4gPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3dlYnNvY2tldCBjb25uZWN0ZWQuJylcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25uZWN0ZWQoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYnNvY2tldC5vbmNsb3NlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3dlYnNvY2tldCBjbG9zZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5SZWFkeTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYnNvY2tldC5vbmVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd2Vic29ja2V0IGVycm9yLicpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJzb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1lc3NhZ2UoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkaXNjb25uZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLndlYnNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNlbmQoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2Vic29ja2V0LnNlbmQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUb29sIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGludGVyZmFjZUNvbnRyb2xsZXI6IEludGVyZmFjZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnRlcihpbnRlcmZhY2VDb250cm9sbGVyOiBJbnRlcmZhY2VDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlciA9IGludGVyZmFjZUNvbnRyb2xsZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgbGVhdmUoKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUtleVVwKGU6IEpRdWVyeS5FdmVudCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlTW92ZShlOiBKUXVlcnkuRXZlbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlRG93bihlOiBKUXVlcnkuRXZlbnQpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VVcChlOiBKUXVlcnkuRXZlbnQpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlRHJhZyhlOiBKUXVlcnkuRXZlbnQsIHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZFg6IG51bWJlciwgZFk6IG51bWJlcikgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZVdoZWVsKGU6IEpRdWVyeS5FdmVudCkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVDbGljayhlOiBKUXVlcnkuRXZlbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7IH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludGVyZmFjZUNvbnRyb2xsZXIge1xyXG5cclxuICAgICAgICBwcml2YXRlIHRvb2xzOiBBcnJheTxUb29sPiA9IFtdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGhhc1Rvb2woKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvb2xzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1cnJlbnRUb29sKCk6IFRvb2wge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXNUb29sKCkgPyB0aGlzLnRvb2xzW3RoaXMudG9vbHMubGVuZ3RoIC0gMV0gOiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsZWZ0QnV0dG9uID0gMDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsZWZ0QnV0dG9uRG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXJ0WDogbnVtYmVyID0gTmFOO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXJ0WTogbnVtYmVyID0gTmFOO1xyXG5cclxuICAgICAgICBwcml2YXRlIGxhc3RYOiBudW1iZXIgPSBOYU47XHJcblxyXG4gICAgICAgIHByaXZhdGUgbGFzdFk6IG51bWJlciA9IE5hTjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0YXJnZXQ6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHVibGljIG9uTW92ZTogKGU6IEpRdWVyeS5FdmVudCwgeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHZvaWQgPSBudWxsO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25EcmFnOiAoZTogSlF1ZXJ5LkV2ZW50LCBkWDogbnVtYmVyLCBkWTogbnVtYmVyKSA9PiB2b2lkID0gbnVsbDtcclxuXHJcbiAgICAgICAgcHVibGljIG9uTW91c2VXaGVlbDogKGU6IEpRdWVyeS5FdmVudCkgPT4gdm9pZCA9IG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJpbmRFdmVudHModGFyZ2V0OiBKUXVlcnkpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAkKHRhcmdldCkub24oJ21vdXNld2hlZWwnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZVdoZWVsKGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQodGFyZ2V0KS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZURvd24oZSk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEoPGFueT50YXJnZXQpLnNldENhcHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlTW92ZShlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlTW92ZShlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignbW91c2V1cCB0b3VjaGVuZCB0b3VjaGNhbmNlbCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlVXAoZSk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCh0YXJnZXQpLm9uKCdsb3NlY2FwdHVyZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlVXAoZSk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleVVwKGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlTGFzdFBvc2l0aW9uKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RYID0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RZID0gZS5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHB1c2hUb29sKHRvb2w6IFRvb2wpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ3VycmVudFRvb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFRvb2wubGVhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50b29scy5wdXNoKHRvb2wpO1xyXG5cclxuICAgICAgICAgICAgdG9vbC5lbnRlcih0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBwb3BUb29sKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50b29scy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xzW3RoaXMudG9vbHMubGVuZ3RoIC0gMV0ubGVhdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbHMucG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudG9vbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b29sc1t0aGlzLnRvb2xzLmxlbmd0aCAtIDFdLmVudGVyKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGtleVVwKGU6IEpRdWVyeS5FdmVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUb29sKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkN1cnJlbnRUb29sLmhhbmRsZUtleVVwKGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3VzZURvd24oZTogSlF1ZXJ5LlRyaWdnZXJlZEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlLmJ1dHRvbiA9PSB0aGlzLmxlZnRCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdEJ1dHRvbkRvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFggPSBlLmNsaWVudFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0WSA9IGUuY2xpZW50WTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGFzdFBvc2l0aW9uKGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnNldENhcHR1cmUpIGUudGFyZ2V0LnNldENhcHR1cmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVG9vbCgpICYmICFlLmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFRvb2wuaGFuZGxlTW91c2VEb3duKGUpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb3VzZU1vdmUoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Rvb2woKSAmJiAhZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWZ0QnV0dG9uRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFRvb2wuaGFuZGxlRHJhZyhlLCB0aGlzLnN0YXJ0WCwgdGhpcy5zdGFydFksIGUuY2xpZW50WCAtIHRoaXMubGFzdFgsIGUuY2xpZW50WSAtIHRoaXMubGFzdFkpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VycmVudFRvb2wuaGFuZGxlTW91c2VNb3ZlKGUsIGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVmdEJ1dHRvbkRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWcoZSwgZS5jbGllbnRYIC0gdGhpcy5sYXN0WCwgZS5jbGllbnRZIC0gdGhpcy5sYXN0WSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Nb3ZlKGUsIGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEJ1dHRvbkRvd24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGFzdFBvc2l0aW9uKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdXNlVXAoZTogSlF1ZXJ5LlRyaWdnZXJlZEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCB1cGRhdGVQb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoZS5idXR0b24gPT0gdGhpcy5sZWZ0QnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRCdXR0b25Eb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVQb3NpdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnJlbGVhc2VDYXB0dXJlKSBlLnRhcmdldC5yZWxlYXNlQ2FwdHVyZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUb29sKCkgJiYgIWUuY3RybEtleSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50VG9vbC5oYW5kbGVNb3VzZVVwKGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMYXN0UG9zaXRpb24oZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZHJhZyhlOiBKUXVlcnkuRXZlbnQsIGRYOiBudW1iZXIsIGRZOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub25EcmFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRHJhZyhlLCBkWCwgZFkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdXNlV2hlZWwoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Rvb2woKSAmJiAhZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1cnJlbnRUb29sLmhhbmRsZU1vdXNlV2hlZWwoZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbk1vdXNlV2hlZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VXaGVlbChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ2FtZXJhQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGFnZTogU3RhZ2VXZWJHTDtcclxuICAgICAgICBwcml2YXRlIGNhbWVyYTogQ2FtZXJhV2ViR0w7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBTZXJ2ZXJDb25uZWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgcmFkaXVzOiBudW1iZXIgPSAyMC4wO1xyXG4gICAgICAgIHByaXZhdGUgeWF3OiBudW1iZXIgPSAwLjA7XHJcbiAgICAgICAgcHJpdmF0ZSBwaXRjaDogbnVtYmVyID0gMC4wO1xyXG4gICAgICAgIHByaXZhdGUgY2VudGVyOiBwc2dlb21ldHJ5LlZlYzM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZHJhZ0Rpdmlzb3IgPSAxMDAuMDtcclxuICAgICAgICBwcml2YXRlIHJvdGF0ZURpdmlzb3IgPSAyMDAuMDtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBZYXcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnlhdztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXQgWWF3KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy55YXcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0YWdlOiBTdGFnZVdlYkdMLCBjYW1lcmE6IENhbWVyYVdlYkdMLCBpbnRlcmZhY2VDb250cm9sbGVyOiBJbnRlcmZhY2VDb250cm9sbGVyLCBjb25uZWN0aW9uOiBTZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XHJcblxyXG4gICAgICAgICAgICBpbnRlcmZhY2VDb250cm9sbGVyLmJpbmRFdmVudHMoJChzdGFnZS5DYW52YXMpKTtcclxuICAgICAgICAgICAgaW50ZXJmYWNlQ29udHJvbGxlci5vbkRyYWcgPSAoZSwgZFgsIGRZKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWcoZSwgZFgsIGRZKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGludGVyZmFjZUNvbnRyb2xsZXIub25Nb3VzZVdoZWVsID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VXaGVlbChlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGludGVyZmFjZUNvbnRyb2xsZXIub25Nb3ZlID0gKGUsIHgsIHkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShlLCB4LCB5KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyID0gbmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDAuMCwgMC4wKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0KHJhZGl1czogbnVtYmVyLCBwaXRjaDogbnVtYmVyLCB5YXc6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgICAgICAgICAgdGhpcy5waXRjaCA9IHBpdGNoO1xyXG4gICAgICAgICAgICB0aGlzLnlhdyA9IHlhdztcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdXNlV2hlZWwoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZCA9IHRoaXMuZ2V0Vmlld0RpcigpLm11bHRpcGx5KCg8YW55PmUpLmRlbHRhWSB8fCAoPGFueT5lKS5kZWx0YVgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNlbnRlci5zdWIoZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhZGl1cyArPSAoPGFueT5lKS5kZWx0YVkgKiBNYXRoLmxvZyh0aGlzLnJhZGl1cyArIDEpIC8gMjtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFkaXVzID0gTWF0aC5tYXgoMC4wMSwgdGhpcy5yYWRpdXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdmUoZTogSlF1ZXJ5LkV2ZW50LCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkcmFnKGU6IEpRdWVyeS5FdmVudCwgZFg6IG51bWJlciwgZFk6IG51bWJlcikge1xyXG5cclxuICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5nZXRWaWV3UGxhbmVYKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHRoaXMuZ2V0Vmlld1BsYW5lWSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZW50ZXIgPSB0aGlzLmNlbnRlclxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGQoeC5tdWx0aXBseShkWCAvIHRoaXMuZHJhZ0Rpdmlzb3IpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGQoeS5tdWx0aXBseShkWSAvIHRoaXMuZHJhZ0Rpdmlzb3IpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueWF3IC09IGRYIC8gdGhpcy5yb3RhdGVEaXZpc29yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waXRjaCA9IE1hdGgubWF4KC1NYXRoLlBJIC8gMiwgTWF0aC5taW4oTWF0aC5QSSAvIDIsIHRoaXMucGl0Y2ggLSBkWSAvIHRoaXMucm90YXRlRGl2aXNvcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRWaWV3UGxhbmVYKCkge1xyXG4gICAgICAgICAgICBsZXQgcSwgciwgdjtcclxuXHJcbiAgICAgICAgICAgIHYgPSBuZXcgcHNnZW9tZXRyeS5WZWMzKC0xLjAsIDAuMCwgMC4wKTtcclxuICAgICAgICAgICAgcSA9IG5ldyBwc2dlb21ldHJ5LlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgciA9IG5ldyBwc2dlb21ldHJ5LlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgcS5zZXRGcm9tQXhpc0FuZ2xlKG5ldyBwc2dlb21ldHJ5LlZlYzMoMC4wLCAxLjAsIDAuMCksIHRoaXMueWF3KTtcclxuICAgICAgICAgICAgci5zZXRGcm9tQXhpc0FuZ2xlKG5ldyBwc2dlb21ldHJ5LlZlYzMoMS4wLCAwLjAsIDAuMCksIHRoaXMucGl0Y2gpO1xyXG4gICAgICAgICAgICB2ID0gdi5hcHBseVF1YXRlcm5pb24ocik7XHJcbiAgICAgICAgICAgIHYgPSB2LmFwcGx5UXVhdGVybmlvbihxKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2OyAvLy5hZGQodGhpcy5jZW50ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRWaWV3UGxhbmVZKCkge1xyXG4gICAgICAgICAgICBsZXQgcSwgciwgdjtcclxuXHJcbiAgICAgICAgICAgIHYgPSBuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMS4wLCAwLjApO1xyXG4gICAgICAgICAgICBxID0gbmV3IHBzZ2VvbWV0cnkuUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICByID0gbmV3IHBzZ2VvbWV0cnkuUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICBxLnNldEZyb21BeGlzQW5nbGUobmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDEuMCwgMC4wKSwgdGhpcy55YXcpO1xyXG4gICAgICAgICAgICByLnNldEZyb21BeGlzQW5nbGUobmV3IHBzZ2VvbWV0cnkuVmVjMygxLjAsIDAuMCwgMC4wKSwgdGhpcy5waXRjaCk7XHJcbiAgICAgICAgICAgIHYgPSB2LmFwcGx5UXVhdGVybmlvbihyKTtcclxuICAgICAgICAgICAgdiA9IHYuYXBwbHlRdWF0ZXJuaW9uKHEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHY7IC8vLmFkZCh0aGlzLmNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldFZpZXdEaXIoKTogcHNnZW9tZXRyeS5WZWMzIHtcclxuICAgICAgICAgICAgbGV0IHEsIHIsIHY7XHJcblxyXG4gICAgICAgICAgICB2ID0gbmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDAuMCwgLTEuMCk7XHJcbiAgICAgICAgICAgIHEgPSBuZXcgcHNnZW9tZXRyeS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgICAgIHIgPSBuZXcgcHNnZW9tZXRyeS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgICAgIHEuc2V0RnJvbUF4aXNBbmdsZShuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMS4wLCAwLjApLCB0aGlzLnlhdyk7XHJcbiAgICAgICAgICAgIHIuc2V0RnJvbUF4aXNBbmdsZShuZXcgcHNnZW9tZXRyeS5WZWMzKDEuMCwgMC4wLCAwLjApLCB0aGlzLnBpdGNoKTtcclxuICAgICAgICAgICAgdiA9IHYuYXBwbHlRdWF0ZXJuaW9uKHIpO1xyXG4gICAgICAgICAgICB2ID0gdi5hcHBseVF1YXRlcm5pb24ocSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdjsgLy8uYWRkKHRoaXMuY2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0Q2FtZXJhUG9zKCkge1xyXG4gICAgICAgICAgICBsZXQgcSwgciwgdjtcclxuXHJcbiAgICAgICAgICAgIHYgPSBuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMC4wLCB0aGlzLnJhZGl1cyk7XHJcbiAgICAgICAgICAgIHEgPSBuZXcgcHNnZW9tZXRyeS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgICAgIHIgPSBuZXcgcHNnZW9tZXRyeS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgICAgIHEuc2V0RnJvbUF4aXNBbmdsZShuZXcgcHNnZW9tZXRyeS5WZWMzKDAuMCwgMS4wLCAwLjApLCB0aGlzLnlhdyk7XHJcbiAgICAgICAgICAgIHIuc2V0RnJvbUF4aXNBbmdsZShuZXcgcHNnZW9tZXRyeS5WZWMzKDEuMCwgMC4wLCAwLjApLCB0aGlzLnBpdGNoKTtcclxuICAgICAgICAgICAgdiA9IHYuYXBwbHlRdWF0ZXJuaW9uKHIpO1xyXG4gICAgICAgICAgICB2ID0gdi5hcHBseVF1YXRlcm5pb24ocSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdi5hZGQodGhpcy5jZW50ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVDYW1lcmEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZSh0aGlzLmdldENhbWVyYVBvcygpLCB0aGlzLmNlbnRlciwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLjAsIDEuMCwgMC4wKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDb21tb25NZXNzYWdlVHlwZXMge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQXBwU3RhdGVEZWx0YSA9IDB4MDEwMDtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFNlcnZlckhhbmRzaGFrZSA9IDB4MDEwMTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIENsaWVudEhhbmRzaGFrZSA9IDB4MDEwMjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIENsaWVudENvbmZpcm1hdGlvbiA9IDB4MDEwMztcclxuICAgICAgICBwdWJsaWMgc3RhdGljIEFwcFN0YXRlSW5pdGlhbGl6YXRpb24gPSAweDEwNDtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIEFuY2hvclJlcXVlc3QgPSAweDAxZmU7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBTaGFyZWRBbmNob3IgPSAweDAxZmY7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5ldHdvcmtDaGFubmVsTWVzc2FnZSB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSGVhZGVyU2l6ZSA9IDg7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbWVzc2FnZVR5cGU6IG51bWJlciA9IENvbW1vbk1lc3NhZ2VUeXBlcy5BcHBTdGF0ZURlbHRhO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbnRlbnQ6IFVpbnQ4QXJyYXk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ29udGVudCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTWVzc2FnZVR5cGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VUeXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBGcm9tQnVmZmVyKGJ1ZmZlcjogVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE5ldHdvcmtDaGFubmVsTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICByZXN1bHQuY29udGVudCA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGFzUGF5bG9hZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5ieXRlTGVuZ3RoID4gTmV0d29ya0NoYW5uZWxNZXNzYWdlLkhlYWRlclNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFBheWxvYWRTaXplKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmJ5dGVMZW5ndGggLSBOZXR3b3JrQ2hhbm5lbE1lc3NhZ2UuSGVhZGVyU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19