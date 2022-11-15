const Router = require("express");
const { create, bookSlot, cancelSlot, redScheduledSlot} = require("../controllers/employee.controller");
const { venueList } = require("../controllers/venue.controller");

const EmployeeRoute = Router();

EmployeeRoute.route("/create").post(create);
EmployeeRoute.route("/venue/list").get(venueList);
EmployeeRoute.route("/slot/book").post(bookSlot);
EmployeeRoute.route("/slot/remove/:id").put(cancelSlot);
EmployeeRoute.route("/slot/reschedule/:id").put(redScheduledSlot);

module.exports = EmployeeRoute