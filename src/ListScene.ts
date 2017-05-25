/*
* name;
*/
class ListScene extends ui.listViewUI{
    constructor(){
        super();
        var bg = new Laya.Sprite();
        bg.graphics.drawRect(0,0,this.width,this.height,"#000000");
        this.addChildAt(bg,0);
        bg.alpha=0.6;

        this.listInforGroup.vScrollBar.hide=true;
        this.listInforGroup.vScrollBar.elasticBackTime =200;
        // this.listInforGroup.vScrollBar.elasticDistance = 50;

        this.list.scaleX = this.list.scaleY = Data.stageH/1138;
        this.init();
    }
    public init(){            
        this.closeBtn.once(Laya.Event.MOUSE_DOWN,this,this.close);
        this.onSubmit();
        
    }
    private close(){
        console.log("close");
        Laya.Tween.to(this.closeBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
            Laya.Tween.to(this.closeBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
                this.listInforGroup.removeChildren();
                this.parent.removeChild(this);
            }), 100);
    }
    public onSubmit(){
        var url ="http://118.178.234.14:5500/interface/UfoCatcherUserHistory.php?";
        var requst:Laya.HttpRequest = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE,this,this.onComplete);
        requst.on(Laya.Event.ERROR,this,this.onError);
        requst.send(url+"token="+Data.token,null,"post", "json");
    }
    private onComplete(event){
        var data = event;
        if (data.Header.Result == "1") {
            for (var i = 0; i < data.Content.length; i++) {
                let listInfor = new ListInfor();
                listInfor.y = 90 * i;
                listInfor.setBgSkin((i % 2 == 0) ? "listLight" : "listDark");
                listInfor.prizeName.text = data.Content[i].name;
                listInfor.status.text = data.Content[i].status;
                listInfor.time.text = data.Content[i].time;
                listInfor.cost.text = "消耗"+data.Content[i].cost+"金币";
                this.listInforGroup.addChild(listInfor);
            }
        }
        else{
            GameScene.getInstance().showDialog(5,data.Header.Msg);
            // alert(data.Header.Msg);
        }
    }
    private onError(event: Laya.Event){
        GameScene.getInstance().showDialog(5,"网络错误");
        // alert(event);
    }
}