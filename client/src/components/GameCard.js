import Card from 'react-bootstrap/Card';
import ViewAchievements from './buttons/ViewAchievements';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./GameCard.scss";




function GameCard(props){

    
    return( 
        <div className ="GameCard">
            <Card border="dark" style={{ width: '27.5rem'}} >
                <Card.Img variant="top" src={props.header} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                            <div>
                                Currently: {props.playtime} hours
                            </div>
                    </Card.Text>
                    <ViewAchievements props = {props}/>
                </Card.Body>
            </Card>
        </div> 
    )   

}

export default GameCard;