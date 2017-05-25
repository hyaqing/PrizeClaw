/*
* name;
*/
class BackPrize extends Laya.Box{

    private car:Laya.Image;
    private carFront:Laya.Image;
    private reward:Laya.Image;
    private chick:Laya.Image;
    private leftWheel:Laya.Image;
    private rightWheel:Laya.Image;
    private carMask:Laya.Sprite;

    constructor(){
        super();

        this.car= new Laya.Image("game/car.png");
        this.carFront= new Laya.Image("game/car.png");
        this.chick = new Laya.Image("game/chick.png");
        this.chick.anchorX = 0.5;
        this.chick.anchorY = 1;
        this.chick.x = this.car.width/2;
        this.chick.y = 21.5;
        this.carMask=new Laya.Sprite();
        this.carMask.graphics.drawRect(0,0,this.car.width,this.car.height,"#ffffff");
        this.carMask.y = 20;
        this.carFront.mask = this.carMask;
        this.reward = new Laya.Image("game/gift1.png");
        this.reward.x = this.car.width/2-this.reward.width/2;
        this.reward.y = this.car.y+47;
        this.leftWheel = new Laya.Image("game/wheel.png");
        this.leftWheel.anchorX = this.leftWheel.anchorY = 0.5;
        this.leftWheel.x = 35;
        this.leftWheel.y = this.car.height+7;
        this.rightWheel = new Laya.Image("game/wheel.png");
        this.rightWheel.anchorX = this.rightWheel.anchorY = 0.5;
        this.rightWheel.x = this.car.width-33;
        this.rightWheel.y = this.car.height+7;
        this.addChild(this.car);
        this.addChild(this.chick);
        this.addChild(this.carFront);
        this.addChild(this.reward);
        this.addChild(this.leftWheel);
        this.addChild(this.rightWheel);


        this.tween1();
    }
    private tween1(){
        Laya.Tween.to(this.leftWheel,{rotation:-360},2500,null,Laya.Handler.create(this,()=>{
            this.leftWheel.rotation = 0;
            this.rightWheel.rotation = 0;
            this.tween1();
        }));
        Laya.Tween.to(this.rightWheel,{rotation:-360},2500);
    }
}