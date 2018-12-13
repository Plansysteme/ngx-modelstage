/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { modelstage } from './modelstage';
import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
import { $ } from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-mousewheel';
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
            /*   over: (event, ui) => {
                   let figureID = $(ui.draggable).attr('data-figure-id');
                   //actor.Data['rotate'] = new psgeometry.Vec4(0, this.cameraController.Yaw, 0);

                   this.interfaceController.pushTool(new modelstage.PlaceActorTool(figureID, this.stage.Camera, this.connection));
               }*/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzdGFnZS1zYW1wbGUtd2ViLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVsc3RhZ2UvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzdGFnZS1zYW1wbGUtd2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzNCLE9BQU8sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLG1CQUFtQixDQUFDO0FBRTNCLE1BQU0sT0FBTyxjQUFjOzs7Ozs7SUFFYixXQUFXLENBQUMsT0FBZTs7WUFDN0IsR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDL0IsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUN4QyxDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU87Z0JBQ0gsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLE9BQU87YUFDaEIsQ0FBQztTQUNMO0lBQ0wsQ0FBQzs7Ozs7SUFFTSxjQUFjLENBQUMsT0FBZTtJQUNyQyxDQUFDO0NBRUo7QUFFRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsVUFBVSxDQUFDLFlBQVk7Ozs7SUFvQjNELFlBQVksZUFBdUI7UUFDL0IsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBbkJuQixpQkFBWSxHQUFHLElBQUksa0JBQWtCLENB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O1FBQ3JJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUV6RyxDQUFDLENBQUMsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUUxQixDQUFDLG1CQUFLLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzVDLFdBQVcsRUFBRSxVQUFVO2dCQUN2QixNQUFNLEVBQUUsV0FBVztnQkFDbkIsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osTUFBTSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1lBRUgsQ0FBQyxtQkFBSyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNqQzs7Ozs7a0JBS007YUFDTixDQUFDLENBQUM7UUFFUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRVMsVUFBVTtJQUNwQixDQUFDO0NBRUo7Ozs7OztJQWhGRywwQ0FBMEk7Ozs7O0lBRTFJLDJDQUE4STs7Ozs7SUFFOUksMENBQTJJOzs7OztJQUUzSSwyQ0FBOEk7Ozs7O0lBRTlJLHdDQUF1Qjs7Ozs7SUFFdkIsaURBQStEOzs7OztJQUUvRCw4Q0FBeUQ7Ozs7O0lBRXpELHdDQUFtRDs7Ozs7SUFFbkQsc0NBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIE1vZGVsU3RhZ2UgwqkgMjAxOCBQbGFuc3lzdGVtZSBHbWJILCBIYW1idXJnLCBHZXJtYW55LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5cclxuaW1wb3J0IHsgbW9kZWxzdGFnZSB9IGZyb20gJy4vbW9kZWxzdGFnZSc7XHJcbmltcG9ydCB7IG1vZGVsc3RhZ2V3ZWIgfSBmcm9tICcuL214LWNvbW1vbic7XHJcbmltcG9ydCB7IG1vZGVsc3RhZ2VhcHBzdGF0ZSB9IGZyb20gJy4vbXgtYXBwc3RhdGUnO1xyXG5pbXBvcnQgeyBwc2dlb21ldHJ5IH0gZnJvbSAnLi9wcy1nZW9tZXRyeSc7XHJcbmltcG9ydCB7ICQgfSBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgJ2pxdWVyeS11aS91aS93aWRnZXRzL2RyYWdnYWJsZSc7XHJcbmltcG9ydCAnanF1ZXJ5LXVpL3VpL3dpZGdldHMvZHJvcHBhYmxlJztcclxuaW1wb3J0ICdqcXVlcnktbW91c2V3aGVlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNoYW5uZWwge1xyXG5cclxuICAgIHByb3RlY3RlZCBleHRyYWN0UGFydChtZXNzYWdlOiBzdHJpbmcpOiB7IHJlbWFpbmRlcjogc3RyaW5nLCBwYXJ0OiBzdHJpbmcgfSB7XHJcbiAgICAgICAgbGV0IHNlcCA9IG1lc3NhZ2UuaW5kZXhPZignfCcpO1xyXG4gICAgICAgIGlmIChzZXAgPj0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcGFydDogbWVzc2FnZS5zdWJzdHJpbmcoMCwgc2VwKSxcclxuICAgICAgICAgICAgICAgIHJlbWFpbmRlcjogbWVzc2FnZS5zdWJzdHJpbmcoc2VwICsgMSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVtYWluZGVyOiAnJyxcclxuICAgICAgICAgICAgICAgIHBhcnQ6IG1lc3NhZ2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb2Nlc3NNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNhbXBsZVRoZWF0ZXJXZWJHTCBleHRlbmRzIG1vZGVsc3RhZ2UuVGhlYXRlcldlYkdMIHtcclxuXHJcbiAgICBwcml2YXRlIHBlZXJBcHBTdGF0ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuTG9jYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyKG1vZGVsc3RhZ2UuUGVlckFwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuUGVlckFwcFN0YXRlKTtcclxuXHJcbiAgICBwcml2YXRlIHNjZW5lQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkdsb2JhbEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXIobW9kZWxzdGFnZS5TY2VuZUFwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuU2NlbmVBcHBTdGF0ZSk7XHJcblxyXG4gICAgcHJpdmF0ZSByb29tQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkdsb2JhbEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXIobW9kZWxzdGFnZS5Sb29tQXBwU3RhdGUuQ2x1c3RlclR5cGVJRCwgbW9kZWxzdGFnZS5Sb29tQXBwU3RhdGUpO1xyXG5cclxuICAgIHByaXZhdGUgbm90ZXNBcHBTdGF0ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuR2xvYmFsQXBwU3RhdGVDbHVzdGVyTWFuYWdlcihtb2RlbHN0YWdlLk5vdGVzQXBwU3RhdGUuQ2x1c3RlclR5cGVJRCwgbW9kZWxzdGFnZS5Ob3Rlc0FwcFN0YXRlKTtcclxuXHJcbiAgICBwcml2YXRlIGFjdG9ySW5kZXggPSAxO1xyXG5cclxuICAgIHByaXZhdGUgaW50ZXJmYWNlQ29udHJvbGxlcjogbW9kZWxzdGFnZXdlYi5JbnRlcmZhY2VDb250cm9sbGVyO1xyXG5cclxuICAgIHByaXZhdGUgY2FtZXJhQ29udHJvbGxlcjogbW9kZWxzdGFnZXdlYi5DYW1lcmFDb250cm9sbGVyO1xyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uO1xyXG5cclxuICAgIHByaXZhdGUgY2hhbm5lbHM6IHsgW2luZGV4OiBzdHJpbmddOiBNZXNzYWdlQ2hhbm5lbCB9ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzRWxlbWVudElEOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihjYW52YXNFbGVtZW50SUQpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgbW9kZWxzdGFnZXdlYi5TaWduYWxSU2VydmVyQ29ubmVjdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IG1vZGVsc3RhZ2UuRGVtb1NjZW5lV2ViR0wodGhpcy5zdGFnZSwgdGhpcy5jb25uZWN0aW9uKTtcclxuICAgICAgICB0aGlzLnNjZW5lLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uQ29ubmVjdGVkKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25NZXNzYWdlKChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5kYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgbXNnLmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmID0gbXNnLmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5ID8gbXNnLmRhdGEgOiBuZXcgVWludDhBcnJheShtc2cuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV0d29ya01lc3NhZ2UgPSBtb2RlbHN0YWdld2ViLk5ldHdvcmtDaGFubmVsTWVzc2FnZS5Gcm9tQnVmZmVyKGJ1Zik7XHJcbiAgICAgICAgICAgICAgICAoPG1vZGVsc3RhZ2VhcHBzdGF0ZS5EaXJlY3RlZFNjZW5lV2ViR0w+dGhpcy5zY2VuZSkucmVjZWl2ZWRNZXNzYWdlKG5ldHdvcmtNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbXNnLmRhdGEgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gPHN0cmluZz5tc2cuZGF0YTtcclxuICAgICAgICAgICAgICAgIGxldCBzZXAgPSBkYXRhLmluZGV4T2YoJ3wnKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXAgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsS2V5ID0gZGF0YS5zdWJzdHJpbmcoMCwgc2VwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGRhdGEuc3Vic3RyKHNlcCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tjaGFubmVsS2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLnByb2Nlc3NNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUmVjZWl2ZWQgaW52YWxpZCBtZXNzYWdlIHR5cGU6ICcgKyB0eXBlb2YgbXNnLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlciA9IG5ldyBtb2RlbHN0YWdld2ViLkludGVyZmFjZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICB0aGlzLmNhbWVyYUNvbnRyb2xsZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5DYW1lcmFDb250cm9sbGVyKHRoaXMuU3RhZ2UsIHRoaXMuU3RhZ2UuQ2FtZXJhLCB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIsIHRoaXMuY29ubmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFDb250cm9sbGVyLmNvbnN0cnVjdCgxMi4wLCAtMC40NSwgMC4wKTtcclxuICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucHVzaFRvb2wobmV3IG1vZGVsc3RhZ2UuU2VsZWN0aW9uVG9vbCh0aGlzLnNjZW5lLCB0aGlzLnN0YWdlLCB0aGlzLmNvbm5lY3Rpb24pKTtcclxuXHJcbiAgICAgICAgJCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY29ubmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgKDxhbnk+JCgnLmFyZWEtcmlnaHQtc2lkZWJhciB1bCBsaScpKS5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdkb2N1bWVudCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdjcm9zc2hhaXInLFxyXG4gICAgICAgICAgICAgICAgaGVscGVyOiAnY2xvbmUnLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC41LFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICg8YW55PiQoJyN2aWV3Q2FudmFzJykpLmRyb3BwYWJsZSh7XHJcbiAgICAgICAgICAgICAvKiAgIG92ZXI6IChldmVudCwgdWkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlndXJlSUQgPSAkKHVpLmRyYWdnYWJsZSkuYXR0cignZGF0YS1maWd1cmUtaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FjdG9yLkRhdGFbJ3JvdGF0ZSddID0gbmV3IHBzZ2VvbWV0cnkuVmVjNCgwLCB0aGlzLmNhbWVyYUNvbnRyb2xsZXIuWWF3LCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyLnB1c2hUb29sKG5ldyBtb2RlbHN0YWdlLlBsYWNlQWN0b3JUb29sKGZpZ3VyZUlELCB0aGlzLnN0YWdlLkNhbWVyYSwgdGhpcy5jb25uZWN0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCkge1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=