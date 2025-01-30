const express = require("express");
const router = express.Router();
const validate = require("../../../helpers/validate");
const  taskValidation  = require("../validations/task.validations");
const taskController = require("../controllers/task.controller");
const multer = require('multer');
const { storage } = require("../../../configuration/storage");
const upload = multer({ storage: storage });
/**
 * @swagger
 * /task:
 *   post:
 *     summary: add task details
 *     tags:
 *       - Task
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: Add Task
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               taskName:
 *                 type: string
 *                 description: task name
 *     responses:
 *        200:
 *          description: Connection created successfully.
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Server Error
 */

router.post('/task', validate(taskValidation.addTask), taskController.addTask)
/**
 * @swagger
 * /task:
 *   get:
 *     summary: Fetch color preferences
 *     tags:
 *       - Task
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Status flag (true or false)
 *         schema:
 *           type: boolean
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Connection created successfully.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */



router.get('/task', validate(taskValidation.getTask), taskController.getTasks)

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update task by ID
 *     tags:
 *       - Task
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task updated successfully.
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */

router.put('/task/:id', validate(taskValidation.editTask), taskController.editTask)

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Deletes a task based on the given ID.
 *     tags:
 *       - Task
 *     security:
 *       - Token: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the task to be deleted
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */


router.delete('/task/:id', validate(taskValidation.deleteTask), taskController.deleteTask)






module.exports = router