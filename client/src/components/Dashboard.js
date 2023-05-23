
import { Container, Row, Col } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { IconContext } from 'react-icons';
import { BsFillClockFill, BsPeopleFill, BsFillCalendarWeekFill } from 'react-icons/bs';
import Image from 'react-bootstrap/Image';

function Dashboard(props){
    return(
        <div className="Dashboard">
             <Container fluid>
                <Row id="Row">
                  <Col>
                      <div className="Circle">
                        <CircularProgressbar value={props.percentage} background={true} text={`${props.percentage}%`} styles={buildStyles({
                                              textColor: 'var(--quaternary-color)',
                                              backgroundColor: 'var(--primary-color)',
                                              pathColor: 'var(--quaternary-color)',
                                              trailColor: 'var(--primary-color)',
                                              })}/>
                      </div>
                      <h3>{props.achievedLen} / {props.achievedLen+props.notachievedLen} completed</h3>
                  </Col>
                  <Col>
                    <h1>{props.name}</h1>
                    <ul>
                      <h3><IconContext.Provider value={{color:'var(--tertiary-color)'}}><BsFillClockFill size={40}/></IconContext.Provider> <span className="stats-spacing"> {props.playtime} <span className="stats-text"> hrs on record </span></span></h3> 
                      <h3><IconContext.Provider value={{color:'var(--tertiary-color)'}}><BsPeopleFill size={40}/></IconContext.Provider> <span className="stats-spacing">{props.playerCount} <span className="stats-text"> current players</span></span></h3>
                      <h3><IconContext.Provider value={{color:'var(--tertiary-color)'}}><BsFillCalendarWeekFill size={40} /> </IconContext.Provider><span className="stats-spacing"> {props.lastplayed} <span className="stats-text"> last played</span></span></h3> 
                    </ul>
                  </Col>
                  <Col xs="auto">
                    <Image fluid="true" id="gameImg" alt="steam header" src={props.header}></Image> 
                  </Col>
                </Row>
              </Container>
        </div>
    )
}


export default Dashboard;

