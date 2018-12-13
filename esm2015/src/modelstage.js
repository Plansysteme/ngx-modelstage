/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
import { psgeometry } from './ps-geometry';
export var modelstage;
(function (modelstage) {
    class Timer {
        /**
         * @param {?} callback
         * @return {?}
         */
        animationFrame(callback) {
            return window.requestAnimationFrame(callback);
        }
        constructor() {
        }
    }
    class SpaceModel {
        /**
         * @param {?} scene
         * @param {?} stage
         * @param {?} actor
         */
        constructor(scene, stage, actor) {
            this.scene = scene;
            this.stage = stage;
            this.actor = actor;
            this.vertices = [];
            this.floorLevel = 0;
        }
        /**
         * @return {?}
         */
        get FloorLevel() { return this.floorLevel; }
        /**
         * @param {?} floorLevel
         * @return {?}
         */
        set FloorLevel(floorLevel) { this.floorLevel = floorLevel; }
        /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        initializeSquareRoom(transparentMeshBuilder, texturedMeshBuilder) {
            texturedMeshBuilder.addQuad(-5.0, 0.0, -5.0, 0, 0, 5.0, 0.0, -5.0, 1, 0, 5.0, 0.0, 5.0, 1, 1, -5.0, 0.0, 5.0, 0, 1, 0.3, 0.3, 0.3, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, -5.0, 5.0, 0.0, -5.0, 5.0, 2.6, -5.0, -5.0, 2.6, -5.0, 0.1, 0.1, 0.1, .4, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, 5.0, -5.0, 2.6, 5.0, 5.0, 2.6, 5.0, 5.0, 0.0, 5.0, 0.1, 0.1, 0.1, .4, true);
            transparentMeshBuilder.addQuad(-5.0, 0.0, -5.0, -5.0, 2.6, -5.0, -5.0, 2.6, 5.0, -5.0, 0.0, 5.0, 0.15, 0.15, 0.15, .4, true);
            transparentMeshBuilder.addQuad(5.0, 0.0, -5.0, 5.0, 0.0, 5.0, 5.0, 2.6, 5.0, 5.0, 2.6, -5.0, 0.15, 0.15, 0.15, .4, true);
        }
        /**
         * @private
         * @param {?} transparentMeshBuilder
         * @param {?} texturedMeshBuilder
         * @return {?}
         */
        initializeArbitraryRoom(transparentMeshBuilder, texturedMeshBuilder) {
            /** @type {?} */
            let toggle = false;
            /** @type {?} */
            let poly = new psgeometry.Polygon2D();
            for (let i = 0; i < this.vertices.length; i++) {
                poly.addVector(this.vertices[i]);
            }
            /** @type {?} */
            var bbox = new psgeometry.AABB2D();
            poly.addToAABB(bbox);
            /** @type {?} */
            var extents = bbox.extents();
            this.stage.updateShadowArea(bbox);
            poly = poly.triangulate();
            for (let i = 0; i < poly.Vertices.length; i += 3) {
                texturedMeshBuilder.addTri(poly.Vertices[i].x, 0, poly.Vertices[i].y, (poly.Vertices[i].x - bbox.minX) / extents.x, (poly.Vertices[i].y - bbox.minY) / extents.y, poly.Vertices[i + 1].x, 0, poly.Vertices[i + 1].y, (poly.Vertices[i + 1].x - bbox.minX) / extents.x, (poly.Vertices[i + 1].y - bbox.minY) / extents.y, poly.Vertices[i + 2].x, 0, poly.Vertices[i + 2].y, (poly.Vertices[i + 2].x - bbox.minX) / extents.x, (poly.Vertices[i + 2].y - bbox.minY) / extents.y, 0.2, 0.2, 0.2, true);
            }
            for (let i = 0; i < this.vertices.length; i++) {
                /** @type {?} */
                let start = this.vertices[i];
                /** @type {?} */
                let end = this.vertices[(i + 1) % this.vertices.length];
                transparentMeshBuilder.addQuad(start.x, 0.0, start.y, end.x, 0.0, end.y, end.x, 2.6, end.y, start.x, 2.6, start.y, toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, .4, true);
                toggle = !toggle;
            }
        }
        /**
         * @return {?}
         */
        updateSpace() {
            /** @type {?} */
            let spaceIndices = new modelstageweb.BufferAssetWebGL(undefined, 'space_indices', true);
            /** @type {?} */
            let spaceVertices = new modelstageweb.BufferAssetWebGL(undefined, 'space_vertices', false);
            /** @type {?} */
            let transparentMeshBuilder = new modelstageweb.TransparentMeshBuilder(spaceVertices, spaceIndices);
            /** @type {?} */
            let floorIndices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_indices', true);
            /** @type {?} */
            let floorVertices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_vertices', false);
            /** @type {?} */
            let texturedMeshBuilder = new modelstageweb.TexturedMeshBuilder(floorVertices, floorIndices);
            if (this.vertices.length < 3) {
                this.initializeSquareRoom(transparentMeshBuilder, texturedMeshBuilder);
            }
            else {
                this.initializeArbitraryRoom(transparentMeshBuilder, texturedMeshBuilder);
            }
            /** @type {?} */
            let figure = new modelstageweb.FigureWebGL('Space');
            texturedMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('floor_indices', floorIndices);
            this.stage.AssetStore.addBufferAsset('floor_vertices', floorVertices);
            /** @type {?} */
            let floorShaderInstance = new modelstageweb.MeshShaderInstance('TexturedMeshShader');
            floorShaderInstance.addReference('IndexBuffer', 'floor_indices');
            floorShaderInstance.addReference('VertexBuffer', 'floor_vertices');
            floorShaderInstance.addReference('TextureBuffer', 'Shadow');
            figure.addShaderInstance(floorShaderInstance);
            transparentMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('space_indices', spaceIndices);
            this.stage.AssetStore.addBufferAsset('space_vertices', spaceVertices);
            /** @type {?} */
            let shaderInstance = new modelstageweb.MeshShaderInstance('TransparentMeshShader');
            shaderInstance.addReference('IndexBuffer', 'space_indices');
            shaderInstance.addReference('VertexBuffer', 'space_vertices');
            figure.addShaderInstance(shaderInstance);
            this.actor.Figures[0] = figure;
            this.actor.Filter = new modelstageweb.GenericSceneItemFilterWebGL();
            this.actor.Scene.setDirty();
        }
        /**
         * @return {?}
         */
        clearVertices() {
            this.vertices.length = 0;
        }
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        addVertex(x, y) {
            this.vertices.push(new psgeometry.Vec2(x, y));
        }
    }
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
    class TheaterWebGL {
        /**
         * @param {?} canvasElementID
         */
        constructor(canvasElementID) {
            this.stage = new modelstageweb.StageWebGL(canvasElementID);
            this.stage.initialize();
            //this.scene = new modelstageweb.SceneWebGL();
            this.timer = new Timer();
            this.timer.animationFrame(() => { this.processFrame(); });
            document.addEventListener('visibilitychange', () => { this.onVisibilityChange(); }, false);
            this.initialize();
        }
        /**
         * @return {?}
         */
        get Stage() {
            return this.stage;
        }
        /**
         * @return {?}
         */
        get Scene() {
            return this.scene;
        }
        /**
         * @protected
         * @return {?}
         */
        initialize() {
        }
        /**
         * Main render cycle for a frame.
         * @protected
         * @return {?}
         */
        processFrame() {
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
            this.timer.animationFrame(() => { this.processFrame(); });
        }
        /**
         * @protected
         * @return {?}
         */
        render() {
            if (this.scene.IsInitialized) {
                this.stage.render(this.scene);
            }
        }
        /**
         * @private
         * @return {?}
         */
        onVisibilityChange() {
            if (!document.hidden) {
                this.timer.animationFrame(() => { this.render(); });
            }
        }
    }
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
    class ActorManipulationTool extends modelstageweb.Tool {
        /**
         * @param {?} connection
         */
        constructor(connection) {
            super();
            this.connection = connection;
        }
        /**
         * @protected
         * @param {?} objID
         * @return {?}
         */
        getSceneObj(objID) {
            /** @type {?} */
            let sceneObjIdx = 0;
            /** @type {?} */
            let sceneObj = null;
            while (sceneObjIdx < SceneAppState.GlobalInstance.SceneObjects.Count && !sceneObj) {
                if (SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx).SceneObjectID == objID) {
                    sceneObj = SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx);
                }
                else {
                    ++sceneObjIdx;
                }
            }
            return [sceneObj, sceneObjIdx];
        }
        /**
         * @private
         * @param {?} actor
         * @return {?}
         */
        updateModelTransform(actor) {
            /** @type {?} */
            let translationVec = actor.Data['translate'] || psgeometry.Vec4.Zero;
            /** @type {?} */
            let rotationVec = actor.Data['rotate'] || psgeometry.Vec4.Zero;
            this.connection.send('Scene|Transform|' + actor.SceneItemID + '|' + translationVec.x + ',' + translationVec.y + ',' + translationVec.z + '|' + rotationVec.y + ',' + rotationVec.x + ',' + rotationVec.z);
            /** @type {?} */
            let translation = psgeometry.Matrix4.FromTranslation(translationVec.x, translationVec.y, translationVec.z);
            /** @type {?} */
            let rotation = psgeometry.Matrix4.FromRotationY(rotationVec.y);
            actor.State.set('ModelTransform', (/** @type {?} */ (rotation.multiply(translation))));
            actor.Scene.setDirty();
        }
        /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        updateActorTranslation(actor, x, y, z) {
            actor.Data['translate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        }
        /**
         * @protected
         * @param {?} actor
         * @param {?} x
         * @param {?} y
         * @param {?} z
         * @return {?}
         */
        updateActorRotation(actor, x, y, z) {
            actor.Data['rotate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        }
    }
    modelstage.ActorManipulationTool = ActorManipulationTool;
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        ActorManipulationTool.prototype.connection;
    }
    class SelectionTool extends ActorManipulationTool {
        /**
         * @param {?} scene
         * @param {?} stage
         * @param {?} connection
         */
        constructor(scene, stage, connection) {
            super(connection);
            this.scene = scene;
            this.stage = stage;
        }
        /**
         * @param {?} interfaceController
         * @return {?}
         */
        enter(interfaceController) {
            super.enter(interfaceController);
            this.updateSelectionMarker();
        }
        /**
         * @return {?}
         */
        leave() {
            this.removeSelectionMarker();
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleKeyUp(e) {
            if (e.keyCode == 46 && this.selectedActor) { // delete key
                // delete key
                let [sceneObj, sceneObjIdx] = this.getSceneObj(this.selectedActor.Data['SceneObjID']);
                if (sceneObj) {
                    SceneAppState.GlobalInstance.SceneObjects.remove(sceneObjIdx);
                    this.removeSelectionMarker();
                    this.selectedActor = null;
                    return true;
                }
            }
            return false;
        }
        /**
         * @private
         * @return {?}
         */
        removeSelectionMarker() {
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
        }
        /**
         * @private
         * @return {?}
         */
        updateSelectionMarker() {
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
            if (this.selectedActor) {
                /** @type {?} */
                let box = new psgeometry.AABB3D;
                this.selectedActor.Figures.forEach((fig) => {
                    box.addAABB(fig.getBoundingBox());
                });
                /** @type {?} */
                let bottomCenterPoint = new psgeometry.Vec3(box.center().x, box.minY, box.center().z);
                /** @type {?} */
                let selectionMarker = new modelstageweb.ActorWebGL(this.scene, SelectionTool.SelectionObjectID);
                let [r, g, b] = [.16, .34, .6];
                /** @type {?} */
                let meshBuilder = new modelstageweb.OpaqueMeshBuilder();
                // top lid
                meshBuilder.addStroke(box.minX, box.maxY, box.minZ, box.maxX, box.maxY, box.minZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.maxY, box.minZ, box.maxX, box.maxY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.maxY, box.maxZ, box.minX, box.maxY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.minX, box.maxY, box.maxZ, box.minX, box.maxY, box.minZ, r, g, b);
                // bottom lid
                meshBuilder.addStroke(box.minX, box.minY, box.minZ, box.maxX, box.minY, box.minZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.minY, box.minZ, box.maxX, box.minY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.minY, box.maxZ, box.minX, box.minY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.minX, box.minY, box.maxZ, box.minX, box.minY, box.minZ, r, g, b);
                // vertical lines
                meshBuilder.addStroke(box.minX, box.minY, box.minZ, box.minX, box.maxY, box.minZ, r, g, b);
                meshBuilder.addStroke(box.minX, box.minY, box.maxZ, box.minX, box.maxY, box.maxZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.minY, box.minZ, box.maxX, box.maxY, box.minZ, r, g, b);
                meshBuilder.addStroke(box.maxX, box.minY, box.maxZ, box.maxX, box.maxY, box.maxZ, r, g, b);
                selectionMarker.addFigure(meshBuilder.createFigure(this.stage, 'SEL_MARKER'));
                /** @type {?} */
                let figureBoundingBox = new psgeometry.AABB3D();
                [r, g, b] = [.6, .1, .1];
                /** @type {?} */
                let meshBuilder1 = new modelstageweb.OpaqueMeshBuilder();
                /** @type {?} */
                const segmentCount = 24;
                /** @type {?} */
                const radius0 = 1;
                /** @type {?} */
                const radius1 = 1.1;
                for (let i = 0; i < segmentCount; ++i) {
                    /** @type {?} */
                    let angle0 = 2 * Math.PI / segmentCount * i;
                    /** @type {?} */
                    let angle1 = 2 * Math.PI / segmentCount * (i + 1);
                    /** @type {?} */
                    let inner0 = new psgeometry.Vec3(Math.sin(angle0) * radius0, 0, Math.cos(angle0) * radius0).add(bottomCenterPoint);
                    /** @type {?} */
                    let inner1 = new psgeometry.Vec3(Math.sin(angle1) * radius0, 0, Math.cos(angle1) * radius0).add(bottomCenterPoint);
                    /** @type {?} */
                    let outer0 = new psgeometry.Vec3(Math.sin(angle0) * radius1, 0, Math.cos(angle0) * radius1).add(bottomCenterPoint);
                    /** @type {?} */
                    let outer1 = new psgeometry.Vec3(Math.sin(angle1) * radius1, 0, Math.cos(angle1) * radius1).add(bottomCenterPoint);
                    meshBuilder1.addQuad(outer0.x, outer0.y + 0.02, outer0.z, outer1.x, outer1.y + 0.02, outer1.z, inner1.x, inner1.y + 0.02, inner1.z, inner0.x, inner0.y + 0.02, inner0.z, r, g, b);
                    meshBuilder1.addQuad(outer0.x, outer1.y - 0.02, outer0.z, outer1.x, outer1.y - 0.02, outer1.z, outer1.x, outer1.y + 0.02, outer1.z, outer0.x, outer0.y + 0.02, outer0.z, r, g, b);
                    meshBuilder1.addQuad(inner0.x, inner0.y - 0.02, inner0.z, inner1.x, inner1.y - 0.02, inner1.z, outer1.x, outer1.y - 0.02, outer1.z, outer0.x, outer0.y - 0.02, outer0.z, r, g, b);
                    figureBoundingBox.addVector(outer0);
                }
                /** @type {?} */
                let figure = meshBuilder1.createFigure(this.stage, 'ROT_MARKER');
                figure.setIntersector(new modelstageweb.BoundingBoxIntersector(figureBoundingBox));
                selectionMarker.addFigure(figure);
                /** @type {?} */
                let sceneObjTranslation = this.scene.State.get('SceneObjectPos' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                /** @type {?} */
                let sceneObjRotation = this.scene.State.get('SceneObjectRot' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                selectionMarker.State.set('ModelTransform', psgeometry.Matrix4.FromRotation(sceneObjRotation.x, sceneObjRotation.y, sceneObjRotation.z).multiply(psgeometry.Matrix4.FromTranslation(sceneObjTranslation.x, sceneObjTranslation.y, sceneObjTranslation.z)));
                selectionMarker.Filter = new modelstageweb.GenericSceneItemFilterWebGL();
                this.scene.addSceneItem(selectionMarker, true);
            }
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseDown(e) {
            /** @type {?} */
            let viewRay = this.stage.Camera.getViewRay(e.clientX, e.clientY);
            /** @type {?} */
            let candidates = [];
            this.scene.getIntersectionCandidates(viewRay, candidates);
            /** @type {?} */
            let pickedObject = false;
            /** @type {?} */
            let currentIdx = 0;
            while (!pickedObject && currentIdx < candidates.length) {
                if (candidates[currentIdx].sceneItem instanceof modelstageweb.ActorWebGL) {
                    /** @type {?} */
                    let pickedActor = (/** @type {?} */ ((candidates[currentIdx].sceneItem)));
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
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleMouseMove(e, x, y) {
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) {
        }
    }
    SelectionTool.SelectionObjectID = 'SEL_MARKER';
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
    class PlaceActorTool extends ActorManipulationTool {
        /**
         * @param {?} figureID
         * @param {?} camera
         * @param {?} connection
         */
        constructor(figureID, camera, connection) {
            super(connection);
            this.camera = camera;
            this.sceneObj = new SceneObject();
            this.sceneObj.AssetID = figureID;
            this.sceneObj.SceneObjectID = modelstageweb.uuidv4();
            this.sceneObj.Location = new psgeometry.Vec4();
            this.sceneObj.Rotation = new psgeometry.Vec4();
            this.sceneObj.Scale = new psgeometry.Vec4(1, 1, 1, 1);
            SceneAppState.GlobalInstance.SceneObjects.append(this.sceneObj);
            this.sceneObjIdx = SceneAppState.GlobalInstance.SceneObjects.Count - 1;
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleMouseMove(e, x, y) {
            /** @type {?} */
            let viewRay = this.camera.getViewRay(x, y);
            /** @type {?} */
            let p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                this.sceneObj = Object.assign({}, this.sceneObj);
                this.sceneObj.Location = new psgeometry.Vec4(p.x, 0, p.z);
                SceneAppState.GlobalInstance.SceneObjects.replace(this.sceneObj, this.sceneObjIdx);
                //this.updateActorTranslation(this.actor, p.x, 0, p.z);
            }
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) {
            this.interfaceController.popTool();
        }
    }
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
    let UserNames = {
        'Administrator': 'Administrator',
        'Arne': 'Arne Thurm',
        'Ulrich': 'Ulrich Bönkemeyer',
        'Tom': 'Tom Jachmann',
        'Zacharias': 'Zacharias Reinhardt'
    };
    /** @type {?} */
    let PeerColors = [
        [0.31, 0.02, 0.06, 1.00],
        [0.02, 0.17, 0.31, 1.00],
        [0.02, 0.31, 0.06, 1.00],
        [0.69, 0.34, 0.00, 1.00],
        [0.33, 0.00, 0.53, 1.00],
    ];
    class MoveActorTool extends ActorManipulationTool {
        /**
         * @param {?} actor
         * @param {?} camera
         * @param {?} connection
         */
        constructor(actor, camera, connection) {
            super(connection);
            this.actor = actor;
            this.camera = camera;
            this.isInitialized = false;
        }
        /**
         * @param {?} e
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        handleMouseMove(e, x, y) {
            /** @type {?} */
            let viewRay = this.camera.getViewRay(x, y);
            /** @type {?} */
            let p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                if (this.isInitialized) {
                    let [sceneObj, sceneObjIdx] = this.getSceneObj(this.actor.Data['SceneObjID']);
                    if (sceneObj) {
                        /** @type {?} */
                        let translatedSceneObj = Object.assign({}, sceneObj);
                        /** @type {?} */
                        let translation = translatedSceneObj.Location;
                        translatedSceneObj.Location = translatedSceneObj.Location.add(new psgeometry.Vec4(p.x - this.lastX, 0, p.z - this.lastZ));
                        SceneAppState.GlobalInstance.SceneObjects.replace(translatedSceneObj, sceneObjIdx);
                    }
                }
                this.lastX = p.x;
                this.lastZ = p.z;
                this.isInitialized = true;
            }
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) {
            this.interfaceController.popTool();
        }
    }
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
    class RotateActorTool extends ActorManipulationTool {
        /**
         * @param {?} actor
         * @param {?} camera
         * @param {?} connection
         */
        constructor(actor, camera, connection) {
            super(connection);
            this.actor = actor;
            this.camera = camera;
        }
        /**
         * @param {?} e
         * @param {?} startX
         * @param {?} startY
         * @param {?} dX
         * @param {?} dY
         * @return {?}
         */
        handleDrag(e, startX, startY, dX, dY) {
            /** @type {?} */
            let fac = 1;
            if (Math.abs(e.clientY - startY) > 300) {
                fac = 6;
            }
            else if (Math.abs(e.clientY - startY) > 200) {
                fac = 3;
            }
            else if (Math.abs(e.clientY - startY) > 100) {
                fac = 2;
            }
            let [sceneObj, sceneObjIdx] = this.getSceneObj(this.actor.Data['SceneObjID']);
            if (sceneObj) {
                /** @type {?} */
                let rotatedSceneObj = Object.assign({}, sceneObj);
                /** @type {?} */
                let rotation = rotatedSceneObj.Rotation;
                rotatedSceneObj.Rotation = rotatedSceneObj.Rotation.add(new psgeometry.Vec4(dX / (fac * 100) * Math.PI, 0, 0));
                SceneAppState.GlobalInstance.SceneObjects.replace(rotatedSceneObj, sceneObjIdx);
            }
        }
        /**
         * @param {?} e
         * @return {?}
         */
        handleMouseUp(e) {
            this.interfaceController.popTool();
        }
    }
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
    class DemoSceneWebGL extends modelstageappstate.DirectedSceneWebGL {
        /**
         * @param {?} stage
         * @param {?} connection
         */
        constructor(stage, connection) {
            super(new modelstageappstate.Director(modelstageappstate.AppState.GetInstance()), connection);
            this.spaceActor = new modelstageweb.ActorWebGL(this, 'Space');
            this.director.Scene = this;
            this.stage = stage;
            this.spaceModel = new SpaceModel(this, this.stage, this.spaceActor);
            /** @type {?} */
            let shaderProgram = new modelstageweb.OpaqueMeshShaderProgramWebGL();
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
        }
        /**
         * @return {?}
         */
        get SpaceModel() { return this.spaceModel; }
        /**
         * @return {?}
         */
        initialize() {
            this.addSceneItem(this.spaceActor, true);
            this.spaceModel.updateSpace();
            $.when(
            //                this.stage.AssetFactory.getFromUrl('/data/commonassets.psmesh'),
            this.stage.AssetFactory.getFromUrl('/data/hologem.psmesh'), 
            //                this.stage.AssetFactory.getFromUrl('/data/office_assets.psmesh'),
            this.stage.AssetFactory.getFromUrl('/data/office_assets_bake.psmesh')).done(() => {
                this.IsInitialized = true;
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
        }
        /**
         * @return {?}
         */
        updateSpace() {
            this.spaceModel.clearVertices();
            for (let i = 0; i < RoomAppState.GlobalInstance.Vertices.Count; ++i) {
                /** @type {?} */
                let vert = RoomAppState.GlobalInstance.Vertices.GetItemAt(i);
                this.spaceModel.addVertex(vert.x, vert.z);
            }
            this.spaceModel.updateSpace();
        }
        /**
         * @param {?} peerID
         * @param {?} peerColorIndex
         * @param {?} userName
         * @return {?}
         */
        updatePeerInfo(peerID, peerColorIndex, userName) {
            if (peerID != '-1') {
                /** @type {?} */
                let peerInfoID = 'peer-info-' + peerID;
                /** @type {?} */
                let peerInfoElement = $('#' + peerInfoID);
                if (peerInfoElement.length > 0) {
                    peerInfoElement.find('span').text(userName);
                }
                else {
                    $('#participants-view').append('<li id="' + peerInfoID + '"><img src="images/info/Lens' + peerColorIndex + '.png" /><span>' + userName + '</span></li>');
                }
            }
        }
        /**
         * @param {?} peerID
         * @return {?}
         */
        removePeer(peerID) {
            this.removeSceneItem('Peer' + peerID);
            /** @type {?} */
            let peerInfoID = 'peer-info-' + peerID;
            /** @type {?} */
            let peerInfoElement = $('#' + peerInfoID);
            peerInfoElement.addClass('removing');
            setTimeout(() => {
                peerInfoElement.remove();
            }, 2000);
        }
        /**
         * @param {?} peerID
         * @return {?}
         */
        getColorIndexFromPeerID(peerID) {
            return (parseInt(peerID) - 1) % PeerColors.length;
        }
        /**
         * @param {?} peerID
         * @return {?}
         */
        createPeer(peerID) {
            /** @type {?} */
            let obj = new modelstageweb.ActorWebGL(this, 'Peer' + peerID);
            obj.addFigure(this.stage.AssetStore.Figures['hololens.hololens.000']);
            // TODO @UB: do this the right way...
            obj.Figures[0].ShaderInstances[0].ShaderKey = 'MatCapMeshShader';
            /** @type {?} */
            let colorIndex = this.getColorIndexFromPeerID(peerID);
            obj.State.set('Color', new psgeometry.Vec4(PeerColors[colorIndex][0], PeerColors[colorIndex][1], PeerColors[colorIndex][2], PeerColors[colorIndex][3]));
            obj.State.set('ModelTransform', (state) => {
                /** @type {?} */
                let pos = state.get('HeadPos' + peerID, psgeometry.Vec4.Zero);
                /** @type {?} */
                let cursor = state.get('CursPos' + peerID, psgeometry.Vec4.Zero);
                /** @type {?} */
                let dir = cursor.sub(pos);
                /** @type {?} */
                let spherical = psgeometry.Spherical.FromCartesianVector(dir);
                return ((/** @type {?} */ (psgeometry.Matrix4.FromRotationX(-spherical.azimuth).multiply(psgeometry.Matrix4.FromRotationY(-spherical.polar))))).multiply(psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z));
            });
            this.addSceneItem(obj, true /* makeVisible */);
            obj.TestIntersection = false;
            obj.TestChildrenIntersection = false;
            return obj;
        }
        /**
         * @param {?} objectID
         * @param {?} assetID
         * @return {?}
         */
        createSceneObject(objectID, assetID) {
            /** @type {?} */
            let suffix = objectID;
            /** @type {?} */
            let obj = new modelstageweb.ActorWebGL(this, 'SceneObject' + suffix);
            obj.State.set('ModelTransform', (state) => {
                /** @type {?} */
                let pos = state.get('SceneObjectPos' + suffix, psgeometry.Vec4.Zero);
                /** @type {?} */
                let rot = state.get('SceneObjectRot' + suffix, psgeometry.Vec4.Zero);
                /** @type {?} */
                let scale = state.get('SceneObjectScale' + suffix, psgeometry.Vec4.One);
                return (/** @type {?} */ (psgeometry.Matrix4.FromRotation(rot.x, rot.y, rot.z).multiply(psgeometry.Matrix4.FromScaling(scale.x, scale.y, scale.z).multiply(psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z)))));
            });
            obj.addFigure(this.stage.AssetStore.getFigure(assetID));
            obj.Data['SceneObjID'] = suffix;
            return obj;
        }
    }
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
    class RoomAppState extends modelstageappstate.AppStateCluster {
        constructor() {
            super();
            this.FloorLevel = new modelstageappstate.AppStateFloatValue();
            this.MasterView = new modelstageappstate.AppStateVector4Value();
            this.Vertices = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            RoomAppState.GlobalInstance = this;
        }
        /**
         * @return {?}
         */
        registerEntries() {
            this.registerEntry('FloorLevel', this.FloorLevel);
            this.registerEntry('MasterView', this.MasterView);
            this.registerEntry('Vertices', this.Vertices);
        }
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        readValue(key, reader) {
            if (key == 'Vertices') {
                return reader.Reader.readVec4();
            }
            else {
                return super.readValue(key, reader);
            }
        }
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        applyChanges(scene, peerID, instanceID) {
            if (this.FloorLevel.isDirty()) {
                scene.State.set('FloorLevel', this.FloorLevel.get());
                ((/** @type {?} */ (scene))).SpaceModel.FloorLevel = this.FloorLevel.get();
            }
            if (this.MasterView.isDirty()) {
                scene.State.set('MasterViewPos', this.MasterView.get());
            }
            if (this.Vertices.isDirty()) {
                /** @type {?} */
                let sc = (/** @type {?} */ (scene));
                ((/** @type {?} */ (scene))).updateSpace();
            }
        }
    }
    RoomAppState.ClusterTypeID = 'Room';
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
    class SceneObject {
    }
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
    class SceneAppState extends modelstageappstate.AppStateCluster {
        constructor() {
            super();
            this.SceneObjects = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            SceneAppState.GlobalInstance = this;
        }
        /**
         * @return {?}
         */
        registerEntries() {
            this.registerEntry('Obj', this.SceneObjects);
        }
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        readValue(key, reader) {
            if (key == 'Obj') {
                /** @type {?} */
                let value = new SceneObject();
                value.SceneObjectID = reader.Reader.readCharArray(40);
                value.AssetID = reader.Reader.readCharArray(40);
                value.Location = reader.Reader.readVec4();
                value.Rotation = reader.Reader.readVec4();
                value.Scale = reader.Reader.readVec4();
                return value;
            }
            else {
                return super.readValue(key, reader);
            }
        }
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(key, writer, value) {
            if (key == 'Obj') {
                writer.Writer.writeCharArray(value.SceneObjectID, 40);
                writer.Writer.writeCharArray(value.AssetID, 40);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeVec4(value.Rotation);
                writer.Writer.writeVec4(psgeometry.Vec4.One);
            }
            else {
                super.writeValue(key, writer, value);
            }
        }
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        applyChanges(scene, peerID, instanceID) {
            if (this.SceneObjects.isDirty()) {
                /** @type {?} */
                let sc = (/** @type {?} */ ((scene)));
                this.SceneObjects.Operations.forEach((operation) => {
                    if (operation.Operation == modelstageappstate.OperationType.Append) {
                        /** @type {?} */
                        let objID = operation.NewValue.SceneObjectID;
                        /** @type {?} */
                        let assetID = operation.NewValue.AssetID;
                        sc.addSceneItem(sc.createSceneObject(objID, assetID), true /* makeVisible */);
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                        //scene.RunSequence("ShowSceneObject", std::string{ "ShowSceneObject" } +noteID, { { "SceneObjectID", objID } });
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Replace) {
                        /** @type {?} */
                        let objID = operation.NewValue.SceneObjectID;
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Remove) {
                        /** @type {?} */
                        let objID = operation.PreviousValue.SceneObjectID;
                        scene.removeSceneItem('SceneObject' + objID);
                    }
                });
            }
        }
    }
    SceneAppState.ClusterTypeID = 'Obj';
    modelstage.SceneAppState = SceneAppState;
    if (false) {
        /** @type {?} */
        SceneAppState.ClusterTypeID;
        /** @type {?} */
        SceneAppState.GlobalInstance;
        /** @type {?} */
        SceneAppState.prototype.SceneObjects;
    }
    class PeerAppState extends modelstageappstate.AppStateCluster {
        constructor() {
            super(...arguments);
            this.headPos = new modelstageappstate.AppStateVector4Value();
            this.cursorPos = new modelstageappstate.AppStateVector4Value();
            this.userID = new modelstageappstate.AppStateStringValue();
            this.active = new modelstageappstate.AppStateBoolValue();
        }
        /**
         * @return {?}
         */
        providesInitializationData() {
            return true;
        }
        /**
         * @return {?}
         */
        registerEntries() {
            this.registerEntry('Head', this.headPos);
            this.registerEntry('Curs', this.cursorPos);
            this.registerEntry('User', this.userID);
            this.registerEntry('Active', this.active);
        }
        /**
         * @param {?} scene
         * @param {?} peerID
         * @param {?} instanceID
         * @return {?}
         */
        applyChanges(scene, peerID, instanceID) {
            /** @type {?} */
            let sc = (/** @type {?} */ (scene));
            if (peerID.length > 0 && (this.headPos.isDirty() || this.cursorPos.isDirty())) {
                if (!sc.getSceneItem('Peer' + peerID)) {
                    sc.createPeer(peerID);
                }
                /** @type {?} */
                let levelOfs = new psgeometry.Vec4(0, -sc.SpaceModel.FloorLevel, 0, 0);
                /** @type {?} */
                let headPos = this.headPos.get();
                /** @type {?} */
                let cursorPos = this.cursorPos.get();
                if (headPos && cursorPos) {
                    scene.State.set('HeadPos' + peerID, headPos.add(levelOfs));
                    scene.State.set('CursPos' + peerID, cursorPos.add(levelOfs));
                }
            }
            if (this.userID.isDirty()) {
                /** @type {?} */
                let userName = UserNames[this.userID.get()] || '';
                sc.updatePeerInfo(peerID, sc.getColorIndexFromPeerID(peerID), userName);
            }
            if (this.active.isDirty()) {
                if (!this.active.get()) {
                    sc.removePeer(peerID);
                }
            }
        }
    }
    PeerAppState.ClusterTypeID = 'Peer';
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
    class Note {
    }
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
    class NotesAppState extends modelstageappstate.AppStateCluster {
        constructor() {
            super();
            this.Notes = new modelstageappstate.AppStateCollection(modelstageappstate.AppStateCollectionOperation);
            NotesAppState.GlobalInstance = this;
        }
        /**
         * @return {?}
         */
        registerEntries() {
            this.registerEntry('Notes', this.Notes);
        }
        /**
         * @param {?} key
         * @param {?} reader
         * @return {?}
         */
        readValue(key, reader) {
            if (key == 'Notes') {
                /** @type {?} */
                let value = new Note();
                value.NoteID = reader.Reader.readCharArray(20);
                value.NoteType = reader.Reader.readUInt32();
                value.OwnerID = reader.Reader.readCharArray(10);
                value.Location = reader.Reader.readVec4();
                value.AzimuthalRotation = reader.Reader.readFloat32();
                return value;
            }
            else {
                return super.readValue(key, reader);
            }
        }
        /**
         * @param {?} key
         * @param {?} writer
         * @param {?} value
         * @return {?}
         */
        writeValue(key, writer, value) {
            if (key == 'Notes') {
                writer.Writer.writeCharArray(value.NoteID, 20);
                writer.Writer.writeInt32(value.NoteType);
                writer.Writer.writeCharArray(value.OwnerID, 10);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeFloat32(value.AzimuthalRotation);
            }
            else {
                super.writeValue(key, writer, value);
            }
        }
    }
    NotesAppState.ClusterTypeID = 'Notes';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzdGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tb2RlbHN0YWdlLyIsInNvdXJjZXMiOlsic3JjL21vZGVsc3RhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE1BQU0sS0FBUSxVQUFVLENBdzdCdkI7QUF4N0JELFdBQWMsVUFBVTtJQUNwQixNQUFNLEtBQUs7Ozs7O1FBQ0EsY0FBYyxDQUFDLFFBQThCO1lBQ2hELE9BQU8sTUFBTSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRDtRQUNBLENBQUM7S0FDSjtJQUVELE1BQWEsVUFBVTs7Ozs7O1FBVW5CLFlBQW9CLEtBQXFCLEVBQVUsS0FBK0IsRUFBVSxLQUErQjtZQUF2RyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQTBCO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBMEI7WUFSbkgsYUFBUSxHQUEyQixFQUFFLENBQUM7WUFFdEMsZUFBVSxHQUFXLENBQUMsQ0FBQztRQU8vQixDQUFDOzs7O1FBTEQsSUFBVyxVQUFVLEtBQUssT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFFbkQsSUFBVyxVQUFVLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztRQUszRCxvQkFBb0IsQ0FBQyxzQkFBNEQsRUFBRSxtQkFBc0Q7WUFDN0ksbUJBQW1CLENBQUMsT0FBTyxDQUN2QixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDckIsR0FBRyxFQUFF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QUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUNySSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFDckosSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQ3JKLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFF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QUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFM0YsYUFBYTtnQkFDYixXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTNGLGlCQUFpQjtnQkFDakIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUzRixlQUFlLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDOztvQkFFMUUsaUJBQWlCLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUUvQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztvQkFDckIsWUFBWSxHQUFHLElBQUksYUFBYSxDQUFDLGlCQUFpQixFQUFFOztzQkFDbEQsWUFBWSxHQUFHLEVBQUU7O3NCQUNqQixPQUFPLEdBQUcsQ0FBQzs7c0JBQ1gsT0FBTyxHQUFHLEdBQUc7Z0JBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUU7O3dCQUMvQixNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxHQUFHLENBQUM7O3dCQUN2QyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7d0JBQzdDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDOzt3QkFDOUcsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7O3dCQUM5RyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzs7d0JBQzlHLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO29CQUNsSCxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDcEQsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUNuQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ25DLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDbkMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFYixZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDcEQsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUNuQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ25DLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDbkMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFYixZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDcEQsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENB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YSxnQkE2Q3pCLENBQUE7OztRQTVDRyw0QkFBK0I7O1FBRS9CLDZCQUFxQzs7UUFFckMsOEJBQTRKOztBQTBDcEssQ0FBQyxFQXg3QmEsVUFBVSxLQUFWLFVBQVUsUUF3N0J2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyBNb2RlbFN0YWdlIMKpIDIwMTggUGxhbnN5c3RlbWUgR21iSCwgSGFtYnVyZywgR2VybWFueS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcbmltcG9ydCB7IG1vZGVsc3RhZ2V3ZWIgfSBmcm9tICcuL214LWNvbW1vbic7XHJcbmltcG9ydCB7IG1vZGVsc3RhZ2VhcHBzdGF0ZSB9IGZyb20gJy4vbXgtYXBwc3RhdGUnO1xyXG5pbXBvcnQgeyBwc2dlb21ldHJ5IH0gZnJvbSAnLi9wcy1nZW9tZXRyeSc7XHJcblxyXG5leHBvcnQgbW9kdWxlIG1vZGVsc3RhZ2Uge1xyXG4gICAgY2xhc3MgVGltZXIge1xyXG4gICAgICAgIHB1YmxpYyBhbmltYXRpb25GcmFtZShjYWxsYmFjazogRnJhbWVSZXF1ZXN0Q2FsbGJhY2spOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNwYWNlTW9kZWwge1xyXG4gXHJcbiAgICAgICAgcHJpdmF0ZSB2ZXJ0aWNlczogQXJyYXk8cHNnZW9tZXRyeS5WZWMyPiA9IFtdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGZsb29yTGV2ZWw6IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgRmxvb3JMZXZlbCgpIHsgcmV0dXJuIHRoaXMuZmxvb3JMZXZlbDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0IEZsb29yTGV2ZWwoZmxvb3JMZXZlbCkgeyB0aGlzLmZsb29yTGV2ZWwgPSBmbG9vckxldmVsOyB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2NlbmU6IERlbW9TY2VuZVdlYkdMLCBwcml2YXRlIHN0YWdlOiBtb2RlbHN0YWdld2ViLlN0YWdlV2ViR0wsIHByaXZhdGUgYWN0b3I6IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsaXplU3F1YXJlUm9vbSh0cmFuc3BhcmVudE1lc2hCdWlsZGVyOiBtb2RlbHN0YWdld2ViLlRyYW5zcGFyZW50TWVzaEJ1aWxkZXIsIHRleHR1cmVkTWVzaEJ1aWxkZXI6IG1vZGVsc3RhZ2V3ZWIuVGV4dHVyZWRNZXNoQnVpbGRlcikge1xyXG4gICAgICAgICAgICB0ZXh0dXJlZE1lc2hCdWlsZGVyLmFkZFF1YWQoXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAwLjAsIC01LjAsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICA1LjAsIDAuMCwgLTUuMCwgMSwgMCxcclxuICAgICAgICAgICAgICAgIDUuMCwgMC4wLCA1LjAsIDEsIDEsXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAwLjAsIDUuMCwgMCwgMSxcclxuICAgICAgICAgICAgICAgIDAuMywgMC4zLCAwLjMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdHJhbnNwYXJlbnRNZXNoQnVpbGRlci5hZGRRdWFkKFxyXG4gICAgICAgICAgICAgICAgLTUuMCwgMC4wLCAtNS4wLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAwLjAsIC01LjAsXHJcbiAgICAgICAgICAgICAgICA1LjAsIDIuNiwgLTUuMCxcclxuICAgICAgICAgICAgICAgIC01LjAsIDIuNiwgLTUuMCxcclxuICAgICAgICAgICAgICAgIDAuMSwgMC4xLCAwLjEsIC40LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50TWVzaEJ1aWxkZXIuYWRkUXVhZChcclxuICAgICAgICAgICAgICAgIC01LjAsIDAuMCwgNS4wLFxyXG4gICAgICAgICAgICAgICAgLTUuMCwgMi42LCA1LjAsXHJcbiAgICAgICAgICAgICAgICA1LjAsIDIuNiwgNS4wLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAwLjAsIDUuMCxcclxuICAgICAgICAgICAgICAgIDAuMSwgMC4xLCAwLjEsIC40LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50TWVzaEJ1aWxkZXIuYWRkUXVhZChcclxuICAgICAgICAgICAgICAgIC01LjAsIDAuMCwgLTUuMCxcclxuICAgICAgICAgICAgICAgIC01LjAsIDIuNiwgLTUuMCxcclxuICAgICAgICAgICAgICAgIC01LjAsIDIuNiwgNS4wLFxyXG4gICAgICAgICAgICAgICAgLTUuMCwgMC4wLCA1LjAsXHJcbiAgICAgICAgICAgICAgICAwLjE1LCAwLjE1LCAwLjE1LCAuNCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudE1lc2hCdWlsZGVyLmFkZFF1YWQoXHJcbiAgICAgICAgICAgICAgICA1LjAsIDAuMCwgLTUuMCxcclxuICAgICAgICAgICAgICAgIDUuMCwgMC4wLCA1LjAsXHJcbiAgICAgICAgICAgICAgICA1LjAsIDIuNiwgNS4wLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAyLjYsIC01LjAsXHJcbiAgICAgICAgICAgICAgICAwLjE1LCAwLjE1LCAwLjE1LCAuNCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemVBcmJpdHJhcnlSb29tKHRyYW5zcGFyZW50TWVzaEJ1aWxkZXI6IG1vZGVsc3RhZ2V3ZWIuVHJhbnNwYXJlbnRNZXNoQnVpbGRlciwgdGV4dHVyZWRNZXNoQnVpbGRlcjogbW9kZWxzdGFnZXdlYi5UZXh0dXJlZE1lc2hCdWlsZGVyKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgcG9seSA9IG5ldyBwc2dlb21ldHJ5LlBvbHlnb24yRCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwb2x5LmFkZFZlY3Rvcih0aGlzLnZlcnRpY2VzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYmJveCA9IG5ldyBwc2dlb21ldHJ5LkFBQkIyRCgpO1xyXG4gICAgICAgICAgICBwb2x5LmFkZFRvQUFCQihiYm94KTtcclxuICAgICAgICAgICAgdmFyIGV4dGVudHMgPSBiYm94LmV4dGVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS51cGRhdGVTaGFkb3dBcmVhKGJib3gpO1xyXG5cclxuICAgICAgICAgICAgcG9seSA9IHBvbHkudHJpYW5ndWxhdGUoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2x5LlZlcnRpY2VzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlZE1lc2hCdWlsZGVyLmFkZFRyaShcclxuICAgICAgICAgICAgICAgICAgICBwb2x5LlZlcnRpY2VzW2ldLngsIDAsIHBvbHkuVmVydGljZXNbaV0ueSwgKHBvbHkuVmVydGljZXNbaV0ueCAtIGJib3gubWluWCkgLyBleHRlbnRzLngsIChwb2x5LlZlcnRpY2VzW2ldLnkgLSBiYm94Lm1pblkpIC8gZXh0ZW50cy55LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvbHkuVmVydGljZXNbaSArIDFdLngsIDAsIHBvbHkuVmVydGljZXNbaSArIDFdLnksIChwb2x5LlZlcnRpY2VzW2kgKyAxXS54IC0gYmJveC5taW5YKSAvIGV4dGVudHMueCwgKHBvbHkuVmVydGljZXNbaSArIDFdLnkgLSBiYm94Lm1pblkpIC8gZXh0ZW50cy55LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvbHkuVmVydGljZXNbaSArIDJdLngsIDAsIHBvbHkuVmVydGljZXNbaSArIDJdLnksIChwb2x5LlZlcnRpY2VzW2kgKyAyXS54IC0gYmJveC5taW5YKSAvIGV4dGVudHMueCwgKHBvbHkuVmVydGljZXNbaSArIDJdLnkgLSBiYm94Lm1pblkpIC8gZXh0ZW50cy55LFxyXG4gICAgICAgICAgICAgICAgICAgIDAuMiwgMC4yLCAwLjIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHRoaXMudmVydGljZXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gdGhpcy52ZXJ0aWNlc1soaSArIDEpICUgdGhpcy52ZXJ0aWNlcy5sZW5ndGhdO1xyXG5cclxuICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50TWVzaEJ1aWxkZXIuYWRkUXVhZChcclxuICAgICAgICAgICAgICAgICAgICBzdGFydC54LCAwLjAsIHN0YXJ0LnksXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kLngsIDAuMCwgZW5kLnksXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kLngsIDIuNiwgZW5kLnksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQueCwgMi42LCBzdGFydC55LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZSA/IDAuMSA6IDAuMTUsIHRvZ2dsZSA/IDAuMSA6IDAuMTUsIHRvZ2dsZSA/IDAuMSA6IDAuMTUsIC40LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0b2dnbGUgPSAhdG9nZ2xlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHVwZGF0ZVNwYWNlKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNwYWNlSW5kaWNlcyA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCAnc3BhY2VfaW5kaWNlcycsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgc3BhY2VWZXJ0aWNlcyA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCAnc3BhY2VfdmVydGljZXMnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc3BhcmVudE1lc2hCdWlsZGVyID0gbmV3IG1vZGVsc3RhZ2V3ZWIuVHJhbnNwYXJlbnRNZXNoQnVpbGRlcihzcGFjZVZlcnRpY2VzLCBzcGFjZUluZGljZXMpO1xyXG4gICAgICAgICAgICBsZXQgZmxvb3JJbmRpY2VzID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQnVmZmVyQXNzZXRXZWJHTCh1bmRlZmluZWQsICdmbG9vcl9pbmRpY2VzJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGxldCBmbG9vclZlcnRpY2VzID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQnVmZmVyQXNzZXRXZWJHTCh1bmRlZmluZWQsICdmbG9vcl92ZXJ0aWNlcycsIGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IHRleHR1cmVkTWVzaEJ1aWxkZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5UZXh0dXJlZE1lc2hCdWlsZGVyKGZsb29yVmVydGljZXMsIGZsb29ySW5kaWNlcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNlcy5sZW5ndGggPCAzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVTcXVhcmVSb29tKHRyYW5zcGFyZW50TWVzaEJ1aWxkZXIsIHRleHR1cmVkTWVzaEJ1aWxkZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplQXJiaXRyYXJ5Um9vbSh0cmFuc3BhcmVudE1lc2hCdWlsZGVyLCB0ZXh0dXJlZE1lc2hCdWlsZGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZpZ3VyZSA9IG5ldyBtb2RlbHN0YWdld2ViLkZpZ3VyZVdlYkdMKCdTcGFjZScpO1xyXG5cclxuICAgICAgICAgICAgdGV4dHVyZWRNZXNoQnVpbGRlci5pbml0aWFsaXplKHRoaXMuc3RhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0U3RvcmUuYWRkQnVmZmVyQXNzZXQoJ2Zsb29yX2luZGljZXMnLCBmbG9vckluZGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0U3RvcmUuYWRkQnVmZmVyQXNzZXQoJ2Zsb29yX3ZlcnRpY2VzJywgZmxvb3JWZXJ0aWNlcyk7XHJcbiAgICAgICAgICAgIGxldCBmbG9vclNoYWRlckluc3RhbmNlID0gbmV3IG1vZGVsc3RhZ2V3ZWIuTWVzaFNoYWRlckluc3RhbmNlKCdUZXh0dXJlZE1lc2hTaGFkZXInKTtcclxuICAgICAgICAgICAgZmxvb3JTaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJywgJ2Zsb29yX2luZGljZXMnKTtcclxuICAgICAgICAgICAgZmxvb3JTaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ1ZlcnRleEJ1ZmZlcicsICdmbG9vcl92ZXJ0aWNlcycpO1xyXG4gICAgICAgICAgICBmbG9vclNoYWRlckluc3RhbmNlLmFkZFJlZmVyZW5jZSgnVGV4dHVyZUJ1ZmZlcicsICdTaGFkb3cnKTtcclxuICAgICAgICAgICAgZmlndXJlLmFkZFNoYWRlckluc3RhbmNlKGZsb29yU2hhZGVySW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnRNZXNoQnVpbGRlci5pbml0aWFsaXplKHRoaXMuc3RhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0U3RvcmUuYWRkQnVmZmVyQXNzZXQoJ3NwYWNlX2luZGljZXMnLCBzcGFjZUluZGljZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0U3RvcmUuYWRkQnVmZmVyQXNzZXQoJ3NwYWNlX3ZlcnRpY2VzJywgc3BhY2VWZXJ0aWNlcyk7XHJcbiAgICAgICAgICAgIGxldCBzaGFkZXJJbnN0YW5jZSA9IG5ldyBtb2RlbHN0YWdld2ViLk1lc2hTaGFkZXJJbnN0YW5jZSgnVHJhbnNwYXJlbnRNZXNoU2hhZGVyJyk7XHJcbiAgICAgICAgICAgIHNoYWRlckluc3RhbmNlLmFkZFJlZmVyZW5jZSgnSW5kZXhCdWZmZXInLCAnc3BhY2VfaW5kaWNlcycpO1xyXG4gICAgICAgICAgICBzaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ1ZlcnRleEJ1ZmZlcicsICdzcGFjZV92ZXJ0aWNlcycpO1xyXG4gICAgICAgICAgICBmaWd1cmUuYWRkU2hhZGVySW5zdGFuY2Uoc2hhZGVySW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rvci5GaWd1cmVzWzBdID0gZmlndXJlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdG9yLkZpbHRlciA9IG5ldyBtb2RlbHN0YWdld2ViLkdlbmVyaWNTY2VuZUl0ZW1GaWx0ZXJXZWJHTCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rvci5TY2VuZS5zZXREaXJ0eSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGVhclZlcnRpY2VzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkVmVydGV4KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgcHNnZW9tZXRyeS5WZWMyKHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRoZWF0ZXJXZWJHTCB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc3RhZ2U6IG1vZGVsc3RhZ2V3ZWIuU3RhZ2VXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0aW1lcjogVGltZXI7XHJcblxyXG4gICAgICAgIGdldCBTdGFnZSgpOiBtb2RlbHN0YWdld2ViLlN0YWdlV2ViR0wge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBTY2VuZSgpOiBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0wge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2VuZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNhbnZhc0VsZW1lbnRJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBuZXcgbW9kZWxzdGFnZXdlYi5TdGFnZVdlYkdMKGNhbnZhc0VsZW1lbnRJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnNjZW5lID0gbmV3IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aW1lciA9IG5ldyBUaW1lcigpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyLmFuaW1hdGlvbkZyYW1lKCgpID0+IHsgdGhpcy5wcm9jZXNzRnJhbWUoKSB9KTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7IHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlKCk7IH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTWFpbiByZW5kZXIgY3ljbGUgZm9yIGEgZnJhbWUuXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBwcm9jZXNzRnJhbWUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjZW5lICYmIHRoaXMuc2NlbmUuSXNJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5oaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW5kZXIgc2NlbmUuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIGF2YWlsYWJsZSBpbnRlcmFjdGlvbiBkYXRhIGFuZCByZW1vdGUgbWVzc2FnZXMgdG8gdXBkYXRlIGFwcGxpY2F0aW9uIHN0YXRlIGFuZC9vciB2aWV3IHN0YXRlIGZvciB0aGUgbmV4dCBmcmFtZS5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRmluYWxpemUgZnJhbWUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmVuZEZyYW1lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5iZWdpbkZyYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGltZXIuYW5pbWF0aW9uRnJhbWUoKCkgPT4geyB0aGlzLnByb2Nlc3NGcmFtZSgpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlbmRlcigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2NlbmUuSXNJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5yZW5kZXIodGhpcy5zY2VuZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25WaXNpYmlsaXR5Q2hhbmdlKCkge1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lci5hbmltYXRpb25GcmFtZSgoKSA9PiB7IHRoaXMucmVuZGVyKCkgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFjdG9yTWFuaXB1bGF0aW9uVG9vbCBleHRlbmRzIG1vZGVsc3RhZ2V3ZWIuVG9vbCB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBnZXRTY2VuZU9iaihvYmpJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBzY2VuZU9iaklkeCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBzY2VuZU9iaiA9IG51bGw7XHJcbiAgICAgICAgICAgIHdoaWxlIChzY2VuZU9iaklkeCA8IFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLkNvdW50ICYmICFzY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLkdldEl0ZW1BdChzY2VuZU9iaklkeCkuU2NlbmVPYmplY3RJRCA9PSBvYmpJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lT2JqID0gU2NlbmVBcHBTdGF0ZS5HbG9iYWxJbnN0YW5jZS5TY2VuZU9iamVjdHMuR2V0SXRlbUF0KHNjZW5lT2JqSWR4KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKytzY2VuZU9iaklkeDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gW3NjZW5lT2JqLCBzY2VuZU9iaklkeF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZU1vZGVsVHJhbnNmb3JtKGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wpIHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zbGF0aW9uVmVjID0gYWN0b3IuRGF0YVsndHJhbnNsYXRlJ10gfHwgcHNnZW9tZXRyeS5WZWM0Llplcm87XHJcbiAgICAgICAgICAgIGxldCByb3RhdGlvblZlYyA9IGFjdG9yLkRhdGFbJ3JvdGF0ZSddIHx8IHBzZ2VvbWV0cnkuVmVjNC5aZXJvO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoJ1NjZW5lfFRyYW5zZm9ybXwnICsgYWN0b3IuU2NlbmVJdGVtSUQgKyAnfCcgKyB0cmFuc2xhdGlvblZlYy54ICsgJywnICsgdHJhbnNsYXRpb25WZWMueSArICcsJyArIHRyYW5zbGF0aW9uVmVjLnogKyAnfCcgKyByb3RhdGlvblZlYy55ICsgJywnICsgcm90YXRpb25WZWMueCArICcsJyArIHJvdGF0aW9uVmVjLnopO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYW5zbGF0aW9uID0gcHNnZW9tZXRyeS5NYXRyaXg0LkZyb21UcmFuc2xhdGlvbih0cmFuc2xhdGlvblZlYy54LCB0cmFuc2xhdGlvblZlYy55LCB0cmFuc2xhdGlvblZlYy56KTtcclxuICAgICAgICAgICAgbGV0IHJvdGF0aW9uID0gcHNnZW9tZXRyeS5NYXRyaXg0LkZyb21Sb3RhdGlvblkocm90YXRpb25WZWMueSk7XHJcblxyXG4gICAgICAgICAgICBhY3Rvci5TdGF0ZS5zZXQoJ01vZGVsVHJhbnNmb3JtJywgPHBzZ2VvbWV0cnkuTWF0cml4ND5yb3RhdGlvbi5tdWx0aXBseSh0cmFuc2xhdGlvbikpO1xyXG4gICAgICAgICAgICBhY3Rvci5TY2VuZS5zZXREaXJ0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHVwZGF0ZUFjdG9yVHJhbnNsYXRpb24oYWN0b3I6IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICAgICAgICBhY3Rvci5EYXRhWyd0cmFuc2xhdGUnXSA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoeCwgeSwgeik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWxUcmFuc2Zvcm0oYWN0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHVwZGF0ZUFjdG9yUm90YXRpb24oYWN0b3I6IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICAgICAgICBhY3Rvci5EYXRhWydyb3RhdGUnXSA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoeCwgeSwgeik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWxUcmFuc2Zvcm0oYWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2VsZWN0aW9uVG9vbCBleHRlbmRzIEFjdG9yTWFuaXB1bGF0aW9uVG9vbCB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgU2VsZWN0aW9uT2JqZWN0SUQgPSAnU0VMX01BUktFUic7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2VsZWN0ZWRBY3RvcjogbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNjZW5lOiBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0wsIHByaXZhdGUgc3RhZ2U6IG1vZGVsc3RhZ2V3ZWIuU3RhZ2VXZWJHTCwgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGVudGVyKGludGVyZmFjZUNvbnRyb2xsZXI6IG1vZGVsc3RhZ2V3ZWIuSW50ZXJmYWNlQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBzdXBlci5lbnRlcihpbnRlcmZhY2VDb250cm9sbGVyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uTWFya2VyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgbGVhdmUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0aW9uTWFya2VyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlS2V5VXAoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gNDYgJiYgdGhpcy5zZWxlY3RlZEFjdG9yKSB7IC8vIGRlbGV0ZSBrZXlcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgW3NjZW5lT2JqLCBzY2VuZU9iaklkeF0gPSB0aGlzLmdldFNjZW5lT2JqKHRoaXMuc2VsZWN0ZWRBY3Rvci5EYXRhWydTY2VuZU9iaklEJ10pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjZW5lT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2NlbmVBcHBTdGF0ZS5HbG9iYWxJbnN0YW5jZS5TY2VuZU9iamVjdHMucmVtb3ZlKHNjZW5lT2JqSWR4KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbk1hcmtlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3RvciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVtb3ZlU2VsZWN0aW9uTWFya2VyKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZVNjZW5lSXRlbShTZWxlY3Rpb25Ub29sLlNlbGVjdGlvbk9iamVjdElEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlU2VsZWN0aW9uTWFya2VyKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZVNjZW5lSXRlbShTZWxlY3Rpb25Ub29sLlNlbGVjdGlvbk9iamVjdElEKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIGxldCBib3ggPSBuZXcgcHNnZW9tZXRyeS5BQUJCM0Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0b3IuRmlndXJlcy5mb3JFYWNoKChmaWcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBib3guYWRkQUFCQihmaWcuZ2V0Qm91bmRpbmdCb3goKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYm90dG9tQ2VudGVyUG9pbnQgPSBuZXcgcHNnZW9tZXRyeS5WZWMzKGJveC5jZW50ZXIoKS54LCBib3gubWluWSwgYm94LmNlbnRlcigpLnopO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1hcmtlciA9IG5ldyBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wodGhpcy5zY2VuZSwgU2VsZWN0aW9uVG9vbC5TZWxlY3Rpb25PYmplY3RJRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IFtyLCBnLCBiXSA9IFsuMTYsIC4zNCwgLjZdO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtZXNoQnVpbGRlciA9IG5ldyBtb2RlbHN0YWdld2ViLk9wYXF1ZU1lc2hCdWlsZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdG9wIGxpZFxyXG4gICAgICAgICAgICAgICAgbWVzaEJ1aWxkZXIuYWRkU3Ryb2tlKGJveC5taW5YLCBib3gubWF4WSwgYm94Lm1pblosIGJveC5tYXhYLCBib3gubWF4WSwgYm94Lm1pblosIHIsIGcsIGIpO1xyXG4gICAgICAgICAgICAgICAgbWVzaEJ1aWxkZXIuYWRkU3Ryb2tlKGJveC5tYXhYLCBib3gubWF4WSwgYm94Lm1pblosIGJveC5tYXhYLCBib3gubWF4WSwgYm94Lm1heFosIHIsIGcsIGIpO1xyXG4gICAgICAgICAgICAgICAgbWVzaEJ1aWxkZXIuYWRkU3Ryb2tlKGJveC5tYXhYLCBib3gubWF4WSwgYm94Lm1heFosIGJveC5taW5YLCBib3gubWF4WSwgYm94Lm1heFosIHIsIGcsIGIpO1xyXG4gICAgICAgICAgICAgICAgbWVzaEJ1aWxkZXIuYWRkU3Ryb2tlKGJveC5taW5YLCBib3gubWF4WSwgYm94Lm1heFosIGJveC5taW5YLCBib3gubWF4WSwgYm94Lm1pblosIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJvdHRvbSBsaWRcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWluWCwgYm94Lm1pblksIGJveC5taW5aLCBib3gubWF4WCwgYm94Lm1pblksIGJveC5taW5aLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWF4WCwgYm94Lm1pblksIGJveC5taW5aLCBib3gubWF4WCwgYm94Lm1pblksIGJveC5tYXhaLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWF4WCwgYm94Lm1pblksIGJveC5tYXhaLCBib3gubWluWCwgYm94Lm1pblksIGJveC5tYXhaLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWluWCwgYm94Lm1pblksIGJveC5tYXhaLCBib3gubWluWCwgYm94Lm1pblksIGJveC5taW5aLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgbGluZXNcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWluWCwgYm94Lm1pblksIGJveC5taW5aLCBib3gubWluWCwgYm94Lm1heFksIGJveC5taW5aLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWluWCwgYm94Lm1pblksIGJveC5tYXhaLCBib3gubWluWCwgYm94Lm1heFksIGJveC5tYXhaLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWF4WCwgYm94Lm1pblksIGJveC5taW5aLCBib3gubWF4WCwgYm94Lm1heFksIGJveC5taW5aLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWF4WCwgYm94Lm1pblksIGJveC5tYXhaLCBib3gubWF4WCwgYm94Lm1heFksIGJveC5tYXhaLCByLCBnLCBiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25NYXJrZXIuYWRkRmlndXJlKG1lc2hCdWlsZGVyLmNyZWF0ZUZpZ3VyZSh0aGlzLnN0YWdlLCAnU0VMX01BUktFUicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmlndXJlQm91bmRpbmdCb3ggPSBuZXcgcHNnZW9tZXRyeS5BQUJCM0QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBbciwgZywgYl0gPSBbLjYsIC4xLCAuMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzaEJ1aWxkZXIxID0gbmV3IG1vZGVsc3RhZ2V3ZWIuT3BhcXVlTWVzaEJ1aWxkZXIoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRDb3VudCA9IDI0O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFkaXVzMCA9IDE7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByYWRpdXMxID0gMS4xO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50Q291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZTAgPSAyICogTWF0aC5QSSAvIHNlZ21lbnRDb3VudCAqIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuZ2xlMSA9IDIgKiBNYXRoLlBJIC8gc2VnbWVudENvdW50ICogKGkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5uZXIwID0gbmV3IHBzZ2VvbWV0cnkuVmVjMyhNYXRoLnNpbihhbmdsZTApICogcmFkaXVzMCwgMCwgTWF0aC5jb3MoYW5nbGUwKSAqIHJhZGl1czApLmFkZChib3R0b21DZW50ZXJQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlubmVyMSA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoTWF0aC5zaW4oYW5nbGUxKSAqIHJhZGl1czAsIDAsIE1hdGguY29zKGFuZ2xlMSkgKiByYWRpdXMwKS5hZGQoYm90dG9tQ2VudGVyUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvdXRlcjAgPSBuZXcgcHNnZW9tZXRyeS5WZWMzKE1hdGguc2luKGFuZ2xlMCkgKiByYWRpdXMxLCAwLCBNYXRoLmNvcyhhbmdsZTApICogcmFkaXVzMSkuYWRkKGJvdHRvbUNlbnRlclBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3V0ZXIxID0gbmV3IHBzZ2VvbWV0cnkuVmVjMyhNYXRoLnNpbihhbmdsZTEpICogcmFkaXVzMSwgMCwgTWF0aC5jb3MoYW5nbGUxKSAqIHJhZGl1czEpLmFkZChib3R0b21DZW50ZXJQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaEJ1aWxkZXIxLmFkZFF1YWQob3V0ZXIwLngsIG91dGVyMC55ICsgMC4wMiwgb3V0ZXIwLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyMS54LCBvdXRlcjEueSArIDAuMDIsIG91dGVyMS56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjEueCwgaW5uZXIxLnkgKyAwLjAyLCBpbm5lcjEueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIwLngsIGlubmVyMC55ICsgMC4wMiwgaW5uZXIwLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZXNoQnVpbGRlcjEuYWRkUXVhZChvdXRlcjAueCwgb3V0ZXIxLnkgLSAwLjAyLCBvdXRlcjAueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIxLngsIG91dGVyMS55IC0gMC4wMiwgb3V0ZXIxLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyMS54LCBvdXRlcjEueSArIDAuMDIsIG91dGVyMS56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlcjAueCwgb3V0ZXIwLnkgKyAwLjAyLCBvdXRlcjAueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyMS5hZGRRdWFkKGlubmVyMC54LCBpbm5lcjAueSAtIDAuMDIsIGlubmVyMC56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lcjEueCwgaW5uZXIxLnkgLSAwLjAyLCBpbm5lcjEueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIxLngsIG91dGVyMS55IC0gMC4wMiwgb3V0ZXIxLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyMC54LCBvdXRlcjAueSAtIDAuMDIsIG91dGVyMC56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByLCBnLCBiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmlndXJlQm91bmRpbmdCb3guYWRkVmVjdG9yKG91dGVyMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlndXJlID0gbWVzaEJ1aWxkZXIxLmNyZWF0ZUZpZ3VyZSh0aGlzLnN0YWdlLCAnUk9UX01BUktFUicpO1xyXG4gICAgICAgICAgICAgICAgZmlndXJlLnNldEludGVyc2VjdG9yKG5ldyBtb2RlbHN0YWdld2ViLkJvdW5kaW5nQm94SW50ZXJzZWN0b3IoZmlndXJlQm91bmRpbmdCb3gpKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1hcmtlci5hZGRGaWd1cmUoZmlndXJlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2NlbmVPYmpUcmFuc2xhdGlvbiA9IHRoaXMuc2NlbmUuU3RhdGUuZ2V0KCdTY2VuZU9iamVjdFBvcycgKyB0aGlzLnNlbGVjdGVkQWN0b3IuRGF0YVsnU2NlbmVPYmpJRCddLCBwc2dlb21ldHJ5LlZlYzQuWmVybyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NlbmVPYmpSb3RhdGlvbiA9IHRoaXMuc2NlbmUuU3RhdGUuZ2V0KCdTY2VuZU9iamVjdFJvdCcgKyB0aGlzLnNlbGVjdGVkQWN0b3IuRGF0YVsnU2NlbmVPYmpJRCddLCBwc2dlb21ldHJ5LlZlYzQuWmVybyk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25NYXJrZXIuU3RhdGUuc2V0KCdNb2RlbFRyYW5zZm9ybScsIHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tUm90YXRpb24oc2NlbmVPYmpSb3RhdGlvbi54LCBzY2VuZU9ialJvdGF0aW9uLnksIHNjZW5lT2JqUm90YXRpb24ueikubXVsdGlwbHkocHNnZW9tZXRyeS5NYXRyaXg0LkZyb21UcmFuc2xhdGlvbihzY2VuZU9ialRyYW5zbGF0aW9uLngsIHNjZW5lT2JqVHJhbnNsYXRpb24ueSwgc2NlbmVPYmpUcmFuc2xhdGlvbi56KSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1hcmtlci5GaWx0ZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5HZW5lcmljU2NlbmVJdGVtRmlsdGVyV2ViR0woKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkU2NlbmVJdGVtKHNlbGVjdGlvbk1hcmtlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZURvd24oZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCB2aWV3UmF5ID0gdGhpcy5zdGFnZS5DYW1lcmEuZ2V0Vmlld1JheShlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGVzOiBBcnJheTxtb2RlbHN0YWdld2ViLkludGVyc2VjdGlvbkNhbmRpZGF0ZT4gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5nZXRJbnRlcnNlY3Rpb25DYW5kaWRhdGVzKHZpZXdSYXksIGNhbmRpZGF0ZXMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBpY2tlZE9iamVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudElkeCA9IDA7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoIXBpY2tlZE9iamVjdCAmJiBjdXJyZW50SWR4IDwgY2FuZGlkYXRlcy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuZGlkYXRlc1tjdXJyZW50SWR4XS5zY2VuZUl0ZW0gaW5zdGFuY2VvZiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBpY2tlZEFjdG9yID0gPG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTD4oY2FuZGlkYXRlc1tjdXJyZW50SWR4XS5zY2VuZUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWNrZWRBY3Rvci5TY2VuZUl0ZW1JRCAhPSBTZWxlY3Rpb25Ub29sLlNlbGVjdGlvbk9iamVjdElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwaWNrZWRBY3RvciA9PSB0aGlzLnNlbGVjdGVkQWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlci5wdXNoVG9vbChuZXcgTW92ZUFjdG9yVG9vbChwaWNrZWRBY3RvciwgdGhpcy5zdGFnZS5DYW1lcmEsIHRoaXMuY29ubmVjdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdG9yID0gcGlja2VkQWN0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbk1hcmtlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWNrZWRPYmplY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlci5wdXNoVG9vbChuZXcgUm90YXRlQWN0b3JUb29sKHRoaXMuc2VsZWN0ZWRBY3RvciwgdGhpcy5zdGFnZS5DYW1lcmEsIHRoaXMuY29ubmVjdGlvbikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlja2VkT2JqZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SWR4Kys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghcGlja2VkT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZVNjZW5lSXRlbShTZWxlY3Rpb25Ub29sLlNlbGVjdGlvbk9iamVjdElEKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0b3IgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VNb3ZlKGU6IEpRdWVyeS5FdmVudCwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZVVwKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUGxhY2VBY3RvclRvb2wgZXh0ZW5kcyBBY3Rvck1hbmlwdWxhdGlvblRvb2wge1xyXG4gICAgICAgIHByaXZhdGUgc2NlbmVPYmo6IFNjZW5lT2JqZWN0O1xyXG5cclxuICAgICAgICBwcml2YXRlIHNjZW5lT2JqSWR4OiBudW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGZpZ3VyZUlEOiBzdHJpbmcsIHByaXZhdGUgY2FtZXJhOiBtb2RlbHN0YWdld2ViLkNhbWVyYVdlYkdMLCBjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgc3VwZXIoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lT2JqID0gbmV3IFNjZW5lT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVPYmouQXNzZXRJRCA9IGZpZ3VyZUlEO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lT2JqLlNjZW5lT2JqZWN0SUQgPSBtb2RlbHN0YWdld2ViLnV1aWR2NCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lT2JqLkxvY2F0aW9uID0gbmV3IHBzZ2VvbWV0cnkuVmVjNCgpOyBcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU9iai5Sb3RhdGlvbiA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU9iai5TY2FsZSA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoMSwgMSwgMSwgMSk7XHJcbiAgICAgICAgICAgIFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLmFwcGVuZCh0aGlzLnNjZW5lT2JqKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVPYmpJZHggPSBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5Db3VudCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VNb3ZlKGU6IEpRdWVyeS5UcmlnZ2VyZWRFdmVudCwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgbGV0IHZpZXdSYXkgPSB0aGlzLmNhbWVyYS5nZXRWaWV3UmF5KHgsIHkpO1xyXG4gICAgICAgICAgICBsZXQgcCA9IHZpZXdSYXkuaW50ZXJzZWN0UmF5V2l0aFBsYW5lKG5ldyBwc2dlb21ldHJ5LlZlYzMoKSwgbmV3IHBzZ2VvbWV0cnkuVmVjMygwLCAxLCAwKSk7XHJcbiAgICAgICAgICAgIGlmIChwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lT2JqID0geyAuLi50aGlzLnNjZW5lT2JqIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lT2JqLkxvY2F0aW9uID0gbmV3IHBzZ2VvbWV0cnkuVmVjNChwLngsIDAsIHAueik7XHJcbiAgICAgICAgICAgICAgICBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5yZXBsYWNlKHRoaXMuc2NlbmVPYmosIHRoaXMuc2NlbmVPYmpJZHgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnVwZGF0ZUFjdG9yVHJhbnNsYXRpb24odGhpcy5hY3RvciwgcC54LCAwLCBwLnopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VVcChlOiBKUXVlcnkuRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyLnBvcFRvb2woKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxldCBVc2VyTmFtZXMgPSB7XHJcbiAgICAgICAgJ0FkbWluaXN0cmF0b3InOiAnQWRtaW5pc3RyYXRvcicsXHJcbiAgICAgICAgJ0FybmUnOiAnQXJuZSBUaHVybScsXHJcbiAgICAgICAgJ1VscmljaCc6ICdVbHJpY2ggQsO2bmtlbWV5ZXInLFxyXG4gICAgICAgICdUb20nOiAnVG9tIEphY2htYW5uJyxcclxuICAgICAgICAnWmFjaGFyaWFzJzogJ1phY2hhcmlhcyBSZWluaGFyZHQnXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBQZWVyQ29sb3JzID0gW1xyXG4gICAgICAgIFswLjMxLCAwLjAyLCAwLjA2LCAxLjAwXSwgIC8vIHJlZFxyXG4gICAgICAgIFswLjAyLCAwLjE3LCAwLjMxLCAxLjAwXSwgIC8vIGJsdWVcclxuICAgICAgICBbMC4wMiwgMC4zMSwgMC4wNiwgMS4wMF0sICAvLyBncmVlblxyXG4gICAgICAgIFswLjY5LCAwLjM0LCAwLjAwLCAxLjAwXSwgIC8vIG9yYW5nZVxyXG4gICAgICAgIFswLjMzLCAwLjAwLCAwLjUzLCAxLjAwXSwgIC8vIHB1cnBsZVxyXG4vLyAgICAgICAgWywgMS4wMF0sXHJcbi8vICAgICAgICBbLCAxLjAwXSxcclxuLy8gICAgICAgIFssIDEuMDBdLFxyXG4gICAgXTtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW92ZUFjdG9yVG9vbCBleHRlbmRzIEFjdG9yTWFuaXB1bGF0aW9uVG9vbCB7XHJcbiAgICAgICAgcHJpdmF0ZSBpc0luaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBsYXN0WDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbGFzdFo6IG51bWJlcjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3RvcjogbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMLCBwcml2YXRlIGNhbWVyYTogbW9kZWxzdGFnZXdlYi5DYW1lcmFXZWJHTCwgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlTW92ZShlOiBKUXVlcnkuVHJpZ2dlcmVkRXZlbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGxldCB2aWV3UmF5ID0gdGhpcy5jYW1lcmEuZ2V0Vmlld1JheSh4LCB5KTtcclxuICAgICAgICAgICAgbGV0IHAgPSB2aWV3UmF5LmludGVyc2VjdFJheVdpdGhQbGFuZShuZXcgcHNnZW9tZXRyeS5WZWMzKCksIG5ldyBwc2dlb21ldHJ5LlZlYzMoMCwgMSwgMCkpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBbc2NlbmVPYmosIHNjZW5lT2JqSWR4XSA9IHRoaXMuZ2V0U2NlbmVPYmoodGhpcy5hY3Rvci5EYXRhWydTY2VuZU9iaklEJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhbnNsYXRlZFNjZW5lT2JqOiBTY2VuZU9iamVjdCA9IHsgLi4uc2NlbmVPYmogfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0aW9uID0gdHJhbnNsYXRlZFNjZW5lT2JqLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVkU2NlbmVPYmouTG9jYXRpb24gPSB0cmFuc2xhdGVkU2NlbmVPYmouTG9jYXRpb24uYWRkKG5ldyBwc2dlb21ldHJ5LlZlYzQocC54IC0gdGhpcy5sYXN0WCwgMCwgcC56IC0gdGhpcy5sYXN0WikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5yZXBsYWNlKHRyYW5zbGF0ZWRTY2VuZU9iaiwgc2NlbmVPYmpJZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFggPSBwLng7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RaID0gcC56O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlVXAoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlci5wb3BUb29sKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUm90YXRlQWN0b3JUb29sIGV4dGVuZHMgQWN0b3JNYW5pcHVsYXRpb25Ub29sIHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wsIHByaXZhdGUgY2FtZXJhOiBtb2RlbHN0YWdld2ViLkNhbWVyYVdlYkdMLCBjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgc3VwZXIoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlRHJhZyhlOiBKUXVlcnkuRXZlbnQsIHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZFg6IG51bWJlciwgZFk6IG51bWJlcikge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZhYyA9IDE7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhlLmNsaWVudFkgLSBzdGFydFkpID4gMzAwKSB7XHJcbiAgICAgICAgICAgICAgICBmYWMgPSA2XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZS5jbGllbnRZIC0gc3RhcnRZKSA+IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgZmFjID0gM1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGUuY2xpZW50WSAtIHN0YXJ0WSkgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgIGZhYyA9IDJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IFtzY2VuZU9iaiwgc2NlbmVPYmpJZHhdID0gdGhpcy5nZXRTY2VuZU9iaih0aGlzLmFjdG9yLkRhdGFbJ1NjZW5lT2JqSUQnXSk7XHJcbiAgICAgICAgICAgIGlmIChzY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdGF0ZWRTY2VuZU9iajogU2NlbmVPYmplY3QgPSB7IC4uLnNjZW5lT2JqIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgcm90YXRpb24gPSByb3RhdGVkU2NlbmVPYmouUm90YXRpb247XHJcbiAgICAgICAgICAgICAgICByb3RhdGVkU2NlbmVPYmouUm90YXRpb24gPSByb3RhdGVkU2NlbmVPYmouUm90YXRpb24uYWRkKG5ldyBwc2dlb21ldHJ5LlZlYzQoZFggLyAoZmFjICogMTAwKSAqIE1hdGguUEksIDAsIDApKTtcclxuICAgICAgICAgICAgICAgIFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLnJlcGxhY2Uocm90YXRlZFNjZW5lT2JqLCBzY2VuZU9iaklkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZVVwKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucG9wVG9vbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIERlbW9TY2VuZVdlYkdMIGV4dGVuZHMgbW9kZWxzdGFnZWFwcHN0YXRlLkRpcmVjdGVkU2NlbmVXZWJHTCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhZ2U6IG1vZGVsc3RhZ2V3ZWIuU3RhZ2VXZWJHTDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzcGFjZUFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wgPSBuZXcgbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKHRoaXMsICdTcGFjZScpO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNwYWNlTW9kZWw6IFNwYWNlTW9kZWw7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU3BhY2VNb2RlbCgpIHsgcmV0dXJuIHRoaXMuc3BhY2VNb2RlbDsgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGFnZTogbW9kZWxzdGFnZXdlYi5TdGFnZVdlYkdMLCBjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgc3VwZXIobmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5EaXJlY3Rvcihtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGUuR2V0SW5zdGFuY2UoKSksIGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdG9yLlNjZW5lID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zcGFjZU1vZGVsID0gbmV3IFNwYWNlTW9kZWwodGhpcywgdGhpcy5zdGFnZSwgdGhpcy5zcGFjZUFjdG9yKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaGFkZXJQcm9ncmFtOiBtb2RlbHN0YWdld2ViLlNoYWRlclByb2dyYW1XZWJHTCA9IG5ldyBtb2RlbHN0YWdld2ViLk9wYXF1ZU1lc2hTaGFkZXJQcm9ncmFtV2ViR0woKTtcclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbS5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICAgICAgc3RhZ2UucmVnaXN0ZXJTaGFkZXJQcm9ncmFtKCdPcGFxdWVNZXNoU2hhZGVyJywgc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtID0gbmV3IG1vZGVsc3RhZ2V3ZWIuVHJhbnNwYXJlbnRNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0uaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHN0YWdlLnJlZ2lzdGVyU2hhZGVyUHJvZ3JhbSgnVHJhbnNwYXJlbnRNZXNoU2hhZGVyJywgc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtID0gbmV3IG1vZGVsc3RhZ2V3ZWIuVGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0uaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHN0YWdlLnJlZ2lzdGVyU2hhZGVyUHJvZ3JhbSgnVGV4dHVyZWRNZXNoU2hhZGVyJywgc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtID0gbmV3IG1vZGVsc3RhZ2V3ZWIuTWF0Q2FwU2hhZGVyUHJvZ3JhbVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0uaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHN0YWdlLnJlZ2lzdGVyU2hhZGVyUHJvZ3JhbSgnTWF0Q2FwTWVzaFNoYWRlcicsIHNoYWRlclByb2dyYW0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2hhZG93IHNoYWRlcnNcclxuXHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0gPSBuZXcgbW9kZWxzdGFnZXdlYi5TaGFkb3dUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtV2ViR0woKTtcclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbS5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICAgICAgc3RhZ2UucmVnaXN0ZXJQaGFzZVNwZWNpZmljU2hhZGVyUHJvZ3JhbSgnU2hhZG93JywgJ1RleHR1cmVkTWVzaFNoYWRlcicsIHNoYWRlclByb2dyYW0pO1xyXG5cclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbSA9IG5ldyBtb2RlbHN0YWdld2ViLlNoYWRvd1RleHR1cmVkTWVzaFNoYWRlclByb2dyYW1XZWJHTCgpO1xyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtLmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgICAgICBzdGFnZS5yZWdpc3RlclBoYXNlU3BlY2lmaWNTaGFkZXJQcm9ncmFtKCdTaGFkb3cnLCAnTWF0Q2FwTWVzaFNoYWRlcicsIHNoYWRlclByb2dyYW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2NlbmVJdGVtKHRoaXMuc3BhY2VBY3RvciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BhY2VNb2RlbC51cGRhdGVTcGFjZSgpO1xyXG5cclxuICAgICAgICAgICAgJC53aGVuKFxyXG4vLyAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9jb21tb25hc3NldHMucHNtZXNoJyksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9ob2xvZ2VtLnBzbWVzaCcpLFxyXG4vLyAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9vZmZpY2VfYXNzZXRzLnBzbWVzaCcpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldEZhY3RvcnkuZ2V0RnJvbVVybCgnL2RhdGEvb2ZmaWNlX2Fzc2V0c19iYWtlLnBzbWVzaCcpXHJcbiAgICAgICAgICAgICkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklzSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9pZjUtb2ZmaWNlLTEucHNtZXNoJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3RvciA9IG5ldyBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wodGhpcywgJ2FjdG9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4IGluIHRoaXMuc3RhZ2UuQXNzZXRTdG9yZS5GaWd1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3IuYWRkRmlndXJlKHRoaXMuc3RhZ2UuQXNzZXRTdG9yZS5GaWd1cmVzW3hdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NlbmVJdGVtKGFjdG9yLCB0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLkFzc2V0RmFjdG9yeS5nZXRGcm9tVXJsKCcvZGF0YS9hc3NldHMucHNtZXNoJykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgocmVxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9ncmVzcygocGVyY2VudGFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBwZXJjZW50YWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGVTcGFjZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGFjZU1vZGVsLmNsZWFyVmVydGljZXMoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBSb29tQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuVmVydGljZXMuQ291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZlcnQgPSBSb29tQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuVmVydGljZXMuR2V0SXRlbUF0KGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGFjZU1vZGVsLmFkZFZlcnRleCh2ZXJ0LngsIHZlcnQueik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zcGFjZU1vZGVsLnVwZGF0ZVNwYWNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlUGVlckluZm8ocGVlcklEOiBzdHJpbmcsIHBlZXJDb2xvckluZGV4OiBudW1iZXIsIHVzZXJOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHBlZXJJRCAhPSAnLTEnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGVlckluZm9JRCA9ICdwZWVyLWluZm8tJyArIHBlZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcGVlckluZm9FbGVtZW50ID0gJCgnIycgKyBwZWVySW5mb0lEKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGVlckluZm9FbGVtZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBwZWVySW5mb0VsZW1lbnQuZmluZCgnc3BhbicpLnRleHQodXNlck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcGFydGljaXBhbnRzLXZpZXcnKS5hcHBlbmQoJzxsaSBpZD1cIicgKyBwZWVySW5mb0lEICsgJ1wiPjxpbWcgc3JjPVwiaW1hZ2VzL2luZm8vTGVucycgKyBwZWVyQ29sb3JJbmRleCArICcucG5nXCIgLz48c3Bhbj4nICsgdXNlck5hbWUgKyAnPC9zcGFuPjwvbGk+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZW1vdmVQZWVyKHBlZXJJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2NlbmVJdGVtKCdQZWVyJyArIHBlZXJJRCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGVlckluZm9JRCA9ICdwZWVyLWluZm8tJyArIHBlZXJJRDtcclxuICAgICAgICAgICAgbGV0IHBlZXJJbmZvRWxlbWVudCA9ICQoJyMnICsgcGVlckluZm9JRCk7XHJcbiAgICAgICAgICAgIHBlZXJJbmZvRWxlbWVudC5hZGRDbGFzcygncmVtb3ZpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwZWVySW5mb0VsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldENvbG9ySW5kZXhGcm9tUGVlcklEKHBlZXJJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAocGFyc2VJbnQocGVlcklEKSAtIDEpICUgUGVlckNvbG9ycy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlUGVlcihwZWVySUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgb2JqOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wgPSBuZXcgbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKHRoaXMsICdQZWVyJyArIHBlZXJJRCk7XHJcbiAgICAgICAgICAgIG9iai5hZGRGaWd1cmUodGhpcy5zdGFnZS5Bc3NldFN0b3JlLkZpZ3VyZXNbJ2hvbG9sZW5zLmhvbG9sZW5zLjAwMCddKTtcclxuICAgICAgICAgICAgLy8gVE9ETyBAVUI6IGRvIHRoaXMgdGhlIHJpZ2h0IHdheS4uLlxyXG4gICAgICAgICAgICBvYmouRmlndXJlc1swXS5TaGFkZXJJbnN0YW5jZXNbMF0uU2hhZGVyS2V5ID0gJ01hdENhcE1lc2hTaGFkZXInO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbG9ySW5kZXggPSB0aGlzLmdldENvbG9ySW5kZXhGcm9tUGVlcklEKHBlZXJJRCk7XHJcblxyXG4gICAgICAgICAgICBvYmouU3RhdGUuc2V0KCdDb2xvcicsIG5ldyBwc2dlb21ldHJ5LlZlYzQoUGVlckNvbG9yc1tjb2xvckluZGV4XVswXSwgUGVlckNvbG9yc1tjb2xvckluZGV4XVsxXSwgUGVlckNvbG9yc1tjb2xvckluZGV4XVsyXSwgUGVlckNvbG9yc1tjb2xvckluZGV4XVszXSkpO1xyXG4gICAgICAgICAgICBvYmouU3RhdGUuc2V0KCdNb2RlbFRyYW5zZm9ybScsIChzdGF0ZTogbW9kZWxzdGFnZXdlYi5SZW5kZXJTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvczogcHNnZW9tZXRyeS5WZWM0ID0gc3RhdGUuZ2V0KCdIZWFkUG9zJyArIHBlZXJJRCwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvcjogcHNnZW9tZXRyeS5WZWM0ID0gc3RhdGUuZ2V0KCdDdXJzUG9zJyArIHBlZXJJRCwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpciA9IGN1cnNvci5zdWIocG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3BoZXJpY2FsID0gcHNnZW9tZXRyeS5TcGhlcmljYWwuRnJvbUNhcnRlc2lhblZlY3RvcihkaXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAoPHBzZ2VvbWV0cnkuTWF0cml4ND5wc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVJvdGF0aW9uWCgtc3BoZXJpY2FsLmF6aW11dGgpLm11bHRpcGx5KFxyXG4gICAgICAgICAgICAgICAgICAgIHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tUm90YXRpb25ZKC1zcGhlcmljYWwucG9sYXIpKSkubXVsdGlwbHkoXHJcbiAgICAgICAgICAgICAgICAgICAgcHNnZW9tZXRyeS5NYXRyaXg0LkZyb21UcmFuc2xhdGlvbihwb3MueCwgcG9zLnksIHBvcy56KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRTY2VuZUl0ZW0ob2JqLCB0cnVlIC8qIG1ha2VWaXNpYmxlICovKTtcclxuICAgICAgICAgICAgb2JqLlRlc3RJbnRlcnNlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgb2JqLlRlc3RDaGlsZHJlbkludGVyc2VjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVNjZW5lT2JqZWN0KG9iamVjdElEOiBzdHJpbmcsIGFzc2V0SUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgc3VmZml4ID0gb2JqZWN0SUQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTCh0aGlzLCAnU2NlbmVPYmplY3QnICsgc3VmZml4KTtcclxuICAgICAgICAgICAgb2JqLlN0YXRlLnNldCgnTW9kZWxUcmFuc2Zvcm0nLCAoc3RhdGU6IG1vZGVsc3RhZ2V3ZWIuUmVuZGVyU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSBzdGF0ZS5nZXQoJ1NjZW5lT2JqZWN0UG9zJyArIHN1ZmZpeCwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdCA9IHN0YXRlLmdldCgnU2NlbmVPYmplY3RSb3QnICsgc3VmZml4LCBwc2dlb21ldHJ5LlZlYzQuWmVybyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSBzdGF0ZS5nZXQoJ1NjZW5lT2JqZWN0U2NhbGUnICsgc3VmZml4LCBwc2dlb21ldHJ5LlZlYzQuT25lKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHBzZ2VvbWV0cnkuTWF0cml4ND5wc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVJvdGF0aW9uKHJvdC54LCByb3QueSwgcm90LnopLm11bHRpcGx5KFxyXG4gICAgICAgICAgICAgICAgICAgIHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tU2NhbGluZyhzY2FsZS54LCBzY2FsZS55LCBzY2FsZS56KS5tdWx0aXBseShcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHNnZW9tZXRyeS5NYXRyaXg0LkZyb21UcmFuc2xhdGlvbihwb3MueCwgcG9zLnksIHBvcy56KSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb2JqLmFkZEZpZ3VyZSh0aGlzLnN0YWdlLkFzc2V0U3RvcmUuZ2V0RmlndXJlKGFzc2V0SUQpKTtcclxuICAgICAgICAgICAgb2JqLkRhdGFbJ1NjZW5lT2JqSUQnXSA9IHN1ZmZpeDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUm9vbUFwcFN0YXRlIGV4dGVuZHMgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ2x1c3RlciB7XHJcbiAgICAgICAgc3RhdGljIENsdXN0ZXJUeXBlSUQgPSAnUm9vbSc7XHJcblxyXG4gICAgICAgIHN0YXRpYyBHbG9iYWxJbnN0YW5jZTogUm9vbUFwcFN0YXRlO1xyXG5cclxuICAgICAgICBwdWJsaWMgRmxvb3JMZXZlbDogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlRmxvYXRWYWx1ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVGbG9hdFZhbHVlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNYXN0ZXJWaWV3OiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVWZWN0b3I0VmFsdWUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlVmVjdG9yNFZhbHVlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZXJ0aWNlczogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ29sbGVjdGlvbjxwc2dlb21ldHJ5LlZlYzQ+ID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUNvbGxlY3Rpb248cHNnZW9tZXRyeS5WZWM0Pihtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uT3BlcmF0aW9uKTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICBSb29tQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyRW50cmllcygpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdGbG9vckxldmVsJywgdGhpcy5GbG9vckxldmVsKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdNYXN0ZXJWaWV3JywgdGhpcy5NYXN0ZXJWaWV3KTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdWZXJ0aWNlcycsIHRoaXMuVmVydGljZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRWYWx1ZShrZXk6IHN0cmluZywgcmVhZGVyOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVEZWx0YVJlYWRlcik6IGFueSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ1ZlcnRpY2VzJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRlci5SZWFkZXIucmVhZFZlYzQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5yZWFkVmFsdWUoa2V5LCByZWFkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYXBwbHlDaGFuZ2VzKHNjZW5lOiBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0wsIHBlZXJJRDogc3RyaW5nLCBpbnN0YW5jZUlEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuRmxvb3JMZXZlbC5pc0RpcnR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnRmxvb3JMZXZlbCcsIHRoaXMuRmxvb3JMZXZlbC5nZXQoKSk7XHJcbiAgICAgICAgICAgICAgICAoPERlbW9TY2VuZVdlYkdMPnNjZW5lKS5TcGFjZU1vZGVsLkZsb29yTGV2ZWwgPSB0aGlzLkZsb29yTGV2ZWwuZ2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuTWFzdGVyVmlldy5pc0RpcnR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnTWFzdGVyVmlld1BvcycsIHRoaXMuTWFzdGVyVmlldy5nZXQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuVmVydGljZXMuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2MgPSA8RGVtb1NjZW5lV2ViR0w+c2NlbmU7XHJcbiAgICAgICAgICAgICAgICAoPERlbW9TY2VuZVdlYkdMPnNjZW5lKS51cGRhdGVTcGFjZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFNjZW5lT2JqZWN0IHtcclxuICAgICAgICBwdWJsaWMgU2NlbmVPYmplY3RJRDogc3RyaW5nOyAvLyBjaGFyWzQwXVxyXG5cclxuICAgICAgICBwdWJsaWMgQXNzZXRJRDogc3RyaW5nOyAgICAgICAvLyBjaGFyWzIwXVxyXG5cclxuICAgICAgICBwdWJsaWMgTG9jYXRpb246IHBzZ2VvbWV0cnkuVmVjNDtcclxuXHJcbiAgICAgICAgcHVibGljIFJvdGF0aW9uOiBwc2dlb21ldHJ5LlZlYzQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTY2FsZTogcHNnZW9tZXRyeS5WZWM0O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTY2VuZUFwcFN0YXRlIGV4dGVuZHMgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ2x1c3RlciB7XHJcbiAgICAgICAgc3RhdGljIENsdXN0ZXJUeXBlSUQgPSAnT2JqJztcclxuXHJcbiAgICAgICAgc3RhdGljIEdsb2JhbEluc3RhbmNlOiBTY2VuZUFwcFN0YXRlO1xyXG5cclxuICAgICAgICBwdWJsaWMgU2NlbmVPYmplY3RzOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uPFNjZW5lT2JqZWN0PiA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uPFNjZW5lT2JqZWN0Pihtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uT3BlcmF0aW9uKTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWdpc3RlckVudHJpZXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnT2JqJywgdGhpcy5TY2VuZU9iamVjdHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRWYWx1ZShrZXk6IHN0cmluZywgcmVhZGVyOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVEZWx0YVJlYWRlcik6IGFueSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ09iaicpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IG5ldyBTY2VuZU9iamVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhbHVlLlNjZW5lT2JqZWN0SUQgPSByZWFkZXIuUmVhZGVyLnJlYWRDaGFyQXJyYXkoNDApO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuQXNzZXRJRCA9IHJlYWRlci5SZWFkZXIucmVhZENoYXJBcnJheSg0MCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5Mb2NhdGlvbiA9IHJlYWRlci5SZWFkZXIucmVhZFZlYzQoKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLlJvdGF0aW9uID0gcmVhZGVyLlJlYWRlci5yZWFkVmVjNCgpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuU2NhbGUgPSByZWFkZXIuUmVhZGVyLnJlYWRWZWM0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLnJlYWRWYWx1ZShrZXksIHJlYWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB3cml0ZVZhbHVlKGtleTogc3RyaW5nLCB3cml0ZXI6IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZURlbHRhV3JpdGVyLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ09iaicpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVDaGFyQXJyYXkodmFsdWUuU2NlbmVPYmplY3RJRCwgNDApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUNoYXJBcnJheSh2YWx1ZS5Bc3NldElELCA0MCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlVmVjNCh2YWx1ZS5Mb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlVmVjNCh2YWx1ZS5Sb3RhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlVmVjNChwc2dlb21ldHJ5LlZlYzQuT25lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1cGVyLndyaXRlVmFsdWUoa2V5LCB3cml0ZXIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFwcGx5Q2hhbmdlcyhzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMLCBwZWVySUQ6IHN0cmluZywgaW5zdGFuY2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNjZW5lT2JqZWN0cy5pc0RpcnR5KCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzYyA9IDxEZW1vU2NlbmVXZWJHTD4oc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuU2NlbmVPYmplY3RzLk9wZXJhdGlvbnMuZm9yRWFjaCgob3BlcmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5PcGVyYXRpb24gPT0gbW9kZWxzdGFnZWFwcHN0YXRlLk9wZXJhdGlvblR5cGUuQXBwZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmpJRCA9IG9wZXJhdGlvbi5OZXdWYWx1ZS5TY2VuZU9iamVjdElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXRJRCA9IG9wZXJhdGlvbi5OZXdWYWx1ZS5Bc3NldElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYy5hZGRTY2VuZUl0ZW0oc2MuY3JlYXRlU2NlbmVPYmplY3Qob2JqSUQsIGFzc2V0SUQpLCB0cnVlIC8qIG1ha2VWaXNpYmxlICovKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUuU3RhdGUuc2V0KCdTY2VuZU9iamVjdFBvcycgKyBvYmpJRCwgb3BlcmF0aW9uLk5ld1ZhbHVlLkxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUuU3RhdGUuc2V0KCdTY2VuZU9iamVjdFJvdCcgKyBvYmpJRCwgb3BlcmF0aW9uLk5ld1ZhbHVlLlJvdGF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUuU3RhdGUuc2V0KCdTY2VuZU9iamVjdFNjYWxlJyArIG9iaklELCBvcGVyYXRpb24uTmV3VmFsdWUuU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NjZW5lLlJ1blNlcXVlbmNlKFwiU2hvd1NjZW5lT2JqZWN0XCIsIHN0ZDo6c3RyaW5neyBcIlNob3dTY2VuZU9iamVjdFwiIH0gK25vdGVJRCwgeyB7IFwiU2NlbmVPYmplY3RJRFwiLCBvYmpJRCB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcGVyYXRpb24uT3BlcmF0aW9uID09IG1vZGVsc3RhZ2VhcHBzdGF0ZS5PcGVyYXRpb25UeXBlLlJlcGxhY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaklEID0gb3BlcmF0aW9uLk5ld1ZhbHVlLlNjZW5lT2JqZWN0SUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnU2NlbmVPYmplY3RQb3MnICsgb2JqSUQsIG9wZXJhdGlvbi5OZXdWYWx1ZS5Mb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnU2NlbmVPYmplY3RSb3QnICsgb2JqSUQsIG9wZXJhdGlvbi5OZXdWYWx1ZS5Sb3RhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnU2NlbmVPYmplY3RTY2FsZScgKyBvYmpJRCwgb3BlcmF0aW9uLk5ld1ZhbHVlLlNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3BlcmF0aW9uLk9wZXJhdGlvbiA9PSBtb2RlbHN0YWdlYXBwc3RhdGUuT3BlcmF0aW9uVHlwZS5SZW1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iaklEID0gb3BlcmF0aW9uLlByZXZpb3VzVmFsdWUuU2NlbmVPYmplY3RJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUucmVtb3ZlU2NlbmVJdGVtKCdTY2VuZU9iamVjdCcgKyBvYmpJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQZWVyQXBwU3RhdGUgZXh0ZW5kcyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDbHVzdGVyIHtcclxuICAgICAgICBzdGF0aWMgQ2x1c3RlclR5cGVJRCA9ICdQZWVyJztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBoZWFkUG9zOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVWZWN0b3I0VmFsdWUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlVmVjdG9yNFZhbHVlKCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3Vyc29yUG9zOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVWZWN0b3I0VmFsdWUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlVmVjdG9yNFZhbHVlKCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXNlcklEOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVTdHJpbmdWYWx1ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVTdHJpbmdWYWx1ZSgpO1xyXG5cclxuICAgICAgICBwcml2YXRlIGFjdGl2ZTogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQm9vbFZhbHVlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUJvb2xWYWx1ZSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgcHJvdmlkZXNJbml0aWFsaXphdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyRW50cmllcygpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdIZWFkJywgdGhpcy5oZWFkUG9zKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdDdXJzJywgdGhpcy5jdXJzb3JQb3MpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRW50cnkoJ1VzZXInLCB0aGlzLnVzZXJJRCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnQWN0aXZlJywgdGhpcy5hY3RpdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFwcGx5Q2hhbmdlcyhzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMLCBwZWVySUQ6IHN0cmluZywgaW5zdGFuY2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBzYyA9IDxEZW1vU2NlbmVXZWJHTD5zY2VuZTtcclxuICAgICAgICAgICAgaWYgKHBlZXJJRC5sZW5ndGggPiAwICYmICh0aGlzLmhlYWRQb3MuaXNEaXJ0eSgpIHx8IHRoaXMuY3Vyc29yUG9zLmlzRGlydHkoKSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2MuZ2V0U2NlbmVJdGVtKCdQZWVyJyArIHBlZXJJRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzYy5jcmVhdGVQZWVyKHBlZXJJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWxPZnMgPSBuZXcgcHNnZW9tZXRyeS5WZWM0KDAsIC1zYy5TcGFjZU1vZGVsLkZsb29yTGV2ZWwsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRQb3MgPSB0aGlzLmhlYWRQb3MuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3Vyc29yUG9zID0gdGhpcy5jdXJzb3JQb3MuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVhZFBvcyAmJiBjdXJzb3JQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZS5TdGF0ZS5zZXQoJ0hlYWRQb3MnICsgcGVlcklELCBoZWFkUG9zLmFkZChsZXZlbE9mcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnQ3Vyc1BvcycgKyBwZWVySUQsIGN1cnNvclBvcy5hZGQobGV2ZWxPZnMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlcklELmlzRGlydHkoKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJOYW1lID0gVXNlck5hbWVzW3RoaXMudXNlcklELmdldCgpXSB8fCAnJztcclxuICAgICAgICAgICAgICAgIHNjLnVwZGF0ZVBlZXJJbmZvKHBlZXJJRCwgc2MuZ2V0Q29sb3JJbmRleEZyb21QZWVySUQocGVlcklEKSwgdXNlck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmUuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWN0aXZlLmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MucmVtb3ZlUGVlcihwZWVySUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBOb3RlIHtcclxuICAgICAgICBwdWJsaWMgTm90ZUlEOiBzdHJpbmc7IC8vY2hhclsyMF07XHJcblxyXG4gICAgICAgIHB1YmxpYyBOb3RlVHlwZTogbnVtYmVyOyAvLyBpbnRcclxuXHJcbiAgICAgICAgcHVibGljIE93bmVySUQ6IHN0cmluZzsgLy8gY2hhclsxMF07XHJcblxyXG4gICAgICAgIHB1YmxpYyBBc3NpZ25lZFRvSUQ6IHN0cmluZzsgLy8gY2hhclsxMF07XHJcblxyXG4gICAgICAgIHB1YmxpYyBMb2NhdGlvbjogcHNnZW9tZXRyeS5WZWM0O1xyXG5cclxuICAgICAgICBwdWJsaWMgQXppbXV0aGFsUm90YXRpb246IG51bWJlcjsgLy8gZmxvYXRcdFx0XHRcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb3Rlc0FwcFN0YXRlIGV4dGVuZHMgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ2x1c3RlciB7XHJcbiAgICAgICAgc3RhdGljIENsdXN0ZXJUeXBlSUQgPSAnTm90ZXMnO1xyXG5cclxuICAgICAgICBzdGF0aWMgR2xvYmFsSW5zdGFuY2U6IE5vdGVzQXBwU3RhdGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBOb3RlczogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ29sbGVjdGlvbjxOb3RlPiA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uPE5vdGU+KG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUNvbGxlY3Rpb25PcGVyYXRpb24pO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIE5vdGVzQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyRW50cmllcygpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdOb3RlcycsIHRoaXMuTm90ZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlYWRWYWx1ZShrZXk6IHN0cmluZywgcmVhZGVyOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVEZWx0YVJlYWRlcik6IGFueSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ05vdGVzJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gbmV3IE5vdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5Ob3RlSUQgPSByZWFkZXIuUmVhZGVyLnJlYWRDaGFyQXJyYXkoMjApO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuTm90ZVR5cGUgPSByZWFkZXIuUmVhZGVyLnJlYWRVSW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLk93bmVySUQgPSByZWFkZXIuUmVhZGVyLnJlYWRDaGFyQXJyYXkoMTApO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuTG9jYXRpb24gPSByZWFkZXIuUmVhZGVyLnJlYWRWZWM0KCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5BemltdXRoYWxSb3RhdGlvbiA9IHJlYWRlci5SZWFkZXIucmVhZEZsb2F0MzIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIucmVhZFZhbHVlKGtleSwgcmVhZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHdyaXRlVmFsdWUoa2V5OiBzdHJpbmcsIHdyaXRlcjogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlRGVsdGFXcml0ZXIsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSAnTm90ZXMnKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlQ2hhckFycmF5KHZhbHVlLk5vdGVJRCwgMjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUludDMyKHZhbHVlLk5vdGVUeXBlKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVDaGFyQXJyYXkodmFsdWUuT3duZXJJRCwgMTApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZVZlYzQodmFsdWUuTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUZsb2F0MzIodmFsdWUuQXppbXV0aGFsUm90YXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIud3JpdGVWYWx1ZShrZXksIHdyaXRlciwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==