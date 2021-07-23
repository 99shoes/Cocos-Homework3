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

  
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    static getNowDate():string{
        const date = new Date();
        let month:string|number = date.getMonth()+1;
        let strDate:string|number = date.getDate();
        if(month<=9){
            month="0"+month;
        
        }
        if(strDate<=9){
            strDate="0"+strDate;
        }
        return date.getFullYear()+"-"+month+"-"+strDate+" "+date.getHours()+":"+date.getMinutes()+':'+date.getSeconds();
    }
    start () {
       var a = this.getComponent(cc.Label);
        var x =  NewClass.getNowDate();
        this.label.string = a.string+ x;
    }

    // update (dt) {}
}
