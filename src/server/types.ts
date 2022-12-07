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
  | HiringManager;
