import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ClaimedMission({ mission, unClaim, game }) {
  const [showUnclaim, setShowUnclaim] = useState(true);
  return (
    <Row
      className={`${game}-claimed-mission my-1 text-dark`}
      // onMouseEnter={() => setShowUnclaim(true)}
      // onMouseLeave={() => setShowUnclaim(false)}
    >
      <Col xs="12">{mission.desc}</Col>
      <Col xs="6" >
      <b className="text-danger"> {mission.vp} VP</b> 
      </Col>
      <Col xs="6">
        {showUnclaim && (
          <p className={` pointer unclaim text-end m-0`} onClick={() => unClaim(mission)}>
            Unclaim
          </p>
        )}
      </Col>
        <Col xs='12'><u className=''>Claimed in Round {mission.round}</u></Col>
    </Row>
  );
}

export default ClaimedMission;
