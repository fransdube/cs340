const { body, validationResult } = require("express-validator")
const validate = {}
const utilities = require(".")

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        body("inv_make")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Make is required."),
        body("inv_model")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Model is required."),
        body("inv_year")
            .trim()
            .isNumeric()
            .isLength({ min: 4, max: 4 })
            .withMessage("Year is required."),
        body("inv_description")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Description is required."),
        body("inv_image")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Image path is required."),
        body("inv_thumbnail")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Thumbnail path is required."),
        body("inv_price")
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .withMessage("Price is required."),
        body("inv_miles")
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .withMessage("Miles is required."),
        body("inv_color")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Color is required."),
        body("classification_id")
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .withMessage("Classification is required."),
    ]
}

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationList = await utilities.buildClassificationList(classification_id)
        res.render("inventory/add-inventory", {
            errors,
            title: "Add Inventory",
            nav,
            classificationList,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
        })
        return
    }
    next()
}

module.exports = validate
