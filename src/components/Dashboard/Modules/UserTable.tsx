import { UserDTO } from "@/domain/User/entities/UserEntity";
import { MoreVertical, PenSquare, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "../_actions/get-users";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export function UserTable() {
  const { toast } = useToast();

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
  });

  const handleGetToken = async () => {
    const response = await axios(`${window.location.origin}/api/auth-status`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    if (!response.token) {
      return "";
    }

    return response.token;
  };

  return (
    <Card className="space-y-0">
      <CardHeader className="py-4 px-7">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Usuarios</h2>
          <div className="relative flex items-center">
            <Search className="absolute left-6  w-[20px] text-tertiary " />
            <Input
              placeholder="Buscar"
              className="px-14 w-[255px] rounded-full text-tertiary placeholder:text-tertiary bg-background border-0"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        {users && users.length > 0 ? (
          <table className="w-full">
            <thead className="">
              <tr>
                <th className="text-left font-medium py-4">Nombre</th>
                <th className="text-left font-medium  p-4">Correo</th>
                <th className="w-[50px]"></th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="w-[250px] text-tertiary">{user.name}</td>
                  <td className="p-2 text-tertiary">{user.email}</td>
                  <td className="p-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <PenSquare className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
