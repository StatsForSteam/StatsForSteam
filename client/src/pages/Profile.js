import GameCard from "../components/GameCard";
import React, {useState, useEffect} from 'react';
import "./Profile.scss";

function Profile() {

//get a users games titles with a json containing array
  const [userGames, setUserGames] = React.useState( () => {
    fetch('/getUserGames').then(response =>
      response.json().then(data => {
        setUserGames(data.games);
      }))
  });
//get a users game headers with a json containing array
  const [gameHeader, setGameHeaders] = React.useState( () => {
    fetch('/getUserGamesHeaders').then(response =>
      response.json().then(data => {
        setGameHeaders(data.gameHeaders);
      }))
  });

//get the number of games a user owns
const [numGames, setGamesOwned] = React.useState();
  useEffect(() => {
    fetch('/getNumberOfGames').then(response =>
      response.json().then(data => {
        setGamesOwned(data.GamesOwned);
      }
      )) }, [numGames, userGames, gameHeader]);
 
//load cards for each game into an array 
  const cards = [];
  for (let i = 0; i < numGames; i++) {
    cards.push(<GameCard name= {userGames[i][0]} header = {gameHeader[i]} appid = {userGames[i][1]} />);
  }
  //display the cards 
  return (
    <div class="cardFlex">
      {cards}
    </div>
  );
}

export default Profile;



