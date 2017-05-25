/*
* name;
*/
class RewardInfor extends ui.rewardInforUI{
    constructor(){
        super();
        var pic_mask = new Laya.Image("game/icondi.png");
        pic_mask.x = 2;
        pic_mask.y = 2;
        this.pic.mask = pic_mask;
    }
}