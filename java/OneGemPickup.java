/*
1 Gem Pickup example.

This is a simple example to complete the first training session.

Be sure you have started the 1 Gem Pickup training session and fill in the
bot_id and bot_token below. You may need to reset the training session if
you get any errors.

The JSON handling in this example is not ideal. But, this example gives you a great start.
This example was written with JDK version 21.
*/
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

public class OneGemPickup {
    public static void main(String[] args) throws IOException, InterruptedException {
        // Fill in your bot ID and token.
        String botID = "";
        String botToken = "";

        // You should not have to change either of these values.
        String botHost = "https://engine.beeotee.com";
        String bearerToken = "Bearer " + botToken;

        /*****************************************************************************
         * Get your bot info.
         ****************************************************************************/
        String botsURL = botHost + "/bots/" + botID;
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest botsRequest = HttpRequest.newBuilder(URI.create(botsURL))
            .header("Authorization", bearerToken)
            .build();
        HttpResponse<String> botsResponse = client.send(botsRequest, BodyHandlers.ofString());
        System.out.println(botsResponse.statusCode() + " " + botsURL);
        String botsData = botsResponse.body();
        System.out.println(botsData);
        Integer gridIndex = botsData.indexOf("\"grid\":");
        String gridID = botsData.substring(gridIndex+8, gridIndex+18);
        System.out.println("on grid: " + gridID);

        // Wait 3 seconds between all calls.
        Thread.sleep(3000);

        /*****************************************************************************
         * Get your grid info.
         * This includes the bot location.
         ****************************************************************************/
        String gridsURL = botHost + "/grids/" + gridID;
        HttpRequest gridsRequest = HttpRequest.newBuilder(URI.create(gridsURL))
            .header("Authorization", bearerToken)
            .build();
        HttpResponse<String> gridsResponse = client.send(gridsRequest, BodyHandlers.ofString());
        System.out.println(gridsResponse.statusCode() + " " + gridsURL);
        String gridsData = gridsResponse.body();
        System.out.println(gridsData);
        // We need the gem id. There should only be 1 gem, so it is easy to find.
        Integer gemIndex = gridsData.indexOf("GEM");
        String gemID = gridsData.substring(gemIndex, gemIndex+10);
        System.out.println("gem ID: " + gemID);

        // Wait 3 seconds between all calls.
        Thread.sleep(3000);

        /*****************************************************************************
         * Move one space to the left.
         ****************************************************************************/
        String moveLocation = "{\"x\": 0, \"y\": 0}";
        String moveURL = botsURL + "/location";
        HttpRequest moveRequest = HttpRequest.newBuilder(URI.create(moveURL))
            .header("Authorization", bearerToken)
            .header("Content-Type", "application/json")
            .PUT(HttpRequest.BodyPublishers.ofString(moveLocation))
            .build();
        HttpResponse<String> moveResponse = client.send(moveRequest, BodyHandlers.ofString());
        System.out.println(moveResponse.statusCode() + " " + moveURL);
        System.out.println(moveResponse.body());

        // Wait 3 seconds between all calls.
        Thread.sleep(3000);

        /*****************************************************************************
         * Pick up the gem.
         ****************************************************************************/
        String pickupURL = botsURL + "/items/" + gemID;
        HttpRequest pickupRequest = HttpRequest.newBuilder(URI.create(pickupURL))
            .header("Authorization", bearerToken)
            .PUT(HttpRequest.BodyPublishers.noBody())
            .build();
        HttpResponse<String> pickupResponse = client.send(pickupRequest, BodyHandlers.ofString());
        System.out.println(pickupResponse.statusCode() + " " + pickupURL);
        System.out.println(pickupResponse.body());

        System.out.println("Congratulations!");
        System.out.println("Refresh the web site to see if you've completed the training session.");
    }
}
