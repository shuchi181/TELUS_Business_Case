const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Form = require('../models/Form');

/**
 * @route   GET user/forms
 * @desc    GET all forms that are editable
 * @access  PUBLIC
 */
router.get('/forms', async (req, res) => {
    try {
        const user = await User.find();

        res.json(user.forms);
    } catch (err) {
        console.error(err);
    }
});

/**
 * @route   GET user/published-forms
 * @desc    GET all forms that are published
 * @access  PUBLIC
 */
router.get('/published-forms', async (req, res) => {
    try {
        const user = await User.find();

        res.json(user.publishedForms);
    } catch (err) {
        
    }
});

/**
 * @route   POST user/new-form
 * @desc    POST make a new form
 * @access  PUBLIC
 */
router.post('/new-form', async (req, res) => {
    try {
        const user = await User.find();
        let form = new Form();

        user.forms.push({
            formId: form._id,
            published: false
        });

        await form.save();
        await user.save();

        res.json({ msg: "Successfully created a new form!" });
    } catch (err) {
        console.error(err);
    }
});

/**
 * @route   GET edit-form/:formId
 * @desc    GET form from formId
 * @access  PUBLIC
 */
router.get('/edit-form/:formId', async (req, res) => {
    try {
        const formId = req.params.formId;
        const form = await Form.findById(formId);

        if(!form) return res.json({ msg: "Form does not exist" });

        res.json(form);
    } catch (err) {
        console.error(err);
    }
});



module.exports = router;