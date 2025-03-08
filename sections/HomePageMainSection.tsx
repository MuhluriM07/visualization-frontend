import React, { useState, useContext, ChangeEvent } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Head from "next/head";
import Loader from "@/components/common/Loader";
import UploadAlert from "@/components/Modals/UploadAlert";
 import CardWrapper from "@/components/Cards/CardWrapper";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";
 
 
const HomePageMainSection: React.FC<{}> = () => { 
    const [isLoading, setIsLoading] = useState(false);
    const [downloadSuccessModal, setDownloadSuccessModal] = useState(false);
    const [uploadToS3, setUploadToS3] = useState(false);
    const [uploadToLocal, setUploadToLocal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
    const [confirmation, setConfirmation] = useState('confirm');
    const [showModal, setShowModal] = React.useState(false);
    const [visible, setVisible] = useState(false);
    const [messageVisible, setMessageVisible] = useState(false);
    const [statusInfo, setStatusInfo] = useState("");
    const router = useRouter();
    const [uploadToStorage, setUploadToStorage] = useState(true);
    const [fileId, setFileId] = useState<string | null>(null); // Explicitly type the state to allow string or null
    const [reviewFile, setReviewFile] = useState(false); // To trigger review
    const [convertFile, setConvertFile] = useState(true);
    const [, ] = useState(null); // To store the PDF URL after conversion
    const [pdfUrl, setPdfUrl] = useState<string | null>(null); // Explicitly type the state to allow string or null
    const [selectedCsv, setSelectedCsv] = useState<File | null>(null);
    const [selectedWord, setSelectedWord] = useState<File | null>(null);
    const [selectedExcel, setSelectedExcel] = useState<File | null>(null);
 
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) {
                // Valid file type
                if (selectedFile && selectedFile.name === file.name) {
                    // If the same file is uploaded, just update it
                    setSelectedFile(file); 
                } else {
                    // Set the new file
                    setSelectedFile(file); 
                }
            } else {
                setConfirmation('invalidFile');
                setVisible(true);
            }

            // Reset the file input value
            event.target.value = '';
        }
    };  

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        // Check if file exists and is of valid type (.xls or .xlsx)
        if (file) {
            if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                // Check if the same file is already selected
                if (selectedFile && selectedFile.name === file.name) {
                    setSelectedFile(file); // Update the selected file
                } else {
                    setSelectedFile(file); // Set the new file
                }
            } else {
                setConfirmation('invalidFile');
                setVisible(true); // Show error message
            }
        }
    };

    const handleDrop2 = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    
        const file = event.dataTransfer.files[0];
    
        if (file) {
            // Check the file extension
            if (file.name.endsWith('.pdf')) {
                // Handle PDF file
                if (selectedPdf && selectedPdf.name === file.name) {
                    setSelectedPdf(file); // Update the selected file
                } else {
                    setSelectedPdf(file); // Set the new file
                }
            } else if (file.name.endsWith('.csv')) {
                // Handle CSV file
                if (selectedCsv && selectedCsv.name === file.name) {
                    setSelectedCsv(file); // Update the selected file
                } else {
                    setSelectedCsv(file); // Set the new file
                }
            } else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
                // Handle Word file
                if (selectedWord && selectedWord.name === file.name) {
                    setSelectedWord(file); // Update the selected file
                } else {
                    setSelectedWord(file); // Set the new file
                }
            } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                // Handle Excel file
                if (selectedExcel && selectedExcel.name === file.name) {
                    setSelectedExcel(file); // Update the selected file
                } else {
                    setSelectedExcel(file); // Set the new file
                }
            } else {
                // Handle invalid file type
                setConfirmation('invalidFile');
                setVisible(true); // Show error message
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Allow drop
    };

    const handleFileDelete = (type: 'file' | 'pdf') => {
      setConfirmation('deleted');
      setMessageVisible(true);
      setTimeout(() => { setMessageVisible(false); }, 5000);
      
      if (type === 'file') {
          setSelectedFile(null); // If it's a file, set selectedFile to null
          setTimeout(() => { window.location.reload(); }, 2000);
      } else if (type === 'pdf') {
          setSelectedPdf(null); // If it's a pdf, set selectedPdf to null
      }
  }; 


  const saveFileToServer = async () => {
    if (!selectedFile && !selectedPdf) {
        setConfirmation("error");
        setVisible(true);
        throw new Error("No file to upload");
    }

    const formData = new FormData();

    if (selectedFile) {
        formData.append("file", selectedFile);
    }

    if (selectedPdf) {
        formData.append("file", selectedPdf);
    }

    try {
        const response = await fetch("http://localhost:8080/files/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error("Failed to save the file to the server:", responseText);
            throw new Error(`Server Error: ${response.status} ${response.statusText} - ${responseText}`);
        }

        const responseText = await response.text();
        console.log("File saved successfully:", responseText);

        // Only extract and set File ID if selectedFile was uploaded
        if (selectedFile) {
            const match = responseText.match(/File ID: (\d+)/);
            if (match) {
                const fileId = match[1];
                console.log("Extracted File ID:", fileId);
                setFileId(fileId);
            } else {
                console.error("Failed to extract File ID from the response.");
            }
        }
    } catch (error) {
        console.error("Failed to save the file to the server:", error);
        throw error;
    }
};


    const saveFileToS3 = async () => {
        if (!selectedPdf) {
            setConfirmation('error');
            setVisible(true);
            throw new Error('No file to upload');
        }

        const formData = new FormData();
        formData.append('file', selectedPdf); // Use 'file' as the key if that's what the server expects

        try {
            const response = await fetch('http://localhost:8080/files/upload/s3', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const responseText = await response.text(); // Read response as plain text
                console.error('Failed to save the file to the server:', responseText);
                throw new Error(`Server Error: ${response.status} ${response.statusText} - ${responseText}`);
            }

            const responseText = await response.text(); // Read response as plain text
            console.log('File saved successfully:', responseText); // Log response text

          } catch (error) {
            console.error('Failed to save the file to the server:', error);
            throw error;
        }
    };

    const fetchConvertedPdf = async (fileId: string) => {
      try {
          const response = await axios.get(`http://localhost:8080/files/convert/${fileId}`, {
              responseType: 'blob', // Expecting a PDF (blob) response
          });
  
          if (response.status === 200) {
              const pdfUrl = URL.createObjectURL(response.data); // Create a URL for the PDF blob
              setPdfUrl(pdfUrl); // Set the PDF URL to state
              setReviewFile(true); // Set the flag to trigger PDF review
              setUploadToStorage(false);
          } else {
              console.error('Failed to fetch PDF:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching the PDF:', error);
      }
  };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleApproval = (status: "UPLOAD", type?: "LOCAL" | "S3") => {
        setStatusInfo(status);
        
        if (type === "S3") {
            setUploadToS3(true);
            setUploadToLocal(false);
        } else if (type === "LOCAL") {
            setUploadToS3(false);
            setUploadToLocal(true);
        }
    
        setVisible(true);
        console.log(`Status: ${status}, Type: ${type || "None"}`); 
    };

    const goToStore = () => {   
        window.location.reload();
    };

    const handleCloseModal = () => {
        closeModal();
        setVisible(false);
        setConfirmation(''); 
        console.log('confirmation', confirmation)
        if (confirmation === 'error' || confirmation === 'uploadSuccessful') {
            closeModal(); 
            if (uploadToLocal || uploadToS3){
            window.location.reload();
            }
             // Fetch PDF after reload
          if (fileId) {
              fetchConvertedPdf(fileId); // Make the GET request to fetch the converted PDF
          }
            // window.location.reload();
        } else if  (confirmation === 'uploadSuccessful3' || confirmation === "uploadSuccessful2"){
            window.location.reload();
        }
    };
    const handleUploadFiles = async (choice: any) => {
        if (choice !== "Yes") return;
    
        setIsLoading(true);
        setVisible(false);
    
        try {
            if (selectedFile) {
                await saveFileToServer();
                setConfirmation("uploadSuccessful");
                console.log("Uploaded to local server ✅");
            } else if (selectedPdf) {
                if (uploadToS3) {
                    await saveFileToS3();
                    setConfirmation("uploadSuccessful3");
                    console.log("Uploaded to AWS S3 ✅");
                } else if (uploadToLocal){
                    await saveFileToServer();
                    setConfirmation("uploadSuccessful2");
                    console.log("Uploaded to local storage ✅");
                }
            } else {
                throw new Error("No valid file selected.");
            }
    
        } catch (error) {
            console.error("Upload failed ❌", error);
            setConfirmation("error");
        } finally {
            setVisible(true);
            setIsLoading(false);
        }
    };

    const goToVisualizationPage = () => {
        router.push("/chart");
    };
    
    const footerContent = (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {confirmation === 'confirm' ? (
                <>
                    <button
                        onClick={() => handleUploadFiles("Yes")}
                        className=" flex w-1/6 justify-center rounded bg-primary p-2 font-medium text-white hover:bg-opacity-90 mr-4 mt-2"
                    >Yes</button>

                    <button
                        onClick={handleCloseModal}
                        className="flex w-1/6 justify-center rounded bg-primary p-2 font-medium text-white hover:bg-opacity-90 mt-2"
                    >No</button>

                </>
            ) : <Button
                label="Dismiss"
                onClick={handleCloseModal}
                className="flex w-1/4 justify-center rounded bg-primary p-2 font-medium text-white hover:bg-opacity-90 mt-4"
                style={{ display: 'block', margin: '0 auto', width: "10rem" }}

            />}
        </div>
    );
  
  return (
    <>  
            {isLoading && <Loader />}
            <Head>
                <title>File Upload</title>
            </Head> 
            {convertFile && (
        
          <div className="container mx-auto px-8 mt-10">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

            <CardWrapper
                        backgroudColor={"white"}
                        borderRadius={"10px"}
                        smPadding={"20px"}
                        lgPadding={"30px"}
                    >
                         <div className="mt-8 mx-6 mb-4">
        <button
          onClick={goToVisualizationPage}
          className="bg-primary hover:bg-opacity-90 cursor-pointer flex justify-center rounded p-3 font-medium text-white"
        >
          Go to Visualization Page
        </button>
      </div>

                        <h1 className="text-black text-lg font-large p-4 ">
                        This application is built using React and allows users to interact with the backend to upload files and visualize data.

File Upload: Users can upload files (in JSON format) to the backend using a file input.
Data Visualization: Once the data is uploaded, it is processed and stored in the database by the Spring Boot backend. The frontend retrieves this data through API calls and visualizes it in different types of charts using react-chartjs-2. The available chart types include:
Line Chart: To show trends over time.
Bar Chart: To compare data across categories or time periods.
Pie Chart: To display proportions of different data points.
Filtering: Users can filter data based on a specific date range (start date to end date) and by category (e.g., total active cases). Both filters can be applied simultaneously to refine the data visualized in the charts.                        </h1>
                         <br />Developer: Muhluri Mhlongo
                    </CardWrapper>
            </div> 
          </div>
            )} 

    </>
  );
};
export default HomePageMainSection;
