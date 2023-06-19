import {Container, Card, Image} from 'react-bootstrap';
import private1 from '../images/private1.PNG';
import private2 from '../images/private2.PNG';
import private3 from '../images/private3.PNG';
import private4 from '../images/private4.PNG';
import '../index.scss';

function PrivateProfile() {
    return (
        <Container>
            <h1>Your Steam profile is private or not fully public</h1>
            <Card style={{ backgroundColor: 'var(--secondary-color)' }}>
                <Card.Body style={{ color: 'var(--quaternary-color)' }}>
                    <Card.Title style={{fontSize:'2em'}}>How to fix this:</Card.Title>
                    <Card.Text>
                        <ol>
                            <li  className='list'>Open Steam and click on your username on the top right corner of the screen, then Click on "View my profile"</li>
                            <Image src={private1} fluid />
                            <li className='list'>Click on "Edit Profile"</li>
                            <Image src={private2} fluid />
                            <li className='list'>Click on "Privacy Settings"</li>
                            <Image src={private3} fluid />
                            <li className='list'>Set my profile and Game details to "Public". Also make sure the checkbox for playtimes is unchecked</li>
                            <Image src={private4} fluid />
                            <li className='list'>After you have done this, refresh the home page of Stats For Steam</li>
                        </ol>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PrivateProfile;
