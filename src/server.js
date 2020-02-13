import app from './app';

app.listen(process.env.PORT_LISTEN, () => {
  console.log(`Server running on port: ${process.env.PORT_LISTEN}`);
});
