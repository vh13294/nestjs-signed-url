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

`Signed URL` module for for [Nest](https://github.com/nestjs/nest) applications.

# Installation

```bash
npm i --save nestjs-signed-url
```

Or if you use Yarn:

```bash
yarn add nestjs-signed-url
```

# Requirements

`nestjs-signed-url` is built to work with Nest 7 and newer versions.

# Basic Usage

### Include Module

First you need to import this module into your module:

> app.module.ts

```ts
import { SignedUrlModule } from 'nestjs-signed-url';

@Module({
    imports: [
        SignedUrlModule.forRoot({
            secret: 'secret',
            appUrl: 'localhost:3000',
        })
    ],
})
export class ApplicationModule {}
```

Or Async Import With .ENV usage

> .ENV

```.env
APP_KEY=secret
APP_URL=localhost:3000
```

> signed-url.config.ts

```ts
export function signedUrlModuleConfig(): SignedUrlModuleOptions {
    return {
        secret: process.env.APP_KEY,
        appUrl: process.env.APP_URL,
    }
};
```

> app.module.ts

```ts
import { SignedUrlModule } from 'nestjs-signed-url';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SignedUrlModule.forRootAsync({
            useFactory: () => signedUrlModuleConfig(),
        })
    ],
})
export class ApplicationModule {}
```


## Using Service

Now you need to register the service, by injecting it to the constructor.
There are two methods for signing url:

- signedControllerRoute(controller: Controller, controllerMethod: any, expirationDate: Date, params?: any)
- signedRelativePathUrl(relativePath: string, expirationDate: Date, params?: any)

> app.controller.ts

```ts
import { SignedUrlService } from 'nestjs-signed-url';

@Controller()
export class AppController {
    constructor(
        private readonly signedUrlService: SignedUrlService,
    ) { }

    @Get('makeSignedUrl')
    async makeSignedUrl(): Promise<string> {
        const params = {
            id: 1,
            info: 'info',
        }

        try {
            return this.signedUrlService.signedControllerRoute(
                AppController,
                AppController.prototype.emailVerification,
                new Date('2021-12-12'),
                params
            )
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
```

'expirationDate' and 'signed' params are used internally by nestjs-signed-url.

Exception will be thrown if those params are used.



## Using Guard

You can use @UseGuards(SignedUrlGuard) to verify the signed url in controller.

If the url has been tampered or when the expiration date is due, then a Forbidden exception will be thrown.

> app.controller.ts

```ts
import { SignedUrlGuard } from 'nestjs-signed-url';

@Controller()
export class AppController {
    constructor(
        private readonly signedUrlService: SignedUrlService,
    ) { }

    @Get('emailVerification')
    @UseGuards(SignedUrlGuard)
    async emailVerification(): Promise<string> {
        return 'You emailed has been verified.'
    }
}

```


## Note
- Changing the secret key will invalidate all signed urls
- Signed URL is typically used for unsubscribe email, email verification, sign file permission, and more.


### TODO
- [ ] Create test
- [ ] Renovate Automated dependency updates