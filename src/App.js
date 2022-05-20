import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Cards from "./components/Cards";
import { aofCards, gdfCards } from "./Cards";
import ClaimedMission from "./components/ClaimedMission";
import Swal from "sweetalert2";
import Rules from "./components/Rules";

// let discards = [0];

function App() {
  const games = [
    { id: "gdf", name: "Grimdark Future" },
    { id: "aof", name: "Age of Fantasy" },
  ];
  const [game, setGame] = useState("gdf");
  const [showAllCards, setShowAllCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [threeCards, setThreeCards] = useState([]);
  const [showThree, setShowThree] = useState(false);
  const [cardArray, setCardArray] = useState(gdfCards);
  const [claimedMissions, setClaimedMissions] = useState([]);
  const [objectiveMarkers, setObjectiveMarkers] = useState(6);
  const [discards, setDiscards] = useState([0]);
  const [round, setRound] = useState(1);
  const [objHint, setShowObjHint] = useState(false);
  const [showRules, setShowRules] = useState(false);

  // const [discards, setDiscards] = useState([0]);
  const [vp, setVP] = useState(0);
  useEffect(() => {
    setShowThree(false);
    setThreeCards([]);
    setClaimedMissions([]);
    setVP(0);
    let selectedGame = games.find((g) => g.id === game);
    if (selectedGame.id === "aof") {
      setCards(aofCards);
      setCardArray(aofCards);
    } else {
      setCards(gdfCards);
      setCardArray(gdfCards);
    }
    setShowAllCards(true);
  }, [game]);
  useEffect(() => {
    if (cardArray.length > 0 && objectiveMarkers && threeCards.length < 1) {
      discardObjMarkers();
    } else if (
      cardArray.length > 0 &&
      objectiveMarkers &&
      threeCards.length > 1
    ) {
      drawThree();
    }
  }, [objectiveMarkers]);

  const getRandomCard = (tempCards, tempDiscards) => {
    let discarded = [...tempDiscards];

    let allowedCards = cardArray.filter(
      (c) => !discarded.includes(c.number) && !tempCards.includes(c)
    );
    if (allowedCards.length > 0) {
      let randomIndex = Math.floor(Math.random() * allowedCards.length);
      let randomCard = allowedCards[randomIndex];
      return randomCard;
    } else {
      return false;
    }
  };
  const discardObjMarkers = () => {
    // discards = [0]
    let endArr = [0];
    let unusedObjectives = [1, 2, 3, 4, 5, 6];

    unusedObjectives = unusedObjectives.slice(objectiveMarkers);

    console.log(unusedObjectives);
    let discardedObj = cardArray.filter((c) => {
      return unusedObjectives.some((u) => c.objectiveMarkers.includes(u));
      // return true;
    });

    let discardNums = discardedObj.map((d) => d.number);
    console.log("discardNums", discardNums);
    endArr = [...endArr, ...discardNums];
    setDiscards(endArr);
    return endArr;
  };
  console.log("discards", discards);

  const drawThree = () => {
    discardObjMarkers();
    if (threeCards.length > 0 && showAllCards) {
      setShowThree(true);
      setShowAllCards(false);
      return;
    }
    // setDiscards([0])
    setShowAllCards(false);
    setVP(0);
    setRound(1);
    setClaimedMissions([]);

    let tempCards = [];
    let tempDiscards = discardObjMarkers();
    for (let i = 0; i < 3; i++) {
      let randomCard = getRandomCard(tempCards, tempDiscards);
      if (randomCard) {
        tempCards = [...tempCards, randomCard];
      } else {
        return;
      }
    }
    setThreeCards(tempCards);
    setShowThree(true);
    Swal.fire({
      icon: "success",
      title: "New Game Started",
      timer: 1000,
      showConfirmButton: false,
    });
  };
  const changeVP = (amount) => {
    amount = parseInt(amount);
    let newAmount = vp + amount;
    if (newAmount < 0) {
      newAmount = 0;
    }
    setVP(newAmount);
  };
  const changeRound = (amount) => {
    amount = parseInt(amount);
    let newAmount = round + amount;
    if (newAmount < 1) {
      newAmount = 1;
    }
    setRound(newAmount);
  };
  const discard = (number) => {
    // let arr = threeCards.filter((c) => c.number !== number);
    let arr = [...threeCards];
    let index = threeCards.findIndex((c) => c.number === number);

    setDiscards([...discards, number]);
    // let discarded = [...discards, number];

    let randomCard = getRandomCard(arr, [...discards, number]);
    if (randomCard) {
      arr.splice(index, 1, randomCard);
    } else {
      // arr = [...arr, randomCard];
      arr.splice(index, 1);
    }
    setThreeCards(arr);
  };
  const unClaim = (mission) => {
    let newArr = [...claimedMissions];

    newArr = claimedMissions.filter((cm) => cm.desc !== mission.desc);

    setClaimedMissions(newArr);
    let newVP = vp - mission.vp;
    setVP(newVP);
  };
  return (
    <div className={`${game}-background`}>
      <Container className="app">
        <main>
          <h1 className="text-center p-2 ">OnePageRules Mission Cards</h1>
          <h4 className="text-center p-2">
            Select a game and click the <em>Draw Three </em> button for a fresh
            deck.
          </h4>
          <Row className=" d-flex align-items-end">
            <Col xs="12" md="6" lg="4" xl="3">
              <Form.Select
                value={game}
                onChange={(e) => {
                  setGame(e.target.value);
                }}
                className="pointer"
              >
                {games.map((g) => {
                  return (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>{" "}
            <Col
              xs="12"
              md="6"
              lg="3"
              xl="3"
              className="mt-2 "
              onMouseEnter={() => setShowObjHint(true)}
              onMouseLeave={() => setShowObjHint(false)}
            >
              <span>Objective Markers:</span>{" "}
              <Form.Select
                value={objectiveMarkers}
                onChange={(e) => {
                  setObjectiveMarkers(e.target.value);
                }}
                className="pointer"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </Form.Select>
            </Col>
            <Col>
              {objHint && (
                <span>
                  Select how many objective markers you are using to filter out
                  unnecessary cards. <b>Changing this will start a new game.</b>
                </span>
              )}
            </Col>
          </Row>
          <hr />
          <Row className="">
            <Col xs="12" md="6">
              <Button
                className={`m-2 ${game}-button`}
                onClick={() => {
                  setShowThree(false);
                  setShowAllCards(!showAllCards);
                }}
              >
                {showAllCards ? "HIDE ALL CARDS" : "SHOW ALL CARDS"}
              </Button>
              <Button
                className={`m-2 ${game}-button`}
                onClick={() => drawThree()}
              >
                {showAllCards && threeCards.length > 0
                  ? "Back to my hand"
                  : "Draw Three / New Game"}
                {/* Draw Three */}
              </Button>
            </Col>
            <Col className=" d-flex justify-content-end align-items-end">
              <u
                onClick={() => setShowRules(!showRules)}
                className="pointer hover-blue"
              >
                {" "}
                {showRules ? "Hide " : "See "} suggested rules.
              </u>
            </Col>
          </Row>
          {showRules && <Rules game={game} setShowRules={setShowRules} />}
          {showThree && (
            <Row
              className={`
          sticky ${game}-trackers`}
            >
              <Col
                className={` d-flex justify-content-center align-items-end `}
                xs="12"
                lg="6"
              >
                <b
                  id={game + "-vp-button-subtract"}
                  className={` ${game}-round-button  vp-button mx-3 pointer`}
                  onClick={() => changeRound(-1)}
                >
                  -
                </b>
                <b className={`${game}-round-button`}>Round {round}</b>
                <b
                  id={game + "-vp-button-add"}
                  className={` ${game}-round-button vp-button   mx-3 pointer`}
                  onClick={() => changeRound(1)}
                >
                  +
                </b>
                <span
                  onClick={() => setRound(1)}
                  className="pointer hover-red "
                >
                  Reset
                </span>
              </Col>
              <Col
                className={` d-flex justify-content-center align-items-end`}
                xs="12"
                lg="6"
              >
                <b
                  id={game + "-vp-button-subtract"}
                  className={` ${game}-vp-button  vp-button mx-3 pointer`}
                  onClick={() => changeVP(-1)}
                >
                  -
                </b>
                <b className={`${game}-vp-button`}>{vp} VP</b>
                <b
                  id={game + "-vp-button-add"}
                  className={` ${game}-vp-button vp-button   mx-3 pointer`}
                  onClick={() => changeVP(1)}
                >
                  +
                </b>

                <span onClick={() => setVP(0)} className="pointer hover-red">
                  Reset
                </span>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              {discards.length > 1 &&
                showThree &&
                (discards.length > 33 ? (
                  <span>
                    {discards.length - 1} discards. 0 remain in the deck.
                  </span>
                ) : (
                  <span>
                    {discards.length - 1} discards. {34 - discards.length}{" "}
                    remain in the deck.
                  </span>
                ))}
            </Col>
          </Row>
          {showThree && threeCards.length > 0 ? (
            <>
              <Cards
                changeVP={changeVP}
                cards={threeCards}
                game={game}
                discard={discard}
                claimedMissions={claimedMissions}
                round={round}
                setClaimedMissions={setClaimedMissions}
              />
              {claimedMissions.length > 0 && (
                <Container className="bg-light rounded-3 p-3">
                  <h4 className="text-dark">
                    <u>Claimed Objectives</u>
                  </h4>
                  {claimedMissions.length > 0 &&
                    claimedMissions.map((cm, i) => {
                      return (
                        <ClaimedMission
                          key={cm.desc + i}
                          mission={cm}
                          unClaim={unClaim}
                          game={game}
                        />
                      );
                    })}
                </Container>
              )}
            </>
          ) : (
            showThree &&
            "You ran out of cards. Click 'Draw Three' to start fresh."
          )}
          {showAllCards && <Cards game={game} cards={cards} />}
        </main>
        <footer
          className={`${game === "gdf" && "text-secondary "}   text-center`}
        >
          <h6>
            Created by{" "}
            <a
              href="https://github.com/dpouls"
              target="_blank"
              rel="noreferrer"
            >
              dpouls
            </a>
            .{" "}
          </h6>
          <h6 className="m-0">
            <span>
              If you like 3D printing, check out my other site{" "}
              <a
                href="http://stlbundles.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                STLBundles.com
              </a>{" "}
              to keep up with all of the STL subscription releases.
            </span>
          </h6>
        </footer>
      </Container>
    </div>
  );
}

export default App;
