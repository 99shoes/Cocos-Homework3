import ob from "./show_ob";
import obcont from "./ob_control";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
const State = {
  stand: 1,
  attack: 2,
};
enum State2 {
  stand,
  attack,
}
@ccclass
export default class NewClass extends cc.Component {
  //代表掛載的腳本的node有cc.component的功能
  private lv: cc.Vec2 = new cc.Vec2();
  @property(cc.Vec2) // 有Property 則代表 可以在cocos做修正
  private sp: cc.Vec2 = new cc.Vec2();
  @property(cc.Integer)
  private speed: number = 0;
  private p1: cc.Vec2 = cc.v2(0, 0);
  private p2: cc.Vec2 = cc.v2(0, 0);
  private heroState: number;
  private anima: string;
  private heroAni: cc.Animation;
  private combo: number = 0;
  private whetherDeathOrNot: boolean = false;
  // LIFE-CYCLE CALLBACKS:
  private isUp: boolean = false;
  private animationState: cc.AnimationState = null;
  private jumpTimes: number = 0;
  private Input = {};
  //private ratio = {};
  private leftRatio: number = 1;
  private rightRatio: number = 1;
  @property(cc.Node)
  private map: cc.Node = null;

  onLoad() {
    this.sp = cc.v2(0, 0); //當前速度
    this.heroState = State.stand; //hero 的狀態
    this.anima = "idle";
    this.heroAni = this.node.getComponent(cc.Animation); //取得run animation
    this.heroAni.on(cc.Animation.EventType.FINISHED, () => {
      if (this.animationState.name === "jump") {
        this.isUp = false;
      }
    });
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeydown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyup, this);
    cc.systemEvent.emit; //用在自定義的
    this.schedule(() => {
      if (this.Input[cc.macro.KEY.d]) {
        this.rightRatio = this.rightRatio * 1.1;
      } else {
        this.rightRatio = 1;
      }
      if (this.Input[cc.macro.KEY.a]) {
        this.leftRatio = this.leftRatio * 1.1;
      } else {
        this.leftRatio = 1;
      }
    }, 0.1);
  }

  onDestroy() {
    //call this.destroy才會觸發
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeydown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyup, this);
  }
  setAni(anima: string) {
    if (this.anima == anima) return; //動畫相等則回傳
    this.anima = anima;
    this.animationState = this.heroAni.play(anima);
  }
  /**123 */ ///有說明的是系統的function
  onKeyup(e: cc.Event.EventKeyboard) {
    this.Input[e.keyCode] = 0;
    if (e.keyCode === cc.macro.KEY.space && this.jumpTimes <= 2) {
      this.node.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(
        this.getComponent(cc.RigidBody).linearVelocity.x,
        1.5 * this.speed
      );
      this.isUp = true;
      this.setAni("jump");
      this.jumpTimes++;
    }
  }
  onKeydown(e: cc.Event.EventKeyboard) {
    this.Input[e.keyCode] = 1;
  }

  onBeginContact(
    //只要有碰撞就會執行
    contact: cc.PhysicsContact,
    self: cc.PhysicsCollider,
    other: cc.PhysicsCollider
  ) {
    this.jumpTimes = 0;
    if (other.node.group === "death") {
      this.anima = "idle";
      this.destroy(); // this node.destroy()會去call ondestroy()
      this.node.emit("dead"); //每一次run過觸發一次
      //cc.director.loadScene("game");
    }
  }

  start() {}

  update(dt: number) {
    // this.map.children.forEach()拿取prefab的小孩
    this.p1 = cc.v2(this.node.convertToWorldSpaceAR(cc.v2(0, 0)));
    this.p2 = cc.v2(this.p1.x, -200);
    var results = cc.director
      .getPhysicsManager()
      .rayCast(this.p1, this.p2, cc.RayCastType.AllClosest);
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      var collider = result.collider.node.group; //collider是component，要用Node去抓屬性
      console.log(collider);
      if (
        collider === "death" &&
        !result.collider.getComponent(obcont).overhead
      ) {
        result.collider.getComponent(obcont).overhead = true; // 可以拿其他腳本function 或是Public屬性
        this.node.emit("getscore");
      }
    }
    let anima = this.anima;
    let scaleX = Math.abs(this.node.scaleX);
    let scaleY = Math.abs(this.node.scaleY);
    this.lv = this.node.getComponent(cc.RigidBody).linearVelocity; //拿取線性速度s
    const isLeft = this.Input[cc.macro.KEY.a] || this.Input[cc.macro.KEY.left];
    const isRight =
      this.Input[cc.macro.KEY.d] || this.Input[cc.macro.KEY.right];
    const isUp = this.Input[cc.macro.KEY.w] || this.Input[cc.macro.KEY.up]; //用監聽案件事件
    if (isLeft) {
      this.sp.x = -1;
      this.node.scaleX = -scaleX; //人物往左
      anima = "run";
    } else if (isRight) {
      this.sp.x = 1;
      this.node.scaleX = scaleX; //人物往右
      anima = "run";
    } else if (!isLeft && !isRight) {
      this.sp.x = 0;
      //anima = "idle";
    } else {
      this.sp.y = 0;
    }
    if (!isLeft && !isRight && !this.isUp) {
      anima = "idle";
    }
    if (this.sp.x && this.sp.y) {
      this.lv.x = this.sp.x * this.speed;
      this.lv.y = this.sp.y * this.speed;
    } else if (this.sp.x || this.sp.y) {
      if (this.sp.x < 0) this.lv.x = this.sp.x * this.speed * this.leftRatio;
      else this.lv.x = this.sp.x * this.speed * this.rightRatio;
      if (this.sp.y) this.lv.y = this.sp.y * this.speed;
    } else {
      this.lv.x = 0;
      //this.lv.y = 0;
    }
    this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;
    //console.log(this.node.getComponent(cc.RigidBody).linearVelocity);
    if (anima) {
      this.setAni(anima);
    }
  }
}
