import {
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateCityName } from "../reducers/city";
import { updateServiceName} from "../reducers/service";
import { Picker } from "@react-native-picker/picker";

export default function ServicesResearch({ navigation }) {
  const dispatch = useDispatch();

  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [Enable, setEnable] = useState("options");



  const handleGoToSupplier = () => {
    dispatch(updateCityName(city))
    dispatch(updateServiceName(Enable))
    navigation.navigate("Fournisseur");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.motherView}
    >
      <View style={styles.viewtexte}>
        <Text style={styles.texte}>Rechercher</Text>
      </View>
      <View style={styles.signview}>
        <View style={styles.adress}>
          <Text style={styles.adressText}>Où voulez-vous être servi(e) ?</Text>

          <TextInput
            placeholder="Saisir une adresse"
            placeholderTextColor="#2988BC"
            onChangeText={(value) => setAdress(value)}
            value={adress}
            style={styles.adressInput}
          />
          <View style={styles.adressCode}>
            <TextInput
              placeholder="code postal"
              placeholderTextColor="#2988BC"
              onChangeText={(value) => setZipCode(value)}
              value={zipCode} 
              style={styles.adressInputCode}
            />
            <TextInput
              placeholder="commune"
              placeholderTextColor="#2988BC"
              onChangeText={(value) => setCity(value)}
              value={city}
              style={styles.adressInputCode}
            />
          </View>
        </View>

        <View style={styles.pickerOptionView}>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={Enable}
              style={styles.picker}
              mode={"dialog"}
              onValueChange={(itemValue) => setEnable(itemValue)}
            >
              <Picker.Item
                style={styles.pickerItem}
                label="Sélectionner un type de service"
                value="options"
              />
              <Picker.Item label="Cuisine" value="Cuisine" />
              <Picker.Item label="Ménage" value="Ménage" />
              <Picker.Item label="Jardinage" value="Jardinage" />
              <Picker.Item label="Déménagement" value="Déménagement" />
              <Picker.Item label="Transport" value="Transport" />
              <Picker.Item label="babysitting" value="babysitting" />
            </Picker>
          </View>
          <View style={styles.submitView}>
            <TouchableOpacity
              onPress={() => handleGoToSupplier()}
              style={styles.submitButton}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  motherView: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  viewtexte: {
    flex: 0.5,
    backgroundColor: "#f4eade",
    width: "100%",
    alignItems: "center",
  },
  signview: {
    flex: 2.5,
    flexDirection: "column",
    justifyContent: "space-between",
    // backgroundColor:"blue",
  },

  texte: {
    fontWeight: "bold",
    alignSelf: "center",

    marginTop: 40,
    fontSize: 40,
    color: "#2988bc",
    width: "80%",
    textAlign: "center",
  },

  adressInput: {
    width: "75%",
    marginTop: 6,
    borderBottomColor: "#2988bc",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  adressInputCode: {
    width: "40%",
    marginTop: 6,
    marginLeft: 10,
    borderBottomColor: "#2988bc",
    borderBottomWidth: 1,
    fontSize: 16,
    // backgroundColor:"red",
  },

  adress: {
    flex: 2,
    marginTop: 15,
    flexDirection: "column",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
    
    borderColor: "#2988bc",
    borderWidth: 2,
    marginBottom: 10,
    padding: 10,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,

  },

  adressText: {
    fontSize: 20,
  },
  adressCode: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor:"blue",
    width: "90%",
  },
  pickerOptionView: {
    marginTop: 15,
    alignSelf: "center",
    // backgroundColor:"red",
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 4,
    width: "90%",
    alignItems: "center",
  },

  pickerView: {
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    // backgroundColor:"red",
    flex: 3.5,
    width: "100%",
    alignItems: "center",
  },
  picker: {
    width: "100%",
    height: "90%",
  },

  optionButton: {
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
    padding: 10,
  },
  optionSelection: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 25,
    flex: 2,
    width: "90%",
  },
  submitView: {
    marginBottom: 15,
    alignItems: "center",
    width: "100%",
    borderRadius: 5,
    flex: 1.5,
    padding: 10,
    elevation: 2,
    // backgroundColor: "yellow",
  },

  submitButton: {
    marginBottom: 15,
    alignItems: "center",
    width: "50%",
    borderRadius: 5,
    padding: 10,

    // borderColor: "#2988bc",
    // borderWidth: 2,
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
    fontWeight:"bold",
    alignItems: "center",
  },
});
