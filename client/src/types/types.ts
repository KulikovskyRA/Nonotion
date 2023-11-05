export interface IUserData {
  id?: number;
  name?: string;
}

export interface IUserDataProps {
  userData: IUserData;
}

export interface IAccountModalHandlerProps {
  accountModalHandler: (state: boolean, type: string) => void;
}
