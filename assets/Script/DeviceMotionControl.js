cc.Class({
    extends: cc.Component,

    properties: {
        Player: {
            default: null,
            type: cc.Node,
        },
        _acc: cc.p(0, 0),
        init: cc.p(0, 0),
        label: {
            default: null,
            type: cc.Label,
        },
        label2: {
            default: null,
            type: cc.Label,
        },
        label3: {
            default: null,
            type: cc.Label,
        },
    },

    start(){
        this.InUse = false;
    },

    Prepare () {
        var self = this;
        if (CC_WECHATGAME){ 
            var self = this;
            window.wx.startAccelerometer({
                interval: 'game',
                success: function (res) {
                    console.log('startAccelerometer', 'success',res)
                },
                fail: function (res) {
                    console.log('startAccelerometer', 'fail')
                },
                complete: function (res) {
                    console.log('startAccelerometer', 'ok')
                }
            });

            window.wx.onAccelerometerChange(function(res) {
                self._acc.x = res.x;
                self._acc.y = res.y;
                if(self.node.getComponent('GameManager').GamePause == false){

                    let movex = self._acc.x - self.init.x;
                    let movey = self._acc.y - self.init.y;
                    self.label.string=res.x.toFixed(2)+","+res.y.toFixed(2);
                    self.label2.string=self.init.x.toFixed(2)+","+self.init.y.toFixed(2);
                    self.label3.string=movex.toFixed(2)+","+movey.toFixed(2);

                    if(movex < 0.05 && movex > -0.05 && movey < 0.05 && movey > -0.05){
                        self.InUse = false;
                    }
                    else{
                        self.InUse = true;
                        let nowAngle = Math.atan2(movey, movex);
                        let xAngle = nowAngle - self.initAngle;
                        xAngle = xAngle/Math.PI*180;
                        if(xAngle > 360)
                            xAngle -= 360;
                        if(xAngle < - 360)
                            xAngle += 360;
                        if(xAngle >5|| xAngle < -5){
                            //self.init.x = self._acc.x - Math.cos(nowAngle)*0.1;
                            //self.init.y = self._acc.y - Math.sin(nowAngle)*0.1;
                        }
                        self.Angle = nowAngle;
                    }
                                 
                }
            });
        }
    },


    GameInit:function(){
        this.init.x = 0;
        this.init.y = this._acc.y;
        this.initAngle = 0;
        this.Angle = 0;

    },

    //update (dt) {}

});
