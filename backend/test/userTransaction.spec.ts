import { CreateUserUseCase } from "../src/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../src/useCases/authenticateUser/AuthenticateUserUseCase";
import { app } from "../src/app"
import request from "supertest"


describe('user Transaction', () => {

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

    let userCredited: User;
    let userDebited: User
    let userAuthenticated: UserAutheticated


    beforeAll(async () => {
        const createUserUseCase = new CreateUserUseCase();
        const authenticateUserUseCase = new AuthenticateUserUseCase();
        userDebited = await createUserUseCase.execute({ username: `andre${Date.now()}`, password: 'Admin1337' })
        userCredited = await createUserUseCase.execute({ username: `andre${Date.now()}`, password: 'Admin1337' })
        userAuthenticated = await authenticateUserUseCase.execute({username : userDebited.username, password : 'Admin1337'})
    })

    it('Should be able to transfer balance to another user', () => {
        return request(app).post('/transaction')
        .set('Authorization', `Bearer ${userAuthenticated.token}`)
        .send({value : 40, username : userCredited.username})
        .then((res)=> {
            expect(res.status).toBe(200)
            expect(res.body).toBe(60)
        })
    })

    it('Should not be able to transfer balance with not enough cash' , () => {
        return request(app).post('/transaction')
        .set('Authorization', `Bearer ${userAuthenticated.token}`)
        .send({value : 200, username : userCredited.username})
        .then((res)=> {
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Insufficient balance for this transaction')
        })
    })

    it('Should not be able to transfer balance to yourself' , () => {
        return request(app).post('/transaction')
        .set('Authorization', `Bearer ${userAuthenticated.token}`)
        .send({value : 50, username : userDebited.username})
        .then((res)=> {
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('You cant transfer to yourself')
        })
    })

    it('Should not be able to transfer balance to non-existent user' , () => {
        return request(app).post('/transaction')
        .set('Authorization', `Bearer ${userAuthenticated.token}`)
        .send({value : 50, username : `${userCredited.username}simple`})
        .then((res)=> {
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('User invalid!')
        })
    })
})