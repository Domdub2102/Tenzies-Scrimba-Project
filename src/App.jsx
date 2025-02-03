import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Die from "./Die"

export default function App() {

  const [dice, setDice] = useState(generateAllNewDice)

  function generateAllNewDice() {
    // Math.random: random number between 0 and 1
    // Math.floor: rounds down to nearest integer
    let newDice = []
    for(let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6)
      newDice.push({id: i, value: randomNumber, isHeld: false})
    }
    return newDice
  }

  function rollDice() { 
    // setDice, mapping through old array and checking if the dice are held
    // only gives a new value to those dice which are not currently held
    gameWon ? 
      setDice(generateAllNewDice()) :
      setDice(prevDice => 
        prevDice.map(die => 
          die.isHeld ? 
          die :
          {...die, value: Math.ceil(Math.random() * 6)}
        )
      )
  }

  function holdDice(id) {
    // sets the dice array state by changing the prevDice array using an arrow function
    // maps through the old array, finding the die with the id we have selected and toggling
    // the die.isHeld value, whilst using a ... operator to ensure everything else remains the same
    // if not the selected id, then simply return the die as before.
    setDice(prevDice =>
      prevDice.map(die =>
        die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die
      )
    )
   console.log(id)
  }

  // from tsparticles confetti - firework effect
  function loadConfettiEffect() {
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  // checks to see if all items are held and that all values are the same
  // runs every time the dice array changes 
  useEffect(() => {
    if (gameWon) {
      loadConfettiEffect()
      console.log("You won")
    }
  }, dice)

  const diceElements = dice.map(die => 
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  )

  return (
    <main className="main">
      <div className="dice_container">
        {diceElements}
      </div>
      <button className="roll_button" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}