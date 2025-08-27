export default {
  routes: [
    {
      method: 'GET',
      path: '/brands',
      handler: 'brand.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/brands/:id',
      handler: 'brand.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/brands',
      handler: 'brand.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/brands/:id',
      handler: 'brand.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/brands/:id',
      handler: 'brand.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
