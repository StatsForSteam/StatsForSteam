import React from 'react';
import Card from 'react-bootstrap/Card';
import './AchievementCard.scss';

function AchievementCard() {
  return (
    <div class="AchievementCard">
    <Card>
        <Card.Header as="h5">Achievement Title can go here</Card.Header>
        <Card.Body>
        <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/252950/9974f05905881b45c7a2dbbd3c84d5e8c57fa01a.jpg"/>
            <Card.Text>
            Achievement Description can go here these can be kind of long so I will write this long to account for that 
            </Card.Text>
        </Card.Body>
    </Card>
    </div>
  )
}


export default AchievementCard;
