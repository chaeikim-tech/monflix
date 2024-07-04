const BASE_PATH = "https://api.themoviedb.org/3";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
  }
};

export interface IData {
  overview: string;
  popularity: number;
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  title?: string;
  name?: string;
  vote_average: number;
  adult?: boolean;
  media_type?: "movie" | "tv";
}

interface ISeries {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface ITrendMoviesResult {
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}


export interface IGetSeriesResult {
  page: number;
  results: ISeries[];
  total_pages: number;
  total_results: number;
}

//Home


export function fetchTrendingAll() {
  return fetch(`${BASE_PATH}/trending/all/week?language=ko-KR&page=1`, options)
    .then((response) => response.json());
}



export function fetchTrendingMovie() {
  return fetch(`${BASE_PATH}/trending/movie/week?language=ko-KR&page=1`, options)
    .then((response) => response.json());
}



export function fetchTrendingTv() {
  return fetch(`${BASE_PATH}/trending/tv/week?language=ko-KR&page=1`, options)
    .then((response) => response.json());
}


// Movie

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?language=ko-KR&page=1`, options)
    .then((response) => response.json());
}





//Tv

export function fetchTopTV() {
  return fetch(`${BASE_PATH}/tv/top_rated?language=en-US&page=1`, options)
    .then((response) => response.json());
}


export function fetchPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?language=en-US&page=1`, options)
    .then((response) => response.json());
}

export function fetchAirTv() {
  return fetch(`${BASE_PATH}/tv/on_the_air?language=en-US&page=1`, options)
    .then((response) => response.json());
}


//Search

export function fetchSeacrh(keyword: string) {
  return fetch(`${BASE_PATH}/search/multi?query=${keyword}&include_adult=true?language=ko-KR&page=1`, options).then()
    .then((response) => response.json());
}