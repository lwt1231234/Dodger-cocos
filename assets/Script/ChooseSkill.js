var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        SkillType: {
            default: Common.SkillType.Active,
            type: Common.SkillType,
            displayName: '类型',
        },
        SkillNum: {
            default: 2,
            displayName: '数量',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        this.GameManager = cc.find("Canvas/GameManager");

        this.SkillList = new Array(this.SkillNum);
        this.SkillList[0] = this.node.getChildByName("view").getChildByName("content").getChildByName("Skill0");
        this.SkillList[1] = this.node.getChildByName("view").getChildByName("content").getChildByName("Skill1");

        if(this.SkillType == Common.SkillType.Active)
            if(this.GameManager.getComponent('GameManager').Skill_1_Type ==null){
                this.GameManager.getComponent('GameManager').Skill_1_Type = 0;
                this.SkillList[0].getComponent('OneSkill').Choosed.active=true;
            }

        if(this.SkillType == Common.SkillType.Passive)
            if(this.GameManager.getComponent('GameManager').Skill_2_Type ==null){
                this.GameManager.getComponent('GameManager').Skill_2_Type = 0;
                this.SkillList[0].getComponent('OneSkill').Choosed.active=true;
            }
    },

    ChooseSkill :function(Num){
        var i;
        if(this.SkillType == Common.SkillType.Active)
            this.GameManager.getComponent('GameManager').Skill_1_Type = Num;
        if(this.SkillType == Common.SkillType.Passive)
            this.GameManager.getComponent('GameManager').Skill_2_Type = Num;
        for(i=0;i<this.SkillNum;i++){
            if(i==Num)
                this.SkillList[i].getComponent('OneSkill').Choosed.active=true;
            else
                this.SkillList[i].getComponent('OneSkill').Choosed.active=false;
        }
    },
    // update (dt) {},
});
