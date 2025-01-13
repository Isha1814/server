import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/router.js';
import connect from './database/conn.js';

const app = express();

/** Load environment variables */
config();

/** App middlewares */
app.use(morgan('tiny'));
app.use(cors({
  origin: 'http://localhost:5000', // Allow requests from client-side
}));
app.use(express.json());

/** Application port */
const port = process.env.PORT || 5000;

/** Routes */
app.use('/api', router);

/** Root endpoint */
app.get('/', (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json({ error: error.message });
  }
});

/** Start server only when we have a valid connection */
connect().then(() => {
  app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
  });
}).catch(error => {
  console.log("Invalid Database Connection:", error.message);
});
