"use client";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Credentials } from "@/app/types/Credentials";
import { useMutation } from "@tanstack/react-query";
import { getCredentials } from "./_actions/get-user-credentials";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const {
    mutateAsync: server_getCredentials,
    isLoading: isLoadingCredentials,
    isError: isErrorCredentials,
    data: dataCredentials,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      getCredentials(email, password),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await getCredentials(
      credentials.email,
      credentials.password
    );

    if (response.status === 200) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a Willinn. Redirigiendo...",
        variant: "success",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast({
        title: "Credenciales inválidas",
        description: "Por favor, verifica tus credenciales e intenta de nuevo",
        variant: "destructive",
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (dataCredentials) {
      console.log(dataCredentials);
    }
  }, [dataCredentials]);

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center ml-9">
          <Image
            src="/Willinn Logo.svg"
            alt="Willinn Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Inicia sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Introduce tu email"
                onChange={handleOnChange}
                value={credentials.email}
                className="w-full px-3 py-2 border border-gray-200 rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleOnChange}
                  value={credentials.password}
                  placeholder="Introduce tu contraseña"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full py-2 rounded-md">
              Ingresar
            </Button>
          </form>
          <div className="mt-4 text-end">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Olvidaste la contraseña?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
