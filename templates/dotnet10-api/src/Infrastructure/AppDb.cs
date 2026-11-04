using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class AppDb : DbContext
{
    public AppDb(DbContextOptions<AppDb> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
}
