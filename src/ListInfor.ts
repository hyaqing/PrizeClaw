/*
* name;
*/
class ListInfor extends ui.listInforUI{

    constructor(){
        super();
    }
    public setBgSkin(name:string){
        this.bg.skin = "game/"+name+".png";
    }
}