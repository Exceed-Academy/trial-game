class mainScene {
  preload() {
    this.loadimage('player', 'assets/player.png');
    this.loadimage('coin', 'assets/coin.png');
  }

  create() {
    
    this.player = this.spawn(100, 100, 'player');
    this.coin = this.spawn(300, 200, 'coin');
    this.score = 0;

    let style = { font: '20px Arial', fill: '#fff' };
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

    this.arrow = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.physics.overlap(this.player, this.coin)) {
      this.hit();
    }

    if (this.arrow.right.isDown) {
      this.player.x += 3;
    } else if (this.arrow.left.isDown) {
      this.player.x -= 3;
    } 

    if (this.arrow.down.isDown) {
      this.player.y += 3;
    } else if (this.arrow.up.isDown) {
      this.player.y -= 3;
    } 
  }
  
  hit() {
    this.coin.x = Phaser.Math.Between(100, 600);
    this.coin.y = Phaser.Math.Between(100, 200);

    this.score += 10;
    this.scoreText.setText('score: ' + this.score);

    this.tweens.add({
      targets: this.player,
      duration: 200,
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
    });
  }
    
    
  // Exceed Academy Free Class Utility
  loadimage(name, location){
      this.load.image(name, location);
  }
    
  spawn(x, y, name){
      return this.physics.add.sprite(x, y, name);
  }
}

new Phaser.Game({
  width: 700,
  height: 300,
  backgroundColor: '#3498db',
  scene: mainScene,
  physics: { default: 'arcade' },
  parent: 'game',
});