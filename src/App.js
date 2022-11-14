import logo from "./logo.svg";
import "./App.css";
import Video from "./components/Video";
import { useDispatch } from "react-redux";
import { getList } from "./redux/features/listSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getList({ listType: "movie", listName: "popular" }));
    dispatch(getList({ listType: "movie", listName: "top_rated" }));
    dispatch(getList({ listType: "movie", listName: "upcoming" }));
    dispatch(getList({ listType: "tv", listName: "popular" }));
    dispatch(getList({ listType: "tv", listName: "top_rated" }));
    dispatch(getList({ listType: "tv", listName: "on_the_air" }));
  }, []);
  return <div className="App"></div>;
}

export default App;
