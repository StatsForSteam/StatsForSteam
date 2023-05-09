import GameCard from "../components/GameCard";
import React, {useState, useEffect} from 'react';
import "./Profile.scss";

function Profile() {
  const [cards, setCards] = useState();
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch('/getUserGames').then(response => 
        response.json().then(data => {
          const userGames = data.games
          const cardArray = []
          for (let i = 0; i < 40; i++) {
            cardArray.push(<GameCard name= {userGames[i][0]} header = {userGames[i][2]} appid = {userGames[i][1]} key = {userGames[i][1]}/>);
          }
          setCards(cardArray);
          setDataFetched(true);
    }))
  }, []);

  return (
    <div>
      {dataFetched ? 
      (<div className="cardFlex">{cards}</div>) 
      : 
      (
        <div className="loading">
          <h2 className="loadingText"> Loading...</h2>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;