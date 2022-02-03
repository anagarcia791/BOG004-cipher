import cipher from './cipher.js';

window.onload = () => { 

    //se declara constantes con id's de html 
    const contenedorSaludo = document.querySelector('#contenedorSaludo');
    const formularioDificultad = document.querySelector('#formularioDificultad');
    const dificultad = document.querySelector('#inputDificultad');
    const botonDificultad = document.querySelector('#botonDificultad'); 
    const pistasJuego = document.querySelector('#pistasJuego');
    const secreto = document.querySelector('#secreto');
    const botonDescubrir = document.querySelector('#botonDescubrir'); 
    const entradaJugador = document.querySelector('#contenedorEntradaJugador');
    const juegoContenedor = document.querySelector('.juego');
    const avisoNivelNoValido = document.querySelector('#avisoNivelNoValido');

    //variables para resultado de jugador
    let reiniciarJuego;
    let arrayEntradas;
    let textoCifrado;
    let personajeElegido;
    let mensajeOculto = 'Gracias por jugar, te esperamos pronto.'; 
    let mensajeOculto2;
    let mensajeDescifrado;
    let mensajeOcultoB;
    let mensajeOcultoP;

    // Lista de objetos personajes 
    let Personaje = [
        {
            nombre:'Perry',
            imagen:'perry.png', 
            pistas:[' Es azul ',' Parece un castor ', ' Nivel de dificultad igual a cantidad de letras desplazadas del nombre del personaje']
        },
        {
            nombre:'Pinky',
            imagen:'pinky.png',
            pistas:[' Es rosado ',' Ladra mucho ', ' Nivel de dificultad igual a cantidad de letras desplazadas del nombre del personaje ']
        },
        {
            nombre:'Terry', 
            imagen:'terry.png', 
            pistas:[' Es naranja ',' Muy silencioso ', ' Nivel de dificultad igual a cantidad de letras desplazadas del nombre del personaje ']
        }, 
    ];

    //funcion para seleccionar de manera aleatoria uno de los personajes
    function elegirPersonaje(){
        var aleatorio = Math.floor(Math.random()*Personaje.length);
        return Personaje[aleatorio]
    }

    //funcion para adicionar y remover display
    function mostrarOcultar() {
        contenedorSaludo.classList.remove('display_block');
        contenedorSaludo.classList.add('display_none');
        formularioDificultad.classList.remove('display_block');
        formularioDificultad.classList.add('display_none');
        juegoContenedor.classList.remove('display_none');
    }

    //funcion para evaluar numero no menor a 1 o vacio en dificultad
    function evaluarNivelDif(difElegida) {
        if (difElegida<1 || isNaN(difElegida)){
            avisoNivelNoValido.textContent = 'Nivel no valido';
            return false
        }return true
    }

    //funcion para convertir una lista de JS en lista de HTML
    const pistasLista = (arrayPistas,pistasJuego) => 
        (pistasJuego.innerHTML += arrayPistas.map(elemento => `<li> ${elemento} </li>`).join(''));

    //funcion para mostrar personaje cifrado de acuerdo a nivel dif y funcion cifrado
    function palabraSecreta(difElegida){  
        personajeElegido = elegirPersonaje();
        textoCifrado = cipher.encode(difElegida, personajeElegido.nombre);
        secreto.innerHTML = `Personaje secreto ${textoCifrado}`;
        pistasLista(personajeElegido.pistas,pistasJuego);
        mensajeOculto2 = cipher.encode(difElegida, mensajeOculto);
        mensajeDescifrado = cipher.decode(difElegida,mensajeOculto2);
    }

    //funcion para crear input de jugador por cada letra del personaje que debe adivinar 
    function juego(textoCifrado){
        arrayEntradas = textoCifrado.split('').map(letra => {
            // let nuevaEntrada = document.createElement('input');
            // entradaJugador.appendChild(nuevaEntrada)
            // return nuevaEntrada
            letra = document.createElement('input');
            entradaJugador.appendChild(letra)
            return letra
        });
    }

    //boton ocultar pag inicial mostrar pag de juego y activar el juego
    botonDificultad.onclick = function(event){
        event.preventDefault(); //desactiva comportamiento por defecto del boton
        const difElegida = parseInt(dificultad.value);  
        const evaluacion = evaluarNivelDif(difElegida);
        if (evaluacion){
            mostrarOcultar()
            palabraSecreta(difElegida)
            juego(textoCifrado)
        }
    };

    //boton para:
    botonDescubrir.onclick = function(evento){
        evento.preventDefault(); 
        //obtener valor de los inputs ingresados por jugador
        let entradaValor = '';
        arrayEntradas.forEach(elemento => {
            entradaValor += elemento.value
        });

        //comparar input jugador con personaje
        let mensajeResultado = 'LO HICISTE'
        if(entradaValor.toUpperCase() != personajeElegido.nombre.toUpperCase()){
            mensajeResultado = 'INTENTA NUEVAMENTE'
        }

        //estructurar y mostrar mensaje para descifrar y resultado en HTML
        let resultado = 
        `<div class='resultado-contenido'>
            <div class='resultadoFinal'>
                <p> Decodifica el mensaje que dejo el personaje</br>
                    ${mensajeOculto2}
                </p> 
                </br> 
                <button id='descubreMensaje' class='botDescubrir'> Decodificar </button>
                </br> 
                <span id='mensajeOcultoP'></span>
            </div>

            <div class='resultadoFinal'>
                <img src=${personajeElegido.imagen} alt=''>
                <p>${mensajeResultado}</p> 
                </br>
                <button id='reiniciarJuego' class='botDescubrir'> Volver a jugar </button>
            </div>
        </div> `;

        juegoContenedor.innerHTML = resultado; 

        //descubre mensaje oculto
        mensajeOcultoP = document.querySelector('#mensajeOcultoP');
        mensajeOcultoB = document.querySelector('#descubreMensaje');
        mensajeOcultoB.onclick = () => {
            mensajeOcultoP.innerHTML = mensajeDescifrado;
        }; 
        
        //reiniciar juego
        reiniciarJuego  = document.querySelector('#reiniciarJuego');
        reiniciarJuego.onclick = () => {
            location.reload();
        }; 
    };
    
}