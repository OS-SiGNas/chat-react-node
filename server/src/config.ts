import dotenv from 'dotenv';
dotenv.config();


export default {
	HOST:process.env.HOST || 'localhost',
	PORT:process.env.PORT || 4000,
//	DB:process.env.DB || 'dbname',
//	MONGO_USER:process.env.DB || 'admin',
//	MONGO_PASS:process.env.DB || '12345'
}
