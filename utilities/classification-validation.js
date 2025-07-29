const { body, validationResult } = require("express-validator")
const validate = {}
const utilities = require(".")

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        // classification_name is required and must be string
        body("classification_name")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Classification name is required.")
            .isAlphanumeric()
            .withMessage("Classification name must be alphanumeric."),
    ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}

module.exports = validate
