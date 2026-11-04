using Domain;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application;

public static class Seed
{
    public static async Task InitAsync(AppDb db)
    {
        if (!await db.Users.AnyAsync())
        {
            await db.Users.AddRangeAsync(
            [
                new User { Username = "admin", Email = "admin@globaledb.com", Role = "Admin", Status = "ACTIVE" },
                new User { Username = "diego_tique", Email = "diego@globaledb.com", Role = "User", Status = "ACTIVE" },
                new User { Username = "dev_user", Email = "dev@globaledb.com", Role = "User", Status = "PENDING" }
            ]);
            await db.SaveChangesAsync();
            return;
        }

        if (!await db.Users.AnyAsync(user => user.Username == "diego_tique"))
        {
            db.Users.Add(new User
            {
                Username = "diego_tique",
                Email = "diego@globaledb.com",
                Role = "User",
                Status = "ACTIVE"
            });
            await db.SaveChangesAsync();
        }
    }
}
