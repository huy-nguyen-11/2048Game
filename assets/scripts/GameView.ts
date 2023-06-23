// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameView extends cc.Component {
    @property(cc.Prefab)
    itemBlock: cc.Prefab = null;

    @property(cc.Node)
    table: cc.Node = null;
    @property(cc.Node)
    PopUp: cc.Node = null;
    

    
    posBlock = [];
    arrNum = [];
    arrBlock = [];

    lsBlockCreate = [];

    newMatrix = [];
    //isplaying = true;
    
    
    onLoad() {


        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            switch (event.keyCode) {
                case cc.macro.KEY.up:
                    this.onMove('up');
                    break;
                case cc.macro.KEY.down:
                    this.onMove('down');
                    break;
                case cc.macro.KEY.left:
                    this.onMove('left');
                    break;
                case cc.macro.KEY.right:
                    this.onMove('right');
                    break;

                default:
                    break;
            }
        })

        this.arrNum = [0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0];

        // arr luu gia tri 
        this.arrBlock = [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0];//arr luu block


        // let numberTest = 2;
        //ve hinh.
        for (let hang = 0; hang < 4; hang++)
            for (let cot = 0; cot < 4; cot++) {
                var newBlock = cc.instantiate(this.itemBlock).getComponent('BlockManager');

                console.log(this.table.width, this.table.height);
                console.log(newBlock.node.width, newBlock.node.height);
                newBlock.node.x = this.table.x - this.table.width / 2 + (cot * newBlock.node.width * 1.13) + newBlock.node.width / 2;
                newBlock.node.y = this.table.y + this.table.height / 2 - (hang * newBlock.node.height * 1.13) - newBlock.node.height / 2;

                newBlock.updateNumber(0);
                this.node.addChild(newBlock.node);
                this.lsBlockCreate.push(newBlock);
            }
            


        this.startGame();
    }
    

    // update(dt){
    //   if(this.isplaying = false){
    //      return;
    //  }
    // }

    resetState() { // reset trang thai ban dau

        this.newMatrix = [];
        for (let i = 0; i < 4; i++) {
            this.newMatrix.push([]);
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++)
                this.newMatrix[i].push(0);
        }

    }

    getPositionVisible() { // ham kiem tra vi tri con trong
        let arrTemp = []

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.newMatrix[i][j] == 0) {
                    arrTemp.push({ hang: i, cot: j })
                }
            }
        }

        if (arrTemp.length == 0)
            return null;
        else {
            let vitri = Math.floor(Math.random() * arrTemp.length);
            return arrTemp[vitri];
        }
    }

    updateView(hang, cot, value) {
        this.lsBlockCreate[hang * 4 + cot].getComponent('BlockManager').updateNumber(value);
    }

    randomNumber() {
        let pos = this.getPositionVisible();
        if (pos != null) { // tim dc
            this.newMatrix[pos.hang][pos.cot] = 2;
            this.updateView(pos.hang, pos.cot, this.newMatrix[pos.hang][pos.cot]);
        }
        else {
            if (this.checkGameOver()) {
                this.gameOver();
                console.log('game over');
            }
        }

    }
    startGame() {
        // this.isplaying = true;
        this.resetState();
        this.randomNumber();
        this.randomNumber();
        // this.randomNumber();
        console.log('matrix: ', this.newMatrix);
        this.PopUp.active = false;

    }

    checkGameOver() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (j < 3)
                    if (this.newMatrix[i][j] == this.newMatrix[i][j + 1])
                        return false

                if (i < 3)
                    if (this.newMatrix[i][j] == this.newMatrix[i + 1][j])
                        return false

            }
        }

        return true
    }

    gameOver() {
        this.PopUp.active = true;
        // this.isplaying = false;
    }


    


    onMoveLeft() {
        for (let i = 0; i < 4; i++) { // for doi vi tri 
            for (let j = 0; j < 4; j++) {
                if (this.newMatrix[i][j] == 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (this.newMatrix[i][k] != 0) {
                            this.newMatrix[i][j] = this.newMatrix[i][k];
                            this.newMatrix[i][k] = 0;
                            break;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < 4; i++) { // for cong 
            for (let j = 1; j < 4; j++) {
                if (this.newMatrix[i][j] != 0 && this.newMatrix[i][j] == this.newMatrix[i][j - 1]) {
                    this.newMatrix[i][j - 1] *= 2;
                    this.newMatrix[i][j] = 0;
                }
            }
        }

        for (let i = 0; i < 4; i++) { // for doi vi tri 
            for (let j = 0; j < 4; j++) {
                if (this.newMatrix[i][j] == 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (this.newMatrix[i][k] != 0) {
                            this.newMatrix[i][j] = this.newMatrix[i][k];
                            this.newMatrix[i][k] = 0;
                            break;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.updateView(i, j, this.newMatrix[i][j]);
            }
        }


    }

    onMoveRight() {

        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 0; j--) {
                if (this.newMatrix[i][j] == 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (this.newMatrix[i][k] != 0) {
                            this.newMatrix[i][j] = this.newMatrix[i][k];
                            this.newMatrix[i][k] = 0;
                            break;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (this.newMatrix[i][j + 1] != 0 && this.newMatrix[i][j + 1] == this.newMatrix[i][j]) {
                    this.newMatrix[i][j + 1] *= 2;
                    this.newMatrix[i][j] = 0;
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 0; j--) {
                if (this.newMatrix[i][j] == 0) {
                    for (let k = j - 1; k >= 0; k--) {
                        if (this.newMatrix[i][k] != 0) {
                            this.newMatrix[i][j] = this.newMatrix[i][k];
                            this.newMatrix[i][k] = 0;
                            break;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.updateView(i, j, this.newMatrix[i][j]);
            }
        }
    }

    onMoveUp() {

        for (let j = 0; j < 4; j++) { // for doi vi tri 
            for (let i = 0; i < 4; i++) {
                if (this.newMatrix[i][j] == 0) {
                    for (let k = i + 1; k < 4; k++) {
                        if (this.newMatrix[k][j] != 0) {
                            this.newMatrix[i][j] = this.newMatrix[k][j];
                            this.newMatrix[k][j] = 0;
                            break;
                        }
                    }
                }
            }
        }

        for (let j = 0; j < 4; j++) { // for cong 
            for (let i = 1; i < 4; i++) {
                if (this.newMatrix[i][j] != 0 && this.newMatrix[i][j] == this.newMatrix[i - 1][j]) {
                    this.newMatrix[i - 1][j] *= 2;
                    this.newMatrix[i][j] = 0;
                }
            }
        }

        for (let j = 0; j < 4; j++) { // for doi vi tri 
            for (let i = 0; i < 4; i++) {
                if (this.newMatrix[i][j] == 0) {
                    for (let k = i + 1; k < 4; k++) {
                        if (this.newMatrix[k][j] != 0) {
                            this.newMatrix[i][j] = this.newMatrix[k][j];
                            this.newMatrix[k][j] = 0;
                            break;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.updateView(i, j, this.newMatrix[i][j]);
            }
        }


    }
    onMoveDown() {

        for (let j = 0; j < 4; j++) {
            for (let i = 3; i >= 0; i--) {
                if (this.newMatrix[i][j] == 0) {
                    for (let k = i - 1; k >= 0; k--) {
                        if (this.newMatrix[k][j] != 0) {
                            this.newMatrix[i][j] = this.newMatrix[k][j];
                            this.newMatrix[k][j] = 0;
                            break;
                        }
                    }
                }
            }
        }

        for (let j = 0; j < 4; j++) {
            for (let i = 2; i >= 0; i--) {
                if (this.newMatrix[i + 1][j] != 0 && this.newMatrix[i + 1][j] == this.newMatrix[i][j]) {
                    this.newMatrix[i + 1][j] *= 2;
                    this.newMatrix[i][j] = 0;
                }
            }
        }

        for (let j = 0; j < 4; j++) {
            for (let i = 3; i >= 0; i--) {
                if (this.newMatrix[i][j] == 0) {
                    for (let k = i - 1; k >= 0; k--) {
                        if (this.newMatrix[k][j] != 0) {
                            this.newMatrix[i][j] = this.newMatrix[k][j];
                            this.newMatrix[k][j] = 0;
                            break;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.updateView(i, j, this.newMatrix[i][j]);
            }
        }
    }

    onMove(huong) {
        console.log('huong ', huong);

        // xu ly di chuyen

        switch (huong) {
            case 'left':
                this.onMoveLeft();
                break;

            case 'right':
                this.onMoveRight();
                break;

            case 'up':
                this.onMoveUp();
                break;

            case 'down':
                this.onMoveDown();
                break;

            default:
                break;

        }


        // sau khi xu ly di chuyen xong thi tiep tuc tao moi
        this.randomNumber();

        console.log('matrix: ', this.newMatrix);
    }


}