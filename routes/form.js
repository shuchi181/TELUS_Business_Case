const express = require('express');
const router = express.Router();

const Form = require('../models/Form');
/**
 * @route   GET form/:formId
 * @desc    GET form with id formId
 * @access  PUBLIC
 */
router.get('/:formId', async (req, res) => {
    try {
        const formId = req.params.formId;
        const form = await Form.findById(formId);

        res.json(form);
    } catch (err) {
        console.error(err);
    }
});

/**
 * @route   POST form/update-form/:formId
 * @desc    POST update form
 * @access  PUBLIC
 */
router.post('/update-form/:formId', async (req, res) => {
    const {...rest} = req.body;
    const formFields = { ...rest };

    try {
        const formId = req.params.formId;
        await Form.findOneAndUpdate(
            { _id: formId },
            { $set: formFields },
            { new: true, upsert: true }
        );

        res.json({ msg: "Form update was successful!" });

    } catch (err) {
        console.error(err);
    }
});

module.exports = router;