// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  trap: cc.Prefab = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.ins_pre();
  }
  ins_pre() {
    for (var i = 0; i < 100; i++) {
      var pre = cc.instantiate(this.trap);
      this.node.addChild(pre);
      if (i % 3 == 0) pre.scale = 0.8;
      else if (i % 8 == 0) pre.scale = 0.5;
      else pre.scale = 0.3;
      // var r = Math.floor(Math.random() * 100 + 200);
      pre.setPosition(400 + 200 * i, -100);
    }
  }

  start() {}

  // update (dt) {}
}
