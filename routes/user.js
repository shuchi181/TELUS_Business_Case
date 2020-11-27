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
        const user = await User.find({});
        if(!user[0]) return res.json([]);

        // Get all formId of editable/non published forms
        let editIds = new Array();
        user[0].forms.map(form => {
            editIds.push(form.formId);
        });

        const editForms = await Form.find(
            {_id: { $in: editIds } }
        );
        
        res.json(editForms);   
    } catch (err) {
        console.error(err);
    }
});

/**
 * @route   POST user/publish-form
 * @desc    POST publish form
 * @access  PUBLIC
 */
router.post('/publish-form/:formId', async (req, res) => {
    try {
        
        // Add formId to publishedForms
        await User.findOneAndUpdate({}, { $addToSet: { publishedForms: { formId: req.params.formId } } }, { new: true, upsert: true, returnOriginal: false } );
        // Remove formId from the forms array because its been published
        await User.findOneAndUpdate({}, { $pull: { forms: { formId: req.params.formId } } }, { new: true, upsert: true, returnOriginal: false } );
        
        const user = await User.find({});
        if(!user[0]) return json([]);

        let publishedIds = new Array();
        user[0].publishedForms.map(form => {
            publishedIds.push(form.formId);
        });

        let editIds = new Array();
        user[0].forms.map(form => {
            editIds.push(form.formId);
        });

        const editForms = await Form.find(
            {_id: { $in: editIds } }
        );

        const publishedForms = await Form.find(
            {_id: { $in: publishedIds } }
        );
        

        res.json([editForms, publishedForms]);

    } catch (err) {
        console.log(err);
    }
});

/**
 * @route   GET user/published-forms
 * @desc    GET all forms that are published
 * @access  PUBLIC
 */
router.get('/published-forms', async (req, res) => {
    try {
        const user = await User.find({});
        if(!user[0]) return json([]);

        let formIds = new Array();
        user[0].publishedForms.map(form => {
            formIds.push(form.formId);
        });

        const forms = await Form.find(
            {_id: { $in: formIds } }
        );

        res.json(forms);
    } catch (err) {
        console.error(err);
    }
});

/**
 * @route   GET user/get-notifications
 * @desc    GET all notifications
 * @access  PUBLIC
 */
router.get('/get-notifications', async (req, res) => {
    try {
        const user = await User.find({});
        
        res.json(user[0].notifications);
    } catch (err) {
        console.error(err);
    }
});

/**
 * @route   POST user/reset-notifications
 * @desc    Remove and reset notifications
 * @access  PUBLIC
 */
router.post('/reset-notifications', async (req, res) => {
    try {
        const user = await User.updateOne({}, { $set: { notifications: { newNotification: 0, hasChecked: true } } }, {returnOriginal: false});
        if(!user[0]) return res.json([]);
        res.json(user[0].notifications);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;