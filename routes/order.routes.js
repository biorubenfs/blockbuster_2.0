import { Router } from 'express';
import { orderController } from "../controllers/order.controller.js";

const orderRoutes = Router();

orderRoutes.post('/', orderController.createOrder);
orderRoutes.get('/', orderController.listUserOrders);
orderRoutes.get('/:id', orderController.getOrder);
orderRoutes.put('/:id', orderController.cancelOrder);

export default orderRoutes;