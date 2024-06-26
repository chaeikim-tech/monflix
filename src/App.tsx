import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  const paths = ["/", "/movies/:movieId"]

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        {paths.map((path) => (
          <Route path={path} key={path} element={<Home />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;