# StackWatch

StackWatch is a website monitoring system inspired by platforms like BetterUptime.

Users can add websites to StackWatch, and the system periodically checks whether each website is **Up** or **Down**. Every monitoring check records the website's status, response time, monitoring region, and timestamp.

The project uses a distributed worker architecture with **Redis Streams**, **PostgreSQL**, **Prisma**, **Node.js**, and **Axios**.

---

## 🚀 Features

- Add websites for monitoring
- Periodically check website availability
- Measure website response time
- Track website status:
  - `Up`
  - `Down`
  - `Unknown`
- Store monitoring history in PostgreSQL
- Redis Streams for distributing monitoring jobs
- Redis Consumer Groups for worker coordination
- Concurrent website health checks
- Support for multiple monitoring regions
- Multiple workers can process monitoring jobs
- Store response time and uptime data for each check

---

## 🏗️ Architecture

StackWatch follows a producer-consumer architecture.

```text
                         ┌─────────────────┐
                         │      User       │
                         │                 │
                         │  Add Website    │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   PostgreSQL    │
                         │                 │
                         │ User            │
                         │ Website         │
                         │ Region          │
                         │ WebsiteTick     │
                         └────────▲────────┘
                                  │
                                  │ Store
                                  │ monitoring result
                                  │
                         ┌────────┴────────┐
                         │     Worker      │
                         │                 │
                         │  Axios Request  │
                         │  Response Time  │
                         │  Status Check   │
                         └────────▲────────┘
                                  │
                                  │ Consume
                                  │
                         ┌────────┴────────┐
                         │ Redis Streams   │
                         │                 │
                         │ Consumer Group  │
                         └────────▲────────┘
                                  │
                                  │ Produce
                                  │
                         ┌────────┴────────┐
                         │    Producer     │
                         │                 │
                         │ Create Monitor  │
                         │ Events          │
                         └─────────────────┘
                         🔄 Monitoring Flow

Every monitoring cycle follows this flow:

1. User adds a website
          │
          ▼
2. Website is stored in PostgreSQL
          │
          ▼
3. Monitoring event is added to Redis Stream
          │
          ▼
4. Worker reads the event
          │
          ▼
5. Worker sends HTTP request using Axios
          │
          ├───────────────┐
          │               │
        Success          Failure
          │               │
          ▼               ▼
       Status Up       Status Down
          │               │
          └───────┬───────┘
                  ▼
6. WebsiteTick is created
   with response time and status
                  │
                  ▼
7. Redis event is acknowledged
⏱️ Monitoring Interval

StackWatch is designed to check monitored websites approximately every 3 minutes.

Every 3 minutes
      │
      ▼
Create monitoring events
      │
      ▼
Redis Stream
      │
      ▼
Monitoring Workers
      │
      ▼
HTTP health checks
      │
      ▼
Store results in PostgreSQL

This allows StackWatch to build a historical record of website availability and response times.

🧰 Tech Stack
Backend
Node.js
TypeScript
Express
Database
PostgreSQL
Prisma ORM
Message Queue / Event Streaming
Redis
Redis Streams
Redis Consumer Groups
Website Monitoring
Axios
Development & Infrastructure
Docker
Docker Compose
pnpm
Turborepo
📦 Project Structure
staackwatch/
│
├── apps/
│   │
│   ├── producer/
│   │   └── ...
│   │
│   └── consumer/
│       ├── src/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   │
│   ├── db/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── ...
│   │
│   └── redisstream/
│       └── ...
│
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
🗄️ Database Schema

StackWatch uses PostgreSQL with Prisma.

User

Stores application users.

User
├── id
├── username
└── password

A user can monitor multiple websites.

User 1 ──────────── N Website
Website

Stores websites that need to be monitored.

Website
├── id
├── url
├── user_id
└── timeAdded

Relationship:

User
  │
  └─────── 1:N ─────── Website
Region

Represents the region from which a website is monitored.

Region
├── id
└── name

Example regions:

India
USA
Europe
WebsiteTick

Stores the result of each website health check.

WebsiteTick
├── id
├── response_time_ms
├── status
├── website_id
├── region_id
└── createdAt

Example:

Website:        www.google.com
Status:         Up
Response Time:  143ms
Region:         India

Relationships:

Website ──────── 1:N ──────── WebsiteTick


Region  ──────── 1:N ──────── WebsiteTick
📡 Redis Streams

Redis Streams are used to distribute monitoring jobs between the producer and workers.

The stream used by the project is:

betterUptime:website

A monitoring event contains the Website ID and URL:

{
  "id": "8ab0af05-99a6-41c0-b2c1-efd8cb572075",
  "url": "www.google.com"
}

The id inside the message is the Website ID stored in PostgreSQL.

Redis separately generates a Stream Event ID such as:

1786707158468-0

These are two different IDs.

Redis Event ID
      │
      └── 1786707158468-0


Website ID
      │
      └── 8ab0af05-99a6-41c0-b2c1-efd8cb572075
👷 Monitoring Worker

Workers are responsible for performing website health checks.

A worker:

Reads monitoring events from Redis
Sends an HTTP request to the website
Measures response time
Determines whether the website is Up or Down
Stores the result in PostgreSQL
Acknowledges the Redis event

Multiple workers can process monitoring events.

                    Redis Stream
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
         Worker 1    Worker 2    Worker 3
             │           │           │
             ▼           ▼           ▼
          Website     Website     Website
           Checks      Checks      Checks

This allows the monitoring system to scale horizontally.

⚡ Concurrent Website Checks

A worker can receive multiple website monitoring events at once.

Instead of checking websites one by one, the worker processes them concurrently using JavaScript Promises.

For example:

Website 1 ───────────┐
Website 2 ───────────┤
Website 3 ───────────┼──► Promise.all()
Website 4 ───────────┤
Website 5 ───────────┘

Promise.all() waits for all website checks to complete while allowing the individual asynchronous operations to run concurrently.

This makes the worker more efficient when monitoring multiple websites.

🔐 Environment Variables

The consumer requires a worker ID and monitoring region ID.

WORKER_ID=1
REGION_ID=<region-id>

Example:

WORKER_ID=1 REGION_ID=<your-region-id> pnpm run dev

The database package uses a PostgreSQL connection string:

DATABASE_URL="postgresql://dev:mypassword@localhost:5432/betterstack"

Never commit real passwords, API keys, or other secrets to GitHub.

🛠️ Getting Started
1. Clone the Repository
git clone <your-repository-url>
cd staackwatch
2. Install Dependencies
pnpm install
3. Start Infrastructure

Start PostgreSQL and Redis using Docker:

docker compose up -d

Check running containers:

docker ps
4. Configure Environment Variables

Configure the required environment variables.

Example:

DATABASE_URL="postgresql://dev:mypassword@localhost:5432/betterstack"

For the monitoring worker:

WORKER_ID=1
REGION_ID=<region-id>
5. Setup Prisma

Run Prisma migrations:

pnpm prisma migrate dev

Generate the Prisma client:

pnpm prisma generate
6. Create a Monitoring Region

Create a region such as:

India

or:

USA

The generated region ID should then be used as:

REGION_ID=<generated-region-id>
7. Start the Producer

Start the producer using the appropriate workspace command:

pnpm run dev
8. Start a Monitoring Worker
WORKER_ID=1 REGION_ID=<region-id> pnpm run dev

Multiple workers can be started using different worker IDs:

WORKER_ID=1 REGION_ID=<region-id> pnpm run dev
WORKER_ID=2 REGION_ID=<region-id> pnpm run dev
📊 Example Monitoring Result

After a successful website check, StackWatch stores a WebsiteTick record:

Website:        www.google.com
Status:         Up
Response Time:  143ms
Region:         India
Created At:     2026-08-18 12:00:00

If the website is unavailable:

Website:        example.com
Status:         Down
Response Time:  5000ms
Region:         India
Created At:     2026-08-18 12:03:00

These records can later be used to calculate uptime percentages and display response-time history.