import Card from 'react-bootstrap/Card';
import ViewAchievements from './buttons/ViewAchievements';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./GameCard.scss";
import React, {useState, useEffect} from 'react';



function GameCard(props){
   
     const appid = props.appid;
     const [achievedLen , setAchievedLen] = React.useState();
     const [notachievedLen , setnotAchievedLen] = React.useState();

     useEffect(() => {
        fetch('/getAchievements', {
          method: "POST",
          body: JSON.stringify(appid),
          headers: { "content-type": "application/json" },
        }).then(response =>
          response.json().then(data =>{
            setAchievedLen(data.achievedlength);
            setnotAchievedLen(data.notachievedlength);
          }))
      }, []);


const completed = false;
 
  
//props.name is the name of the game
//props.header is the header image of the game
    return (
        <div class ="GameCard">
            <Card border="dark" style={{ width: '27.5rem'}}>
                <Card.Img variant="top" src={props.header} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {completed ? (
                            <div>
                                Completed All Achievements
                                <span id="boot-icon" class="bi bi-check-lg icon-green"></span>
                            </div>
                        ) : (
                            <div>
                                Currently: {achievedLen} / {notachievedLen} Achievements
                            </div>
                        )}
                    </Card.Text>
                    <ViewAchievements appid = {props.appid}/>
                </Card.Body>
            </Card>
        </div>
    )
}

export default GameCard;

