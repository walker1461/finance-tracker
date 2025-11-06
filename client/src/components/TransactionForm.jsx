import React, { useState } from "react";
import {
  Center,
  TextInput,
  Button,
  Container,
  MultiSelect,
  Select,
  NumberInput,
  Fieldset,
} from "@mantine/core";
import dayjs from "dayjs";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import {
  IconCheck,
  IconCurrencyDollar,
  IconCalendar,
  IconPlusMinus,
  IconAlignLeft,
  IconCategory2,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export default function TransactionForm({ addTransaction }) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  const moneyIcon = <IconCurrencyDollar size={20} stroke={1.5} />;
  const calendarIcon = <IconCalendar size={20} stroke={1.5} />;
  const plusMinusIcon = <IconPlusMinus size={20} stroke={1.5} />;
  const descriptionIcon = <IconAlignLeft size={20} stroke={1.5} />;
  const categoryIcon = <IconCategory2 size={20} stroke={1.5} />;

  const isFormComplete =
    date && description && category.length > 0 && type && amount;

  function handleSubmit(e) {
    e.preventDefault();

    const formattedAmount =
      type === "Expense"
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

    const newTransaction = {
      id: Date.now(),
      date: dayjs(date).format("YYYY-MM-DD"),
      description,
      category,
      amount: formattedAmount,
      type,
    };

    addTransaction(newTransaction);

    notifications.show({
      icon: <IconCheck size={18} />,
      color: "green",
      title: "Success!",
      message: "Transaction added",
    });

    setDescription("");
    setCategory([]);
    setAmount("");
    setType(null);
    setDate(new Date());
  }

  return (
    <Container>
      <Fieldset legend="New transaction">
        <form onSubmit={handleSubmit}>
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
            placeholder="Brief description of the transaction"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <MultiSelect
            leftSection={categoryIcon}
            checkIconPosition="right"
            mt="sm"
            label="Category(s)"
            placeholder="Choose one or more category"
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

          <Center>
            <Button
              color={"cyan"}
              type="submit"
              variant="light"
              mt="lg"
              disabled={!isFormComplete}
            >
              Add transaction
            </Button>
          </Center>
        </form>
      </Fieldset>
    </Container>
  );
}
