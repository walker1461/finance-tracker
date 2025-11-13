import {
  AppShell,
  Container,
  Title,
  Divider,
  MantineProvider,
  Space,
} from "@mantine/core";
//import React, { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { useTransactions } from "./hooks/useTransactions";

export default function App() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } =
    useTransactions();

  /*   useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []); */

  /*  function addTransaction(newTransaction) {
    fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    }).then(() => {
      setTransactions((prev) => [...prev, newTransaction]);
    });
  } */
  //let newTransaction = addTransaction(transactions);
  //setTransactions((prev) => [...prev, newTransaction]);

  /*   async function deleteTransactionRequest(id) {
    const res = await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    });
    return res.json();
  } */

  /*   function handleDelete(id) {
    //deleteTransactionRequest(id)
    deleteTransaction(id)
      .then(() => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      })
      .catch(console.error);
  } */

  /*   function updateTransaction(id, transaction) {
    fetch(`${BASE_URL}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions((prev) => prev.map((t) => (t.id === id ? data : t)));
      });
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
          <TransactionList
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            updateTransaction={updateTransaction}
          />
        </Container>
      </AppShell>
    </MantineProvider>
  );
}
