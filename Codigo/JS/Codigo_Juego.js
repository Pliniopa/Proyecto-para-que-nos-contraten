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
xb = 400; //ancho
yb = 568; //alto



var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'cuerpo1', //nombre del div donde se va a cargar el juego y aseguramiento del canva
    scene : {
        preload: preload, //funcion de precarga (carga en 2do plano)
        create: create, //funcion de creacion y  anandido de juego (inicia el juego)
        update: update //funcion de actualizacion (ciclo del juego)
    },
    physics: {
        default: 'arcade'}
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
    this.add.image(xb, yb, 'Plataforma').setScale(2).refreshBody(); //mostrar plataforma en el navegador
}       

function update() {
   
}
