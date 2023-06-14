import React, { ReactNode, useContext, useState } from "react";
import { PhotoData } from "@/components/Post";
import UrlContext from "./UrlContext";

interface PhotosProvider {
    allPhotos: PhotoData[];
    loadAllPhotos: () => Promise<void>;
}

export const PhotosContext = React.createContext({} as PhotosProvider);

export function usePhotos() {
    return useContext(PhotosContext);
}

export function PhotosProvider({ children }: { children: ReactNode }) {
    const { url } = useContext(UrlContext);
    const [allPhotos, setAllPhotos] = useState([] as PhotoData[]);

    const loadAllPhotos = async () => {
        const response = await fetch(url + "/photos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();

            console.log("allPhotos", data);

            setAllPhotos(data);
        }
    }

    const value = {
        allPhotos,
        loadAllPhotos
    };

    return (
        <PhotosContext.Provider value={value}>
            {children}
        </PhotosContext.Provider>
    )
}