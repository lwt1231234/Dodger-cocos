"use strict";
cc._RF.push(module, '8e45ceGcldKVbfIk1i5rKq7', 'BulletControl');
// Script/BulletControl.js

'use strict';

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    properties: (_properties = {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false
        },
        NormalBulletSpeed: {
            default: null,
            visible: false
        },
        GameSpeedThis: {
            default: null,
            visible: false
        }

    }, _defineProperty(_properties, 'GameSpeedThis', {
        default: null,
        visible: false
    }), _defineProperty(_properties, 'Enlargex', {
        default: null,
        visible: false
    }), _defineProperty(_properties, 'Enlargey', {
        default: null,
        visible: false
    }), _properties),

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.GameManager = cc.find("GameManager");
        var BulletLifeTime = this.GameManager.getComponent('GameManager').BulletLifeTime;
        this.scheduleOnce(function () {
            this.TImeOut();
        }, BulletLifeTime);
        this.GameSpeedThis = 1;
        this.Enlargex = false;
        this.Enlargey = false;
    },

    start: function start() {},
    TImeOut: function TImeOut() {
        this.node.destroy();
    },
    update: function update(dt) {
        var GameSpeed = this.GameManager.getComponent('GameManager').GameSpeed;
        if (this.GameSpeedThis == 1 && GameSpeed != 1) {
            var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
            var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed * GameSpeed, yspeed * GameSpeed);
            this.GameSpeedThis = GameSpeed;
        }
        if (this.GameSpeedThis != 1 && GameSpeed == 1) {
            var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
            var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed / this.GameSpeedThis, yspeed / this.GameSpeedThis);
            this.GameSpeedThis = 1;
        }
    },


    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
        if (xspeed < 33 && xspeed > -33) {
            xspeed *= 10;
            this.Enlargex = true;
        }

        var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;

        if (yspeed < 33 && yspeed > -33) {
            yspeed *= 10;
            this.Enlargey = true;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed, yspeed);
    },

    onEndContact: function onEndContact(contact, selfCollider, otherCollider) {
        var xspeed = this.node.getComponent(cc.RigidBody).linearVelocity.x;
        if (this.Enlargex) {
            xspeed /= 10;
            this.Enlargex = false;
        }
        var yspeed = this.node.getComponent(cc.RigidBody).linearVelocity.y;

        if (this.Enlargey) {
            yspeed /= 10;
            this.Enlargey = false;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(xspeed, yspeed);
    }
});

cc._RF.pop();