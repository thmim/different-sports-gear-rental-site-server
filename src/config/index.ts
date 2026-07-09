import dotenv from "dotenv";
import path from "path";
dotenv.config({path:path.join(process.cwd(),".env")})


export default {
    port:process.env.PORT,
    database_url:process.env.DATABASE_URL,
    app_url:process.env.APP_URL,
    bcrypt_salt_round:process.env.BCRYPT_SALT_ROUND,
    jwt_access_secret:process.env.JWT_ACCESS_SECRET!,
    jwt_refresh_secret:process.env.JWT_REFRESH_SECRET!,
    jwt_access_expires:process.env.JWT_ACCESS_EXPIRES,
    jwt_refresh_expires:process.env.JWT_REFRESH_EXPIRES,
    sslc_stored_id:process.env.SSLC_STORED_ID,
    sslc_stored_password:process.env.SSLC_STORED_PASSWORD
}