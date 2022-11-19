import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchExternalLinks,
  fetchPerson,
  imgUrl,
} from "../components/utils/api";
import "../css/actorPage.css";

export default function ActorPage() {
  const [person, setPerson] = useState(undefined);
  const [externalLinks, setExternalLinks] = useState([]);
  let id = useParams().id;

  useEffect(() => {
    fetchPerson(id, setPerson);
    fetchExternalLinks("person", id, setExternalLinks);
  }, []);

  const getInfoValueJsx = ({ title, value }) => {
    if (title == "gender")
      return value == 0 ? (
        <p>other</p>
      ) : value == 1 ? (
        <p>female</p>
      ) : (
        <p>male</p>
      );
    if (title == "also known as") return value.map((i) => <p>{i}</p>);
    return <p>{value}</p>;
  };

  if (!person) return <div>loading</div>;
  return (
    <div className="actor-page">
      <div className="card-column">
        <img
          src={imgUrl + person.profile_path}
          alt={person.name}
          className="actor-img"
        />
        <div className="external-links">
          {externalLinks.map((item) => (
            <a href={item.link}>
              <img
                src={require(`../assets/icons/${item.title}.png`)}
                alt=""
                className="icon"
              />
            </a>
          ))}
        </div>
        <div className="info">
          <h1>Personal Info</h1>
          {person.info.map((item) => (
            <React.Fragment>
              <h2>{item.title}</h2>
              {getInfoValueJsx(item)}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="overview-column"></div>
    </div>
  );
}
