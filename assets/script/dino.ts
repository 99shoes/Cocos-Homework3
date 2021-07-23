const {ccclass, property} = cc._decorator;

const Input={};

@ccclass
export default class NewClass extends cc.Component {

    firstHeight:number=0;
    currentTween=null;
    public jumptimes:number=0;
    dashtimes:number=0;
    dashDuration:number=0.1;
    jumpDuration:number=0.3;
    _speed: number = 300;
    sp:cc.Vec2 = cc.v2(0,0);
    anima:string = 'idle';
    dinoAnim:cc.Animation=null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.firstHeight=this.node.y;
        //console.log(this.firstHeight);
        this.dinoAnim=this.node.getComponent(cc.Animation);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeydown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyup,this);

        var interval = 1.5;
        // 重复次数
        var repeat = 1000;
        // 开始延时
        var delay = 1;
        this.schedule(function() {
            // 这里的 this 指向 component
            this.dashtimes=0;
            //console.log('ok');
        }, interval, repeat, delay);
    }

    onDestroy()
    {
        //可寫可不寫
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeydown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyup,this);
    }

    setAnimation(ani)
    {
        if(this.anima == ani)return;
        
        this.anima = ani;
        this.dinoAnim.play(ani);
    }

    onKeydown(e)
    {
        Input[e.keyCode] = 1;
    }

    onKeyup(e)
    {
        if(e.keyCode==cc.macro.KEY.space && this.jumptimes<2)
        {
            this.jumptimes++;

            this.currentTween?.stop();
            this.currentTween = cc.tween(this.node)
            .then(this.jumpUp())
            .call(()=>{
                this.currentTween = cc.tween(this.node)
                .then(this.jumpDown())
                .call(()=>{
                    //console.log('ok');
                    this.jumptimes=0;
                    this.dinoAnim.play('idle');
                })
                .start();
            })
            .start();
            this.dinoAnim.play('jump');
        }
        else if(e.keyCode==cc.macro.KEY.n && this.dashtimes==0)
        {
            this.dashtimes++;
            this.currentTween?.stop();

            if(this.node.scaleX<0)
            {
                this.currentTween = cc.tween(this.node)
                .then(this.DashLeft())
                .call(()=>{
                    //console.log('ok');
                    this.dinoAnim.play('idle');
                })
                .start();
            }
            else
            {
                this.currentTween = cc.tween(this.node)
                .then(this.DashRight())
                .call(()=>{
                    //console.log('ok');
                    this.dinoAnim.play('idle');
                })
                .start();
            }
            this.dinoAnim.play('dash');
        }
        Input[e.keyCode] = 0;
    }

    DashRight()
    {
        let dash = cc.tween().to(this.dashDuration, { x: this.node.x+120}, { easing: 'sineOut' });
        return dash;
    }

    DashLeft()
    {
        let DashLeft = cc.tween().to(this.dashDuration, { x: this.node.x-120}, { easing: 'sineOut' });
        return DashLeft;
    }

    jumpUp() 
    {
        let jumpUp = cc.tween().to(this.jumpDuration, { y: this.node.y+80}, { easing: 'sineOut' });
        return jumpUp;
    }

    jumpDown()
    {
        let Duration = (this.node.y-this.firstHeight)/264;
        let jumpDown = cc.tween().to(Duration, { y: -60}, { easing: 'sineIn' });
        return jumpDown;
    }


    update (dt) {


        let anima=this.anima;
        let scaleX=Math.abs(this.node.scaleX);
        let lv=this.node.getComponent(cc.RigidBody).linearVelocity;

        if(Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left])
        {
            this.sp.x=-1;
            this.node.scaleX=-scaleX;
            anima='run';
        }
        else if(Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right])
        {
            this.sp.x=1;
            this.node.scaleX=scaleX;
            anima='run';
        }
        else
        {
            this.sp.x=0;
            anima='idle';
        }

        if(this.sp.x)
        {
            lv.x = this.sp.x * this._speed;
        }
        else
        {
            lv.x = 0;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = lv;       

    
        if(anima)
        {
            this.setAnimation(anima);
        }

        
        
    }
}
