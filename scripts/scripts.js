//field
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

//one cell size in px
var grid = 16;

//speed of snake
var count = 0;

//snake itself
var snake = {
    // coords
    x: 160,
    y: 160,

    //speed
    dx: 160,
    dy: 0,

    //tail
    cells: [],

    //starting length
    maxCells: 4
};

//food
var apple = {
    //coords
    x: 320,
    y: 320
};


// random num generator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

//main game loop
function loop() {
    requestAnimationFrame(loop);

    if (++count < 4) {
        return;
    };

    count = 0;
    context.clearRect(0, 0, canvas.clientWidth, canvas.height);

    //snake speed
    snake.x += snake.dx;
    snake.y += snake.dy;

    //snake X teleport
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    };

    //snake Y teleport
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    };

    snake.cells.unshift(
        {
            x: snake.x,
            y: snake.y
        }
    );
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    };

    //drawing food
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    //snake movement
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index){
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }
        for (var i = index + 1; i < snake.cells.length; i ++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

//controls 
document.addEventListener('keydown', function(e) {
    //left
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    //up
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    //right
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    //down
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

requestAnimationFrame(loop);
