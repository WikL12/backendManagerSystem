import express, { Request, Response } from "express";
import { middlerware } from "../middware/middleware";
import {getTodoList,addTodoList,deleteTodoList,editTodoList} from '../controller/todoController'
const router = express.Router();

router.get('/',middlerware,getTodoList )
router.post('/addToDo',middlerware,addTodoList )
router.post('/deleteToDo',middlerware, deleteTodoList )
router.post('/editToDo',middlerware,editTodoList )

export default router;