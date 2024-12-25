import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config()

if (!process.env.PORT) {
    console.error('Error to get ports');
    process.exit(1);
}

const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
