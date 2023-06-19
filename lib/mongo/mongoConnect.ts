import mongoose from "mongoose";

const connectUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@place-project.98ixmv4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectMongo = async () => mongoose.connect(connectUrl);

export default connectMongo;
