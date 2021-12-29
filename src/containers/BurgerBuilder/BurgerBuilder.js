import React, { Component } from 'react';

import Auxi from '../.././hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIANT_PRICES = {
    bacon: 2,
    salad: 0.5,
    cheese: 0.75,
    meat: 4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 0.5,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIANT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] !== 0) {
            const oldCount = this.state.ingredients[type];
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDetuction = INGREDIANT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDetuction;
            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
            this.updatePurchaseState(updatedIngredients);
        } else return;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinue = () => {
        alert('Order Placed!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Auxi>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaceCancelled={this.purchaseCancelHandler}
                        purchaceContinued={this.purchaseContinue}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disable={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    orderPlaced={this.purchaseHandler} />
            </Auxi>
        );
    }
}

export default BurgerBuilder;
