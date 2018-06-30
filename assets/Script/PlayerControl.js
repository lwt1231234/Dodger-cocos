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
        TheWorld: {
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
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
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
        this.TheWorld.active = false;
        if(this.GameManager.getComponent('GameManager').UseEnergyBar == true){
            this.EnergyBar.active = true;
        }
        else{
            this.EnergyBar.active = false;
        }

        this.JoyDev = cc.v2(0,0);
        this.DeviceDev = cc.v2(0,0);
        this.TouchDev = cc.v2(0,0);
    },

    DevCompare(a,x,y){
        if(a.x == x && a.y == y)
            return true;
        else
            return false;
    },


    update (dt) {
        if(!this.GameManager.getComponent('GameManager').GamePause){
            if(this.DevCompare(this.JoyDev,0,0) && this.DevCompare(this.DeviceDev,0,0) && this.DevCompare(this.TouchDev,0,0))
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            else{
                let GameSpeed = this.GameManager.getComponent('GameManager').GameSpeed;
                GameSpeed = 1;

                if(this.GameManager.getComponent('GameManager').UseJoy && !this.DevCompare(this.JoyDev,0,0))
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.JoyDev.x*GameSpeed,this.JoyDev.y*GameSpeed);
                if(this.GameManager.getComponent('GameManager').UseDevice && !this.DevCompare(this.DeviceDev,0,0))
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.DeviceDev.x*GameSpeed,this.DeviceDev.y*GameSpeed);
                if(this.GameManager.getComponent('GameManager').UseTouch && !this.DevCompare(this.TouchDev,0,0)){
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.TouchDev.x*GameSpeed,this.TouchDev.y*GameSpeed);
                }
            }

            if(this.TheWorldActive==1){
                var tmp = this.TheWorld.scale;
                this.TheWorld.scale=cc.v2(tmp+dt*1500,tmp+dt*1500);
            }
            if(this.TheWorldActive==-1){
                var tmp = this.TheWorld.scale;
                this.TheWorld.scale=cc.v2(tmp-dt*1500,tmp-dt*1500);
            }
        }
        else
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
        
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
        this.Bomb.getComponent('BombControl').Timer=0.15;
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

    TheWorldStart: function(num){
        this.TheWorld.active= true;
        this.TheWorld.scale = cc.v2(1,1);
        this.TheWorldActive = 1;
        this.scheduleOnce(function() {
                        this.TheWorldActive = 0;
                        }, 0.2);
    },

    TheWorldEnd: function(num){
        this.TheWorldActive = -1;
        this.scheduleOnce(function() {
                        this.TheWorldActive = 0;
                        this.TheWorld.active= false;
                        }, 0.2);
    },

    onCollisionEnter: function (other, self) {
        if(this.GameManager.getComponent('GameManager').GamePause)
            return;
        if(other.node.name=='Bullet'){
            if(this.HaveShield){
                this.LoseShield();
                other.node.destroy();
                this.LockBulletLock(0.2);
            }
            else
            {
                if(other.node.getComponent('BulletControl').Used !=false){
                    return;
                }
                other.node.getComponent('BulletControl').Used = true;
                if(this.BulletLock){
                    other.node.destroy();
                    return;
                }
                if(this.GameManager.getComponent('GameManager').Skill_2_Type==1 && this.GameManager.getComponent('GameManager').Skill_1_Time>=this.GameManager.getComponent('GameManager').PassiveSkill1Energy){
                    this.GameManager.getComponent('GameManager').Skill_1_Time -=this.GameManager.getComponent('GameManager').PassiveSkill1Energy;
                    other.node.destroy();
                    this.LockBulletLock(1);
                    this.RebornFlash(5);
                    if(this.GameManager.getComponent('GameManager').Skill_1_Time<this.GameManager.getComponent('GameManager').PassiveSkill1Energy){
                        this.GameManager.getComponent('GameManager').PlayerPowerFlash(3);
                        this.EnergyBar.getComponent('EnergyBarControl').EnergyBarFlash(3);
                    }
                } 
                else{
                    //other.node.destroy();
                    other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
                    this.node.getComponent(cc.RigidBody).angularVelocity = 500;
                    this.EnergyBar.active = false;
                    this.GameManager.getComponent('GameManager').GameOver();
                }
            }
            
        }
        if(other.node.getComponent('Item')!=null){
            // if(this.ItemLock)
            //     return;
            // else{
            //     this.ItemLock = true;
            //     this.scheduleOnce(function() {
            //         this.UnlockItemLock();
            //         }, 0.05);
            // }
            if(other.node.getComponent('Item').Used !=false)
                return;
            other.node.getComponent('Item').Used = true;
            other.node.destroy();
            this.GameManager.getComponent('GameManager').ItemNum--;
            var Item = other.node.getComponent('Item')
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
                this.GetShield();
                this.GameManager.getComponent('GameManager').GetShield();
            }
        }
    },

    
});
