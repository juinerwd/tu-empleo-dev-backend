const { response } = require('express');


const uploadFile = async (req, res = response) => {
    console.log(req.file);
    res.status(200).json({
        ok: true,
        msg: 'Todo ben'
    })
}
module.exports = {
    uploadFile
};