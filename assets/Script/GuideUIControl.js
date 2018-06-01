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
        this.node.active = false;
        this.GameManager.getComponent('GameManager').GameInit();
    },

    // update (dt) {},
});
