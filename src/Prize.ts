/*
* name;
*/
class Prize extends Laya.Box{

    private prize:Laya.Box;
    private car:Laya.Image;
    private carFront:Laya.Image;
    private reward:Laya.Image;
    private rewardText:Laya.Label;
    private chick:Laya.Animation;
    private leftWheel:Laya.Image;
    private rightWheel:Laya.Image;
    private carMask:Laya.Sprite;
    private maska:Laya.Image;
    private crown:Laya.Image;
    public id:string;
    public prizeName:string;
    public stype:string;

    private isBack:boolean;

    constructor(isBack:boolean = false){
        super();

        this.isBack = isBack;

        this.prize = new Laya.Box();
        this.prize.width = 159;
        this.prize.height = 231;
        this.car= new Laya.Image("game/car.png");
        this.car.y = 50;
        this.carFront= new Laya.Image("game/car.png");
        this.carFront.y = 50;

        this.chick = new Laya.Animation();
        this.chick.loadAnimation("chick.ani");
        this.chick.x = this.car.width/2;
        this.chick.y = 120;

        this.crown = new Laya.Image("game/crown.png");
        this.crown.x=36;
        this.crown.y =0;
        
        this.carMask=new Laya.Sprite();
        this.carMask.graphics.drawRect(0,0,this.car.width,this.car.height,"#ffffff");
        this.carMask.y = 20;
        this.carFront.mask = this.carMask;
        this.reward = new Laya.Image("game/gift3.png");
        this.reward.x = this.car.width/2-this.reward.width/2;
        this.reward.y = this.car.y+47;

        this.rewardText = new Laya.Label();
        this.rewardText.text ="30金币";
        this.rewardText.align = "center";
        this.rewardText.color = "#ffffff";
        this.rewardText.fontSize = 20;
        this.rewardText.width = 100;
        this.rewardText.centerX = 0;
        this.rewardText.y = this.reward.y+68;
        this.rewardText.text = "100金币";

        this.leftWheel = new Laya.Image("game/wheel.png");
        this.leftWheel.anchorX = this.leftWheel.anchorY = 0.5;
        this.leftWheel.x = 35;
        this.leftWheel.y = this.car.height+57;
        this.rightWheel = new Laya.Image("game/wheel.png");
        this.rightWheel.anchorX = this.rightWheel.anchorY = 0.5;
        this.rightWheel.x = this.car.width-33;
        this.rightWheel.y = this.car.height+57;

        this.addChild(this.prize);
        this.prize.addChild(this.car);
        this.prize.addChild(this.crown);
        this.prize.addChild(this.chick);
        this.prize.addChild(this.carFront);
        this.prize.addChild(this.reward);
        this.prize.addChild(this.rewardText);
        this.prize.addChild(this.leftWheel);
        this.prize.addChild(this.rightWheel);
        this.tween1();
        this.crown.visible =false;
        if(this.isBack)
            this.createBackPrize();
        else
            this.createPrize();

        this.rewardText.visible = false;
        // Laya.Tween.to(this,{scaleX:0,scaleY:0},500,null,null,500);

    }
    public start(){
        Laya.Tween.to(this.chick,{y:55},600,Laya.Ease.backOut);
        Laya.timer.once(600,this.chick,()=>{
            this.chick.play();
        });
    }
    private createPrize(){

    }
    private createBackPrize(){
        
        this.maska = new Laya.Image("game/car_mask.png");
        this.maska.width = 159;
        this.maska.height = 229;
        this.maska.y=2;

        this.prize.addChild(this.maska);
        this.prize.scaleX = this.prize.scaleY = 0.5;
        // this.maska = new Laya.Sprite();
        // this.maska.graphics.drawRect(0,0,this.prize.width*0.5,this.prize.height*0.5,"#fec87f");
        // this.addChild(this.maska);
        // Laya.timer.once(50,this,this.setMask);
        // this.maska.mask = this.prize;
        // this.maska.alpha=0.65;
        // this.prize.scaleX = this.prize.scaleY = 0.5;
        
    }

    public stopWheel(){
        Laya.Tween.clearTween(this.leftWheel);
        Laya.Tween.clearTween(this.rightWheel);
    }
    public startWheel(){
        this.leftWheel.rotation = 0;
        this.leftWheel.rotation = 0;
        this.tween1();
    }
    private tween1(){
        Laya.Tween.to(this.leftWheel,{rotation:this.isBack?-360:360},2500,null,Laya.Handler.create(this,()=>{
            this.leftWheel.rotation = 0;
            this.rightWheel.rotation = 0;
            this.tween1();
        }));
        Laya.Tween.to(this.rightWheel,{rotation:this.isBack?-360:360},2500);
    }
    public set carImage(name:string){
        this.car.skin = "game/"+name+".png";
        this.carFront.skin = "game/"+name+".png";
    }
    public showCrown(name:string){
        
        if(name=="advance"){
            this.crown.visible = true;
            if(this.maska)
                this.maska.skin = "game/car_mask2.png";
        } 
        else{
            this.crown.visible = false;
            if(this.maska)
                this.maska.skin = "game/car_mask.png";
        }
    }

    public showText(content:string){
        this.rewardText.text = content;
        this.rewardText.visible = true;
    }

    public hideText(){
        this.rewardText.visible = false;
    }

    public changePrize(picUrl:string){
        this.reward.skin = picUrl;
    }

}