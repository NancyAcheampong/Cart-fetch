import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const OrderSchema = z.object({
  delivery_address: z.string().min(3, "Address required"),
  notes: z.string().optional(),
  payment_method: z.enum(["cash", "vodafone_cash", "mtn_momo", "card"]),
  items: z.array(
    z.object({
      product_id: z.number().min(1),
      quantity: z.number().min(1),
      price: z.number().min(0)
    })
  ).min(1, "At least one item is required")
});

export type OrderFormType = z.infer<typeof OrderSchema>;


export type OrderItem = {
  product_id: number;
  quantity: number;
  price: number;
};

export type CreateOrderPayload = {
  customer_id: number;
  delivery_address: string;
  notes?: string;
  payment_method: "cash" | "vodafone_cash" | "mtn_momo" | "card";
  items: OrderItem[];
};

function OrderForm() {
const navigate = useNavigate();

  const form = useForm<OrderFormType>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      delivery_address: "",
      notes: "",
      payment_method: "cash",
      items: [
        { product_id: 0, quantity: 1, price: 0 }
      ]
    }
  });

   const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  });

  const onSubmit = async (data: OrderFormType) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Order created!");
        navigate("/orders");
      } else {
        alert(result.error || "Error creating order");
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

    return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="order-form">

      <label>Delivery Address</label>
      <input type="text" {...form.register("delivery_address")} />

      <label>Notes</label>
      <textarea {...form.register("notes")} />

      <label>Payment Method</label>
      <select {...form.register("payment_method")}>
        <option value="cash">Cash</option>
        <option value="mtn_momo">MTN Momo</option>
        <option value="vodafone_cash">Vodafone Cash</option>
        <option value="card">Card</option>
      </select>

      <h3>Order Items</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="item-box">
          <label>Product ID</label>
          <input type="number" {...form.register(`items.${index}.product_id`)} />

          <label>Quantity</label>
          <input type="number" {...form.register(`items.${index}.quantity`)} />

          <label>Price (each)</label>
          <input type="number" {...form.register(`items.${index}.price`)} />

          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ product_id: 0, quantity: 1, price: 0 })
        }
      >
        + Add another item
      </button>

      <button type="submit">Submit Order</button>
    </form>
  );
}

export default OrderForm;