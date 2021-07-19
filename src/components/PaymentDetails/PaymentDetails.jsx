import './PaymentDetails.scss';
import { FormInput, Button } from '../Forms';
import { CountryDropdown } from 'react-country-region-selector';
import { useState,useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiInstance } from '../../utils';
import { selectCartTotal,selectCartItemsCount,selectCartItems } from '../../redux/slices/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveOrderHistoryStart} from '../../redux/slices/orderSlice'
const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
}
const configCardElement = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px'
      }
    },
    hidePostalCode: true
  };
const PaymentDetails = () => {
    const history = useHistory();
    const total = useSelector(selectCartTotal);
    const itemCount = useSelector(selectCartItemsCount);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const [billingAddress, setBillingAddress] = useState({...initialAddressState})
    const [shippingAddress, setShippingAddress] = useState({...initialAddressState})
    const [recipientName, setRecipientName] = useState("")
    const [nameOnCard, setNameOnCard] = useState("");
    useEffect(() => {
        if (itemCount < 1) {
            history.push('/dashboard');
        }
    },[itemCount,history])
    const handleShipping = e => {
        const { name, value } = e.target;
        setShippingAddress({...shippingAddress, [name]:value})
    }
    
    const handleBilling = e => {
        const { name, value } = e.target;
        setBillingAddress({...billingAddress, [name]:value})
    }
    const handleFormSubmit = async e => {
        e.preventDefault();
        const cardElement = elements.getElement('card');
        if (
            !shippingAddress.line1 || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.postal_code ||
            !shippingAddress.country || !billingAddress.line1 ||
            !billingAddress.city || !billingAddress.state ||
            !billingAddress.postal_code || !billingAddress.country ||
            !recipientName || !nameOnCard
          ) {
            return;
        }
        
        debugger;
        apiInstance.post('/payments/create', {
            amount: total * 100,
            shipping: {
                name: recipientName,
                address: {
                    ...shippingAddress
                }
            }
        }).then(({ data: clientSecret }) => {
      
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: nameOnCard,
                    address: {
                        ...billingAddress
                    }
                }
            }).then(({ paymentMethod }) => {
      
                stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                }).then(({ paymentIntent }) => {
                    const configOrder = {
                        orderTotal: total,
                        orderItems: cartItems.map((item, i) => {
                            const { documentID,productThumbnail,productName,productPrice,quantity } = item;
                            return {
                                documentID,productThumbnail,productName,productPrice,quantity
                            }
                        })
                    }
                   dispatch(saveOrderHistoryStart(configOrder))
                })
            })
        })
        
    }       
    return (
        <div className="paymentDetails">
            <form onSubmit={handleFormSubmit}>
                <div className="group">
                    <h2>Shipping Address</h2>
                    <FormInput type="text" placeholder="Recipient Name" value={recipientName} name="recipientName" handleChange={(e) => setRecipientName(e.target.value)} required/>
                    <FormInput type="text" placeholder="Address Line 1" value={shippingAddress.line1} name="line1" handleChange={(e) => handleShipping(e)} required/>
                    <FormInput type="text" placeholder="Address Line 2" value={shippingAddress.line2} name="line2" handleChange={e => handleShipping(e)} />
                    <FormInput type="text" placeholder="City" value={shippingAddress.city} name="city" handleChange={e => handleShipping(e)} required/>
                    <FormInput type="Text" placeholder="State" value={shippingAddress.state} name="state" handleChange={e => handleShipping(e)}
                    required/>
                    <FormInput type="text" placeholder="Zip" value={shippingAddress.postal_code} name="postal_code" handleChange={e => handleShipping(e)} required/>
                    <div className="formRow checkoutInput">
                        <CountryDropdown valueType="short" value={shippingAddress.country} onChange={val => handleShipping({
                            target: {
                                name: "country",
                                value: val
                            }
                        })} required/>
                        </div>
                </div>
                <div className="group">
                    <h2>Billing Address</h2>
                    <FormInput type="text" placeholder="Name on Card" value={nameOnCard} name="nameOnCard" handleChange={(e) => setNameOnCard(e.target.value)} required/>
                    <FormInput type="text" placeholder="Address Line 1" value={billingAddress.line1} name="line1" handleChange={e => handleBilling(e)} required/>
                    <FormInput type="text" placeholder="Address Line 2" value={billingAddress.line2} name="line2" handleChange={e => handleBilling(e)} />
                    <FormInput type="text" placeholder="City" value={billingAddress.city} name="city" handleChange={e => handleBilling(e)} required/>
                    <FormInput type="Text" placeholder="State" value={billingAddress.state} name="state" handleChange={e => handleBilling(e)} required/>
                    <FormInput type="text" placeholder="Zip" value={billingAddress.postal_code} name="postal_code" handleChange={e => handleBilling(e)} required/>                   <div className="formRow checkoutInput">
                        <CountryDropdown valueType="short" value={billingAddress.country} onChange={val => handleBilling({
                            target: {
                                name: "country",
                                value: val
                            }
                        })}  required/>
                        </div>
                </div>
                <div className="group">
                    <h2>Card Details</h2>
                    <CardElement options={configCardElement}/>
                </div>
                <Button type="submit">Pay Now</Button>
            </form>
        </div>
    )
}

export default PaymentDetails
