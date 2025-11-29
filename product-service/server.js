const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/products', require('./routes/products'));

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
  });
}

module.exports = app;
