const { authenticateToken } = require('../auth/auth')
const router = require('express').Router();

const { RestistionUser, LoginUser, GetAllData, GetById, GetAllBySearch, HomePage, SortByLastName, SortByFirstName, SortByEmail, SortByEmployeeId, SortByOrganizationName, UpdateById, DeleteById } = require("../controller/user")

// Home
router.get('/home', HomePage);
// signup
router.post('/signup', RestistionUser);
// login
router.post('/login', LoginUser);
// getall
router.get('/getAll', GetAllData);
// getonebyone
router.get('/getbyid/:employee_id', GetById);
// updatebyid
router.put('/update/:employee_id', authenticateToken, UpdateById);
// deletebyid
router.delete('/delete/:employee_id', authenticateToken, DeleteById);
// getall search
router.get('/getallby/:search', GetAllBySearch);
// acendFirstname
router.get('/sortbyFirstname', SortByFirstName);
// acendlastname
router.get('/sortbyLastname', SortByLastName);
// acendEmail
router.get('/sortbyEmail', SortByEmail);
// acendEmail
router.get('/sortbyEmployeeId', SortByEmployeeId);
// acendEmail
router.get('/sortbyOrganizationName', SortByOrganizationName);


// Export router
module.exports = router;