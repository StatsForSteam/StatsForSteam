
import { Container, Row, Col } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { IconContext } from 'react-icons';
import { BsFillClockFill, BsPeopleFill} from 'react-icons/bs';
import {SiWechat} from 'react-icons/si';
import Image from 'react-bootstrap/Image';
import ForumsButton from './buttons/ForumsButton';
import ViewAchievements from './buttons/ViewAchievements';
import './Dashboard.scss'

function Dashboard(props){
    return(
        <div className="Dashboard">
             <Container fluid>
                <Row>
                  {props.hasAchievements ? (
                  <Col >
                      <div className="Circle">
                        <CircularProgressbar value={props.percentage} background={true} text={`${props.percentage}%`} styles={buildStyles({
                                              textColor: 'var(--quaternary-color)',
                                              backgroundColor: 'var(--primary-color)',
                                              pathColor: 'var(--quaternary-color)',
                                              trailColor: 'var(--primary-color)',
                                              })}/>
                      </div>
                      <h3>{props.achievedLen} / {props.achievedLen+props.notachievedLen} completed</h3>
                  </Col> ) : (
                    <Col>
                    <h1>This game has no achievements</h1>
                    </Col> )}
                  <Col>
                    <h1>{props.name}</h1>
                    <ul>
                      <h3><IconContext.Provider value={{color:'var(--tertiary-color)'}}><BsFillClockFill size={40}/></IconContext.Provider> <span className="stats-spacing"> {props.playtime} <span className="stats-text"> hrs on record </span></span></h3> 
                      <h3><IconContext.Provider value={{color:'var(--tertiary-color)'}}><BsPeopleFill size={40}/></IconContext.Provider> <span className="stats-spacing">{props.playerCount} <span className="stats-text"> current players</span></span></h3>
                      <h3><IconContext.Provider value={{color:'var(--tertiary-color)'}}><SiWechat size={40} /> </IconContext.Provider><span className="stats-spacing"> {props.postCount} <span className="stats-text"> posts</span></span></h3> 
                    </ul>
                  </Col>
                  <Col xs="auto">
                    <Image fluid="true" id="gameImg" alt="steam header" src={props.header}></Image> 
                    <div className="d-flex align-items-center" id="button-text">
                      {props.location === "Achievements" ? (
                        <>
                          <h3 id="text-color" className="mr-2">Check out this game's discussion:</h3>
                          <ForumsButton props={props} fromDashboard={true}/>
                        </>
                      ) : (
                        (props.hasAchievements && (
                          <>
                            <h3 id="text-color" className="mr-2">
                              View your achievements:
                            </h3>
                            <ViewAchievements props={props} fromDashboard={true} />
                          </>
                        )) ||
                        null
                      )}
                    </div>                      
                  </Col>
                </Row>
              </Container>
        </div>
    )
}


export default Dashboard;

