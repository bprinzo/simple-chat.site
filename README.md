# Simple Chat SITE

A simple chat Site using websockets implemented using the Next.Js framework


## Built With

* [Next.Js](https://nextjs.org/)

## Getting Started

### Prerequisites

* Node.js
* Docker

**Node.js v16x**

```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs

```
 * Windows download and install the .msi [Node.js](https://nodejs.org/en/)
**Docker v3.x**

```
# Using Ubuntu
sudo apt-get update
sudo apt-get install ./docker-desktop-<version>-<arch>.deb

```
 * Windows download and install the .exe [Docker](https://docs.docker.com/desktop/install/windows-install/)

 ### Installation instructions

1. Clone the repo

```git clone https://github.com/bprinzo/simple-chat.site```

2. Install Yarn packages

```
yarn
```
  Or with Npm:
  ```
  npm install
  ``` 
3. Create a yml docker-compose file on a upper level than the project folder with the following configs
```
version: "3"
services:
  postgres:
    image: postgres
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: simple_chat
      POSTGRES_DB: simple_chat
    ports:
      - 5432:5432
    volumes:
      - postgres-simple_chat-data:/var/lib/postgresql/data
    networks:
      - simple-chat-network

  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com.br
      PGADMIN_DEFAULT_PASSWORD: admin
    restart: unless-stopped
    ports:
      - 16543:80
    depends_on:
      - postgres
    networks:
      - simple-chat-network
  api:
    build:
      context: simple-chat.api
      dockerfile: Dockerfile
    command: yarn start:dev
    restart: on-failure
    ports:
      - 3333:3333
    env_file:
      - ./simple-chat.api/.env
    environment:
      DATABASE_HOST: postgres

    volumes:
      - ./usr/src/app:/api
    depends_on:
      - postgres
    networks:
      - simple-chat-network

  front:
    build:
      context: simple-chat.site
      dockerfile: Dockerfile
    command: yarn dev
    restart: on-failure
    ports:
      - 3000:3000
    env_file:
      - ./simple-chat.site/.env
    volumes:
      - ./usr/src/app:/site
    networks:
      - simple-chat-network
volumes:
  postgres-simple_chat-data:
    driver: local
networks:
  simple-chat-network:
```

The folder structure of the project should look like the following

```
.
└── root/
    ├── docker-compose.yml
    └── simple-chat.site/
```

4. Create the containers using the command
```
docker-compose up -d
```
If running locally disable the sistemas-distribuidos-project_front to avoid port conflicts, both the api and the database will be run in the docker this way

6. Start the Application
```
yarn dev
```
    
Or with Npm

```
npm run dev
```


 ### Container instructions
 1. Clone the repo repos

```git clone https://github.com/bprinzo/simple-chat.api```
and
```git clone https://github.com/bprinzo/simple-chat.site```

2. Install Yarn packages of both projects by going to the newly created directory

```
yarn
```
  Or with Npm:
  ```
  npm install
  ``` 
3. Create a yml docker-compose file on a upper level than both of the projects folders with the following configs
```
version: "3"
services:
  postgres:
    image: postgres
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: simple_chat
      POSTGRES_DB: simple_chat
    ports:
      - 5432:5432
    volumes:
      - postgres-simple_chat-data:/var/lib/postgresql/data
    networks:
      - simple-chat-network

  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com.br
      PGADMIN_DEFAULT_PASSWORD: admin
    restart: unless-stopped
    ports:
      - 16543:80
    depends_on:
      - postgres
    networks:
      - simple-chat-network
  api:
    build:
      context: simple-chat.api
      dockerfile: Dockerfile
    command: yarn start:dev
    restart: on-failure
    ports:
      - 3333:3333
    env_file:
      - ./simple-chat.api/.env
    environment:
      DATABASE_HOST: postgres

    volumes:
      - ./usr/src/app:/api
    depends_on:
      - postgres
    networks:
      - simple-chat-network

  front:
    build:
      context: simple-chat.site
      dockerfile: Dockerfile
    command: yarn dev
    restart: on-failure
    ports:
      - 3000:3000
    env_file:
      - ./simple-chat.site/.env
    volumes:
      - ./usr/src/app:/site
    networks:
      - simple-chat-network
volumes:
  postgres-simple_chat-data:
    driver: local
networks:
  simple-chat-network:

```
The folder structure of the project should look like the following

```
.
└── root/
    ├── docker-compose.yml
    ├── simple-chat.site/
    └── simple-chat.api/
```

4. Create the containers using the command
```
docker-compose up -d
```