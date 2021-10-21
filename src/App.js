import React, { useState } from "react";
import './App.css'


function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState(false)

  const handleSearch = () => {
    setIsloading(true)
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
    )
      .then((res) => {
        if (res.status === 200) {
          setError(false)
          return res.json();
        }
        if (res.status >= 400) {
          setError(true)
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherForecast(data);
        setIsloading(false)
        setCity("")

      });
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md navbar-light mb-4">
          <a className="navbar-brand" href="#search">
            EBAC Weather
          </a>
        </nav>
      </div>

      <main className="container" id="search">
        <div className="jumbotron">
          <h1>Verique agora a previsão do tempo na sua cidade!</h1>
          <p className="lead">
            Digite da sua cidade no campo abaixo o nome da sua cidade em seguida
            clique em pesquisar.
          </p>
          <div className="row mb-4">
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-lg btn-secondary" onClick={handleSearch}>
            {isLoading ? "Pesquisando..." : "Pesquisar"}
          </button>
          {error &&
            <div class="alert alert-danger" role="alert">
              Houve um erro, tente novamente!
            </div>
          }

          {weatherForecast ? (
            <>
              <div className="mt-4 d-flex align-items-center">
                <div className="col-sm-1">
                  <img
                    src={`${weatherForecast.current.condition.icon}`}
                    alt="Weather Icon"
                  />
                </div>
                <div>
                  <h3>
                    Hoje o dia está: {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead">
                    Temp: {weatherForecast.current.temp_c}&#8451; Sensação térmica: {weatherForecast.current.feelslike_c}&#8451;
                  </p>
                  <p className="lead">
                    Cidade/UF: {weatherForecast.location.name} / {weatherForecast.location.region}
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}

export default App;
