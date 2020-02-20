$(document).ready(function () {
    $("#search-btn").on('click', function (event) {
        event.preventDefault();
        var movieName = $("#input-box").val();
        const urlMovie = `https://imdb8.p.rapidapi.com/title/find/?q=${movieName}`;
        // const apiKeyMovie = "5ffb9acc5cmshc1874c0a36de023p17b5c9jsn36d5f1dfe287";
        const apiKey = "3040cabe73msh1cdad3f627aac19p18c008jsnee48e96015c1";
        const urlLink = " https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movieName;
        const apiKeyLink = "a33a3a4458msh65f6788cc06d484p1ff195jsn955840848a9d";
        console.log(movieName);
        $.ajax({
            url: urlMovie,
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'imdb8.p.rapidapi.com',
                'x-rapidapi-key': apiKey,
                'x-ratelimit-requests-limit' : 2
            }
        }).then(resInfo => {
            console.log("info", resInfo);
            const data = resInfo.results;
            const grid = $('<div class="ui three column grid">');
            const row = $('<div class=" row">');
            for (let i = 0; i < 3; i++) {
                console.log(data.length);
                let column = $('<div class="column">column 1</div>');
                const movieDiv = $("<div>").attr('id', i);
                const poster = $("<img>").attr('src', data[i].image.url).width(200);
                const nameAndyear = $("<p>").text(data[i].title + " (" + data[i].year + ")");
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
                const id = data[i].id.split("/")[2];
                console.log(id);
                const urlRatingsMovie = `https://imdb8.p.rapidapi.com/title/get-ratings/?tconst=${id}`;
                const urlPlots = "https://imdb8.p.rapidapi.com/title/get-plots/?tconst=" + id;
                const urlType = "https://imdb8.p.rapidapi.com/title/get-genres/?tconst=" + id;
                $.ajax({
                    url: urlRatingsMovie,
                    method: 'GET',
                    headers: {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key": apiKey,
                        'x-ratelimit-requests-limit' : 2
                    }
                }).then(resRating => {
                    $.ajax({
                        url: urlPlots,
                        method: "GET",
                        headers: {
                            "x-rapidapi-host": "imdb8.p.rapidapi.com",
                            "x-rapidapi-key": apiKey,
                            'x-ratelimit-requests-limit' : 2
                        }
                    }).then(resPlots => {
                            column.append(movieDiv);
                            row.append(column);
                            grid.append(row);
                            $("#movies-container").append(grid);
                            $.ajax({
                                url: urlLink,
                                method: "GET",
                                headers: {
                                    "X-RapidAPI-Host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                                    "X-RapidAPI-Key": apiKeyLink
                                }
                            }).then(resUtelly => {
                                console.log('rating', resRating);
                                const rating = $("<p>").text("Rating: " + resRating.rating);
                                $(`#${i}`).append(rating);
                                console.log('plot', resPlots);
                                const plots = $("<p>");
                                plots.text(`Plots:  ${resPlots.plots[0].text}`);
                                $(`#${i}`).append(plots);
                                console.log("link", resUtelly);
                                const linkDiv = $("<div>");
                                for (let j = 0; j < resUtelly.results[0].locations.length; j++) {
                                    var link = $("<a>").attr('href', resUtelly.results[0].locations[j].url);
                                    link.text(`  ${resUtelly.results[0].locations[j].display_name}  `);
                                    linkDiv.append(link);
                                }
                              console.log("break")
                                // column.append(movieDiv, linkDiv);
                                // row.append(column);
                                // grid.append(row);
                                // $("#movies-container").append(grid);
                            })
                        })
                    })
            }
        })
    })
})


