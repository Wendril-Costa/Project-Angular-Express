const errorHandling = (err, req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || 'Erro inesperado. Por favor, tenta mais tarde';

    return res.status(status).json({ message });
};


module.exports = errorHandling;