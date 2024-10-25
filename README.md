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
- Navigate to `/frontend`
- Execute a `yarn` install
- Navigate to `/services`
- Execute a `dotnet restore` to restore nuget packages for the solution
- Navigate back to the root directory
- Execute a `yarn run:all`
- Open a browser to `localhost:4200`
