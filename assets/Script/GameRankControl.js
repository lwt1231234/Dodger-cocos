cc.Class({
    extends: cc.Component,
    properties: {
        rankingScrollView: cc.Sprite,//显示排行榜
    },

    start() {
        if (CC_WECHATGAME) {
            //window.wx.showShareMenu({withShareTicket: true});//设置分享按钮，方便获取群id展示群排行榜
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 650;
            window.sharedCanvas.height = 500;
            console.log("GameRankControl.start");
        }
    },
    GetFirendRank() {
        if (CC_WECHATGAME) {
            // 发消息给子域
            window.wx.postMessage({
                messageType: 2,
                MAIN_MENU_NUM: "Score"
            });
            console.log("获取好友排行榜数据wx。Score");
        } else {
            cc.log("获取好友排行榜数据。Score");
        }
    },
    // 刷新子域的纹理
    _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update() {
        this._updateSubDomainCanvas();
    },
});
