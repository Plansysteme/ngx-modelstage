/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { modelstage } from './modelstage';
import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzdGFnZS1zYW1wbGUtd2ViLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVsc3RhZ2UvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzdGFnZS1zYW1wbGUtd2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxNQUFNLE9BQU8sY0FBYzs7Ozs7O0lBRWIsV0FBVyxDQUFDLE9BQWU7O1lBQzdCLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQy9CLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDeEMsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILFNBQVMsRUFBRSxFQUFFO2dCQUNiLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7O0lBRU0sY0FBYyxDQUFDLE9BQWU7SUFDckMsQ0FBQztDQUVKO0FBRUQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLFVBQVUsQ0FBQyxZQUFZOzs7O0lBb0IzRCxZQUFZLGVBQXVCO1FBQy9CLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQW5CbkIsaUJBQVksR0FBRyxJQUFJLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsSSxrQkFBYSxHQUFHLElBQUksa0JBQWtCLENBQUMsNEJBQTRC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ekQsd0NBQW1EOzs7OztJQUVuRCxzQ0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gTW9kZWxTdGFnZSDCqSAyMDE4IFBsYW5zeXN0ZW1lIEdtYkgsIEhhbWJ1cmcsIEdlcm1hbnkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQgeyBtb2RlbHN0YWdlIH0gZnJvbSAnLi9tb2RlbHN0YWdlJztcclxuaW1wb3J0IHsgbW9kZWxzdGFnZXdlYiB9IGZyb20gJy4vbXgtY29tbW9uJztcclxuaW1wb3J0IHsgbW9kZWxzdGFnZWFwcHN0YXRlIH0gZnJvbSAnLi9teC1hcHBzdGF0ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNoYW5uZWwge1xyXG5cclxuICAgIHByb3RlY3RlZCBleHRyYWN0UGFydChtZXNzYWdlOiBzdHJpbmcpOiB7IHJlbWFpbmRlcjogc3RyaW5nLCBwYXJ0OiBzdHJpbmcgfSB7XHJcbiAgICAgICAgbGV0IHNlcCA9IG1lc3NhZ2UuaW5kZXhPZignfCcpO1xyXG4gICAgICAgIGlmIChzZXAgPj0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcGFydDogbWVzc2FnZS5zdWJzdHJpbmcoMCwgc2VwKSxcclxuICAgICAgICAgICAgICAgIHJlbWFpbmRlcjogbWVzc2FnZS5zdWJzdHJpbmcoc2VwICsgMSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVtYWluZGVyOiAnJyxcclxuICAgICAgICAgICAgICAgIHBhcnQ6IG1lc3NhZ2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb2Nlc3NNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNhbXBsZVRoZWF0ZXJXZWJHTCBleHRlbmRzIG1vZGVsc3RhZ2UuVGhlYXRlcldlYkdMIHtcclxuXHJcbiAgICBwcml2YXRlIHBlZXJBcHBTdGF0ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuTG9jYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyKG1vZGVsc3RhZ2UuUGVlckFwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuUGVlckFwcFN0YXRlKTtcclxuXHJcbiAgICBwcml2YXRlIHNjZW5lQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkdsb2JhbEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXIobW9kZWxzdGFnZS5TY2VuZUFwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuU2NlbmVBcHBTdGF0ZSk7XHJcblxyXG4gICAgcHJpdmF0ZSByb29tQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkdsb2JhbEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXIobW9kZWxzdGFnZS5Sb29tQXBwU3RhdGUuQ2x1c3RlclR5cGVJRCwgbW9kZWxzdGFnZS5Sb29tQXBwU3RhdGUpO1xyXG5cclxuICAgIHByaXZhdGUgbm90ZXNBcHBTdGF0ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuR2xvYmFsQXBwU3RhdGVDbHVzdGVyTWFuYWdlcihtb2RlbHN0YWdlLk5vdGVzQXBwU3RhdGUuQ2x1c3RlclR5cGVJRCwgbW9kZWxzdGFnZS5Ob3Rlc0FwcFN0YXRlKTtcclxuXHJcbiAgICBwcml2YXRlIGFjdG9ySW5kZXggPSAxO1xyXG5cclxuICAgIHByaXZhdGUgaW50ZXJmYWNlQ29udHJvbGxlcjogbW9kZWxzdGFnZXdlYi5JbnRlcmZhY2VDb250cm9sbGVyO1xyXG5cclxuICAgIHByaXZhdGUgY2FtZXJhQ29udHJvbGxlcjogbW9kZWxzdGFnZXdlYi5DYW1lcmFDb250cm9sbGVyO1xyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uO1xyXG5cclxuICAgIHByaXZhdGUgY2hhbm5lbHM6IHsgW2luZGV4OiBzdHJpbmddOiBNZXNzYWdlQ2hhbm5lbCB9ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzRWxlbWVudElEOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihjYW52YXNFbGVtZW50SUQpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgbW9kZWxzdGFnZXdlYi5TaWduYWxSU2VydmVyQ29ubmVjdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IG1vZGVsc3RhZ2UuRGVtb1NjZW5lV2ViR0wodGhpcy5zdGFnZSwgdGhpcy5jb25uZWN0aW9uKTtcclxuICAgICAgICB0aGlzLnNjZW5lLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uQ29ubmVjdGVkKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25NZXNzYWdlKChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5kYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgbXNnLmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmID0gbXNnLmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5ID8gbXNnLmRhdGEgOiBuZXcgVWludDhBcnJheShtc2cuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV0d29ya01lc3NhZ2UgPSBtb2RlbHN0YWdld2ViLk5ldHdvcmtDaGFubmVsTWVzc2FnZS5Gcm9tQnVmZmVyKGJ1Zik7XHJcbiAgICAgICAgICAgICAgICAoPG1vZGVsc3RhZ2VhcHBzdGF0ZS5EaXJlY3RlZFNjZW5lV2ViR0w+dGhpcy5zY2VuZSkucmVjZWl2ZWRNZXNzYWdlKG5ldHdvcmtNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbXNnLmRhdGEgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gPHN0cmluZz5tc2cuZGF0YTtcclxuICAgICAgICAgICAgICAgIGxldCBzZXAgPSBkYXRhLmluZGV4T2YoJ3wnKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXAgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsS2V5ID0gZGF0YS5zdWJzdHJpbmcoMCwgc2VwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGRhdGEuc3Vic3RyKHNlcCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tjaGFubmVsS2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLnByb2Nlc3NNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUmVjZWl2ZWQgaW52YWxpZCBtZXNzYWdlIHR5cGU6ICcgKyB0eXBlb2YgbXNnLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlciA9IG5ldyBtb2RlbHN0YWdld2ViLkludGVyZmFjZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICB0aGlzLmNhbWVyYUNvbnRyb2xsZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5DYW1lcmFDb250cm9sbGVyKHRoaXMuU3RhZ2UsIHRoaXMuU3RhZ2UuQ2FtZXJhLCB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIsIHRoaXMuY29ubmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFDb250cm9sbGVyLmNvbnN0cnVjdCgxMi4wLCAtMC40NSwgMC4wKTtcclxuICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucHVzaFRvb2wobmV3IG1vZGVsc3RhZ2UuU2VsZWN0aW9uVG9vbCh0aGlzLnNjZW5lLCB0aGlzLnN0YWdlLCB0aGlzLmNvbm5lY3Rpb24pKTtcclxuXHJcbiAgICAgICAgJCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY29ubmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgKDxhbnk+JCgnLmFyZWEtcmlnaHQtc2lkZWJhciB1bCBsaScpKS5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdkb2N1bWVudCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdjcm9zc2hhaXInLFxyXG4gICAgICAgICAgICAgICAgaGVscGVyOiAnY2xvbmUnLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC41LFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICg8YW55PiQoJyN2aWV3Q2FudmFzJykpLmRyb3BwYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBvdmVyOiAoZXZlbnQsIHVpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZ3VyZUlEID0gJCh1aS5kcmFnZ2FibGUpLmF0dHIoJ2RhdGEtZmlndXJlLWlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3Rvci5EYXRhWydyb3RhdGUnXSA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoMCwgdGhpcy5jYW1lcmFDb250cm9sbGVyLllhdywgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlci5wdXNoVG9vbChuZXcgbW9kZWxzdGFnZS5QbGFjZUFjdG9yVG9vbChmaWd1cmVJRCwgdGhpcy5zdGFnZS5DYW1lcmEsIHRoaXMuY29ubmVjdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemUoKSB7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==