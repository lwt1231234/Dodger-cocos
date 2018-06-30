(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/BulletControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8e45ceGcldKVbfIk1i5rKq7', 'BulletControl', __filename);
// Script/BulletControl.js

"use strict";

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
            type: cc.Node
        },
        BulletSpeed: {
            default: null,
            visible: false
        },
        GameSpeed: {
            default: null,
            visible: false
        },
        Angle: {
            default: null,
            visible: false
        },
        Enlargex: {
            default: null,
            visible: false
        },
        Enlargey: {
            default: null,
            visible: false
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.GameManager = cc.find("Canvas/GameManager");
        this.Player = cc.find("Canvas/GameArea/Player");
        this.BulletLifeTime = this.GameManager.getComponent('GameManager').BulletLifeTime;

        this.Enlargex = false;
        this.Enlargey = false;
        this.Used = false;
    },

    start: function start() {},
    TImeOut: function TImeOut() {
        this.node.destroy();
    },
    update: function update(dt) {
        this.BulletLifeTime -= dt;
        if (this.BulletLifeTime <= 0) {
            if (this.GameManager.getComponent('GameManager').GameSpeed > 0) this.node.destroy();
        }
        var GameSpeedNow = 1;
        if (this.GameManager.getComponent('GameManager').GamePause) GameSpeedNow = 0;else {
            if (this.GameManager.getComponent('GameManager').Skill_1_Active) {
                var xx = this.Player.getPosition().x - this.node.x;
                var yy = this.Player.getPosition().y - this.node.y;
                var distance = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));

                var distance_zero = 1;
                var distance_max = 700;
                if (distance < distance_zero) {
                    GameSpeedNow = 0;
                    this.BulletLifeTime -= dt;
                }
                if (distance >= distance_zero && distance < distance_max) {
                    GameSpeedNow = (distance - distance_zero) / (distance_max - distance_zero);
                    this.BulletLifeTime -= dt;
                }
                if (distance >= distance_max) GameSpeedNow = 1;
            } else GameSpeedNow = this.GameManager.getComponent('GameManager').GameSpeed;
        }
        //cc.log(1,GameSpeedNow);
        if (GameSpeedNow != this.GameSpeed) {
            var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
            var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;
            if (GameSpeedNow == 0) {
                this.Angle = Math.atan2(yspeed, xspeed);
            }
            if (this.GameSpeed == 0) {
                xspeed = Math.cos(this.Angle) * this.BulletSpeed;
                yspeed = Math.sin(this.Angle) * this.BulletSpeed;
            } else {
                this.Angle = Math.atan2(yspeed, xspeed);
                xspeed = xspeed / this.GameSpeed;
                yspeed = yspeed / this.GameSpeed;
            }
            xspeed *= GameSpeedNow;
            yspeed *= GameSpeedNow;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed, yspeed);
            this.GameSpeed = GameSpeedNow;
        }
    },


    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == 'Player') {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            return;
            //this.node.color = new cc.color(255,255,255);
        }
        var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
        if (xspeed < 33 && xspeed >= 0) {
            xspeed += 35;
            this.Enlargex = true;
        }
        if (xspeed > -33 && xspeed <= 0) {
            xspeed -= 35;
            this.Enlargex = true;
        }

        var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;

        if (yspeed < 33 && yspeed >= 0) {
            yspeed += 35;
            this.Enlargey = true;
        }
        if (yspeed > -33 && yspeed <= 0) {
            yspeed -= 35;
            this.Enlargey = true;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed, yspeed);
    },

    onEndContact: function onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == 'Player') {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            return;
            //this.node.color = new cc.color(255,255,255);
        }
        var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
        if (this.Enlargex) {
            if (xspeed > 0) xspeed -= 35;else xspeed += 35;
            this.Enlargex = false;
        }
        var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;

        if (this.Enlargey) {
            if (yspeed > 0) yspeed -= 35;else yspeed += 35;
            this.Enlargey = false;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed, yspeed);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=BulletControl.js.map
        