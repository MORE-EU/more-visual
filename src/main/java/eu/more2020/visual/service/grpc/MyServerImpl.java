package eu.more2020.visual.service.grpc;
import org.springframework.stereotype.Service;

import eu.more2020.visual.grpc.GreeterGrpc;
import eu.more2020.visual.grpc.HelloReply;
import eu.more2020.visual.grpc.HelloRequest;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

@Service
public class MyServerImpl extends GreeterGrpc.GreeterImplBase {
    public void sendRequestToOtherServer() {
        HelloRequest request = HelloRequest.newBuilder()
                .setName("value")
                .build();

        // Create a channel to connect to the target gRPC server
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

        // Create a stub using the generated code and the channel
        GreeterGrpc.GreeterBlockingStub stub = GreeterGrpc.newBlockingStub(channel);

        // Invoke the remote method on the target server
        HelloReply response = stub.sayHello(request);
        System.out.println(response. toString());
        // Process the response
        // ...
        
        // Shutdown the channel
        channel.shutdown();
    }
}






