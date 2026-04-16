const checkRole = (...role) => {
  return (req, res, next) => {
    try {
      if (!role.includes(req.user.role)) {
        throw {
          statusCode: 403,
          message: "Access denied",
        };
      }
      next();
    } catch (exception) {
      throw exception;
    }
  };
};

export default checkRole;
