const logger = require('node-color-log');
const prompt = require('prompt-sync')();



logger.color('white').bgColor('blue').log('           ejercicio 1-1          ');
  

function oneToHundred() {
    let numbers =[];
    for(let i = 1; i <= 100; i++) {  
        if(i % 2 === 0) {
        numbers.push(i);
    }
  }
  return numbers.join(', ');
}

console.log(oneToHundred());


// Ejercicio 1-2
logger.color('white').bgColor('blue').log('        Ejercicio 1-2');

function printName() {
  let name = prompt('Ingrese su nombre: ');
  console.log(`Hola, ${name}!`);
}

printName();

// Ejercicio 1-3
logger.color('white').bgColor('blue').log('        Ejercicio 1-3        ');

function tableMultiplication(num) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
  }
}

let inputNumber3 = parseInt(prompt('Ingrese un número para ver su tabla de multiplicar: '));
tableMultiplication(inputNumber3);

    
// Ejercicio 1-4
logger.color('white').bgColor('blue').log('        Ejercicio 1-4        ');

function saludar(nombre) {
  console.log(`Hola, ${nombre}!`);
}

function procesarEntradaUsuario(callback) {
  let name = prompt('Ingrese su nombre: ');
  callback(name);
}

procesarEntradaUsuario(saludar);

// Ejercicio 2-1
logger.color('white').bgColor('blue').log('        Ejercicio 2-1        ');

function containsS(str) {
  return str.toLowerCase().includes('s');
}

let inputString = prompt('Ingrese una cadena de texto: ');
console.log(containsS(inputString));

// Ejercicio 2-2
logger.color('white').bgColor('blue').log('        Ejercicio 2-2        ');

function isEven(num) {
  return num % 2 === 0;
}

let inputNumber = parseInt(prompt('Ingrese un número: '));
console.log(isEven(inputNumber));

// Ejercicio 2-3
logger.color('white').bgColor('blue').log('        Ejercicio 2-3        ');

function pow(number) {
  return number ** 2;
}

let inputNumber2 = parseInt(prompt('Ingrese un número: '));
console.log(pow(inputNumber2));

// Ejercicio 2-4
logger.color('white').bgColor('blue').log('        Ejercicio 2-4        ');

function areaRectangulo(base, altura) {
  return base * altura;
}

let base = parseFloat(prompt('Ingrese la base del rectángulo: '));
let altura = parseFloat(prompt('Ingrese la altura del rectángulo: '));

console.log(`El área del rectángulo es: ${areaRectangulo(base, altura)}`);

// Ejercicio 2-5
logger.color('white').bgColor('blue').log('        Ejercicio 2-5        ');

function areaTriangulo(base2, altura2) {
  return (base2 * altura2) / 2;
}

let base2 = parseFloat(prompt('Ingrese la base del triángulo: '));
let altura2 = parseFloat(prompt('Ingrese la altura del triángulo: '));

console.log(`El área del triángulo es: ${areaTriangulo(base2, altura2)}`);

// Ejercicio 2-6
logger.color('white').bgColor('blue').log('        Ejercicio 2-6        ');

function areaCirculo(radio) {
  return Math.PI * radio ** 2;
}

let radio = parseFloat(prompt('Ingrese el radio del círculo: '));

console.log(`El área del círculo es: ${areaCirculo(radio)}`);

// Ejercicio 3-1
logger.color('white').bgColor('blue').log('        Ejercicio 3-1        ');

function pow(number, exponent) {
  return number ** exponent;
}

let inputNumbe3 = parseInt(prompt('Ingrese un número: '));
let inputExponent3 = parseInt(prompt('Ingrese el exponente: '));

console.log(pow(inputNumbe3, inputExponent3));

// Ejercicio 3-2
logger.color('white').bgColor('blue').log('        Ejercicio 3-2        ');

function fibo(max) {
  let fibonacci = [1, 1];
  while (fibonacci.length < max) {
    fibonacci.push(fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]);
  }
  return fibonacci;
}

let finoMax = parseInt(prompt('Ingrese el número máximo de la serie: '));
console.log(`Los primeros ${finoMax} números de la serie de Fibonacci son: ${fibo(finoMax).join(', ')}`);
