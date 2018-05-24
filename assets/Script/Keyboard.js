// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        Input :{
            default: null,
            visible: false,
        },
        Up :{
            default: null,
            visible: false,
        },
        Right :{
            default: null,
            visible: false,
        },
        Angle :{
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.GameManager = cc.find("Canvas/GameManager");
        this.Input = false;
        this.Right = 0;
        this.Up = 0;

        this.setInputControl();
    },

    // update (dt) {},

    setInputControl: function () {
        var self = this;
        // 添加键盘事件监听
        // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event){
            switch(event.keyCode) {
                case cc.KEY.up:
                    self.Up = 1;
                    break;
                case cc.KEY.down:
                    self.Up = -1;
                    break;
                case cc.KEY.left:
                    self.Right = -1;
                    break;
                case cc.KEY.right:
                    self.Right = 1;
                    break;
                case cc.KEY.space:
                    self.getComponent('GameManager').Skill_1_On = true;
                    break;
            }
            self.Angle = Math.atan2(self.Up, self.Right) * (180/Math.PI);
            if(self.Up ==0 && self.Right == 0)
                self.Input = false;
            else
                self.Input = true;
        });

        // 松开按键时，停止向该方向的加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event){
            switch(event.keyCode) {
                case cc.KEY.up:
                    self.Up = 0;
                    break;
                case cc.KEY.down:
                    self.Up = 0;
                    break;
                case cc.KEY.left:
                    self.Right = 0;
                    break;
                case cc.KEY.right:
                    self.Right = 0;
                    break;
                case cc.KEY.space:
                    self.getComponent('GameManager').Skill_1_On = false;
                    break;
            }
            self.Angle = Math.atan2(self.Up, self.Right) * (180/Math.PI);
            if(self.Up ==0 && self.Right == 0)
                self.Input = false;
            else
                self.Input = true;
            
        });
    },
});
