'use client'
import React, { useState } from 'react';
import Dropzone from 'react-dropzone'
import { artworkState } from '@/app/recoilContextProvider';
import { useSetRecoilState } from 'recoil';
import { DropzoneOptions } from 'react-dropzone';
import { captchaState } from '@/app/recoilContextProvider';
import { useRecoilState } from 'recoil';
import CaptchaComponent from './captcha';
import { useEffect } from 'react';

const UploadCard: React.FC = () => {

    const setArtwork = useSetRecoilState(artworkState); 
    const [isCaptchaVerified, setCaptchaVerified] = useRecoilState(captchaState);
    const [captcha, setCaptcha] = useState(false);
    const dropzoneOptions: DropzoneOptions = {
        accept: {
        'image/*': ['.png'],//png
        "image/jpg": [".jpg", ".jpeg"], // jpg
        },
    };

    useEffect(() => {
      if (isCaptchaVerified) {
          setCaptcha(false);
      }
      else {
        setCaptcha(true);
      }
    }, [isCaptchaVerified]);

    return (
        <div className="relative card w-48 h-72 border border-2 border-dashed border-gray-400 bg-gray-100 m-2">
            {captcha && <CaptchaComponent />}
            <div className="card-content">
            <Dropzone
      {...dropzoneOptions}
      onDrop={acceptedFiles => {
        const isImage = acceptedFiles.every(file => {
          const isJpg = file.type === 'image/jpeg' || file.type === 'image/jpg';
          const isPng = file.type === 'image/png';
      
          return isJpg || isPng;
        });
        if (acceptedFiles.length > 0 && isImage) {
          console.log(acceptedFiles);
          const filekey = acceptedFiles[0].name + Date.now().toString();
          // setFile(acceptedFiles);
          setArtwork(oldArtwork => [
            ...oldArtwork,
            {
              id: filekey,
              file: acceptedFiles[0],
              title: "",
              tags: [],
              description: "",
              category: "",
              type: "Illustration",
              collection: "",
            }
          ]);
        } else {
          console.log("Please upload only images.");
          // You may want to provide some user feedback, e.g., show an error message.
        }
      }}>
      {({getRootProps, getInputProps}) => (
          <section>
          <div {...getRootProps()} className="flex flex-col items-center h-full w-full">
              <input {...getInputProps()} />
              <div  className='flex flex-col items-center mt-20'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-12 h-12 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className='mt-2 font-semibold text-sm text-blue-500'>Add more artworks</p>
                    <center className='px-4 mt-8 items-center text-xs text-red-600 font-semibold'>Max number of artworks uploaded per day is 10</center>
                </div>
          </div>
          </section>
      )}
      </Dropzone>
            </div>
        </div>
    );
};

export default UploadCard;
