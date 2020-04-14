import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  const { name, email } = request.body;

  const user = {
    name,
    email,
  };

  return user;
});

export default routes;
