"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedisClient = exports.client = void 0;
const redis_1 = require("redis");
function createRedisClient() {
    try {
        let newClient = (0, redis_1.createClient)();
        newClient.connect();
        newClient.on("connect", () => console.log("Redis Client connected"));
        exports.client = newClient;
    }
    catch (error) {
        let message = "Unknown Error";
        if (error instanceof Error)
            message = error.message;
        console.log(message);
    }
}
exports.createRedisClient = createRedisClient;
// export class Redis {
//   private static instance: Redis;
//   public client!: RedisClientType;
//   constructor() {
//     this.createClient();
//   }
//   private createClient() {
//     try {
//       this.client = createClient();
//       this.client.on('connect', msg => console.log('Redis Client connected', msg));
//       console.log('Redis client created successfully>>>>>>>>>>>>>>>>>>>>>>>>>!');
//     } catch (error) {
//         let message = "Unknown Error";
//         if (error instanceof Error) message = error.message;
//         console.log(message);
//     }
//   }
//   public async run() {
//     try {
//       this.createClient();
//       await this.client.connect();
//     } catch (error) {
//         let message = "Unknown Error";
//         if (error instanceof Error) message = error.message;
//         console.log(message);
//     }
//   }
//   public async stop() {
//     try {
//       await this.client.disconnect();
//     } catch (error) {
//       let message = "Unknown Error";
//       if (error instanceof Error) message = error.message;
//       console.log(message);
//     }
//   }
// }
