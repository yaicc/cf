import * as Koa from "koa";
import * as Knex from "knex";
import * as KoaBouncer from "koa-bouncer";

interface ErrorOption {
  code?: 500,
  message?: ''
}

declare namespace cf {
  export class App extends Koa {
    run(port: number): void
  }
  
  export class Controller {
    constructor(ctx: Koa.Context, next: Koa.Next);
    DB: Knex;
    service(name: string): Service;
    success(r: any): any;
    error(r?: ErrorOption): any;
    getBody(name: string): KoaBouncer.Validator;
    getQuery(name: string): KoaBouncer.Validator;
  }
  
  export class Service {
    constructor(ctx: Koa.Context);
    cursor: Knex.QueryBuilder;
    service(name: string): Service;
  }

  export namespace Tool {
    function ts(): number;
    function authcode(str: string, salt: string): string;
    function arr2Obj(arr: array, identifier: string): object;
    function isNumber(value: string): boolean;
    function sleep(milliseconds: number): Promise<any>;
  }
}

export = cf;