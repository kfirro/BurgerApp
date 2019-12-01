import React from 'react';
import Auxilary from '../../../hoc/Auxilary';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((key) => {
            return <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
                </li>
        });

    return (
    <Auxilary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientsSummary}
        </ul>
        <p>Continue to Checkout?</p>
    </Auxilary>
    );
};

export default orderSummary;