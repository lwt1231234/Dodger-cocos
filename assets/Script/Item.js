var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        Type: {
            default: Common.ItemType.upRotationSpeed,
            type: Common.ItemType,
            displayName: '类型',
        },
        LifeTime: {
            default: null,
            visible: false,
        }, 
        laberTimer: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.GameManager = cc.find("GameManager");
        if(this.Type<Common.ItemType.upPlayerSpeed)
            this.LifeTime = this.GameManager.getComponent('GameManager').ItemLifeTime1;
        else
            this.LifeTime = this.GameManager.getComponent('GameManager').ItemLifeTime2;
        if(this.LifeTime == 0)
            this.laberTimer.string = '';
        else
            this.laberTimer.string = this.LifeTime.toString();
    },

     update (dt) {
        if(this.LifeTime>0&&!this.GameManager.getComponent('GameManager').GamePause)
        {
            this.LifeTime-= dt*this.GameManager.getComponent('GameManager').GameSpeed;
            if(this.LifeTime <0){
                if(this.Type<Common.ItemType.upPlayerSpeed)
                    this.GameManager.getComponent('GameManager').SwapBadItem();
                else
                    this.GameManager.getComponent('GameManager').SwapGoodItem();
                this.node.destroy();
            }
            else
                this.laberTimer.string = Math.floor(this.LifeTime).toString();
        }

     },
});
