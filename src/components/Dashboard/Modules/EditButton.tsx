import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { UserDTO } from "@/domain/User/entities/UserEntity";
import { useMutation } from "@tanstack/react-query";
import { detete_user } from "../_actions/delete-user";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { update_user } from "../_actions/update-user";

export default function EditButton({ user }: { user: UserDTO }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<{
    id: string;
    name: string;
    email: string;
    password: string;
  }>({
    id: user.id,
    name: user.name,
    email: user.email,
    password: "",
  });
  const {
    mutateAsync: server_detete_user,
    isLoading: isDeleting,
    isError: isDeleteError,
  } = useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      return await detete_user(id, token);
    },
    onSuccess: () => {
      toast({
        title: "Usuario Inhabilitado",
        description: "El usuario ha sido inhabilitado correctamente",
        variant: "success",
      });
    },
  });

  const {
    mutateAsync: server_update_user,
    isLoading: isUpdating,
    isError: isUpdateError,
    data: updatedUser,
  } = useMutation({
    mutationFn: async ({
      user,
      token,
    }: {
      user: {
        id: string;
        name: string;
        email: string;
        password: string;
      };
      token: string;
    }) => {
      return await update_user(user, token);
    },
    onSuccess: () => {
      toast({
        title: "Usuario actualizado",
        description: "Los cambios se han guardado correctamente",
        variant: "success",
      });
    },
  });

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const stopPropagation = async (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleUserDelete = async (e: React.MouseEvent) => {
    try {
      await server_detete_user({ id: user.id, token: await handleGetToken() });
    } catch (error) {
      toast({
        title: "Error al eliminar el usuario",
        description: "Por favor, intenta de nuevo",
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

  const saveChanges = async (e: React.MouseEvent) => {
    try {
      await server_update_user({
        user: userToUpdate,
        token: await handleGetToken(),
      });
    } catch (error) {
      toast({
        title: "Error al actualizar el usuario",
        description: "Por favor, intenta de nuevo",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserToUpdate({ ...userToUpdate, [e.target.name]: e.target.value });
  };

  const variants = {
    open: { width: "7rem" },
    closed: { width: "2rem" },
  };

  return (
    <div>
      <motion.button
        onClick={handleOpen}
        className="w-4 h-8 flex justify-center items-center rounded-full bg-background"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center items-center space-x-2 z-10"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={stopPropagation}
                  variant="ghost"
                  className="hover:bg-transparent"
                >
                  <Trash2 size={20} className="text-destructive" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Eliminar Usuario</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que deseas eliminar este usuario? Esta
                    acción no se puede deshacer.
                  </DialogDescription>
                </DialogHeader>
                Usuario: {user.name}
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant={"destructive"}
                      type="submit"
                      onClick={handleUserDelete}
                    >
                      Eliminar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={stopPropagation}
                  variant={"ghost"}
                  className="hover:bg-transparent"
                >
                  <Pencil size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px]"
                onClick={stopPropagation}
              >
                <DialogHeader>
                  <DialogTitle>Editar Informacion del Usuario</DialogTitle>
                  <DialogDescription>
                    Actualiza la información del usuario.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      onChange={handleInputChange}
                      defaultValue={user.name}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleInputChange}
                      defaultValue={user.email}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      onChange={handleInputChange}
                      id="password"
                      name="password"
                      type="password"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-semibold">Activar</label>
                    <Switch defaultChecked={user.isActive} />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      variant={"secondary"}
                      onClick={saveChanges}
                    >
                      Guardar Cambios
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Ellipsis size={20} />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
