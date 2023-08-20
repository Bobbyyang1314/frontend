import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,LogBox } from 'react-native';
import React from 'react';
import { NativeBaseProvider } from "native-base";
import Toast from "react-native-toast-message";

// Navigators
import Main from './Navigators/Main'

// Screens
import ProductContainer from './Screens/Products/ProductContainer';
import Header from "./Shared/Header";

import { NavigationContainer } from "@react-navigation/native";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// ContextAPI
import Auth from "./Context/store/Auth";

LogBox.ignoreAllLogs(true);

export default function App() {
    return (
        <Auth>
            <NativeBaseProvider>
                <Provider store={store}>
                    <NavigationContainer>
                        {/*<Header/>*/}
                        {/*<ProductContainer/>*/}
                        <Main/>
                        <Toast ref={(ref) => Toast.setRef(ref)}/>
                    </NavigationContainer>
                </Provider>
            </NativeBaseProvider>
        </Auth>
    );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
