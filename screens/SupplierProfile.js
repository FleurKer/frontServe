import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";

// import { supplierId } from "../reducers/supplier";

export default function SupplierProfile({ navigation }) {
  //ID SUPPLIER SELECTIONNE JUSTE POUR TESTER EN ATTENDANT QUE LA PAGE PRECEDENTE M ENVOIE L ID
  const supplierId = useSelector((state) => state.supplier.value);
  console.log("supplierId ", supplierId.firstName);

  const id = "63651a1f0e47d3533ab9d9b5";

  const [supplier, setSupplier] = useState({});

  //ROUTE POUR IMPORTER INFOS SUPPLIER VIA SON ID
  //MODIFICATION DE L ETAT SUPPLIER A L OUVERTURE DE LA PAGE GRACE A USEEFFECT
  //INFOS APPELLEES DANS LA PAGE VIA {supplier.nom} PAR EXEMPLE
  useEffect(() => {
    fetch(`http://192.168.1.11:4000/supplier/${id}`)
      //supplierId.firstName
      .then((response) => response.json())
      .then((data) => {
        setSupplier(data);
        console.log("data supplierprofil", data);
      });
  }, []);

  let feedbacksCard = <View />;

  //VARIABLES POUR CALCULER MOYENNE ETOILES
  let supplierNoteAverage = 0;
  let totalNotes = 0;
  let numberNotes = 0;
  const supplierStars = [];

  //VARIABLE POUR DESIGNER NOMBRE D AVIS
  let numberFeedbacks = 0;
  console.log("supplier.feedbacks", supplier.feedbacks);

  //BOUCLE POUR LANCER CARTE FEEDBACK
  if (supplier.feedbacks !== undefined && supplier.feedbacks.length > 0) {
    feedbacksCard = supplier.feedbacks.map((data, i) => {
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
      console.log("time", day, month, year);

      const stars = [];
      let newStar = "";
      for (let j = 0; j < 5; j++) {
        if (j < data.note) {
          newStar = <FontAwesome key={j} name="star" color="#ed8c72" />;
        } else {
          newStar = <FontAwesome key={j} name="star" color="#f4eade" />;
        }
        stars.push(newStar);
      }

      //CALCUL MOYENNE NOTE
      totalNotes += data.note;
      numberNotes += [data.note].length;

      //CHANGER FORMAT DATE
      const getDate = data.date.slice(0, 10);

      //RETOUR FEEDBACK CARD
      return (
        <TouchableOpacity key={i} style={styles.feedback} activeOpacity={0.8}>
          <View style={styles.feedbackAllExceptComment}>
            <View style={styles.allInfosFeedback}>
              <View>
                <Image
                  source={require("../assets/profilePicture.jpg")}
                  style={styles.photoFeedback}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.infosFeedback}>
                <Text style={styles.prenomFeedback}>{data.prenom}</Text>
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
    let newSupplierStar = "";
    supplierNoteAverage = totalNotes / numberNotes;
    for (let j = 0; j < 5; j++) {
      if (j < supplierNoteAverage) {
        newSupplierStar = <FontAwesome key={j} name="star" color="#ed8c72" />;
      } else {
        newSupplierStar = <FontAwesome key={j} name="star" color="#f4eade" />;
      }
      supplierStars.push(newSupplierStar);
    }

    //NOMBRE D AVIS
    numberFeedbacks = supplier.feedbacks.length;
  }

  //RETOUR D'UNE CARTE DE FEEDBACKS TYPE
  return (
    <View style={styles.motherView}>
      <View style={styles.viewtexte}>
        <TouchableOpacity
          style={styles.arrowIcon}
          onPress={() => navigation.navigate("Fournisseur")}
          activeOpacity={0.8}
        >
          <FontAwesome name="arrow-left" size={20} color="#000000" />
        </TouchableOpacity>
        <View style={styles.texteDiv}>
          <Text style={styles.texte}>Profil du fournisseur</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/profilePicture.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              alignSelf: "center",
            }}
          />
        </View>
        <View style={styles.presentationContainer}>
          <View style={styles.viewContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.nameSupplier}>
                {supplier.prenom} {supplier.nom}
              </Text>
            </View>
            <View style={styles.ratingContainer}>{supplierStars}</View>
            <View style={styles.ratingContainer}>
              <Text style={styles.texteRating}>{numberFeedbacks} avis</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.pitchConontainer}>
            <Text style={styles.texteSpecialite}>
              <Text style={styles.span}>Présentation :</Text>
              {supplier.presentation}
            </Text>
          </View>
          <View style={styles.specialiteContainer}>
            <Text style={styles.texteSpecialite}>
              <Text style={styles.span}>Spécialité : </Text>
              {supplier.serviceDetail}
            </Text>
          </View>

          <View>
            <Text>
              <Text style={styles.span}>Langues parlées :</Text>{" "}
              {supplier.languagesSpoken}
            </Text>
          </View>
        </View>

        <View style={styles.feedbacks}>
          <SafeAreaView>
            <ScrollView>{feedbacksCard}</ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  motherView: {
    flex: 1,
    margin: 0,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  viewtexte: {
    backgroundColor: "#f4eade",
    flex: 1.6,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    width: "5%",
    color: "#ed8c72",
  },
  texteDiv: {
    width: "90%",
    height: "65%",
    alignSelf: "center",
  },
  texte: {
    marginTop: 30,
    fontWeight: "bold",
    color: "#2988bc",
    textAlign: "center",
    fontSize: 30,
    alignItems: "center",
  },
  container: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  viewContainer: {
    margin: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  presentationContainer: {
    height: "8%",
    width: "100%",
  },
  detailsContainer: {
    height: "15%",
    width: "100%",
    marginLeft: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  pitchConontainer: {
    // backgroundColor: "red",
  },
  texteSpecialite: {
    // backgroundColor: "green",
    margin: 2,
    width: "86%",
  },
  span: {
    fontWeight: "bold",
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
  photoFeedback: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 2,
  },
  nameSupplier: {
    fontWeight: "bold",
  },
  prenomFeedback: {
    fontWeight: "bold",
  },
  infosFeedback: {
    justifyContent: "space-between",
    flexDirection: "row",
    // backgroundColor:"red",
    width: "70%",
    height: "100%",
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
    marginBottom: 30,
  },
  commentFeedback: {
    marginTop: 5,
  },
});
