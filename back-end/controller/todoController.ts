import { Request, Response } from "express";
import db from "../Database";

export const getTodoList = async (req: Request, res: Response) => {
  try {
    const todos = await db('todoTable').select('*');
    res.json(
        {
            success: true,
            data: todos,
            message: 'get todo list success',
            code:200,
          }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export const addTodoList = async (req: Request, res: Response) => {
  const { title, content, completionTime, creater,isFinished} = req.body;
  console.log(req.body);
  try {
    const newTodo = await db('todoTable').insert({
      title: title,
      content: content,
      completionTime:completionTime,
      creater: creater,
      isFinished:isFinished,
    });
    console.log(newTodo);
    res.json(
        {
            success: true,
            message: 'add todo list success',
            code:200,
          }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
  
}
export const deleteTodoList = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const newTodo = await db('todoTable').delete().where('id', id);
    res.json(
        {
            success: true,
            message: 'delete todo list success',
            code:200,
          }
    );
  } catch (error) {
    res.status(500).json({ error:error });
  }
  
}
export const editTodoList = async (req: Request, res: Response) => {
  const { id, title, content, completionTime, creater,isFinished} = req.body;
  try {
    const newTodo = await db('todoTable').update({
      title,
      content,
      completionTime,
      creater,
      isFinished,
    }).where('id', id);
    res.json(
        {
            success: true,
            message: 'edit todo list success',
            code:200,
          }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
  
}