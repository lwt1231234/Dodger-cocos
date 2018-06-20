var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        Type: {
            default: Common.DieActionType.Up,
            type: Common.DieActionType,
            displayName: '类型',
        },
        Die1: {
            default: null,
            type: cc.Node,
        },
        Die2: {
            default: null,
            type: cc.Node,
        },
        Die3: {
            default: null,
            type: cc.Node,
        },
        Die4: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    LetDie: function(){
        this.Die1.active = true;
        this.Die1.getComponent('DieAction').Die();
        this.Die2.active = true;
        this.Die2.getComponent('DieAction').Die();
        this.Die3.active = true;
        this.Die3.getComponent('DieAction').Die();
        this.Die4.active = true;
        this.Die4.getComponent('DieAction').Die();
    },

    Die: function(){
        this.node.setPosition(0,0);
        if(this.Type == 0)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(100,0);
        if(this.Type == 1)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-100,0);
        if(this.Type == 2)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,100);
        if(this.Type == 3)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,-100);
        this.scheduleOnce(function() {
                    this.node.active = false;
                    }, 2);
    },

    // update (dt) {},
});
