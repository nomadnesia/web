export type Job = {
  id: string;
  created_at: Date;
  position: string;
  salary: string;
  url: string;
  company: Company;
  category: JobCategory;
};

export type Company = {
  id: string;
  created_at: Date;
  name: string;
  location: string;
  url: string;
};

export type JobCategory = {
  id: string;
  name: string;
};
