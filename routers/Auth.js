const auth_data = (req, res, next) => {
    let api_key = req.headers['x-dataupload-key']

    if (!api_key)
        return res.status(401).send({ message: "Missing API KEY" })
    else if (api_key !== process.env.API_KEY)
        return res.status(403).send({ message: "Invalid API KEY" })

    next()
}

module.exports = { auth_data }