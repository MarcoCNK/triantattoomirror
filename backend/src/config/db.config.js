import mongoose from 'mongoose'
import createProducts from '../helpers/scripts/seedMongod.js'
import Product from '../models/product.models.js';
import ENVIRONMENT from "./environment.js"

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log("Database connected");

    // Seed products if not already seeded
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await createProducts();
    } else {
      console.log("Products already exist. Skipping seeding.");
    }

    console.log("Server setup complete.");
})
.catch((err) => {
    console.error('Database connection error:', err)
})

export default mongoose