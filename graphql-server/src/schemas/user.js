import Joi from 'joi'

export default Joi.object().options({abortEarly: false}).keys({
   email: Joi.string().email().required().messages({
      'string.empty': 'Email field cannot be empty',
      'string.email': 'Must be a valid email',
   }),
   username: Joi.string().alphanum().min(4).max(16).required().messages({
      'string.empty': 'Username field cannot be empty',
      'string.min': 'Username length must be at least 4 characters long',
      'string.max': 'Username length cannot exceed 16 characters',
      'string.alphanum': 'Username cannot contain special characters'
   }),
   password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/).messages({
      'string.empty': 'Password field cannot be empty',
      'string.pattern.base': 'Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character'
   })
})