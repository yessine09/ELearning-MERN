// export default class AuthMiddlewares {
//     static async checkPasswordIsValid(
//         req: express.Request,
//         res: express.Response,
//         next: express.NextFunction
//     ) {
//         const { password, user } = req.body
//         const isSame = await hash.compare(password, user.password)
//         if (!isSame) {
//             next(new errorTypes.BadRequestError({ msg: 'cannot be authorized, check your credentials' }))
//         }

//         next()
//     }}