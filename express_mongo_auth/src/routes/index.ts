import { Router } from 'express'
import auth from './auth'
import profilingRouter from './profiling'
import adminRoute from './admin.route'
import programRoute from './program.route'
import tasksRoute from './tasks.route'
import enrollmentRoute from './enrollment.route'
import ProjectRouter from './project.route'

export default [auth, profilingRouter, adminRoute, programRoute, tasksRoute, enrollmentRoute, ProjectRouter] as Array<Router>
