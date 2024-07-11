export interface userModelType {
  name: string;
  email: string;
  password: string | undefined;
  company: string;
  position: string;
  createJWT: () => string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface issueType {
  title: string;
  description: string | undefined;
  status: string;
  priority: string;
  startDate: string;
  dueDate: string;
  assignee: any;
  createdBy: any;
}
