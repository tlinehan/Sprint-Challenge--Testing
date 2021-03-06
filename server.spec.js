const request = require('supertest');

const server = require('./server.js');


describe ('GET /games', () => {
    it('should return status code 200 from /games, with list of games', async () => {
        const response = await request(server).get('/games');
        expect(response.status).toEqual(200);
    });
    it('should return an array, even if empty', async () => {
        const response = await request(server).get('/games');
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('POST /games', () => {
    it('should return 422 if incomplete fields submitted', async () => {
        const response = await request(server).post('/games').send({ title: 'Pacman' }) 
        expect(response.status).toEqual(422);
    });
    it('should return 201 if created', async () => {
        const response = await request(server).post('/games').send(
            { 
                title: 'Command & Conquer: Red Alert',
                genre: 'rts',
                releaseYear: 1996
            }
        ); 
        expect(response.status).toEqual(201);
    });
});

describe('Stretch - POST /games', () => {
    it('should return 405 if duplicate title found', async () => {
        const response = await request(server).post('/games').send(
            { 
                title: 'SOCOM II',
                genre: 'fps',
                releaseYear: 2003
            }
        ); 
        expect(response.status).toEqual(405);
    });
});