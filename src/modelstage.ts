/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.

import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
import { psgeometry } from './ps-geometry';
import JQuery from 'jquery';
import $ from 'jquery';

export module modelstage {

    class Timer {
        public animationFrame(callback: FrameRequestCallback): number {
            return window.requestAnimationFrame(callback);
        }

        constructor() {
        }
    }

    export class SpaceModel {
 
        private vertices: Array<psgeometry.Vec2> = [];

        private floorLevel: number = 0;

        public get FloorLevel() { return this.floorLevel; }

        public set FloorLevel(floorLevel) { this.floorLevel = floorLevel; }

        constructor(private scene: DemoSceneWebGL, private stage: modelstageweb.StageWebGL, private actor: modelstageweb.ActorWebGL) {
        }

        private initializeSquareRoom(transparentMeshBuilder: modelstageweb.TransparentMeshBuilder, texturedMeshBuilder: modelstageweb.TexturedMeshBuilder) {
            texturedMeshBuilder.addQuad(
                -5.0, 0.0, -5.0, 0, 0,
                5.0, 0.0, -5.0, 1, 0,
                5.0, 0.0, 5.0, 1, 1,
                -5.0, 0.0, 5.0, 0, 1,
                0.3, 0.3, 0.3, true);

            transparentMeshBuilder.addQuad(
                -5.0, 0.0, -5.0,
                5.0, 0.0, -5.0,
                5.0, 2.6, -5.0,
                -5.0, 2.6, -5.0,
                0.1, 0.1, 0.1, .4, true);

            transparentMeshBuilder.addQuad(
                -5.0, 0.0, 5.0,
                -5.0, 2.6, 5.0,
                5.0, 2.6, 5.0,
                5.0, 0.0, 5.0,
                0.1, 0.1, 0.1, .4, true);

            transparentMeshBuilder.addQuad(
                -5.0, 0.0, -5.0,
                -5.0, 2.6, -5.0,
                -5.0, 2.6, 5.0,
                -5.0, 0.0, 5.0,
                0.15, 0.15, 0.15, .4, true);

            transparentMeshBuilder.addQuad(
                5.0, 0.0, -5.0,
                5.0, 0.0, 5.0,
                5.0, 2.6, 5.0,
                5.0, 2.6, -5.0,
                0.15, 0.15, 0.15, .4, true);
        }

        private initializeArbitraryRoom(transparentMeshBuilder: modelstageweb.TransparentMeshBuilder, texturedMeshBuilder: modelstageweb.TexturedMeshBuilder) {

            let toggle = false;

            let poly = new psgeometry.Polygon2D();

            for (let i = 0; i < this.vertices.length; i++) {
                poly.addVector(this.vertices[i]);
            }
            var bbox = new psgeometry.AABB2D();
            poly.addToAABB(bbox);
            var extents = bbox.extents();
            this.stage.updateShadowArea(bbox);

            poly = poly.triangulate();
            for (let i = 0; i < poly.Vertices.length; i += 3) {
                texturedMeshBuilder.addTri(
                    poly.Vertices[i].x, 0, poly.Vertices[i].y, (poly.Vertices[i].x - bbox.minX) / extents.x, (poly.Vertices[i].y - bbox.minY) / extents.y,
                    poly.Vertices[i + 1].x, 0, poly.Vertices[i + 1].y, (poly.Vertices[i + 1].x - bbox.minX) / extents.x, (poly.Vertices[i + 1].y - bbox.minY) / extents.y,
                    poly.Vertices[i + 2].x, 0, poly.Vertices[i + 2].y, (poly.Vertices[i + 2].x - bbox.minX) / extents.x, (poly.Vertices[i + 2].y - bbox.minY) / extents.y,
                    0.2, 0.2, 0.2, true);
            }

            for (let i = 0; i < this.vertices.length; i++) {
                let start = this.vertices[i];
                let end = this.vertices[(i + 1) % this.vertices.length];

                transparentMeshBuilder.addQuad(
                    start.x, 0.0, start.y,
                    end.x, 0.0, end.y,
                    end.x, 2.6, end.y,
                    start.x, 2.6, start.y,
                    toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, toggle ? 0.1 : 0.15, .4, true);

                toggle = !toggle;
            }

        }

