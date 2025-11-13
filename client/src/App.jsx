import {
  AppShell,
  Container,
  Title,
  Divider,
  MantineProvider,
  Space,
} from "@mantine/core";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { useTransactions } from "./hooks/useTransactions";

export default function App() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } =
    useTransactions();

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
