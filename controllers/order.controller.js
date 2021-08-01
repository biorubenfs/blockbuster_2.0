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

            const user = await User.findById(userId);

            if (!user) {
                return res.json({ message: 'User doesn\'t exists' });
            }

            // Todo Check if movie Exists.

            // Check if an order with that movie is currently ACTIVE

            endDate.setDate(startDate.getDate() + parseInt(process.env.BASIC_ORDER));

            const newOrder = {
                movie_id: movieId,
                user_id: userId,
                status: 'ACTIVE',
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
            }

            const result = await Order.create(newOrder);

            res.json(formatObject(result));

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    listUserOrders: async (req, res) => {

        console.log('here')

        try {

            const userId = req.token.id;

            const user = await User.findById(userId);

            if (!user) {
                return res.json({ message: 'User doesn\'t exists' });
            }

            const results = await Order.find({ user_id: userId }).select({ '_id': 0 }).populate('movie_id', 'title');
            // const results = await Order.find({ user_id: userId }).populate('movie_id', 'title');

            console.log(await Movie.findById(results.movie_id));

            console.log(results);

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

            res.json(formatObject(order));

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
            res.status(400).json({ message: error.message });
        }
    }
}