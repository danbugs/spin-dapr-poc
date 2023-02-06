## spin-dapr-poc

This is a simple proof of concept for using Dapr with a Spin application.

### Prerequisites

- [Docker](https://www.docker.com/)
- [Dapr CLI](https://dapr.io/)
- [Spin CLI](https://www.fermyon.com/spin)

### Running the application

1. Start Dapr

```bash
dapr init
```

2. Build the application

```bash
spin build
```

3. Start the application

```bash
dapr run --app-id spin-dapr-poc --app-port 3000 --dapr-http-port 3500 spin up
```

4. Invoke the application

- Using the test.http file in VS Code, or
- Using the following curl command:

```bash
curl -H "dapr-app-id: spin-dapr-poc" -X GET http://localhost:3500/hello
```

This app creates an entry onto a Redis statestore, and then retrieves that same entry.

The expected output should be something like this:

```
HTTP/1.1 200 OK
Server: fasthttp
Date: Mon, 06 Feb 2023 22:49:43 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 15
Content_type: application/json
Traceparent: 00-af6523bd51865cc5c46a89051d1684dd-20224c208faa5d9e-01
Connection: close

{
  "orderId": 257
}
```

Here's a video demo:

[![Demo](https://img.youtube.com/vi/whatever.jpg)]()
