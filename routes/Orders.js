const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const isLoggedIn = require("../middlewares/isLoggedIn");
const verifyRole = require("../middlewares/verifyRole");
const orderController = require("../controllers/orderController");

//place order (Corrected)

router.post(
    "/placeorder", // <-- CORRECTED: Removed ":id" from the URL path
    isLoggedIn,
    verifyRole("Customer"),
    asyncErrorHandler(orderController.createOrder)
);

// 

router.post(
    "/handle-success-response/:id",
    isLoggedIn,
    verifyRole("Customer"),
    asyncErrorHandler(orderController.handleSuccessfulPayment)
);

//update order status
router.put(
    "/update/:id",
    isLoggedIn,
    verifyRole("Restaurant"),
    asyncErrorHandler(orderController.updateOrderStatus)
);
// # pick up order


router.put(
    "/pick/:id",
    isLoggedIn,
    verifyRole("DeliveryMan"),
    asyncErrorHandler(orderController.pickOrder)
);
// # complete Order

router.put(
    "/verify/:id",
    isLoggedIn,
    verifyRole("DeliveryMan"),
    asyncErrorHandler(orderController.completeOrder)
);
// # get past orders


router.get(
    "/past",
    isLoggedIn,
    verifyRole(["DeliveryMan", "Restaurant", "Customer"]),
    asyncErrorHandler(orderController.getPastOrders)
);
// # get current orders

router.get(
    "/current",
    isLoggedIn,
    verifyRole(["DeliveryMan", "Restaurant", "Customer"]),
    asyncErrorHandler(orderController.getCurrentOrders)
);
//get prepared orders


router.get(
    "/prepared",
    isLoggedIn,
    verifyRole("DeliveryMan"),
    asyncErrorHandler(orderController.getPreparedOrders)
);
// cancel order


router.put(
    "/cancel/:id",
    isLoggedIn,
    verifyRole("Customer"),
    asyncErrorHandler(orderController.cancelOrder)
);
// handle payment response

router.put(
    "/handle-payment-response/:id",
    isLoggedIn,
    verifyRole("Customer"),
    asyncErrorHandler(orderController.handlePaymentResponse)
);

router.get(
    "/location",
    isLoggedIn,
    verifyRole(["Customer", "Restaurant", "DeliveryMan"]),
    asyncErrorHandler(orderController.getOrderDistance)
);

// get delivery man's restaurant 's prepared orders
router.get(
    "/currentOrders/:id", // Assuming this 'id' is for deliveryManId
    asyncErrorHandler(orderController.getPreparedOrderByDeliverymanId)
);

module.exports = router;