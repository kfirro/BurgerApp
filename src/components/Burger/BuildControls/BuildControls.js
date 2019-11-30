import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price}$</strong></p>
        {controls.map(c => (
            <BuildControl
                key={c.label}
                label={`${c.label} (${props.ingredientPrices[c.type].toFixed(2)}$)`}
                added={() => props.ingredientAdded(c.type)}
                removed={() => props.ingredientRemoved(c.type)}
                disabled={props.disable[c.type]}
            />
        ))}
        <button className={classes.OrderButton} disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
);

export default buildControls;