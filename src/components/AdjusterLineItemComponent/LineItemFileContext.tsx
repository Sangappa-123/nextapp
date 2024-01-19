import React, { useState } from "react";

interface FileWithUrl extends File {
  url?: string;
  isLocal?: boolean;
}
// Define the shape of the context data using a TypeScript interface
interface FileContextData {
  files: FileWithUrl[];
  addFiles: (file: FileWithUrl[]) => void;
  removeFile: (name: string, clbk: () => void) => void;
}

// Create the context with an initial value and the TypeScript interface
export const FileContext = React.createContext<FileContextData>({
  files: [],
  addFiles: () => {},
  removeFile: () => {},
});

export interface IFilesProviderProps {
  children: React.ReactNode;
}

export const LineItemFileContextProvider: React.FC<IFilesProviderProps> = ({
  children,
}) => {
  const [files, setFiles] = useState<FileWithUrl[]>([]);
  const addFiles = (file: FileWithUrl[]) => {
    const newFile: FileWithUrl[] = [];
    for (let i = 0; i < file.length; i++) {
      file[i].url = URL.createObjectURL(file[i]);
      file[i].isLocal = true;
      newFile.push(file[i]);
    }
    setFiles((prev) => [...prev, ...newFile]);
  };

  const removeFile = (name: string, clbk: () => void) => {
    const newFile = files.filter((file) => file.name !== name);
    setFiles(newFile);
    clbk();
  };
  return (
    <FileContext.Provider value={{ addFiles, files, removeFile }}>
      {children}
    </FileContext.Provider>
  );
};
