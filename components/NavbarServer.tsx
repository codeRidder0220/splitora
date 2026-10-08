import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default async function NavbarServer() {
  const user = await getCurrentUser();

  return <Navbar user={user} />;
}