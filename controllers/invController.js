// /* const invModel = require("../models/inventory-model")
// const utilities = require("../utilities/")

// const invCont = {}

// /* ***************************
//  *  Build inventory by classification view
//  * **************************
//  */
// /* invCont.buildByClassificationId = async function (req, res, next) {
//   const classification_id = req.params.classificationId
//   const data = await invModel.getInventoryByClassificationId(classification_id)
//   const grid = await utilities.buildClassificationGrid(data)
//   let nav = await utilities.getNav()
//   const className = data[0].classification_name
//   res.render("./inventory/classification", {
//     title: className + " vehicles",
//     nav,
//     grid,
//   })
// }  */

//   invCont.buildByClassificationId = async function (req, res, next) {
//     try {
//       const classification_id = req.params.classificationId;
//       const data = await invModel.getInventoryByClassificationId(classification_id);
      
//       if (!data || data.length === 0) {
//         throw new Error('No vehicles found for this classification');
//       }
      
//       const grid = await utilities.buildClassificationGrid(data);
//       let nav = await utilities.getNav();
//       const className = data[0].classification_name;
      
//       res.render("./inventory/classification", {
//         title: className + " vehicles",
//         nav,
//         grid,
//       });
//     } catch (error) {
//       console.error('Error in buildByClassificationId:', error);
//       next(error);
//     }
//   };

const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
    
    if (!data || data.length === 0) {
      let nav = await utilities.getNav();
      return res.render("./inventory/classification", {
        title: "No Vehicles Found",
        nav,
        grid: '<p class="notice">Sorry, no matching vehicles could be found.</p>',
      });
    }
    
    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;
    
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    });
  } catch (error) {
    console.error('Controller Error:', error);
    next(error);
  }
};

module.exports = invCont;