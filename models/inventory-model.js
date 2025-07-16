// /* const pool = require("../database/")

// /* ***************************
//  *  Get all classification data
//  * ************************** */
// async function getClassifications(){
//   return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
// }

// /* ***************************
//  *  Get all inventory items and classification_name by classification_id
//  * ************************** */
// async function getInventoryByClassificationId(classification_id) {
//   try {
//     const data = await pool.query(
//       `SELECT * FROM public.inventory AS i 
//       JOIN public.classification AS c 
//       ON i.classification_id = c.classification_id 
//       WHERE i.classification_id = $1`,
//       [classification_id]
//     )
//     return data.rows
//   } catch (error) {
//     console.error("getclassificationsbyid error " + error)
//   }
// }


// // Correct way to export multiple functions
// module.exports = {
//   getClassifications,
//   getInventoryByClassificationId
// };

// // Add at the top
// console.log('Database pool connection status:', pool.totalCount); */

const pool = require("../database/");

async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
       JOIN public.classification AS c 
       ON i.classification_id = c.classification_id 
       WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getInventoryByClassificationId error: " + error);
    throw error; // Re-throw for controller to handle
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId
};