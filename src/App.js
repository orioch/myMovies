import logo from "./logo.svg";
import "./App.css";
import Video from "./components/Video";
import { useDispatch } from "react-redux";
import { getList } from "./redux/features/listSlice";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import MoviePage from "./pages/MoviePage";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="movie" element={<MoviePage type={"movie"} />}>
          <Route path=":id" element={<MoviePage type={"movie"} />} />
        </Route>
        <Route path="tv" element={<MoviePage type={"tv"} />}>
          <Route path=":id" element={<MoviePage type={"tv"} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
