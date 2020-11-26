const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    form: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        shortText: {
            shortTextTitle: {
                type: String
            },
            shortTextValue: {
                type: String
            }
        },
        longText: {
            longTextTitle: {
                type: String,
            },
            longTextValue: {
                type: String
            }
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
            title: {
                type: String
            },
            description: {
                type: String
            },
            shortText: {
                shortTextTitle: {
                    type: String
                },
                shortText: {
                    type: String
                }
            },
            longText: {
                title: {
                    type: String,
                },
                text: {
                    type: String
                }
            },
            multipleChoice: {
                title: {
                    type: String
                },
                options: {
                    type: [String]
                }
            },
            checkboxes: {
                title: {
                    type: String
                },
                options: {
                    type: [String]
                }
            },
            dropdown: {
                title: {
                    type: String
                },
                options: {
                    type: [String]
                }
            }
        }
    ]
});

module.exports = Form = mongoose.model('form', FormSchema);