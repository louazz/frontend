import * as React from 'react';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import { ScrollMode } from '@react-pdf-viewer/core';
interface DefaultLayoutExampleProps {
    fileUrl: string;
}

const Doc: React.FC<DefaultLayoutExampleProps> = ({ fileUrl }) => {
    const scrollModePluginInstance = scrollModePlugin();
    const defaultLayoutPluginInstance = defaultLayoutPlugin( 
    );
    

    return(<div style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '1090px',
    }}> <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]}  defaultScale={SpecialZoomLevel.PageFit}/></div>)
};

export default Doc;