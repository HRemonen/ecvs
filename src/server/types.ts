export enum UserType {
  NormalUser = 'normalUser',
  HiringManager = 'companyUser'
}

interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

interface NormalUser extends BaseUser {
  birthdate?: string;
  address?: string;
  usertype: UserType.NormalUser;
  ecvs: [];
  applications: [];
}

interface HiringManager extends BaseUser {
  company: string;
  address: string;
  usertype: UserType.HiringManager;
  jobPostings: [];
}

export type User =
  | NormalUser
  | HiringManager
