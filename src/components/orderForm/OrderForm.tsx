// Order Form Component
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import {
  MapPin,
  FileText,
  CreditCard,
  Banknote,
  Smartphone,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { orderApi, ApiError } from '../../services/api';
import { formatCurrency } from '../../utils/currency';
import { Button, EmptyState } from '../ui';
import styles from './OrderForm.module.css';

const OrderSchema = z.object({
  delivery_address: z.string().min(3, 'Please enter a delivery address'),
  notes: z.string().optional(),
  payment_method: z.enum(['cash', 'vodafone_cash', 'mtn_momo', 'card']),
});

type OrderFormType = z.infer<typeof OrderSchema>;

const paymentMethods = [
  { value: 'cash', label: 'Cash on Delivery', icon: Banknote },
  { value: 'mtn_momo', label: 'MTN Mobile Money', icon: Smartphone },
  { value: 'vodafone_cash', label: 'Vodafone Cash', icon: Smartphone },
  { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
] as const;

function OrderForm() {
  const navigate = useNavigate();
  const { cart, summary, clearCart, isEmpty } = useCart();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormType>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      delivery_address: '',
      notes: '',
      payment_method: 'cash',
    },
  });

  const selectedPayment = watch('payment_method');

  const onSubmit = async (data: OrderFormType) => {
    setServerError(null);

    try {
      const orderData = {
        ...data,
        items: cart.map((item) => ({
          product_id: Number(item.product.id),
          quantity: item.quantity,
          price: item.product.price,
        })),
      };

      await orderApi.create(orderData);
      clearCart();
      navigate('/products');
    } catch (error) {
      if (error instanceof ApiError) {
        setServerError(error.message);
      } else {
        setServerError('Failed to create order. Please try again.');
      }
    }
  };

  if (isEmpty) {
    return (
      <div className={styles.emptyContainer}>
        <EmptyState
          icon={<ShoppingBag size={48} />}
          title="No items to checkout"
          description="Add some products to your cart before placing an order."
          actionLabel="Browse Products"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className={styles.orderPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/cart')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.title}>Checkout</h1>
      </div>

      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {serverError && (
            <div className={styles.errorMessage}>{serverError}</div>
          )}

          {/* Delivery Address */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <MapPin size={20} />
              Delivery Address
            </h2>
            <div className={styles.inputGroup}>
              <textarea
                placeholder="Enter your full delivery address"
                className={`${styles.textarea} ${errors.delivery_address ? styles.inputError : ''}`}
                {...register('delivery_address')}
              />
              {errors.delivery_address && (
                <span className={styles.fieldError}>
                  {errors.delivery_address.message}
                </span>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FileText size={20} />
              Order Notes (Optional)
            </h2>
            <div className={styles.inputGroup}>
              <textarea
                placeholder="Any special instructions for your order?"
                className={styles.textarea}
                {...register('notes')}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <CreditCard size={20} />
              Payment Method
            </h2>
            <div className={styles.paymentOptions}>
              {paymentMethods.map(({ value, label, icon: Icon }) => (
                <label
                  key={value}
                  className={`${styles.paymentOption} ${selectedPayment === value ? styles.selected : ''}`}
                >
                  <input
                    type="radio"
                    value={value}
                    {...register('payment_method')}
                    className={styles.radioInput}
                  />
                  <Icon size={20} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <ShoppingBag size={20} />
              Order Summary
            </h2>
            <div className={styles.orderItems}>
              {cart.map((item) => (
                <div key={item.product.id} className={styles.orderItem}>
                  <img
                    src={item.product.image}
                    alt={item.product.productName}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>{item.product.productName}</p>
                    <p className={styles.itemQty}>Qty: {item.quantity}</p>
                  </div>
                  <p className={styles.itemPrice}>
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatCurrency(summary.subtotal)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.discount}`}>
                <span>Discount (10%)</span>
                <span>-{formatCurrency(summary.discount)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span>{formatCurrency(summary.deliveryFee)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span>{formatCurrency(summary.total)}</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={isSubmitting}
          >
            <ShoppingBag size={18} />
            Place Order - {formatCurrency(summary.total)}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
