import GameCard from "../components/GameCard";
import React, { useState, useEffect } from "react";
import "./Profile.scss";
import "../index.scss";
import Loading from "../components/Loading";
import { Form, Row, Col, Container } from "react-bootstrap";

function Profile() {
  const [dataFetched, setDataFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allgames, setAllGames] = useState([]);
  const [showHasAchievements, setShowHasAchievements] = useState(false);
  const [showHasPosts, setShowHasPosts] = useState(false);
  const [showAllGames, setShowAllGames] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/getUserGames", {
      credentials: "include",
    }).then((response) =>
      response.json().then((data) => {
        const allgames = data.playedGames;
        const cards = [];

        for (let i = 0; i < allgames.length; i++) {
          cards.push(
            <GameCard
              name={allgames[i][0]}
              header={allgames[i][2]}
              appid={allgames[i][1]}
              key={allgames[i][1]}
              playtime={allgames[i][3]}
              hasAchievements={allgames[i][4]}
              postCount={allgames[i][5]}
            />
          );
        }
        setAllGames(
          cards.sort((b, a) => a.props.playtime - b.props.playtime)
        );
        setDataFetched(true);
      })
    );
  }, []);

  const onFilterChange = (event) => {
    const id = event.target.id;

    if (id === "hasAchievements") {
      setShowHasAchievements(!showHasAchievements);
    } else if (id === "hasPosts") {
      setShowHasPosts(!showHasPosts);
    }
  };

  if (!dataFetched) {
    return <Loading />;
  }

  return (
    <>
      <div id="search-container">
        <Container>
          <Row className="justify-content-md-center" md={2}>
            <Col lg={5}>
              <Form>
                <Form.Group>
                  <Form.Control
                    size="lg"
                    type="input"
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      color: "var(--quaternary-color)",
                    }}
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col lg="auto" md="auto">
              <div className="radioButtons">
                <Form.Check
                  className="radio-button"
                  label="Has Achievements"
                  id="hasAchievements"
                  value="hasAchievements"
                  onChange={onFilterChange}
                  checked={showHasAchievements}
                />
                <Form.Check
                  className="radio-button"
                  label="Has Posts"
                  id="hasPosts"
                  value="hasPosts"
                  onChange={onFilterChange}
                  checked={showHasPosts}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="card-container">
        <Row xs={1} md={2} lg={4} className="g-4">
          {showAllGames &&
            allgames
              .filter(
                (val) =>
                  searchTerm === "" ||
                  val.props.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .filter((val) => {
                if (showHasAchievements && showHasPosts) {
                  return val.props.hasAchievements && val.props.postCount > 0;
                } else if (showHasAchievements) {
                  return val.props.hasAchievements;
                } else if (showHasPosts) {
                  return val.props.postCount > 0;
                } else {
                  return true;
                }
              })}
        </Row>
      </div>
    </>
  );
}

export default Profile;




