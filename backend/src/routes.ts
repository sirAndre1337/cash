import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { GetBalanceUserController } from "./useCases/getBalanceUser/GetBalanceUserController";
import { GetTransactionsUserController } from "./useCases/getTransactionsUser/GetTransactionsUserController";
import { GetUserByTokenController } from "./useCases/getUserByToken/GetUserByTokenController";
import { UserTransactionController } from "./useCases/userTransaction/UserTransactionController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getBalanceUserController = new GetBalanceUserController();
const userTransactionController = new UserTransactionController();
const getTransactionsUserController = new GetTransactionsUserController();
const getUserByTokenController = new GetUserByTokenController();

router.post("/users" , createUserController.handle)
router.post("/login" , authenticateUserController.handle)
router.get("/balance" , ensureAuthenticated , getBalanceUserController.handle)
router.post("/transaction" , ensureAuthenticated , userTransactionController.handle)
router.get("/getUserTransaction" , ensureAuthenticated , getTransactionsUserController.handle)
router.get("/recoverUserInformation" , ensureAuthenticated , getUserByTokenController.handle)

export {router};