import express from 'express';

const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + Typescript'));

app.post('/meetings', (req, res) => {
  return res.send('create a meeting')
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
