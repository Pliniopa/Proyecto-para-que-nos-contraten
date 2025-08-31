//variables de configuracion del juego

import { assetfond, assetPlataforma, assetStar, assetBomb, assetDude, xa, ya, xb, yb, xc, yc, xd, yd, xe, ye, xj, yj, framer1, reb1, grav, velj1, velj2, text1 } from './Variables.js';
let plataform, player, cursors, stars;

//const Phaser = require("phaser"); //llama a la libreria phaser

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { // creacion de fisicas de juego
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

    scene : {
        preload: preload, //funcion de precarga (carga en 2do plano)
        create: create, //funcion de creacion y  anandido de juego (inicia el juego)
        update: update //funcion de actualizacion (ciclo del juego)
    },

};


var score = 0;
var scoreText;
var bombs;
var gameOver = false;



var game = new Phaser.Game(config);

function preload() {
    
    this.load.image('fondo', assetfond); // coloca un fondo para el jueguito
   //                Nombre interno,   ruta de la imagen

   this.load.image('Plataforma', assetPlataforma); // coloca el asset de la plataforma
   this.load.image('star', assetStar); // coloca el asset de la estrella
   this.load.image('bomb', assetBomb); // coloca el asset de la bomba
   this.load.spritesheet('dude', assetDude, { frameWidth: 32, frameHeight: 48 }); // coloca el asset del personaje (individual)
 //                Nombre interno,   ruta de la imagen ,  dimensiones del sprite


}


function create() {
    this.add.image(xa, ya, "fondo"); // mostrar imagen de fondo en el navegador
   
    plataform = this.physics.add.staticGroup(); //agrega un grupo de plataformas estaticas (no se mueven)
    plataform.create(xb, yb, 'Plataforma').setScale(2).refreshBody(); //crea la plataforma en la posicion indicada y la escala al doble de su tamaño original
    //         crea_plataforma, pos_x, pos_y, nombre interno del asset, escala de la imagen, refresca el cuerpo fisico


    plataform.create(xc, yc, 'Plataforma') //crea la plataforma en la posicion indicada y la escala al doble de su tamaño original
    plataform.create(xd, yd, 'Plataforma') //crea la plataforma en la posicion indicada y la escala al doble de su tamaño original
    plataform.create(xe, ye, 'Plataforma') //crea la plataforma en la posicion indicada y la escala al doble de su tamaño original

    player = this.physics.add.sprite(xj, yj, 'dude'); //agrega al jugador
//               crea_jugador, pos_x, pos_y, nombre interno del asset
    // player.setBounce(0.2); //rebote del jugador

    player.setCollideWorldBounds(true); //colision con los bordes del mundo

    player.setBounce(reb1); //rebote del jugador



    this.anims.create({
        key: 'left', //nombre de la animacion
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), //rango de frames de la animacion
        frameRate: framer1, //velocidad de la animacion
        repeat: -1 //repeticion infinita
    });

   this.anims.create({
        key: 'turn', //nombre de la animacion
        frames: [{ key: 'dude', frame: 4}], //rango de frames de la animacion
        frameRate: 10, //velocidad de la animacion
        repeat: -1 //repeticion infinita
    });

    this.anims.create({
        key: 'right', //nombre de la animacion
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }), //rango de frames de la animacion
        frameRate: framer1, //velocidad de la animacion
        repeat: -1 //repeticion infinita
    });


    //player.body.setGravityY(grav); //gravedad del jugador

    this.physics.add.collider(player, plataform); //colision entre el jugador y las plataformas



    cursors = this.input.keyboard.createCursorKeys(); //captura de las flechas del teclado

    stars = this.physics.add.group({ //creacion de grupo de estrellas
        key: 'star', //nombre interno del asset
        repeat: 11, //numero de repeticiones
        setXY: { x: 12, y: 0, stepX: 70 } //posicion inicial y separacion entre estrellas
    });

    stars.children.iterate(function (child) { //crea y recorre cada estrella
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); //rebote aleatorio entre 0.4 y 0.8
    });

    this.physics.add.collider(stars, plataform); //colision entre las estrellas y las plataformas


    this.physics.add.overlap(player, stars, collectStar, null, true); //solapa entre el jugador y las estrellas



    scoreText = this.add.text(16, 16, text1 + 0, { fontSize: '32px', fill: '#000' }); //texto de puntuacion
    // posicion x, posicion y, texto inicial, estilo del texto  
   

    bombs = this.physics.add.group(); //creacion de grupo de bombas

    this.physics.add.collider(bombs, plataform); //colision entre las bombas y las plataformas
    this.physics.add.collider(player, bombs, hitBomb, null, this); //colision entre el jugador y las bombas
   


}       






function update() {

    if (cursors.left.isDown) //si se presiona la flecha izquierda
    {
        player.setVelocityX(-velj1); //velocidad del jugador en x negativa (izquierda)    
        player.anims.play('left', true); //reproduce la animacion de izquierda
    }
    else
    if (cursors.right.isDown) //si se presiona la flecha izquierda
    {
        player.setVelocityX(velj1); //velocidad del jugador en x negativa (izquierda)    
        player.anims.play('right', true); //reproduce la animacion de izquierda

    }
    else
    {
        player.setVelocityX(0); //velocidad del jugador en x negativa (izquierda)    
        player.anims.play('turn'); //reproduce la animacion de izquierda
    }



    if (cursors.up.isDown && player.body.touching.down) //si se presiona la flecha arriba y el jugador esta tocando el suelo
    {
        player.setVelocityY(-velj2); //velocidad del jugador en y negativa (arriba)    
    }

   
}



function collectStar (player, star)
{
    star.disableBody(true, true);   
    score += 10; //suma 10 puntos
    scoreText.setText(text1 + score); //actualiza el texto de puntuacion

}

 function hitBomb (player, bomb){
        this.physics.pause();   //pausa el juego
        player.setTint(0xff0000); //cambia el color del jugador a rojo
        player.anims.play('turn'); //reproduce la animacion de giro
        gameOver = true; //fin del juego
    }