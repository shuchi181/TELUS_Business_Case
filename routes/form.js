const express = require('express');
const router = express.Router();

const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

const Form = require('../models/Form');
const User = require('../models/User');
/**
 * @route   GET form/:formId
 * @desc    GET form with id formId
 * @access  PUBLIC
 */
router.get('/:formId', async (req, res) => {
    try {
        const formId = req.params.formId;
        const form = await Form.findById(formId);
        
        res.json(form.form);
    } catch (err) {
        console.error(err);
    }
});

/**
 * @route   POST form/create-form
 * @desc    POST Create a new form
 * @access  PUBLIC
 */
router.post('/create-form', async (req, res) => {
    if(!req.body) {
        return res.json({ msg: "No data was sent" });
    } 
    const {
        title,
        description,
        shortTextTitle,
        longTextTitle,
        multipleChoiceTitle,
        multipleChoiceOptions,
        checkboxTitle,
        checkboxOptions,
        dropdownTitle,
        dropdownOptions
    } = req.body;

    const formData = {
        form: {
            title: title,
            description: description,
            shortTextTitle: shortTextTitle,
            longTextTitle: longTextTitle,
            multipleChoice: {
                multipleChoiceTitle: multipleChoiceTitle,
                multipleChoiceOptions: multipleChoiceOptions,
            },
            checkbox: {
                checkboxTitle: checkboxTitle,
                checkboxOptions: checkboxOptions
            },
            dropdown: {
                dropdownTitle: dropdownTitle,
                dropdownOptions: dropdownOptions
            }
        }
    };

    try {
        let form = new Form(formData);
        await User.updateOne({}, { $push: { forms: { formId: form.id } } }, { new: true, upsert: true } );

        await form.save();
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
   const formData = {
        form: {
            title: req.body.title,
            description: req.body.description,
            shortTextTitle: req.body.shortTextTitle,
            longTextTitle: req.body.longTextTitle,
            multipleChoice: {
                multipleChoiceTitle: req.body.multipleChoiceTitle,
                multipleChoiceOptions: req.body.multipleChoiceOptions,
            },
            checkbox: {
                checkboxTitle: req.body.checkboxTitle,
                checkboxOptions: req.body.checkboxOptions
            },
            dropdown: {
                dropdownTitle: req.body.dropdownTitle,
                dropdownOptions: req.body.dropdownOptions
            }
        }
    };

    try {
        const formId = req.params.formId;
        const form = await Form.findOneAndUpdate(
            { _id: formId },
            { $set: formData },
            { new: true, upsert: true, returnNewDocument: true }
        );

        res.json(form.form);
    } catch (err) {
        console.error(err);
    }
});

/**
 * @route   POST form/form-response/:formId
 * @desc    POST form response
 * @access  PUBLIC
 */
router.post('/form-response/:formId', async (req, res) => {

    try {
        const formId = req.params.formId;
        const formatArray = req.body.checkboxValues.join(', ');
        await Form.updateOne(
            { _id: formId },
            { $push: { formResponses: {
                shortTextResponse: req.body.shortTextValue,
                longTextResponse: req.body.longTextValue,
                multipleChoiceResponse: req.body.multipleChoiceValue,
                checkboxResponse: formatArray,
                dropdownResponse: req.body.dropdownValue
            }}}
        );
        const formTitle = await Form.findOneAndUpdate({ _id: formId });
       
        // Update notifications
        await User.updateOne({}, { $inc: { "notifications.newNotification": 1 }, $set: { "notifications.hasChecked": false } });
        
        res.json({ msg: "Response Sent Successfully" });
    } catch (err) { 
        console.error(err);
    }   
});

router.get('/get-form-responses/:formId', async (req, res) => {
    try {
        const form = await Form.find({_id: req.params.formId});
        if(!form) return res.json([]);
        
        res.json(form[0].formResponses);
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;