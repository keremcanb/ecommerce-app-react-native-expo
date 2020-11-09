/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Loader from '../../components/UI/Loader';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotal = useSelector((state) => state.cart.totalAmount);

  const cartItems = useSelector((state) => {
    const cartItemsArray = [];
    // Convert item is cart to array
    for (const key in state.cart.items) {
      cartItemsArray.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    // Not clear
    return cartItemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  const dispatch = useDispatch();

  const sendOrderHandler = () => {
    setIsLoading(true);
    dispatch(addOrder(cartItems, cartTotal));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotal.toFixed(2) * 100) / 100}
          </Text>
        </Text>

        {!isLoading ? (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        ) : (
          <Loader />
        )}
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            deleteHandler={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Cart'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CartScreen;
