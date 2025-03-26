# Another K-Base

+ [Another K-Base](#another-k-base)
  + [Requirements](#requirements)
  + [Configure](#configure)
  + [Start](#start)






## Requirements

+ [Docker Desktop 4.39+](https://www.docker.com/)
+ [Node.js 22+](https://nodejs.org/en)






## Configure

In the `deployment` page:
```bash
  cp .env.sample .env
```

Update credentials in `.env` for your requirements.

In the `backend` page:
```bash
  cp .env.sample .env
```

Update credentials in `.env` for your requirements.






## Start

In the `deployment` page:
```bash
  docker-compose up -d
```

In the `backend` page:
```bash
  npm start
```
