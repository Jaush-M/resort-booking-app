# Build stage
FROM mcr.microsoft.com/dotnet/sdk:latest AS builder
WORKDIR /src

# Copy project files
COPY Api/Api.csproj ./Api/
RUN dotnet restore Api/Api.csproj

# Copy source code
COPY Api/ ./Api/
RUN dotnet build Api/Api.csproj -c Release -o /build

# Publish stage
FROM builder AS publisher
WORKDIR /src
RUN dotnet publish Api/Api.csproj -c Release -o /publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:latest
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:5084
EXPOSE 5084

COPY --from=publisher /publish .
ENTRYPOINT ["dotnet", "Api.dll"]
