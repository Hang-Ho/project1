$(document).ready(function () {

    $("#search-btn").on('click', function (event) {
        event.preventDefault();
        var movieName = $("#input-box").val();

        // var urlMovie = `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${movieName}`;
        // For title search url
        const urlMovie = `https://imdb8.p.rapidapi.com/title/find/?q=${movieName}`;
        var apiKeyMovie = "5ffb9acc5cmshc1874c0a36de023p17b5c9jsn36d5f1dfe287";

        var urlLink = " https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movieName;
        var apiKeyLink = "a33a3a4458msh65f6788cc06d484p1ff195jsn955840848a9d";

        console.log(movieName);
        $.ajax({
            url: urlMovie,
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'imdb8.p.rapidapi.com',
                'x-rapidapi-key': apiKeyMovie
            }
        }).then(res => {
            console.log(res);
            const data = res.results[0];
            const movieDiv = $("<div class='jumbotron'>");
            const poster = $("<img>").attr('src', data.image.url);
            const nameAndyear = $("<p>").text(data.title + " (" + data.year + ")");
            const runTime = $("<p>").text("Run time: " + data.runningTimeInMinutes + " minutes");
            movieDiv.append(poster, nameAndyear, runTime);
            const id = data.id.split("/")[2];
            $("#movies-container").append(movieDiv);
            console.log(id);
            const urlRatingsMovie = `https://imdb8.p.rapidapi.com/title/get-ratings/?tconst=${id}`;

            $.ajax({
                url: urlRatingsMovie,
                method: 'GET',
                headers: {
                    "x-rapidapi-host": "imdb8.p.rapidapi.com",
                    "x-rapidapi-key": "5ffb9acc5cmshc1874c0a36de023p17b5c9jsn36d5f1dfe287"
                }
            }).then(res => {
                console.log('YES', res);
                const rating = $("<p>").text("Rating: " + res.rating);
                $("#movies-container").append(rating);

            })
            
        })
    })
})

