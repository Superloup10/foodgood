"use client"
import {useCart} from "@/context/CartContext";
import {useEffect, useState} from "react";
import {Product} from "@/domain/model/product.dto";
import useFetch from "@/hooks/useFetch";
import {Client} from "@/domain/model/client.dto";
import {useParams, useRouter} from "next/navigation";
import {CartItem} from "@/domain/model/cartitem";
import {Locale} from "@/i18n-config";
import {useAuth} from "@/context/AuthContext";

type CartResponse = { message: string };

const fetchProductData = async (name: string) => {
    const response = await fetch(`/api/v1/product?name=${name}`);
    if (!response.ok) {
        throw new Error(`Could not find a product : ${name}!`);
    } else {
        return response.json();
    }
};

export default function CartPage() {
    const [error, setError] = useState("");
    const [data, setData] = useState<{ message: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);
    const {isAuthenticated, client} = useAuth();
    const {cart, clearCart} = useCart();
    const lang = useParams().lang as Locale;
    const router = useRouter();
    // const {data} = useFetch<{ message: string }>("/api/v1/cart", "POST", {client, cart, created_at: currentDate});

    useEffect(() => {
        // Verification quantity product's
        if (isAuthenticated && cart && cart.length > 0) {
            cart.map(async (item) => {
                const product: Product = await fetchProductData(item.product.name);
                if (product.amount < item.quantity) {
                    setError(`Insufficient stock for product: ${product.name}, il reste ${product.amount}.`);
                    item.quantity = product.amount;
                }
            });
            // TODO Add process paiement

            const currentDate = new Date();
            const sendCart = async (cart: CartItem[], client: Client | null, currentDate: Date) => {
                const response = await fetch(`/api/v1/cart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({client, cart, created_at: currentDate})
                });
                if (!response.ok) {
                    const message = await response.json();
                    setError(message);
                } else {
                    return response.json();
                }
            };
            setLoading(true);
            sendCart(cart, client, currentDate).then((response) => {
                setData(response);
                setDone(true);
            }).finally(() => setLoading(false));
        }
    }, [cart, client, isAuthenticated]);

    useEffect(() => {
        if (done && !loading && data && data.message === "Cart added successfully.") {
            clearCart();
            setTimeout(() => router.push(`/${lang}/`), 2000);
        }
    }, [clearCart, data, done, lang, loading, router]);

    if (isAuthenticated) {
        return (
            <div>
                {error && <p>{error}</p>}
                {data && <p>{data.message}</p>}
            </div>
        );
    } else {
        return (
            <></>
        );
    }
};
