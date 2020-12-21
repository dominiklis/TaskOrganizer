using api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<TaskModel> TaskModels { get; set; }
        public DbSet<Step> Steps { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TaskTag> TaskTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationUser>()
                .HasMany(x => x.Tasks)
                .WithOne(y => y.User)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(x => x.Steps)
                .WithOne(y => y.User)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            modelBuilder.Entity<TaskModel>().Property(x => x.Title).IsRequired();
            modelBuilder.Entity<TaskModel>().Property(x => x.StartDate).IsRequired();
            modelBuilder.Entity<TaskModel>().Property(x => x.Completed).IsRequired();
            modelBuilder.Entity<TaskModel>().Property(x => x.HasStartTime).IsRequired();
            modelBuilder.Entity<TaskModel>().Property(x => x.Added).IsRequired();
            modelBuilder.Entity<TaskModel>()
                .HasMany(x => x.Steps)
                .WithOne(y => y.Task)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            modelBuilder.Entity<Step>().Property(x => x.Text).IsRequired();
            modelBuilder.Entity<Step>().Property(x => x.Completed).IsRequired();

            modelBuilder.Entity<Tag>().Property(x => x.Name).IsRequired();

            modelBuilder.Entity<TaskTag>().HasKey(x => new { x.TaskId, x.TagId });
            modelBuilder.Entity<TaskTag>().HasOne(tt => tt.Task).WithMany(t => t.TaskTags).HasForeignKey(tt => tt.TaskId);
            modelBuilder.Entity<TaskTag>().HasOne(tt => tt.Tag).WithMany(t => t.TaskTags).HasForeignKey(tt => tt.TagId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
