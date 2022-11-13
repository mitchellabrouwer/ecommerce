import prisma from "../../../lib/prisma";

/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const stripe_session = await stripe.checkout.sessions.retrieve(req.body.session_id);

  await prisma.order.create({
    data: {
      customer: stripe_session.customer_details,
      products: stripe_session.display_items,
      payment_intent: stripe_session.payment_intent,
      amount: parseInt(stripe_session.amount_total),
    },
  });

  return res.end();
};
