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
        },
        NormalBulletSpeed: {
            default: null,
            visible: false,
        },
        GameSpeedThis: {
            default: null,
            visible: false,
        },

        GameSpeedThis: {
            default: null,
            visible: false,
        },
        Enlargex: {
            default: null,
            visible: false,
        },
        Enlargey: {
            default: null,
            visible: false,
        },

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad :function() {
        this.GameManager = cc.find("Canvas/GameManager");
        var BulletLifeTime = this.GameManager.getComponent('GameManager').BulletLifeTime;
        this.scheduleOnce(function(){this.TImeOut();}, BulletLifeTime);
        this.GameSpeedThis = 1;
        this.Enlargex =false;
        this.Enlargey =false;
     },

    start () {

    },

    TImeOut(){
        this.node.destroy();
    },

    update (dt) {
        var GameSpeed = this.GameManager.getComponent('GameManager').GameSpeed;
        if(this.GameSpeedThis ==1 && GameSpeed != 1){
            var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
            var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed*GameSpeed,yspeed*GameSpeed);
            this.GameSpeedThis = GameSpeed;
        }
        if(this.GameSpeedThis !=1 && GameSpeed == 1){
            var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
            var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed/this.GameSpeedThis,yspeed/this.GameSpeedThis);
            this.GameSpeedThis = 1;
        }
        if(this.GameSpeedThis !=1 && GameSpeed == 0){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            this.GameSpeedThis = 1;
        }
        
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
        if(xspeed<33&&xspeed>=0){
            xspeed +=35;
            this.Enlargex = true;
        }
        if(xspeed>-33&&xspeed<=0){
            xspeed -=35;
            this.Enlargex = true;
        }

        var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;

        if(yspeed<33&&yspeed>=0){
            yspeed +=35;
            this.Enlargey = true;
        }
        if(yspeed>-33&&yspeed<=0){
            yspeed -=35;
            this.Enlargey = true;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed,yspeed);
    },

    onEndContact: function (contact, selfCollider, otherCollider) {
        var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
        if(this.Enlargex){
            if(xspeed>0)
                xspeed-=35;
            else
                xspeed+=35;
            this.Enlargex = false;
        }
        var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;

        if(this.Enlargey){
            if(yspeed>0)
                yspeed-=35;
            else
                yspeed+=35;
            this.Enlargey = false;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed,yspeed);
    },
});