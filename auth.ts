import NextAuth, {
  User as NextAuthUser,
  Account,
  Profile,
  CredentialsSignin,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

// EMAIL
import sendEmail from "@/utils/sendEmail";
import UserModel from "@/models/user";
import connectDB from "@/utils/connectDB";

// INTERFACES
interface CustomUser extends NextAuthUser {
  id: string; // Ensure this is always a string
  role?: string;
  isVerified?: boolean;
  rememberMe?: boolean;
}

// Define the custom profile type for Google
interface CustomProfile extends Profile {
  email_verified?: boolean;
  role?: string;
  email?: string;
}

class CustomError extends CredentialsSignin {
  constructor(message: string, errorOptions?: any) {
    super(message, errorOptions); // Call the parent constructor
    this.code = message; // Customize your error code
  }
}

function generatePassword(length = 8) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        await connectDB();
        const { email, name, password, action, rememberMe } =
          credentials as any;
        let user = await UserModel.findOne({ email });

        if (action === "signin") {
          if (user) {
            throw new CustomError("Email Already Exist"); // Use the custom error
          }
          try {
            user = await UserModel.create({ email, name, password });
          } catch (error: any) {
            console.error(error.message);
            throw new Error("User creation failed"); // Use the custom error
          }
        }

        if (action === "login") {
          if (!user) throw new CustomError("Wrong Username and Password"); // Use the custom error
          const passwordMatch = await user.comparePassword(password);
          if (!passwordMatch)
            throw new CustomError("Wrong Username and Password"); // Use the custom error
        }

        return {
          id: user._id.toString(), // Ensure this is a string
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          rememberMe,
        } as CustomUser; // Cast to CustomUser
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      if (account?.provider === "google") {
        if (!profile || !profile.email_verified || !profile.email) {
          throw new Error("Google authentication failed"); // Use the custom error
        }
        await connectDB();
        const name = profile.name || "";
        const email = profile.email; // Now safely accessed
        let userRecord = await UserModel.findOne({ email });
        const password = generatePassword();

        if (!userRecord) {
          userRecord = await UserModel.create({
            email,
            name,
            password,
            isVerified: true,
          });

          const msg = {
            subject: "Welcome to",
            name: userRecord.name,
            email: userRecord.email,
            template: "welcomeEmail.html",
          };
          try {
            await sendEmail(msg);
          } catch (error) {
            console.error(error);
          }
        } else {
          (profile as CustomProfile).role = userRecord.role; // Ensure profile is defined
        }
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    jwt(params: any) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id; // Ensure this is correct
        params.token.isVerified = params.user.isVerified;
      }
      // Set token to expire based on rememberMe value
      params.token.exp = params.user?.rememberMe
        ? Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // 30 days
        : Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day

      return params.token;
    },
    session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id; // Ensure this is correct
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
