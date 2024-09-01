const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);

    // SE NÃO HOUVER ERROS, PROSSEGUE COM A REQUISIÇÃO
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];

    errors.array().map((err) => extractedErrors.push(err.msg));

    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = validate