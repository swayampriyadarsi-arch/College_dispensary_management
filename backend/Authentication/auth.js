const jwt= require('jsonwebtoken');
const UserModel = require('../Models/User');


exports.studentAuth = async (req, res, next) => {
    
    try{
        const token = req.cookies.token;
    
        if (token) {
            const decoded = jwt.verify(token, 'Its_My_Secret_Key');
            req.user = await UserModel.findById(decoded.userId).select('-password');
            next();
    }else{
        return res.status(401).json({ message: 'Authorization denied. No token provided.' });
    }
    
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong in authentication' });
    }
};

exports.adminFacultyAuth = async (req, res, next) => {
    
    try{
        console.log(req.cookies);
        const token = req.cookies.token;
    
        if (token) {
            const decoded = jwt.verify(token, 'Its_My_Secret_Key');
            req.user = await UserModel.findById(decoded.userId).select('-password');
            if(req?.user?.role === 'student'){
                throw new Error('Unauthorized access. Admin and Faculty only.');
            }
            next();
    }else{
        return res.status(401).json({ message: 'Authorization denied. No token provided.' });
    }
    
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong in authentication' });
    }
};

;