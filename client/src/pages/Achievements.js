//user has now pressed the view achievments on a specific game and is now on the achievments page for that game
import React from 'react';
import './Achievements.scss';
import AchievementCard from '../components/AchievementCard';

function Achievements(){
    const AchievementIcon = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/252950/9974f05905881b45c7a2dbbd3c84d5e8c57fa01a.jpg"
    const NumGameAchievements = 20;
  const AchievementCards = [];

  for (let i = 0; i < NumGameAchievements; i++) {
    AchievementCards.push(<AchievementCard />);
  }
    return(
        <div class="AchievementCardFlex">
            {AchievementCards}
        </div>
    )

}
 export default Achievements;
 
