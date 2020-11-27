const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    form: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        shortTextTitle: {
            type: String
        },
        longTextTitle: {
            type: String
        },
        multipleChoice: {
            multipleChoiceTitle: {
                type: String
            },
            multipleChoiceOptions: {
                type: [String]
            }
        },
        checkbox: {
            checkboxTitle: {
                type: String
            },
            checkboxOptions: {
                type: [String]
            }
        },
        dropdown: {
            dropdownTitle: {
                type: String
            },
            dropdownOptions: {
                type: [String]
            }
        }
    },
    formResponses: [
        {
            shortTextResponse: {
                type: String
            },
            longTextResponse: {
                type: String
            },
            multipleChoiceResponse: {
                type: String
            },
            checkboxResponse: {
                type: [String]
            },
            dropdownResponse: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Form = mongoose.model('form', FormSchema);