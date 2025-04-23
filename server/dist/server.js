const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
app.use(express.static('../client/dist'));
app.use(express.json());
// ✅ Add root test route
app.get('/', (req, res) => {
    res.send('API is running!');
});
// Mount all routes (auth + API)
app.use(routes);
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
