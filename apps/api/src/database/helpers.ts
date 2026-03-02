import { eq } from "drizzle-orm";
import { permissions, rolePermissions, userRoles } from "./schema";
import { db } from "./drizzle";

export async function getUserPermissions(userId: string) {
  const rows = await db
    .select({
      permission: permissions.name,
    })
    .from(userRoles)
    .innerJoin(rolePermissions, eq(rolePermissions.roleId, userRoles.roleId))
    .innerJoin(permissions, eq(permissions.id, rolePermissions.permissionId))
    .where(eq(userRoles.userId, userId));

  return rows.map((r) => r.permission);
}
