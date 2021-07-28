import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';

export const orderController = {

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

            const results = await Order.find({ user_id: userId });

            res.json(results);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getOrder: async (req, res) => {

        console.log(req.token.id);

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