import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChatroomId } from "../reducers/chatroom";
import { updateSupplierName } from "../reducers/supplier";

export default function Messaging({ navigation }) {
  const user = useSelector((state) => state.user.value);
  // const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getChatrooms();
  }, []);

  const getChatrooms = () => {
    fetch("http://192.168.1.11:4000/chatroom")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
      });
  };

  const goToSupplierMessaging = (bdata) => {
    dispatch(updateChatroomId(bdata._id));
    dispatch(updateSupplierName(bdata.name));
    navigation.navigate("SupplierMessage");
  };

  const handleDelete = (maData) => {
    fetch("http://192.168.1.11:4000/chatroom/chatroom", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: user.nickname,
        _id: maData._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data)
      });
  };

  const message = rooms.map((data, i) => {
    return (
      <TouchableOpacity key={i} style={styles.viewMessage} activeOpacity={0.8}>
        <View key={i} style={styles.messageDetail}>
          <View style={styles.userDetail}>
            <Text style={styles.userName}>
              {/* {data.supplier.prenom} {data.supplier.nom}     */}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.message}
            onPress={() => goToSupplierMessaging(data)}
          >
            <Text style={styles.adressText}>{data.name} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.MessageOptions}>
          <View style={styles.lastMessageDate}>
            <Text style={styles.date}>{data.date}</Text>
          </View>
          <TouchableOpacity style={styles.deleteIcon}>
            <FontAwesome
              name="trash"
              size={20}
              color="#000000"
              onPress={() => handleDelete(data)}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.motherView}
    >
      <View style={styles.viewtexte}>
        <Text style={styles.texte}>Messagerie</Text>
      </View>

      <View style={styles.viewAll}>
        <View style={styles.viewMessagerie}>
          <View style={styles.textView}>
            <Text style={styles.adressText}>Mes messages :</Text>
          </View>
          <View style={styles.messagerieLength}>
            <Text style={styles.adressText}>{rooms.length}</Text>
          </View>
        </View>

        <View style={styles.adress}>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>{message}</ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  motherView: {
    flex: 6,
    flexDirection: "column",
    alignItems: "center",
  },
  viewtexte: {
    flex: 1,
    backgroundColor: "#f4eade",
    width: "100%",
  },

  viewAll: {
    flex: 5.5,
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

  viewMessagerie: {
    flex: 0.8,
    marginTop: 15,
    justifyContent: "space-around",
    flexDirection: "row",
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
  messagerieLength: {
    width: "10%",

    height: "40%",
  },
  textView: {
    marginLeft: 15,
    width: "80%",
  },
  adress: {
    flex: 6,
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
    borderColor: "#ec6e5b",
    // backgroundColor: "#f4eade",

    width: "90%",
  },
  viewMessage: {
    marginTop: 15,
    height: 90,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-around",

    borderColor: "#2988bc",
    borderWidth: 2,
    width: "100%",
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

  messageDetail: {
    width: "75%",
    height: "80%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignSelf: "center",
  },
  userDetail: {
    marginLeft: 10,
    height: "20%",
  },
  userName: {
    fontSize: 15,
  },
  message: {
    marginLeft: 10,
    marginTop: 15,

    height: "70%",
  },
  MessageOptions: {
    width: "20%",
    height: "80%",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  lastMessageDate: {},
  date: {
    fontSize: 10,
  },
  deleteIcon: {
    width: 30,
    height: 45,
  },

  adressText: {
    fontSize: 20,
  },
});
