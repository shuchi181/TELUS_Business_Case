const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    forms: [
        {
            formId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'form',
            }
        }
    ],
    publishedForms: [
        {
            formId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'form',
            }
        }
    ],
    notifications: {
        newNotification: {
            type: Number,
            default: 0
        },
        hasChecked: {
            type: Boolean,
            default: false
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);