import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getMatches, getUserById } from "../neo4j.action";
import { match } from "assert";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function HomePage() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback")
    }

    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback");
    }

    const matches = await getMatches(user.id);
    return (
        <main>
            {matches.map((user) => (
                <Card key={user.applicationId}>
                    <CardHeader>
                        <CardTitle>{user.firstname} {user.lastname}</CardTitle>
                    </CardHeader>
                    <CardDescription>{user.email}</CardDescription>
                </Card>
            ))}
        </main>

    )
}