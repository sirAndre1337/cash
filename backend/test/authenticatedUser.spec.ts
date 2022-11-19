import { app } from "../src/app"
import request from "supertest";
import { CreateUserUseCase } from "../src/useCases/createUser/CreateUserUseCase";

type User = {
    id: number
    username: string
    accountId: number
}

let user: User;
const MAIN_ROUTE = '/login'

beforeAll(async () => {
    const createUserUseCase = new CreateUserUseCase();
    user = await createUserUseCase.execute({ username: `andre${Date.now()}`, password: 'Admin1337' })
})

describe('authenticate User', () => {
    it('should return a token after a login success', () => {
        return request(app).post(MAIN_ROUTE)
            .send({ username : user.username, password: 'Admin1337' })
            .then((res) => {
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty("token")
            })
    })

    it('should not return a token with no username', () => {
        return request(app).post(MAIN_ROUTE)
            .send({ password: 'Admin1337' })
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('Username field is a mandatory attribute')
            })
    })

    it('should not return a token with no password', () => {
        return request(app).post(MAIN_ROUTE)
            .send({ username : user.username })
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('Password field is a mandatory attribute')
            })
    })

    it('should not return a token with username wrong', () => {
        return request(app).post(MAIN_ROUTE)
            .send({ username : `${user.username}20` , password: 'Admin1337'})
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('User or password incorrect!')
            })
    })

    it('should not return a token with password wrong', () => {
        return request(app).post(MAIN_ROUTE)
            .send({ username : user.username , password: 'Admin1336'})
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('User or password incorrect!')
            })
    })

})
