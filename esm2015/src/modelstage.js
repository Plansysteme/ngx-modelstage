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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzdGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tb2RlbHN0YWdlLyIsInNvdXJjZXMiOlsic3JjL21vZGVsc3RhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE1BQU0sS0FBUSxVQUFVLENBeTdCdkI7QUF6N0JELFdBQWMsVUFBVTtJQUVwQixNQUFNLEtBQUs7Ozs7O1FBQ0EsY0FBYyxDQUFDLFFBQThCO1lBQ2hELE9BQU8sTUFBTSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRDtRQUNBLENBQUM7S0FDSjtJQUVELE1BQWEsVUFBVTs7Ozs7O1FBVW5CLFlBQW9CLEtBQXFCLEVBQVUsS0FBK0IsRUFBVSxLQUErQjtZQUF2RyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQTBCO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBMEI7WUFSbkgsYUFBUSxHQUEyQixFQUFFLENBQUM7WUFFdEMsZUFBVSxHQUFXLENBQUMsQ0FBQztRQU8vQixDQUFDOzs7O1FBTEQsSUFBVyxVQUFVLEtBQUssT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFFbkQsSUFBVyxVQUFVLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztRQUszRCxvQkFBb0IsQ0FBQyxzQkFBNEQsRUFBRSxtQkFBc0Q7WUFDN0ksbUJBQW1CLENBQUMsT0FBTyxDQUN2QixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDckIsR0FBRyxFQUFF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QUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUNySSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFDckosSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQ3JKLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFF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QUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFM0YsYUFBYTtnQkFDYixXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTNGLGlCQUFpQjtnQkFDakIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0YsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUzRixlQUFlLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDOztvQkFFMUUsaUJBQWlCLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUUvQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztvQkFDckIsWUFBWSxHQUFHLElBQUksYUFBYSxDQUFDLGlCQUFpQixFQUFFOztzQkFDbEQsWUFBWSxHQUFHLEVBQUU7O3NCQUNqQixPQUFPLEdBQUcsQ0FBQzs7c0JBQ1gsT0FBTyxHQUFHLEdBQUc7Z0JBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUU7O3dCQUMvQixNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxHQUFHLENBQUM7O3dCQUN2QyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7d0JBQzdDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDOzt3QkFDOUcsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7O3dCQUM5RyxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzs7d0JBQzlHLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO29CQUNsSCxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDcEQsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUNuQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ25DLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDbkMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFYixZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDcEQsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUNuQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ25DLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDbkMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFYixZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDcEQsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENB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YSxnQkE2Q3pCLENBQUE7OztRQTVDRyw0QkFBK0I7O1FBRS9CLDZCQUFxQzs7UUFFckMsOEJBQTRKOztBQTBDcEssQ0FBQyxFQXo3QmEsVUFBVSxLQUFWLFVBQVUsUUF5N0J2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyBNb2RlbFN0YWdlIMKpIDIwMTggUGxhbnN5c3RlbWUgR21iSCwgSGFtYnVyZywgR2VybWFueS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcbmltcG9ydCB7IG1vZGVsc3RhZ2V3ZWIgfSBmcm9tICcuL214LWNvbW1vbic7XHJcbmltcG9ydCB7IG1vZGVsc3RhZ2VhcHBzdGF0ZSB9IGZyb20gJy4vbXgtYXBwc3RhdGUnO1xyXG5pbXBvcnQgeyBwc2dlb21ldHJ5IH0gZnJvbSAnLi9wcy1nZW9tZXRyeSc7XHJcblxyXG5leHBvcnQgbW9kdWxlIG1vZGVsc3RhZ2Uge1xyXG5cclxuICAgIGNsYXNzIFRpbWVyIHtcclxuICAgICAgICBwdWJsaWMgYW5pbWF0aW9uRnJhbWUoY2FsbGJhY2s6IEZyYW1lUmVxdWVzdENhbGxiYWNrKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTcGFjZU1vZGVsIHtcclxuIFxyXG4gICAgICAgIHByaXZhdGUgdmVydGljZXM6IEFycmF5PHBzZ2VvbWV0cnkuVmVjMj4gPSBbXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmbG9vckxldmVsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEZsb29yTGV2ZWwoKSB7IHJldHVybiB0aGlzLmZsb29yTGV2ZWw7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBGbG9vckxldmVsKGZsb29yTGV2ZWwpIHsgdGhpcy5mbG9vckxldmVsID0gZmxvb3JMZXZlbDsgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNjZW5lOiBEZW1vU2NlbmVXZWJHTCwgcHJpdmF0ZSBzdGFnZTogbW9kZWxzdGFnZXdlYi5TdGFnZVdlYkdMLCBwcml2YXRlIGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZVNxdWFyZVJvb20odHJhbnNwYXJlbnRNZXNoQnVpbGRlcjogbW9kZWxzdGFnZXdlYi5UcmFuc3BhcmVudE1lc2hCdWlsZGVyLCB0ZXh0dXJlZE1lc2hCdWlsZGVyOiBtb2RlbHN0YWdld2ViLlRleHR1cmVkTWVzaEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgdGV4dHVyZWRNZXNoQnVpbGRlci5hZGRRdWFkKFxyXG4gICAgICAgICAgICAgICAgLTUuMCwgMC4wLCAtNS4wLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAwLjAsIC01LjAsIDEsIDAsXHJcbiAgICAgICAgICAgICAgICA1LjAsIDAuMCwgNS4wLCAxLCAxLFxyXG4gICAgICAgICAgICAgICAgLTUuMCwgMC4wLCA1LjAsIDAsIDEsXHJcbiAgICAgICAgICAgICAgICAwLjMsIDAuMywgMC4zLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50TWVzaEJ1aWxkZXIuYWRkUXVhZChcclxuICAgICAgICAgICAgICAgIC01LjAsIDAuMCwgLTUuMCxcclxuICAgICAgICAgICAgICAgIDUuMCwgMC4wLCAtNS4wLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAyLjYsIC01LjAsXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAyLjYsIC01LjAsXHJcbiAgICAgICAgICAgICAgICAwLjEsIDAuMSwgMC4xLCAuNCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudE1lc2hCdWlsZGVyLmFkZFF1YWQoXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAwLjAsIDUuMCxcclxuICAgICAgICAgICAgICAgIC01LjAsIDIuNiwgNS4wLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAyLjYsIDUuMCxcclxuICAgICAgICAgICAgICAgIDUuMCwgMC4wLCA1LjAsXHJcbiAgICAgICAgICAgICAgICAwLjEsIDAuMSwgMC4xLCAuNCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudE1lc2hCdWlsZGVyLmFkZFF1YWQoXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAwLjAsIC01LjAsXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAyLjYsIC01LjAsXHJcbiAgICAgICAgICAgICAgICAtNS4wLCAyLjYsIDUuMCxcclxuICAgICAgICAgICAgICAgIC01LjAsIDAuMCwgNS4wLFxyXG4gICAgICAgICAgICAgICAgMC4xNSwgMC4xNSwgMC4xNSwgLjQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdHJhbnNwYXJlbnRNZXNoQnVpbGRlci5hZGRRdWFkKFxyXG4gICAgICAgICAgICAgICAgNS4wLCAwLjAsIC01LjAsXHJcbiAgICAgICAgICAgICAgICA1LjAsIDAuMCwgNS4wLFxyXG4gICAgICAgICAgICAgICAgNS4wLCAyLjYsIDUuMCxcclxuICAgICAgICAgICAgICAgIDUuMCwgMi42LCAtNS4wLFxyXG4gICAgICAgICAgICAgICAgMC4xNSwgMC4xNSwgMC4xNSwgLjQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsaXplQXJiaXRyYXJ5Um9vbSh0cmFuc3BhcmVudE1lc2hCdWlsZGVyOiBtb2RlbHN0YWdld2ViLlRyYW5zcGFyZW50TWVzaEJ1aWxkZXIsIHRleHR1cmVkTWVzaEJ1aWxkZXI6IG1vZGVsc3RhZ2V3ZWIuVGV4dHVyZWRNZXNoQnVpbGRlcikge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvZ2dsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBvbHkgPSBuZXcgcHNnZW9tZXRyeS5Qb2x5Z29uMkQoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcG9seS5hZGRWZWN0b3IodGhpcy52ZXJ0aWNlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGJib3ggPSBuZXcgcHNnZW9tZXRyeS5BQUJCMkQoKTtcclxuICAgICAgICAgICAgcG9seS5hZGRUb0FBQkIoYmJveCk7XHJcbiAgICAgICAgICAgIHZhciBleHRlbnRzID0gYmJveC5leHRlbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UudXBkYXRlU2hhZG93QXJlYShiYm94KTtcclxuXHJcbiAgICAgICAgICAgIHBvbHkgPSBwb2x5LnRyaWFuZ3VsYXRlKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9seS5WZXJ0aWNlcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZWRNZXNoQnVpbGRlci5hZGRUcmkoXHJcbiAgICAgICAgICAgICAgICAgICAgcG9seS5WZXJ0aWNlc1tpXS54LCAwLCBwb2x5LlZlcnRpY2VzW2ldLnksIChwb2x5LlZlcnRpY2VzW2ldLnggLSBiYm94Lm1pblgpIC8gZXh0ZW50cy54LCAocG9seS5WZXJ0aWNlc1tpXS55IC0gYmJveC5taW5ZKSAvIGV4dGVudHMueSxcclxuICAgICAgICAgICAgICAgICAgICBwb2x5LlZlcnRpY2VzW2kgKyAxXS54LCAwLCBwb2x5LlZlcnRpY2VzW2kgKyAxXS55LCAocG9seS5WZXJ0aWNlc1tpICsgMV0ueCAtIGJib3gubWluWCkgLyBleHRlbnRzLngsIChwb2x5LlZlcnRpY2VzW2kgKyAxXS55IC0gYmJveC5taW5ZKSAvIGV4dGVudHMueSxcclxuICAgICAgICAgICAgICAgICAgICBwb2x5LlZlcnRpY2VzW2kgKyAyXS54LCAwLCBwb2x5LlZlcnRpY2VzW2kgKyAyXS55LCAocG9seS5WZXJ0aWNlc1tpICsgMl0ueCAtIGJib3gubWluWCkgLyBleHRlbnRzLngsIChwb2x5LlZlcnRpY2VzW2kgKyAyXS55IC0gYmJveC5taW5ZKSAvIGV4dGVudHMueSxcclxuICAgICAgICAgICAgICAgICAgICAwLjIsIDAuMiwgMC4yLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnZlcnRpY2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IHRoaXMudmVydGljZXNbKGkgKyAxKSAlIHRoaXMudmVydGljZXMubGVuZ3RoXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudE1lc2hCdWlsZGVyLmFkZFF1YWQoXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQueCwgMC4wLCBzdGFydC55LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZC54LCAwLjAsIGVuZC55LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZC54LCAyLjYsIGVuZC55LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LngsIDIuNiwgc3RhcnQueSxcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGUgPyAwLjEgOiAwLjE1LCB0b2dnbGUgPyAwLjEgOiAwLjE1LCB0b2dnbGUgPyAwLjEgOiAwLjE1LCAuNCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlID0gIXRvZ2dsZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGVTcGFjZSgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcGFjZUluZGljZXMgPSBuZXcgbW9kZWxzdGFnZXdlYi5CdWZmZXJBc3NldFdlYkdMKHVuZGVmaW5lZCwgJ3NwYWNlX2luZGljZXMnLCB0cnVlKTtcclxuICAgICAgICAgICAgbGV0IHNwYWNlVmVydGljZXMgPSBuZXcgbW9kZWxzdGFnZXdlYi5CdWZmZXJBc3NldFdlYkdMKHVuZGVmaW5lZCwgJ3NwYWNlX3ZlcnRpY2VzJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNwYXJlbnRNZXNoQnVpbGRlciA9IG5ldyBtb2RlbHN0YWdld2ViLlRyYW5zcGFyZW50TWVzaEJ1aWxkZXIoc3BhY2VWZXJ0aWNlcywgc3BhY2VJbmRpY2VzKTtcclxuICAgICAgICAgICAgbGV0IGZsb29ySW5kaWNlcyA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCAnZmxvb3JfaW5kaWNlcycsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgZmxvb3JWZXJ0aWNlcyA9IG5ldyBtb2RlbHN0YWdld2ViLkJ1ZmZlckFzc2V0V2ViR0wodW5kZWZpbmVkLCAnZmxvb3JfdmVydGljZXMnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlZE1lc2hCdWlsZGVyID0gbmV3IG1vZGVsc3RhZ2V3ZWIuVGV4dHVyZWRNZXNoQnVpbGRlcihmbG9vclZlcnRpY2VzLCBmbG9vckluZGljZXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudmVydGljZXMubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplU3F1YXJlUm9vbSh0cmFuc3BhcmVudE1lc2hCdWlsZGVyLCB0ZXh0dXJlZE1lc2hCdWlsZGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUFyYml0cmFyeVJvb20odHJhbnNwYXJlbnRNZXNoQnVpbGRlciwgdGV4dHVyZWRNZXNoQnVpbGRlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmaWd1cmUgPSBuZXcgbW9kZWxzdGFnZXdlYi5GaWd1cmVXZWJHTCgnU3BhY2UnKTtcclxuXHJcbiAgICAgICAgICAgIHRleHR1cmVkTWVzaEJ1aWxkZXIuaW5pdGlhbGl6ZSh0aGlzLnN0YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KCdmbG9vcl9pbmRpY2VzJywgZmxvb3JJbmRpY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KCdmbG9vcl92ZXJ0aWNlcycsIGZsb29yVmVydGljZXMpO1xyXG4gICAgICAgICAgICBsZXQgZmxvb3JTaGFkZXJJbnN0YW5jZSA9IG5ldyBtb2RlbHN0YWdld2ViLk1lc2hTaGFkZXJJbnN0YW5jZSgnVGV4dHVyZWRNZXNoU2hhZGVyJyk7XHJcbiAgICAgICAgICAgIGZsb29yU2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdJbmRleEJ1ZmZlcicsICdmbG9vcl9pbmRpY2VzJyk7XHJcbiAgICAgICAgICAgIGZsb29yU2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInLCAnZmxvb3JfdmVydGljZXMnKTtcclxuICAgICAgICAgICAgZmxvb3JTaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ1RleHR1cmVCdWZmZXInLCAnU2hhZG93Jyk7XHJcbiAgICAgICAgICAgIGZpZ3VyZS5hZGRTaGFkZXJJbnN0YW5jZShmbG9vclNoYWRlckluc3RhbmNlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50TWVzaEJ1aWxkZXIuaW5pdGlhbGl6ZSh0aGlzLnN0YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KCdzcGFjZV9pbmRpY2VzJywgc3BhY2VJbmRpY2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldFN0b3JlLmFkZEJ1ZmZlckFzc2V0KCdzcGFjZV92ZXJ0aWNlcycsIHNwYWNlVmVydGljZXMpO1xyXG4gICAgICAgICAgICBsZXQgc2hhZGVySW5zdGFuY2UgPSBuZXcgbW9kZWxzdGFnZXdlYi5NZXNoU2hhZGVySW5zdGFuY2UoJ1RyYW5zcGFyZW50TWVzaFNoYWRlcicpO1xyXG4gICAgICAgICAgICBzaGFkZXJJbnN0YW5jZS5hZGRSZWZlcmVuY2UoJ0luZGV4QnVmZmVyJywgJ3NwYWNlX2luZGljZXMnKTtcclxuICAgICAgICAgICAgc2hhZGVySW5zdGFuY2UuYWRkUmVmZXJlbmNlKCdWZXJ0ZXhCdWZmZXInLCAnc3BhY2VfdmVydGljZXMnKTtcclxuICAgICAgICAgICAgZmlndXJlLmFkZFNoYWRlckluc3RhbmNlKHNoYWRlckluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0b3IuRmlndXJlc1swXSA9IGZpZ3VyZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rvci5GaWx0ZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5HZW5lcmljU2NlbmVJdGVtRmlsdGVyV2ViR0woKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0b3IuU2NlbmUuc2V0RGlydHkoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xlYXJWZXJ0aWNlcygpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFZlcnRleCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IHBzZ2VvbWV0cnkuVmVjMih4LCB5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUaGVhdGVyV2ViR0wge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHN0YWdlOiBtb2RlbHN0YWdld2ViLlN0YWdlV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGltZXI6IFRpbWVyO1xyXG5cclxuICAgICAgICBnZXQgU3RhZ2UoKTogbW9kZWxzdGFnZXdlYi5TdGFnZVdlYkdMIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgU2NlbmUoKTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihjYW52YXNFbGVtZW50SUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbmV3IG1vZGVsc3RhZ2V3ZWIuU3RhZ2VXZWJHTChjYW52YXNFbGVtZW50SUQpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5zY2VuZSA9IG5ldyBtb2RlbHN0YWdld2ViLlNjZW5lV2ViR0woKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lci5hbmltYXRpb25GcmFtZSgoKSA9PiB7IHRoaXMucHJvY2Vzc0ZyYW1lKCkgfSk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4geyB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSgpOyB9LCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE1haW4gcmVuZGVyIGN5Y2xlIGZvciBhIGZyYW1lLlxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgcHJvY2Vzc0ZyYW1lKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY2VuZSAmJiB0aGlzLnNjZW5lLklzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQuaGlkZGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVuZGVyIHNjZW5lLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBhdmFpbGFibGUgaW50ZXJhY3Rpb24gZGF0YSBhbmQgcmVtb3RlIG1lc3NhZ2VzIHRvIHVwZGF0ZSBhcHBsaWNhdGlvbiBzdGF0ZSBhbmQvb3IgdmlldyBzdGF0ZSBmb3IgdGhlIG5leHQgZnJhbWUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZpbmFsaXplIGZyYW1lLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5lbmRGcmFtZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUuYmVnaW5GcmFtZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWVyLmFuaW1hdGlvbkZyYW1lKCgpID0+IHsgdGhpcy5wcm9jZXNzRnJhbWUoKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjZW5lLklzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UucmVuZGVyKHRoaXMuc2NlbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uVmlzaWJpbGl0eUNoYW5nZSgpIHtcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5oaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXIuYW5pbWF0aW9uRnJhbWUoKCkgPT4geyB0aGlzLnJlbmRlcigpIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBY3Rvck1hbmlwdWxhdGlvblRvb2wgZXh0ZW5kcyBtb2RlbHN0YWdld2ViLlRvb2wge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0U2NlbmVPYmoob2JqSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgc2NlbmVPYmpJZHggPSAwO1xyXG4gICAgICAgICAgICBsZXQgc2NlbmVPYmogPSBudWxsO1xyXG4gICAgICAgICAgICB3aGlsZSAoc2NlbmVPYmpJZHggPCBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5Db3VudCAmJiAhc2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5HZXRJdGVtQXQoc2NlbmVPYmpJZHgpLlNjZW5lT2JqZWN0SUQgPT0gb2JqSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU9iaiA9IFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLkdldEl0ZW1BdChzY2VuZU9iaklkeCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICsrc2NlbmVPYmpJZHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFtzY2VuZU9iaiwgc2NlbmVPYmpJZHhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVNb2RlbFRyYW5zZm9ybShhY3RvcjogbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGlvblZlYyA9IGFjdG9yLkRhdGFbJ3RyYW5zbGF0ZSddIHx8IHBzZ2VvbWV0cnkuVmVjNC5aZXJvO1xyXG4gICAgICAgICAgICBsZXQgcm90YXRpb25WZWMgPSBhY3Rvci5EYXRhWydyb3RhdGUnXSB8fCBwc2dlb21ldHJ5LlZlYzQuWmVybztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKCdTY2VuZXxUcmFuc2Zvcm18JyArIGFjdG9yLlNjZW5lSXRlbUlEICsgJ3wnICsgdHJhbnNsYXRpb25WZWMueCArICcsJyArIHRyYW5zbGF0aW9uVmVjLnkgKyAnLCcgKyB0cmFuc2xhdGlvblZlYy56ICsgJ3wnICsgcm90YXRpb25WZWMueSArICcsJyArIHJvdGF0aW9uVmVjLnggKyAnLCcgKyByb3RhdGlvblZlYy56KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGlvbiA9IHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tVHJhbnNsYXRpb24odHJhbnNsYXRpb25WZWMueCwgdHJhbnNsYXRpb25WZWMueSwgdHJhbnNsYXRpb25WZWMueik7XHJcbiAgICAgICAgICAgIGxldCByb3RhdGlvbiA9IHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tUm90YXRpb25ZKHJvdGF0aW9uVmVjLnkpO1xyXG5cclxuICAgICAgICAgICAgYWN0b3IuU3RhdGUuc2V0KCdNb2RlbFRyYW5zZm9ybScsIDxwc2dlb21ldHJ5Lk1hdHJpeDQ+cm90YXRpb24ubXVsdGlwbHkodHJhbnNsYXRpb24pKTtcclxuICAgICAgICAgICAgYWN0b3IuU2NlbmUuc2V0RGlydHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB1cGRhdGVBY3RvclRyYW5zbGF0aW9uKGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgYWN0b3IuRGF0YVsndHJhbnNsYXRlJ10gPSBuZXcgcHNnZW9tZXRyeS5WZWM0KHgsIHksIHopO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsVHJhbnNmb3JtKGFjdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB1cGRhdGVBY3RvclJvdGF0aW9uKGFjdG9yOiBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgYWN0b3IuRGF0YVsncm90YXRlJ10gPSBuZXcgcHNnZW9tZXRyeS5WZWM0KHgsIHksIHopO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsVHJhbnNmb3JtKGFjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNlbGVjdGlvblRvb2wgZXh0ZW5kcyBBY3Rvck1hbmlwdWxhdGlvblRvb2wge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNlbGVjdGlvbk9iamVjdElEID0gJ1NFTF9NQVJLRVInO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNlbGVjdGVkQWN0b3I6IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMLCBwcml2YXRlIHN0YWdlOiBtb2RlbHN0YWdld2ViLlN0YWdlV2ViR0wsIGNvbm5lY3Rpb246IG1vZGVsc3RhZ2V3ZWIuU2VydmVyQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBzdXBlcihjb25uZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnRlcihpbnRlcmZhY2VDb250cm9sbGVyOiBtb2RlbHN0YWdld2ViLkludGVyZmFjZUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIuZW50ZXIoaW50ZXJmYWNlQ29udHJvbGxlcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbk1hcmtlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGxlYXZlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbk1hcmtlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZUtleVVwKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDQ2ICYmIHRoaXMuc2VsZWN0ZWRBY3RvcikgeyAvLyBkZWxldGUga2V5XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IFtzY2VuZU9iaiwgc2NlbmVPYmpJZHhdID0gdGhpcy5nZXRTY2VuZU9iaih0aGlzLnNlbGVjdGVkQWN0b3IuRGF0YVsnU2NlbmVPYmpJRCddKTtcclxuICAgICAgICAgICAgICAgIGlmIChzY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIFNjZW5lQXBwU3RhdGUuR2xvYmFsSW5zdGFuY2UuU2NlbmVPYmplY3RzLnJlbW92ZShzY2VuZU9iaklkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb25NYXJrZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWN0b3IgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlbW92ZVNlbGVjdGlvbk1hcmtlcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVTY2VuZUl0ZW0oU2VsZWN0aW9uVG9vbC5TZWxlY3Rpb25PYmplY3RJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZVNlbGVjdGlvbk1hcmtlcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVTY2VuZUl0ZW0oU2VsZWN0aW9uVG9vbC5TZWxlY3Rpb25PYmplY3RJRCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEFjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm94ID0gbmV3IHBzZ2VvbWV0cnkuQUFCQjNEO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdG9yLkZpZ3VyZXMuZm9yRWFjaCgoZmlnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmFkZEFBQkIoZmlnLmdldEJvdW5kaW5nQm94KCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJvdHRvbUNlbnRlclBvaW50ID0gbmV3IHBzZ2VvbWV0cnkuVmVjMyhib3guY2VudGVyKCkueCwgYm94Lm1pblksIGJveC5jZW50ZXIoKS56KTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25NYXJrZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKHRoaXMuc2NlbmUsIFNlbGVjdGlvblRvb2wuU2VsZWN0aW9uT2JqZWN0SUQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBbciwgZywgYl0gPSBbLjE2LCAuMzQsIC42XTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzaEJ1aWxkZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5PcGFxdWVNZXNoQnVpbGRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRvcCBsaWRcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWluWCwgYm94Lm1heFksIGJveC5taW5aLCBib3gubWF4WCwgYm94Lm1heFksIGJveC5taW5aLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWF4WCwgYm94Lm1heFksIGJveC5taW5aLCBib3gubWF4WCwgYm94Lm1heFksIGJveC5tYXhaLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWF4WCwgYm94Lm1heFksIGJveC5tYXhaLCBib3gubWluWCwgYm94Lm1heFksIGJveC5tYXhaLCByLCBnLCBiKTtcclxuICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyLmFkZFN0cm9rZShib3gubWluWCwgYm94Lm1heFksIGJveC5tYXhaLCBib3gubWluWCwgYm94Lm1heFksIGJveC5taW5aLCByLCBnLCBiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gbGlkXHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWluWiwgYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWluWiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWluWiwgYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWF4WiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWF4WiwgYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWF4WiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWF4WiwgYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWluWiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2FsIGxpbmVzXHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWluWiwgYm94Lm1pblgsIGJveC5tYXhZLCBib3gubWluWiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1pblgsIGJveC5taW5ZLCBib3gubWF4WiwgYm94Lm1pblgsIGJveC5tYXhZLCBib3gubWF4WiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWluWiwgYm94Lm1heFgsIGJveC5tYXhZLCBib3gubWluWiwgciwgZywgYik7XHJcbiAgICAgICAgICAgICAgICBtZXNoQnVpbGRlci5hZGRTdHJva2UoYm94Lm1heFgsIGJveC5taW5ZLCBib3gubWF4WiwgYm94Lm1heFgsIGJveC5tYXhZLCBib3gubWF4WiwgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uTWFya2VyLmFkZEZpZ3VyZShtZXNoQnVpbGRlci5jcmVhdGVGaWd1cmUodGhpcy5zdGFnZSwgJ1NFTF9NQVJLRVInKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZ3VyZUJvdW5kaW5nQm94ID0gbmV3IHBzZ2VvbWV0cnkuQUFCQjNEKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgW3IsIGcsIGJdID0gWy42LCAuMSwgLjFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc2hCdWlsZGVyMSA9IG5ldyBtb2RlbHN0YWdld2ViLk9wYXF1ZU1lc2hCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50Q291bnQgPSAyNDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhZGl1czAgPSAxO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFkaXVzMSA9IDEuMTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudENvdW50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGUwID0gMiAqIE1hdGguUEkgLyBzZWdtZW50Q291bnQgKiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZTEgPSAyICogTWF0aC5QSSAvIHNlZ21lbnRDb3VudCAqIChpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlubmVyMCA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoTWF0aC5zaW4oYW5nbGUwKSAqIHJhZGl1czAsIDAsIE1hdGguY29zKGFuZ2xlMCkgKiByYWRpdXMwKS5hZGQoYm90dG9tQ2VudGVyUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbm5lcjEgPSBuZXcgcHNnZW9tZXRyeS5WZWMzKE1hdGguc2luKGFuZ2xlMSkgKiByYWRpdXMwLCAwLCBNYXRoLmNvcyhhbmdsZTEpICogcmFkaXVzMCkuYWRkKGJvdHRvbUNlbnRlclBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3V0ZXIwID0gbmV3IHBzZ2VvbWV0cnkuVmVjMyhNYXRoLnNpbihhbmdsZTApICogcmFkaXVzMSwgMCwgTWF0aC5jb3MoYW5nbGUwKSAqIHJhZGl1czEpLmFkZChib3R0b21DZW50ZXJQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG91dGVyMSA9IG5ldyBwc2dlb21ldHJ5LlZlYzMoTWF0aC5zaW4oYW5nbGUxKSAqIHJhZGl1czEsIDAsIE1hdGguY29zKGFuZ2xlMSkgKiByYWRpdXMxKS5hZGQoYm90dG9tQ2VudGVyUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc2hCdWlsZGVyMS5hZGRRdWFkKG91dGVyMC54LCBvdXRlcjAueSArIDAuMDIsIG91dGVyMC56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlcjEueCwgb3V0ZXIxLnkgKyAwLjAyLCBvdXRlcjEueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxLngsIGlubmVyMS55ICsgMC4wMiwgaW5uZXIxLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyMC54LCBpbm5lcjAueSArIDAuMDIsIGlubmVyMC56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByLCBnLCBiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaEJ1aWxkZXIxLmFkZFF1YWQob3V0ZXIwLngsIG91dGVyMS55IC0gMC4wMiwgb3V0ZXIwLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyMS54LCBvdXRlcjEueSAtIDAuMDIsIG91dGVyMS56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlcjEueCwgb3V0ZXIxLnkgKyAwLjAyLCBvdXRlcjEueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXIwLngsIG91dGVyMC55ICsgMC4wMiwgb3V0ZXIwLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIsIGcsIGIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZXNoQnVpbGRlcjEuYWRkUXVhZChpbm5lcjAueCwgaW5uZXIwLnkgLSAwLjAyLCBpbm5lcjAueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXIxLngsIGlubmVyMS55IC0gMC4wMiwgaW5uZXIxLnosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyMS54LCBvdXRlcjEueSAtIDAuMDIsIG91dGVyMS56LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlcjAueCwgb3V0ZXIwLnkgLSAwLjAyLCBvdXRlcjAueixcclxuICAgICAgICAgICAgICAgICAgICAgICAgciwgZywgYik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZ3VyZUJvdW5kaW5nQm94LmFkZFZlY3RvcihvdXRlcjApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZ3VyZSA9IG1lc2hCdWlsZGVyMS5jcmVhdGVGaWd1cmUodGhpcy5zdGFnZSwgJ1JPVF9NQVJLRVInKTtcclxuICAgICAgICAgICAgICAgIGZpZ3VyZS5zZXRJbnRlcnNlY3RvcihuZXcgbW9kZWxzdGFnZXdlYi5Cb3VuZGluZ0JveEludGVyc2VjdG9yKGZpZ3VyZUJvdW5kaW5nQm94KSk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25NYXJrZXIuYWRkRmlndXJlKGZpZ3VyZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNjZW5lT2JqVHJhbnNsYXRpb24gPSB0aGlzLnNjZW5lLlN0YXRlLmdldCgnU2NlbmVPYmplY3RQb3MnICsgdGhpcy5zZWxlY3RlZEFjdG9yLkRhdGFbJ1NjZW5lT2JqSUQnXSwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjZW5lT2JqUm90YXRpb24gPSB0aGlzLnNjZW5lLlN0YXRlLmdldCgnU2NlbmVPYmplY3RSb3QnICsgdGhpcy5zZWxlY3RlZEFjdG9yLkRhdGFbJ1NjZW5lT2JqSUQnXSwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uTWFya2VyLlN0YXRlLnNldCgnTW9kZWxUcmFuc2Zvcm0nLCBwc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVJvdGF0aW9uKHNjZW5lT2JqUm90YXRpb24ueCwgc2NlbmVPYmpSb3RhdGlvbi55LCBzY2VuZU9ialJvdGF0aW9uLnopLm11bHRpcGx5KHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tVHJhbnNsYXRpb24oc2NlbmVPYmpUcmFuc2xhdGlvbi54LCBzY2VuZU9ialRyYW5zbGF0aW9uLnksIHNjZW5lT2JqVHJhbnNsYXRpb24ueikpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25NYXJrZXIuRmlsdGVyID0gbmV3IG1vZGVsc3RhZ2V3ZWIuR2VuZXJpY1NjZW5lSXRlbUZpbHRlcldlYkdMKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZFNjZW5lSXRlbShzZWxlY3Rpb25NYXJrZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VEb3duKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICBsZXQgdmlld1JheSA9IHRoaXMuc3RhZ2UuQ2FtZXJhLmdldFZpZXdSYXkoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlczogQXJyYXk8bW9kZWxzdGFnZXdlYi5JbnRlcnNlY3Rpb25DYW5kaWRhdGU+ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuZ2V0SW50ZXJzZWN0aW9uQ2FuZGlkYXRlcyh2aWV3UmF5LCBjYW5kaWRhdGVzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwaWNrZWRPYmplY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRJZHggPSAwO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKCFwaWNrZWRPYmplY3QgJiYgY3VycmVudElkeCA8IGNhbmRpZGF0ZXMubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZXNbY3VycmVudElkeF0uc2NlbmVJdGVtIGluc3RhbmNlb2YgbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaWNrZWRBY3RvciA9IDxtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0w+KGNhbmRpZGF0ZXNbY3VycmVudElkeF0uc2NlbmVJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGlja2VkQWN0b3IuU2NlbmVJdGVtSUQgIT0gU2VsZWN0aW9uVG9vbC5TZWxlY3Rpb25PYmplY3RJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGlja2VkQWN0b3IgPT0gdGhpcy5zZWxlY3RlZEFjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucHVzaFRvb2wobmV3IE1vdmVBY3RvclRvb2wocGlja2VkQWN0b3IsIHRoaXMuc3RhZ2UuQ2FtZXJhLCB0aGlzLmNvbm5lY3Rpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBY3RvciA9IHBpY2tlZEFjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25NYXJrZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlja2VkT2JqZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucHVzaFRvb2wobmV3IFJvdGF0ZUFjdG9yVG9vbCh0aGlzLnNlbGVjdGVkQWN0b3IsIHRoaXMuc3RhZ2UuQ2FtZXJhLCB0aGlzLmNvbm5lY3Rpb24pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpY2tlZE9iamVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VycmVudElkeCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXBpY2tlZE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVTY2VuZUl0ZW0oU2VsZWN0aW9uVG9vbC5TZWxlY3Rpb25PYmplY3RJRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFjdG9yID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlTW92ZShlOiBKUXVlcnkuRXZlbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VVcChlOiBKUXVlcnkuRXZlbnQpIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYWNlQWN0b3JUb29sIGV4dGVuZHMgQWN0b3JNYW5pcHVsYXRpb25Ub29sIHtcclxuICAgICAgICBwcml2YXRlIHNjZW5lT2JqOiBTY2VuZU9iamVjdDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzY2VuZU9iaklkeDogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihmaWd1cmVJRDogc3RyaW5nLCBwcml2YXRlIGNhbWVyYTogbW9kZWxzdGFnZXdlYi5DYW1lcmFXZWJHTCwgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zY2VuZU9iaiA9IG5ldyBTY2VuZU9iamVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lT2JqLkFzc2V0SUQgPSBmaWd1cmVJRDtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU9iai5TY2VuZU9iamVjdElEID0gbW9kZWxzdGFnZXdlYi51dWlkdjQoKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZU9iai5Mb2NhdGlvbiA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoKTsgXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVPYmouUm90YXRpb24gPSBuZXcgcHNnZW9tZXRyeS5WZWM0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVPYmouU2NhbGUgPSBuZXcgcHNnZW9tZXRyeS5WZWM0KDEsIDEsIDEsIDEpO1xyXG4gICAgICAgICAgICBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5hcHBlbmQodGhpcy5zY2VuZU9iaik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lT2JqSWR4ID0gU2NlbmVBcHBTdGF0ZS5HbG9iYWxJbnN0YW5jZS5TY2VuZU9iamVjdHMuQ291bnQgLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlTW92ZShlOiBKUXVlcnkuVHJpZ2dlcmVkRXZlbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGxldCB2aWV3UmF5ID0gdGhpcy5jYW1lcmEuZ2V0Vmlld1JheSh4LCB5KTtcclxuICAgICAgICAgICAgbGV0IHAgPSB2aWV3UmF5LmludGVyc2VjdFJheVdpdGhQbGFuZShuZXcgcHNnZW9tZXRyeS5WZWMzKCksIG5ldyBwc2dlb21ldHJ5LlZlYzMoMCwgMSwgMCkpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZU9iaiA9IHsgLi4udGhpcy5zY2VuZU9iaiB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZU9iai5Mb2NhdGlvbiA9IG5ldyBwc2dlb21ldHJ5LlZlYzQocC54LCAwLCBwLnopO1xyXG4gICAgICAgICAgICAgICAgU2NlbmVBcHBTdGF0ZS5HbG9iYWxJbnN0YW5jZS5TY2VuZU9iamVjdHMucmVwbGFjZSh0aGlzLnNjZW5lT2JqLCB0aGlzLnNjZW5lT2JqSWR4KTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy51cGRhdGVBY3RvclRyYW5zbGF0aW9uKHRoaXMuYWN0b3IsIHAueCwgMCwgcC56KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZU1vdXNlVXAoZTogSlF1ZXJ5LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlci5wb3BUb29sKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBsZXQgVXNlck5hbWVzID0ge1xyXG4gICAgICAgICdBZG1pbmlzdHJhdG9yJzogJ0FkbWluaXN0cmF0b3InLFxyXG4gICAgICAgICdBcm5lJzogJ0FybmUgVGh1cm0nLFxyXG4gICAgICAgICdVbHJpY2gnOiAnVWxyaWNoIELDtm5rZW1leWVyJyxcclxuICAgICAgICAnVG9tJzogJ1RvbSBKYWNobWFubicsXHJcbiAgICAgICAgJ1phY2hhcmlhcyc6ICdaYWNoYXJpYXMgUmVpbmhhcmR0J1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgUGVlckNvbG9ycyA9IFtcclxuICAgICAgICBbMC4zMSwgMC4wMiwgMC4wNiwgMS4wMF0sICAvLyByZWRcclxuICAgICAgICBbMC4wMiwgMC4xNywgMC4zMSwgMS4wMF0sICAvLyBibHVlXHJcbiAgICAgICAgWzAuMDIsIDAuMzEsIDAuMDYsIDEuMDBdLCAgLy8gZ3JlZW5cclxuICAgICAgICBbMC42OSwgMC4zNCwgMC4wMCwgMS4wMF0sICAvLyBvcmFuZ2VcclxuICAgICAgICBbMC4zMywgMC4wMCwgMC41MywgMS4wMF0sICAvLyBwdXJwbGVcclxuLy8gICAgICAgIFssIDEuMDBdLFxyXG4vLyAgICAgICAgWywgMS4wMF0sXHJcbi8vICAgICAgICBbLCAxLjAwXSxcclxuICAgIF07XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vdmVBY3RvclRvb2wgZXh0ZW5kcyBBY3Rvck1hbmlwdWxhdGlvblRvb2wge1xyXG4gICAgICAgIHByaXZhdGUgaXNJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgbGFzdFg6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIGxhc3RaOiBudW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0b3I6IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTCwgcHJpdmF0ZSBjYW1lcmE6IG1vZGVsc3RhZ2V3ZWIuQ2FtZXJhV2ViR0wsIGNvbm5lY3Rpb246IG1vZGVsc3RhZ2V3ZWIuU2VydmVyQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBzdXBlcihjb25uZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZU1vdmUoZTogSlF1ZXJ5LlRyaWdnZXJlZEV2ZW50LCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgdmlld1JheSA9IHRoaXMuY2FtZXJhLmdldFZpZXdSYXkoeCwgeSk7XHJcbiAgICAgICAgICAgIGxldCBwID0gdmlld1JheS5pbnRlcnNlY3RSYXlXaXRoUGxhbmUobmV3IHBzZ2VvbWV0cnkuVmVjMygpLCBuZXcgcHNnZW9tZXRyeS5WZWMzKDAsIDEsIDApKTtcclxuICAgICAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgW3NjZW5lT2JqLCBzY2VuZU9iaklkeF0gPSB0aGlzLmdldFNjZW5lT2JqKHRoaXMuYWN0b3IuRGF0YVsnU2NlbmVPYmpJRCddKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZWRTY2VuZU9iajogU2NlbmVPYmplY3QgPSB7IC4uLnNjZW5lT2JqIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGlvbiA9IHRyYW5zbGF0ZWRTY2VuZU9iai5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlZFNjZW5lT2JqLkxvY2F0aW9uID0gdHJhbnNsYXRlZFNjZW5lT2JqLkxvY2F0aW9uLmFkZChuZXcgcHNnZW9tZXRyeS5WZWM0KHAueCAtIHRoaXMubGFzdFgsIDAsIHAueiAtIHRoaXMubGFzdFopKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2NlbmVBcHBTdGF0ZS5HbG9iYWxJbnN0YW5jZS5TY2VuZU9iamVjdHMucmVwbGFjZSh0cmFuc2xhdGVkU2NlbmVPYmosIHNjZW5lT2JqSWR4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RYID0gcC54O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0WiA9IHAuejtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYW5kbGVNb3VzZVVwKGU6IEpRdWVyeS5FdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucG9wVG9vbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFJvdGF0ZUFjdG9yVG9vbCBleHRlbmRzIEFjdG9yTWFuaXB1bGF0aW9uVG9vbCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3RvcjogbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMLCBwcml2YXRlIGNhbWVyYTogbW9kZWxzdGFnZXdlYi5DYW1lcmFXZWJHTCwgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhbmRsZURyYWcoZTogSlF1ZXJ5LkV2ZW50LCBzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGRYOiBudW1iZXIsIGRZOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBmYWMgPSAxO1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZS5jbGllbnRZIC0gc3RhcnRZKSA+IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgZmFjID0gNlxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGUuY2xpZW50WSAtIHN0YXJ0WSkgPiAyMDApIHtcclxuICAgICAgICAgICAgICAgIGZhYyA9IDNcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhlLmNsaWVudFkgLSBzdGFydFkpID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBmYWMgPSAyXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBbc2NlbmVPYmosIHNjZW5lT2JqSWR4XSA9IHRoaXMuZ2V0U2NlbmVPYmoodGhpcy5hY3Rvci5EYXRhWydTY2VuZU9iaklEJ10pO1xyXG4gICAgICAgICAgICBpZiAoc2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3RhdGVkU2NlbmVPYmo6IFNjZW5lT2JqZWN0ID0geyAuLi5zY2VuZU9iaiB9O1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdGF0aW9uID0gcm90YXRlZFNjZW5lT2JqLlJvdGF0aW9uO1xyXG4gICAgICAgICAgICAgICAgcm90YXRlZFNjZW5lT2JqLlJvdGF0aW9uID0gcm90YXRlZFNjZW5lT2JqLlJvdGF0aW9uLmFkZChuZXcgcHNnZW9tZXRyeS5WZWM0KGRYIC8gKGZhYyAqIDEwMCkgKiBNYXRoLlBJLCAwLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBTY2VuZUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlNjZW5lT2JqZWN0cy5yZXBsYWNlKHJvdGF0ZWRTY2VuZU9iaiwgc2NlbmVPYmpJZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaGFuZGxlTW91c2VVcChlOiBKUXVlcnkuRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyLnBvcFRvb2woKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBEZW1vU2NlbmVXZWJHTCBleHRlbmRzIG1vZGVsc3RhZ2VhcHBzdGF0ZS5EaXJlY3RlZFNjZW5lV2ViR0wge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YWdlOiBtb2RlbHN0YWdld2ViLlN0YWdlV2ViR0w7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3BhY2VBY3RvcjogbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTCh0aGlzLCAnU3BhY2UnKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzcGFjZU1vZGVsOiBTcGFjZU1vZGVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNwYWNlTW9kZWwoKSB7IHJldHVybiB0aGlzLnNwYWNlTW9kZWw7IH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RhZ2U6IG1vZGVsc3RhZ2V3ZWIuU3RhZ2VXZWJHTCwgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuRGlyZWN0b3IobW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlLkdldEluc3RhbmNlKCkpLCBjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rvci5TY2VuZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3BhY2VNb2RlbCA9IG5ldyBTcGFjZU1vZGVsKHRoaXMsIHRoaXMuc3RhZ2UsIHRoaXMuc3BhY2VBY3Rvcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2hhZGVyUHJvZ3JhbTogbW9kZWxzdGFnZXdlYi5TaGFkZXJQcm9ncmFtV2ViR0wgPSBuZXcgbW9kZWxzdGFnZXdlYi5PcGFxdWVNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0uaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHN0YWdlLnJlZ2lzdGVyU2hhZGVyUHJvZ3JhbSgnT3BhcXVlTWVzaFNoYWRlcicsIHNoYWRlclByb2dyYW0pO1xyXG5cclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbSA9IG5ldyBtb2RlbHN0YWdld2ViLlRyYW5zcGFyZW50TWVzaFNoYWRlclByb2dyYW1XZWJHTCgpO1xyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtLmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgICAgICBzdGFnZS5yZWdpc3RlclNoYWRlclByb2dyYW0oJ1RyYW5zcGFyZW50TWVzaFNoYWRlcicsIHNoYWRlclByb2dyYW0pO1xyXG5cclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbSA9IG5ldyBtb2RlbHN0YWdld2ViLlRleHR1cmVkTWVzaFNoYWRlclByb2dyYW1XZWJHTCgpO1xyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtLmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgICAgICBzdGFnZS5yZWdpc3RlclNoYWRlclByb2dyYW0oJ1RleHR1cmVkTWVzaFNoYWRlcicsIHNoYWRlclByb2dyYW0pO1xyXG5cclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbSA9IG5ldyBtb2RlbHN0YWdld2ViLk1hdENhcFNoYWRlclByb2dyYW1XZWJHTCgpO1xyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtLmluaXRpYWxpemUoc3RhZ2UpO1xyXG4gICAgICAgICAgICBzdGFnZS5yZWdpc3RlclNoYWRlclByb2dyYW0oJ01hdENhcE1lc2hTaGFkZXInLCBzaGFkZXJQcm9ncmFtKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNoYWRvdyBzaGFkZXJzXHJcblxyXG4gICAgICAgICAgICBzaGFkZXJQcm9ncmFtID0gbmV3IG1vZGVsc3RhZ2V3ZWIuU2hhZG93VGV4dHVyZWRNZXNoU2hhZGVyUHJvZ3JhbVdlYkdMKCk7XHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0uaW5pdGlhbGl6ZShzdGFnZSk7XHJcbiAgICAgICAgICAgIHN0YWdlLnJlZ2lzdGVyUGhhc2VTcGVjaWZpY1NoYWRlclByb2dyYW0oJ1NoYWRvdycsICdUZXh0dXJlZE1lc2hTaGFkZXInLCBzaGFkZXJQcm9ncmFtKTtcclxuXHJcbiAgICAgICAgICAgIHNoYWRlclByb2dyYW0gPSBuZXcgbW9kZWxzdGFnZXdlYi5TaGFkb3dUZXh0dXJlZE1lc2hTaGFkZXJQcm9ncmFtV2ViR0woKTtcclxuICAgICAgICAgICAgc2hhZGVyUHJvZ3JhbS5pbml0aWFsaXplKHN0YWdlKTtcclxuICAgICAgICAgICAgc3RhZ2UucmVnaXN0ZXJQaGFzZVNwZWNpZmljU2hhZGVyUHJvZ3JhbSgnU2hhZG93JywgJ01hdENhcE1lc2hTaGFkZXInLCBzaGFkZXJQcm9ncmFtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNjZW5lSXRlbSh0aGlzLnNwYWNlQWN0b3IsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNwYWNlTW9kZWwudXBkYXRlU3BhY2UoKTtcclxuXHJcbiAgICAgICAgICAgICQud2hlbihcclxuLy8gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldEZhY3RvcnkuZ2V0RnJvbVVybCgnL2RhdGEvY29tbW9uYXNzZXRzLnBzbWVzaCcpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldEZhY3RvcnkuZ2V0RnJvbVVybCgnL2RhdGEvaG9sb2dlbS5wc21lc2gnKSxcclxuLy8gICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldEZhY3RvcnkuZ2V0RnJvbVVybCgnL2RhdGEvb2ZmaWNlX2Fzc2V0cy5wc21lc2gnKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuQXNzZXRGYWN0b3J5LmdldEZyb21VcmwoJy9kYXRhL29mZmljZV9hc3NldHNfYmFrZS5wc21lc2gnKVxyXG4gICAgICAgICAgICApLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Jc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKiAgICAgICAgdGhpcy5zdGFnZS5Bc3NldEZhY3RvcnkuZ2V0RnJvbVVybCgnL2RhdGEvaWY1LW9mZmljZS0xLnBzbWVzaCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChzdWNjZXNzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0b3IgPSBuZXcgbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMKHRoaXMsICdhY3RvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCBpbiB0aGlzLnN0YWdlLkFzc2V0U3RvcmUuRmlndXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmFkZEZpZ3VyZSh0aGlzLnN0YWdlLkFzc2V0U3RvcmUuRmlndXJlc1t4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNjZW5lSXRlbShhY3RvciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5Bc3NldEZhY3RvcnkuZ2V0RnJvbVVybCgnL2RhdGEvYXNzZXRzLnBzbWVzaCcpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuSXNJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKHJlcSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvZ3Jlc3MoKHBlcmNlbnRhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gcGVyY2VudGFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlU3BhY2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BhY2VNb2RlbC5jbGVhclZlcnRpY2VzKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUm9vbUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlZlcnRpY2VzLkNvdW50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2ZXJ0ID0gUm9vbUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlLlZlcnRpY2VzLkdldEl0ZW1BdChpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BhY2VNb2RlbC5hZGRWZXJ0ZXgodmVydC54LCB2ZXJ0LnopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3BhY2VNb2RlbC51cGRhdGVTcGFjZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHVwZGF0ZVBlZXJJbmZvKHBlZXJJRDogc3RyaW5nLCBwZWVyQ29sb3JJbmRleDogbnVtYmVyLCB1c2VyTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChwZWVySUQgIT0gJy0xJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBlZXJJbmZvSUQgPSAncGVlci1pbmZvLScgKyBwZWVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBlZXJJbmZvRWxlbWVudCA9ICQoJyMnICsgcGVlckluZm9JRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBlZXJJbmZvRWxlbWVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVlckluZm9FbGVtZW50LmZpbmQoJ3NwYW4nKS50ZXh0KHVzZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3BhcnRpY2lwYW50cy12aWV3JykuYXBwZW5kKCc8bGkgaWQ9XCInICsgcGVlckluZm9JRCArICdcIj48aW1nIHNyYz1cImltYWdlcy9pbmZvL0xlbnMnICsgcGVlckNvbG9ySW5kZXggKyAnLnBuZ1wiIC8+PHNwYW4+JyArIHVzZXJOYW1lICsgJzwvc3Bhbj48L2xpPicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlUGVlcihwZWVySUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNjZW5lSXRlbSgnUGVlcicgKyBwZWVySUQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBlZXJJbmZvSUQgPSAncGVlci1pbmZvLScgKyBwZWVySUQ7XHJcbiAgICAgICAgICAgIGxldCBwZWVySW5mb0VsZW1lbnQgPSAkKCcjJyArIHBlZXJJbmZvSUQpO1xyXG4gICAgICAgICAgICBwZWVySW5mb0VsZW1lbnQuYWRkQ2xhc3MoJ3JlbW92aW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGVlckluZm9FbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRDb2xvckluZGV4RnJvbVBlZXJJRChwZWVySUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gKHBhcnNlSW50KHBlZXJJRCkgLSAxKSAlIFBlZXJDb2xvcnMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVBlZXIocGVlcklEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgbGV0IG9iajogbW9kZWxzdGFnZXdlYi5BY3RvcldlYkdMID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQWN0b3JXZWJHTCh0aGlzLCAnUGVlcicgKyBwZWVySUQpO1xyXG4gICAgICAgICAgICBvYmouYWRkRmlndXJlKHRoaXMuc3RhZ2UuQXNzZXRTdG9yZS5GaWd1cmVzWydob2xvbGVucy5ob2xvbGVucy4wMDAnXSk7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gQFVCOiBkbyB0aGlzIHRoZSByaWdodCB3YXkuLi5cclxuICAgICAgICAgICAgb2JqLkZpZ3VyZXNbMF0uU2hhZGVySW5zdGFuY2VzWzBdLlNoYWRlcktleSA9ICdNYXRDYXBNZXNoU2hhZGVyJztcclxuXHJcbiAgICAgICAgICAgIGxldCBjb2xvckluZGV4ID0gdGhpcy5nZXRDb2xvckluZGV4RnJvbVBlZXJJRChwZWVySUQpO1xyXG5cclxuICAgICAgICAgICAgb2JqLlN0YXRlLnNldCgnQ29sb3InLCBuZXcgcHNnZW9tZXRyeS5WZWM0KFBlZXJDb2xvcnNbY29sb3JJbmRleF1bMF0sIFBlZXJDb2xvcnNbY29sb3JJbmRleF1bMV0sIFBlZXJDb2xvcnNbY29sb3JJbmRleF1bMl0sIFBlZXJDb2xvcnNbY29sb3JJbmRleF1bM10pKTtcclxuICAgICAgICAgICAgb2JqLlN0YXRlLnNldCgnTW9kZWxUcmFuc2Zvcm0nLCAoc3RhdGU6IG1vZGVsc3RhZ2V3ZWIuUmVuZGVyU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwb3M6IHBzZ2VvbWV0cnkuVmVjNCA9IHN0YXRlLmdldCgnSGVhZFBvcycgKyBwZWVySUQsIHBzZ2VvbWV0cnkuVmVjNC5aZXJvKTtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJzb3I6IHBzZ2VvbWV0cnkuVmVjNCA9IHN0YXRlLmdldCgnQ3Vyc1BvcycgKyBwZWVySUQsIHBzZ2VvbWV0cnkuVmVjNC5aZXJvKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaXIgPSBjdXJzb3Iuc3ViKHBvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNwaGVyaWNhbCA9IHBzZ2VvbWV0cnkuU3BoZXJpY2FsLkZyb21DYXJ0ZXNpYW5WZWN0b3IoZGlyKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxwc2dlb21ldHJ5Lk1hdHJpeDQ+cHNnZW9tZXRyeS5NYXRyaXg0LkZyb21Sb3RhdGlvblgoLXNwaGVyaWNhbC5hemltdXRoKS5tdWx0aXBseShcclxuICAgICAgICAgICAgICAgICAgICBwc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVJvdGF0aW9uWSgtc3BoZXJpY2FsLnBvbGFyKSkpLm11bHRpcGx5KFxyXG4gICAgICAgICAgICAgICAgICAgIHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tVHJhbnNsYXRpb24ocG9zLngsIHBvcy55LCBwb3MueikpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2NlbmVJdGVtKG9iaiwgdHJ1ZSAvKiBtYWtlVmlzaWJsZSAqLyk7XHJcbiAgICAgICAgICAgIG9iai5UZXN0SW50ZXJzZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG9iai5UZXN0Q2hpbGRyZW5JbnRlcnNlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVTY2VuZU9iamVjdChvYmplY3RJRDogc3RyaW5nLCBhc3NldElEOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgbGV0IHN1ZmZpeCA9IG9iamVjdElEO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9iaiA9IG5ldyBtb2RlbHN0YWdld2ViLkFjdG9yV2ViR0wodGhpcywgJ1NjZW5lT2JqZWN0JyArIHN1ZmZpeCk7XHJcbiAgICAgICAgICAgIG9iai5TdGF0ZS5zZXQoJ01vZGVsVHJhbnNmb3JtJywgKHN0YXRlOiBtb2RlbHN0YWdld2ViLlJlbmRlclN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gc3RhdGUuZ2V0KCdTY2VuZU9iamVjdFBvcycgKyBzdWZmaXgsIHBzZ2VvbWV0cnkuVmVjNC5aZXJvKTtcclxuICAgICAgICAgICAgICAgIGxldCByb3QgPSBzdGF0ZS5nZXQoJ1NjZW5lT2JqZWN0Um90JyArIHN1ZmZpeCwgcHNnZW9tZXRyeS5WZWM0Llplcm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gc3RhdGUuZ2V0KCdTY2VuZU9iamVjdFNjYWxlJyArIHN1ZmZpeCwgcHNnZW9tZXRyeS5WZWM0Lk9uZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxwc2dlb21ldHJ5Lk1hdHJpeDQ+cHNnZW9tZXRyeS5NYXRyaXg0LkZyb21Sb3RhdGlvbihyb3QueCwgcm90LnksIHJvdC56KS5tdWx0aXBseShcclxuICAgICAgICAgICAgICAgICAgICBwc2dlb21ldHJ5Lk1hdHJpeDQuRnJvbVNjYWxpbmcoc2NhbGUueCwgc2NhbGUueSwgc2NhbGUueikubXVsdGlwbHkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBzZ2VvbWV0cnkuTWF0cml4NC5Gcm9tVHJhbnNsYXRpb24ocG9zLngsIHBvcy55LCBwb3MueikpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG9iai5hZGRGaWd1cmUodGhpcy5zdGFnZS5Bc3NldFN0b3JlLmdldEZpZ3VyZShhc3NldElEKSk7XHJcbiAgICAgICAgICAgIG9iai5EYXRhWydTY2VuZU9iaklEJ10gPSBzdWZmaXg7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFJvb21BcHBTdGF0ZSBleHRlbmRzIG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUNsdXN0ZXIge1xyXG4gICAgICAgIHN0YXRpYyBDbHVzdGVyVHlwZUlEID0gJ1Jvb20nO1xyXG5cclxuICAgICAgICBzdGF0aWMgR2xvYmFsSW5zdGFuY2U6IFJvb21BcHBTdGF0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIEZsb29yTGV2ZWw6IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUZsb2F0VmFsdWUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlRmxvYXRWYWx1ZSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgTWFzdGVyVmlldzogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlVmVjdG9yNFZhbHVlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZVZlY3RvcjRWYWx1ZSgpO1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVydGljZXM6IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUNvbGxlY3Rpb248cHNnZW9tZXRyeS5WZWM0PiA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uPHBzZ2VvbWV0cnkuVmVjND4obW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ29sbGVjdGlvbk9wZXJhdGlvbik7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgUm9vbUFwcFN0YXRlLkdsb2JhbEluc3RhbmNlID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWdpc3RlckVudHJpZXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnRmxvb3JMZXZlbCcsIHRoaXMuRmxvb3JMZXZlbCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnTWFzdGVyVmlldycsIHRoaXMuTWFzdGVyVmlldyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnVmVydGljZXMnLCB0aGlzLlZlcnRpY2VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkVmFsdWUoa2V5OiBzdHJpbmcsIHJlYWRlcjogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlRGVsdGFSZWFkZXIpOiBhbnkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09ICdWZXJ0aWNlcycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWFkZXIuUmVhZGVyLnJlYWRWZWM0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIucmVhZFZhbHVlKGtleSwgcmVhZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFwcGx5Q2hhbmdlcyhzY2VuZTogbW9kZWxzdGFnZXdlYi5TY2VuZVdlYkdMLCBwZWVySUQ6IHN0cmluZywgaW5zdGFuY2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkZsb29yTGV2ZWwuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICBzY2VuZS5TdGF0ZS5zZXQoJ0Zsb29yTGV2ZWwnLCB0aGlzLkZsb29yTGV2ZWwuZ2V0KCkpO1xyXG4gICAgICAgICAgICAgICAgKDxEZW1vU2NlbmVXZWJHTD5zY2VuZSkuU3BhY2VNb2RlbC5GbG9vckxldmVsID0gdGhpcy5GbG9vckxldmVsLmdldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1hc3RlclZpZXcuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICBzY2VuZS5TdGF0ZS5zZXQoJ01hc3RlclZpZXdQb3MnLCB0aGlzLk1hc3RlclZpZXcuZ2V0KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlZlcnRpY2VzLmlzRGlydHkoKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjID0gPERlbW9TY2VuZVdlYkdMPnNjZW5lO1xyXG4gICAgICAgICAgICAgICAgKDxEZW1vU2NlbmVXZWJHTD5zY2VuZSkudXBkYXRlU3BhY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBTY2VuZU9iamVjdCB7XHJcbiAgICAgICAgcHVibGljIFNjZW5lT2JqZWN0SUQ6IHN0cmluZzsgLy8gY2hhcls0MF1cclxuXHJcbiAgICAgICAgcHVibGljIEFzc2V0SUQ6IHN0cmluZzsgICAgICAgLy8gY2hhclsyMF1cclxuXHJcbiAgICAgICAgcHVibGljIExvY2F0aW9uOiBwc2dlb21ldHJ5LlZlYzQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBSb3RhdGlvbjogcHNnZW9tZXRyeS5WZWM0O1xyXG5cclxuICAgICAgICBwdWJsaWMgU2NhbGU6IHBzZ2VvbWV0cnkuVmVjNDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2NlbmVBcHBTdGF0ZSBleHRlbmRzIG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUNsdXN0ZXIge1xyXG4gICAgICAgIHN0YXRpYyBDbHVzdGVyVHlwZUlEID0gJ09iaic7XHJcblxyXG4gICAgICAgIHN0YXRpYyBHbG9iYWxJbnN0YW5jZTogU2NlbmVBcHBTdGF0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIFNjZW5lT2JqZWN0czogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ29sbGVjdGlvbjxTY2VuZU9iamVjdD4gPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ29sbGVjdGlvbjxTY2VuZU9iamVjdD4obW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ29sbGVjdGlvbk9wZXJhdGlvbik7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgU2NlbmVBcHBTdGF0ZS5HbG9iYWxJbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXJFbnRyaWVzKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRW50cnkoJ09iaicsIHRoaXMuU2NlbmVPYmplY3RzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkVmFsdWUoa2V5OiBzdHJpbmcsIHJlYWRlcjogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlRGVsdGFSZWFkZXIpOiBhbnkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09ICdPYmonKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBuZXcgU2NlbmVPYmplY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5TY2VuZU9iamVjdElEID0gcmVhZGVyLlJlYWRlci5yZWFkQ2hhckFycmF5KDQwKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLkFzc2V0SUQgPSByZWFkZXIuUmVhZGVyLnJlYWRDaGFyQXJyYXkoNDApO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuTG9jYXRpb24gPSByZWFkZXIuUmVhZGVyLnJlYWRWZWM0KCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5Sb3RhdGlvbiA9IHJlYWRlci5SZWFkZXIucmVhZFZlYzQoKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLlNjYWxlID0gcmVhZGVyLlJlYWRlci5yZWFkVmVjNCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5yZWFkVmFsdWUoa2V5LCByZWFkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgd3JpdGVWYWx1ZShrZXk6IHN0cmluZywgd3JpdGVyOiBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVEZWx0YVdyaXRlciwgdmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09ICdPYmonKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlQ2hhckFycmF5KHZhbHVlLlNjZW5lT2JqZWN0SUQsIDQwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVDaGFyQXJyYXkodmFsdWUuQXNzZXRJRCwgNDApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZVZlYzQodmFsdWUuTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZVZlYzQodmFsdWUuUm90YXRpb24pO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZVZlYzQocHNnZW9tZXRyeS5WZWM0Lk9uZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlci53cml0ZVZhbHVlKGtleSwgd3JpdGVyLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhcHBseUNoYW5nZXMoc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCwgcGVlcklEOiBzdHJpbmcsIGluc3RhbmNlSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TY2VuZU9iamVjdHMuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2MgPSA8RGVtb1NjZW5lV2ViR0w+KHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjZW5lT2JqZWN0cy5PcGVyYXRpb25zLmZvckVhY2goKG9wZXJhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24uT3BlcmF0aW9uID09IG1vZGVsc3RhZ2VhcHBzdGF0ZS5PcGVyYXRpb25UeXBlLkFwcGVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqSUQgPSBvcGVyYXRpb24uTmV3VmFsdWUuU2NlbmVPYmplY3RJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0SUQgPSBvcGVyYXRpb24uTmV3VmFsdWUuQXNzZXRJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2MuYWRkU2NlbmVJdGVtKHNjLmNyZWF0ZVNjZW5lT2JqZWN0KG9iaklELCBhc3NldElEKSwgdHJ1ZSAvKiBtYWtlVmlzaWJsZSAqLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnU2NlbmVPYmplY3RQb3MnICsgb2JqSUQsIG9wZXJhdGlvbi5OZXdWYWx1ZS5Mb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnU2NlbmVPYmplY3RSb3QnICsgb2JqSUQsIG9wZXJhdGlvbi5OZXdWYWx1ZS5Sb3RhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLlN0YXRlLnNldCgnU2NlbmVPYmplY3RTY2FsZScgKyBvYmpJRCwgb3BlcmF0aW9uLk5ld1ZhbHVlLlNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zY2VuZS5SdW5TZXF1ZW5jZShcIlNob3dTY2VuZU9iamVjdFwiLCBzdGQ6OnN0cmluZ3sgXCJTaG93U2NlbmVPYmplY3RcIiB9ICtub3RlSUQsIHsgeyBcIlNjZW5lT2JqZWN0SURcIiwgb2JqSUQgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3BlcmF0aW9uLk9wZXJhdGlvbiA9PSBtb2RlbHN0YWdlYXBwc3RhdGUuT3BlcmF0aW9uVHlwZS5SZXBsYWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmpJRCA9IG9wZXJhdGlvbi5OZXdWYWx1ZS5TY2VuZU9iamVjdElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZS5TdGF0ZS5zZXQoJ1NjZW5lT2JqZWN0UG9zJyArIG9iaklELCBvcGVyYXRpb24uTmV3VmFsdWUuTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZS5TdGF0ZS5zZXQoJ1NjZW5lT2JqZWN0Um90JyArIG9iaklELCBvcGVyYXRpb24uTmV3VmFsdWUuUm90YXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZS5TdGF0ZS5zZXQoJ1NjZW5lT2JqZWN0U2NhbGUnICsgb2JqSUQsIG9wZXJhdGlvbi5OZXdWYWx1ZS5TY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhdGlvbi5PcGVyYXRpb24gPT0gbW9kZWxzdGFnZWFwcHN0YXRlLk9wZXJhdGlvblR5cGUuUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmpJRCA9IG9wZXJhdGlvbi5QcmV2aW91c1ZhbHVlLlNjZW5lT2JqZWN0SUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLnJlbW92ZVNjZW5lSXRlbSgnU2NlbmVPYmplY3QnICsgb2JqSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUGVlckFwcFN0YXRlIGV4dGVuZHMgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ2x1c3RlciB7XHJcbiAgICAgICAgc3RhdGljIENsdXN0ZXJUeXBlSUQgPSAnUGVlcic7XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGVhZFBvczogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlVmVjdG9yNFZhbHVlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZVZlY3RvcjRWYWx1ZSgpO1xyXG5cclxuICAgICAgICBwcml2YXRlIGN1cnNvclBvczogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlVmVjdG9yNFZhbHVlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZVZlY3RvcjRWYWx1ZSgpO1xyXG5cclxuICAgICAgICBwcml2YXRlIHVzZXJJRDogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlU3RyaW5nVmFsdWUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlU3RyaW5nVmFsdWUoKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhY3RpdmU6IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUJvb2xWYWx1ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVCb29sVmFsdWUoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHByb3ZpZGVzSW5pdGlhbGl6YXRpb25EYXRhKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWdpc3RlckVudHJpZXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnSGVhZCcsIHRoaXMuaGVhZFBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnQ3VycycsIHRoaXMuY3Vyc29yUG9zKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVudHJ5KCdVc2VyJywgdGhpcy51c2VySUQpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRW50cnkoJ0FjdGl2ZScsIHRoaXMuYWN0aXZlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhcHBseUNoYW5nZXMoc2NlbmU6IG1vZGVsc3RhZ2V3ZWIuU2NlbmVXZWJHTCwgcGVlcklEOiBzdHJpbmcsIGluc3RhbmNlSUQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgc2MgPSA8RGVtb1NjZW5lV2ViR0w+c2NlbmU7XHJcbiAgICAgICAgICAgIGlmIChwZWVySUQubGVuZ3RoID4gMCAmJiAodGhpcy5oZWFkUG9zLmlzRGlydHkoKSB8fCB0aGlzLmN1cnNvclBvcy5pc0RpcnR5KCkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNjLmdldFNjZW5lSXRlbSgnUGVlcicgKyBwZWVySUQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MuY3JlYXRlUGVlcihwZWVySUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGxldmVsT2ZzID0gbmV3IHBzZ2VvbWV0cnkuVmVjNCgwLCAtc2MuU3BhY2VNb2RlbC5GbG9vckxldmVsLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWFkUG9zID0gdGhpcy5oZWFkUG9zLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvclBvcyA9IHRoaXMuY3Vyc29yUG9zLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlYWRQb3MgJiYgY3Vyc29yUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmUuU3RhdGUuc2V0KCdIZWFkUG9zJyArIHBlZXJJRCwgaGVhZFBvcy5hZGQobGV2ZWxPZnMpKTtcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZS5TdGF0ZS5zZXQoJ0N1cnNQb3MnICsgcGVlcklELCBjdXJzb3JQb3MuYWRkKGxldmVsT2ZzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJRC5pc0RpcnR5KCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VyTmFtZSA9IFVzZXJOYW1lc1t0aGlzLnVzZXJJRC5nZXQoKV0gfHwgJyc7XHJcbiAgICAgICAgICAgICAgICBzYy51cGRhdGVQZWVySW5mbyhwZWVySUQsIHNjLmdldENvbG9ySW5kZXhGcm9tUGVlcklEKHBlZXJJRCksIHVzZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlLmlzRGlydHkoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZS5nZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjLnJlbW92ZVBlZXIocGVlcklEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTm90ZSB7XHJcbiAgICAgICAgcHVibGljIE5vdGVJRDogc3RyaW5nOyAvL2NoYXJbMjBdO1xyXG5cclxuICAgICAgICBwdWJsaWMgTm90ZVR5cGU6IG51bWJlcjsgLy8gaW50XHJcblxyXG4gICAgICAgIHB1YmxpYyBPd25lcklEOiBzdHJpbmc7IC8vIGNoYXJbMTBdO1xyXG5cclxuICAgICAgICBwdWJsaWMgQXNzaWduZWRUb0lEOiBzdHJpbmc7IC8vIGNoYXJbMTBdO1xyXG5cclxuICAgICAgICBwdWJsaWMgTG9jYXRpb246IHBzZ2VvbWV0cnkuVmVjNDtcclxuXHJcbiAgICAgICAgcHVibGljIEF6aW11dGhhbFJvdGF0aW9uOiBudW1iZXI7IC8vIGZsb2F0XHRcdFx0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm90ZXNBcHBTdGF0ZSBleHRlbmRzIG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUNsdXN0ZXIge1xyXG4gICAgICAgIHN0YXRpYyBDbHVzdGVyVHlwZUlEID0gJ05vdGVzJztcclxuXHJcbiAgICAgICAgc3RhdGljIEdsb2JhbEluc3RhbmNlOiBOb3Rlc0FwcFN0YXRlO1xyXG5cclxuICAgICAgICBwdWJsaWMgTm90ZXM6IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZUNvbGxlY3Rpb248Tm90ZT4gPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlQ29sbGVjdGlvbjxOb3RlPihtb2RlbHN0YWdlYXBwc3RhdGUuQXBwU3RhdGVDb2xsZWN0aW9uT3BlcmF0aW9uKTtcclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICBOb3Rlc0FwcFN0YXRlLkdsb2JhbEluc3RhbmNlID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWdpc3RlckVudHJpZXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbnRyeSgnTm90ZXMnLCB0aGlzLk5vdGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByZWFkVmFsdWUoa2V5OiBzdHJpbmcsIHJlYWRlcjogbW9kZWxzdGFnZWFwcHN0YXRlLkFwcFN0YXRlRGVsdGFSZWFkZXIpOiBhbnkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09ICdOb3RlcycpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IG5ldyBOb3RlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWUuTm90ZUlEID0gcmVhZGVyLlJlYWRlci5yZWFkQ2hhckFycmF5KDIwKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLk5vdGVUeXBlID0gcmVhZGVyLlJlYWRlci5yZWFkVUludDMyKCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5Pd25lcklEID0gcmVhZGVyLlJlYWRlci5yZWFkQ2hhckFycmF5KDEwKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLkxvY2F0aW9uID0gcmVhZGVyLlJlYWRlci5yZWFkVmVjNCgpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuQXppbXV0aGFsUm90YXRpb24gPSByZWFkZXIuUmVhZGVyLnJlYWRGbG9hdDMyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLnJlYWRWYWx1ZShrZXksIHJlYWRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB3cml0ZVZhbHVlKGtleTogc3RyaW5nLCB3cml0ZXI6IG1vZGVsc3RhZ2VhcHBzdGF0ZS5BcHBTdGF0ZURlbHRhV3JpdGVyLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ05vdGVzJykge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlci53cml0ZUNoYXJBcnJheSh2YWx1ZS5Ob3RlSUQsIDIwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVJbnQzMih2YWx1ZS5Ob3RlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGVyLndyaXRlQ2hhckFycmF5KHZhbHVlLk93bmVySUQsIDEwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVWZWM0KHZhbHVlLkxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZXIud3JpdGVGbG9hdDMyKHZhbHVlLkF6aW11dGhhbFJvdGF0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1cGVyLndyaXRlVmFsdWUoa2V5LCB3cml0ZXIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=