var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        Picture: {
            default: null,
            type: cc.Node,
        },
        EnergyBar: {
            default: null,
            type: cc.Node,
        },
        DiePicture: {
            default: null,
            type: cc.Node,
        },
        Shield: {
            default: null,
            type: cc.Node,
        },
        Reborn: {
            default: null,
            type: cc.Node,
        },
        HaveShield :{
            default: null,
            visible: false,
        },
        Bomb: {
            default: null,
            type: cc.Node,
        },
        ItemLock :{
            default: null,
            visible: false,
        },
        BulletLock :{
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.GameManager = cc.find("Canvas/GameManager");
    },

    start () {
    },

    GameInit :function(){
        this.ItemLock = false;
        this.BulletLock = false; 
        this.HaveShield = false;


        this.node.getComponent(cc.RigidBody).angularVelocity = 0;
        this.node.rotation = 0;

       // this.Bomb.active = true;
        //this.Bomb.getComponent('BombControl').GameInit();
        this.Bomb.active = false;

        //this.Shield.active = true;
        //this.Shield.getComponent('ShieldControl').GameInit();
        this.Shield.active = false;
        this.Picture.active = true;
        this.DiePicture.active = false;
        this.Reborn.active = false;
        if(this.GameManager.getComponent('GameManager').UseEnergyBar == true){
            this.EnergyBar.active = true;

        }
        else{
            this.EnergyBar.active = false;

        }
    },

    update (dt) {
    },

    UnlockItemLock :function(){
        this.ItemLock = false;
    },

    LockBulletLock:function(time){
        this.BulletLock = true;
        this.scheduleOnce(function() {
            this.UnlockBulletLock();
            }, time);
    },

    UnlockBulletLock :function(){
        this.BulletLock = false;
    },

    GetShield :function(){
        this.Shield.active = true;
        this.HaveShield = true;
    },

    LoseShield :function(){
        //this.Shield.active = false;
        this.Shield.getComponent('ShieldControl').Timer = 0.3;
        this.HaveShield = false;
    },

    UseBomb :function(){
        this.Bomb.active = true;
        this.Bomb.getComponent('BombControl').Timer=0.2;
    },

    Die: function(){
        this.Picture.active = false;
        this.DiePicture.active = true;
        this.DiePicture.getComponent('DieAction').LetDie();
    },

    RebornFlash: function(num){
        if(num>0){
            this.Reborn.active = true;
            this.scheduleOnce(function() {
                        this.RebornFlashEnd(num);
                        }, 0.2);
        }
        
    },

    RebornFlashEnd: function(num){
        this.Reborn.active = false;
        this.scheduleOnce(function() {
                    this.RebornFlash(num-1);
                    }, 0.2);
    },


    onPreSolve: function (contact, selfCollider, otherCollider) {
        if(this.GameManager.getComponent('GameManager').GamePause)
            return;
        if(otherCollider.node.name=='Bullet'){
            if(this.HaveShield){
                this.LoseShield();
                otherCollider.node.destroy();
                this.LockBulletLock(0.2);
            }
            else
            {
                if(!this.BulletLock){
                    if(this.GameManager.getComponent('GameManager').Skill_2_Type==1 && this.GameManager.getComponent('GameManager').Skill_1_Time>=5){
                        this.GameManager.getComponent('GameManager').Skill_1_Time -=5;
                        otherCollider.node.destroy();
                        this.LockBulletLock(1);
                        this.RebornFlash(5);
                        if(this.GameManager.getComponent('GameManager').Skill_1_Time<5){
                            this.GameManager.getComponent('GameManager').PlayerPowerFlash(3);
                            this.EnergyBar.getComponent('EnergyBarControl').EnergyBarFlash(3);
                        }
                    }
                        
                    else{
                        otherCollider.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
                        this.node.getComponent(cc.RigidBody).angularVelocity = 500;
                        this.EnergyBar.active = false;
                        this.GameManager.getComponent('GameManager').GameOver();
                    }
                    
                }
                else
                    otherCollider.node.destroy();
            }
            
        }
        if(otherCollider.node.getComponent('Item')!=null){
            if(this.ItemLock)
                return;
            else{
                this.ItemLock = true;
                this.scheduleOnce(function() {
                    this.UnlockItemLock();
                    }, 0.1);
            }
            otherCollider.node.destroy();
            var Item = otherCollider.node.getComponent('Item')
            //cc.log(Item.Type);
            if(Item.Type == Common.ItemType.upRotationSpeed)
                this.GameManager.getComponent('GameManager').upRotationSpeed();
            if(Item.Type == Common.ItemType.upShootSpeed)
                this.GameManager.getComponent('GameManager').upShootSpeed();
            if(Item.Type == Common.ItemType.upBulletSpeed)
                this.GameManager.getComponent('GameManager').upBulletSpeed();
            if(Item.Type == Common.ItemType.upBulletLifeTime)
                this.GameManager.getComponent('GameManager').upBulletLifeTime();
            if(Item.Type == Common.ItemType.upPlayerSpeed)
                this.GameManager.getComponent('GameManager').upPlayerSpeed();
            if(Item.Type == Common.ItemType.upSkill_1_MAX)
                this.GameManager.getComponent('GameManager').upSkill_1_MAX();
            if(Item.Type == Common.ItemType.GetShield){
                cc.log(1);
                this.GetShield();
                this.GameManager.getComponent('GameManager').GetShield();
            }
        }
    },
    
});
