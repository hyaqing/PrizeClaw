
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class dialogUI extends View {
		public badDialog:Laya.Box;
		public badWord:Laya.Label;
		public coinDialog:Laya.Box;
		public coinText:Laya.Label;
		public coingiftDialog:Laya.Box;
		public coingiftText:Laya.Label;
		public giftDialog:Laya.Box;
		public giftName:Laya.Label;
		public continueBtn:Laya.Image;
		public goBtn:Laya.Image;
		public sureBtn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Box","props":{"var":"badDialog","centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"game/badDialog.png"}},{"type":"Label","props":{"wordWrap":true,"width":395,"var":"badWord","valign":"middle","text":"再接再厉，感觉下次就要中了哦！","height":107,"fontSize":26,"color":"#8a7da5","centerY":1,"centerX":5.5,"align":"center"}}]},{"type":"Box","props":{"width":468,"var":"coinDialog","centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"game/goodDialog.png"}},{"type":"Label","props":{"y":124,"x":55,"text":"天降好运，获得","fontSize":26,"color":"#8a7da5"}},{"type":"Label","props":{"y":176,"x":55,"text":"不要灰心，说不定下次就中咯。","fontSize":26,"color":"#8a7da5"}},{"type":"Label","props":{"y":118,"x":247,"var":"coinText","text":"999金币","fontSize":35,"color":"#ffb910"}}]},{"type":"Box","props":{"width":468,"var":"coingiftDialog","centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":468,"skin":"game/goodDialog2.png"}},{"type":"Label","props":{"y":134,"x":77,"text":"恭喜获得","fontSize":30,"color":"#8a7da5"}},{"type":"Label","props":{"y":124,"x":207,"var":"coingiftText","text":"9999金币","fontSize":45,"color":"#ffb910"}}]},{"type":"Box","props":{"x":10,"width":468,"var":"giftDialog","centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":468,"skin":"game/goodDialog2.png","sizeGrid":"100,45,45,45","height":299}},{"type":"Label","props":{"y":152,"x":65,"text":"恭喜获得                   ","fontSize":30,"color":"#8a7da5"}},{"type":"Label","props":{"y":146,"x":196.99999999999994,"var":"giftName","text":"IPhone6S","fontSize":37,"color":"#ffb910"}},{"type":"Label","props":{"y":218,"text":"恭喜获可在我的兑换订单中查看，有效期30天。","fontSize":18,"color":"#11d1cf","centerX":0.0107421875}},{"type":"Image","props":{"y":390,"var":"continueBtn","skin":"game/continueBtn.png","centerX":120,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":390,"var":"goBtn","skin":"game/goBtn.png","centerX":-120,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":671,"x":320,"var":"sureBtn","skin":"game/sureBtn.png","centerX":0,"anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.dialogUI.uiView);
        }
    }
}

