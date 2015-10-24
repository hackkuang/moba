class Player extends egret.DisplayObjectContainer {
    private hpBar:eui.ProgressBar;
    private nameText:egret.TextField;
    private tank:egret.Bitmap = new egret.Bitmap();
    
    private centerPositon: any = {};
    
    public constructor() {
        super();

        this.initNameText();
        this.initHPBar();
        
        this.initTank();
        
        this.setPosition(this.tank.x, this.tank.y);
    }
    
    private initTank():void {
        this.tank.texture = RES.getRes("tank5");
        this.tank.fillMode = egret.BitmapFillMode.SCALE;
        this.tank.width = 100;
        this.tank.height = 100;
        this.addChild(this.tank);
        this.tank.touchEnabled = true;
        this.tank.addEventListener(egret.TouchEvent.TOUCH_TAP, function(event) {
            MessageCenter.send({Service:MessageCenter.battle.getRoomService(), Type:"shoot", Data: this.nameText.text});
        }, this);
    }
    
    private initNameText():void {
        this.nameText = new egret.TextField();
        this.nameText.textColor = 0x00ff00;
        this.nameText.text = "";
        this.nameText.size = 20;
        this.addChild(this.nameText);
    }
    
    private initHPBar():void {
        var exml =
            `<s:ProgressBar xmlns:s="http://ns.egret.com/eui">
                <s:Skin>
                    <s:Image id="thumb" width="100%" height="100%" source="resource/assets/thumb.png" scale9Grid="1,1,4,4"/>
                    <s:Label id="labelDisplay" textColor="0xff0000" size="20" horizontalCenter="0" verticalCenter="0" percentHeight="100%" percentWidth="100%"/>
                </s:Skin>
            </s:ProgressBar>`;
        var clazz = EXML.parse(exml);
        this.hpBar = new clazz();
        this.hpBar.maximum = 99;
        this.hpBar.minimum = 0;
        this.hpBar.width = 100;
        this.hpBar.height = 20;
        this.addChild(this.hpBar);
        this.hpBar.value = 0;
    }
    
    private setPosition(x:number, y:number):void {
        this.centerPositon.x = x;
        this.centerPositon.y = y;
        this.tank.x = x - 50;
        this.tank.y = y - 50;
        this.nameText.x = this.tank.x;
        this.nameText.y = this.tank.y - 50;
        this.hpBar.x = this.tank.x;
        this.hpBar.y = this.tank.y - 25;
    }
    
    public getPosition():any {
        return {x: this.centerPositon.x, y: this.centerPositon.y};
    }
    
    public update(item:any):void {
        this.nameText.text = item.name;
        if(item.name == Battle.myName) {
            // 高亮自己的名字
            this.nameText.textColor = 0xff0000;
        } else {
            this.nameText.textColor = 0x00ff00;
        }
        
        this.hpBar.value = item.hp;
    }
}
