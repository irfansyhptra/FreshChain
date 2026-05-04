import { User, IUser } from "@/lib/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState !== 1) {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) throw new Error("MONGODB_URI is required");
        await mongoose.connect(MONGODB_URI);
    }
};

export class AuthService {
    static async checkEmail(email: string) {
        await connectDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("Email already registered");
    }

    static async registerPetani(data: any): Promise<IUser> {
        await this.checkEmail(data.email);
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            phone: data.phone,
            dob: data.dob,
            address: data.address,
            password: hashedPassword,
            role: "Petani",
            petaniProfile: data.petaniProfile,
            kycStatus: "Pending"
        });

        await newUser.save();
        return newUser;
    }

    static async registerInvestor(data: any): Promise<IUser> {
        await this.checkEmail(data.email);
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            phone: data.phone,
            dob: data.dob,
            address: data.address,
            password: hashedPassword,
            role: "Investor",
            investorProfile: data.investorProfile,
            kycStatus: "Pending"
        });

        await newUser.save();
        return newUser;
    }

    static async registerKonsumen(data: any): Promise<IUser> {
        await this.checkEmail(data.email);
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            phone: data.phone,
            dob: data.dob,
            address: data.address,
            password: hashedPassword,
            role: "Konsumen",
            konsumenProfile: data.konsumenProfile,
            kycStatus: "Pending"
        });

        await newUser.save();
        return newUser;
    }
}
