import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {


        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();

        if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {

            const status = rpcError.status;

            response.status(status).json(rpcError);
        } else {
            response.status(400).json({
                status: 400,
                message: rpcError
            })
        }




    }
}