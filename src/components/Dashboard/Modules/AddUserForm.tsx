import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { saveUser } from "../_actions/save-user";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export function AddUserForm() {
  const { toast } = useToast();
  const [userToAdd, setUserToAdd] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    active: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserToAdd({
      ...userToAdd,
      [e.target.name]: e.target.value,
    });
  };

  const {
    mutateAsync: server_saveUser,
    isLoading: isSavingUser,
    error: saveUserError,
  } = useMutation({
    mutationFn: async ({
      user,
      token,
    }: {
      user: {
        name: string;
        lastName: string;
        email: string;
        password: string;
        active: boolean;
      };
      token: string;
    }) => {
      return await saveUser(user, token);
    },
  });

  const handleSaveUser = async () => {
    if (
      userToAdd.name &&
      userToAdd.lastName &&
      userToAdd.email &&
      userToAdd.password &&
      userToAdd.active
    ) {
      await server_saveUser({
        user: userToAdd,
        token: await handleGetToken(),
      });
    } else {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      });
    }
  };
  const handleGetToken = async () => {
    const response = await axios(`${window.location.origin}/api/auth-status`)
      .then((response) => {
        console.log(response.data);
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

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Agregar usuario</h2>
      </CardHeader>
      <CardContent className="px-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveUser();
          }}
          className="space-y-6"
        >
          <div className="px-10 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Nombre</label>
              <Input
                placeholder="Introduce el nombre"
                name="name"
                value={userToAdd.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Apellido</label>
              <Input
                placeholder="Introduce el apellido"
                name="lastName"
                value={userToAdd.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="border-t px-10 py-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">E-mail</label>
              <Input
                type="email"
                placeholder="Introduce tu E-mail"
                name="email"
                value={userToAdd.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Contraseña</label>
              <Input
                type="password"
                placeholder="Introduce tu contraseña"
                name="password"
                value={userToAdd.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-semibold">Activar</label>
              <Switch
                checked={userToAdd.active}
                onChange={() =>
                  setUserToAdd({ ...userToAdd, active: !userToAdd.active })
                }
              />
            </div>
            <Button variant="secondary" className="w-full" type="submit">
              {isSavingUser ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
