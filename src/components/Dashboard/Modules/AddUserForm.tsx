import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function AddUserForm() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Agregar usuario</h2>
      </CardHeader>
      <CardContent className="px-0">
        <form className="space-y-6">
          <div className="px-10 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Nombre</label>
              <Input placeholder="Introduce el nombre" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Apellido</label>
              <Input placeholder="Introduce el apellido" />
            </div>
          </div>
          <div className="border-t px-10 py-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">E-mail</label>
              <Input type="email" placeholder="Introduce tu E-mail" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Contraseña</label>
              <Input type="password" placeholder="Introduce tu contraseña" />
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-semibold">Activar</label>
              <Switch />
            </div>
            <Button variant="secondary" className="w-full">
              Guardar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
