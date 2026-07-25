// const { data } = require('react-router-dom');
const UserModels = require('../Models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto=require("crypto");
const nodemailer=require('nodemailer');


const cookieOptions = (req) => {
    const isSecure = req.secure || req.get('x-forwarded-proto') === 'https';

    return {
        httpOnly: true,
        secure: isSecure,
        sameSite: isSecure ? 'none' : 'lax',
        path: '/',
    };
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.register = async(req, res) => {
    try {
        const { name, email, password, roll } = req.body;
        const isExits = await UserModels.findOne({ email });
        if (isExits) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
      
        const user = new UserModels({ name, email, password: hashedPassword, roll });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', success:'yes',data:user });

    } catch (error) {
        res.status(500).json({ message: 'Server error',issue:error.message });
    }
}
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const isExist = await UserModels.findOne({ email });
        
      if(isExist && await bcryptjs.compare(password, isExist.password)){
        const token = jwt.sign({ userId: isExist._id }, 'Its_My_Secret_Key');
        res.cookie('token', token, cookieOptions(req));



        return res.status(200).json({ message: 'Login successful', success:'yes',user:isExist, token });
      }else{
        return res.status(400).json({ message: 'Invalid email or password', success:'no' });
      }
    } catch (error) {
        res.status(500).json({ error: 'Server error', issue: error.message });
    }
}

exports.sendOtp = async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await UserModels.findOne({email});
        if(!user){
            return res.status(400).json({error:'User not found'});
        }
        const buffer=crypto.randomBytes(4);      //Get random bytes
        const token=buffer.readUInt32BE(0)%900000 + 100000;    //6 digit number

        user.resetPasswordToken=token;
        user.resetPasswordExpires=Date.now()+3600000;  //1 hour expiry

        await user.save();

        const mailOptions={
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            text:`You requested a password reset.Your OTP is:${token}`
        };

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                res.status(500).json({error:'Server error',errorMsg:error});
            }else{
                res.status(200).json({message:"OTP Sent to your email"})
            }
            

        });

    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Something Went Wrong ",
            issue: err.message
        })
    }
}

exports.verifyOtp= async(req,res)=>{
    try{
        const {otp,email}=req.body;
        const user = await UserModels.findOne({
            email,
            resetPasswordToken: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Opt is invalid or has expired, Please Try Again.' });
        
    }
        res.status(200).json({ message: "OTP is Successfully Verified" })

    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Something Went Wrong ",
            issue: err.message
        });
    }
}


exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await UserModels.findOne({ email });
        if(!user){
            return res.status(400).json({error:'Some Technical Issue, please try again later'});
        }
        let updatedPassword = await bcryptjs.hash(newPassword,10);
        user.password=updatedPassword;
        user.resetPasswordExpires=undefined;
        user.resetPasswordToken=undefined;

       
        await user.save();
        res.status(200).json({ message: "Password Reset Successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.updateStudentById = async (req, res) => {
    try {

        const { id } = req.params;
        const updateStudent = await UserModels.findByIdAndUpdate(id, req.body, { new: true });

        if (updateStudent) {
            return res.status(200).json({ message: "Staff Update Successfully" });
        }
        return res.status(400).json({ error: "No Such Student is there" })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.getStudentByRollNo = async (req, res) => {
    try {
        const { roll } = req.params;
        const student = await UserModels.findOne({ roll });

        if (student) {
            return res.status(200).json({ message: "Student fetched Successfully", student });
        }
        return res.status(400).json({ error: "No Such Student is there" })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.registerStudentByStaff = async (req, res) => {
    try {

        const buffer = crypto.randomBytes(4); // Get random bytes
        let token = buffer.readUInt32BE(0) % 900000 + 100000; // Modulo to get a 6-digit number
        let {_id, ...body} = req.body;
        const isExist = await UserModels.findOne({email:body.email});
        if(isExist){
            return res.status(400).json({error:"Already have an account with this email"});
        }
        token=token.toString();
        let updatedPass = await bcryptjs.hash(token,10);

        const user= new UserModels({...body,password:updatedPass});
        await user.save();

         const mailOptions={
            from: process.env.EMAIL,
            to: body.email,
            subject: 'Password for dispensary system',
            text:`Hi,Your password for dispensary system is ${token} whose email id is registered email id ${body.email}`
        };

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                res.status(500).json({error:'Server error',errorMsg:error});
            }else{
                res.status(200).json({message:"PASSWORD Sent to your student's email id"})
            }
            

        });

        


    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}


exports.addStaffsByAdmin = async (req, res) => {
    try {
        const { name, email, password, designation, mobileNo } = req.body;
        const searchStaff = await UserModels.findOne({ email });
        if (searchStaff) {
            return res.status(400).json({ error: "Already have an account with this email id." });
        }
        let updatedPass = await bcryptjs.hash(password, 10);
        const user=new UserModels({name,email,designation,mobileNo,password:updatedPass,role:"staff"});
        await user.save();
         const mailOptions={
            from: process.env.EMAIL,
            to: email,
            subject: 'Password for dispensary system',
            text:`Hi,Your password for dispensary system is ${password} whose email id is registered email id ${email} for staff portal`
        };

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                res.status(500).json({error:'Server error',errorMsg:error});
            }else{
                res.status(200).json({message:"PASSWORD Sent to your staff's email ID"})
            }
            

        });



    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}


exports.getAllStaffs = async (req, res) => {
    try {
        const staffs = await UserModels.find({ role: "staff" });
        return res.status(200).json({
            staffs
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.updateStaffById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, designation, mobileNo } = req.body;
        const staff = await UserModels.findById(id);
       if(staff){
        staff.name=name;
        staff.designation=designation;
        staff.mobileNo=mobileNo;
        await staff.save();
        return res.status(200).json({message: "Successfully updated"});
       } else{
        return res.status(400).json({error:"No such staff exist"})
       }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserModels.findByIdAndDelete(id);

        if (deletedUser) {
            return res.status(200).json({ message: "Staff Getting Deleted" });
        }
        return res.status(400).json({ error: "No Such Staff is there" })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token', cookieOptions(req)).json({ message: 'Logged out successfully' });
}
