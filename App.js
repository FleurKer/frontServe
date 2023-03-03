import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { StripeProvider } from "@stripe/stripe-react-native";
import user from "./reducers/user";
import SignIn from "./screens/SignIn";
import ServicesResearch from "./screens/ServicesResearch";
import SupplierSelection from "./screens/SupplierSelection";
import SupplierMessage from "./screens/SupplierMessage";
import SupplierProfile from "./screens/SupplierProfile";
import PaymentScreen from "./screens/Payment";
import MyProfile from "./screens/MyProfile";
import Home from "./screens/Home";
import Messaging from "./screens/Messaging";
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import service from './reducers/service';
import city from './reducers/city';
import chatroom from './reducers/chatroom';
import supplier from './reducers/supplier';

const reducers = combineReducers({ user, chatroom,supplier,city, service,});
const persistConfig = { key: 'applicationName', storage: AsyncStorage, };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });

 const persistor = persistStore(store);

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

             if (route.name === "recherche") {
              iconName = "search";
            } else if (route.name === "mon profil") {
              iconName = "user";
            } else if (route.name === "Messagerie") {
              iconName = "comments";
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#e8be4b",
          tabBarInactiveTintColor: "#b2b2b2",
          headerShown: false,
        })}
      >
        <Tab.Screen name="recherche" component={ServicesResearch} />
        <Tab.Screen name="mon profil" component={MyProfile} />
        <Tab.Screen name="Messagerie" component={Messaging} />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51Lxn2QCjL57TXwNNZNFt97W6QDFLp5zVWlSRRm0aBhRqdO1NdKz7EkvompVkdgEbdbLYzxXGjjMwfyYtDFN0u1Fo00maCywYng">
      <PersistGate persistor={persistor}>


      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          {/* <Stack.Screen name="recherche" component={ServicesResearch} /> */}
          <Stack.Screen name="Fournisseur" component={SupplierSelection} />
          <Stack.Screen name="SupplierProfile" component={SupplierProfile} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="SupplierMessage" component={SupplierMessage} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </StripeProvider>

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
