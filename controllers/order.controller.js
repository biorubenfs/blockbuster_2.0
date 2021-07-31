import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';

import { formatObject } from '../utils/utils.js';

export const orderController = {

    cronUpdatedOrder: async () => {

        try {
            const orders = await Order.find({ status: 'ACTIVE' });

            for await (const order of orders) {

                const today = new Date();
                const foo = new Date(order.end_date)

                if (foo < today) {
                    order.status = 'EXPIRED';
                    order.save();
                    console.log(`Order ${order._id} has change its status to EXPIRED`);
                }

            }

        } catch (error) {
            console.log(`Order status could not be updated. Error: ${error.message}`);
        }
    },

    createOrder: async (req, res) => {

        try {

            const movieId = req.body.movieId;
            const userId = req.token.id;
            const startDate = new Date();
            const endDate = new Date();

            endDate.setDate(startDate.getDate() + parseInt(process.env.BASIC_ORDER));

            const newOrder = {
                movie_id: movieId,
                user_id: userId,
                status: 'ACTIVE',
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
            }

            res.json(await Order.create(newOrder));

        } catch (error) {
            res.send(400).json({ message: error.message });
        }
    },

    listUserOrders: async (req, res) => {

        try {

            const userId = req.token.id;

            const results = await Order.find({ user_id: userId }).select({ '_id': 0 }).populate('movie_id', 'title');

            res.json(results.map(formatObject));

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getOrder: async (req, res) => {

        try {

            const orderId = req.params.id;
            const userId = req.token.id;

            const order = await Order.findOne({ _id: orderId, user_id: userId });

            res.json(order);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    cancelOrder: async (req, res) => {

        try {

            const orderId = req.params.id;
            const userId = req.token.id;

            const newStatus = await Order.findOneAndUpdate({ _id: orderId, user_id: userId }, { status: 'CANCELED' }, { new: true });

            res.json(newStatus);

        } catch (error) {

        }
    }
}