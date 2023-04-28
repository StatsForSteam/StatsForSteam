//user has now pressed the view achievments on a specific game and is now on the achievments page for that game
import React from 'react';
import './Achievements.scss';
import AchievementCard from '../components/AchievementCard';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Achievements(props){
  const { state } = useLocation();
  const AchievementIcon = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/252950/9974f05905881b45c7a2dbbd3c84d5e8c57fa01a.jpg"
  const NumGameAchievements = 20;
  const AchievementCards = [];

  const appid = state;

  useEffect(() => {
    fetch('/getAchievementTest', {
      method: "POST",
      body: JSON.stringify(appid),
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) return Promise.reject(res);
        return res.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch(console.error);
  });

  for (let i = 0; i < NumGameAchievements; i++) {
    AchievementCards.push(<AchievementCard />);
  }
    return(
        <div>
          <div class="AchievementCardFlex">
            {AchievementCards}
          </div>
        </div>
    )
}
 export default Achievements;
 
