import { StatusCodes } from "http-status-codes";

export async function pingCheck(req, res) {
    return res.status(StatusCodes.OK).json({
        message: 'pong'
    });
};