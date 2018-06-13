var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        Canvas :{
            default: null,
            type: cc.Node,
        },
                            //玩家属性
        PlayerSpeed1 :{
            default: null,
            visible: false,
        },
        PlayerSpeed2 :{
            default: null,
            visible: false,
        },
        PlayerSpeed2UI :{
            default: null,
            visible: false,
        },
        label_PlayerSpeed: {
            default: null,
            type: cc.Label,
        },

        label_Skill_1_Name: {
            default: null,
            type: cc.Label,
        },
        Skill_1_Type :{
            default: null,
            visible: false,
        },
        Skill_1_On :{
            default: null,
            visible: false,
        },
        Skill_1_Level :{
            default: null,
            visible: false,
        },
        Skill_1_Time :{
            default: null,
            visible: false,
        },
        label_Skill_1_Time: {
            default: null,
            type: cc.Label,
        },
        Skill_1_Max :{
            default: null,
            visible: false,
        },
        GameSpeed :{
            default: null,
            visible: false,
        },
        GamePause :{
            default: null,
            visible: false,
        },
                            //难度属性
        RotationSpeed :{
            default: null,
            visible: false,
        },
        RotationSpeedUi :{
            default: null,
            visible: false,
        },
        label_RotationSpeed: {
            default: null,
            type: cc.Label,
        },

        BulletScale :{
            default: null,
            visible: false,
        },
        BulletScaleUI :{
            default: null,
            visible: false,
        },

        ShootSpeed :{
            default: null,
            visible: false,
        },
        ShootSpeedUI :{
            default: null,
            visible: false,
        },
        label_ShootSpeed: {
            default: null,
            type: cc.Label,
        },

        BulletSpeed :{
            default: null,
            visible: false,
        },
        BulletSpeedUI :{
            default: null,
            visible: false,
        },
        label_BulletSpeed: {
            default: null,
            type: cc.Label,
        },

        BulletLifeTime :{
            default: null,
            visible: false,
        },
        BulletLifeTimeUI :{
            default: null,
            visible: false,
        },
        label_BulletLifeTime: {
            default: null,
            type: cc.Label,
        },

        ItemLifeTime1: {
            default: null,
            visible: false,
        },
        ItemLifeTime2: {
            default: null,
            visible: false,
        },

                            //游戏进程
        Score :{
            default: null,
            visible: false,
        },
        ItemNum :{
            default: null,
            visible: false,
        },
        label_Score: {
            default: null,
            type: cc.Label,
        },
        label_GameOverScore: {
            default: null,
            type: cc.Label,
        },
        Player: {
            default: null,
            type: cc.Node,
        },
        Turret: {
            default: null,
            type: cc.Node,
        },
                            //特定点位
        Block1: {
            default: null,
            type: cc.Node,
        },
        Block2: {
            default: null,
            type: cc.Node,
        }, 
        Block3: {
            default: null,
            type: cc.Node,
        }, 
        Block4: {
            default: null,
            type: cc.Node,
        }, 
                            //UI
        GuideUI: {
            default: null,
            type: cc.Node,
        },
        ChooseActiveSkillUI: {
            default: null,
            type: cc.Node,
        },
        GameOverUI: {
            default: null,
            type: cc.Node,
        }, 
        GameAreaUI: {
            default: null,
            type: cc.Node,
        }, 

                            //预构体
        upRotationSpeedPrefab: {
            default: null,
            type: cc.Prefab,
        },
        upShootSpeedPrefab: {
            default: null,
            type: cc.Prefab,
        },
        upBulletSpeedPrefab: {
            default: null,
            type: cc.Prefab,
        },
        upBulletLifeTimePrefab: {
            default: null,
            type: cc.Prefab,
        },
        upPlayerSpeedPrefab: {
            default: null,
            type: cc.Prefab,
        },
        upSkill_1_MAXPrefab: {
            default: null,
            type: cc.Prefab,
        },
        GetShieldPrefab: {
            default: null,
            type: cc.Prefab,
        },

        PointRotationSpeedPrefab: {
            default: null,
            type: cc.Prefab,
        },
        PointShootSpeedPrefab: {
            default: null,
            type: cc.Prefab,
        },
        PointBulletSpeedPrefab: {
            default: null,
            type: cc.Prefab,
        },
        PointBulletLifeTimePrefab: {
            default: null,
            type: cc.Prefab,
        },
        PointPlayerSpeedPrefab: {
            default: null,
            type: cc.Prefab,
        },
        PointSkill_1_MAXPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad :function() {
        //开启物理引擎
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;

        this.GameSpeed = 0;
        this.GamePause = true;
        //初始化游戏参数
        this.GuideUI.active = true;
        this.GameAreaUI.active = false;
        //this.GameInit();
    },

    ChooseActiveSkill :function(){
        this.ChooseActiveSkillUI.active = true;
    },

    GameInit(){
        this.GameAreaUI.active = true;
        this.PlayerSpeed2UI = 1;

        this.RotationSpeedUI = 1;
        this.BulletScaleUI = 1;
        this.ShootSpeedUI = 1;
        this.BulletSpeedUI = 1;
        this.BulletLifeTimeUI = 1;

        this.Skill_1_On = false;
        this.Skill_1_Level = 1;
        this.Skill_1_Time = 5;
        this.Skill_1_Max = 5;

        this.GameSpeed = 1;
        this.Score = 0;
        this.ItemNum = 0;

        this.Player.x = -200;
        this.Player.y = 0;

        this.GameSpeed = 1;
        this.GamePause = false;

        this.ItemLifeTime1 = 0;
        this.ItemLifeTime2 = 10;
        

        this.UpdateData();
        this.ItemNum++;
        this.SwapBadItem();

        this.Turret.getComponent('TurretControl').GameInit();
        this.Player.getComponent('PlayerControl').GameInit();

    },

    GameOver(){
        this.GamePause = true;
        this.scheduleOnce(function() {
                    this.GameReset();
                    }, 5);
        
    },

    GameReset(){
        var childernlist = this.node.children;
        //cc.log(this.node.childrenCount);
        for(var i=0;i<this.node.childrenCount;i++){
            //cc.log(childernlist[i]);
            childernlist[i].destroy();
        }

        this.Turret.getComponent('TurretControl').GameReset();

        this.GameOverUI.active = true;
        this.label_GameOverScore.string='得分：'+this.Score.toString();
    },

    start () {
        
    },

    update (dt) {
        if(this.GamePause)
            this.GameSpeed = 0;
        else{
            if(!this.Skill_1_On){
                if(this.Skill_1_Time<this.Skill_1_Max){
                        this.Skill_1_Time+=dt/3;
                        this.UpdateData();
                    }
            }
            if(this.Skill_1_Type == Common.ActiveSkillType.SlowTime){
                if(this.Skill_1_On){
                    if (this.Skill_1_Time>0) {
                        this.GameSpeed = 1/(1+this.Skill_1_Level);
                        this.Skill_1_Time -=dt;
                        if(this.Skill_1_Time<0)
                            this.Skill_1_Time = 0;
                        this.UpdateData();
                    }
                    else{
                        this.GameSpeed = 1;
                        this.Skill_1_Time = 0;
                    }
                         
                }
                else{
                    this.GameSpeed = 1;
                }
            }
        }
        //cc.log(this.GameSpeed);
    },

    UpdateData :function(){
        this.label_PlayerSpeed.string = this.PlayerSpeed2UI.toString();
        this.label_RotationSpeed.string = this.RotationSpeedUI.toString();
        this.label_ShootSpeed.string = this.ShootSpeedUI.toString();
        this.label_BulletSpeed.string = this.BulletSpeedUI.toString();
        this.label_BulletLifeTime.string = this.BulletLifeTimeUI.toString();
        this.label_Score.string = this.Score.toString();
        var tmp = (Math.floor(this.Skill_1_Time*10)/10).toString();
        if(tmp.length<3)
            tmp+='.0';
        this.label_Skill_1_Time.string = tmp;

        //计算具体参数

        this.PlayerSpeed2 = (this.PlayerSpeed2UI-1)*2+20;
        this.PlayerSpeed1 = this.PlayerSpeed2/2;
        this.RotationSpeed = 10+this.RotationSpeedUI;
        this.ShootSpeed = 2*15/(15+this.ShootSpeedUI);
        this.BulletSpeed = 200+3*this.BulletSpeedUI;
        this.BulletLifeTime = 4+this.BulletLifeTimeUI*0.5;
        this.BulletScale = 20/(20+this.BulletScaleUI)+0.2
    },

    _getARandomPositon :function(){
        var max,min,x,y;
        do{
            var min_distance = 20;
            var max_distance = 1000;

            if(this.Score >= 0 && this.Score < 5){
                min_distance = 100;
                max_distance = 150;
            }
            if(this.Score >= 5 && this.Score < 15)
                {
                min_distance = 150;
                max_distance = 200;
            }
            if(this.Score >= 15 && this.Score < 25)
                {
                min_distance = 200;
                max_distance = 250;
            }
            if(this.Score >= 25 && this.Score < 35)
                {
                min_distance = 250;
                max_distance = 300;
            }
            if(this.Score >= 35 && this.Score < 50)
                {
                min_distance = 300;
                max_distance = 400;
            }

            max = Math.min(315,this.Player.getPosition().x+max_distance);
            min = Math.max(-315,this.Player.getPosition().x-max_distance);
            x = Math.random()*(max-min+1)+min;

            max = Math.min(285,this.Player.getPosition().y+max_distance);
            min = Math.max(-285,this.Player.getPosition().y-max_distance);
            y = Math.random()*(max-min+1)+min;
            //是否离4个方块太近
            if(this._getDistance(cc.v2(x,y),this.Block1.getPosition())<35)
                continue;
            if(this._getDistance(cc.v2(x,y),this.Block2.getPosition())<35)
                continue;
            if(this._getDistance(cc.v2(x,y),this.Block3.getPosition())<35)
                continue;
            if(this._getDistance(cc.v2(x,y),this.Block4.getPosition())<35)
                continue;
            if(this._getDistance(cc.v2(x,y),this.Turret.getPosition())<35)
                continue;
            if(this._getDistance(cc.v2(x,y),this.Player.getPosition())<min_distance)
                continue;
            break;
        }while(true);
        
        return cc.v2(x,y);
    },

    _getDistance: function(pos1, pos2)
    {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    },

    SwapGoodItem :function(ItemType){
        var Itemlist = new Array(this.upPlayerSpeedPrefab,
                                this.upSkill_1_MAXPrefab,
                                this.GetShieldPrefab);
        var i;
        if(this.Player.getComponent('PlayerControl').HaveShield)
            i = Math.floor(Math.random()*2);
        else
            i = Math.floor(Math.random()*3);

        var newItem;
        if(ItemType == null)
             newItem = cc.instantiate(Itemlist[i]);
         else
            newItem = cc.instantiate(ItemType);

        newItem.parent = this.node;
        var postion= this._getARandomPositon();
        newItem.x = postion.x;
        newItem.y = postion.y;
    },

    SwapBadItem :function(){
        var Itemlist = new Array(this.upRotationSpeedPrefab,
                                this.upShootSpeedPrefab,
                                this.upBulletSpeedPrefab,
                                this.upBulletLifeTimePrefab);
        var i = Math.floor(Math.random()*4);
        if(this.Score<4)
            i = this.Score;

        var newItem = cc.instantiate(Itemlist[i]);

        newItem.parent = this.node;
        var postion= this._getARandomPositon();
        newItem.x = postion.x;
        newItem.y = postion.y;
    },

    SwapItem :function(){
        
        if(this.Score==5){
            this.SwapBadItem();
        }
        if(this.Score==15){
            this.SwapBadItem();
        }
        if(this.Score==30){
            this.SwapBadItem();
        }
        if((this.Score%5)==0){
            if(this.Score == 5)
                this.SwapGoodItem(this.GetShieldPrefab);
            else
                this.SwapGoodItem();
        }
        else
            this.SwapBadItem();
    },

    createPoint(point_id,pointTarget){
        var Pointlist = new Array(this.PointRotationSpeedPrefab,
                                this.PointShootSpeedPrefab,
                                this.PointBulletSpeedPrefab,
                                this.PointBulletLifeTimePrefab,
                                this.PointPlayerSpeedPrefab,
                                this.PointSkill_1_MAXPrefab);

        var newPoint = cc.instantiate(Pointlist[point_id]);
        newPoint.parent = this.Canvas;
        newPoint.x = this.Player.getPosition().x;
        newPoint.y = this.Player.getPosition().y;
        newPoint.getComponent('PointControl').target = pointTarget.getChildByName("1");
    },

    upRotationSpeed: function(){
        this.RotationSpeedUI+=1;
        this.BulletScaleUI+=1;
        this.Score +=1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(0,this.label_RotationSpeed.node);
    },

    upShootSpeed: function(){
        this.ShootSpeedUI+=1;
        this.Score +=1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(1,this.label_ShootSpeed.node);
    },

    upBulletSpeed: function(){
        this.BulletSpeedUI+=1;
        this.Score +=1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(2,this.label_BulletSpeed.node);
    },
    upBulletLifeTime: function(){
        this.BulletLifeTimeUI+=1;
        this.Score +=1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(3,this.label_BulletLifeTime.node);
    },

    upPlayerSpeed: function(){
        this.PlayerSpeed2UI+=1;
        this.Score +=1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(4,this.label_PlayerSpeed.node);
    },

    upSkill_1_MAX: function(){
        this.Skill_1_Max+=1;
        this.Score +=1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(5,this.label_Skill_1_Time.node);
    },

    GetShield: function(){
        this.Score +=1;
        this.UpdateData();
        this.SwapItem();
    },

    Skill_1_Start: function(){
        if(this.Skill_1_Type == Common.ActiveSkillType.Bomb){
            if(this.Skill_1_Time>=5){
                this.Player.getComponent('PlayerControl').UseBomb();
                this.Skill_1_Time-=0;
                this.UpdateData();
            }
        }
    },
});
