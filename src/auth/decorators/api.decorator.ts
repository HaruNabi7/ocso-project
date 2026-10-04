import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiAuth = (()=> {
    return applyDecorators(
        ApiResponse({status: 401, description: "missing  or invalid token"}),
        ApiResponse({status: 403, description: "missing role"}),
        ApiResponse({status: 405, description: "server error"})
    )
})
