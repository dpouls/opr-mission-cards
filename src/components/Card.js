import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Card({ card, changeVP, discard ,game}) {
  let { number, title, missions, objectiveMarkers } = card;

  const handleClaim = (vp) => {
    // discard the card
    discard(number);
    changeVP(vp);
  };
  return (
    <Container className={` mission-card ${game}-card  my-3 p-3 d-flex flex-column justify-content-between`}>
      <Row className={`${game}-text-gradient d-flex justify-content-between`}>
        <Col className="number " xs="5" md="4">
        
          <span className="number">{number}</span>


        </Col>
        <Col className="title" xs="7" md="8">
          {title}
      <hr />
        </Col>
      </Row>
      {missions.map((mission) => {
        return (
          <Row className="mission " key={mission.desc}>
            <Col className={`${game === 'gdf' && 'gdf-text-gradient '}   mission-desc text-center`} xs="12">
              {mission.desc}
            </Col>
            <Col className="mission-vp text-end" xs="6">
              {mission.vp}VP
            </Col>
            {changeVP && (
              <Col xs="6" className='d-flex justify-content-end align-items-center'>
                <span
                  className={`${game}-claim pointer hover-white`}
                  onClick={() => handleClaim(mission.vp)}
                >
                  Claim
                </span>
              </Col>
            )}
          </Row>
        );
      })}
      <Row>
        <Col>
          {changeVP && (
            <span className="gdf-discard pointer hover-red" onClick={() => discard(number)}>
              Discard
            </span>
          )}
        </Col>
      </Row>
  
    </Container>
  );
}

export default Card;
