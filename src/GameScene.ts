/*
* name;
*/
class GameScene extends ui.gameViewUI {
    private static _instance: GameScene;
    private prizeContainer: Laya.Box;
    private backprizeContainer: Laya.Box;
    private moveGroup: Array<Prize>; //前面一排的移动奖品
    private backMoveGroup: Array<Prize>; //后面一排的移动奖品
    private speed: number;
    private prizeNum: number;
    private free:number;
    private energyBtnMask:Laya.Sprite;
    private listScene: ListScene;
    private ruleScene: RuleScene;
    private catchPrize :Prize;
    private isCatched :number;
    private isChecked :boolean;
    private rewardInformation :any;
    private rewardInforId :number;
    private prizeInformation :any;
    private prizeInforId :number;
    private backprizeInforId :number;
    private levelId:number;
    private lineSpeed:number;
    private energySpeed:number;
    private dis:number;
    private dropDis:number;
    private dialogScene: DialogScene;
    private tempReward:number;
    private soundOn:boolean;
    private catchNull:boolean;

    constructor() {
        super();
        this.width = Data.stageW;
        this.height = Data.stageH;
        this.init();

        this.speed = 1;
        this.prizeNum = 4;
        this.moveGroup = [];
        this.backMoveGroup = [];
        this.prizeContainer = new Laya.Box();
        this.backprizeContainer = new Laya.Box();
        this.energyBtnMask = new Laya.Sprite();
        this.energyBtnMask.graphics.drawRect(0,0,this.energyBtn_l.width,this.energyBtn_l.height,"#000000");
        this.energyBtn_l.mask = this.energyBtnMask;
        this.inContent.addChildAt(this.backprizeContainer,this.inContent.getChildIndex(this.track2)+1);
        this.inContent.addChildAt(this.prizeContainer,this.inContent.numChildren-2);
        this.prizeContainer.y = this.track.y - 63;
        this.backprizeContainer.y = this.track.y - 63-(this.track.y - this.track2.y) + 32;

        this.onSubmit4();
        // this.createPrizes();
        // this.createInfor();
        Laya.timer.loop(1, this, this.onPrizeMove);

        this.listBtn.on(Laya.Event.CLICK, this, this.onListBtn);
        this.ruleBtn.on(Laya.Event.CLICK, this, this.onRuleBtn);
        this.coinBtn.on(Laya.Event.CLICK, this, this.onCoinBtn);
        this.soundBtn.on(Laya.Event.CLICK, this, this.onSoundBtn)
        this.freeBtn.on(Laya.Event.CLICK, this, this.onFreeBtn);
        this.normalBtn.on(Laya.Event.CLICK, this, this.onNormalBtn);
        this.advanceBtn.on(Laya.Event.CLICK, this, this.onAdvanceBtn);
        this.startBtn.on(Laya.Event.CLICK, this, this.onStartBtn);
        Laya.SoundManager.playMusic("sounds/music.mp3",0);
    }
    private init() {
        this.star2.scaleX = this.star2.scaleY = 0;
        this.outBg.height = this.height + 40;
        this.coinPic.top = 80;
        this.listBtn.y = 107;
        this.ruleBtn.y = 107;
        this.soundBtn.y = 107;
        this.leftFire.y = this.height * 0.24;
        this.rightFire.y = this.height * 0.24;
        this.leftFire.play();
        this.rightFire.play();
        // this.logo.visible =false;
        this.clawLine.top = -660 + (1138 - Data.stageH);
        this.levelId = 1;
        this.tempReward = 0;
        this.soundOn = true;
        this.catchNull = false;
        this.energyBtn.visible = false;
        this.initResult();
        this.onSubmit();
        this.onSubmit3();
    }
    public static getInstance(): GameScene {
        if (GameScene._instance == null)
            GameScene._instance = new GameScene();

        return GameScene._instance;
    }
    private createPrizes() {
        for (var i = 0; i < this.prizeNum; i++) {
            let prize = new Prize(true);
            prize.anchorX = 0.5;
            prize.anchorY = 0.5;
            prize.x = Data.stageW * 0.3 + i * 230;
            let temp = this.prizeInformation[this.prizeInformation.length-this.prizeNum-1+i];
            if(temp.stype=="5"){
                prize.showText(temp.name);
            }
            else{
                prize.changePrize(temp.photo_url);
            }
            prize.id = temp.id;
            this.backprizeContainer.addChild(prize);
            prize.start();
            this.backMoveGroup.push(prize);
        }
        this.backprizeInforId = this.prizeInformation.length-1;
        
        for (var i = 0; i < this.prizeNum+1; i++) {
            let prize = new Prize();
            prize.anchorX = 0.5;
            prize.anchorY = 0.5;
            prize.x = Data.stageW - prize.width - i * 230;
            let temp = this.prizeInformation[i];
            if(temp.stype=="5"){
                prize.showText(temp.name);
            }
            else{
                prize.changePrize(temp.photo_url);
            }
            prize.id = temp.id;
            prize.name = temp.prizeName;
            prize.stype = temp.stype;
            this.prizeContainer.addChild(prize);
            Laya.timer.once(i*200,this,()=>{
                prize.start();
            })
            this.moveGroup.push(prize);
        }
        this.prizeInforId = this.prizeNum+1;
    }
    private changePrizes() {
        for (var i = 0; i < this.prizeNum; i++) {
            let prize = this.backMoveGroup[i];
            let temp = this.prizeInformation[this.prizeInformation.length-this.prizeNum-1+i];
            if(temp.stype=="5"){
                prize.changePrize("game/gift3.png");
                prize.showText(temp.name);
            }
            else{
                prize.changePrize(temp.photo_url);
            }
            prize.id = temp.id;
        }
        this.backprizeInforId = this.prizeInformation.length-1;
        for (var i = 0; i < this.prizeNum+1; i++) {
            let prize = this.moveGroup[i];
            let temp = this.prizeInformation[i];
            if(temp.stype=="5"){
                prize.changePrize("game/gift3.png");
                prize.showText(temp.name);
            }
            else{
                prize.changePrize(temp.photo_url);
                prize.hideText();
            }
            prize.id = temp.id;
            prize.prizeName = temp.name;
            prize.stype = temp.stype;
        }
        this.prizeInforId = this.prizeNum+1;

    }
    private createInfor(){
        var rewardInfor = new RewardInfor();
        rewardInfor.pic.skin = this.rewardInformation[0].user_photo_url;
        rewardInfor.word.text = this.rewardInformation[0].nickname+"运气爆棚，中了"+this.rewardInformation[0].name;
        this.rewardInforGroup.addChild(rewardInfor);
        var rewardInfor2 = new RewardInfor();
        rewardInfor2.y = rewardInfor.height;
        rewardInfor2.pic.skin = this.rewardInformation[1].user_photo_url;
        rewardInfor2.word.text = this.rewardInformation[1].nickname+"运气爆棚，中了"+this.rewardInformation[1].name;
        this.rewardInforGroup.addChild(rewardInfor2);
        this.rewardInforId = 2;
        Laya.timer.once(3000,this,this.changeRewardInfor);
    }
    private changeRewardInfor(){
        if(this.rewardInforId%2==0){
            var rewardInfor = this.rewardInforGroup.getChildAt(0) as RewardInfor;
            var rewardInfor2 = this.rewardInforGroup.getChildAt(1) as RewardInfor;
        }
        else{
            var rewardInfor = this.rewardInforGroup.getChildAt(1) as RewardInfor;
            var rewardInfor2 = this.rewardInforGroup.getChildAt(0) as RewardInfor;
        }
        
        Laya.Tween.to(rewardInfor,{y:-rewardInfor.height},500,null,Laya.Handler.create(this,()=>{
            rewardInfor.pic.skin = this.rewardInformation[this.rewardInforId].user_photo_url;
            rewardInfor.word.text = this.rewardInformation[this.rewardInforId].nickname+"运气爆棚，中了"+this.rewardInformation[this.rewardInforId].name;
            rewardInfor.y = rewardInfor.height;
            this.rewardInforId++;
            if(this.rewardInforId>(this.rewardInformation.length-1))
                this.rewardInforId=0;
            Laya.timer.once(3000,this,this.changeRewardInfor);
        }));
        Laya.Tween.to(rewardInfor2,{y:0},500,null);
    }
    private setTimes(num:number){
        if(num==0){

            this.setTimesAnima(this.reward1,"game/darkpic.png");
            this.setTimesAnima(this.reward2,"game/darkpic.png");
            this.setTimesAnima(this.reward3,"game/darkpic.png");
        }
        else if(num==1){

            this.setTimesAnima(this.reward1,"game/lightpic.png");
            this.setTimesAnima(this.reward2,"game/darkpic.png");
            this.setTimesAnima(this.reward3,"game/darkpic.png");
        }
        else if(num==2){

            this.setTimesAnima(this.reward1,"game/lightpic.png");
            this.setTimesAnima(this.reward2,"game/lightpic.png");
            this.setTimesAnima(this.reward3,"game/darkpic.png");
        }
        else if(num==3){
            this.setTimesAnima(this.reward1,"game/lightpic.png");
            this.setTimesAnima(this.reward2,"game/lightpic.png");
            this.setTimesAnima(this.reward3,"game/lightpic.png");
            // this.reward2.skin = "game/lightpic.png";
            Laya.Tween.to(this.star2,{scaleX:1,scaleY:1},300,null);
            Laya.Tween.to(this.star2,{x:this.freePic.x+30},600,Laya.Ease.quadOut,null,300);
            Laya.Tween.to(this.star2,{y:this.freePic.y+10,rotation:-3*360},600,null,null,300);
            Laya.Tween.to(this.star2,{scaleX:0,scaleY:0},200,null,Laya.Handler.create(this,()=>{
                this.star2.x = this.star.x;
                this.star2.y = this.star.y;
            }),900);
        }

        this.freeNum.text = "×"+this.free;
            
    }
    private setTimesAnima(target:any,skinName:string){
        Laya.Tween.to(target,{scaleX:0,scaleY:0},300,null,Laya.Handler.create(target,()=>{
            target.skin = skinName;
            Laya.Tween.to(target,{scaleX:1,scaleY:1},300,null);
        }));
    }
    private onPrizeMove() {
        for (var i = 0; i < this.moveGroup.length; i++) {
            this.moveGroup[i].x += this.speed;
            if (this.moveGroup[i].x > Data.stageW + this.moveGroup[i].width / 2)
                this.changePrize();
        }
        for (var i = 0; i < this.backMoveGroup.length; i++) {
            this.backMoveGroup[i].x -= this.speed;
            if (this.backMoveGroup[i].x < -this.backMoveGroup[i].width / 2)
                this.changeBackPrize();
        }
    }
    private changePrize() {
        this.moveGroup[0].x = this.moveGroup[this.moveGroup.length - 1].x - 230;
        var temp = this.prizeInformation[this.prizeInforId];
        this.moveGroup[0].id = temp.id;
        this.moveGroup[0].prizeName = temp.name;
        this.moveGroup[0].stype = temp.stype;
        if(temp.stype=="5"){
            this.moveGroup[0].changePrize("game/gift3.png");
            this.moveGroup[0].showText(temp.name);
        }
        else{
            this.moveGroup[0].changePrize(temp.photo_url);
            this.moveGroup[0].hideText();
        }
        this.moveGroup.push(this.moveGroup.shift());
        this.prizeInforId++;
        if(this.prizeInforId>(this.prizeInformation.length-1))
            this.prizeInforId = 0;
    }
    private changeBackPrize() {
        this.backMoveGroup[0].x = this.backMoveGroup[this.backMoveGroup.length - 1].x + 230;
        var temp = this.prizeInformation[this.backprizeInforId];
        this.backMoveGroup[0].id = temp.id;
        if(temp.stype=="5"){
            this.backMoveGroup[0].changePrize("game/gift3.png");
            this.backMoveGroup[0].showText(temp.name);
        }
        else{
            this.backMoveGroup[0].changePrize(temp.photo_url);
            this.backMoveGroup[0].hideText();
        }
        this.backMoveGroup.push(this.backMoveGroup.shift());
        this.backprizeInforId++;
        if(this.backprizeInforId>(this.prizeInformation.length-1))
            this.backprizeInforId = 0;
    }
    private onStartBtn() {
        this.startBtn.mouseEnabled = false;
        console.log("conClick")
        var cost:number;
        if(this.levelId==2)
            cost=parseInt(this.normalNum.text);
        else if(this.levelId==3)
            cost=parseInt(this.advanceNum.text);

        if(this.levelId==1){
            if(this.free==0){
            this.showDialog(5,"免费次数或金币不足");
            this.startBtn.mouseEnabled = true;
            return;
            }
        }
        else{
            if(parseInt(this.coinNum.text)<cost) {
            this.showDialog(5,"免费次数或金币不足");
            this.startBtn.mouseEnabled = true;
            return;
            }
        }

        Laya.Tween.to(this.startBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.startBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.clawLine, { top: -255 }, 700);
            Laya.Tween.to(this.clawLine, { top: -255 }, 700);
            Laya.Tween.to(this.claw, { scaleX:1.3,scaleY:1.3 }, 400,null,null,300);
            Laya.Tween.to(this.leftClaw, { rotation: 5 },700,null,Laya.Handler.create(this,this.checkPrize));
            Laya.Tween.to(this.leftClaw, { rotation: -5 }, 200,Laya.Ease.backIn,null,700);
            Laya.Tween.to(this.rightClaw, { rotation: -5 }, 700);
            Laya.Tween.to(this.rightClaw, { rotation: 5 }, 200,Laya.Ease.backIn,null,700);
        }), 100);
    }
    private onListBtn() {
        Laya.Tween.to(this.listBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.listBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
            if (this.listScene) {
                this.addChild(this.listScene);
                this.listScene.init();
            }
            else {
                this.listScene = new ListScene();
                this.addChild(this.listScene);
                this.listScene.centerX = 0;
                this.listScene.centerY = 0;
            }
        }), 100);

    }

    private onRuleBtn() {
        Laya.Tween.to(this.ruleBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.ruleBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
            if (this.ruleScene) {
                this.addChild(this.ruleScene);
                this.ruleScene.init();
            }
            else {
                this.ruleScene = new RuleScene();
                this.addChild(this.ruleScene);
                this.ruleScene.centerX = 0;
                this.ruleScene.centerY = 0;
            }
        }), 100);

    }
    private onCoinBtn() {
        Laya.Tween.to(this.coinBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.coinBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
            Laya.Browser.window['addCoin']();
        }), 100);

    }
    private onFreeBtn() {
        Laya.Tween.to(this.freeBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.freeBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
            this.changeLevel("free");
        }), 100);

    }
    private onNormalBtn() {
        Laya.Tween.to(this.normalBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.normalBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
            this.changeLevel("normal");
        }), 100);

    }
    private onAdvanceBtn() {
        Laya.Tween.to(this.advanceBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.advanceBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
            this.changeLevel("advance");
        }), 100);

    }
    private checkPrize(){
        var mDis:number=700;
        var n:number;
        for(let i = 0;i<this.moveGroup.length;i++){
            if(Math.abs(this.moveGroup[i].x-320)<mDis){
                mDis = Math.abs(this.moveGroup[i].x-320);
                n = i;
            }    
        }
        var setDis = 70;
        if(mDis<setDis){
            this.startBtn.visible = false;
            this.energyBtn.visible = true;
            this.energyBtnMask.x = -this.energyBtn_l.width;
            this.catchPrize = this.moveGroup[n];
            this.prizeContainer.removeChild(this.catchPrize);
            this.inContent.addChild(this.catchPrize);
            this.catchPrize.x =320;
            this.catchPrize.y = this.track.y - 63;
            this.catchPrize.stopWheel();
            this.moveGroup.splice(n,1);
            this.dis = this.clawLine.top-(-660 + (1138 - Data.stageH));
            var temp = RandomUtils.limit(0.6,1);
            this.dropDis = this.clawLine.top-this.dis*temp;
            this.onSubmit2();
            this.lineSpeed=1;
            this.energySpeed = this.lineSpeed*this.dis/this.energyBtn_l.width;
            this.energyBtn.on(Laya.Event.MOUSE_DOWN, this, this.onTouch);
            this.playSound("up",3);
            
            Laya.timer.once(200,this,()=>{
                Laya.timer.loop(1,this,this.startEnergy);
            })
            
            this.energyBtn.on(Laya.Event.MOUSE_UP, this, this.touchEnd);
        }
        else{
            this.catchNull=true;
            this.onSubmit2();
            this.showDialog(0);
            Laya.Tween.to(this.clawLine,{top:-660 + (1138 - Data.stageH)},1200,null,Laya.Handler.create(this,()=>{
                this.startBtn.mouseEnabled = true;
            }),300);
            Laya.Tween.to(this.leftClaw,{rotation:-20},400,null,null);
            Laya.Tween.to(this.rightClaw,{rotation:20},400,null,null);
            Laya.Tween.to(this.claw,{scaleX:1,scaleY:1},400,null,null,100);
        }
    }
    private onTouch(){
        this.lineSpeed = 4;
        this.energySpeed = this.lineSpeed*this.dis/this.energyBtn_l.width;
        // Laya.timer.loop(1,this,this.startEnergy);
    }
    private touchEnd(){
        this.lineSpeed = 1;
        this.energySpeed = this.lineSpeed*this.dis/this.energyBtn_l.width;
        // Laya.timer.clear(this,this.startEnergy);
    }
    private startEnergy(){
        this.energyBtnMask.x+=this.energySpeed;
        this.clawLine.top-=this.lineSpeed;
        this.catchPrize.y -= this.lineSpeed;
        if(this.energyBtnMask.x>=0){
            this.energyBtnMask.x = 0;
        }
        if(this.clawLine.top<=this.dropDis){
            if(!this.isChecked&&this.isCatched==0)
                this.playFail();
        }
        if(this.clawLine.top<=-660 + (1138 - Data.stageH)){
            this.endEnergy();
        }
    }
    private endEnergy(){
        this.energyBtn.offAll();
        Laya.timer.clear(this,this.startEnergy);
        Laya.SoundManager.stopSound("sounds/up.mp3");
        Laya.Tween.to(this.energyBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.energyBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
            this.energyBtnMask.x=0;
            this.clawLine.top=-660 + (1138 - Data.stageH);
            this.startBtn.visible = true;
            this.energyBtn.visible = false; 
        }), 100);
            // var dis = this.clawLine.top-(-660 + (1138 - Data.stageH));
            // Laya.Tween.to(this.clawLine,{top:-660 + (1138 - Data.stageH)},1200,null,null,300);
            // Laya.Tween.to(this.catchPrize,{y:this.track.y - 63-dis},1200,null,null,300);
            
            
        if(!this.isChecked&&this.isCatched==1)
            this.playSuccess();
            
    }
    private playSuccess() {
        console.log("success");
        this.isChecked = true;
        this.playSound("get",1);
        if(this.catchPrize.stype=="5")
            this.showDialog(3,this.catchPrize.prizeName,this.catchPrize.stype);
        else
            this.showDialog(4,this.catchPrize.prizeName);
        Laya.Tween.to(this.leftClaw,{rotation:-20},500,null,null,500);
        Laya.Tween.to(this.rightClaw,{rotation:20},500,null,null,500);
        Laya.Tween.to(this.claw, { scaleX:1,scaleY:1 }, 500,null,null,500);
        Laya.Tween.to(this.catchPrize, { scaleX: 0.2, scaleY: 0.2 }, 1000, Laya.Ease.backIn, null);
        Laya.Tween.to(this.catchPrize, { y: this.listBtn.y + (1138 - Data.stageH) }, 1000, Laya.Ease.backIn, Laya.Handler.create(this, () => {

        }), 1100);
        Laya.Tween.to(this.catchPrize, { x: this.listBtn.x }, 1000, Laya.Ease.backOut, Laya.Handler.create(this, () => {
            this.startBtn.mouseEnabled = true;
            this.backToGroup();
            this.initResult();
        }), 1100);
    }
    private playFail() {
        console.log("fail");
        this.isChecked = true;
        this.playSound("fail",1);
        this.showDialog(1);
        Laya.Tween.to(this.leftClaw,{rotation:-20},500,null,null,500);
        Laya.Tween.to(this.rightClaw,{rotation:20},500,null,null,500);
        Laya.Tween.to(this.claw, { scaleX:1,scaleY:1 }, 500,null,null,500);
        Laya.Tween.to(this.catchPrize, { y: this.track.y + 100 }, 1200, Laya.Ease.cubicIn, Laya.Handler.create(this, () => {
            this.startBtn.mouseEnabled = true;
            this.backToGroup();
            this.initResult();
        }));
        Laya.timer.once(300, this, () => {
            this.inContent.setChildIndex(this.catchPrize, this.inContent.getChildIndex(this.floor2));
        })
    }
    public checkExtraReward(){
        if(this.tempReward>0){
            this.showDialog(2,this.tempReward+"金币");
        }   
        this.tempReward =0;
    }
    private wrongMessage(){
        console.log("wrong");
        this.energyBtn.offAll();
        Laya.timer.clear(this,this.startEnergy);
        this.energyBtnMask.x=0;
        this.startBtn.visible=true;
        this.energyBtn.visible = false;
        Laya.Tween.clearAll(this.clawLine);
        this.clawLine.top=-660 + (1138 - Data.stageH);
        Laya.Tween.clearAll(this.leftClaw);
        this.leftClaw.rotation=-20;
        Laya.Tween.clearAll(this.rightClaw);
        this.rightClaw.rotation=20;
        Laya.Tween.clearAll(this.claw);
        this.claw.scaleX=this.claw.scaleY=1;
        this.backToGroup();
        this.initResult();
        this.startBtn.mouseEnabled = true;
    }
    private backToGroup(){
        Laya.Tween.clearAll(this.catchPrize);
        this.inContent.removeChild(this.catchPrize);
        this.prizeContainer.addChild(this.catchPrize);
        this.catchPrize.y = 0;
        this.catchPrize.x = this.moveGroup[this.moveGroup.length - 1].x - 230;
        this.catchPrize.scaleX = this.catchPrize.scaleY = 1;
        this.catchPrize.startWheel();
        this.moveGroup.push(this.catchPrize);
    }
    private changeLevel(levelName: string) {
        if (levelName == "free") {
            this.freeBtn.skin = "game/freeBtn.png";
            this.normalPic.skin = "game/300Btn_b.png";
            this.advancePic.skin = "game/800Btn_b.png";
            this.normalNum.color = "#959595";
            this.advanceNum.color = "#959595";
            this.logo.skin = "game/freelogo.png";
            this.track.skin = "game/track1.png";
            this.track2.skin = "game/track1_2.png";
            this.line.skin = "game/line.png";
            this.clawF.skin = "game/clawF.png"
            this.changeCar("car",levelName);
            this.levelId = 1;
        }
        else if (levelName == "normal") {
            this.freeBtn.skin = "game/freeBtn_b.png";
            this.normalPic.skin = "game/300Btn.png";
            this.advancePic.skin = "game/800Btn_b.png";
            this.normalNum.color = "#ffffff";
            this.advanceNum.color = "#959595";
            this.logo.skin = "game/logo2.png";
            this.track.skin = "game/track2.png";
            this.track2.skin = "game/track2_2.png";
            this.line.skin = "game/line2.png";
            this.clawF.skin = "game/clawF_2.png"
            this.changeCar("car2",levelName);
            this.levelId = 2;
        }
        else if (levelName == "advance") {
            this.freeBtn.skin = "game/freeBtn_b.png";
            this.normalPic.skin = "game/300Btn_b.png";
            this.advancePic.skin = "game/800Btn.png";
            this.normalNum.color = "#959595";
            this.advanceNum.color = "#ffffff";
            this.logo.skin = "game/logo3.png";
            this.track.skin = "game/track2.png";
            this.track2.skin = "game/track2_2.png";
            this.line.skin = "game/line2.png";
            this.clawF.skin = "game/clawF_2.png"
            this.changeCar("car3",levelName);
            this.levelId = 3;
        }

        this.onSubmit4();
    }
    private changeCar(carName: string,levelName:string) {
        for (var i = 0; i < this.backprizeContainer.numChildren; i++) {
            let prize = this.backprizeContainer.getChildAt(i) as Prize;
            prize.showCrown(levelName);
            prize.carImage = carName;
        }
        for (var i = 0; i < this.prizeContainer.numChildren; i++) {
            let prize = this.prizeContainer.getChildAt(i) as Prize;
            prize.showCrown(levelName);
            prize.carImage = carName;
        }
    }
    private initResult(){
        this.isChecked = false;
        this.isCatched = -1;
    }
    public showDialog(id:number,content?:string,stype?:string){
        if(this.dialogScene){
            this.addChild(this.dialogScene);
        }
        else{
            this.dialogScene = new DialogScene();
            this.addChild(this.dialogScene);
        }

        this.dialogScene.showContent(id,content,stype);
    }
    public onSubmit(){
        var url ="http://118.178.234.14:5500/interface/GetUserKmoney.php?";
        var requst:Laya.HttpRequest = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE,this,this.onComplete);
        requst.on(Laya.Event.ERROR,this,this.onError);
        requst.send(url,"token="+Data.token+"&game=ufo_catcher","post", "json");
    }
    private onComplete(event){
        var data = event;
        if(data.Header.Result=="1"){
            console.log(data);
            this.coinNum.text = data.Kmoney;
            this.normalNum.text = data.Zone_medium;
            this.advanceNum.text = data.Zone_advanced;
            this.free = parseInt(data.Tickets);
            if(data.Times=="0"){
                Laya.timer.once(800,this,()=>{
                    this.setTimes(parseInt(data.Times));
                })
            }
            else{
                this.setTimes(parseInt(data.Times));
            }
            if(this.coinNum.text.length<7)
                this.coinNum.fontSize = 30;
            else if(this.coinNum.text.length>8)
                this.coinNum.fontSize = 20;
            else
                this.coinNum.fontSize = 24;
        }
        else{
            this.showDialog(5,data.Header.Msg);
        }
    }
    private onError(event: Laya.Event){
        this.showDialog(5,"网络错误");
    }
    public onSubmit2(){
        var url ="http://118.178.234.14:5500/interface/UfoCatcherResult.php?";
        var requst:Laya.HttpRequest = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE,this,this.onComplete2);
        requst.on(Laya.Event.ERROR,this,this.onError2);
        requst.send(url,"token="+Data.token+"&zone="+this.levelId+"&gid="+(this.catchNull?-1:this.catchPrize.id),"post", "json");
    }
    private onComplete2(event){
        var data = event;
        console.log(data);
        if(!this.catchNull){
            if(data.Header.Result=="1"){
                this.isCatched = 1;
                if(this.clawLine.top<=-660 + (1138 - Data.stageH)&&!this.isChecked)
                    this.playSuccess();
            }
            else if(data.Header.Result=="0"){
                this.isCatched = 0;
                if(parseInt(data.Reward)>0){
                    this.tempReward = parseInt(data.Reward);
                }
                if(this.clawLine.top<=this.dropDis&&!this.isChecked)
                    this.playFail();
            }
            else{
                this.showDialog(5,data.Header.Msg);
                this.wrongMessage();
            }
        }
        else{
            this.catchNull=false;
        }

        if(data.Times=="3")
            this.setTimes(3);
        this.onSubmit();
    }

    private onError2(event: Laya.Event){
        this.showDialog(5,"网络错误");
        this.wrongMessage();
    }
    public onSubmit3(){
        var url ="http://118.178.234.14:5500/interface/UfoCatcherBroadcast.php";
        var requst:Laya.HttpRequest = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE,this,this.onComplete3);
        requst.on(Laya.Event.ERROR,this,this.onError3);
        requst.send(url,null,"post", "json");
    }
    private onComplete3(event){
        var data = event;
        if(data.Header.Result=="1"){
            this.rewardInformation =data.Content;
            this.createInfor();
            console.log(data); 
        }
        else{
            this.showDialog(5,data.Header.Msg);
        }
    }
    private onError3(event: Laya.Event){
        this.showDialog(5,"网络错误");
    }
    public onSubmit4(){
        var url ="http://118.178.234.14:5500/interface/UfoCatcherGoods.php?";
        var requst:Laya.HttpRequest = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE,this,this.onComplete4);
        requst.on(Laya.Event.ERROR,this,this.onError4);
        requst.send(url,"zone="+this.levelId,"post", "json");
    }
    private onComplete4(event){
        var data = event;
        if(data.Header.Result=="1"){
            this.prizeInformation =data.Content;
            console.log(data);
            if(this.moveGroup.length==0)
                this.createPrizes();
            else
                this.changePrizes();
        }
        else{
            this.showDialog(5,data.Header.Msg);
        }
    }
    private onError4(event: Laya.Event){
        this.showDialog(5,"网络错误");
    }

    private onSoundBtn(){
        Laya.Tween.to(this.soundBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.soundBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
            if(this.soundOn){
                this.soundOn = false;
                this.soundBtn.skin = "game/sound_off.png";
                Laya.SoundManager.stopAll();
            }
            else{
                this.soundOn = true;
                this.soundBtn.skin = "game/sound_on.png";
                Laya.SoundManager.playMusic("sounds/music.mp3",0);
            }
        }), 100);
    }
    private playSound(soundName:string,loopNum){
        if(this.soundOn)
            Laya.SoundManager.playSound("sounds/"+soundName+".mp3",loopNum);
    }
}