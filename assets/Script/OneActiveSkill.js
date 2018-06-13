var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        ChooseActiveSkill: {
            default: null,
            type: cc.Node,
            visible: false,
        },
        Type: {
            default: Common.ActiveSkillType.SlowTime,
            type: Common.ActiveSkillType,
            displayName: '类型',
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
        this.ChooseActiveSkill = cc.find("Canvas/ChooseActiveSkill");
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
        this.ChooseActiveSkill.getComponent('ChooseActiveSkill').ChooseSkill(this.Type);
    },

    // update (dt) {},
});
