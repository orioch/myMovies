import React from "react";
import { imgUrl } from "./utils/api";

export default function ActorInfoCard({ person, externalLinks }) {
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
  return (
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
  );
}
