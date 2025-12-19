import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY, NODE_ENV } from '../config/env.js'

const isProd = NODE_ENV === 'production'

const aj = arcjet({
    key: ARCJET_KEY,
    rules: [
      shield({ mode: isProd ? "LIVE" : "DRY_RUN" }),
      detectBot({
        mode: isProd ? "LIVE" : "DRY_RUN",
        allow: [
          "CATEGORY:SEARCH_ENGINE",
          // "CLIENT:POSTMAN"
        ],
      }),
      tokenBucket({
        mode: isProd ? "LIVE" : "DRY_RUN",
        refillRate: 5, // Refill 5 tokens per interval
        interval: 10, // Refill every 10 seconds
        capacity: 10, // Bucket capacity of 10 tokens
      }),
    ],
  });

export default aj;