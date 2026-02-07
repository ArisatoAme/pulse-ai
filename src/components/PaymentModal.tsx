import React, { useState } from 'react';
import { X, Lock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message || 'Payment failed');
            setProcessing(false);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            setTimeout(() => {
                setProcessing(false);
                onSuccess();
            }, 1500);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#ffffff',
                                '::placeholder': { color: '#94a3b8' },
                            },
                            invalid: { color: '#ef4444' },
                        },
                    }}
                />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {processing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    "Pay $299.00"
                )}
            </button>
        </form>
    );
};

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-slate-900 border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-slate-400" />
                </button>

                <AnimatePresence mode="wait">
                    {!success ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold font-display mb-2">Secure Checkout</h3>
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Lock className="w-4 h-4" />
                                    <span>Encrypted via Stripe</span>
                                </div>
                            </div>

                            <Elements stripe={stripePromise}>
                                <CheckoutForm onSuccess={() => setSuccess(true)} />
                            </Elements>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20">
                                <Check className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold font-display mb-2">Payment Successful!</h3>
                            <p className="text-slate-400 mb-8">Your order has been confirmed.</p>
                            <button
                                onClick={onClose}
                                className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-xl transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}