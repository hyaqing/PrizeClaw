var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var BackPrize = (function (_super) {
    __extends(BackPrize, _super);
    function BackPrize() {
        var _this = _super.call(this) || this;
        _this.car = new Laya.Image("game/car.png");
        _this.carFront = new Laya.Image("game/car.png");
        _this.chick = new Laya.Image("game/chick.png");
        _this.chick.anchorX = 0.5;
        _this.chick.anchorY = 1;
        _this.chick.x = _this.car.width / 2;
        _this.chick.y = 21.5;
        _this.carMask = new Laya.Sprite();
        _this.carMask.graphics.drawRect(0, 0, _this.car.width, _this.car.height, "#ffffff");
        _this.carMask.y = 20;
        _this.carFront.mask = _this.carMask;
        _this.reward = new Laya.Image("game/gift1.png");
        _this.reward.x = _this.car.width / 2 - _this.reward.width / 2;
        _this.reward.y = _this.car.y + 47;
        _this.leftWheel = new Laya.Image("game/wheel.png");
        _this.leftWheel.anchorX = _this.leftWheel.anchorY = 0.5;
        _this.leftWheel.x = 35;
        _this.leftWheel.y = _this.car.height + 7;
        _this.rightWheel = new Laya.Image("game/wheel.png");
        _this.rightWheel.anchorX = _this.rightWheel.anchorY = 0.5;
        _this.rightWheel.x = _this.car.width - 33;
        _this.rightWheel.y = _this.car.height + 7;
        _this.addChild(_this.car);
        _this.addChild(_this.chick);
        _this.addChild(_this.carFront);
        _this.addChild(_this.reward);
        _this.addChild(_this.leftWheel);
        _this.addChild(_this.rightWheel);
        _this.tween1();
        return _this;
    }
    BackPrize.prototype.tween1 = function () {
        var _this = this;
        Laya.Tween.to(this.leftWheel, { rotation: -360 }, 2500, null, Laya.Handler.create(this, function () {
            _this.leftWheel.rotation = 0;
            _this.rightWheel.rotation = 0;
            _this.tween1();
        }));
        Laya.Tween.to(this.rightWheel, { rotation: -360 }, 2500);
    };
    return BackPrize;
}(Laya.Box));
//# sourceMappingURL=BackPrize.js.map