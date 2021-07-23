import Dino from './dino';

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(Dino)
    dino:Dino = null;
    jumptimes:number=0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.node.getComponents(Dino);
        this.jumptimes = this.dino.jumptimes;
    }

    onBeginContact(other,self)
    {
        if(other.node.group == 'floor')
        {
            this.jumptimes = 0;
        }
    }

    start () {
        
    }

    update (dt) {
        this.jumptimes = this.dino.jumptimes;
        //console.log(this.jumptimes);
    }
}
