import User from "../models/User.js";
import tokenService from "../services/tokenService.js";

class Auth {
 async authUser(req, res , next) {
    try {
    //1 Достаем токен из заголовки
      const token = tokenService.extractToken(req);

      if (!token) {
        return res.status(401).json({ message: "Нет токена" });
      }

      //2 Проверяем подпись и срок (далее расшиф)
      const payload = tokenService.verifyToken(token)

      //3 Ищем пользователя по id

      const user = await User.findById(payload.id)
      if(!user){
        return res.status(401).json({message: "Пользователь не найден"})
      }
      // Кладем в req.user нашего пользователя и идем дальше
      req.user = user
      next()
    } catch (err) {
          res.status(401).json({message: "Невалидный токен"})
    }
  }
}


export default new Auth()