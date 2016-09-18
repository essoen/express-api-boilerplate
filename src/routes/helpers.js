import express from 'express';


const bindControllerToCRUDRoutes = controller => {
    const router = express.Router();
    router.get('/', controller.list);
    router.get('/:id', controller.retrieve);
    router.post('/', controller.create);
    router.delete('/:id', controller.destroy);
    router.put('/:id', controller.update);
    return router;
};

export default bindControllerToCRUDRoutes;
