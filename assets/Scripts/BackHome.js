cc.Class({
    extends: cc.Component,

    properties: {
        scene:"helloworld"
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
