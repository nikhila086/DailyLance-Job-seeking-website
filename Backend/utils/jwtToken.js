export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, // Set httpOnly to true
      secure: true, // Required on Render/Vercel (HTTPS)
      sameSite: "None", // Must be 'None' for cross-origin
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      message,
      token,
    });
  };
  