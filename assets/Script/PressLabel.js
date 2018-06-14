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
            default: Common.LabelType.UpdateLog,
            type: Common.LabelType,
            displayName: '类型',
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.GameManager = cc.find("Canvas/GameManager");
        this._initTouchEvent();
    },

    _initTouchEvent: function()
    {
        var self = this;

        self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
    },

    _touchStartEvent: function(event) {
        this.GameManager.getComponent('GameManager').OnPressLabel(this.Type);
    },

    // update (dt) {},
});
