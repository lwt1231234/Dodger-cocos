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
        BulletSpeed: {
            default: null,
            visible: false,
        },
        GameSpeed: {
            default: null,
            visible: false,
        },
        Angle: {
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
        this.Player = cc.find("Canvas/GameArea/Player");
        this.BulletLifeTime = this.GameManager.getComponent('GameManager').BulletLifeTime;
        
        this.Enlargex =false;
        this.Enlargey =false;
     },

    start () {

    },

    TImeOut(){
        this.node.destroy();
    },

    update (dt) {
        this.BulletLifeTime -= dt;
        if(this.BulletLifeTime <=0){
            this.node.destroy();
        }
        let GameSpeedNow = 1;
        if(this.GameManager.getComponent('GameManager').GamePause)
            GameSpeedNow = 0;
        else
        {
            if(this.GameManager.getComponent('GameManager').Skill_1_Active){
                let xx = this.Player.getPosition().x - this.node.x;
                let yy = this.Player.getPosition().y - this.node.y;
                let distance = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));

                let distance_zero = 1;
                let distance_max = 700;
                if(distance <distance_zero){
                    GameSpeedNow = 0;
                    this.BulletLifeTime -= dt;
                }
                if(distance >=  distance_zero && distance < distance_max){
                    GameSpeedNow = (distance - distance_zero)/(distance_max - distance_zero);
                    this.BulletLifeTime -= dt;
                }
                if(distance >= distance_max)
                    GameSpeedNow = 1;
            }
            else
                GameSpeedNow = 1;
        }
        //cc.log(1,GameSpeedNow);
        if(GameSpeedNow!=this.GameSpeed){
            let xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
            let yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;
            if(GameSpeedNow == 0){
                this.Angle = Math.atan2(yspeed, xspeed);
                
            }
            if(this.GameSpeed ==0){
                xspeed = Math.cos(this.Angle)*this.BulletSpeed;
                yspeed = Math.sin(this.Angle)*this.BulletSpeed;
            }
            else{
                this.Angle = Math.atan2(yspeed, xspeed);
                xspeed = xspeed/this.GameSpeed;
                yspeed = yspeed/this.GameSpeed;
            }
            xspeed *= GameSpeedNow;
            yspeed *= GameSpeedNow;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed,yspeed);
            this.GameSpeed = GameSpeedNow;
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
        if(otherCollider.node.name=='Player'){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            return;
            //this.node.color = new cc.color(255,255,255);
        }
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