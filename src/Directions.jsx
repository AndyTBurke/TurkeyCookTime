import React from "react";
import { useEffect } from "react";

export default function Directions(props) {

    const [directions, setDirections] = React.useState("")

    function getDirections() {
        if (props.method === "Oven-Roasted")
        setDirections(`The USDA recommends cooking your turkey to an internal temperature of 165°F.
            Be sure to check the temperature of the deepest part of the breast and thigh.
            ${props.stuffed ? "Make sure your stuffing reaches 165°F as well." : ""}`)
        if (props.method === "Deep-Fried") {
            setDirections(`Never deep-fry a frozen turkey. Always deep-fry outdoors. 
                Do not overfill your cooking vessel with oil. Cook with protective gear 
                to prevent oil burns on skin and in eyes. The USDA recommends cooking your turkey 
                to an internal temperature of 165°F. Be sure to check the temperature of the 
                deepest part of the breast and thigh.`)
        }
        if (props.method === "Air-Fried") {
            setDirections(`Refer to your air fryer's user manual for directions. The USDA recommends 
            cooking your turkey to an internal temperature of 165°F.
            Be sure to check the temperature of the deepest part of 
            the breast and thigh.`)
        }
    }

    useEffect(getDirections)

    return (
        <div className="directions">
            <p>{directions}</p>
            <p className="note">Cook times are approximate, please use a meat thermometer to check that your bird is fully cooked.</p>
        </div>
    )
}