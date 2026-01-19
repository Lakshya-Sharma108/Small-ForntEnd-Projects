// const apiKey = "3ad8ce0d80307b958830aec83960afc9";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        // Change background based on weather
        function updateBackground(weather) {
            const bg = {
                Clear: "linear-gradient(120deg, #f6d365, #fda085)",
                Clouds: "linear-gradient(120deg, #bdc3c7, #2c3e50)",
                Rain: "linear-gradient(120deg, #4b79a1, #283e51)",
                Drizzle: "linear-gradient(120deg, #89f7fe, #66a6ff)",
                Snow: "linear-gradient(120deg, #e6dada, #274046)",
                Mist: "linear-gradient(120deg, #606c88, #3f4c6b)"
            };

            document.body.style.background = bg[weather] || bg.Clear;
            document.body.style.transition = "0.8s ease";
        }

        // Main weather function
        async function checkWeather(city) {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

            if (!response.ok) {
                document.querySelector(".city").innerHTML = "❌ City not found";
                document.querySelector(".temp").innerHTML = "--°c";
                document.querySelector(".humidity").innerHTML = "--%";
                document.querySelector(".wind").innerHTML = "-- km/h";
                return;
            }

            let data = await response.json();

            console.log(data);
            

            document.querySelector(".city").innerHTML = "📍 " + data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            const weatherImg = {
                Clouds: "./Images/clouds.png",
                Clear: "./Images/clear.png",
                Rain: "./Images/rain.png",
                Drizzle: "./Images/drizzle.png",
                Mist: "./Images/mist.png",
                Snow: "./Images/snow.png",
                Haze: "./Images/haze.png",
            };

            weatherIcon.style.opacity = "0";
            setTimeout(() => {
                weatherIcon.src = weatherImg[data.weather[0].main];
                weatherIcon.style.opacity = "1";
            }, 200);

            updateBackground(data.weather[0].main);
        }

        searchBtn.addEventListener("click", () => {
            checkWeather(searchBox.value);
        });

        searchBox.addEventListener("keypress", (e) => {
            if (e.key === "Enter") checkWeather(searchBox.value);
        });
