import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserById, getUserWithNoConnection } from "./neo4j.action";
import HomepageClientComponent from "./components/Home";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback")
  }

  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback");
  }

  const currentUser = await getUserById(user.id);
  const usersWithNoConnection = await getUserWithNoConnection(user.id);

  return (
    <main>
      {currentUser && <HomepageClientComponent currentUser={currentUser} users={usersWithNoConnection} />}
    </main>
  );
}
