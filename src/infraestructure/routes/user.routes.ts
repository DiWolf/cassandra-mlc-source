import {
  CreateUserUseCase,
  getInfoUserTokenUseCase,
} from "@application/use-cases/users";
import { UserController } from "@infraestructure/controllers/users/UserController";
import { UserRepositoryImpl } from "@infraestructure/repositories/users/UserRepositoryImpl";
import { Router } from "express";

const router = Router();
const userRepository = new UserRepositoryImpl();

// Implementamos casos de uso
const createUser = new CreateUserUseCase(userRepository);
const loginUser = new getInfoUserTokenUseCase(userRepository);
// Los inyectamos
const userController = new UserController(createUser, loginUser);

router.post("/", userController.create.bind(userController));
router.post("/login",userController.login.bind(userController));

export default router;
