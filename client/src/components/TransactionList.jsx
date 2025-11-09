import { React, useState } from "react";
import { Table, Badge, ActionIcon, Group, Stack } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

function formatCurrency(amount) {
  const absAmount = Math.abs(amount).toFixed(2);
  return amount < 0 ? `-$${absAmount}` : `$${absAmount}`;
}

export default function TransactionTable({ transactions, deleteTransaction }) {
  const [hoveredId, setHoveredId] = useState(null);
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

  return (
    <div style={{ position: "relative" }}>
      <Table
        highlightOnHover
        withColumnBorders={false}
        verticalSpacing="sm"
        style={{ width: "100%" }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Categories</Table.Th>
            <Table.Th style={{ textAlign: "right" }}>Amount</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {transactions.map((t) => (
            <Table.Tr
              key={t.id}
              onMouseEnter={() => setHoveredId(t.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ position: "relative" }}
            >
              <Table.Td>{t.date}</Table.Td>
              <Table.Td>{t.description}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  {Array.isArray(t.category)
                    ? t.category.map((cat) => (
                        <Badge
                          key={cat}
                          variant="light"
                          size="lg"
                          radius="sm"
                          color={categoryColors[cat] || "gray"}
                          styles={{
                            opacity: 0.9,
                            fontWeight: 600,
                          }}
                        >
                          {cat}
                        </Badge>
                      ))
                    : t.category}
                </Group>
              </Table.Td>
              <Table.Td style={{ textAlign: "right" }}>
                <Badge
                  color={t.type === "Income" ? "green" : "red"}
                  variant="dot"
                  size="lg"
                  radius={4}
                >
                  {formatCurrency(t.amount, t.type)}
                </Badge>

                <ActionIcon
                  variant="transparent"
                  color="gray"
                  size="md"
                  radius="sm"
                  onClick={() => deleteTransaction(hoveredId)}
                  style={{
                    position: "absolute",
                    right: "-28px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.4,
                    transition: "opacity 0.15s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = 0.9;
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = 0.4;
                    e.currentTarget.style.transform = "translateY(-50%)";
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