        public updateSpace() {

            let spaceIndices = new modelstageweb.BufferAssetWebGL(undefined, 'space_indices', true);
            let spaceVertices = new modelstageweb.BufferAssetWebGL(undefined, 'space_vertices', false);
            let transparentMeshBuilder = new modelstageweb.TransparentMeshBuilder(spaceVertices, spaceIndices);
            let floorIndices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_indices', true);
            let floorVertices = new modelstageweb.BufferAssetWebGL(undefined, 'floor_vertices', false);
            let texturedMeshBuilder = new modelstageweb.TexturedMeshBuilder(floorVertices, floorIndices);

            if (this.vertices.length < 3) {
                this.initializeSquareRoom(transparentMeshBuilder, texturedMeshBuilder);
            } else {
                this.initializeArbitraryRoom(transparentMeshBuilder, texturedMeshBuilder);
            }

            let figure = new modelstageweb.FigureWebGL('Space');

            texturedMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('floor_indices', floorIndices);
            this.stage.AssetStore.addBufferAsset('floor_vertices', floorVertices);
            let floorShaderInstance = new modelstageweb.MeshShaderInstance('TexturedMeshShader');
            floorShaderInstance.addReference('IndexBuffer', 'floor_indices');
            floorShaderInstance.addReference('VertexBuffer', 'floor_vertices');
            floorShaderInstance.addReference('TextureBuffer', 'Shadow');
            figure.addShaderInstance(floorShaderInstance);
            
            transparentMeshBuilder.initialize(this.stage);
            this.stage.AssetStore.addBufferAsset('space_indices', spaceIndices);
            this.stage.AssetStore.addBufferAsset('space_vertices', spaceVertices);
            let shaderInstance = new modelstageweb.MeshShaderInstance('TransparentMeshShader');
            shaderInstance.addReference('IndexBuffer', 'space_indices');
            shaderInstance.addReference('VertexBuffer', 'space_vertices');
            figure.addShaderInstance(shaderInstance);

            this.actor.Figures[0] = figure;
            this.actor.Filter = new modelstageweb.GenericSceneItemFilterWebGL();

            this.actor.Scene.setDirty();

        }

        public clearVertices() {
            this.vertices.length = 0;
        }

        public addVertex(x: number, y: number) {
            this.vertices.push(new psgeometry.Vec2(x, y));
        }
    }

    export class TheaterWebGL {

        protected scene: modelstageweb.SceneWebGL;

        protected stage: modelstageweb.StageWebGL;

        private timer: Timer;

        get Stage(): modelstageweb.StageWebGL {
            return this.stage;
        }

        get Scene(): modelstageweb.SceneWebGL {
            return this.scene;
        }

        constructor(canvasElementID: string) {
            this.stage = new modelstageweb.StageWebGL(canvasElementID);
            this.stage.initialize();

            //this.scene = new modelstageweb.SceneWebGL();

            this.timer = new Timer();
            this.timer.animationFrame(() => { this.processFrame() });

            document.addEventListener('visibilitychange', () => { this.onVisibilityChange(); }, false);

            this.initialize();
        }

        protected initialize() {
        }

        /** Main render cycle for a frame.
          */
        protected processFrame() {
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

            this.timer.animationFrame(() => { this.processFrame() });
        }

        protected render() {
            if (this.scene.IsInitialized) {
                this.stage.render(this.scene);
            }
        }

        private onVisibilityChange() {
            if (!document.hidden) {
                this.timer.animationFrame(() => { this.render() });
            }
        }
    }

    export class ActorManipulationTool extends modelstageweb.Tool {

        constructor(protected connection: modelstageweb.ServerConnection) {
            super();
        }

        protected getSceneObj(objID: string) {
            let sceneObjIdx = 0;
            let sceneObj = null;
            while (sceneObjIdx < SceneAppState.GlobalInstance.SceneObjects.Count && !sceneObj) {
                if (SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx).SceneObjectID == objID) {
                    sceneObj = SceneAppState.GlobalInstance.SceneObjects.GetItemAt(sceneObjIdx);
                } else {
                    ++sceneObjIdx;
                }
            }
            return [sceneObj, sceneObjIdx];
        }

