import * as authService from '../services/authService.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "password must be atleast 6 characters" });
    }

    try {
        const data = await authService.register({ email, name, password });
        return res.status(201).json({
            success: true,
            message: "Registration Successful.",
            data
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || error
        });
    };
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "email, password are required!"
        });
    };

    try {
        const data = await authService.login({ email, password });
        return res.status(200).json({ success: true, message: 'Login successful.', data });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || error
        });
    }
}

export {
    login,
    register
}