import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { contacts as Contact, profiles as Profile } from '@prisma/client';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('profiles')
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Req() req: any,
    @Body()
    body: {
      name: Profile['name'];
    }
  ): Promise<Profile> {
    const { name } = body;
    return this.appService.createProfile({
      id: req.user.sub,
      name,
    });
  }

  @Put('profiles/:id')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() body: { name: Profile['name'] }
  ): Promise<Profile> {
    return this.appService.updateProfile({
      where: { id },
      data: body,
    });
  }

  @Post('post')
  @UseGuards(JwtAuthGuard)
  async createContact(
    @Body()
    body: {
      name: Contact['name'];
      email: Contact['email'];
      phone: Contact['phone'];
    }
  ): Promise<Contact> {
    const { name, email, phone } = body;
    return this.appService.createContact({
      name,
      email,
      phone,
      profiles: {
        connect: {
          id: '',
        },
      },
    });
  }

  @Put('contacts/:id')
  @UseGuards(JwtAuthGuard)
  async updateContact(
    @Param('id') id: string,
    @Body() body: { name: Contact['name'] }
  ): Promise<Contact> {
    return this.appService.updateContact({
      where: { id: Number(id) },
      data: body,
    });
  }

  @Delete('contacts/:id')
  @UseGuards(JwtAuthGuard)
  async deleteContact(@Param('id') id: string): Promise<Contact> {
    return this.appService.deleteContact({ id: Number(id) });
  }
}
