/*
    这个文件里面会存放一些全局性的东西
    1.常用的一些变量
    2.创建一个方块的构造函数
    3.根据方块的构造函数，创建出来的各个元素（蛇头，蛇身，蛇尾），这个地方所有的元素是一个实例对象，同时又是一个构造函数（生成相应的实例）
    4.
*/

// 游戏区域的大小
let td = 30;                    // 列数 => 宽度（一列中放30个小方块）
let tr = 30;                    // 行数 => 高度（一行中放30个小方块）

// 每个方块的大小
let squareWidth = 20;           // 一个方块的大小

// 游戏区域一开始的坐标
let positionX = 60;
let positionY = 100;

// 蛇的移动时间间隔
let intervalTime = 150;

// 方块的类型（标签），在生产的时候打上，以及与蛇头的时候根据类型做不同的事情
let squareTag = {
    move: 'move',
    eat: 'eat',
    die: 'die',
}

// 创建一个基础方块的构造函数
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}
// 由于单例对象创建一个后，它身上的信息就不会变了，那蛇要移动就需要更新位置信息，所以调用一个方法来更新位置信息
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px';
    this.viewContent.style.top = y * squareWidth + 'px';
}

// 整个游戏的广场，所有的元素都要放入到它里面
let MyGround = tool.single(Square);

// 地板里面的小方块
let MyFloor = tool.extends(Square);

// 墙壁里面的小方块
let MyWall = tool.extends(Square);

// 食物
let MyFood = tool.single(Square);

// 蛇的构造函数
let MySnake = tool.single();

// 蛇头
let MySnakeHead = tool.single(Square);

// 蛇身
let MySnakeBody = tool.extends(Square);

// 游戏逻辑的处理
let MyGame = tool.single();