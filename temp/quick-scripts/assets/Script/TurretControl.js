(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/TurretControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dfdeckAElVHAIkJX5f1Sh8/', 'TurretControl', __filename);
// Script/TurretControl.js

'use strict';

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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},

    start: function start() {
        this.GameManager = cc.find("GameManager");
        this.CreateBullet();
        this.ShootTimer = 0;
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

    Rotate: function Rotate() {
        //var action = cc.rotateBy(30);
        //this.node.runAction(action);
    },
    CreateBullet: function CreateBullet() {
        var newBullet = cc.instantiate(this.BulletPrefab);
        newBullet.x = 0;
        newBullet.y = 0;
        newBullet.parent = this.node;

        var BulletSpeed = this.GameManager.getComponent('GameManager').BulletSpeed;
        BulletSpeed = 100 + 10 * BulletSpeed;
        newBullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(cc.pForAngle(this.node.rotation * Math.PI / 180).y * BulletSpeed, cc.pForAngle(this.node.rotation * Math.PI / 180).x * BulletSpeed);

        var ShootSpeed = this.GameManager.getComponent('GameManager').ShootSpeed;
        ShootSpeed = 2 * 10 / (10 + ShootSpeed);
        this.ShootTimer = ShootSpeed;
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
        //# sourceMappingURL=TurretControl.js.map
        