import GameCard from "../components/GameCard";
import React, {useState, useEffect} from 'react';
import "./Profile.scss";

function Profile() {
  const [UserID, setUserID] = useState();
  
  useEffect(() => {
      fetch('/getUserID').then(response => 
          response.json().then(data => {
          setUserID(data['username']);
          console.log(UserID);
      }))
  }, [UserID]);

  const GamesOwned = 50;
  const cards = [];
  for (let i = 0; i < GamesOwned; i++) {
    cards.push(<GameCard />);
  }
  
  return (
    <div class="cardFlex">
      {UserID}
      {cards}
    </div>
  );
}

export default Profile;



