package com.indira.ecommerce.service;

import com.indira.ecommerce.dto.Purchase;
import com.indira.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
