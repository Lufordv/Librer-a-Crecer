/* --------------BLOQUE 1--------------
-------Animación párrafo superior---------------

 Creamos una constante para seleccionar el div que contiene la animación del texto superior */

const textoAnimado = document.querySelector('.texto-animado');

/* Le decimos a nuestra constante que al hacer hover le quite la clase texto-animado al div para detener la animación */

textoAnimado.addEventListener('mouseenter', () => {
    textoAnimado.classList.remove('texto-animado'); 
});

/* Cada vez que el ratón deja de estar sobre el div, la clase texto-animado queda restaurada */

textoAnimado.addEventListener('mouseleave', () => {
    textoAnimado.classList.add('texto-animado');
});

/* --------------BLOQUE 2----------------
----------Creación de carrusel-----------

Creamos 4 constantes para la parte del carrusel:
    - 2 para nuestros botones
    - 1 para el div que contiene las secciones
    - 1 para cada una de las secciones donde se encuentran nuestras imágenes */

const botonIzq = document.querySelector(".boton-izq");
const botonDer = document.querySelector(".boton-der");
const deslizador = document.getElementById("deslizador");
const seccionDinamica = document.querySelectorAll(".seccion-dinamica");

/* Le decimos a ambos iconos que cuando se haga click sobre ellos, disparen las funciones que mueven el carrusel a izquierda y derecha */

botonIzq.addEventListener("click", e => moverIzq());
botonDer.addEventListener("click", e => moverDer());

/* Declaramos las variables que vamos a necesitar para nuestras funciones:
    - La variable calcular la utilizamos para ir sumando o restando el ancho de cada una de las imágenes y decirle a la función cuánto tiene que desplazar el carrusel cada vez
    - La variable contador nos permite saber en qué imagen estamos cada vez que hacemos click, y por lo tanto nos indica cuándo llegamos al final del carrusel para poder reiniciarlo
    - La variable anchoImg nos permite dividir de forma precisa el ancho de cada sección y por tanto el ancho de cada imagen */

let calcular = 0;
let contador = 0;
let anchoImg = 100 / seccionDinamica.length;

/* Función moverIzq:
    - Esta función es la que se encarga de desplazar el carrusel hacia la izquierda.
    - Agrega una transición para que el cambio entre una imagen y otra sea más suave.
    - Cuando llega al final de su recorrido, al hacer click reinicia la variable contadora para poder crear un bucle infinito y regresar al principio.
    - En este ultimo caso, suprime también la transición */ 

function moverIzq() {
    contador--;
    if (contador < 0) {
        contador = seccionDinamica.length-1;
        calcular = anchoImg * (seccionDinamica.length-1);
        deslizador.style.transform = `translate(-${calcular}%)`;
        deslizador.style.transition = "none";
    } else {
        
        calcular = calcular - anchoImg;
        deslizador.style.transform = `translate(-${calcular}%)`;
        deslizador.style.transition = "all ease 0.6s";
    }
    
}

/* Función moverDer:
    - Esta función hace lo mismo que la anterior pero desplazando el carrousel hacia la derecha */

function moverDer() {
    if (contador >= seccionDinamica.length-1) {
        calcular = 0;
        contador = 0;
        deslizador.style.transform = `translate(-${calcular}%)`;
        deslizador.style.transition = "none";
    } else {
        contador++;
        calcular = calcular + anchoImg;
        deslizador.style.transform = `translate(-${calcular}%)`;
        deslizador.style.transition = "all ease 0.6s";
    }
    
}

/* -------------BLOQUE 3--------------- 
---------Navegación con Scroll-----------

Creamos una constante para seleccionar los enlaces de nuestra navegación */

const menuLinks = document.querySelectorAll('nav ul li a');

/* Esto nos da una lista de nodos que podemos recorrer como si fuera un array.
Lo hacemos con un for each y con una función flecha le decimos que cuando escuchen un evento de click disparen la función scroll */

menuLinks.forEach(link => {
    link.addEventListener('click', scroll);
});

