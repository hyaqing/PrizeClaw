var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var RuleScene = (function (_super) {
    __extends(RuleScene, _super);
    function RuleScene() {
        var _this = _super.call(this) || this;
        var bg = new Laya.Sprite();
        bg.graphics.drawRect(0, 0, _this.width, _this.height, "#000000");
        _this.addChildAt(bg, 0);
        bg.alpha = 0.6;
        _this.ruleInfor.vScrollBar.hide = true;
        _this.ruleInfor.vScrollBar.elasticBackTime = 200;
        _this.ruleInfor.vScrollBar.elasticDistance = 50;
        _this.rule.scaleX = _this.rule.scaleY = Data.stageH / 1138;
        _this.closeBtn.once(Laya.Event.CLICK, _this, _this.close);
        return _this;
    }
    RuleScene.prototype.init = function () {
        this.closeBtn.once(Laya.Event.CLICK, this, this.close);
    };
    RuleScene.prototype.close = function () {
        var _this = this;
        Laya.Tween.to(this.closeBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.closeBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            _this.parent.removeChild(_this);
        }), 100);
    };
    return RuleScene;
}(ui.ruleViewUI));
//# sourceMappingURL=RuleScene.js.map