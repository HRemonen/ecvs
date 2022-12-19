import { Types } from "mongoose";

export enum UserType {
  NormalUser = 'normalUser',
  HiringManager = 'companyUser'
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

interface HiringManager extends BaseUser {
  company: string;
  address: string;
  usertype: UserType.HiringManager;
  jobPostings: Types.ObjectId[];
}

export type User = NormalUser
export type CompanyUser = HiringManager

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
  skills?: Array<string>;
  education?: Array<Education>;
  experience?: Array<Experience>;
  hobbies?: Array<string>;
  languages?: Array<string>;
  profile?: string;
}