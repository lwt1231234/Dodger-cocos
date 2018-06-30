var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        Type: {
            default: Common.ItemType.upRotationSpeed,
            type: Common.ItemType,
            displayName: '类型',
        },
        LifeTime: {
            default: null,
            visible: false,
        }, 
        laberTimer: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.GameManager = cc.find("Canvas/GameManager");
        this.Player = cc.find("Canvas/GameArea/Player");
        if(this.Type<Common.ItemType.upPlayerSpeed)
            this.LifeTime = this.GameManager.getComponent('GameManager').ItemLifeTime1;
        else
            this.LifeTime = this.GameManager.getComponent('GameManager').ItemLifeTime2;
        if(this.LifeTime == 0)
            this.laberTimer.string = '';
        else
            this.laberTimer.string = this.LifeTime.toString();

        this.OnMove = false;
        this.Used = false;
    },

    update (dt) {
        if(!this.GameManager.getComponent('GameManager').GamePause){
            let GameSpeed = this.GameManager.getComponent('GameManager').GameSpeed;
            if(this.LifeTime>0){
                this.LifeTime-= dt*GameSpeed;
                if(this.LifeTime <0){
                    if(this.Type<Common.ItemType.upPlayerSpeed)
                        this.GameManager.getComponent('GameManager').SwapBadItem();
                    else
                        this.GameManager.getComponent('GameManager').SwapGoodItem();
                    this.node.destroy();
                }
                else
                    this.laberTimer.string = Math.floor(this.LifeTime).toString();
            }

            let xx = this.Player.getPosition().x - this.node.getPosition().x;
            let yy = this.Player.getPosition().y - this.node.getPosition().y;
            let distance = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));
            let angle = Math.atan2(yy, xx);

            if(this.GameManager.getComponent('GameManager').Skill_2_Type == Common.PassiveSkillNum.Magnet){
                if(distance < 120){
                    let moveSpeed = 200-distance+this.GameManager.getComponent('GameManager').PlayerSpeed2*5;
                    //moveSpeed *=GameSpeed;
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.cos(angle) * moveSpeed, Math.sin(angle) * moveSpeed);
                }
                else
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            }
            else
                if(distance < 50){
                    let moveSpeed = 100-distance+this.GameManager.getComponent('GameManager').PlayerSpeed2*5*GameSpeed;
                    //moveSpeed *=GameSpeed;
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.cos(angle) * moveSpeed, Math.sin(angle) * moveSpeed);
                }
                else
                    if(this.GameManager.getComponent('GameManager').Skill_2_Type == 2 && this.GameManager.getComponent('GameManager').PlayerNotMove){
                        let moveSpeed = 50+this.GameManager.getComponent('GameManager').PlayerSpeed2*1;
                        //moveSpeed *=GameSpeed;
                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.cos(angle) * moveSpeed, Math.sin(angle) * moveSpeed);
                    }
                    else
                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
               
        }
        else{
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
        }
     },
        
});