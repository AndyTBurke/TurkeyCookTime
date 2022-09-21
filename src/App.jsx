import { useState } from 'react'

function App() {

  const defaultState = {
    method: "Oven-Roasted",
    stuffed: false,
    weight: 10
  }

  const [turkeyParameters, setTurkeyParameters] = useState(defaultState)

  const cookingMethods = ["Oven-Roasted", "Deep-Fried", "Air-Fried"]
  const cookingMethodsOptions = cookingMethods.map(method => <option key={method} value={method}>{method}</option>)

  const weightOptions = new Array(21).fill(0).map((weight, weightIndex) => weightIndex + 4)
    .map(weight => <option key={weight} value={weight}>{weight}</option>)

  function setMethod(newMethod) {
    setTurkeyParameters((prevState) => ({
      ...prevState,
      method: newMethod
    }))
  }

  function setWeight(newWeight) {
    setTurkeyParameters((prevState) => ({
      ...prevState,
      weight: newWeight
    }))
  }

  return (
    <div className="App">
      <select onChange={(event) => setMethod(event.target.value)} value={turkeyParameters.method}>
        {cookingMethodsOptions}
      </select>
      <select onChange={(event) => setWeight(event.target.value)} value={turkeyParameters.weight}>
        {weightOptions}
      </select>
    </div>
  )
}

export default App
