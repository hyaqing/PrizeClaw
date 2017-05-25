/*
* name;
*/
class DialogScene extends ui.dialogUI{
    private bg:Laya.Sprite;
    constructor(){
        super();
        this.width = Data.stageW;
        this.height = Data.stageH;
        this.bg = new Laya.Sprite();
        this.bg.graphics.drawRect(0,0,this.width,this.height,"#000000");
        this.addChildAt(this.bg,0);
        this.bg.alpha=0.6;
        this.bg.width = this.width;
        this.bg.height = this.height;


        this.badDialog.y = this.height*0.4;
        this.giftDialog.y = this.height*0.45;
        this.sureBtn.y = this.height*0.58;
        this.coinDialog.y = this.sureBtn.y-this.coinDialog.height/2-80;
        this.coingiftDialog.y = this.sureBtn.y-this.coingiftDialog.height/2-80;

        this.badDialog.visible =false;
        this.coinDialog.visible = false;
        this.coingiftDialog.visible = false;
        this.giftDialog.visible = false;
        this.sureBtn.visible = false;

    }
    public showContent(id,content,stype){
        switch (id){
            case 0:
                this.badDialog.visible = true;
                this.badWord.text = "没夹中，下次看准了再出手哦！";
                this.bg.once(Laya.Event.CLICK,this,this.delete);
                break;
            case 1:
                this.badDialog.visible = true;
                this.badWord.text = "再接再厉，感觉下次就要中了哦！";
                this.bg.once(Laya.Event.CLICK,this,this.delete);
                break;
            case 2:
                this.coinDialog.visible = true;
                this.coinText.text = content;
                this.sureBtn.visible = true;
                this.sureBtn.once(Laya.Event.CLICK,this,this.delete);
                break;
            case 3:
                this.coingiftDialog.visible = true;
                this.coingiftText.text = content;
                this.sureBtn.visible = true;
                this.sureBtn.once(Laya.Event.CLICK,this,this.delete);
                break;
            case 4:
                this.giftDialog.visible = true;
                this.giftName.text = content;
                this.goBtn.once(Laya.Event.CLICK,this,()=>{
                    this.goGift(stype);
                });
                this.continueBtn.once(Laya.Event.CLICK,this,this.delete);
                break;
            case 5:
                this.badDialog.visible = true;
                this.badWord.text = content;
                this.bg.once(Laya.Event.CLICK,this,this.delete);
                break;
        }
    }
    private goGift(stype){
        Laya.Browser.window['goGift'](stype);
    }
    public delete(){
        this.badDialog.visible =false;
        this.coinDialog.visible = false;
        this.coingiftDialog.visible = false;
        this.giftDialog.visible = false;
        this.sureBtn.visible = false;
        this.parent.removeChild(this);
        GameScene.getInstance().checkExtraReward();
        
    }
}