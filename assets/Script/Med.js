cc.Class({
    extends: cc.Component,

    properties: {
        //药水碰撞半径
        pickRadius:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
    },

    getPlayerDistance:function(){
        //获取玩家与药水瓶距离
        var player=cc.find("Canvas/Player");
        var playerPos=player.getPosition();
        //console.log(this.node.x,this.node.y);
        var dist = this.node.position.sub(playerPos).mag();
        //console.log("dist:",dist);
        return dist;
    },

    onPicked:function(){
        //收集到药水瓶加血
        var backnode=cc.find("Canvas/Player/HP");
        var hp=backnode.getComponent(cc.ProgressBar);
        //console.log(hp.progress);
        hp.progress+=0.4;
        //console.log(hp.progress);
        this.node.destroy();
    },
    start () {

    },

    update:function (dt) {
        if(this.getPlayerDistance()<this.pickRadius){
            //调用收集行为
            console.log("yes! baozi zhen de niubi!");
            this.onPicked();
            return;
        }
    },
});
