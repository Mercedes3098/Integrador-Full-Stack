import expressValidator from "express-validator";
const { check, param, validationResult } = expressValidator;

export const valCreateNota = [
  check("titulo")
    .isString()
    .notEmpty()
    .withMessage("El título es obligatorio y debe ser un texto."),
  check("contenido")
    .isString()
    .notEmpty()
    .withMessage("El contenido es obligatorio y debe ser un texto."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const valNotaId = [
  param("id")
    .isInt()
    .withMessage("El ID de la nota debe ser un número entero."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const valUpdateNota = [
  param("id").isInt().withMessage("El ID de la nota debe ser un número entero."),
  check("titulo").optional().isString().withMessage("El título debe ser un texto"),
  check("contenido").optional().isString().withMessage("El contenido debe ser un texto"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
