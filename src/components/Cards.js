import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import  Card  from "./Card";

function Cards({cards, game}) {
    
  return (
    <Container>
        
      <Row>
        {cards.map((card) => {
          return (
            <Col key={card.number} xs="12" md="6" lg="4">
              <Card card={card} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Cards;
