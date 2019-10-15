// 1.创建管理者
function SquareFactory() {

}

SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;

    // 每一条生产线生产方块的时候都会调用这个方法，所以标签就要放到这个方法里面去打，我给每一个实例对象身上添加了一个collid方法，这个方法返回了一个信息，这个信息就是方块的标签
    square.collid = function () {
        return action;
    }
}

// 2.包装创建方块方法 => 代工厂
SquareFactory.prototype.Floor = function(x, y, color) {            // 地板
    let floor = new MyFloor(x, y, squareWidth, squareWidth);
    this.init(floor, color, squareTag.move);
    return floor;
}
SquareFactory.prototype.Wall = function(x, y, color) {             // 墙壁
    let wall = new MyWall(x, y, squareWidth, squareWidth);
    this.init(wall, color, squareTag.die);
    return wall;
}
SquareFactory.prototype.Food = function(x, y, color) {             // 食物
    let food = new MyFood(x, y, squareWidth, squareWidth);
    this.init(food, color, squareTag.eat);
    food.upDate(x, y);// 由于它是一个单例对象，所有在生产它的时候把位置信息更新正确
    return food;
}
SquareFactory.prototype.SnakeHead = function(x, y, color) {        // 蛇头
    let snakeHead = new MySnakeHead(x, y, squareWidth, squareWidth);
    this.init(snakeHead, color, squareTag.die);
    snakeHead.upDate(x, y);// 由于它是一个单例对象，所有在生产它的时候把位置信息更新正确
    return snakeHead;
}
SquareFactory.prototype.SnakeBody = function(x, y, color) {        // 蛇身
    let snakeBody = new MySnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color, squareTag.die);
    return snakeBody;
}

// 3.提供对外接口
SquareFactory.create = function (type, x, y, color) {
    // 抛出错误
    if(typeof SquareFactory.prototype[type] == 'undefined') {
        throw new Error('no this type 傻x');
    }
    // 让生产线都继承大工厂 ，这样通过生产线new出来的实例，就相当于通过大工厂new出来的实例是一样的
    SquareFactory.prototype[type].prototype = new SquareFactory();
    // 调用某一条生产线
    return new SquareFactory.prototype[type](x, y, color);
}