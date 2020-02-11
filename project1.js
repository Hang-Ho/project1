
var urlMovie = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/inception";
var apiKeyMovie = "6759d647ecmsh1761eebda42847fp182fb5jsnd9c5b4019e17";

var urlLink = " https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=frozen";
var apiKeyLink = "a33a3a4458msh65f6788cc06d484p1ff195jsn955840848a9d";


$.ajax({
    url: urlMovie,
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
        'x-rapidapi-key': apiKeyMovie
    }
}).then(res => {
    console.log(res);

    $.ajax({
        url: urlLink,
        method: 'GET',
        headers: {
            'X-RapidAPI-Host' : 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
            'X-RapidAPI-Key' : apiKeyLink,
            
        }
    }).then (res2 => {
        console.log(res2);
    })
})


