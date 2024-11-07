import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserDTO } from "@/domain/User/entities/UserEntity";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getUsers } from "../_actions/get-users";
import EditButton from "./EditButton";

export function UserTable() {
  const { toast } = useToast();

  const [userFiltered, setUserFiltered] = useState<UserDTO[]>([]);

  const [search, setSearch] = useState("");

  const {
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    data: users,
  } = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => getUsers(await handleGetToken()),
    onError: (error) => {
      toast({
        title: "Error al cargar los usuarios",
        description: "Por favor, intenta de nuevo",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      setUserFiltered(data);
    },
  });

  const handleGetToken = async () => {
    const response = await axios(`${window.location.origin}/api/auth-status`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    if (!response.tokenObj) {
      return "";
    }

    return response.tokenObj.token;
  };

  const handleChangueSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!users) return;
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUserFiltered(filtered);
  };

  return (
    <Card className="space-y-0">
      <CardHeader className="py-4 px-7">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Usuarios</h2>
          <div className="relative flex items-center">
            <Search className="absolute left-6  w-[20px] text-tertiary " />
            <Input
              value={search}
              onChange={handleChangueSearch}
              placeholder="Buscar"
              className="px-14 w-[255px] rounded-full text-tertiary placeholder:text-tertiary bg-background border-0"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        {userFiltered && userFiltered.length > 0 ? (
          <table className="w-full">
            <thead className="">
              <tr>
                <th className="text-left font-medium py-4">Nombre</th>
                <th className="text-left font-medium  p-4">Correo</th>
                <th className="w-[50px]"></th>
              </tr>
            </thead>
            <tbody className="">
              {userFiltered.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="w-[250px] text-tertiary">{user.name}</td>
                  <td className="p-2 text-tertiary">{user.email}</td>
                  <td className="p-2 flex justify-end">
                    <EditButton user={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-tertiary">No hay usuarios registrados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
