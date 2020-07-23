cc.Class({
    extends: cc.Component,

    properties: {
        scene:"Inovation"
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    changeScene(){
        cc.director.loadScene(this.scene);
    },

    // update (dt) {},
});
