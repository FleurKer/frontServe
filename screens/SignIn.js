import {
  StyleSheet,
  Modal,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { updateFirstName, updateToken } from "../reducers/user";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPw, setSignInPw] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpNumber, setSignUpNumber] = useState("");
  const [signUpPw, setSignUpPw] = useState("");

  const handleSubmitSignIn = () => {
    fetch("http://192.168.1.11:4000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPw,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("front", data);
        if (data) {
          setModalVisible(false);
          dispatch(updateFirstName(data.firstName));
          dispatch(updateToken(data.token));

          navigation.navigate("TabNavigator");
        }
      });
  };

  const handleSubmitSignUp = () => {
    fetch("http://192.168.1.11:4000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: signUpName,
        prenom: signUpFirstName,
        email: signUpEmail,
        phone: signUpNumber,
        password: signUpPw,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          dispatch(updateFirstName(data.firstName));
          dispatch(updateToken(data.token));
          setModalVisible(false);
          navigation.navigate("TabNavigator");
        }
      });
  };

  const handleSignUp = (e) => {
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.motherView}
    >
      <View style={styles.viewtexte}>
        <Text style={styles.texte}>Connexion</Text>
      </View>
      <View style={styles.signview}>
        <View style={styles.signInView}>
          <View style={styles.manuelSignInView}>
            <View style={styles.manuelSignIn}>
              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#2988BC"
                onChangeText={(value) => setSignInEmail(value)}
                value={signInEmail}
                style={styles.input}
              />
              <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#2988BC"
                onChangeText={(value) => setSignInPw(value)}
                value={signInPw}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => handleSubmitSignIn()}
                style={styles.button}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.signUpView}>
          <TouchableOpacity
            onPress={() => handleSignUp()}
            style={styles.signUpButton}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Pas encore membre ?</Text>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.modalViewSignUp}
                >
                  <View style={styles.closeView}>
                    <View style={styles.emptyView}></View>
                    <TouchableOpacity
                      style={styles.closebutton}
                      activeOpacity={0.8}
                    >
                      <FontAwesome
                        onPress={() => setModalVisible(false)}
                        name="close"
                        size={25}
                        color="#2988BC"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.manuelSignUpView}>
                    <TextInput
                      placeholder="Nom:"
                      placeholderTextColor="#2988BC"
                      onChangeText={(value) => setSignUpName(value)}
                      value={signUpName}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Prénom:"
                      placeholderTextColor="#2988BC"
                      onChangeText={(value) => setSignUpFirstName(value)}
                      value={signUpFirstName}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="E-mail:"
                      placeholderTextColor="#2988BC"
                      onChangeText={(value) => setSignUpEmail(value)}
                      value={signUpEmail}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="N° de tél:"
                      placeholderTextColor="#2988BC"
                      onChangeText={(value) => setSignUpNumber(value)}
                      value={signUpNumber}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Mot de passe"
                      placeholderTextColor="#2988BC"
                      onChangeText={(value) => setSignUpPw(value)}
                      value={signUpPw}
                      style={styles.input}
                    />

                    <TouchableOpacity
                      onPress={() => handleSubmitSignUp()}
                      style={styles.button}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.textButton}>S'enregistrer</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  // Page Principale Connexion
  motherView: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  viewtexte: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f4eade",
    width: "100%",
    alignItems: "center",
  },
  signview: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
  },

  texte: {
    marginTop: 40,
    fontSize: 40,
    fontWeight: "bold",
    color: "#2988bc",
    // borderBottomWidth: 4,
    // borderBottomColor: "#ed8c72",
    width: "80%",
    textAlign: "center",
  },

  ouText: {
    alignSelf: "center",
  },

  signInView: {
    margin: 10,
    height: "60%",
  },
  signUpView: {
    margin: 10,
    height: "20%",
  },

  signUpButton: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "80%",
    height: "35%",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ED8C72",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  // Page Modal s'enregistrer'

  centeredView: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    backgroundColor: "#f4eade",
    borderRadius: 20,
    height: "50%",
    width: "75%",
    padding: 15,
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
  modalViewSignUp: {
    backgroundColor: "#f4eade",

    borderRadius: 20,
    height: "50%",
    width: "75%",
    padding: 15,
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
  closeView: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: "75%",
    marginTop: 6,
    borderBottomColor: "#2988bc",
    borderBottomWidth: 1,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  emptyView: {
    width: "2%",
  },

  manuelSignInView: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 25,
    flex: 3,
    width: "90%",
  },
  manuelSignIn: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 85,
    // flex: 3,
    width: "90%",
  },
  manuelSignUpView: {
    alignItems: "center",
    marginTop: 15,
    flex: 3,
    width: "90%",
  },

  button: {
    marginTop: 15,
    alignItems: "center",
    width: "60%",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#ED8C72",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  textButton: {
    color: "black",
    fontWeight: "bold",
    alignItems: "center",
  },
});
