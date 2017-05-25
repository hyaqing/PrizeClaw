var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var ListInfor = (function (_super) {
    __extends(ListInfor, _super);
    function ListInfor() {
        return _super.call(this) || this;
    }
    ListInfor.prototype.setBgSkin = function (name) {
        this.bg.skin = "game/" + name + ".png";
    };
    return ListInfor;
}(ui.listInforUI));
//# sourceMappingURL=ListInfor.js.map