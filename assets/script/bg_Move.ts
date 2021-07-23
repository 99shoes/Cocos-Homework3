// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  bg1: cc.Node = null;

  @property(cc.Node)
  bg2: cc.Node = null;

  @property(cc.Node)
  bg3: cc.Node = null;
  @property(cc.Node)
  ground1: cc.Node = null;
  @property(cc.Node)
  ground2: cc.Node = null;
  @property(cc.Node)
  ground3: cc.Node = null;
  private speed: number = 0;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.speed = 100;
  }

  update(dt: number) {
    var s = this.speed * dt;
    this.node.x -= s; //畫面往左移
    if (this.node.x <= -2017) {
      this.node.x = 40;
      this.ground1 = this.ground2;
      this.ground2 = this.ground3;
      this.ground3 = this.ground2;
      this.ground3.x = 40;
    }
  }
}
