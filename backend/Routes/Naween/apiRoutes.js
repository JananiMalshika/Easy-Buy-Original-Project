const router = require("express").Router();
const User = require("../../Models/Thivanka/user")

//hotel registration routes
router.route("/hottel/save").post(async(req, res) => {
    const { HottelName, HottelContact, HottelEmail, HottelAddress, Password, Latitude, Longitude } = req.body
    const details = new User({ HottelName: HottelName, HottelContact: HottelContact, HottelEmail: HottelEmail, HottelAddress: HottelAddress, Password: Password, Latitude: Latitude, Longitude: Longitude,Type:"Hotel" })
    await details.save()
    .then((data)=>{
        res.json(data)
        const detail = new HotelLogin({HottelEmail: HottelEmail,Password: Password, Latitude: Latitude,Type:"Hotel" })
        detail.save()
    })
    .catch(err=>{
        res.json(err)
    })
})

router.route("/login/:email/:password").get((req, res) => {
    let email = req.params.email;
    let pass = req.params.password;
    User.findOne({ $and: [{ HottelEmail: { $eq: email } }, { Password: { $eq: pass } }] })
    .then(data => {
        res.json(data)
    })
    .catch(error =>{
        res.json(error)
    })
})

 
module.exports = router;