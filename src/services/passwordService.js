import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

class PasswordService {
  async hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async comparePassword(password , hashPassword) {
    return bcrypt.compare(password, hashPassword)
  }
}

export default new PasswordService();
