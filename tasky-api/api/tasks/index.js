import asyncHandler from 'express-async-handler';
import express from 'express';
import Task from './taskModel';

const router = express.Router(); // eslint-disable-line

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('userId', 'username');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server error: Failed to retrieve tasks.', error: err.message });
    }
});

// Create a task
router.post('/', asyncHandler(async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: 'Error: Task creation failed.', error: err.message });
    }
}));

// Update Task
router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id;
        const result = await Task.updateOne({ _id: req.params.id }, req.body);
        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'Task Updated Successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to find Task' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error: Failed to update task.', error: err.message });
    }
});

// Delete Task
router.delete('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id;
        const result = await Task.deleteOne({ _id: req.params.id });
        if (result.deletedCount) {
            res.status(204).json();
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to find Task' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error: Failed to delete task.', error: err.message });
    }
});

export default router;
