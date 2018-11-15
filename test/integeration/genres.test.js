const request = require('supertest');
const moongoos = require('mongoose');
const {
    Genere
} = require('../../models/generes')
const {
    User
} = require('../../models/user');
let server;
describe("/api/generes", () => {
    beforeEach(() => {
        server = require("../../index");
    })
    afterEach(async () => {
        server.close();
        await Genere.remove({})
    })

    describe('GET /', () => {
        it("should return all generes", async () => {
            await Genere.collection.insertMany([{
                    name: 'genere1'
                },
                {
                    name: 'genere2'
                }
            ])

            const res = await request(server).get('/api/generes');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genere1')).toBeTruthy();
        });
    });


    describe('GET /:id', () => {
        it("should return a genere if valid id is passed", async () => {
            const genere = new Genere({
                name: 'genere1'
            });
            await genere.save();


            const res = await request(server).get('/api/generes/' + genere._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'genere1');

        });


        it("should return 404 if id is invalid", async () => {
            const res = await request(server).get('/api/generes/1');
            expect(res.status).toBe(404);

        })

        it("should return 404 if cannot find id", async () => {
            const objectId = moongoos.Types.ObjectId();
            const res = await request(server).get('/api/generes/' + objectId);
            expect(res.status).toBe(404);
            expect(res.text).toMatch(/.*found/);
        })
    });

    describe('POST /:id', () => {
        it("should return 401 if request header does not contain a token", async () => {
            const res = await request(server).post('/api/generes')
                .send({
                    name: 'generes'
                });

            expect(res.status).toBe(401);

        });


        it("should return 400 if genere name is less than 5", async () => {
            const token = new User().generateAuthToke();

            const res = await request(server).post('/api/generes')
                .set('x-auth-token', token)
                .send({
                    name: '123'
                });


            expect(res.status).toBe(400);


        });

        it("should return 400 if genere name is longer than 50", async () => {
            const token = new User().generateAuthToke();

            const mockName = new Array(66).join('a');

            const res = await request(server).post('/api/generes')
                .set('x-auth-token', token)
                .send({
                    name: mockName
                });


            expect(res.status).toBe(400);

        });


        it("should return 200 if post success", async () => {
            const token = new User().generateAuthToke();

            const res = await request(server).post('/api/generes')
                .set('x-auth-token', token)
                .send({
                    name: 'frank'
                })


            const genere = Genere.find({
                name: 'frank'
            })

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'frank');
            expect(genere).not.toBeNull();



        });

    })
})