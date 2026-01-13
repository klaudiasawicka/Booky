package com.bookbuddy.bookbuddy.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
public class BlobStorageService {

    private final BlobContainerClient containerClient;

    public BlobStorageService(
            @Value("${spring.cloud.azure.storage.connection-string}") String connectionString,
            @Value("${spring.cloud.azure.storage.blob.container-name}") String containerName
    ) {
        BlobServiceClient client =
                new BlobServiceClientBuilder()
                        .connectionString(connectionString)
                        .buildClient();

        this.containerClient = client.getBlobContainerClient(containerName);
    }

    public String uploadBookCover(MultipartFile file) {
        try {
            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
            BlobClient blobClient = containerClient.getBlobClient(filename);

            blobClient.upload(file.getInputStream(), file.getSize(), true);
            return blobClient.getBlobUrl();

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload cover image", e);
        }
    }
}
