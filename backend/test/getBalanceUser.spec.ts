import { AuthenticateUserUseCase } from "../src/useCases/authenticateUser/AuthenticateUserUseCase"
import { CreateUserUseCase } from "../src/useCases/createUser/CreateUserUseCase"
import { app } from "../src/app"
import request from "supertest"

describe('get Balance', () => {

    type Account = {
        id: number
        balance: number
    }

    type User = {
        id: number
        username: string
        account: Account
    }

    type UserAutheticated = {
        token: string
        user: { id: number, username: string }
    }

    let user: User;
    let userAuthenticated: UserAutheticated


    beforeAll(async () => {
        const createUserUseCase = new CreateUserUseCase();
        const authenticateUserUseCase = new AuthenticateUserUseCase();
        user = await createUserUseCase.execute({ username: `andre${Date.now()}`, password: 'Admin1337' })
        userAuthenticated = await authenticateUserUseCase.execute({username : user.username, password : 'Admin1337'})
    })

    it('should return a balance with a valid token', () => {
        return request(app).get('/balance')
        .set('Authorization', `Bearer ${userAuthenticated.token}`)
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body).toBe('100.00');
        })
    })

    it('should not return a balance with invalid token' , () => {
        return request(app).get('/balance')
        .set('Authorization', `Bearer ${userAuthenticated.token}2`)
        .then((res) => {
            expect(res.status).toBe(401)
            expect(res.body.message).toBe('Token invalid');
        })
    })
})