module ui {
    export class gameViewUI extends View {
		public bg:Laya.Image;
		public inContent:Laya.Box;
		public mountain:Laya.Image;
		public track2:Laya.Image;
		public floor2:Laya.Image;
		public track:Laya.Image;
		public reward1:Laya.Image;
		public reward2:Laya.Image;
		public reward3:Laya.Image;
		public star:Laya.Image;
		public clawLine:Laya.Box;
		public line:Laya.Image;
		public claw:Laya.Box;
		public rightClaw:Laya.Image;
		public leftClaw:Laya.Image;
		public clawF:Laya.Image;
		public outBg:Laya.Image;
		public coinPic:Laya.Box;
		public coinNum:Laya.Label;
		public coinBtn:Laya.Image;
		public coin:Laya.Image;
		public leftFire:Laya.Animation;
		public rightFire:Laya.Animation;
		public logo:Laya.Image;
		public listBtn:Laya.Image;
		public ruleBtn:Laya.Image;
		public soundBtn:Laya.Image;
		public advanceBtn:Laya.Box;
		public advancePic:Laya.Image;
		public advanceNum:Laya.Label;
		public normalBtn:Laya.Box;
		public normalPic:Laya.Image;
		public normalNum:Laya.Label;
		public freeBtn:Laya.Image;
		public freePic:Laya.Box;
		public freeNum:Laya.Label;
		public energyBtn:Laya.Box;
		public energyBtn_l:Laya.Image;
		public startBtn:Laya.Box;
		public rewardInforGroup:Laya.Panel;
		public star2:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"var":"bg","skin":"game/bg.png","centerX":0,"bottom":0}},{"type":"Box","props":{"x":0,"width":640,"var":"inContent","height":1136,"bottom":0},"child":[{"type":"Image","props":{"y":536,"x":0,"skin":"game/floor2.png"}},{"type":"Image","props":{"y":441,"x":27,"var":"mountain","skin":"game/mountain.png"}},{"type":"Image","props":{"y":573,"x":18,"var":"track2","skin":"game/track1_2.png"}},{"type":"Image","props":{"y":749,"x":17.000000000000043,"var":"floor2","skin":"game/frontFloor.png"}},{"type":"Image","props":{"y":777,"x":15,"var":"track","skin":"game/track1.png"}},{"type":"Image","props":{"y":901.9999999999998,"x":208,"var":"reward1","skin":"game/darkpic.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":901.9999999999998,"x":290.00000000000006,"var":"reward2","skin":"game/darkpic.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":901.9999999999998,"x":372,"var":"reward3","skin":"game/darkpic.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":901,"x":440,"var":"star","skin":"game/star.png","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":-609,"width":100,"var":"clawLine","height":830,"centerX":0},"child":[{"type":"Image","props":{"var":"line","skin":"game/line.png","centerX":0}},{"type":"Box","props":{"y":780,"width":100,"var":"claw","scaleY":1,"scaleX":1,"height":150,"centerX":0,"anchorX":0.5},"child":[{"type":"Image","props":{"y":4,"skin":"game/clawB.png","centerX":0.5}},{"type":"Image","props":{"y":33,"x":65.89909835192596,"var":"rightClaw","skin":"game/clawright.png","rotation":20}},{"type":"Image","props":{"y":33,"x":35.89909835192596,"var":"leftClaw","skin":"game/clawleft.png","rotation":-20,"anchorY":0,"anchorX":1}},{"type":"Image","props":{"x":31.899098351925957,"var":"clawF","skin":"game/clawF.png","centerX":0.5}}]}]}]},{"type":"Image","props":{"var":"outBg","skin":"game/outBg.png","sizeGrid":"115,60,238,60","centerX":0,"bottom":0}},{"type":"Box","props":{"y":131,"x":40,"width":215,"var":"coinPic","height":60},"child":[{"type":"Image","props":{"skin":"game/coinDi.png"}},{"type":"Label","props":{"y":10.000000000000057,"x":50,"var":"coinNum","valign":"middle","text":"000000000","height":30,"fontSize":20,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":27.000000000000114,"x":186.00000000000009,"var":"coinBtn","skin":"game/buyCoinBtn.png","anchorY":0.47,"anchorX":0.5}},{"type":"Image","props":{"y":25.000000000000114,"x":27.999999999999986,"var":"coin","skin":"game/coin.png","anchorY":0.43,"anchorX":0.5}}]},{"type":"Animation","props":{"y":317,"x":138,"var":"leftFire","source":"fire.ani"}},{"type":"Animation","props":{"y":317,"x":510.00000000000006,"var":"rightFire","source":"fire.ani"}},{"type":"Image","props":{"var":"logo","top":-12,"skin":"game/freelogo.png","centerX":0.5}},{"type":"Image","props":{"y":160,"x":435,"var":"listBtn","skin":"game/listBtn.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":160,"x":495,"var":"ruleBtn","skin":"game/ruleBtn.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":160,"x":555,"var":"soundBtn","skin":"game/sound_on.png","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"x":269,"var":"advanceBtn","bottom":30,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"var":"advancePic","skin":"game/800Btn_b.png"}},{"type":"Label","props":{"var":"advanceNum","text":"800","fontSize":35,"color":"#959595","centerY":0,"centerX":0}}]},{"type":"Box","props":{"x":173,"var":"normalBtn","bottom":30,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"var":"normalPic","skin":"game/300Btn_b.png"}},{"type":"Label","props":{"var":"normalNum","text":"300","fontSize":35,"color":"#959595","centerY":0,"centerX":0}}]},{"type":"Image","props":{"x":77,"var":"freeBtn","skin":"game/freeBtn.png","bottom":30,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"x":71.00000000000009,"width":59,"var":"freePic","height":38,"bottom":85},"child":[{"type":"Image","props":{"y":18,"x":29,"skin":"game/freePic.png","anchorY":0.4,"anchorX":0.5}},{"type":"Label","props":{"y":10,"x":13,"width":30.533203125,"var":"freeNum","height":18,"fontSize":18,"color":"#ffffff"}}]},{"type":"Box","props":{"x":462,"width":284,"var":"energyBtn","height":95,"bottom":22,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"game/startBtn_d.png"}},{"type":"Image","props":{"var":"energyBtn_l","skin":"game/startBtn_l.png"}},{"type":"Label","props":{"width":256,"text":"长按加速","height":50,"fontSize":50,"color":"#ffffff","centerY":0.5,"centerX":0,"align":"center"}}]},{"type":"Box","props":{"y":1067,"x":461.99999999999994,"width":284,"var":"startBtn","height":95,"bottom":22,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"skin":"game/startBtn_l.png"}},{"type":"Label","props":{"width":256,"text":"开 始","height":50,"fontSize":50,"color":"#ffffff","centerY":0.5,"centerX":0,"align":"center"}}]},{"type":"Panel","props":{"x":0,"width":640,"var":"rewardInforGroup","height":62,"bottom":131}},{"type":"Box","props":{"x":0,"width":640,"height":62,"bottom":131}},{"type":"Image","props":{"y":901,"x":440.00000000000017,"var":"star2","skin":"game/star.png","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameViewUI.uiView);
        }
    }
}

