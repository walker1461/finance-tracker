import {
  AppShell,
  Container,
  Title,
  Divider,
  MantineProvider,
  Space,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  function addTransaction(newTransaction) {
    fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    }).then(() => {
      setTransactions((prev) => [...prev, newTransaction]);
    });
  }

  /*   function addTransaction(newTransaction) {
    setTransactions((prev) => [...prev, newTransaction]);
  } */

  return (
    <MantineProvider>
      <AppShell>
        <Container size="xl">
          <Container size="sm">
            <Title order={1} ta="center">
              Finance Tracker
            </Title>
            <Divider my="lg" />
            <TransactionForm addTransaction={addTransaction} />
          </Container>
          <Space h="xl" />
          <Space h="md" />
          <TransactionList transactions={transactions} />
        </Container>
      </AppShell>
    </MantineProvider>
  );
}
