using DotNetEnv;

namespace RentYourHome.Data;

public static class ConnectionString
{
    public static string GetConnectionString()
    {
        var root = Directory.GetCurrentDirectory();
        var dotenv = Path.Combine(root, "..", "..", ".env");
        Env.Load(dotenv);
        return
            $"Server={Environment.GetEnvironmentVariable("DBHOST")},{Environment.GetEnvironmentVariable("DBPORT")};Database={Environment.GetEnvironmentVariable("DBNAME")};User Id={Environment.GetEnvironmentVariable("DBUSER")};Password={Environment.GetEnvironmentVariable("DBPASSWORD")};Encrypt=false;";
    }

    public static string GetLiveConnectionString()
    {
        var root = Directory.GetCurrentDirectory();
        var dotenv = Path.Combine(root, "..", "..", ".env");
        Env.Load(dotenv);
        return
            $"Server={Environment.GetEnvironmentVariable("LIVESERVERHOST")},{Environment.GetEnvironmentVariable("DBPORT")};Initial Catalog={Environment.GetEnvironmentVariable("INITIALCATALOG")};User ID={Environment.GetEnvironmentVariable("LIVEDBUSER")};Password={Environment.GetEnvironmentVariable("DBPASSWORD")};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30";
    }

    public static string GetTestConnectionStringForFactory()
    {
        var root = Directory.GetCurrentDirectory();
        var dotenv = Path.Combine(root, "..", "..", "..", "..", "..", ".env");
        Env.Load(dotenv);
        return
            $"Server={Environment.GetEnvironmentVariable("DBHOST")},{Environment.GetEnvironmentVariable("DBPORT")};Database={Environment.GetEnvironmentVariable("TESTDBNAME")};User Id={Environment.GetEnvironmentVariable("DBUSER")};Password={Environment.GetEnvironmentVariable("DBPASSWORD")};Encrypt=false;";
    }
}