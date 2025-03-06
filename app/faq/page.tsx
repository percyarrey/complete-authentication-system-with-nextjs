import React from "react";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

export default function Page() {
  const faqs = [
    {
      question: "How to post codes?",
      answer:
        "Press 'Sell Codes' in the top left corner. Enter your code(s) and press 'Submit Codes'.",
    },
    {
      question: "How much BTC will I get?",
      answer:
        "When you successfully submit a valid code, your balance increases based on your reward rate. When you decide to withdraw, your balance is converted to BTC using the current market BTC exchange rate.",
    },
    {
      question: "Can I post 2 codes or more?",
      answer:
        "Yes, you can send up to 100 codes per one pack. Just one rule: 1 code per 1 line.",
    },
    {
      question: "How fast are the codes processed?",
      answer: "1-20 codes in about 2 minutes. 100 codes in about 8 minutes.",
    },
    {
      question: "Codes are checked. Where is my money?",
      answer:
        "Press on the amount found on the top right. Press 'Withdraw'. Enter the amount, your BTC wallet address, and press 'Pay Out'.",
    },
    {
      question: "Where can I find payout status?",
      answer:
        "Press 'Payouts'. Here you’ll find all your current and previous payouts with TXID information for each transaction.",
    },
    {
      question: "I see incoming on LBC, PAX, but it’s not confirmed.",
      answer:
        "Just wait a little bit. It’ll be fully complete after 2-4 confirmations on Bitcoin’s blockchain.",
    },
    {
      question: "How to change BTC wallet address?",
      answer:
        "During Withdraw, you can enter any wallet address. A Payout Password is required to change the wallet address.",
    },
    {
      question:
        "I have a code in a currency which is not present on your service. Can I send it to you?",
      answer:
        "Yes, just send one code and we will add that currency shortly. You can also contact our support.",
    },
    {
      question:
        "I have codes but don’t remember what currency or value they have.",
      answer:
        "It doesn’t matter. Our system autodetects values and currencies during processing.",
    },
    {
      question:
        "I have codes but don’t remember whether I’ve used them or not.",
      answer:
        "You can post codes like that, but do not overuse it. We can throttle processing of already used/invalid codes.",
    },
    {
      question: "What is Payout Password?",
      answer:
        "This is a second password required to change the BTC wallet address in the Withdraw dialog. You can set or change it on the Settings page. It can’t be the same as your main password. If the Payout Password is not set, it is not possible to change the BTC wallet address.",
    },
    {
      question: "How to change my password?",
      answer:
        "Use 'Change Password' in Settings (found by clicking on your username on the top right).",
    },
    {
      question: "Typical errors after code check",
      answer:
        "If you encounter any errors like 'The Steam Wallet code you have entered does not appear to be activated', contact your retailer for assistance. If the code has already been redeemed, you may not be able to use it again.",
    },
  ];

  return (
    <>
      <section className="py-10">
        <div className="container-lg">
          <Heading as="h2" size="xl" textAlign="center" mb={8}>
            Frequently Asked Questions (FAQ)
          </Heading>
          <Stack>
            {faqs.map((faq, index) => (
              <Box key={index} p={5}>
                <Heading as="h3" size="sm" mb={2}>
                  {faq.question}
                </Heading>
                <Text>{faq.answer}</Text>
              </Box>
            ))}
          </Stack>
        </div>
      </section>
    </>
  );
}
