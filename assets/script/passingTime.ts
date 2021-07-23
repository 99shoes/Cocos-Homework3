// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;
  loginTime: number = 0;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.loginTime = Date.now();
  }

  update(dt: number) {
    var lefttime = Date.now() - this.loginTime;
    var transfer = Math.floor(lefttime / 1000);
    this.label.string = "經過時間:" + transfer + "秒";
  }

  // update (dt) {}
}
