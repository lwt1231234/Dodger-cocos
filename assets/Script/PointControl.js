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
        target: {
            default: null,
            type: cc.Node,
        },
        targetPos:{
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.targetPos = this.target.getPosition();
        this.targetPos.x+=this.target.parent.getPosition().x;
        this.targetPos.y+=this.target.parent.getPosition().y;

        var thisPos = this.node.getPosition();

        var angle = Math.atan2(this.targetPos.y - thisPos.y, this.targetPos.x - thisPos.x);
        this.node.getComponent(cc.RigidBody).linearVelocity 
            = cc.v2(Math.cos(angle) * 800, Math.sin(angle) * 800);

    },

    update (dt) {
        var dist = cc.pDistance(this.node.position, this.targetPos);
        if(dist<10)
            this.node.destroy();
    },
});
