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

  @property
  text: string = "hello";

  @property(cc.Label)
  Cabel: cc.Label = null;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}
  @property(cc.Node) mask: {
    type: cc.Node;
    default: null;
  };
  @property(cc.Node) dlg: {
    type: cc.Node;
    default: null;
  };
  mask_capacity = 100;

  start() {
    this.node.active = false;
  }

  show_dlg() {
    this.node.active = true;
    this.Cabel.string; //cout
    this.mask_capacity = 0;
    var ac1 = cc.fadeTo(0.3, this.mask_capacity);
    this.mask.type.runAction(ac1);

    this.dlg.type.scale = 0;
    var ac2 = cc.scaleTo(0.3, 1).easing(cc.easeBackOut());
    this.dlg.type.runAction(ac2);
  }
  hide_dlg() {
    this.node.active = false;
    // var ac1 = cc.fadeOut(0.3);
    // this.mask.type.runAction(ac1);
    // var ac2 = cc.scaleTo(0.3,0).easing(cc.easeBackIn());
    // var end_func=cc.callFunc(function(){
    //     this.node.active = false;

    // }.bind(this))
    // var seq =cc.sequence([ac2,end_func]);
    // this.dlg.type.runAction(seq);
  }

  // update (dt) {}
}
