import GameCard from "../components/GameCard";
import React, {useEffect} from 'react';
import "./Profile.scss";

function Profile() {
  useEffect(() => {
    fetch('/getUserName').then(response => 
      response.json().then(data => {
        console.log(data);
    }))
  }, []);

  const GamesOwned = 50;
  const cards = [];
  for (let i = 0; i < GamesOwned; i++) {
    cards.push(<GameCard />);
  }
  return (
    <div class="cardFlex">
      {cards}
    </div>
  );
}

export default Profile;



