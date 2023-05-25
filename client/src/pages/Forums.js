import { useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Post from "../components/Post";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

function Forums() {
    const { state: { props: { appid, name, header, playtime, lastplayed,hasAchievements } } } = useLocation();

    const [achievedLen , setAchievedLen] = useState(),
          [notachievedLen , setnotAchievedLen] = useState(),
          [percentage, setPercentage] = useState(0),
          [playerCount, setPlayerCount] = useState(0),
          [dataFetched, setDataFetched] = useState(false);
        


        useEffect(() => {
          if (hasAchievements) {
            fetch('/getDashboard', {
              method: "POST",
              body: JSON.stringify({ appid, hasAchievements }),
              headers: { "content-type": "application/json" },
            }).then(response =>
              response.json().then(({achievedlength, notachievedlength, achievementPercentage, playerCount }) => {
                setAchievedLen(achievedlength);
                setnotAchievedLen(notachievedlength);
                setPercentage(achievementPercentage);
                setPlayerCount(playerCount);
                setDataFetched(true);
              })
            );
          } else {
            fetch('/getDashboard', {
              method: "POST",
              body: JSON.stringify({ appid, hasAchievements }),
              headers: { "content-type": "application/json" },
            }).then(response =>
              response.json().then(({ playerCount }) => {
                setPlayerCount(playerCount);
                setDataFetched(true);
              })
            );
          }
        }, []);

        if (!dataFetched) {
          return (
            <Loading/>
          );
        }



  return (
    <div>
     <Dashboard
            percentage={percentage}
            achievedLen={achievedLen}
            notachievedLen={notachievedLen}
            name={name}
            playtime={playtime}
            playerCount={playerCount}
            lastplayed={lastplayed}
            header={header}
            hasAchievements={hasAchievements}
          />
    <Post/>
    <Post/>
    </div>
  );
}

export default Forums;

