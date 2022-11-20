import { CreateUserUseCase } from "../src/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../src/useCases/authenticateUser/AuthenticateUserUseCase";
import { app } from "../src/app"
import request from "supertest"

describe('get Transfers from user', () => {

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

    let user1: User;
    let user2: User
    let userAuth1: UserAutheticated
    let userAuth2: UserAutheticated


    beforeAll(async () => {
        const createUserUseCase = new CreateUserUseCase();
        const authenticateUserUseCase = new AuthenticateUserUseCase();
        user2 = await createUserUseCase.execute({ username: `andre${Date.now()}`, password: 'Admin1337' })
        user1 = await createUserUseCase.execute({ username: `andre${Date.now()}`, password: 'Admin1337' })
        userAuth1 = await authenticateUserUseCase.execute({ username: user2.username, password: 'Admin1337' })
        userAuth2 = await authenticateUserUseCase.execute({ username: user1.username, password: 'Admin1337' })
    })

    it('Should be able to view the financial transactions (cash-out and cash-in) that he participated in ', async () => {
        await request(app).post('/transaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .send({ value: 10, username: user1.username })

        await request(app).get('/getUserTransaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThan(0)
                expect(res.body[0].userNameDebited).toBe(user2.username)
                expect(res.body[0].userNameCredited).toBe(user1.username)
            })
    })

    it('User should be able to filter the financial transactions he participated in by cash-out ', async () => {
        await request(app).post('/transaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .send({ value: 20, username: user1.username })

        await request(app).get('/getUserTransaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .query({ onlyDebited: true })
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThan(0)
                expect(res.body[0].userNameDebited).toBe(user2.username)
                expect(res.body[0].userNameCredited).toBe(user1.username)
            })
    })

    it('User should be able to filter the financial transactions he participated in by cash-in ', async () => {
        await request(app).post('/transaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .send({ value: 20, username: user1.username })

        await request(app).post('/transaction')
            .set('Authorization', `Bearer ${userAuth2.token}`)
            .send({ value: 20, username: user2.username })

        await request(app).get('/getUserTransaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .query({ onlyCredited: true })
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThan(0)
                expect(res.body[0].userNameDebited).toBe(user1.username)
                expect(res.body[0].userNameCredited).toBe(user2.username)
            })
    })

    it('User should be able to filter the financial transactions he participated in by date ', async () => {
        const date = new Date().toISOString();

        await request(app).post('/transaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .send({ value: 20, username: user1.username })

        await request(app).post('/transaction')
            .set('Authorization', `Bearer ${userAuth2.token}`)
            .send({ value: 20, username: user2.username })

        await request(app).get('/getUserTransaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .query({ date })
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThan(0)
            })
    })

    it('Should not show any transfers with a wrong date', async () => {
        const date = '1995-03-28';

        await request(app).post('/transaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .send({ value: 20, username: user1.username })

        await request(app).post('/transaction')
            .set('Authorization', `Bearer ${userAuth2.token}`)
            .send({ value: 20, username: user2.username })

        await request(app).get('/getUserTransaction')
            .set('Authorization', `Bearer ${userAuth1.token}`)
            .query({ date })
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.length).toBeUndefined()
                expect(res.body.message).toBe('No transactions')
            })
    })
})