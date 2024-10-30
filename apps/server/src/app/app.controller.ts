import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
    @Req() request: any,
    @Param('id') id: string,
    @Body() body: { name: Profile['name'] }
  ): Promise<Profile> {
    this.appService.checkOwner(id, request);
    return this.appService.updateProfile({
      where: { id },
      data: body,
    });
  }

  @Post('contacts')
  @UseGuards(JwtAuthGuard)
  async createContact(
    @Req() request: any,
    @Body()
    body: {
      name: Contact['name'];
      email: Contact['email'];
      phone: Contact['phone'];
    }
  ): Promise<Contact> {
    const { name, email, phone } = body;
    return this.appService.createContact({
      owner_id: request.user.sub,
      name,
      email,
      phone,
    });
  }

  @Get('contacts')
  @UseGuards(JwtAuthGuard)
  async getContacts(
    @Req() req: any,
    @Query()
    params: {
      letter?: string;
    }
  ): Promise<Contact[]> {
    return this.appService.getContacts({
      where: {
        owner_id: req.user.sub,
        name: {
          startsWith: params.letter,
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  @Get('contacts/:id/unlock')
  @UseGuards(JwtAuthGuard)
  async getContactUnlock(
    @Req() req: any,
    @Param('id') id: string
  ): Promise<Contact | null> {
    return this.appService.getContactUnlock({
      id,
      owner_id: req.user.sub,
    });
  }

  @Get('contacts/:id')
  @UseGuards(JwtAuthGuard)
  async getContact(
    @Req() req: any,
    @Param('id') id: string
  ): Promise<Contact | null> {
    return this.appService.getContact({
      id,
      owner_id: req.user.sub,
    });
  }

  @Put('contacts/:id')
  @UseGuards(JwtAuthGuard)
  async updateContact(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { name: Contact['name'] }
  ): Promise<Contact> {
    return this.appService.updateContact({
      where: { id, owner_id: req.user.sub },
      data: body,
    });
  }

  @Delete('contacts/:id')
  @UseGuards(JwtAuthGuard)
  async deleteContact(
    @Req() req: any,
    @Param('id') id: string
  ): Promise<Contact> {
    return this.appService.deleteContact({ id, owner_id: req.user.sub });
  }
}
