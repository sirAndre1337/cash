import request from "supertest";
import { app } from "../src/app";

describe("Create user", () => {
    
    it('should be able to create a new user', async () => {
        const time = Date.now();
        const username = `andre${time}`;
        const password = 'Admin1337';
        return request(app).post('/users')
            .send({ username, password })
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('id');
                expect(res.body).not.toHaveProperty('password');
            })
    })

    it('should not be able to create an existing user', async () => {
        const time = Date.now();
        const username = `andre${time}`;
        const password = 'Admin1337';
        await request(app).post('/users')
            .send({ username, password })

        await request(app).post('/users')
            .send({ username, password })
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body.message).toBe('User already exists!')
            })
    })

    it('should not be able to create a new user with no username', () => {
        const password = 'Admin1337';
        return request(app).post('/users')
            .send({ password })
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('Username field is a mandatory attribute')
            })
    })

    it('should not be able to create a new user with 2 or less characters', () => {
        const username = 'an';
        const password = 'Admin1337';
        return request(app).post('/users')
            .send({ username, password })
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('Username must have at least 3 characters')
            })
    })

    it('should not be able to create a new user with no password', () => {
        const time = Date.now();
        const username = `andre${time}`;
        return request(app).post('/users')
            .send({ username })
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('Password field is a mandatory attribute')
            })
    })

    it('should not be able to create a user with a password of less than 8 characters', () => {
        const time = Date.now();
        const username = `andre${time}`;
        const password = 'Admin13';
        return request(app).post('/users')
            .send({ username, password })
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('Password must have at least 8 characters a number and a capital letter')
            })
    })

    it('should not be able to create a user with a password with no number', () => {
        const time = Date.now();
        const username = `andre${time}`;
        const password = 'Adminnnnnnnn';
        return request(app).post('/users')
            .send({ username, password })
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('Password must have at least 8 characters a number and a capital letter')
            })
    })

    it('should not be able to create a user with a password with no capital letter', () => {
        const time = Date.now();
        const username = `andre${time}`;
        const password = 'admin1337';
        return request(app).post('/users')
            .send({ username, password })
            .then((res) => {
                expect(res.status).toBe(400),
                    expect(res.body.message).toBe('Password must have at least 8 characters a number and a capital letter')
            })
    })

    it('should create a account after create a success user' , () => {
        const time = Date.now();
        const username = `andre${time}`;
        const password = 'Admin1337';
        return request(app).post('/users')
            .send({username, password})
            .then((res) => {
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('account');
            })
    })

    it('should create a account with a balance of 100 after create a success user' , () => {
        const time = Date.now();
        const username = `andre${time}`;
        const password = 'Admin1337';
        return request(app).post('/users')
            .send({username, password})
            .then((res) => {
                expect(res.status).toBe(200)
                expect(res.body.account.balance).toBe(100);
            })
    })
})