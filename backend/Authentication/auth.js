const jwt= require('jsonwebtoken');
const UserModel = require('../Models/user');

const getToken = (req) => {
    const authorization = req.get('authorization');
    const bearerToken = authorization?.startsWith('Bearer ')
        ? authorization.slice('Bearer '.length)
        : null;

    return req.cookies.token || bearerToken;
};

exports.studentAuth = async (req, res, next) => {
    
    try{
        const token = getToken(req);
    
        if (token) {
            const decoded = jwt.verify(token, 'Its_My_Secret_Key');
            req.user = await UserModel.findById(decoded.userId).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Authorization denied. User not found.' });
            }
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
        const token = getToken(req);
    
        if (token) {
            const decoded = jwt.verify(token, 'Its_My_Secret_Key');
            req.user = await UserModel.findById(decoded.userId).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Authorization denied. User not found.' });
            }
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
