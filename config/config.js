let config =  {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 2000,
  height: 2000,
  physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
  scene:[Stage1, Story1]
};
