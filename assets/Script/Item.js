var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        Type: {
            default: Common.ItemType.upRotationSpeed,
            type: Common.ItemType,
            displayName: '类型',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
