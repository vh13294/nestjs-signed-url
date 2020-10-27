import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SignedUrlGuard, SignedUrlService } from 'nestjs-signed-url';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly signedUrlService: SignedUrlService,
  ) { }

  @Get()
  getHello(): string {
    return 'hello world'
  }

  @Get('emailVerification/:version/:user')
  @UseGuards(SignedUrlGuard)
  async emailVerification(@Req() request: Request): Promise<any> {
    const query = request.query
    const params = request.params

    return {
      query,
      params
    }
  }

  @Get('makeSignedUrl')
  async makeSignedUrl(): Promise<string> {
    const params = {
      id: 1,
      reset: false,
      arr: [1, 2, 3],
      arr1: [
        {
          a: 'apple',
          b: 'book'
        }
      ],
      dict: {
        a: 'apple',
        b: 'book',
        c: [
          {
            a: 'apple',
            b: 'book'
          },
        ]
      }
    }

    const signedUrl = this.signedUrlService.signedControllerRoute(
      AppController,
      AppController.prototype.emailVerification,
      new Date('2021-12-12'),
      params
    )
    return signedUrl
  }
}
