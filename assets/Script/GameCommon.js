module.exports = {

    TouchType : cc.Enum({
        DEFAULT: 0,
        FOLLOW: 1,
    }),

    DirectionType : cc.Enum({
        FOUR: 4,
        EIGHT: 8,
        ALL: 0,
    }),

    ItemType : cc.Enum({
        upRotationSpeed: 0,
        upShootSpeed: 1,
        upBulletSpeed: 2,
        upBulletLifeTime: 3,
        upPlayerSpeed: 4,
        upSkill_1_MAX: 5,
        GetShield: 6,
    }),

    ActiveSkillType : cc.Enum({
        SlowTime: 0,
        Bomb: 1,
    }),

    LabelType : cc.Enum({
        UpdateLog: 0,
        Bomb: 1,
    }),

    DieActionType : cc.Enum({
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3,
    }),

    MessageType : cc.Enum({
        RemoveData: 0,
        SubmitData: 1,
        RankFriend: 2,
    }),

};