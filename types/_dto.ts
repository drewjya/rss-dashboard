import type { FormError } from "../node_modules/@nuxt/ui/dist/runtime/types";

export interface UserDto {
  id: number;
  name: string;

  email: string;
  profilePicture?: string;
}

export interface TokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface UFormApi {
  validate: <T>(path: string, opts: { silent?: boolean }) => Promise<T>;
  clear: (path?: string) => void;
  getErrors: (path?: string) => FormError[];
  setErrors: (errors: FormError[], path?: string) => void;
  errors: Ref<FormError[]>;
}

export interface ProjectDetailDto {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  projectPicture?: string;
  members: MemberProjectDto[];
  attachments: FileProject[];
  reports: FileProject[];
  subProjects: SubprojectDto[];
}

export interface FileProject {
  id: number;
  name: string;
  file: string;
}

export interface SubprojectDto {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface MemberProjectDto {
  userId: number;
  memberId: number;
  role: string;
  name: string;
  profilePicture?: string;
}

export interface InfoMemberProjectDto {
  userId: number;
  memberId: number;
  role: string;
}

export interface SubProjectDetailDto {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  projectPicture?: string;
  members: MemberProjectDto[];
  attachments: FileProject[];
  reports: FileProject[];
  findings: FindingDto[];
}

export interface FindingDto {
  id: number;
  name: string;
}
