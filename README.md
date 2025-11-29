🧩 SOA Final Project – Microservices, Kubernetes, CI/CD & Monitoring

Seneca College – Business Information Technology
Course: SOA (Service-Oriented Architecture)

📌 Project Overview

This project demonstrates a complete microservices architecture, implemented in three stages:

✅ Part 1: Microservices Design & Dockerization
✅ Part 2: Kubernetes Deployment (Minikube / Docker Desktop K8s)
✅ Part 3: Testing, CI/CD & Monitoring (Prometheus + Grafana + Loki)

The system includes two independent Node.js microservices:

User Service

Product Service

Each service runs independently, has its own API, and is deployed in Kubernetes through custom deployment YAML files.

🧱 Part 1 – Microservices Implementation & Dockerization
1️⃣ Microservices Implemented
User Service

Handles:

User creation

Basic profile queries
Routes served under: /api/users

Product Service

Handles:

Product creation

Product listing
Routes served under: /api/products

2️⃣ Dockerization

Each microservice includes:

Dockerfile

.dockerignore

Independent Node environment

Example Dockerfile:

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]


Both containers are orchestrated with:

docker-compose.yml

Used in Part 1 for local development.

☸️ Part 2 – Kubernetes Deployment

All microservices were containerized and deployed to Kubernetes using:

Deployments

Services (NodePort)

ConfigMaps & Secrets

K8s networking / service discovery

Folder:

k8s/
  ├── product-deployment.yaml
  ├── product-service.yaml
  ├── user-deployment.yaml
  ├── user-service.yaml

Example Deployment (Product Service)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: product-service
  template:
    metadata:
      labels:
        app: product-service
    spec:
      containers:
        - name: product-service
          image: product-service:latest
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 5000

Example Service (NodePort)
apiVersion: v1
kind: Service
metadata:
  name: product-service
spec:
  type: NodePort
  selector:
    app: product-service
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000

✔ Successful K8s Deployment

Verified using:

kubectl get pods
kubectl get svc


Both services were reachable and testable using Postman.

🧪 Part 3 – Automated Testing, CI/CD & Monitoring
1️⃣ Automated Testing (Jest)

Each microservice includes:

Unit tests

API endpoint (integration) tests

Folder:

tests/
  ├── user.unit.test.js
  ├── user.api.test.js
  ├── product.unit.test.js
  ├── product.api.test.js


Run all tests:

npm test


All tests passed successfully.

2️⃣ CI/CD Pipeline (GitHub Actions)

GitHub Actions workflow included:

Install dependencies

Run unit & integration tests

Build Docker images

(Optional) Push to registry

Apply Kubernetes manifests

Workflow file (.github/workflows/ci.yml) example:

name: Node.js CI

on:
  push:
    branches: [ "main" ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install --production=false
      - name: Run tests
        run: npm test

3️⃣ Monitoring with Prometheus + Grafana

To monitor the microservices, prom-client metrics were added.

/metrics endpoint was added to both services:
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

Prometheus Deployment (Helm)
helm install prom prometheus-community/kube-prometheus-stack


Prometheus successfully scraped:

product-service

user-service

Example Prometheus Target Status

(Your screenshot was green ✓)

4️⃣ Centralized Logging (Loki + Promtail + Grafana)

Installed using Helm:

helm install loki grafana/loki-stack


Promtail automatically collected:

Pod logs

Container logs

Application logs from Node.js

Grafana visualization:

Loki added as a data source

Logs viewable with queries:

{service="product-service"}
{service="user-service"}

📊 Summary of Achievements
Part	Completed?	Description
Part 1	✔️	Microservices built, Dockerized, functioning
Part 2	✔️	Fully deployed to Kubernetes via deployments & NodePorts
Part 3	✔️	Tests, CI/CD, Prometheus monitoring, Loki logging all completed
