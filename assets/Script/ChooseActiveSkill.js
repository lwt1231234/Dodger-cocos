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
            visible: false,
        },
        SkillList: {
            default: null,
            visible: false,
        },
        SkillTypeNum :{
            default: null,
            visible: false,
        },
        SkillType :{
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.GameManager = cc.find("Canvas/GameManager");

        this.SkillTypeNum = 2;
        this.SkillList = new Array(this.SkillTypeNum);
        this.SkillList[0] = this.node.getChildByName("view").getChildByName("content").getChildByName("Skill0");
        this.SkillList[1] = this.node.getChildByName("view").getChildByName("content").getChildByName("Skill1");
    },

    start () {

    },

    ChooseSkill :function(Type){
        var i;
        this.SkillType = Type;
        for(i=0;i<this.SkillTypeNum;i++){
            if(i==Type)
                this.SkillList[i].getComponent('OneActiveSkill').Choosed.active=true;
            else
                this.SkillList[i].getComponent('OneActiveSkill').Choosed.active=false;
        }
    },

    PressOK :function(){
        if(this.SkillType!=null){
            this.GameManager.getComponent('GameManager').Skill_1_Type = this.SkillType;
            this.GameManager.getComponent('GameManager').GameInit();
            this.node.active = false;
        }
        
    }

    // update (dt) {},
});
