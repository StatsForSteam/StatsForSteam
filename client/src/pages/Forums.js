import { useLocation } from "react-router-dom";

function Forums() {
    const { state: { props: { appid, name, header, playtime, lastplayed } } } = useLocation();
  return (
    <div>
      <h1>Forums</h1>
        <h2>{name}</h2>
        <img src={header} alt="Game Header"/>
        <h3>Playtime: {playtime} </h3>
        <h3>Last Played: {lastplayed}</h3>
        <h3>App ID: {appid}</h3>

    </div>
  );
}

export default Forums;