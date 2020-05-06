import * as Koa from "koa";
import * as Knex from "knex";
import * as KoaBouncer from "koa-bouncer";

type Error<T = any> = { [code: string]: T; };

declare namespace cf {
  export class App extends Koa {
    run(port: number): void
  }
  
  export class Controller {
    constructor(ctx: Koa.Context, next: Koa.Next);
    DB: Knex;
    service(name: string): Service;
    success(r: any): any;
    error(r: Error): any;
    getBody(name: string): KoaBouncer.Validator;
    getQuery(name: string): KoaBouncer.Validator;
  }
  
  export class Service {
    constructor(ctx: Koa.Context);
    cursor: Knex.Table;
    service(name: string): Service;
  }
}

export = cf;