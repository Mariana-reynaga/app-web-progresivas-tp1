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
    
    try{
        let ruta = pelicula;
        const response = await fetch(ruta);
        const data = await response.json();
        
        console.log(data)

        datosPeli=[];
        datosPeli.push(data);
        
        //favoritos.push(data);

        imprimirPoster(datosPeli);

        console.log(datosPeli);
        
    } catch(error){
        imprimirError();
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

            <button class="btn" id="agregar" onclick="pelisFav()">favorito</button>

        </div>`
};

function imprimirError() {
    tarjeta.innerHTML=` `;
    tarjeta.innerHTML=`<h2>Ocurrio un Error. Porfavor Ingresar un Titulo Valido.</h2>`;
}




////////////////////////////////
function pelisFav(){
    pelisFaves= JSON.stringify(favoritos);

    localStorage.setItem("fave", pelisFaves);

}

/*let espacioFave = document.getElementById("listaFav");

function listaPelisFav(){
    let listaString = localStorage.getItem("fave");

    let peliArray= JSON.parse(listaString);

    espacioFave.innerHTML=``;

    for (let index = 0; index < peliArray.length; index++) {
        
        espacioFave.innerHTML+=`
        <div class="col">
            <div class="card" style="width: fit-content;">

                <img src="${peliArray[index].Poster}" class="card-img-top">

                <div class="card-body mt-3">
                <h5 class="card-title">${peliArray[index].Title}</h5>

                <ul class="list-group list-group mt-3">
                    <li class="list-group-item">Estreno: ${peliArray[index].Released}</li>
                    <li class="list-group-item">Director: ${peliArray[index].Director}</li>
                    <li class="list-group-item">Duración: ${peliArray[index].Runtime}</li>
                </ul>

                <p class="card-text mt-3">${peliArray[index].Plot}</p>
                </div>
            </div>
        </div>
            `
    }

}*/