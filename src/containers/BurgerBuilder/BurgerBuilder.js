import React, { Component } from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    };
    
    updatePurchaseState = (updatedIngredients) => {
        const ingredients = updatedIngredients;
        const sum = Object.keys(ingredients)
            .map(key=> {
                return ingredients[key];
            })
            .reduce((sum,el) => {
                return sum + el;
            },0);
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHanlder = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        if(this.state.ingredients[type] <= 0)
            return;
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHanlder = () =>{
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kfir Rotaro',
                address: 'Test street 1',
                zipCode: '41351',
                country: 'Israel'
            },
            email: 'test@gmail.com',
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json',order)
        .then(response => {
            console.log(response);
        },error => {
            console.log(error);            
        });        
    }
    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                        purchasedCancel={this.purchaseCancelHandler} 
                        purchaseContinue={this.purchaseContinueHanlder}
                        price={this.state.totalPrice.toFixed(2)}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHanlder}
                    disable={disableInfo}
                    price={this.state.totalPrice.toFixed(2)}
                    ingredientPrices={INGREDIENT_PRICES}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </Auxilary>
        );
    }
}

export default BurgerBuilder;