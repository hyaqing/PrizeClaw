var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var DialogScene = (function (_super) {
    __extends(DialogScene, _super);
    function DialogScene() {
        var _this = _super.call(this) || this;
        _this.width = Data.stageW;
        _this.height = Data.stageH;
        _this.bg = new Laya.Sprite();
        _this.bg.graphics.drawRect(0, 0, _this.width, _this.height, "#000000");
        _this.addChildAt(_this.bg, 0);
        _this.bg.alpha = 0.6;
        _this.bg.width = _this.width;
        _this.bg.height = _this.height;
        _this.badDialog.y = _this.height * 0.4;
        _this.giftDialog.y = _this.height * 0.45;
        _this.sureBtn.y = _this.height * 0.58;
        _this.coinDialog.y = _this.sureBtn.y - _this.coinDialog.height / 2 - 80;
        _this.coingiftDialog.y = _this.sureBtn.y - _this.coingiftDialog.height / 2 - 80;
        _this.badDialog.visible = false;
        _this.coinDialog.visible = false;
        _this.coingiftDialog.visible = false;
        _this.giftDialog.visible = false;
        _this.sureBtn.visible = false;
        return _this;
    }
    DialogScene.prototype.showContent = function (id, content, stype) {
        var _this = this;
        switch (id) {
            case 0:
                this.badDialog.visible = true;
                this.badWord.text = "没夹中，下次看准了再出手哦！";
                this.bg.once(Laya.Event.CLICK, this, this.delete);
                break;
            case 1:
                this.badDialog.visible = true;
                this.badWord.text = "再接再厉，感觉下次就要中了哦！";
                this.bg.once(Laya.Event.CLICK, this, this.delete);
                break;
            case 2:
                this.coinDialog.visible = true;
                this.coinText.text = content;
                this.sureBtn.visible = true;
                this.sureBtn.once(Laya.Event.CLICK, this, this.delete);
                break;
            case 3:
                this.coingiftDialog.visible = true;
                this.coingiftText.text = content;
                this.sureBtn.visible = true;
                this.sureBtn.once(Laya.Event.CLICK, this, this.delete);
                break;
            case 4:
                this.giftDialog.visible = true;
                this.giftName.text = content;
                this.goBtn.once(Laya.Event.CLICK, this, function () {
                    _this.goGift(stype);
                });
                this.continueBtn.once(Laya.Event.CLICK, this, this.delete);
                break;
            case 5:
                this.badDialog.visible = true;
                this.badWord.text = content;
                this.bg.once(Laya.Event.CLICK, this, this.delete);
                break;
        }
    };
    DialogScene.prototype.goGift = function (stype) {
        Laya.Browser.window['goGift'](stype);
    };
    DialogScene.prototype.delete = function () {
        this.badDialog.visible = false;
        this.coinDialog.visible = false;
        this.coingiftDialog.visible = false;
        this.giftDialog.visible = false;
        this.sureBtn.visible = false;
        this.parent.removeChild(this);
        GameScene.getInstance().checkExtraReward();
    };
    return DialogScene;
}(ui.dialogUI));
//# sourceMappingURL=DialogScene.js.map