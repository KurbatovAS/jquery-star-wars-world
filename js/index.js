$(document).ready(function () {
  // +++++ navigation buttons +++++
  const state = {
    films: null,
    filmsGalleryShow: true,
    filmShow: false,
  };
  $("#root").append(`<div class="navigation"></div>`);
  $(".navigation").append(
    '<a href="#" class="navigation__btn" id="goToHome">Home</a>'
  );
  $("#goToHome").on("click", () => {
    onHomeClickHandler();
  });

  //   $(".films__item").on("click", () => {
  //     console.log("Click");
  //     // getSWAPI(url);
  //   });

  // ----- navigation buttons -----

  // +++++ films gallery +++++

  $("#root").append('<section class="films"></section>');

  // ----- films gallery -----

  // +++++ API +++++ start

  function getSWAPI(url) {
    $.get(`https://swapi.dev/api/${url}`, () => {
      console.log("success");
    })
      .done((data) => {
        state.films = data.results;
        renderFilms(state.films);
        $(".films__item").on("click", (e) => {
          const filmTitle = e.currentTarget.firstElementChild.innerText;
          onFilmClickHandler(filmTitle, data.results);
        });
      })
      .fail(() => {
        console.log("error");
      })
      .always(() => {
        console.log("complete");
      });
  }

  // ----- API ----- end

  function onHomeClickHandler() {
    if (state.filmsGalleryShow === true && !state.films) {
      getSWAPI("films");
    } else {
      if (state.filmShow === true) {
        state.filmShow === false;
        $(".navigation__delimeter").fadeOut(1);
        $("#filmTitle").fadeOut(1);
        $(".film").fadeOut(1);
        state.filmsGalleryShow === true;
        $("#films__gallery").fadeIn(1);
      }
    }
  }

  function renderFilms(films) {
    const fimsMarkup = films.map((film) => {
      return renderFilmMarkup(film);
    });
    $(".films").append(
      '<div id="films__gallery"><h2 class="films__heading">Films</h2><ul class="films__list"></ul></div>'
    );
    $(".films__list").append(fimsMarkup);
  }

  function renderFilmMarkup(film) {
    const {
      title,
      episode_id,
      opening_crawl,
      director,
      producer,
      release_date,
    } = film;
    return `
      <li class="films__item">        
            <h3 class="film__title">${title}</h3>
            <ul class="film__list">
                <li class="film__infoItems">Episode id: ${episode_id}</li>
                <li class="film__infoItems film__infoItems--crawl">Opening crawl: ${opening_crawl}</li>
                <li class="film__infoItems">Director: ${director}</li>
                <li class="film__infoItems">Producer: ${producer}</li>
                <li class="film__infoItems">Release date: ${release_date}</li>
            </ul>        
    </li>`;
  }

  function onFilmClickHandler(filmTitle, films) {
    const requiredFilm = films.filter((film) => {
      return film.title === filmTitle;
    });

    const filmMarkup = renderFilmDetailsMarkup(requiredFilm);
    state.filmsGalleryShow = false;
    $(".navigation").append(
      `<span class="navigation__delimeter">></span><a href="#" class="navigation__btn" id="filmTitle" >${filmTitle}</a>`
    );
    $("#films__gallery").fadeOut(1);
    $(".films").append(filmMarkup);
    state.filmShow = true;
  }

  function renderFilmDetailsMarkup([FilmDetails]) {
    const {
      title,
      episode_id,
      opening_crawl,
      director,
      producer,
      release_date,
      characters,
      planets,
      starships,
      vehicles,
      species,
    } = FilmDetails;

    return `
      <article class="film">        
            <h3 class="film__title">${title}</h3>
            <ul class="film__list">
                <li class="film__infoItems">Episode id: ${episode_id}</li>
                <li class="film__infoItems film__infoItems--crawl">Opening crawl: ${opening_crawl}</li>
                <li class="film__infoItems">Director: ${director}</li>
                <li class="film__infoItems">Producer: ${producer}</li>
                <li class="film__infoItems">Release date: ${release_date}</li>
                <ul class="characters">
                    <li class="characters__item">character 1</li>
                </ul>
                <ul class="planets">
                    <li class="planets__item">planet 1</li>
                </ul>
                <ul class="starships">
                    <li class="starships__item">starship 1</li>
                </ul>
                <ul class="vehicles">
                    <li class="vehicles__item">vehicle 1</li>
                </ul>
                <ul class="species">
                    <li class="species__item">specie 1</li>
                </ul>
            </ul>        
    </article>`;
  }
});
