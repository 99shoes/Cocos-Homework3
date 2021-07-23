import Hero from "./hero";
import Obcontrol from "./ob_control";
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
  mapNode: cc.Node = null;
  @property(cc.AudioClip)
  audio: cc.AudioClip = null;
  @property(cc.AudioClip)
  stopaudio: cc.AudioClip = null;
  @property(cc.Button)
  st: cc.Button = null; //button click start
  // LIFE-CYCLE CALLBACKS:
  @property(Hero)
  hero: Hero = null;

  @property(cc.Label)
  showscore: cc.Label = null;
  private score: number = 0;
  private speed: number = 50;
  private tmpX: number = 125;
  onLoad() {
    this.hero.node.on("dead", () => {
      this.stoping();
    });
    this.hero.node.on("getscore", () => {
      this.getscore();
    });
    cc.director.getPhysicsManager().enabled = true;
    //cc.director.getPhysicsManager().debugDrawFlags = 1;
    // var clickEventHandler = new cc.Component.EventHandler();
    // clickEventHandler.target = this.node; // 这个 node 节点
    cc.audioEngine.playMusic(this.audio, true);
  }
  stoping() {
    cc.audioEngine.playMusic(this.stopaudio, true);
    cc.director.pause(); //取消所有場景的update
    // this.st.node.once('click', cc.director.loadScene.bind(cc.director, 'game'))
    this.st.node.once("click", () => {
      cc.director.resume();
      cc.director.loadScene("game");
    }); //error function
  }
  start() {}

  getscore() {
    this.score += 1;
    this.showscore.string = "分數:" + this.score;
  }
  // update(dt: number) {
  //   var s = this.speed * dt;
  //   this.tmpX -= s; //障礙物移動
  //   console.log("s", this.tmpX);
  //   // console.log(this.hero.node.x);
  //   if (this.tmpX <= 0) {
  //     //  this.node.emit("vanish")
  //     this.tmpX = 100;
  //     this.score += 1;
  //     this.showscore.string = "分數:" + this.score;
  //   }
  //   // onLoad () {}
  // }
}
