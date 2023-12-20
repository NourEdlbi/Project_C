using backend;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using YourNamespace;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://localhost:5173", "http://127.0.0.1:5173")
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

var app = builder.Build();

var db = new ForumContext();
// SeedDB.Seedadmin(db);
// SeedDB.cleardb(db);
// SeedDB.Seedaccount(db);
// SeedDB.Seedagenda(db);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(MyAllowSpecificOrigins);

app.Run();
