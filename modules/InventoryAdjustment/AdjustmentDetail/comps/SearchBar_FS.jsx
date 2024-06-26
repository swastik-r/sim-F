import React, { useState } from "react";

// React Native Imports
import { View, Pressable, StyleSheet, Text } from "react-native";

// React Native Elements UI Library
import { Icon, SearchBar, ListItem } from "@rneui/themed";

// Custom Components
import { useAdjustmentDetail } from "../../../../context/DataContext";
import { BottomSheet, Button } from "@rneui/base";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SearchBar_FS({ search }) {
   // States and Vars
   const [searchStr, setSearchStr] = useState("");

   // Visibility States
   const [filterVisible, setFilterVisible] = useState(false);
   const [categoryFilterVisible, setCategoryFilterVisible] = useState(false);
   const [dateFilterVisible, setDateFilterVisible] = useState(false);

   // Functions
   function handleSearch(text) {
      search(text);
   }

   return (
      <>
         <View style={styles.searchBarAndOpts}>
            <SearchBar
               placeholder="Enter a search criteria"
               containerStyle={{
                  flex: 1,
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  paddingHorizontal: 3,
               }}
               inputStyle={{
                  fontFamily: "Montserrat-Medium",
                  fontSize: 10,
               }}
               inputContainerStyle={{
                  height: 40,
                  borderRadius: 50,
                  backgroundColor: "white",
               }}
               value={searchStr}
               onChangeText={(text) => {
                  setSearchStr(text), handleSearch(text);
               }}
            />

            {/* Filter Button */}
            <Pressable
               style={styles.buttonContainer}
               onPress={() => setFilterVisible(true)}
            >
               <Icon name="filter" type="material-community" />
            </Pressable>
         </View>

         {filterVisible && (
            <FilterBottomSheet
               filterVisible={filterVisible}
               setFilterVisible={setFilterVisible}
               setCategoryFilterVisible={setCategoryFilterVisible}
               setDateFilterVisible={setDateFilterVisible}
            />
         )}

         {/* Category Filter Bottom Sheet */}
         {categoryFilterVisible && (
            <CategoryFilterBottomSheet
               categoryFilterVisible={categoryFilterVisible}
               setCategoryFilterVisible={setCategoryFilterVisible}
            />
         )}

         {/* Date Filter Bottom Sheet */}
         {dateFilterVisible && (
            <DateFilterBottomSheet
               dateFilterVisible={dateFilterVisible}
               setDateFilterVisible={setDateFilterVisible}
            />
         )}
      </>
   );
}

