import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Movie from "./Routes/Movie";
import CardDetail from "./Components/CardDetail";

function App() {
  //const paths = ["/", "/movies/:movieId"]
  const detailPaths = ["/movie/:mediaId", "/tv/:mediaId"]

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        {detailPaths.map((detailPaths) => (
          <Route path={detailPaths} key={detailPaths} element={<CardDetail />} />
        ))}
        <Route path="/" element={<Home />} />
        {/* {paths.map((path) => (
          <Route path={path} key={path} element={<Home />} />
        ))} */}
      </Routes>
    </Router>
  );
}

export default App;