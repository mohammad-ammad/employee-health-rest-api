const Router = require("express")
const EmployeeRouter = require("./employee.route")
const OrganizationRouter = require("./organization.route")

const RootRoute = Router();

RootRoute.use("/employee", EmployeeRouter)
RootRoute.use("/organization", OrganizationRouter)


module.exports = RootRoute