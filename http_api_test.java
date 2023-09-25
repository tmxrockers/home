import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpGetExample {
    public static void main(String[] args) {
        String apiUrl = "https://api.example.com/data"; // Replace with your API URL
        
        try {
            // Create a URL object
            URL url = new URL(apiUrl);
            
            // Open a connection to the URL
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            
            // Set the HTTP request method to GET
            connection.setRequestMethod("GET");
            
            // Set a timeout for the connection
            connection.setConnectTimeout(5000); // 5 seconds
            
            // Check the HTTP response code
            int responseCode = connection.getResponseCode();
            
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // If the response code is 200 (OK), read the response data
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line;
                StringBuilder response = new StringBuilder();
                
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                
                reader.close();
                
                // Process the response data here
                String responseData = response.toString();
                System.out.println("Response Data: " + responseData);
            } else {
                // Handle non-200 response codes here
                System.out.println("HTTP Response Code: " + responseCode);
            }
            
            // Close the connection
            connection.disconnect();
        } catch (IOException e) {
            // Handle exceptions related to network or connection issues
            e.printStackTrace();
        }
    }
}
