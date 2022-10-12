import React from "react";
import IngredientList from "./IngredientsList";
import Instructions from "./Instructions";
import StarRating from "./StarRating";

function Recipe({ name, ingredients, steps }) {
    return (
        <section id={name.toLowerCase().replace(/ /g, "-")}>
            <h1>{name}</h1>
            <IngredientList list={ingredients} />
            <Instructions title="Cooking Instructions" steps={steps} />
            <StarRating />
        </section>
    );
}

export default Recipe;