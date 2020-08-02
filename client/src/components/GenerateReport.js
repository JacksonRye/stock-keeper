import React, { useContext, useEffect } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { GlobalContext } from "../context/GlobalState";

const Report = ({ expenses, inventoryList, locations }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header}>Expenses</Text>

        <Text style={styles.title}>
          Total: {expenses.reduce((sum, { total }) => sum + total, 0)}
        </Text>

        <View style={styles.flex}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.title}>Price</Text>
          <Text style={styles.title}>Quantity</Text>
          <Text style={styles.title}>Total</Text>
        </View>

        {locations.map((location, index) => (
          <View key={index}>
            <Text style={styles.location}>{location}</Text>

            {expenses
              .filter((expense) => expense.location === location)
              .map(({ name, price, quantity, total }, index) => (
                <View key={index} style={styles.flex}>
                  <Text style={styles.text}>{name}</Text>
                  <Text style={styles.text}>{price}</Text>
                  <Text style={styles.text}>{quantity}</Text>
                  <Text style={styles.text}>{total}</Text>
                </View>
              ))}
          </View>
        ))}
      </Page>

      <Page style={styles.body}>
        <Text style={styles.header}>Inventory List</Text>

        <Text style={styles.total}>
          Number of Items in inventory: {inventoryList.length}
        </Text>

        <View style={styles.flex}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.title}>Quantity</Text>
        </View>

        {locations.map((location, index) => (
          <View key={index}>
            <Text style={styles.location}>{location}</Text>

            {inventoryList
              .filter((inventory) => inventory.location === location)
              .map(({ name, quantity }, index) => (
                <View key={index} style={styles.flex}>
                  <Text style={styles.text}>{name}</Text>

                  <Text style={styles.text}> {quantity}</Text>
                </View>
              ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

const GenerateReport = () => {
  const {
    getExpenses,
    getInventoryList,
    expenses,
    inventoryList,
    locations,
  } = useContext(GlobalContext);

  useEffect(() => {
    getExpenses();
    getInventoryList();
  }, []);
  return (
    <div>
      <PDFDownloadLink
        document={
          <Report
            locations={locations}
            expenses={expenses}
            inventoryList={inventoryList}
          />
        }
        fileName="report.pdf"
      >
        Download PDF
      </PDFDownloadLink>
    </div>
  );
};

export default GenerateReport;

const styles = StyleSheet.create({
  body: {
    padding: 35,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    paddingBottom: 16,
    textAlign: "left",
  },
  text: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "left",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  location: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 20,
  },
  total: {
    fontSize: 20,
    textAlign: "left",
    paddingTop: 15,
    paddingBottom: 30,
  },
});
