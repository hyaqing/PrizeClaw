/*
* name;
*/
class RuleScene extends ui.ruleViewUI{
    constructor(){
        super();
        var bg = new Laya.Sprite();
        bg.graphics.drawRect(0,0,this.width,this.height,"#000000");
        this.addChildAt(bg,0);
        bg.alpha=0.6;

        this.ruleInfor.vScrollBar.hide=true;
        this.ruleInfor.vScrollBar.elasticBackTime =200;
        this.ruleInfor.vScrollBar.elasticDistance = 50;
        this.rule.scaleX = this.rule.scaleY = Data.stageH/1138;
        this.closeBtn.once(Laya.Event.CLICK,this,this.close);
    }
    public init(){
        this.closeBtn.once(Laya.Event.CLICK,this,this.close);
    }
    private close(){
        Laya.Tween.to(this.closeBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
            Laya.Tween.to(this.closeBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
                this.parent.removeChild(this);
            }), 100);
    }
}