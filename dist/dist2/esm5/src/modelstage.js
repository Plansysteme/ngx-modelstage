/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
import { psgeometry } from './ps-geometry';
import $ from 'jquery';
export var modelstage;
(function (modelstage) {
    var Timer = /** @class */ (function () {
        function Timer() {
        }
        /**
         * @param {?} callback
         * @return {?}
         */
        Timer.prototype.animationFrame = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            return window.requestAnimationFrame(callback);
        };
        return Timer;
    }());
    var SpaceModel = /** @class */ (function () {
        function SpaceModel(scene, stage, actor) {
            this.scene = scene;
            this.stage = stage;
            this.actor = actor;
            this.vertices = [];
            this.floorLevel = 0;
        }
        Object.defineProperty(SpaceModel.prototype, "FloorLevel", {
            get: /**
             * @return {?}
             */
            function () { return this.floorLevel; },
            set: /**
             * @param {?} floorLevel
             * @return {?}
             */
            function (floorLevel) { this.floorLevel = floorLevel; },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        SpaceModel.prototype.initializeSquareRoom = /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        function (transparentMeshBuilder, texturedMeshBuilder) {
            texturedMeshBuilder.addQuad(-5.0, 0.0, -5.0, 0, 0, 5.0, 0.0, -5.0, 1, 0, 5.0, 0.0, 5.0, 1, 1, -5.0, 0.0, 5.0, 0, 1, 0.3, 0.3, 0.3, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, -5.0, 5.0, 0.0, -5.0, 5.0, 2.6, -5.0, -5.0, 2.6, -5.0, 0.1, 0.1, 0.1, .4, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, 5.0, -5.0, 2.6, 5.0, 5.0, 2.6, 5.0, 5.0, 0.0, 5.0, 0.1, 0.1, 0.1, .4, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, -5.0, -5.0, 2.6, -5.0, -5.0, 2.6, 5.0, -5.0, 0.0, 5.0, 0.15, 0.15, 0.15, .4, true);
            transparentMeshBuilder.addQuad(5.0, 0.0, -5.0, 5.0, 0.0, 5.0, 5.0, 2.6, 5.0, 5.0, 2.6, -5.0, 0.15, 0.15, 0.15, .4, true);
        };
        /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        SpaceModel.prototype.initializeArbitraryRoom = /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        function (transparentMeshBuilder, texturedMeshBuilder) {
            /** @type {?} */
            var toggle = false;
            /** @type {?} */
            var poly = new psgeometry.Polygon2D();
            for (var i = 0; i < this.vertices.length; i++) {
                poly.addVector(this.vertices[i]);
            }
            /** @type {?} */
            var bbox = new psgeometry.AABB2D();
            poly.addToAABB(bbox);
            /** @type {?} */
            var extents = bbox.extents();
            this.stage.updateShadowArea(bbox);
            poly = poly.triangulate();
            for (var i = 0; i < poly.Vertices.length; i += 3) {
                texturedMeshBuilder.addTri(poly.Vertices[i].x, 0, poly.Vertices[i].y, (poly.Vertices[i].x - bbox.minX) / extents.x, (poly.Vertices[i].y - bbox.minY) / extents.y, poly.Vertices[i + 1].x, 0, poly.Vertices[i + 1].y, (poly.Vertices[i + 1].x - bbox.minX) / extents.x, (poly.Vertices[i + 1].y - bbox.minY) / extents.y, poly.Vertices[i + 2].x, 0, poly.Vertices[i + 2].y, (poly.Vertices[i + 2].x - bbox.minX) / extents.x, (poly.Vertices[i + 2].y - bbox.minY) / extents.y, 0.2, 0.2, 0.2, true);
            }
            for (var i = 0; i < this.vertices.length; i++) {
                /** @type {?} */
                var start = this.vertices[i];
                /** @type {?} */
                var end = this.vertices[(i + 1) % this.vertices.length];
                transparentMeshBuilder.addQuad(start.x, 0.0, start.y, end.x, 0.0, end.y, end.x, 2.6, end.y, start.x, 2.6, start.y, toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, .4, true);
                toggle = !toggle;
            }
        };
        /**
         * @return {?}
         */
        SpaceModel.prototype.updateSpace = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var spaceIndices = new modelstageweb.BufferAssetWebGL(undefined, 'space_indices', true);
            /** @type {?} */
            var spaceVertices = new modelstageweb.BufferAssetWebGL(undefined, 'space_vertices', false);
            /** @type {?} */
            var transparentMeshBuilder = new modelstageweb.TransparentMeshBuilder(spaceVertices, spaceIndices);
            /** @type {?} */
            var floorIndices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_indices', true);
            /** @type {?} */
            var floorVertices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_vertices', false);
            /** @type {?} */
            var texturedMeshBuilder = new modelstageweb.TexturedMeshBuilder(floorVertices, floorIndices);
            if (this.vertices.length < 3) {
                this.initializeSquareRoom(transparentMeshBuilder, texturedMeshBuilder);
            }
            else {
                this.initializeArbitraryRoom(transparentMeshBuilder, texturedMeshBuilder);
            }
            /** @type {?} */
            var figure = new modelstageweb.FigureWebGL('Space');
            texturedMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('floor_indices', floorIndices);
            this.stage.AssetStore.addBufferAsset('floor_vertices', floorVertices);
            /** @type {?} */
            var floorShaderInstance = new modelstageweb.MeshShaderInstance('TexturedMeshShader');
            floorShaderInstance.addReference('IndexBuffer', 'floor_indices');
            floorShaderInstance.addReference('VertexBuffer', 'floor_vertices');
            floorShaderInstance.addReference('TextureBuffer', 'Shadow');
            figure.addShaderInstance(floorShaderInstance);
            transparentMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('space_indices', spaceIndices);
            this.stage.AssetStore.addBufferAsset('space_vertices', spaceVertices);
            /** @type {?} */
            var shaderInstance = new modelstageweb.MeshShaderInstance('TransparentMeshShader');
            shaderInstance.addReference('IndexBuffer', 'space_indices');
            shaderInstance.addReference('VertexBuffer', 'space_vertices');
            figure.addShaderInstance(shaderInstance);
            this.actor.Figures[0] = figure;
            this.actor.Filter = new modelstageweb.GenericSceneItemFilterWebGL();
            this.actor.Scene.setDirty();
        };
        /**
         * @return {?}
         */
        SpaceModel.prototype.clearVertices = /**
         * @return {?}
         */
        function () {
            this.vertices.length = 0;
        };
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        SpaceModel.prototype.addVertex = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            this.vertices.push(new psgeometry.Vec2(x, y));
        };
        return SpaceModel;
    }());
    modelstage.SpaceModel = SpaceModel;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        SpaceModel.prototype.vertices;
        /**
         * @type {?}
         * @private
         */
        SpaceModel.prototype.floorLevel;
        /**
         * @type {?}
         * @private
         */
        SpaceModel.prototype.scene;
        /**
         * @type {?}
         * @private
         */
        SpaceModel.prototype.stage;
        /**
         * @type {?}
         * @private
         */
        SpaceModel.prototype.actor;
    }
    var TheaterWebGL = /** @class */ (function () {
        function TheaterWebGL(canvasElementID) {
            var _this = this;
            this.stage = new modelstageweb.StageWebGL(canvasElementID);
            this.stage.initialize();
            //this.scene = new modelstageweb.SceneWebGL();
            this.timer = new Timer();
            this.timer.animationFrame(function () { _this.processFrame(); });
            document.addEventListener('visibilitychange', function () { _this.onVisibilityChange(); }, false);
            this.initialize();
        }
        Object.defineProperty(TheaterWebGL.prototype, "Stage", {
            get: /**
             * @return {?}
             */
            function () {
                return this.stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TheaterWebGL.prototype, "Scene", {
            get: /**
             * @return {?}
             */
            function () {
                return this.scene;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @protected
         * @return {?}
         */
        TheaterWebGL.prototype.initialize = /**
         * @protected
         * @return {?}
         */
        function () {
        };
        /** Main render cycle for a frame.
          */
        /**
         * Main render cycle for a frame.
         * @protected
         * @return {?}
         */
        TheaterWebGL.prototype.processFrame = /**
         * Main render cycle for a frame.
         * @protected
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.scene && this.scene.IsInitialized) {
                if (!document.hidden) {
                    // Render scene.
                    this.render();
                }
                // Process available interaction data and remote messages to update application state and/or view state for the next frame.
                this.scene.update();
                // Finalize frame.
                this.scene.endFrame();
                this.scene.beginFrame();
            }
            this.timer.animationFrame(function () { _this.processFrame(); });
        };
        /**
         * @protected
         * @return {?}
         */
        TheaterWebGL.prototype.render = /**
         * @protected
         * @return {?}
         */
        function () {
            if (this.scene.IsInitialized) {
                this.stage.render(this.scene);
            }
        };
        /**
         * @private
         * @return {?}
         */
        TheaterWebGL.prototype.onVisibilityChange = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!document.hidden) {
                this.timer.animationFrame(function () { _this.render(); });
            }
        };
        return TheaterWebGL;
    }());
    modelstage.TheaterWebGL = TheaterWebGL;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        TheaterWebGL.prototype.scene;
        /**
         * @type {?}
         * @protected
         */
        TheaterWebGL.prototype.stage;
        /**
         * @type {?}
         * @private
         */
        TheaterWebGL.prototype.timer;
    }
    var ActorManipulationTool = /** @class */ (function (_super) {
        tslib_1.__extends(ActorManipulationTool, _super);
        function ActorManipulationTool(connection) {
            var _this = _super.call(this) || this;
            _this.connection = connection;
            return _this;
        }
        /**
         * @protected
         * @param {?} objID
         * @return {?}
         */
        ActorManipulationTool.prototype.getSceneObj = /**
         * @protected
         * @param {?} objID
         * @return {?}
         */
        function (objID) {
            /** @type {?} */
            var sceneObjIdx = 0;
            /** @type {?} */
            var sceneObj = null;
            while (sceneObjIdx < SceneAppState.GlobalInstance.SceneObjects.Count && !sceneObj) {
                if (SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx).SceneObjectID == objID) {
                    sceneObj = SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx);
                }
                else {
                    ++sceneObjIdx;
                }
            }
            return [sceneObj, sceneObjIdx];
        };
        /**
         * @private
         * @param {?} actor
         * @return {?}
         */
        ActorManipulationTool.prototype.updateModelTransform = /**
         * @private
         * @param {?} actor
         * @return {?}
         */
        function (actor) {
            /** @type {?} */
            var translationVec = actor.Data['translate'] || psgeometry.Vec4.Zero;
            /** @type {?} */
            var rotationVec = actor.Data['rotate'] || psgeometry.Vec4.Zero;
            this.connection.send('Scene|Transform|' + actor.SceneItemID + '|' + translationVec.x + ',' + translationVec.y + ',' + translationVec.z + '|' + rotationVec.y + ',' + rotationVec.x + ',' + rotationVec.z);
            /** @type {?} */
            var translation = psgeometry.Matrix4.FromTranslation(translationVec.x, translationVec.y, translationVec.z);
            /** @type {?} */
            var rotation = psgeometry.Matrix4.FromRotationY(rotationVec.y);
            actor.State.set('ModelTransform', (/** @type {?} */ (rotation.multiply(translation))));
            actor.Scene.setDirty();
        };
        /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        ActorManipulationTool.prototype.updateActorTranslation = /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (actor, x, y, z) {
            actor.Data['translate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        };
        /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        ActorManipulationTool.prototype.updateActorRotation = /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        function (actor, x, y, z) {
            actor.Data['rotate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        };
        return ActorManipulationTool;
    }(modelstageweb.Tool));
    modelstage.ActorManipulationTool = ActorManipulationTool;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ActorManipulationTool.prototype.connection;
    }
    var SelectionTool = /** @class */ (function (_super) {
        tslib_1.__extends(SelectionTool, _super);
        function SelectionTool(scene, stage, connection) {
            var _this = _super.call(this, connection) || this;
            _this.scene = scene;
            _this.stage = stage;
            return _this;
        }
        /**
         * @param {?} interfaceController
         * @return {?}
         */
        SelectionTool.prototype.enter = /**
         * @param {?} interfaceController
         * @return {?}
         */
        function (interfaceController) {
            _super.prototype.enter.call(this, interfaceController);
            this.updateSelectionMarker();
        };
        /**
         * @return {?}
         */
        SelectionTool.prototype.leave = /**
         * @return {?}
         */
        function () {
            this.removeSelectionMarker();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        SelectionTool.prototype.handleKeyUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.keyCode == 46 && this.selectedActor) { // delete key
                // delete key
                var _a = tslib_1.__read(this.getSceneObj(this.selectedActor.Data['SceneObjID']), 2), sceneObj = _a[0], sceneObjIdx = _a[1];
                if (sceneObj) {
                    SceneAppState.GlobalInstance.SceneObjects.remove(sceneObjIdx);
                    this.removeSelectionMarker();
                    this.selectedActor = null;
                    return true;
                }
            }
            return false;
        };
        /**
         * @private
         * @return {?}
         */
        SelectionTool.prototype.removeSelectionMarker = /**
         * @private
         * @return {?}
         */
        function () {
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
        };
        /**
         * @private
         * @return {?}
         */
        SelectionTool.prototype.updateSelectionMarker = /**
         * @private
         * @return {?}
         */
        function () {
            var _a;
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
            if (this.selectedActor) {
                /** @type {?} */
                var box_1 = new psgeometry.AABB3D;
                this.selectedActor.Figures.forEach(function (fig) {
                    box_1.addAABB(fig.getBoundingBox());
                });
                /** @type {?} */
                var bottomCenterPoint = new psgeometry.Vec3(box_1.center().x, box_1.minY, box_1.center().z);
                /** @type {?} */
                var selectionMarker = new modelstageweb.ActorWebGL(this.scene, SelectionTool.SelectionObjectID);
                var _b = tslib_1.__read([.16, .34, .6], 3), r = _b[0], g = _b[1], b = _b[2];
                /** @type {?} */
                var meshBuilder = new modelstageweb.OpaqueMeshBuilder();
                // top lid
                meshBuilder.addStroke(box_1.minX, box_1.maxY, box_1.minZ, box_1.maxX, box_1.maxY, box_1.minZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.maxY, box_1.minZ, box_1.maxX, box_1.maxY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.maxY, box_1.maxZ, box_1.minX, box_1.maxY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.minX, box_1.maxY, box_1.maxZ, box_1.minX, box_1.maxY, box_1.minZ, r, g, b);
                // bottom lid
                meshBuilder.addStroke(box_1.minX, box_1.minY, box_1.minZ, box_1.maxX, box_1.minY, box_1.minZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.minY, box_1.minZ, box_1.maxX, box_1.minY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.minY, box_1.maxZ, box_1.minX, box_1.minY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.minX, box_1.minY, box_1.maxZ, box_1.minX, box_1.minY, box_1.minZ, r, g, b);
                // vertical lines
                meshBuilder.addStroke(box_1.minX, box_1.minY, box_1.minZ, box_1.minX, box_1.maxY, box_1.minZ, r, g, b);
                meshBuilder.addStroke(box_1.minX, box_1.minY, box_1.maxZ, box_1.minX, box_1.maxY, box_1.maxZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.minY, box_1.minZ, box_1.maxX, box_1.maxY, box_1.minZ, r, g, b);
                meshBuilder.addStroke(box_1.maxX, box_1.minY, box_1.maxZ, box_1.maxX, box_1.maxY, box_1.maxZ, r, g, b);
                selectionMarker.addFigure(meshBuilder.createFigure(this.stage, 'SEL_MARKER'));
                /** @type {?} */
                var figureBoundingBox = new psgeometry.AABB3D();
                _a = tslib_1.__read([.6, .1, .1], 3), r = _a[0], g = _a[1], b = _a[2];
                /** @type {?} */
                var meshBuilder1 = new modelstageweb.OpaqueMeshBuilder();
                /** @type {?} */
                var segmentCount = 24;
                /** @type {?} */
                var radius0 = 1;
                /** @type {?} */
                var radius1 = 1.1;
                for (var i = 0; i < segmentCount; ++i) {
                    /** @type {?} */
                    var angle0 = 2 * Math.PI / segmentCount * i;
                    /** @type {?} */
                    var angle1 = 2 * Math.PI / segmentCount * (i + 1);
                    /** @type {?} */
                    var inner0 = new psgeometry.Vec3(Math.sin(angle0) * radius0, 0, Math.cos(angle0) * radius0).add(bottomCenterPoint);
                    /** @type {?} */
                    var inner1 = new psgeometry.Vec3(Math.sin(angle1) * radius0, 0, Math.cos(angle1) * radius0).add(bottomCenterPoint);
                    /** @type {?} */
                    var outer0 = new psgeometry.Vec3(Math.sin(angle0) * radius1, 0, Math.cos(angle0) * radius1).add(bottomCenterPoint);
                    /** @type {?} */
                    var outer1 = new psgeometry.Vec3(Math.sin(angle1) * radius1, 0, Math.cos(angle1) * radius1).add(bottomCenterPoint);
                    meshBuilder1.addQuad(outer0.x, outer0.y + 0.02, outer0.z, outer1.x, outer1.y + 0.02, outer1.z, inner1.x, inner1.y + 0.02, inner1.z, inner0.x, inner0.y + 0.02, inner0.z, r, g, b);
                    meshBuilder1.addQuad(outer0.x, outer1.y - 0.02, outer0.z, outer1.x, outer1.y - 0.02, outer1.z, outer1.x, outer1.y + 0.02, outer1.z, outer0.x, outer0.y + 0.02, outer0.z, r, g, b);
                    meshBuilder1.addQuad(inner0.x, inner0.y - 0.02, inner0.z, inner1.x, inner1.y - 0.02, inner1.z, outer1.x, outer1.y - 0.02, outer1.z, outer0.x, outer0.y - 0.02, outer0.z, r, g, b);
                    figureBoundingBox.addVector(outer0);
                }
                /** @type {?} */
                var figure = meshBuilder1.createFigure(this.stage, 'ROT_MARKER');
                figure.setIntersector(new modelstageweb.BoundingBoxIntersector(figureBoundingBox));
                selectionMarker.addFigure(figure);
                /** @type {?} */
                var sceneObjTranslation = this.scene.State.get('SceneObjectPos' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                /** @type {?} */
                var sceneObjRotation = this.scene.State.get('SceneObjectRot' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                selectionMarker.State.set('ModelTransform', psgeometry.Matrix4.FromRotation(sceneObjRotation.x, sceneObjRotation.y, sceneObjRotation.z).multiply(psgeometry.Matrix4.FromTranslation(sceneObjTranslation.x, sceneObjTranslation.y, sceneObjTranslation.z)));
                selectionMarker.Filter = new modelstageweb.GenericSceneItemFilterWebGL();
                this.scene.addSceneItem(selectionMarker, true);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        SelectionTool.prototype.handleMouseDown = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var viewRay = this.stage.Camera.getViewRay(e.clientX, e.clientY);
            /** @type {?} */
            var candidates = [];
            this.scene.getIntersectionCandidates(viewRay, candidates);
            /** @type {?} */
            var pickedObject = false;
            /** @type {?} */
            var currentIdx = 0;
            while (!pickedObject && currentIdx < candidates.length) {
                if (candidates[currentIdx].sceneItem instanceof modelstageweb.ActorWebGL) {
                    /** @type {?} */
                    var pickedActor = (/** @type {?} */ ((candidates[currentIdx].sceneItem)));
                    if (pickedActor.SceneItemID != SelectionTool.SelectionObjectID) {
                        if (pickedActor == this.selectedActor) {
                            this.interfaceController.pushTool(new MoveActorTool(pickedActor, this.stage.Camera, this.connection));
                        }
                        else {
                            this.selectedActor = pickedActor;
                            this.updateSelectionMarker();
                        }
                        pickedObject = true;
                    }
                    else {
                        this.interfaceController.pushTool(new RotateActorTool(this.selectedActor, this.stage.Camera, this.connection));
                        pickedObject = true;
                    }
                }
                currentIdx++;
            }
            if (!pickedObject) {
                this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
                this.selectedActor = null;
            }
        };
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        SelectionTool.prototype.handleMouseMove = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) {
        };
        /**
         * @param {?} e
         * @return {?}
         */
        SelectionTool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
        };
        SelectionTool.SelectionObjectID = 'SEL_MARKER';
        return SelectionTool;
    }(ActorManipulationTool));
    modelstage.SelectionTool = SelectionTool;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        SelectionTool.SelectionObjectID;
        /**
         * @type {?}
         * @private
         */
        SelectionTool.prototype.selectedActor;
        /**
         * @type {?}
         * @private
         */
        SelectionTool.prototype.scene;
        /**
         * @type {?}
         * @private
         */
        SelectionTool.prototype.stage;
    }
    var PlaceActorTool = /** @class */ (function (_super) {
        tslib_1.__extends(PlaceActorTool, _super);
        function PlaceActorTool(figureID, camera, connection) {
            var _this = _super.call(this, connection) || this;
            _this.camera = camera;
            _this.sceneObj = new SceneObject();
            _this.sceneObj.AssetID = figureID;
            _this.sceneObj.SceneObjectID = modelstageweb.uuidv4();
            _this.sceneObj.Location = new psgeometry.Vec4();
            _this.sceneObj.Rotation = new psgeometry.Vec4();
            _this.sceneObj.Scale = new psgeometry.Vec4(1, 1, 1, 1);
            SceneAppState.GlobalInstance.SceneObjects.append(_this.sceneObj);
            _this.sceneObjIdx = SceneAppState.GlobalInstance.SceneObjects.Count - 1;
            return _this;
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        PlaceActorTool.prototype.handleMouseMove = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) {
            /** @type {?} */
            var viewRay = this.camera.getViewRay(x, y);
            /** @type {?} */
            var p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                this.sceneObj = tslib_1.__assign({}, this.sceneObj);
                this.sceneObj.Location = new psgeometry.Vec4(p.x, 0, p.z);
                SceneAppState.GlobalInstance.SceneObjects.replace(this.sceneObj, this.sceneObjIdx);
                //this.updateActorTranslation(this.actor, p.x, 0, p.z);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        PlaceActorTool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.interfaceController.popTool();
        };
        return PlaceActorTool;
    }(ActorManipulationTool));
    modelstage.PlaceActorTool = PlaceActorTool;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PlaceActorTool.prototype.sceneObj;
        /**
         * @type {?}
         * @private
         */
        PlaceActorTool.prototype.sceneObjIdx;
        /**
         * @type {?}
         * @private
         */
        PlaceActorTool.prototype.camera;
    }
    /** @type {?} */
    var UserNames = {
        'Administrator': 'Administrator',
        'Arne': 'Arne Thurm',
        'Ulrich': 'Ulrich Bönkemeyer',
        'Tom': 'Tom Jachmann',
        'Zacharias': 'Zacharias Reinhardt'
    };
    /** @type {?} */
    var PeerColors = [
        [0.31, 0.02, 0.06, 1.00],
        [0.02, 0.17, 0.31, 1.00],
        [0.02, 0.31, 0.06, 1.00],
        [0.69, 0.34, 0.00, 1.00],
        [0.33, 0.00, 0.53, 1.00],
    ];
    var MoveActorTool = /** @class */ (function (_super) {
        tslib_1.__extends(MoveActorTool, _super);
        function MoveActorTool(actor, camera, connection) {
            var _this = _super.call(this, connection) || this;
            _this.actor = actor;
            _this.camera = camera;
            _this.isInitialized = false;
            return _this;
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        MoveActorTool.prototype.handleMouseMove = /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (e, x, y) {
            /** @type {?} */
            var viewRay = this.camera.getViewRay(x, y);
            /** @type {?} */
            var p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                if (this.isInitialized) {
                    var _a = tslib_1.__read(this.getSceneObj(this.actor.Data['SceneObjID']), 2), sceneObj = _a[0], sceneObjIdx = _a[1];
                    if (sceneObj) {
                        /** @type {?} */
                        var translatedSceneObj = tslib_1.__assign({}, sceneObj);
                        /** @type {?} */
                        var translation = translatedSceneObj.Location;
                        translatedSceneObj.Location = translatedSceneObj.Location.add(new psgeometry.Vec4(p.x - this.lastX, 0, p.z - this.lastZ));
                        SceneAppState.GlobalInstance.SceneObjects.replace(translatedSceneObj, sceneObjIdx);
                    }
                }
                this.lastX = p.x;
                this.lastZ = p.z;
                this.isInitialized = true;
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        MoveActorTool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.interfaceController.popTool();
        };
        return MoveActorTool;
    }(ActorManipulationTool));
    modelstage.MoveActorTool = MoveActorTool;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MoveActorTool.prototype.isInitialized;
        /**
         * @type {?}
         * @private
         */
        MoveActorTool.prototype.lastX;
        /**
         * @type {?}
         * @private
         */
        MoveActorTool.prototype.lastZ;
        /**
         * @type {?}
         * @private
         */
        MoveActorTool.prototype.actor;
        /**
         * @type {?}
         * @private
         */
        MoveActorTool.prototype.camera;
    }
    var RotateActorTool = /** @class */ (function (_super) {
        tslib_1.__extends(RotateActorTool, _super);
        function RotateActorTool(actor, camera, connection) {
            var _this = _super.call(this, connection) || this;
            _this.actor = actor;
            _this.camera = camera;
            return _this;
        }
        /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        RotateActorTool.prototype.handleDrag = /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        function (e, startX, startY, dX, dY) {
            /** @type {?} */
            var fac = 1;
            if (Math.abs(e.clientY - startY) > 300) {
                fac = 6;
            }
            else if (Math.abs(e.clientY - startY) > 200) {
                fac = 3;
            }
            else if (Math.abs(e.clientY - startY) > 100) {
                fac = 2;
            }
            var _a = tslib_1.__read(this.getSceneObj(this.actor.Data['SceneObjID']), 2), sceneObj = _a[0], sceneObjIdx = _a[1];
            if (sceneObj) {
                /** @type {?} */
                var rotatedSceneObj = tslib_1.__assign({}, sceneObj);
                /** @type {?} */
                var rotation = rotatedSceneObj.Rotation;
                rotatedSceneObj.Rotation = rotatedSceneObj.Rotation.add(new psgeometry.Vec4(dX / (fac * 100) * Math.PI, 0, 0));
                SceneAppState.GlobalInstance.SceneObjects.replace(rotatedSceneObj, sceneObjIdx);
            }
        };
        /**
         * @param {?} e
         * @return {?}
         */
        RotateActorTool.prototype.handleMouseUp = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.interfaceController.popTool();
        };
        return RotateActorTool;
    }(ActorManipulationTool));
    modelstage.RotateActorTool = RotateActorTool;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        RotateActorTool.prototype.actor;
        /**
         * @type {?}
         * @private
         */
        RotateActorTool.prototype.camera;
    }
    var DemoSceneWebGL = /** @class */ (function (_super) {
        tslib_1.__extends(DemoSceneWebGL, _super);
        function DemoSceneWebGL(stage, connection) {
            var _this = _super.call(this, new modelstageappstate.Director(modelstageappstate.AppState.GetInstance()), connection) || this;
            _this.spaceActor = new modelstageweb.ActorWebGL(_this, 'Space');
            _this.director.Scene = _this;
            _this.stage = stage;
            _this.spaceModel = new SpaceModel(_this, _this.stage, _this.spaceActor);
            /** @type {?} */
            var shaderProgram = new modelstageweb.OpaqueMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerShaderProgram('OpaqueMeshShader', shaderProgram);
            shaderProgram = new modelstageweb.TransparentMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerShaderProgram('TransparentMeshShader', shaderProgram);
            shaderProgram = new modelstageweb.TexturedMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerShaderProgram('TexturedMeshShader', shaderProgram);
            shaderProgram = new modelstageweb.MatCapShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerShaderProgram('MatCapMeshShader', shaderProgram);
            // Shadow shaders
            shaderProgram = new modelstageweb.ShadowTexturedMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerPhaseSpecificShaderProgram('Shadow', 'TexturedMeshShader', shaderProgram);
            shaderProgram = new modelstageweb.ShadowTexturedMeshShaderProgramWebGL();
            shaderProgram.initialize(stage);
            stage.registerPhaseSpecificShaderProgram('Shadow', 'MatCapMeshShader', shaderProgram);
            return _this;
        }
        Object.defineProperty(DemoSceneWebGL.prototype, "SpaceModel", {
            get: /**
             * @return {?}
             */
            function () { return this.spaceModel; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DemoSceneWebGL.prototype.initialize = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.addSceneItem(this.spaceActor, true);
            this.spaceModel.updateSpace();
            $.when(
            //                this.stage.AssetFactory.getFromUrl('/data/commonassets.psmesh'),
            this.stage.AssetFactory.getFromUrl('/data/hologem.psmesh'), 
            //                this.stage.AssetFactory.getFromUrl('/data/office_assets.psmesh'),
            this.stage.AssetFactory.getFromUrl('/data/office_assets_bake.psmesh')).done(function () {
                _this.IsInitialized = true;
            });
            /*        this.stage.AssetFactory.getFromUrl('/data/if5-office-1.psmesh')
                        .then((success) => {
                            let actor = new modelstageweb.ActorWebGL(this, 'actor');
                            for (let x in this.stage.AssetStore.Figures) {
                                actor.addFigure(this.stage.AssetStore.Figures[x]);
                            }
                            this.addSceneItem(actor, true);
            
                            this.stage.AssetFactory.getFromUrl('/data/assets.psmesh').then(() => {
                                this.IsInitialized = true;
                            });
                        })
                        .fail((req) => {
                        })
                        .progress((percentage) => {
                            document.title = percentage;
                        });
                    */
        };
        /**
         * @return {?}
         */
        DemoSceneWebGL.prototype.updateSpace = /**
         * @return {?}
         */
        function () {
            this.spaceModel.clearVertices();
            for (var i = 0; i < RoomAppState.GlobalInstance.Vertices.Count; ++i) {
                /** @type {?} */
                var vert = RoomAppState.GlobalInstance.Vertices.GetItemAt(i);
                this.spaceModel.addVertex(vert.x, vert.z);
            }
            this.spaceModel.updateSpace();
        };
        /**
         * @param {?} peerID
         * @param {?} peerColorIndex
         * @param {?} userName
         * @return {?}
         */
        DemoSceneWebGL.prototype.updatePeerInfo = /**
         * @param {?} peerID
         * @param {?} peerColorIndex
         * @param {?} userName
         * @return {?}
         */
        function (peerID, peerColorIndex, userName) {
            if (peerID != '-1') {
                /** @type {?} */
                var peerInfoID = 'peer-info-' + peerID;
                /** @type {?} */
                var peerInfoElement = $('#' + peerInfoID);
                if (peerInfoElement.length > 0) {
                    peerInfoElement.find('span').text(userName);
                }
                else {
                    $('#participants-view').append('<li id="' + peerInfoID + '"><img src="images/info/Lens' + peerColorIndex + '.png" /><span>' + userName + '</span></li>');
                }
            }
        };
        /**
         * @param {?} peerID
         * @return {?}
         */
        DemoSceneWebGL.prototype.removePeer = /**
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            this.removeSceneItem('Peer' + peerID);
            /** @type {?} */
            var peerInfoID = 'peer-info-' + peerID;
            /** @type {?} */
            var peerInfoElement = $('#' + peerInfoID);
            peerInfoElement.addClass('removing');
            setTimeout(function () {
                peerInfoElement.remove();
            }, 2000);
        };
        /**
         * @param {?} peerID
         * @return {?}
         */
        DemoSceneWebGL.prototype.getColorIndexFromPeerID = /**
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            return (parseInt(peerID) - 1) % PeerColors.length;
        };
        /**
         * @param {?} peerID
         * @return {?}
         */
        DemoSceneWebGL.prototype.createPeer = /**
         * @param {?} peerID
         * @return {?}
         */
        function (peerID) {
            /** @type {?} */
            var obj = new modelstageweb.ActorWebGL(this, 'Peer' + peerID);
            obj.addFigure(this.stage.AssetStore.Figures['hololens.hololens.000']);
            // TODO @UB: do this the right way...
            obj.Figures[0].ShaderInstances[0].ShaderKey = 'MatCapMeshShader';
            /** @type {?} */
            var colorIndex = this.getColorIndexFromPeerID(peerID);
            obj.State.set('Color', new psgeometry.Vec4(PeerColors[colorIndex][0], PeerColors[colorIndex][1], PeerColors[colorIndex][2], PeerColors[colorIndex][3]));
            obj.State.set('ModelTransform', function (state) {
                /** @type {?} */
                var pos = state.get('HeadPos' + peerID, psgeometry.Vec4.Zero);
                /** @type {?} */
                var cursor = state.get('CursPos' + peerID, psgeometry.Vec4.Zero);
                /** @type {?} */
                var dir = cursor.sub(pos);
                /** @type {?} */
                var spherical = psgeometry.Spherical.FromCartesianVector(dir);
                return ((/** @type {?} */ (psgeometry.Matrix4.FromRotationX(-spherical.azimuth).multiply(psgeometry.Matrix4.FromRotationY(-spherical.polar))))).multiply(psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z));
            });
            this.addSceneItem(obj, true /* makeVisible */);
            obj.TestIntersection = false;
            obj.TestChildrenIntersection = false;
            return obj;
        };
        /**
         * @param {?} objectID
         * @param {?} assetID
         * @return {?}
         */
        DemoSceneWebGL.prototype.createSceneObject = /**
         * @param {?} objectID
         * @param {?} assetID
         * @return {?}
         */
        function (objectID, assetID) {
            /** @type {?} */
            var suffix = objectID;
            /** @type {?} */
            var obj = new modelstageweb.ActorWebGL(this, 'SceneObject' + suffix);
            obj.State.set('ModelTransform', function (state) {
                /** @type {?} */
                var pos = state.get('SceneObjectPos' + suffix, psgeometry.Vec4.Zero);
                /** @type {?} */
                var rot = state.get('SceneObjectRot' + suffix, psgeometry.Vec4.Zero);
                /** @type {?} */
                var scale = state.get('SceneObjectScale' + suffix, psgeometry.Vec4.One);
                return (/** @type {?} */ (psgeometry.Matrix4.FromRotation(rot.x, rot.y, rot.z).multiply(psgeometry.Matrix4.FromScaling(scale.x, scale.y, scale.z).multiply(psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z)))));
            });
            obj.addFigure(this.stage.AssetStore.getFigure(assetID));
            obj.Data['SceneObjID'] = suffix;
            return obj;
        };
        return DemoSceneWebGL;
    }(modelstageappstate.DirectedSceneWebGL));
    modelstage.DemoSceneWebGL = DemoSceneWebGL;
    if (false) {
        /**
         * @type {?}
         * @private
         */
        DemoSceneWebGL.prototype.stage;
        /**
         * @type {?}
         * @private
         */
        DemoSceneWebGL.prototype.spaceActor;
        /**
         * @type {?}
         * @private
         */
        DemoSceneWebGL.prototype.spaceModel;
    }
    var RoomAppState = /** @class */ (function (_super) {
        tslib_1.__extends(RoomAppState, _super);
        function RoomAppState() {
            var _this = _super.call(this) || this;
            _this.FloorLevel = new modelstageappstate.AppStateFloatValue();
            _this.MasterView = new modelstageappstate.AppStateVector4Value();
            _this.Vertices = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            RoomAppState.GlobalInstance = _this;
            return _this;
        }
        /**
         * @return {?}
         */
        RoomAppState.prototype.registerEntries = /**
         * @return {?}
         */
        function () {
            this.registerEntry('FloorLevel', this.FloorLevel);
            this.registerEntry('MasterView', this.MasterView);
            this.registerEntry('Vertices', this.Vertices);
        };
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        RoomAppState.prototype.readValue = /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        function (key, reader) {
            if (key == 'Vertices') {
                return reader.Reader.readVec4();
            }
            else {
                return _super.prototype.readValue.call(this, key, reader);
            }
        };
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        RoomAppState.prototype.applyChanges = /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        function (scene, peerID, instanceID) {
            if (this.FloorLevel.isDirty()) {
                scene.State.set('FloorLevel', this.FloorLevel.get());
                ((/** @type {?} */ (scene))).SpaceModel.FloorLevel = this.FloorLevel.get();
            }
            if (this.MasterView.isDirty()) {
                scene.State.set('MasterViewPos', this.MasterView.get());
            }
            if (this.Vertices.isDirty()) {
                /** @type {?} */
                var sc = (/** @type {?} */ (scene));
                ((/** @type {?} */ (scene))).updateSpace();
            }
        };
        RoomAppState.ClusterTypeID = 'Room';
        return RoomAppState;
    }(modelstageappstate.AppStateCluster));
    modelstage.RoomAppState = RoomAppState;
    if (false) {
        /** @type {?} */
        RoomAppState.ClusterTypeID;
        /** @type {?} */
        RoomAppState.GlobalInstance;
        /** @type {?} */
        RoomAppState.prototype.FloorLevel;
        /** @type {?} */
        RoomAppState.prototype.MasterView;
        /** @type {?} */
        RoomAppState.prototype.Vertices;
    }
    var SceneObject = /** @class */ (function () {
        function SceneObject() {
        }
        return SceneObject;
    }());
    if (false) {
        /** @type {?} */
        SceneObject.prototype.SceneObjectID;
        /** @type {?} */
        SceneObject.prototype.AssetID;
        /** @type {?} */
        SceneObject.prototype.Location;
        /** @type {?} */
        SceneObject.prototype.Rotation;
        /** @type {?} */
        SceneObject.prototype.Scale;
    }
    var SceneAppState = /** @class */ (function (_super) {
        tslib_1.__extends(SceneAppState, _super);
        function SceneAppState() {
            var _this = _super.call(this) || this;
            _this.SceneObjects = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            SceneAppState.GlobalInstance = _this;
            return _this;
        }
        /**
         * @return {?}
         */
        SceneAppState.prototype.registerEntries = /**
         * @return {?}
         */
        function () {
            this.registerEntry('Obj', this.SceneObjects);
        };
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        SceneAppState.prototype.readValue = /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        function (key, reader) {
            if (key == 'Obj') {
                /** @type {?} */
                var value = new SceneObject();
                value.SceneObjectID = reader.Reader.readCharArray(40);
                value.AssetID = reader.Reader.readCharArray(40);
                value.Location = reader.Reader.readVec4();
                value.Rotation = reader.Reader.readVec4();
                value.Scale = reader.Reader.readVec4();
                return value;
            }
            else {
                return _super.prototype.readValue.call(this, key, reader);
            }
        };
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        SceneAppState.prototype.writeValue = /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (key, writer, value) {
            if (key == 'Obj') {
                writer.Writer.writeCharArray(value.SceneObjectID, 40);
                writer.Writer.writeCharArray(value.AssetID, 40);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeVec4(value.Rotation);
                writer.Writer.writeVec4(psgeometry.Vec4.One);
            }
            else {
                _super.prototype.writeValue.call(this, key, writer, value);
            }
        };
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        SceneAppState.prototype.applyChanges = /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        function (scene, peerID, instanceID) {
            if (this.SceneObjects.isDirty()) {
                /** @type {?} */
                var sc_1 = (/** @type {?} */ ((scene)));
                this.SceneObjects.Operations.forEach(function (operation) {
                    if (operation.Operation == modelstageappstate.OperationType.Append) {
                        /** @type {?} */
                        var objID = operation.NewValue.SceneObjectID;
                        /** @type {?} */
                        var assetID = operation.NewValue.AssetID;
                        sc_1.addSceneItem(sc_1.createSceneObject(objID, assetID), true /* makeVisible */);
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                        //scene.RunSequence("ShowSceneObject", std::string{ "ShowSceneObject" } +noteID, { { "SceneObjectID", objID } });
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Replace) {
                        /** @type {?} */
                        var objID = operation.NewValue.SceneObjectID;
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Remove) {
                        /** @type {?} */
                        var objID = operation.PreviousValue.SceneObjectID;
                        scene.removeSceneItem('SceneObject' + objID);
                    }
                });
            }
        };
        SceneAppState.ClusterTypeID = 'Obj';
        return SceneAppState;
    }(modelstageappstate.AppStateCluster));
    modelstage.SceneAppState = SceneAppState;
    if (false) {
        /** @type {?} */
        SceneAppState.ClusterTypeID;
        /** @type {?} */
        SceneAppState.GlobalInstance;
        /** @type {?} */
        SceneAppState.prototype.SceneObjects;
    }
    var PeerAppState = /** @class */ (function (_super) {
        tslib_1.__extends(PeerAppState, _super);
        function PeerAppState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.headPos = new modelstageappstate.AppStateVector4Value();
            _this.cursorPos = new modelstageappstate.AppStateVector4Value();
            _this.userID = new modelstageappstate.AppStateStringValue();
            _this.active = new modelstageappstate.AppStateBoolValue();
            return _this;
        }
        /**
         * @return {?}
         */
        PeerAppState.prototype.providesInitializationData = /**
         * @return {?}
         */
        function () {
            return true;
        };
        /**
         * @return {?}
         */
        PeerAppState.prototype.registerEntries = /**
         * @return {?}
         */
        function () {
            this.registerEntry('Head', this.headPos);
            this.registerEntry('Curs', this.cursorPos);
            this.registerEntry('User', this.userID);
            this.registerEntry('Active', this.active);
        };
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        PeerAppState.prototype.applyChanges = /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        function (scene, peerID, instanceID) {
            /** @type {?} */
            var sc = (/** @type {?} */ (scene));
            if (peerID.length > 0 && (this.headPos.isDirty() || this.cursorPos.isDirty())) {
                if (!sc.getSceneItem('Peer' + peerID)) {
                    sc.createPeer(peerID);
                }
                /** @type {?} */
                var levelOfs = new psgeometry.Vec4(0, -sc.SpaceModel.FloorLevel, 0, 0);
                /** @type {?} */
                var headPos = this.headPos.get();
                /** @type {?} */
                var cursorPos = this.cursorPos.get();
                if (headPos && cursorPos) {
                    scene.State.set('HeadPos' + peerID, headPos.add(levelOfs));
                    scene.State.set('CursPos' + peerID, cursorPos.add(levelOfs));
                }
            }
            if (this.userID.isDirty()) {
                /** @type {?} */
                var userName = UserNames[this.userID.get()] || '';
                sc.updatePeerInfo(peerID, sc.getColorIndexFromPeerID(peerID), userName);
            }
            if (this.active.isDirty()) {
                if (!this.active.get()) {
                    sc.removePeer(peerID);
                }
            }
        };
        PeerAppState.ClusterTypeID = 'Peer';
        return PeerAppState;
    }(modelstageappstate.AppStateCluster));
    modelstage.PeerAppState = PeerAppState;
    if (false) {
        /** @type {?} */
        PeerAppState.ClusterTypeID;
        /**
         * @type {?}
         * @private
         */
        PeerAppState.prototype.headPos;
        /**
         * @type {?}
         * @private
         */
        PeerAppState.prototype.cursorPos;
        /**
         * @type {?}
         * @private
         */
        PeerAppState.prototype.userID;
        /**
         * @type {?}
         * @private
         */
        PeerAppState.prototype.active;
    }
    var Note = /** @class */ (function () {
        function Note() {
        }
        return Note;
    }());
    if (false) {
        /** @type {?} */
        Note.prototype.NoteID;
        /** @type {?} */
        Note.prototype.NoteType;
        /** @type {?} */
        Note.prototype.OwnerID;
        /** @type {?} */
        Note.prototype.AssignedToID;
        /** @type {?} */
        Note.prototype.Location;
        /** @type {?} */
        Note.prototype.AzimuthalRotation;
    }
    ;
    var NotesAppState = /** @class */ (function (_super) {
        tslib_1.__extends(NotesAppState, _super);
        function NotesAppState() {
            var _this = _super.call(this) || this;
            _this.Notes = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            NotesAppState.GlobalInstance = _this;
            return _this;
        }
        /**
         * @return {?}
         */
        NotesAppState.prototype.registerEntries = /**
         * @return {?}
         */
        function () {
            this.registerEntry('Notes', this.Notes);
        };
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        NotesAppState.prototype.readValue = /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        function (key, reader) {
            if (key == 'Notes') {
                /** @type {?} */
                var value = new Note();
                value.NoteID = reader.Reader.readCharArray(20);
                value.NoteType = reader.Reader.readUInt32();
                value.OwnerID = reader.Reader.readCharArray(10);
                value.Location = reader.Reader.readVec4();
                value.AzimuthalRotation = reader.Reader.readFloat32();
                return value;
            }
            else {
                return _super.prototype.readValue.call(this, key, reader);
            }
        };
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        NotesAppState.prototype.writeValue = /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        function (key, writer, value) {
            if (key == 'Notes') {
                writer.Writer.writeCharArray(value.NoteID, 20);
                writer.Writer.writeInt32(value.NoteType);
                writer.Writer.writeCharArray(value.OwnerID, 10);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeFloat32(value.AzimuthalRotation);
            }
            else {
                _super.prototype.writeValue.call(this, key, writer, value);
            }
        };
        NotesAppState.ClusterTypeID = 'Notes';
        return NotesAppState;
    }(modelstageappstate.AppStateCluster));
    modelstage.NotesAppState = NotesAppState;
    if (false) {
        /** @type {?} */
        NotesAppState.ClusterTypeID;
        /** @type {?} */
        NotesAppState.GlobalInstance;
        /** @type {?} */
        NotesAppState.prototype.Notes;
    }
})(modelstage || (modelstage = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzdGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tb2RlbHN0YWdlLyIsInNvdXJjZXMiOlsic3JjL21vZGVsc3RhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsTUFBTSxLQUFRLFVBQVUsQ0F5N0J2QjtBQXo3QkQsV0FBYyxVQUFVO0lBRXBCO1FBS0k7UUFDQSxDQUFDOzs7OztRQUxNLDhCQUFjOzs7O1FBQXJCLFVBQXNCLFFBQThCO1lBQ2hELE9BQU8sTUFBTSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFJTCxZQUFDO0lBQUQsQ0FBQyxBQVBELElBT0M7SUFFRDtRQVVJLG9CQUFvQixLQUFxQixFQUFVLEtBQStCLEVBQVUsS0FBK0I7WUFBdkcsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUEwQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQTBCO1lBUm5ILGFBQVEsR0FBMkIsRUFBRSxDQUFDO1lBRXRDLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFPL0IsQ0FBQztRQUxELHNCQUFXLGtDQUFVOzs7O1lBQXJCLGNBQTBCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7O1lBRW5ELFVBQXNCLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7OztXQUZoQjs7Ozs7OztRQU8zQyx5Q0FBb0I7Ozs7OztRQUE1QixVQUE2QixzQkFBNEQsRUFBRSxtQkFBc0Q7WUFDN0ksbUJBQW1CLENBQUMsT0FBTyxDQUN2QixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDckIsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNwQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNuQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQ3BCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXpCLHNCQUFzQixDQUFDLE9BQU8sQ0FDMUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUNmLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTdCLHNCQUFzQixDQUFDLE9BQU8sQ0FDMUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU3QixzQkFBc0IsQ0FBQyxPQUFPLENBQzFCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFDZixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQ2YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUNkLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVoQyxzQkFBc0IsQ0FBQyxPQUFPLENBQzFCLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFDZCxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7Ozs7OztRQUVPLDRDQUF1Qjs7Ozs7O1FBQS9CLFVBQWdDLHNCQUE0RCxFQUFFLG1CQUFzRDs7Z0JBRTVJLE1BQU0sR0FBRyxLQUFLOztnQkFFZCxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO1lBRXJDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEM7O2dCQUNHLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ2pCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbEMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUMsbUJBQW1CLENBQUMsTUFBTSxDQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUNySSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFDckosSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcs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QyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTNGLGFBQWE7Z0JBQ2IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUzRixpQkFBaUI7Z0JBQ2pCLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBRyxDQUFDLElBQUksRUFBRSxLQUFHLENBQUMsSUFBSSxFQUFFLEtBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFM0YsZUFBZSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQzs7b0JBRTFFLGlCQUFpQixHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFFL0Msb0NBQXdCLEVBQXZCLFNBQUMsRUFBRSxTQUFDLEVBQUUsU0FBQyxDQUFpQjs7b0JBQ3JCLFlBQVksR0FBRyxJQUFJLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRTs7b0JBQ2xELFlBQVksR0FBRyxFQUFFOztvQkFDakIsT0FBTyxHQUFHLENBQUM7O29CQUNYLE9BQU8sR0FBRyxHQUFHO2dCQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFOzt3QkFDL0IsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFlBQVksR0FBRyxDQUFDOzt3QkFDdkMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O3dCQUM3QyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzs7d0JBQzlHLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDOzt3QkFDOUcsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7O3dCQUM5RyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDbEgsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ3BELE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDbkMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUNuQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ25DLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRWIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ3BELE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDbkMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUNuQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ25DLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRWIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ3BELE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDbkMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUNuQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ25DLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRWIsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN2Qzs7b0JBQ0csTUFBTSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUM7Z0JBQ2hFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxhQUFhLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUNuRixlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztvQkFFOUIsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztvQkFDMUgsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMzSCxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFM1AsZUFBZSxDQUFDLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2dCQUN6RSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEQ7UUFDTCxDQUFDOzs7OztRQUVNLHVDQUFlOzs7O1FBQXRCLFVBQXVCLENBQWU7O2dCQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7Z0JBQzVELFVBQVUsR0FBK0MsRUFBRTtZQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzs7Z0JBRXRELFlBQVksR0FBRyxLQUFLOztnQkFDcEIsVUFBVSxHQUFHLENBQUM7WUFFbEIsT0FBTyxDQUFDLFlBQVksSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFFcEQsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxZQUFZLGFBQWEsQ0FBQyxVQUFVLEVBQUU7O3dCQUVsRSxXQUFXLEdBQUcsbUJBQTBCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFBO29CQUM5RSxJQUFJLFdBQVcsQ0FBQyxXQUFXLElBQUksYUFBYSxDQUFDLGlCQUFpQixFQUFFO3dCQUM1RCxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFOzRCQUNuQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt5QkFDekc7NkJBQU07NEJBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7NEJBQ2pDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO3lCQUNoQzt3QkFFRCxZQUFZLEdBQUcsSUFBSSxDQUFDO3FCQUN2Qjt5QkFBTTt3QkFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBRS9HLFlBQVksR0FBRyxJQUFJLENBQUM7cUJBQ3ZCO2lCQUNKO2dCQUNELFVBQVUsRUFBRSxDQUFDO2FBQ2hCO1lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFFNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7YUFDN0I7UUFDTCxDQUFDOzs7Ozs7O1FBRU0sdUNBQWU7Ozs7OztRQUF0QixVQUF1QixDQUFlLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDNUQsQ0FBQzs7Ozs7UUFFTSxxQ0FBYTs7OztRQUFwQixVQUFxQixDQUFlO1FBQ3BDLENBQUM7UUFsS3VCLCtCQUFpQixHQUFHLFlBQVksQ0FBQztRQW1LN0Qsb0JBQUM7S0FBQSxBQXBLRCxDQUFtQyxxQkFBcUIsR0FvS3ZEO0lBcEtZLHdCQUFhLGdCQW9LekIsQ0FBQTs7Ozs7O1FBbktHLGdDQUF5RDs7Ozs7UUFFekQsc0NBQWdEOzs7OztRQUVwQyw4QkFBdUM7Ozs7O1FBQUUsOEJBQXVDOztJQWlLaEc7UUFBb0MsMENBQXFCO1FBS3JELHdCQUFZLFFBQWdCLEVBQVUsTUFBaUMsRUFBRSxVQUEwQztZQUFuSCxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQVdwQjtZQVpxQyxZQUFNLEdBQU4sTUFBTSxDQUEyQjtZQUduRSxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNyRCxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsYUFBYSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoRSxLQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7O1FBQzNFLENBQUM7Ozs7Ozs7UUFFTSx3Q0FBZTs7Ozs7O1FBQXRCLFVBQXVCLENBQWtDLEVBQUUsQ0FBUyxFQUFFLENBQVM7O2dCQUN2RSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Z0JBQ3RDLENBQUMsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUYsSUFBSSxDQUFDLEVBQUU7Z0JBQ0gsSUFBSSxDQUFDLFFBQVEsd0JBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxhQUFhLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ25GLHVEQUF1RDthQUMxRDtRQUNMLENBQUM7Ozs7O1FBRU0sc0NBQWE7Ozs7UUFBcEIsVUFBcUIsQ0FBZTtZQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVMLHFCQUFDO0lBQUQsQ0FBQyxBQWxDRCxDQUFvQyxxQkFBcUIsR0FrQ3hEO0lBbENZLHlCQUFjLGlCQWtDMUIsQ0FBQTs7Ozs7O1FBakNHLGtDQUE4Qjs7Ozs7UUFFOUIscUNBQTRCOzs7OztRQUVFLGdDQUF5Qzs7O1FBK0J2RSxTQUFTLEdBQUc7UUFDWixlQUFlLEVBQUUsZUFBZTtRQUNoQyxNQUFNLEVBQUUsWUFBWTtRQUNwQixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLEtBQUssRUFBRSxjQUFjO1FBQ3JCLFdBQVcsRUFBRSxxQkFBcUI7S0FDckM7O1FBRUcsVUFBVSxHQUFHO1FBQ2IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDeEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDeEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDeEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDeEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7S0FJM0I7SUFFRDtRQUFtQyx5Q0FBcUI7UUFLcEQsdUJBQW9CLEtBQStCLEVBQVUsTUFBaUMsRUFBRSxVQUEwQztZQUExSSxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUNwQjtZQUZtQixXQUFLLEdBQUwsS0FBSyxDQUEwQjtZQUFVLFlBQU0sR0FBTixNQUFNLENBQTJCO1lBSnRGLG1CQUFhLEdBQUcsS0FBSyxDQUFDOztRQU05QixDQUFDOzs7Ozs7O1FBRU0sdUNBQWU7Ozs7OztRQUF0QixVQUF1QixDQUFrQyxFQUFFLENBQVMsRUFBRSxDQUFTOztnQkFDdkUsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O2dCQUN0QyxDQUFDLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFGLElBQUksQ0FBQyxFQUFFO2dCQUNILElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDaEIsSUFBQSx1RUFBeUUsRUFBeEUsZ0JBQVEsRUFBRSxtQkFBOEQ7b0JBQzdFLElBQUksUUFBUSxFQUFFOzs0QkFDTixrQkFBa0Isd0JBQXFCLFFBQVEsQ0FBRTs7NEJBQ2pELFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRO3dCQUM3QyxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUMxSCxhQUFhLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUM7cUJBQ3RGO2lCQUNKO2dCQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzthQUM3QjtRQUNMLENBQUM7Ozs7O1FBRU0scUNBQWE7Ozs7UUFBcEIsVUFBcUIsQ0FBZTtZQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVMLG9CQUFDO0lBQUQsQ0FBQyxBQWhDRCxDQUFtQyxxQkFBcUIsR0FnQ3ZEO0lBaENZLHdCQUFhLGdCQWdDekIsQ0FBQTs7Ozs7O1FBL0JHLHNDQUE4Qjs7Ozs7UUFDOUIsOEJBQXNCOzs7OztRQUN0Qiw4QkFBc0I7Ozs7O1FBRVYsOEJBQXVDOzs7OztRQUFFLCtCQUF5Qzs7SUE2QmxHO1FBQXFDLDJDQUFxQjtRQUN0RCx5QkFBb0IsS0FBK0IsRUFBVSxNQUFpQyxFQUFFLFVBQTBDO1lBQTFJLFlBQ0ksa0JBQU0sVUFBVSxDQUFDLFNBQ3BCO1lBRm1CLFdBQUssR0FBTCxLQUFLLENBQTBCO1lBQVUsWUFBTSxHQUFOLE1BQU0sQ0FBMkI7O1FBRTlGLENBQUM7Ozs7Ozs7OztRQUVNLG9DQUFVOzs7Ozs7OztRQUFqQixVQUFrQixDQUFlLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxFQUFVLEVBQUUsRUFBVTs7Z0JBRWpGLEdBQUcsR0FBRyxDQUFDO1lBQ1gsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFO2dCQUNwQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO2FBQ1Y7aUJBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFO2dCQUMzQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO2FBQ1Y7aUJBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFO2dCQUMzQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO2FBQ1Y7WUFFRyxJQUFBLHVFQUF5RSxFQUF4RSxnQkFBUSxFQUFFLG1CQUE4RDtZQUM3RSxJQUFJLFFBQVEsRUFBRTs7b0JBQ04sZUFBZSx3QkFBcUIsUUFBUSxDQUFFOztvQkFDOUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRO2dCQUN2QyxlQUFlLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0csYUFBYSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUNuRjtRQUNMLENBQUM7Ozs7O1FBRU0sdUNBQWE7Ozs7UUFBcEIsVUFBcUIsQ0FBZTtZQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVMLHNCQUFDO0lBQUQsQ0FBQyxBQTdCRCxDQUFxQyxxQkFBcUIsR0E2QnpEO0lBN0JZLDBCQUFlLGtCQTZCM0IsQ0FBQTs7Ozs7O1FBNUJlLGdDQUF1Qzs7Ozs7UUFBRSxpQ0FBeUM7O0lBOEJsRztRQUFvQywwQ0FBcUM7UUFVckUsd0JBQVksS0FBK0IsRUFBRSxVQUEwQztZQUF2RixZQUNJLGtCQUFNLElBQUksa0JBQWtCLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxTQStCaEc7WUF0Q08sZ0JBQVUsR0FBNkIsSUFBSSxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQVF2RixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUM7WUFDM0IsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFFbkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxLQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O2dCQUVoRSxhQUFhLEdBQXFDLElBQUksYUFBYSxDQUFDLDRCQUE0QixFQUFFO1lBQ3RHLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRS9ELGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDO1lBQ3RFLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLHVCQUF1QixFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRXBFLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1lBQ25FLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRWpFLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQzdELGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRS9ELGlCQUFpQjtZQUVqQixhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsb0NBQW9DLEVBQUUsQ0FBQztZQUN6RSxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFeEYsYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLG9DQUFvQyxFQUFFLENBQUM7WUFDekUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDOztRQUMxRixDQUFDO1FBbENELHNCQUFXLHNDQUFVOzs7O1lBQXJCLGNBQTBCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7OztXQUFBOzs7O1FBb0M1QyxtQ0FBVTs7O1FBQWpCO1lBQUEsaUJBZ0NDO1lBL0JHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTlCLENBQUMsQ0FBQyxJQUFJO1lBQ2xCLGtGQUFrRjtZQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUM7WUFDMUUsbUZBQW1GO1lBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUN4RSxDQUFDLElBQUksQ0FBQztnQkFDSCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUVIOzs7Ozs7Ozs7Ozs7Ozs7OztzQkFpQlU7UUFFZCxDQUFDOzs7O1FBRU0sb0NBQVc7OztRQUFsQjtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTs7b0JBQzdELElBQUksR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QztZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsQ0FBQzs7Ozs7OztRQUVNLHVDQUFjOzs7Ozs7UUFBckIsVUFBc0IsTUFBYyxFQUFFLGNBQXNCLEVBQUUsUUFBZ0I7WUFDMUUsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFOztvQkFDWixVQUFVLEdBQUcsWUFBWSxHQUFHLE1BQU07O29CQUVsQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7Z0JBRXpDLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzVCLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTTtvQkFDSCxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsR0FBRyw4QkFBOEIsR0FBRyxjQUFjLEdBQUcsZ0JBQWdCLEdBQUcsUUFBUSxHQUFHLGNBQWMsQ0FBQyxDQUFDO2lCQUM1SjthQUNKO1FBQ0wsQ0FBQzs7Ozs7UUFFTSxtQ0FBVTs7OztRQUFqQixVQUFrQixNQUFjO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDOztnQkFFbEMsVUFBVSxHQUFHLFlBQVksR0FBRyxNQUFNOztnQkFDbEMsZUFBZSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO1lBQ3pDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsVUFBVSxDQUFDO2dCQUNQLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM3QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDYixDQUFDOzs7OztRQUVNLGdEQUF1Qjs7OztRQUE5QixVQUErQixNQUFjO1lBQ3pDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUN0RCxDQUFDOzs7OztRQUVNLG1DQUFVOzs7O1FBQWpCLFVBQWtCLE1BQWM7O2dCQUN4QixHQUFHLEdBQTZCLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN2RixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7WUFDdEUscUNBQXFDO1lBQ3JDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQzs7Z0JBRTdELFVBQVUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDO1lBRXJELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4SixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLEtBQWdDOztvQkFDekQsR0FBRyxHQUFvQixLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O29CQUMxRSxNQUFNLEdBQW9CLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7b0JBQzdFLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7b0JBRXJCLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztnQkFFN0QsT0FBTyxDQUFDLG1CQUFvQixVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQ3JGLFVBQVUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FDN0QsVUFBVSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDL0MsR0FBRyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM3QixHQUFHLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO1lBQ3JDLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQzs7Ozs7O1FBRU0sMENBQWlCOzs7OztRQUF4QixVQUF5QixRQUFnQixFQUFFLE9BQWU7O2dCQUNsRCxNQUFNLEdBQUcsUUFBUTs7Z0JBRWpCLEdBQUcsR0FBRyxJQUFJLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDcEUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxLQUFnQzs7b0JBQ3pELEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7b0JBQ2hFLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7b0JBQ2hFLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFFdkUsT0FBTyxtQkFBb0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQ3BGLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUM5RCxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQSxDQUFDO1lBQ3RFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4RCxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUVoQyxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFFTCxxQkFBQztJQUFELENBQUMsQUFsS0QsQ0FBb0Msa0JBQWtCLENBQUMsa0JBQWtCLEdBa0t4RTtJQWxLWSx5QkFBYyxpQkFrSzFCLENBQUE7Ozs7OztRQWhLRywrQkFBd0M7Ozs7O1FBRXhDLG9DQUEyRjs7Ozs7UUFFM0Ysb0NBQStCOztJQThKbkM7UUFBa0Msd0NBQWtDO1FBV2hFO1lBQUEsWUFDSSxpQkFBTyxTQUVWO1lBVE0sZ0JBQVUsR0FBMEMsSUFBSSxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBRWhHLGdCQUFVLEdBQTRDLElBQUksa0JBQWtCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUVwRyxjQUFRLEdBQTJELElBQUksa0JBQWtCLENBQUMsa0JBQWtCLENBQWtCLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFJakwsWUFBWSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUM7O1FBQ3ZDLENBQUM7Ozs7UUFFTSxzQ0FBZTs7O1FBQXRCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsQ0FBQzs7Ozs7O1FBRU0sZ0NBQVM7Ozs7O1FBQWhCLFVBQWlCLEdBQVcsRUFBRSxNQUE4QztZQUN4RSxJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUU7Z0JBQ25CLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNuQztpQkFBTTtnQkFDSCxPQUFPLGlCQUFNLFNBQVMsWUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDdkM7UUFDTCxDQUFDOzs7Ozs7O1FBRU0sbUNBQVk7Ozs7OztRQUFuQixVQUFvQixLQUErQixFQUFFLE1BQWMsRUFBRSxVQUFrQjtZQUNuRixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzNCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELENBQUMsbUJBQWdCLEtBQUssRUFBQSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3pFO1lBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUMzQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFOztvQkFDckIsRUFBRSxHQUFHLG1CQUFnQixLQUFLLEVBQUE7Z0JBQzlCLENBQUMsbUJBQWdCLEtBQUssRUFBQSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDekM7UUFDTCxDQUFDO1FBekNNLDBCQUFhLEdBQUcsTUFBTSxDQUFDO1FBMENsQyxtQkFBQztLQUFBLEFBM0NELENBQWtDLGtCQUFrQixDQUFDLGVBQWUsR0EyQ25FO0lBM0NZLHVCQUFZLGVBMkN4QixDQUFBOzs7UUExQ0csMkJBQThCOztRQUU5Qiw0QkFBb0M7O1FBRXBDLGtDQUF1Rzs7UUFFdkcsa0NBQTJHOztRQUUzRyxnQ0FBcUw7O0lBb0N6TDtRQUFBO1FBVUEsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FBQyxBQVZELElBVUM7OztRQVRHLG9DQUE2Qjs7UUFFN0IsOEJBQXVCOztRQUV2QiwrQkFBaUM7O1FBRWpDLCtCQUFpQzs7UUFFakMsNEJBQThCOztJQUdsQztRQUFtQyx5Q0FBa0M7UUFPakU7WUFBQSxZQUNJLGlCQUFPLFNBRVY7WUFMTSxrQkFBWSxHQUF1RCxJQUFJLGtCQUFrQixDQUFDLGtCQUFrQixDQUFjLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFJN0ssYUFBYSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUM7O1FBQ3hDLENBQUM7Ozs7UUFFTSx1Q0FBZTs7O1FBQXRCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pELENBQUM7Ozs7OztRQUVNLGlDQUFTOzs7OztRQUFoQixVQUFpQixHQUFXLEVBQUUsTUFBOEM7WUFDeEUsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFOztvQkFDVixLQUFLLEdBQUcsSUFBSSxXQUFXLEVBQUU7Z0JBRTdCLEtBQUssQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hELEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDMUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMxQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRXZDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNILE9BQU8saUJBQU0sU0FBUyxZQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN2QztRQUNMLENBQUM7Ozs7Ozs7UUFFTSxrQ0FBVTs7Ozs7O1FBQWpCLFVBQWtCLEdBQVcsRUFBRSxNQUE4QyxFQUFFLEtBQVU7WUFDckYsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNILGlCQUFNLFVBQVUsWUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3hDO1FBQ0wsQ0FBQzs7Ozs7OztRQUVNLG9DQUFZOzs7Ozs7UUFBbkIsVUFBb0IsS0FBK0IsRUFBRSxNQUFjLEVBQUUsVUFBa0I7WUFDbkYsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFFOztvQkFDekIsSUFBRSxHQUFHLG1CQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFBO2dCQUVoQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO29CQUMzQyxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksa0JBQWtCLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTs7NEJBQzVELEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWE7OzRCQUN4QyxPQUFPLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPO3dCQUN4QyxJQUFFLENBQUMsWUFBWSxDQUFDLElBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7d0JBQzlFLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLEtBQUssRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN2RSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDdkUsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3RFLGlIQUFpSDtxQkFDcEg7eUJBQ0ksSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7OzRCQUNsRSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhO3dCQUM1QyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDdkUsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3ZFLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLEtBQUssRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN6RTt5QkFDSSxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksa0JBQWtCLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTs7NEJBQ2pFLEtBQUssR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLGFBQWE7d0JBQ2pELEtBQUssQ0FBQyxlQUFlLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxDQUFDO3FCQUNoRDtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztRQXJFTSwyQkFBYSxHQUFHLEtBQUssQ0FBQztRQXVFakMsb0JBQUM7S0FBQSxBQXhFRCxDQUFtQyxrQkFBa0IsQ0FBQyxlQUFlLEdBd0VwRTtJQXhFWSx3QkFBYSxnQkF3RXpCLENBQUE7OztRQXZFRyw0QkFBNkI7O1FBRTdCLDZCQUFxQzs7UUFFckMscUNBQWlMOztJQXFFckw7UUFBa0Msd0NBQWtDO1FBQXBFO1lBQUEscUVBZ0RDO1lBN0NXLGFBQU8sR0FBNEMsSUFBSSxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBRWpHLGVBQVMsR0FBNEMsSUFBSSxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBRW5HLFlBQU0sR0FBMkMsSUFBSSxrQkFBa0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRTlGLFlBQU0sR0FBeUMsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOztRQXVDdEcsQ0FBQzs7OztRQXJDVSxpREFBMEI7OztRQUFqQztZQUNJLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7Ozs7UUFFTSxzQ0FBZTs7O1FBQXRCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLENBQUM7Ozs7Ozs7UUFFTSxtQ0FBWTs7Ozs7O1FBQW5CLFVBQW9CLEtBQStCLEVBQUUsTUFBYyxFQUFFLFVBQWtCOztnQkFDL0UsRUFBRSxHQUFHLG1CQUFnQixLQUFLLEVBQUE7WUFDOUIsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO2dCQUMzRSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUU7b0JBQ25DLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3pCOztvQkFDRyxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7O29CQUNsRSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7O29CQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BDLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBRTtvQkFDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzNELEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTthQUNKO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFOztvQkFDbkIsUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRTtnQkFDakQsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzNFO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDcEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDekI7YUFDSjtRQUNKLENBQUM7UUE5Q0ssMEJBQWEsR0FBRyxNQUFNLENBQUM7UUErQ2xDLG1CQUFDO0tBQUEsQUFoREQsQ0FBa0Msa0JBQWtCLENBQUMsZUFBZSxHQWdEbkU7SUFoRFksdUJBQVksZUFnRHhCLENBQUE7OztRQS9DRywyQkFBOEI7Ozs7O1FBRTlCLCtCQUF5Rzs7Ozs7UUFFekcsaUNBQTJHOzs7OztRQUUzRyw4QkFBc0c7Ozs7O1FBRXRHLDhCQUFrRzs7SUF5Q3RHO1FBQUE7UUFhQSxDQUFDO1FBQUQsV0FBQztJQUFELENBQUMsQUFiRCxJQWFDOzs7UUFaRyxzQkFBc0I7O1FBRXRCLHdCQUF3Qjs7UUFFeEIsdUJBQXVCOztRQUV2Qiw0QkFBNEI7O1FBRTVCLHdCQUFpQzs7UUFFakMsaUNBQWlDOztJQUVwQyxDQUFDO0lBRUY7UUFBbUMseUNBQWtDO1FBT2pFO1lBQUEsWUFDSSxpQkFBTyxTQUVWO1lBTE0sV0FBSyxHQUFnRCxJQUFJLGtCQUFrQixDQUFDLGtCQUFrQixDQUFPLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFJeEosYUFBYSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUM7O1FBQ3hDLENBQUM7Ozs7UUFFTSx1Q0FBZTs7O1FBQXRCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLENBQUM7Ozs7OztRQUVNLGlDQUFTOzs7OztRQUFoQixVQUFpQixHQUFXLEVBQUUsTUFBOEM7WUFDeEUsSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFOztvQkFDWixLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUU7Z0JBRXRCLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQy9DLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDNUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEQsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMxQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFdEQsT0FBTyxLQUFLLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0gsT0FBTyxpQkFBTSxTQUFTLFlBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0wsQ0FBQzs7Ozs7OztRQUVNLGtDQUFVOzs7Ozs7UUFBakIsVUFBa0IsR0FBVyxFQUFFLE1BQThDLEVBQUUsS0FBVTtZQUNyRixJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUU7Z0JBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN2RDtpQkFBTTtnQkFDSCxpQkFBTSxVQUFVLFlBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN4QztRQUNMLENBQUM7UUF6Q00sMkJBQWEsR0FBRyxPQUFPLENBQUM7UUE0Q25DLG9CQUFDO0tBQUEsQUE3Q0QsQ0FBbUMsa0JBQWtCLENBQUMsZUFBZSxHQTZDcEU7SUE3Q1ksd0JBQWEsZ0JBNkN6QixDQUFBOzs7UUE1Q0csNEJBQStCOztRQUUvQiw2QkFBcUM7O1FBRXJDLDhCQUE0Sjs7QUEwQ3BLLENBQUMsRUF6N0JhLFVBQVUsS0FBVixVQUFVLFFBeTdCdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gTW9kZWxTdGFnZSDCqSAyMDE4IFBsYW5zeXN0ZW1lIEdtYkgsIEhhbWJ1cmcsIEdlcm1hbnkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQgeyBtb2RlbHN0YWdld2ViIH0gZnJvbSAnLi9teC1jb21tb24nO1xyXG5pbXBvcnQgeyBtb2RlbHN0YWdlYXBwc3RhdGUgfSBmcm9tICcuL214LWFwcHN0YXRlJztcclxuaW1wb3J0IHsgcHNnZW9tZXRyeSB9IGZyb20gJy4vcHMtZ2VvbWV0cnknO1xyXG5pbXBvcnQgSlF1ZXJ5IGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5leHBvcnQgbW9kdWxlIG1vZGVsc3RhZ2Uge1xyXG5cclxuICAgIGNsYXNzIFRpbWVyIHtcclxuICAgICAgICBwdWJsaWMgYW5pbWF0aW9uRnJhbWUoY2FsbGJhY2s6IEZyYW1lUmVxdWVzdENhbGxiYWNrKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTcGFjZU1vZGVsIHtcclxuIFxyXG4gICAgICAgIHByaXZhdGUgdmVydGljZXM6IEFycmF5PHBzZ2VvbWV0cnkuVmVjMj4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmbG9vckxldmVsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEZsb29yTGV2ZWwoKSB7IHJldHVybiB0aGlzLmZsb29yTGV2ZWw7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBGbG9vckxldmVsKGZsb29yTGV2ZWwpIHsgdGhpcy5mbG9vckxldmVsID0gZmxvb3JMZXZlbDsgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNjZW5lOiBEZW1vU2NlbmVXZWJHTCwgcHJpdmF0ZSBzdGFnZTogbW9kZWxzdGFnZXdlYi5TdGFnZVdlYkdMLCBwcml2YXRlIGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZVNxdWFyZVJvb20odHJhbnNwYXJlbnRNZXNoQnVpbGRlcjogbW9kZWxzdGFnZXdlYi5UcmFuc3BhcmVudE1lc2hCdWlsZGVyLCB0ZXh0dXJlZE1lc2hCdWlsZGVyOiBtb2RlbHN0YWdld2ViLlRleHR1cmVkTWVzaEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgdGV4dHVyZWRNZXNoQnVpbGRlci5hZGRRdWFkKFxyXG4gICAgICAgICAgICAgICAgLTUuMCwgMC4wLCAtNS4wLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAwLjAsIC01LjAsIDEsIDAsXHJcbiAgICAgICAgICAgICAgICA1LjAsIDAuMCwgNS4wLCAxLCAxLFxyXG4gICAgICAgICAgICAgICAgLTUuMCwgMC4wLCA1LjAsIDAsIDEsXHJcbiAgICAgICAgICAgICAgICAwLjMsIDAuMywgMC4zLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50TWVzaEJ1aWxkZXIuYWRkUXVhZChcclxuICAgICAgICAgICAgICAgIC01LjAsIDAuMCwgLTUuMCxcclxuICAgICAgICAgICAgICAgIDUuMCwgMC4wLCAtNS4wLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAyLjYsIC01LjAsXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAyLjYsIC01LjAsXHJcbiAgICAgICAgICAgICAgICAwLjEsIDAuMSwgMC4xLCAuNCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudE1lc2hCdWlsZGVyLmFkZFF1YWQoXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAwLjAsIDUuMCxcclxuICAgICAgICAgICAgICAgIC01LjAsIDIuNiwgNS4wLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAyLjYsIDUuMCxcclxuICAgICAgICAgICAgICAgIDUuMCwgMC4wLCA1LjAsXHJcbiAgICAgICAgICAgICAgICAwLjEsIDAuMSwgMC4xLCAuNCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudE1lc2hCdWlsZGVyLmFkZFF1YWQoXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAwLjAsIC01LjAsXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAyLjYsIC01LjAsXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAyLjYsIDUuMCxcclxuICAgICAgICAgICAgICAgIC01LjAsIDAuMCwgNS4wLFxyXG4gICAgICAgICAgICAgICAgMC4xNSwgMC4xNSwgMC4xNSwgLjQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdHJhbnNwYXJlbnRNZXNoQnVpbGRlci5hZGRRdWFkKFxyXG4gICAgICAgICAgICAgICAgNS4wLCAwLjAsIC01LjAsXHJcbiAgICAgICAgICAgICAgICA1LjAsIDAuMCwgNS4wLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAyLjYsIDUuMCxcclxuICAgICAgICAgICAgICAgIDUuMCwgMi42LCAtNS4wLFxyXG4gICAgICAgICAgICAgICAgMC4xNSwgMC4xNSwgMC4xNSwgLjQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsaXplQXJiaXRyYXJ5Um9vbSh0cmFuc3BhcmVudE1lc2hCdWlsZGVyOiBtb2RlbHN0YWdld2ViLlRyYW5zcGFyZW50TWVzaEJ1aWxkZXIsIHRleHR1cmVkTWVzaEJ1aWxkZXI6IG1vZGVsc3RhZ2V3ZWIuVGV4dHVyZWRNZXNoQnVpbGRlcikge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvZ2dsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBvbHkgPSBuZXcgcHNnZW9tZXRyeS5Qb2x5Z29uMkQoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcG9seS5hZGRWZWN0b3IodGhpcy52ZXJ0aWNlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGJib3ggPSBuZXcgcHNnZW9tZXRyeS5BQUJCMkQoKTtcclxuICAgICAgICAgICAgcG9seS5hZGRUb0FBQkIoYmJveCk7XHJcbiAgICAgICAgICAgIHZhciBleHRlbnRzID0gYmJveC5leHRlbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UudXBkYXRlU2hhZG93QXJlYShiYm94KTtcclxuXHJcbiAgICAgICAgICAgIHBvbHkgPSBwb2x5LnRyaWFuZ3VsYXRlKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9seS5WZXJ0aWNlcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZWRNZXNoQnVpbGRlci5hZGRUcmkoXHJcbiAgICAgICAgICAgICAgICAgICAgcG9seS5WZXJ0aWNlc1tpXS54LCAwLCBwb2x5LlZlcnRpY2VzW2ldLnksIChwb2x5LlZlcnRpY2VzW2ldLnggLSBiYm94Lm1pblgpIC8gZXh0ZW50cy54LCAocG9seS5WZXJ0aWNlc1tpXS55IC0gYmJveC5taW5ZKSAvIGV4dGVudHMueSxcclxuICAgICAgICAgICAgICAgICAgICBwb2x5LlZlcnRpY2VzW2kgKyAxXS54LCAwLCBwb2x5LlZlcnRpY2VzW2kgKyAxXS55LCAocG9seS5WZXJ0aWNlc1tpICsgMV0ueCAtIGJib3gubWluWCkgLyBleHRlbnRzLngsIChwb2x5LlZlcnRpY2VzW2kgKyAxXS55IC0gYmJveC5taW5ZKSAvIGV4dGVudHMueSxcclxuICAgICAgICAgICAgICAgICAgICBwb2x5LlZlcnRpY2VzW2kgKyAyXS54LCAwLCBwb2x5LlZlcnRpY2VzW2kgKyAyXS55LCAocG9seS5WZXJ0aWNlc1tpICsgMl0ueCAtIGJib3gubWluWCkgLyBleHRlbnRzLngsIChwb2x5LlZlcnRpY2VzW2kgKyAyXS55IC0gYmJveC5taW5ZKSAvIGV4dGVudHMueSxcclxuICAgICAgICAgICAgICAgICAgICAwLjIsIDAuMiwgMC4yLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnZlcnRpY2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IHRoaXMudmVydGljZXNbKGkgKyAxKSAlIHRoaXMudmVydGljZXMubGVuZ3RoXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudE1lc2hCdWlsZGVyLmFkZFF1YWQoXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQueCwgMC4wLCBzdGFydC55LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZC54LCAwLjAsIGVuZC55LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZC54LCAyLjYsIGVuZC55LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LngsIDIuNiwgc3RhcnQueSxcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGUgPyAwLjEgOiAwLjE1LCB0b2dnbGUgPyAwLjEgOiAwLjE1LCB0b2dnbGUgPyAwLjEgOiAwLjE1LCAuNCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlID0gIXRvZ2dsZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGVTcGFjZSgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcGFjZUluZGljZXMgPSBuZXcgbW9kZWxzdGFnZXdlYi5CdWZmZXJBc3NldFdlYkdMKHVuZGVmaW5lZCwgJ3NwYWNlX2luZGljZXMnLCB0cnVlKTtcclxuICAgICAgICAgICAgbGV0IHNwYWNlVmVydGljZXMgPSBuZXcgbW9kZWxzdGFnZXdlYi5CdWZmZXJBc3NldFdlYkdMKHVuZGVmaW5lZCwgJ3NwYWNlX3ZlcnRpY2VzJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNwYXJlbnRNZXNoQnVpbGRlciA9IG5ldyBtb2RlbHN0YWdld2ViLlRyYW5zcGFyZW50TWVzaEJ1aWxkZXIoc3BhY2VWZXJ0aWNlcywgc3BhY2VJbmRpY2VzKTtcclxuICAgICAgICAgICAgbGV0IGZsb29ySW5kaWNlcyA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCAnZmxvb3JfaW5kaWNlcycsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgZmxvb3JWZXJ0aWNlcyA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCAnZmxvb3JfdmVydGljZXMnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlZE1lc2hCdWlsZGVyID0gbmV3IG1vZGVsc3RhZ2V3ZWIuVGV4dHVyZWRNZXNoQnVpbGRlcihmbG9vclZlcnRpY2VzLCBmbG9vckluZGljZXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudmVydGljZXMubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU3F1YXJlUm9vbSh0cmFuc3BhcmVudE1lc2hCdWlsZGVyLCB0ZXh0dXJlZE1lc2hCdWlsZGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUFyYml0cmFyeVJvb20odHJhbnNwYXJlbnRNZXNoQnVpbGRlciwgdGV4dHVyZWRNZXNoQnVpbGRlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmaWd1cmUgPSBuZXcgbW9kZWxzdGFnZXdlYi5GaWd1cmVXZWJHTCgnU3BhY2UnKTtcclxuXHJcbiAgICAgICAgICAgIHRleHR1cmVkTWVzaEJ1aWxkZXIuaW5pdGlhbGl6ZSh0aGlzLnN0YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KCdmbG9vcl9pbmRpY2VzJywgZmxvb3JJbmRpY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KCdmbG9vcl92ZXJ0aWNlcycsIGZsb29yVmVydGljZXMpO1xyXG4gICAgICAgICAgICBsZXQgZmxvb3JTaGFkZXJJbnN0YW5jZSA9IG5ldyBtb2RlbHN0YWdld2ViLk1lc2hTaGFkZXJJbnN0YW5jZSgnVGV4dHVyZWRNZXNoU2hhZGVyJyk7XHJcbiAgICAgICAgICAgIGZsb29yU2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdJbmRleEJ1ZmZlcicsICdmbG9vcl9pbmRpY2VzJyk7XHJcbiAgICAgICAgICAgIGZsb29yU2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInLCAnZmxvb3JfdmVydGljZXMnKTtcclxuICAgICAgICAgICAgZmxvb3JTaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ1RleHR1cmVCdWZmZXInLCAnU2hhZG93Jyk7XHJcbiAgICAgICAgICAgIGZpZ3VyZS5hZGRTaGFkZXJJbnN0YW5jZShmbG9vclNoYWRlckluc3RhbmNlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50TWVzaEJ1aWxkZXIuaW5pdGlhbGl6ZSh0aGlzLnN0YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KCdzcGFjZV9pbmRpY2VzJywgc3BhY2VJbmRpY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KCdzcGFjZV92ZXJ0aWNlcycsIHNwYWNlVmVydGljZXMpO1xyXG4gICAgICAgICAgICBsZXQgc2hhZGVySW5zdGFuY2UgPSBuZXcgbW9kZWxzdGFnZXdlYi5NZXNoU2hhZGVySW5zdGFuY2UoJ1RyYW5zcGFyZW50TWVzaFNoYWRlcicpO1xyXG4gICAgICAgICAgICBzaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJywgJ3NwYWNlX2luZGljZXMnKTtcclxuICAgICAgICAgICAgc2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInLCAnc3BhY2VfdmVydGljZXMnKTtcclxuICAgICAgICAgICAgZmlndXJlLmFkZFNoYWRlckluc3RhbmNlKHNoYWRlckluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0b3IuRmlndXJlc1swXSA9IGZpZ3VyZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rvci5GaWx0ZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5HZW5lcmljU2NlbmVJdGVtRmlsdGVyV2ViR0woKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0b3IuU2NlbmUuc2V0RGlydHkoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xlYXJWZXJ0aWNlcygpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFZlcnRleCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IHBzZ2VvbWV0cnkuVmVjMih4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUaGVhdGVyV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHN0YWdlOiBtb2RlbHN0YWdld2ViLlN0YWdlV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGltZXI6IFRpbWVyO1xyXG5cclxuICAgICAgICBnZXQgU3RhZ2UoKTogbW9kZWxzdGFnZXdlYi5TdGFnZVdlYkdMIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgU2NlbmUoKTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihjYW52YXNFbGVtZW50SUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IG1vZGVsc3RhZ2V3ZWIuU3RhZ2VXZWJHTChjYW52YXNFbGVtZW50SUQpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5zY2VuZSA9IG5ldyBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0woKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lci5hbmltYXRpb25GcmFtZSgoKSA9PiB7IHRoaXMucHJvY2Vzc0ZyYW1lKCkgfSk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4geyB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSgpOyB9LCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE1haW4gcmVuZGVyIGN5Y2xlIGZvciBhIGZyYW1lLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgcHJvY2Vzc0ZyYW1lKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY2VuZSAmJiB0aGlzLnNjZW5lLklzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQuaGlkZGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVuZGVyIHNjZW5lLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBhdmFpbGFibGUgaW50ZXJhY3Rpb24gZGF0YSBhbmQgcmVtb3RlIG1lc3NhZ2VzIHRvIHVwZGF0ZSBhcHBsaWNhdGlvbiBzdGF0ZSBhbmQvb3IgdmlldyBzdGF0ZSBmb3IgdGhlIG5leHQgZnJhbWUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZpbmFsaXplIGZyYW1lLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5lbmRGcmFtZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYmVnaW5GcmFtZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWVyLmFuaW1hdGlvbkZyYW1lKCgpID0+IHsgdGhpcy5wcm9jZXNzRnJhbWUoKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjZW5lLklzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UucmVuZGVyKHRoaXMuc2NlbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uVmlzaWJpbGl0eUNoYW5nZSgpIHtcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5oaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXIuYW5pbWF0aW9uRnJhbWUoKCkgPT4geyB0aGlzLnJlbmRlcigpIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBY3Rvck1hbmlwdWxhdGlvblRvb2wgZXh0ZW5kcyBtb2RlbHN0YWdld2ViLlRvb2wge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0U2NlbmVPYmoob2JqSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgc2NlbmVPYmpJZHggPSAwO1xyXG4gICAgICAgICAgICBsZXQgc2NlbmVPYmogPSBudWxsO1xyXG4gICAgICAgICAgICB3aGlsZSAoc2NlbmVPYmpJZHggPCBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5Db3VudCAmJiAhc2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5HZXRJdGVtQXQoc2NlbmVPYmpJZHgpLlNjZW5lT2JqZWN0SUQgPT0gb2JqSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU9iaiA9IFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLkdldEl0ZW1BdChzY2VuZU9iaklkeCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICsrc2NlbmVPYmpJZHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFtzY2VuZU9iaiwgc2NlbmVPYmpJZHhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVNb2RlbFRyYW5zZm9ybShhY3RvcjogbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGlvblZlYyA9IGFjdG9yLkRhdGFbJ3RyYW5zbGF0ZSddIHx8IHBzZ2VvbWV0cnkuVmVjNC5aZXJvO1xyXG4gICAgICAgICAgICBsZXQgcm90YXRpb25WZWMgPSBhY3Rvci5EYXRhWydyb3RhdGUnXSB8fCBwc2dlb21ldHJ5LlZlYzQuWmVybztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKCdTY2VuZXxUcmFuc2Zvcm18JyArIGFjdG9yLlNjZW5lSXRlbUlEICsgJ3wnICsgdHJhbnNsYXRpb25WZWMueCArICcsJyArIHRyYW5zbGF0aW9uVmVjLnkgKyAnLCcgKyB0cmFuc2xhdGlvblZlYy56ICsgJ3wnICsgcm90YXRpb25WZWMueSArICcsJyArIHJvdGF0aW9uVmVjLnggKyAnLCcgKyByb3RhdGlvblZlYy56KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGlvbiA9IHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tVHJhbnNsYXRpb24odHJhbnNsYXRpb25WZWMueCwgdHJhbnNsYXRpb25WZWMueSwgdHJhbnNsYXRpb25WZWMueik7XHJcbiAgICAgICAgICAgIGxldCByb3RhdGlvbiA9IHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tUm90YXRpb25ZKHJvdGF0aW9uVmVjLnkpO1xyXG5cclxuICAgICAgICAgICAgYWN0b3IuU3RhdGUuc2V0KCdNb2RlbFRyYW5zZm9ybScsIDxwc2dlb21ldHJ5Lk1hdHJpeDQ+cm90YXRpb24ubXVsdGlwbHkodHJhbnNsYXRpb24pKTtcclxuICAgICAgICAgICAgYWN0b3IuU2NlbmUuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB1cGRhdGVBY3RvclRyYW5zbGF0aW9uKGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgYWN0b3IuRGF0YVsndHJhbnNsYXRlJ10gPSBuZXcgcHNnZW9tZXRyeS5WZWM0KHgsIHksIHopO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsVHJhbnNmb3JtKGFjdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB1cGRhdGVBY3RvclJvdGF0aW9uKGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgYWN0b3IuRGF0YVsncm90YXRlJ10gPSBuZXcgcHNnZW9tZXRyeS5WZWM0KHgsIHksIHopO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsVHJhbnNmb3JtKGFjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNlbGVjdGlvblRvb2wgZXh0ZW5kcyBBY3Rvck1hbmlwdWxhdGlvblRvb2wge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNlbGVjdGlvbk9iamVjdElEID0gJ1NFTF9NQVJLRVInO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNlbGVjdGVkQWN0b3I6IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMLCBwcml2YXRlIHN0YWdlOiBtb2RlbHN0YWdld2ViLlN0YWdlV2ViR0wsIGNvbm5lY3Rpb246IG1vZGVsc3RhZ2V3ZWIuU2VydmVyQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBzdXBlcihjb25uZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnRlcihpbnRlcmZhY2VDb250cm9sbGVyOiBtb2RlbHN0YWdld2ViLkludGVyZmFjZUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIuZW50ZXIoaW50ZXJmYWNlQ29udHJvbGxlcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbk1hcmtlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGxlYXZlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbk1hcmtlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUtleVVwKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDQ2ICYmIHRoaXMuc2VsZWN0ZWRBY3RvcikgeyAvLyBkZWxldGUga2V5XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IFtzY2VuZU9iaiwgc2NlbmVPYmpJZHhdID0gdGhpcy5nZXRTY2VuZU9iaih0aGlzLnNlbGVjdGVkQWN0b3IuRGF0YVsnU2NlbmVPYmpJRCddKTtcclxuICAgICAgICAgICAgICAgIGlmIChzY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLnJlbW92ZShzY2VuZU9iaklkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb25NYXJrZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0b3IgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlbW92ZVNlbGVjdGlvbk1hcmtlcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVTY2VuZUl0ZW0oU2VsZWN0aW9uVG9vbC5TZWxlY3Rpb25PYmplY3RJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZVNlbGVjdGlvbk1hcmtlcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVTY2VuZUl0ZW0oU2VsZWN0aW9uVG9vbC5TZWxlY3Rpb25PYmplY3RJRCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEFjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm94ID0gbmV3IHBzZ2VvbWV0cnkuQUFCQjNEO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdG9yLkZpZ3VyZXMuZm9yRWFjaCgoZmlnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmFkZEFBQkIoZmlnLmdldEJvdW5kaW5nQm94KCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJvdHRvbUNlbnRlclBvaW50ID0gbmV3IHBzZ2VvbWV0cnkuVmVjMyhib3guY2VudGVyKCkueCwgYm94Lm1pblksIGJveC5jZW50ZXIoKS56KTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25NYXJrZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKHRoaXMuc2NlbmUsIFNlbGVjdGlvblRvb2wuU2VsZWN0aW9uT2JqZWN0SUQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBbciwgZywgYl0gPSBbLjE2LCAuMzQsIC42XTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzaEJ1aWxkZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5PcGFxdWVNZXNoQnVpbGRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRvcCBsaWRcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWluWCwgYm94Lm1heFksIGJveC5taW5aLCBib3gubWF4WCwgYm94Lm1heFksIGJveC5taW5aLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWF4WCwgYm94Lm1heFksIGJveC5taW5aLCBib3gubWF4WCwgYm94Lm1heFksIGJveC5tYXhaLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWF4WCwgYm94Lm1heFksIGJveC5tYXhaLCBib3gubWluWCwgYm94Lm1heFksIGJveC5tYXhaLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWluWCwgYm94Lm1heFksIGJveC5tYXhaLCBib3gubWluWCwgYm94Lm1heFksIGJveC5taW5aLCByLCBnLCBiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gbGlkXHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWluWiwgYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWluWiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWluWiwgYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWF4WiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWF4WiwgYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWF4WiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWF4WiwgYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWluWiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2FsIGxpbmVzXHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWluWiwgYm94Lm1pblgsIGJveC5tYXhZLCBib3gubWluWiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWF4WiwgYm94Lm1pblgsIGJveC5tYXhZLCBib3gubWF4WiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWluWiwgYm94Lm1heFgsIGJveC5tYXhZLCBib3gubWluWiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWF4WiwgYm94Lm1heFgsIGJveC5tYXhZLCBib3gubWF4WiwgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uTWFya2VyLmFkZEZpZ3VyZShtZXNoQnVpbGRlci5jcmVhdGVGaWd1cmUodGhpcy5zdGFnZSwgJ1NFTF9NQVJLRVInKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZ3VyZUJvdW5kaW5nQm94ID0gbmV3IHBzZ2VvbWV0cnkuQUFCQjNEKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgW3IsIGcsIGJdID0gWy42LCAuMSwgLjFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc2hCdWlsZGVyMSA9IG5ldyBtb2RlbHN0YWdld2ViLk9wYXF1ZU1lc2hCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50Q291bnQgPSAyNDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhZGl1czAgPSAxO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFkaXVzMSA9IDEuMTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudENvdW50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGUwID0gMiAqIE1hdGguUEkgLyBzZWdtZW50Q291bnQgKiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZTEgPSAyICogTWF0aC5QSSAvIHNlZ21lbnRDb3VudCAqIChpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlubmVyMCA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoTWF0aC5zaW4oYW5nbGUwKSAqIHJhZGl1czAsIDAsIE1hdGguY29zKGFuZ2xlMCkgKiByYWRpdXMwKS5hZGQoYm90dG9tQ2VudGVyUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbm5lcjEgPSBuZXcgcHNnZW9tZXRyeS5WZWMzKE1hdGguc2luKGFuZ2xlMSkgKiByYWRpdXMwLCAwLCBNYXRoLmNvcyhhbmdsZTEpICogcmFkaXVzMCkuYWRkKGJvdHRvbUNlbnRlclBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3V0ZXIwID0gbmV3IHBzZ2VvbWV0cnkuVmVjMyhNYXRoLnNpbihhbmdsZTApICogcmFkaXVzMSwgMCwgTWF0aC5jb3MoYW5nbGUwKSAqIHJhZGl1czEpLmFkZChib3R0b21DZW50ZXJQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG91dGVyMSA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoTWF0aC5zaW4oYW5nbGUxKSAqIHJhZGl1czEsIDAsIE1hdGguY29zKGFuZ2xlMSkgKiByYWRpdXMxKS5hZGQoYm90dG9tQ2VudGVyUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyMS5hZGRRdWFkKG91dGVyMC54LCBvdXRlcjAueSArIDAuMDIsIG91dGVyMC56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlcjEueCwgb3V0ZXIxLnkgKyAwLjAyLCBvdXRlcjEueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxLngsIGlubmVyMS55ICsgMC4wMiwgaW5uZXIxLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMC54LCBpbm5lcjAueSArIDAuMDIsIGlubmVyMC56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByLCBnLCBiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaEJ1aWxkZXIxLmFkZFF1YWQob3V0ZXIwLngsIG91dGVyMS55IC0gMC4wMiwgb3V0ZXIwLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyMS54LCBvdXRlcjEueSAtIDAuMDIsIG91dGVyMS56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlcjEueCwgb3V0ZXIxLnkgKyAwLjAyLCBvdXRlcjEueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIwLngsIG91dGVyMC55ICsgMC4wMiwgb3V0ZXIwLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZXNoQnVpbGRlcjEuYWRkUXVhZChpbm5lcjAueCwgaW5uZXIwLnkgLSAwLjAyLCBpbm5lcjAueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxLngsIGlubmVyMS55IC0gMC4wMiwgaW5uZXIxLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyMS54LCBvdXRlcjEueSAtIDAuMDIsIG91dGVyMS56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlcjAueCwgb3V0ZXIwLnkgLSAwLjAyLCBvdXRlcjAueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZ3VyZUJvdW5kaW5nQm94LmFkZFZlY3RvcihvdXRlcjApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZ3VyZSA9IG1lc2hCdWlsZGVyMS5jcmVhdGVGaWd1cmUodGhpcy5zdGFnZSwgJ1JPVF9NQVJLRVInKTtcclxuICAgICAgICAgICAgICAgIGZpZ3VyZS5zZXRJbnRlcnNlY3RvcihuZXcgbW9kZWxzdGFnZXdlYi5Cb3VuZGluZ0JveEludGVyc2VjdG9yKGZpZ3VyZUJvdW5kaW5nQm94KSk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25NYXJrZXIuYWRkRmlndXJlKGZpZ3VyZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNjZW5lT2JqVHJhbnNsYXRpb24gPSB0aGlzLnNjZW5lLlN0YXRlLmdldCgnU2NlbmVPYmplY3RQb3MnICsgdGhpcy5zZWxlY3RlZEFjdG9yLkRhdGFbJ1NjZW5lT2JqSUQnXSwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjZW5lT2JqUm90YXRpb24gPSB0aGlzLnNjZW5lLlN0YXRlLmdldCgnU2NlbmVPYmplY3RSb3QnICsgdGhpcy5zZWxlY3RlZEFjdG9yLkRhdGFbJ1NjZW5lT2JqSUQnXSwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uTWFya2VyLlN0YXRlLnNldCgnTW9kZWxUcmFuc2Zvcm0nLCBwc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVJvdGF0aW9uKHNjZW5lT2JqUm90YXRpb24ueCwgc2NlbmVPYmpSb3RhdGlvbi55LCBzY2VuZU9ialJvdGF0aW9uLnopLm11bHRpcGx5KHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tVHJhbnNsYXRpb24oc2NlbmVPYmpUcmFuc2xhdGlvbi54LCBzY2VuZU9ialRyYW5zbGF0aW9uLnksIHNjZW5lT2JqVHJhbnNsYXRpb24ueikpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25NYXJrZXIuRmlsdGVyID0gbmV3IG1vZGVsc3RhZ2V3ZWIuR2VuZXJpY1NjZW5lSXRlbUZpbHRlcldlYkdMKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZFNjZW5lSXRlbShzZWxlY3Rpb25NYXJrZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VEb3duKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgdmlld1JheSA9IHRoaXMuc3RhZ2UuQ2FtZXJhLmdldFZpZXdSYXkoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlczogQXJyYXk8bW9kZWxzdGFnZXdlYi5JbnRlcnNlY3Rpb25DYW5kaWRhdGU+ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuZ2V0SW50ZXJzZWN0aW9uQ2FuZGlkYXRlcyh2aWV3UmF5LCBjYW5kaWRhdGVzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwaWNrZWRPYmplY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRJZHggPSAwO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKCFwaWNrZWRPYmplY3QgJiYgY3VycmVudElkeCA8IGNhbmRpZGF0ZXMubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZXNbY3VycmVudElkeF0uc2NlbmVJdGVtIGluc3RhbmNlb2YgbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaWNrZWRBY3RvciA9IDxtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0w+KGNhbmRpZGF0ZXNbY3VycmVudElkeF0uc2NlbmVJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGlja2VkQWN0b3IuU2NlbmVJdGVtSUQgIT0gU2VsZWN0aW9uVG9vbC5TZWxlY3Rpb25PYmplY3RJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGlja2VkQWN0b3IgPT0gdGhpcy5zZWxlY3RlZEFjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucHVzaFRvb2wobmV3IE1vdmVBY3RvclRvb2wocGlja2VkQWN0b3IsIHRoaXMuc3RhZ2UuQ2FtZXJhLCB0aGlzLmNvbm5lY3Rpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3RvciA9IHBpY2tlZEFjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25NYXJrZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlja2VkT2JqZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucHVzaFRvb2wobmV3IFJvdGF0ZUFjdG9yVG9vbCh0aGlzLnNlbGVjdGVkQWN0b3IsIHRoaXMuc3RhZ2UuQ2FtZXJhLCB0aGlzLmNvbm5lY3Rpb24pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpY2tlZE9iamVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VycmVudElkeCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXBpY2tlZE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVTY2VuZUl0ZW0oU2VsZWN0aW9uVG9vbC5TZWxlY3Rpb25PYmplY3RJRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdG9yID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlTW92ZShlOiBKUXVlcnkuRXZlbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VVcChlOiBKUXVlcnkuRXZlbnQpIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYWNlQWN0b3JUb29sIGV4dGVuZHMgQWN0b3JNYW5pcHVsYXRpb25Ub29sIHtcclxuICAgICAgICBwcml2YXRlIHNjZW5lT2JqOiBTY2VuZU9iamVjdDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzY2VuZU9iaklkeDogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihmaWd1cmVJRDogc3RyaW5nLCBwcml2YXRlIGNhbWVyYTogbW9kZWxzdGFnZXdlYi5DYW1lcmFXZWJHTCwgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zY2VuZU9iaiA9IG5ldyBTY2VuZU9iamVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lT2JqLkFzc2V0SUQgPSBmaWd1cmVJRDtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU9iai5TY2VuZU9iamVjdElEID0gbW9kZWxzdGFnZXdlYi51dWlkdjQoKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU9iai5Mb2NhdGlvbiA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoKTsgXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVPYmouUm90YXRpb24gPSBuZXcgcHNnZW9tZXRyeS5WZWM0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVPYmouU2NhbGUgPSBuZXcgcHNnZW9tZXRyeS5WZWM0KDEsIDEsIDEsIDEpO1xyXG4gICAgICAgICAgICBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5hcHBlbmQodGhpcy5zY2VuZU9iaik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lT2JqSWR4ID0gU2NlbmVBcHBTdGF0ZS5HbG9iYWxJbnN0YW5jZS5TY2VuZU9iamVjdHMuQ291bnQgLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlTW92ZShlOiBKUXVlcnkuRXZlbnQ8RXZlbnRUYXJnZXQsIG51bGw+LCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgdmlld1JheSA9IHRoaXMuY2FtZXJhLmdldFZpZXdSYXkoeCwgeSk7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmlld1JheS5pbnRlcnNlY3RSYXlXaXRoUGxhbmUobmV3IHBzZ2VvbWV0cnkuVmVjMygpLCBuZXcgcHNnZW9tZXRyeS5WZWMzKDAsIDEsIDApKTtcclxuICAgICAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVPYmogPSB7IC4uLnRoaXMuc2NlbmVPYmogfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVPYmouTG9jYXRpb24gPSBuZXcgcHNnZW9tZXRyeS5WZWM0KHAueCwgMCwgcC56KTtcclxuICAgICAgICAgICAgICAgIFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLnJlcGxhY2UodGhpcy5zY2VuZU9iaiwgdGhpcy5zY2VuZU9iaklkeCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMudXBkYXRlQWN0b3JUcmFuc2xhdGlvbih0aGlzLmFjdG9yLCBwLngsIDAsIHAueik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZVVwKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucG9wVG9vbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IFVzZXJOYW1lcyA9IHtcclxuICAgICAgICAnQWRtaW5pc3RyYXRvcic6ICdBZG1pbmlzdHJhdG9yJyxcclxuICAgICAgICAnQXJuZSc6ICdBcm5lIFRodXJtJyxcclxuICAgICAgICAnVWxyaWNoJzogJ1VscmljaCBCw7Zua2VtZXllcicsXHJcbiAgICAgICAgJ1RvbSc6ICdUb20gSmFjaG1hbm4nLFxyXG4gICAgICAgICdaYWNoYXJpYXMnOiAnWmFjaGFyaWFzIFJlaW5oYXJkdCdcclxuICAgIH07XHJcblxyXG4gICAgbGV0IFBlZXJDb2xvcnMgPSBbXHJcbiAgICAgICAgWzAuMzEsIDAuMDIsIDAuMDYsIDEuMDBdLCAgLy8gcmVkXHJcbiAgICAgICAgWzAuMDIsIDAuMTcsIDAuMzEsIDEuMDBdLCAgLy8gYmx1ZVxyXG4gICAgICAgIFswLjAyLCAwLjMxLCAwLjA2LCAxLjAwXSwgIC8vIGdyZWVuXHJcbiAgICAgICAgWzAuNjksIDAuMzQsIDAuMDAsIDEuMDBdLCAgLy8gb3JhbmdlXHJcbiAgICAgICAgWzAuMzMsIDAuMDAsIDAuNTMsIDEuMDBdLCAgLy8gcHVycGxlXHJcbi8vICAgICAgICBbLCAxLjAwXSxcclxuLy8gICAgICAgIFssIDEuMDBdLFxyXG4vLyAgICAgICAgWywgMS4wMF0sXHJcbiAgICBdO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNb3ZlQWN0b3JUb29sIGV4dGVuZHMgQWN0b3JNYW5pcHVsYXRpb25Ub29sIHtcclxuICAgICAgICBwcml2YXRlIGlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIGxhc3RYOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBsYXN0WjogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wsIHByaXZhdGUgY2FtZXJhOiBtb2RlbHN0YWdld2ViLkNhbWVyYVdlYkdMLCBjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgc3VwZXIoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VNb3ZlKGU6IEpRdWVyeS5FdmVudDxFdmVudFRhcmdldCwgbnVsbD4sIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGxldCB2aWV3UmF5ID0gdGhpcy5jYW1lcmEuZ2V0Vmlld1JheSh4LCB5KTtcclxuICAgICAgICAgICAgbGV0IHAgPSB2aWV3UmF5LmludGVyc2VjdFJheVdpdGhQbGFuZShuZXcgcHNnZW9tZXRyeS5WZWMzKCksIG5ldyBwc2dlb21ldHJ5LlZlYzMoMCwgMSwgMCkpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBbc2NlbmVPYmosIHNjZW5lT2JqSWR4XSA9IHRoaXMuZ2V0U2NlbmVPYmoodGhpcy5hY3Rvci5EYXRhWydTY2VuZU9iaklEJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhbnNsYXRlZFNjZW5lT2JqOiBTY2VuZU9iamVjdCA9IHsgLi4uc2NlbmVPYmogfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0aW9uID0gdHJhbnNsYXRlZFNjZW5lT2JqLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVkU2NlbmVPYmouTG9jYXRpb24gPSB0cmFuc2xhdGVkU2NlbmVPYmouTG9jYXRpb24uYWRkKG5ldyBwc2dlb21ldHJ5LlZlYzQocC54IC0gdGhpcy5sYXN0WCwgMCwgcC56IC0gdGhpcy5sYXN0WikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5yZXBsYWNlKHRyYW5zbGF0ZWRTY2VuZU9iaiwgc2NlbmVPYmpJZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFggPSBwLng7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RaID0gcC56O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlVXAoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlci5wb3BUb29sKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUm90YXRlQWN0b3JUb29sIGV4dGVuZHMgQWN0b3JNYW5pcHVsYXRpb25Ub29sIHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wsIHByaXZhdGUgY2FtZXJhOiBtb2RlbHN0YWdld2ViLkNhbWVyYVdlYkdMLCBjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgc3VwZXIoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlRHJhZyhlOiBKUXVlcnkuRXZlbnQsIHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZFg6IG51bWJlciwgZFk6IG51bWJlcikge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZhYyA9IDE7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhlLmNsaWVudFkgLSBzdGFydFkpID4gMzAwKSB7XHJcbiAgICAgICAgICAgICAgICBmYWMgPSA2XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZS5jbGllbnRZIC0gc3RhcnRZKSA+IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgZmFjID0gM1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGUuY2xpZW50WSAtIHN0YXJ0WSkgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgIGZhYyA9IDJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IFtzY2VuZU9iaiwgc2NlbmVPYmpJZHhdID0gdGhpcy5nZXRTY2VuZU9iaih0aGlzLmFjdG9yLkRhdGFbJ1NjZW5lT2JqSUQnXSk7XHJcbiAgICAgICAgICAgIGlmIChzY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdGF0ZWRTY2VuZU9iajogU2NlbmVPYmplY3QgPSB7IC4uLnNjZW5lT2JqIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgcm90YXRpb24gPSByb3RhdGVkU2NlbmVPYmouUm90YXRpb247XHJcbiAgICAgICAgICAgICAgICByb3RhdGVkU2NlbmVPYmouUm90YXRpb24gPSByb3RhdGVkU2NlbmVPYmouUm90YXRpb24uYWRkKG5ldyBwc2dlb21ldHJ5LlZlYzQoZFggLyAoZmFjICogMTAwKSAqIE1hdGguUEksIDAsIDApKTtcclxuICAgICAgICAgICAgICAgIFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLnJlcGxhY2Uocm90YXRlZFNjZW5lT2JqLCBzY2VuZU9iaklkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZVVwKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucG9wVG9vbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIERlbW9TY2VuZVdlYkdMIGV4dGVuZHMgbW9kZWxzdGFnZWFwcHN0YXRlLkRpcmVjdGVkU2NlbmVXZWJHTCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhZ2U6IG1vZGVsc3RhZ2V3ZWIuU3RhZ2VXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzcGFjZUFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wgPSBuZXcgbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKHRoaXMsICdTcGFjZScpO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNwYWNlTW9kZWw6IFNwYWNlTW9kZWw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU3BhY2VNb2RlbCgpIHsgcmV0dXJuIHRoaXMuc3BhY2VNb2RlbDsgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFnZTogbW9kZWxzdGFnZXdlYi5TdGFnZVdlYkdMLCBjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgc3VwZXIobmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5EaXJlY3Rvcihtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGUuR2V0SW5zdGFuY2UoKSksIGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdG9yLlNjZW5lID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zcGFjZU1vZGVsID0gbmV3IFNwYWNlTW9kZWwodGhpcywgdGhpcy5zdGFnZSwgdGhpcy5zcGFjZUFjdG9yKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaGFkZXJQcm9ncmFtOiBtb2RlbHN0YWdld2ViLlNoYWRlclByb2dyYW1XZWJHTCA9IG5ldyBtb2RlbHN0YWdld2ViLk9wYXF1ZU1lc2hTaGFkZXJQcm9ncmFtV2ViR0woKTtcclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbS5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICAgICAgc3RhZ2UucmVnaXN0ZXJTaGFkZXJQcm9ncmFtKCdPcGFxdWVNZXNoU2hhZGVyJywgc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtID0gbmV3IG1vZGVsc3RhZ2V3ZWIuVHJhbnNwYXJlbnRNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0uaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHN0YWdlLnJlZ2lzdGVyU2hhZGVyUHJvZ3JhbSgnVHJhbnNwYXJlbnRNZXNoU2hhZGVyJywgc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtID0gbmV3IG1vZGVsc3RhZ2V3ZWIuVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0uaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHN0YWdlLnJlZ2lzdGVyU2hhZGVyUHJvZ3JhbSgnVGV4dHVyZWRNZXNoU2hhZGVyJywgc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtID0gbmV3IG1vZGVsc3RhZ2V3ZWIuTWF0Q2FwU2hhZGVyUHJvZ3JhbVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0uaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHN0YWdlLnJlZ2lzdGVyU2hhZGVyUHJvZ3JhbSgnTWF0Q2FwTWVzaFNoYWRlcicsIHNoYWRlclByb2dyYW0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2hhZG93IHNoYWRlcnNcclxuXHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0gPSBuZXcgbW9kZWxzdGFnZXdlYi5TaGFkb3dUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtV2ViR0woKTtcclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbS5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICAgICAgc3RhZ2UucmVnaXN0ZXJQaGFzZVNwZWNpZmljU2hhZGVyUHJvZ3JhbSgnU2hhZG93JywgJ1RleHR1cmVkTWVzaFNoYWRlcicsIHNoYWRlclByb2dyYW0pO1xyXG5cclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbSA9IG5ldyBtb2RlbHN0YWdld2ViLlNoYWRvd1RleHR1cmVkTWVzaFNoYWRlclByb2dyYW1XZWJHTCgpO1xyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtLmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgICAgICBzdGFnZS5yZWdpc3RlclBoYXNlU3BlY2lmaWNTaGFkZXJQcm9ncmFtKCdTaGFkb3cnLCAnTWF0Q2FwTWVzaFNoYWRlcicsIHNoYWRlclByb2dyYW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2NlbmVJdGVtKHRoaXMuc3BhY2VBY3RvciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BhY2VNb2RlbC51cGRhdGVTcGFjZSgpO1xyXG5cclxuICAgICAgICAgICAgJC53aGVuKFxyXG4vLyAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9jb21tb25hc3NldHMucHNtZXNoJyksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9ob2xvZ2VtLnBzbWVzaCcpLFxyXG4vLyAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9vZmZpY2VfYXNzZXRzLnBzbWVzaCcpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldEZhY3RvcnkuZ2V0RnJvbVVybCgnL2RhdGEvb2ZmaWNlX2Fzc2V0c19iYWtlLnBzbWVzaCcpXHJcbiAgICAgICAgICAgICkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklzSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9pZjUtb2ZmaWNlLTEucHNtZXNoJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3RvciA9IG5ldyBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wodGhpcywgJ2FjdG9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4IGluIHRoaXMuc3RhZ2UuQXNzZXRTdG9yZS5GaWd1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IuYWRkRmlndXJlKHRoaXMuc3RhZ2UuQXNzZXRTdG9yZS5GaWd1cmVzW3hdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NlbmVJdGVtKGFjdG9yLCB0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9hc3NldHMucHNtZXNoJykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgocmVxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9ncmVzcygocGVyY2VudGFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBwZXJjZW50YWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGVTcGFjZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGFjZU1vZGVsLmNsZWFyVmVydGljZXMoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBSb29tQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuVmVydGljZXMuQ291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZlcnQgPSBSb29tQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuVmVydGljZXMuR2V0SXRlbUF0KGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGFjZU1vZGVsLmFkZFZlcnRleCh2ZXJ0LngsIHZlcnQueik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zcGFjZU1vZGVsLnVwZGF0ZVNwYWNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlUGVlckluZm8ocGVlcklEOiBzdHJpbmcsIHBlZXJDb2xvckluZGV4OiBudW1iZXIsIHVzZXJOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHBlZXJJRCAhPSAnLTEnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGVlckluZm9JRCA9ICdwZWVyLWluZm8tJyArIHBlZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcGVlckluZm9FbGVtZW50ID0gJCgnIycgKyBwZWVySW5mb0lEKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGVlckluZm9FbGVtZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBwZWVySW5mb0VsZW1lbnQuZmluZCgnc3BhbicpLnRleHQodXNlck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcGFydGljaXBhbnRzLXZpZXcnKS5hcHBlbmQoJzxsaSBpZD1cIicgKyBwZWVySW5mb0lEICsgJ1wiPjxpbWcgc3JjPVwiaW1hZ2VzL2luZm8vTGVucycgKyBwZWVyQ29sb3JJbmRleCArICcucG5nXCIgLz48c3Bhbj4nICsgdXNlck5hbWUgKyAnPC9zcGFuPjwvbGk+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZW1vdmVQZWVyKHBlZXJJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2NlbmVJdGVtKCdQZWVyJyArIHBlZXJJRCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGVlckluZm9JRCA9ICdwZWVyLWluZm8tJyArIHBlZXJJRDtcclxuICAgICAgICAgICAgbGV0IHBlZXJJbmZvRWxlbWVudCA9ICQoJyMnICsgcGVlckluZm9JRCk7XHJcbiAgICAgICAgICAgIHBlZXJJbmZvRWxlbWVudC5hZGRDbGFzcygncmVtb3ZpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwZWVySW5mb0VsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldENvbG9ySW5kZXhGcm9tUGVlcklEKHBlZXJJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAocGFyc2VJbnQocGVlcklEKSAtIDEpICUgUGVlckNvbG9ycy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlUGVlcihwZWVySUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgb2JqOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wgPSBuZXcgbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKHRoaXMsICdQZWVyJyArIHBlZXJJRCk7XHJcbiAgICAgICAgICAgIG9iai5hZGRGaWd1cmUodGhpcy5zdGFnZS5Bc3NldFN0b3JlLkZpZ3VyZXNbJ2hvbG9sZW5zLmhvbG9sZW5zLjAwMCddKTtcclxuICAgICAgICAgICAgLy8gVE9ETyBAVUI6IGRvIHRoaXMgdGhlIHJpZ2h0IHdheS4uLlxyXG4gICAgICAgICAgICBvYmouRmlndXJlc1swXS5TaGFkZXJJbnN0YW5jZXNbMF0uU2hhZGVyS2V5ID0gJ01hdENhcE1lc2hTaGFkZXInO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbG9ySW5kZXggPSB0aGlzLmdldENvbG9ySW5kZXhGcm9tUGVlcklEKHBlZXJJRCk7XHJcblxyXG4gICAgICAgICAgICBvYmouU3RhdGUuc2V0KCdDb2xvcicsIG5ldyBwc2dlb21ldHJ5LlZlYzQoUGVlckNvbG9yc1tjb2xvckluZGV4XVswXSwgUGVlckNvbG9yc1tjb2xvckluZGV4XVsxXSwgUGVlckNvbG9yc1tjb2xvckluZGV4XVsyXSwgUGVlckNvbG9yc1tjb2xvckluZGV4XVszXSkpO1xyXG4gICAgICAgICAgICBvYmouU3RhdGUuc2V0KCdNb2RlbFRyYW5zZm9ybScsIChzdGF0ZTogbW9kZWxzdGFnZXdlYi5SZW5kZXJTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvczogcHNnZW9tZXRyeS5WZWM0ID0gc3RhdGUuZ2V0KCdIZWFkUG9zJyArIHBlZXJJRCwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvcjogcHNnZW9tZXRyeS5WZWM0ID0gc3RhdGUuZ2V0KCdDdXJzUG9zJyArIHBlZXJJRCwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpciA9IGN1cnNvci5zdWIocG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3BoZXJpY2FsID0gcHNnZW9tZXRyeS5TcGhlcmljYWwuRnJvbUNhcnRlc2lhblZlY3RvcihkaXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAoPHBzZ2VvbWV0cnkuTWF0cml4ND5wc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVJvdGF0aW9uWCgtc3BoZXJpY2FsLmF6aW11dGgpLm11bHRpcGx5KFxyXG4gICAgICAgICAgICAgICAgICAgIHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tUm90YXRpb25ZKC1zcGhlcmljYWwucG9sYXIpKSkubXVsdGlwbHkoXHJcbiAgICAgICAgICAgICAgICAgICAgcHNnZW9tZXRyeS5NYXRyaXg0LkZyb21UcmFuc2xhdGlvbihwb3MueCwgcG9zLnksIHBvcy56KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRTY2VuZUl0ZW0ob2JqLCB0cnVlIC8qIG1ha2VWaXNpYmxlICovKTtcclxuICAgICAgICAgICAgb2JqLlRlc3RJbnRlcnNlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgb2JqLlRlc3RDaGlsZHJlbkludGVyc2VjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVNjZW5lT2JqZWN0KG9iamVjdElEOiBzdHJpbmcsIGFzc2V0SUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgc3VmZml4ID0gb2JqZWN0SUQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTCh0aGlzLCAnU2NlbmVPYmplY3QnICsgc3VmZml4KTtcclxuICAgICAgICAgICAgb2JqLlN0YXRlLnNldCgnTW9kZWxUcmFuc2Zvcm0nLCAoc3RhdGU6IG1vZGVsc3RhZ2V3ZWIuUmVuZGVyU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSBzdGF0ZS5nZXQoJ1NjZW5lT2JqZWN0UG9zJyArIHN1ZmZpeCwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdCA9IHN0YXRlLmdldCgnU2NlbmVPYmplY3RSb3QnICsgc3VmZml4LCBwc2dlb21ldHJ5LlZlYzQuWmVybyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSBzdGF0ZS5nZXQoJ1NjZW5lT2JqZWN0U2NhbGUnICsgc3VmZml4LCBwc2dlb21ldHJ5LlZlYzQuT25lKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHBzZ2VvbWV0cnkuTWF0cml4ND5wc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVJvdGF0aW9uKHJvdC54LCByb3QueSwgcm90LnopLm11bHRpcGx5KFxyXG4gICAgICAgICAgICAgICAgICAgIHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tU2NhbGluZyhzY2FsZS54LCBzY2FsZS55LCBzY2FsZS56KS5tdWx0aXBseShcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHNnZW9tZXRyeS5NYXRyaXg0LkZyb21UcmFuc2xhdGlvbihwb3MueCwgcG9zLnksIHBvcy56KSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb2JqLmFkZEZpZ3VyZSh0aGlzLnN0YWdlLkFzc2V0U3RvcmUuZ2V0RmlndXJlKGFzc2V0SUQpKTtcclxuICAgICAgICAgICAgb2JqLkRhdGFbJ1NjZW5lT2JqSUQnXSA9IHN1ZmZpeDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUm9vbUFwcFN0YXRlIGV4dGVuZHMgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ2x1c3RlciB7XHJcbiAgICAgICAgc3RhdGljIENsdXN0ZXJUeXBlSUQgPSAnUm9vbSc7XHJcblxyXG4gICAgICAgIHN0YXRpYyBHbG9iYWxJbnN0YW5jZTogUm9vbUFwcFN0YXRlO1xyXG5cclxuICAgICAgICBwdWJsaWMgRmxvb3JMZXZlbDogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlRmxvYXRWYWx1ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVGbG9hdFZhbHVlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNYXN0ZXJWaWV3OiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVWZWN0b3I0VmFsdWUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlVmVjdG9yNFZhbHVlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZXJ0aWNlczogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ29sbGVjdGlvbjxwc2dlb21ldHJ5LlZlYzQ+ID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUNvbGxlY3Rpb248cHNnZW9tZXRyeS5WZWM0Pihtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uT3BlcmF0aW9uKTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICBSb29tQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyRW50cmllcygpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdGbG9vckxldmVsJywgdGhpcy5GbG9vckxldmVsKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdNYXN0ZXJWaWV3JywgdGhpcy5NYXN0ZXJWaWV3KTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdWZXJ0aWNlcycsIHRoaXMuVmVydGljZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRWYWx1ZShrZXk6IHN0cmluZywgcmVhZGVyOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVEZWx0YVJlYWRlcik6IGFueSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ1ZlcnRpY2VzJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRlci5SZWFkZXIucmVhZFZlYzQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5yZWFkVmFsdWUoa2V5LCByZWFkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYXBwbHlDaGFuZ2VzKHNjZW5lOiBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0wsIHBlZXJJRDogc3RyaW5nLCBpbnN0YW5jZUlEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuRmxvb3JMZXZlbC5pc0RpcnR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnRmxvb3JMZXZlbCcsIHRoaXMuRmxvb3JMZXZlbC5nZXQoKSk7XHJcbiAgICAgICAgICAgICAgICAoPERlbW9TY2VuZVdlYkdMPnNjZW5lKS5TcGFjZU1vZGVsLkZsb29yTGV2ZWwgPSB0aGlzLkZsb29yTGV2ZWwuZ2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuTWFzdGVyVmlldy5pc0RpcnR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnTWFzdGVyVmlld1BvcycsIHRoaXMuTWFzdGVyVmlldy5nZXQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuVmVydGljZXMuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2MgPSA8RGVtb1NjZW5lV2ViR0w+c2NlbmU7XHJcbiAgICAgICAgICAgICAgICAoPERlbW9TY2VuZVdlYkdMPnNjZW5lKS51cGRhdGVTcGFjZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFNjZW5lT2JqZWN0IHtcclxuICAgICAgICBwdWJsaWMgU2NlbmVPYmplY3RJRDogc3RyaW5nOyAvLyBjaGFyWzQwXVxyXG5cclxuICAgICAgICBwdWJsaWMgQXNzZXRJRDogc3RyaW5nOyAgICAgICAvLyBjaGFyWzIwXVxyXG5cclxuICAgICAgICBwdWJsaWMgTG9jYXRpb246IHBzZ2VvbWV0cnkuVmVjNDtcclxuXHJcbiAgICAgICAgcHVibGljIFJvdGF0aW9uOiBwc2dlb21ldHJ5LlZlYzQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTY2FsZTogcHNnZW9tZXRyeS5WZWM0O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTY2VuZUFwcFN0YXRlIGV4dGVuZHMgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ2x1c3RlciB7XHJcbiAgICAgICAgc3RhdGljIENsdXN0ZXJUeXBlSUQgPSAnT2JqJztcclxuXHJcbiAgICAgICAgc3RhdGljIEdsb2JhbEluc3RhbmNlOiBTY2VuZUFwcFN0YXRlO1xyXG5cclxuICAgICAgICBwdWJsaWMgU2NlbmVPYmplY3RzOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uPFNjZW5lT2JqZWN0PiA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uPFNjZW5lT2JqZWN0Pihtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uT3BlcmF0aW9uKTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWdpc3RlckVudHJpZXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnT2JqJywgdGhpcy5TY2VuZU9iamVjdHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRWYWx1ZShrZXk6IHN0cmluZywgcmVhZGVyOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVEZWx0YVJlYWRlcik6IGFueSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ09iaicpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IG5ldyBTY2VuZU9iamVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbHVlLlNjZW5lT2JqZWN0SUQgPSByZWFkZXIuUmVhZGVyLnJlYWRDaGFyQXJyYXkoNDApO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuQXNzZXRJRCA9IHJlYWRlci5SZWFkZXIucmVhZENoYXJBcnJheSg0MCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5Mb2NhdGlvbiA9IHJlYWRlci5SZWFkZXIucmVhZFZlYzQoKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLlJvdGF0aW9uID0gcmVhZGVyLlJlYWRlci5yZWFkVmVjNCgpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuU2NhbGUgPSByZWFkZXIuUmVhZGVyLnJlYWRWZWM0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLnJlYWRWYWx1ZShrZXksIHJlYWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB3cml0ZVZhbHVlKGtleTogc3RyaW5nLCB3cml0ZXI6IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZURlbHRhV3JpdGVyLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ09iaicpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVDaGFyQXJyYXkodmFsdWUuU2NlbmVPYmplY3RJRCwgNDApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUNoYXJBcnJheSh2YWx1ZS5Bc3NldElELCA0MCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlVmVjNCh2YWx1ZS5Mb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlVmVjNCh2YWx1ZS5Sb3RhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlVmVjNChwc2dlb21ldHJ5LlZlYzQuT25lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1cGVyLndyaXRlVmFsdWUoa2V5LCB3cml0ZXIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFwcGx5Q2hhbmdlcyhzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMLCBwZWVySUQ6IHN0cmluZywgaW5zdGFuY2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNjZW5lT2JqZWN0cy5pc0RpcnR5KCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzYyA9IDxEZW1vU2NlbmVXZWJHTD4oc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuU2NlbmVPYmplY3RzLk9wZXJhdGlvbnMuZm9yRWFjaCgob3BlcmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5PcGVyYXRpb24gPT0gbW9kZWxzdGFnZWFwcHN0YXRlLk9wZXJhdGlvblR5cGUuQXBwZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmpJRCA9IG9wZXJhdGlvbi5OZXdWYWx1ZS5TY2VuZU9iamVjdElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXRJRCA9IG9wZXJhdGlvbi5OZXdWYWx1ZS5Bc3NldElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYy5hZGRTY2VuZUl0ZW0oc2MuY3JlYXRlU2NlbmVPYmplY3Qob2JqSUQsIGFzc2V0SUQpLCB0cnVlIC8qIG1ha2VWaXNpYmxlICovKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUuU3RhdGUuc2V0KCdTY2VuZU9iamVjdFBvcycgKyBvYmpJRCwgb3BlcmF0aW9uLk5ld1ZhbHVlLkxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUuU3RhdGUuc2V0KCdTY2VuZU9iamVjdFJvdCcgKyBvYmpJRCwgb3BlcmF0aW9uLk5ld1ZhbHVlLlJvdGF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUuU3RhdGUuc2V0KCdTY2VuZU9iamVjdFNjYWxlJyArIG9iaklELCBvcGVyYXRpb24uTmV3VmFsdWUuU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NjZW5lLlJ1blNlcXVlbmNlKFwiU2hvd1NjZW5lT2JqZWN0XCIsIHN0ZDo6c3RyaW5neyBcIlNob3dTY2VuZU9iamVjdFwiIH0gK25vdGVJRCwgeyB7IFwiU2NlbmVPYmplY3RJRFwiLCBvYmpJRCB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcGVyYXRpb24uT3BlcmF0aW9uID09IG1vZGVsc3RhZ2VhcHBzdGF0ZS5PcGVyYXRpb25UeXBlLlJlcGxhY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaklEID0gb3BlcmF0aW9uLk5ld1ZhbHVlLlNjZW5lT2JqZWN0SUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnU2NlbmVPYmplY3RQb3MnICsgb2JqSUQsIG9wZXJhdGlvbi5OZXdWYWx1ZS5Mb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnU2NlbmVPYmplY3RSb3QnICsgb2JqSUQsIG9wZXJhdGlvbi5OZXdWYWx1ZS5Sb3RhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnU2NlbmVPYmplY3RTY2FsZScgKyBvYmpJRCwgb3BlcmF0aW9uLk5ld1ZhbHVlLlNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3BlcmF0aW9uLk9wZXJhdGlvbiA9PSBtb2RlbHN0YWdlYXBwc3RhdGUuT3BlcmF0aW9uVHlwZS5SZW1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaklEID0gb3BlcmF0aW9uLlByZXZpb3VzVmFsdWUuU2NlbmVPYmplY3RJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUucmVtb3ZlU2NlbmVJdGVtKCdTY2VuZU9iamVjdCcgKyBvYmpJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQZWVyQXBwU3RhdGUgZXh0ZW5kcyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDbHVzdGVyIHtcclxuICAgICAgICBzdGF0aWMgQ2x1c3RlclR5cGVJRCA9ICdQZWVyJztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBoZWFkUG9zOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVWZWN0b3I0VmFsdWUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlVmVjdG9yNFZhbHVlKCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3Vyc29yUG9zOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVWZWN0b3I0VmFsdWUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlVmVjdG9yNFZhbHVlKCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXNlcklEOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVTdHJpbmdWYWx1ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVTdHJpbmdWYWx1ZSgpO1xyXG5cclxuICAgICAgICBwcml2YXRlIGFjdGl2ZTogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQm9vbFZhbHVlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUJvb2xWYWx1ZSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgcHJvdmlkZXNJbml0aWFsaXphdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyRW50cmllcygpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdIZWFkJywgdGhpcy5oZWFkUG9zKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdDdXJzJywgdGhpcy5jdXJzb3JQb3MpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRW50cnkoJ1VzZXInLCB0aGlzLnVzZXJJRCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnQWN0aXZlJywgdGhpcy5hY3RpdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFwcGx5Q2hhbmdlcyhzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMLCBwZWVySUQ6IHN0cmluZywgaW5zdGFuY2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBzYyA9IDxEZW1vU2NlbmVXZWJHTD5zY2VuZTtcclxuICAgICAgICAgICAgaWYgKHBlZXJJRC5sZW5ndGggPiAwICYmICh0aGlzLmhlYWRQb3MuaXNEaXJ0eSgpIHx8IHRoaXMuY3Vyc29yUG9zLmlzRGlydHkoKSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2MuZ2V0U2NlbmVJdGVtKCdQZWVyJyArIHBlZXJJRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzYy5jcmVhdGVQZWVyKHBlZXJJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWxPZnMgPSBuZXcgcHNnZW9tZXRyeS5WZWM0KDAsIC1zYy5TcGFjZU1vZGVsLkZsb29yTGV2ZWwsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRQb3MgPSB0aGlzLmhlYWRQb3MuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3Vyc29yUG9zID0gdGhpcy5jdXJzb3JQb3MuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVhZFBvcyAmJiBjdXJzb3JQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZS5TdGF0ZS5zZXQoJ0hlYWRQb3MnICsgcGVlcklELCBoZWFkUG9zLmFkZChsZXZlbE9mcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnQ3Vyc1BvcycgKyBwZWVySUQsIGN1cnNvclBvcy5hZGQobGV2ZWxPZnMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlcklELmlzRGlydHkoKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJOYW1lID0gVXNlck5hbWVzW3RoaXMudXNlcklELmdldCgpXSB8fCAnJztcclxuICAgICAgICAgICAgICAgIHNjLnVwZGF0ZVBlZXJJbmZvKHBlZXJJRCwgc2MuZ2V0Q29sb3JJbmRleEZyb21QZWVySUQocGVlcklEKSwgdXNlck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmUuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWN0aXZlLmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MucmVtb3ZlUGVlcihwZWVySUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBOb3RlIHtcclxuICAgICAgICBwdWJsaWMgTm90ZUlEOiBzdHJpbmc7IC8vY2hhclsyMF07XHJcblxyXG4gICAgICAgIHB1YmxpYyBOb3RlVHlwZTogbnVtYmVyOyAvLyBpbnRcclxuXHJcbiAgICAgICAgcHVibGljIE93bmVySUQ6IHN0cmluZzsgLy8gY2hhclsxMF07XHJcblxyXG4gICAgICAgIHB1YmxpYyBBc3NpZ25lZFRvSUQ6IHN0cmluZzsgLy8gY2hhclsxMF07XHJcblxyXG4gICAgICAgIHB1YmxpYyBMb2NhdGlvbjogcHNnZW9tZXRyeS5WZWM0O1xyXG5cclxuICAgICAgICBwdWJsaWMgQXppbXV0aGFsUm90YXRpb246IG51bWJlcjsgLy8gZmxvYXRcdFx0XHRcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb3Rlc0FwcFN0YXRlIGV4dGVuZHMgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ2x1c3RlciB7XHJcbiAgICAgICAgc3RhdGljIENsdXN0ZXJUeXBlSUQgPSAnTm90ZXMnO1xyXG5cclxuICAgICAgICBzdGF0aWMgR2xvYmFsSW5zdGFuY2U6IE5vdGVzQXBwU3RhdGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBOb3RlczogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ29sbGVjdGlvbjxOb3RlPiA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uPE5vdGU+KG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb24pO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIE5vdGVzQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyRW50cmllcygpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdOb3RlcycsIHRoaXMuTm90ZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRWYWx1ZShrZXk6IHN0cmluZywgcmVhZGVyOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVEZWx0YVJlYWRlcik6IGFueSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ05vdGVzJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gbmV3IE5vdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5Ob3RlSUQgPSByZWFkZXIuUmVhZGVyLnJlYWRDaGFyQXJyYXkoMjApO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuTm90ZVR5cGUgPSByZWFkZXIuUmVhZGVyLnJlYWRVSW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLk93bmVySUQgPSByZWFkZXIuUmVhZGVyLnJlYWRDaGFyQXJyYXkoMTApO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuTG9jYXRpb24gPSByZWFkZXIuUmVhZGVyLnJlYWRWZWM0KCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5BemltdXRoYWxSb3RhdGlvbiA9IHJlYWRlci5SZWFkZXIucmVhZEZsb2F0MzIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIucmVhZFZhbHVlKGtleSwgcmVhZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlVmFsdWUoa2V5OiBzdHJpbmcsIHdyaXRlcjogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlRGVsdGFXcml0ZXIsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSAnTm90ZXMnKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlQ2hhckFycmF5KHZhbHVlLk5vdGVJRCwgMjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUludDMyKHZhbHVlLk5vdGVUeXBlKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVDaGFyQXJyYXkodmFsdWUuT3duZXJJRCwgMTApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZVZlYzQodmFsdWUuTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUZsb2F0MzIodmFsdWUuQXppbXV0aGFsUm90YXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIud3JpdGVWYWx1ZShrZXksIHdyaXRlciwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==