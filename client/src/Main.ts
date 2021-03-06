class Main extends egret.DisplayObjectContainer {
    private battle:Battle;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("tank");
        RES.loadGroup("room");
        
        this.createGameScene();        
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        
        this.battle = new Battle();
        this.stage.addChild(this.battle);
    }
    
    private createGameScene():void {
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        
        var topMask:egret.Shape = new egret.Shape();
        topMask.graphics.beginFill(0x225a1f, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, stageH);
        topMask.graphics.endFill();
        topMask.width = stageW;
        topMask.height = stageH;
        this.addChild(topMask);
    }
}


