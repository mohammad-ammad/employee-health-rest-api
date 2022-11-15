const Router = require("express");
const { SlotList } = require("../controllers/employee.controller");
const { updateSlot } = require("../controllers/slot.controller");
const { create, remove } = require("../controllers/venue.controller");

const OrganizationRoute = Router();

OrganizationRoute.route("/venue/create").post(create);
OrganizationRoute.route("/venue/remove/:id").delete(remove);
OrganizationRoute.route("/slot").get(SlotList);
OrganizationRoute.route("/slot/:id").put(updateSlot);

module.exports = OrganizationRoute