import { User, UserDTO } from "@/domain/User/entities/UserEntity";

export default function ClassToObject(user: User): UserDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
