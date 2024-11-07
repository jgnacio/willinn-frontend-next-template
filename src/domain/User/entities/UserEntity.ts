export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    isActive: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
  }
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}
