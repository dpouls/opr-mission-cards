import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ClaimedMission({ mission, unClaim, game }) {
  const [showUnclaim, setShowUnclaim] = useState(false);
  return (
    <Row
      className={`${game}-claimed-mission my-1 text-dark`}
      onMouseEnter={() => setShowUnclaim(true)}
      onMouseLeave={() => setShowUnclaim(false)}
    >
      <Col xs="12">{mission.desc}</Col>
      <Col xs="6" >
      <b className="text-danger"> {mission.vp} VP</b> <u className='ms-5'>Claimed in Round {mission.round}</u>
      </Col>
      <Col xs="6">
        {showUnclaim && (
          <span className={`${game}-claim`} onClick={() => unClaim(mission)}>
            Unclaim
          </span>
        )}
      </Col>
    </Row>
  );
}

export default ClaimedMission;
