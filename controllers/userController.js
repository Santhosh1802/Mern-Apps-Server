import {
  RegisterUser,
  LoginUser,
  GoogleLogin,
} from "../service/userService.js";
import {
  GoogleSchema,
  LoginSchema,
  RegisterSchema,
} from "../utils/InputSchema.js";
import { MyResponse } from "../utils/MyResponse.js";
import { status } from "../utils/StatusUtil.js";

/**
 * Handles the user registration by normal method 
 * @param {name, email, password} req 
 * @param {response object} res 
 * @returns 
 */
export async function userRegisterController(req, res) {
  const response = new MyResponse();
  const { name, email, password } = req.body;

  const { error, value } = RegisterSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );
  if (error) {
    response.pushError(error);
    response.setStatus(status.badrequest);
    return res.json(response);
  }
  await RegisterUser(value, response);
  res.json(response);
}

/**
 * Handles the user login for normal users
 * @param {email, password} req 
 * @param {response object} res 
 * @returns 
 */
export async function userLoginController(req, res) {
  const response = new MyResponse();
  const { email, password } = req.body;

  const { error, value } = LoginSchema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (error) {
    response.pushError(error);
    response.setStatus(status.badrequest);
    return res.json(response);
  }
  await LoginUser(value, response);
  res.json(response);
}


/**
 * Handle user google login
 * @param {googleDetails object} req 
 * @param {response object} res 
 * @returns 
 */
export async function userGoogleController(req, res) {
  const response = new MyResponse();
  const { googleDetails } = req.body;
  if(googleDetails.clientId!==`${process.env.GOOGLE_CLIENT_ID}`){
    response.pushError("Invalid Google Client Id");
    response.setStatus(status.unauthorized);
    return res.json(response);
  }
  const { error, value } = GoogleSchema.validate(
    {
      clientId: googleDetails.clientId,
      credential: googleDetails.credential,
      selected_by: googleDetails.selected_by,
    },
    { abortEarly: false }
  );
  if (error) {
    response.pushError(error);
    response.setStatus(status.badrequest);
    return res.json(response);
  }
  await GoogleLogin(value, response);
  res.json(response);
}
