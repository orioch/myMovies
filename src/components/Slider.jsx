import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchList } from "./utils/api";

export default function Slider({ listType, listName }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchList(listType, listName, setList);
  }, []);
  // return <div>{list.length}</div>;
  return <div>{list[0].title}</div>;
}
