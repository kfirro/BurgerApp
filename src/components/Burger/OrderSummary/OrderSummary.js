import React, { Component } from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map((key) => {
            return <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}</span>: {this.props.ingredients[key]}
            </li>
        });
        return (
            <Auxilary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}$</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchasedCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxilary>
        );
    }
};

export default OrderSummary;