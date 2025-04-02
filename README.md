# [nexo.systems](https://nexo.systems/a/ari) automatic start

Automatically restarts your (predefined) servers in the event that they are stopped.

## Setup

You can set this up with Docker.
You can retrieve your session token by viewing your cookies using your browser's developer tools. (`NexoSystems_SESSION`)

## Environment variables

| Name             | Description                                           | Default                      |
| ---------------- | ----------------------------------------------------- | ---------------------------- |
| `API_URL`        | URL of the API                                        | `"https://nexo.systems/api"` |
| `SESSION_TOKEN`  | Session token                                         |                              |
| `SERVER_IDS`     | Comma-separated list of server (service) IDs to watch | `""`                         |
| `CHECK_INTERVAL` | Interval in seconds to check the status of the server | `15`                         |
