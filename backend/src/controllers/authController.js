import { loginService, signupService } from "../service/authService.js"

export const signupUser = async (req, res, next) => {
    try {
        const { user, token } = await signupService(req.body);
        res.status(201).json({
            status: 'success',
            token,
            data: {
              user
            }
          });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginService(email, password);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}