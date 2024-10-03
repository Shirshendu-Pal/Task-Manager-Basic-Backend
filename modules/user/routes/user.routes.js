const express = require("express");
const router = express.Router();
const validate = require("../../../helpers/validate");
const  userValidation  = require("../validations/user.validations");
const userController = require("../controllers/user.controller");
const multer = require('multer');
const { storage } = require("../../../configuration/storage");
const { authorize } = require("../../../authwires/auth");
const upload = multer({ storage: storage });


/**
 * @swagger
 * /user/add-user:
 *   post:
 *     summary: fetch color preferences
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: Connection details
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: user name
 *     responses:
 *        200:
 *          description: Connection created successfully.
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Server Error
 */

router.post('/add-user', validate(userValidation.addUser), userController.addUser)



// authorize routes
router.use(authorize)



/**
 * @swagger
 * /user/edit-user:
 *   post:
 *     summary: fetch color preferences
 *     tags:
 *       - User
 *     security:
 *       - Token: []
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: Connection details
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: user name
 *     responses:
 *        200:
 *          description: Connection created successfully.
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Server Error
 */


router.post('/edit-user', validate(userValidation.editUser), userController.editUser)
// router.post('/get-user', validate(userValidation.getUser), userController.getUser)
// router.post('/delete-user', validate(userValidation.deleteUser), userController.deleteUser)


module.exports = router;
