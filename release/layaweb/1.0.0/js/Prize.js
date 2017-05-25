var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Prize = (function (_super) {
    __extends(Prize, _super);
    function Prize(isBack) {
        if (isBack === void 0) { isBack = false; }
        var _this = _super.call(this) || this;
        _this.isBack = isBack;
        _this.prize = new Laya.Box();
        _this.prize.width = 159;
        _this.prize.height = 231;
        _this.car = new Laya.Image("game/car.png");
        _this.car.y = 50;
        _this.carFront = new Laya.Image("game/car.png");
        _this.carFront.y = 50;
        _this.chick = new Laya.Animation();
        _this.chick.loadAnimation("chick.ani");
        _this.chick.x = _this.car.width / 2;
        _this.chick.y = 120;
        _this.crown = new Laya.Image("game/crown.png");
        _this.crown.x = 36;
        _this.crown.y = 0;
        _this.carMask = new Laya.Sprite();
        _this.carMask.graphics.drawRect(0, 0, _this.car.width, _this.car.height, "#ffffff");
        _this.carMask.y = 20;
        _this.carFront.mask = _this.carMask;
        _this.reward = new Laya.Image("game/gift3.png");
        _this.reward.x = _this.car.width / 2 - _this.reward.width / 2;
        _this.reward.y = _this.car.y + 47;
        _this.rewardText = new Laya.Label();
        _this.rewardText.text = "30金币";
        _this.rewardText.align = "center";
        _this.rewardText.color = "#ffffff";
        _this.rewardText.fontSize = 20;
        _this.rewardText.width = 100;
        _this.rewardText.centerX = 0;
        _this.rewardText.y = _this.reward.y + 68;
        _this.rewardText.text = "100金币";
        _this.leftWheel = new Laya.Image("game/wheel.png");
        _this.leftWheel.anchorX = _this.leftWheel.anchorY = 0.5;
        _this.leftWheel.x = 35;
        _this.leftWheel.y = _this.car.height + 57;
        _this.rightWheel = new Laya.Image("game/wheel.png");
        _this.rightWheel.anchorX = _this.rightWheel.anchorY = 0.5;
        _this.rightWheel.x = _this.car.width - 33;
        _this.rightWheel.y = _this.car.height + 57;
        _this.addChild(_this.prize);
        _this.prize.addChild(_this.car);
        _this.prize.addChild(_this.crown);
        _this.prize.addChild(_this.chick);
        _this.prize.addChild(_this.carFront);
        _this.prize.addChild(_this.reward);
        _this.prize.addChild(_this.rewardText);
        _this.prize.addChild(_this.leftWheel);
        _this.prize.addChild(_this.rightWheel);
        _this.tween1();
        _this.crown.visible = false;
        if (_this.isBack)
            _this.createBackPrize();
        else
            _this.createPrize();
        _this.rewardText.visible = false;
        return _this;
        // Laya.Tween.to(this,{scaleX:0,scaleY:0},500,null,null,500);
    }
    Prize.prototype.start = function () {
        var _this = this;
        Laya.Tween.to(this.chick, { y: 55 }, 600, Laya.Ease.backOut);
        Laya.timer.once(600, this.chick, function () {
            _this.chick.play();
        });
    };
    Prize.prototype.createPrize = function () {
    };
    Prize.prototype.createBackPrize = function () {
        this.maska = new Laya.Image("game/car_mask.png");
        this.maska.width = 159;
        this.maska.height = 229;
        this.maska.y = 2;
        this.prize.addChild(this.maska);
        this.prize.scaleX = this.prize.scaleY = 0.5;
        // this.maska = new Laya.Sprite();
        // this.maska.graphics.drawRect(0,0,this.prize.width*0.5,this.prize.height*0.5,"#fec87f");
        // this.addChild(this.maska);
        // Laya.timer.once(50,this,this.setMask);
        // this.maska.mask = this.prize;
        // this.maska.alpha=0.65;
        // this.prize.scaleX = this.prize.scaleY = 0.5;
    };
    Prize.prototype.stopWheel = function () {
        Laya.Tween.clearTween(this.leftWheel);
        Laya.Tween.clearTween(this.rightWheel);
    };
    Prize.prototype.startWheel = function () {
        this.leftWheel.rotation = 0;
        this.leftWheel.rotation = 0;
        this.tween1();
    };
    Prize.prototype.tween1 = function () {
        var _this = this;
        Laya.Tween.to(this.leftWheel, { rotation: this.isBack ? -360 : 360 }, 2500, null, Laya.Handler.create(this, function () {
            _this.leftWheel.rotation = 0;
            _this.rightWheel.rotation = 0;
            _this.tween1();
        }));
        Laya.Tween.to(this.rightWheel, { rotation: this.isBack ? -360 : 360 }, 2500);
    };
    Object.defineProperty(Prize.prototype, "carImage", {
        set: function (name) {
            this.car.skin = "game/" + name + ".png";
            this.carFront.skin = "game/" + name + ".png";
        },
        enumerable: true,
        configurable: true
    });
    Prize.prototype.showCrown = function (name) {
        if (name == "advance") {
            this.crown.visible = true;
            if (this.maska)
                this.maska.skin = "game/car_mask2.png";
        }
        else {
            this.crown.visible = false;
            if (this.maska)
                this.maska.skin = "game/car_mask.png";
        }
    };
    Prize.prototype.showText = function (content) {
        this.rewardText.text = content;
        this.rewardText.visible = true;
    };
    Prize.prototype.hideText = function () {
        this.rewardText.visible = false;
    };
    Prize.prototype.changePrize = function (picUrl) {
        this.reward.skin = picUrl;
    };
    return Prize;
}(Laya.Box));
//# sourceMappingURL=Prize.js.map