var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        ChooseSkill: {
            default: null,
            type: cc.Node,
        },
        SkillNum: {
            default: 0,
            displayName: '编号',
        },
        Choosed: {
            default: null,
            type: cc.Node,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.GameManager = cc.find("Canvas/GameManager");
        this.Choosed = this.node.getChildByName("Choosed");
        this.Choosed.active=false;

        this._initTouchEvent();
    },

    start () {

    },

    _initTouchEvent: function()
    {
        var self = this;

        self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
    },

    _touchStartEvent: function(event) {
        this.ChooseSkill.getComponent('ChooseSkill').ChooseSkill(this.SkillNum);
    },

    // update (dt) {},
});
