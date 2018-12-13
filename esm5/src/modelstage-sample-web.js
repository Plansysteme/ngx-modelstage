/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { modelstage } from './modelstage';
import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
import 'jquery-ui';
//import 'jquery-ui/ui/widgets/droppable';
import 'jquery.mousewheel';
var MessageChannel = /** @class */ (function () {
    function MessageChannel() {
    }
    /**
     * @protected
     * @param {?} message
     * @return {?}
     */
    MessageChannel.prototype.extractPart = /**
     * @protected
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var sep = message.indexOf('|');
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
    };
    /**
     * @param {?} message
     * @return {?}
     */
    MessageChannel.prototype.processMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
    };
    return MessageChannel;
}());
export { MessageChannel };
var SampleTheaterWebGL = /** @class */ (function (_super) {
    tslib_1.__extends(SampleTheaterWebGL, _super);
    function SampleTheaterWebGL(canvasElementID) {
        var _this = _super.call(this, canvasElementID) || this;
        _this.peerAppState = new modelstageappstate.LocalAppStateClusterManager(modelstage.PeerAppState.ClusterTypeID, modelstage.PeerAppState);
        _this.sceneAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.SceneAppState.ClusterTypeID, modelstage.SceneAppState);
        _this.roomAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.RoomAppState.ClusterTypeID, modelstage.RoomAppState);
        _this.notesAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.NotesAppState.ClusterTypeID, modelstage.NotesAppState);
        _this.actorIndex = 1;
        _this.channels = {};
        _this.connection = new modelstageweb.SignalRServerConnection();
        _this.scene = new modelstage.DemoSceneWebGL(_this.stage, _this.connection);
        _this.scene.initialize();
        _this.connection.onConnected(function () {
        });
        _this.connection.onMessage(function (msg) {
            if (msg.data instanceof ArrayBuffer || msg.data instanceof Uint8Array) {
                /** @type {?} */
                var buf = msg.data instanceof Uint8Array ? msg.data : new Uint8Array(msg.data);
                /** @type {?} */
                var networkMessage = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
                ((/** @type {?} */ (_this.scene))).receivedMessage(networkMessage);
            }
            else if (typeof msg.data == 'string') {
                /** @type {?} */
                var data = (/** @type {?} */ (msg.data));
                /** @type {?} */
                var sep = data.indexOf('|');
                if (sep >= 0) {
                    /** @type {?} */
                    var channelKey = data.substring(0, sep);
                    /** @type {?} */
                    var message = data.substr(sep + 1);
                    /** @type {?} */
                    var channel = _this.channels[channelKey];
                    if (channel) {
                        channel.processMessage(message);
                    }
                }
            }
            else {
                console.warn('Received invalid message type: ' + typeof msg.data);
            }
        });
        _this.interfaceController = new modelstageweb.InterfaceController();
        _this.cameraController = new modelstageweb.CameraController(_this.Stage, _this.Stage.Camera, _this.interfaceController, _this.connection);
        _this.cameraController.construct(12.0, -0.45, 0.0);
        _this.interfaceController.pushTool(new modelstage.SelectionTool(_this.scene, _this.stage, _this.connection));
        $(function () {
            _this.connection.connect();
            ((/** @type {?} */ ($('.area-right-sidebar ul li')))).draggable({
                containment: 'document',
                cursor: 'crosshair',
                helper: 'clone',
                opacity: 0.5,
                scroll: false
            });
            ((/** @type {?} */ ($('#viewCanvas')))).droppable({
                over: function (event, ui) {
                    /** @type {?} */
                    var figureID = $(ui.draggable).attr('data-figure-id');
                    //actor.Data['rotate'] = new psgeometry.Vec4(0, this.cameraController.Yaw, 0);
                    _this.interfaceController.pushTool(new modelstage.PlaceActorTool(figureID, _this.stage.Camera, _this.connection));
                }
            });
        });
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    SampleTheaterWebGL.prototype.initialize = /**
     * @protected
     * @return {?}
     */
    function () {
    };
    return SampleTheaterWebGL;
}(modelstage.TheaterWebGL));
export { SampleTheaterWebGL };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzdGFnZS1zYW1wbGUtd2ViLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVsc3RhZ2UvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzdGFnZS1zYW1wbGUtd2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxXQUFXLENBQUM7O0FBRW5CLE9BQU8sbUJBQW1CLENBQUM7QUFFM0I7SUFBQTtJQW9CQSxDQUFDOzs7Ozs7SUFsQmEsb0NBQVc7Ozs7O0lBQXJCLFVBQXNCLE9BQWU7O1lBQzdCLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQy9CLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDeEMsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILFNBQVMsRUFBRSxFQUFFO2dCQUNiLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7O0lBRU0sdUNBQWM7Ozs7SUFBckIsVUFBc0IsT0FBZTtJQUNyQyxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDOztBQUVEO0lBQXdDLDhDQUF1QjtJQW9CM0QsNEJBQVksZUFBdUI7UUFBbkMsWUFDSSxrQkFBTSxlQUFlLENBQUMsU0F3RHpCO1FBM0VPLGtCQUFZLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFD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Q0FBOEk7Ozs7O0lBRTlJLDBDQUEySTs7Ozs7SUFFM0ksMkNBQThJOzs7OztJQUU5SSx3Q0FBdUI7Ozs7O0lBRXZCLGlEQUErRDs7Ozs7SUFFL0QsOENBQXlEOzs7OztJQUV6RCx3Q0FBbUQ7Ozs7O0lBRW5ELHNDQUEyRCIsInNvdXJjZXNDb250ZW50IjpbIi8vLyBNb2RlbFN0YWdlIMKpIDIwMTggUGxhbnN5c3RlbWUgR21iSCwgSGFtYnVyZywgR2VybWFueS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcbmltcG9ydCB7IG1vZGVsc3RhZ2UgfSBmcm9tICcuL21vZGVsc3RhZ2UnO1xyXG5pbXBvcnQgeyBtb2RlbHN0YWdld2ViIH0gZnJvbSAnLi9teC1jb21tb24nO1xyXG5pbXBvcnQgeyBtb2RlbHN0YWdlYXBwc3RhdGUgfSBmcm9tICcuL214LWFwcHN0YXRlJztcclxuaW1wb3J0ICdqcXVlcnktdWknO1xyXG4vL2ltcG9ydCAnanF1ZXJ5LXVpL3VpL3dpZGdldHMvZHJvcHBhYmxlJztcclxuaW1wb3J0ICdqcXVlcnkubW91c2V3aGVlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNoYW5uZWwge1xyXG5cclxuICAgIHByb3RlY3RlZCBleHRyYWN0UGFydChtZXNzYWdlOiBzdHJpbmcpOiB7IHJlbWFpbmRlcjogc3RyaW5nLCBwYXJ0OiBzdHJpbmcgfSB7XHJcbiAgICAgICAgbGV0IHNlcCA9IG1lc3NhZ2UuaW5kZXhPZignfCcpO1xyXG4gICAgICAgIGlmIChzZXAgPj0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcGFydDogbWVzc2FnZS5zdWJzdHJpbmcoMCwgc2VwKSxcclxuICAgICAgICAgICAgICAgIHJlbWFpbmRlcjogbWVzc2FnZS5zdWJzdHJpbmcoc2VwICsgMSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVtYWluZGVyOiAnJyxcclxuICAgICAgICAgICAgICAgIHBhcnQ6IG1lc3NhZ2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb2Nlc3NNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNhbXBsZVRoZWF0ZXJXZWJHTCBleHRlbmRzIG1vZGVsc3RhZ2UuVGhlYXRlcldlYkdMIHtcclxuXHJcbiAgICBwcml2YXRlIHBlZXJBcHBTdGF0ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuTG9jYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyKG1vZGVsc3RhZ2UuUGVlckFwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuUGVlckFwcFN0YXRlKTtcclxuXHJcbiAgICBwcml2YXRlIHNjZW5lQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkdsb2JhbEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXIobW9kZWxzdGFnZS5TY2VuZUFwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuU2NlbmVBcHBTdGF0ZSk7XHJcblxyXG4gICAgcHJpdmF0ZSByb29tQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkdsb2JhbEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXIobW9kZWxzdGFnZS5Sb29tQXBwU3RhdGUuQ2x1c3RlclR5cGVJRCwgbW9kZWxzdGFnZS5Sb29tQXBwU3RhdGUpO1xyXG5cclxuICAgIHByaXZhdGUgbm90ZXNBcHBTdGF0ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuR2xvYmFsQXBwU3RhdGVDbHVzdGVyTWFuYWdlcihtb2RlbHN0YWdlLk5vdGVzQXBwU3RhdGUuQ2x1c3RlclR5cGVJRCwgbW9kZWxzdGFnZS5Ob3Rlc0FwcFN0YXRlKTtcclxuXHJcbiAgICBwcml2YXRlIGFjdG9ySW5kZXggPSAxO1xyXG5cclxuICAgIHByaXZhdGUgaW50ZXJmYWNlQ29udHJvbGxlcjogbW9kZWxzdGFnZXdlYi5JbnRlcmZhY2VDb250cm9sbGVyO1xyXG5cclxuICAgIHByaXZhdGUgY2FtZXJhQ29udHJvbGxlcjogbW9kZWxzdGFnZXdlYi5DYW1lcmFDb250cm9sbGVyO1xyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogbW9kZWxzdGFnZXdlYi5TZXJ2ZXJDb25uZWN0aW9uO1xyXG5cclxuICAgIHByaXZhdGUgY2hhbm5lbHM6IHsgW2luZGV4OiBzdHJpbmddOiBNZXNzYWdlQ2hhbm5lbCB9ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzRWxlbWVudElEOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihjYW52YXNFbGVtZW50SUQpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgbW9kZWxzdGFnZXdlYi5TaWduYWxSU2VydmVyQ29ubmVjdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IG1vZGVsc3RhZ2UuRGVtb1NjZW5lV2ViR0wodGhpcy5zdGFnZSwgdGhpcy5jb25uZWN0aW9uKTtcclxuICAgICAgICB0aGlzLnNjZW5lLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uQ29ubmVjdGVkKCgpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25NZXNzYWdlKChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5kYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgbXNnLmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmID0gbXNnLmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5ID8gbXNnLmRhdGEgOiBuZXcgVWludDhBcnJheShtc2cuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV0d29ya01lc3NhZ2UgPSBtb2RlbHN0YWdld2ViLk5ldHdvcmtDaGFubmVsTWVzc2FnZS5Gcm9tQnVmZmVyKGJ1Zik7XHJcbiAgICAgICAgICAgICAgICAoPG1vZGVsc3RhZ2VhcHBzdGF0ZS5EaXJlY3RlZFNjZW5lV2ViR0w+dGhpcy5zY2VuZSkucmVjZWl2ZWRNZXNzYWdlKG5ldHdvcmtNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbXNnLmRhdGEgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gPHN0cmluZz5tc2cuZGF0YTtcclxuICAgICAgICAgICAgICAgIGxldCBzZXAgPSBkYXRhLmluZGV4T2YoJ3wnKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXAgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsS2V5ID0gZGF0YS5zdWJzdHJpbmcoMCwgc2VwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGRhdGEuc3Vic3RyKHNlcCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tjaGFubmVsS2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLnByb2Nlc3NNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUmVjZWl2ZWQgaW52YWxpZCBtZXNzYWdlIHR5cGU6ICcgKyB0eXBlb2YgbXNnLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlciA9IG5ldyBtb2RlbHN0YWdld2ViLkludGVyZmFjZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICB0aGlzLmNhbWVyYUNvbnRyb2xsZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5DYW1lcmFDb250cm9sbGVyKHRoaXMuU3RhZ2UsIHRoaXMuU3RhZ2UuQ2FtZXJhLCB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIsIHRoaXMuY29ubmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFDb250cm9sbGVyLmNvbnN0cnVjdCgxMi4wLCAtMC40NSwgMC4wKTtcclxuICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucHVzaFRvb2wobmV3IG1vZGVsc3RhZ2UuU2VsZWN0aW9uVG9vbCh0aGlzLnNjZW5lLCB0aGlzLnN0YWdlLCB0aGlzLmNvbm5lY3Rpb24pKTtcclxuXHJcbiAgICAgICAgJCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY29ubmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgKDxhbnk+JCgnLmFyZWEtcmlnaHQtc2lkZWJhciB1bCBsaScpKS5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdkb2N1bWVudCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdjcm9zc2hhaXInLFxyXG4gICAgICAgICAgICAgICAgaGVscGVyOiAnY2xvbmUnLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC41LFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICg8YW55PiQoJyN2aWV3Q2FudmFzJykpLmRyb3BwYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBvdmVyOiAoZXZlbnQsIHVpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZ3VyZUlEID0gJCh1aS5kcmFnZ2FibGUpLmF0dHIoJ2RhdGEtZmlndXJlLWlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3Rvci5EYXRhWydyb3RhdGUnXSA9IG5ldyBwc2dlb21ldHJ5LlZlYzQoMCwgdGhpcy5jYW1lcmFDb250cm9sbGVyLllhdywgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlci5wdXNoVG9vbChuZXcgbW9kZWxzdGFnZS5QbGFjZUFjdG9yVG9vbChmaWd1cmVJRCwgdGhpcy5zdGFnZS5DYW1lcmEsIHRoaXMuY29ubmVjdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemUoKSB7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==