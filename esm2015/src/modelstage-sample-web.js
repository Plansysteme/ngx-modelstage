/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { modelstage } from './modelstage';
import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
import 'jquery-ui';
//import 'jquery-ui/ui/widgets/droppable';
import 'jquery.mousewheel';
export class MessageChannel {
    /**
     * @protected
     * @param {?} message
     * @return {?}
     */
    extractPart(message) {
        /** @type {?} */
        let sep = message.indexOf('|');
        if (sep >= 0) {
            return {
                part: message.substring(0, sep),
                remainder: message.substring(sep + 1)
            };
        }
        else {
            return {
                remainder: '',
                part: message
            };
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    processMessage(message) {
    }
}
export class SampleTheaterWebGL extends modelstage.TheaterWebGL {
    /**
     * @param {?} canvasElementID
     */
    constructor(canvasElementID) {
        super(canvasElementID);
        this.peerAppState = new modelstageappstate.LocalAppStateClusterManager(modelstage.PeerAppState.ClusterTypeID, modelstage.PeerAppState);
        this.sceneAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.SceneAppState.ClusterTypeID, modelstage.SceneAppState);
        this.roomAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.RoomAppState.ClusterTypeID, modelstage.RoomAppState);
        this.notesAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.NotesAppState.ClusterTypeID, modelstage.NotesAppState);
        this.actorIndex = 1;
        this.channels = {};
        this.connection = new modelstageweb.SignalRServerConnection();
        this.scene = new modelstage.DemoSceneWebGL(this.stage, this.connection);
        this.scene.initialize();
        this.connection.onConnected(() => {
        });
        this.connection.onMessage((msg) => {
            if (msg.data instanceof ArrayBuffer || msg.data instanceof Uint8Array) {
                /** @type {?} */
                let buf = msg.data instanceof Uint8Array ? msg.data : new Uint8Array(msg.data);
                /** @type {?} */
                let networkMessage = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
                ((/** @type {?} */ (this.scene))).receivedMessage(networkMessage);
            }
            else if (typeof msg.data == 'string') {
                /** @type {?} */
                let data = (/** @type {?} */ (msg.data));
                /** @type {?} */
                let sep = data.indexOf('|');
                if (sep >= 0) {
                    /** @type {?} */
                    let channelKey = data.substring(0, sep);
                    /** @type {?} */
                    let message = data.substr(sep + 1);
                    /** @type {?} */
                    let channel = this.channels[channelKey];
                    if (channel) {
                        channel.processMessage(message);
                    }
                }
            }
            else {
                console.warn('Received invalid message type: ' + typeof msg.data);
            }
        });
        this.interfaceController = new modelstageweb.InterfaceController();
        this.cameraController = new modelstageweb.CameraController(this.Stage, this.Stage.Camera, this.interfaceController, this.connection);
        this.cameraController.construct(12.0, -0.45, 0.0);
        this.interfaceController.pushTool(new modelstage.SelectionTool(this.scene, this.stage, this.connection));
        $(() => {
            this.connection.connect();
            ((/** @type {?} */ ($('.area-right-sidebar ul li')))).draggable({
                containment: 'document',
                cursor: 'crosshair',
                helper: 'clone',
                opacity: 0.5,
                scroll: false
            });
            ((/** @type {?} */ ($('#viewCanvas')))).droppable({
                over: (event, ui) => {
                    /** @type {?} */
                    let figureID = $(ui.draggable).attr('data-figure-id');
                    //actor.Data['rotate'] = new psgeometry.Vec4(0, this.cameraController.Yaw, 0);
                    this.interfaceController.pushTool(new modelstage.PlaceActorTool(figureID, this.stage.Camera, this.connection));
                }
            });
        });
    }
    /**
     * @protected
     * @return {?}
     */
    initialize() {
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    SampleTheaterWebGL.prototype.peerAppState;
    /**
     * @type {?}
     * @private
     */
    SampleTheaterWebGL.prototype.sceneAppState;
    /**
     * @type {?}
     * @private
     */
    SampleTheaterWebGL.prototype.roomAppState;
    /**
     * @type {?}
     * @private
     */
    SampleTheaterWebGL.prototype.notesAppState;
    /**
     * @type {?}
     * @private
     */
    SampleTheaterWebGL.prototype.actorIndex;
    /**
     * @type {?}
     * @private
     */
    SampleTheaterWebGL.prototype.interfaceController;
    /**
     * @type {?}
     * @private
     */
    SampleTheaterWebGL.prototype.cameraController;
    /**
     * @type {?}
     * @private
     */
    SampleTheaterWebGL.prototype.connection;
    /**
     * @type {?}
     * @private
     */
    SampleTheaterWebGL.prototype.channels;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzdGFnZS1zYW1wbGUtd2ViLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVsc3RhZ2UvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzdGFnZS1zYW1wbGUtd2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLFdBQVcsQ0FBQzs7QUFFbkIsT0FBTyxtQkFBbUIsQ0FBQztBQUUzQixNQUFNLE9BQU8sY0FBYzs7Ozs7O0lBRWIsV0FBVyxDQUFDLE9BQWU7O1lBQzdCLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQy9CLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDeEMsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILFNBQVMsRUFBRSxFQUFFO2dCQUNiLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7O0lBRU0sY0FBYyxDQUFDLE9BQWU7SUFDckMsQ0FBQztDQUVKO0FBRUQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLFVBQVUsQ0FBQyxZQUFZOzs7O0lBb0IzRCxZQUFZLGVBQXVCO1FBQy9CLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQW5CbkIsaUJBQVksR0FBRyxJQUFJLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsSSxrQkFBYSxHQUFHLElBQUksa0JBQWtCLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXRJLGlCQUFZLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbkksa0JBQWEsR0FBRyxJQUFJLGtCQUFrQixDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV0SSxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBUWYsYUFBUSxHQUF3QyxFQUFFLENBQUM7UUFLdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBRTlELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM5QixJQUFJLEdBQUcsQ0FBQyxJQUFJLFlBQVksV0FBVyxJQUFJLEdBQUcsQ0FBQyxJQUFJLFlBQVksVUFBVSxFQUFFOztvQkFDL0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLFlBQVksVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDOztvQkFDMUUsY0FBYyxHQUFHLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2dCQUN4RSxDQUFDLG1CQUF1QyxJQUFJLENBQUMsS0FBSyxFQUFBLENBQUMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdkY7aUJBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFOztvQkFDaEMsSUFBSSxHQUFHLG1CQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUE7O29CQUN2QixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQzNCLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTs7d0JBQ04sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQzs7d0JBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7O3dCQUM5QixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7b0JBQ3ZDLElBQUksT0FBTyxFQUFFO3dCQUNULE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ25DO2lCQUNKO2FBQ0o7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyRTtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksYUFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDbkUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNySSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFFekcsQ0FBQyxDQUFDLEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFMUIsQ0FBQyxtQkFBSyxDQUFDLENBQUMsMkJBQTJCLENBQUMsRUFBQSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUM1QyxXQUFXLEVBQUUsVUFBVTtnQkFDdkIsTUFBTSxFQUFFLFdBQVc7Z0JBQ25CLE1BQU0sRUFBRSxPQUFPO2dCQUNmLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztZQUVILENBQUMsbUJBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzlCLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTs7d0JBQ1osUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO29CQUNyRCw4RUFBOEU7b0JBRTlFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbkgsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFUyxVQUFVO0lBQ3BCLENBQUM7Q0FFSjs7Ozs7O0lBaEZHLDBDQUEwSTs7Ozs7SUFFMUksMkNBQThJOzs7OztJQUU5SSwwQ0FBMkk7Ozs7O0lBRTNJLDJDQUE4STs7Ozs7SUFFOUksd0NBQXVCOzs7OztJQUV2QixpREFBK0Q7Ozs7O0lBRS9ELDhDQUF5RDs7Ozs7SUFFekQsd0NBQW1EOzs7OztJQUVuRCxzQ0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gTW9kZWxTdGFnZSDCqSAyMDE4IFBsYW5zeXN0ZW1lIEdtYkgsIEhhbWJ1cmcsIEdlcm1hbnkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQgeyBtb2RlbHN0YWdlIH0gZnJvbSAnLi9tb2RlbHN0YWdlJztcclxuaW1wb3J0IHsgbW9kZWxzdGFnZXdlYiB9IGZyb20gJy4vbXgtY29tbW9uJztcclxuaW1wb3J0IHsgbW9kZWxzdGFnZWFwcHN0YXRlIH0gZnJvbSAnLi9teC1hcHBzdGF0ZSc7XHJcbmltcG9ydCAnanF1ZXJ5LXVpJztcclxuLy9pbXBvcnQgJ2pxdWVyeS11aS91aS93aWRnZXRzL2Ryb3BwYWJsZSc7XHJcbmltcG9ydCAnanF1ZXJ5Lm1vdXNld2hlZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDaGFubmVsIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZXh0cmFjdFBhcnQobWVzc2FnZTogc3RyaW5nKTogeyByZW1haW5kZXI6IHN0cmluZywgcGFydDogc3RyaW5nIH0ge1xyXG4gICAgICAgIGxldCBzZXAgPSBtZXNzYWdlLmluZGV4T2YoJ3wnKTtcclxuICAgICAgICBpZiAoc2VwID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBhcnQ6IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIHNlcCksXHJcbiAgICAgICAgICAgICAgICByZW1haW5kZXI6IG1lc3NhZ2Uuc3Vic3RyaW5nKHNlcCArIDEpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlbWFpbmRlcjogJycsXHJcbiAgICAgICAgICAgICAgICBwYXJ0OiBtZXNzYWdlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcm9jZXNzTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTYW1wbGVUaGVhdGVyV2ViR0wgZXh0ZW5kcyBtb2RlbHN0YWdlLlRoZWF0ZXJXZWJHTCB7XHJcblxyXG4gICAgcHJpdmF0ZSBwZWVyQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkxvY2FsQXBwU3RhdGVDbHVzdGVyTWFuYWdlcihtb2RlbHN0YWdlLlBlZXJBcHBTdGF0ZS5DbHVzdGVyVHlwZUlELCBtb2RlbHN0YWdlLlBlZXJBcHBTdGF0ZSk7XHJcblxyXG4gICAgcHJpdmF0ZSBzY2VuZUFwcFN0YXRlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5HbG9iYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyKG1vZGVsc3RhZ2UuU2NlbmVBcHBTdGF0ZS5DbHVzdGVyVHlwZUlELCBtb2RlbHN0YWdlLlNjZW5lQXBwU3RhdGUpO1xyXG5cclxuICAgIHByaXZhdGUgcm9vbUFwcFN0YXRlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5HbG9iYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyKG1vZGVsc3RhZ2UuUm9vbUFwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuUm9vbUFwcFN0YXRlKTtcclxuXHJcbiAgICBwcml2YXRlIG5vdGVzQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkdsb2JhbEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXIobW9kZWxzdGFnZS5Ob3Rlc0FwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuTm90ZXNBcHBTdGF0ZSk7XHJcblxyXG4gICAgcHJpdmF0ZSBhY3RvckluZGV4ID0gMTtcclxuXHJcbiAgICBwcml2YXRlIGludGVyZmFjZUNvbnRyb2xsZXI6IG1vZGVsc3RhZ2V3ZWIuSW50ZXJmYWNlQ29udHJvbGxlcjtcclxuXHJcbiAgICBwcml2YXRlIGNhbWVyYUNvbnRyb2xsZXI6IG1vZGVsc3RhZ2V3ZWIuQ2FtZXJhQ29udHJvbGxlcjtcclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IG1vZGVsc3RhZ2V3ZWIuU2VydmVyQ29ubmVjdGlvbjtcclxuXHJcbiAgICBwcml2YXRlIGNoYW5uZWxzOiB7IFtpbmRleDogc3RyaW5nXTogTWVzc2FnZUNoYW5uZWwgfSA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhc0VsZW1lbnRJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoY2FudmFzRWxlbWVudElEKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IG1vZGVsc3RhZ2V3ZWIuU2lnbmFsUlNlcnZlckNvbm5lY3Rpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBtb2RlbHN0YWdlLkRlbW9TY2VuZVdlYkdMKHRoaXMuc3RhZ2UsIHRoaXMuY29ubmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5pbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbkNvbm5lY3RlZCgoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uTWVzc2FnZSgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IG1zZy5kYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZiA9IG1zZy5kYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSA/IG1zZy5kYXRhIDogbmV3IFVpbnQ4QXJyYXkobXNnLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ldHdvcmtNZXNzYWdlID0gbW9kZWxzdGFnZXdlYi5OZXR3b3JrQ2hhbm5lbE1lc3NhZ2UuRnJvbUJ1ZmZlcihidWYpO1xyXG4gICAgICAgICAgICAgICAgKDxtb2RlbHN0YWdlYXBwc3RhdGUuRGlyZWN0ZWRTY2VuZVdlYkdMPnRoaXMuc2NlbmUpLnJlY2VpdmVkTWVzc2FnZShuZXR3b3JrTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1zZy5kYXRhID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IDxzdHJpbmc+bXNnLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VwID0gZGF0YS5pbmRleE9mKCd8Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VwID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbEtleSA9IGRhdGEuc3Vic3RyaW5nKDAsIHNlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBkYXRhLnN1YnN0cihzZXAgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHNbY2hhbm5lbEtleV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5wcm9jZXNzTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlY2VpdmVkIGludmFsaWQgbWVzc2FnZSB0eXBlOiAnICsgdHlwZW9mIG1zZy5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5JbnRlcmZhY2VDb250cm9sbGVyKCk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFDb250cm9sbGVyID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQ2FtZXJhQ29udHJvbGxlcih0aGlzLlN0YWdlLCB0aGlzLlN0YWdlLkNhbWVyYSwgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyLCB0aGlzLmNvbm5lY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhQ29udHJvbGxlci5jb25zdHJ1Y3QoMTIuMCwgLTAuNDUsIDAuMCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyLnB1c2hUb29sKG5ldyBtb2RlbHN0YWdlLlNlbGVjdGlvblRvb2wodGhpcy5zY2VuZSwgdGhpcy5zdGFnZSwgdGhpcy5jb25uZWN0aW9uKSk7XHJcblxyXG4gICAgICAgICQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLmNvbm5lY3QoKTtcclxuXHJcbiAgICAgICAgICAgICg8YW55PiQoJy5hcmVhLXJpZ2h0LXNpZGViYXIgdWwgbGknKSkuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5tZW50OiAnZG9jdW1lbnQnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAnY3Jvc3NoYWlyJyxcclxuICAgICAgICAgICAgICAgIGhlbHBlcjogJ2Nsb25lJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcclxuICAgICAgICAgICAgICAgIHNjcm9sbDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAoPGFueT4kKCcjdmlld0NhbnZhcycpKS5kcm9wcGFibGUoe1xyXG4gICAgICAgICAgICAgICAgb3ZlcjogKGV2ZW50LCB1aSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWd1cmVJRCA9ICQodWkuZHJhZ2dhYmxlKS5hdHRyKCdkYXRhLWZpZ3VyZS1pZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWN0b3IuRGF0YVsncm90YXRlJ10gPSBuZXcgcHNnZW9tZXRyeS5WZWM0KDAsIHRoaXMuY2FtZXJhQ29udHJvbGxlci5ZYXcsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucHVzaFRvb2wobmV3IG1vZGVsc3RhZ2UuUGxhY2VBY3RvclRvb2woZmlndXJlSUQsIHRoaXMuc3RhZ2UuQ2FtZXJhLCB0aGlzLmNvbm5lY3Rpb24pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCkge1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=