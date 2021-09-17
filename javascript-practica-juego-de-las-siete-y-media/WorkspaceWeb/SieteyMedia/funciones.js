/* 
 * Rubén Arcos
 */

var cartas;
window.onload = function() {
  numJugadores.value="";
};

function crearElementos(numElementos){
    var cadena="";
    cartas = [parseInt(numElementos)];
    if(btnPartida.value === "Comenzar partida" && numJugadores.value!==""){
        document.getElementById("elementos").innerHTML = "";
        cadena += "<div id='jugadores'>";
            for (var i = 0, maxi = parseInt(numElementos); i < maxi; i++) {
                cadena +="<div id='jugador"+(i+1)+"'>";
                cadena +="<p>Jugador "+(i+1)+": ";
                cadena +="<input type='Button' id='btnCartaJugador"+i+"' value='Pedir Carta' onclick='darCarta("+i+")'/>";
                cadena +="<input type='Button' id='btnPlantarse"+i+"' value='Plantarse' onclick='plantarse("+i+")'/> </p>";
                cadena +="</div>";
                cartas [i] = 0;
                document.getElementById("contenedor").innerHTML +="<img src='img/cartas/reverso.png' id='baraja"+i+"'/>";
                document.getElementById("baraja"+i).className = "barajaEntrada";
            }
        cadena += "</div>";
        document.getElementById("elementos").innerHTML = cadena;
        document.getElementById("control").innerHTML = "";

        document.getElementById("control").innerHTML +="<input type='Button' id='btnFinalizar' value='Finalizar partida' onclick='mostrarPuntos()'/>";
    }else if(btnPartida.value === "Finalizar partida"){
        mostrarPuntos();
    }
}

function plantarse(jugador){
    document.getElementById("btnCartaJugador"+jugador).setAttribute('disabled','disabled');
}
function darCarta(jugador){
    document.getElementById("baraja"+jugador).className = "barajaMovimiento";
    setInterval(function () {
        document.getElementById("baraja"+jugador).className = "barajaEntrada";
    }, 2000);
    var aleatorio = generarAleatorio();
    if (aleatorio >= 8){
        dibujarCartas(jugador, aleatorio);
        cartas[jugador]= cartas[jugador]+0.5;
    }else{
        dibujarCartas(jugador, aleatorio);
        cartas[jugador]= cartas[jugador]+aleatorio;
    }
    document.getElementById("jugador"+(jugador+1)).innerHTML += aleatorio;
    comprobarPuntos();
}

function comprobarPuntos(){
    var cont=0;
    for (var x = 0, maxx = cartas.length; x < maxx; x++) {
        if (cartas[x]===7.5){
            document.getElementById("btnCartaJugador"+x).setAttribute('disabled','disabled');
            document.getElementById("btnPlantarse"+x).setAttribute('disabled','disabled');
            document.getElementById("btnCartaJugador"+x).value = "HA GANADO";
            cont++;
        }else if (cartas[x]>7.5){
            document.getElementById("btnCartaJugador"+x).setAttribute('disabled','disabled');
            document.getElementById("btnPlantarse"+x).setAttribute('disabled','disabled');
            document.getElementById("btnCartaJugador"+x).value = "Se ha pasado";
            cont++;
        }
    }
    
    if(cont === cartas.length){
        mostrarPuntos();
    }
}

function mostrarPuntos(){
    document.getElementById("control").innerHTML = "<h1><u>Puntuaciones</u></h1>";
    var cadena="<div id='resultados'>";
    for (var y = 0, maxy = cartas.length; y < maxy; y++) {
        document.getElementById("baraja"+y).className = "barajaSalida";
        if (cartas[y]===7.5){
            cadena += "<p>El <strong>jugador "+(y+1)+"</strong> ha terminado con <strong>"+cartas[y]+"</strong> ha ganado.</p>";
        }else if (cartas[y]>7.5){
            cadena +="<p>El <strong>jugador "+(y+1)+"</strong> ha terminado con <strong>"+cartas[y]+"</strong> se ha pasado.</p>";
        }else{
            cadena+="<p>El jugador "+(y+1)+" tiene "+cartas[y]+" puntos.</p>";
        }
    }
    cadena +="</div>";
    document.getElementById("elementos").innerHTML = cadena;
    setInterval(function () {
        location.reload();
    }, 5000);
}

function dibujarCartas(jugador, carta){
    var cadena;
    cadena = "<image src='./img/cartas/"+carta+"oro.png' class='nuevaCarta'/>";
    document.getElementById("jugador"+(jugador+1)).innerHTML += cadena;
}
function generarAleatorio(){
        return parseInt(Math.floor(Math.random()*(12-0)+1));
}

function comprobarNumero(texto){
    var num = parseInt(texto);
    if (isNaN(num)){
        document.getElementById("numJugadores").value = "";
        return false;
    }else{
        return true;
    }
}

function comprobarDatos(e){
    var keynum;
    if(window.event){ // IE					
        keynum = e.keyCode;
        if(keynum>47 && keynum<58){
            return true;
        }else{
            return false;
        }
    }else{
        if(e.which){ // Netscape/Firefox/Opera					
            keynum = e.which;
            if(keynum>47 && keynum<58){
                return true;
            }else{
                return false;
            }
        }
    }
}
