import { rest } from "msw";
import { v4 as uuid } from "uuid";
import { TodoDto } from "~/types/todo";

const todoStore: TodoDto[] = [
  {
    id: "c6ca9c61-0a56-4545-8952-b9035f482d7d",
    title: "todo1",
    finishedAt: new Date(),
  },
  {
    id: "92f8c99d-e42c-4a95-9ae4-2dab2f44e974",
    title: "todo2",
    finishedAt: null,
  },
  {
    id: "0b75e34d-1b3a-4563-bf30-38aceee37d66",
    title: "todo3",
    finishedAt: null,
  },
];

export const handlers = [
  rest.get(endpoint("/todos"), async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: todoStore.length,
        items: [...todoStore],
      })
    );
  }),
  rest.post(endpoint("/todos"), async (req, res, ctx) => {
    const { title } = await req.json();

    if (title.length < 0) {
      throw new Error("title is required");
    }
    const id = uuid();
    todoStore.push({ id, title, finishedAt: null });

    return res(
      ctx.status(200),
      ctx.json({
        id,
      })
    );
  }),
  rest.put(endpoint("/todos/is_finished"), async (req, res, ctx) => {
    const [id, isFinished] = ["id", "isFinished"].map((queryName) =>
      req.url.searchParams.get(queryName)
    );

    const todo = todoStore.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error("todo not found");
    }

    todo.finishedAt = isFinished === "true" ? new Date() : null;

    return res(ctx.status(200));
  }),
];
