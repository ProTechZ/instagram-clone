const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'my-session',
    secret: ['COOKIE_SECRET'],
    httpOnly: true,
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

export default app;
