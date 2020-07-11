import React from 'react';
import Pdf from "react-native-pdf";

const PdfVIewer = (props) => {
    return (
        <Pdf
            page={0}
            source={{uri: props.route.params.pdfUrl}}
            onLoadComplete={(numberOfPages, filePath) => {
                console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
                console.log(`current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link presse: ${uri}`)
            }}
            style={{
                width: '100%',
                height: '100%'
            }}
            fitWidth={true}
        />
    );
};

export default PdfVIewer;
