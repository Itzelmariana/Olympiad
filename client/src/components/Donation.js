import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const ButtonWrapper = ({ currency }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency]);

 
     return (<PayPalButtons
        fundingSource="paypal"
        style={{"layout":"vertical","label":"donate"}}
        disabled={false}
        createOrder={(data, actions) => {
            return actions.order
                .create({
                    purchase_units: [
                        {
                            amount: {
                                value: "2",
                                breakdown: {
                                    item_total: {
                                        currency_code: "USD",
                                        value: "2",
                                    },
                                },
                            },
                            items: [
                                {
                                    name: "donation-example",
                                    quantity: "1",
                                    unit_amount: {
                                        currency_code: "USD",
                                        value: "2",
                                    },
                                    category: "DONATION",
                                },
                            ],
                        },
                    ],
                })
                .then((orderId) => {
                    // Your code here after create the donation
                    return orderId;
                });
        }}
    />
     );
} 

 export default function App() {
     return (
        <div
             style={{ maxWidth: "750px", minHeight: "200px" }}
        >
            <PayPalScriptProvider
                options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "USD"
                }}
            >
                <ButtonWrapper
                    currency={"USD"}
                />
            </PayPalScriptProvider>
        </div>
    );
 }