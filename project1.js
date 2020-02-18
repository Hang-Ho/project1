$(document).ready(function () {

    $("#search-btn").on('click', function (event) {
        event.preventDefault();
        var movieName = $("#input-box").val();

        const urlMovie = `https://imdb8.p.rapidapi.com/title/find/?q=${movieName}`;
        // const apiKeyMovie = "5ffb9acc5cmshc1874c0a36de023p17b5c9jsn36d5f1dfe287";
        const apiKey = "366d188682msh9632395dbe1e5f3p1336bdjsn8376bb207e7c";

        const urlLink = " https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movieName;
        const apiKeyLink = "a33a3a4458msh65f6788cc06d484p1ff195jsn955840848a9d";

        console.log(movieName);
        $.ajax({
            url: urlMovie,
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'imdb8.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            }
        }).then(res => {
            console.log("info", res);

            // const data = res.results[0];
            // const movieDiv = $("<div class='jumbotron'>");
            // const poster = $("<img>").attr('src', data.image.url).width(200);
            // const nameAndyear = $("<p>").text(data.title + " (" + data.year + ")");
            // const runTime = $("<p>").text("Run time: " + data.runningTimeInMinutes + " minutes");
            // const actorDiv = $("<div>");
            // let actorsText = "";

            // for (let i = 0; i < data.principals.length; i++){                
            //     actorsText += `${data.principals[i].name}, `;
            //     if(i === data.principals.length-1)  {
            //         actorsText += data.principals[i].name;
            //     }
            // }

            // const $pActorsText = $('<p>').text(`Actors: ${actorsText}`);
            // actorDiv.append($pActorsText);

            // movieDiv.append(poster, nameAndyear, runTime, actorDiv);

            // const id = data.id.split("/")[2];
            // $("#movies-container").append(movieDiv);
            // console.log(id);

            // const urlRatingsMovie = `https://imdb8.p.rapidapi.com/title/get-ratings/?tconst=${id}`;
            // const urlPlots = "https://imdb8.p.rapidapi.com/title/get-plots/?tconst=" + id;
            // const urlType = "https://imdb8.p.rapidapi.com/title/get-genres/?tconst=" + id;

            // $.ajax({
            //     url: urlRatingsMovie,
            //     method: 'GET',
            //     headers: {
            //         "x-rapidapi-host": "imdb8.p.rapidapi.com",
            //         "x-rapidapi-key": "5ffb9acc5cmshc1874c0a36de023p17b5c9jsn36d5f1dfe287"
            //     }
            // }).then(res => {
            //     console.log('rating', res);
            //     const rating = $("<p>").text("Rating: " + res.rating);
            //     $("#movies-container").append(rating);

            // })

            // $.ajax({
            //     url: urlPlots,
            //     method: "GET",
            //     headers: {
            //         "x-rapidapi-host": "imdb8.p.rapidapi.com",
            //         "x-rapidapi-key": "5ffb9acc5cmshc1874c0a36de023p17b5c9jsn36d5f1dfe287"
            //     }
            // }).then(res => {
            //     console.log('plot', res);
            //     const plots = $("<p>");
            //     plots.text(`Plots:  ${res.plots[0].text}`);
            //     $("#movies-container").append(plots);
            // })
            // $.ajax({
            //     url: urlType,
            //     method: "GET",
            //     headers: {
            //         "x-rapidapi-host": "imdb8.p.rapidapi.com",
            //         "x-rapidapi-key": "5ffb9acc5cmshc1874c0a36de023p17b5c9jsn36d5f1dfe287"
            //     }

            // }).then(res => {

            //     $.ajax({
            //         url: urlLink,
            //         method: "GET",
            //         headers: {
            //             "X-RapidAPI-Host" : "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            //             "X-RapidAPI-Key" : apiKeyLink
            //         }
            //     }).then(res => {
            //         console.log("link", res);
            //         const linkDiv = $("<div>");
            //         for (let i = 0; i < res.results[0].locations.length; i++){
            //             var link = $("<a>").attr('href', res.results[0].locations[i].url);
            //             link.text(`  ${res.results[0].locations[i].display_name}  `);
            //             linkDiv.append(link);
            //         }
            //         $("#movies-container").append(linkDiv);
            //     })
            // })
            // })

            const data = res.results;
            for (let i = 0; i < 3; i++) {
                console.log(data.length);
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
                $("#movies-container").append(movieDiv);
                console.log(id);

                const urlRatingsMovie = `https://imdb8.p.rapidapi.com/title/get-ratings/?tconst=${id}`;
                const urlPlots = "https://imdb8.p.rapidapi.com/title/get-plots/?tconst=" + id;
                const urlType = "https://imdb8.p.rapidapi.com/title/get-genres/?tconst=" + id;
                console.log(urlPlots);
                $.ajax({
                    url: urlRatingsMovie,
                    method: 'GET',
                    headers: {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key": apiKey
                    }
                }).then(resRating => {
                    $.ajax({
                        url: urlPlots,
                        method: "GET",
                        headers: {
                            "x-rapidapi-host": "imdb8.p.rapidapi.com",
                            "x-rapidapi-key": apiKey
                        }
                    }).then(resPlots => {
                        $.ajax({
                            url: urlType,
                            method: "GET",
                            headers: {
                                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                                "x-rapidapi-key": apiKey
                            }
                        }).then(res => {

                            $.ajax({
                                url: urlLink,
                                method: "GET",
                                headers: {
                                    "X-RapidAPI-Host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                                    "X-RapidAPI-Key": apiKeyLink
                                }
                            }).then(resUtelly => {
                                console.log(i);
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
                                    var link = $("<a>").attr('href', res.results[0].locations[j].url);
                                    link.text(`  ${res.results[0].locations[j].display_name}  `);
                                    linkDiv.append(link);
                                }
                                $("#movies-container").append(linkDiv);
                            })
                            
                        })
                    })
                })



            }
        })
    })
})

