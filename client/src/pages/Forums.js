import { useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Post from "../components/Post";

function Forums() {
    const { state: { props: { appid, name, header, playtime, lastplayed } } } = useLocation();
  return (
    <div>
     <Dashboard
            percentage={"fetchme"}
            achievedLen={"fetchme"}
            notachievedLen={"fetchme"}
            name={name}
            playtime={playtime}
            playerCount={"fetchme"}
            lastplayed={lastplayed}
            header={header}
          />
    <Post/>
    <Post/>
    </div>
  );
}

export default Forums;

