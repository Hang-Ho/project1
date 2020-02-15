
// let movieId = ''

var urlMovie1 = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/inception";
var apiKeyMovie = "6759d647ecmsh1761eebda42847fp182fb5jsnd9c5b4019e17";

//  var urlMovie2 = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/tt1375666";
// //  console.log(movieId)

// var urlMovie2 = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${movieId}`;
var urlLink = " https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=frozen";
var apiKeyLink = "a33a3a4458msh65f6788cc06d484p1ff195jsn955840848a9d";



$.ajax({
    url: urlMovie1,
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
        'x-rapidapi-key': apiKeyMovie
    }
}).then(res1 => {
    //  movieId = res1.titles[0].id;
    // console.log(movieId);
    console.log(res1)

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

// $.ajax({
//     url: urlMovie2,
//     method: "GET",
//     headers: {
//         "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
//         "x-rapidapi-key": "693111e668msh3afac24509ee844p1ff2abjsnf2c3aa32ebb9"
//     }
// }).then (res3 => {
//     console.log('hello world')
//     // console.log(movieId)
//     console.log(res3);
// })

});



