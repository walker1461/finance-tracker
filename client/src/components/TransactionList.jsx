import React from "react";
import { Table, Badge } from "@mantine/core";

function formatCurrency(amount) {
  const absAmount = Math.abs(amount).toFixed(2);
  return amount < 0 ? `-$${absAmount}` : `$${absAmount}`;
}

export default function TransactionList({ transactions }) {
  const categoryColors = {
    Subscription: "violet.3",
    Food: "orange.3",
    Bill: "red.4",
    "Student loans": "grape.3",
    Gift: "pink.4",
    Luxury: "yellow.3",
    Emergency: "red.3",
    Pets: "teal.2",
    Paycheck: "green.3",
    "Tax return": "lime.3",
  };

  const rows = transactions.map((transaction) => (
    <Table.Tr key={transaction.description}>
      <Table.Td>{transaction.date}</Table.Td>
      <Table.Td>{transaction.description}</Table.Td>
      <Table.Td>
        {Array.isArray(transaction.category)
          ? transaction.category.map((cat) => (
              <Badge
                key={cat}
                size="lg"
                radius="sm"
                variant="light"
                mr="xs"
                mt="xs"
                mb="xs"
                color={categoryColors[cat] || "gray"}
                style={{
                  opacity: 0.9,
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.opacity = 1;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.opacity = 0.9;
                }}
              >
                {cat}
              </Badge>
            ))
          : transaction.category}
      </Table.Td>
      <Table.Td align="right">
        <Badge
          color={transaction.type === "Income" ? "green" : "red"}
          variant="dot"
          size="lg"
          radius={4}
        >
          {formatCurrency(transaction.amount, transaction.type)}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Categories</Table.Th>
          <Table.Th style={{ textAlign: "right" }}>Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
