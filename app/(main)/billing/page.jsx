"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import WelcomeContainer from "../dashboard/_components/WelcomeContainer";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BillingPage() {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Load PayPal SDK once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("Auth error:", authError.message);
        setLoading(false);
        return;
      }

      const loggedInUser = authData.user;
      if (!loggedInUser) {
        console.warn("No authenticated user found");
        setLoading(false);
        return;
      }

      setUser({
        email: loggedInUser.email,
        name: loggedInUser.user_metadata?.full_name || "User",
      });

      const { data, error } = await supabase
        .from("Users")
        .select("credits, name")
        .eq("email", loggedInUser.email)
        .single();

      if (error && error.code === "PGRST116") {
        const { data: insertData } = await supabase
          .from("Users")
          .insert([
            {
              email: loggedInUser.email,
              name: loggedInUser.user_metadata?.full_name || "New User",
              credits: 0,
            },
          ])
          .select("credits, name")
          .single();
        setCredits(insertData.credits);
        setUser((prev) => ({ ...prev, name: insertData.name }));
      } else if (!error) {
        setCredits(data.credits);
        setUser((prev) => ({ ...prev, name: data.name }));
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const plans = [
    {
      title: "Basic",
      price: "5.00",
      credits: 20,
      features: ["Basic interview templates", "Email support"],
    },
    {
      title: "Standard",
      price: "12.00",
      credits: 50,
      features: ["All interview templates", "Priority support", "Basic analytics"],
    },
    {
      title: "Pro",
      price: "25.00",
      credits: 120,
      features: ["All interview templates", "24/7 support", "Advanced analytics"],
    },
  ];

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <WelcomeContainer/>

      {/* Billing */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Billing</h2>
        <p className="text-gray-500 mb-4">
          Manage your Payment and credits
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Your Credits */}
          <div className="bg-white p-5 rounded-lg shadow flex flex-col justify-between">
            <div>
              <h3 className="font-semibold mb-2">Your Credits</h3>
              <p className="text-gray-500 text-sm mb-4">
                Current usage and remaining credits
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
                <span className="text-blue-600 font-semibold">
                  {credits} interviews left
                </span>
              </div>
            </div>
            <Button className="mt-4 w-full">+ Add More Credits</Button>
          </div>

          {/* Purchase Credits */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-lg shadow flex flex-col"
              >
                <h3 className="font-bold">{plan.title}</h3>
                <p className="text-2xl font-semibold">${plan.price}</p>
                <p className="text-gray-500 mb-4">
                  {plan.credits} interviews
                </p>
                <ul className="flex-1 mb-4 space-y-1 text-sm text-gray-600">
                  {plan.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
                <Button
                  //onClick={() => handlePurchase(plan)}
                  variant={plan.title === "Standard" ? "default" : "outline"}
                >
                  Purchase Credits
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  function handlePurchase(plan) {
    if (!window.paypal) {
      alert("PayPal SDK not loaded yet");
      return;
    }

    // Create container for PayPal popup
    const containerId = "paypal-button-container";
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.style.position = "fixed";
      container.style.top = "50%";
      container.style.left = "50%";
      container.style.transform = "translate(-50%, -50%)";
      container.style.background = "#fff";
      container.style.padding = "20px";
      container.style.zIndex = "9999";
      document.body.appendChild(container);
    }
    container.innerHTML = "";

    window.paypal
      .Buttons({
        createOrder: (_, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: plan.price },
                description: `${plan.credits} interview credits`,
              },
            ],
          });
        },
        onApprove: async (_, actions) => {
          const order = await actions.order.capture();
          console.log("Payment successful:", order);

          const { error } = await supabase
            .from("Users")
            .update({ credits: credits + plan.credits })
            .eq("email", user.email);

          if (error) {
            console.error("Failed to update credits:", error.message);
          } else {
            setCredits((prev) => prev + plan.credits);
            alert("Credits added successfully!");
          }

          container.remove(); // close PayPal container
        },
        onError: (err) => {
          console.error("PayPal error:", err);
          alert("Payment failed.");
          container.remove();
        },
        onCancel: () => {
          container.remove();
        }
      })
      .render(`#${containerId}`);
  }
}
import React from 'react'
