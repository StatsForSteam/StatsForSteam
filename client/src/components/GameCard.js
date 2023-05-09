import Card from 'react-bootstrap/Card';
import ViewAchievements from './buttons/ViewAchievements';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./GameCard.scss";
import React, {useState, useEffect} from 'react';



function GameCard(props){
     const appid = props.appid;
     const [achieved , setAchievedLen] = React.useState();
     const [notachieved , setnotAchievedLen] = React.useState();
     const [hasAchievements, setHasAchievements] = React.useState(true);

     useEffect(() => {
        fetch('/getAchievementAmounts', {
          method: "POST",
          body: JSON.stringify(appid),
          headers: { "content-type": "application/json" },
        }).then(response =>
          response.json().then(data =>{
            if(data.achieved && data.notachieved === 0){hasAchievements = false; }
            setAchievedLen(data.achieved);
            setnotAchievedLen(data.notachieved);
          }))
      }, []);

    let completed = false;
    
    if(achieved == notachieved && hasAchievements == true){completed = true;}
    
    return( hasAchievements ? (
        <div className ="GameCard">
            <Card border="dark" style={{ width: '27.5rem'}} >
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
                                Currently: {achieved} / {notachieved} Achievements
                            </div>
                        )}
                    </Card.Text>
                    <ViewAchievements appid = {props.appid}/>
                </Card.Body>
            </Card>
        </div> ) : (
            null)
    )   

}

export default GameCard;