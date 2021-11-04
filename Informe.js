var fs = require('fs');
var equipoA = fs. readFileSync("./equipo-A.txt", 'utf-8');
equipoA = equipoA.split('\n')
var equipoB = fs. readFileSync("./equipo-B.txt", 'utf-8');
equipoB = equipoB.split('\n')
var partidos= fs.readFileSync("./partido.log", 'utf-8')
partidos= partidos.split('\n')

class JugadoraCompleta {
    constructor (nombre, equipo){
        this.nombre=nombre;
        this.equipo=equipo;
        this.puntos=0;
    }
}
var jugadorasCompletas=[]

agregarJugadoras(jugadorasCompletas, equipoA, "A");
agregarJugadoras(jugadorasCompletas, equipoB, "B");
//imprimirJugadoras(jugadorasCompletas);
reemplazarResultado(partidos, "DOBLE", 2);
reemplazarResultado(partidos, "TRIPLE", 3);
//console.log(partidos);
asignarPuntos(partidos, jugadorasCompletas);
imprimirJugadoras(jugadorasCompletas);
var tirosDobles= contarTipoDeAnotacion(partidos, 2);
var tirosTriples= contarTipoDeAnotacion(partidos, 3);
console.log("Se realizaron "+tirosDobles+" tiros dobles y "+tirosTriples+" tiros triples. Es decir, un "+calcularProporcion(tirosDobles, tirosTriples)+"% de tiros dobles y un "+calcularProporcion(tirosTriples, tirosDobles)+"% de tiros triples.")
calcularEquipoGanador(jugadorasCompletas);
var maxJugadora= calcularJugadoraConMasPuntos(jugadorasCompletas);
console.log("La jugadora con más puntos es "+maxJugadora.nombre+" con "+maxJugadora.puntos+" puntos.")



function agregarJugadoras(lista, jugadoras, equipo){
    for (let i=0; i<jugadoras.length; i++){
        lista.push(new JugadoraCompleta(jugadoras[i], equipo));
    }
}

function imprimirJugadoras(lista){
    for (let i=0; i<lista.length; i++){
        console.log(lista[i]);
    }
}

function reemplazarResultado(lista, resultado, numero){
    for (let i=0; i<lista.length; i++){
        if (lista[i].includes(resultado)){
            lista[i]=lista[i].replace(resultado, numero);
        }
    }
}

function asignarPuntos(puntos, jugadoras){
    for (let i=0; i<puntos.length; i++){
        var personaEncontrada=false;
        var k=0;

        while (k<jugadoras.length && personaEncontrada==false){
            if (jugadoras[k].nombre.includes(puntos[i].substr(0, puntos[i].indexOf(",")))){
                jugadoras[k].puntos= parseInt(jugadoras[k].puntos)+parseInt(puntos[i].substr(puntos[i].indexOf(",")+1));
                personaEncontrada=true;
            }
            else {k++;}
        }
    }
}

function contarTipoDeAnotacion (lista, tipo){
    var contador=0;
    for (let i=0; i<lista.length;i++){
        if (lista[i].includes(tipo)){
            contador++;
        }
    }

    return contador;
}

function calcularProporcion(num1, num2){
    return Math.round(num1*100/(num1+num2));
}

function calcularEquipoGanador(lista){
    var puntosA=0;
    var puntosB=0;

    for (let i=0; i<lista.length; i++){
        if (lista[i].equipo=="A"){
            puntosA=puntosA+lista[i].puntos;
        }
        if (lista[i].equipo=="B"){
            puntosB=puntosB+lista[i].puntos;
        }
    }

    console.log("El partido A vs. B salió "+puntosA+" a "+puntosB);

}

function calcularJugadoraConMasPuntos(lista){
    var maxJugadora=lista[0]; //VALIDAR SI LISTA ES VACIA

    for (let i=1; i<lista.length;i++){
        if (lista[i].puntos>maxJugadora.puntos){
            maxJugadora=lista[i];
        }
    }

    return maxJugadora;
}