import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Text,
  TextInput,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';
import { signUp, signIn } from '../../store/actions/auth';

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = signUp(email, password);
    } else {
      action = signIn(email, password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <View style={styles.formControl}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                secureTextEntry
                textContentType="password"
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={styles.buttonContainer}>
              {!isLoading ? (
                <Button
                  title={isSignUp ? 'Sign Up' : 'Sign In'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              ) : (
                <Loader />
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? 'Sign In' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
