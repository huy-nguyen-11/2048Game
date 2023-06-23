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
    lb_number: cc.Label = null;

    number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    lsNumber = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
    lsColor = [cc.Color.WHITE, cc.Color.YELLOW, cc.Color.RED,  cc.Color.BLUE,  cc.Color.GRAY, cc.Color.ORANGE, cc.Color.BLACK,cc.Color.CYAN, cc.Color.GREEN, cc.Color.MAGENTA,cc.Color.TRANSPARENT,cc.Color.MAGENTA];


    start () {

    }

    updateNumber (num) {
        console.log('on update number')
        this.number = num;
        this.lb_number.string = num + '';
        
        let index = this.lsNumber.indexOf(num);
        if (index >= 0)
            this.node.color = this.lsColor[index];
    }
}
