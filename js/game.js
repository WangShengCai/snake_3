/*
    这个文件里面存放的是整个逻辑的处理
*/

let game = new MyGame();
game.timer = null;
game.score = 0;

game.init = function () {
    // 游戏广场的初始化
    ground.init();
    // 蛇的初始化
    snake.init();
    // 随机生成食物
    createFood();

    // 绑定事件
    document.onkeydown = function (e) {
        if(e.key == 'ArrowLeft' && snake.direction != directionNum.right) {
            snake.direction = directionNum.left;
        } else if(e.key == 'ArrowUp' && snake.direction != directionNum.down) {
            snake.direction = directionNum.top;
        } else if(e.key == 'ArrowRight' && snake.direction != directionNum.left) {
            snake.direction = directionNum.right;
        } else if(e.key == 'ArrowDown' && snake.direction != directionNum.top) {
            snake.direction = directionNum.down;
        }
    }

    let btn = document.querySelector('.btn');
    btn.onclick = function () {
        game.start();
    }
}
game.init();

game.start = function () {
    this.timer = setInterval(function () {
        snake.getCollidSquare();
    }, intervalTime);
}

game.over = function () {
    clearInterval(this.timer);
    alert(`当前得分：${game.score} 分`);
    document.querySelector('.score').innerHTML = `当前得分：0 分`;
    this.init();
}

// 创建食物
function createFood() {
    // 食物的坐标
    let x = null;
    let y = null;
    // 循环停止的条件
    let flag = true;

    while(flag) {                                                  // 去除墙身上的范围
        x = Math.round(Math.random() * (td - 2) + 1);
        y = Math.round(Math.random() * (tr - 2) + 1);
        let ok = true;
        for(let node = snake.head; node; node = node.next) {        // 去除蛇身上的范围
            if(x == node.x && y == node.y) {
                ok = false;
                break;
            }
        }
        // 如果oK为true，表示上面的for循环已经走完了，上面的条件不满足，就说明食物不在蛇的身上，可以跳出while循环，如果ok为false，表示上面的for循环已经走完了，上面的条件满足了，就说明食物在蛇的身上，还要继续进行下一次的判断
        if(ok) {
            flag = false;
        }
    }

    let food = SquareFactory.create('Food', x, y, 'yellow');
    ground.remove(food.x, food.y);
    ground.append(food);
}