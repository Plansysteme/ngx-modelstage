/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.
import { modelstage } from './modelstage';
import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzdGFnZS1zYW1wbGUtd2ViLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVsc3RhZ2UvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzdGFnZS1zYW1wbGUtd2ViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQ7SUFBQTtJQW9CQSxDQUFDOzs7Ozs7SUFsQmEsb0NBQVc7Ozs7O0lBQXJCLFVBQXNCLE9BQWU7O1lBQzdCLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQy9CLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDeEMsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILFNBQVMsRUFBRSxFQUFFO2dCQUNiLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7O0lBRU0sdUNBQWM7Ozs7SUFBckIsVUFBc0IsT0FBZTtJQUNyQyxDQUFDO0lBRUwscUJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDOztBQUVEO0lBQXdDLDhDQUF1QjtJQW9CM0QsNEJBQVksZUFBdUI7UUFBbkMsWUFDSSxrQkFBTSxlQUFlLENBQUMsU0F3RHpCO1FBM0VPLGtCQUFZLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEksbUJB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QUU5SSx3Q0FBdUI7Ozs7O0lBRXZCLGlEQUErRDs7Ozs7SUFFL0QsOENBQXlEOzs7OztJQUV6RCx3Q0FBbUQ7Ozs7O0lBRW5ELHNDQUEyRCIsInNvdXJjZXNDb250ZW50IjpbIi8vLyBNb2RlbFN0YWdlIMKpIDIwMTggUGxhbnN5c3RlbWUgR21iSCwgSGFtYnVyZywgR2VybWFueS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcbmltcG9ydCB7IG1vZGVsc3RhZ2UgfSBmcm9tICcuL21vZGVsc3RhZ2UnO1xyXG5pbXBvcnQgeyBtb2RlbHN0YWdld2ViIH0gZnJvbSAnLi9teC1jb21tb24nO1xyXG5pbXBvcnQgeyBtb2RlbHN0YWdlYXBwc3RhdGUgfSBmcm9tICcuL214LWFwcHN0YXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ2hhbm5lbCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4dHJhY3RQYXJ0KG1lc3NhZ2U6IHN0cmluZyk6IHsgcmVtYWluZGVyOiBzdHJpbmcsIHBhcnQ6IHN0cmluZyB9IHtcclxuICAgICAgICBsZXQgc2VwID0gbWVzc2FnZS5pbmRleE9mKCd8Jyk7XHJcbiAgICAgICAgaWYgKHNlcCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0OiBtZXNzYWdlLnN1YnN0cmluZygwLCBzZXApLFxyXG4gICAgICAgICAgICAgICAgcmVtYWluZGVyOiBtZXNzYWdlLnN1YnN0cmluZyhzZXAgKyAxKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZW1haW5kZXI6ICcnLFxyXG4gICAgICAgICAgICAgICAgcGFydDogbWVzc2FnZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJvY2Vzc01lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2FtcGxlVGhlYXRlcldlYkdMIGV4dGVuZHMgbW9kZWxzdGFnZS5UaGVhdGVyV2ViR0wge1xyXG5cclxuICAgIHByaXZhdGUgcGVlckFwcFN0YXRlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5Mb2NhbEFwcFN0YXRlQ2x1c3Rlck1hbmFnZXIobW9kZWxzdGFnZS5QZWVyQXBwU3RhdGUuQ2x1c3RlclR5cGVJRCwgbW9kZWxzdGFnZS5QZWVyQXBwU3RhdGUpO1xyXG5cclxuICAgIHByaXZhdGUgc2NlbmVBcHBTdGF0ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuR2xvYmFsQXBwU3RhdGVDbHVzdGVyTWFuYWdlcihtb2RlbHN0YWdlLlNjZW5lQXBwU3RhdGUuQ2x1c3RlclR5cGVJRCwgbW9kZWxzdGFnZS5TY2VuZUFwcFN0YXRlKTtcclxuXHJcbiAgICBwcml2YXRlIHJvb21BcHBTdGF0ZSA9IG5ldyBtb2RlbHN0YWdlYXBwc3RhdGUuR2xvYmFsQXBwU3RhdGVDbHVzdGVyTWFuYWdlcihtb2RlbHN0YWdlLlJvb21BcHBTdGF0ZS5DbHVzdGVyVHlwZUlELCBtb2RlbHN0YWdlLlJvb21BcHBTdGF0ZSk7XHJcblxyXG4gICAgcHJpdmF0ZSBub3Rlc0FwcFN0YXRlID0gbmV3IG1vZGVsc3RhZ2VhcHBzdGF0ZS5HbG9iYWxBcHBTdGF0ZUNsdXN0ZXJNYW5hZ2VyKG1vZGVsc3RhZ2UuTm90ZXNBcHBTdGF0ZS5DbHVzdGVyVHlwZUlELCBtb2RlbHN0YWdlLk5vdGVzQXBwU3RhdGUpO1xyXG5cclxuICAgIHByaXZhdGUgYWN0b3JJbmRleCA9IDE7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcmZhY2VDb250cm9sbGVyOiBtb2RlbHN0YWdld2ViLkludGVyZmFjZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBjYW1lcmFDb250cm9sbGVyOiBtb2RlbHN0YWdld2ViLkNhbWVyYUNvbnRyb2xsZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0aW9uOiBtb2RlbHN0YWdld2ViLlNlcnZlckNvbm5lY3Rpb247XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFubmVsczogeyBbaW5kZXg6IHN0cmluZ106IE1lc3NhZ2VDaGFubmVsIH0gPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXNFbGVtZW50SUQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGNhbnZhc0VsZW1lbnRJRCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG5ldyBtb2RlbHN0YWdld2ViLlNpZ25hbFJTZXJ2ZXJDb25uZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgbW9kZWxzdGFnZS5EZW1vU2NlbmVXZWJHTCh0aGlzLnN0YWdlLCB0aGlzLmNvbm5lY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25Db25uZWN0ZWQoKCkgPT4ge1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbk1lc3NhZ2UoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLmRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBtc2cuZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWYgPSBtc2cuZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgPyBtc2cuZGF0YSA6IG5ldyBVaW50OEFycmF5KG1zZy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXR3b3JrTWVzc2FnZSA9IG1vZGVsc3RhZ2V3ZWIuTmV0d29ya0NoYW5uZWxNZXNzYWdlLkZyb21CdWZmZXIoYnVmKTtcclxuICAgICAgICAgICAgICAgICg8bW9kZWxzdGFnZWFwcHN0YXRlLkRpcmVjdGVkU2NlbmVXZWJHTD50aGlzLnNjZW5lKS5yZWNlaXZlZE1lc3NhZ2UobmV0d29ya01lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtc2cuZGF0YSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSA8c3RyaW5nPm1zZy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcCA9IGRhdGEuaW5kZXhPZignfCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlcCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxLZXkgPSBkYXRhLnN1YnN0cmluZygwLCBzZXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZGF0YS5zdWJzdHIoc2VwICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWwgPSB0aGlzLmNoYW5uZWxzW2NoYW5uZWxLZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwucHJvY2Vzc01lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdSZWNlaXZlZCBpbnZhbGlkIG1lc3NhZ2UgdHlwZTogJyArIHR5cGVvZiBtc2cuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyID0gbmV3IG1vZGVsc3RhZ2V3ZWIuSW50ZXJmYWNlQ29udHJvbGxlcigpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhQ29udHJvbGxlciA9IG5ldyBtb2RlbHN0YWdld2ViLkNhbWVyYUNvbnRyb2xsZXIodGhpcy5TdGFnZSwgdGhpcy5TdGFnZS5DYW1lcmEsIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlciwgdGhpcy5jb25uZWN0aW9uKTtcclxuICAgICAgICB0aGlzLmNhbWVyYUNvbnRyb2xsZXIuY29uc3RydWN0KDEyLjAsIC0wLjQ1LCAwLjApO1xyXG4gICAgICAgIHRoaXMuaW50ZXJmYWNlQ29udHJvbGxlci5wdXNoVG9vbChuZXcgbW9kZWxzdGFnZS5TZWxlY3Rpb25Ub29sKHRoaXMuc2NlbmUsIHRoaXMuc3RhZ2UsIHRoaXMuY29ubmVjdGlvbikpO1xyXG5cclxuICAgICAgICAkKCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5jb25uZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAoPGFueT4kKCcuYXJlYS1yaWdodC1zaWRlYmFyIHVsIGxpJykpLmRyYWdnYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBjb250YWlubWVudDogJ2RvY3VtZW50JyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogJ2Nyb3NzaGFpcicsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXI6ICdjbG9uZScsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGw6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgKDxhbnk+JCgnI3ZpZXdDYW52YXMnKSkuZHJvcHBhYmxlKHtcclxuICAgICAgICAgICAgICAgIG92ZXI6IChldmVudCwgdWkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlndXJlSUQgPSAkKHVpLmRyYWdnYWJsZSkuYXR0cignZGF0YS1maWd1cmUtaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2FjdG9yLkRhdGFbJ3JvdGF0ZSddID0gbmV3IHBzZ2VvbWV0cnkuVmVjNCgwLCB0aGlzLmNhbWVyYUNvbnRyb2xsZXIuWWF3LCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcmZhY2VDb250cm9sbGVyLnB1c2hUb29sKG5ldyBtb2RlbHN0YWdlLlBsYWNlQWN0b3JUb29sKGZpZ3VyZUlELCB0aGlzLnN0YWdlLkNhbWVyYSwgdGhpcy5jb25uZWN0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZSgpIHtcclxuICAgIH1cclxuXHJcbn1cclxuIl19