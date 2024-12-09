package com.tfg.project.api.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.tfg.project.api.service.StorageService;

@Service
public class FileSystemStorageService implements StorageService{

    @Value("${media.location}")
    private String mediaLocation;

    private Path rootLocation;

    


    @Override
    @PostConstruct
    public void init()  {
        rootLocation = Paths.get(mediaLocation);
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Error creating root directory: " + e.getMessage());
        }
    }

    @Override
    public String store(MultipartFile file) {
       try{
        if(file.isEmpty()){
            throw new RuntimeException("Error al almacenar el archivo ");
        }

        String filename = file.getOriginalFilename();

        Path destinationFile = rootLocation.resolve(
            Paths.get(filename))
            .normalize().toAbsolutePath();   
        try(InputStream inputStream = file.getInputStream()){
            Files.copy(inputStream,destinationFile,StandardCopyOption.REPLACE_EXISTING);
    }
    return filename;
       }catch(IOException e){
              throw new RuntimeException("Error al almacenar el archivo "+e.getMessage());
       } 
}

    @Override
    public Resource loadAsResource(String filename) {
        try{
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource((file.toUri()));
            if(resource.exists() || resource.isReadable()){
                return resource; 
            }else{
                throw new RuntimeException("Error al leer el archivo "+filename);
            }
        }catch(MalformedURLException e){
            throw new RuntimeException("Error al leer el archivo "+filename);
        }
    }

}
    

