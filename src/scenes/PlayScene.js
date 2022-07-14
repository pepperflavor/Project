import Phaser from "phaser";

// 파이프 갯수
const PIPE_TO_RENDER = 4;

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
    this.bird = null;
    this.pipes = null;

    this.pipeHorizontalDistance = 0;

    // 난니도 테이블
    this.difficultyTable = [3,5 ,10 , 15, 50, 100, 250, 500, 2000, 4000, 8000];
    // this.scoreTable = [1, 2, 3, 4, 5, 6, 7, 8];
    // this.difficultyTable = [2, 4, 8, 15, 20];

    // 파이프의 중간 공백범위 설정
    this.pipieVerticalDistanceRange = [350, 450];
    this.pipieHorizontalDistanceRange = [550, 650];

    this.DIFFICULTY_STEP = 5;
    this.init();
  }

  init() {
    // 점프력
    this.flapVelocity = 500; //250

    this.gravity = 800;

    // 파이프 기본 스피드
    this.pipeSpeed = -350;

    this.scoreStep = 1;

    this.diffSwitch = false;

    // 점수
    this.score = 0;
    this.scoreText = "";
  }

  preload() {
    this.load.image("sky_bg", "assets/newSky.png");

    //this.load.image("Player", "assets/bird.png");

    this.load.spritesheet("Player", "assets/bird_150-removebg-preview.png", {
      frameWidth: 150,
      frameHeight: 150,
      // spacing: 20,
    });

    this.load.image("pipe", "assets/pipe_skinny.png");
  }

  create() {
    this.createBG();
    this.createBird();
    this.createPipes();
    this.createColliders();
    this.createHandleInputs();

    //점수 출력 및 로컬에 저장
    this.createScore();

    // console.log(this.config.startPosition);
  }

  update() {
    console.log(this.pipeSpeed);
    this.checkGameStatus();
    this.recyclePipes();
  }

  //========= create 함수들
  createBG() {
    this.add.image(0, 0, "sky_bg").setOrigin(0);
  }

  createBird() {
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("Player", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.bird = this.physics.add
      .sprite(
        this.config.startPosition.x,
        this.config.startPosition.y,
        "Player"
      )
      .setOrigin(0)
      .setScale(0.8, 0.8)
      .setSize(84,55)
      .setOffset(40,60);
    this.bird.body.gravity.y = this.gravity;
    this.bird.setCollideWorldBounds(true);
    this.bird.play("fly");
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPE_TO_RENDER; i++) {
      // // 파이프 장애물
      // const upperPipe = this.physics.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, "pipe").setOrigin(0, 1);
      // const lowerPipe = this.physics.physics.add.sprite(upperPipe.x, upperPipe.y + pipieVerticalDistance, "pipe").setOrigin(0, 0);
      const upperPipe = this.pipes
        .create(0, 0, "pipe")
        .setImmovable(true)
        .setFlipY(true)
        .setOrigin(0, 1);

      const lowerPipe = this.pipes
        .create(0, 0, "pipe")
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }
    this.pipes.setVelocityX(this.pipeSpeed);
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createHandleInputs() {
    this.input.on("pointerdown", this.flap, this);
    this.input.keyboard.on("keydown-SPACE", this.flap, this);
  }

  checkGameStatus() {
    // 새가 천장이나 바닥에 닿아도 죽음
    if (
      this.bird.getBounds().bottom >= this.config.height ||
      this.bird.y <= 0
    ) {
      //this.restartPlayerPosition();
      this.gameOver();
    }
  }

  createScore() {
    this.score = 0;
    this.scoreText = this.add.text(20, 20, `Score : ${0}`, {
      fontSize: "32px",
      fill: "#000",
      fontStyle: "bold",
    });
    const bestScore = localStorage.getItem("bestScore") || 0;
    console.log(bestScore);
    this.add.text(16, 60, `Best Score : ${bestScore}`, {
      fontSize: "18px",
      fill: "#000",
      fontStyle: "bold",
    });
  }

  placePipe(uPipe, lPipe) {
    // pipeHorizontalDistance +=400;
    const rightMostX = this.getRightMostPipe();

    // 그때그때 위치 다르게 주기위해 for문안에 넣음
    const pipieVerticalDistance = Phaser.Math.Between(
      ...this.pipieVerticalDistanceRange
    );
    const pipeVerticalPosition = Phaser.Math.Between(
      0 + 20,
      this.config.height - 20 - pipieVerticalDistance
    );
    const pipieHorizontalDistance = Phaser.Math.Between(
      ...this.pipieHorizontalDistanceRange
    );

    uPipe.x = rightMostX + pipieHorizontalDistance + this.scoreStep * 5;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipieVerticalDistance;

    // lPipe.body.velocity.x = this.pipeSpeed;
    // uPipe.body.velocity.x = this.pipeSpeed;

    // lPipe.body.velocity.x = pipeSpeed;
    // uPipe.body.velocity.x = pipeSpeed;
  }

  recyclePipes() {
    const tempPipes = [];
    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        pipe.setVelocityX(this.pipeSpeed);

        // 장애물 재사용부분
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          // 이말과 같음 placePipe(...temPipes[0], temPipes)
          this.placePipe(...tempPipes);
          this.increaseScore();
        }
      }
    });
  }

  getRightMostPipe() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach(function (pipe) {
      rightMostX = Math.max(pipe.x, rightMostX);
    });

    return rightMostX;
  }

  gameOver() {
    // this.bird.x = this.config.startPosition.x;
    // this.bird.y = this.config.startPosition.y;

    this.physics.pause();

    this.bird.setTint(0xff0000);

    // console.log("@@@@@@@@@@@", bestScoreText);
    // 최고점수 로컬에 저장
    const bestScoreText = localStorage.getItem("bestScore");

    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (bestScoreText === "null") {
      this.bestScoreText = 0;
    }
    if (this.score > bestScore) {
      localStorage.setItem("bestScore", this.score);
    }

    // 알아서 일정시간 후에 게임 재시작
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });

    this.init();
  }

  restartPlayerPosition() {
    alert("you have lost");
    this.bird.x = this.config.startPosition.x;
    this.bird.y = this.config.startPosition.y;
    this.bird.body.velocity.y = 0;
  }

  // 캐릭터 점프력 설정 함수
  flap() {
    //재시작버튼 띄우기
    this.bird.body.velocity.y = -this.flapVelocity;
  }

  increaseScore() {
    this.score += this.scoreStep;
    this.scoreText.setText(`Score : ${this.score}`);
    this.setDifficulty();
  }

  setDifficulty() {
    // 점수한계치 [10, 150, 500, 1000, 1500, 2000, 3000]
    //            11    180   550

    this.difficultyTable.forEach((stageScore, idx) => {
      // 난이도 상승
      
        if (stageScore < this.score) {
          // 150            180
          // 중복 스테이지 적용 방지
          //   1                2
          if (this.prevStage !== idx) {
            this.pipeSpeed -= (idx + 1) * this.DIFFICULTY_STEP; // 10
            this.prevStage = idx;
            this.scoreStep += 2;
          }

          // 최대 속도 제한
          if (this.pipeSpeed < -900) {
            this.pipeSpeed += (idx + 1) * this.DIFFICULTY_STEP;
          }
        }
    });
  }

  changrStage() {}
}

export default PlayScene;
