import React from 'react';
import classes from '../Burger/Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(i=> {
        return [...Array(props.ingredients[i])].map(
            (_,index) => { return <BurgerIngredient key={i + index} type={i}/>})  
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;