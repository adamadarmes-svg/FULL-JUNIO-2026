const logger = require('node-color-log');
const prompt = require('prompt-sync')();
const AsciiArt = require("image-and-video-to-ascii");
const path = require("path");

// Ejercicio 1-1
logger.color('white').bgColor('blue').log('        Ejercicio 1-1        ');
let array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log('Array inicial:', array);

// Ejercicio 1-2
logger.color('white').bgColor('blue').log('        Ejercicio 1-2        ');
console.log('Elemento en posición 3:', array[2]);
console.log('Elemento en posición 6:', array[5]);

// Ejercicio 1-3
logger.color('white').bgColor('blue').log('        Ejercicio 1-3        ');
console.log('Longitud del array:', array.length);

// Ejercicio 1-4
logger.color('white').bgColor('blue').log('        Ejercicio 1-4        ');
array.unshift(5);
console.log('Array tras añadir al inicio:', array);

// Ejercicio 1-5
logger.color('white').bgColor('blue').log('        Ejercicio 1-5        ');
array.push(110);
console.log('Array tras añadir al final:', array);

// Ejercicio 1-6
logger.color('white').bgColor('blue').log('        Ejercicio 1-6        ');
array.splice(4, 2);
console.log('Array tras eliminar posiciones 5 y 6:', array);

// Ejercicio 1-7
logger.color('white').bgColor('blue').log('        Ejercicio 1-7        ');
let valor = parseInt(prompt('Ingrese un valor del array: '));
let indice = array.indexOf(valor);
if (indice !== -1) {
  console.log(`El valor ${valor} está en la posición: ${indice}`);
} else {
  console.log(`El valor ${valor} no se encuentra en el array.`);
}

// Ejercicio 1-8
logger.color('white').bgColor('blue').log('        Ejercicio 1-8       ');
array.reverse();
console.log('Array invertido:', array);

// Ejercicio 1-9
logger.color('white').bgColor('blue').log('        Ejercicio 1-9        ');
let arrayString = array.join(', ');
console.log('Array convertido en string:', arrayString);

// Ejercicio 1-10
logger.color('white').bgColor('blue').log('        Ejercicio 1-10        ');
let nuevoArray = arrayString.split(', ');
console.log('String convertido nuevamente en array:', nuevoArray);

// Ejercicio 2-1
logger.color('white').bgColor('blue').log('        Ejercicio 2-1        ');
console.log('índice:');
array.forEach((valor, indice) => {
  console.log(`Posición ${indice}: ${valor}`);
});


// Ejercicio 2-2
logger.color('white').bgColor('blue').log('        Ejercicio 2-2        ');
console.log('Modificación:');
array = array.map((valor, indice) => {
  let nuevoValor = valor + 5; 
  console.log(`Posición ${indice}: ${nuevoValor}`);
  return nuevoValor;
});


// Ejercicio 2-3
logger.color('white').bgColor('blue').log('        Ejercicio 2-3        ');
let buscarValor = parseInt(prompt('Ingrese un valor para buscar en el array: '));

if (array.includes(buscarValor)) {
  console.log(`El valor ${buscarValor} está en el array.`);
  console.log(`Índice: ${array.indexOf(buscarValor)}`);
} else {
  console.log(`El valor ${buscarValor} no está en el array.`);
}


// Ejercicio 2-4
logger.color('white').bgColor('blue').log('        Ejercicio 2-4        ');
console.log('Filtrando valores mayores a 50:');
let filtrados = array.filter(valor => valor > 50);
console.log('Resultado del filtro:', filtrados);


// Ejercicio 3-1
logger.color('white').bgColor('blue').log('        Ejercicio 3-1        ');
let [a, b, c, d, e, f, g, h, i, j] = array;

console.log('a:', a);
console.log('b:', b);
console.log('c:', c);
console.log('d:', d);
console.log('e:', e);
console.log('f:', f);
console.log('g:', g);
console.log('h:', h);
console.log('i:', i);
console.log('j:', j);


// Ejercicio 3-2
logger.color('white').bgColor('blue').log('        Ejercicio 3-2        ');

// Ejercicio 3-2-1
let copiaArray = [...array];
console.log('Copia del array:', copiaArray);

// Ejercicio 3-2-2
let otroArray = [200, 300, 400];
let combinado = [...array, ...otroArray];
console.log('Array combinado:', combinado);

// Ejercicio 3-2-3
let extendido = [...array, 999];
console.log('Array extendido:', extendido);

// Ejercicio 3-2-4
let modificado = [...array].map(num => num + 1);
console.log('Array modificado con spread + map:', modificado);

// Extra
logger.color('green').log('✔ Success: Todo salió bien');
logger.color('blue').log('⚠ Warning: Algo podría estar mal');
logger.color('red').log('✖ Error: Ocurrió un problema');

const figlet = require('figlet');
figlet('Hola!', (err, data) => {
  console.log(data);
});

const file = process.argv[2];

if (!file) {
  console.log("Debes indicar un archivo.");
  console.log("   node index.js Smaev.png");
  process.exit();
}

const fullPath = path.resolve(file);

const options = {
  colored: true,
  size: {
    height: 40
  }
};

const isVideo = /\.(mp4|avi|mov|webm|mkv)$/i.test(file);

if (isVideo) {
  console.log(" Convirtiendo video...");
  AsciiArt.video(fullPath, options);
} else {
  console.log("Convirtiendo imagen...");
  AsciiArt.getImageAscii(fullPath, options)
    .then(result => console.log(result))
    .catch(err => console.error("Error:", err));
}
