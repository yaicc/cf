import * as Koa from "koa";
import * as Knex from "knex";
import * as KoaBouncer from "koa-bouncer";

interface ErrorOption {
  code?: 500,
  message?: ''
}

declare namespace cf {

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
     * @param data
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
  }
}

export = cf;