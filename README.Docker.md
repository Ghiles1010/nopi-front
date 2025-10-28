# Frontend Docker Setup

## Build the Docker image

```bash
docker build -t lmnp-frontend .
```

## Run the container

```bash
docker run -d \
  --name lmnp-frontend \
  -p 80:80 \
  lmnp-frontend
```

The frontend expects the backend to be running at `http://localhost:3001` by default.

To configure a different backend URL, use environment variables during build:

```bash
# Build with custom backend URL
docker build --build-arg VITE_API_URL=http://your-backend-url:3001 -t lmnp-frontend .

# Or build normally and set via .env file
echo "VITE_API_URL=http://your-backend-url:3001" > .env
docker build -t lmnp-frontend .
docker run -d --name lmnp-frontend -p 80:80 lmnp-frontend
```

## View logs

```bash
docker logs -f lmnp-frontend
```

## Stop and remove container

```bash
docker stop lmnp-frontend
docker rm lmnp-frontend
```

