document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // MINI-JEU: CASSE-BRIQUES (Breakout)
    // ==========================================
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const startBtn = document.getElementById('startGameBtn');
        const overlay = document.getElementById('gameOverlay');
        const scoreDisplay = document.getElementById('gameScore');
        
        let ballRadius = 8;
        let x, y, dx, dy;
        let paddleHeight = 12;
        let paddleWidth = 100;
        let paddleX;
        let rightPressed = false;
        let leftPressed = false;
        let score = 0;
        let gameLoop;
        
        // Briques
        const brickRowCount = 4;
        const brickColumnCount = 7;
        const brickWidth = 70;
        const brickHeight = 20;
        const brickPadding = 10;
        const brickOffsetTop = 30;
        const brickOffsetLeft = 25;
        let bricks = [];
        
        function initGame() {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 4; // Vitesse X
            dy = -4; // Vitesse Y
            paddleX = (canvas.width - paddleWidth) / 2;
            score = 0;
            scoreDisplay.innerText = score;
            
            bricks = [];
            for(let c=0; c<brickColumnCount; c++) {
                bricks[c] = [];
                for(let r=0; r<brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
        }
        
        document.addEventListener("keydown", (e) => {
            if(e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
            else if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
        });
        document.addEventListener("keyup", (e) => {
            if(e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
            else if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
        });
        
        // Support Tactile pour mobile
        canvas.addEventListener("touchstart", handleTouch, {passive: true});
        canvas.addEventListener("touchmove", handleTouch, {passive: true});
        function handleTouch(e) {
            let relativeX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
            if(relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth/2;
            }
        }
        
        function collisionDetection() {
            for(let c=0; c<brickColumnCount; c++) {
                for(let r=0; r<brickRowCount; r++) {
                    let b = bricks[c][r];
                    if(b.status == 1) {
                        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score += 10;
                            scoreDisplay.innerText = score;
                            if(score == brickRowCount * brickColumnCount * 10) {
                                gameOver("Gagné ! Quel talent ! 🎉");
                            }
                        }
                    }
                }
            }
        }
        
        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#ec4899"; // Rose vibrant
            ctx.fill();
            ctx.closePath();
        }
        
        function drawPaddle() {
            ctx.beginPath();
            ctx.roundRect(paddleX, canvas.height-paddleHeight-5, paddleWidth, paddleHeight, 5);
            ctx.fillStyle = "#6366f1"; // Indigo
            ctx.fill();
            ctx.closePath();
        }
        
        function drawBricks() {
            for(let c=0; c<brickColumnCount; c++) {
                for(let r=0; r<brickRowCount; r++) {
                    if(bricks[c][r].status == 1) {
                        let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                        let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 4);
                        ctx.fillStyle = r % 2 === 0 ? "#14b8a6" : "#6366f1";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }
        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            collisionDetection();
            
            if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) dx = -dx;
            if(y + dy < ballRadius) dy = -dy;
            else if(y + dy > canvas.height-ballRadius) {
                if(x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                    // Effet de rebond directionnel
                    dx = 8 * ((x - (paddleX + paddleWidth/2)) / paddleWidth);
                }
                else {
                    gameOver("Perdu ! Essayez encore 👾");
                    return;
                }
            }
            
            if(rightPressed && paddleX < canvas.width-paddleWidth) paddleX += 7;
            else if(leftPressed && paddleX > 0) paddleX -= 7;
            
            x += dx;
            y += dy;
            gameLoop = requestAnimationFrame(draw);
        }
        
        function gameOver(msg) {
            cancelAnimationFrame(gameLoop);
            overlay.style.display = "flex";
            startBtn.innerText = msg;
        }
        
        startBtn.addEventListener('click', () => {
            overlay.style.display = "none";
            initGame();
            draw();
        });
        
        // Dessin initial sans bouger
        initGame();
        drawBricks();
        drawPaddle();
        drawBall();
    }

});
