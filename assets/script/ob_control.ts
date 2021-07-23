// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  private speed: number = 0;
  public overhead: boolean = false;
  start() {
    this.speed = 50;
  }

  update(dt: number) {
    var s = this.speed * dt;
    this.node.x -= s; //障礙物移動
    if (this.node.x <= 0) {
      //  this.node.emit("vanish");

      this.node.destroy();
      console.log("destroy");
    }
  }
}
