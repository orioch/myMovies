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
        <Route path="movie" element={<MoviePage />}>
          <Route path=":id" element={<MoviePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
