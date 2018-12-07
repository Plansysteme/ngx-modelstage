/// ModelStage © 2018 Plansysteme GmbH, Hamburg, Germany. All rights reserved.

import { modelstage } from './modelstage';
import { modelstageweb } from './mx-common';
import { modelstageappstate } from './mx-appstate';
import { psgeometry } from './ps-geometry';
import { $ } from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-mousewheel';

export class MessageChannel {

    protected extractPart(message: string): { remainder: string, part: string } {
        let sep = message.indexOf('|');
        if (sep >= 0) {
            return {
                part: message.substring(0, sep),
                remainder: message.substring(sep + 1)
            };
        } else {
            return {
                remainder: '',
                part: message
            };
        }
    }

    public processMessage(message: string) {
    }

}

export class SampleTheaterWebGL extends modelstage.TheaterWebGL {

    private peerAppState = new modelstageappstate.LocalAppStateClusterManager(modelstage.PeerAppState.ClusterTypeID, modelstage.PeerAppState);

    private sceneAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.SceneAppState.ClusterTypeID, modelstage.SceneAppState);

    private roomAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.RoomAppState.ClusterTypeID, modelstage.RoomAppState);

    private notesAppState = new modelstageappstate.GlobalAppStateClusterManager(modelstage.NotesAppState.ClusterTypeID, modelstage.NotesAppState);

    private actorIndex = 1;

    private interfaceController: modelstageweb.InterfaceController;

    private cameraController: modelstageweb.CameraController;

    private connection: modelstageweb.ServerConnection;

    private channels: { [index: string]: MessageChannel } = {};

    constructor(canvasElementID: string) {
        super(canvasElementID);

        this.connection = new modelstageweb.SignalRServerConnection();

        this.scene = new modelstage.DemoSceneWebGL(this.stage, this.connection);
        this.scene.initialize();

        this.connection.onConnected(() => {
        });
        this.connection.onMessage((msg) => {
            if (msg.data instanceof ArrayBuffer || msg.data instanceof Uint8Array) {
                let buf = msg.data instanceof Uint8Array ? msg.data : new Uint8Array(msg.data);
                let networkMessage = modelstageweb.NetworkChannelMessage.FromBuffer(buf);
                (<modelstageappstate.DirectedSceneWebGL>this.scene).receivedMessage(networkMessage);
            } else if (typeof msg.data == 'string') {
                let data = <string>msg.data;
                let sep = data.indexOf('|');
                if (sep >= 0) {
                    let channelKey = data.substring(0, sep);
                    let message = data.substr(sep + 1);
                    let channel = this.channels[channelKey];
                    if (channel) {
                        channel.processMessage(message);
                    }
                }
            } else {
                console.warn('Received invalid message type: ' + typeof msg.data);
            }
        });

        this.interfaceController = new modelstageweb.InterfaceController();
        this.cameraController = new modelstageweb.CameraController(this.Stage, this.Stage.Camera, this.interfaceController, this.connection);
        this.cameraController.construct(12.0, -0.45, 0.0);
        this.interfaceController.pushTool(new modelstage.SelectionTool(this.scene, this.stage, this.connection));

        $(() => { 
            this.connection.connect();

            (<any>$('.area-right-sidebar ul li')).draggable({
                containment: 'document',
                cursor: 'crosshair',
                helper: 'clone',
                opacity: 0.5,
                scroll: false
            });

            (<any>$('#viewCanvas')).droppable({
             /*   over: (event, ui) => {
                    let figureID = $(ui.draggable).attr('data-figure-id');
                    //actor.Data['rotate'] = new psgeometry.Vec4(0, this.cameraController.Yaw, 0);

                    this.interfaceController.pushTool(new modelstage.PlaceActorTool(figureID, this.stage.Camera, this.connection));
                }*/
            });

        });
    }

    protected initialize() {
    }

}
