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
        playerNode: {
            default: null,
            type: cc.Node,
            displayName: '被操作的目标Node',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function()
    {
        this.GameManager = cc.find("Canvas/GameManager");
        // joy下的Game组件
        this._initTouchEvent();
        this.InTouch = false;
    },


    //对圆圈的触摸监听
    _initTouchEvent: function()
    {
        var self = this;

        self.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, self);

        self.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, self);

        // 触摸在圆圈内离开或在圆圈外离开后，摇杆归位，player速度为0
        self.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, self);
    },

    _touchStartEvent: function(event) {
        this.StartPos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.LastPos = this.StartPos;
        this.ThisPos = this.StartPos;
        this.InTouch = true;
    },

    _touchMoveEvent: function(event){
        this.ThisPos = this.node.convertToNodeSpaceAR(event.getLocation());
    },

    _touchEndEvent: function(event){
        this.EndPos = this.node.convertToNodeSpaceAR(event.getLocation());
        let movex = this.EndPos.x - this.StartPos.x;
        let movey = this.EndPos.y - this.StartPos.y;
        let min = 20000;
        if(this._getDistance(this.ThisPos,this.StartPos)<min){
            this.playerNode.getComponent('PlayerControl').TouchDev = cc.v2(0,0);
            //cc.log(222);
        }
        this.InTouch = false;
    },

    _getDistance: function(pos1, pos2)
    {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    },

    update (dt) {
        if(this.InTouch){
            let movex = this.ThisPos.x - this.LastPos.x;
            let movey = this.ThisPos.y - this.LastPos.y;
            let min = 10;
            if(this._getDistance(this.ThisPos,this.LastPos)<min){
                //this.playerNode.getComponent('PlayerControl').TouchDev = cc.v2(0,0);
                cc.log(222);
            }
            else{
                let Angle = Math.atan2(movey, movex);
                let distance = this._getDistance(this.ThisPos,this.LastPos);
                this._speed2 = this.GameManager.getComponent('GameManager').PlayerSpeed2;
                if(distance>5)
                    distance = 1;
                else
                    distance = distance / 5;
                this.playerNode.getComponent('PlayerControl').TouchDev = 
                cc.v2(Math.cos(Angle) * this._speed2 * 5 * distance,
                        Math.sin(Angle) * this._speed2 * 5 * distance);
                this.LastPos = this.ThisPos;
            }
        } 
    },
});
