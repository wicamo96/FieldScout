
using FieldScout.Repositories;

namespace FieldScout
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddTransient<IUserProfileRepository, UserProfileRepository>();
            builder.Services.AddTransient<IFacilitiesRepository,  FacilitiesRepository>();
            builder.Services.AddTransient<IHousesRepository, HousesRepository>();
            builder.Services.AddTransient<IPestsRepository, PestsRepository>();
            builder.Services.AddTransient<IBaysRepository, BaysRepository>();
            builder.Services.AddTransient<IFacilityHousesRepository, FacilityHousesRepository>();
            builder.Services.AddTransient<IHouseBaysRepository, HouseBaysRepository>();
            builder.Services.AddTransient<IBayDivisionRepository, BayDivisionRepository>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
