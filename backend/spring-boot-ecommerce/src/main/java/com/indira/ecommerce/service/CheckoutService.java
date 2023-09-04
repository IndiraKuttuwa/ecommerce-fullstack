package com.indira.ecommerce.service;

import com.indira.ecommerce.dto.PaymentInfo;
import com.indira.ecommerce.dto.Purchase;
import com.indira.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
