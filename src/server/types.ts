import { ObjectId } from "mongoose";

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
  ecvs: ObjectId[];
  applications: ObjectId[];
}

interface HiringManager extends BaseUser {
  company: string;
  address: string;
  usertype: UserType.HiringManager;
  jobPostings: ObjectId[];
}

export type User =
  | NormalUser
  | HiringManager;

interface Experience {
    company: string;
    startDate: Date;
    endDate?: Date;
    position: string;
    additionalInfo?: string;
  }

interface Education {
  school: string;
  startDate: Date;
  graduationDate?: Date;
  additionalInfo?: string;
}

export interface Ecv {
  user: ObjectId;
  expertise?: Array<string>;
  skills?: Array<string>;
  education?: Array<Education>;
  experience?: Array<Experience>;
  qualifications?: Array<string>;
  hobbies?: Array<string>;
  languages?: Array<string>;
  references?: Array<string>;
  socials?: Array<string>;
  profile?: string;
}