cc.Class({
    extends: cc.Component,

    properties: {
        // 引用子弹预设资源
        bulletPrefab:{
            default: null,
            type: cc.Prefab
        },
        // player节点
        player:{
            default: null,
            type: cc.Node
        },
        // monster节点
        littleMonster:{
            default: null,
            type: cc.Node
        }

       
    },


    onLoad () {
        // 在Player组件上暂存Game对象的引用
        this.player.getComponent('Player').game = this;
    },

    spawnNewBullet: function (){
        // 生产新节点
        var newBullet = cc.instantiate(this.bulletPrefab);
        // 将新节点添加到Canvas下面
        this.node.addChild(newBullet);
        // 设置子弹的位置
        newBullet.setPosition(this.player.getPosition());
        newBullet.getComponent('Bullet').game = this;
    },

    /*destroyMonster: function(){
        var monsterHp=cc.find("Canvas/LittleMonster/HP");
        var monster = cc.find("Canvas/LittleMonster")
        var hp=monsterHp.getComponent(cc.ProgressBar);
        
    },*/

    start () {

    },

    update (dt) {
        
    },
});
