import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  modalVisible,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { updateToken } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

//BOUCLE POUR MULTIPLIER ETOILE PAR 5
export default function MyProfile() {
  // const token =
  // "4blgNl-KsI4dNnN2NgQ3ZcbFWPV1e2pL";
  // "Y2fS1ngLWg1sKxXZan5szBkroD-bT2oI";

  const [modalVisible, setModalVisible] = useState(false);
  const [userNom, setUserNom] = useState("");
  const [userPrenom, setUserPrenom] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userLanguagesSpoken, setUserLanguagesSpoken] = useState("");
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const token = "JDT8JKv9F_xYCHTAvig688nbeB_icsxt";

  // const token = useSelector((state) => state.token.value);

  useEffect(() => {
    fetch(`http://192.168.1.11:4000/user/${token}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  const handleSubmitUpdates = () => {
    fetch(`http://192.168.1.11:4000/user/${token}`, {
      method: "UPDATE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: userNom,
        prenom: userPrenom,
        email: userEmail,
        phone: userPhone,
        languagesSpoken: userLanguagesSpoken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.data);
      });
    setModalVisible(false);

    //         dispatch(updateToken(data.token));
  };

  const handleUpdateProfile = (e) => {
    setModalVisible(true);
  };

  //VARIABLE DANS LE CAS OU IL N'Y AURAIT AUCUN AVIS
  let feedbacksCard = <View />;

  //VARIABLES POUR CALCULER MOYENNE ETOILES
  let userNoteAverage = 0;
  let totalNotes = 0;
  let numberNotes = 0;
  const userStars = [];

  //VARIABLE POUR DESIGNER NOMBRE D AVIS
  let numberFeedbacks = 0;

  // CONDITION POUR DECLENCHER LA BOUCLE ET AFFICHER LES FEEDBACKS
  if (user.feedbacks !== undefined && user.feedbacks.length > 0) {
    feedbacksCard = user.feedbacks.map((data, i) => {
      // ETOILES DE NOTATION
      const stars = [];
      let newStar = "";
      for (let j = 0; j < 5; j++) {
        if (j < data.note) {
          newStar = <FontAwesome name="star" color="#ed8c72" key={j} />;
        } else {
          newStar = <FontAwesome name="star" color="#f4eade" key={j} />;
        }
        stars.push(newStar);
      }

      //CALCUL MOYENNE NOTE
      totalNotes += data.note;
      numberNotes += [data.note].length;

      //CHANGER FORMAT DATE

      const date = new Date(data.date);

      const day =
        date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      const year =
        date.getYear() - 100 < 10
          ? `0${date.getYear() - 100}`
          : `${date.getYear() - 100}`;

      //RETOUR D'UNE CARTE DE FEEDBACKS TYPE
      return (
        <TouchableOpacity key={i} style={styles.feedback} activeOpacity={0.8}>
          <View style={styles.feedbackAllExceptComment}>
            <View style={styles.allInfosFeedback}>
              <View style={styles.imgContainer}>
                <Image
                  source={require("../assets/profilePicture.jpg")}
                  style={styles.photoFeedback}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.infosFeedback}>
                <Text style={styles.prenom}>{data.prenom}</Text>
                <Text>
                  le {day}/{month}/{year}
                </Text>
              </View>
            </View>

            <View style={styles.starsFeedback}>{stars}</View>
          </View>
          <View>
            <Text style={styles.commentFeedback}>{data.comment}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    //LANCER MOYENNE ETOILES x5 + COULEUR EN FONCTION DE LA NOTE
    let newUserStar = "";
    userNoteAverage = totalNotes / numberNotes;
    for (let j = 0; j < 5; j++) {
      if (j < userNoteAverage) {
        newUserStar = <FontAwesome key={j} name="star" color="#ed8c72" />;
      } else {
        newUserStar = <FontAwesome key={j} name="star" color="#f4eade" />;
      }
      userStars.push(newUserStar);
    }

    //NOMBRE D AVIS
    numberFeedbacks = user.feedbacks.length;
  }

  //RETOUR D'UNE CARTE DE FEEDBACKS TYPE
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Mon profil</Text>
      </View>
      <View style={styles.userInfos}>
        <Image
          source={require("../assets/profilePicture.jpg")}
          style={styles.photoUser}
          resizeMode="contain"
        />
        <View style={styles.starsUser}>{userStars}</View>
        <Text style={styles.langues}>{user.languagesSpoken}</Text>
        <Text style={styles.numberFeedbacks}>{numberFeedbacks} avis</Text>
      </View>
      <View style={styles.updateView}>
        <TouchableOpacity
          onPress={() => handleUpdateProfile()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Modifier mon profil</Text>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            {/* <View style={styles.centeredView}> */}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.centeredView}
            >
              <TouchableOpacity style={styles.modalView} activeOpacity={0.8}>
                <FontAwesome
                  onPress={() => setModalVisible(false)}
                  name="close"
                  size={25}
                  color="#2988BC"
                />

                <TextInput
                  placeholder="Nom:"
                  placeholderTextColor="#2988BC"
                  onChangeText={(value) => setUserNom(value)}
                  value={userNom}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Prénom:"
                  placeholderTextColor="#2988BC"
                  onChangeText={(value) => setUserPrenom(value)}
                  value={userPrenom}
                  style={styles.input}
                />
                <TextInput
                  placeholder="E-mail:"
                  placeholderTextColor="#2988BC"
                  onChangeText={(value) => setUserEmail(value)}
                  value={userEmail}
                  style={styles.input}
                />
                <TextInput
                  placeholder="N° de tél:"
                  placeholderTextColor="#2988BC"
                  onChangeText={(value) => setUserPhone(value)}
                  value={userPhone}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Langues parlées:"
                  placeholderTextColor="#2988BC"
                  onChangeText={(value) => setUserLanguagesSpoken(value)}
                  value={userLanguagesSpoken}
                  style={styles.input}
                />

                <TouchableOpacity
                  onPress={() => handleSubmitUpdates()}
                  style={styles.button}
                  activeOpacity={0.8}
                >
                  <Text style={styles.textButton}>Valider</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Modal>
        </TouchableOpacity>
      </View>
      <View style={styles.feedbacks}>
        <SafeAreaView>
          <ScrollView>{feedbacksCard}</ScrollView>
        </SafeAreaView>
      </View>
      {/* BOUTON MES COMMANDES EN PREVISION POUR LA SUITE */}
      {/* <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Mes commandes</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    alignItems: "center",
  },
  title: {
    backgroundColor: "#f4eade",

    width: "100%",
    alignItems: "center",
    flex: 0.8,
  },
  textTitle: {
    marginTop: 25,
    fontSize: 40,
    fontWeight: "bold",
    color: "#2988bc",
    width: "80%",
    textAlign: "center",
  },
  userInfos: {
    width: "80%",
    height: "28%",
    display: "flex",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    marginBottom: 10,
  },
  photoUser: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  starsUser: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  feedback: {
    alignSelf: "center",
    borderColor: "#2988bc",
    borderWidth: 2,
    marginBottom: 10,
    padding: 10,
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
  username: {
    fontWeight: "bold",
  },
  photoFeedback: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 2,
  },
  infosFeedback: {
    width: "55%",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  starsFeedback: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    width: "22%",
  },
  allInfosFeedback: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  feedbackAllExceptComment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feedbacks: {
    width: "90%",
    flex: 2,
  },
  commentFeedback: {
    marginTop: 5,
  },

  updateView: {
    // margin: 10,
    height: "15%",
    width: "80%",
    alignItems: "center",
  },

  // Page Modal s'enregistrer'

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#f4eade",
    borderRadius: 20,
    height: "45%",
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
  input: {
    width: "75%",
    marginTop: 6,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    marginTop: 15,
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: "#ED8C72",
  },
  textButton: {
    width: "75%",
    // borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 14,
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    color: "black",
    fontWeight: "bold",
  },
});
