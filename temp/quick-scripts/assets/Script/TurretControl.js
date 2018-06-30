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

    onLoad: function onLoad() {
        this.GameManager = cc.find("Canvas/GameManager");
        //this.GameInit();
        this.ShootTimer = 999;
    },

    start: function start() {},
    GameInit: function GameInit() {
        this.BulletParent = new cc.Node("BulletParent");
        this.BulletParent.x = 0;
        this.BulletParent.y = 0;
        this.BulletParent.parent = this.GameManager;
        this.BulletParent.x = 0;
        this.BulletParent.y = 0;
        this.CreateBullet();
    },


    GameReset: function GameReset() {
        //this.BulletParent.destroy();
    },

    update: function update(dt) {
        if (!this.GameManager.getComponent('GameManager').GamePause) {
            var GameSpeed = this.GameManager.getComponent('GameManager').GameSpeed;

            var RotationSpeed = this.GameManager.getComponent('GameManager').RotationSpeed;
            RotationSpeed = RotationSpeed * GameSpeed;
            this.node.rotation += dt * RotationSpeed;

            if (this.GameManager.getComponent('GameManager').Skill_1_Active) {
                this.ShootTimer -= dt / 2 * GameSpeed;
            } else this.ShootTimer -= dt * GameSpeed;
            if (this.ShootTimer <= 0) {
                this.CreateBullet();
            }
        }
    },

    CreateBullet: function CreateBullet() {
        var newBullet = cc.instantiate(this.BulletPrefab);
        newBullet.x = 0;
        newBullet.y = 0;
        newBullet.parent = this.BulletParent;
        //子弹速度
        var BulletSpeed = this.GameManager.getComponent('GameManager').BulletSpeed;
        newBullet.getComponent('BulletControl').BulletSpeed = BulletSpeed;

        var GameSpeed = this.GameManager.getComponent('GameManager').GameSpeed;
        newBullet.getComponent('BulletControl').GameSpeed = GameSpeed;

        BulletSpeed = BulletSpeed * GameSpeed;
        newBullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(cc.pForAngle(this.node.rotation * Math.PI / 180).y * BulletSpeed, cc.pForAngle(this.node.rotation * Math.PI / 180).x * BulletSpeed);
        newBullet.getComponent('BulletControl').Angle = this.node.rotation * Math.PI / 180;

        var BulletScale = this.GameManager.getComponent('GameManager').BulletScale;
        newBullet.scale = cc.v2(BulletScale, BulletScale);
        //发射频率
        var ShootSpeed = this.GameManager.getComponent('GameManager').ShootSpeed;
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
        