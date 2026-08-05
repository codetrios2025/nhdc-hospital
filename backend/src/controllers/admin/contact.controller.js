const { validationResult } = require("express-validator");

const ContactService = require("../../services/admin/contact.service");

const ApiResponse = require("../../utils/ApiResponse");
const ApiError = require("../../utils/ApiError");
const asyncHandler = require("../../utils/asyncHandler");

class ContactController {
  /**
   * Save Contact
   */
  save = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(422, errors.array()[0].msg);
    }

    const body = {
      ...req.body,
    };

    const contact = await ContactService.saveContact(body, req.user._id);

    return res.json(
      new ApiResponse(200, true, "Contact details saved successfully", contact),
    );
  });

  /**
   * Admin Contact
   */
  getContact = asyncHandler(async (req, res) => {
    const contact = await ContactService.getContact();

    return res.json(
      new ApiResponse(
        200,
        true,
        "Contact details fetched successfully",
        contact,
      ),
    );
  });

  /**
   * Website Contact
   */
  getPublicContact = asyncHandler(async (req, res) => {
    const contact = await ContactService.getActiveContact();

    return res.json(
      new ApiResponse(
        200,
        true,
        "Contact details fetched successfully",
        contact,
      ),
    );
  });
}

module.exports = new ContactController();
