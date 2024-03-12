// import * as UserServices from './user.services';
import AuthServices from './auth.services';
import { destroyAccount } from './destroyAccount';
import sendEmail from './sendGrid';
import UserServices from './user.services';
import clientServices from './client.services';
import AdminServices from './admin.services';
import ResourceServices from './resource.services';
import RoleServices from './role.services';
import ProgramServices from './program.services';
import ProjectServices from './project.services';
import EnrollmentServices from './enrollment.services';
import MentorServices from './mentor.services';
export {
    AuthServices,
    sendEmail,
    destroyAccount,
    UserServices,
    clientServices,
    AdminServices,
    ResourceServices,
    RoleServices,
    ProgramServices,
    ProjectServices,
    EnrollmentServices,
    MentorServices
    // UserServices
};
