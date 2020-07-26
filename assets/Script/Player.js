cc.Class({//class是一个函数
    extends: cc.Component,//继承自cc.component的对象

    properties: {

        //主角跳跃高度
        jumpHeight:0,

        //主角跳跃持续时间
        jumpDuration:0,

        //最大移动速度(pixel per second)
        maxMoveSpeed:0,

        //加速度
        accel:0,
        
        // 辅助形变动作时间
        squashDuration: 0,
        
        //跳跃音效资源
        // jumpAudio:{
        //     default:null,
        //     type:cc.AudioClip
        // }
    },

    setJumpAction: function() {
        //跳跃上升
        var jumpUp=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        //下落
        var jumpDown=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        //添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        //var callback=cc.callFunc(this.playJumpSound,this);
        //不断重复
        //return cc.repeatForever(cc.sequence(jumpUp,jumpDown));
        // 形变
        var squash = cc.scaleTo(this.squashDuration, 1, 0.6);
        var stretch = cc.scaleTo(this.squashDuration, 1, 1.2);
        var scaleBack = cc.scaleTo(this.squashDuration, 1, 1);        
        //返回位置
        return cc.sequence(squash,stretch,jumpUp,scaleBack,jumpDown);
    },

    // playJumpSound:function(){
    //     cc.audioEngine.playEffect(this.jumpAudio,false);
    // },

    onKeyDown(event){
        //set a flag when key pressed
        switch(event.keyCode){
            case cc.macro.KEY.j:// 发射子弹
                this.game.spawnNewBullet();
                break;

            case cc.macro.KEY.a://前
                this.accLeft=true;
                break;
            
            case cc.macro.KEY.d://后
                this.accRight=true;
                break;
            
            case cc.macro.KEY.w://上
                this.accUp=true;
                break;
            
            case cc.macro.KEY.s://下
                this.accDown=true;
                break;

            case cc.macro.KEY.k://跳跃
                this.node.runAction(this.setJumpAction());
                break;
        }
    },

    onKeyUp(event){
        //unset a flag when key released
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.xSpeed=0;
                this.accLeft=false;
                break;
            
            case cc.macro.KEY.d:
                this.xSpeed=0;
                this.accRight=false;
                break;
            case cc.macro.KEY.w:
                this.ySpeed=0;
                this.accUp=false;
                break;
            case cc.macro.KEY.s:
                this.ySpeed=0;
                this.accDown=false;
                break;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        //初始化跳跃动作
        // this.jumpAction=this.setJumpAction();
        // this.node.runAction(this.jumpAction);

        //加速度方向开关
        this.accLeft=false;
        this.accRight=false;
        //主角当前水平方向速度
        this.xSpeed=0;
        this.ySpeed=0;

        //初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this); 
    },

    onDestory(){
        //取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start () {

    },

    update:function (dt) {
        //根据当前加速度方向每帧更新速度
        if(this.accLeft){
            //this.xSpeed-=this.accel*dt;
            this.xSpeed-=this.accel;
            
        }else if(this.accRight){
            //this.xSpeed+=this.accel*dt;
            this.xSpeed+=this.accel;
        }
        if(this.accUp){
            this.ySpeed+=this.accel;
        }else if(this.accDown){
            this.ySpeed-=this.accel;
        }

        //限制主角的速度不能超过最大值
        if(Math.abs(this.xSpeed)>this.maxMoveSpeed){
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        if(Math.abs(this.ySpeed)>this.maxMoveSpeed){
            // if speed reach limit, use max speed with current direction
            this.ySpeed = this.maxMoveSpeed * this.ySpeed / Math.abs(this.ySpeed);
        }
        //根据当前速度更新主角的位置
        if(this.node.x>(-this.node.width/2+this.node.parent.width/2)){//游戏主角碰右壁
            this.xSpeed=0;
            this.node.x=-this.node.width/2+this.node.parent.width/2;
        }
        if(this.node.x<(this.node.width/2-this.node.parent.width/2)){//游戏主角碰左壁
            this.xSpeed=0;
            this.node.x=this.node.width/2-this.node.parent.width/2;
        }
        if(this.node.y>(-this.node.height/2+this.node.parent.height/4)){//上边界
            this.ySpeed=0;
            this.node.y=-this.node.height/2+this.node.parent.height/4;
        }
        if(this.node.y<(this.node.height/2-this.node.parent.height/4)){//下边界
            this.ySpeed=0;
            this.node.y=this.node.height/2-this.node.parent.height/4;
        }
        this.node.x+=this.xSpeed*dt;
        this.node.y+=this.ySpeed*dt;
    },
});
