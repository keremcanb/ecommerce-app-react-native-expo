import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Button,
  Platform,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Loader from '../../components/UI/Loader';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const products = useSelector((state) => state.products.allProducts);

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);
    // Cleanup
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      // Forward id and title
      productId: id,
      productTitle: title
    });
  };

  return !error ? (
    !isLoading ? (
      !(!isLoading && products.length === 0) ? (
        <FlatList
          onRefresh={loadProducts}
          refreshing={isRefreshing}
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ProductItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            >
              <Button
                title="View Details"
                color={Colors.primary}
                onPress={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
                }}
              />
              <Button
                title="Add to Cart"
                color={Colors.primary}
                onPress={() => {
                  dispatch(addToCart(itemData.item));
                }}
              />
            </ProductItem>
          )}
        />
      ) : (
        <View style={styles.centered}>
          <Text>No products found</Text>
        </View>
      )
    ) : (
      <Loader />
    )
  ) : (
    <View style={styles.centered}>
      <Text>An error occurred</Text>
      <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'My Shop',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductsOverviewScreen;
