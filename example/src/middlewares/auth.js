const check = async (ctx, next) => {
  const { uid } = ctx.state;
  if (!uid) {
    return ctx.error();
  }

  return await next();
};

module.exports = check;