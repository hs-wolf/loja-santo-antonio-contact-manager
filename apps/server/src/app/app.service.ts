import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  Prisma,
  contacts as Contact,
  profiles as Profile,
} from '@prisma/client';
import CryptoJS from 'crypto-js';

@Injectable()
export class AppService {
  private readonly secretKey = process.env.ENCRYPTION_KEY ?? '';

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
    const encrypted = data;
    encrypted.email = this._encrypt(encrypted.email ?? '');
    encrypted.phone = this._encrypt(encrypted.phone ?? '');
    const newContact = await this.prisma.contacts.create({
      data: encrypted,
    });
    if (!newContact) {
      throw new HttpException("Couldn't create contact.", HttpStatus.NOT_FOUND);
    }
    return newContact;
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

  async getContact(
    where: Prisma.contactsWhereUniqueInput
  ): Promise<Contact | null> {
    return this.prisma.contacts.findUnique({
      where,
    });
  }

  async getContactUnlock(
    where: Prisma.contactsWhereUniqueInput
  ): Promise<Contact | null> {
    const contact = await this.prisma.contacts.findUnique({
      where,
    });
    if (contact) {
      contact.email = this._decrypt(contact.email ?? '');
      contact.phone = this._decrypt(contact.phone ?? '');
      contact.encrypted = false;
    }
    return contact;
  }

  async updateContact(params: {
    where: Prisma.contactsWhereUniqueInput;
    data: Prisma.contactsUpdateInput;
  }): Promise<Contact> {
    const { where, data } = params;
    const encrypted = data;
    if (encrypted.email) {
      encrypted.email = this._encrypt((encrypted.email as string) ?? '');
    }
    if (encrypted.phone) {
      encrypted.phone = this._encrypt((encrypted.phone as string) ?? '');
    }
    return this.prisma.contacts.update({
      data: encrypted,
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

  async checkOwner(pathId: string, request: any): Promise<void> {
    if (pathId !== request.user.sub) {
      throw new HttpException(
        "You're not the owner of this content.",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  private _encrypt(rawText: string): string {
    return CryptoJS.AES.encrypt(rawText, this.secretKey).toString();
  }

  private _decrypt(encryptedText: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
