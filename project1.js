$(document).ready(function () {

    $("#search-btn").on('click', function (event) {
        event.preventDefault();

        var movieName = $("#input-box").val();

        const urlMovie = `https://imdb8.p.rapidapi.com/title/find/?q=${movieName}`;
        // const apiKeyMovie = "5ffb9acc5cmshc1874c0a36de023p17b5c9jsn36d5f1dfe287";
        // const apiKey = "3040cabe73msh1cdad3f627aac19p18c008jsnee48e96015c1";
        const apiKey = "366d188682msh9632395dbe1e5f3p1336bdjsn8376bb207e7c";

        const ids = [];
        const movieNameArr = [];
        const ratings = [];
        const plotsArr = [];
        const linkArr = [];

        const getRatings = async function (movies) {
            console.log(movies);
            for (let i = 0; i < movies.length; i++) {
                console.log(movies[i]);
                const urlRatingsMovie = `https://imdb8.p.rapidapi.com/title/get-ratings/?tconst=${movies[i]}`;
                const ratingRes = await $.ajax({
                    url: urlRatingsMovie,
                    method: 'GET',
                    headers: {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key": apiKey,
                        'x-ratelimit-requests-limit': 2
                    }
                });
                var rating = ratingRes.rating;
                ratings.push(rating);
            }
            console.log(ratings);
        }
        const getPlots = async function (movies) {
            for (let i = 0; i < movies.length; i++) {
                console.log(movies[i]);
                const urlPlots = `https://imdb8.p.rapidapi.com/title/get-plots/?tconst=${movies[i]}`;
                const plotRes = await $.ajax({
                    url: urlPlots,
                    method: 'GET',
                    headers: {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key": apiKey,
                        'x-ratelimit-requests-limit': 2
                    }
                });
                var plot = plotRes.plots[0].text;
                plotsArr.push(plot);
            }

            console.log(plotsArr);
            console.log(linkArr);
            for (let i = 0; i < linkArr.length; i++) {
                const rating = $("<p>").text("Rating: " + ratings[i]);
                console.log(i);
                console.log(ratings[i], plotsArr[i]);
                const plots = $("<p>").text("Plots: " + plotsArr[i]);
                $(`#${i}`).append(rating, plots);
                const linkDiv = $("<div>");
                for (let j = 0; j < linkArr[i].length; j++) {
                    var link = $("<a>").attr('href', linkArr[i][j].url).attr("target", "_blank");
                    link.text(`  ${linkArr[i][j].display_name}  `);
                    linkDiv.append(link);
                }
                $(`#${i}`).append(linkDiv);
            }
        }

        const getLink = async function (movies) {
            const apiKeyLink = "a33a3a4458msh65f6788cc06d484p1ff195jsn955840848a9d";
            for (let i = 0; i < movies.length; i++) {
                console.log(movies[i]);
                const urlLink = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movieNameArr[i];
                const linkRes = await $.ajax({
                    url: urlLink,
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                        "X-RapidAPI-Key": apiKeyLink
                    }
                });
                var link = linkRes.results[0].locations;
                linkArr.push(link);
            }
            console.log(linkArr);
        }

        $.ajax({
            url: urlMovie,
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'imdb8.p.rapidapi.com',
                'x-rapidapi-key': apiKey,
                'x-ratelimit-requests-limit': 2
            }
        }).then(resInfo => {
            const data = resInfo.results;

            if (!data) {
                $('#error').modal('show');
                return;
            }
            const firstData = resInfo.results[0];
            if (!firstData.principals) {
                $('#error').modal('show');
                return;
            }
            const grid = $('<div class="ui three column grid">');
            const row = $('<div class=" row">');
            for (let i = 0; i < 3; i++) {
                let column = $(`<div class='column'>`);
                const movieDiv = $(`<div  id=${i}>`);

                const poster = $("<img>").attr('src', data[i].image.url).width(200);
                const nameAndyear = $("<h4>").text(data[i].title + " (" + data[i].year + ")");

                movieNameArr.push(data[i].title);
                const runTime = $("<p>").text("Run time: " + data[i].runningTimeInMinutes + " minutes");
                const actorDiv = $("<div>");
                let actorsText = "";

                for (let j = 0; j < data[i].principals.length; j++) {
                    actorsText += `${data[i].principals[j].name}, `;
                    if (j === data[i].principals.length - 1) {
                        actorsText += data[i].principals[j].name;
                    }
                }
                const $pActorsText = $('<p>').text(`Actors: ${actorsText}`);
                actorDiv.append($pActorsText);

                movieDiv.append(poster, nameAndyear, runTime, actorDiv);

                column.append(movieDiv);
                row.append(column);
                
                const id = data[i].id.split("/")[2];

                ids.push(id);
            }
            grid.append(row);
            $("#movies-container").prepend(grid);

            console.log(movieNameArr);
            getLink(ids);
            getRatings(ids);
            getPlots(ids);


            
        })
    })
})

