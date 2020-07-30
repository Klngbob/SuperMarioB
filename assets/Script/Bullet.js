cc.Class({
    extends: cc.Component,

    properties: {
        // 子弹速度
        xSpeed: 330,
        // 子弹可碰撞范围
        pickRadius:20,
    },


    onLoad () {
        
    },

    getLittleMonsterDistance: function () {
        var littleMonster = cc.find("Canvas/LittleMonster");
        var littleMonsterPos = littleMonster.getPosition();
        var bulletDist = this.node.position.sub(littleMonsterPos).mag();
        return bulletDist;
    },

    onFired:function(){
        var monsterHp=cc.find("Canvas/LittleMonster/HP");
        var monster = cc.find("Canvas/LittleMonster");
        var hp=monsterHp.getComponent(cc.ProgressBar);
        //console.log(hp.progress);
        hp.progress-=0.2;
        //console.log(hp.progress);
        this.node.destroy();
        console.log(hp.progress);
        if(hp.progress <= 1e-7){
            monster.destroy();
            console.log("Ohh! You kill the monster! ");
        }
    },

    start () {

    },

    update (dt) {
        // 子弹运行
        this.node.x += this.xSpeed * dt;
        // 子弹自动销毁
        if (this.node.x > (this.node.parent.width/2 + 50)){
            this.node.destroy();
            return;
        }
        // 子弹攻击后销毁
        if(this.getLittleMonsterDistance()<this.pickRadius){
            //调用收集行为
            console.log("Ohh! Yu Zhongkun is so handsome! ");
            this.onFired();
            return;
        }
    },
});
