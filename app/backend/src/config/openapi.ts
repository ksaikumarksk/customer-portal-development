export const openapi = {
  openapi: '3.0.0', info: { title: 'Multimedia Manager API', version: '1.0.0' },
  paths: {
    '/health': { get: { responses: { '200': { description: 'Healthy' } } } },
    '/api/auth/register': { post: { requestBody: { required: true }, responses: { '201': { description: 'Registered' }, '400': { description: 'Validation error' }, '409': { description: 'Duplicate email' } } } },
    '/api/auth/login': { post: { requestBody: { required: true }, responses: { '200': { description: 'Logged in' }, '401': { description: 'Invalid credentials' } } } },
    '/api/auth/logout': { post: { responses: { '204': { description: 'Logged out' } } } },
    '/api/auth/me': { get: { responses: { '200': { description: 'Current user' }, '401': { description: 'Unauthorized' } } } },
    '/api/files': { get: { responses: { '200': { description: 'List files' }, '401': { description: 'Unauthorized' } } }, post: { requestBody: { required: true }, responses: { '201': { description: 'Uploaded' }, '400': { description: 'Missing file' }, '401': { description: 'Unauthorized' } } } },
    '/api/files/{id}': { get: { responses: { '200': { description: 'File details' }, '404': { description: 'Not found' } } }, delete: { responses: { '204': { description: 'Deleted' }, '404': { description: 'Not found' } } } },
  },
}
