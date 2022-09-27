export interface Goals {
  id: string,
  goalsText: string
}

export interface PerData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  local: string;
  github: string;
  linkedin: string;
  profile: string;
  id?: string;
}

export interface StuJobs {
  years: number[];
  contentFirst: string;
  contentSecond: string;
  contentThird: {
    item: string,
    cerLink: string
  }[];
  id?: string
}

export interface ForLang {
  lang: string;
  contentFirst: string;
  contentSecond: string;
  id?: string;
}

export interface Tech {
  name: string;
  level: number;
  id?: string;
  index: number;
}

export class Hobby {
  constructor (
    public name: string,
    public src: string,
    public id?: string
  ) {}
}

 export type ItemTypes = ForLang | Goals | Hobby | PerData | StuJobs | Tech;
