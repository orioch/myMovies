import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchList } from "./utils/api";
import "../css/slider.css";
import { Link } from "react-router-dom";

export default function Slider({ listType, id, listName }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (listType == "person") {
    } else fetchList(listType, listName, id, setList);
  }, []);

  return (
    <div className="slider">
      {list.map((item) => (
        <Link to={`/${listType}/${item.id}`} key={item.id} className="card">
          <img
            className="poster"
            src={"https://image.tmdb.org/t/p/original" + item.poster_path}
          />
        </Link>
      ))}
    </div>
  );
}
