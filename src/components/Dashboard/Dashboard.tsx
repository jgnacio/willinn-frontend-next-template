import UserSection from "./Sections/UserSection";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex items-center">
      <Sidebar />
      <div className="w-full ">
        <div className="w-full px-14">
          <h1 className="font-bold text-2xl">Usuarios</h1>
        </div>
        <UserSection />
      </div>
    </div>
  );
}
