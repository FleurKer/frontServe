import {
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import {
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

const API_URL = "http://192.168.1.11:4000";

export default function PaymentScreen({ navigation }) {
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "eur",
        amount: 50,
      }),
    });
    const { clientSecret } = await response.json();

    return clientSecret;
  };

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails = {
      email: "krissoumah6@gmail.com",
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log("Payment confirmation error", error);
    } else if (paymentIntent) {
      Alert.alert("Paiement", "Votre paiement est validé", [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      console.log("Success from promise", paymentIntent);
      navigation.navigate("recherche");
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Paiement</Text>
      </View>
      <View style={styles.top}>
        <Text style={styles.textTitle1}>
          Veuillez saisir vos coordonnées bancaires pour procéder au paiement
        </Text>

        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
            borderColor: "#2988BC",
            borderWidth: 2,
          }}
          style={styles.card}
          onCardChange={(cardDetails) => {
            console.log("cardDetails", cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log("focusField", focusedField);
          }}
        />
      </View>

      <View style={styles.buttom}>
        <TouchableOpacity
          onPress={handlePayPress}
          style={styles.button}
          activeOpacity={0.8}
          title="Confirmer Paiement"
          disabled={loading}
        >
          <Text style={styles.textButton}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 3,
    flexDirection: "column",
  },
  title: {
    backgroundColor: "#f4eade",
    width: "100%",
    alignItems: "center",
    flex: 0.25,
  },
  textTitle: {
    marginTop: 40,
    fontSize: 40,
    fontWeight: "bold",
    color: "#2988bc",
    width: "80%",
    textAlign: "center",
  },
  textTitle1: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    width: "80%",
    textAlign: "center",
  },
  top: {
    marginTop: 100,
    // width:"80%",
    flex: 0.6,
    // backgroundColor: "red",
  },
  card: {
    width: "100%",
    height: 50,
    marginVertical: 30,
  },
  buttom: {
    width: "100%",
  },

  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    // alignItems: "center",
    borderRadius: 10,
    width: "70%",
    height: "25%",

    borderColor: "#ED8C72",
    borderWidth: 2,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textButton: {
    alignSelf: "center",
    width: "41%",
    height: "80%",

    alignItems: "center",
    fontSize: 25,
  },
});
