import { Types } from "mongoose";

export enum UserType {
  NormalUser = 'normalUser',
}

interface BaseUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

interface NormalUser extends BaseUser {
  address?: string;
  usertype: UserType.NormalUser;
  ecvs: Types.ObjectId[];
  applications: Types.ObjectId[];
}

export type User = NormalUser

export interface Experience {
    company: string;
    startDate: Date;
    endDate?: Date;
    position: string;
    additionalInfo?: string;
  }

export interface Education {
  school: string;
  startDate: Date;
  graduationDate?: Date;
  additionalInfo?: string;
}

export interface Ecv {
  user: Types.ObjectId;
  experience?: Array<Experience>;
  education?: Array<Education>;
  skills?: Array<string>;
  hobbies?: Array<string>;
  languages?: Array<string>;
  profile?: string;
}

export interface HiringManager {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Company {
  name: string;
  location: string;
}

export interface Posting {
  hiringManager: HiringManager;
  company: Company;
  title: string;
  info?: string;
  endDate?: Date;
  applicants: Array<Ecv>
}
