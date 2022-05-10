import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "./Card";

function Cards({
  cards,
  game,
  changeVP,
  discard,
  claimedMissions,
  setClaimedMissions,
  unClaim
}) {
  return (
    <Container>
      <Row>
        {cards.map((card) => {
          return (
            <Col key={card.number} xs="12" md="6" lg="4">
              <Card
              unClaim={unClaim}
                card={card}
                game={game}
                changeVP={changeVP}
                discard={discard}
                claimedMissions={claimedMissions}
                setClaimedMissions={setClaimedMissions}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Cards;
