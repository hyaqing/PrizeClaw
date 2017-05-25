var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var RewardInfor = (function (_super) {
    __extends(RewardInfor, _super);
    function RewardInfor() {
        var _this = _super.call(this) || this;
        var pic_mask = new Laya.Image("game/icondi.png");
        pic_mask.x = 2;
        pic_mask.y = 2;
        _this.pic.mask = pic_mask;
        return _this;
    }
    return RewardInfor;
}(ui.rewardInforUI));
//# sourceMappingURL=RewardInfor.js.map