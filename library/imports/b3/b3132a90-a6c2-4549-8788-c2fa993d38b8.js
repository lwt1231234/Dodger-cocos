"use strict";
cc._RF.push(module, 'b3132qQpsJFSYeIwvqZPTi4', 'GameManager');
// Script/GameManager.js

'use strict';

var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        Canvas: {
            default: null,
            type: cc.Node
        },
        //玩家属性
        label_PlayerSpeed: {
            default: null,
            type: cc.Label
        },

        label_Skill_1_Name: {
            default: null,
            type: cc.Label
        },
        label_Skill_1_Time: {
            default: null,
            type: cc.Label
        },
        //难度属性

        label_RotationSpeed: {
            default: null,
            type: cc.Label
        },

        label_ShootSpeed: {
            default: null,
            type: cc.Label
        },

        label_BulletSpeed: {
            default: null,
            type: cc.Label
        },

        label_BulletLifeTime: {
            default: null,
            type: cc.Label
        },

        //游戏进程
        label_Score: {
            default: null,
            type: cc.Label
        },
        label_GameOverScore: {
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
        //UI
        MainMenuUI: {
            default: null,
            type: cc.Node
        },
        GuideUI: {
            default: null,
            type: cc.Node
        },
        GameSetUI: {
            default: null,
            type: cc.Node
        },
        GameOverUI: {
            default: null,
            type: cc.Node
        },
        GameAreaUI: {
            default: null,
            type: cc.Node
        },
        GameRankUI: {
            default: null,
            type: cc.Node
        },
        UpdateLogUI: {
            default: null,
            type: cc.Node
        },

        //UI
        JoyUI: {
            default: null,
            type: cc.Node
        },

        SkillButton1: {
            default: null,
            type: cc.Node
        },
        SkillButton2: {
            default: null,
            type: cc.Node
        },
        SkillButton3: {
            default: null,
            type: cc.Node
        },
        LevelNumUI: {
            default: null,
            type: cc.Label
        },
        //按钮
        UseEnergyBarUI: {
            default: null,
            type: cc.Toggle
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
        },
        GetShieldPrefab: {
            default: null,
            type: cc.Prefab
        },

        PointRotationSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        PointShootSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        PointBulletSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        PointBulletLifeTimePrefab: {
            default: null,
            type: cc.Prefab
        },
        PointPlayerSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        PointSkill_1_MAXPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //开启物理引擎
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
        //this.node.getComponent('DeviceMotionControl').Prepare();

        this.GameSpeed = 0;
        this.GamePause = true;
        this.CanClick = true;
        //初始化游戏参数
        this.MainMenuUI.active = true;
        this.GuideUI.active = false;
        this.GameAreaUI.active = false;
        this.GameSetUI.active = false;
        this.GameOverUI.active = false;
        this.GameRankUI.active = false;
        this.UpdateLogUI.active = false;
        //this.GameInit();
        this.SetPara();
    },

    SetPara: function SetPara() {
        //减速
        this.ActiveSkill0Energy = 1;
        //炸弹
        this.ActiveSkill1Energy = 5;
        //停止
        this.ActiveSkill2Energy = 5;

        //保险
        this.PassiveSkill1Energy = 3;
    },

    ChooseActiveSkill: function ChooseActiveSkill() {
        this.GameAreaUI.active = false;
        this.GameSetUI.active = true;
        if (this.LevelNum == null) this.LevelNum = 0;else this.LevelNum = Math.floor(Math.random() * 4);
        if (this.LevelNum == 0) {
            this.LevelNumUI.string = '本次游戏难度倾向：平衡';
        }
        if (this.LevelNum == 1) {
            this.LevelNumUI.string = '本次游戏难度倾向：炮台射速快';
        }
        if (this.LevelNum == 2) {
            this.LevelNumUI.string = '本次游戏难度倾向：子弹速度快';
        }
        if (this.LevelNum == 3) {
            this.LevelNumUI.string = '本次游戏难度倾向：子弹时间长';
        }
    },

    GameInit: function GameInit() {
        this.GameAreaUI.active = true;
        this.PlayerSpeed2UI = 1;

        this.RotationSpeedUI = 1;
        this.ShootSpeedUI = 1;
        this.BulletSpeedUI = 1;
        this.BulletLifeTimeUI = 1;

        this.Skill_1_On = false;
        this.Skill_1_Active = false;
        this.Skill_1_Level = 1;
        this.Skill_1_Time = 10;
        this.Skill_1_Max = 10;

        this.GameSpeed = 1;
        this.PlayerSlow = 1;
        this.Score = 0;
        this.ItemNum = 1;

        this.Player.x = -200;
        this.Player.y = 0;

        this.GameSpeed = 1;
        this.GamePause = false;
        this.CanClick = true;

        this.ItemLifeTime1 = 0;
        this.ItemLifeTime2 = 0;

        this.UpdateData();
        this.SwapBadItem();
        //this.SwapGoodItem();

        this.UseEnergyBar = this.UseEnergyBarUI.isChecked;
        this.UseJoy = true;
        this.UseDevice = false;
        this.UseTouch = false;

        this.Turret.getComponent('TurretControl').GameInit();
        this.Player.getComponent('PlayerControl').GameInit();
        this.node.getComponent('DeviceMotionControl').GameInit();

        if (this.UseJoy) {
            this.JoyUI.active = true;
            this.SkillButton1.active = true;
        } else {
            this.JoyUI.active = false;
            this.SkillButton1.active = false;
        }
        if (this.UseDevice) this.SkillButton2.active = true;else this.SkillButton2.active = false;
        if (this.UseTouch) this.SkillButton3.active = true;else this.SkillButton3.active = false;
    },
    GameOver: function GameOver() {
        this.GamePause = true;
        this.scheduleOnce(function () {
            this.PlayerDead();
        }, 1);
    },
    PlayerDead: function PlayerDead() {
        this.Player.getComponent('PlayerControl').Die();
        this.scheduleOnce(function () {
            this.GameReset();
        }, 1);
    },
    GameReset: function GameReset() {
        var childernlist = this.node.children;
        //cc.log(this.node.childrenCount);
        for (var i = 0; i < this.node.childrenCount; i++) {
            //cc.log(childernlist[i]);
            childernlist[i].destroy();
        }

        this.Turret.getComponent('TurretControl').GameReset();
        //this.GameAreaUI.active = false;
        this.GameOverUI.active = true;
        this.label_GameOverScore.string = '得分：' + this.Score.toString();
        this.GameRankUI.active = true;

        this.SubmitScore();
        this.GameRankUI.getComponent('GameRankControl').GetFirendRank();
        this.CanClick = false;
    },
    start: function start() {},
    update: function update(dt) {
        if (this.GamePause) this.GameSpeed = 0;else {
            var PlayerSpeedNow = this.Player.getComponent(cc.RigidBody).linearVelocity;

            if (this.TheWorldTime > 0) {
                this.TheWorldTime -= dt;
                if (this.TheWorldTime <= 0) {
                    this.ResumeSpeed = true;
                    this.Player.getComponent('PlayerControl').TheWorldEnd();
                }
            }

            if (PlayerSpeedNow.x == 0 && PlayerSpeedNow.y == 0) this.PlayerNotMove = true;else {
                this.PlayerNotMove = false;
            }

            if (!this.Skill_1_On) {
                if (this.Skill_1_Time < this.Skill_1_Max) {
                    this.Skill_1_Time += dt / 2 * this.GameSpeed;
                    this.UpdateData();
                }
            }
            if (this.Skill_1_Type == Common.ActiveSkillNum.SlowTime) {
                if (this.Skill_1_On) {
                    if (this.Skill_1_Time > 0) {
                        this.Skill_1_Active = true;
                        this.GameSpeed = 1;
                        this.Skill_1_Time -= dt * this.ActiveSkill0Energy;
                        if (this.Skill_1_Time < 0) this.Skill_1_Time = 0;
                        this.UpdateData();
                    } else {
                        this.Skill_1_Active = false;
                        this.GameSpeed = 1;
                        this.Skill_1_Time = 0;
                    }
                } else {
                    this.Skill_1_Active = false;
                    this.GameSpeed = 1;
                }
            }
            if (this.Skill_1_Type == 2 && this.ResumeSpeed == true) {
                if (this.GameSpeed < 1) this.GameSpeed += dt / 2;else {
                    this.ResumeSpeed = false;
                }
            }
        }
        //cc.log(this.GameSpeed);
    },


    UpdateData: function UpdateData() {
        //更新UI数据
        this.label_PlayerSpeed.string = this.PlayerSpeed2UI.toString();
        this.label_RotationSpeed.string = this.RotationSpeedUI.toString();
        this.label_ShootSpeed.string = this.ShootSpeedUI.toString();
        this.label_BulletSpeed.string = this.BulletSpeedUI.toString();
        this.label_BulletLifeTime.string = this.BulletLifeTimeUI.toString();
        this.label_Score.string = this.Score.toString();
        var tmp = (Math.floor(this.Skill_1_Time * 10) / 10).toString();
        if (tmp.length < 3) tmp += '.0';
        this.label_Skill_1_Time.string = tmp;

        this.Player.getComponent('PlayerControl').EnergyBar.getComponent('EnergyBarControl').UpdateData(this.Skill_1_Time, this.Skill_1_Max);

        //计算具体参数

        // let i;
        // for(i=1;i<20;i++)
        //     cc.log(i,Math.log(i)*5+20);

        this.PlayerSpeed2 = Math.log(this.PlayerSpeed2UI) * 5 + 20;
        this.PlayerSpeed1 = this.PlayerSpeed2;
        this.RotationSpeed = 10 + this.RotationSpeedUI;
        this.ShootSpeed = 2 * 15 / (15 + this.ShootSpeedUI);
        this.BulletSpeed = 200 + 2 * this.BulletSpeedUI;
        this.BulletLifeTime = 4 + this.BulletLifeTimeUI * 0.5;
        this.BulletScale = 20 / (40 + this.Score / 5) + 0.2;
    },

    _getARandomPositon: function _getARandomPositon(postion, min_distance_input, max_distance_input) {
        var max, min, x, y, min_distance, max_distance;

        if (min_distance_input == null) min_distance = 20;else min_distance = min_distance_input;

        if (max_distance_input == null) max_distance = 1000;else max_distance = max_distance_input;
        //cc.log(min_distance,max_distance);
        var count = 0;
        do {
            count++;
            if (count > 100) {
                cc.log("too many random times");
                return cc.v2(x, y);
            }

            max = Math.min(290, postion.x + max_distance);
            min = Math.max(-290, postion.x - max_distance);
            x = Math.random() * (max - min + 1) + min;

            max = Math.min(290, postion.y + max_distance);
            min = Math.max(-290, postion.y - max_distance);
            y = Math.random() * (max - min + 1) + min;

            if (this._getDistance(cc.v2(x, y), postion) < min_distance) continue;
            if (this._getDistance(cc.v2(x, y), postion) > max_distance) continue;
            //是否离4个方块太近
            if (this._getDistance(cc.v2(x, y), this.Block1.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Block2.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Block3.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Block4.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Turret.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Player.getPosition()) < min_distance) continue;
            break;
        } while (true);
        //cc.log(cc.v2(x,y));
        return cc.v2(x, y);
    },

    _getDistance: function _getDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    },

    SwapGoodItemSingle: function SwapGoodItemSingle(ItemType) {
        var newItem = cc.instantiate(ItemType);
        var postion = this._getARandomPositon(this.Player.getPosition(), 200, 300);
        newItem.parent = this.node;
        newItem.getComponent('Item').Init(postion, null);
    },

    SwapGoodItem: function SwapGoodItem() {
        var Itemlist = new Array(this.upPlayerSpeedPrefab, this.upSkill_1_MAXPrefab, this.GetShieldPrefab);
        var newItem1 = void 0;
        var newItem2 = void 0;
        if (this.Player.getComponent('PlayerControl').HaveShield) {
            newItem1 = cc.instantiate(Itemlist[0]);
            newItem2 = cc.instantiate(Itemlist[1]);
        } else {
            newItem1 = cc.instantiate(this.GetShieldPrefab);
            var i = Math.floor(Math.random() * 2);
            newItem2 = cc.instantiate(Itemlist[i]);
        }

        newItem1.parent = this.node;
        newItem2.parent = this.node;
        var postion1 = this._getARandomPositon(this.Player.getPosition(), 200, 1000);
        var postion2 = this._getARandomPositon(postion1, 300, 400);
        newItem1.getComponent('Item').Init(postion1, newItem2);
        newItem2.getComponent('Item').Init(postion2, newItem1);
    },

    SwapBadItem: function SwapBadItem() {
        var Itemlist, i;

        if (this.Score < 4) {
            Itemlist = new Array(this.upRotationSpeedPrefab, this.upShootSpeedPrefab, this.upBulletSpeedPrefab, this.upBulletLifeTimePrefab);
            i = this.Score;
        } else {
            if (this.LevelNum == 0) {
                Itemlist = new Array(this.upRotationSpeedPrefab, this.upShootSpeedPrefab, this.upBulletSpeedPrefab, this.upBulletLifeTimePrefab);
                i = Math.floor(Math.random() * 4);
            }
            if (this.LevelNum == 1) {
                Itemlist = new Array(this.upRotationSpeedPrefab, this.upShootSpeedPrefab, this.upShootSpeedPrefab, this.upShootSpeedPrefab, this.upBulletSpeedPrefab, this.upBulletLifeTimePrefab);
                i = Math.floor(Math.random() * 6);
            }
            if (this.LevelNum == 2) {
                Itemlist = new Array(this.upRotationSpeedPrefab, this.upShootSpeedPrefab, this.upBulletSpeedPrefab, this.upBulletSpeedPrefab, this.upBulletSpeedPrefab, this.upBulletLifeTimePrefab);
                i = Math.floor(Math.random() * 6);
            }
            if (this.LevelNum == 3) {
                Itemlist = new Array(this.upRotationSpeedPrefab, this.upShootSpeedPrefab, this.upBulletSpeedPrefab, this.upBulletLifeTimePrefab, this.upBulletLifeTimePrefab, this.upBulletLifeTimePrefab);
                i = Math.floor(Math.random() * 6);
            }
        }
        cc.log(i);
        var newItem = cc.instantiate(Itemlist[i]);

        newItem.parent = this.node;
        var postion = void 0;
        if (this.Score >= 0 && this.Score < 5) {
            postion = this._getARandomPositon(this.Player.getPosition(), 100, 150);
        }
        if (this.Score >= 5 && this.Score < 15) {
            postion = this._getARandomPositon(this.Player.getPosition(), 150, 200);
        }
        if (this.Score >= 15 && this.Score < 25) {
            postion = this._getARandomPositon(this.Player.getPosition(), 200, 250);
        }
        if (this.Score >= 25 && this.Score < 35) {
            postion = this._getARandomPositon(this.Player.getPosition(), 250, 300);
        }
        if (this.Score >= 35 && this.Score < 50) {
            postion = this._getARandomPositon(this.Player.getPosition(), 300, 400);
        }
        if (this.Score >= 50) postion = this._getARandomPositon(this.Player.getPosition(), 200, 1000);
        newItem.x = postion.x;
        newItem.y = postion.y;
    },

    SwapItem: function SwapItem() {
        if (this.ItemNum == 5) return;
        if (this.Score == 5) {
            this.SwapBadItem();
        }
        if (this.Score == 15) {
            this.SwapBadItem();
        }
        if (this.Score == 30) {
            this.SwapBadItem();
        }
        if (this.Score % 5 == 0) {
            if (this.Score == 5) this.SwapGoodItemSingle(this.GetShieldPrefab);else this.SwapGoodItem();
        } else this.SwapBadItem();
    },

    createPoint: function createPoint(point_id, pointTarget) {
        var Pointlist = new Array(this.PointRotationSpeedPrefab, this.PointShootSpeedPrefab, this.PointBulletSpeedPrefab, this.PointBulletLifeTimePrefab, this.PointPlayerSpeedPrefab, this.PointSkill_1_MAXPrefab);

        var newPoint = cc.instantiate(Pointlist[point_id]);
        newPoint.parent = this.Canvas;
        newPoint.x = this.Player.getPosition().x;
        newPoint.y = this.Player.getPosition().y;
        newPoint.getComponent('PointControl').target = pointTarget.getChildByName("1");
    },


    upRotationSpeed: function upRotationSpeed() {
        this.RotationSpeedUI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(0, this.label_RotationSpeed.node);
    },

    upShootSpeed: function upShootSpeed() {
        this.ShootSpeedUI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(1, this.label_ShootSpeed.node);
    },

    upBulletSpeed: function upBulletSpeed() {
        this.BulletSpeedUI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(2, this.label_BulletSpeed.node);
    },
    upBulletLifeTime: function upBulletLifeTime() {
        this.BulletLifeTimeUI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(3, this.label_BulletLifeTime.node);
    },

    upPlayerSpeed: function upPlayerSpeed() {
        this.PlayerSpeed2UI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(4, this.label_PlayerSpeed.node);
    },

    upSkill_1_MAX: function upSkill_1_MAX() {
        this.Skill_1_Time += 5;
        if (this.Skill_1_Time > this.Skill_1_Max) {
            this.Skill_1_Max += 2;
            this.Skill_1_Time = this.Skill_1_Max;
        }
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(5, this.label_Skill_1_Time.node);
    },

    GetShield: function GetShield() {
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
    },

    Skill_1_Start: function Skill_1_Start() {
        if (this.GamePause) return;
        if (this.Skill_1_Type == Common.ActiveSkillNum.Bomb) {
            if (this.Skill_1_Time >= this.ActiveSkill1Energy) {
                this.Player.getComponent('PlayerControl').UseBomb();
                this.Skill_1_Time -= this.ActiveSkill1Energy;
                this.UpdateData();
            } else {
                this.PlayerPowerFlash(3);
                this.Player.getComponent('PlayerControl').EnergyBar.getComponent('EnergyBarControl').EnergyBarFlash(3);
            }
        }
        if (this.Skill_1_Type == 2) {
            if (this.Skill_1_Time >= this.ActiveSkill2Energy) {
                this.Skill_1_Time -= this.ActiveSkill2Energy;
                this.UpdateData();
                this.GameSpeed = 0;
                this.ResumeSpeed = false;
                this.Player.getComponent('PlayerControl').TheWorldStart();
                this.TheWorldTime = 3;
            } else {
                this.PlayerPowerFlash(3);
                this.Player.getComponent('PlayerControl').EnergyBar.getComponent('EnergyBarControl').EnergyBarFlash(3);
            }
        }
    },

    PlayerPowerFlash: function PlayerPowerFlash(num) {
        if (num > 0) {
            this.label_Skill_1_Time.node.color = new cc.color(245, 62, 62);
            this.scheduleOnce(function () {
                this.PlayerPowerFlashEnd(num);
            }, 0.2);
        }
    },

    PlayerPowerFlashEnd: function PlayerPowerFlashEnd(num) {
        this.label_Skill_1_Time.node.color = new cc.color(255, 255, 255);
        this.scheduleOnce(function () {
            this.PlayerPowerFlash(num - 1);
        }, 0.2);
    },

    OnPressLabel: function OnPressLabel(type) {
        if (!this.CanClick) return;
        if (type == 0) {
            this.MainMenuUI.active = false;
            this.UpdateLogUI.active = true;
        }
    },

    OnPressGameGuide: function OnPressGameGuide() {
        if (!this.CanClick) return;
        this.MainMenuUI.active = false;
        this.GuideUI.active = true;
        this.GuideUI.getComponent('GuideUIControl').Init();
    },

    OnPressGameStart: function OnPressGameStart() {
        if (!this.CanClick) return;
        this.MainMenuUI.active = false;
        this.ChooseActiveSkill();
    },

    OnPressGameSettingOk: function OnPressGameSettingOk() {
        if (this.Skill_1_Type != null && this.Skill_2_Type != null) {
            this.GameInit();
            //this.ChooseActiveSkill();
            this.GameSetUI.active = false;
        }
    },

    OnPressGameRank: function OnPressGameRank() {
        if (!this.CanClick) return;
        this.GameRankUI.active = true;
        this.SubmitScore();
        this.GameRankUI.getComponent('GameRankControl').GetFirendRank();
        this.CanClick = false;
    },

    OnPressShare: function OnPressShare() {
        window.wx.shareAppMessage();
    },

    SubmitScore: function SubmitScore() {
        if (this.Score == null) this.Score = 0;
        var testDate = new Date();
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: Common.MessageType.SubmitData,
                MAIN_MENU_NUM: "Score",
                Data: this.Score
            });
        } else {
            cc.log("提交得分:Score:" + this.Score);
        }
    }
});

cc._RF.pop();