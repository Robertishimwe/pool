import bcrypt from 'bcryptjs';

class PassowrdProtection {
    static checkPassword(password:string, hashed:string) {
        return bcrypt.compare(password, hashed);
    }

    static hashPassword(password:string) {
        return bcrypt.hash(password, 10);
    }
}

export { PassowrdProtection } ;