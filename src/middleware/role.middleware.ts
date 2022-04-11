import Joi from 'joi';
import { ParameterizedContext } from 'koa';

import emitError from '@/app/handler/emit-error';

const schema = Joi.object({
  id: Joi.number(),
  p_id: Joi.number(),
  role_name: Joi.string().min(2).max(30),
  role_value: Joi.string().min(3).max(30),
  type: Joi.number(),
  priority: Joi.number(),
  role_auths: Joi.array().items(Joi.number()),
  c_roles: Joi.array().items(Joi.number()),
});

const verifyProp = async (ctx: ParameterizedContext, next) => {
  const props = ctx.request.body;
  try {
    await schema.validateAsync(props, {
      abortEarly: false,
      allowUnknown: false,
      convert: false,
    });
    await next();
  } catch (error) {
    emitError({ ctx, code: 400, error });
  }
};

export { verifyProp };
