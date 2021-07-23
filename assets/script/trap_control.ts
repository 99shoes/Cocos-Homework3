const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    speed:number=200;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    update (dt) {
        let s=this.speed*dt;
        this.node.x-=s;
    }
}
