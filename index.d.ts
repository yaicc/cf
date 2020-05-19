import * as Koa from "koa";
import * as Knex from "knex";
import * as KoaBouncer from "koa-bouncer";
import * as IORedis from "ioredis";

interface ErrorOption {
  code?: 500,
  message?: ''
}

declare namespace cf {

  type OK = 'OK';

  class Redis extends IORedis {
    async read(key: string): Promise<any>;
    async write(key: string, value: any, expire: number): Promise<OK>
  }

  /**
   * Application entry extend Koa.
   */
  export class App extends Koa {
    /**
     * Start the Application
     * @param port port to listen
     */
    run(port: number): void
  }
  
  /**
   * Base controller
   */
  export class Controller {
    constructor(ctx: Koa.Context, next: Koa.Next);
    /**
     * Database instance
     */
    DB: Knex;
    /**
     * Redis instance
     */
    Redis: Redis;
    /**
     * Fetch service of name
     * @param name serveice name
     */
    service(name: string): Service;
    /**
     * Return success messgae with data
     * @param data
     */
    success(data: any): any;
    /**
     * Return error messgae with code & msg
     * @param error
     */
    error(error?: ErrorOption): any;
    /**
     * Fetch param with name from body
     * @param name param name
     */
    getBody(name: string): KoaBouncer.Validator;
    /**
     * Fetch param with name from query
     * @param name param name
     */
    getQuery(name: string): KoaBouncer.Validator;
    /**
     * Fetch/Set state of Context
     * @param key param key
     * @param value param value
     */
    state(key: string, value?: any): any;
  }
  
  /**
   * Base service
   */
  export class Service {
    constructor(ctx: Koa.Context);
    /**
     * Database instance
     */
    DB: Knex;
    /**
     * Redis instance
     */
    Redis: Redis;
    /**
     * Cursor of service talbe
     */
    cursor: Knex.QueryBuilder;
    /**
     * Fetch service of name
     * @param name serveice name
     */
    service(name: string): Service;
  }

  /**
   * Common tool of framework
   */
  export namespace Tool {
    /**
     * Linux timestamp
     */
    function ts(): number;
    /**
     * Encode string with salt
     * @param str string to encode
     * @param salt 
     */
    function authcode(str: string, salt: string): string;
    /**
     * Convert an array of objects to a single object
     * @param arr 
     * @param identifier 
     */
    function arr2Obj(arr: array, identifier: string): object;
    /**
     * Check if a value is a number
     * @param value 
     */
    function isNumber(value: string): boolean;
    /**
     * Wait for an amount of milliseconds
     * @param milliseconds 
     */
    function sleep(milliseconds: number): Promise<any>;
    /**
     * Rand number between given numbers
     * @param min
     * @param max
     */
    function rand(min: number, max: number): number;
  }
}

export = cf;