module ui {
    export class listInforUI extends View {
		public bg:Laya.Image;
		public prizeName:Laya.Label;
		public status:Laya.Label;
		public time:Laya.Label;
		public cost:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":525,"height":90},"child":[{"type":"Image","props":{"width":525,"var":"bg","skin":"game/listlight.png","height":90,"centerY":0,"centerX":0}},{"type":"Label","props":{"y":13,"x":30,"width":234,"var":"prizeName","valign":"middle","text":"奖品名称","height":30,"fontSize":30,"color":"#8e84a2","align":"left"}},{"type":"Label","props":{"y":13,"x":374,"width":121,"var":"status","valign":"middle","text":"未夹中","right":30,"height":30,"fontSize":30,"color":"#8e84a2","align":"right"}},{"type":"Label","props":{"y":52,"x":30,"width":181,"var":"time","valign":"top","text":"03-05  12:20","height":30,"fontSize":25,"color":"#8e84a2","bold":true,"align":"left"}},{"type":"Label","props":{"y":52,"x":242,"width":253,"var":"cost","valign":"middle","text":"消耗xxx金币","right":30,"height":30,"fontSize":23,"color":"#8e84a2","align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.listInforUI.uiView);
        }
    }
}

module ui {
    export class listViewUI extends View {
		public list:Laya.Box;
		public listInforGroup:Laya.Panel;
		public di:Laya.Image;
		public closeBtn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Box","props":{"width":640,"var":"list","height":1136,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Panel","props":{"y":256.00000000000006,"x":57.999999999999886,"width":525,"var":"listInforGroup","vScrollBarSkin":"game/vscroll.png","height":632,"centerX":0}},{"type":"Image","props":{"y":-101,"x":-22,"var":"di","skin":"game/listBg.png","centerY":-53,"centerX":0}},{"type":"Image","props":{"y":-101,"x":-22,"var":"closeBtn","skin":"game/closeBtn.png","centerY":432,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.listViewUI.uiView);
        }
    }
}

module ui {
    export class loadViewUI extends View {
		public loadingbg:Laya.Image;
		public loading:Laya.Image;
		public chickrun:Laya.Animation;
		public word:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":550,"var":"loadingbg","skin":"loading/loadingBar.png","centerX":0}},{"type":"Image","props":{"y":555,"x":160,"var":"loading","skin":"loading/loadingBar2.png","centerX":0}},{"type":"Animation","props":{"y":562,"x":182,"var":"chickrun","source":"chickrun.ani","scaleY":0.6,"scaleX":0.6}},{"type":"Label","props":{"y":611,"width":233,"var":"word","text":"0%","height":30,"fontSize":30,"color":"#fecb00","centerX":0,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loadViewUI.uiView);
        }
    }
}

module ui {
    export class rewardInforUI extends View {
		public word:Laya.Label;
		public pic:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":62},"child":[{"type":"Image","props":{"visible":true,"skin":"game/icon.png","centerY":0,"centerX":-250}},{"type":"Label","props":{"x":105,"width":367,"var":"word","valign":"middle","text":"小葵葵葵葵运气爆棚，中了小米5S一台。","height":32,"fontSize":22,"color":"#c58745","centerY":0}},{"type":"Image","props":{"width":44,"visible":true,"var":"pic","skin":"game/icon_pic.png","height":44,"centerY":0,"centerX":-250}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.rewardInforUI.uiView);
        }
    }
}

module ui {
    export class ruleViewUI extends View {
		public rule:Laya.Box;
		public closeBtn:Laya.Image;
		public di:Laya.Image;
		public ruleInfor:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Box","props":{"width":640,"var":"rule","height":1136,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-15,"x":-25,"var":"closeBtn","skin":"game/closeBtn.png","centerY":432,"centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-15,"x":-25,"var":"di","skin":"game/ruleBg.png","centerY":-53,"centerX":0}},{"type":"Panel","props":{"y":280,"x":117.00000000000006,"width":406,"var":"ruleInfor","vScrollBarSkin":"game/vscroll.png","height":533,"centerX":0}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ruleViewUI.uiView);
        }
    }
}
