import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Cards from "./components/Cards";
import { aofCards } from "./Cards";
function App() {
  const games = [
    { id: "gdf", name: "Grimdark Future" },
    { id: "aof", name: "Age of Fantasy" },
  ];
  const [game, setGame] = useState("aof");
  const [showAllCards, setShowAllCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [threeCards, setThreeCards] = useState([])
  useEffect(() => {
    // console.log("check");
    let selectedGame = games.find((g) => g.id === game);
    if (selectedGame.id === "aof" && showAllCards ) {
      setCards(aofCards);
    } else {
      setCards([]);
    }
  }, [game, showAllCards]);
  const drawThree = () => {
  
    let tempCards = []
    // if(game === 'aof'){
      let arr = [...aofCards]
      const getRandomCard = () => {
        console.log('randomCard()')

        let randomIndex = Math.floor(Math.random() * arr.length)
        tempCards = [...tempCards, arr[randomIndex]]
        arr = arr.filter(a => a.number !== arr[randomIndex].number)
        // let check = tempCards.find(tc => tc.number === aofCards[randomIndex].number)
        // // console.log('check', check)
        // // console.log('test', [...new Set(aofCards)])
        // if(!check?.number){
        //   // console.log('true', aofCards[randomIndex])
        //   console.log('returning', aofCards[randomIndex])
        //   return aofCards[randomIndex]
        // } else {
        //   console.log('else', tempCards, aofCards[randomIndex])
        //   getRandomCard()
          
        //   // return false
        // }
        // console.log('random card', randomIndex)
      }

    // }
    for(let i = 0; i < 3; i++){
       getRandomCard()
      // if(card){

      //   tempCards = [...tempCards, card]
      // }
    }
    console.log(tempCards)
    setThreeCards(tempCards)
  }
  return (
    <Container>
      <Button className="m-2" onClick={() => setShowAllCards(!showAllCards)}>
        {showAllCards ? "Hide all cards" : "Show all Cards"}
      </Button>
      <Button onClick={() => drawThree()}>Draw Three</Button>
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
        {threeCards.length > 0 && (
          <Cards cards={threeCards} />
        )}
      <Cards cards={cards} />
    </Container>
  );
}

export default App;
