/**
 * @jest-environment node
 */
import { GET as getUsers } from '@/app/api/users/route';
import { POST as createUser } from '@/app/api/users/route';
import { GET as getPosts } from '@/app/api/posts/route';
import { GET as getProjects } from '@/app/api/projects/route';
import { GET as getHealth } from '@/app/api/route';

describe('API routes', () => {
  describe('GET /api (health check)', () => {
    it('returns status ok', async () => {
      const response = await getHealth();
      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data.status).toBe('ok');
      expect(data.database).toBe('connected');
    });
  });

  describe('GET /api/users', () => {
    it('returns a list of users', async () => {
      const response = await getUsers();
      const data = await response.json();
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('email');
      expect(data[0]).toHaveProperty('posts');
    });
  });

  describe('GET /api/posts', () => {
    it('returns a list of posts', async () => {
      const response = await getPosts();
      const data = await response.json();
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      if (data.length > 0) {
        expect(data[0]).toHaveProperty('title');
        expect(data[0]).toHaveProperty('author');
      }
    });
  });

  describe('GET /api/projects', () => {
    it('returns a list of projects', async () => {
      const response = await getProjects();
      const data = await response.json();
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      if (data.length > 0) {
        expect(data[0]).toHaveProperty('title');
        expect(data[0]).toHaveProperty('stack');
      }
    });
  });

  describe('write API protection', () => {
    const originalKey = process.env.API_WRITE_KEY;

    afterEach(() => {
      if (originalKey === undefined) delete process.env.API_WRITE_KEY;
      else process.env.API_WRITE_KEY = originalKey;
    });

    it('rejects writes when the API key is not configured', async () => {
      delete process.env.API_WRITE_KEY;

      const response = await createUser(
        new Request('http://localhost/api/users', {
          method: 'POST',
          body: JSON.stringify({ email: 'new@example.com' }),
        }),
      );

      expect(response.status).toBe(503);
    });

    it('rejects malformed JSON after authentication', async () => {
      process.env.API_WRITE_KEY = 'test-key';

      const response = await createUser(
        new Request('http://localhost/api/users', {
          method: 'POST',
          headers: { authorization: 'Bearer test-key' },
          body: '{',
        }),
      );

      expect(response.status).toBe(400);
      expect((await response.json()).error).toBe('Invalid JSON body');
    });
  });
});
