import { modelstage } from './modelstage';
export declare class MessageChannel {
    protected extractPart(message: string): {
        remainder: string;
        part: string;
    };
    processMessage(message: string): void;
}
export declare class SampleTheaterWebGL extends modelstage.TheaterWebGL {
    private peerAppState;
    private sceneAppState;
    private roomAppState;
    private notesAppState;
    private actorIndex;
    private interfaceController;
    private cameraController;
    private connection;
    private channels;
    constructor(canvasElementID: string);
    protected initialize(): void;
}
