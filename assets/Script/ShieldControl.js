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
        Timer :{
            default: null,
            visible: false,
        },
        Timer2 :{
            default: null,
            visible: false,
        },
        LoseShield:{
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.GameManager = cc.find("Canvas/GameManager");
        this.Timer = -1;
        this.Timer2 = -1;
        this.LoseShield = false;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    update (dt) {
        if(this.Timer>0)
        {
            this.LoseShield = true;
            this.Timer-=dt;
            var tmp = this.node.scale;
            this.node.scale=cc.v2(tmp+dt*50,tmp+dt*50);
            if(this.Timer<=0){
                this.Timer2 = 0.1;
            }
        }
        if(this.Timer2 >0){
            this.Timer2-=dt;
            if(this.Timer2<=0){
                this.node.active = false;
                this.node.scale=cc.v2(1,1);
                this.LoseShield = false;
            }
        }
    },

    onCollisionEnter: function (other, self) {
        if(this.GameManager.getComponent('GameManager').GamePause)
            return;
        if(other.node.name=='Bullet'){
            if(this.LoseShield)
                other.node.destroy();
        }
    },
});
