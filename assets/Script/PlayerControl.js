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
        if(otherCollider.node.name=='Bullet')
            otherCollider.node.destroy();
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

        }
    },
    // update (dt) {},
});
