import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { Header as HeaderRNE, Icon } from "@rneui/themed";

function Header() {
   const details = [
      {
         icon: "storefront",
         iconType: "ionicons",
         label: "Store 101",
      },
      {
         icon: "user",
         iconType: "feather",
         label: "amit003",
      },
   ];
   return (
      <HeaderRNE
         containerStyle={styles.header}
         leftContainerStyle={styles.headerContainer}
         centerContainerStyle={styles.headerContainer}
         rightContainerStyle={styles.headerContainer}
         leftComponent={
            <TouchableOpacity>
               <Icon name="menu" color="#f0f0f0" size={33} />
            </TouchableOpacity>
         }
         centerComponent={
            <Image
               source={require("../assets/kpmgLogo.png")}
               style={styles.logo}
            />
         }
         rightComponent={
            <View>
               {details.map((detail, index) => (
                  <TouchableOpacity
                     key={index}
                     style={{ flexDirection: "row", alignItems: "center" }}
                  >
                     <Icon
                        name={detail.icon}
                        type={detail.iconType}
                        color="#fff"
                        size={17}
                     />
                     <View style={styles.storeInfoContainer}>
                        <Text style={styles.storeId}>{detail.label}</Text>
                     </View>
                  </TouchableOpacity>
               ))}
            </View>
         }
      />
   );
}

const styles = StyleSheet.create({
   header: {
      borderBottomWidth: 0,
   },
   headerContainer: {
      marginTop: 15,
      justifyContent: "center",
   },
   logo: {
      height: 25,
      marginRight: 10,
      resizeMode: "contain",
   },
   storeInfoContainer: {
      marginHorizontal: 5,
   },
   storeId: {
      fontFamily: "Montserrat-Medium",
      color: "white",
      fontSize: 13,
   },
});

export default Header;
