import { NextResponse } from "next/server";
import { validateCartItems } from "use-shopping-cart/utilities";

import { stripe } from "@/lib/stripe";
import { stripeChecokoutInventory } from "@/config/inventory";

export async function POST(request: Request) {
  try {
    const cartDetails = await request.json();

    // Pulls price from stripeChecokoutInventory file for safety reasons. These data fields are also used for checkout page layout
    const lineItems = validateCartItems(stripeChecokoutInventory, cartDetails);
    const origin = request.headers.get("origin");

    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        { shipping_rate: process.env.STRIPE_SHIPPING_RATE_ID },
      ],

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=true`,
    });
    return NextResponse.json(session);
  } catch (error) {
    console.log(error);
  }
}
