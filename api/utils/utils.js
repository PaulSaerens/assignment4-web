const res = require("express/lib/response")

function toJson(res, message, content = {}, status = 200) {
    return res.status(status).json({"message": message, "content": content}).send();
}

module.exports = toJson;