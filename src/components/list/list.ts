export interface Company {
  id: string;
  created_at: string;
  name: string;
  location: string;
  url: string;
}

export interface JobCategory {
  id: string;
  created_at: string;
  name: string;
}

export interface Job {
  created_at: string;
  company: Company;
  position: string;
  salary: string;
  url: string;
  category: JobCategory[];
}

export interface Cafe {
  url: string;
  name: string;
  location: string;
  rating: number;
  image: string;
}
