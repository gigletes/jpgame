class Stage1 extends Phaser.Scene {
  constructor () {
    super('Stage1');
  }

  preload () {

    this.load.spritesheet('Armata',
    'assets/Armata.png',
    {
      frameWidth: 100,
      frameHeight: 100
    }
    );

    this.load.spritesheet('Eurotank',
    'assets/Eurotank.png',
    {
      frameWidth: 100,
      frameHeight: 100
    }
    );

    this.load.image('Bialystok', 'assets/tilemapbroke.png');

  }

  create () {

    this.eurosTank = this.add.group ({
    });

    this.rusTank = this.add.group ({
    });

this.map = this.make.tilemap({ data: maps [0], tileWidth: 100, tileHeight: 100 });
// this.tiles = this.map.addTilesetImage("Bialystok", null, 100, 100, 0, 0);
this.tiles = this.map.addTilesetImage("Bialystok", null, 100, 100, 0, 0);
this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);

this.rusTank = this.add.group();
this.eurosTank = this.add.group();

//armata creation
this.armata = this.physics.add.sprite(550, 150, 'Armata').setInteractive();
this.armataSelect = 0;
this.eurotankDead = true;
this.armata.gamestats = {type:"Tank", strength:10}
this.rusTank.add(this.armata);
//attack anims for the Armata
this.anims.create({
    key: 'armataAttack',
    frames: this.anims.generateFrameNumbers('Armata', {start: 0, end: 7}),
    delay: 0,
    frameRate: 20,
});

//armata creation
this.armata = this.physics.add.sprite(550, 150, 'Armata').setInteractive();
this.armataSelect = 0;
this.eurotankDead = true;
this.armata.gamestats = {type:"Tank", strength:10}
this.rusTank.add(this.armata);
//attack anims for the Armata
this.anims.create({
    key: 'armataAttack',
    frames: this.anims.generateFrameNumbers('Armata', {start: 0, end: 7}),
    delay: 0,
    frameRate: 20,
});

//eurotank creation
this.eurotank = this.physics.add.sprite(450, 150, 'Eurotank').setInteractive();
this.eurotankSelect = 0;
this.eurotankDead = false;
this.eurotank.gamestats = {type:"Tank", strength:14}
this.eurosTank.add(this.eurotank);
//attack anims for the Eurotank
this.anims.create({
    key: 'eurotankAttack',
    frames: this.anims.generateFrameNumbers('Eurotank', {start: 0, end: 7}),
    delay: 0,
    frameRate: 20,
});


// this.armataStrength = 10;
// this.eurotankStrength = 14;

//defining unit stats at gamestart

// this.eurotank.setScale(.100);
// this.armata.setScale(.100);

this.turnOrder = 0;
this.lastMoveDir = 2;
//0 is up, 1 is right, 2 is down, 3 is left


//1 is European turn
//0 is Russian turn

this.cursors = this.input.keyboard.createCursorKeys();

this.physics.add.overlap(this.rusTank, this.eurosTank, function(tankr, tanke){
  tankr.gamestats.strength -= ( Phaser.Math.Between(3, 6) - Phaser.Math.RoundTo((tankr.gamestats.strength / 10), 0) );
  tanke.gamestats.strength -= ( Phaser.Math.Between(3, 6) - Phaser.Math.RoundTo((tanke.gamestats.strength / 14), 0) );
  console.log("Armata Strength:" + tankr.gamestats.strength);
  console.log("Eurotank Strength:" + tanke.gamestats.strength);
  //move the losing unit back
  console.log(this.lastMoveDir);
    if (this.turnOrder == 1){
        if (this.lastMoveDir == 2) {
          tankr.y -= 100;
        }
        if (this.lastMoveDir == 0) {
          tankr.y += 100;
        }
        if (this.lastMoveDir == 3) {
          tankr.x += 100;
        }
        if (this.lastMoveDir == 1) {
          tankr.x -= 100;
        }
      tankr.anims.play('armataAttack', true);
    }
    else {
      if (this.lastMoveDir == 2) {
        tanke.y -= 100;
      }
      if (this.lastMoveDir == 0) {
        tanke.y += 100;
      }
      if (this.lastMoveDir == 3) {
        tanke.x += 100;
      }
      if (this.lastMoveDir == 1) {
        tanke.x -= 100;
      }
      tanke.anims.play('eurotankAttack', true);
    };
}, null, this);

  }

  update () {

   // this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

//section that I use to test if the tanks are overlapping, by comparing x and y values. I'm a crazy genius, AND a moron!
//use turnOrder to figure out which tank moved last, and create a variable to determine what direction they last moved -
// - then move the tank that took more damage such that they are pushed back
//god, it's also proved necessary to check if the tank is dead so they don't fight after death
//none of this actually helps, god, why
// if ()) {
//
// //potentially desirable system that reduces damage as damage is taken - now implemented
//   this.armataStats.strength -= ( Phaser.Math.Between(3, 6) - Phaser.Math.RoundTo((this.armataStats.strength / 10), 0) );
//   this.eurotankStats.strength -= ( Phaser.Math.Between(3, 6) - Phaser.Math.RoundTo((this.eurotankStats.strength / 14), 0) );
//
// //normal system with a flat damage value
// // this.armataStats.strength -= Phaser.Math.Between(3, 6)
// // this.eurotankStats.strength -= Phaser.Math.Between(4, 7);
//
//   console.log("Armata Strength:" + this.armataStats.strength);
//   console.log("Eurotank Strength:" + this.eurotankStats.strength);
//
// //move the losing unit back
//   if (this.turnOrder == 1){
//       // this.armata.y -= 100;
//       this.armata.anims.play('armataAttack', true);
//   }
//   else {
//     // this.eurotank.y += 100;
//     this.eurotank.anims.play('eurotankAttack', true);
//   };
// }
// else {};

//selection functions
//the issue is that it just goes ahead to turn itself on, and then doesn't get turned off. what's the best way to fix this?
//the answer was alternating if/else statements. good to remember.

//armata
if (this.turnOrder == 0) {
  this.activeRus()
}

else {
  this.activeEurotank()
};

//eurotank
if (this.turnOrder == 1) {
  this.activeEurotank()
}

else {
  this.activeRus()
};

//armata movement
if (this.armataSelect == 1) {
  if (this.cursors.left.isDown) {
    this.armata.x -= 100;
    this.armata.angle = 90;
    // this.armata.setScale(.100);
    this.armataSelect = 0;
    this.turnOrder = 1;
    this.lastMoveDir = 3;
  }
  else {};

  if (this.cursors.right.isDown ) {
    this.armata.x += 100;
    this.armata.angle = -90;
    // this.armata.setScale(.100);
    this.armataSelect = 0;
    this.turnOrder = 1;
    this.lastMoveDir = 1;
  }
  else {};

  if (this.cursors.up.isDown) {
      this.armata.y -= 100;
      this.armata.angle = 180;
      // this.armata.setScale(.100);
      this.armataSelect = 0;
      this.turnOrder = 1;
      this.lastMoveDir = 0;
  }
  else {};

  if (this.cursors.down.isDown) {
      this.armata.y += 100;
      this.armata.angle = 0;
      // this.armata.setScale(.100);
      this.armataSelect = 0;
      this.turnOrder = 1;
      this.lastMoveDir = 2;
  }
  else {};

}

//eurotank movement
if (this.eurotankSelect == 1) {
  if (this.cursors.left.isDown) {
    this.eurotank.x -= 100;
    this.eurotank.angle = -90;
    // this.eurotank.setScale(.100);
    this.eurotankSelect = 0;
    this.turnOrder = 0;
    this.lastMoveDir = 3;

  }
  else {};

  if (this.cursors.right.isDown ) {
    this.eurotank.x += 100;
    this.eurotank.angle = 90;
    // this.eurotank.setScale(.100);
    this.eurotankSelect = 0;
    this.turnOrder = 0;
    this.lastMoveDir = 1;

  }
  else {};

  if (this.cursors.up.isDown) {
      this.eurotank.y -= 100;
      this.eurotank.angle = 0;
      // this.eurotank.setScale(.100);
      this.eurotankSelect = 0;
      this.turnOrder = 0;
      this.lastMoveDir = 0;

  }
  else {};

  if (this.cursors.down.isDown) {
      this.eurotank.y += 100;
      this.eurotank.angle = 180;
      // this.eurotank.setScale(.100);
      this.eurotankSelect = 0;
      this.turnOrder = 0;
      this.lastMoveDir = 2;

  }
else {};
}

//turn order block
//be sure to remember that turn 0 is Russia and turn 1 is Euros

//death and destroy function
if (this.eurotank.gamestats.strength <= 0){
  this.eurotank.destroy()
  this.eurotankDead = true;
}
else {};

if (this.armata.gamestats.strength <= 0){
  this.armata.destroy()
  this.armataDead = true;
}
else {};

  }

  //armata selection, contingent on it being russia's turn, meaning turnOrder = 0
  activeRus () {
  this.armata.on('pointerdown', function (pointer) {
    if (this.turnOrder == 0) {
      // this.armata.setScale(.8);
      this.armataSelect = 1;

    }
    else {};
  },this);
  };

  //eurotank selection, if it's europe's turn, turnOrder = 1
  activeEurotank() {
  this.eurotank.on('pointerdown', function (pointer) {
    if (this.turnOrder == 1) {
    // this.eurotank.setScale(.8);
    this.eurotankSelect = 1;

  }
  else {};
  },this);
  };

};
