<p align="center">
  <img width="40%" src="https://user-images.githubusercontent.com/17086745/97110220-8bf2f780-170a-11eb-9bf4-ca38b8d41be9.png" />
</p>

<h2 align="center">Signed URL Module for NestJS</h2>

<p align="center">
<a href="https://www.codefactor.io/repository/github/vh13294/nestjs-signed-url"><img src="https://www.codefactor.io/repository/github/vh13294/nestjs-signed-url/badge" alt="CodeFactor" /></a>
<a href="https://www.npmjs.com/package/nestjs-signed-url"><img src="https://img.shields.io/npm/v/nestjs-signed-url.svg?style=flat-square&sanitize=true" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nestjs-signed-url"><img src="https://img.shields.io/npm/dm/nestjs-signed-url.svg?style=flat-square&sanitize=true" alt="NPM Downloads" /></a>
<a href="#"><img src="https://img.shields.io/npm/l/nestjs-signed-url.svg?colorB=black&label=LICENSE&style=flat-square&sanitize=true" alt="License"/></a>

</p>

# Description

`Nestjs Signed Url` module for for [Nest](https://github.com/nestjs/nest) applications.

# Installation

```bash
npm i --save nestjs-signed-url
```

Or if you use Yarn:

```bash
yarn add nestjs-signed-url
```

# Requirements

`nestjs-signed-url` is built to work with Nest 6 and newer versions.

# Basic Usage

### Include Module

First you need to import this module into your main application module:

> app.module.ts

```ts
import { RateLimiterModule } from 'nestjs-signed-url';

@Module({
    imports: [RateLimiterModule],
})
export class ApplicationModule {}
```

### Using Interceptor

Now you need to register the interceptor. You can do this only on some routes:

> app.controller.ts

```ts
import { RateLimiterInterceptor } from 'nestjs-signed-url';

@UseInterceptors(RateLimiterInterceptor)
@Get('/login')
public async login() {
    console.log('hello');
}
```

Or you can choose to register the interceptor globally:

> app.module.ts

```ts
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RateLimiterModule, RateLimiterInterceptor } from 'nestjs-signed-url';

@Module({
    imports: [RateLimiterModule],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: RateLimiterInterceptor,
        },
    ],
})
export class ApplicationModule {}
```

### With Decorator

You can use the `@RateLimit` decorator to specify the points and duration for rate limiting on a per controller or per
route basis:

> app.controller.ts

```ts
import { RateLimit } from 'nestjs-signed-url';

@RateLimit({ points: 1, duration: 60, errorMessage: 'Accounts cannot be created more than once in per minute' })
@Get('/signup')
public async signUp() {
    console.log('hello');
}
```

### With All Options

The usage of the limiter options is as in the code block below. For an explanation of the each option, please see <code>[options](https://github.com/ozkanonur/nestjs-signed-url#options)</code>.

```ts
@Module({
    imports: [
        // All the values here are defaults.
        RateLimiterModule.register({
            for: 'Express',
            type: 'Memory',
            keyPrefix: 'global',
            points: 4,
            pointsConsumed: 1,
            inmemoryBlockOnConsumed: 0,
            duration: 1,
            blockDuration: 0,
            inmemoryBlockDuration: 0,
            queueEnabled: false,
            whiteList: [],
            blackList: [],
            storeClient: undefined,
            insuranceLimiter: undefined,
            storeType: undefined,
            dbName: undefined,
            tableName: undefined,
            tableCreated: undefined,
            clearExpiredByTimeout: undefined,
            execEvenly: false,
            execEvenlyMinDelayMs: undefined,
            indexKeyPrefix: {},
            maxQueueSize: 100,
            errorMessage: 'Rate limit exceeded'
        }),
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: RateLimiterInterceptor,
        },
    ],
})
export class ApplicationModule {}
```

### Fastify based Graphql
If you want to use this library on a fastify based graphql server, you need to override the graphql context in the app.module as shown below.
```ts
GraphQLModule.forRoot({
    context: ({ request, reply }) => {
        return { req: request, res: reply }
    },
}),
```

# Options


## TODO
- [ ] Create example projects for each technology
- [ ] Support Websocket
- [ ] Support Rpc
- [ ] Tests & Github Actions (for automatic npm deployment on master branch)