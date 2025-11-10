import { React, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Table,
  Badge,
  ActionIcon,
  Group,
  Modal,
  Select,
  MultiSelect,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconTrash,
  IconEdit,
  IconCheck,
  IconCurrencyDollar,
  IconCalendar,
  IconPlusMinus,
  IconAlignLeft,
  IconCategory2,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { notifications } from "@mantine/notifications";

function formatCurrency(amount) {
  const absAmount = Math.abs(amount).toFixed(2);
  return amount < 0 ? `-$${absAmount}` : `$${absAmount}`;
}

function formatEditCurrency(amount) {
  return amount < 0
    ? -Math.abs(parseFloat(amount))
    : Math.abs(parseFloat(amount));
}

export default function TransactionTable({ transactions, updateTransaction }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

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

  const moneyIcon = <IconCurrencyDollar size={20} stroke={1.5} />;
  const calendarIcon = <IconCalendar size={20} stroke={1.5} />;
  const plusMinusIcon = <IconPlusMinus size={20} stroke={1.5} />;
  const descriptionIcon = <IconAlignLeft size={20} stroke={1.5} />;
  const categoryIcon = <IconCategory2 size={20} stroke={1.5} />;

  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setDate(dayjs(transaction.date, "YYYY-MM-DD").toDate());
    setDescription(transaction.description);
    setCategory(
      Array.isArray(transaction.category)
        ? transaction.category
        : [transaction.category]
    );
    setAmount(transaction.amount);
    setType(transaction.type);
    open();
  };

  const handleSave = () => {
    const updated = {
      ...editingTransaction,
      date: dayjs(date).format("YYYY-MM-DD"),
      description,
      category,
      amount: formatEditCurrency(amount),
      type,
    };
    updateTransaction(editingTransaction.id, updated);
    close();
    notifications.show({
      icon: <IconCheck size={18} />,
      color: "green",
      title: "Success!",
      message: "Transaction updated",
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit transaction"
        radius={0}
        size="md"
        transitionProps={{ transition: "fade", duration: 100 }}
      >
        <DatePickerInput
          leftSection={calendarIcon}
          clearable
          value={date}
          onChange={setDate}
          label="Pick date"
          placeholder="Pick date"
        />
        <TextInput
          leftSection={descriptionIcon}
          mt="sm"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <MultiSelect
          leftSection={categoryIcon}
          checkIconPosition="right"
          mt="sm"
          label="Category(s)"
          data={[
            "Subscription",
            "Food",
            "Bill",
            "Student loans",
            "Gift",
            "Luxury",
            "Emergency",
            "Pets",
            "Paycheck",
            "Tax return",
          ]}
          value={category}
          onChange={setCategory}
        />

        <NumberInput
          value={amount}
          onChange={setAmount}
          leftSection={moneyIcon}
          thousandSeparator=","
          decimalScale={2}
          fixedDecimalScale
          mt={"sm"}
          label="Amount"
          placeholder="0.00"
        />

        <Select
          leftSection={plusMinusIcon}
          checkIconPosition="right"
          clearable
          value={type}
          onChange={setType}
          mt={"sm"}
          label="Choose transaction type"
          placeholder="Pick value"
          data={["Income", "Expense"]}
        />

        <Group justify="space-between" mt="lg">
          <Button color="red" variant="light">
            Delete
          </Button>
          <Button color="teal" onClick={handleSave}>
            Save changes
          </Button>
        </Group>
      </Modal>
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
            <Table.Tr key={t.id} style={{ position: "relative" }}>
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
                  size="lg"
                  radius="sm"
                  onClick={() => {
                    handleEditClick(t);
                  }}
                  style={{
                    position: "absolute",
                    right: "-32px",
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
                  <IconEdit size={18} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

{
  /* <ActionIcon
                    variant="transparent"
                    color="gray"
                    size="lg"
                    radius="sm"
                    onClick={() => deleteTransaction(hoveredId)}
                    style={{
                      position: "absolute",
                      right: "-58px",
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
                    <IconTrash size={18} />
                  </ActionIcon> */
}
{
  /* </ActionIcon.Group> */
}
