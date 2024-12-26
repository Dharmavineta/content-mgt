import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const SyncUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }
  const client = await clerkClient();

  const user = await client.users.getUser(userId);

  if (!user || !user.emailAddresses) {
    return notFound();
  }

  await db
    .insert(users)
    .values({
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.firstName + " " + user.lastName,
    })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        name: user.firstName + " " + user.lastName,
        email: user.emailAddresses[0].emailAddress,
      },
      targetWhere: eq(users.clerkId, user.id),
    });

  return redirect("/dashboard");
};

export default SyncUser;
