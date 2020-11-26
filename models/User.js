const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    forms: [
        {
            formId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'form'
            }
        }
    ],
    publishedForms: [
        {
            formId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'form'
            }
        }
    ],
    notifications: {
        newNotification: {
            type: Number
        },
        hasChecked: {
            type: Boolean
        }
    }
});

module.exports = User = mongoose.model('user', UserSchema);