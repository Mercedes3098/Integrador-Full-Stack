import expressValidator from "express-validator";
const { check, param, validationResult } = expressValidator;

export const valCreateUser = [
  check("nombre")
    .isString().withMessage("El nombre debe ser un texto.")
    .notEmpty().withMessage("El nombre es requerido."),
  check("email")
    .isEmail().withMessage("El email debe ser válido.")
    .notEmpty().withMessage("El email es requerido."),
  check("password")
    .isString().withMessage("La contraseña debe ser un texto.")
    .notEmpty().withMessage("La contraseña es requerida."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const valUpdateUser = [
  param("id").isInt().withMessage("El ID del usuario debe ser un número entero."),
  check("nombre").optional().isString(),
  check("email").optional().isEmail(),
  check("password").optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const valUserId = [
  param("id").isInt().withMessage("El ID del usuario debe ser un número entero."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
