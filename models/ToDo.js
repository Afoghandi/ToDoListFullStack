import mongoose from 'mongoose';

const ToDoSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		content: {
			type: String,
			required: true,
		},
		complete: {
			type: Boolean,
			default: false,
		},
		completedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

// export the model

export default mongoose.model('ToDo', ToDoSchema);
