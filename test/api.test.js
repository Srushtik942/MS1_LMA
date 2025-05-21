const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  it('should return 200 for creating a user', async () => {
    const res = await request(app).post('/api/users').send({
      username: 'abhijeet',
      email: 'abhi@gmail.com',
    });


    expect(res.statusCode).toBe(200);
  });
});
