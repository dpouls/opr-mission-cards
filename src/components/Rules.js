import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
let rules = [
  {
    title: "Mission Cards",
    body: [
      "These rules were created to give players a dynamic way to play, with shifting mission objectives.",
    ],
  },
  {
    title: "Print & Play",
    body: [
      "Print and cut all 36 mission cards. We recommend inserting them all in card sleeves, and you can also insert a regular playing card for rigidity.",
    ],
  },
  {
    title: "Roll & Play",
    body: [
      "If you prefer you can also choose not to cut out the mission cards,  but instead roll two dice to determine a random card. To do this roll each die one  at a time, where the result of the first one stands for decimals whilst the result of the second one stands for units. Then check the top left number of the cards to see which one you got.",
      "Example: A player rolls two dice, with the first result being a 2 and the second result being a 1. This would mean that card 21 (Seize 1) is chosen.",
    ],
  },
  {
    title: "Controlling Markers",
    body: [
      "At the end of each round if a unit is within 3” of a marker while enemies aren’t, then it’s seized and remains seized even after leaving. Pinned units can’t seize markers and if units from both sides are contesting a marker then it becomes neutral again.",
    ],
  },
  {
    title: "Game Types",
    body: [
      "When playing with mission cards you can pick one of the following two game types:",
      "- Battle of Wits ",
      "- Total Domination",
    ],
  },
];
let battleOfWits = [
  {
    title: "",
    body: [
      "Players compete in completing as many of their own objectives as they can before the end of the game.",
    ],
  },
  { title: "Preparation", body: [""] },
  {
    title: "Mission Decks",
    body: ["Each player gets a deck of 36 mission cards as his own."],
  },
  {
    title: "Objectives",
    body: [
      "Place 6 objective markers. Players roll-off to go first and alternate in placing one marker each outside of deployment zones and over 9” away from each other.",
    ],
  },
  { title: "", body: [""] },
  { title: "Playing the Game", body: [""] },
  {
    title: "Generating Missions",
    body: [
      "At the beginning of each round players draw cards from their deck until they have 3, which are placed face up on the table.",
    ],
  },
  {
    title: "Scoring Cards",
    body: [
      "At the end of each round players check if they have completed at least one condition on any of their cards. If they did, then they must score the one worth most victory points, and discard that card from the game.",
    ],
  },
  {
    title: "Trashing Cards",
    body: [
      "After scoring cards each player may discard one of their remaining cards from the game.",
    ],
  },
  {
    title: "Victory Conditions",
    body: [
      "The game ends after 4 rounds and the player that scored most points wins.",
    ],
  },
];
let totalDomination = [
  {
    title: "",
    body: [
      "Players compete in completing the same set of objectives before the game ends, racing to be the first to complete them.",
    ],
  },
  { title: "Preparation", body: [""] },
  {
    title: "Player Decks",
    body: ["Both players share a single deck of 36 mission cards."],
  },
  {
    title: "Objectives",
    body: [
      "Place 6 objective markers. Players roll-off to go first and alternate in placing one marker each outside of deployment zones and over 9” away from each other.",
    ],
  },
  { title: "Playing the Game", body: [""] },
  {
    title: "Generating Missions",
    body: [
      "At the beginning of each round players draw cards from the deck until there are 3, which are placed face up on the table.",
    ],
  },
  {
    title: "Scoring Cards",
    body: [
      "At the end of each round players check if they have completed at least one condition on any of the cards. If they did, then they must score the one worth most victory points, and discard that card from the game. In case of a tie neither player scores the card.",
    ],
  },
  {
    title: "Trashing Cards",
    body: [
      "At the end of each round the player with the lowest total score may discard one of the remaining cards from the game.",
    ],
  },
  {
    title: "Victory Conditions",
    body: [
      "The game ends after 4 rounds and the player that scored most points wins.",
    ],
  },
];
const Rule = ({ rule }) => {
  return (
    <Container className="my-1 rules" key={rule.title + rule.body[0]}>
      {rule.body.map((b, i) => {
        return (
          <p key={i} className={i === 1 && "italicized"}>
            {i === 0 &&
              rule.title.length > 0 &&
              (rule.body[0] ? (
                <b>
                  <u>
                    {rule.title}
                   
                  </u>
                  {rule.body[0] && ": "}
                </b>
              ) : (
                <h4>{rule.title}</h4>
              ))}
            {b}
          </p>
        );
      })}
    </Container>
  );
};
let urls = {
    aof: "https://drive.google.com/file/d/1QgSEwCp17ujA_vtPhpdoaVS6EY1PSxc7/view?usp=sharing",
    gdf: "https://drive.google.com/file/d/1c16WazdAnIOP2zLqtfzosk3ppGCu7pzf/view?usp=sharing",
  };
function Rules({game, setShowRules}) {
  return (
    <div>
      <Row className="main">
        <Col xs="12" md="6" lg="4">

          <h2 className="rules text-center">General Principles</h2>

          {rules.map((r) => (
            <Rule rule={r} />
          ))}
        </Col>
        <Col xs="12" md="6" lg="4">
          <h2  className="rules text-center" >Battle of Wits</h2>
          {battleOfWits.map((r) => (
            <Rule rule={r} />
          ))}
        </Col>
        <Col  xs="12" md="6" lg="4">
          <h2 className="rules text-center">Total Domination</h2>

          {totalDomination.map((r) => (
            <Rule rule={r} />
          ))}
          <a href={urls[game]} target="_blank" className='rules' rel="noopener noreferrer">See the PDF version from OPR.</a>
          <p><u onClick={() => setShowRules(false)} className="pointer hover-blue">Hide suggested rules.</u></p>
        </Col>
      </Row>
    </div>
  );
}

export default Rules;
