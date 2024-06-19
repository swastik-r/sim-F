import React, { useState } from "react";

// React Native Imports
import { View, Pressable, StyleSheet, Text } from "react-native";

// React Native Elements UI Library
import { Icon, SearchBar, ListItem } from "@rneui/themed";

// Custom Components
import { useAdjustmentDetail } from "../../../context/DataContext";
import { BottomSheet, Button } from "@rneui/base";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SearchBar_FS() {
   // States and Vars
   const { searchStr, setSearchStr, handleSearch } = useAdjustmentDetail();

   // Visibility States
   const [sortVisible, setSortVisible] = useState(false);
   const [filterVisible, setFilterVisible] = useState(false);
   const [dateFilterVisible, setDateFilterVisible] = useState(false);
   const [reasonFilterVisible, setReasonFilterVisible] = useState(false);
   const [statusFilterVisible, setStatusFilterVisible] = useState(false);

   return (
      <>
         <View style={styles.searchBarAndOpts}>
            <SearchBar
               placeholder="Enter a search criteria"
               containerStyle={{
                  flex: 1,
                  backgroundColor: "transparent",
                  borderTopColor: "transparent",
                  borderBottomColor: "transparent",
               }}
               inputStyle={{
                  fontFamily: "Montserrat-Medium",
                  fontSize: 10,
               }}
               inputContainerStyle={{
                  height: 40,
                  borderWidth: 0,
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

            {/* Sort Button */}
            <Pressable
               style={styles.buttonContainer}
               color="blue"
               onPress={() => setSortVisible(true)}
            >
               <Icon name="sort" type="materialcommunity" size={25} />
            </Pressable>
         </View>

         {/* Sort Bottom Sheet */}

         <SortBottomSheet
            sortVisible={sortVisible}
            setSortVisible={setSortVisible}
         />

         {filterVisible && (
            <FilterBottomSheet
               filterVisible={filterVisible}
               setFilterVisible={setFilterVisible}
               setReasonFilterVisible={setReasonFilterVisible}
               setStatusFilterVisible={setStatusFilterVisible}
               setDateFilterVisible={setDateFilterVisible}
            />
         )}

         {/* Reason Filter Bottom Sheet */}
         {reasonFilterVisible && (
            <ReasonFilterBottomSheet
               reasonFilterVisible={reasonFilterVisible}
               setReasonFilterVisible={setReasonFilterVisible}
            />
         )}

         {/* Status Filter Bottom Sheet */}
         {statusFilterVisible && (
            <StatusFilterBottomSheet
               statusFilterVisible={statusFilterVisible}
               setStatusFilterVisible={setStatusFilterVisible}
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

function SortBottomSheet({ sortVisible, setSortVisible }) {
   // States and Vars
   const sortOpts = [
      {
         title: "Sort by",
         titleStyle: {
            fontFamily: "Montserrat-Regular",
            fontSize: 25,
         },
         containerStyle: [styles.sortOptContainer, { paddingTop: 0 }],
      },
      {
         title: "Sort by latest",
         icon: {
            name: "sort-clock-descending-outline",
            type: "material-community",
            color: "black",
            size: 35,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
         sortType: "latest",
      },
      {
         title: "Sort by oldest",
         icon: {
            name: "sort-clock-descending-outline",
            type: "material-community",
            color: "black",
            size: 35,
            containerStyle: {
               transform: [{ scaleY: -1 }],
            },
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
         sortType: "oldest",
      },
      {
         title: sortApplied ? "Reset Sort" : "Cancel",
         icon: sortApplied
            ? { name: "refresh", type: "material", color: "white" }
            : { name: "cancel", type: "material", color: "white" },
         containerStyle: [
            styles.sortOptContainer,
            { backgroundColor: "darkred" },
         ],
         titleStyle: styles.sortOptCancel,
         sortType: "reset",
      },
   ];
   const [sortApplied, setSortApplied] = useState(false);
   const { data, setData, initialData } = useAdjustmentDetail();

   // Functions
   function sortByDate(sortType) {
      if (sortType === "reset") {
         resetSort();
         return;
      }

      const sortedData = [...data];
      sortedData.sort((a, b) => {
         const dateA = new Date(a.date);
         const dateB = new Date(b.date);
         return sortType === "latest" ? dateB - dateA : dateA - dateB;
      });

      setData(sortedData);
      setSortApplied(true);
      console.log("Sorted by: " + sortType);
   }

   function resetSort() {
      setData(initialData);
      setSortApplied(false);
   }

   return (
      <BottomSheet
         isVisible={sortVisible}
         onBackdropPress={() => setSortVisible(false)}
      >
         {sortOpts.map((opt, i) => (
            <ListItem
               key={i}
               containerStyle={opt.containerStyle}
               onPress={() => {
                  sortByDate(opt.sortType);
                  setSortVisible(false);
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

function FilterBottomSheet({
   filterVisible,
   setFilterVisible,
   setStatusFilterVisible,
   setReasonFilterVisible,
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
         title: "Status",
         icon: {
            name: "progress-question",
            type: "material-community",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
      },
      {
         title: "Reason",
         icon: {
            name: "report-problem",
            type: "material",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
      },
      {
         title: "Date",
         icon: {
            name: "date-range",
            type: "material",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
      },
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

                  if (opt.title === "Status") {
                     setStatusFilterVisible(true);
                  } else if (opt.title === "Reason") {
                     setReasonFilterVisible(true);
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

function StatusFilterBottomSheet({
   statusFilterVisible,
   setStatusFilterVisible,
}) {
   // States and Vars
   const statusFilterOpts = [
      {
         title: "Select a status",
         titleStyle: {
            fontFamily: "Montserrat-Regular",
            fontSize: 25,
         },
         containerStyle: [styles.sortOptContainer, { paddingTop: 0 }],
      },
      {
         title: "In Progress",
         icon: {
            name: "progress-question",
            type: "material-community",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
         filterType: "inProgress",
      },
      {
         title: "Completed",
         icon: {
            name: "progress-check",
            type: "material-community",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
         filterType: "complete",
      },
      // reset filter
      {
         title: "Reset",
         icon: {
            name: "refresh",
            type: "material",
            color: "white",
         },
         containerStyle: [
            styles.sortOptContainer,
            { backgroundColor: "darkred" },
         ],
         titleStyle: styles.sortOptCancel,
         filterType: "reset",
      },
   ];
   const { data, setData, initialData } = useAdjustmentDetail();

   // Functions
   function filterStatus(progress) {
      if (progress === "reset") {
         setData(initialData);
         return;
      }
      const filteredData = data.filter((item) => item.progress === progress);
      setData(filteredData);
   }

   return (
      <BottomSheet
         isVisible={statusFilterVisible}
         onBackdropPress={() => setStatusFilterVisible(false)}
      >
         {statusFilterOpts.map((opt, i) => (
            <ListItem
               key={i}
               containerStyle={opt.containerStyle}
               onPress={() => {
                  filterStatus(opt.filterType);
                  setStatusFilterVisible(false);
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

// Function needs to be fixed
function ReasonFilterBottomSheet({
   reasonFilterVisible,
   setReasonFilterVisible,
}) {
   // States and Vars
   const [filterApplied, setFilterApplied] = useState(false);
   const { data, setData, initialData } = useAdjustmentDetail();
   const reasonFilterOpts = [
      {
         title: "Damaged",
         icon: {
            name: "image-broken-variant",
            type: "material-community",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
         filterType: "damaged",
      },
      {
         title: "Stock In",
         icon: {
            name: "download",
            type: "font-awesome",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
         filterType: "stockIn",
      },
      {
         title: "Stock Out",
         icon: {
            name: "upload",
            type: "font-awesome",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
         filterType: "stockOut",
      },
      {
         title: "Theft",
         icon: {
            name: "shield-lock-open",
            type: "material-community",
            color: "black",
            size: 30,
         },
         titleStyle: styles.bottomSheetOpt,
         containerStyle: styles.sortOptContainer,
         filterType: "theft",
      },
      {
         // this is the reset filter option
         // it's title, icon and background color are based on whether the filter is applied
         title: filterApplied ? "Reset Filter" : "Cancel",
         icon: {
            name: filterApplied ? "refresh" : "cancel",
            type: "material",
            color: "white",
         },
         containerStyle: [
            styles.sortOptContainer,
            { backgroundColor: "darkred" },
         ],
         titleStyle: styles.sortOptCancel,
         filterType: "reset",
      },
   ];

   // Functions
   function filterReason(reason) {
      if (reason === "reset") {
         setData(initialData);
         return;
      }
      const filteredData = data.filter((item) => item.reason === reason);
      setData(filteredData);
   }

   return (
      <BottomSheet
         isVisible={reasonFilterVisible}
         onBackdropPress={() => setReasonFilterVisible(false)}
      >
         {reasonFilterOpts.map((opt, i) => (
            <ListItem
               key={i}
               containerStyle={opt.containerStyle}
               onPress={() => {
                  filterReason(opt.filterType);
                  setReasonFilterVisible(false);
               }}
            >
               <ListItem.Content>
                  <Icon {...opt.icon} />
                  <ListItem.Title style={styles.bottomSheetOpt}>
                     {opt.title}
                  </ListItem.Title>
               </ListItem.Content>
            </ListItem>
         ))}
      </BottomSheet>
   );
}

// Needs to be developed later
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
   const { data, setData, initialData } = useAdjustmentDetail();

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
   function filterDate(startDate, endDate) {
      const filteredData = data.filter((item) => {
         const itemDate = new Date(item.date);
         return itemDate >= startDate && itemDate <= endDate;
      });
      setData(filteredData);
   }

   return (
      <View style={{ flexDirection: "row" }}>
         <View style={styles.container}>
            <View style={styles.picker}>
               <Button
                  onPress={() => setShowStartPicker(true)}
                  title="Start Date"
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
               <Text style={styles.dateText}>{startDate.toDateString()}</Text>
            </View>
            <View style={styles.picker}>
               <Button
                  onPress={() => setShowEndPicker(true)}
                  title="End Date"
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

               <Text style={styles.dateText}>{endDate.toDateString()}</Text>
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
