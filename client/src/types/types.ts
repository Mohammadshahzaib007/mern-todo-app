export interface TodoType {
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface ResponseTodoType extends TodoType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllTodoResponseType {
  todos: ResponseTodoType[];
  success: boolean;
  message: string;
}

export interface SigninCredentialType {
  email: string;
  password: string;
}

export interface SignupCredentialType extends SigninCredentialType {
  name: string;
}
