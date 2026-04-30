
class BaseController {
  static sendSuccess(res, message, data = null, status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data
    });
  }

  static sendError(res, message = "Something went wrong", status = 500) {
    return res.status(status).json({
      success: false,
      message
    });
  }
}

export default BaseController;