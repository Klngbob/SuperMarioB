cc.Class({
    extends: cc.Component,

    properties: {
        scene:"Introduction"
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
