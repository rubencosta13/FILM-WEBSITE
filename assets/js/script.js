const form = document.querySelector('#formInput')


function getData(event) {
    event.preventDefault()
    const inputFilmName = form.querySelector('#inputFilmName')
    axios.get(`http://www.omdbapi.com/?t=${encodeURI(inputFilmName.value)}&apikey=542a7e01`)
    .then(response => {
        if (response.data.Response === "True"){
            displayFilmData(response)
        }else{

        }
    })
}   

function displayFilmData(response){
    const handler = document.querySelector("#requestHandeler")
    const card = document.querySelector("#card")
    const filmName = document.querySelector('#filmName')
    const filmImage = document.querySelector("#filmImage")
    const filmPlot = document.querySelector("#plot")
    const director = document.querySelector("#director")
    const genre = document.querySelector("#genre")
    const writter = document.querySelector("#writter")
    const stars = [...document.getElementsByClassName("rating_star")]
    let rating = parseInt(response.data.Ratings[0].Value.split("/")[0])/2
    rating = rating.toFixed(2)
    for (let i = 0; i < rating; i++) {
        stars[i].classList.add("checked")
    }
    handler.classList.add("alert", "alert-success", "alert1")
    handler.innerText = "Movie / Film encountered!"
    setTimeout(() => {
        handler.classList.remove("alert", "alert-success")
        handler.classList.add("alert1")
        handler.innerText = ""
    }, 4000)
    director.textContent = response.data.Director
    genre.textContent = response.data.Genre
    writter.textContent = response.data.Writer
    filmImage.src = response.data.Poster  
    filmPlot.textContent = response.data.Plot            
    filmName.textContent = response.data.Title
    card.classList.remove("hidden")
}

form.addEventListener('submit', getData)