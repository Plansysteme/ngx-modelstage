/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { modelstage } from './modelstage';
import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-mousewheel';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzdGFnZS1zYW1wbGUtd2ViLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVsc3RhZ2UvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzdGFnZS1zYW1wbGUtd2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sbUJBQW1CLENBQUM7QUFFM0I7SUFBQTtJQW9CQSxDQUFDOzs7Ozs7SUFsQmEsb0NBQVc7Ozs7O0lBQXJCLFVBQXNCLE9BQWU7O1lBQzdCLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQy9CLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDeEMsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILFNBQVMsRUFBRSxFQUFFO2dCQUNiLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7O0lBRU0sdUNBQWM7Ozs7SUFBckIsVUFBc0IsT0FBZTtJQUNyQyxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDOztBQUVEO0lBQXdDLDhDQUF1QjtJQW9CM0QsNEJBQVksZUFBdUI7UUFBbkMsWUFDSSxrQkFBTSxlQUFlLENBQUMsU0F3RHpCO1FBM0VPLGtCQUFZLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQywyQkFBMkIs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SUFoRkcsMENBQTBJOzs7OztJQUUxSSwyQ0FBOEk7Ozs7O0lBRTlJLDBDQUEySTs7Ozs7SUFFM0ksMkNBQThJOzs7OztJQUU5SSx3Q0FBdUI7Ozs7O0lBRXZCLGlEQUErRDs7Ozs7SUFFL0QsOENBQXlEOzs7OztJQUV6RCx3Q0FBbUQ7Ozs7O0lBRW5ELHNDQUEyRCIsInNvdXJjZXNDb250ZW50IjpbIi8vLyBNb2RlbFN0YWdlIMKpIDIwMTggUGxhbnN5c3RlbWUgR21iSCwgSGFtYnVyZywgR2VybWFueS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcbmltcG9ydCB7IG1vZGVsc3RhZ2UgfSBmcm9tICcuL21vZGVsc3RhZ2UnO1xyXG5pbXBvcnQgeyBtb2RlbHN0YWdld2ViIH0gZnJvbSAnLi9teC1jb21tb24nO1xyXG5pbXBvcnQgeyBtb2RlbHN0YWdlYXBwc3RhdGUgfSBmcm9tICcuL214LWFwcHN0YXRlJztcclxuaW1wb3J0ICdqcXVlcnktdWkvdWkvd2lkZ2V0cy9kcmFnZ2FibGUnO1xyXG5pbXBvcnQgJ2pxdWVyeS11aS91aS93aWRnZXRzL2Ryb3BwYWJsZSc7XHJcbmltcG9ydCAnanF1ZXJ5LW1vdXNld2hlZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDaGFubmVsIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZXh0cmFjdFBhcnQobWVzc2FnZTogc3RyaW5nKTogeyByZW1haW5kZXI6IHN0cmluZywgcGFydDogc3RyaW5nIH0ge1xyXG4gICAgICAgIGxldCBzZXAgPSBtZXNzYWdlLmluZGV4T2YoJ3wnKTtcclxuICAgICAgICBpZiAoc2VwID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBhcnQ6IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIHNlcCksXHJcbiAgICAgICAgICAgICAgICByZW1haW5kZXI6IG1lc3NhZ2Uuc3Vic3RyaW5nKHNlcCArIDEpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlbWFpbmRlcjogJycsXHJcbiAgICAgICAgICAgICAgICBwYXJ0OiBtZXNzYWdlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcm9jZXNzTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTYW1wbGVUaGVhdGVyV2ViR0wgZXh0ZW5kcyBtb2RlbHN0YWdlLlRoZWF0ZXJXZWJHTCB7XHJcblxyXG4gICAgcHJpdmF0ZSBwZWVyQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkxvY2FsQXBwU3RhdGVDbHVzdGVyTWFuYWdlcihtb2RlbHN0YWdlLlBlZXJBcHBTdGF0ZS5DbHVzdGVyVHlwZUlELCBtb2RlbHN0YWdlLlBlZXJBcHBTdGF0ZSk7XHJcblxyXG4gICAgcHJpdmF0ZSBzY2VuZUFwcFN0YXRlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5HbG9iYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyKG1vZGVsc3RhZ2UuU2NlbmVBcHBTdGF0ZS5DbHVzdGVyVHlwZUlELCBtb2RlbHN0YWdlLlNjZW5lQXBwU3RhdGUpO1xyXG5cclxuICAgIHByaXZhdGUgcm9vbUFwcFN0YXRlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5HbG9iYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyKG1vZGVsc3RhZ2UuUm9vbUFwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuUm9vbUFwcFN0YXRlKTtcclxuXHJcbiAgICBwcml2YXRlIG5vdGVzQXBwU3RhdGUgPSBuZXcgbW9kZWxzdGFnZWFwcHN0YXRlLkdsb2JhbEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXIobW9kZWxzdGFnZS5Ob3Rlc0FwcFN0YXRlLkNsdXN0ZXJUeXBlSUQsIG1vZGVsc3RhZ2UuTm90ZXNBcHBTdGF0ZSk7XHJcblxyXG4gICAgcHJpdmF0ZSBhY3RvckluZGV4ID0gMTtcclxuXHJcbiAgICBwcml2YXRlIGludGVyZmFjZUNvbnRyb2xsZXI6IG1vZGVsc3RhZ2V3ZWIuSW50ZXJmYWNlQ29udHJvbGxlcjtcclxuXHJcbiAgICBwcml2YXRlIGNhbWVyYUNvbnRyb2xsZXI6IG1vZGVsc3RhZ2V3ZWIuQ2FtZXJhQ29udHJvbGxlcjtcclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IG1vZGVsc3RhZ2V3ZWIuU2VydmVyQ29ubmVjdGlvbjtcclxuXHJcbiAgICBwcml2YXRlIGNoYW5uZWxzOiB7IFtpbmRleDogc3RyaW5nXTogTWVzc2FnZUNoYW5uZWwgfSA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhc0VsZW1lbnRJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoY2FudmFzRWxlbWVudElEKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IG1vZGVsc3RhZ2V3ZWIuU2lnbmFsUlNlcnZlckNvbm5lY3Rpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBtb2RlbHN0YWdlLkRlbW9TY2VuZVdlYkdMKHRoaXMuc3RhZ2UsIHRoaXMuY29ubmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5pbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbkNvbm5lY3RlZCgoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uTWVzc2FnZSgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IG1zZy5kYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZiA9IG1zZy5kYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSA/IG1zZy5kYXRhIDogbmV3IFVpbnQ4QXJyYXkobXNnLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ldHdvcmtNZXNzYWdlID0gbW9kZWxzdGFnZXdlYi5OZXR3b3JrQ2hhbm5lbE1lc3NhZ2UuRnJvbUJ1ZmZlcihidWYpO1xyXG4gICAgICAgICAgICAgICAgKDxtb2RlbHN0YWdlYXBwc3RhdGUuRGlyZWN0ZWRTY2VuZVdlYkdMPnRoaXMuc2NlbmUpLnJlY2VpdmVkTWVzc2FnZShuZXR3b3JrTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1zZy5kYXRhID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IDxzdHJpbmc+bXNnLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VwID0gZGF0YS5pbmRleE9mKCd8Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VwID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbEtleSA9IGRhdGEuc3Vic3RyaW5nKDAsIHNlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBkYXRhLnN1YnN0cihzZXAgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHNbY2hhbm5lbEtleV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5wcm9jZXNzTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlY2VpdmVkIGludmFsaWQgbWVzc2FnZSB0eXBlOiAnICsgdHlwZW9mIG1zZy5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIgPSBuZXcgbW9kZWxzdGFnZXdlYi5JbnRlcmZhY2VDb250cm9sbGVyKCk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFDb250cm9sbGVyID0gbmV3IG1vZGVsc3RhZ2V3ZWIuQ2FtZXJhQ29udHJvbGxlcih0aGlzLlN0YWdlLCB0aGlzLlN0YWdlLkNhbWVyYSwgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyLCB0aGlzLmNvbm5lY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhQ29udHJvbGxlci5jb25zdHJ1Y3QoMTIuMCwgLTAuNDUsIDAuMCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyLnB1c2hUb29sKG5ldyBtb2RlbHN0YWdlLlNlbGVjdGlvblRvb2wodGhpcy5zY2VuZSwgdGhpcy5zdGFnZSwgdGhpcy5jb25uZWN0aW9uKSk7XHJcblxyXG4gICAgICAgICQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLmNvbm5lY3QoKTtcclxuXHJcbiAgICAgICAgICAgICg8YW55PiQoJy5hcmVhLXJpZ2h0LXNpZGViYXIgdWwgbGknKSkuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5tZW50OiAnZG9jdW1lbnQnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAnY3Jvc3NoYWlyJyxcclxuICAgICAgICAgICAgICAgIGhlbHBlcjogJ2Nsb25lJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcclxuICAgICAgICAgICAgICAgIHNjcm9sbDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAoPGFueT4kKCcjdmlld0NhbnZhcycpKS5kcm9wcGFibGUoe1xyXG4gICAgICAgICAgICAgICAgb3ZlcjogKGV2ZW50LCB1aSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWd1cmVJRCA9ICQodWkuZHJhZ2dhYmxlKS5hdHRyKCdkYXRhLWZpZ3VyZS1pZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWN0b3IuRGF0YVsncm90YXRlJ10gPSBuZXcgcHNnZW9tZXRyeS5WZWM0KDAsIHRoaXMuY2FtZXJhQ29udHJvbGxlci5ZYXcsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVyZmFjZUNvbnRyb2xsZXIucHVzaFRvb2wobmV3IG1vZGVsc3RhZ2UuUGxhY2VBY3RvclRvb2woZmlndXJlSUQsIHRoaXMuc3RhZ2UuQ2FtZXJhLCB0aGlzLmNvbm5lY3Rpb24pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCkge1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=