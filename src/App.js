import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Cards from "./components/Cards";
import { aofCards, gdfCards } from "./Cards";
let discards = [0];
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
  // const [discards, setDiscards] = useState([0]);
  const [vp, setVP] = useState(0);
  useEffect(() => {
    setShowThree(false);
    setThreeCards([]);
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

  const getRandomCard = (tempCards) => {
    let allowedCards = cardArray.filter(
      (c) => !discards.includes(c.number) && !tempCards.includes(c)
    );
    if (allowedCards.length > 0) {
      let randomIndex = Math.floor(Math.random() * allowedCards.length);
      let randomCard = allowedCards[randomIndex];
      return randomCard;
    } else {
      return false;
    }
  };

  const drawThree = () => {
    discards = [0]
    setShowAllCards(false);

    let tempCards = [];
    for (let i = 0; i < 3; i++) {
      let randomCard = getRandomCard(tempCards);
      if (randomCard) {
        tempCards = [...tempCards, randomCard];
      
      } else {
        return;
      }
    }
    setThreeCards(tempCards);
    setShowThree(true);
  };
  const changeVP = (amount) => {
    amount = parseInt(amount);
    let newAmount = vp + amount;
    if (newAmount < 0) {
      newAmount = 0;
    }
    setVP(newAmount);
  };
  const discard = (number) => {
    let arr = threeCards.filter((c) => c.number !== number);
    // setDiscards([...discards, number]);
    discards = [...discards, number];

    let randomCard = getRandomCard(arr);
    if (randomCard) {
      arr = [...arr, randomCard];
    }
    setThreeCards(arr);
  };
  return (
    <div className={`${game}-background`}>
      <Container className="app">
        <h1 className="text-center p-2 ">OnePageRules Mission Cards</h1>
        <h4 className="text-center p-2">
          Select a game and click the <em>Draw Three</em> button for a fresh
          deck.
        </h4>
        <Row className="pt-4">
          <Col xs="12" md="6" lg="4" xl="3">
            <Form.Select
              value={game}
              onChange={(e) => {
                setGame(e.target.value);
              }}
            >
              {games.map((g) => {
                return (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
        </Row>
        <Row className="">
          <Col xs="12" md="6">
            <Button
              className={`my-2 ${game}-button`}
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
              Draw Three
            </Button>
          </Col>
          <Col className={`${game}-text-gradient`} xs="12" md="6">
            <b
              id={game + "-vp-button-add"}
              className={` ${game}-vp-button vp-button   mx-3 pointer`}
              onClick={() => changeVP(1)}
            >
              +
            </b>
            <b className={`${game}-vp-button`}>{vp} VP</b>
            <b
              id={game + "-vp-button-subtract"}
              className={` ${game}-vp-button  vp-button mx-3 pointer`}
              onClick={() => changeVP(-1)}
            >
              -
            </b>
            <span onClick={() => setVP(0)} className="pointer hover-red">
              Reset
            </span>
          
          </Col>
        </Row>
        {discards.length > 1 && showThree && (
          discards.length > 33 ? (
            <span>{discards.length - 1} discards. 0 remain in the deck.</span>
          ) : (

            <span>
                {discards.length - 1} discards. {34 - discards.length }{" "}
                remain in the deck.
              </span>
                )
            )}

        {showThree && threeCards.length > 0 ? (
          <Cards
            changeVP={changeVP}
            cards={threeCards}
            game={game}
            discard={discard}
          />
        ) : (
          showThree &&
          "You ran out of cards. Click 'Draw Three' to start fresh."
        )}
        {showAllCards && <Cards game={game} cards={cards} />}
      </Container>
    </div>
  );
}

export default App;
