package com.indira.ecommerce.dto;

import com.indira.ecommerce.entity.Address;
import com.indira.ecommerce.entity.Customer;
import com.indira.ecommerce.entity.Order;
import com.indira.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;


}
