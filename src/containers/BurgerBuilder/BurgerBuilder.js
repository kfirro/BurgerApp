import React, { Component } from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};


class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };
    componentDidMount() {
        axios.get('https://react-app-burgerr.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            }).catch(err => {
                this.setState({error: err});
            });
    }
    updatePurchaseState = (updatedIngredients) => {
        const ingredients = updatedIngredients;
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchaseable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHanlder = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        if (this.state.ingredients[type] <= 0)
            return;
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHanlder = () => {
        this.setState({ loading: true });
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
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            }, error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false });
            });
    }
    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.state.ingredients) {
            burger =
                (
                    <Auxilary>
                        <Burger ingredients={this.state.ingredients} />
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
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                purchasedCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHanlder}
                price={this.state.totalPrice.toFixed(2)} />;
        }
        if (this.state.loading)
            orderSummary = <Spinner />;
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
}

export default withErrorHanlder(BurgerBuilder, axios);