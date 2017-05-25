var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var LoadingScene = (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super.call(this) || this;
        _this.width = Data.stageW;
        _this.height = Data.stageH;
        _this.bg = new Laya.Sprite();
        _this.bg.graphics.drawRect(0, 0, _this.width, _this.height, "#514aab");
        _this.loadingbar2 = new Laya.Image("loading/loadingBar2.png");
        _this.loading.mask = _this.loadingbar2;
        _this.loadingbar2.x = -_this.loading.width;
        // this.chickrun.x = this.loading.x+80;
        _this.loadingbg.y = _this.height / 2 - _this.loadingbg.height / 2;
        _this.loading.y = _this.height / 2 - _this.loading.height / 2;
        _this.word.y = _this.loadingbg.y + 60;
        _this.chickrun.play();
        _this.chickrun.y = _this.loadingbg.y + 10;
        _this.addChildAt(_this.bg, 0);
        return _this;
    }
    LoadingScene.prototype.remove = function () {
        this.chickrun.stop();
        this.parent.removeChild(this);
    };
    return LoadingScene;
}(ui.loadViewUI));
//# sourceMappingURL=LoadingScene.js.map