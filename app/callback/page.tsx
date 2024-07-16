import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createUser, getUserById } from "../neo4j.action";

export default async function CallbackPage() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback")
    }

    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback");
    }

    // If user is already in our database (neo4j)
    const dbUser = await getUserById(user.id);

    // If user is not in our database (neo4j)
    if (!dbUser) {
        // Create user in the neo4j database
        await createUser({
            applicationId: user.id,
            firstname: user.given_name!,
            lastname: user.family_name! ?? undefined,
            email: user.email!
        });
    }
    redirect("/");
}