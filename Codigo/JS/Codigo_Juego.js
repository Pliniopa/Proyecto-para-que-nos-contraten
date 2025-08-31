// assets

assetfond = 'Assets/adicionales/assets/sky.png'; //ruta de los assets
assetPlataforma = 'Assets/adicionales/assets/platform.png';
assetStar = 'Assets/adicionales/assets/star.png';
assetBomb = 'Assets/adicionales/assets/bomb.png';
assetDude = 'Assets/adicionales/assets/dude.png';

// parametros de visualizacion (centrado de fondo)

xa = 400; //ancho
ya = 300; //alto

// parametros de las plataformas
// base
xb = 400; //ancho
yb = 568; //alto

// intermedias
xc = 600; //ancho
yc = 400; //alto

xd = 50; //ancho
yd = 250; //alto


xe = 750; //ancho
ye = 120; //alto

//parametros del jugador
xj = 100; //ancho
yj = 450; //alto


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

    this.physics.add.collider(player, plataform); //colision entre el jugador y las plataformas





}       






function update() {
   
}
