import bcrypt from "bcryptjs";

export async function hashValue(value: string, rounds = 12) : Promise<string> {
    return await bcrypt.hash(value, rounds);
}

export async function compareHash(value: string, hash: string) : Promise<boolean> {
    return await bcrypt.compare(value, hash);
}