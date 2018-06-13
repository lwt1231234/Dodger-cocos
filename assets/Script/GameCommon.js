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

};