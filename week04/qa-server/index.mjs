// import
import express from 'express';
import morgan from 'morgan';
import { getQuestion } from './dao.mjs';

// init
const app = express();
const port = 3001;

// middleware
app.use(express.json());
app.use(morgan('dev'));

/* ROUTES */

// GET /api/questions/<id>
app.get('/api/questions/:id', async (request, response) => {
  try {
    const question = await getQuestion(request.params.id);
    if(question.error) {
      response.status(404).json(question);
    } else {
      response.json(question);
    }
  }
  catch {
    response.status(500).end();
  }
});

// start the server
app.listen(port, () => {console.log('API server started...')});