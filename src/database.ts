import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost/typescript-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to DB'))
  .catch(e => console.error(e));
