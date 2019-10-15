/*
    创建游戏场景
*/

let ground = new MyGround(positionX, positionY, td * squareWidth, tr * squareWidth);

/**
 * 初始化
 */
ground.init = function () {
    // 创建游戏场景
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = "#0ff";
    document.body.appendChild(this.viewContent);

    // 这个数组存储所有创建的小方块，用于与蛇头进行对比，决定蛇头的下一步走向
    this.SquareTable = [];

    // 创建地板里面的小方块，创建墙壁的小方块
    for(var y = 0;y < tr;y ++) {                    // 行，对应的是y轴的坐标
        this.SquareTable[y] = new Array(td);
        for(var x = 0;x < td;x ++) {                // 列，对应的是x轴的坐标
            if(x == 0 || x == td - 1 || y == 0 || y == tr - 1) {  // 创建是是墙壁
                var newSquare = SquareFactory.create('Wall', x, y, '#000');
            } else {                                              // 创建的是地板里面的小方块
                var newSquare = SquareFactory.create('Floor', x, y, 'gray');
            }
            this.viewContent.appendChild(newSquare.viewContent); // 把方块添加到了游戏场景当中 
            this.SquareTable[y][x] = newSquare;
        }
    }
}

/**
 * 移除游戏场景里的小方块
 */
ground.remove = function (x, y) {
    let curSquare = this.SquareTable[y][x];
    // 视觉上删除小方块
    this.viewContent.removeChild(curSquare.viewContent);
    // 数组中删除小方块
    this.SquareTable[y][x] = null;
}

/**
 * 添加游戏场景里的小方块
 */
ground.append = function (square) {
    // 添加到页面里
    this.viewContent.appendChild(square.viewContent);
    // 添加到数组里
    this.SquareTable[square.y][square.x] = square;
}