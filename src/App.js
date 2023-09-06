import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
const deck = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const shuffleCards = useCallback(() => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns(0);
    const shuffledCards = [...deck, ...deck]
      .sort(() => {
        return Math.random() - 0.5;
      })
      .map((card) => {
        return { ...card, id: Math.random() };
      });
    setCards(shuffledCards);
    // console.log(cards);
    // console.log(1);
  }, []);
  const clickhandler = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
  };
  const resetTurn = () => {
    setDisabled(false);
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns((prev) => {
      return prev + 1;
    });
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevcards) => {
          return prevcards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 700);
      }
    }
  }, [choiceOne, choiceTwo]);
  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button className="btn" onClick={shuffleCards}>
        New Match
      </button>
      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={clickhandler}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disable={isDisabled}
          />
        ))}
      </div>
      {turns && <p>Turns:{turns}</p>}
    </div>
  );
}

export default App;
