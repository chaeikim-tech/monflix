const BASE_PATH = "https://api.themoviedb.org/3";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
  }
};

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface ISeries {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}


export interface IGetSeriesResult {
  page: number;
  results: ISeries[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?language=ko-KR&page=1`, options)
    .then((response) => response.json());
}


export function getSeries() {
  return fetch(`${BASE_PATH}/trending/tv/week?language=ko-KR`, options).then()
        .then((response) => response.json());

}