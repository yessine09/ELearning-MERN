// import { Router } from 'express'
// import AuthControllers from '../controllers/auth'
// // import { login, register } from '../controllers/user'
// import { UserMiddlewares, validate } from '../middleware'
// // import { checkCredentials, checkUserDoesNotExist } from '../middleware/user'
// import catchAsync from '../utils/catchAsync'
// import authValidators from '../validators/auth.validator'
// const router = Router()
// const userCrudRouter = Router()

// userCrudRouter.post('/register', [
//     validate(authValidators.createAccount),
//     UserMiddlewares.checkUserDoesNotExist,
//     catchAsync(AuthControllers.createAccount),
// ])

// userCrudRouter.get('/login', [
//     validate(authValidators.),
//     UserMiddlewares.checkCredentials,
//     catchAsync(AuthControllers.login),
// ])

// const getAllStudents = async (req: Request, res: Response) => {

//     try {
//         const User = await user.find({ role: "etudiant" });
//         res.status(200).json(User);
//     } catch (err) {
//         res.status(500).json({ status: "fail", message: "Can not get students" });
//     }
// };


// const getStudentById = async (req: Request, res: Response) => {
//     const userId = req.params.id;
//     try {
//         const User = await user.findById(userId);
//         if (!User) {
//             res.status(404).json({ status: "fail", message: "Student not found" });
//         }
//         res.status(200).json({ status: "succes", data: User });
//     } catch (err) {
//         res.status(500).json({
//             status: "error",
//             message: "error while fetching",
//         });
//     }
// };

// const createStudent = async (req: Request, res: Response) => {
//     const { error, value } = StudentValidation.validate(req.body);
//     if (error) {
//         res.status(400).json({ msg: error.details[0].message });
//         return;
//     }
//     const User = await user.findOne({ email: value.email });
//     if (User) {
//         return res.status(400).json({
//             status: "fail",
//             message: "Student already exists",
//         });
//     }
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPwd = await bcrypt.hash(value.password, salt);
//         const User = new user({
//             email: value.email,
//             password: hashedPwd,
//             fullName: value.fullName,
//             role: "etudiant"
//         });
//         await User.save().then((data) => {
//             res.send({
//                 message: "Student created successfully",
//                 User: data,
//             });
//         });
//     } catch (error) {
//         res.status(404).json({
//             status: "fail",
//             message: "can not create",
//         });
//     }
// };

// const updateStudent = async (req: Request, res: Response) => {
//     const UserId = req.params.id;
//     try {
//         const { error, value } = UserUpdate.validate(req.body);
//         if (error) {
//             return res.status(400).json({ msg: error.details[0].message });
//         }
//         if (value.password) {
//             const salt = await bcrypt.genSalt(10);
//             const hashedPwd = await bcrypt.hash(value.password, salt);
//             value.password = hashedPwd;
//         }
//         const User = await user.findByIdAndUpdate(
//             UserId,
//             {
//                 $set: value,
//             },
//             {
//                 new: true,
//             }
//         );
//         if (!User) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         return res.send({
//             message: "Student updated successfully",
//             user: User,
//         });
//     } catch (error) {
//         return res.status(500).json({ error });
//     }
// };
// const deletedStudent = async (req: Request, res: Response) => {
//     const userId = req.params.id;
//     try {
//         const User = await user.findByIdAndDelete(userId);
//         res.status(200).json({ message: "Student deleted successfully" });
//         if (!User) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//     } catch (err) {
//         res.status(500).json({ message: `erreur cannot delete student by ${userId}` });
//     }
// };
// export { getAllStudents, getStudentById, createStudent, updateStudent, deletedStudent, userPagination };

// export default router.use('/api', userCrudRouter)
