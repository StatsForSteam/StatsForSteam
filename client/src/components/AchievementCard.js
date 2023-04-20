import React from 'react';
import Card from 'react-bootstrap/Card';

function AchievementCard() {
  return (
    <div class="AchievementCard">
    <Card>
        <Card.Header as="h5">Achievement Title can go here</Card.Header>
        <Card.Body>
            <Card.Text>
            Achievement Description can go here these can be kind of long so I will write this long to account for that 
            </Card.Text>
        </Card.Body>
    </Card>
    </div>
  )
}

export default AchievementCard;
