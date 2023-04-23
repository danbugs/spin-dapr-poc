import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const protocol = "http"
const DAPR_HOST = "localhost"
const port = 3500
const DAPR_STATE_STORE_NAME = 'statestore'
const stateStoreBaseUrl = `${protocol}://${DAPR_HOST}:${port}/v1.0/state/${DAPR_STATE_STORE_NAME}`

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
  const orderId = "257"

  // create a new order
  const orders = [{
    key: orderId.toString(),
    value: { orderId: orderId }
  }];

  const req = await fetch(`${stateStoreBaseUrl}?metadata.contentType=application/json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orders)
    }
  );
    
  const rec = await fetch(`${stateStoreBaseUrl}/${orderId}`);
  const recBody = decoder.decode(await rec.arrayBuffer() || new Uint8Array());

  return {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: encoder.encode(recBody).buffer
  }
}

