using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WorkoutTracker.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public List<Exercise> Exercises  { get; set; }
    }

    public class Exercise
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public List<Set> Sets { get; set; }
    }

    public class Set
    {
        public int Id { get; set; }
        public String Weight { get; set; }
        public int Repetitions { get; set; }
    }

    public class WorkoutDBContext : DbContext
    {
        public DbSet<Workout> Workouts { get; set; }
    }
}