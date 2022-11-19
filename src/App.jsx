import { useState } from 'react'
import Directions from './Directions'

function App() {

  const defaultState = {
    method: "Oven-Roasted",
    stuffed: false,
    frozen: false,
    weight: 12,
    cookTime: setCookTime("Oven-Roasted", false, false, 12, "Whole"),
    prep: "Whole"
  }

  const [turkeyParameters, setTurkeyParameters] = useState(defaultState)

  const cookingMethods = ["Oven-Roasted", "Deep-Fried", "Air-Fried"]
  const cookingMethodsOptions = cookingMethods.map(method => <option key={method} value={method}>{method}</option>)

  const weightOptions = new Array(17).fill(0).map((weight, weightIndex) => weightIndex + 8)
    .map(weight => <option key={weight} value={weight}>{weight} lbs.</option>)

  function setMethod(newMethod) {
    setTurkeyParameters((prevState) => ({
      ...prevState,
      method: newMethod,
      cookTime: setCookTime(newMethod, prevState.stuffed, prevState.frozen, prevState.weight, prevState.prep),
      prep: newMethod !== "Oven-Roasted" ? "Whole" : prevState.prep,
      stuffed: newMethod !== "Oven-Roasted" ? false : prevState.stuffed,
      frozen: newMethod !== "Oven-Roasted" ? false : prevState.frozen
    }))
  }

  function setWeight(newWeight) {
    setTurkeyParameters((prevState) => ({
      ...prevState,
      weight: newWeight,
      cookTime: setCookTime(prevState.method, prevState.stuffed, prevState.frozen, newWeight, prevState.prep)
    }))
  }

  function setStuffed(isStuffed) {
    const stuffedBool = isStuffed === "true" ? true : false
    setTurkeyParameters((prevState) => ({
      ...prevState,
      stuffed: stuffedBool,
      cookTime: setCookTime(prevState.method, stuffedBool, prevState.frozen, prevState.weight, prevState.prep)
    }))
  }

  function setFrozen(isFrozen) {
    const frozenBool = isFrozen === "true" ? true : false
    setTurkeyParameters((prevState) => ({
      ...prevState,
      frozen: frozenBool,
      cookTime: setCookTime(prevState.method, prevState.stuffed, frozenBool, prevState.weight, prevState.prep)
    }))
  }

  function setPrep(prepType) {
    setTurkeyParameters((prevState) => ({
      ...prevState,
      prep: prepType,
      cookTime: setCookTime(prevState.method, prevState.stuffed, prevState.frozen, prevState.weight, prepType),
      stuffed: prepType !== "Whole" ? false : prevState.stuffed
    }))
  }

  function setCookTime(method, stuffed, frozen, weight, prep) {
    if (method === "Oven-Roasted") {
      let newCookTime = (1/1.5) * weight ** (2/3)
      if (frozen) {newCookTime = newCookTime * 1.5}
      if (stuffed) {newCookTime += .5}
      if (prep === "Spatchcocked") {newCookTime =  newCookTime * .6}
      if (prep === "Deconstructed") {newCookTime =  newCookTime * .5}
      return newCookTime
    }
    if (method === "Deep-Fried") {
      return weight * .06
    }
    if (method === "Air-Fried") {
      return weight * (1/6)
    }
  }

  return (
    <div className="App">
      <h1 className='title'>How long will my turkey take to cook? 🦃 </h1>
      <label htmlFor="turkey-weight">How much does your turkey weigh?</label>
      <select
        id="turkey-weight" 
        onChange={(event) => setWeight(event.target.value)} 
        value={turkeyParameters.weight}>
        {weightOptions}
      </select>
      <label htmlFor="cook-method">How will you be cooking your turkey?</label>
      <select 
        id="cook-method" 
        onChange={(event) => setMethod(event.target.value)} 
        value={turkeyParameters.method}>
        {cookingMethodsOptions}
      </select>
      <label htmlFor="turkey-prep">Roasted whole, spatchcocked, or fully deconstructed?</label>
      <select
        className={turkeyParameters.method !== "Oven-Roasted" ? "disabled" : ""}
        id="turkey-prep"
        onChange={(event) => setPrep(event.target.value)} 
        value={turkeyParameters.prep}
      >
        <option value={"Whole"}>Whole</option>
        <option value={"Spatchcocked"}>Spatchcocked</option>
        <option value={"Deconstructed"}>Fully deconstructed</option>
      </select>
      <label htmlFor="turkey-stuffed">Will your turkey be stuffed?</label>
      <select
        className={turkeyParameters.method !== "Oven-Roasted" || turkeyParameters.prep !== "Whole" ? "disabled" : ""}
        id="turkey-stuffed" 
        onChange={(event) => setStuffed(event.target.value)} 
        value={turkeyParameters.stuffed}
      >
        <option value={true}>Stuffed</option>
        <option value={false}>Not stuffed</option>
      </select>
      <label htmlFor="turkey-frozen">Will your turkey be frozen when cooked?</label>
      <select
        className={turkeyParameters.method !== "Oven-Roasted" ? "disabled" : ""}
        id="turkey-frozen" 
        onChange={(event) => setFrozen(event.target.value)} 
        value={turkeyParameters.frozen}>
        <option value={true}>Frozen</option>
        <option value={false}>Not frozen</option>
      </select>
      <h3>Approximate cook time{turkeyParameters.method === "Oven-Roasted" ? " at 350°F" : ""}:</h3>
      <h2 className='cook-time'>{Math.floor(turkeyParameters.cookTime)} Hours and {Math.floor((turkeyParameters.cookTime * 60) % 60)} Minutes</h2>
      <Directions 
        method={turkeyParameters.method}
        stuffed={turkeyParameters.stuffed}
      />
    </div>
  )
}

export default App
