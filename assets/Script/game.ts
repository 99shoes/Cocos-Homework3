const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.SpriteFrame)
    cherryAtls: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    beansAtls: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    orangeAtls: cc.SpriteFrame = null;

    @property(cc.Button)
    button1: cc.Button = null;

    @property(cc.Prefab)
    fruitPrefab: cc.Prefab = null;

    @property(cc.Node)
    ctrlAreaNode: cc.Node = null;

    @property(cc.Label)
    hintlabel: cc.Label = null;

    Scores = 0;

    onLoad() {
        this.initMap();
        var count = this.ctrlAreaNode.childrenCount;
        console.log(count);
        this.button1.node.on("click", () => this.nextFruit());
        this.node.getComponent(cc.Sprite);
    }

    initMap() {
        let fruitCnt = 15;
        for (let i = 0; i < fruitCnt; i++) {
            let fruitNode = cc.instantiate(this.fruitPrefab);

            fruitNode.getComponent("fruit").randFruit(15); //亂術跑圖案
            this.ctrlAreaNode.addChild(fruitNode);

            console.log();
        }
    }

    nextFruit() {
        //child 接收node
        const tp: boolean[] = [...new Array(15)].fill(false); // 要修飾詞const /或let
        this.Scores -= 10;
        const parent = this.ctrlAreaNode;
        let frames: Array<cc.SpriteFrame> = [this.beansAtls, this.cherryAtls, this.orangeAtls];
        parent.children.forEach((node) => (node.scale = 1));
        for (let k = 0; k < 15; ++k) {
            let i = 0;
            this.schedule(
                function () {
                    this.button1.enabled = false;
                    let last: string = parent.children[k].getComponent(cc.Sprite).spriteFrame.name;
                    i++;
                    while (last == parent.children[k].getComponent(cc.Sprite).spriteFrame.name) {
                        parent.children[k].getComponent(cc.Sprite).spriteFrame = frames[Math.floor(Math.random() * 3)];
                    }
                    console.log(i);
                    if (i == 31 && k === 14) {
                        parent.children.forEach((node, idx) => {
                            if (node.getComponent(cc.Sprite).spriteFrame.name === this.cherryAtls.name) {
                                this.Scores += 2;
                                tp[idx] = true;
                                cc.tween(node)
                                    .to(1, { scale: 2 }) //設定動畫
                                    .call(() => {
                                        tp[idx] = false;
                                        if (tp.every((flag) => !flag)) {
                                            // flag可以任意取  error function =!flag
                                            this.button1.enabled = true;
                                        }
                                    })
                                    .start(); //動畫開始，按照順序跑to 接下來是 call
                            }
                        });
                    }
                },
                0.1,
                30
            );
        }
    }

    update() {
        this.hintlabel.string = "Scores: " + this.Scores;
    }
}
