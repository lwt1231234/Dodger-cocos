(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b3132qQpsJFSYeIwvqZPTi4', 'GameManager', __filename);
// Script/GameManager.js

'use strict';

var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        //玩家属性
        PlayerSpeed1: {
            default: null,
            visible: false
        },
        PlayerSpeed2: {
            default: null,
            visible: false
        },
        label_PlayerSpeed: {
            default: null,
            type: cc.Label
        },

        Skill_1_On: {
            default: null,
            visible: false
        },
        Skill_1_Level: {
            default: null,
            visible: false
        },
        Skill_1_Time: {
            default: null,
            visible: false
        },
        label_Skill_1_Time: {
            default: null,
            type: cc.Label
        },
        Skill_1_Max: {
            default: null,
            visible: false
        },
        GameSpeed: {
            default: null,
            visible: false
        },
        GamePause: {
            default: null,
            visible: false
        },
        //难度属性
        RotationSpeed: {
            default: null,
            visible: false
        },
        label_RotationSpeed: {
            default: null,
            type: cc.Label
        },
        ShootSpeed: {
            default: null,
            visible: false
        },
        label_ShootSpeed: {
            default: null,
            type: cc.Label
        },
        BulletSpeed: {
            default: null,
            visible: false
        },
        label_BulletSpeed: {
            default: null,
            type: cc.Label
        },
        BulletLifeTime: {
            default: null,
            visible: false
        },
        label_BulletLifeTime: {
            default: null,
            type: cc.Label
        },

        ItemLifeTime1: {
            default: null,
            visible: false
        },
        ItemLifeTime2: {
            default: null,
            visible: false
        },

        //游戏进程
        Score: {
            default: null,
            visible: false
        },
        ItemNum: {
            default: null,
            visible: false
        },
        label_Score: {
            default: null,
            type: cc.Label
        },
        Player: {
            default: null,
            type: cc.Node
        },
        Turret: {
            default: null,
            type: cc.Node
        },
        //特定点位
        Block1: {
            default: null,
            type: cc.Node
        },
        Block2: {
            default: null,
            type: cc.Node
        },
        Block3: {
            default: null,
            type: cc.Node
        },
        Block4: {
            default: null,
            type: cc.Node
        },

        //预构体
        upRotationSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        upShootSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        upBulletSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        upBulletLifeTimePrefab: {
            default: null,
            type: cc.Prefab
        },
        upPlayerSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        upSkill_1_MAXPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //开启物理引擎
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;

        //初始化游戏参数
        this.GameInit();
    },

    GameInit: function GameInit() {
        this.PlayerSpeed1 = 10;
        this.PlayerSpeed2 = 20;

        this.RotationSpeed = 1;
        this.ShootSpeed = 10;
        this.BulletSpeed = 1;
        this.BulletLifeTime = 5;

        this.Skill_1_On = false;
        this.Skill_1_Level = 1;
        this.Skill_1_Time = 5;
        this.Skill_1_Max = 5;

        this.GameSpeed = 1;
        this.Score = 0;
        this.ItemNum = 0;

        this.Player.x = 400;
        this.Player.y = 325;

        this.GameSpeed = 1;
        this.GamePause = false;

        this.ItemLifeTime1 = 0;
        this.ItemLifeTime2 = 10;

        this.UpdateData();
        this.ItemNum++;
        this.SwapBadItem();
    },
    GameOver: function GameOver() {
        this.GamePause = true;
        cc.log('test');
        this.scheduleOnce(function () {
            this.GameReset();
        }, 5);
    },
    GameReset: function GameReset() {
        var childernlist = this.node.children;
        //cc.log(this.node.childrenCount);
        for (var i = 0; i < this.node.childrenCount; i++) {
            cc.log(childernlist[i]);
            childernlist[i].destroy();
        }

        this.Turret.getComponent('TurretControl').GameReset();

        this.scheduleOnce(function () {
            this.GameInit();
        }, 0.1);
    },
    start: function start() {},
    update: function update(dt) {
        if (this.GamePause) this.GameSpeed = 0;else {
            if (this.Skill_1_On) {
                if (this.Skill_1_Time > 0) {
                    this.GameSpeed = 1 / (1 + this.Skill_1_Level);
                    this.Skill_1_Time -= dt;
                    if (this.Skill_1_Time < 0) this.Skill_1_Time = 0;
                    this.UpdateData();
                } else {
                    this.GameSpeed = 1;
                    this.Skill_1_Time = 0;
                }
            } else {
                this.GameSpeed = 1;
                if (this.Skill_1_Time < this.Skill_1_Max) {
                    this.Skill_1_Time += dt / 3;
                    this.UpdateData();
                }
            }
        }
    },


    UpdateData: function UpdateData() {
        this.label_PlayerSpeed.string = this.PlayerSpeed2.toString();
        this.label_RotationSpeed.string = this.RotationSpeed.toString();
        this.label_ShootSpeed.string = this.ShootSpeed.toString();
        this.label_BulletSpeed.string = this.BulletSpeed.toString();
        this.label_BulletLifeTime.string = this.BulletLifeTime.toString();
        this.label_Score.string = this.Score.toString();
        var tmp = (Math.floor(this.Skill_1_Time * 10) / 10).toString();
        if (tmp.length < 3) tmp += '.0';
        this.label_Skill_1_Time.string = tmp;
    },

    _getARandomPositon: function _getARandomPositon() {
        var max, min, x, y;
        do {
            max = 880;
            min = 250;
            x = Math.random() * (max - min + 1) + min;

            max = 600;
            min = 35;
            y = Math.random() * (max - min + 1) + min;
            if (this._getDistance(cc.v2(x, y), this.Block1.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Block2.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Block3.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Block4.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Turret.getPosition()) < 35) continue;
            break;
        } while (true);

        return cc.v2(x, y);
    },

    _getDistance: function _getDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    },

    SwapGoodItem: function SwapGoodItem() {
        var Itemlist = new Array(this.upPlayerSpeedPrefab, this.upSkill_1_MAXPrefab);
        var i = Math.floor(Math.random() * 2);

        var newItem = cc.instantiate(Itemlist[i]);

        newItem.parent = this.node;
        var postion = this._getARandomPositon();
        newItem.x = postion.x;
        newItem.y = postion.y;
    },

    SwapBadItem: function SwapBadItem() {
        var Itemlist = new Array(this.upRotationSpeedPrefab, this.upShootSpeedPrefab, this.upBulletSpeedPrefab, this.upBulletLifeTimePrefab);
        var i = Math.floor(Math.random() * 4);

        var newItem = cc.instantiate(Itemlist[i]);

        newItem.parent = this.node;
        var postion = this._getARandomPositon();
        newItem.x = postion.x;
        newItem.y = postion.y;
    },

    SwapItem: function SwapItem() {
        if (this.Score == 10) {
            this.SwapBadItem();
        }
        if (this.Score == 30) {
            this.SwapBadItem();
        }
        if (this.Score % 5 == 0) this.SwapGoodItem();else this.SwapBadItem();
    },

    upRotationSpeed: function upRotationSpeed() {
        this.RotationSpeed += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
    },

    upShootSpeed: function upShootSpeed() {
        this.ShootSpeed += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
    },

    upBulletSpeed: function upBulletSpeed() {
        this.BulletSpeed += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
    },
    upBulletLifeTime: function upBulletLifeTime() {
        this.BulletLifeTime += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
    },

    upPlayerSpeed: function upPlayerSpeed() {
        this.PlayerSpeed2 += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
    },

    upSkill_1_MAX: function upSkill_1_MAX() {
        this.Skill_1_Max += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
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
        //# sourceMappingURL=GameManager.js.map
        