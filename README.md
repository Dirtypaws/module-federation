# Module Federation

This is a sample project show casing an Angular application utilizing module federation with a multitude of different server side implementations deployed to an AWS environment.

## Pre-requisites

- dotnet core SDK/Runtime 8
- dotnetcore cli
- angular cli
- yarn
- npm

## Getting Started

- Navigate to the repository root
- Execute a `yarn` install
- Execute a `yarn generate` to generate the ApiModels and Services from the OpenApi spec
- Navigate to `/frontend`
- Execute a `yarn` install
- Navigate to `/services`
- Execute a `dotnet restore` to restore nuget packages for the solution
- Execute `dotnet tool install --global Refitter` a tool for generating the refit client
- Navigate back to the root directory
- Execute a `yarn run:all`
- Open a browser to `localhost:4200`
