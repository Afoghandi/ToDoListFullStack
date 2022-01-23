import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const db = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Mongodb connected');
	} catch (error) {
		console.log(error.message);

		process.exit(1);
	}
};

export default connectDB;
