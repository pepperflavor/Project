import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";


const WIDTH = 700;
const HEIGHT = 900;
const BIRD_POSITION = {x: WIDTH * 0.1, y: HEIGHT/2}

const SHARED_CONFIG={
  width : WIDTH,
  height : HEIGHT,
  startPosition : BIRD_POSITION
}


const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade",
    arcade: {
    //   gravity:{y :200},
      debug: true,
    },
  },
  scene: [new PlayScene(SHARED_CONFIG)]
};

// function preload(){
//     //debugger
  
//     
// }


// // x값이 넓이보다 커지면 다시 처음으로 돌아가게
// // x값이 0보다 작아지면 다시 오른쪽으로 가게

// function update(time, delta){
//     if(bird.y > config.height || bird.y < -bird.height){
//         alert('you have lost')
//         restartPlayerPosition();
//     }

    
// }





new Phaser.Game(config);