using System;
using System.Net;
using System.Text.Json;
using Shared;

namespace Core.Helpers;

public static class ResponseHelpers
{
    public static async Task WriteResponse(this HttpContext context, HttpStatusCode statusCode)
    {
        await context.WriteResponse<string>(statusCode, "");
    }
    
    public static async Task WriteResponse<TResponseType>(this HttpContext context, HttpStatusCode statusCode, TResponseType body) where TResponseType : class
    {
        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(JsonSerializer.Serialize(body, typeof(TResponseType), ApiSerializerContext.Default));
    }
}
