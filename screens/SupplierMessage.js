import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import socket from "../utils/socket";
import React, { useEffect, useState } from "react";

export default function SupplierMessage({ navigation }) {
  const chatroomID = useSelector((state) => state.chatroom.value);
  const supplierName = useSelector((state) => state.supplier.value);
  console.log("supplierName", supplierName.name);

  console.log("chatroomID", chatroomID.chatroomId);
  // console.log("chatroomID ", chatroomID )
  const [supplierFistname, setSupplierFistname] = useState("");
  const [supplierLastname, setSupplierLastname] = useState("");

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    //     fetch(`http://192.168.43.225:4000/chatroom/chatroom/${chatroomID.chatroomId}`)
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log("data", data.supplier)
    // // console.log("data prenom", data.bdata.supplier.prenom)
    //   setSupplierFistname(data.bdata.supplier.prenom)
    //   setSupplierLastname(data.bdata.supplier.nom)

    //     })

    fetch("http://192.168.1.11:4000/messages/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatroom: chatroomID.chatroomId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setChatMessages(data.bdata);
      });
  }, []);

  const handleNewMessage = () => {
    const chatroomI = chatroomID.chatroomId;
    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;
    const date =
      new Date().getDate() < 10
        ? `0${new Date().getDate()}`
        : `${new Date().getDate()}`;
    const month =
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : `${new Date().getMonth() + 1}`;
    const year =
      new Date().getYear() - 100 < 10
        ? `0${new Date().getYear() - 100}`
        : `${new Date().getYear() - 100}`;

    socket.emit("newMessage", {
      message,
      timestamp: { mins, hour, date, month, year },
      chatroom: chatroomI,
    });
    setMessage([]);
  };

  const SupplierMessage = chatMessages.map((data, i) => {
    return (
      <View key={i} style={styles.messagesContainer}>
        <View style={styles.messageSuplier}>
          <Text style={styles.helloClient}>{data.message} </Text>
          <Text style={styles.date}>
            envoyé à {data.time} le {data.date}{" "}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.motherView}
    >
      <View style={styles.viewtexte}>
        <TouchableOpacity
          style={styles.arrowIcon}
          onPress={() => navigation.navigate("Messagerie")}
          activeOpacity={0.8}
        >
          <FontAwesome name="arrow-left" size={20} color="#2988bc" />
        </TouchableOpacity>

        <Text style={styles.texte}>{supplierName.name}</Text>
      </View>

      <View style={styles.container}>
        <SafeAreaView style={styles.SafeAreaView}>
          <ScrollView style={styles.ScrollView}>{SupplierMessage}</ScrollView>
        </SafeAreaView>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="Taper votre message"
            placeholderTextColor="#2988BC"
            onChangeText={(value) => setMessage(value)}
            value={message}
            style={styles.textInput}
          />
          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={handleNewMessage}
          >
            <Text style={styles.submitText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  motherView: {
    flex: 9,
    // padding: 10,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  viewtexte: {
    flex: 1.3,
    flexDirection: "row",
    backgroundColor: "#f4eade",
    width: "100%",

    justifyContent: "space-around",
  },
  arrowIcon: {
    height: "20%",
    marginTop: 55,
    width: "10%",
    // backgroundColor:"red",
    // alignItems: "baseline",
    // alignSelf: "unset",
  },
  texte: {
    fontSize: 35,
    marginTop: 20,
    width: "70%",
    color: "#2988bc",
    fontWeight: "bold",
    // backgroundColor:'red',
    // textAlign:"center",
    alignSelf: "center",
  },
  container: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    // height: "100%",
  },
  SafeAreaView: {
    height: "80%",
  },

  goBackText: {
    alignSelf: "center",
  },
  messageClient: {
    marginTop: 5,
    backgroundColor: "lightgreen",
    width: 200,
    height: 40,
    borderRadius: 15,
    marginLeft: 2,
  },
  messagesContainer: {
    height: 60,
    width: "100%",
    marginTop: 5,
  },
  messageSuplier: {
    marginTop: 2,
    backgroundColor: "gray",
    width: 220,
    height: 40,
    borderRadius: 10,
    marginLeft: 130,
  },
  helloClient: {
    marginTop: 6,
    marginLeft: 8,
    textAlign: "left",
  },
  date: {
    textAlign: "right",
    marginRight: 8,
    fontSize: 10,
  },
  helloSuplier: {
    textAlign: "center",
  },
  viewInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: "20%",
    width: "100%",
    borderTopWidth: 2,
    borderColor: "#2988bc",
  },
  textInput: {
    borderRadius: 10,
    width: "76%",
    borderColor: "#2988bc",
    marginLeft: 5,
    borderWidth: 2,
    height: "50%",
    color: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonSubmit: {
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: "#ED8C72",
    borderColor: "#2988bc",
    textAlign: "center",
    marginLeft: 5,
    borderRadius: 10,
    width: "20%",
    height: "50%",
  },
  submitText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  ScrollView: {
    width: "100%",
    height: "60%",
  },
});
