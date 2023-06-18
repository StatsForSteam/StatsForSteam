import { Card, Col, Row, Container, Form } from 'react-bootstrap';
import "../index.scss";
//hyperlink name and spaces
function Contact() {
  return (
    <Container>
      <h1>Contact Us</h1>
      <Card className="contact-card" style={{ backgroundColor: 'var(--secondary-color)' }}>
        <Card.Body style={{ color: 'var(--quaternary-color)' }}>
            If you have any questions or inquiries, please feel free to reach out to us via email at statsforsteam@gmail.com. We'll be happy to assist you.
        </Card.Body>
      </Card>

      <h1>About the developers</h1>
        <Card className="contact-card" style={{ backgroundColor: 'var(--secondary-color)' }}>
            <Card.Body style={{ color: 'var(--quaternary-color)' }}>     
                    Stats for Steam was developed by <a  target="_blank" href="https://github.com/AndrewWMeier"> Andrew Meier</a> and <a  target="_blank" href="https://github.com/brezden">Callum Brezden</a> as an open source project. Feel free to checkout our  <a href="https://github.com/StatsForSteam/StatsForSteam" 
                    target="blank" >GitHub!</a>.
                     
            </Card.Body>
        </Card>

      <h1>FAQs</h1>

      <Card className="faq-card" style={{ backgroundColor: 'var(--secondary-color)', marginBottom: '20px' }}>
        <Card.Header as="h4" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--tertiary-color)' }}>
          What Information do we collect?
        </Card.Header>
        <Card.Body style={{ color: 'var(--quaternary-color)' }}>
          Not much! We only collect your Steam ID, Steam display name, and Steam avatar. We do not collect any other information from your Steam account.
        </Card.Body>
      </Card>

      <Card className="faq-card" style={{ backgroundColor: 'var(--secondary-color)' }}>
        <Card.Header as="h4" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--tertiary-color)' }}>
          How are we getting our information?
        </Card.Header>
        <Card.Body style={{ color: 'var(--quaternary-color)' }}>
          Everything you see on this website is being pulled directly from Steam's API. No external sources are being used.
        </Card.Body>
      </Card>

      
    </Container>
  );
}

export default Contact;
