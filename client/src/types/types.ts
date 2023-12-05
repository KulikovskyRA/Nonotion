export interface IUserData {
  id: number;
  name: string;
}

export interface IQueryUserData {
  user: IUserData;
}

export interface IUserDataProps {
  userData: IUserData;
}

export interface IAccountModalHandlerProps {
  accountModalHandler: (state: boolean, type: string) => void;
}

export interface ILoginFormValues {
  name: string;
  password: string;
}
export interface IRegisterFormValues {
  name: string;
  password: string;
  confirm: string;
}

export interface ITodo {
  id: number;
  inner: string;
  updatedAt: string;
  createdAt: string;
  isDone: boolean;
}

export interface IChangeTodo {
  id: number;
  inner: string;
}

export interface ITodosProps {
  todos: Array<ITodo> | undefined;
}

export interface IFolder {
  id: number;
  title: string;
  userId: number;
  isPublic: boolean;
  updatedAt: string;
  createdAt: string;
}
