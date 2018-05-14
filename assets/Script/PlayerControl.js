var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        ItemLock :{
            default: null,
            visible: false,
        },
        Timer :{
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.GameManager = cc.find("GameManager");
        this.ItemLock = false;
    },

        UnlockItemLock :function(){
        this.ItemLock = false;
    },

    onPreSolve: function (contact, selfCollider, otherCollider) {
        if(this.GameManager.getComponent('GameManager').GamePause)
            return;
        if(otherCollider.node.name=='Bullet'){
            otherCollider.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            this.GameManager.getComponent('GameManager').GameOver();
        }
        if(otherCollider.node.getComponent('Item')!=null){
            if(this.ItemLock)
                return;
            else{
                this.ItemLock = true;
                this.scheduleOnce(function() {
                    this.UnlockItemLock();
                    }, 0.1);
            }
            otherCollider.node.destroy();
            var Item = otherCollider.node.getComponent('Item')
            if(Item.Type == Common.ItemType.upRotationSpeed)
                this.GameManager.getComponent('GameManager').upRotationSpeed();
            if(Item.Type == Common.ItemType.upShootSpeed)
                this.GameManager.getComponent('GameManager').upShootSpeed();
            if(Item.Type == Common.ItemType.upBulletSpeed)
                this.GameManager.getComponent('GameManager').upBulletSpeed();
            if(Item.Type == Common.ItemType.upBulletLifeTime)
                this.GameManager.getComponent('GameManager').upBulletLifeTime();
            if(Item.Type == Common.ItemType.upPlayerSpeed)
                this.GameManager.getComponent('GameManager').upPlayerSpeed();
            if(Item.Type == Common.ItemType.upSkill_1_MAX)
                this.GameManager.getComponent('GameManager').upSkill_1_MAX();

        }
    },
    // update (dt) {},
});
