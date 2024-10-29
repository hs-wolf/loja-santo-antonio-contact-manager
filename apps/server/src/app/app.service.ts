import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  Prisma,
  contacts as Contact,
  profiles as Profile,
} from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createProfile(data: Prisma.profilesCreateInput): Promise<Profile> {
    const profile = await this.prisma.profiles.create({
      data,
    });
    if (!profile) {
      throw new HttpException(
        "Couldn't create profile.",
        HttpStatus.BAD_REQUEST
      );
    }
    return profile;
  }

  async updateProfile(params: {
    where: Prisma.profilesWhereUniqueInput;
    data: Prisma.profilesUpdateInput;
  }): Promise<Profile> {
    const { where, data } = params;
    const updatedProfile = await this.prisma.profiles.update({ where, data });
    if (!updatedProfile) {
      throw new HttpException("Couldn't update profile.", HttpStatus.NOT_FOUND);
    }
    return updatedProfile;
  }

  async createContact(data: Prisma.contactsCreateInput): Promise<Contact> {
    const newContact = await this.prisma.contacts.create({
      data,
    });
    if (!newContact) {
      throw new HttpException("Couldn't create contact.", HttpStatus.NOT_FOUND);
    }
    return newContact;
  }

  async getContact(
    where: Prisma.contactsWhereUniqueInput
  ): Promise<Contact | null> {
    return this.prisma.contacts.findUnique({
      where,
    });
  }

  async getContacts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.contactsWhereUniqueInput;
    where?: Prisma.contactsWhereInput;
    orderBy?: Prisma.contactsOrderByWithRelationInput;
  }): Promise<Contact[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.contacts.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateContact(params: {
    where: Prisma.contactsWhereUniqueInput;
    data: Prisma.contactsUpdateInput;
  }): Promise<Contact> {
    const { where, data } = params;
    return this.prisma.contacts.update({
      data,
      where,
    });
  }

  async deleteContact(
    where: Prisma.contactsWhereUniqueInput
  ): Promise<Contact> {
    return this.prisma.contacts.delete({
      where,
    });
  }
}
