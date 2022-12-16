import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
import ShitRain from './components/ShitRain'


const cardImages = [
  { "src": "/img/image-1.png", matched: false },
  { "src": "/img/image-2.png", matched: false },
  { "src": "/img/image-3.png", matched: false },
  { "src": "/img/image-4.png", matched: false },
  { "src": "/img/image-5.png", matched: false },
  { "src": "/img/image-6.png", matched: false },
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [hits, setHits] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  
  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setHits(0)
  }
  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
        setHits(prevHits => prevHits + 1)
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const win = () => {
    if(hits === 6) {
    return(
      <ShitRain />
    )
  }else{
    <></>
  }
  }
  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  //start a new game automagically
  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Bitcoin Memory</h1>
      <button onClick={shuffleCards}>Neues Spiel</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped ={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
        {win()}
        <p>Versuche: {turns}</p>
      
    </div>
  );
}

export default App;