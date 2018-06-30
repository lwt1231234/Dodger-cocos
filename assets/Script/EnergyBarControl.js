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
        EnergyNow: {
            default: null,
            type: cc.Node,
        },
        Label: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    UpdateData:function(now,max){
        let maxLength = 50;
        let nowLength = maxLength*now/max;
        this.EnergyNow.width=nowLength;

        let tmp = (Math.floor(now*10)/10).toString();
        if(tmp.length<3)
            tmp+='.0';
        this.Label.string = tmp;
    },

    EnergyBarFlash: function(num){
        if(num>0){
            this.EnergyNow.color = new cc.color(245,62,62);
            this.Label.node.color = new cc.color(245,62,62);
            this.scheduleOnce(function() {
                        this.EnergyBarFlashEnd(num);
                        }, 0.2);
        }
        
    },

    EnergyBarFlashEnd: function(num){
        this.EnergyNow.color = new cc.color(128,227,255);
        this.Label.node.color = new cc.color(255,255,255);
        this.scheduleOnce(function() {
                    this.EnergyBarFlash(num-1);
                    }, 0.2);
    },

    // update (dt) {},
});
