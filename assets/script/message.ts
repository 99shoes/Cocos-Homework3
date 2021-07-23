// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.EditBox)
    editbox:cc.EditBox=null;
    
    @property(cc.Button)
    button:cc.Button=null;
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Label)
    Cabel: cc.Label = null;
    
     onLoad () {
         this.button.node.on('click',this.callback,this);
     }
     callback(){
        let d = new Date;
        this.label.string = "有人說: "+ this.editbox.string;
        this.Cabel.string+=d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds()+" someone say "+this.editbox.string+'\n';
     }
    start () {

    }

    // update (dt) {}
}
