import express, {Express} from 'express';

const app: Express = express();
const PORT = 8091;



app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

