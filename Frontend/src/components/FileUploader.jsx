import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  Button,
} from 'reactstrap';

const FileUploader = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const hiddenFileInput = React.useRef(null);

  const FileButton = styled(Button)`
        width: 20em;
        height: 20em;
        border-radius: 50%;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &:hover{
            transform: translate(-50%, -50%);
        }
    `;

  const Image = styled.img`
        width:  100%;
        height: 100%;
        border-radius: 50%;
    `;

  const Box = styled.div`
        width: 100%;
        height: 100%;
    `;

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objUrl = URL.createObjectURL(selectedFile);
    setPreview(objUrl);

    return () => URL.revokeObjectURL(objUrl);
  }, [selectedFile]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setSelectedFile(fileUploaded);
    props.handleFile(fileUploaded);
  };

  return (
    <>
      <Box>
        <FileButton onClick={handleClick}>
          <Image alt="User Pic" src={preview ? preview : 'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png'} id="profile-image1" />
        </FileButton>
      </Box>
      <input type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};
export default FileUploader;