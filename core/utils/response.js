const success = (ctx, data) => {
  ctx.body = {
    code: 0,
    message: 'success',
    data
  };
};

const error = (ctx, err) => {
  if (err instanceof Error) {
    err = {
      code: 500,
      message: `${err.name}:${err.message}`,
      stack: err.stack
    };
  } else if (err instanceof String) {
    err = {
      code: 500,
      message: err
    };
  } else if (!err) {
    err = {
      code: 500,
      message: 'bad request.'
    };
  }

  ctx.body = {
    code: err.code,
    message: err.message
  };
};

const unCaughtError = (ctx, err) => {
  if (err instanceof Error) {
    err = {
      code: 500,
      message: `${err.name}:${err.message}`,
      stack: err.stack
    };
  }

  ctx.body = {
    code: err.code,
    message: process.env.NODE_ENV === 'production' ? 'bad request' : err.message
  };
  ctx.logger.warn({
    ...err
  });
  // 出口记录一次
  ctx.logger.info({
    type: 'OUT',
    status: ctx.response.status,
    message: ctx.response.message,
    traceId: ctx.state.traceId,
    body: ctx.body
  });
};

module.exports = {
  error,
  success,
  unCaughtError
};
