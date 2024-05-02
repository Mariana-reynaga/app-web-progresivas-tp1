let titulo = document.getElementById("buscador");
const form = document.getElementById("formBuscar");
let tarjeta = document.getElementById("tarjeta");


let palabras=[];
let datosPeli=[];
let favoritos=[];

let pelicula = 'http://www.omdbapi.com/?t=&apikey=301ed5d1';

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    palabras = titulo.value.split(" ");

    let nombre = palabras.join('+');

    pelicula = `http://www.omdbapi.com/?t=${nombre}&apikey=301ed5d1`;

    console.log(pelicula);

    getPeli();
});


const getPeli = async()=>{
    
    let ruta = pelicula;
    const response = await fetch(ruta);
    const data = await response.json();
    
    console.log(data)

    if (data.Response == "False") {
        imprimirError()
        
    } else {
        datosPeli=[];
        datosPeli.push(data);
        
        imprimirPoster(datosPeli);
    
        console.log(datosPeli);
    }

} 

function imprimirPoster(datosPeli){
    tarjeta.innerHTML=` `;
    tarjeta.innerHTML=`
        <img src="${datosPeli[0].Poster}" style="height: 500px; height: 500px;">

        <div class="container d-flex flex-column m-0 justify-content-evenly" style="width: 50%;">
            <h1 class="text-center">${datosPeli[0].Title}</h1>
                
            <div class="container d-flex justify-content-center">
                <ul class="list-group" style="width: 80%;">
                    <li class="list-group-item">Estreno: ${datosPeli[0].Released} </li>
                    <li class="list-group-item">Director: ${datosPeli[0].Director}</li>
                    <li class="list-group-item">Duración: ${datosPeli[0].Runtime} </li>
                </ul>
            </div>

            <h2 class="fw-semibold fs-3">Sinopsis:</h2>
            <p>${datosPeli[0].Plot}</p>
        </div>`
};

function imprimirError() {
    tarjeta.innerHTML=` `;
    tarjeta.innerHTML=`<h2>Ocurrio un Error. Porfavor Ingresar un Titulo Valido.</h2>`;
}
