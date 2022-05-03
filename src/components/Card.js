import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
function Card({ card }) {
  let { number, title, missions, objectiveMarkers } = card;
  return (
    <Container className="mission-card rounded-3 shadow m-3 p-3 d-flex flex-column justify-content-between">
      <Row>
        <Col className='number' xs="5" md="4">
          {number}
        </Col>
        <Col className='title' xs="7" md="8">
          {title}
        </Col>
      </Row>
      {missions.map((mission) => {
        return (
          <Row className='mission' key={mission.desc}>
            <Col className='mission-desc text-center' xs="12">{mission.desc}</Col>
            <Col className='mission-vp text-end' xs="6">{mission.vp}VP</Col>
            <Col  xs="6">
             <div className='claim btn-sm'>Claim</div>
            </Col>
          </Row>
        );
      })}

      <div  className='btn-sm'>Discard</div>
    </Container>
  );
}

export default Card;
