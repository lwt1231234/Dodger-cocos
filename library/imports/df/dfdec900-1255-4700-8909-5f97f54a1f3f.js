"use strict";
cc._RF.push(module, 'dfdeckAElVHAIkJX5f1Sh8/', 'TurretControl');
// Script/TurretControl.js

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
            type: cc.Node,
            visible: false
        },

        BulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        ShootTimer: {
            default: null,
            visible: false
        },
        BulletParent: {
            default: null,
            visible: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},

    start: function start() {
        this.GameManager = cc.find("GameManager");
        this.GameInit();
    },
    GameInit: function GameInit() {
        this.BulletParent = new cc.Node("BulletParent");
        this.BulletParent.parent = this.node;
        this.BulletParent.x = 0;
        this.BulletParent.y = 0;
        this.CreateBullet();
        this.ShootTimer = 0;
    },


    GameReset: function GameReset() {
        this.BulletParent.destroy();
        this.GameInit();
    },

    update: function update(dt) {

        var RotationSpeed = this.GameManager.getComponent('GameManager').RotationSpeed;
        RotationSpeed = 10 + RotationSpeed;
        RotationSpeed = RotationSpeed * this.GameManager.getComponent('GameManager').GameSpeed;
        this.node.rotation += dt * RotationSpeed;

        this.ShootTimer -= dt * this.GameManager.getComponent('GameManager').GameSpeed;
        if (this.ShootTimer <= 0) {
            this.CreateBullet();
        }
    },

    CreateBullet: function CreateBullet() {
        var newBullet = cc.instantiate(this.BulletPrefab);
        newBullet.x = 0;
        newBullet.y = 0;
        newBullet.parent = this.BulletParent;

        var BulletSpeed = this.GameManager.getComponent('GameManager').BulletSpeed;
        BulletSpeed = 100 + 10 * BulletSpeed;
        newBullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(cc.pForAngle(this.node.rotation * Math.PI / 180).y * BulletSpeed, cc.pForAngle(this.node.rotation * Math.PI / 180).x * BulletSpeed);

        var ShootSpeed = this.GameManager.getComponent('GameManager').ShootSpeed;
        ShootSpeed = 2 * 10 / (10 + ShootSpeed);
        this.ShootTimer = ShootSpeed;
    }
});

cc._RF.pop();