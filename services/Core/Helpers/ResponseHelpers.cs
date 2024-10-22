using System;
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using Shared;

namespace Core.Helpers;

public static class ResponseHelpers
{
  public static async Task Ok(this HttpContext context, string message)
  {
    await context.WriteResponse(HttpStatusCode.OK, message);
  }

  public static async Task Ok<T>(this HttpContext context, T body) where T : class
  {
    await context.WriteResponse(HttpStatusCode.OK, body);
  }

  public static async Task NotImplemented(this HttpContext context)
  {
    await context.WriteResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
  }

  public static async Task UncaughtException(this HttpContext context, Exception exception)
  {
    await context.WriteResponse(HttpStatusCode.InternalServerError, exception.Message);
  }
    
  private static async Task WriteResponse<TResponseType>(this HttpContext context, HttpStatusCode statusCode, TResponseType body) where TResponseType : class
  {
    context.Response.StatusCode = (int)statusCode;
    context.Response.ContentType = "application/json";
    await context.Response.WriteAsync(JsonSerializer.Serialize(body, typeof(TResponseType), ApiSerializerContext.Default));
  }
}