function FilterBottomSheet({
   filterVisible,
   setFilterVisible,
   setCategoryFilterVisible,
   setDateFilterVisible,
}) {
   // States and Vars
   const filterOpts = [
      {
         title: "Filter by",
         titleStyle: {
            fontFamily: "Montserrat-Regular",
            fontSize: 25,
         },
         containerStyle: [styles.sortOptContainer, { paddingTop: 0 }],
      },
      {
         title: "Item Category",
         icon: {
            name: "flow-tree",
            type: "entypo",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
      },
      // {
      //    title: "Date",
      //    icon: {
      //       name: "date-range",
      //       type: "material",
      //       color: "black",
      //       size: 30,
      //    },
      //    titleStyle: styles.bottomSheetOpt,
      //    containerStyle: styles.sortOptContainer,
      // },
      {
         title: "Reset Filter",
         icon: { name: "refresh", type: "material", color: "white" },
         containerStyle: [
            styles.sortOptContainer,
            { backgroundColor: "darkred" },
         ],
         titleStyle: styles.sortOptCancel,
         type: "reset",
      },
   ];
   const { setData, initialData } = useAdjustmentDetail();

   return (
      <BottomSheet
         isVisible={filterVisible}
         onBackdropPress={() => setFilterVisible(false)}
      >
         {filterOpts.map((opt, i) => (
            <ListItem
               key={i}
               containerStyle={opt.containerStyle}
               onPress={() => {
                  setFilterVisible(false);

                  if (opt.title === "Item Category") {
                     setCategoryFilterVisible(true);
                  } else if (opt.title === "Date") {
                     setDateFilterVisible(true);
                  } else if (opt.title === "Reset Filter") {
                     setData(initialData);
                  }
               }}
            >
               <ListItem.Content>
                  <Icon {...opt.icon} />
                  <ListItem.Title style={opt.titleStyle}>
                     {opt.title}
                  </ListItem.Title>
               </ListItem.Content>
            </ListItem>
         ))}
      </BottomSheet>
   );
}

function CategoryFilterBottomSheet({
   categoryFilterVisible,
   setCategoryFilterVisible,
}) {
   const categoryOpts = [
      {
         title: "Category Filter",
         titleStyle: {
            fontFamily: "Montserrat-Regular",
            fontSize: 25,
         },
         containerStyle: [styles.sortOptContainer, { paddingTop: 0 }],
      },
      {
         title: "Apparel",
         titleStyle: styles.bottomSheetOpt,
         icon: {
            name: "tshirt-crew",
            type: "material-community",
            color: "black",
            size: 30,
         },
         containerStyle: styles.sortOptContainer,
      },
      {
         title: "Cancel",
         icon: { name: "refresh", type: "material", color: "white" },
         containerStyle: [
            styles.sortOptContainer,
            { backgroundColor: "darkred" },
         ],
         titleStyle: styles.sortOptCancel,
         type: "reset",
      },
   ];

   return (
      <BottomSheet
         isVisible={categoryFilterVisible}
         onBackdropPress={() => setCategoryFilterVisible(false)}
      >
         {categoryOpts.map((opt, i) => (
            <ListItem
               key={i}
               containerStyle={opt.containerStyle}
               onPress={() => {
                  setCategoryFilterVisible(false);
               }}
            >
               <ListItem.Content>
                  <Icon {...opt.icon} />
                  <ListItem.Title style={opt.titleStyle}>
                     {opt.title}
                  </ListItem.Title>
               </ListItem.Content>
            </ListItem>
         ))}
      </BottomSheet>
   );
}

function DateFilterBottomSheet({ dateFilterVisible, setDateFilterVisible }) {
   // use date-time-picker here
   return (
      <BottomSheet
         isVisible={dateFilterVisible}
         onBackdropPress={() => setDateFilterVisible(false)}
      >
         <View style={styles.bottomSheet}>
            <DateRangePicker />
         </View>
      </BottomSheet>
   );
}

function DateRangePicker() {
   // States and Vars
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   const [showStartPicker, setShowStartPicker] = useState(false);
   const [showEndPicker, setShowEndPicker] = useState(false);
   const { data, setData } = useAdjustmentDetail();

   // Functions
   function onStartChange(event, selectedDate) {
      setShowStartPicker(false);
      if (selectedDate) {
         setStartDate(selectedDate);
      }
   }
   function onEndChange(event, selectedDate) {
      setShowEndPicker(false);
      if (selectedDate) {
         setEndDate(selectedDate);
      }
   }
   function filterDate(startDate, endDate, adjustmentId) {
      // filter all the detailItems accroding to their dates
   }

   return (
      <View style={{ flexDirection: "row" }}>
         <View style={styles.container}>
            <View style={styles.picker}>
               <Button
                  onPress={() => setShowStartPicker(true)}
                  title={startDate.toDateString().split(" ").slice(1).join(" ")}
                  titleStyle={{ fontFamily: "Montserrat-Bold" }}
                  icon={{
                     name: "calendar",
                     type: "material-community",
                     color: "white",
                  }}
               />
               {showStartPicker && (
                  <DateTimePicker
                     testID="startDateTimePicker"
                     value={startDate}
                     mode="date"
                     display="default"
                     onChange={onStartChange}
                  />
               )}
               <Text style={styles.dateText}>Start Date</Text>
            </View>
            <View style={styles.picker}>
               <Button
                  onPress={() => setShowEndPicker(true)}
                  title={endDate.toDateString().split(" ").slice(1).join(" ")}
                  titleStyle={{ fontFamily: "Montserrat-Bold" }}
                  icon={{
                     name: "calendar",
                     type: "material-community",
                     color: "white",
                  }}
               />
               {showEndPicker && (
                  <DateTimePicker
                     testID="endDateTimePicker"
                     value={endDate}
                     mode="date"
                     display="default"
                     onChange={onEndChange}
                  />
               )}

               <Text style={styles.dateText}>End Date</Text>
            </View>
         </View>
         <View style={styles.container}>
            <Button
               title="Apply Filter"
               titleStyle={{ fontFamily: "Montserrat-Bold" }}
               buttonStyle={{ backgroundColor: "green" }}
               onPress={() => filterDate(startDate, endDate)}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   searchBarAndOpts: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
   },
   chipButton: {
      marginHorizontal: 5,
   },
   sortOptContainer: {
      paddingVertical: 20,
   },
   bottomSheetOpt: {
      fontFamily: "Montserrat-Medium",
      fontSize: 16,
   },
   sortOptCancel: {
      fontFamily: "Montserrat-Medium",
      fontSize: 16,
      color: "white",
   },

   // Date Picker Styles
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
   },
   picker: {
      marginVertical: 10,
      alignItems: "center",
   },
   dateText: {
      marginTop: 10,
      fontSize: 16,
      fontFamily: "Montserrat-Medium",
   },

   bottomSheet: {
      backgroundColor: "white",
      padding: 10,
   },

   buttonContainer: {
      paddingVertical: 5,
      paddingHorizontal: 6,
      marginHorizontal: 5,
      backgroundColor: "white",
      borderRadius: 10,
   },
});
