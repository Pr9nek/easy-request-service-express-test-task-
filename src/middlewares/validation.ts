import { celebrate, Joi, Segments } from 'celebrate';

export const validateCreateRequest = celebrate({
    [Segments.BODY]: Joi.object().keys({
        text: Joi.string().required().min(1).max(1000),
        topic: Joi.string().required().min(1).max(100),
    }),
});

export const validateCompleteRequest = celebrate({
    [Segments.BODY]: Joi.object().keys({
        resolution: Joi.string().required().min(1).max(1000),
    }),
});

export const validateCancelRequest = celebrate({
    [Segments.BODY]: Joi.object().keys({
        cancellationReason: Joi.string().required().min(1).max(500),
    }),
});

export const validateFilterRequests = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        date: Joi.string().isoDate(),
        startDate: Joi.string().isoDate(),
        endDate: Joi.string().isoDate().when('startDate', {
            is: Joi.exist(),
            then: Joi.required(),
        }),
    }),
});

export const validateRequestInProgress = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().hex().length(24),
    }),
});