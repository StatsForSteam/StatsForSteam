import GameCard from "../components/GameCard";
import React, {useState, useEffect} from 'react';
import "./Profile.scss";

function Profile() {
  const [cards, setCards] = useState();
  const [numGames, setGamesOwned] = useState();
  const [userGames, setUserGames] = useState({userGames:[]});
  const [gameHeader, setGameHeaders] = useState({gameHeader:[]});
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    if (!dataFetched){
        Promise.all([
        fetch('/getUserGames'),
        fetch('/getUserGamesHeaders'),
        fetch('/getNumberOfGames')
      ]).then(([userGamesResponse, userGamesHeadersResponse, getUserNumberOfGamesResponse]) => {
        
        userGamesResponse.json().then(data => setUserGames(data.games));
        userGamesHeadersResponse.json().then(data => setGameHeaders(data.gameHeaders));
        getUserNumberOfGamesResponse.json().then(data => setGamesOwned(data.GamesOwned));

        if (userGames.length && gameHeader.length && (typeof numGames !== "undefined")){
          const cardArray = []
          for (let i = 0; i < numGames; i++) {
            cardArray.push(<GameCard name= {userGames[i][0]} header = {gameHeader[i]} appid = {userGames[i][1]}/>);
          }
          setCards(cardArray);
          setDataFetched(true)
        }
      })
    }
  })
  
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