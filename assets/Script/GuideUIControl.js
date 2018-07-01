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
        Step1: {
            default: null,
            type: cc.Node,
        },
        Step2: {
            default: null,
            type: cc.Node,
        },
        Step3: {
            default: null,
            type: cc.Node,
        },
        Step4: {
            default: null,
            type: cc.Node,
        },
        Step5: {
            default: null,
            type: cc.Node,
        },
        Pre: {
            default: null,
            type: cc.Node,
        },
        Next: {
            default: null,
            type: cc.Node,
        },
        CurrentStep: {
            default: null,
            visible: false,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.GameManager = cc.find("Canvas/GameManager");
    },

    Init: function(){
        this.Step1.active = true;
        this.Step2.active = false;
        this.Step3.active = false;
        this.Step4.active = false;
        this.Step5.active = false;
        this.Pre.active = false;
        this.Next.active = true;
        this.CurrentStep = 1;
    },

    NextStep: function(){
        if(this.CurrentStep==1){
            this.CurrentStep++;
            this.Pre.active = true;
            this.Step2.active = true;
            this.Step1.active = false;
            return;
        }
        if(this.CurrentStep==2){
            this.CurrentStep++;
            this.Step3.active = true;
            this.Step2.active = false;
            return;
        }
        if(this.CurrentStep==3){
            this.CurrentStep++;
            this.Step4.active = true;
            this.Step3.active = false;
            return;
        }
        if(this.CurrentStep==4){
            this.CurrentStep++;
            this.Next.active = false;
            this.Step5.active = true;
            this.Step4.active = false;
            return;
        }
    },

    PreStep: function(){
        cc.log(this.CurrentStep);
        if(this.CurrentStep==2){
            this.CurrentStep--;
            this.Pre.active = false;
            this.Step1.active = true;
            this.Step2.active = false;
            return;
        }
        if(this.CurrentStep==3){
            this.CurrentStep--;
            this.Step2.active = true;
            this.Step3.active = false;
            return;
        }
        if(this.CurrentStep==4){
            this.CurrentStep--;
            this.Step3.active = true;
            this.Step4.active = false;
            return;
        }
        if(this.CurrentStep==5){
            this.CurrentStep--;
            this.Next.active = true;
            this.Step4.active = true;
            this.Step5.active = false;
            return;
        }
    },

    // update (dt) {},
});
