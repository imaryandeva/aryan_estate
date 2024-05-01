import bcrypt from 'bcrypt';

export const hashPassword = async(password) => {
	const hashPassword = await bcrypt.hash(password,10);
	return hashPassword;
}