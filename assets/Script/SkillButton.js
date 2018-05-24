cc.Class({
    extends: cc.Component,

    properties: {
        GameManager: {
            default: null,
            type: cc.Node,
            visible: false,
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

        self.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, self);

        // 触摸在圆圈内离开或在圆圈外离开后，摇杆归位，player速度为0
        self.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, self);
    },

    _touchStartEvent: function(){
        this.GameManager.getComponent('GameManager').Skill_1_On = true;
    },

    _touchEndEvent: function(){
        this.GameManager.getComponent('GameManager').Skill_1_On = false;
    },

    // update (dt) {},
});
