/*
    这个文件里面存入的是一些蛇本身的操作
*/

let snake = new MySnake();

// 蛇头
snake.head = null;
// 蛇尾         
snake.tail = null;

// 用来处理蛇走的方向
let directionNum = {
    left: {
        x: -1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    right: {
        x: 1,
        y: 0
    },
    down: {
        x: 0,
        y: 1
    }
}

/**
 * 初始化方法
 */
snake.init = function () {
    // 创建蛇头，蛇身，蛇尾并添加到页面中
    let snakeHead = SquareFactory.create('SnakeHead', 3, 1, '#f40');
    let snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    let snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    // 创建完对象了，将这两个变量更新一个
    snake.head = snakeHead;
    snake.tail = snakeBody2;

    // 先删除具体的格子，再添加与之相对应的格子
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);
    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    // 形成链表关系
    snakeHead.next = snakeBody1;
    snakeHead.last = null;
    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    // 把位置信息存储在蛇身上，在一上来默认先往右边走
    snake.direction = directionNum.right;
}

// 处理碰撞后的策略
snake.collideMethod = {
    // 移动
    move: function (square, boolean) {
        // 创建新蛇身体
        let newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');
        newBody.next = snake.head.next;
        newBody.next.last = newBody
        newBody.last = null;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 创建新蛇头
        let newHead = SquareFactory.create('SnakeHead', square.x, square.y, '#f40');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(square.x, square.y);
        ground.append(newHead);

        // 如果boolean为false时，就不吃(删除最后一个)，为true时，就吃(不删除最后一个)
        if(!boolean) {
            // 先创建一个地板再删除蛇尾
            let newFloor = SquareFactory.create('Floor',snake.tail.x, snake.tail.y, 'gray');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            // 
            // 更新链表
            snake.head = newHead;
            snake.tail = snake.tail.last;
        }
    },
    // 吃
    eat: function (square) {
        this.move(square, true);
        game.score ++;
        document.querySelector('.score').innerHTML = `当前得分：${game.score} 分`;
        createFood();
    },
    // 阵亡
    die: function (square) {
        game.over();
    },
}

// 这个方法用来获取要碰撞到的那个方块
snake.getCollidSquare = function () {
    // 要碰撞的方块是根据蛇头走的位置来进行计算的，蛇头要走到的那个方块的位置就是要碰撞的那个方块，算法是：蛇头的坐标+走的方向的坐标=碰撞方块的坐标
    let square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // 根据方块的类型去调用对应的处理方式，并把方块作为参数传递进去
    this.collideMethod[square.collid()](square);
}