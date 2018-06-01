(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/TurretControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dfdeckAElVHAIkJX5f1Sh8/', 'TurretControl', __filename);
// Script/TurretControl.js

"use strict";

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
        this.GameManager = cc.find("Canvas/GameManager");
        //this.GameInit();
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
        BulletSpeed = 200 + 5 * BulletSpeed;
        newBullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(cc.pForAngle(this.node.rotation * Math.PI / 180).y * BulletSpeed, cc.pForAngle(this.node.rotation * Math.PI / 180).x * BulletSpeed);

        var BulletScale = this.GameManager.getComponent('GameManager').Score;
        BulletScale = 20 / (20 + BulletScale) + 0.2;

        newBullet.scale = cc.v2(BulletScale, BulletScale);

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
        