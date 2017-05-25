/*
* name;
*/
class LoadingScene extends ui.loadViewUI{
    private bg: Laya.Sprite;
    public loadingbar2:Laya.Image;
    constructor(){
        super();
        this.width = Data.stageW;
        this.height = Data.stageH;
        this.bg = new Laya.Sprite();
        this.bg.graphics.drawRect(0, 0, this.width, this.height, "#514aab");

        this.loadingbar2 = new Laya.Image("loading/loadingBar2.png");
        this.loading.mask = this.loadingbar2;
        this.loadingbar2.x = -this.loading.width;
        // this.chickrun.x = this.loading.x+80;
        this.loadingbg.y = this.height/2-this.loadingbg.height/2;
        this.loading.y = this.height/2-this.loading.height/2;
        this.word.y = this.loadingbg.y+60;
        this.chickrun.play();
        this.chickrun.y = this.loadingbg.y+10;

        this.addChildAt(this.bg,0);
    }
    public remove(){
        this.chickrun.stop();
        this.parent.removeChild(this);
    }
}