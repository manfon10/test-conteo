import { Router } from "express";

import { UserDataSourceImpl, UserRepositoryImpl } from "../infraestructure";
import {
  createUserSchema,
  filterSearchUserSchema,
  filterUserIdSchema,
  updateUserSchema,
} from "../domain/dtos";

import { UserController } from "./controllers";
import { validatorHandler } from "./middlewares/validation.handlers";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userDataSource = new UserDataSourceImpl();
    const userRepository = new UserRepositoryImpl(userDataSource);

    const userController = new UserController(userRepository);

    /**
     * @swagger
     * /user/create:
     *   post:
     *     summary: Crear un nuevo usuario
     *     tags: [Usuarios]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserInput'
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     */

    router.post(
      "/create",
      validatorHandler(createUserSchema, "body"),
      userController.create.bind(userController)
    );

    /**
     * @swagger
     * /user:
     *   get:
     *     summary: Obtener lista de usuarios
     *     tags: [Usuarios]
     *     parameters:
     *       - $ref: '#/components/parameters/pageParam'
     *       - $ref: '#/components/parameters/limitParam'
     *     responses:
     *       200:
     *         description: Lista de usuarios paginada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/PaginatedUsers'
     */

    router.get("/", userController.getUsers.bind(userController));

    /**
     * @swagger
     * /user/search:
     *   get:
     *     summary: Buscar usuarios por ciudad
     *     tags: [Usuarios]
     *     parameters:
     *       - $ref: '#/components/parameters/cityParam'
     *       - $ref: '#/components/parameters/pageParam'
     *       - $ref: '#/components/parameters/limitParam'
     *     responses:
     *       200:
     *         description: Lista de usuarios paginada filtrada por ciudad
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/PaginatedUsers'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     */

    router.get(
      "/search",
      validatorHandler(filterSearchUserSchema, "query"),
      userController.findByCity.bind(userController)
    );

    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     summary: Obtener un usuario por ID
     *     tags: [Usuarios]
     *     parameters:
     *       - $ref: '#/components/parameters/userId'
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     */

    router.get(
      "/:id",
      validatorHandler(filterUserIdSchema, "params"),
      userController.getUserById.bind(userController)
    );

    /**
     * @swagger
     * /user/{id}:
     *   put:
     *     summary: Actualizar un usuario por ID
     *     tags: [Usuarios]
     *     parameters:
     *       - $ref: '#/components/parameters/userId'
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserInput'
     *     responses:
     *       200:
     *         description: Usuario actualizado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     */

    router.put(
      "/:id",
      validatorHandler(filterUserIdSchema, "params"),
      validatorHandler(updateUserSchema, "body"),
      userController.updateUser.bind(userController)
    );

    /**
     * @swagger
     * /user/{id}:
     *   delete:
     *     summary: Eliminar un usuario por ID
     *     tags: [Usuarios]
     *     parameters:
     *       - $ref: '#/components/parameters/userId'
     *     responses:
     *       204:
     *         description: Usuario eliminado exitosamente
     */

    router.delete(
      "/:id",
      validatorHandler(filterUserIdSchema, "params"),
      userController.deleteUser.bind(userController)
    );

    return router;
  }
}
