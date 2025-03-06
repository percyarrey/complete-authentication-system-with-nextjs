// services/passwordService.js
import connectDB from "@/utils/connectDB";
import User from "@/models/user";

export async function resetPassword(
  id: string,
  code: string,
  password: string
) {
  await connectDB();
  const user = await User.findOne({ _id: id });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user.resetPasswordCode !== code) {
    return { success: false, message: "Invalid reset password code" };
  }

  if (Date.now() > user.resetPasswordExpires) {
    return { success: false, message: "Reset password code has expired" };
  }

  const passwordMatch = await user.comparePassword(password);
  if (passwordMatch) {
    return {
      success: false,
      message: "Password must not be the same as the old password",
    };
  }

  user.password = password;
  await user.save();

  return { success: true, message: "Password reset successfully", status: 200 };
}

export async function verifyResetPasswordCode(id: string, code: string) {
  await connectDB();
  const user = await User.findOne({ _id: id });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user.resetPasswordCode !== code) {
    return { success: false, message: "Invalid reset password code" };
  }

  if (Date.now() > user.resetPasswordExpires) {
    return { success: false, message: "Reset password code has expired" };
  }

  return { success: true, message: "Code verified successfully", status: 200 };
}

export async function changePassword(id: string, password: string) {
  await connectDB();
  const user = await User.findOne({ _id: id });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const passwordMatch = await user.comparePassword(password);
  if (passwordMatch) {
    return {
      success: false,
      message: "Password must not be the same as the old password",
    };
  }

  user.password = password;
  await user.save();

  return { success: true, message: "Password reset successfully", status: 200 };
}
