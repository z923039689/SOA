
const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/users'));

const register = new client.Registry();

register.setDefaultLabels({
  service: 'user-service',
});

client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'user_http_requests_total',
  help: 'Total number of HTTP requests handled by the user service',
  labelNames: ['method', 'route', 'status'],
});


app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();

    const durationMs = Date.now() - start;
    console.log(JSON.stringify({
      service: 'user-service',
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs,
      timestamp: new Date().toISOString()
    }));
  });

  next();
});


app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    console.error('Error generating metrics:', err);
    res.status(500).end();
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
  });
}

module.exports = app;
