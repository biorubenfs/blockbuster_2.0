import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import bodyValidator from '../middlewares/bodyValidator.js';
import newOrderSchema from '../schemas/order/newOrderSchema.js';

const orderRoutes = Router();

orderRoutes.post('/', bodyValidator(newOrderSchema), orderController.createOrder);
orderRoutes.get('/', orderController.listUserOrders);
orderRoutes.get('/:id', orderController.getOrder);
orderRoutes.put('/:id', orderController.cancelOrder);

export default orderRoutes;