var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var ListScene = (function (_super) {
    __extends(ListScene, _super);
    function ListScene() {
        var _this = _super.call(this) || this;
        var bg = new Laya.Sprite();
        bg.graphics.drawRect(0, 0, _this.width, _this.height, "#000000");
        _this.addChildAt(bg, 0);
        bg.alpha = 0.6;
        _this.listInforGroup.vScrollBar.hide = true;
        _this.listInforGroup.vScrollBar.elasticBackTime = 200;
        // this.listInforGroup.vScrollBar.elasticDistance = 50;
        _this.list.scaleX = _this.list.scaleY = Data.stageH / 1138;
        _this.init();
        return _this;
    }
    ListScene.prototype.init = function () {
        this.closeBtn.once(Laya.Event.MOUSE_DOWN, this, this.close);
        this.onSubmit();
    };
    ListScene.prototype.close = function () {
        var _this = this;
        console.log("close");
        Laya.Tween.to(this.closeBtn, { scaleX: 0.9, scaleY: 0.9 }, 100);
        Laya.Tween.to(this.closeBtn, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, function () {
            _this.listInforGroup.removeChildren();
            _this.parent.removeChild(_this);
        }), 100);
    };
    ListScene.prototype.onSubmit = function () {
        var url = "http://118.178.234.14:5500/interface/UfoCatcherUserHistory.php?";
        var requst = new Laya.HttpRequest();
        requst.on(Laya.Event.COMPLETE, this, this.onComplete);
        requst.on(Laya.Event.ERROR, this, this.onError);
        requst.send(url + "token=" + Data.token, null, "post", "json");
    };
    ListScene.prototype.onComplete = function (event) {
        var data = event;
        if (data.Header.Result == "1") {
            for (var i = 0; i < data.Content.length; i++) {
                var listInfor = new ListInfor();
                listInfor.y = 90 * i;
                listInfor.setBgSkin((i % 2 == 0) ? "listLight" : "listDark");
                listInfor.prizeName.text = data.Content[i].name;
                listInfor.status.text = data.Content[i].status;
                listInfor.time.text = data.Content[i].time;
                listInfor.cost.text = "消耗" + data.Content[i].cost + "金币";
                this.listInforGroup.addChild(listInfor);
            }
        }
        else {
            GameScene.getInstance().showDialog(5, data.Header.Msg);
        }
    };
    ListScene.prototype.onError = function (event) {
        GameScene.getInstance().showDialog(5, "网络错误");
        // alert(event);
    };
    return ListScene;
}(ui.listViewUI));
//# sourceMappingURL=ListScene.js.map