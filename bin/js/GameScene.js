var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.width = Data.stageW;
        _this.height = Data.stageH;
        _this.init();
        _this.speed = 1;
        _this.prizeNum = 4;
        _this.moveGroup = [];
        _this.backMoveGroup = [];
        _this.prizeContainer = new Laya.Box();
        _this.backprizeContainer = new Laya.Box();
        _this.energyBtnMask = new Laya.Sprite();
        _this.energyBtnMask.graphics.drawRect(0, 0, _this.energyBtn_l.width, _this.energyBtn_l.height, "#000000");
        _this.energyBtn_l.mask = _this.energyBtnMask;
        _this.inContent.addChildAt(_this.backprizeContainer, _this.inContent.getChildIndex(_this.track2) + 1);
        _this.inContent.addChildAt(_this.prizeContainer, _this.inContent.numChildren - 2);
        _this.prizeContainer.y = _this.track.y - 63;
        _this.backprizeContainer.y = _this.track.y - 63 - (_this.track.y - _this.track2.y) + 32;
        _this.onSubmit4();
        // this.createPrizes();
        // this.createInfor();
        Laya.timer.loop(1, _this, _this.onPrizeMove);
        _this.listBtn.on(Laya.Event.CLICK, _this, _this.onListBtn);
        _this.ruleBtn.on(Laya.Event.CLICK, _this, _this.onRuleBtn);
        _this.coinBtn.on(Laya.Event.CLICK, _this, _this.onCoinBtn);
        _this.soundBtn.on(Laya.Event.CLICK, _this, _this.onSoundBtn);
        _this.freeBtn.on(Laya.Event.CLICK, _this, _this.onFreeBtn);
        _this.normalBtn.on(Laya.Event.CLICK, _this, _this.onNormalBtn);
        _this.advanceBtn.on(Laya.Event.CLICK, _this, _this.onAdvanceBtn);
        _this.startBtn.on(Laya.Event.CLICK, _this, _this.onStartBtn);
        Laya.SoundManager.playMusic("sounds/music.mp3", 0);
        return _this;
    }
    GameScene.prototype.init = function () {
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
    };
    GameScene.getInstance = function () {
        if (GameScene._instance == null)
            GameScene._instance = new GameScene();
        return GameScene._instance;
    };
    GameScene.prototype.createPrizes = function () {
        for (var i = 0; i < this.prizeNum; i++) {
            var prize = new Prize(true);
            prize.anchorX = 0.5;
            prize.anchorY = 0.5;
            prize.x = Data.stageW * 0.3 + i * 230;
            var temp = this.prizeInformation[this.prizeInformation.length - this.prizeNum - 1 + i];
            if (temp.stype == "5") {
                prize.showText(temp.name);
            }
            else {
                prize.changePrize(temp.photo_url);
            }
            prize.id = temp.id;
            this.backprizeContainer.addChild(prize);
            prize.start();
            this.backMoveGroup.push(prize);
        }
        this.backprizeInforId = this.prizeInformation.length - 1;
        var _loop_1 = function () {
            var prize = new Prize();
            prize.anchorX = 0.5;
            prize.anchorY = 0.5;
            prize.x = Data.stageW - prize.width - i * 230;
            var temp = this_1.prizeInformation[i];
            if (temp.stype == "5") {
                prize.showText(temp.name);
            }
            else {
                prize.changePrize(temp.photo_url);
            }
            prize.id = temp.id;
            prize.name = temp.prizeName;
            prize.stype = temp.stype;
            this_1.prizeContainer.addChild(prize);
            Laya.timer.once(i * 200, this_1, function () {
                prize.start();
            });
            this_1.moveGroup.push(prize);
        };
        var this_1 = this;
        for (var i = 0; i < this.prizeNum + 1; i++) {
            _loop_1();
        }
        this.prizeInforId = this.prizeNum + 1;
    };
    GameScene.prototype.changePrizes = function () {
        for (var i = 0; i < this.prizeNum; i++) {
            var prize = this.backMoveGroup[i];
            var temp = this.prizeInformation[this.prizeInformation.length - this.prizeNum - 1 + i];
            if (temp.stype == "5") {
                prize.changePrize("game/gift3.png");
                prize.showText(temp.name);
            }
            else {
                prize.changePrize(temp.photo_url);
            }
            prize.id = temp.id;
        }
        this.backprizeInforId = this.prizeInformation.length - 1;
        for (var i = 0; i < this.prizeNum + 1; i++) {
            var prize = this.moveGroup[i];
            var temp = this.prizeInformation[i];
            if (temp.stype == "5") {
                prize.changePrize("game/gift3.png");
                prize.showText(temp.name);
            }
            else {
                prize.changePrize(temp.photo_url);
                prize.hideText();
            }
            prize.id = temp.id;
            prize.prizeName = temp.name;
            prize.stype = temp.stype;
        }
        this.prizeInforId = this.prizeNum + 1;
    };
    GameScene.prototype.createInfor = function () {
        var rewardInfor = new RewardInfor();
        rewardInfor.pic.skin = this.rewardInformation[0].user_photo_url;
        rewardInfor.word.text = this.rewardInformation[0].nickname + "运气爆棚，中了" + this.rewardInformation[0].name;
        this.rewardInforGroup.addChild(rewardInfor);
        var rewardInfor2 = new RewardInfor();
        rewardInfor2.y = rewardInfor.height;
        rewardInfor2.pic.skin = this.rewardInformation[1].user_photo_url;
        rewardInfor2.word.text = this.rewardInformation[1].nickname + "运气爆棚，中了" + this.rewardInformation[1].name;
        this.rewardInforGroup.addChild(rewardInfor2);
        this.rewardInforId = 2;
        Laya.timer.once(3000, this, this.changeRewardInfor);
    };
    GameScene.prototype.changeRewardInfor = function () {
        var _this = this;
        if (this.rewardInforId % 2 == 0) {
            var rewardInfor = this.rewardInforGroup.getChildAt(0);
            var rewardInfor2 = this.rewardInforGroup.getChildAt(1);
        }
        else {
            var rewardInfor = this.rewardInforGroup.getChildAt(1);
            var rewardInfor2 = this.rewardInforGroup.getChildAt(0);
        }
        Laya.Tween.to(rewardInfor, { y: -rewardInfor.height }, 500, null, Laya.Handler.create(this, function () {
            rewardInfor.pic.skin = _this.rewardInformation[_this.rewardInforId].user_photo_url;
            rewardInfor.word.text = _this.rewardInformation[_this.rewardInforId].nickname + "运气爆棚，中了" + _this.rewardInformation[_this.rewardInforId].name;
            rewardInfor.y = rewardInfor.height;
            _this.rewardInforId++;
            if (_this.rewardInforId > (_this.rewardInformation.length - 1))
                _this.rewardInforId = 0;
            Laya.timer.once(3000, _this, _this.changeRewardInfor);
        }));
        Laya.Tween.to(rewardInfor2, { y: 0 }, 500, null);
    };
    GameScene.prototype.setTimes = function (num) {
        var _this = this;
        if (num == 0) {
            this.setTimesAnima(this.reward1, "game/darkpic.png");
            this.setTimesAnima(this.reward2, "game/darkpic.png");
            this.setTimesAnima(this.reward3, "game/darkpic.png");
        }
        else if (num == 1) {
            this.setTimesAnima(this.reward1, "game/lightpic.png");
            this.setTimesAnima(this.reward2, "game/darkpic.png");
            this.setTimesAnima(this.reward3, "game/darkpic.png");
        }
        else if (num == 2) {
            this.setTimesAnima(this.reward1, "game/lightpic.png");
            this.setTimesAnima(this.reward2, "game/lightpic.png");
            this.setTimesAnima(this.reward3, "game/darkpic.png");
        }
        else if (num == 3) {
            this.setTimesAnima(this.reward1, "game/lightpic.png");
            this.setTimesAnima(this.reward2, "game/lightpic.png");
            this.setTimesAnima(this.reward3, "game/lightpic.png");
            // this.reward2.skin = "game/lightpic.png";
            Laya.Tween.to(this.star2, { scaleX: 1, scaleY: 1 }, 300, null);
            Laya.Tween.to(this.star2, { x: this.freePic.x + 30 }, 600, Laya.Ease.quadOut, null, 300);
            Laya.Tween.to(this.star2, { y: this.freePic.y + 10, rotation: -3 * 360 }, 600, null, null, 300);
            Laya.Tween.to(this.star2, { scaleX: 0, scaleY: 0 }, 200, null, Laya.Handler.create(this, function () {
                _this.star2.x = _this.star.x;
                _this.star2.y = _this.star.y;
            }), 900);
        }
        this.freeNum.text = "×" + this.free;
    };
    GameScene.prototype.setTimesAnima = function (target, skinName) {
        Laya.Tween.to(target, { scaleX: 0, scaleY: 0 }, 300, null, Laya.Handler.create(target, function () {
            target.skin = skinName;
            Laya.Tween.to(target, { scaleX: 1, scaleY: 1 }, 300, null);
        }));
    };
    GameScene.prototype.onPrizeMove = function () {
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
    };
    GameScene.prototype.changePrize = function () {
        this.moveGroup[0].x = this.moveGroup[this.moveGroup.length - 1].x - 230;
        var temp = this.prizeInformation[this.prizeInforId];
        this.moveGroup[0].id = temp.id;
        this.moveGroup[0].prizeName = temp.name;
        this.moveGroup[0].stype = temp.stype;
        if (temp.stype == "5") {
            this.moveGroup[0].changePrize("game/gift3.png");
            this.moveGroup[0].showText(temp.name);
        }
        else {
            this.moveGroup[0].changePrize(temp.photo_url);
            this.moveGroup[0].hideText();
        }
        this.moveGroup.push(this.moveGroup.shift());
        this.prizeInforId++;
        if (this.prizeInforId > (this.prizeInformation.length - 1))
            this.prizeInforId = 0;
    };
    GameScene.prototype.changeBackPrize = function () {
        this.backMoveGroup[0].x = this.backMoveGroup[this.backMoveGroup.length - 1].x + 230;
        var temp = this.prizeInformation[this.backprizeInforId];
        this.backMoveGroup[0].id = temp.id;
        if (temp.stype == "5") {
            this.backMoveGroup[0].changePrize("game/gift3.png");
            this.backMoveGroup[0].showText(temp.name);
        }
        else {
            this.backMoveGroup[0].changePrize(temp.photo_url);
            this.backMoveGroup[0].hideText();
        }
        this.backMoveGroup.push(this.backMoveGroup.shift());
        this.backprizeInforId++;
        if (this.backprizeInforId > (this.prizeInformation.length - 1))
            this.backprizeInforId = 0;
    };
    GameScene.prototype.onStartBtn = function () {
        var _this = this;
        this.startBtn.mouseEnabled = false;
        console.log("conClick");
        var cost;
        if (this.levelId == 2)
            cost = parseInt(this.normalNum.text);
        else if (this.levelId == 3)
            cost = parseInt(this.advanceNum.text);
        if (this.levelId == 1) {
            if (this.free == 0) {
                this.showDialog(5, "免费次数或金币不足");
                this.startBtn.mouseEnabled = true;
                return;
            }
        }
        else {
            if (parseInt(this.coinNum.text) < cost) {
                this.showDialog(5, "免费次数或金币不足");
                this.startBtn.mouseEnabled = true;
                return;
            }
        }
        Laya.Tween.to(this.startBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.startBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.clawLine, { top: -255 }, 700);
            Laya.Tween.to(_this.clawLine, { top: -255 }, 700);
            Laya.Tween.to(_this.claw, { scaleX: 1.3, scaleY: 1.3 }, 400, null, null, 300);
            Laya.Tween.to(_this.leftClaw, { rotation: 5 }, 700, null, Laya.Handler.create(_this, _this.checkPrize));
            Laya.Tween.to(_this.leftClaw, { rotation: -5 }, 200, Laya.Ease.backIn, null, 700);
            Laya.Tween.to(_this.rightClaw, { rotation: -5 }, 700);
            Laya.Tween.to(_this.rightClaw, { rotation: 5 }, 200, Laya.Ease.backIn, null, 700);
        }), 100);
    };
    GameScene.prototype.onListBtn = function () {
        var _this = this;
        Laya.Tween.to(this.listBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.listBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            if (_this.listScene) {
                _this.addChild(_this.listScene);
                _this.listScene.init();
            }
            else {
                _this.listScene = new ListScene();
                _this.addChild(_this.listScene);
                _this.listScene.centerX = 0;
                _this.listScene.centerY = 0;
            }
        }), 100);
    };
    GameScene.prototype.onRuleBtn = function () {
        var _this = this;
        Laya.Tween.to(this.ruleBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.ruleBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            if (_this.ruleScene) {
                _this.addChild(_this.ruleScene);
                _this.ruleScene.init();
            }
            else {
                _this.ruleScene = new RuleScene();
                _this.addChild(_this.ruleScene);
                _this.ruleScene.centerX = 0;
                _this.ruleScene.centerY = 0;
            }
        }), 100);
    };
    GameScene.prototype.onCoinBtn = function () {
        Laya.Tween.to(this.coinBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.coinBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            Laya.Browser.window['addCoin']();
        }), 100);
    };
    GameScene.prototype.onFreeBtn = function () {
        var _this = this;
        Laya.Tween.to(this.freeBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.freeBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            _this.changeLevel("free");
        }), 100);
    };
    GameScene.prototype.onNormalBtn = function () {
        var _this = this;
        Laya.Tween.to(this.normalBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.normalBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            _this.changeLevel("normal");
        }), 100);
    };
    GameScene.prototype.onAdvanceBtn = function () {
        var _this = this;
        Laya.Tween.to(this.advanceBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.advanceBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            _this.changeLevel("advance");
        }), 100);
    };
    GameScene.prototype.checkPrize = function () {
        var _this = this;
        var mDis = 700;
        var n;
        for (var i = 0; i < this.moveGroup.length; i++) {
            if (Math.abs(this.moveGroup[i].x - 320) < mDis) {
                mDis = Math.abs(this.moveGroup[i].x - 320);
                n = i;
            }
        }
        var setDis = 70;
        if (mDis < setDis) {
            this.startBtn.visible = false;
            this.energyBtn.visible = true;
            this.energyBtnMask.x = -this.energyBtn_l.width;
            this.catchPrize = this.moveGroup[n];
            this.prizeContainer.removeChild(this.catchPrize);
            this.inContent.addChild(this.catchPrize);
            this.catchPrize.x = 320;
            this.catchPrize.y = this.track.y - 63;
            this.catchPrize.stopWheel();
            this.moveGroup.splice(n, 1);
            this.dis = this.clawLine.top - (-660 + (1138 - Data.stageH));
            var temp = RandomUtils.limit(0.6, 1);
            this.dropDis = this.clawLine.top - this.dis * temp;
            this.onSubmit2();
            this.lineSpeed = 1;
            this.energySpeed = this.lineSpeed * this.dis / this.energyBtn_l.width;
            this.energyBtn.on(Laya.Event.MOUSE_DOWN, this, this.onTouch);
            this.playSound("up", 3);
            Laya.timer.once(200, this, function () {
                Laya.timer.loop(1, _this, _this.startEnergy);
            });
            this.energyBtn.on(Laya.Event.MOUSE_UP, this, this.touchEnd);
        }
        else {
            this.catchNull = true;
            this.onSubmit2();
            this.showDialog(0);
            Laya.Tween.to(this.clawLine, { top: -660 + (1138 - Data.stageH) }, 1200, null, Laya.Handler.create(this, function () {
                _this.startBtn.mouseEnabled = true;
            }), 300);
            Laya.Tween.to(this.leftClaw, { rotation: -20 }, 400, null, null);
            Laya.Tween.to(this.rightClaw, { rotation: 20 }, 400, null, null);
            Laya.Tween.to(this.claw, { scaleX: 1, scaleY: 1 }, 400, null, null, 100);
        }
    };
    GameScene.prototype.onTouch = function () {
        this.lineSpeed = 4;
        this.energySpeed = this.lineSpeed * this.dis / this.energyBtn_l.width;
        // Laya.timer.loop(1,this,this.startEnergy);
    };
    GameScene.prototype.touchEnd = function () {
        this.lineSpeed = 1;
        this.energySpeed = this.lineSpeed * this.dis / this.energyBtn_l.width;
        // Laya.timer.clear(this,this.startEnergy);
    };
    GameScene.prototype.startEnergy = function () {
        this.energyBtnMask.x += this.energySpeed;
        this.clawLine.top -= this.lineSpeed;
        this.catchPrize.y -= this.lineSpeed;
        if (this.energyBtnMask.x >= 0) {
            this.energyBtnMask.x = 0;
        }
        if (this.clawLine.top <= this.dropDis) {
            if (!this.isChecked && this.isCatched == 0)
                this.playFail();
        }
        if (this.clawLine.top <= -660 + (1138 - Data.stageH)) {
            this.endEnergy();
        }
    };
    GameScene.prototype.endEnergy = function () {
        var _this = this;
        this.energyBtn.offAll();
        Laya.timer.clear(this, this.startEnergy);
        Laya.SoundManager.stopSound("sounds/up.mp3");
        Laya.Tween.to(this.energyBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.energyBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            _this.energyBtnMask.x = 0;
            _this.clawLine.top = -660 + (1138 - Data.stageH);
            _this.startBtn.visible = true;
            _this.energyBtn.visible = false;
        }), 100);
        // var dis = this.clawLine.top-(-660 + (1138 - Data.stageH));
        // Laya.Tween.to(this.clawLine,{top:-660 + (1138 - Data.stageH)},1200,null,null,300);
        // Laya.Tween.to(this.catchPrize,{y:this.track.y - 63-dis},1200,null,null,300);
        if (!this.isChecked && this.isCatched == 1)
            this.playSuccess();
    };
    GameScene.prototype.playSuccess = function () {
        var _this = this;
        console.log("success");
        this.isChecked = true;
        this.playSound("get", 1);
        if (this.catchPrize.stype == "5")
            this.showDialog(3, this.catchPrize.prizeName, this.catchPrize.stype);
        else
            this.showDialog(4, this.catchPrize.prizeName);
        Laya.Tween.to(this.leftClaw, { rotation: -20 }, 500, null, null, 500);
        Laya.Tween.to(this.rightClaw, { rotation: 20 }, 500, null, null, 500);
        Laya.Tween.to(this.claw, { scaleX: 1, scaleY: 1 }, 500, null, null, 500);
        Laya.Tween.to(this.catchPrize, { scaleX: 0.2, scaleY: 0.2 }, 1000, Laya.Ease.backIn, null);
        Laya.Tween.to(this.catchPrize, { y: this.listBtn.y + (1138 - Data.stageH) }, 1000, Laya.Ease.backIn, Laya.Handler.create(this, function () {
        }), 1100);
        Laya.Tween.to(this.catchPrize, { x: this.listBtn.x }, 1000, Laya.Ease.backOut, Laya.Handler.create(this, function () {
            _this.startBtn.mouseEnabled = true;
            _this.backToGroup();
            _this.initResult();
        }), 1100);
    };
    GameScene.prototype.playFail = function () {
        var _this = this;
        console.log("fail");
        this.isChecked = true;
        this.playSound("fail", 1);
        this.showDialog(1);
        Laya.Tween.to(this.leftClaw, { rotation: -20 }, 500, null, null, 500);
        Laya.Tween.to(this.rightClaw, { rotation: 20 }, 500, null, null, 500);
        Laya.Tween.to(this.claw, { scaleX: 1, scaleY: 1 }, 500, null, null, 500);
        Laya.Tween.to(this.catchPrize, { y: this.track.y + 100 }, 1200, Laya.Ease.cubicIn, Laya.Handler.create(this, function () {
            _this.startBtn.mouseEnabled = true;
            _this.backToGroup();
            _this.initResult();
        }));
        Laya.timer.once(300, this, function () {
            _this.inContent.setChildIndex(_this.catchPrize, _this.inContent.getChildIndex(_this.floor2));
        });
    };
    GameScene.prototype.checkExtraReward = function () {
        if (this.tempReward > 0) {
            this.showDialog(2, this.tempReward + "金币");
        }
        this.tempReward = 0;
    };
    GameScene.prototype.wrongMessage = function () {
        console.log("wrong");
        this.energyBtn.offAll();
        Laya.timer.clear(this, this.startEnergy);
        this.energyBtnMask.x = 0;
        this.startBtn.visible = true;
        this.energyBtn.visible = false;
        Laya.Tween.clearAll(this.clawLine);
        this.clawLine.top = -660 + (1138 - Data.stageH);
        Laya.Tween.clearAll(this.leftClaw);
        this.leftClaw.rotation = -20;
        Laya.Tween.clearAll(this.rightClaw);
        this.rightClaw.rotation = 20;
        Laya.Tween.clearAll(this.claw);
        this.claw.scaleX = this.claw.scaleY = 1;
        this.backToGroup();
        this.initResult();
        this.startBtn.mouseEnabled = true;
    };
    GameScene.prototype.backToGroup = function () {
        Laya.Tween.clearAll(this.catchPrize);
        this.inContent.removeChild(this.catchPrize);
        this.prizeContainer.addChild(this.catchPrize);
        this.catchPrize.y = 0;
        this.catchPrize.x = this.moveGroup[this.moveGroup.length - 1].x - 230;
        this.catchPrize.scaleX = this.catchPrize.scaleY = 1;
        this.catchPrize.startWheel();
        this.moveGroup.push(this.catchPrize);
    };
    GameScene.prototype.changeLevel = function (levelName) {
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
            this.clawF.skin = "game/clawF.png";
            this.changeCar("car", levelName);
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
            this.clawF.skin = "game/clawF_2.png";
            this.changeCar("car2", levelName);
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
            this.clawF.skin = "game/clawF_2.png";
            this.changeCar("car3", levelName);
            this.levelId = 3;
        }
        this.onSubmit4();
    };
    GameScene.prototype.changeCar = function (carName, levelName) {
        for (var i = 0; i < this.backprizeContainer.numChildren; i++) {
            var prize = this.backprizeContainer.getChildAt(i);
            prize.showCrown(levelName);
            prize.carImage = carName;
        }
        for (var i = 0; i < this.prizeContainer.numChildren; i++) {
            var prize = this.prizeContainer.getChildAt(i);
            prize.showCrown(levelName);
            prize.carImage = carName;
        }
    };
    GameScene.prototype.initResult = function () {
        this.isChecked = false;
        this.isCatched = -1;
    };
    GameScene.prototype.showDialog = function (id, content, stype) {
        if (this.dialogScene) {
            this.addChild(this.dialogScene);
        }
        else {
            this.dialogScene = new DialogScene();
            this.addChild(this.dialogScene);
        }
        this.dialogScene.showContent(id, content, stype);
    };
    GameScene.prototype.onSubmit = function () {
        var url = "http://118.178.234.14:5500/interface/GetUserKmoney.php?";
        var requst = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE, this, this.onComplete);
        requst.on(Laya.Event.ERROR, this, this.onError);
        requst.send(url, "token=" + Data.token + "&game=ufo_catcher", "post", "json");
    };
    GameScene.prototype.onComplete = function (event) {
        var _this = this;
        var data = event;
        if (data.Header.Result == "1") {
            console.log(data);
            this.coinNum.text = data.Kmoney;
            this.normalNum.text = data.Zone_medium;
            this.advanceNum.text = data.Zone_advanced;
            this.free = parseInt(data.Tickets);
            if (data.Times == "0") {
                Laya.timer.once(800, this, function () {
                    _this.setTimes(parseInt(data.Times));
                });
            }
            else {
                this.setTimes(parseInt(data.Times));
            }
            if (this.coinNum.text.length < 7)
                this.coinNum.fontSize = 30;
            else if (this.coinNum.text.length > 8)
                this.coinNum.fontSize = 20;
            else
                this.coinNum.fontSize = 24;
        }
        else {
            this.showDialog(5, data.Header.Msg);
        }
    };
    GameScene.prototype.onError = function (event) {
        this.showDialog(5, "网络错误");
    };
    GameScene.prototype.onSubmit2 = function () {
        var url = "http://118.178.234.14:5500/interface/UfoCatcherResult.php?";
        var requst = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE, this, this.onComplete2);
        requst.on(Laya.Event.ERROR, this, this.onError2);
        requst.send(url, "token=" + Data.token + "&zone=" + this.levelId + "&gid=" + (this.catchNull ? -1 : this.catchPrize.id), "post", "json");
    };
    GameScene.prototype.onComplete2 = function (event) {
        var data = event;
        console.log(data);
        if (!this.catchNull) {
            if (data.Header.Result == "1") {
                this.isCatched = 1;
                if (this.clawLine.top <= -660 + (1138 - Data.stageH) && !this.isChecked)
                    this.playSuccess();
            }
            else if (data.Header.Result == "0") {
                this.isCatched = 0;
                if (parseInt(data.Reward) > 0) {
                    this.tempReward = parseInt(data.Reward);
                }
                if (this.clawLine.top <= this.dropDis && !this.isChecked)
                    this.playFail();
            }
            else {
                this.showDialog(5, data.Header.Msg);
                this.wrongMessage();
            }
        }
        else {
            this.catchNull = false;
        }
        if (data.Times == "3")
            this.setTimes(3);
        this.onSubmit();
    };
    GameScene.prototype.onError2 = function (event) {
        this.showDialog(5, "网络错误");
        this.wrongMessage();
    };
    GameScene.prototype.onSubmit3 = function () {
        var url = "http://118.178.234.14:5500/interface/UfoCatcherBroadcast.php";
        var requst = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE, this, this.onComplete3);
        requst.on(Laya.Event.ERROR, this, this.onError3);
        requst.send(url, null, "post", "json");
    };
    GameScene.prototype.onComplete3 = function (event) {
        var data = event;
        if (data.Header.Result == "1") {
            this.rewardInformation = data.Content;
            this.createInfor();
            console.log(data);
        }
        else {
            this.showDialog(5, data.Header.Msg);
        }
    };
    GameScene.prototype.onError3 = function (event) {
        this.showDialog(5, "网络错误");
    };
    GameScene.prototype.onSubmit4 = function () {
        var url = "http://118.178.234.14:5500/interface/UfoCatcherGoods.php?";
        var requst = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE, this, this.onComplete4);
        requst.on(Laya.Event.ERROR, this, this.onError4);
        requst.send(url, "zone=" + this.levelId, "post", "json");
    };
    GameScene.prototype.onComplete4 = function (event) {
        var data = event;
        if (data.Header.Result == "1") {
            this.prizeInformation = data.Content;
            console.log(data);
            if (this.moveGroup.length == 0)
                this.createPrizes();
            else
                this.changePrizes();
        }
        else {
            this.showDialog(5, data.Header.Msg);
        }
    };
    GameScene.prototype.onError4 = function (event) {
        this.showDialog(5, "网络错误");
    };
    GameScene.prototype.onSoundBtn = function () {
        var _this = this;
        Laya.Tween.to(this.soundBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.soundBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            if (_this.soundOn) {
                _this.soundOn = false;
                _this.soundBtn.skin = "game/sound_off.png";
                Laya.SoundManager.stopAll();
            }
            else {
                _this.soundOn = true;
                _this.soundBtn.skin = "game/sound_on.png";
                Laya.SoundManager.playMusic("sounds/music.mp3", 0);
            }
        }), 100);
    };
    GameScene.prototype.playSound = function (soundName, loopNum) {
        if (this.soundOn)
            Laya.SoundManager.playSound("sounds/" + soundName + ".mp3", loopNum);
    };
    return GameScene;
}(ui.gameViewUI));
//# sourceMappingURL=GameScene.js.map