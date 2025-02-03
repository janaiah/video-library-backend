const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.decoded.Role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
}
module.exports = authorizeRoles;