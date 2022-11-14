import logo from "./logo.svg";
import "./App.css";
import Video from "./components/Video";
import { useDispatch } from "react-redux";
import { getPopular } from "./redux/features/listSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopular());
  }, []);
  return <div className="App"></div>;
}

export default App;
