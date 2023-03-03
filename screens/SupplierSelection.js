import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { updateChatroomId } from "../reducers/chatroom";
import { updateSupplierName, updateSupplierId } from "../reducers/supplier";

import { useDispatch, useSelector } from "react-redux";

export default function SupplierSelection({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateF, setDateF] = useState(new Date());
  const [modeF, setModeF] = useState("date");
  const [showF, setShowF] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [userId, setUserId] = useState("");

  const user = useSelector((state) => state.user.value);
  const city = useSelector((state) => state.city.value);
  const service = useSelector((state) => state.service.value);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch("http://192.168.43.225:4000/supplier/supp", {
    // 		method: 'POST',
    // 			  headers: { 'Content-Type': 'application/json' },
    // 			  body: JSON.stringify({
    // 		  	  cityName:city.cityName ,
    //           serviceName:  service.monService ,
    //         })
    // 		}).then(response => response.json())
    // 		.then((data) => {

    //       setSuppliers(data)

    //     })

    fetch("http://192.168.1.11:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.data._id);
      });
  }, []);

  //ici je fetch les supplier disponible au horraire souhaiter au moment du click
  const handleClick = () => {
    // console.log('availableStartDate',date)
    // console.log('availableEndDate',dateF)

    const url = "http://192.168.1.11:4000/supplier";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        cityName: city.cityName,
        serviceName: service.monService,
        availableStartDate: date,
        availableEndDate: dateF,
      }),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setSuppliers(data.data);
          console.log("data trouvée", data.data);
        } else console.log("data supp", data.message);
      });
  };

  // fonction click ouverture
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const onClick = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowF(false);
    setDateF(currentDate);
  };

  // show mode debut
  const showMode = (currentMode) => {
    setMode(currentMode);
  };
  // show mode fin
  const showModeF = (currentMode) => {
    setModeF(currentMode);
  };

  // date debut
  const showDatepicker = () => {
    showMode("date");
    setShow(true);
  };
  // date de fin
  const showDatepickerF = () => {
    showModeF("date");
    setShowF(true);
  };

  // time debut
  const showTimepicker = () => {
    showMode("time");
    setShow(true);
  };
  // time fin
  const showTimepickerF = () => {
    showModeF("time");
    setShowF(true);
  };

  const creatChatroom = (bdata) => {
    const name = bdata.nom;
    const id = bdata._id;
    console.log("supplier bdata", bdata);

    fetch("http://192.168.1.11:4000/chatroom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        user: userId,
        supplier: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // dispatch(updateSupplierName(data.data.nom))

        console.log("data creat chatroom", data);

        if (data.result === false) {
          navigation.navigate("Messagerie");
        } else {
          dispatch(updateChatroomId(data.data._id));

          navigation.navigate("SupplierMessage");
        }
      });
    dispatch(updateSupplierName(bdata.nom));
  };

  const goSupplierProfil = (bdata) => {
    dispatch(updateSupplierId(bdata._id));

    navigation.navigate("SupplierProfile");
  };

  let supplierData = <View />;
  if (suppliers !== undefined) {
    supplierData = suppliers.map((data, i) => {
      const coloredStar = <FontAwesome name="star" color="#ed8c72" />;
      const uncoloredStar = <FontAwesome name="star" color="#f4eade" />;

      let newStars = "";
      const stars = [];

      for (let i = 0; i < 5; i++) {
        if (i < data.note) {
          newStars = coloredStar;
        } else {
          newStars = uncoloredStar;
        }
        stars.push(newStars);
      }

      return (
        <View key={i} style={styles.cardList}>
          <View key={i} style={styles.cardSupplier}>
            <Image
              source={require("../assets/profilePicture.jpg")}
              style={styles.imageProfil}
            />
            <Text style={styles.profilName}>{data.nom}</Text>
            <Text style={styles.profilName}>{data.prenom}</Text>
            <Text style={styles.profilPrice}>T/H : {data.supplierPrice}e</Text>
          </View>
          <View style={styles.prifileSpecialite}>
            <Text>Specilité :{data.serviceDetail} </Text>
            <FontAwesome style={styles.stars}>{stars}</FontAwesome>
          </View>
          <View style={styles.buttonList}>
            <TouchableOpacity
              style={styles.profilBtn}
              onPress={() => goSupplierProfil(data)}
            >
              <Text style={styles.btn}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contacterBtn}
              onPress={() => creatChatroom(data)}
            >
              <Text style={styles.textContacter}>Contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectionnerBtn}
              onPress={() => navigation.navigate("Payment")}
            >
              <Text style={styles.btn}>Réserver</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      {/* Titre */}
      <View style={styles.view1}>
        <TouchableOpacity
          style={styles.arrowIcon}
          onPress={() => navigation.navigate("recherche")}
          activeOpacity={0.8}
        >
          <FontAwesome
            style={styles.FontAwesome}
            name="arrow-left"
            size={20}
            color="#000000"
          />
        </TouchableOpacity>
        <Text style={styles.textePrestataire}>Sélectionner un prestataire</Text>
      </View>

      {/* Formulaire de dates */}
      <View style={styles.datePickerContainer}>
        <View>
          <View>
            <Text style={styles.selectionnerDate}>
              Selectioner une date de Début
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.dbtButton} onPress={showDatepicker}>
              <Text style={styles.textDateButton}>Date </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dbtButton} onPress={showTimepicker}>
              <Text style={styles.textDateButton}>Heure </Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
            <Text style={styles.date}>{date.toLocaleString()}</Text>
          </View>
        </View>

        <View>
          <View>
            <Text style={styles.selectionnerDate}>
              Selectioner une date de fin
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.dbtButton}
              onPress={showDatepickerF}
            >
              <Text style={styles.textDateButton}>Date </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dbtButton}
              onPress={showTimepickerF}
              title="Show time picker!"
            >
              <Text style={styles.textDateButton}>Heure </Text>
            </TouchableOpacity>
            {showF && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateF}
                mode={modeF}
                is24Hour={true}
                onChange={onClick}
              />
            )}
            <Text style={styles.date}>{dateF.toLocaleString()}</Text>
          </View>
          <View style={styles.valider}>
            <TouchableOpacity
              style={styles.buttonSearch}
              onPress={() => handleClick()}
            >
              <Text style={styles.validerStyle}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>{supplierData}</ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  view1: {
    width: "100%",
    height: 100,
    alignItems: "center",
    backgroundColor: "#F4EADE",
    flexDirection: "row",
    // borderBottomColor: "black",
    // borderBottomWidth: 1,
  },
  arrowIcon: {
    paddingLeft: 10,
  },
  textePrestataire: {
    justifyContent: "center",
    paddingLeft: 50,
    fontSize: 20,
    color: "#2988BC",
    fontWeight: "bold",
  },
  datePickerContainer: {
    margin: 10,
    padding: 10,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  dbtButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 30,
    borderColor: "#2988BC",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectionnerDate: {
    alignSelf: "center",
    fontSize: 18,
    marginBottom: 10,
    color: "#2988BC",
    fontWeight: "bold",
  },
  ScrollView: {
    width: "90%",
    height: "45%",
    alignSelf: "center",
  },
  // css profil
  cardSupplier: {
    height: 60,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  imageProfil: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profilName: {
    fontSize: 15,
  },
  profilPrice: {
    fontSize: 15,
  },
  buttonList: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-around",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    textAlign: "center",
  },
  prifileSpecialite: {
    height: 30,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  stars: {
    size: 15,
  },
  profilBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",

    textAlign: "center",
  },
  btn: {
    elevation: 6,
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: "#ED8C72",
    backgroundColor: "white",
    borderWidth: 2,
    height: 30,
    width: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contacterBtn: {
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#ED8C72",
    borderWidth: 2,
    elevation: 6,
    color: "black",
    height: 30,
    width: 80,
    alignItems: "center",
  },
  selectionnerBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardList: {
    borderColor: "#2988BC",
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  valider: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "30%",
    borderRadius: 10,
    backgroundColor: "#2988BC",
    elevation: 6,
    color: "black",
    height: 30,
    width: 150,
  },
  validerStyle: {
    color: "white",
    fontSize: 18,
  },
});
