using Core.Models;

namespace Core.Controllers;

public static class TodosController
{
  private static Todo[] todos = [
    new(1, "Walk the dog"),
    new(2, "Do the dishes", DateOnly.FromDateTime(DateTime.Now)),
    new(3, "Do the laundry", DateOnly.FromDateTime(DateTime.Now.AddDays(1))),
    new(4, "Clean the bathroom"),
    new(5, "Clean the car", DateOnly.FromDateTime(DateTime.Now.AddDays(2)))
];
  public static async Task<IResult> Get() 
  {
    return Results.Ok(todos);
  }

  public static async Task<IResult> Get(int id) 
  {
    return Results.Ok(todos.First(x => x.Id == id));
  }
}
