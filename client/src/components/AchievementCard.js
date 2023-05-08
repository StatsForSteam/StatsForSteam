import React from 'react';
import Card from 'react-bootstrap/Card';
import './AchievementCard.scss';


function AchievementCard(props) {
    return (
      <div className="AchievementCard">
        <Card>
            <Card.Header as="h5">{props.title}</Card.Header>
            <Card.Body>
            <img src={props.img}/>
                <Card.Text>
                  {props.description.length > 0 ? props.description : "No Description Available"}
                </Card.Text>
            </Card.Body>
        </Card>
      </div>)      
}

export default AchievementCard;
