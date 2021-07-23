// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Node)
    // bg:cc.Node = null;
    @property(cc.SpriteFrame)
    cherryAtls:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    beansAtls:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    orangeAtls:cc.SpriteFrame = null;
  
    // LIFE-CYCLE CALLBACKS:

     onLoad () {
      
        // this.bg.getChildByName("New Button").getComponent(cc.Button)
     }
     randFruit(typeCnt){
      let frames:Array<cc.SpriteFrame> =[this.beansAtls,this.cherryAtls,this.orangeAtls];
      if(typeCnt>frames.length){
         typeCnt = frames.length;
      }
      let randIndex = Math.floor(Math.random()* typeCnt);
      let sprite = this.node.getComponent(cc.Sprite);
      sprite.spriteFrame = frames[randIndex];
     }
   
    // start () {

    // }

    // update (dt) {}
}
