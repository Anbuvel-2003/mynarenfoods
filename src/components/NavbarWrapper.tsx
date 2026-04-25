import { getSession } from "@/lib/session";
import { Navbar } from "./Navbar";

export async function NavbarWrapper() {
  const session = await getSession();
  
  return <Navbar session={session} />;
}