/* Creamos la función scroll para poder desplazarnos a la sección correspondiente:
    - Se impide la acción por defecto del evento.
    - Creamos dos constantes. Con la primera guardamos el valor del atributo 'href' del enlace al que se le hace click, y con el método substring eliminamos el carácter #.
    - Con la segunda constante obtenemos el elemento del DOM correspondiente al valor obtenido en el paso anterior.
    - Con el if verificamos si se ha encontrado el elemento con el valor especificado, y le decimos a la ventana que se desplace a la parte superior de la sección correspondiente con un efecto suave */

function scroll(evento) {
    evento.preventDefault(); 
    const posicionNav = evento.target.getAttribute('href').substring(1);
    const posicionSeccion = document.getElementById(posicionNav);
    if (posicionSeccion) {
        window.scrollTo({
            top: posicionSeccion.offsetTop,
            behavior: 'smooth'
        });
    }
}


/* ----------------BLOQUE 4------------------
------Sumar y restar unidades y precio en las cards------ */

/* Obtenemos una lista de todos los elementos con la clase "card" */

const cards = document.querySelectorAll('.card');

/* Iteramos sobre cada card, creando constantes para seleccionar los botones y los valores */

cards.forEach(card => {
    const botonRestar = card.querySelector('#restar');
    const botonSumar = card.querySelector('#sumar');
    const contadorUnidades = card.querySelector('.unidades');
    const contadorMontante = card.querySelector('.montante');

    /* Creamos otra constante donde obtenemos el valor del elemento 'precio-base', y lo pasamos a número decimal para trabajar con él */

    const montanteBase = parseFloat(contadorMontante.getAttribute('precio-base'));

    /* Dotamos de funcionalidad al botón 'Restar':
    - Agregamos un evento de click
    - Convertimos el valor de las unidades a un número entero y lo mostramos.
    - Le indicamos que solo pueda restar unidades siempre que estas sean mayor a 1
    - Mostramos el nuevo valor del nodo 'unidades' cada vez
    - Mostramos el nuevo valor del nodo 'montante' cada vez, con un máximo de dos decimales. */ 

    botonRestar.addEventListener('click', () => {
        let unidades = parseInt(contadorUnidades.textContent);
        if (unidades > 1) {
            unidades -= 1;
            contadorUnidades.textContent = unidades;
            contadorMontante.textContent = (montanteBase * unidades).toFixed(2);
        }
    });

    /* Aplicamos la misma lógica que antes, pero para el botón "Sumar" */

    botonSumar.addEventListener('click', () => {
        let unidades = parseInt(contadorUnidades.textContent);
        unidades += 1;
        contadorUnidades.textContent = unidades;
        contadorMontante.textContent = (montanteBase * unidades).toFixed(2);
    });
});


/*--------------BLOQUE 5-----------------
-----Evitar el envío del formulario------- */

/* Creamos una constante llamada submit que aplicamos sobre el formulario */

const submit = document.getElementById("form")

/*  Le decimos a nuestra constante que cuando escuche un evento de click dispare la función evitarEnvio */

submit.addEventListener("click", evitarEnvio);

/* Creamos la función que evita que el formulario se envíe */

function evitarEnvio(e){
    e.preventDefault();
}


/*---------------------DISEÑO RESPONSIVE---------------------
-------Desplegamos/Ocultamos el menú de navegación al hacer click------- */

/* Creamos las constantes para seleccionar nuestra navegación y los botones que la muestran y esconden */

const navegacion = document.querySelector("nav");
const botones = document.querySelectorAll(".abrir,.cerrar")

/* Creamos la funcionalidad del desplegable:
- Recorremos los botones con un bucle for
- Agregamos un evento de click a cada uno
- Con una función flecha le indicamos que al hacer click se ponga o se quite la clase desplegado. */

for (i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", () => navegacion.classList.toggle("desplegado"));
}

/* Hacemos que los links de la navegación también cierren el menú desplegable al ser pulsados:
- Utilizamos la constante menuLinks que declaramos anteriormente
- Recorremos los links con un bucle for
- Agregamos la funcionalidad para que oculten el desplegable al hacer click sobre ellos */
for (i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", () => navegacion.classList.remove("desplegado"));
}

