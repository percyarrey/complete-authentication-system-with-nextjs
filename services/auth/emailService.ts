// services/emailService.js
import connectDB from "@/utils/connectDB";
import User from "@/models/user";
import sendEmail from "@/utils/sendEmail";

const websiteName = "CreativeParts";

function generateCode(length = 4) {
  const charset = "0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset.charAt(randomIndex);
  }

  return code;
}

export async function sendForgotPassEmail(email: string) {
  await connectDB();
  const user = await User.findOne({ email });

  if (user) {
    const code = generateCode();
    const msg = {
      subject: "Forgot Password for",
      name: user.name,
      email: user.email,
      template: "forgotPassEmail.html",
      code: code,
    };

    try {
      const result = await sendEmail(msg);
      if (!result.success) {
        return { success: false, message: "Something went wrong" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Something went wrong" };
    }

    user.resetPasswordCode = code;
    user.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000; // 1 day
    await user.save();

    return { success: true, id: user._id.toString() };
  } else {
    return { success: false, message: "Email not found" };
  }
}

export async function verifyEmail(email: string) {
  await connectDB();
  const user = await User.findOne({ email });

  if (user) {
    const code = generateCode();
    const msg = {
      subject: "Verify your Email for",
      name: user.name,
      email: user.email,
      template: "verifyEmail.html",
      code: code,
    };
    try {
      const result = await sendEmail(msg);
      if (!result.success) {
        return { success: false, message: "Something went wrong" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Something went wrong" };
    }

    user.verificationCode = code;
    user.verificationCodeExpires = Date.now() + 24 * 60 * 60 * 1000; // 1 day
    await user.save();

    return { success: true, id: user._id.toString() };
  } else {
    return { success: false, message: "Email not found" };
  }
}
export async function verifyEmailCode(email: string, code: string) {
  await connectDB();
  const user = await User.findOne({ email });

  if (!user) {
    return { success: false, message: "Email not found" };
  }

  if (user.verificationCode !== code) {
    return { success: false, message: "Invalid verification code" };
  }

  if (Date.now() > user.verificationCodeExpires) {
    return { success: false, message: "Verification code has expired" };
  }

  user.isVerified = true;
  await user.save();

  return { success: true, message: "Code verified successfully", status: 200 };
}
