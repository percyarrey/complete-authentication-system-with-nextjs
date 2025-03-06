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
  isVerified: boolean;
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
let role = "user";
let isVerified = false;
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
            throw new CustomError("Email Already Exist");
          }
          try {
            user = await UserModel.create({
              email,
              name,
              password,
              isVerified: false,
            });
          } catch (error: any) {
            console.error(error.message);
            throw new Error("User creation failed");
          }
        }

        if (action === "login") {
          if (!user) throw new CustomError("Wrong Username and Password");
          const passwordMatch = await user.comparePassword(password);
          if (!passwordMatch)
            throw new CustomError("Wrong Username and Password");
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified, // Ensure this is fetched correctly
          rememberMe,
        } as CustomUser;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile || !profile.email_verified || !profile.email) {
          throw new Error("Google authentication failed");
        }
        await connectDB();
        const name = profile.name || "";
        const email = profile.email;
        let userRecord = await UserModel.findOne({ email });
        const password = generatePassword();

        if (!userRecord) {
          userRecord = await UserModel.create({
            email,
            name,
            password,
            isVerified: true, // Set isVerified here
            role: "user",
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
        }
        profile.role = userRecord.role;
        profile.isVerified = userRecord.isVerified; // Ensure this is set correctly
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true;
    },
    jwt(params: any) {
      if (params.user) {
        params.token.role = params?.profile?.role || params?.user?.role;
        params.token.id = params?.user?.id;
        params.token.isVerified =
          params?.profile?.isVerified || params?.user?.isVerified; // Set from user object
      }
      params.token.exp = params.user?.rememberMe
        ? Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
        : Math.floor(Date.now() / 1000) + 24 * 60 * 60;

      return params.token;
    },
    session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified; // Set from token
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
