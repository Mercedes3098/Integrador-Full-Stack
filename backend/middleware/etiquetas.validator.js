import expressValidator from "express-validator";
const { check, param, validationResult } = expressValidator;

export const valCreateEtiqueta = [
  check("nombre")
    .isString()
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio y debe ser un texto."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const valEtiquetaId = [
  param("id")
    .isInt()
    .withMessage("El ID de la etiqueta debe ser un número entero."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const valNotaEtiqueta = [
  check("id_nota")
    .isInt()
    .withMessage("El ID de la nota debe ser un número entero."),
  check("id_etiqueta")
    .isInt()
    .withMessage("El ID de la etiqueta debe ser un número entero."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
