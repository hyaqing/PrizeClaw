// 程序入口
class GameMain{
    private loadingScene:LoadingScene;
    private gameScene:GameScene;
    constructor()
    {
        Laya.init(640, 1136);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Data.sca = Laya.Browser.height/Laya.Browser.width;
        Data.stageW =Laya.stage.width;
        Data.stageH =Data.stageW*Data.sca;
        // Laya.Stat.show();
        Data.token = Laya.Browser.window['getParameter']("token");
        var preResArray =[
            {url:"res/atlas/loading.json",type : Laya.Loader.ATLAS},
        ];
        Laya.loader.load(preResArray,Laya.Handler.create(this,this.loadRes));
    }
    private createLoading(){
        this.loadingScene = new LoadingScene();
        Laya.stage.addChild(this.loadingScene);
    }
    private loadRes(){
        this.createLoading();
        var resArray=[
            {url:"res/atlas/game.json",type:Laya.Loader.ATLAS},
            {url:"game/bg.png",type:Laya.Loader.IMAGE},
            {url:"game/floor2.png",type:Laya.Loader.IMAGE},
            {url:"game/frontFloor.png",type:Laya.Loader.IMAGE},
            {url:"game/line.png",type:Laya.Loader.IMAGE},
            {url:"game/line2.png",type:Laya.Loader.IMAGE},
            {url:"game/listBg.png",type:Laya.Loader.IMAGE},
            {url:"game/listdark.png",type:Laya.Loader.IMAGE},
            {url:"game/listlight.png",type:Laya.Loader.IMAGE},
            {url:"game/mountain.png",type:Laya.Loader.IMAGE},
            {url:"game/outBg.png",type:Laya.Loader.IMAGE},
            {url:"game/ruleBg.png",type:Laya.Loader.IMAGE},
            {url:"game/track.png",type:Laya.Loader.IMAGE},
            {url:"game/track1_2.png",type:Laya.Loader.IMAGE},
            {url:"game/track1.png",type:Laya.Loader.IMAGE},
            {url:"game/track2_2.png",type:Laya.Loader.IMAGE},
            {url:"game/track2.png",type:Laya.Loader.IMAGE},
            // {url:"res/atlas/character.json",type:Laya.Loader.ATLAS},
            // {url:"res/atlas/comp.json",type:Laya.Loader.ATLAS},
        ];
        Laya.loader.load(resArray,Laya.Handler.create(this,this.onLoadComplete),Laya.Handler.create(this,this.onProgress,null,false));

    }
    private onLoadComplete(){
        this.loadingScene.remove();
        this.gameScene = GameScene.getInstance();
        Laya.stage.addChild(this.gameScene);

    }
    private onProgress(value:number){
        this.loadingScene.word.text = Math.round(value*100)+"%";
        this.loadingScene.loadingbar2.x = -this.loadingScene.loading.width+value*this.loadingScene.loading.width;
        this.loadingScene.chickrun.x=this.loadingScene.loading.x+value*this.loadingScene.loading.width;
        console.log("加载了总文件的:"+Math.round(value*100)+"%");
    }
}
new GameMain();