        private updateModelTransform(actor: modelstageweb.ActorWebGL) {
            let translationVec = actor.Data['translate'] || psgeometry.Vec4.Zero;
            let rotationVec = actor.Data['rotate'] || psgeometry.Vec4.Zero;

            this.connection.send('Scene|Transform|' + actor.SceneItemID + '|' + translationVec.x + ',' + translationVec.y + ',' + translationVec.z + '|' + rotationVec.y + ',' + rotationVec.x + ',' + rotationVec.z);

            let translation = psgeometry.Matrix4.FromTranslation(translationVec.x, translationVec.y, translationVec.z);
            let rotation = psgeometry.Matrix4.FromRotationY(rotationVec.y);

            actor.State.set('ModelTransform', <psgeometry.Matrix4>rotation.multiply(translation));
            actor.Scene.setDirty();
        }

        protected updateActorTranslation(actor: modelstageweb.ActorWebGL, x: number, y: number, z: number) {
            actor.Data['translate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        }

        protected updateActorRotation(actor: modelstageweb.ActorWebGL, x: number, y: number, z: number) {
            actor.Data['rotate'] = new psgeometry.Vec4(x, y, z);
            this.updateModelTransform(actor);
        }
    }

    export class SelectionTool extends ActorManipulationTool {
        private static readonly SelectionObjectID = 'SEL_MARKER';

        private selectedActor: modelstageweb.ActorWebGL;

        constructor(private scene: modelstageweb.SceneWebGL, private stage: modelstageweb.StageWebGL, connection: modelstageweb.ServerConnection) {
            super(connection);
        }

        public enter(interfaceController: modelstageweb.InterfaceController) {
            super.enter(interfaceController);

            this.updateSelectionMarker();
        }

        public leave() {
            this.removeSelectionMarker();
        }

        public handleKeyUp(e: JQuery.Event) {
            if (e.keyCode == 46 && this.selectedActor) { // delete key

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

        private removeSelectionMarker() {
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);
        }

        private updateSelectionMarker() {
            this.scene.removeSceneItem(SelectionTool.SelectionObjectID);

            if (this.selectedActor) {
                let box = new psgeometry.AABB3D;
                this.selectedActor.Figures.forEach((fig) => {
                    box.addAABB(fig.getBoundingBox());
                });

                let bottomCenterPoint = new psgeometry.Vec3(box.center().x, box.minY, box.center().z);
                let selectionMarker = new modelstageweb.ActorWebGL(this.scene, SelectionTool.SelectionObjectID);

                let [r, g, b] = [.16, .34, .6];

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

                let figureBoundingBox = new psgeometry.AABB3D();

                [r, g, b] = [.6, .1, .1];
                let meshBuilder1 = new modelstageweb.OpaqueMeshBuilder();
                const segmentCount = 24;
                const radius0 = 1;
                const radius1 = 1.1;
                for (let i = 0; i < segmentCount; ++i) {
                    let angle0 = 2 * Math.PI / segmentCount * i;
                    let angle1 = 2 * Math.PI / segmentCount * (i + 1);
                    let inner0 = new psgeometry.Vec3(Math.sin(angle0) * radius0, 0, Math.cos(angle0) * radius0).add(bottomCenterPoint);
                    let inner1 = new psgeometry.Vec3(Math.sin(angle1) * radius0, 0, Math.cos(angle1) * radius0).add(bottomCenterPoint);
                    let outer0 = new psgeometry.Vec3(Math.sin(angle0) * radius1, 0, Math.cos(angle0) * radius1).add(bottomCenterPoint);
                    let outer1 = new psgeometry.Vec3(Math.sin(angle1) * radius1, 0, Math.cos(angle1) * radius1).add(bottomCenterPoint);
                    meshBuilder1.addQuad(outer0.x, outer0.y + 0.02, outer0.z,
                        outer1.x, outer1.y + 0.02, outer1.z,
                        inner1.x, inner1.y + 0.02, inner1.z,
                        inner0.x, inner0.y + 0.02, inner0.z,
                        r, g, b);

                    meshBuilder1.addQuad(outer0.x, outer1.y - 0.02, outer0.z,
                        outer1.x, outer1.y - 0.02, outer1.z,
                        outer1.x, outer1.y + 0.02, outer1.z,
                        outer0.x, outer0.y + 0.02, outer0.z,
                        r, g, b);

                    meshBuilder1.addQuad(inner0.x, inner0.y - 0.02, inner0.z,
                        inner1.x, inner1.y - 0.02, inner1.z,
                        outer1.x, outer1.y - 0.02, outer1.z,
                        outer0.x, outer0.y - 0.02, outer0.z,
                        r, g, b);

                    figureBoundingBox.addVector(outer0);
                }
                let figure = meshBuilder1.createFigure(this.stage, 'ROT_MARKER');
                figure.setIntersector(new modelstageweb.BoundingBoxIntersector(figureBoundingBox));
                selectionMarker.addFigure(figure);

                let sceneObjTranslation = this.scene.State.get('SceneObjectPos' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                let sceneObjRotation = this.scene.State.get('SceneObjectRot' + this.selectedActor.Data['SceneObjID'], psgeometry.Vec4.Zero);
                selectionMarker.State.set('ModelTransform', psgeometry.Matrix4.FromRotation(sceneObjRotation.x, sceneObjRotation.y, sceneObjRotation.z).multiply(psgeometry.Matrix4.FromTranslation(sceneObjTranslation.x, sceneObjTranslation.y, sceneObjTranslation.z)));

                selectionMarker.Filter = new modelstageweb.GenericSceneItemFilterWebGL();
                this.scene.addSceneItem(selectionMarker, true);
            }
        }

        public handleMouseDown(e: JQuery.Event) {
            let viewRay = this.stage.Camera.getViewRay(e.clientX, e.clientY);
            let candidates: Array<modelstageweb.IntersectionCandidate> = [];
            this.scene.getIntersectionCandidates(viewRay, candidates);

            let pickedObject = false;
            let currentIdx = 0;

            while (!pickedObject && currentIdx < candidates.length) {

                if (candidates[currentIdx].sceneItem instanceof modelstageweb.ActorWebGL) {

                    let pickedActor = <modelstageweb.ActorWebGL>(candidates[currentIdx].sceneItem);
                    if (pickedActor.SceneItemID != SelectionTool.SelectionObjectID) {
                        if (pickedActor == this.selectedActor) {
                            this.interfaceController.pushTool(new MoveActorTool(pickedActor, this.stage.Camera, this.connection));
                        } else {
                            this.selectedActor = pickedActor;
                            this.updateSelectionMarker();
                        }

                        pickedObject = true;
                    } else {
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

        public handleMouseMove(e: JQuery.Event, x: number, y: number) {
        }

        public handleMouseUp(e: JQuery.Event) {
        }
    }

    export class PlaceActorTool extends ActorManipulationTool {
        private sceneObj: SceneObject;

        private sceneObjIdx: number;

        constructor(figureID: string, private camera: modelstageweb.CameraWebGL, connection: modelstageweb.ServerConnection) {
            super(connection);

            this.sceneObj = new SceneObject();
            this.sceneObj.AssetID = figureID;
            this.sceneObj.SceneObjectID = modelstageweb.uuidv4();
            this.sceneObj.Location = new psgeometry.Vec4(); 
            this.sceneObj.Rotation = new psgeometry.Vec4();
            this.sceneObj.Scale = new psgeometry.Vec4(1, 1, 1, 1);
            SceneAppState.GlobalInstance.SceneObjects.append(this.sceneObj);

            this.sceneObjIdx = SceneAppState.GlobalInstance.SceneObjects.Count - 1;
        }

        public handleMouseMove(e: JQuery.Event<EventTarget, null>, x: number, y: number) {
            let viewRay = this.camera.getViewRay(x, y);
            let p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                this.sceneObj = { ...this.sceneObj };
                this.sceneObj.Location = new psgeometry.Vec4(p.x, 0, p.z);
                SceneAppState.GlobalInstance.SceneObjects.replace(this.sceneObj, this.sceneObjIdx);
                //this.updateActorTranslation(this.actor, p.x, 0, p.z);
            }
        }

        public handleMouseUp(e: JQuery.Event) {
            this.interfaceController.popTool();
        }

    }

    let UserNames = {
        'Administrator': 'Administrator',
        'Arne': 'Arne Thurm',
        'Ulrich': 'Ulrich Bönkemeyer',
        'Tom': 'Tom Jachmann',
        'Zacharias': 'Zacharias Reinhardt'
    };

    let PeerColors = [
        [0.31, 0.02, 0.06, 1.00],  // red
        [0.02, 0.17, 0.31, 1.00],  // blue
        [0.02, 0.31, 0.06, 1.00],  // green
        [0.69, 0.34, 0.00, 1.00],  // orange
        [0.33, 0.00, 0.53, 1.00],  // purple
//        [, 1.00],
//        [, 1.00],
//        [, 1.00],
    ];

    export class MoveActorTool extends ActorManipulationTool {
        private isInitialized = false;
        private lastX: number;
        private lastZ: number;

        constructor(private actor: modelstageweb.ActorWebGL, private camera: modelstageweb.CameraWebGL, connection: modelstageweb.ServerConnection) {
            super(connection);
        }

        public handleMouseMove(e: JQuery.Event<EventTarget, null>, x: number, y: number) {
            let viewRay = this.camera.getViewRay(x, y);
            let p = viewRay.intersectRayWithPlane(new psgeometry.Vec3(), new psgeometry.Vec3(0, 1, 0));
            if (p) {
                if (this.isInitialized) {
                    let [sceneObj, sceneObjIdx] = this.getSceneObj(this.actor.Data['SceneObjID']);
                    if (sceneObj) {
                        let translatedSceneObj: SceneObject = { ...sceneObj };
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

        public handleMouseUp(e: JQuery.Event) {
            this.interfaceController.popTool();
        }

    }

    export class RotateActorTool extends ActorManipulationTool {
        constructor(private actor: modelstageweb.ActorWebGL, private camera: modelstageweb.CameraWebGL, connection: modelstageweb.ServerConnection) {
            super(connection);
        }

        public handleDrag(e: JQuery.Event, startX: number, startY: number, dX: number, dY: number) {

            let fac = 1;
            if (Math.abs(e.clientY - startY) > 300) {
                fac = 6
            } else if (Math.abs(e.clientY - startY) > 200) {
                fac = 3
            } else if (Math.abs(e.clientY - startY) > 100) {
                fac = 2
            }

            let [sceneObj, sceneObjIdx] = this.getSceneObj(this.actor.Data['SceneObjID']);
            if (sceneObj) {
                let rotatedSceneObj: SceneObject = { ...sceneObj };
                let rotation = rotatedSceneObj.Rotation;
                rotatedSceneObj.Rotation = rotatedSceneObj.Rotation.add(new psgeometry.Vec4(dX / (fac * 100) * Math.PI, 0, 0));
                SceneAppState.GlobalInstance.SceneObjects.replace(rotatedSceneObj, sceneObjIdx);
            }
        }

        public handleMouseUp(e: JQuery.Event) {
            this.interfaceController.popTool();
        }

    }

    export class DemoSceneWebGL extends modelstageappstate.DirectedSceneWebGL {

        private stage: modelstageweb.StageWebGL;

        private spaceActor: modelstageweb.ActorWebGL = new modelstageweb.ActorWebGL(this, 'Space');

        private spaceModel: SpaceModel;

        public get SpaceModel() { return this.spaceModel; }

        constructor(stage: modelstageweb.StageWebGL, connection: modelstageweb.ServerConnection) {
            super(new modelstageappstate.Director(modelstageappstate.AppState.GetInstance()), connection);
            this.director.Scene = this;
            this.stage = stage;

            this.spaceModel = new SpaceModel(this, this.stage, this.spaceActor);

            let shaderProgram: modelstageweb.ShaderProgramWebGL = new modelstageweb.OpaqueMeshShaderProgramWebGL();
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

        public initialize() {
            this.addSceneItem(this.spaceActor, true);
            this.spaceModel.updateSpace();

            $.when(
//                this.stage.AssetFactory.getFromUrl('/data/commonassets.psmesh'),
                this.stage.AssetFactory.getFromUrl('/data/hologem.psmesh'),
//                this.stage.AssetFactory.getFromUrl('/data/office_assets.psmesh'),
                this.stage.AssetFactory.getFromUrl('/data/office_assets_bake.psmesh')
            ).done(() => {
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

        public updateSpace() {
            this.spaceModel.clearVertices();
            for (let i = 0; i < RoomAppState.GlobalInstance.Vertices.Count; ++i) {
                let vert = RoomAppState.GlobalInstance.Vertices.GetItemAt(i);
                this.spaceModel.addVertex(vert.x, vert.z);
            }
            this.spaceModel.updateSpace();
        }

        public updatePeerInfo(peerID: string, peerColorIndex: number, userName: string) {
            if (peerID != '-1') {
                let peerInfoID = 'peer-info-' + peerID;

                let peerInfoElement = $('#' + peerInfoID);

                if (peerInfoElement.length > 0) {
                    peerInfoElement.find('span').text(userName);
                } else {
                    $('#participants-view').append('<li id="' + peerInfoID + '"><img src="images/info/Lens' + peerColorIndex + '.png" /><span>' + userName + '</span></li>');
                }
            }
        }

        public removePeer(peerID: string) {
            this.removeSceneItem('Peer' + peerID);

            let peerInfoID = 'peer-info-' + peerID;
            let peerInfoElement = $('#' + peerInfoID);
            peerInfoElement.addClass('removing');
            setTimeout(() => {
                peerInfoElement.remove();
            }, 2000);
        }

        public getColorIndexFromPeerID(peerID: string) {
            return (parseInt(peerID) - 1) % PeerColors.length;
        }

        public createPeer(peerID: string) {
            let obj: modelstageweb.ActorWebGL = new modelstageweb.ActorWebGL(this, 'Peer' + peerID);
            obj.addFigure(this.stage.AssetStore.Figures['hololens.hololens.000']);
            // TODO @UB: do this the right way...
            obj.Figures[0].ShaderInstances[0].ShaderKey = 'MatCapMeshShader';

            let colorIndex = this.getColorIndexFromPeerID(peerID);

            obj.State.set('Color', new psgeometry.Vec4(PeerColors[colorIndex][0], PeerColors[colorIndex][1], PeerColors[colorIndex][2], PeerColors[colorIndex][3]));
            obj.State.set('ModelTransform', (state: modelstageweb.RenderState) => {
                let pos: psgeometry.Vec4 = state.get('HeadPos' + peerID, psgeometry.Vec4.Zero);
                let cursor: psgeometry.Vec4 = state.get('CursPos' + peerID, psgeometry.Vec4.Zero);
                let dir = cursor.sub(pos);

                let spherical = psgeometry.Spherical.FromCartesianVector(dir);

                return (<psgeometry.Matrix4>psgeometry.Matrix4.FromRotationX(-spherical.azimuth).multiply(
                    psgeometry.Matrix4.FromRotationY(-spherical.polar))).multiply(
                    psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z));
            });

            this.addSceneItem(obj, true /* makeVisible */);
            obj.TestIntersection = false;
            obj.TestChildrenIntersection = false;
            return obj;
        }

        public createSceneObject(objectID: string, assetID: string) {
            let suffix = objectID;

            let obj = new modelstageweb.ActorWebGL(this, 'SceneObject' + suffix);
            obj.State.set('ModelTransform', (state: modelstageweb.RenderState) => {
                let pos = state.get('SceneObjectPos' + suffix, psgeometry.Vec4.Zero);
                let rot = state.get('SceneObjectRot' + suffix, psgeometry.Vec4.Zero);
                let scale = state.get('SceneObjectScale' + suffix, psgeometry.Vec4.One);

                return <psgeometry.Matrix4>psgeometry.Matrix4.FromRotation(rot.x, rot.y, rot.z).multiply(
                    psgeometry.Matrix4.FromScaling(scale.x, scale.y, scale.z).multiply(
                        psgeometry.Matrix4.FromTranslation(pos.x, pos.y, pos.z)));
            });
            obj.addFigure(this.stage.AssetStore.getFigure(assetID));
            obj.Data['SceneObjID'] = suffix;

            return obj;
        }

    }

    export class RoomAppState extends modelstageappstate.AppStateCluster {
        static ClusterTypeID = 'Room';

        static GlobalInstance: RoomAppState;

        public FloorLevel: modelstageappstate.AppStateFloatValue = new modelstageappstate.AppStateFloatValue();

        public MasterView: modelstageappstate.AppStateVector4Value = new modelstageappstate.AppStateVector4Value();

        public Vertices: modelstageappstate.AppStateCollection<psgeometry.Vec4> = new modelstageappstate.AppStateCollection<psgeometry.Vec4>(modelstageappstate.AppStateCollectionOperation);

        public constructor() {
            super();
            RoomAppState.GlobalInstance = this;
        }

        public registerEntries() {
            this.registerEntry('FloorLevel', this.FloorLevel);
            this.registerEntry('MasterView', this.MasterView);
            this.registerEntry('Vertices', this.Vertices);
        }

        public readValue(key: string, reader: modelstageappstate.AppStateDeltaReader): any {
            if (key == 'Vertices') {
                return reader.Reader.readVec4();
            } else {
                return super.readValue(key, reader);
            }
        }

        public applyChanges(scene: modelstageweb.SceneWebGL, peerID: string, instanceID: string) {
            if (this.FloorLevel.isDirty()) {
                scene.State.set('FloorLevel', this.FloorLevel.get());
                (<DemoSceneWebGL>scene).SpaceModel.FloorLevel = this.FloorLevel.get();
            }
            if (this.MasterView.isDirty()) {
                scene.State.set('MasterViewPos', this.MasterView.get());
            }
            if (this.Vertices.isDirty()) {
                let sc = <DemoSceneWebGL>scene;
                (<DemoSceneWebGL>scene).updateSpace();
            }
        }
    }

    class SceneObject {
        public SceneObjectID: string; // char[40]

        public AssetID: string;       // char[20]

        public Location: psgeometry.Vec4;

        public Rotation: psgeometry.Vec4;

        public Scale: psgeometry.Vec4;
    }

    export class SceneAppState extends modelstageappstate.AppStateCluster {
        static ClusterTypeID = 'Obj';

        static GlobalInstance: SceneAppState;

        public SceneObjects: modelstageappstate.AppStateCollection<SceneObject> = new modelstageappstate.AppStateCollection<SceneObject>(modelstageappstate.AppStateCollectionOperation);

        public constructor() {
            super();
            SceneAppState.GlobalInstance = this;
        }

        public registerEntries() {
            this.registerEntry('Obj', this.SceneObjects);
        }

        public readValue(key: string, reader: modelstageappstate.AppStateDeltaReader): any {
            if (key == 'Obj') {
                let value = new SceneObject();

                value.SceneObjectID = reader.Reader.readCharArray(40);
                value.AssetID = reader.Reader.readCharArray(40);
                value.Location = reader.Reader.readVec4();
                value.Rotation = reader.Reader.readVec4();
                value.Scale = reader.Reader.readVec4();

                return value;
            } else {
                return super.readValue(key, reader);
            }
        }

        public writeValue(key: string, writer: modelstageappstate.AppStateDeltaWriter, value: any) {
            if (key == 'Obj') {
                writer.Writer.writeCharArray(value.SceneObjectID, 40);
                writer.Writer.writeCharArray(value.AssetID, 40);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeVec4(value.Rotation);
                writer.Writer.writeVec4(psgeometry.Vec4.One);
            } else {
                super.writeValue(key, writer, value);
            }
        }

        public applyChanges(scene: modelstageweb.SceneWebGL, peerID: string, instanceID: string) {
            if (this.SceneObjects.isDirty()) {
                let sc = <DemoSceneWebGL>(scene);

                this.SceneObjects.Operations.forEach((operation) => {
                    if (operation.Operation == modelstageappstate.OperationType.Append) {
                        let objID = operation.NewValue.SceneObjectID;
                        let assetID = operation.NewValue.AssetID;
                        sc.addSceneItem(sc.createSceneObject(objID, assetID), true /* makeVisible */);
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                        //scene.RunSequence("ShowSceneObject", std::string{ "ShowSceneObject" } +noteID, { { "SceneObjectID", objID } });
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Replace) {
                        let objID = operation.NewValue.SceneObjectID;
                        scene.State.set('SceneObjectPos' + objID, operation.NewValue.Location);
                        scene.State.set('SceneObjectRot' + objID, operation.NewValue.Rotation);
                        scene.State.set('SceneObjectScale' + objID, operation.NewValue.Scale);
                    }
                    else if (operation.Operation == modelstageappstate.OperationType.Remove) {
                        let objID = operation.PreviousValue.SceneObjectID;
                        scene.removeSceneItem('SceneObject' + objID);
                    }
                });
            }
        }

    }

    export class PeerAppState extends modelstageappstate.AppStateCluster {
        static ClusterTypeID = 'Peer';

        private headPos: modelstageappstate.AppStateVector4Value = new modelstageappstate.AppStateVector4Value();

        private cursorPos: modelstageappstate.AppStateVector4Value = new modelstageappstate.AppStateVector4Value();

        private userID: modelstageappstate.AppStateStringValue = new modelstageappstate.AppStateStringValue();

        private active: modelstageappstate.AppStateBoolValue = new modelstageappstate.AppStateBoolValue();

        public providesInitializationData() {
            return true;
        }

        public registerEntries() {
            this.registerEntry('Head', this.headPos);
            this.registerEntry('Curs', this.cursorPos);
            this.registerEntry('User', this.userID);
            this.registerEntry('Active', this.active);
        }

        public applyChanges(scene: modelstageweb.SceneWebGL, peerID: string, instanceID: string) {
            let sc = <DemoSceneWebGL>scene;
            if (peerID.length > 0 && (this.headPos.isDirty() || this.cursorPos.isDirty())) {
                if (!sc.getSceneItem('Peer' + peerID)) {
                    sc.createPeer(peerID);
                }
                let levelOfs = new psgeometry.Vec4(0, -sc.SpaceModel.FloorLevel, 0, 0);
                let headPos = this.headPos.get();
                let cursorPos = this.cursorPos.get();
                if (headPos && cursorPos) {
                    scene.State.set('HeadPos' + peerID, headPos.add(levelOfs));
                    scene.State.set('CursPos' + peerID, cursorPos.add(levelOfs));
                }
            }

            if (this.userID.isDirty()) {
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

    class Note {
        public NoteID: string; //char[20];

        public NoteType: number; // int

        public OwnerID: string; // char[10];

        public AssignedToID: string; // char[10];

        public Location: psgeometry.Vec4;

        public AzimuthalRotation: number; // float			

    };

    export class NotesAppState extends modelstageappstate.AppStateCluster {
        static ClusterTypeID = 'Notes';

        static GlobalInstance: NotesAppState;

        public Notes: modelstageappstate.AppStateCollection<Note> = new modelstageappstate.AppStateCollection<Note>(modelstageappstate.AppStateCollectionOperation);

        public constructor() {
            super();
            NotesAppState.GlobalInstance = this;
        }

        public registerEntries() {
            this.registerEntry('Notes', this.Notes);
        }

        public readValue(key: string, reader: modelstageappstate.AppStateDeltaReader): any {
            if (key == 'Notes') {
                let value = new Note();

                value.NoteID = reader.Reader.readCharArray(20);
                value.NoteType = reader.Reader.readUInt32();
                value.OwnerID = reader.Reader.readCharArray(10);
                value.Location = reader.Reader.readVec4();
                value.AzimuthalRotation = reader.Reader.readFloat32();

                return value;
            } else {
                return super.readValue(key, reader);
            }
        }

        public writeValue(key: string, writer: modelstageappstate.AppStateDeltaWriter, value: any) {
            if (key == 'Notes') {
                writer.Writer.writeCharArray(value.NoteID, 20);
                writer.Writer.writeInt32(value.NoteType);
                writer.Writer.writeCharArray(value.OwnerID, 10);
                writer.Writer.writeVec4(value.Location);
                writer.Writer.writeFloat32(value.AzimuthalRotation);
            } else {
                super.writeValue(key, writer, value);
            }
        }


    }

}
