import { PaymentDetails } from "../../components"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { publishableKey } from "../../stripe/config"

const stripePromise = loadStripe(publishableKey);
const Payment = () => {
    return (
            <Elements stripe={stripePromise}>
            <PaymentDetails />
            </Elements>        
        
    )
}

export default Payment
