import { Meteor } from "meteor/meteor";
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(error => {
    const ddpError = new Meteor.Error('validation-error',error.message);
    ddpError.details = error.details;
    return ddpError;
});